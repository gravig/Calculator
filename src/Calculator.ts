import Smei, { Interpreter, Lexer, Parser } from "smei";
import Token from "smei/Token";
import Component from "./Component";
import Button from "./components/Button/Button";
import Div from "./components/Div/Div";
import Screen from "./components/Screen/Screen";
import Validator from "./Validator";
import Rule from "./Rule";
import IsFirst from "./rules/IsFirst";
import IsLastZero from "./rules/IsLastZero";
import IsMinusFirst from "./rules/IsMinusFirst";
import IsPreviousNumber from "./rules/IsPreviousNumber";
import IsLastOperator from "./rules/IsLastOperator";
import Observable from "./Observable";

export default class Calculator extends Component {
  private source: Observable<string> = new Observable<string>("");
  private tokens: Observable<Token[]> = new Observable<Token[]>([]);

  constructor() {
    super("div");

    this.source.watch((newSource) => {
      const lexer = new Lexer({ source: newSource });
      this.tokens.set(lexer.tokenize());
      this._children();
      this.render();
    });

    this._children();
  }

  private evaluate = () => {
    const { tokens } = this;
    const parser = new Parser(tokens.get());
    const interpreter = new Interpreter();

    const result = interpreter.evaluate(parser.parse());
    this.source.set(`${result}`);
  };

  private clear = () => {
    this.source.set("");
  };

  private clearLastToken = () => {
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

  private handleAddNumber = (digit: string) => () => {
    const tokens = this.tokens.get();
    const isLastZero = IsLastZero(tokens);

    if (isLastZero) {
      this.replace(digit)();
    } else {
      this.add(digit)();
    }
  };

  private handleAddOperator = (operator: string) => () => {
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

  private handleAddDot = () => {
    const tokens = this.tokens.get();

    if (IsPreviousNumber(tokens)) {
      this.add(".")();
    } else if (IsLastOperator(tokens)) {
      this.add("0.")();
    }
  };

  private _children = () => {
    const tokens = this.tokens.get();
    const { handleAddOperator } = this;

    this.children = [
      new Screen(tokens),
      new Div(
        new Array(10)
          .fill(0)
          .map((_, idx) => new Button(`${idx}`, this.handleAddNumber(`${idx}`)))
      ),
      new Button("=", this.evaluate),
      new Button("+", handleAddOperator("+")),
      new Button("-", handleAddOperator("-")),
      new Button("*", handleAddOperator("*")),
      new Button("/", handleAddOperator("/")),
      new Button(".", this.handleAddDot),
      new Button("C", this.clear),
      new Button("CE", this.clearLastToken),
    ];
  };
}
