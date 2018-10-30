// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import {LogLevel} from "../app/data/logger/logger.service";
import {UriBuilder} from "../utils/uri-builder";

export const appConfig = {
  defaultLanguage: "zh",
  homePath: "/young",
  loginUri: "/login",
  pageSize: 5
}

export const serverConfig = {
  host: "192.168.1.104",
  port: 4200,
  path: null,
  uri() {
    return UriBuilder.create(this.host, this.path, this.port)
  },
  oauth: {
    host: "localhost",
    port: 8082,
    schema : "http",
    loginUrl: `${this.oauth.schema}://${this.oauth.host}${(this.oauth.port == null || this.oauth.port == 80)?"":":" + this.oauth.port}/uaa/oauth/token`,
    checkTokenUrl: `${this.oauth.schema}://${this.oauth.host}${(this.oauth.port == null || this.oauth.port == 80)?"":":" + this.oauth.port}/uaa/oauth/check_token`,
    //meUrl: "http://localhost:8082/uaa/api/users/search/me?projection=default",
    clientId: "web",
    secret: "password",
    tokenName: "id_token"  // this is default token name of angular2-jwt
  }
}

export const parseConfig = {
  host: "192.168.1.104",
  sslHost: null,
  port: 1337,
  sslPort: 1338,
  path: "/parse",
  appId: "myAppId",
  get uri() {
    return UriBuilder.create(this.host, this.path, this.port)
  },
  get sslUri() {
    if (!this.sslHost) {
      this.sslHost = this.host
    }
    return this.uri // use http for dev
    // return UriBuilder.create(this.sslHost, this.path, this.sslPort, "https")
  }
}


export const resourceConfig = {
  unknownImageUrl: "assets/images/question-mark.png",
  anonymousImageUrl: "assets/images/anonymous_icon.png"
}

export const wechatConfig = {
  loginUri: "/wechat/oauthLogin",
  appid: "wx6cf08c8b6b155486",
  oauthCallbackPath: `/wechat/oauthLogin`,
  get oauthCallbackUri() {
    return UriBuilder.create(serverConfig.host, this.oauthCallbackPath)
  }
}

export const debugConfig = {
  production: false,
  logLevel: LogLevel.DEBUG
}

