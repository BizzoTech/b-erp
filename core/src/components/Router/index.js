import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-kunafa";
import I18n from "i18n-js";

import FormView from "../FormView";
import PanelView from "../PanelView";
import ListView from "../ListView";

import { forms, panels, lists } from "../../data";

class Router extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.route !== prevProps.route) {
      window && window.scrollTo(0, 0);
    }
  }
  render() {
    const route = this.props.route;
    const path =
      route.path && route.path.length > 0 && route.path[0] === "web"
        ? route.path.slice(1)
        : route.path;
    if (!path || path.length === 0 || path[0] === "") {
      return <div />;
    }
    switch (path[0]) {
      case "panel":
        return <PanelView panel={panels[path[1]]} />;
      case "list":
        return path.length > 1 ? <ListView docType={path[1]} /> : null;
      case "form":
        if (path.length === 3) {
          if (path[2] === "new") {
            return <FormView docType={path[1]} />;
          } else {
            return <FormView docType={path[1]} docId={path[2]} />;
          }
        }
        return <div />;
      default:
        return <div />;
    }
  }
}

const ConnectedRouter = connect(state => {
  return {
    route: state.history
  };
})(Router);

export default () => {
  const direction = I18n.locale.startsWith("ar") ? "rtl" : "ltr";
  return (
    <div style={{ direction }}>
      <ConnectedRouter />
    </div>
  );
};
