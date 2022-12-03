import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import styles from "../auth.module.scss";
import { AiOutlineGoogle, AiFillIdcard, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { postGoogleLogin, postRegister } from "../../services/authService";
import toast from "react-hot-toast";
import { validateUserName, validateEmail, validatePassword, validateRePassword, validateAll } from "../../utils/formValidate";
import { doLogin } from "../../redux/action/userAction";
import Seo from "../../components/Seo";

function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState({ userName: "", email: "", password: "", rePassword: "" });
  const [isAbleToValidate, setIsAbleToValidate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChangeUserName(event) {
    setUsername(event.target.value);
    if (isAbleToValidate) {
      const { message } = validateUserName(event.target.value);
      setError((error) => {
        return { ...error, userName: message };
      });
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (isAbleToValidate) {
      const { message } = validateEmail(event.target.value);
      setError((error) => {
        return { ...error, email: message };
      });
    }
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    if (isAbleToValidate) {
      const { message } = validatePassword(event.target.value);
      setError((error) => {
        return { ...error, password: message };
      });
    }
  }

  function handleChangeRePassword(event) {
    setRePassword(event.target.value);
    if (isAbleToValidate) {
      const { message } = validateRePassword(event.target.value, password);
      setError((error) => {
        return { ...error, rePassword: message };
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsAbleToValidate(true);

    setError({
      userName: validateUserName(userName).message,
      email: validateEmail(email).message,
      password: validatePassword(password).message,
      rePassword: validateRePassword(rePassword, password).message,
    });

    let validated = validateAll(
      validateUserName(userName),
      validateEmail(email),
      validatePassword(password),
      validateRePassword(rePassword, password)
    );

    if (validated) {
      setIsSubmitted(true);
      const waitting = toast.loading("Please wait...");
      const res = await postRegister(userName, email, password);
      toast.dismiss(waitting);

      if (res && res.data) {
        toast.success("You are successfully registered");
        dispatch(doLogin(res.data));
      } else {
        toast.error(res);
        setIsSubmitted(false);
      }
    }
  }

  async function handleGoogleLogin() {
    setIsSubmitted(true);
    const res = await postGoogleLogin();

    if (res && res.data) {
      toast.success("You are successfully logged in.");
      dispatch(doLogin(res.data));
    } else {
      toast.error(res);
      setIsSubmitted(false);
    }
  }

  if (isAuthenticated) {
    // Redirect to home page if user is authenticated
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Seo title="Register" path={location.pathname} />
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTop}>
            <h1>Create new account</h1>
            <p>Start for free</p>
          </div>
          <div className={styles.formMain}>
            <Input
              icon={<AiFillIdcard />}
              label="Username"
              type="text"
              placeholder="Username"
              value={userName}
              handleChangeValue={handleChangeUserName}
              error={error.userName}
            />
            <Input
              icon={<MdEmail />}
              label="Username"
              type="email"
              placeholder="Email"
              value={email}
              handleChangeValue={handleChangeEmail}
              error={error.email}
            />
            <Input
              icon={<AiFillEye />}
              label="Password"
              type="password"
              placeholder="Password (at least 8 characters)"
              value={password}
              handleChangeValue={handleChangePassword}
              error={error.password}
            />
            <Input
              icon={<AiFillEye />}
              label="Password"
              type="password"
              placeholder="Repeat Password"
              value={rePassword}
              handleChangeValue={handleChangeRePassword}
              error={error.rePassword}
            />
            <button className={styles.submit} type="submit" disabled={isSubmitted}>
              Sign up
            </button>
            <p className={styles.snsMessage}>Or Sign up with</p>
            <button className={styles.snsButton} type="button" onClick={handleGoogleLogin}>
              <AiOutlineGoogle /> Google
            </button>
            <p className={styles.changeActionMessage}>
              Have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
