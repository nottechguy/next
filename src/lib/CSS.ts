import React from "react";

const BaseCSS = {
  matches: function(element: HTMLElement, selector: string) : boolean {
    let e;
    while (element.parentNode) {
      e = element.parentNode;
    }

    if (e instanceof HTMLElement) {
      e = e.querySelectorAll(selector);
      return Array.prototype.indexOf.call(e, selector) !== -1;
    }
    return false;
  },
  addInlineStyle: (element: HTMLElement, cssRules: {[key: string] : any}) : HTMLElement => {
    for (let rule in cssRules) {
      if (element.style[rule as any] !== undefined) {
        element.style[rule as any] = cssRules[rule];
      }
    }
    return element;
  },
  hasClass: (element: HTMLElement, className: string) : boolean => {
    return element && element.classList.contains(className);
  },
  addClass: (element: HTMLElement, className: string) : HTMLElement => {
    element && element.classList.add(className);
    return element;
  },
  removeClass: (element: HTMLElement, className: string) : HTMLElement => {
    element && element.classList.remove(className)
    return element;
  },
  conditionClass: (element: HTMLElement, className: string, condition: boolean) => {
    return (condition ? BaseCSS.addClass : BaseCSS.removeClass)(element, className);
  },
  matchesSelector: (element: HTMLElement, selector: string) => {
    let s = element.matches || element.webkitMatchesSelector;
    return s.call(element, selector);
  }
};

const HIDDEL_ELE = "HIDDEN_ELEMENT";

export function addInlineStyle(element: HTMLElement, cssRules: {[key: string] : any}) {
  return BaseCSS.addInlineStyle(element, cssRules);
}

export function matchesSelector(element: HTMLElement, selector: string) {
  return BaseCSS.matchesSelector(element, selector);
}

export function hasClass(element: HTMLElement, className: string) {
  return BaseCSS.hasClass(element, className);
}

export function addClass(element: HTMLElement, className: string) {
  return BaseCSS.addClass(element, className);
}

export function removeClass(element: HTMLElement, className: string) {
  return BaseCSS.removeClass(element, className);
}

export function conditionClass(element: HTMLElement, className: string, condition: boolean) {
  return BaseCSS.conditionClass(element, className, !!condition);
}

export function toggleClass(element: HTMLElement, className: string) {
  return conditionClass(element, className, !hasClass(element, className));
}

export function shown(element: HTMLElement) : boolean {
  return !hasClass(element, HIDDEL_ELE);
}

export function show(element: HTMLElement) {
  return removeClass(element, HIDDEL_ELE);
}

export function hide(element: HTMLElement) {
  return addClass(element, HIDDEL_ELE);
}

export function toggle(element: HTMLElement) {
  return toggleClass(element, HIDDEL_ELE);
}

export function conditionShow(element: HTMLElement, condition: boolean) {
  return conditionClass(element, HIDDEL_ELE, condition);
}

export { BaseCSS as CSS };
