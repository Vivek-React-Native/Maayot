import {useState} from 'react'

export const useModal = (open : false) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const showModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    showModal,
    closeModal
  }
}

