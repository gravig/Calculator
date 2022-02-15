import Token from "smei/Token";
import Rule from "../Rule";

const IsFirst: Rule<Token[]> = (tokens: Token[]) => {
  if (tokens.length <= 0) {
    return true;
  }
  return false;
};

export default IsFirst;
