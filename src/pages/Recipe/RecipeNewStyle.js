import styled from "styled-components";
import { border, breakpoints, fonts } from "../../lib/style/theme";

export const RecipeLikesWrapper = styled.div`
  /* position:absolute;
    right:0; */
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const LikesNumber = styled.p`
  color: ${({ theme }) => theme.textMenu};

  font-family: ${fonts.primary};
  line-height: 20px;
  font-size: 18px;
  font-weight: 700;
`;

export const RecipeWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const TopSideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  @media print {
    page-break-inside: avoid;
  }
`;

export const BottomSideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;

  background: ${({ theme }) =>
    theme.mode === "dark" ? theme.bgPrimaryLight600 : theme.primaryLight};
  border-radius: 48px;

  margin: auto;

  max-width: 1200px;

  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;

  @media print {
    page-break-before: always;
  }
`;

export const LeftSideWrapper = styled.div`
  width: 100%;
  padding: 20px;

  @media (${breakpoints.tablet}) {
    width: 320px;
  }

  @media (${breakpoints.desktop}) {
    width: 450px;
  }
`;

export const RightSideWrapper = styled.div`
  width: 100%;

  @media (${breakpoints.tablet}) {
    width: calc(100% - 320px);
  }

  @media (${breakpoints.desktop}) {
    width: calc(100% - 450px);
  }
`;

export const SummaryAndImageWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  @media (${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

export const ButtonsAndDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  @media (${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

export const IngredientsAndStepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media (${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

export const LoadingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const RecipeImgWrapper = styled.div`
  max-height: 600px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const RecipeImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const SectionWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const RecipeNameWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;

  @media (${breakpoints.tablet}) {
    width: 180%;
  }
`;

export const RecipeName = styled.p`
  color: ${({ theme }) => (theme.mode === "dark" ? theme.white : theme.white)};
  font-family: ${fonts.primary};

  font-size: 24px;
  font-weight: 600;
  color: white;
  width: fit-content;

  padding: 0.5125rem;
  width: 100%;

  @media (${breakpoints.tablet}) {
    font-size: 56px;
  }
`;

export const RecipeSpan = styled.span`
  position: relative;
  display: inline-block;
  margin-right: 14px;

  :before {
    content: " ";
    position: absolute;
    background: ${({ theme }) =>
      theme.mode === "dark" ? theme.primaryLight : theme.primaryMain};
    margin: -0.5125rem;
    inset: 0px;
    z-index: -1;
  }
`;

export const RecipeDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  align-items: center;

  @media (${breakpoints.mobile}) {
    flex-direction: row;
  }
`;

export const RecipeDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
`;

export const RecipeDescriptionWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background: ${({ theme }) =>
    theme.mode === "dark" ? theme.bgPrimaryLight800 : theme.bgPrimaryLight800};

  display: flex;
  align-items: center;

  padding: 24px;
`;

export const LikeCommentButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;

  background: ${({ theme }) =>
    theme.mode === "dark" ? theme.bgPrimaryLight800 : theme.white};
`;

export const SectionHeadline = styled.p`
  color: ${({ theme, secondary }) =>
    secondary
      ? theme.primary700
      : theme.mode === "dark"
      ? theme.white
      : theme.textPrimary};

  font-family: ${fonts.primary};

  font-size: ${(props) => props.fontSize || "18px"};
  font-weight: 700;
  margin: ${({ margin }) => margin || "0 10px 10px 10px"};
`;

export const TextContent = styled.p`
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.white : theme.textPrimary};
  font-family: ${fonts.primary};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: 400;
  overflow-wrap: anywhere;
`;
export const IngredientsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-family: ${fonts.primary};
`;
