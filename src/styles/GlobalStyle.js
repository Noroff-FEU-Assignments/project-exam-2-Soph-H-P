import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: ${theme.text.paragraphFont};
    }

    body {
        background-color: ${theme.colors.primaryColor};
    }

    h1, h2, h3 {
        font-family: ${theme.text.headingFont};
    }

    a {
        text-decoration: none;
        color: ${theme.colors.darkFontColor};
    }

`;

export default GlobalStyle;
