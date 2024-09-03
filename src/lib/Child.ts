import { hasClass } from "./CSS";

function find(node: HTMLElement, callback: Function) : HTMLElement | null {
  if (!(node instanceof HTMLElement)) return null;

  for (let i = 0; i < node.children.length; i++) {
    let currentNode = node.children[i];
    if (callback(currentNode as HTMLElement)) {
      return currentNode as HTMLElement;
    }
  }
  return null;
}

function byClass(node: HTMLElement, className: string) : HTMLElement | null {
  let n;
  n = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && hasClass(node, className);
  });
  return n;
}

function byTag(node: HTMLElement, tagName: string) : HTMLElement | null {
  tagName = tagName.toLowerCase();
  let n;
  n = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && node.tagName === tagName;
  });
  return n;
}

function byAttribute(node: HTMLElement, attribute: string, value?: string) : HTMLElement | null {
  let n;
  n = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && value ? node.hasAttribute(attribute) : node.getAttribute(attribute) == value;
  });
  return n;
}

function byStyle(node: HTMLElement, cssProperty: string, cssPropertyValue: string) : HTMLElement | null {
  let n;
  n = find(node, function(node: HTMLElement) {
    if (node.nodeType !== 1) return;
    let computedStyle = window.getComputedStyle(node);
    return node && computedStyle.getPropertyValue(cssProperty) === cssPropertyValue;
  });
  return n;
}

const Child = {
  find: find,
  byClass: byClass,
  byTag: byTag,
  byAttribute: byAttribute,
  byStyle: byStyle
};

export default Child;
