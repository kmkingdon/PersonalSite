"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import React, { ReactElement } from "react";
import { PersistGate } from "redux-persist/integration/react";
import LoadingComponent from "../ui/loadingComponent";


export default function ProviderWrapper(props:{children: ReactElement}) {

    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingComponent/>} persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    ) 
}