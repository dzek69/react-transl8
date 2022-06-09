import type React from "react";

interface Translations extends Record<string, string | Translations> {}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentClass | React.FC<any>;

type TranslateFn = (
    key: string,
    params?: Record<string, string | number>,
    components?: Record<string, AnyComponent>
    // eslint-disable-next-line no-undef
) => JSX.Element | string;

interface TranslateProps {
    values: string[];
    value: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type TranslateComponent<ExtraProps extends object = {}> = React.FC<TranslateProps & ExtraProps>;

export type {
    Translations,
    AnyComponent,
    TranslateFn,
    TranslateComponent,
};
