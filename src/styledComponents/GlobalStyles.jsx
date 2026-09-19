import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border: none;
      font-family: 'Noto Sans Georgian', sans-serif;
      font-size: 62.5%;
    }

    html {
      scroll-behavior: smooth;
    }

    body{
      width: 100%;
      min-height: 100vh;
      background: #E8F3FC;
      padding: 2rem;
      overflow-x: hidden;
    }
    
    #root{ 
      width: 100%;
      min-height: 100vh;
    }

    @media (max-width: 768px) {
      html {
        font-size: 56.25%;
      }

      body {
        padding: 1rem;
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }

    .active{
    border: 3px solid #1aac83;
    border-radius: 5px 5px 0 0;
    border-bottom: none !important;
    background-color: #fff !important;
}

`;



export default GlobalStyles;