import Component from "../../Component";

export default class Div extends Component {
  constructor(children: (string | Component)[], className?: string) {
    super("div");

    if (className) {
      this.node.classList.add(className);
    }
    this.children = children;
  }
}
