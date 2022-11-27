import { Link } from "react-router-dom";
import useAlphabetSort from "../../utils/useAlphabetSort";
import styles from "./AlphabetLayout.module.scss";

function AlphabetLayout({ list, sortBy, displayBy, path }) {
  const sortedList = useAlphabetSort(list, sortBy);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <ul className={styles.letterList}>
          {sortedList &&
            sortedList.length > 0 &&
            sortedList.map((item, index) => (
              <li key={item.firstLetter}>
                <h2 className={styles.firstLetter}>{item.firstLetter}</h2>
                <ul className={styles.list}>
                  {item.list &&
                    item.list.length > 0 &&
                    item.list.map((item) => (
                      <li key={item[displayBy]}>
                        <Link to={`${path}/${item[displayBy]}`} className={styles.link}>
                          {item[displayBy]}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AlphabetLayout;
