import { validateURL } from './helpers'

export async function getMeta(url: string) {
  const { isValid } = validateURL(url)
  if (isValid) {
    const res = await fetch(`https://oge.now.sh/api?url=${decodeURIComponent(url)}`)
    const jsonRes = await res.json()
    return jsonRes
  }

  return {}
}
