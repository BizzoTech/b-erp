import uuid from "uuid";

export const addDoc = doc => {
  const docType = doc.type || "doc";
  return {
    type: `ADD_${docType.toUpperCase()}`,
    doc: {
      _id: `${docType}_${uuid.v4()}`,
      type: docType,
      ...doc
    }
  };
};

export const updateDoc = doc => {
  const docType = doc.type || "doc";
  return {
    type: `UPDATE_${docType.toUpperCase()}`,
    doc
  };
};

export const removeDoc = doc => {
  const docType = doc.type || "doc";
  return {
    type: `UPDATE_${docType.toUpperCase()}`,
    doc: { ...doc, _deleted: true }
  };
};

export const loadNewDocs = (docType, { actionCreators }) => dispatch => {
  dispatch(
    actionCreators.createDocLoader(`${docType}_list`, {
      selector: {
        type: docType
      },
      sort: [
        {
          createdAt: "desc"
        }
      ],
      limit: 10
    })
  );

  dispatch(actionCreators.loadMoreDocs(`${docType}_list`));
};
