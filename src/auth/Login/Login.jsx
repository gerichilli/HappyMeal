import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../auth.module.scss";
import { AiOutlineGoogle, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Input from "../../components/Input";
import { doLogin } from "../../services/apiServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [isAbleToValidate, setIsAbleToValidate] = useState(false);

  function validateEmail(email) {
    if (email.trim() === "") {
      setError((error) => {
        return { ...error, email: "Email is required" };
      });
      return false;
    } else {
      setError((error) => {
        return { ...error, email: "" };
      });
      return true;
    }
  }

  function validatePassword(password) {
    if (password.trim() === "") {
      setError((error) => {
        return { ...error, password: "Password is required" };
      });
      return false;
    } else {
      setError((error) => {
        return { ...error, password: "" };
      });
      return true;
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (isAbleToValidate) {
      validateEmail(event.target.value);
    }
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    if (isAbleToValidate) {
      validatePassword(event.target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsAbleToValidate(true); // Only start validating after user has submitted the form

    let validated = validateEmail(email) && validatePassword(password);
    console.log(validated);
    if (validated) {
      doLogin(email, password);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formTop}>
          <h1>Welcome back</h1>
          <p>Please enter your details</p>
        </div>
        <div className={styles.formMain}>
          <Input icon={<MdEmail />} label="Username" type="email" placeholder="Enter email" value={email} handleChangeValue={handleChangeEmail} error={error.email} />
          <Input icon={<AiFillEye />} label="Password" type="password" placeholder="Password" password={password} handleChangeValue={handleChangePassword} error={error.password} />
          <p className={styles.forgotMessage}>Forgot Password?</p>
          <button className={styles.submit} type="submit">
            Log in
          </button>
          <p className={styles.snsMessage}>Or Log in with</p>
          <button className={styles.snsButton} type="button">
            <AiOutlineGoogle /> Google
          </button>
          <p className={styles.changeActionMessage}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
