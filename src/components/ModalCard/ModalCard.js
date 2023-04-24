import React, { useEffect } from 'react';
import {
  ModalBackground,
  ModalCard as ModalCardWrapper,
  ModalHeader,
  ModalContent,
  ModalButtons,
  CloseIcon,
  Title,
} from './ModalCardStyle';

function ModalCard({ children, openModal, setOpenModal, title, elements }) {
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal === true) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openModal]);

  return (
    <ModalBackground openModal={openModal}>
      <ModalCardWrapper>
        <ModalHeader>
          <Title>{title}</Title>
          <CloseIcon onClick={() => handleClose()} />
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalButtons>{elements}</ModalButtons>
      </ModalCardWrapper>
    </ModalBackground>
  );
}

export default ModalCard;
