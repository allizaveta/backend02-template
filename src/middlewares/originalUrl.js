const originalUrl = (request, response, next) => {
  console.log(request.url);
  next();
};

module.exports = originalUrl;