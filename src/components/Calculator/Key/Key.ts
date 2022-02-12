import Component from "../../../Component";
import Text from "../../Text/Text";

export default class Key extends Component {
  constructor(text: string, onClick: () => void, flex = 1) {
    super("button");

    this.children = [new Text(text)];

    this.node.addEventListener("click", onClick);

    this.node.classList.add("key");
    this.node.style.flex = `${flex}`;
  }
}
