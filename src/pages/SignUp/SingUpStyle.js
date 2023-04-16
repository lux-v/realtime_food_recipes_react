import styled from 'styled-components';
import { breakpoints, colors, fonts } from '../../lib/style/theme';
import { Link } from 'react-router-dom';



export const BigWrapper = styled.div`

  position: relative;
  height:100%;

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


export const LogoContainer = styled.div`
  display:flex;
  justify-content:center;
    @media (${breakpoints.desktop}) {
      margin-bottom: 32px;
    }
`;

export const LogoImg = styled.img`

  height: 100px;

  @media (${breakpoints.tablet}) {
    height:145px;
  }


  @media (${breakpoints.desktop}) {
    height:185px;
  }
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



export const BlueLink = styled(Link)`
  color: ${colors.link};
  
  font-size: 14px;
  font-family: ${fonts.secondary};
  font-style: italic;
  font-weight: 400;
  line-height: 17px;

  @media (${breakpoints.tablet}) {
    font-size: 16px;
  }
`;


export const ButtonWrapper = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
`

