import { SvgIcon } from "@mui/material";
import { ReactElement } from "react";
import { iIconProps } from "../../models/iconProp.model";
import MongoIcon from "./mongodb-icon-1.svg?react";

export default function MongoDbLogo({className}: iIconProps): ReactElement {
    return (
        <SvgIcon className={className}>
            <MongoIcon />
        </SvgIcon>
    );
}
