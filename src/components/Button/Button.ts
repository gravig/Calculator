import Component from "../../Component";
import Text from "../Text/Text";

export default class Button extends Component {
  constructor(text: string, onClick?: () => void) {
    super("button");

    this.children = [new Text(text)];

    this.node.addEventListener("click", onClick);
  }
}
