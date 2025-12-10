import FetchFactory from '../factory'
import type { FetchOptions } from '~~/shared/types/api/common'

/**
 * Custom API methods for authentication
 */
class AuthModule extends FetchFactory {
  private RESOURCE = '/auth'

  async login(fetchOptions: FetchOptions<LoginPayload>): Promise<void> {
    await this.call<{ status: 'ok' }>(
      `${this.RESOURCE}/login`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async logout(fetchOptions?: FetchOptions<LogoutPayload>): Promise<void> {
    await this.call<{ status: 'ok' }>(
      `${this.RESOURCE}/logout`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async resetPasswordRequest(fetchOptions?: FetchOptions<ResetPasswordRequestPayload>): Promise<void> {
    await this.call<{ status: 'ok' }>(
      `${this.RESOURCE}/resetPasswordRequest`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async resetPasswordConfirmation(fetchOptions?: FetchOptions<ResetPasswordConfirmationPayload>): Promise<void> {
    await this.call<{ status: 'ok' }>(
      `${this.RESOURCE}/resetPasswordConfirmation`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async verifyToken(fetchOptions?: FetchOptions): Promise<void> {
    await this.call<{ status: 'ok' }>(
      `${this.RESOURCE}/verify`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }

  async refreshToken(fetchOptions?: FetchOptions): Promise<void> {
    await this.call<{ status: 'ok' }>(
      `${this.RESOURCE}/refresh`,
      {
        method: 'POST',
        ...fetchOptions,
      },
    )
  }
}

export default AuthModule
