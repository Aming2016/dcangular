import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/empty";

@Injectable()
export abstract class AuthProtocolService {

  abstract login(credentials : {code:string} | {username:string, password:string} | any): Observable<boolean>
  abstract logout(): Observable<boolean>

}


export type GrantType = "implicit" | "refresh_token" |  "password" |  "authorization_code" | "client_credentials"

export interface OAuthPostBody{
  grant_type : GrantType
  username? : string
  password? : string
  client_id? : string
  client_secret? : string
}


export interface OAuthToken{
  "access_token": string
  "token_type": "bearer"
  "refresh_token": string
  "expires_in": number
  "scope": string
  "jti"?: string
}


export interface OAuthCheckToken {
  "aud": string[]
  "user_name": string
  "scope": string[]
  "exp": number
  "authorities": string[]
  "jti": string
  "client_id": string
}
