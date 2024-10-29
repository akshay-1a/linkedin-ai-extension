import AiIcon from '@/components/AiIcon';
import React, { useState } from 'react';
import Icon from '~/assets/Icon.svg';

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <AiIcon onClick={handleButtonClick}/>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
      )}
    </>
  )
}
