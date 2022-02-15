import Token from "smei/Token";
import Rule from "../Rule";

const IsLastGrouping: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 0) {
    return false;
  }
  const len = tokens.length;
  const last = tokens[len - 1];

  if (["LEFT_PAREN", "RIGHT_PAREN"].includes(last.type)) {
    return true;
  }
  return false;
};

export default IsLastGrouping;
