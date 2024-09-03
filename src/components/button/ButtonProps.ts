import { ComponentsProps } from "src/components/ComponentsProps";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ComponentsProps {
  text: string,
  design: string,
  leadingIcon?: string,
  trailingIcon?: string
}

export interface AnchorButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string,
  design: string,
  leadingIcon?: string,
  trailingIcon?: string
}
