import { TextAreaProps } from "./TextareaProps";
import { DefaultComponent } from "./Textarea";

const FilledTextarea = (props : TextAreaProps) : JSX.Element => {
  return <DefaultComponent design="filled" {...props} />
}

export default FilledTextarea;
