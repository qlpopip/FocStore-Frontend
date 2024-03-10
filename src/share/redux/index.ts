// src/redux/store.ts

import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import common from "./common";
import contract from "./contract";
import metamask from "./metamask";
import order from "./order";
import player from "./player";
import { configureStore } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage"; // LocalStorage for persisting the data

const rootReducer = combineReducers({
  common,
  contract,
  metamask,
  player,
  order,
});
const encryptor = encryptTransform({
  // secretKey: process.env.REDUX_SECRET_KEY
  secretKey: process.env.REACT_APP_SECRET_KEY || "secret", //Passphrase used to create 256bit AES key.
  onError: function (error: any) {
    console.log(error);
  },
});
const persistConfig = {
  key: "root", // key for the localStorage entry
  storage, // define which storage to use
  whitelist: ["common"], // only user reducer will be persisted, add other reducers if needed
  transforms: [encryptor],
};
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = configureStore({
  reducer: persistedReducer,
  // serializableCheck error fix
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch; 
