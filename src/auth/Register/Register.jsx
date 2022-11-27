import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "../auth.module.scss";
import { AiOutlineGoogle, AiFillIdcard, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../services/apiServices";
import toast from "react-hot-toast";
import { doLogin } from "../../redux/action/userAction";

function Register() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState({ userName: "", email: "", password: "", rePassword: "" });
  const [isAbleToValidate, setIsAbleToValidate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validateUserName(userName) {
    if (userName.trim() === "") {
      setError((error) => {
        return { ...error, userName: "Username is required" };
      });
      return false;
    } else if (userName.trim().length > 16) {
      setError((error) => {
        return { ...error, userName: "Username should be less than 16 characters" };
      });
      return false;
    } else {
      setError((error) => {
        return { ...error, userName: "" };
      });
      return true;
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.trim() === "") {
      setError((error) => {
        return { ...error, email: "Username/email is required" };
      });
      return false;
    } else if (!emailRegex.test(email)) {
      setError((error) => {
        return { ...error, email: "Invalid email" };
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
    } else if (password.trim().length < 8) {
      setError((error) => {
        return { ...error, password: "Password must be at least 8 characters" };
      });
      return false;
    } else {
      setError((error) => {
        return { ...error, password: "" };
      });
      return true;
    }
  }

  function validateRePassword(rePassword) {
    if (rePassword.trim() === "") {
      setError((error) => {
        return { ...error, rePassword: "Password is required" };
      });
      return false;
    } else if (rePassword.trim() !== password) {
      setError((error) => {
        return { ...error, rePassword: "Password does not match" };
      });
      return false;
    } else {
      setError((error) => {
        return { ...error, rePassword: "" };
      });
      return true;
    }
  }

  function handleChangeUserName(event) {
    setUsername(event.target.value);
    if (isAbleToValidate) {
      validateUserName(event.target.value);
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

  function handleChangeRePassword(event) {
    setRePassword(event.target.value);
    if (isAbleToValidate) {
      validateRePassword(event.target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsAbleToValidate(true);

    let validated = validateUserName(userName) && validateEmail(email) && validatePassword(password) && validateRePassword(rePassword);

    if (validated) {
      setIsSubmitted(true);
      const res = await postRegister(userName, email, password);

      if (res && res.status === 200) {
        toast.success("You are successfully registered");
        dispatch(doLogin(res.data));
      } else {
        toast.error(res);
        setIsSubmitted(false);
      }
    }
  }

  if (isAuthenticated) {
    // Redirect to home page if user is authenticated
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formTop}>
          <h1>Create new account</h1>
          <p>Start for free</p>
        </div>
        <div className={styles.formMain}>
          <Input icon={<AiFillIdcard />} label="Username" type="text" placeholder="Username" value={userName} handleChangeValue={handleChangeUserName} error={error.userName} />
          <Input icon={<MdEmail />} label="Username" type="email" placeholder="Email" value={email} handleChangeValue={handleChangeEmail} error={error.email} />
          <Input icon={<AiFillEye />} label="Password" type="password" placeholder="Password (at least 8 characters)" value={password} handleChangeValue={handleChangePassword} error={error.password} />
          <Input icon={<AiFillEye />} label="Password" type="password" placeholder="Repeat Password" value={rePassword} handleChangeValue={handleChangeRePassword} error={error.rePassword} />
          <button className={styles.submit} type="submit" disabled={isSubmitted}>
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
