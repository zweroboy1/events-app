import { createContext } from 'react';

export type ToastType = 'error' | 'warning' | 'success' | 'info';

export type ToastContextType = {
  showToast: (type: ToastType, message: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
