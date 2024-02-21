import React from "react";
export interface TextAreaProps {
  className?: string // The class name for the textarea component (optional)
  id?: string // The identifier for the textarea
  name: string // The name of the textarea
  value: string // The value of the textarea
  placeholder?: string // The placeholder text for the textarea (optional)
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void // Event handler for the textarea's change event
}
