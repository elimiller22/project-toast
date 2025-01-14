import React from 'react';

import useEscapeKey from '../../hooks/use-escape-key';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function removeToast(id) {
    const newToasts = toasts.filter(item => item.id !== id);
    setToasts(newToasts);
  }

  function createToast(variant, message) {
    const newToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant,
        message
      }
    ];
    setToasts(newToasts);
  }

  useEscapeKey(() => {
    setToasts([]);
  });

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
