import React from "react";
import { Button as ButtonWrapper } from "./ButtonStyle";

function Button({
  isSecondary = false,
  isTertiary = false,
  isCancel = false,
  width,
  height,
  type = "submit",
  children,
  callback,
  disabled,
  isHidden,
  isTransparent,
  isError,
}) {
  return (
    <ButtonWrapper
      isSecondary={isSecondary}
      isTertiary={isTertiary}
      isCancel={isCancel}
      isError={isError}
      width={width}
      height={height}
      disabled={disabled}
      type={type}
      isHidden={isHidden}
      isTransparent={isTransparent}
      onClick={callback}
    >
      {children}
    </ButtonWrapper>
  );
}

export default Button;
