import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useColorMode
} from '@chakra-ui/react'

import { textColor } from 'constants/colors'

export interface IMessageDialogProps {
  isOpen: boolean
  title?: string
  message?: string
  cancelText?: string
  confirmText?: string
  confirmSchema?: string
  onConfirm?: () => void
  onClose?: () => void
}

export type IMessageOpenDialogProps = Omit<IMessageDialogProps, 'isOpen'>

export function MessageDialog({
  title,
  message,
  cancelText,
  confirmText,
  confirmSchema,
  isOpen,
  onConfirm,
  onClose = () => {}
}: IMessageDialogProps) {
  const cancelRef = useRef<any>()
  const { colorMode } = useColorMode()

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent width="90%">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color={textColor[colorMode]}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody color={textColor[colorMode]}>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} color={textColor[colorMode]}>
              {cancelText}
            </Button>
            {confirmText && (
              <Button colorScheme={confirmSchema} onClick={onConfirm} ml={3}>
                {confirmText}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

MessageDialog.defaultProps = {
  title: '',
  message: '',
  cancelText: 'Tutup',
  confirmText: '',
  confirmSchema: 'red',
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onConfirm: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {}
}
