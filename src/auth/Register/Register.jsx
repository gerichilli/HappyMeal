import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [userName, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [rePassword, setRePassword] = useState({ value: "", error: "" });
  const [isAbleToValidate, setIsAbleToValidate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChangeUserName(event) {
    let message = "";
    if (isAbleToValidate) {
      message = validateUserName(event.target.value).message;
    }
    setUsername({ value: event.target.value, error: message });
  }

  function handleChangeEmail(event) {
    let message = "";
    if (isAbleToValidate) {
      message = validateEmail(event.target.value).message;
    }
    setEmail({ value: event.target.value, error: message });
  }

  function handleChangePassword(event) {
    let message = "";
    if (isAbleToValidate) {
      message = validatePassword(event.target.value).message;
    }
    setPassword({ value: event.target.value, error: message });
  }

  function handleChangeRePassword(event) {
    let message = "";
    if (isAbleToValidate) {
      message = validateRePassword(event.target.value, password.value).message;
    }
    setRePassword({ value: event.target.value, error: message });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsAbleToValidate(true);

    setUsername({ ...userName, error: validateUserName(userName.value).message });
    setEmail({ ...email, error: validateEmail(email.value).message });
    setPassword({ ...password, error: validatePassword(password.value).message });
    setRePassword({ ...rePassword, error: validateRePassword(rePassword.value, password.value).message });

    let validated = validateAll(
      validateUserName(userName.value),
      validateEmail(email.value),
      validatePassword(password.value),
      validateRePassword(rePassword.value, password.value)
    );

    if (validated) {
      setIsSubmitted(true);
      const waitting = toast.loading("Please wait...");
      const res = await postRegister(userName.value, email.value, password.value);
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
      <Seo title="Register" />
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTop}>
            <h1>Create new account</h1>
            <p>Start for free</p>
          </div>
          <div className={styles.formMain}>
            <Input
              icon={<AiFillIdcard />}
              label="Email Address"
              type="text"
              placeholder="Username"
              value={userName.value}
              handleChangeValue={handleChangeUserName}
              error={userName.error}
            />
            <Input
              icon={<MdEmail />}
              label="Username"
              type="email"
              placeholder="Email"
              value={email.value}
              handleChangeValue={handleChangeEmail}
              error={email.error}
            />
            <Input
              icon={<AiFillEye />}
              label="Password"
              type="password"
              placeholder="Password (at least 8 characters)"
              value={password.value}
              handleChangeValue={handleChangePassword}
              error={password.error}
            />
            <Input
              icon={<AiFillEye />}
              label="Password"
              type="password"
              placeholder="Repeat Password"
              value={rePassword.value}
              handleChangeValue={handleChangeRePassword}
              error={rePassword.error}
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
