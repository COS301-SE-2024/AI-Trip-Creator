from bs4 import BeautifulSoup
import requests
import time
import re

def extract_link(location):
    url = f'https://www.booking.com/{location}'

    Page_contents = requests.get(url).text

    soup = BeautifulSoup(Page_contents,"html.parser")

    pages = soup.find_all('a', href=re.compile(r"https://www.booking.com/hotel/.*\.html"))

    links = [link.get("href") for link in pages]

    print("Accommodation links found:")
    for link in links:
        print(link)

def main():
    location = input("Which location do you want to look for accommodation ? \n")

    extract_link(location)

if __name__ == "__main__":
    main()