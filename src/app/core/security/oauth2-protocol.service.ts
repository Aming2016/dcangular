import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {User} from "../../models/user";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/empty";
import {AuthProtocolService, OAuthCheckToken, OAuthPostBody, OAuthToken} from "./auth-protocol.service";
import {Logger} from "../../data/logger/logger.service";
import {UtilService} from "../util.service";
import {serverConfig} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
/*
@Injectable()
export class OAuth2ProtocolService implements AuthProtocolService {

  private logger: Logger

  constructor(private util: UtilService, private http: HttpClient, private auth: AuthService) {
    this.logger = util.createLogger(this)
  }

  login(credentials: { code: string } | { username: string; password: string } | any): Observable<boolean> {
    if (credentials.username) {
      // const body: OAuthPostBody = {
      //   grant_type: "password",
      //   username: credentials.username,
      //   password: credentials.password
      // }
      let searchParams = new URLSearchParams()
      searchParams.set("grant_type", "password")
      searchParams.set("username", credentials.username)
      searchParams.set("password", credentials.password)
      const headers = this.authHeader();

      return this.http.post<OAuthToken>(serverConfig.oauth.loginUrl,
        searchParams.toString(),
        {
          headers: headers
        }
      ).do((token : OAuthToken) => {
        this.auth.authDetail.token = token.access_token
        this.auth.authDetail.tokenType = token.token_type
        this.auth.authDetail.refreshToken = token.refresh_token
      }).switchMap(token => {
        return this.checkToken()
      }).map((token : boolean) => true)
    } else {
      // use credentials.code
    }
    // TODO: others type of auth protocol
    return undefined;
  }



  logout(): Observable<boolean> {
    return undefined;
  }

  checkToken() : Observable<boolean>{
    const headers = this.authHeader();
    return this.http.get<OAuthCheckToken>(serverConfig.oauth.checkTokenUrl,
      {
        headers: headers,
        params : {"token": this.auth.authDetail.token}
      }
    ).do(token => {
      this.auth.authDetail.expireDate = new Date(token.exp * 1000)
      this.auth.authDetail.scope = token.scope
      this.auth.authDetail.authorities = token.authorities
      this.auth.authDetail.userName = token.user_name
      this.auth.authDetail.aud = token.aud
    }).map(token => true)
  }

  private authHeader() {
    const basic = btoa(serverConfig.oauth.clientId + ":" + serverConfig.oauth.secret)

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${basic}`);
    return headers;
  }
}

*/
