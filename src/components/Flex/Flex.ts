import Component from "../../Component";

export default class Flex extends Component {
  constructor(children: Component[], flex: number = 1) {
    super("div");

    this.children = children;
    this.style({
      display: "flex",
      flexWrap: "wrap",
      flex: `${flex}`,
    });
  }
}
