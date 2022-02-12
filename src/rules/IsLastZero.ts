import Token from "smei/Token";
import Rule from "../Rule";

const IsLastZero: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 1) {
    return false;
  }
  const len = tokens.length;
  // -2 - skip EOF token
  const last = tokens[len - 2];

  if (last.lexeme === "0") {
    return true;
  }
  return false;
};

export default IsLastZero;
