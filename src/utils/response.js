module.exports = response = (status, message, data) => ({
  status: status,
  message: message,
  ...(data && { data: data }),
});
