const generateCode = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''

  try {
    const cryptoObj: any = typeof crypto !== 'undefined' ? crypto : (globalThis as any).crypto
    if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
      const array = new Uint32Array(length)
      cryptoObj.getRandomValues(array)
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length]
      }
      return result
    }
  } catch (e) {}

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }

  return result
}

export default generateCode;