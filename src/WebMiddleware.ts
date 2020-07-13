import {Router} from "express";
import {ConnectionPool, IBroker, IBrokerConfig} from "@akeraio/api";

export interface IWebMiddleware {
  mount(config: IBroker | IBrokerConfig | ConnectionPool): Router;

  init(config: IBroker | IBrokerConfig | ConnectionPool, router: Router): void;
}

export abstract class WebMiddleware implements IWebMiddleware {
  get dependencies(): Array<string> {
    return [];
  }

  abstract mount(config: IBroker | IBrokerConfig | ConnectionPool): Router;

  abstract init(config: IBroker | IBrokerConfig | ConnectionPool, router: Router): void;
}