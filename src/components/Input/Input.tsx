import { InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  desc?: string;
  validation?: string;
  className?:string
  required?:boolean
}

const Input = ({
  type,
  id,
  label,
  value,
  name,
  placeholder,
  validation,
  onChange,
  disabled,
  required,
  pattern,
  className,
}: IInput) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.labelWrapper} htmlFor={name}>        
      {required && className === "topup" ?
        <span className={styles.spanInputLabel}>{label}</span>
        :
        <span className={styles.spanInputLabel}>{label}<span className="text-red-700">{" *"}</span></span>
      }
        <input
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${styles.inputForm} ${
            disabled && "bg-[#F5F5F5]"
          } ... peer ${className  === "topup" && styles.TopUpForm}`}
          pattern={pattern}
        />
        {validation !== "" && (
          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            {validation}
          </span>
        )}
      </label>
    </div>
  );
};

export default Input;
