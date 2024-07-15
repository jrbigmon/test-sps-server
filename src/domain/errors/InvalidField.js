class InvalidField extends Error {
  statusCode = 401;
  field;
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

module.exports = InvalidField;
