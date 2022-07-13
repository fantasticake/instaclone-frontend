import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
        --header-height: 60px;
    }

    body {
        background-color: ${(props) => props.theme.colors.backgroundColor};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
    }
    * {
        box-sizing: border-box;
        background-color: ${(props) => props.theme.colors.backgroundColor};
        color: ${(props) => props.theme.colors.textColor};
    }
    span {
        background-color:transparent;
    }
    input {
        padding: 0 6px;
        outline:none;
        border: solid 1px ${(props) => props.theme.colors.borderColor};
        :focus {
            border-color: ${(props) => props.theme.colors.focusedBorderColor};
        }
        ::placeholder {
            color: ${(props) => props.theme.colors.textColor};
            opacity: 0.5;
        }
    }
    a {
        text-decoration: none;
    }
    button {
        border: none;
        cursor: pointer;
    }
`;

export default GlobalStyle;
