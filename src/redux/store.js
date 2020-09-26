import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as productsReducer } from './productsRedux';

// define reducers
const reducers = {
  products: productsReducer,
};

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);