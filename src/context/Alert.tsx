import React, { useState, useCallback, useContext } from 'react'
import { node } from 'prop-types'

import { MessageDialog } from 'components/MessageDialog'

const noop = () => {}

const defaultState: any = {
  isOpen: false,
  title: '',
  message: '',
  cancelText: 'Tutup',
  confirmText: '',
  onConfirm: noop,
  onClose: noop
}

const AlertContext: any = React.createContext({
  showAlert: noop,
  hideAlert: noop,
  _alertProps: defaultState
})

export const useAlertContext: any = () => useContext(AlertContext)

export const AlertProvider = ({ children }: any) => {
  const [state, setState] = useState({ ...defaultState })

  const hideAlert: any = useCallback(() => {
    setState((prevState: any) => ({ ...prevState, isOpen: false }))
  }, [])

  const showAlert: any = useCallback((args: any) => {
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
