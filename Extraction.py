from bs4 import BeautifulSoup
from scraper import extract_link
import requests
import json

def fetch_accommodation_details(url):
    response = requests.get(url)
    
    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Debug: Print the title of the page to verify successful fetching
        print("Page title:", soup.title.string)
        
        # Extract hotel name
        name_tag = soup.find('h2', {'id': 'hp_hotel_name'})
        name = name_tag.get_text(strip=True) if name_tag else 'N/A'
        
        # Extract hotel description from meta tag
        description_tag = soup.find('meta', {'name': 'description'})
        description = description_tag.get('content', 'N/A') if description_tag else 'N/A'
        
        # Extract hotel rating
        rating = 'N/A'
        script_tag = soup.find('script', type='application/ld+json')
        if script_tag:
            try:
                json_data = json.loads(script_tag.string)
                if 'aggregateRating' in json_data:
                    rating = json_data['aggregateRating']['ratingValue']
            except (json.JSONDecodeError, KeyError) as e:
                print(f"Error parsing JSON-LD: {e}")

        image_tag = soup.find('img', {'class': 'hotel_image'})
        image = image_tag.get('src') if image_tag else 'N/A'
        
        # Debug: Print the extracted elements to verify
        print(f"Name: {name}")
        print(f"Description: {description}")
        print(f"Rating: {rating}")
        print(f"Image URL: {image}")
        
        return {
            'name': name,
            'description': description,
            'rating': rating,
            'image': image
        }
    else:
        print(f"Failed to retrieve details for {url}. Status code: {response.status_code}")
        return None

def main():
    location = input("Which location do you want to look for accommodation? \n")
    
    accommodations = extract_link(location)
    
    print("Accommodation links and names found:")
    for idx, accommodation in enumerate(accommodations):
        print(f"{idx + 1}. {accommodation['name']}: {accommodation['link']}")
    
    Name_of_Hotel = input("Please enter the name of the accommodation where you wish to stay: ")
    
    selected_accommodation = None
    for accommodation in accommodations:
        if accommodation['name'].lower() == Name_of_Hotel.lower():
            selected_accommodation = accommodation
            break
    
    if selected_accommodation:
        print(f"Fetching details for {selected_accommodation['name']}...")
        details = fetch_accommodation_details(selected_accommodation['link'])
        if details:
            print("\nAccommodation Details:")
            for key, value in details.items():
                print(f"{key.capitalize()}: {value}")
    else:
        print("No accommodation found with the provided name.")

if __name__ == "__main__":
    main()