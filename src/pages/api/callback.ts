export default async (_: any, res: any) => {
  res.statusCode = 200
  res.json({
    success: true,
    request: _,
    data: []
  })
}
