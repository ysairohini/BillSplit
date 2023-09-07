import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

let persistor = persistStore(store)

export { store, persistor };