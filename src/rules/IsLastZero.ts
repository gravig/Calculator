import Token from "smei/Token";
import Rule from "../Rule";

const IsLastZero: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 0) {
    return false;
  }
  const len = tokens.length;
  const last = tokens[len - 1];

  if (last.lexeme === "0") {
    return true;
  }
  return false;
};

export default IsLastZero;
