import { TextfieldProps } from "./TextfieldProps";
import { DefaultComponent } from "./Textfield";

const FilledTextfield = (props : TextfieldProps) : JSX.Element => {
  return <DefaultComponent design="filled" {...props} />
}

export default FilledTextfield;
