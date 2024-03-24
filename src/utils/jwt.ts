import jwt from 'jsonwebtoken'
export const signJwt = (
  data: object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(data, process.env.PRIVATE_KEY!, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.PUBLIC_KEY!)
    return {
      valid: true,
      expired: false,
      decoded,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}
