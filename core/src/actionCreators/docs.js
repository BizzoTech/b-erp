import uuid from 'uuid';

export const addDoc = (doc) => {
  const docType = doc.type || "doc";
  return {
    type: `ADD_${docType}`,
    doc: {
      _id: `${docType}_${uuid.v4()}`,
      type: docType,
      ...doc
    }
  }
}

export const updateDoc = (doc) => {
  const docType = doc.type || "doc";
  return {
    type: `UPDATE_${docType}`,
    doc
  }
}

export const removeDoc = (doc) => {
  const docType = doc.type || "doc";
  return {
    type: `UPDATE_${docType}`,
    doc: {...doc, _deleted: true}
  }
}