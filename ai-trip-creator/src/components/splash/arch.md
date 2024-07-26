```mermaid
graph TD
    UI[User Interface (React)] --> APIGateway[API Gateway (Express.js)]

    subgraph Microservices
        UserPreferences[User Preferences Service]
        FlightData[Flight Data Aggregation Service]
        AccommodationData[Accommodation Data Scraping Service]
        ItineraryGeneration[Itinerary Generation Service]
        CostReduction[Cost Reduction Suggestion Service]
        TravelTime[Travel Time Estimation Service]
        SocialSharing[Social Sharing Service]
        AIChat[AI Chat/Prompt Service]
        MultipleDestinations[Multiple Destinations Suggestion Service]
    end

    subgraph Firebase
        UserDataStore[User Data Store]
        FlightDataStore[Flight Data Store]
        AccommodationDataStore[Accommodation Data Store]
    end

    APIGateway --> UserPreferences
    APIGateway --> FlightData
    APIGateway --> AccommodationData
    APIGateway --> ItineraryGeneration
    APIGateway --> CostReduction
    APIGateway --> TravelTime
    APIGateway --> SocialSharing
    UserPreferences --> UserDataStore
    FlightData --> FlightDataStore
    AccommodationData --> AccommodationDataStore
    ItineraryGeneration --> UserDataStore
    AIChat --> ItineraryGeneration
    MultipleDestinations --> ItineraryGeneration

    WebScraper[Web Scraper (Activity Data)] --> AccommodationData
```
