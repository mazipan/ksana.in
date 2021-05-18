export default async (_, res) => {
  res.statusCode = 200
  res.json({
    success: true,
    request: _,
    data: []
  })
}
