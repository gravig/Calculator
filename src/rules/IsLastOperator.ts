import Token from "smei/Token";
import Rule from "../Rule";

const IsLastOperator: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 0) {
    return false;
  }
  const len = tokens.length;
  const last = tokens[len - 1];

  if (["PLUS", "MINUS", "STAR", "DIVIDE"].includes(last.type)) {
    return true;
  }
  return false;
};

export default IsLastOperator;
