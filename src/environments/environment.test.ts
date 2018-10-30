// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import {LogLevel} from "../app/data/logger/logger.service";
import {UriBuilder} from "../utils/uri-builder";

export const keyCloakConfig = {
  realm: "ztj-dichan-erp-test",
  url: "http://112.74.181.229:8087/auth",
  clientId: "app-authz-angular",
  credentials: {
    secret: "c95e7e7e-8598-4120-8b0e-c8a4410b2365"
  }
}

export const hostConfig = {
  host: "112.74.181.229",
  port: 4200,
  schema: "http",
  contextPath: ""
}

export const resourceHost = {
  host: hostConfig.host,
  port: 8083,
  schema: "http",
  contextPath: "",
  clientId: "app-authz-angular"
}

export const authHost = {
  host: hostConfig.host,
  port: 8082,
  schema: "http",
  contextPath: "/uaa"
}

export const appConfig = {
  defaultLanguage: "zh",
  homePath: "/",
  loginPath: "/login",
  pageSize: 5
}

export const serverConfig = {
  oauth: {
    loginUrl: `${authHost.schema}://${authHost.host}${(authHost.port == null || authHost.port == 80) ? "" : ":" + authHost.port}${authHost.contextPath}/oauth/token`,
    checkTokenUrl: `${authHost.schema}://${authHost.host}${(authHost.port == null || authHost.port == 80) ? "" : ":" + authHost.port}${authHost.contextPath}/oauth/check_token`,
    //meUrl: "http://112.74.181.229:8082/uaa/api/users/search/me?projection=default",
    clientId: "app-authz-springboot",
    secret: "778a73ed-e5b7-41f0-977c-7aa7cf584714",
    tokenName: "id_token"  // this is default token name of angular2-jwt

  }
}

export const parseConfig = {
  host: "112.74.181.229",
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
  loginPath: "/wechat/oauthLogin",
  appid: "wx6cf08c8b6b155486",
  oauthCallbackUri: `${authHost.schema}://${authHost.host}${(authHost.port == null || authHost.port == 80) ? "" : ":" + authHost.port}${authHost.contextPath}/wechat/oauthLogin`
}

export const debugConfig = {
  production: false,
  logLevel: LogLevel.DEBUG
}

export const investApiConfig = {
  url: "http://112.74.181.229:8092/api/"
}

export  const configUrl={
  url:"http://112.74.181.229:7082/api/"
}

export  const imgUrl={
  url:"http://119.23.203.64:81/img/"
}





