import { Link } from "react-router-dom";
import styles from "../auth.module.scss";
import { AiOutlineGoogle, AiFillIdcard, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

function Register() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.formTop}>
          <h1>Create new account</h1>
          <p>Start for free</p>
        </div>
        <div className={styles.formMain}>
          <label>
            <p className="sr-only">Username</p>
            <input type="text" placeholder="Username" className={styles.input} />
            <AiFillIdcard className={styles.inputIcon} />
          </label>
          <label>
            <p className="sr-only">Email</p>
            <input type="text" placeholder="Email" className={styles.input} />
            <MdEmail className={styles.inputIcon} />
          </label>
          <label>
            <p className="sr-only">Password</p>
            <input type="password" placeholder="Password (at least 8 characters)" className={styles.input} />
            <AiFillEye className={styles.inputIcon} />
          </label>
          <label>
            <p className="sr-only">Repeat Password</p>
            <input type="password" placeholder="Repeat Password" className={styles.input} />
            <AiFillEye className={styles.inputIcon} />
          </label>
          <button className={styles.submit} type="submit">
            Sign up
          </button>
          <p className={styles.snsMessage}>Or Sign up with</p>
          <button className={styles.snsButton} type="button">
            <AiOutlineGoogle /> Google
          </button>
          <p className={styles.changeActionMessage}>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
