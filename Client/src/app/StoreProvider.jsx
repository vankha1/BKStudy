"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
// import { conversationInfo } from '../redux/features/conversation'
// import { userInformation } from '../redux/features/userSlice'

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(conversationInfo())
    // storeRef.current.dispatch(userInformation())
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistStore(storeRef.current)}>
        {children}
      </PersistGate>
    </Provider>
  );
}
