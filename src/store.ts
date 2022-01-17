import { combineReducers, compose, createStore } from "redux";
import todoReducer from "./todo/todoReducer";

const rootReducer = combineReducers({
  todos: todoReducer,
});
// Setup enhancers/middleware
const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        actionsBlacklist: [],
      })
    : compose;
const enhancer = composeEnhancers();
// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

(window as any).__TODO_REDUX_STORE = store;

export default store;
