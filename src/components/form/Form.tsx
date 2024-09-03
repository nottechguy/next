import ClassList from "src/components/classList";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode
}

function Form({ children, ...props } : FormProps) {
  return (
    <form className={ClassList.form.base_class} action={props.action} method={props.method} acceptCharset="utf-8">
      {children}
    </form>
  );
}

export default Form;
