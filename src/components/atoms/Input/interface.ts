import React from "react";

export interface InputProps {
  className?: string //style name
  type?: string //input type
  name: string //input name
  value: string //input value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void //on change event, when input is triggered
  placeholder?: string //short hint that describes the expected value
  maxLength?: number //max length of value
  inputMode?:
    | "text"
    | "email"
    | "url"
    | "search"
    | "tel"
    | "none"
    | "numeric"
    | "decimal"
    | undefined //help device or browser decide which keyboard to display
  pattern?: string //input pattern
  id?: string //ID attribute of the input field.
  readOnly?: boolean
}
