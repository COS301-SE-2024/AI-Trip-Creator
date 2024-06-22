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
  }
}

export default messageParser;
