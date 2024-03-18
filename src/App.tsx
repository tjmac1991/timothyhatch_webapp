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
import { postList } from './constants/posts.constants';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import About from './components/about/about';
import Projects from './components/projects/projects';

enum pageName {
  POSTS = 'Posts',
  ABOUT = 'About',
  PROJECTS = 'Projects',
}

const setCurrentLocation = (pathname: string): pageName => {
    const currentLocation: string = pathname.split('/')[1];
    switch (currentLocation) {
      case 'about':
        return pageName.ABOUT
      case 'projects':
        return pageName.PROJECTS
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
        <Header pageTitle={pageTitle} />
        <Routes>
          <Route path="/" element={<Posts postList={postList} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
