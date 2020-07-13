import {Router} from "express";
import {ConnectionPool, IBroker, IBrokerConfig, AkeraLogger} from "@akeraio/api";

export interface IWebMiddleware {
  readonly dependencies: Array<string>;

  mount(config: IBroker | IBrokerConfig | Array<IBrokerConfig> | ConnectionPool, logger?: AkeraLogger): Router;

  init(config: IBroker | IBrokerConfig | Array<IBrokerConfig> | ConnectionPool, router: Router, logger?: AkeraLogger): void;
}

export abstract class WebMiddleware implements IWebMiddleware {
  get dependencies(): Array<string> {
    return [];
  }

  abstract mount(config: IBroker | IBrokerConfig | Array<IBrokerConfig> | ConnectionPool, logger?: AkeraLogger): Router;

  init(config: IBroker | IBrokerConfig | Array<IBrokerConfig> | ConnectionPool, router: Router, logger?: AkeraLogger): void {
    router.use(this.mount(config, logger));
  }
}