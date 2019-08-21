import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Redux Setup
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import RootReducer from "./rootReducer";

const reduxMiddleware = applyMiddleware(thunkMiddleware);
const Store = createStore(RootReducer, composeWithDevTools(reduxMiddleware));

ReactDOM.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	document.getElementById('root'));

serviceWorker.unregister();
