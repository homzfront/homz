// components/CustomModal.js
import React from 'react';
import Modal from 'react-modal';


// Modal.setAppElement('el');
const CustomModal = ({ isOpen, onRequestClose, children }) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(3, 3, 3, 0.5)', // Dark gray with transparency
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed', // Use fixed positioning
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999, // Ensure the overlay is on top
          },
        content: {
          top: 0,
          left: 0,
          right: 0,
          bottom: '1px',
        //   border: 'none', // Remove border
          padding: '20px', // Remove padding
          borderRadius: 0, // Remove border radius
          backgroundColor: 'transparent', // Transparent background
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
    //   className="custom-modal"
      overlayClassName="custom-modal-overlay"
      style={customStyles}
        // onAfterOpen={afterOpenModal}
    >
    
      {children}
    </Modal>
  );
};

export default CustomModal;
