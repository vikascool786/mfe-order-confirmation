import React, { ReactNode } from "react";
import "./styles.css";

interface IFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  renderCheckBox?: ReactNode;
  required?: boolean;
  extraLabel?: string;
  errorMessage?: string | false | undefined;
  errorRefs?: React.MutableRefObject<{
    [key: string]: HTMLInputElement | null;
  }> | null;
  maxLength?: number;
  qaTag?: string;
  disablePasswordManager?: boolean;
  formName?: string;
}
const sanitizeInput = (value: string, fieldName: string) => {
  // Allow hyphens only for the "phone" field
  if (fieldName === "phone") {
    return value.replace(/[^0-9-]/g, ""); // only digits and hyphens
  }
  return value.replace(/[^a-zA-Z0-9 .,]/g, "");
};

export const FormField: React.FC<IFormFieldProps> = ({
  label,
  required,
  extraLabel,
  errorMessage,
  renderCheckBox,
  name,
  errorRefs = null,
  maxLength,
  qaTag = "",
  formName,
  className,
  type,
  ...props
}) => {
  const shouldAddInputContainer =
    type !== "checkbox" && !className?.includes("oc-input-container");
  const baseClasses = [
    qaTag,
    shouldAddInputContainer ? "oc-input-container" : "",
    errorMessage ? "error-border" : "",
    props.disablePasswordManager ? "disable-password-manager" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="oc-field-item-container">
      {label && (
        <label htmlFor={formName} className={required ? "oc-required-field" : ""}>
          {label}
        </label>
      )}
      <div className="oc-input-wrapper">
        <input
          className={baseClasses}
          type={type}
          ref={(el) => {
            if (el && errorRefs?.current && name) {
              errorRefs.current[name] = el;
            }
          }}
          {...props}
          name={name}
          maxLength={maxLength}
          onChange={(e) => {
            const sanitizedValue = sanitizeInput(e.target.value, name!); // pass field name
            e.target.value = sanitizedValue;
            props.onChange?.(e);
          }}
        />
        {errorMessage && (
          <span className="oc-material-symbols-outlined oc-error-icon">error</span>
        )}
      </div>
      {errorMessage && <div className="oc-error-message">{errorMessage}</div>}
      {extraLabel && <div className="oc-field-extra-label">{extraLabel}</div>}
      {renderCheckBox}
    </div>
  );
};
