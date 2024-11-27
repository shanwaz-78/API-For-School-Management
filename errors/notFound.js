const notFound = (req, res) => {
  res.status(404).send(`Not Found`);
};

export { notFound };
