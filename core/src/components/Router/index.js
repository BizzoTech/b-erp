import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-kunafa";
import I18n from "i18n-js";

import FormView from "../FormView";
import PanelView from "../PanelView";
import ListView from "../ListView";

import { forms, panels, lists } from "../../data";

const doc = {
  name: "Emad Shaaban",
  email: "emad.shaaban92@gmail.com",
  items: [
    {
      name: "Item1",
      price: "12.5"
    },
    {
      name: "Item2",
      price: "300"
    }
  ],
  items2: [
    {
      name: "Item3",
      qty: 3
    },
    {
      name: "Item4",
      qty: 4
    }
  ]
};

class Router extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.route !== prevProps.route) {
      window && window.scrollTo(0, 0);
    }
  }
  render() {
    const route = this.props.route;
    if (!route.path || route.path.length === 0 || route.path[0] === "") {
      return <div />;
    }
    switch (route.path[0]) {
      case "panel":
        return <PanelView panel={panels[route.path[1]]} />;
      case "list":
        return route.path.length > 1 ? (
          <ListView docType={route.path[1]} />
        ) : null;
      case "form":
        if (route.path.length === 3) {
          if (route.path[2] === "new") {
            return <FormView docType={route.path[1]} />;
          } else {
            return <FormView docType={route.path[1]} docId={route.path[2]} />;
          }
        }
        return <FormView form={forms["example"]} doc={doc} />;
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
