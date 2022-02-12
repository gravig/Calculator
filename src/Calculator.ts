import { Interpreter, Lexer, Parser } from "smei";
import Token from "smei/Token";
import Validator from "./Validator";
import Rule from "./Rule";
import IsFirst from "./rules/IsFirst";
import IsLastZero from "./rules/IsLastZero";
import IsMinusFirst from "./rules/IsMinusFirst";
import IsPreviousNumber from "./rules/IsPreviousNumber";
import IsLastOperator from "./rules/IsLastOperator";
import Observable from "./Observable";

export default class Calculator {
  public source: Observable<string> = new Observable<string>("");
  public tokens: Observable<Token[]> = new Observable<Token[]>([]);

  constructor() {
    this.source.watch(() => {
      const lexer = new Lexer({ source: this.source.get() });
      this.tokens.set(lexer.tokenize());
    });
  }

  evaluate = () => {
    const { tokens } = this;
    const parser = new Parser(tokens.get());
    const interpreter = new Interpreter();

    const result = interpreter.evaluate(parser.parse());
    this.source.set(`${result}`);
  };

  clear = () => {
    this.source.set("");
  };

  clearLastToken = () => {
    const result = this.tokens
      .get()
      .slice(0, -2)
      .map((token) => token.lexeme)
      .join("");

    this.source.set(result);
  };

  private add =
    (char: string, rules: Rule<Token[]>[] = []) =>
    () => {
      const validator = new Validator(rules);
      const isValid = validator.validate(this.tokens.get());

      if (isValid) {
        this.source.set((prev) => prev + char);
      }
    };

  private replace = (char: string) => () => {
    this.source.set((prev) => prev.slice(0, -1) + char);
  };

  addNumber = (digit: string) => () => {
    const tokens = this.tokens.get();
    const isLastZero = IsLastZero(tokens);

    if (isLastZero) {
      this.replace(digit)();
    } else {
      this.add(digit)();
    }
  };

  addOperator = (operator: string) => () => {
    const tokens = this.tokens.get();
    const isPreviousNumber = IsPreviousNumber(tokens);
    const isFirst = IsFirst(tokens);
    const isMinusFirst = IsMinusFirst(tokens);

    if ((isFirst && operator !== "-") || isMinusFirst) {
      return () => {};
    }

    if (isPreviousNumber) {
      this.add(operator)();
    } else {
      this.replace(operator)();
    }
  };

  addDot = () => {
    const tokens = this.tokens.get();

    if (IsPreviousNumber(tokens)) {
      this.add(".")();
    } else if (IsLastOperator(tokens)) {
      this.add("0.")();
    }
  };
}
