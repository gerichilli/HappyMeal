import styles from "./Badge.module.scss";
import createClassName from "../../utils/createClassName";

function Badge({ text }) {
  if (!text) return null;

  let number = 1;
  let firstLetter = text[0].toLowerCase();

  if (firstLetter >= "a" && firstLetter < "d") {
    number = 2;
  } else if (firstLetter >= "d" && firstLetter < "i") {
    number = 3;
  } else if (firstLetter >= "i" && firstLetter < "o") {
    number = 4;
  } else if (firstLetter >= "o" && firstLetter < "x") {
    number = 5;
  }

  return <span className={createClassName(styles.badge, styles[`badge--${number}`])}>{text}</span>;
}

export default Badge;
