import "regenerator-runtime/runtime";
import _ from "./modules";
import appConfig from "./appConfig";
import { createApp } from "b-erp-core";
import registerServiceWorker from "./registerServiceWorker";

createApp(appConfig);
//registerServiceWorker();
