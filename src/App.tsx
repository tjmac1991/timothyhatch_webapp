// @ts-ignore
import logo from './logo.svg';
import './App.scss';
import Posts from './components/posts/posts';
import { tPosts } from './models/post.model';
import Header from './components/header/header';
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import theme from './theme';
import React from 'react';

const postList: tPosts[] = [
  {
    title: 'Level Design',
    text: 'Learned about the Unity Game Engine, Level design, and started to combine previously learned skills. Go experience my world in the labs page, you can download for either Windows or Mac.',
    datetime: new Date(2017, 10, 27)
  },
  {
    title: 'Board Game',
    text: 'To learn about teamwork and building a game from start to prototype at Full Sail University. Click on the rule book in the labs page and go towards the bottom of the document to find printables to build and play the game. Go read about my game in the labs page.',
    datetime: new Date(2017, 10, 27)
  },
  {
    title: 'Javascript Games',
    text: 'For learning basics of programming at Full Sail University I built javascript based games using the Perlenspiel Game Engine. I have updated the games to flow better with the Jekyll format that this site is built on. Go experience my games in the labs page.',
    datetime: new Date(2017, 6, 26)
  },
  {
    title: 'Level Design',
    text: 'Test',
    datetime: new Date(2017, 10, 27)
  },
];

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const themeMode = React.useMemo(
    () => prefersDarkMode ? 'dark' : 'light',
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline />
      <Box className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}

        <Header />
        <Posts postList={postList} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
