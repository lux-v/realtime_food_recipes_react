import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { breakpoints, colors, fonts } from './theme';
import {
  Form as FormFormik,
  Field as FieldFormik,
  ErrorMessage as ErrorMessageFormik,
} from 'formik';
import { ReactComponent as DeleteIcon } from '../../assets/img/delete-icon.svg';
import { ReactComponent as XIcon } from '../../assets/img/x-icon.svg';
import Nosort from '../../assets/img/sort.svg';
import Ascending from '../../assets/img/sort-ascending.svg';
import Descending from '../../assets/img/sort-descending.svg';
import { ReactComponent as Trash } from '../../assets/img/delete.svg';
import { ReactComponent as Edit } from '../../assets/img/edit.svg';

export const Form = styled(FormFormik)`
  width: 272px;
  margin: 0 auto;
    width:100%;

  @media (${breakpoints.tablet}) {
    margin: unset;

    ${(props) =>
    props.isCentered === true &&
    `
      margin: 0 auto;
  `}

    ${(props) =>
    props.profile === true &&
    `
      width: 572px;
  `}
  }
`;

export const FormLabel = styled.label`
  display: block;
  color: ${colors.textPrimary};
  font-family: ${fonts.secondary};
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 8px;

  font-style: ${props => props.italic ? "italic" : "default"};
  
`;

export const FormIcon = styled.img`
    width:35px;
    height:35px;
    
    position:absolute;
    top:5px;
    left:-15px;

`;

export const FormRow = styled.div`
  position:relative;

  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
 

  ${(props) =>
    props.right ?
      `
       display:flex;
       justify-content:flex-end;
     `
      : props.center &&
      `
        display:flex;
        justify-content: center;
      `

  }

  @media (${breakpoints.tablet}) {
    margin-bottom: 24px;
    ${(props) =>
    props.profileButton &&
    `
      width: 185px;
  `}
  }

  ${(props) =>
    props.buttonRow &&
    `
      display: flex;
      flex-direction: column;
      justify-content: center;
  `}

  ${(props) =>
    props.isCriteria &&
    `
      max-width: 480px;
      width: 100%;
  `}
`;

export const TwoInRow = styled.div`
  width: 272px;
  @media (${breakpoints.tablet}) {
    width: 572px;
    display: flex;
    justify-content: space-between;
  }

  ${(props) =>
    props.buttonRow &&
    `
      padding: 32px 0 70px 0;
      display: flex;
      flex-direction: column;
      gap: 16px;

      @media (${breakpoints.tablet}) {
        display: none;
      }
  `}

  ${(props) =>
    props.isCriteria &&
    `
      display: flex;
      flex-direction: column;


      @media (${breakpoints.tablet}) {
        flex-direction: row;
        gap: 32px;
        width: 100%;
      }
      @media (${breakpoints.desktop}) {
        gap: 24px;

      }
  `}
`;
export const DeleteWrapper = styled.div`
  width: 272px;
  display: flex;
  justify-content: space-between;

  @media (${breakpoints.tablet}) {
    width: 572px;
  }
`;

const FieldStyleType1 = css`
  width:${(props) =>
    props.width ? props.width : '272px'
  };
  height: 48px;
  padding: 16px 24px;
  border: 1px solid ${colors.textSecondary};
  border-radius: 8px;

  outline: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  font-family: ${fonts.secondary};

  ${({ error }) =>
    error &&
    css`
      outline: none;
      border: 2px solid ${colors.primary};
    `}

  @media (${breakpoints.tablet}) {
    height: 56px;
    width:${(props) =>
    props.width ? props.width : '572px'
  };
  
  }

  @media (${breakpoints.desktop}) {
    font-size: 16px;
    &:focus {
      border: 2px solid ${colors.link};
    }
  }
`;

const FieldStyleType2 = css`
  width: ${(props) => props.width || `272px`};
  height: 48px;
  padding: 16px 24px;
  border:0;
  border-bottom: 1px solid ${colors.textSecondary};
  background-color: unset;

  outline: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  font-family: ${fonts.secondary};

  ${({ error }) =>
    error &&
    css`
      outline: none;
      border-bottom: 2px solid ${colors.primary};
    `}

  @media (${breakpoints.tablet}) {
    height: 56px;
    width: ${(props) => props.width || `572px`};
  }

  @media (${breakpoints.desktop}) {
    font-size: 16px;
    &:focus {
      border-bottom: 2px solid ${colors.link};
    }
  }
`;

export const PasswordIcon = styled.img`
  position: relative;
  top: -31.8px;
  left: 241px;
  cursor: pointer;

  @media (${breakpoints.tablet}) {
    left: 533px;
  }
`;

export const Field = styled(FieldFormik)`
  ${(props) =>
    props.isSecondary ?
      FieldStyleType2 : FieldStyleType1
  };

`;

export const Select = styled.select`
  ${(props) =>
    props.isSecondary ?
      FieldStyleType2 : FieldStyleType1
  };

  height: 56px;
  ${(props) =>
    props.value === '' &&
    `
    color: ${colors.iconsPrimary};
  `}

  /* @media (${breakpoints.tablet}) {
    width: 572px;
  } */
`;

export const SmallSelect = styled(Select)`
  width: 272px;

  @media (${breakpoints.tablet}) {
    width: 255px;
  }
`;

export const SmallField = styled(Field)`
  width: 272px;

  @media (${breakpoints.tablet}) {
    width: 255px;
  }

  ${(props) =>
    props.criteria === 'isCriteria' &&
    `
      width: 145px; 
    `}

  ${(props) =>
    props.criteria === 'isAddCriteria' &&
    props.isedit === 0 &&
    `
        height: 42px; 
        width: 130px;
        border: none;
        pointer-events:none;
        background-color: white;
      `}

  ${(props) =>
    props.criteria === 'isAddCriteria' &&
    props.isedit === 1 &&
    `
        height: 42px; 
        width: 100%;
        border: 1px solid ${colors.textSecondary};
        pointer-events: auto;
    `}

  ${({ error }) =>
    error &&
    css`
      outline: none;
      border: 2px solid ${colors.primary};
    `}
`;

export const CriteriaSelect = styled(Select)`
  width: 272px;

  @media (${breakpoints.tablet}) {
    width: 255px;
  }

  @media (${breakpoints.desktop}) {
    width: 100%;
  }
`;

export const Option = styled.option`
  color: ${colors.textPrimary};
`;

export const ErrorMesagge = styled(ErrorMessageFormik)`
  font-size: 12px;
  color: ${colors.primary};
  padding-top: 8px;
  font-weight: 400;

  font-family: ${fonts.secondary};
`;

export const RequiredSpan = styled.span`
  //margin-left: 8px;
  font-size: inherit;
  color: ${colors.primary};
`;

export const TextArea = styled(Field).attrs({ component: 'textarea' })`
  ${FieldStyleType1}
  margin-top: 15.5px;
  resize: none;
  height: 168px;

  @media (${breakpoints.tablet}) {
    width: 572px;
    height: 176px;
  }
`;
export const LinkDelete = styled(Link)``;

export const Delete = styled(DeleteIcon)`
  width: 70px;
  height: auto;
  cursor: pointer;
  path {
    fill: ${colors.textSecondary};
  }

  ${(props) =>
    props.isblack === 'isBlack' &&
    `
  path {
    fill: ${colors.textPrimary};
  } 
  `}
`;

export const PasswordText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${colors.link};
  cursor: pointer;
  margin-top: -9px;
  margin-bottom: 30px;

  @media (${breakpoints.tablet}) {
    line-height: 20px;
  }
`;

// Table

const MutualIconStyle = css`
  padding: 18px 50px 18px 16px;
  background-size: 24px 24px;
`;

export const TableColumn = styled.th`
  ${(props) =>
    props.nosort === true &&
    `
      background: ${colors.columnBackground} 
      url(${Nosort})
      no-repeat 
      100%
      center;
      ${MutualIconStyle};      
    `}

  ${(props) =>
    props.ascending === true &&
    `
    background: ${colors.columnBackground}
      url(${Ascending})
      no-repeat 
      100%
      center;
      ${MutualIconStyle};  
    `}

  ${(props) =>
    props.descending === true &&
    `
    background: ${colors.columnBackground}
      url(${Descending})
      no-repeat 
      100%
      center;
      ${MutualIconStyle};  
    `}

  ${(props) =>
    props.checkbox === true &&
    `
      padding: 20px;
    `}


${(props) =>
    props.isFirstname === true &&
    `
        min-width: 99px;
        width: 99px;
        @media (${breakpoints.tablet}) {
          width: 195px;
        }
        @media (${breakpoints.desktop}) {
          width: calc((100%-218px)/3);
        }
      `}

    ${(props) =>
    props.isLastname === true &&
    `
        min-width: 78px;
        width: 78px;
        @media (${breakpoints.tablet}) {
          width: 170px;
        }
        @media (${breakpoints.desktop}) {
          width: calc((100%-218px)/3);
        }
      `}

    ${(props) =>
    props.isEmail === true &&
    `
        width: 184px;
        @media (${breakpoints.tablet}) {
          width: 236px;
        }
        @media (${breakpoints.desktop}) {
          width: calc((100%-218px)/3);
        }
      `}

    ${(props) =>
    props.isYear === true &&
    `
        width: 92px;
        @media(${breakpoints.desktop}) {
          width: 82px;
        }
      `}

    ${(props) =>
    props.isAction === true &&
    `
        width: 71px;
        @media(${breakpoints.tablet}) {
          width: 102px;
        }
        @media(${breakpoints.desktop}) {
          width: 136px;
        }
      `}

${(props) =>
    props.isAttendance === true &&
    `
        width: 180px;
        @media(${breakpoints.tablet}) {
          width: 232px;
        }
        @media(${breakpoints.desktop}) {
          width: 182px;
        }
      `}

${(props) =>
    props.isQuiz === true &&
    `
        width: 57px;
        @media(${breakpoints.tablet}) {
          width: 92px;
        }
        @media(${breakpoints.desktop}) {
          width: 122px;
        }
      `}

  height: 54px;
  padding: 18px 12px;
  color: ${colors.textSecondary};
  text-align: left;
  background-color: ${colors.columnBackground};

  &:hover {
    color: ${colors.columnHover};
    cursor: pointer;
  }

  @media (${breakpoints.tablet}) {
    height: 56px;
  }

  @media (${breakpoints.desktop}) {
    height: 56px;
  }
`;

export const TableCell = styled.td`
  width: inherit;
  height: 50px;
  padding: 18px 12px;
  background-color: ${colors.bgPrimary};
  margin: 0;
  border-top: 1px solid ${colors.tableBorder};
  @media (${breakpoints.desktop}) {
    padding: 13px 16px;
    background-color: ${colors.bgSecondary};
  }
`;

export const TableHead = styled.thead`
  &:first-child :first-child {
    border-radius: 12px 0 0 0;
  }
  /*@media (${breakpoints.tablet}) {
    &:first-child :last-child {
      border-radius: 0 12px 0 0;
    }
  }*/
`;

export const TableBody = styled.tbody``;

export const TableTable = styled.table`
  border: 1px solid ${colors.tableBorder};
  border-radius: 12px 0 0 12px;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  max-width: 552px;
  display: block;
  overflow-x: auto;
  //white-space: nowrap;
  margin: 24px 0;
  @media (${breakpoints.tablet}) {
    border-radius: 12px;
    width: 795px;
    max-width: 100%;
  }
  @media (${breakpoints.desktop}) {
    width: 100%;
  }
`;

export const TableRow = styled.tr``;

export const NumberPicker = styled(Select)`
  width: auto;
  height: 40px;
  font-size: 15px;
  padding: 11px 36px 11px 12px;
  font-style: normal;
  font-weight: 400;
  background-color: ${colors.secondary};
  &:focus {
    border: 1px solid ${colors.textSecondary};
  }
  display: inline-block;
  vertical-align: middle;
  margin: 0 8px;
  left: 0;
  @media (${breakpoints.tablet}) {
    height: 48px;
    padding: 15px 36px 15px 12px;
    display: inline-block;
  }
`;

const iconstyle = css`
  width: 24px;
  height: 24px;
`;

export const IconNosort = styled(Nosort)`
  ${iconstyle};
`;

export const IconAscending = styled(Ascending)`
  ${iconstyle};
`;

export const IconDescending = styled(Descending)`
  ${iconstyle};
`;

// Search

export const SearchWrapper = styled.div`
  width: 275px;
  height: 40px;
  align-items: center;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
  margin-top: 5px; // Important hotfix

  @media (${breakpoints.tablet}) {
    width: calc(624px - 56px);
    height: 48px;
    margin: 0;
  }
  @media (${breakpoints.desktop}) {
    width: 100%;
  }
`;

export const SearchLabel = styled.label`
  width: auto;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  font-style: normal;
  font-weight: 400;
  font-family: ${fonts.secondary};
  display: inline-block;
  text-align: left;
`;

// Navigation

export const NavigationLine = styled.div`
  width: 272px;
  background-color: ${colors.bgSecondary};
  border-radius: 8px;
  height: 48px;
  vertical-align: middle;
  padding: 14px 8px;
  &:last-child {
    margin-right: 0;
  }
  @media (${breakpoints.tablet}) {
    display: inline-block;
    //width: 336px;
  }
  @media (${breakpoints.desktop}) {
    width: auto;
  }
`;

export const NavigationWrappper = styled.div`
  width: 271px;
  @media (${breakpoints.tablet}) {
    width: calc(632px - 56px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (${breakpoints.desktop}) {
    width: 100%;
    padding: 0;
  }
`;

export const ShowingEntries = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: inherit;
  left: 0;

  ${(props) =>
    props.clicked === 1 &&
    `
      display: none;
    `}

  @media (${breakpoints.tablet}) {
    ${(props) =>
    props.clicked === 1 &&
    `
      display: flex;
    `}
  }
`;

export const NavigationLabel = styled.label`
  width: auto;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
  font-style: normal;
  font-weight: 400;
  font-family: ${fonts.secondary};
  //display: inline-block;
`;

export const SearchBarOverlay = styled.div`
  border: 1px solid ${colors.textPrimary};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  width: 272px;
  background-color: white;
  ${(props) =>
    props.clicked === 1 &&
    `
      display: none;
    `}
  @media (${breakpoints.tablet}) {
    display: flex;
    width: 250px;
  }
`;

export const X = styled(XIcon)`
  display: inline-block;
  fill: ${colors.textSecondary};
  height: 14px;
  width: auto;
  margin: 0;
  padding: 0;
  right: 0;
  text-align: right;
  margin: 14px 10px 15px 0;
  @media (${breakpoints.tablet}) {
    display: none;
  }
`;

export const Functions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 64px;
`;

export const TrashCan = styled(Trash)`
  fill: ${colors.iconsPrimary};
  width: 14px;
  height: 18px;
  cursor: pointer;
`;

export const EditIcon = styled(Edit)`
  fill: ${colors.iconsPrimary};
  width: 18px;
  height: 18px;
  cursor: pointer;
`;



// logo login and signup
export const LogoContainer = styled.div`
  display:flex;
  justify-content:center;

  margin-bottom: 32px;

    @media (${breakpoints.desktop}) {
      margin-bottom: 64px;
    }
`;

export const LogoImg = styled.img`
  height: 70px;
  cursor:pointer;

  @media (${breakpoints.tablet}) {
    height:100px;
  }

  @media (${breakpoints.desktop}) {
    height:155px;
  }
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





export const SignUpWrapper = styled.div`
  position: relative;
  min-height:100%;
  overflow:auto;
  display:flex;
  justify-content:center;

  padding: 20px;
  background-color: ${colors.bgPrimary};

`;


export const FormWrapper = styled.div`
  z-index: 1;
  margin:auto;
`;

export const ButtonWrapper = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
`


export const ImageContainer = styled.div`
  display: none;
  height:100%;
  overflow-y: hidden;

  position: absolute;
  top:0;
  ${props=>props.login ?"left:0":"right:0"};

  @media (${breakpoints.tablet}) {
    display: block; 
  }
  
`;



export const LineEffectWrapper = styled.div`
  position:absolute;

  height:100vh;
  overflow:hidden;

  max-width: ${props => props.maxWidth && props.maxWidth};


  ${props=>props.login!==true &&`
      bottom:0;
      left:0;
    `
}



  ${props =>
    props.topLeft ?
      `
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






`

export const ImageImage = styled.img`
  height: 100%;
  object-fit: cover;

  ${props=>props.login!==true &&`
    transform: scaleX(-1);
  `}

`;


