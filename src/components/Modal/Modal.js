import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Button from '../Button/Button';

import {
    CloseIcon,
    CloseIconWrapper,
    Modal as ModalWrapper, ModalButtons, ModalContent, ModalHeader, Title,
} from './ModalStyle'


const Modal = () => {
    const { modalType, setModalType, } = useContext(AuthContext)
    const { openModal, closeCallback, title, content, actionCallback, actionText, showAction = true, showCancel = true } = modalType;
    const ref = React.useRef(null);


    const handleClose = () => {
        closeCallback && closeCallback()
        setModalType({ openModal: false })
        if (ref.current) ref.current.close()
        document.addEventListener("mousedown", handleClickOutside);
    }

    const handleOpen = () => {
        if (ref.current && !ref.current.open) ref.current.showModal()
        document.addEventListener("mousedown", handleClickOutside);
    }

    const handleClickOutside = (event) => {
        const dialogDimensions = ref.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };

        const isInDialog = (dialogDimensions.top <= event.clientY && event.clientY <= dialogDimensions.top + dialogDimensions.height
            && dialogDimensions.left <= event.clientX && event.clientX <= dialogDimensions.left + dialogDimensions.width);
        if (!isInDialog) {
            handleClose()
        }

    };

    const handleAction = () => {
        actionCallback && actionCallback()
        handleClose()
    }

    useEffect(() => {
        if (openModal)
            handleOpen()
        else if (!openModal) handleClose()

    }, [openModal]);

    return (
        <ModalWrapper ref={ref}>
            <ModalHeader>
                <Title>{title}</Title>
                <CloseIconWrapper onClick={handleClose}>
                    <CloseIcon />
                </CloseIconWrapper>
            </ModalHeader>
            <ModalContent>{content}</ModalContent>
            <ModalButtons>
                {showCancel && <Button isTertiary callback={handleClose}>Cancel</Button>}
                {showAction && <Button callback={handleAction}>{actionText || title}</Button>}
            </ModalButtons>
        </ModalWrapper>

    )
}

export default Modal