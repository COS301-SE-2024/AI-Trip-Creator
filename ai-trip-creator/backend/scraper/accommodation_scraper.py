# backend/scraper/accommodation_scraper.py
import requests
from bs4 import BeautifulSoup
import json
import re
import logging

#logging.basicConfig(level=logging.DEBUG)
from forex_python.converter import CurrencyRates

def get_exchange_rate():
    url = f'https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=ZAR'

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        soup = BeautifulSoup(response.text, "html.parser")

        # Attempt to find the exchange rate from the page
        rate = 'N/A'
        script_tag = soup.find('script', type='application/json')
        if script_tag:
            try:
                json_data = json.loads(script_tag.string)
                if 'props' in json_data:
                    
                    rate = json_data['props']['pageProps']['dataManifest']['7k1SwPLs4kbwm0A3zHztHU']['rates']['ZAR']
            except (json.JSONDecodeError, KeyError) as e:
                print(f"Error parsing JSON-LD: {e}")
        
        return rate
    except requests.RequestException as e:
        print(f"Error fetching exchange rate: {e}")
        return None


def extract_links(location):
    url = f'https://www.booking.com/{location}'
    page_contents = requests.get(url).text
    soup = BeautifulSoup(page_contents, "html.parser")
    accommodations = []
    pages = soup.find_all('a', href=re.compile(r"https://www.booking.com/hotel/za/.*\.html"))
    for page in pages:
        link = page.get("href")
        name_tag = page.find('h3')
        name = name_tag.get_text(strip=True) if name_tag else "N/A"
        accommodations.append({'link': link, 'name': name})
    return accommodations

def fetch_accommodation_details(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        title_tag = soup.find('title')
        name = title_tag.get_text(strip=True).split(',')[0] if title_tag else 'N/A'
        description_tag = soup.find('meta', {'name': 'description'})
        description = description_tag.get('content', 'N/A') if description_tag else 'N/A'
        rating = 'N/A'
        script_tag = soup.find('script', type='application/ld+json')
        if script_tag:
            try:
                json_data = json.loads(script_tag.string)
                if 'aggregateRating' in json_data:
                    rating = json_data['aggregateRating']['ratingValue']
            except (json.JSONDecodeError, KeyError) as e:
                logging.error(f"Error parsing JSON-LD: {e}")
        
        price = 'N/A'
        price_text = 'N/A'
        script_tag = soup.find('script', type='application/ld+json')
        if script_tag and script_tag.string:
            try:
                json_data = json.loads(script_tag.string)
                price_text = json_data.get('priceRange', 'N/A')  # Provide a default value
            except (json.JSONDecodeError, KeyError) as e:
                logging.error(f"Error parsing JSON-LD: {e}")
                price_text = 'N/A'
        
        
        
         # Extract the price in dollars using a regular expression
        price_match = re.search(r'\$\d+(\.\d+)?', str(price_text))
        
        if not price_match:
            print("No price found in the text.")
            return

        # Extract the numeric value and convert to float
        price_usd = float(price_match.group().replace('$', ''))

        # Get the exchange rate
        exchange_rate = get_exchange_rate()

        if exchange_rate:
            price_zar = price_usd * exchange_rate
            # Replace the dollar price with rand price in the original text
            #price = re.sub(r'\$\d+(\.\d+)?', f'ZAR {price_zar:.2f}', price_text)
            # Remove text in brackets
            #price = re.sub(r'\s*\(.*?\)', '', price).strip()
            price=round((price_usd * exchange_rate),2)

        image_tag = soup.find('img', {'class': 'hide'})
        image = image_tag.get('src') if image_tag else 'N/A'
        print (name, description,rating,image,price)
        return {
            'name': name,
            'description': description,
            'link': url,
            'rating': rating,
            'image': image,
            'price': price,
            
            
        }
    else:
        #logging.warning(f"Failed to retrieve details for {url}. Status code: {response.status_code}")
        return None

def get_accommodation_details(location):
    logging.debug(f"Extracting links for location: {location}")
    accommodations = extract_links(location)
    if not accommodations:
        logging.warning(f"No accommodations found for location: {location}")
        return []
    accommodation_details = []
    for accommodation in accommodations:
        logging.debug(f"Fetching details for accommodation: {accommodation['name']}")
        details = fetch_accommodation_details(accommodation['link'])
        if details:
            accommodation_details.append(details)
            
        else:
             logging.warning(f"Failed to fetch details for {accommodation['name']}")
    logging.debug(f"Fetched details for {len(accommodation_details)} accommodations.")
      
    return accommodation_details
