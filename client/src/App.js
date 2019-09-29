import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import WebFont from 'webfontloader';

import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

import Main from './components/Main';

WebFont.load({
  google: {
    families: ['Manjari:100,400,700', 'serif'],
  },
});

const devBasename = '/';
const prodBasename = '/sea-of-thieves-cooking-timer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <BrowserRouter
          basename={
            process.env.NODE_ENV === 'development' ? devBasename : prodBasename
          }
        >
          <Main />
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
