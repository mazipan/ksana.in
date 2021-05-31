import splitbee from '@splitbee/web'

export const initSplitbee = (): void => {
  splitbee.init()
}

export const sendEvent = (eventName: string, eventAttribute?: Record<string, string>): void => {
  splitbee.track(eventName, eventAttribute)
}

export const attachEmail = (userEmail: string): void => {
  splitbee.user.set({
    email: userEmail
  })
}
