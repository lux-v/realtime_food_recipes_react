import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { breakpoints, colors, fonts, border } from "./theme";
import {
  Form as FormFormik,
  Field as FieldFormik,
  ErrorMessage as ErrorMessageFormik,
} from "formik";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
import { ReactComponent as XIcon } from "../../assets/img/x-icon.svg";
import Nosort from "../../assets/img/sort.svg";
import Ascending from "../../assets/img/sort-ascending.svg";
import Descending from "../../assets/img/sort-descending.svg";
import { ReactComponent as Trash } from "../../assets/img/delete.svg";
import { ReactComponent as Edit } from "../../assets/img/edit.svg";

export const LoginHeadText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: ${({ theme }) => theme.primaryMain};
  margin-bottom: 24px;
  font-family: ${fonts.primary};
`;

export const EnterCredentialsText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: ${({ theme }) => theme.grey500 || theme.primaryLight};
  margin-bottom: 24px;
  font-family: ${fonts.primary};
`;

export const Form = styled(FormFormik)`
  width: 272px;
  margin: 0 auto;
  width: 100%;

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
  color: ${({ theme }) => theme.textPrimary};
  font-family: ${fonts.secondary};
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 8px;

  font-style: ${(props) => (props.italic ? "italic" : "default")};
`;

export const FormIcon = styled.img`
  width: 35px;
  height: 35px;

  position: absolute;
  top: 5px;
  left: -15px;
`;

export const FormRow = styled.div`
  position: relative;

  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  ${(props) =>
    props.right
      ? `
       display:flex;
       justify-content:flex-end;
     `
      : props.center &&
      `
        display:flex;
        justify-content: center;
      `}

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
    props.isIngredient &&
    `
      max-width: 480px;
      width: 100%;
  `}
`;

export const TwoInRow = styled.div`
  width: ${(props) => props.width || `272px`};

  display: ${({ flex }) => (flex ? "flex" : "block")};
  justify-content: space-between;
  gap: 10px;

  @media (${breakpoints.tablet}) {
    width: ${(props) => props.width || `572px`};
    display: flex;
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
    props.isIngredient &&
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
  width: ${(props) => (props.width ? props.width : "272px")};

  height: 48px;
  padding: 0 24px;
  border: 1px solid
    ${({ theme, textSecondary }) =>
    textSecondary ? theme.white : theme.textPrimary};
  border-radius: ${border.borderRadius};

  outline: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  font-family: ${fonts.secondary};

  ${({ error, theme }) =>
    error &&
    css`
      outline: none;
      border: 2px solid ${theme.errorDark};
    `}

  @media (${breakpoints.tablet}) {
    width: ${(props) => (props.width ? props.width : "572px")};
  }

  @media (${breakpoints.desktop}) {
    font-size: 16px;
    &:focus {
      border: 2px solid ${({ theme }) => theme.primaryDark};
    }
  }
`;

const FieldStyleType2 = css`
  width: ${(props) => props.width || `272px`};
  height: 48px;
  padding: 0 24px;
  border: 0;
  border-bottom: 1px solid
    ${({ theme, textSecondary }) =>
    textSecondary ? theme.white : theme.textPrimary};
  background-color: unset;

  color: ${({ textSecondary, theme }) =>
    textSecondary ? theme.white : theme.textPrimary};

  outline: none;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  font-family: ${fonts.secondary};

  ${({ error, theme }) =>
    error &&
    css`
      outline: none;
      border-bottom: 2px solid ${theme.errorDark};
    `}

  @media (${breakpoints.tablet}) {
    width: ${(props) => props.width || `572px`};
  }

  @media (${breakpoints.desktop}) {
    font-size: 16px;
    &:focus {
      border-bottom: 2px solid ${({ theme }) => theme.primaryDark};
    }
  }
`;

export const PasswordIcon = styled.img`
  position: relative;
  top: -31.8px;
  left: 241px;
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  @media (${breakpoints.tablet}) {
    left: 533px;
  }
`;

export const InputField = styled.input`
  ${(props) => (props.isSecondary ? FieldStyleType2 : FieldStyleType1)};
`;

export const Field = styled(FieldFormik)`
  ${(props) => (props.isSecondary ? FieldStyleType2 : FieldStyleType1)};
`;

export const Select = styled.select`
  ${(props) => (props.isSecondary ? FieldStyleType2 : FieldStyleType1)};

  ${(props) =>
    props.value === "" &&
    `
    color: ${props.theme.iconsPrimary};
  `}
`;

export const SmallSelect = styled(Select)`
  width: ${(props) => props.width || `272px`};
  @media (${breakpoints.tablet}) {
    width: ${(props) => props.width || `255px`};
  }
`;

export const SmallField = styled(Field)`
  width: ${(props) => props.width || `272px`};
  @media (${breakpoints.tablet}) {
    width: ${(props) => props.width || `255px`};
  }

  ${({ error, theme }) =>
    error &&
    css`
      outline: none;
      border-bottom: 2px solid ${theme.errorDark};
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

export const SearchBar = styled.input`
  ${(props) => (props.isSecondary ? FieldStyleType2 : FieldStyleType1)};

  padding: 12.5px 8px 12.5px 32px;
  height: 40px;

  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 12px center;
`;

export const Option = styled.option`
  color: ${({ theme }) => theme.textPrimary};
`;

export const ErrorMesagge = styled(ErrorMessageFormik)`
  font-size: 12px;
  color: ${({ theme }) => theme.errorDark};
  padding-top: 8px;
  font-weight: 400;

  font-family: ${fonts.secondary};
`;

export const ErrorMessageCustom = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.errorDark};
  padding-top: 8px;
  font-weight: 400;

  font-family: ${fonts.secondary};

  display: none;

  ${(props) =>
    props.isError &&
    `
    display:block;
  `}
`;

export const RequiredSpan = styled.span`
  //margin-left: 8px;
  font-size: inherit;
  color: ${({ theme }) => theme.primaryMain};
`;

export const TextArea = styled(Field).attrs({ component: "textarea" })`
  ${FieldStyleType1}
  resize: none;
  height: auto;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 16px 16px 16px 16px;

  @media (${breakpoints.tablet}) {
    width: ${(props) => (props.width ? props.width : "572px")};
  }
`;
export const LinkDelete = styled(Link)``;

export const Delete = styled(DeleteIcon)`
  width: 70px;
  height: auto;
  cursor: pointer;
  path {
    fill: ${({ theme }) => theme.textSecondary};
  }

  ${(props) =>
    props.isblack === "isBlack" &&
    `
      path {
        fill: ${props.theme.textPrimary};
      } 
    `}
`;

export const PasswordText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: ${({ theme }) => theme.link};
  margin-top: -9px;
  margin-bottom: 30px;

  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

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
      background: ${props.theme.columnBackground} 
      url(${Nosort})
      no-repeat 
      100%
      center;
      ${MutualIconStyle};      
    `}

  ${(props) =>
    props.ascending === true &&
    `
    background: ${props.theme.columnBackground}
      url(${Ascending})
      no-repeat 
      100%
      center;
      ${MutualIconStyle};  
    `}

  ${(props) =>
    props.descending === true &&
    `
    background: ${props.theme.columnBackground}
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
  color: ${({ theme }) => theme.textSecondary};
  text-align: left;
  background-color: ${({ theme }) => theme.columnBackground};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.columnHover};
      cursor: pointer;
    }
  }
`;

export const TableCell = styled.td`
  width: inherit;
  height: 50px;
  padding: 18px 12px;
  background-color: ${({ theme }) => theme.bgSecondaryLight100};
  margin: 0;
  border-top: 1px solid ${({ theme }) => theme.tableBorder};
  @media (${breakpoints.desktop}) {
    padding: 13px 16px;
    background-color: ${({ theme }) => theme.bgSecondary};
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
  border: 1px solid ${({ theme }) => theme.tableBorder};
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
  background-color: ${({ theme }) => theme.secondary};
  &:focus {
    border: 1px solid ${({ theme }) => theme.textSecondary};
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
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: ${border.borderRadius};
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
  border: 1px solid ${({ theme }) => theme.textPrimary};
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
  fill: ${({ theme }) => theme.textSecondary};
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
  fill: ${({ theme }) => theme.errorMain};
  width: 14px;
  height: 18px;
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }
`;

export const EditIcon = styled(Edit)`
  fill: ${({ theme }) => theme.iconsPrimary};
  width: 18px;
  height: 18px;
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }
`;

// logo login and signup
export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 32px;

  @media (${breakpoints.desktop}) {
    margin-bottom: 64px;
  }
`;

export const LogoImg = styled.img`
  height: 70px;
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  @media (${breakpoints.tablet}) {
    height: 100px;
  }

  @media (${breakpoints.desktop}) {
    height: 155px;
  }
`;

export const BlueLink = styled(Link)`
  color: ${({ theme }) => theme.primaryDark};

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
  min-height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;

  padding: 20px;
  background-color: ${({ theme }) => theme.bgSecondaryLight100};
`;

export const FormWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin: auto;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ImageContainer = styled.div`
  display: none;
  height: 100%;
  overflow-y: hidden;

  position: absolute;
  top: 0;
  ${(props) => (props.login ? "left:0" : "right:0")};

  @media (${breakpoints.tablet}) {
    display: block;
  }
`;

export const LineEffectWrapper = styled.div`
  position: absolute;
  height: 100%;
  overflow: hidden;

  max-width: ${(props) => props.maxWidth && props.maxWidth};

  ${(props) =>
    props.login !== true &&
    `
      bottom:0;
      left:0;
    `}

  ${(props) =>
    props.topLeft
      ? `
      height:100%;
      rotate: 180deg;
      top:0;
      left:0;
    `
      : `
      bottom:0;
      right:0;
      `}
`;

export const ImageImage = styled.img`
  height: 100%;
  object-fit: cover;

  ${(props) =>
    props.login !== true &&
    `
    transform: scaleX(-1);
  `}
`;
