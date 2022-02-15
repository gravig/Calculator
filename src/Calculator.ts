import { Interpreter, Parser } from "smei";
import { TokenType } from "smei/Lexer";
import Token from "smei/Token";
import IsFirst from "./rules/IsFirst";
import IsLastZero from "./rules/IsLastZero";
import IsMinusFirst from "./rules/IsMinusFirst";
import IsPreviousNumber from "./rules/IsPreviousNumber";
import IsLastOperator from "./rules/IsLastOperator";
import IsLastGrouping from "./rules/IsLastGrouping";
import Observable from "./Observable";

type TokenTypes = keyof typeof TokenType;
type OperatorType = "PLUS" | "MINUS" | "STAR" | "DIVIDE";

export default class Calculator {
  public tokens: Observable<Token[]> = new Observable<Token[]>([]);
  private hasDot = false;

  evaluate = () => {
    const tokens = [...this.tokens.get(), new Token("EOF", "", 1)];
    const parser = new Parser(tokens);

    const interpreter = new Interpreter();

    const result = interpreter.evaluate(parser.parse());
    this.tokens.set(() => [new Token("NUMBER", `${result}`, 1)]);
  };

  clear = () => {
    this.tokens.set([]);
  };

  private add = (lexeme: string, type: TokenTypes) => {
    const token = new Token(type, lexeme, 1);

    this.tokens.set((prev) => [...prev, token]);
  };

  private replace = (token: Token) => {
    this.tokens.set((prev) => [...prev.slice(0, -1), token]);
  };

  private modifyLastToken = (updater: (token: Token) => Partial<Token>) => {
    const tokens = this.tokens.get();
    const len = tokens.length;
    const last = tokens[len - 1];
    const idx = tokens.indexOf(last);

    this.tokens.set((prev) => {
      return prev.map((token, index) => {
        const result = updater(token) as Token;
        const data = { ...token, ...result };

        return index === idx
          ? new Token(data.type, data.lexeme, data.line, data?.literal)
          : token;
      });
    });
  };

  addNumber = (digit: string) => () => {
    const { hasDot } = this;
    const tokens = this.tokens.get();
    const isLastZero = IsLastZero(tokens);
    const isPreviousNumber = IsPreviousNumber(tokens);

    if (isLastZero) {
      this.modifyLastToken(() => ({
        lexeme: `${digit}`,
      }));
      return;
    }

    if (hasDot) {
      this.modifyLastToken((token) => ({
        lexeme: `${token.lexeme}${digit}`,
      }));
      this.hasDot = false;
      return;
    }

    if (isPreviousNumber) {
      this.modifyLastToken((token) => ({
        lexeme: `${token.lexeme}${digit}`,
      }));
      return;
    }

    this.add(digit, "NUMBER");
  };

  addOperator = (operator: OperatorType) => () => {
    const tokens = this.tokens.get();
    const isPreviousNumber = IsPreviousNumber(tokens);
    const isLastOperator = IsLastOperator(tokens);
    const isLastGrouping = IsLastGrouping(tokens);
    const isFirst = IsFirst(tokens);
    const isMinusFirst = IsMinusFirst(tokens);

    const lexeme = {
      MINUS: "-",
      PLUS: "+",
      STAR: "*",
      DIVIDE: "/",
    };

    if (isFirst && operator !== "MINUS") {
      return () => {};
    }

    if (this.hasDot) {
      this.removeTrailingDot();
    }

    if (
      isPreviousNumber ||
      isLastGrouping ||
      (isFirst && operator === "MINUS")
    ) {
      this.add(lexeme[operator], operator);
    } else if (isLastOperator && !isMinusFirst) {
      this.replace(new Token(operator, lexeme[operator], 1));
    }
  };

  addDot = () => {
    const tokens = this.tokens.get();

    if (IsPreviousNumber(tokens)) {
      this.modifyLastToken((token) => {
        const newToken = { ...token };
        newToken.lexeme = `${token.lexeme}.`;

        return newToken;
      });

      this.hasDot = true;
    } else if (IsLastOperator(tokens)) {
      this.add("0.", "NUMBER");
    }
  };

  addGrouping = (paren: "(" | ")") => () => {
    this.add(paren, paren === "(" ? "LEFT_PAREN" : "RIGHT_PAREN");
  };

  removeTrailingDot = () => {
    this.modifyLastToken((token) => ({ lexeme: token.lexeme.slice(0, -1) }));
    this.hasDot = false;
  };
}
