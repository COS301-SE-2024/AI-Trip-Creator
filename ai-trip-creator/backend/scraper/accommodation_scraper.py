# backend/scraper/accommodation_scraper.py
import requests
from bs4 import BeautifulSoup
import json
import re
import logging

logging.basicConfig(level=logging.DEBUG)

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
        image_tag = soup.find('img', {'class': 'hide'})
        image = image_tag.get('src') if image_tag else 'N/A'
        return {
            'name': name,
            'description': description,
            'rating': rating,
            'image': image
        }
    else:
        logging.warning(f"Failed to retrieve details for {url}. Status code: {response.status_code}")
        return None

def get_accommodation_details(location):
    accommodations = extract_links(location)
    if not accommodations:
        return []
    accommodation_details = []
    for accommodation in accommodations:
        details = fetch_accommodation_details(accommodation['link'])
        if details:
            accommodation_details.append(details)
    return accommodation_details
