"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import React, { ReactElement } from "react";
import { PersistGate } from "redux-persist/integration/react";
import LoadingComponent from "../ui/loadingComponent";
import { GlobalNav } from "../ui/globalNav";


const Loading = () => {
    return (
        <>
            <GlobalNav/>
            <LoadingComponent/>
        </>
    )
}

export default function ProviderWrapper(props:{children: ReactElement}) {

    return (
        <Provider store={store}>
            <PersistGate loading={<Loading/>} persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    ) 
}