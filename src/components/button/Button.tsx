import { ButtonProps, AnchorButtonProps } from "./ButtonProps";

import ClassList from "src/components/classList";
import Icon from "src/components/icon/Icon";
import { Ripple } from "src/components/ripple/Ripple";

const cl = ClassList.button;

const getDefaultClassName = (props: ButtonProps|AnchorButtonProps) : string => {
  let className = `${cl.base_class}`;

  switch (props.design) {
    case 'outlined'  : className += ` ${cl.outlined}`;  break;
    case 'contained' : className += ` ${cl.contained}`; break;
    case 'raised'    : className += ` ${cl.raised}`;    break;
    case 'text'      : className += ` ${cl.text}`;      break;
    default:
      className += ` ${cl.contained}`;
  }

  if (Object.prototype.hasOwnProperty.call(props, 'disabled')) {
    className += ` ${cl.disabled}`;
  }

  return className;
};

const getIconClassName = (baseClass : string) : string => {
  return `${cl.icon} ${baseClass}`;
};

export function Button(props : ButtonProps) {
  const { text, leadingIcon, trailingIcon, ...restProps } = props;
  let className = getDefaultClassName(props);
  return (
    <button className={className} {...restProps}>
      {leadingIcon !== undefined && <Icon slot={leadingIcon} className={getIconClassName(cl.leading_icon)} />}
      <span className={cl.label}>{text}</span>
      {trailingIcon !== undefined && <Icon slot={trailingIcon} className={getIconClassName(cl.trailing_icon)} />}
      <Ripple />
    </button>
  );
}

export function AnchorButton(props: AnchorButtonProps) {
  const { href, text, leadingIcon, trailingIcon, ...restProps } = props;
  let className = getDefaultClassName(props);
  return (
    <a className={className} href={href} {...restProps}>
      {leadingIcon !== undefined && <Icon slot={leadingIcon} className={getIconClassName(cl.leading_icon)} />}
      <span className={cl.label}>{text}</span>
      {trailingIcon !== undefined && <Icon slot={trailingIcon} className={getIconClassName(cl.trailing_icon)} />}
    </a>
  );
}

export default Button;
