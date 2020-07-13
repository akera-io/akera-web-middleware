import {Router} from "express";
import {ConnectionPool, IBroker, IBrokerConfig, AkeraLogger} from "@akeraio/api";

export interface IWebMiddleware {
  mount(config: IBroker | IBrokerConfig | ConnectionPool, logger?: AkeraLogger): Router;

  init(config: IBroker | IBrokerConfig | ConnectionPool, router: Router, logger?: AkeraLogger): void;
}

export abstract class WebMiddleware implements IWebMiddleware {
  get dependencies(): Array<string> {
    return [];
  }

  abstract mount(config: IBroker | IBrokerConfig | ConnectionPool, logger?: AkeraLogger): Router;

  abstract init(config: IBroker | IBrokerConfig | ConnectionPool, router: Router, logger?: AkeraLogger): void;
}