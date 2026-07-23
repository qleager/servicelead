/**
 * Ensures that a device fingerprint is present.
 *
 * @param fingerprint - Device fingerprint read from the request cookies.
 * @throws An H3 error with status code 401 when the fingerprint is missing.
 */
export function assertFingerprint(fingerprint: string | undefined): asserts fingerprint is string {
  if (!fingerprint) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing fingerprint',
    })
  }
}
