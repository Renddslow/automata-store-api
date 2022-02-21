const jsonResponse = (req, res, next) => {
  res.json = (body: any, status?: number) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = status || 200;
    res.end(JSON.stringify(body));
  };
  next();
};

export default jsonResponse;
