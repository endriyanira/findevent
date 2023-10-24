import { ButtonHTMLAttributes } from "react";

import classNames from "classnames";
import styles from "./Button.module.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  label: string;
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  active?: boolean;
  big?: boolean;
  filterButton?: boolean;
  defaultButton?: boolean;
  disabled?: boolean;
  loading?:boolean
}

const Button = ({
  type,
  label,
  onSubmit,
  onClick,
  primary,
  secondary,
  small,
  active,
  big,
  filterButton,
  defaultButton,
  disabled,
  loading,
  ...rest
}: IButton) => {
  const wrapperClasses = classNames({
    [styles.buttonFilterWrapper]: filterButton,
    [styles.buttonDefault]: defaultButton,
  });
  const ButtonClasses = classNames(styles.button, {
    [styles.buttonSecondary]: secondary,
    [styles.buttonSmall]: small,
    [styles.buttonBig]: big,
    [styles.buttonPrimary]: active,
    [styles.buttonDisabled]: disabled,
  });
  return (
    <div className={wrapperClasses}>
      <button
        type={type}
        className={ButtonClasses}
        onSubmit={onSubmit}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {loading ?
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          </svg>
        : label}
      </button>
    </div>
  );
};

export default Button;
