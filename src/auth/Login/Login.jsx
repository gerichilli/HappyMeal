import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styles from "../auth.module.scss";
import { AiOutlineGoogle, AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Input from "../../components/Input";
import Seo from "../../components/Seo";
import { postGoogleLogin, postLogin } from "../../services/authService";
import { doLogin } from "../../redux/action/userAction";
import { validateEmail, validatePassword, validateAll } from "../../utils/formValidate";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isAbleToValidate, setIsAbleToValidate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const time = mode === "resetPassword" ? 500 : 0;

    const timeout = setTimeout(() => {
      if (isAuthenticated) {
        navigate(state?.redirectTo || "/");
      }
    }, time);

    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsAbleToValidate(true); // Only start validating after user has submitted the form

    setEmail({ ...email, error: validateEmail(email.value).message });
    setPassword({ ...password, error: validatePassword(password.value).message });
    let validated = validateAll(validateEmail(email.value), validatePassword(password.value));

    if (validated) {
      setIsSubmitted(true);
      const waitting = toast.loading("Please wait...");
      const res = await postLogin(email.value, password.value);
      toast.dismiss(waitting);

      if (res && res.data) {
        toast.success("You are successfully logged in.");
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

  return (
    <>
      <Seo title="Login" />
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTop}>
            <h1>Welcome back</h1>
            <p>Please enter your details</p>
          </div>
          <div className={styles.formMain}>
            <Input
              icon={<MdEmail />}
              label="Username"
              type="email"
              placeholder="Enter email"
              value={email.value}
              handleChangeValue={handleChangeEmail}
              error={email.error}
            />
            <Input
              icon={<AiFillEye />}
              label="Password"
              type="password"
              placeholder="Password"
              password={password.value}
              handleChangeValue={handleChangePassword}
              error={password.error}
            />
            <Link className={styles.forgotMessage} to="/forgot-password">
              Forgot Password?
            </Link>
            <button className={styles.submit} type="submit" disabled={isSubmitted}>
              Log in
            </button>
            <p className={styles.snsMessage}>Or Log in with</p>
            <button className={styles.snsButton} type="button" onClick={handleGoogleLogin}>
              <AiOutlineGoogle /> Google
            </button>
            <p className={styles.changeActionMessage}>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
