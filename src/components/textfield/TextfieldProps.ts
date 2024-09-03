import React from "react";

export interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?:            string,
  design?:          string,
  label?:           string,
  leadingIcon?:     string,
  trailingIcon?:    string,
  suffix?:          string,
  prefix?:          string,
  supportingText?:  string,
  errorText?:       string,
  characterCounter?: string
}
