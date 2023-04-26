import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/img/x-icon.svg';

export const CloseIcon = styled(Close)`
  width: 10px;
  height: 10px;
  cursor: pointer;

  path {
    fill: white;
  }
`

export const RecipeIngredientsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:5px;
    
    overflow:hidden;
`;


export const RecipeStepsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:5px;
    
    overflow:hidden;
`;
