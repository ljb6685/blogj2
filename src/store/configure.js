import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import penderMiddleware from 'redux-pender'
import * as modules from './modules'

const reducers = combineReducers(modules)
const middlewares = [penderMiddleware()]

// Apply the Redux Devtools in development mode only
const isDev = process.env.NODE_ENV === 'development'
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = devtools || compose

// preloadedState is initial state for serverside rendering
const configure = (preloadedState) => 
  createStore(
    reducers, 
    preloadedState, 
    composeEnhancers(applyMiddleware(...middlewares))
  )

export default configure