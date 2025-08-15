/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type FieldProps = {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: { message?: string } | null;
  required?: boolean;
};

const Field = ({ label, children, htmlFor, error, required }: FieldProps) => {
  const id = htmlFor || getChildId(children);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`text-white text-sm font-semibold ${required
            ? 'after:content-["*"] after:ml-0.5 after:text-pink-500'
            : 'after:content-["Optional"] after:ml-0.5 after:text-white'
            }`}
        >
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-400">
          {error.message}
        </div>
      )}
    </div>
  );
};
const getChildId = (children: React.ReactNode): string | undefined => {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<any>[];

  for (const child of childrenArray) {
    if (child?.props && typeof child.props?.id === "string") {
      return child.props?.id;
    }
  }
  return undefined;
};

export default Field;