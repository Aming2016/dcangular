import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {User} from "../../models/user";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/empty";
import {UtilService} from "../util.service";
import {Logger} from "../../data/logger/logger.service";
import {AuthProtocolService} from "./auth-protocol.service";

@Injectable()
export class BasicAuthService implements AuthProtocolService {

  private logger: Logger

  constructor(private util: UtilService, private http: HttpClient) {
    this.logger = util.createLogger(this)
  }



  // store the URL so we can redirect after logging in
  path: string;
  redirectUrl: string;

  get passBase64() {
    return localStorage.getItem("auth.passBase64")
  }

  set passBase64(pass: string) {
    if (pass) {
      localStorage.setItem("auth.passBase64", pass)
    } else {
      localStorage.removeItem("auth.passBase64")
    }
  }

  login(credentials: { code: string } | { username: string; password: string } | any): Observable<boolean> {
    if (credentials.username) {
      this.passBase64 = btoa(credentials.username + ":" + credentials.password)
    } else {
      // use credentials.code
    }
    return this.checkAuth()
  }

  logout(): Observable<boolean> {
    this.passBase64 = null
    localStorage.removeItem("auth.passBase64")
    return Observable.of(true);
  }


  checkAuth(): Observable<boolean> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + this.passBase64
    });

    // return this.http.get<User>(this.apiUrl, {headers: headers})
    //   .catch(handleHttpError());
    return null
  }

  currentUser(): User {
    return null
  }

}

