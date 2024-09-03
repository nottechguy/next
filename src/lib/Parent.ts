import { hasClass } from "./CSS";

function find(element: HTMLElement, callback: Function) : Element | null {
  element = element;
  while (element) {
    if (callback(element)) {
      return element;
    }
    element = element.parentNode as HTMLElement;
  }
  return null;
}

export function byTag(node: HTMLElement | null, tagName: string) : HTMLElement | null {
  let e;
  tagName = tagName.toLowerCase();
  if (node == null) {
    throw new Error('');
  }

  e = find(node, function(node: HTMLElement) {
    return node.nodeName.toLowerCase() === tagName;
  });
  return e instanceof HTMLElement? e : null
}

export function byClass(node: HTMLElement, className: string) : HTMLElement | null {
  let e;
  e = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && hasClass(node, className);
  });
  return e instanceof HTMLElement? e: null;
}

export function byAttribute(node: HTMLElement, atttibute: string, value?: string) : HTMLElement | null {
  let e;
  e = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && value ? (!!node.getAttribute(atttibute) && node.getAttribute(atttibute) === value) : !!node.getAttribute(atttibute);
  });
  return e instanceof HTMLElement ? e : null;
}

export function byStyle(node: HTMLElement, cssProperty: string, cssPropertyValue: string) {
  let n;
  n = find(node, function(node: HTMLElement) {
    if (node.nodeType !== 1) return;
    let computedStyle = window.getComputedStyle(node);
    return node && computedStyle.getPropertyValue(cssProperty) === cssPropertyValue;
  });
  return n;
}

const Parent = {
  find: find,
  byClass: byClass,
  byTag: byTag,
  byAttribute: byAttribute,
  byStyle: byStyle
};

export default Parent;
