export default {
  HOST: "localhost:9090",
  useReduxDevTools: process.env.NODE_ENV !== "production",
  localOnlyActions : [
    'START_PROCESSING_LOCAL',
    'END_PROCESSING_LOCAL',
    'ADD_EVENT',
    'UPDATE_EVENT',
    'PROCESS_LOCAL_ONLY',
    'LOAD_DOCS',
    'LOAD_DOCS_FROM_CACHE',
    'LOAD_EVENTS',
    'LOAD_SHARED_DOCS',
    'GO_TO',
    'NAVIGATE_TO'
  ],
  getRelevantDocsIds: action => {
    if(action.type.startsWith('ADD') || action.type.startsWith('UPDATE')){
      return [action.doc._id]
    }
    return [];
  }
}