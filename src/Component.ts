export default class Component {
  private tag: string;
  protected children: (string | Component)[] = [];
  public node: HTMLElement;
  constructor(tag: string) {
    this.tag = tag;
    this.node = document.createElement(tag);
  }

  render = (): Element => {
    this.node.innerHTML = "";

    this.children.forEach((child) => {
      this.node.append(child instanceof Component ? child?.render() : child);
    });

    return this.node;
  };

  style = (styles: Partial<CSSStyleDeclaration>): void => {
    Object.keys(styles).forEach((key: any) => {
      const value = styles[key];
      this.node.style[key] = value;
    });
  };

  styles = (styles: string): void => {
    const style = document.createElement("style");

    style.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(style);
  };
}
