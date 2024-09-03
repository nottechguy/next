import ClassList from "@components/classList";
import { fromIDOrElement } from "@lib/$";
import Children from "@lib/Children";
import { addClass, removeClass } from "@lib/CSS";

const cl = ClassList.button;

class Button {
  leadingIcon: HTMLElement;
  trailingIcon: HTMLElement;
  root: HTMLButtonElement;

  constructor(id: string) {
    this.root = fromIDOrElement(id) as HTMLButtonElement;
    this.leadingIcon  = Children.byClass(this.root, cl.leading_icon)[0];
    this.trailingIcon = Children.byClass(this.root, cl.trailing_icon)[0];
  }

  setDisabled(disabled: boolean) : Button {
    this.root.disabled = disabled;
    disabled ? addClass(this.root, cl.disabled) :
               removeClass(this.root, cl.disabled);
    return this;
  }

  setText(label: string) : Button {
    let labelElement = Children.byClass(this.root, cl.label)[0];
    if (labelElement) {
      labelElement.textContent = label;
    }
    return this;
  }

  getText() : string {
    let labelElement = Children.byClass(this.root, cl.label)[0];
    if (labelElement) {
      return labelElement.textContent!;
    }
    return "";
  }

  setValue(value: string) {
    this.root.value = value;
    return this;
  }

  getValue() : string {
    return this.root.value;
  }

  getType() : string {
    return this.root.type;
  }

  on(event: string, callback: Function) {

  }
}

export default Button;

