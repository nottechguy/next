import ClassList from "src/components/classList";
import { handleFocus, handleKeyEvent } from "./TextfieldAdapter";
import Icon from "src/components/icon/Icon";
import { TextfieldProps } from "./TextfieldProps";
import React from "react";

let cl = ClassList.textfield;

const getDefaultClassName = (props : TextfieldProps) : string => {
  let className = cl.base_class + ` ${props.design == 'outlined' ? cl.outlined : cl.filled}`;

  if (props.disabled) {
    className += ` ${cl.disabled}`;
  }

  if (props.leadingIcon) {
    className += ` ${cl.with_leading_icon}`;
  }

  if (props.trailingIcon) {
    className += ` ${cl.with_trailing_icon}`;
  }

  if (props.value !== undefined && props.value.toString().length > 0) {
    className += ` ${cl.label_floating}`;
  }

  return className;
};

const getIconClassName = (baseClass : string) : string => {
  return ` ${ClassList.textfield.icon} ${baseClass}`;
};

const addLeadingIconOrPrefix = (leadingIcon: string | undefined, prefix: string | undefined) => {
  let component;
  if (leadingIcon !== undefined && prefix == undefined) {
    component = <Icon slot={leadingIcon} className={getIconClassName(cl.icon_leading)} />
  }

  if (leadingIcon == undefined && prefix !== undefined) {
    component = <span className={cl.prefix}>{prefix}</span>
  }
  return component;
};

const addTrailingIconOrSuffix = (trailingIcon: string | undefined, suffix: string | undefined) => {
  let component;
  if (trailingIcon !== undefined && suffix == undefined) {
    component = <Icon slot={trailingIcon} className={getIconClassName(cl.icon_trailing)} />
  }

  if (trailingIcon == undefined &&  suffix !== undefined) {
    component = <span className={cl.suffix}>{suffix}</span>
  }
  return component;
};

const addTextfieldLabelIfExists = (props: TextfieldProps) => {

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

const addsupportingTextIfExists = (supportingText: string | undefined) => {
  if (typeof supportingText === "string" && supportingText.trim().length == 0) return "";
  return (
    <div className={cl.helper_text}>{supportingText}</div>
  );
};

const addCharacterCounterIfExists = (characterCounter: string | undefined) => {
  if (characterCounter == undefined) return "";
  return <div className={cl.character_counter}>0 / {characterCounter}</div>
};


export function DefaultComponent(props : TextfieldProps) : React.JSX.Element {

  const {
    label,
    design,
    value,
    leadingIcon,
    trailingIcon,
    suffix,
    prefix,
    supportingText,
    errorText,
    characterCounter,
    ...rest
  } = props;

  return (<>
    <label className={getDefaultClassName(props)}>
      {addLeadingIconOrPrefix(leadingIcon, prefix)}
      <input  {...(props.characterCounter ? { onKeyUp: (event: React.KeyboardEvent) => {handleKeyEvent(event)}} : {})}
              onFocus={handleFocus}
              onBlur={handleFocus}
              className={cl.input}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              {...rest}
              maxLength={props.characterCounter !== undefined ? parseInt(props.characterCounter) : props.maxLength || 1000} />{addTrailingIconOrSuffix(trailingIcon, suffix)}
      {addTextfieldLabelIfExists(props)}
    </label>
    {supportingText !== undefined || characterCounter !== undefined ? (
      <div className={cl.helper_line}>
        {addsupportingTextIfExists(supportingText!)}
        {addCharacterCounterIfExists(characterCounter)}
      </div>
    ) : (<></>)}
    </>
  );

}
