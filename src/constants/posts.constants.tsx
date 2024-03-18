import Box from "@mui/material/Box";
import { tPosts } from "../models/post.model";
import Link from "@mui/material/Link";

export const postList: tPosts[] = [
  {
    title: 'Level Design',
    Text: <Box>Learned about the Unity Game Engine, Level design, and started to combine previously learned skills. Go experience my world in the <Link underline="hover" href="/projects">projects</Link> page, you can download for either Windows or Mac.</Box>,
    datetime: new Date(2014, 4, 11)
  },
  {
    title: 'Board Game',
    Text: <Box>To learn about teamwork and building a game from start to prototype at Full Sail University. Click on the "Star Factions" image to see the rule book in the <Link underline="hover" href="/projects">projects</Link> page and go towards the bottom of the document to find printables to build and play the game. Go read about my game in the <Link underline="hover" href="/projects">projects</Link> page.</Box>,
    datetime: new Date(2014, 0, 29)
  },
  {
    title: 'Javascript Games',
    Text: <Box>For learning basics of programming at Full Sail University I built javascript based games using the <Link underline="hover" href="https://perlenspiel.net/">Perlenspiel Game Engine</Link>. There have been updates to the games to flow better with this website, both in its previous form (Jekyll) and with the current React app that this site is built on. Go experience my games in the <Link underline="hover" href="/projects">projects</Link> page.</Box>,
    datetime: new Date(2014, 3, 30)
  },
  {
    title: 'My Portfolio Website',
    Text: <Box>This website was recently rebuilt to use modern technologies in order to give me better control over the look/feel and content. This site is built using <Link underline="hover" href="https://react.dev/">React</Link> v18 and <Link underline="hover" href="https://mui.com/">MUI</Link> v5, then it is statically served using AWS. You'll find that this website is also built to be fully responsive and handles system preference for light/dark appearance.</Box>,
    datetime: new Date(2024, 2, 18)
  },
  {
    title: 'My Jekyll Site! (deprecated)',
    Text: <Box>This site is built using <Link underline="hover" href="https://jekyllrb.com/docs/">Jekyll</Link> and hosted on AWS. I’ve modified the theme to handle the additional materials I wanted to share (javascript games I built, added my resume link, share my linkedin page, etc.). If you have any questions on how I accomplished anything on this site feel free to reach out at any of the links below. I will periodically be updating this post as I modify this site.</Box>,
    datetime: new Date(2017, 6, 26)
  },
];
