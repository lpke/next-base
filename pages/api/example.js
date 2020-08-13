export default (req, res) => {
  res.statusCode = 200;
  res.json({
    queryExamples: {
      string: req.query.string.toString(),
      number: parseInt(req.query.number, 10),
      boolean: !!req.query.boolean,
    },
  });
};