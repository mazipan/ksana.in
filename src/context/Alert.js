import React, { useState, useCallback, useContext } from "react";
import { node } from "prop-types";
import { MessageDialog } from "../components/MessageDialog";

const noop = () => {};

const defaultState = {
  isOpen: false,
  title: "",
  message: "",
  cancelText: "Cancel",
  confirmText: "",
  onConfirm: noop,
  onClose: noop,
};

const AlertContext = React.createContext({
  showAlert: noop,
  hideAlert: noop,
  _alertProps: defaultState,
});

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({ ...defaultState });

  const showAlert = useCallback((args) => {
    const {
      title = "",
      message = "",
      cancelText = "Cancel",
      confirmText = "",
      onConfirm = noop,
      onClose = noop,
    } = args;

    setState({
      isOpen: true,
      title,
      message,
      cancelText,
      confirmText,
      onConfirm,
      onClose,
    });
  }, []);

  const hideAlert = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, _alertProps: state }}>
      {children}
      <MessageDialog {...state} onClose={hideAlert} />
    </AlertContext.Provider>
  );
};

export const AlertConsumer = AlertContext.Consumer;

AlertProvider.propTypes = {
  children: node.isRequired,
};

export default AlertContext;
