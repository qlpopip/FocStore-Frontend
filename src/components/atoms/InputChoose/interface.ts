/* eslint-disable no-unused-vars */
import React from "react";
export interface InputChooseProps {
    checked: boolean; // Determines whether the input is checked or not
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for the input's change event
    name: string; // The name of the input
    value: string | boolean; // The value of the input
    label?: string; // The label text associated with the input (optional)
    id: string; // The ID attribute of the input
    className?: string; // The class name for the input component (optional)
    type: string; // The type of the input
    onClick?: () => void; // Event handler for the input's click event (optional)
}