import ClassList from "src/components/classList";
import { RippleProps } from "./RippleProps";

const cl = ClassList.ripple;

const getDefaultClassName = (props: RippleProps) => {
  let className = cl.base_class;
  if (props.fill) {
    className.concat(` ${cl.fill}`);
  }
  return className;
};

export const Ripple = (props: RippleProps) : React.JSX.Element => {
  return (
    <span className={getDefaultClassName(props)}></span>
  );
};
