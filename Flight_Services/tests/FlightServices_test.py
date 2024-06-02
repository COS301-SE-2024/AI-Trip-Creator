import unittest
from unittest.mock import patch, Mock
from ..Flight_Services.FlightServices import (
    get_flight_offers, filter_flight_offers_by_carrier,
    filter_flight_offers_by_date, filter_flight_offers
)
from amadeus.client.errors import ResponseError

class TestFlightSearch(unittest.TestCase):

    @patch('FlightServices.amadeus.shopping.flight_offers_search.get')
    def test_get_flight_offers_success(self, mock_get):
        mock_response_data = [
            {
                "id": "1",
                "itineraries": [
                    {
                        "segments": [
                            {
                                "departure": {"iataCode": "DUR", "at": "2024-06-15T10:00:00"},
                                "arrival": {"iataCode": "CPT", "at": "2024-06-15T12:00:00"},
                                "carrierCode": "FA"
                            }
                        ]
                    }
                ]
            }
        ]
        mock_get.return_value.data = mock_response_data

        offers_data = get_flight_offers('DUR', 'CPT', '2024-06-15', 1, max_offers=10)

        self.assertIsNotNone(offers_data)
        self.assertEqual(len(offers_data), 1)
        self.assertEqual(offers_data[0]['id'], "1")
        self.assertEqual(offers_data[0]['itineraries'][0]['segments'][0]['departure']['iataCode'], "DUR")
        self.assertEqual(offers_data[0]['itineraries'][0]['segments'][0]['arrival']['iataCode'], "CPT")
        self.assertEqual(offers_data[0]['itineraries'][0]['segments'][0]['carrierCode'], "FA")

    @patch('FlightServices.amadeus.shopping.flight_offers_search.get')
    def test_get_flight_offers_error(self, mock_get):
        mock_error = Mock()
        mock_error.result = {"errors": [{"detail": "An error occurred"}]}
        mock_get.side_effect = ResponseError(mock_error)

        offers_data = get_flight_offers('DUR', 'CPT', '2024-06-15',1 , max_offers=10)

        self.assertIsNone(offers_data)

    def test_filter_flight_offers_by_carrier(self):
        offers = [
            {
                "id": "1",
                "itineraries": [
                    {
                        "segments": [
                            {"carrierCode": "FA"},
                            {"carrierCode": "BA"}
                        ]
                    }
                ]
            },
            {
                "id": "2",
                "itineraries": [
                    {
                        "segments": [
                            {"carrierCode": "BA"}
                        ]
                    }
                ]
            }
        ]
        filtered_offers = filter_flight_offers_by_carrier(offers, 'FA')
        self.assertEqual(len(filtered_offers), 1)
        self.assertEqual(filtered_offers[0]['id'], "1")

    def test_filter_flight_offers_by_date(self):
        offers = [
            {
                "id": "1",
                "itineraries": [
                    {
                        "segments": [
                            {"departure": {"at": "2024-06-15T10:00:00"}}
                        ]
                    }
                ]
            },
            {
                "id": "2",
                "itineraries": [
                    {
                        "segments": [
                            {"departure": {"at": "2024-06-16T10:00:00"}}
                        ]
                    }
                ]
            }
        ]
        filtered_offers = filter_flight_offers_by_date(offers, '2024-06-15')
        self.assertEqual(len(filtered_offers), 1)
        self.assertEqual(filtered_offers[0]['id'], "1")

    def test_filter_flight_offers_generic(self):
        offers = [
            {
                "id": "1",
                "price": {"total": "200.00"},
                "itineraries": [
                    {
                        "segments": [
                            {"carrierCode": "FA"}
                        ]
                    }
                ]
            },
            {
                "id": "2",
                "price": {"total": "300.00"},
                "itineraries": [
                    {
                        "segments": [
                            {"carrierCode": "BA"}
                        ]
                    }
                ]
            }
        ]
        filtered_offers_by_price = filter_flight_offers(offers, 'price.total', '200.00')
        self.assertEqual(len(filtered_offers_by_price), 1)
        self.assertEqual(filtered_offers_by_price[0]['id'], "1")

        filtered_offers_by_carrier = filter_flight_offers(offers, 'itineraries.0.segments.0.carrierCode', 'FA')
        self.assertEqual(len(filtered_offers_by_carrier), 1)
        self.assertEqual(filtered_offers_by_carrier[0]['id'], "1")

if __name__ == '__main__':
    unittest.main()
