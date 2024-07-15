class NotFound extends Error {
  statusCode = 401;
  constructor(message) {
    super(message);
  }
}

module.exports = NotFound;
