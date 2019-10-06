const baseFonts = ['Manjari', 'Open Sans', 'Roboto', 'Arial', 'sans-serif'];

export default {
  palette: {
    blue: {
      100: '#F2F9FF',
      200: '#CDDFEE',
      300: '#B4CCE1',
      400: '#95B2CC',
      500: '#7998B2',
      600: '#557B9B',
      700: '#3C6282',
      800: '#2A4A67',
      900: '#274056',
    },
    yellow: {
      100: '#FFF9E9',
      200: '#FFF1CB',
      300: '#FFE29A',
      400: '#FFD365',
      500: '#F7B31C',
      600: '#D49200',
      700: '#9E6D00',
      800: '#745000',
      900: '#4D3500',
    },
    primary: {
      main: '#efd71f',
      light: '#fff8bf',
      dark: '#59563d',
    },
    secondary: {
      main: '#FFE2BC',
      light: '#FFF9F0',
      dark: '#C79349',
    },
    success: {
      main: '#319F4A',
      light: '#55D370',
      dark: '#257134',
    },
    error: {
      main: '#D34E41',
      light: '#FF7365',
      dark: '#953930',
    },
    disabled: {
      main: '#7A7A7A',
    },
    typography: {
      light: '#FFFFFF',
      dark: '#020202',
    },
  },
  typography: {
    base: {
      fontFamily: baseFonts.join(','),
    },
    title: {
      fontFamily: [...baseFonts].join(','),
    },
  },
  emoji: '🥥',
  transition: {
    duration: '0.2s',
    timingFunction: 'ease-out',
  },
};
