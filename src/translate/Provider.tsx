import React, { createContext, useContext, useMemo } from "react";

import type { TranslateFn, Translations } from "./types";
import translate from "./translate";

const Transl8Context = createContext<TranslateFn>(() => { throw new Error("[react-transl8] Missing Provider"); });

interface Props {
    translations: Translations;
    children: React.ReactNode;
}

const Provider: React.FC<Props> = (props) => {
    const transl8: TranslateFn = useMemo(() => translate.bind(null, props.translations), [props.translations]);
    return <Transl8Context.Provider value={transl8}>{props.children}</Transl8Context.Provider>;
};

const useTranslate = () => {
    return useContext(Transl8Context);
};

export { Provider, useTranslate };
