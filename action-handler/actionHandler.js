const {createActionHandler} = require('experimental-server');

const tools = require('../tools').default;

const R = require('ramda');

const createActionHandlers = docTypes => {
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




const actionHandlers = createActionHandlers(tools.docTypes);

const startActionHandler = createActionHandler(actionHandlers, 'http://localhost:9090/events', 'http://localhost:9090/public');
startActionHandler();
