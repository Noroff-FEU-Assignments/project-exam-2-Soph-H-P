import { createGlobalStyle } from 'styled-components';
import theme from './theme';


const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: ${theme.text.paragraphFont};
    }

    html, body  {
        min-height: 100vh;
    }
    
    #root {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
    .App {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 0px 8px;
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

    @media (max-width: 700px) {
        .App {
            padding: 0px;
        }
    }

`;

export default GlobalStyle;
