// components/CustomModal.js
import React from 'react';
import Modal from 'react-modal';


// Modal.setAppElement('el');
const CustomModal = ({ isOpen, onRequestClose, children }) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(3, 3, 3, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999, 
          },
        content: {
          top: 0,
          left: 0,
          right: 0,
          bottom: '1px',
          padding: '20px',
          borderRadius: 0,
          backgroundColor: 'transparent', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
         
        },
      };
  
      
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Access Code Request"
      ariaHideApp={false}
      overlayClassName="custom-modal-overlay"
      style={customStyles}
        // onAfterOpen={afterOpenModal}
    >
    
      {children}
    </Modal>
  );
};

export default CustomModal;
