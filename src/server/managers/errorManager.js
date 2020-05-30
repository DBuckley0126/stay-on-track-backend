const terminalDisplay = (err, end) => {
  console.error("//////////ERROR////////////");
  console.error(err.message);
  // dont log full error if in production enviroment
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  if (end) {
    process.exit();
  }
};

const errorManager = {
  handleError: err => {
    switch (true) {
      case err.code === "ENOTFOUND":
        terminalDisplay(err, true);
        break;
      case err.code === "LDA_FAIL":
        terminalDisplay(err, false);
        break;
      case err.code === "REQUEST_FAIL":
        terminalDisplay(err, false);
        break;
      case err.code === "RESPONSE_ERROR":
        break;
      case !!err.message:
        terminalDisplay(err, true);
        break;
      default:
        terminalDisplay({ message: "Unknown Error", error: {} }, true);
    }
  },
  terminalDisplay,
  humanErrorMessageCompiler: (err, service = "Unknown") => {
    if (err.response) {
      return `Response from service: ${err.response.data.message}`;
    }
    if (err.request) {
      return `No response received from service: ${service}`;
    }
    return err.message;
  }
};

module.exports = errorManager;
