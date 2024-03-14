import { ReactElement } from "react";
import { iIconProps } from "../../models/iconProp.model";
import { SvgIcon } from "@mui/material";
import TypescriptIcon from "./typescript.svg?react";

export default function TypescriptLogo({className}: iIconProps): ReactElement {
    return (
        <SvgIcon className={className}>
            <TypescriptIcon />
        </SvgIcon>
    );
}
