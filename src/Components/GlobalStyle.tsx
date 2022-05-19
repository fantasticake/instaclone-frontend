import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.colors.backgroundColor};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
    }
    * {
        background-color: ${(props) => props.theme.colors.backgroundColor};
        color: ${(props) => props.theme.colors.textColor};
    }
    input {
        outline:none;
        border: solid 3px ${(props) => props.theme.colors.borderColor};
        :focus {
            border-color: ${(props) => props.theme.colors.focusedBorderColor};
        }
        padding: 0 6px;
    }
    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
