import { createContext, useState, useCallback, useContext, ReactNode } from 'react'
import { node } from 'prop-types'

import { MessageDialog, IMessageDialogProps } from 'components/MessageDialog'

const noop = () => {}

export interface IAlertContext {
  showAlert: any
  hideAlert(): void
  _alertProps: IMessageDialogProps
}

const defaultState = {
  title: '',
  message: '',
  cancelText: 'Tutup',
  confirmText: '',
  confirmSchema: 'red',
  isOpen: false,
  onConfirm: () => {},
  onClose: () => {}
}

const AlertContext = createContext<IAlertContext>({
  showAlert: () => {},
  hideAlert: noop,
  _alertProps: defaultState
})

export interface IAlertProviderProps {
  children: ReactNode
}

export const useAlertContext = () => useContext(AlertContext)

export const AlertProvider = ({ children }: IAlertProviderProps) => {
  const [state, setState] = useState<IMessageDialogProps>({ ...defaultState })

  const hideAlert = useCallback(() => {
    setState((prevState: IMessageDialogProps) => ({ ...prevState, isOpen: false }))
  }, [])

  const showAlert = useCallback((args: IMessageDialogProps) => {
    const {
      title = '',
      message = '',
      cancelText = 'Tutup',
      confirmText = '',
      onConfirm = noop,
      onClose = hideAlert
    } = args

    setState({
      isOpen: true,
      title,
      message,
      cancelText,
      confirmText,
      onConfirm,
      onClose
    })
  }, [])

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, _alertProps: state }}>
      {children}
      <MessageDialog {...state} />
    </AlertContext.Provider>
  )
}

export const AlertConsumer = AlertContext.Consumer

AlertProvider.propTypes = {
  children: node.isRequired
}

export default AlertContext
