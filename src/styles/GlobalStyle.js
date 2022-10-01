import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: ${theme.text.paragraphFont};
    }

    html, body  {
        min-height: 100vh;
        font-size: 16px;
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

    .ant-btn:hover, .ant-btn:focus, .ant-btn:active {
        color: ${theme.colors.brightWhite} ;
        background: ${theme.colors.darkFontColor} ;
    }

    .ant-btn.ant-btn-ghost.ant-btn-dangerous {
        background: none;
    }
    .ant-btn.ant-btn-ghost.ant-btn-dangerous:hover {
        background: ${theme.colors.errorColor} ;
    }

    @media (max-width: 700px) {
        .App {
            padding: 0px;
        }
    }


      @media (max-width: 500px) {
        html, body  {
            font-size: 14px;
        }

        .ant-picker-datetime-panel {
          flex-direction: column;
        }

        .ant-space-item > .ant-input.ant-input-status-success {
            font-size: 16px !important;
        }   
      }

`;

export default GlobalStyle;
