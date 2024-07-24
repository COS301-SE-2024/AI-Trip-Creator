from bs4 import BeautifulSoup
import requests
import time
import re

def extract_link(location):
    url = f'https://www.booking.com/{location}'

    Page_contents = requests.get(url).text

    soup = BeautifulSoup(Page_contents,"html.parser")

    accommodations = []

    pages = soup.find_all('a', href=re.compile(r"https://www.booking.com/hotel/za/.*\.html"))

    for page in pages:
        link = page.get("href")
        name_tag = page.find('h3')
        name = name_tag.get_text(strip=True) if name_tag else "N/A"
        accommodations.append({'link': link, 'name': name})

    return accommodations