from amadeus import Client, ResponseError

# Initialize the Amadeus client with your API credentials
amadeus = Client(
    client_id='rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin',
    client_secret='RGeFEPqnTMNFKNjd'
)


def get_flight_offers(origin_location, destination_location, departure_date, adults, max_offers):
    """
    Sends a flight offers search request to the Amadeus API and returns the response data.

    :param origin_location: The origin location code (e.g., 'DUR' for Durban)
    :param destination_location: The destination location code (e.g., 'CPT' for Cape Town)
    :param departure_date: The departure date in 'YYYY-MM-DD' format
    :param adults: The number of adults traveling (default is 1)
    :param max_offers: The maximum number of flight offers to return (default is 10)
    :return: The response data containing flight offers
    """
    try:
        # Make a flight offers search request
        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=origin_location,
            destinationLocationCode=destination_location,
            departureDate=departure_date,
            adults=adults,
            max=max_offers
        )
        # Return the response data
        return response.data
    except ResponseError as error:
        print(error)
        return None

# Example usage:
# Get flight offers from Durban to Cape Town for 2024-06-15 with a maximum of 10 offers
offers_data = get_flight_offers('DUR', 'CPT', '2024-06-15', 1,max_offers=1)
#print(offers_data)

# Process the response data as needed
#if offers_data:
 #   for offer in offers_data:
 #       print(f"Offer ID: {offer['id']}")
 #       for segment in offer['itineraries'][0]['segments']:
  #          print(f"Flight from {segment['departure']['iataCode']} to {segment['arrival']['iataCode']}")


def filter_flight_offers(offers, field, value):
    """
    Filters flight offers based on a given field and value.

    :param offers: List of flight offers (as returned by the Amadeus API)
    :param field: The field to filter by (e.g., 'price.total' for total price)
    :param value: The value to filter by (e.g., a specific price or airline)
    :return: A list of filtered flight offers
    """
    def get_nested_value(d, keys):
        for key in keys:
            if isinstance(d, list):
                d = d[int(key)]  # Convert key to int for list indexing
            else:
                d = d.get(key)
            if d is None:
                return None
        return d

    filtered_offers = []
    field_parts = field.split('.')

    for offer in offers:
        try:
            current_value = get_nested_value(offer, field_parts)
            if current_value == value:
                filtered_offers.append(offer)
        except (KeyError, IndexError, TypeError):
            continue

    return filtered_offers


# Filter by total price
#filtered_offers_by_price = filter_flight_offers(response.data, 'price.total', '172.27')

# Filter by airline code
#print("Testing filter by airline")
#filtered_offers_by_airline = filter_flight_offers(response.data, 'itineraries[0].segments[0].carrierCode', 'FA')
#filtered_offers_by_airline = filter_flight_offers(response.data, 'operating.carrierCode', 'FA')

# Print filtered offers
#print(filtered_offers_by_price)
#print(filtered_offers_by_airline)

def filter_flight_offers_by_carrier(offers, carrier_code):
    """
    Filters flight offers by carrier code.

    :param offers: List of flight offers (as returned by the Amadeus API)
    :param carrier_code: The carrier code to filter by (e.g., 'FA')
    :return: A list of filtered flight offers
    """
    filtered_offers = []
    
    for offer in offers:
        try:
            # Check each segment in each itinerary for the carrier code
            for itinerary in offer['itineraries']:
                for segment in itinerary['segments']:
                    if segment['carrierCode'] == carrier_code:
                        filtered_offers.append(offer)
                        break  # No need to check further segments/itineraries in this offer
        except KeyError:
            # If the structure is not as expected, skip this offer
            continue
    
    return filtered_offers

# Example usage:
# Assuming 'response.data' contains the flight offers data from the Amadeus API
#filtered_offers_by_carrier = filter_flight_offers_by_carrier(response.data, 'FA')

# Print filtered offers
#print(filtered_offers_by_carrier)

from datetime import datetime

def filter_flight_offers_by_date(offers, date):
    """
    Filters flight offers by departure date.

    :param offers: List of flight offers (as returned by the Amadeus API)
    :param date: The departure date to filter by (in 'YYYY-MM-DD' format)
    :return: A list of filtered flight offers
    """
    filtered_offers = []
    
    for offer in offers:
        try:
            # Check each segment in each itinerary for the departure date
            for itinerary in offer['itineraries']:
                for segment in itinerary['segments']:
                    departure_datetime = segment['departure']['at']
                    departure_date = departure_datetime.split('T')[0]
                    if departure_date == date:
                        filtered_offers.append(offer)
                        break  # No need to check further segments/itineraries in this offer
        except KeyError:
            # If the structure is not as expected, skip this offer
            continue
    
    return filtered_offers

# Example usage:
# Assuming 'response.data' contains the flight offers data from the Amadeus API
#filtered_offers_by_date = filter_flight_offers_by_date(response.data, '2024-06-15')

# Print filtered offers
#print("Testing filter by date")
#print(filtered_offers_by_date)

