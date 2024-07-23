from bs4 import BeautifulSoup
import requests
import time
import re

location = input("Which location do you want to look for accommodation ? \n")

url = f'https://www.booking.com/{location}'

Page_contents = requests.get(url).text

soup = BeautifulSoup(Page_contents,"html.parser")

pages = soup.find_all('a', href=re.compile(r"https://www.booking.com/hotel/.*\.html"))

links = [link.get("href") for link in pages]

print("Accommodation links found:")
for link in links:
    print(link)