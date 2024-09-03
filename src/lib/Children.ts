import { hasClass } from "./CSS";

function find(element: HTMLElement, callback: Function) {
  let e = element;
  let children : Array<HTMLElement> = [];

  function recursiveNode(node: Element) {
    for (let i = 0; i < node.children.length; i++) {
      let currentNode = node.children[i];
      if (currentNode.nodeType !== 1) continue;
      if (callback(currentNode)) {
        children.push(currentNode as HTMLElement);
      }

      if (currentNode.children.length) {
        recursiveNode(node.children[i]);
      }
    }
  }
  recursiveNode(e);
  return children;
}

function byClass(node: HTMLElement, className: string) {
  let n;
  n = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && hasClass(node, className);
  });
  return n;
}

function byTag(node: HTMLElement, tagName: string) {
  tagName = tagName.toLowerCase();
  let n;
  n = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && node.tagName === tagName;
  });
  return n;
}

function byAttribute(node: HTMLElement, attribute: string, value?: string) {
  let n;
  n = find(node, function(node: HTMLElement) {
    return node instanceof HTMLElement && value ? node.hasAttribute(attribute) : node.getAttribute(attribute) == value;
  });
  return n;
}

function byStyle(node: HTMLElement, cssProperty: string, cssPropertyValue: string) {
  let n;
  n = find(node, function(node: HTMLElement) {
    if (node.nodeType !== 1) return;
    let computedStyle = window.getComputedStyle(node);
    return node && computedStyle.getPropertyValue(cssProperty) === cssPropertyValue;
  });
  return n;
}

const Children = {
  find: find,
  byClass: byClass,
  byTag: byTag,
  byAttribute: byAttribute,
  byStyle: byStyle
};

export default Children;
