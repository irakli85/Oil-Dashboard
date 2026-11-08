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

.vessel-map-icon {
  overflow: visible !important;
}

.vessel-map-marker {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--marker-color);
  pointer-events: auto;
}

.vessel-map-marker::before,
.vessel-map-marker::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  border: 2px solid var(--marker-color);
  border-radius: 50%;
  content: '';
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.7);
  animation: vessel-map-ring-pulse 2s ease-out infinite;
}

.vessel-map-marker::after {
  animation-delay: 1s;
}

.vessel-map-direction {
  position: relative;
  z-index: 1;
  display: block;
  width: 24px;
  height: 22px;
}

.vessel-map-direction path {
  fill: var(--marker-color);
  stroke: #fff;
  stroke-linejoin: round;
  stroke-width: 1.25px;
}

@keyframes vessel-map-ring-pulse {
  0% {
    opacity: 0.65;
    transform: translate(-50%, -50%) scale(0.7);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.8);
  }
}

.vessel-map-label {
  position: absolute;
  top: 50%;
  left: calc(50% + 17px);
  padding: 4px 7px;
  border-radius: 5px;
  background: rgba(17, 24, 39, 0.88);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.1;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-50%);
  transition: opacity 0.15s ease;
  white-space: nowrap;
  pointer-events: none;
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

@media (prefers-reduced-motion: reduce) {
  .vessel-map-label,
  .vessel-map-marker::before,
  .vessel-map-marker::after {
    transition: none;
    animation: none;
  }
}

`;



export default GlobalStyles;