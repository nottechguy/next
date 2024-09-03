import { TextAreaProps } from "./TextareaProps";
import { DefaultComponent } from "./Textarea";

const OutlinedTextarea = (props : TextAreaProps) : JSX.Element => {
  return <DefaultComponent design="outlined" {...props} />
}

export default OutlinedTextarea;
