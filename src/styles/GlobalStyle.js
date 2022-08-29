import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: ${theme.text.paragraphFont};
    }

`;

export default GlobalStyle;
