import Token from "smei/Token";
import Rule from "../Rule";

const IsPreviousNumber: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 1) {
    return false;
  }
  const len = tokens.length;
  // -2 - skip EOF token
  const last = tokens[len - 2];

  if (last.type === "NUMBER") {
    return true;
  }
  return false;
};

export default IsPreviousNumber;
