export function find(selector: string, element: HTMLElement | null) {
  if (!element) return;
  return element;
}

export function selector(selector: string) {
  return find(selector, typeof selector === "string" ? document.getElementById(selector) : selector);
}

export function fromIDOrElement(selector: string) {
  return find(selector, typeof selector === "string" ? document.getElementById(selector) : selector);
}
