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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsAbleToValidate(true); // Only start validating after user has submitted the form

    setError({ email: validateEmail(email).message, password: validatePassword(password).message });
    let validated = validateAll(validateEmail(email), validatePassword(password));

    if (validated) {
      setIsSubmitted(true);
      const waitting = toast.loading("Please wait...");
      const res = await postLogin(email, password);
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
              value={email}
              handleChangeValue={handleChangeEmail}
              error={error.email}
            />
            <Input
              icon={<AiFillEye />}
              label="Password"
              type="password"
              placeholder="Password"
              password={password}
              handleChangeValue={handleChangePassword}
              error={error.password}
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
