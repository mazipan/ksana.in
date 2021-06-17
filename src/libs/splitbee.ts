import splitbee from '@splitbee/web'

export const initSplitbee = (): void => {
  if (process.env.NODE_ENV === 'production') {
    splitbee.init()
  } else {
    // eslint-disable-next-line no-console
    console.info('[INFO]: skip init splitbee')
  }
}

export const sendEvent = (eventName: string, eventAttribute?: Record<string, string>): void => {
  if (process.env.NODE_ENV === 'production') {
    splitbee.track(eventName, eventAttribute)
  } else {
    // eslint-disable-next-line no-console
    console.info(
      `[INFO]: skip send event { eventName: ${eventName}, eventAttribute: ${eventAttribute} }`
    )
  }
}

export const attachEmail = (userEmail: string): void => {
  if (process.env.NODE_ENV === 'production') {
    splitbee.user.set({
      email: userEmail
    })
  } else {
    // eslint-disable-next-line no-console
    console.info(`[INFO]: skip user.set ${userEmail}`)
  }
}
