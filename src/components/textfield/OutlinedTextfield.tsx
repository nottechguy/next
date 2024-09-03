import { TextfieldProps } from "./TextfieldProps";
import { DefaultComponent } from "./Textfield";
import React from "react";

const OutlinedTextfield = (props : TextfieldProps) : React.JSX.Element => {
  return <DefaultComponent design="outlined" {...props} />
}

export default OutlinedTextfield;
