class actionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHelp = () => {
    const message = this.createChatBotMessage(
      "Sure, I can help. What do you need assistance with?",
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleFlight = () => {
    const message = this.createChatBotMessage(
      "To book a flight, navigate to the 'Flights' section in your dashboard.",
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleHi = () => {
    const message = this.createChatBotMessage(
      "Hi! I'm TripBot. How can I help you today?",
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleItinerary = () => {
    const message = this.createChatBotMessage(
      "To generate Itineraries navigate to the iterinary tab from the side and follow prompts.",
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  handleHome = () => {
    const message = this.createChatBotMessage(
      "The Homepage contains user analytic data all the more reason to trust us because you know your friends do too",
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  handleAccommodation = () => {
    const message = this.createChatBotMessage(
      "To book a Accommodation, navigate to the 'Accommodation' section in your dashboard. A list of accomodations will be provided filter through the data to find one that best suits you",
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default actionProvider;
