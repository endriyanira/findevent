import React, { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

export interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?:boolean
}
const TextArea = ({
  name,
  placeholder,
  required,
  label,
  onChange,
}: ITextArea) => {
  return (
    <div className={styles.textAreaWrapper}>
      <label className={styles.textAreaLabelWrapper}>
      {!required  ?
        <span className={styles.textAreaLabelSpan}>{label}</span>
        :
        <span className={styles.textAreaLabelSpan}>{label}<span className="text-red-700">{" *"}</span></span>
      }
        <textarea
          placeholder={placeholder}
          className={styles.textAreaForm}
          onChange={onChange}
          required={required}
          rows={5}
        />
      </label>
    </div>
  );
};

export default TextArea;
