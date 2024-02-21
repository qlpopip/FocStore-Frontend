import React from "react";

export interface ModalProps {
  className?: string // The class name for the modal component (optional)
  children: React.ReactNode // The content to be displayed within the modal
  onClick: () => void // Event handler for the modal's click event
  isOpen: boolean // Determines whether the modal is open or not
}
