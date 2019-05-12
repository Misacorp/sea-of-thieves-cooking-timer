import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.typography.base.fontFamily};
    color: ${({ theme }) => theme.palette.typography.dark};
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
