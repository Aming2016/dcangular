// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import {LogLevel} from "../app/data/logger/logger.service";
import {UriBuilder} from "../utils/uri-builder";

export const keyCloakConfig = {
  // realm: "spring-boot-quickstart",
  // url: "http://112.74.181.229:8087/auth",
  // clientId: "app-authz-angular",
  // credentials: {
  //   secret: "4107da97-fd7e-4eb2-a3d1-8673d2dd94ce"
  // }

  realm: "ztj-dichan-erp",
  // url: "http://keycloak.shyj.cn/auth",
  url: "http://keycloak.shihua365.xin/auth",
  clientId: "app-authz-angular",
  credentials: {
    secret: "38bdc5c2-83a3-4f56-8c7b-078d1e4fddd0"
  }

}

export const hostConfig = {
  host: "localhost",
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
    //meUrl: "http://localhost:8082/uaa/api/users/search/me?projection=default",
    clientId: "app-authz-springboot",
    secret: "778a73ed-e5b7-41f0-977c-7aa7cf584714",
    tokenName: "id_token"  // this is default token name of angular2-jwt

  }
}

export const parseConfig = {
  host: "localhost",
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

export const custApiConfig = {
  // url:"http://39.108.36.189:7071/api/"
  url: "http://erpapi.shihua365.xin/api/"
}

export  const configUrl={
  url:"http://groupapi.shihua365.xin/api/"
}

export  const imgUrl={
  url:"http://jjrapi.shihua365.xin/img/"
}





