import Subscription from "../../Subscription";
import styles from "./JoinWithUs.module.scss";

function JoinWithUs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2 className={styles.title}>
              See why over <span>250,000+</span> user have joined HappyMeal
            </h2>
            <Subscription />
            <p>100% FREE. No Spam. No Affiliate Links. No data sharing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinWithUs;
