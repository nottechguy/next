import React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  design?:          string,
  label?:           string,
  supportingText?:  string,
  errorText?:       string,
  characterCounter?: string
}
