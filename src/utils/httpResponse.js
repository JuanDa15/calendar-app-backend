function httpResponse(ok, message, data) {
  return {
    ok: ok,
    message: message,
    data,
  };
}

module.exports = httpResponse;
