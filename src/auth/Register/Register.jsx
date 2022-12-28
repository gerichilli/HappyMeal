import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../auth.module.scss";
import { AiOutlineGoogle, AiFillIdcard, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { validateUserName, validateEmail, validatePassword, validateRePassword, validateAll } from "../../utils/formValidate";
import Seo from "../../components/Seo";
import { fetchUserAuth } from "../../redux/slices/userSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.account.isAuthenticated);
  const isLoading = useSelector((state) => state.user.account.isLoading);
  const isError = useSelector((state) => state.user.account.isError);
  const toastMessage = useSelector((state) => state.user.toastMessage);

  const [userName, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [rePassword, setRePassword] = useState({ value: "", error: "" });
  const [isAbleToValidate, setIsAbleToValidate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return;

    if (isLoading) {
      toast.loading("Please wait...");
    } else {
      toast.dismiss();

      if (isError) {
        setIsSubmitted(false);
        toast.error(toastMessage);
      }

      if (isAuthenticated) {
        toast.success("Register successful!");
        navigate("/", { replace: true });
      }
    }
  }, [isLoading, isError, toastMessage, isSubmitted, isAuthenticated]);

  function handleChangeUserName(event) {
    let message = isAbleToValidate ? validateUserName(event.target.value).message : "";
    setUsername({ value: event.target.value, error: message });
  }

  function handleChangeEmail(event) {
    let message = isAbleToValidate ? validateEmail(event.target.value).message : "";
    setEmail({ value: event.target.value, error: message });
  }

  function handleChangePassword(event) {
    let message = isAbleToValidate ? validatePassword(event.target.value).message : "";
    setPassword({ value: event.target.value, error: message });
  }

  function handleChangeRePassword(event) {
    let message = isAbleToValidate ? validateRePassword(event.target.value, password.value).message : "";
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
      dispatch(fetchUserAuth({ displayName: userName.value, email: email.value, password: password.value, type: "register" }));
    }
  }

  async function handleGoogleLogin() {
    setIsSubmitted(true);
    dispatch(fetchUserAuth({ method: "google" }));
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
