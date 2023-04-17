import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/style/theme';


export const BigWrapper = styled.div`
  position: relative;
  height:100%;
  overflow:auto;
  display:flex;
  justify-content:center;

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

  right:0;
  height:100%;
  overflow-y: hidden;

  @media (${breakpoints.tablet}) {
    display: block; 
  }
  
`;

export const LineEffectWrapper = styled.div`
  position:absolute;
  bottom:0;
  left:0;
  height:100vh;
  overflow:hidden;
`

export const ImageImage = styled.img`
  height: 100%;
  transform: scaleX(-1);
  object-fit: cover;
`;






export const ButtonWrapper = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
`

