import styles from "./Event.module.scss";

function Event() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.description}>
            <h2>
              Greek Cooking
              <br />
              Workshop
            </h2>
            <p>
              Join us for a celebration of Greek seasonal cooking and warm Greek hospitality - it
              would't be a Greek feast without lots of food and drinks on offer, would it?
            </p>
            <div className={styles.tags}>
              <span>#2021-10-20</span>
              <span className={styles.highlight}>#Chef Despina Siahuli</span>
              <br />
              <span>#Traditional Greek pies</span>
            </div>
          </div>
          <div className={styles.cta}>
            <div className={styles.card}>
              <h3>Greek Cooking Workshop</h3>
              <div className={styles.info}>
                <div>Date</div>
                <div>2021-10-20</div>
              </div>
              <div className={styles.info}>
                <div>Time</div>
                <div>13:00</div>
              </div>
              <div className={styles.info}>
                <div>Place</div>
                <div>1651 High Meadow Lane</div>
              </div>
              <button className={styles.btn}>Follow this Event</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.image}></div>
    </section>
  );
}

export default Event;
