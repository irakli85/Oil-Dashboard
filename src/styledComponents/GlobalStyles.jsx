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

    body{
      width: 100%;
      height: 100%;  
      background: #E8F3FC;;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      overflow-x: hidden;
    }
    
    #root{ 
      width: 100%;
      height: 100%
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