// @ts-ignore
import logo from './logo.svg';
import './App.scss';
import Posts from './components/posts/posts';
import Header from './components/header/header';
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import theme from './theme';
import React from 'react';
import { postList } from './constants/post.constant';

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
