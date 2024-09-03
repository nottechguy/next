import ClassList from "src/components/classList";
import { addClass, addInlineStyle, hasClass, removeClass } from "src/lib/CSS";
import Child from "src/lib/Child";
import Children from "src/lib/Children";
import Parent from "src/lib/Parent";
import { defineComponent, requireComponent } from "src/lib/core"
import { HTMLInputTypeAttribute, KeyboardEventHandler } from "react";

defineComponent("c_textfield-adapter", ["CSS", "Parent"], (function $(global: Window, requireModule: Function, importDefault: any, importNamespace: any) {

  const cl = ClassList.textfield;

  interface TextfieldComponents {
    textfield: HTMLElement,
    input: HTMLElement | null | undefined,
    floatingLabel: HTMLElement,
    lineRipple? : HTMLElement
  }

  const getTextfield = (input: EventTarget) => {
    const parent = Parent.byClass(input as HTMLElement, cl.base_class);
    return {
      getParent: () => {
        return parent!;
      },
      getInput: () => {
        let e = Children.byClass(parent!, cl.input)[0];
        return e;
      },
      getFloatingLabel: () => {
        return Children.byClass(parent!, cl.floating_label)[0];
      },
      getLineRipple: () => {
        return Child.byClass(parent!, cl.line_ripple);
      }
    };
  };

  const shakeLabel = (label: HTMLElement) => {
    addClass(label, cl.floating_label_shake);
    setTimeout(function() {
      removeClass(label, cl.floating_label_shake);
    }, 260);
  };

  const matchTextfieldInputType = (textfieldInput: HTMLInputElement|HTMLTextAreaElement, type: HTMLInputTypeAttribute, callback: Function) => {
    const textfield = getTextfield(textfieldInput).getParent();
    if (type == textfieldInput.type) {
      callback(textfield);
    }
  };

  const handleFocusBehavior = (textfield: HTMLElement, input: HTMLInputElement|HTMLTextAreaElement, floatingLabel?: HTMLElement, lineRipple?: HTMLElement) => {
    addClass(textfield, cl.focused);
    addClass(textfield, cl.label_floating);
    addClass(floatingLabel!, cl.floating_label_above);

    // Activating line ripple
    if (lineRipple instanceof HTMLElement && hasClass(textfield, cl.filled)) {
      addClass(lineRipple, cl.line_ripple_active);
    }

    if (hasClass(textfield, cl.outlined)) {
      let outlinedNotched      = Children.byClass(textfield, cl.notched)[0];
      let outlinedNotchedNotch = Child.byClass(outlinedNotched, cl.notched_notch);

      if (outlinedNotchedNotch instanceof HTMLElement) {
        addClass(outlinedNotched, cl.notched_notched);
        addInlineStyle(outlinedNotchedNotch, {
          'width': (outlinedNotchedNotch!.offsetWidth) + 'px'
        });
      }
    }
  };

  const handleBlurBehavior = (textfield: HTMLElement, input: HTMLInputElement|HTMLTextAreaElement, floatingLabel?: HTMLElement, lineRipple?: HTMLElement) => {
    removeClass(textfield, cl.focused);

    if (hasClass(textfield, cl.filled)) {
      let lineRipple = Child.byClass(textfield, cl.line_ripple);
      removeClass(lineRipple!, cl.line_ripple_active);
    }

    if (input.value.length === 0) {
      removeClass(textfield, cl.label_floating);
      removeClass(floatingLabel!, cl.floating_label_above);

      if (hasClass(textfield, cl.outlined)) {
        let outlinedNotched      = Children.byClass(textfield, cl.notched)[0];
        let outlinedNotchedNotch = Child.byClass(outlinedNotched, cl.notched_notch);

        removeClass(outlinedNotched, cl.notched_notched);
        outlinedNotchedNotch?.removeAttribute("style");
      }
    }
  };

  const handleRequiredInputField = (textfieldInput: HTMLInputElement|HTMLTextAreaElement, eventType: string) => {
    matchTextfieldInputType(textfieldInput, "text", function(textfield: HTMLElement) {
      if (eventType == "BLUR") {
        let invalidClassName = cl.invalid;
        textfieldInput.value.length === 0 ? addClass(textfield, invalidClassName) : removeClass(textfield, invalidClassName);
      }
    });
  };

  const handleTextfieldPattern = (textfieldInput: HTMLInputElement|HTMLTextAreaElement, eventType: string) => {
    const textfield = getTextfield(textfieldInput).getParent();
    let pattern     = textfieldInput.getAttribute("pattern");
    let value       = textfieldInput.value;

    if (eventType == "BLUR") {
      if (value === "") return;
      const regex = new RegExp(pattern!, "g");
      regex.exec(value) == null ? addClass(textfield, cl.invalid) && shakeLabel(getTextfield(textfieldInput).getFloatingLabel()) : removeClass(textfield, cl.invalid);
    }
  };

  const startComponent = (event: FocusEvent) => {
    let eventType       = event.type.toUpperCase();
    let target          = event.target;
    let textfieldInput;

    if (target instanceof HTMLTextAreaElement) {
      textfieldInput = getTextfield(target!).getInput() as HTMLTextAreaElement;
    } else {
      textfieldInput = getTextfield(target!).getInput() as HTMLInputElement;
    }

    let textfield       = getTextfield(target!).getParent() as HTMLElement;
    let floatingLabel   = getTextfield(target!).getFloatingLabel();
    let lineRipple      = getTextfield(target!).getLineRipple() as HTMLElement;

    if (eventType == "FOCUS") {
      handleFocusBehavior(textfield, textfieldInput, floatingLabel, lineRipple);
    } else if (eventType == "BLUR") {
      handleBlurBehavior(textfield, textfieldInput, floatingLabel, lineRipple);
    }

    const hasRequiredAttr = eventType == "BLUR" && textfieldInput.hasAttribute("required");
    const hasPatternAttr  = eventType == "BLUR" && textfieldInput.hasAttribute("pattern");

    hasRequiredAttr && handleRequiredInputField(textfieldInput, eventType);
    hasPatternAttr  && handleTextfieldPattern(textfieldInput, eventType);
  };

  const handleCharacterCounter = (event: React.KeyboardEvent) => {
    let inputField = event.target as HTMLInputElement|HTMLTextAreaElement;
    let length     = inputField.value.length;

    const textfield  = Parent.byClass(inputField, cl.base_class);
    const helperLine = Child.byClass(textfield!.parentElement!, cl.helper_line) as HTMLElement;
    if (helperLine) {
      let characterCounter = Child.byClass(helperLine, cl.character_counter);

      let counter = inputField.maxLength;
      characterCounter!.textContent = `${length} / ${counter}`;
    }

  };

  importNamespace.startComponent = startComponent;
  importNamespace.handleCharacterCounter = handleCharacterCounter;
}), 66);

export const handleFocus = (event : React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
  requireComponent("c_textfield-adapter").startComponent(event);
};

export const handleKeyEvent = (event: React.KeyboardEvent) => {
  requireComponent("c_textfield-adapter").handleCharacterCounter(event);
};
