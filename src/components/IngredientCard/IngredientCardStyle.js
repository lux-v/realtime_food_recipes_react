import styled from 'styled-components';
import { breakpoints, colors } from '../../lib/style/theme.js';
import { ReactComponent as Edit } from '../../assets/img/edit-icon.svg';
import { ReactComponent as Trash } from '../../assets/img/trash-can-icon.svg';
import { ReactComponent as Close } from '../../assets/img/x-icon.svg';
import { ReactComponent as Tick } from '../../assets/img/tick-icon.svg';

export const IngredientCardWrapper = styled.div`
  padding: 16px;
  gap: 16px;
  margin: 163px, 24px;
  margin-bottom: auto;
  border-radius: 12px;
  background-color: ${colors.secondary};
  color: ${colors.iconsPrimary};

  @media (${breakpoints.tablet}) {
    width: 648px;
  }

  @media (${breakpoints.desktop}) {
    margin-right: 511px;
  }
`;

export const IngredientCard = styled.div`
  display: flex;
  align-items: space-between;
  align-items: center;
  gap: 10px;
  padding: 4px 16px;
  border-bottom: 1px solid ${colors.textTertiary};

  ${(props) =>
    props.isedit === 1 &&
    `
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 4px;
  `}

  @media (${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 16px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const IngredientCardGrid = styled.div`
  border-style: solid;
  border-color: ${colors.textTertiary};
  border-width: 1.5px;
  &:first-child {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
  &:last-child {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;

export const IconsWrapper = styled.div``;

export const EditIcon = styled(Edit)`
  float: right;
  margin-right: 20px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  path {
    fill: ${colors.iconsPrimary};
  }
`;

export const TrashIcon = styled(Trash)`
  float: right;
  margin-right: 10px;
  justify-content: center;
  cursor: pointer;
`;

export const TickIcon = styled(Tick)`
  float: right;
  margin-right: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  path {
    fill: ${colors.iconsPrimary};
  }
`;

export const CloseIcon = styled(Close)`
  float: right;
  margin-right: 10px;
  width: 18px;
  height: 18px;
  justify-content: center;
  cursor: pointer;

  path {
    fill: ${colors.iconsPrimary};
  }
`;
