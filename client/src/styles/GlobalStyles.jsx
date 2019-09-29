import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.typography.base.fontFamily};
    color: ${({ theme }) => theme.palette.typography.light};
    background-color: #1A1A1A;
    min-height: 100vh;
    font-size: 14pt;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.title.fontFamily};
    font-weight: 600;

    svg {
      vertical-align: middle;
      margin-right: 0.3em;
      margin-top: -0.5%;
    }
  }

  h1, h2 {
    font-weight: 700;
  }

  h3 {
    color: ${props => props.theme.palette.primary.dark}
  }
`;

export default GlobalStyles;
