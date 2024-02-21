import React from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" //button type
  theme?: "" | "primary" | "secondary" | "more" //button theme
  className?: string //style name
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement> // click event
  isInactive?: boolean // disable true/false,
}
