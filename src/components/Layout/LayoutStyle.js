import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.mode === "dark" && theme.bgPrimaryLight700};
`;
