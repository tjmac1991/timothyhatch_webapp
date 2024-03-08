import { Menu, MenuItem, Link, Divider } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

type tNavMenuProps = {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

type tMenuItems = {
    name: string;
    link?: string;
    Icon?: JSX.Element;
    divider?: boolean;
}

export default function NavMenu({open, anchorEl, handleClose}: tNavMenuProps): JSX.Element {
    const menuItems: tMenuItems[] = [
        {
            name: 'Test',
            divider: true,
        },
        {
            name: 'tjmac1991',
            link: 'https://github.com/tjmac1991',
            Icon: <GitHubIcon />,
        },
        {
            name: 'timothy-hatch',
            link: 'https://www.linkedin.com/in/timothy-hatch',
            Icon: <LinkedInIcon />,
        },
        {
            name: 't_timhatch',
            link: 'https://twitter.com/t_timhatch',
            Icon: <TwitterIcon />,
            divider: true,
        },
    ]

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
                return (
                    <>
                        {link ?  
                            <MenuItem
                                href={link}
                                component={Link}
                            >
                                {Icon && Icon}&nbsp;{name}
                            </MenuItem>
                        :
                            <MenuItem>
                                {name}
                            </MenuItem>
                        }
                        {divider && <Divider />}
                    </>
                );
            })}
            <MenuItem onClick={handleClose}>Test</MenuItem>
        </Menu>
    );
}
