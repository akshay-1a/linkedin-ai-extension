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
      <button
        className="w-[25px] h-[25px] p-[2px] m-1 rounded-full bg-white select-none"
        onClick={handleButtonClick}
        contentEditable="false"
        
      >
        <img src={Icon} alt="ai icon" className='w-5 h-5 m-auto' />
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>

      )}
    </>
  )
}
