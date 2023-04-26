import React from 'react';
import { Button as ButtonWrapepr } from './ButtonStyle';

function Button({
    isSecondary = false,
    isTertiary = false,
    isCancel = false,
    width,
    height,
    type = 'submit',
    children,
    callback,
    disabled,
    isHidden,
    isTransparent,
}) {
    return (
        <ButtonWrapepr
            isSecondary={isSecondary}
            isTertiary={isTertiary}
            isCancel={isCancel}
            width={width}
            height={height}
            disabled={disabled}
            type={type}
            isHidden={isHidden}
            isTransparent={isTransparent}
            onClick={callback}
        >
            {children}
        </ButtonWrapepr>
    );
}

export default Button;
