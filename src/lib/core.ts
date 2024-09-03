'use strict';

type ModuleProps = {
  factory?: Function | undefined,
  deps?: Array<string> | undefined,
  defaultExport?: object | undefined,
  exports?: object | undefined,
  special?: boolean | number | null | undefined,
  resolved?: boolean | undefined
};

let map : { [k : string] : any} = {};
let defaultCJSDeps = ['global', 'requireModule', 'module', 'exports'];
let defaultESMDeps = ['global', 'requireModule', 'importDefault', 'importNamespace', 'module', 'exports'];

const REQUIRE_WHEN_READY = 1;
const ES_MODULE_IMPORTS = 32;
const ES_MODULE_EXPORTS = 64;
let EMPTY = {};

const hasOwnProperty = Object.prototype.hasOwnProperty;

function getOrInitializeModule(id: string, soft? : Function) {
  if (!hasOwnProperty.call(map, id)) {
    if (soft) return null;
    throw new Error(`Module ${id} has not been defined.`);
  }

  const module = map[id];
  if (module.resolved) {
    return module;
  }

  let _special = module.special;
  let length   = module.factory.length;
  let deps = _special & ES_MODULE_IMPORTS ? defaultESMDeps.concat(module.deps) : defaultCJSDeps.concat(module.deps);

  let args = [],
      dep;
  for (let i = 0; i < length; i++) {
    switch (deps[i]) {
      case 'module':          dep = module;         break;
      case 'exports':         dep = module.exports; break;
      case 'global':          dep = global;         break;
      case 'requireModule':   dep = requireInterop; break;
      case 'importDefault':   dep = importDefault;  break;
      case 'importNamespace': dep = importNamespace;break;
      default:
        if (typeof deps[i] === "string") {
          dep = requireInterop.call(null, deps[i]);
        }
    }
    args.push(dep);
  }

  let ret = module.factory.apply(global, args);
  if (ret) {
    module.exports = ret;
  }

  if (_special & ES_MODULE_EXPORTS) {
    if (module.exports != null && hasOwnProperty.call(module.exports, "default")) {
      module.defaultExport = module.exports["default"];
    }
  } else {
    module.defaultExport = module.exports;
  }
  module.resolved = true;
  return module;
}

function requireInterop(id : string, soft? : Function) {
  const module = getOrInitializeModule(id, soft);
  if (module) {
    return module.defaultExport !== EMPTY ? module.defaultExport : module.exports;
  }
}

function importDefault(id : string) {
  const module = requireInterop(id);
  if (module) {
    return module.default !== EMPTY ? module.defaultExport : null;
  }
}
function importNamespace(id : string) {
  const module = requireInterop(id);
  if (module) {
    return module.exports;
  }
}

export function defineComponent(id : string, deps : Array<string>, factory? : Function, _special? : boolean | number | null) : void {
  if (typeof id !== "string") {
    throw new TypeError(`argument ${id} must be a string type`);
  }

  if (id.trim() === "") {
    throw new Error(`Module id must not be empty`);
  }

  if (typeof factory === "function") {
    map[id] = {
      factory: factory,
      deps: deps,
      defaultExport: EMPTY,
      exports: {},
      special: _special || 0,
      resolved: false
    };

    if (_special != null && _special && REQUIRE_WHEN_READY) {
      requireInterop.call(null, id);
    }
  } else {
    map[id] = {
      defaultExport: factory,
      exports: factory,
      resolved: true
    };
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(map);
    console.log(`Registered module: ${id}`);
  }
}

export { requireInterop as requireComponent };


defineComponent("WindowHandler", [], (function (global: Window, requireModule: Function, importDefault: any, importNamespace: any) {
}), 66);

/*

defineComponent("$", [], (function $(global: Window, requireModule: Function, importDefault: any, importNamespace: any) {

  function find(selector: string, element: HTMLElement | null) {
    if (!element) return;
    return element;
  }

  function selector(selector: string) {
    return find(selector, typeof selector === "string" ? document.getElementById(selector) : selector);
  }

  function fromIDOrElement(selector: string) {
    return find(selector, typeof selector === "string" ? document.getElementById(selector) : selector);
  }

  importNamespace.fromIDOrElement = fromIDOrElement;
}), 68);

defineComponent("CSSCore", [], (function $css(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {

  function matches(element: HTMLElement, selector: string) : boolean {
    let e;
    while (element.parentNode) {
      e = element.parentNode;
    }

    if (e instanceof HTMLElement) {
      e = e.querySelectorAll(selector);
      return Array.prototype.indexOf.call(e, selector) !== -1;
    }
    return false;
  }

  function addInlineStyle(element: HTMLElement, cssRules: any) : HTMLElement {
    for (let rule in cssRules) {
      element.setAttribute("style", cssRules[rule]);
    }
    return element;
  }

  function hasClass(element: HTMLElement, className: string) : boolean {
    return element && element.classList ? element.classList.contains(className) : (" " + element.className + " ").indexOf(" " + className + " ") > -1;
  }

  function addClass(element: HTMLElement, className: string) : HTMLElement {
    element && element.classList.add(className);
    return element;
  }


  function removeClass(element: HTMLElement, className: string) : HTMLElement {
    element && element.classList.remove(className)
    return element;
  }

  function conditionClass(element: HTMLElement, className: string, condition: boolean) {
    return (condition ? addClass : removeClass)(element, className);
  }

  function matchesSelector(element: HTMLElement, selector: string) {
    let s = element.matches || element.webkitMatchesSelector;
    return s.call(element, selector);
  }

  importNamespace.addClass        = addClass;
  importNamespace.removeClass     = removeClass;
  importNamespace.conditionClass  = conditionClass;
  importNamespace.hasClass        = hasClass;
  importNamespace.addInlineStyle  = addInlineStyle;
  importNamespace.matchesSelector = matchesSelector;
}), 68);

defineComponent("CSS", ["CSSCore"], (function $base(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {

  const HIDDEN_ELEMENT = 'HIDDEL_ELE';

  function addInlineStyle(element: HTMLElement, cssRules: object) {
    return requireModule("CSSCore").addInlineStyle(element, cssRules);
  }

  function hasClass(element: HTMLElement, className: string) : boolean {
    return requireModule("CSSCore").hasClass(element, className);
  }

  function matchesSelector(element: HTMLElement, selector: string) {
    return requireModule("CSSCore").matchesSelector(element, selector);
  }

  function addClass(element: HTMLElement, className: string) : HTMLElement {
    return requireModule("CSSCore").addClass(element, className);
  }

  function removeClass(element: HTMLElement, className: string) : HTMLElement {
    return requireModule("CSSCore").removeClass(element, className);
  }

  function conditionClass(element: HTMLElement, className: string, condition: boolean) {
    return requireModule("CSSCore").conditionClass(element, className, !!condition);
  }

  function toggleClass(element: HTMLElement, className: string) {
    return conditionClass(element, className, !hasClass(element, className));
  }

  function shown(element: HTMLElement) : boolean {
    return !hasClass(element, HIDDEN_ELEMENT);
  }

  function show(element: HTMLElement) {
    return removeClass(element, HIDDEN_ELEMENT);
  }

  function hide(element: HTMLElement) {
    return addClass(element, HIDDEN_ELEMENT);
  }

  function toggle(element: HTMLElement) {
    return toggleClass(element, HIDDEN_ELEMENT);
  }defineComponent("c_textfield-adapter", ["CSS", "Parent"], (function $(global: Window, requireModule: Function, importDefault: any, importNamespace: any) {


  const startComponent = (target: Element, event: FocusEvent) => {
    console.log(target, event);
    let eventType = event.type.toUpperCase();
    let textfield = 0;

    if (eventType == "FOCUS") {
      addClass
    }
  };

  importNamespace.startComponent = startComponent;
}), 66);

  function conditionShow(element: HTMLElement, condition: boolean) {
    return conditionClass(element, HIDDEN_ELEMENT, condition);
  }

  importNamespace.addInlineStyle = addInlineStyle;
  importNamespace.matchesSelector = matchesSelector;
  importNamespace.hasClass = hasClass;
  importNamespace.addClass = addClass;
  importNamespace.removeClass = removeClass;
  importNamespace.conditionClass = conditionClass;
  importNamespace.toggleClass = toggleClass;
  importNamespace.shown = shown;
  importNamespace.show = show;
  importNamespace.hide = hide;
  importNamespace.toggle = toggle;
  importNamespace.conditionShow = conditionShow;

}), 68);

defineComponent("Parent", ["CSS"], (function $parent(global: Window, requireModule: Function, importDefault : any, importNamespace: any, CSSCore: object) {

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

  function byTag(node: HTMLElement | null, tagName: string) : HTMLElement | null {
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

  function byClass(node: HTMLElement, className: string) : HTMLElement | null {
    let e;
    e = find(node, function(node: HTMLElement) {
      return node instanceof HTMLElement && requireModule("CSS").hasClass(node, className);
    });
    return e instanceof HTMLElement? e: null;
  }

  function byAttribute(node: HTMLElement, atttibute: string, value?: string) : HTMLElement | null {
    let e;
    e = find(node, function(node: HTMLElement) {
      return node instanceof HTMLElement && value ? (!!node.getAttribute(atttibute) && node.getAttribute(atttibute) === value) : !!node.getAttribute(atttibute);
    });
    return e instanceof HTMLElement ? e : null;
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

  importNamespace.byTag = byTag;
  importNamespace.byClass = byClass;
  importNamespace.byAttribute = byAttribute;
  importNamespace.byStyle = byStyle;
  importNamespace.find = find;
}), 68);

defineComponent("Children", ["$", "CSS"], (function $children(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {

  function byClass(node: HTMLElement, className: string) {
    let n;
    n = find(node, function(node: HTMLElement) {
      return node instanceof HTMLElement && requireModule("CSS").hasClass(node, className);
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

  function find(element: HTMLElement, callback: Function) {
    let e = element;
    let children : Array<HTMLElement > = [];

    function recursiveNode(node: ChildNode) {
      for (let i = 0; i < node.childNodes.length; i++) {
        let currentNode = node.childNodes[i];
        if (currentNode.nodeType !== 1) continue;
        if (callback(currentNode)) {
          children.push(currentNode as HTMLElement);
        }

        if (currentNode.childNodes.length) {
          recursiveNode(node.childNodes[i]);
        }
      }
    }
    recursiveNode(e);
    return children;
  }

  importNamespace.byClass     = byClass;
  importNamespace.byTag       = byTag;
  importNamespace.byAttribute = byAttribute;
  importNamespace.byStyle     = byStyle;
  importNamespace.find        = find;
}), 66);

defineComponent("Child", ["$", "CSS"], (function $child(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {
  function byClass(node: HTMLElement, className: string) {
    let n;
    n = find(node, function(node: HTMLElement) {
      return node instanceof HTMLElement && requireModule("CSS").hasClass(node, className);
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

  function find(node: HTMLElement, callback: Function) {
    if (node.nodeType !== 1) return;

    for (let i = 0; i < node.childNodes.length; i++) {
      let currentNode = node.childNodes[i];
      if (callback(currentNode)) {
        return currentNode;
      }
    }
    return null;
  }

  importNamespace.byClass     = byClass;
  importNamespace.byTag       = byTag;
  importNamespace.byAttribute = byAttribute;
  importNamespace.byStyle     = byStyle;
  importNamespace.find        = find;
}), 68);

defineComponent("Number", [], (function $number(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {

  function random(min: number, max: number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function format(digit: number, delimiter?: string) {
    return digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter !== undefined ? delimiter : ",");
  }

  importNamespace.random = random;
  importNamespace.format = format;
}), 68);

defineComponent("Cookie", [], (function $cookie(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {

  function setCookie(name: string, value: string, options : { [key: string] : any} = {}) : void {
    options = {
      path: "/",
      ...options
    };

    if (options.hasOwnProperty("expires") && options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }

  function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  function deleteCookie(name: string) {
    setCookie(name, "", {
      "max-age": -1
    });
  }

  importNamespace.set = setCookie;
  importNamespace.get = getCookie;
  importNamespace.delete = deleteCookie;
}), 68);

defineComponent("RequestBuilder", [], (function $builder(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {
  const DEFAULT_REQUEST_HEADER_NAME  = "X-Requested-With";
  const DEfAULT_REQUEST_HEADER_VALUE = "XMLHttpRequest";

  interface RequestProps {
  };

  interface BuilderState {
    xhr: XMLHttpRequest,
    init: Function,
    openRequest: Function
  };

  function getInstance() : XMLHttpRequest {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  }

  class Builder implements BuilderState {
    xhr: XMLHttpRequest;

    constructor(request: any, config: RequestProps) {
      this.xhr = getInstance();
      console.log(this);
      //this.init();
    }

    openRequest() : void {
      this.xhr.open("", "");
    }

    init() : void {
      this.openRequest();
    }
  }

  importDefault.exports = Builder;
}), 68);

defineComponent("RequestURI", [], (function $request_uri(global: Window, requireModule: Function, importDefault : any, importNamespace: any) {

  function getURI(uri: string) : string {
    let newUri = "";
    if (uri.startsWith("/")) {
      newUri += location.protocol + "//" + location.host + uri;
    } else {
      newUri = uri;
    }
    return newUri;
  }

  importNamespace.getURI = getURI;
}), 68);


*/

//0840012748
