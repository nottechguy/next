import React from "react";
import ClassList from "../classList";
import classNames from "classnames";

interface IconProps extends React.HTMLProps<HTMLElement> {
  slot: string,
  size?: number,
}

export default function Icon({ slot, size, ...props } : IconProps) {
  let iconClass = classNames(ClassList.icon.base_class, props.className !== undefined ? props.className : '');
  return (
    <span aria-hidden='false' className={iconClass}>{slot}</span>
  );
}

