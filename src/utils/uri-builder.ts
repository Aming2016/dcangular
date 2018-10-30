export class UriBuilder{
  private _schema : string = "http"
  private _host : string
  private _port? : number
  private _username? : string
  private _password? : string
  private _path : string = "/"
  private _query? :string
  private _fragment? : string
  constructor(host?:string){
    this._host = host
  }

  schema(schema:string){
    this._schema = schema
    return this
  }

  port(port:number){
    this._port = port
    return this
  }

  host(host:string){
    this._host = host
    return this
  }

  username(username:string){
    this._username = username
    return this
  }

  password(password:string){
    this._password = password
    return this
  }

  path(path:string){
    this._path = path
    return this
  }

  query(query:string){
    this._query = query
    return this
  }

  fragment(fragment:string){
    this._fragment = fragment
    return this
  }

  uri(){

    let port :string
    if(!this._port || this._port == 80){
      port = ""
    } else {
      port = ":" + this._port
    }
    let host = this._host
    host = "//" + host

    let schema = this._schema
    if(!schema){
      schema = "http"
    }
    schema = schema + ":"

    let path = this._path
    if(!path){
      path = ""
    }

    return schema + host + port + path
  }

  static create(host:string, path?: string, port?:number, schema?:string){
    return new UriBuilder().schema(schema).port(port).host(host).path(path).uri()
  }
}
