import styled from "styled-components";

export const ChipWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  user-select: none;
  gap: ${({ icon }) => icon ? "5px" : "0px"};
  height: ${({ size = 'small' }) => size === 'medium' ? '30px' : size === 'large' ? '38px' : '22px'};
  padding: ${({ size = 'small' }) => size === 'medium' ? '8px' : size === 'large' ? '10px' : '6px'};
  font-size: ${({ size = 'small' }) => size === 'medium' ? '18px' : size === 'large' ? '20px' : '16px'};
  background-color: ${({ type = 'default', theme }) => theme[`secondary${type.charAt(0).toUpperCase()}${type.slice(1)}`] || theme.primaryMain};
`;

export const StyledIcon = styled(props => <props.as {...props} />)`
  width: ${({ size = 'small' }) => size === 'medium' ? '14px' : size === 'large' ? '16px' : '12px'};
  height: ${({ size = 'small' }) => size === 'medium' ? '14px' : size === 'large' ? '16px' : '12px'};
  cursor: pointer;
  fill: ${({ theme }) => theme.bgSecondary};
`;

export const ChipName = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.bgSecondary};
`;