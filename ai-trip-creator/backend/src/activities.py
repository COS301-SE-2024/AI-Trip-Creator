import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore
import os

# Initialize Firebase Admin SDK with credentials
def initialize_firebase():
    # Path to your service account key JSON file
    service_account_path = {
        "type": "service_account",
        "project_id": "ai-trip-creator",
        "private_key_id": os.getenv("REACT_APP_private_key_id"),
        "private_key": os.getenv("REACT_APP_private_key").replace('\\n', '\n'),
        "client_email": "firebase-adminsdk-pni1c@ai-trip-creator.iam.gserviceaccount.com",
        "client_id": "110601698672016433063",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pni1c%40ai-trip-creator.iam.gserviceaccount.com"
    }

    # Initialize the app with a service account, granting admin privileges
    cred = credentials.Certificate(service_account_path)
    firebase_admin.initialize_app(cred)
    return firestore.client()

# Function to get all listings from the given URL
def get_all_listings(url, category):
    try:
        
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        listings = soup.find_all('div', class_='listing clearfix')
        product_data = []

        for listing in listings:
            image_srcset = listing.find('img')['srcset'] if listing.find('img') else None
            type_links = [a.text.strip() for a in listing.find('p', class_='type').find_all('a')] if listing.find('p', class_='type') else []
            h4_link_tag = listing.find('h4').find('a') if listing.find('h4') and listing.find('h4').find('a') else None
            h4_link_text = h4_link_tag.text.strip() if h4_link_tag else None
            h4_link_url = h4_link_tag['href'] if h4_link_tag else None
            details_div = listing.find('div', class_='details')
            last_p_content = ""
            if details_div:
                last_p_tag = details_div.find_all('p')[-1]
                br_tag = last_p_tag.find('br')
                if br_tag and br_tag.next_sibling:
                    last_p_content = br_tag.next_sibling.strip()
                else:
                    last_p_content = last_p_tag.get_text(" ", strip=True)
                    

            product_data.append({
                "image": image_srcset,
                "category": category,
                "sub_categories": type_links,
                "name": h4_link_text,
                "info_url": h4_link_url,
                "description": last_p_content
            })
            

        return product_data

    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

# Function to handle Firestore operations
def update_firestore(data, city, db,category):
    if data:  # Proceed only if data is not empty
        try:
            # Reference the Firestore 'activities' collection
            collection_ref = db.collection('LikedActivities')

            # Delete existing data for the city (optional, depending on your logic)
            city_docs = collection_ref.where('city', '==', city).where('category', '==', category).stream()
            for doc in city_docs:
                doc.reference.delete()

            # Add each listing as a separate document
            for item in data:
                item['city'] = city  # Add city information to each document
                doc_ref = collection_ref.add(item)  # Add document and get reference
                
                # Get the document ID and update the document with activityId
                doc_id = doc_ref[1].id
                collection_ref.document(doc_id).update({'activityId': doc_id})

            print(f"Data for {city} successfully written to Firestore in 'LikedActivities' collection.")
        except Exception as e:
            print(f"Error updating Firestore: {e}")
    else:
        print(f"No data to write for {city}.")

# Main function to scrape and update Firestore
def main():
    print("Starting scraping process")
    
    # Initialize Firestore
    db = initialize_firebase()

   # Merged city URLs
    city_urls = {
        "durban_things_to_do": "https://www.sa-venues.com/things-to-do/kzn/region/durban/",
        "durban_restaurants": "https://www.sa-venues.com/restaurants/kzn/region/durban/",
        "johannesburg_things_to_do": "https://www.sa-venues.com/things-to-do/gauteng/region/johannesburg/",
        "johannesburg_restaurants": "https://www.sa-venues.com/restaurants/gauteng/region/johannesburg/",
        "pretoria_things_to_do": "https://www.sa-venues.com/things-to-do/gauteng/region/pretoria/",
        "pretoria_restaurants": "https://www.sa-venues.com/restaurants/gauteng/region/pretoria/",
        "gqeberha_things_to_do": "https://www.sa-venues.com/things-to-do/easterncape/region/port-elizabeth/",
        "gqeberha_restaurants": "https://www.sa-venues.com/restaurants/easterncape/region/port-elizabeth/",
        "capetown_things_to_do": "https://www.sa-venues.com/things-to-do/westerncape/",
        "capetown_restaurants": "https://www.sa-venues.com/restaurants/westerncape"
    }

    for city_key, url in city_urls.items():
        print(f"Scraping data for {city_key}...")
        
        # Extract city name from key and determine the category
        city = city_key.split('_')[0]
        category = "things to do" if "things_to_do" in city_key else "restaurants and nightlife"
        
        # Scrape the data
        data = get_all_listings(url, category)
        
        if data:  # Only update Firestore if data was scraped successfully
            update_firestore(data, city, db,category)
        else:
            print(f"Skipping Firestore update for {city} due to scraping issues.")


    print("Scraping process complete.")

if __name__ == "__main__":
    main()
