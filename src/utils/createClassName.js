/**
 * Return a string of class names
 * @param  {...String} args
 * @returns
 */

export default function createClassName(...args) {
  return args.filter(Boolean).join(" ");
}
