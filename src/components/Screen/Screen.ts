import Component from "../../Component";
import Token from "smei/Token";
import Text from "../Text/Text";

class Syntax extends Component {
  constructor(text: string, color: string) {
    super("div");

    this.children = [new Text(text)];
    this.style({
      color,
      fontFamily: "Courier New, monospace",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    });
  }
}

const types = {
  operator: ["STAR", "DIVIDE", "PLUS", "MINUS"],
  number: ["NUMBER"],
  paren: ["LEFT_PAREN", "RIGHT_PAREN"],
} as const;

const colors: { [key: string]: string } = {
  operator: "#CC7832",
  number: "#8876AA",
  paren: "#F1C66D",
};

export default class Screen extends Component {
  private tokens: Token[] = [];

  constructor(tokens: Token[]) {
    super("div");

    this.tokens = tokens;
    this._children();
    this.node.classList.add("screen");
  }

  _children = () => {
    const { tokens } = this;

    this.children = tokens.map((token) => {
      const type = Object.keys(types).find((type: keyof typeof types) => {
        const tmp = types[type] as never as string[];
        return tmp.includes(token.type);
      });
      return new Syntax(token.lexeme, colors[type]);
    });
  };
}
