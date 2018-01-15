import * as docsActions from "./docs";

export default {
  ...docsActions,
  webNavigateTo: (path, config) => {
    return config.actionCreators.navigateTo(["web", ...path]);
  }
};
