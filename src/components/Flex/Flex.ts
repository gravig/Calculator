import Component from "../../Component";

export default class Flex extends Component {
  constructor(children: Component[]) {
    super("div");

    this.children = children;
    this.style({
      display: "flex",
      flexWrap: "wrap",
    });
  }
}
