import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ToastType, ToastContext } from './ToastContext';

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [background, setBackground] = useState('danger');
  const [header, setHeader] = useState('Error');

  const toastSettings = {
    error: {
      header: 'Error',
      background: 'danger',
    },
    warning: {
      header: 'Warning',
      background: 'warning',
    },
    success: {
      header: 'Success',
      background: 'success',
    },
    info: {
      header: 'Info',
      background: 'info',
    },
  };

  const showToast = (type: ToastType, message: string) => {
    setMessage(message);
    setShow(true);
    setBackground(toastSettings[type].background);
    setHeader(toastSettings[type].header);
  };

  const hideAll = () => {
    setShow(false);
    setMessage('');
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}
      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 100 }}
      >
        <Toast
          bg={background}
          show={show}
          onClose={hideAll}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">{header}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>
            <span className="text-white">{message}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
