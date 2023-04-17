import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/style/theme';




export const BigWrapper = styled.div`
  position: relative;
  height:100%;  
  display:flex;
  justify-content:center;
  overflow:auto;

  background-color: ${colors.bgPrimary};

`;


export const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  z-index: 1;

`;


export const ImageContainer = styled.div`
  display: none;

  position: absolute;
  top:0;
  left:0;
  height:100%;
  overflow-y: hidden;

  @media (${breakpoints.tablet}) {
    display: block; 
  }
  
`;

export const LineEffectWrapper = styled.div`
  position:absolute;
  height:100vh;
  overflow:hidden;
  display:none;
  max-width: ${props => props.maxWidth && props.maxWidth};


  ${props =>
    props.topLeft ?
      `
      // transform: scaleY(0);
      // transform: scaleX(-1);
      rotate: 180deg;
      top:0;
      left:0;
    `
      :
      `
      bottom:0;
      right:0;
      `
  }


@media(${breakpoints.tablet}){
  display:block;
  /* max-width: 700px; */
}


@media(${breakpoints.tablet}){
  
  /* max-width: 50vw; */
}


`


export const ImageImage = styled.img`
  height: 100%;
  object-fit: cover;
`;




export const ButtonWrapper = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
`

