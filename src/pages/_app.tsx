import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider } from "../translate/Provider";

const translations = {
    hello: "hello @{name}",
    simple: "hello @(strong)(@{name})",
    advanced: "hello @(strong)(@{name}), you have @{currency} @{amount}. Go to @(profile)(your profile)(with id @{id})",
};

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>react-transl8 demo</title>
        </Head>
        <Provider translations={translations}>
            <Component {...pageProps} />
        </Provider>
    </>
);

export default MyApp;
