import Token from "smei/Token";
import Rule from "../Rule";

const IsMinusFirst: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 1) {
    return false;
  }
  if (tokens[0].type === "MINUS") {
    return true;
  }

  return false;
};

export default IsMinusFirst;
