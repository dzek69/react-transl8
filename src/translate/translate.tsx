import React from "react";
import { get } from "bottom-line-utils";
import type { AnyComponent, Translations } from "./types";

const VARS_MATCHER = /(@{[a-zA-Z]+})/g;
const VAR_MATCHER = /@{([^}]+)}/;

const COMPONENTS_MATCHER = /(@\([^)]+\)(?:\([^)]+\))+)/;
const COMPONENT_MATCHER = /^@(\([^)]+\))((?:\([^)]+\))+)$/;
const ARGUMENTS_MATCHER = /\([^)]+\)/g;

const unpack = (string: string) => {
    return string.substring(1, string.length - 1);
};

const fillVariables = (translation: string, key: string, params: Record<string, string | number> = {}) => {
    const parts = translation.split(VARS_MATCHER);

    const result = parts.map(item => {
        const match = VAR_MATCHER.exec(item);
        if (!match) {
            return item;
        }
        const varName = match[1];
        const param = params[varName];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (param == null) {
            console.warn("[react-transl8]", "Missing variable", varName, "for key", key);
            return "@{" + varName + "}";
        }

        return param;
    });

    return result.join("");
};

const fillComponents = (
    translation: string,
    key: string,
    params: Record<string, string | number> = {},
    components: Record<string, AnyComponent> = {},
) => {
    const parts = translation.split(COMPONENTS_MATCHER);

    return parts.map((text, index) => {
        const match = COMPONENT_MATCHER.exec(text);
        if (!match) {
            return text;
        }
        const component = unpack(match[1]);
        const args = (match[2].match(ARGUMENTS_MATCHER) ?? []).map(unpack).map(s => fillVariables(s, key, params));

        const Component = components[component];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!Component) {
            console.warn("[react-transl8]", "Missing component", component, "for key", key);
            return text;
        }

        // @ts-expect-error I need better types
        // eslint-disable-next-line react/no-array-index-key
        return <Component key={index} values={args} value={args[0]} />;
    });
};

export default function translate(
    translations: Translations,
    key: string,
    params: Record<string, string | number> = {},
    components: Record<string, AnyComponent> = {},
) {
    if (!key) {
        throw new Error("[react-transl8] No translation key given");
    }

    const translation = get(translations, key) as string | undefined;
    if (!translation) {
        console.warn("[react-transl8]", "Missing translation for key", key);
        return "@" + key;
    }

    const list = fillComponents(translation, key, params, components);
    const values = list.map(s => (typeof s === "string" ? fillVariables(s, key, params) : s));
    return <>{values}</>;
}
