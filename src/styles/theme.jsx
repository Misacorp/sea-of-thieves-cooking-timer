const baseFonts = ['Roboto', 'Arial', 'sans-serif'];

export default {
  palette: {
    primary: {
      main: '#74c1f7',
      light: '#D4DBE0',
      dark: '#439bd9',
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
      fontFamily: ['Montserrat', ...baseFonts].join(','),
    },
  },
  emoji: '🥥',
  transition: {
    duration: '0.2s',
    timingFunction: 'ease-out',
  },
  appDrawer: {
    width: {
      mobile: {
        open: '90vw',
        closed: '0',
      },
      desktop: {
        open: '240px',
        closed: '0',
      },
    },
  },
};
