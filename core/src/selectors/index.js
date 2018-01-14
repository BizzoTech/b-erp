import {
  createSelector
} from 'reselect';
import { createObjectSelector } from 'reselect-map';

import { docTypes } from '../data';

const R = require('ramda');


const documentsSelector = (state) => state.documents;



export default () => {
  const selectors = {
    documentsSelector
  };

  docTypes.forEach(docType => {
    selectors[`${docType}sSelector`] = createSelector(documentsSelector, documents => {
      const docs = {};
      R.values(documents).forEach(doc => {
        if (doc.type === docType && !doc._deleted) {
          docs[doc._id] = doc;
        }
      })
      return docs;
    });
  
    selectors[`${docType}sListSelector`] = createSelector(selectors[`${docType}sSelector`], docs => R.values(docs));
  
    selectors[`${docType}sSearchSelector`] = createSelector(selectors[`${docType}sListSelector`], docs => R.sort((r1, r2) => r2.createdAt - r1.createdAt, docs))
  
  })
  return selectors;
}
