const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbbiden",
    404: "Not found",
    409: "Conflict",
    4011: "Email Not Verified",
  };
  
  const httpError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  
  module.exports = httpError;
  