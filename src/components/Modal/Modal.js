import React, { useEffect } from 'react'

import Button from '../Button/Button';

import {
    CloseIcon,
    CloseIconWrapper,
    Modal as ModalWrapper, ModalButtons, ModalContent, ModalHeader, Title,
} from './ModalStyle'


const Modal = ({ isOpen, closeModal, closeCallback, title, children, actionCallback, actionText, showAction = true, showCancel = true }) => {
    const modalWrapperRef = React.useRef(null);

    const handleAction = () => {
        actionCallback && actionCallback()

        closeModal()
        if (modalWrapperRef.current) modalWrapperRef.current.close()
        document.addEventListener("mousedown", handleClickOutside);
    }

    const handleClose = () => {
        closeModal()
        closeCallback && closeCallback()
        if (modalWrapperRef.current) modalWrapperRef.current.close()
        document.addEventListener("mousedown", handleClickOutside);
    }

    const handleOpen = () => {
        console.log("opened")
        if (modalWrapperRef.current && !modalWrapperRef.current.open) modalWrapperRef.current.showModal()
        document.addEventListener("mousedown", handleClickOutside);
    }

    const handleClickOutside = (event) => {
        const dialogDimensions = modalWrapperRef.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };

        const isInDialog = (dialogDimensions.top <= event.clientY && event.clientY <= dialogDimensions.top + dialogDimensions.height
            && dialogDimensions.left <= event.clientX && event.clientX <= dialogDimensions.left + dialogDimensions.width);
        if (!isInDialog) {
            isOpen &&
                handleClose()
        }

    };


    useEffect(() => {
        if (isOpen)
            handleOpen()
        else {
            closeModal()
            if (modalWrapperRef.current) modalWrapperRef.current.close()
            document.addEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);



    return (
        <ModalWrapper ref={modalWrapperRef}>
            <ModalHeader>
                <Title>{title}</Title>
                <CloseIconWrapper onClick={handleClose}>
                    <CloseIcon />
                </CloseIconWrapper>
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
            <ModalButtons>
                {showCancel && <Button isTertiary callback={handleClose}>Cancel</Button>}
                {showAction && <Button callback={handleAction}>{actionText || title}</Button>}
            </ModalButtons>
        </ModalWrapper>

    )
}

export default Modal