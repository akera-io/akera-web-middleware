import {Router} from "express";
import {ConnectionPool, ConnectionPoolOptions} from "@akeraio/api";

/** 
 * All akera.io middleware modules are specific 
 * [Express](https://expressjs.com) middleware that
 * has access to either one akera.io broker or a 
 * collection of brokers if mounted at the application level.  
 */
export interface IWebMiddleware {
  /**
   * The list of dependencies on other akera.io web middleware 
   * modules that needs to be loaded/mounted before.
   * 
   * The middleware has no responsability to load the dependencies
   * by itself.
   * 
   */
  readonly dependencies: Array<string>;

  /**
   * Mount the middleware using the connection information provided
   * and return an [Express](https://expressjs.com) Router.
   * 
   * @param config The connection information, can be either a single
   *               or multiple brokers if middleware is to be mounted
   *               at application level.
   */
  mount(config: ConnectionPoolOptions | ConnectionPool): Router;

  /**
   * Initialize the middleware using the connection information and
   * the [Express](https://expressjs.com) Router provided.
   * 
   * @param config The connection information, can be either a single
   *               or multiple brokers if middleware is to be mounted
   *               at application level.
   * @param router The Express Router where the middleware is to be mounted.
   */
  init(config: ConnectionPoolOptions | ConnectionPool, router: Router): void;
}

export abstract class WebMiddleware implements IWebMiddleware {
  /**
   * The list of dependencies on other akera.io web middleware 
   * modules that needs to be loaded/mounted before.
   * 
   * The middleware has no responsability to load the dependencies
   * by itself.
   */
  get dependencies(): Array<string> {
    return [];
  }

  /**
   * Mount the middleware using the connection information provided
   * and return an [Express](https://expressjs.com) Router.
   * 
   * @param config The connection information, can be either a single
   *               or multiple brokers if middleware is to be mounted
   *               at application level.
   */
  abstract mount(config: ConnectionPoolOptions | ConnectionPool): Router;

  /**
   * Initialize the middleware using the connection information and
   * the [Express](https://expressjs.com) Router provided.
   * 
   * @param config The connection information, can be either a single
   *               or multiple brokers if middleware is to be mounted
   *               at application level.
   * @param router The Express Router where the middleware is to be mounted.
   */
  init(config: ConnectionPoolOptions | ConnectionPool, router: Router): void {
    router.use(this.mount(config));
  }
}