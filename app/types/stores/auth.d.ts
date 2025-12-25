interface LoginPayload {
  authValue: string
  authCode: string
}

interface LogoutPayload {
  userId: number
}

interface ResetPasswordRequestPayload {
  authValue: string
}

interface ResetPasswordConfirmationPayload {
  token: string
}
