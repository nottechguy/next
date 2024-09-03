import ClassList from 'src/components/classList';
import { CheckboxProps } from "./CheckboxProps";

export default function Checkbox(props : CheckboxProps) {

  const getDefaultClassName = () : string => {
    let className = ClassList.checkbox.base_class;
    if (props.hasOwnProperty('disabled')) {
      className += ` ${ClassList.checkbox.disabled}`;
    }
    return className;
  };
  return (
    <div className={getDefaultClassName()}>
      <input className={ClassList.checkbox.control} type="checkbox" tabIndex={0} disabled={props.disabled} />
      <div className={ClassList.checkbox.background}>
        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className={ClassList.checkbox.checkmark}>
          <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" className={ClassList.checkbox.checkmark_path}></path>
        </svg>
        <div></div>
      </div>
    </div>
  );
}
