import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    /* Box sizing rules */
    *,
    *::before,
    *::after {   
    box-sizing: border-box;
    /* font-family: 'Roboto', sans-serif; */
    }
    /* html { 
    font-size: 10px; 
    } */
    /* Remove default padding */
    ul[class],
    ol[class] {
    padding: 0;
    }
    /* Remove default margin */
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    ul[class],
    ol[class],
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
    margin: 0;
    }
    /* Set core body defaults */
    body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    font-family: 'Roboto', sans-serif;
    }
    /* Remove list styles on ul, ol elements  */
    /* ul,
    ol {
    list-style: none;
    } */
    /* A elements that don't have a class get default styles */
    a:not([class]) {
    text-decoration:none;
    }
    /* A elements don't turn purple once they've been visited*/
    a:visited {
        color:inherit;
    }
    /* Make images easier to work with */
    img {
    max-width: 100%;
    display: block;
    }
    /* Natural flow and rhythm in articles by default */
    article > * + * {
    margin-top: 1em;
    }
    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
    font: inherit;
    }
    /* Remove all animations and transitions for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    }
`

export default GlobalStyle