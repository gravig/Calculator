import Component from "../../Component";
import CalculatorCore from "../../Calculator";
import Key from "./Key/Key";
import Div from "../Div/Div";
import Screen from "../Screen/Screen";
import Flex from "../Flex/Flex";

export default class Calculator extends Component {
  calculator: CalculatorCore;

  constructor() {
    super("div");

    this.calculator = new CalculatorCore();

    this.calculator.tokens.watch(() => {
      this._children();
      this.render();
    });

    this._children();
    this.style({
      width: "200px",
      backgroundColor: "#1D293A",
      padding: "20px",
    });
  }

  private _children = () => {
    const tokens = this.calculator.tokens.get();
    const { addOperator, addNumber, addDot, evaluate, clear, clearLastToken } =
      this.calculator;

    this.children = [
      new Screen(tokens),
      new Div([
        new Flex([new Key("AC", clear, 4), new Key("/", addOperator("/"))]),
        new Flex([
          new Key(`7`, addNumber(`7`)),
          new Key(`8`, addNumber(`8`)),
          new Key(`9`, addNumber(`9`)),
          new Key("*", addOperator("*")),

          new Key(`4`, addNumber(`4`)),
          new Key(`5`, addNumber(`5`)),
          new Key(`6`, addNumber(`6`)),
          new Key("-", addOperator("-")),

          new Key(`1`, addNumber(`1`)),
          new Key(`2`, addNumber(`2`)),
          new Key(`3`, addNumber(`3`)),
          new Key("+", addOperator("+")),
        ]),
        new Flex([
          new Key(`0`, addNumber(`0`), 2.5),
          new Key(".", addDot),
          new Key("=", evaluate),
        ]),
      ]),
    ];
  };
}
