import { Link } from "react-router-dom";
import styles from "../auth.module.scss";
import { AiOutlineGoogle, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

function Login() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.formTop}>
          <h1>Welcome back</h1>
          <p>Please enter your details</p>
        </div>
        <div className={styles.formMain}>
          <label>
            <p className="sr-only">Username</p>
            <input type="text" placeholder="Enter email/username" className={styles.input} />
            <MdEmail className={styles.inputIcon} />
            {/* <p className={styles.errorMessage}>Invalid username</p> */}
          </label>
          <label>
            <p className="sr-only">Password</p>
            <input type="password" placeholder="Password" className={styles.input} />
            <AiFillEye className={styles.inputIcon} />
          </label>
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
