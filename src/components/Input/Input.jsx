import { useState } from "react";
import styles from "./Input.module.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import createClassName from "../../utils/createClassName";

function Input({ icon, label, type, placeholder, value, handleChangeValue, error, ...props }) {
  const inputClasses = createClassName(styles.input, error && styles.inputError);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <label className={styles.wrapper}>
      <p className="sr-only">{label}</p>
      <input
        type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onChange={handleChangeValue}
        {...props}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
      {type === "password" ? (
        <span className={styles.inputIcon} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      ) : (
        <span className={styles.inputIcon}>{icon}</span>
      )}
    </label>
  );
}

export default Input;
