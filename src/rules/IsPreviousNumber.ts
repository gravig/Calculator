import Token from "smei/Token";
import Rule from "../Rule";

const IsPreviousNumber: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 0) {
    return false;
  }
  const len = tokens.length;
  const last = tokens[len - 1];

  if (last.type === "NUMBER") {
    return true;
  }
  return false;
};

export default IsPreviousNumber;
