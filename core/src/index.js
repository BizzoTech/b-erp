import { createApp as originalCreateApp } from "react-kunafa";

import actionCreators from "./actionCreators";
import selectors from "./selectors";
import createActionHandlers from "./actionHandlers";

export { docTypes, sidebarItems, panels, lists, forms } from "./data";

import Index from "./pages/index";

export const createApp = appConfig => {
  originalCreateApp("berp", Index, {
    ...appConfig,
    actionCreators: {
      ...actionCreators,
      ...appConfig.actionCreators
    },
    selectors: {
      ...selectors(),
      ...appConfig.selectors
    },
    actionHandlers: {
      ...createActionHandlers(),
      ...appConfig.actionHandlers
    }
  });
};
