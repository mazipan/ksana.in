export default async (_, res) => {
  res.setHeader('Cache-Control', 'max-age=86400')
  res.statusCode = 200
  res.json({
    success: true,
    data: []
  })
}
