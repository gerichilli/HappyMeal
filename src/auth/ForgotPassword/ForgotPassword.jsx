import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "../auth.module.scss";
import { MdEmail } from "react-icons/md";
import Input from "../../components/Input";
import Seo from "../../components/Seo";
import { postResetPassword } from "../../services/authService";
import { validateEmail } from "../../utils/formValidate";

function Login() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ email: "" });
  const [isAbleToValidate, setIsAbleToValidate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    if (isAbleToValidate) {
      const { message } = validateEmail(event.target.value);
      setError((error) => {
        return { ...error, email: message };
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsAbleToValidate(true); // Only start validating after user has submitted the form

    setError({ email: validateEmail(email).message });
    let validated = validateEmail(email).isValid;

    if (validated) {
      setIsSubmitted(true);
      const waitting = toast.loading("Please wait...");
      const res = await postResetPassword(email);
      toast.dismiss(waitting);

      if (res && res.data) {
        toast.success(res.data);
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
    <>
      <Seo title="Login" />
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTop}>
            <p>To reset your password, enter your email address below.</p>
          </div>
          <div className={styles.formMain}>
            <Input
              icon={<MdEmail />}
              label="Email Address"
              type="email"
              placeholder="Email"
              value={email}
              handleChangeValue={handleChangeEmail}
              error={error.email}
            />
            <button className={styles.submit} type="submit" disabled={isSubmitted}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;