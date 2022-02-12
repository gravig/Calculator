import Rule from "./Rule";

export default class Validator<T> {
  private rules: Rule<T>[] = [];
  private cursor = -1;

  constructor(rules: Rule<T>[]) {
    this.rules = rules;
    this.cursor = rules.length > 0 ? 0 : -1;
  }

  validate = (value: T): boolean => {
    if (this.rules.length === 0) {
      return true;
    }

    let valid = true;
    let currentRule = this.rules[this.cursor];

    while (this.cursor < this.rules.length) {
      valid = currentRule(value);

      currentRule = this.rules[this.cursor + 1];
      this.cursor++;
    }

    return valid;
  };
}
