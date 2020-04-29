class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Add a "message" property (call constructor of base class)
    this.code = errorCode; // Add a "code" property
  }
}

export default HttpError;
