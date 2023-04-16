import React from 'react';
import { Button as ButtonWrapepr } from './ButtonStyle';

function Button({
    isSecondary = false,
    isCancel = false,
    width,
    type = 'submit',
    children,
    callback,
    disabled,
    btnHiddenMobile,
    isTransparent,
}) {
    return (
        <ButtonWrapepr
            isSecondary={isSecondary}
            isCancel={isCancel}
            width={width}
            disabled={disabled}
            type={type}
            btnHiddenMobile={btnHiddenMobile}
            isTransparent={isTransparent}
            onClick={callback}
        >
            {children}
        </ButtonWrapepr>
    );
}

export default Button;
