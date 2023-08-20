import { SVGWrapper, StatsCardWrapper, ValueTitleWrapper, Value, Title } from "./StatsCardStyle"

//variant is a prop that can be passed to the component to change the styling of the component
//variant can be primary, primary-dark, white

const StatsCard = ({ title, value, icon, variant = "white", children, height, maxWidth }) => {
    return (
        <StatsCardWrapper variant={variant} height={height} maxWidth={maxWidth}>
            {icon &&
                <SVGWrapper variant={variant}>
                    {icon}
                </SVGWrapper>
            }
            <ValueTitleWrapper variant={variant}>
                <Value>{value}</Value>
                <Title>{title}</Title>
                {children && children}
            </ValueTitleWrapper>
        </StatsCardWrapper>
    )
}



export default StatsCard
