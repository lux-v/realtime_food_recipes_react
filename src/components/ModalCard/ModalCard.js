import React, { useEffect } from 'react';
import {
  ModalBackground,
  ModalCard as ModalCardWrapper,
  ModalHeader,
  ModalContent,
  ModalButtons,
  CloseIcon,
  Title,
  CloseIconWrapper,
} from './ModalCardStyle';

function ModalCard({ modalType }) {
  const { content, openModal, closeModal, title, elements } = modalType;

  const handleClose = () => {
    closeModal();
  };

  const handleBackdropClick = (e) => {
    handleClose()
  }

  useEffect(() => {
    if (openModal === true) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openModal]);

  return (
    <ModalBackground openModal={openModal} onClick={handleBackdropClick}>
      <ModalCardWrapper onClick={(e) => { e.stopPropagation() }}>
        <ModalHeader>
          <Title>{title}</Title>
          <CloseIconWrapper onClick={() => handleClose()}>
            <CloseIcon />
          </CloseIconWrapper>
        </ModalHeader>
        <ModalContent>{content}</ModalContent>
        <ModalButtons>
          {elements &&
            elements.map(button => {
              return button;
            })}
        </ModalButtons>
      </ModalCardWrapper>
    </ModalBackground>
  );
}

export default ModalCard;
