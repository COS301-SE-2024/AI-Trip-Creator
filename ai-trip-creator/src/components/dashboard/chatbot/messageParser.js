class messageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("help")) {
      this.actionProvider.handleHelp();
    }

    if (lowerCaseMessage.includes("flight")) {
      this.actionProvider.handleFlight();
    }

    if (lowerCaseMessage.includes("hi")) {
      this.actionProvider.handleHi();
    }

    if (lowerCaseMessage.includes("itinerary")) {
      this.actionProvider.handleItinerary();
    }

    if (lowerCaseMessage.includes("home")) {
      this.actionProvider.handleHome();
    }

    if (lowerCaseMessage.includes("accommodation")) {
      this.actionProvider.handleAccommodation();
    }
  }
}

export default messageParser;
