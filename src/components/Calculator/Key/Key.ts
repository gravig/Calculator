import Component from "../../../Component";
import Text from "../../Text/Text";

export default class Key extends Component {
  constructor(text: string, onClick: () => void, flex = 1) {
    super("button");

    this.children = [new Text(text)];

    this.node.addEventListener("click", onClick);

    this.style({
      backgroundColor: "#354357",
      border: "none",
      color: "#fff",
      height: "26px",
      margin: "2px",
      minWidth: "20%",
      flex: `${flex}`,
    });
  }
}
