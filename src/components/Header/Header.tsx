import { Link, Flex, Button } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { HiDownload } from 'react-icons/hi'

import { DarkModeSwitch } from '../DarkModeSwitch'
import { sendEvent } from 'libs/splitbee'

interface UserChoice {
  outcome: 'accepted' | 'dismissed'
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void
  userChoice: Promise<UserChoice>
}

export function Header() {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isShowInstallBtn, setShowInstallBtn] = useState<boolean>(false)
  const deferredPrompt = useRef<any | null>(null)

  const handler = (e: Event) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt.current = e as BeforeInstallPromptEvent
    // Update UI notify the user they can install the PWA
    setShowInstallBtn(true)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !isShowInstallBtn) {
      window.addEventListener('beforeinstallprompt', handler)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [isShowInstallBtn])

  const handleClick = async () => {
    setLoading(true)
    sendEvent('Install A2HS')
    // Show the install prompt
    deferredPrompt.current.prompt()
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.current.userChoice
    // Optionally, send analytics event with outcome of user choice
    // eslint-disable-next-line no-console
    console.info(`User response to the install prompt: ${outcome}`)
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt.current = null
    // manual delay the process
    setTimeout(() => {
      setLoading(false)
      // Hide the app provided install promotion
      setShowInstallBtn(false)
    }, 1000)
  }

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      p="4"
      as="header"
      zIndex="3"
      bg="orange.400"
    >
      <Link
        href={'/'}
        name="Beranda"
        _hover={{
          textDecoration: 'none'
        }}
      >
        <svg
          width="81.48"
          height="50"
          viewBox="0 0 471 289"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57.29 180V176.94H65.11L45.9 137.5L42.67 138.35V176.94H50.49V180H1.7V176.94H11.05V55.56H1.02V52.5H42.67V134.95L45.39 133.93L83.64 102.14H67.66V99.08H101.15V102.14H89.25L69.02 119.31L98.43 176.94H104.55V180H57.29ZM111.03 181.7V151.27H113.07C116.017 161.13 119.983 168.043 124.97 172.01C129.957 175.977 136.19 177.96 143.67 177.96C155.23 177.96 161.01 174.277 161.01 166.91C161.01 163.737 159.593 161.357 156.76 159.77C152.34 157.277 146.673 155.35 139.76 153.99C132.053 151.95 125.593 149.23 120.38 145.83C114.147 141.75 111.03 135.29 111.03 126.45C111.03 117.61 113.75 110.583 119.19 105.37C124.63 100.043 131.883 97.38 140.95 97.38C146.503 97.38 152.227 98.6833 158.12 101.29C160.273 102.197 161.917 102.65 163.05 102.65C164.183 102.65 165.147 102.253 165.94 101.46C166.733 100.667 167.697 99.1933 168.83 97.04H170.7V123.05H168.66C162.88 108.317 153.927 100.95 141.8 100.95C136.473 100.95 132.507 101.913 129.9 103.84C127.293 105.653 125.99 107.977 125.99 110.81C125.99 112.51 126.387 113.87 127.18 114.89C127.973 115.797 128.597 116.477 129.05 116.93C129.503 117.383 130.24 117.893 131.26 118.46C132.28 118.913 133.13 119.31 133.81 119.65C134.49 119.877 135.51 120.217 136.87 120.67C138.343 121.123 139.42 121.407 140.1 121.52C147.807 123.447 153.36 125.147 156.76 126.62C160.16 127.98 163.39 129.68 166.45 131.72C172.683 136.027 175.8 142.997 175.8 152.63C175.8 162.15 172.967 169.403 167.3 174.39C161.633 179.263 153.87 181.7 144.01 181.7C136.983 181.7 130.183 180.057 123.61 176.77C122.25 175.863 121.173 175.41 120.38 175.41C117.887 175.41 115.45 177.507 113.07 181.7H111.03ZM221.631 140.05H226.561V126.96C226.561 116.193 225.938 108.997 224.691 105.37C223.558 101.63 221.291 99.76 217.891 99.76C215.851 99.76 213.981 100.327 212.281 101.46C210.694 102.48 209.901 103.953 209.901 105.88C209.901 107.693 210.241 109.563 210.921 111.49H215.171C216.078 113.87 216.531 116.76 216.531 120.16C216.531 123.447 215.114 126.337 212.281 128.83C209.448 131.21 205.878 132.4 201.571 132.4C191.824 132.4 186.951 127.697 186.951 118.29C186.951 104.35 198.794 97.38 222.481 97.38C235.968 97.38 245.261 99.7033 250.361 104.35C255.574 108.883 258.181 117.27 258.181 129.51V164.02C258.181 169.913 259.824 172.86 263.111 172.86C266.964 172.86 269.231 167.023 269.911 155.35L272.461 155.52C272.008 165.493 270.138 172.35 266.851 176.09C263.564 179.83 258.181 181.7 250.701 181.7C237.101 181.7 229.281 177.507 227.241 169.12C225.768 173.427 223.558 176.6 220.611 178.64C217.664 180.68 213.358 181.7 207.691 181.7C190.918 181.7 182.531 174.843 182.531 161.13C182.531 153.083 185.704 147.587 192.051 144.64C198.511 141.58 208.371 140.05 221.631 140.05ZM214.831 160.96C214.831 166.853 215.114 170.65 215.681 172.35C216.361 174.05 217.551 174.9 219.251 174.9C221.064 174.9 222.708 173.483 224.181 170.65C225.768 167.703 226.561 163.68 226.561 158.58V142.77H225.371C218.344 142.77 214.831 147.927 214.831 158.24V160.96ZM274.472 99.08H315.442V114.72C317.255 109.507 320.032 105.313 323.772 102.14C327.512 98.9667 333.178 97.38 340.772 97.38C358.338 97.38 367.122 106.843 367.122 125.77V176.94H376.642V180H328.532V176.94H335.502V121.69C335.502 114.89 335.048 110.527 334.142 108.6C333.235 106.56 331.592 105.54 329.212 105.54C325.585 105.54 322.355 107.92 319.522 112.68C316.802 117.44 315.442 123.22 315.442 130.02V176.94H322.752V180H274.472V176.94H283.822V102.14H274.472V99.08ZM419.688 140.05H424.618V126.96C424.618 116.193 423.994 108.997 422.748 105.37C421.614 101.63 419.348 99.76 415.948 99.76C413.908 99.76 412.038 100.327 410.338 101.46C408.751 102.48 407.958 103.953 407.958 105.88C407.958 107.693 408.298 109.563 408.978 111.49H413.228C414.134 113.87 414.588 116.76 414.588 120.16C414.588 123.447 413.171 126.337 410.338 128.83C407.504 131.21 403.934 132.4 399.627 132.4C389.881 132.4 385.008 127.697 385.008 118.29C385.008 104.35 396.851 97.38 420.538 97.38C434.024 97.38 443.318 99.7033 448.418 104.35C453.631 108.883 456.238 117.27 456.238 129.51V164.02C456.238 169.913 457.881 172.86 461.168 172.86C465.021 172.86 467.288 167.023 467.968 155.35L470.518 155.52C470.064 165.493 468.194 172.35 464.908 176.09C461.621 179.83 456.238 181.7 448.758 181.7C435.158 181.7 427.338 177.507 425.298 169.12C423.824 173.427 421.614 176.6 418.668 178.64C415.721 180.68 411.414 181.7 405.748 181.7C388.974 181.7 380.588 174.843 380.588 161.13C380.588 153.083 383.761 147.587 390.108 144.64C396.568 141.58 406.428 140.05 419.688 140.05ZM412.888 160.96C412.888 166.853 413.171 170.65 413.738 172.35C414.418 174.05 415.608 174.9 417.308 174.9C419.121 174.9 420.764 173.483 422.238 170.65C423.824 167.703 424.618 163.68 424.618 158.58V142.77H423.428C416.401 142.77 412.888 147.927 412.888 158.24V160.96Z"
            fill="white"
          />
          <path
            d="M364.1 261C361.233 261 359.067 260.167 357.6 258.5C356.2 256.767 355.5 254.7 355.5 252.3C355.5 249.833 356.233 247.767 357.7 246.1C359.233 244.433 361.367 243.6 364.1 243.6C366.833 243.6 369 244.3 370.6 245.7C372.2 247.1 373 249.2 373 252C373 254.8 372.233 257 370.7 258.6C369.233 260.2 367.033 261 364.1 261ZM393.165 205.5C389.632 205.5 387.098 204.6 385.565 202.8C384.098 201 383.365 198.767 383.365 196.1C383.365 193.433 384.165 191.233 385.765 189.5C387.432 187.767 389.932 186.9 393.265 186.9C396.598 186.9 399.132 187.7 400.865 189.3C402.598 190.833 403.465 193.067 403.465 196C403.465 198.867 402.632 201.167 400.965 202.9C399.298 204.633 396.698 205.5 393.165 205.5ZM378.065 212.4H402.565V258.2H408.165V260H378.465V258.2H383.965V214.2H378.065V212.4ZM410.403 212.4H434.503V221.6C435.57 218.533 437.203 216.067 439.403 214.2C441.603 212.333 444.936 211.4 449.403 211.4C459.736 211.4 464.903 216.967 464.903 228.1V258.2H470.503V260H442.203V258.2H446.303V225.7C446.303 221.7 446.036 219.133 445.503 218C444.97 216.8 444.003 216.2 442.603 216.2C440.47 216.2 438.57 217.6 436.903 220.4C435.303 223.2 434.503 226.6 434.503 230.6V258.2H438.803V260H410.403V258.2H415.903V214.2H410.403V212.4Z"
            fill="white"
          />
        </svg>
      </Link>

      <Flex justifyContent="space-between" alignItems="center">
        {isShowInstallBtn ? (
          <Button
            px={6}
            color={'white'}
            bg="green.400"
            _hover={{
              bg: 'green.500'
            }}
            mr="2"
            onClick={handleClick}
            isLoading={isLoading}
            leftIcon={<HiDownload />}
          >
            Install
          </Button>
        ) : null}
        <DarkModeSwitch />
      </Flex>
    </Flex>
  )
}
