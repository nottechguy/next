import ClassList from "src/components/classList";
import { TextAreaProps } from "./TextareaProps";
import { handleFocus } from "./TextfieldAdapter";

let cl = ClassList.textfield;

const getDefaultClassName = (props: TextAreaProps) => {
  let className = cl.base_class + ` ${props.design == 'outlined' ? cl.outlined : cl.filled} ${cl.textarea}`;

  if (props.disabled) {
    className += ` ${cl.disabled}`;
  }

  if (props.value !== undefined && props.value.toString().length > 0) {
    className += ` ${cl.label_floating}`;
  }

  return className;
};

const addTextareaLabelIfExists = (props: TextAreaProps) => {

  const { design, label, required, value } = props;

  if (typeof label !== "string") {
    return <></>;
  }
  let component = <></>;

  if (typeof label === "string") {
    let className = cl.floating_label;
    if (required) {
      className += ` ${cl.floating_label_required}`;
    }

    if (design == "filled") {
      return(<>
        <div className={cl.line_ripple}></div>
        {label !== undefined && <span className={className}>{label}</span>}
        </>
      );
    }

    if (design == "outlined") {
    return (
      <div className={cl.notched}>
        <div className={cl.notched_leading}></div>
        <div className={cl.notched_notch}>
          {label !== undefined && <span className={className}>{label}</span>}
        </div>
        <div className={cl.notched_trailing}></div>
      </div>
    );
    }
  }

  return component;
};

export const DefaultComponent = (props: TextAreaProps) => {
  const {
    design,
    label,
    supportingText,
    errorText,
    characterCounter
  } = props;

  return (
    <>
    <label className={getDefaultClassName(props)}>
      <span className={cl.resizer}>
        <textarea onFocus={handleFocus} onBlur={handleFocus} className={cl.input} rows={8} cols={40} aria-label="Label"></textarea>
      </span>
      {addTextareaLabelIfExists(props)}
    </label>
    </>
  );
};
