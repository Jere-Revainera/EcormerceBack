function pathHandler(req, res, next) {
  const { url, method } = req;
  const message = `${method} ${url} Not found path`;
  return res.status(404).json({ message });
}
export default pathHandler;
