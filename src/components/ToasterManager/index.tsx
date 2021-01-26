import React, { useCallback, useContext, useEffect, useState } from "react";

import { SToastContainer, SToast } from "./styles";

import { createPortal } from "react-dom";

type Severity = "error" | "success" | "info" | "warning" | undefined;

interface IToast {
  message: string;
  id: number;
  severity: Severity;
}

interface IToastContainer {
  toasts: IToast[];
}
type IToastProvider = {
  addToast: (message: string, severity: Severity) => void;
  removeToast: (id: number) => void;
};

const EMPTY_COMPONENT = (message) => <></>;

let toastComponents = {
  success: EMPTY_COMPONENT,
};

const setToastComponent = ({ success }) => {
  toastComponents["success"] = success;
};

const getToastComponent = (message: string, severity: Severity) => {
  switch (severity) {
    case "success":
      return toastComponents.success(message);
  }
};
const Toast: React.FunctionComponent<IToast> = ({ id, message, severity }) => {
  const toastActions = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toastActions) {
        toastActions.removeToast(id);
      }
    }, 4000); // delay

    return () => {
      clearTimeout(timer);
    };
  }, [id, toastActions]);

  return (
    <SToast
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
    >
      {getToastComponent(message, severity)}
    </SToast>
  );
};

const ToastContainer: React.FunctionComponent<IToastContainer> = ({
  toasts,
}) => {
  return createPortal(
    <SToastContainer>
      {toasts.map((toast: IToast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          severity={toast.severity}
        ></Toast>
      ))}
    </SToastContainer>,
    document.body
  );
};

type ContextValue = IToastProvider | undefined;

const ToastContext = React.createContext<ContextValue>(undefined);
let id = 1;

const ToastProvider: React.FunctionComponent = ({
  children,
  toastComponents,
}) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  console.log
  useEffect(() => {
    setToastComponent(toastComponents);
  }, []);
  const addToast = useCallback(
    (message: string, severity: Severity) => {
      setToasts((toasts: IToast[]) => [
        ...toasts,
        { id: id++, message, severity },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id: number) => {
      setToasts((toasts: IToast[]) =>
        toasts.filter((toast: IToast) => toast.id !== id)
      );
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);
  console.log("--", toastHelpers);
  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
