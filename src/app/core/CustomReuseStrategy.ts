import {ActivatedRouteSnapshot, DetachedRouteHandle, PRIMARY_OUTLET, Route, RouteReuseStrategy} from "@angular/router"
import {UtilService} from "./util.service"
import {Logger} from "../data/logger/logger.service"

interface RouteStorageObject {
  snapshot: ActivatedRouteSnapshot
  handle: DetachedRouteHandle
  timestamp: Date
}

export class CustomReuseStrategy implements RouteReuseStrategy {

  private logger: Logger

  constructor(private util: UtilService, private config : RouteReuseConfig) {
    this.logger = util.createLogger(this)
  }

  /**
   * Object which will store RouteStorageObjects indexed by keys
   * The keys will all be a path (as in CustomReuseStrategy.getRoutePath(route))
   * This allows us to see if we've got a route stored for the requested path
   */
  storedRoutes: { [key: string]: RouteStorageObject } = Object.create(null)

  /**
   * Decides when the route should be stored
   * If the route should be stored, I believe the boolean is indicating to a controller whether or not to fire this.store
   * _When_ it is called though does not particularly matter, just know that this determines whether or not we store the route
   * An idea of what to do here: check the CustomReuseStrategy.getRoutePath(route) to see if it is a path you would like to store
   * @param route This is, at least as I understand it, the route that the user is currently on, and we would like to know if we want to store it
   * @returns boolean indicating that we want to (true) or do not want to (false) store that route
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {

    if(this.config.reuseAll){
      // only catch children
      if(CustomReuseStrategy.hasChildren(route)){
        return false
      }
      return true
    }


    // check to see if the route's path is in our reusePaths array
    if (this.config.reusePaths.indexOf(CustomReuseStrategy.getRoutePath(route)) > -1) {
      console.log("detaching", route)
      return true
    } else {
      return false // will be "view/:resultId" when user navigates to result
    }
  }

  /**
   * Constructs object of type `RouteStorageObject` to store, and then stores it for later attachment
   * @param route This is stored for later comparison to requested routes, see `this.shouldAttach`
   * @param handle Later to be retrieved by this.retrieve, and offered up to whatever controller is using this class
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    let storedRoute: RouteStorageObject = {
      snapshot: route,
      handle: handle,
      timestamp: new Date()
    }

    if(this.config.cacheSize > 0 && !!route.routeConfig && !this.storedRoutes[CustomReuseStrategy.getRoutePath(route)]){
      if(Object.keys(this.storedRoutes).length >= this.config.cacheSize){
        let firstRoute = ""
        let timestamp = new Date()

        for(let key of Object.keys(this.storedRoutes)){
          if(this.storedRoutes[key].timestamp < timestamp){
            firstRoute = key
            timestamp = this.storedRoutes[key].timestamp
          }
        }
        delete this.storedRoutes[firstRoute]
      }
    }

    this.logger.info( "store:", storedRoute, "into: ", this.storedRoutes )
    // routes are stored by path - the key is the path name, and the handle is stored under it so that you can only ever have one object stored for a single path
    this.storedRoutes[CustomReuseStrategy.getRoutePath(route)] = storedRoute
  }

  /**
   * Determines whether or not there is a stored route and, if there is, whether or not it should be rendered in place of requested route
   * @param route The route the user requested
   * @returns boolean indicating whether or not to render the stored route
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {

    // this will be true if the route has been stored before
    let canAttach: boolean = !!route.routeConfig && !!this.storedRoutes[CustomReuseStrategy.getRoutePath(route)]

    // this decides whether the route already stored should be rendered in place of the requested route, and is the return value
    // at this point we already know that the paths match because the storedResults key is the CustomReuseStrategy.getRoutePath(route)
    // so, if the route.params and route.queryParams also match, then we should reuse the component
    if (canAttach) {
      this.logger.info("param comparison:")
      this.logger.info(this.compareObjects(route.params, this.storedRoutes[CustomReuseStrategy.getRoutePath(route)].snapshot.params))
      this.logger.info("query param comparison")
      this.logger.info(this.compareObjects(route.queryParams, this.storedRoutes[CustomReuseStrategy.getRoutePath(route)].snapshot.queryParams))

      let paramsMatch: boolean = this.compareObjects(route.params, this.storedRoutes[CustomReuseStrategy.getRoutePath(route)].snapshot.params)
      let queryParamsMatch: boolean = this.compareObjects(route.queryParams, this.storedRoutes[CustomReuseStrategy.getRoutePath(route)].snapshot.queryParams)

      this.logger.info("deciding to attach...", route, "does it match?", this.storedRoutes[CustomReuseStrategy.getRoutePath(route)].snapshot, "return: ", paramsMatch && queryParamsMatch)
      return paramsMatch && queryParamsMatch
    } else {
      return false
    }
  }

  /**
   * Finds the locally stored instance of the requested route, if it exists, and returns it
   * @param route New route the user has requested
   * @returns DetachedRouteHandle object which can be used to render the component
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

    // return null if the path does not have a routerConfig OR if there is no stored route for that routerConfig
    if (!route.routeConfig || !this.storedRoutes[CustomReuseStrategy.getRoutePath(route)]) return null
    this.logger.info("retrieving", "return: ", this.storedRoutes[CustomReuseStrategy.getRoutePath(route)])

    /** returns handle when the CustomReuseStrategy.getRoutePath(route) is already stored */
    return this.storedRoutes[CustomReuseStrategy.getRoutePath(route)].handle
  }

  /**
   * Determines whether or not the current route should be reused
   * @param future The route the user is going to, as triggered by the router
   * @param curr The route the user is currently on
   * @returns boolean basically indicating true if the user intends to leave the current route
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    this.logger.info("deciding to reuse", "future", future.routeConfig, "current", curr.routeConfig, "return: ", future.routeConfig === curr.routeConfig)
    return future.routeConfig === curr.routeConfig
  }

  /**
   * This nasty bugger finds out whether the objects are _traditionally_ equal to each other, like you might assume someone else would have put this function in vanilla JS already
   * One thing to note is that it uses coercive comparison (==) on properties which both objects have, not strict comparison (===)
   * Another important note is that the method only tells you if `compare` has all equal parameters to `base`, not the other way around
   * @param base The base object which you would like to compare another object to
   * @param compare The object to compare to base
   * @returns boolean indicating whether or not the objects have all the same properties and those properties are ==
   */
  private compareObjects(base: any, compare: any): boolean {

    // loop through all properties in base object
    for (let baseProperty in base) {

      // determine if comparrison object has that property, if not: return false
      if (compare.hasOwnProperty(baseProperty)) {
        switch(typeof base[baseProperty]) {
          // if one is object and other is not: return false
          // if they are both objects, recursively call this comparison function
          case 'object':
            if ( typeof compare[baseProperty] !== 'object' || !this.compareObjects(base[baseProperty], compare[baseProperty]) ) { return false } break
          // if one is function and other is not: return false
          // if both are functions, compare function.toString() results
          case 'function':
            if ( typeof compare[baseProperty] !== 'function' || base[baseProperty].toString() !== compare[baseProperty].toString() ) { return false } break
          // otherwise, see if they are equal using coercive comparison
          default:
            if ( base[baseProperty] != compare[baseProperty] ) { return false }
        }
      } else {
        return false
      }
    }

    // returns true only after false HAS NOT BEEN returned through all loops
    return true
  }

  static getRoutePath(route: ActivatedRouteSnapshot): string {
    return !!route.routeConfig?route.routeConfig.path:''
  }

  // static getRoutePath(route: ActivatedRouteSnapshot): string {
  //   let namedOutletCount: number = 0;
  //   return route.pathFromRoot.reduce((path, route) => {
  //     let config: Route = route.routeConfig;
  //     if(config) {
  //       if(config.outlet && config.outlet !== PRIMARY_OUTLET) {
  //         path += `(${config.outlet}:`;
  //         namedOutletCount++;
  //       } else {
  //         path += '/';
  //       }
  //       return path += config.path
  //     }
  //     return path;
  //   }, '') + (namedOutletCount ? new Array(namedOutletCount + 1).join(')') : '');
  // }

  static hasChildren(route: ActivatedRouteSnapshot):boolean{
    return !!route.firstChild
  }
}



export class RouteReuseConfig{
  reuseAll : boolean
  reusePaths: Array<string>
  cacheSize: number
}
