import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { reducer as notifyReducer } from './features/notify';

function buildStore(extra) {
  const reducer = { notify: notifyReducer };
  const middleware = [thunk.withExtraArgument(extra)];
  const store = configureStore({ reducer }, middleware);
  return store;
}

export default buildStore;
