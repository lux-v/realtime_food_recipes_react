import styled from "styled-components";
import { breakpoints } from "../../lib/style/theme";

export const StatsCardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 10px;

    @media (${breakpoints.tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;


