import ChipsetProps from "./ChipsetProps";
import ClassList from "@components/classList";

export function Chipset({ design, children, ...props } : ChipsetProps) {
  return (
    <div className={ClassList.chip.chipset} {...props}>
      {children}
    </div>
  );
}
