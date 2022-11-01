import styles from "./Subscription.module.scss";

// TODO: Write email validation function
// TODO: Using emailjs, send email to the user
// TODO: Add a success message
function Subscription() {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <input
          name="email"
          type="email"
          placeholder="Your email address"
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.btn}>
        Get Started
      </button>
    </form>
  );
}

export default Subscription;
