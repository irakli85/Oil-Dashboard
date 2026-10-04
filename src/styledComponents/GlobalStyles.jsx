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

.vessel-map-label {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease;
}

@media (hover: hover) and (pointer: fine) {
  .vessel-map-icon:hover {
    z-index: 10000 !important;
  }

  .vessel-map-icon:hover .vessel-map-label {
    opacity: 1;
    visibility: visible;
  }
}

.vessel-map-icon:focus-visible .vessel-map-label {
  opacity: 1;
  visibility: visible;
}

`;



export default GlobalStyles;