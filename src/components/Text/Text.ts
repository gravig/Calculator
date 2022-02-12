import Component from "../../Component";

export default class Text extends Component {
  constructor(text: string) {
    super("span");

    this.children = [text];
  }
}
