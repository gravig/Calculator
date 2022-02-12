import Component from "../../Component";

export default class Div extends Component {
  constructor(children: (string | Component)[]) {
    super("div");

    this.children = children;
  }
}
