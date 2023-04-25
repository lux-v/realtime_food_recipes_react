import styled from "styled-components";
import { colors } from "../../lib/style/theme";


export const ChipWrapper = styled.div`
    display:flex;
    align-items:center;
    height:22px;
    padding:6px;
    border-radius: 10px;

    user-select:none;

    gap: ${props => props.icon ? "5px" : "0px"};
    
    ${props =>
    props.type === "success" ?
      `
      background-color: ${colors.secondarySuccess};
    `
      :
      props.type === "error" ?
        `
      background-color: ${colors.secondaryError};
    `:
        props.type === "warning" ?
          `
      background-color: ${colors.secondaryWarning};
    `:

          `
    background-color: ${colors.secondaryInfo};
      `
  }
    
`;
export const ChipName = styled.p`
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color:${colors.bgSecondary};
`;
