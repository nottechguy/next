import ClassList from "src/components/classList";
import React from "react";

interface FormFieldProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode
}

export default function FormField({ children, ...props } : FormFieldProps) {
  return (
    <div className={ClassList.form.field}>
      {children}
    </div>
  );
}
