class InternalError extends Error {
  statusCode = 500;

  constructor(message) {
    super(message);
  }
}

module.exports = InternalError;
