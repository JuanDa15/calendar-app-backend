/**
 * [httpResponse]
 * Returns the default app http response
 * @param {boolean} ok
 * @param {string} message
 * @param {any} data
 * @return { {ok: boolean, message: string, data: any}}
 */
function httpResponse(ok, message, data) {
  return {
    ok: ok,
    message: message,
    data,
  };
}

module.exports = httpResponse;
