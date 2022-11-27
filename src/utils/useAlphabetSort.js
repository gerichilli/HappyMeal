export default function useAlphabetSort(list, sortByProperties) {
  return list
    .reduce((acc, cur) => {
      let firstLetter = cur[sortByProperties].charAt(0).toUpperCase();
      const letterIndex = acc.findIndex((item) => item.firstLetter === firstLetter);

      if (letterIndex > -1) {
        acc[letterIndex].list.push(cur);
      } else {
        acc.push({ firstLetter, list: [cur] });
      }

      return acc;
    }, [])
    .sort((a, b) => {
      if (a.firstLetter < b.firstLetter) {
        return -1;
      } else if (a.firstLetter > b.firstLetter) {
        return 1;
      }

      return 0;
    });
}
