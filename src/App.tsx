// @ts-ignore
import logo from './logo.svg';
import './App.scss';
import Posts from './components/posts/posts';
import Header from './components/header/header';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import theme from './theme';
import React, { useEffect, useState } from 'react';
import { postList } from './constants/post.constant';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from 'react-router-dom';
import About from './components/about/about';

enum pageName {
  POSTS = 'Posts',
  ABOUT = 'About',
}

const setCurrentLocation = (pathname: string): pageName => {
    const currentLocation: string = pathname.split('/')[1];
    switch (currentLocation) {
      case 'about':
        return pageName.ABOUT
      default:
        return pageName.POSTS
    }
}

function App() {
  const location = useLocation();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [pageTitle, setPageTitle] = useState<string>('Posts');

  const themeMode = React.useMemo(
    () => prefersDarkMode ? 'dark' : 'light',
    [prefersDarkMode]
  )

  useEffect(() => {
    setPageTitle(setCurrentLocation(location.pathname))
  }, [location])

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

        <Header pageTitle={pageTitle} />
          <Routes>
            <Route path="/" element={<Posts postList={postList} />} />
            <Route path="/about" element={<About />} />
          </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
