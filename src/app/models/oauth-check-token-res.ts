export class OAuthCheckTokenRes {
  aud: string[]
  user_name: string
  scope: string[]
  exp: number
  authorities: string[]
  jti: string
  client_id: string
}

