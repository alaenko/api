import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceEditReducer from '../reducers/serviceEdit';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceEdit: serviceEditReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)),
);

export default store;
