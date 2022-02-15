import Component from "../../Component";
import CalculatorCore from "../../Calculator";
import Key from "./Key/Key";
import Div from "../Div/Div";
import Screen from "../Screen/Screen";
import Flex from "../Flex/Flex";
import styles from "./styles";

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
    this.node.classList.add("calculator");
    this.styles(styles);
  }

  private _children = () => {
    const tokens = this.calculator.tokens.get();
    const { addOperator, addNumber, addDot, addGrouping, evaluate, clear } =
      this.calculator;

    this.children = [
      new Div(
        [
          new Div(
            [
              new Screen(tokens),
              new Div(
                [
                  new Flex(
                    [
                      new Key("AC", clear),
                      new Key("(", addGrouping("(")),
                      new Key(")", addGrouping(")")),
                      new Key("/", addOperator("DIVIDE")),
                    ],
                    1
                  ),
                  new Flex(
                    [
                      new Key(`7`, addNumber(`7`)),
                      new Key(`8`, addNumber(`8`)),
                      new Key(`9`, addNumber(`9`)),
                      new Key("*", addOperator("STAR")),

                      new Key(`4`, addNumber(`4`)),
                      new Key(`5`, addNumber(`5`)),
                      new Key(`6`, addNumber(`6`)),
                      new Key("-", addOperator("MINUS")),

                      new Key(`1`, addNumber(`1`)),
                      new Key(`2`, addNumber(`2`)),
                      new Key(`3`, addNumber(`3`)),
                      new Key("+", addOperator("PLUS")),
                    ],
                    3
                  ),
                  new Flex(
                    [
                      new Flex([new Key(`0`, addNumber(`0`), 1)]),
                      new Flex([new Key(".", addDot), new Key("=", evaluate)]),
                    ],
                    1
                  ),
                ],
                "container__content"
              ),
            ],
            "calculator__container"
          ),
        ],
        "calculator__wrapper"
      ),
    ];
  };
}
