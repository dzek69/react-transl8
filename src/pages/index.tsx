import React from "react";
import { useTranslate } from "../translate/Provider";
import type { TranslateComponent } from "../translate/types";

interface SMP {
    className: string;
}

export const Strong: TranslateComponent<SMP> = ({ value, className }) => (
    <strong className={className}>{value}</strong>
);

export const Profile: TranslateComponent = ({ values, value }) => (
    <a href={value}>{value} {values[1]}</a>
);

const IndexComp = () => {
    const t = useTranslate();
    // eslint-disable-next-line new-cap
    const tr = t("advanced", { name: "Jacek" }, { strong: (props) => Strong({ ...props, className: "hi" }) });

    return (
        <div>
            x{tr}x
        </div>
    );
};

export default IndexComp;
