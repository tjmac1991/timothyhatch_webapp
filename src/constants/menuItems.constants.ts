import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type tMenuItems = {
    name: string;
    link?: string;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
    divider?: boolean;
}

export const menuItems: tMenuItems[] = [
    {
        name: 'Posts',
        link: '/'
    },
    {
        name: 'About',
        link: '/about',
    },
    {
        name: 'Projects',
        link: '/projects',
    },
    {
        name: 'divider',
        divider: true,
    },
    {
        name: 'tjmac1991',
        link: 'https://github.com/tjmac1991',
        Icon: GitHubIcon,
    },
    {
        name: 'timothy-hatch',
        link: 'https://www.linkedin.com/in/timothy-hatch',
        Icon: LinkedInIcon,
    },
    {
        name: 't_timhatch',
        link: 'https://twitter.com/t_timhatch',
        Icon: TwitterIcon,
    },
];
