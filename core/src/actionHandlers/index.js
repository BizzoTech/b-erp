import { docTypes } from "../data";

const R = require("ramda");

export default () => {
  const actionHandlers = {};

  docTypes.forEach(docType => {
    actionHandlers[docType] = {
      [`ADD_${docType.toUpperCase()}`]: (doc, action) => {
        return {
          ...action.doc,
          createdAt: Date.now()
        };
      },
      [`UPDATE_${docType.toUpperCase()}`]: (doc, action) => {
        const updatedDoc = R.merge(doc, R.omit(["_rev"], action.doc));
        return R.merge(updatedDoc, {
          updatedAt: Date.now()
        });
      }
    };
  });

  return actionHandlers;
};
