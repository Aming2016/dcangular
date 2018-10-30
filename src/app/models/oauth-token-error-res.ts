export class OAuthTokenErrorRes{
  error:string
  error_description:string

  errorMessageMap = {"invalid_token": "Token has expired",
    "invalid_grant":"Bad credentials"}
}

