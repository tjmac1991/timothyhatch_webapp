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
import React, { useEffect } from 'react';
import { postList } from './constants/posts.constants';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import About from './components/about/about';
import Projects from './components/projects/projects';
import ShopCostSupport from './components/shopcost-support/shopCostSupport';
import ShopCostPrivacy from './components/shopcost-privacy/shopCostPrivacy';
import { publicPages, siteOrigin } from './publicPages';

enum pageName {
  POSTS = 'Posts',
  ABOUT = 'About',
  PROJECTS = 'Projects',
  SHOPCOST_SUPPORT = 'ShopCost Support',
  SHOPCOST_PRIVACY = 'ShopCost Privacy Policy',
}

const setCurrentLocation = (pathname: string): pageName => {
    const currentLocation: string = pathname.split('/')[1];
    switch (currentLocation) {
      case 'about':
        return pageName.ABOUT
      case 'projects':
        return pageName.PROJECTS
      case 'shopcost-support':
        return pageName.SHOPCOST_SUPPORT
      case 'shopcost-privacy':
        return pageName.SHOPCOST_PRIVACY
      default:
        return pageName.POSTS
    }
}

function App() {
  const location = useLocation();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const pageTitle = setCurrentLocation(location.pathname);

  const themeMode = React.useMemo(
    () => prefersDarkMode ? 'dark' : 'light',
    [prefersDarkMode]
  )

  useEffect(() => {
    const page = publicPages.find(page => page.path === location.pathname.replace(/\/$/, '') || (page.path === '/' && location.pathname === '/'));
    if (!page) return;
    document.title = `${page.title} | Timothy Hatch`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${siteOrigin}${page.path}`;
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
          <Route path="/shopcost-support" element={<ShopCostSupport />} />
          <Route path="/shopcost-privacy" element={<ShopCostPrivacy />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
