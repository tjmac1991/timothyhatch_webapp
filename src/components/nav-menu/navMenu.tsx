import { Menu, MenuItem, Link, Divider } from "@mui/material";
import { menuItems } from "../../constants/menuItems.constant";

type tNavMenuProps = {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

export default function NavMenu({open, anchorEl, handleClose}: tNavMenuProps): JSX.Element {
    return (
        <Menu
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            anchorEl={anchorEl}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            {menuItems.map((item, index) => {
                const {name, Icon, link, divider} = item;
                if(link) {
                    return (
                        <MenuItem
                            href={link}
                            component={Link}
                        >
                            {Icon && <Icon />}&nbsp;{name}
                        </MenuItem>
                    );
                } else if(divider) {
                    return (<Divider />);
                }
                return (
                    <MenuItem>
                        {name}
                    </MenuItem>
                );
            })}
        </Menu>
    );
}
