import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./userReducer";
import createSagaMiddleware from "@redux-saga/core";
import { rootWatcher } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ userReducer });

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
