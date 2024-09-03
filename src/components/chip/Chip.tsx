import React from "react";
import Icon from "src/components/icon/Icon";
import ClassList from "src/components/classList";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const handleChipClick = (event: React.MouseEvent<Element, MouseEvent>) : void => {
  let parent = event.target;
  console.log(parent)
};

export function Chip({ text, ...props } : ChipProps) {
  return (
      <button className={ClassList.chip.base_class} type="button" {...props} onClick={handleChipClick}>
      <Icon slot="check" size={16} />
      <span>{text}</span>
    </button>
  );
}
