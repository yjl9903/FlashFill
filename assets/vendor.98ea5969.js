var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var _a, _b;
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$2(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$2(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString$2(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const toDisplayString = (val) => {
  return val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString$2 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
const effectScopeStack = [];
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      try {
        this.on();
        return fn();
      } finally {
        this.off();
      }
    }
  }
  on() {
    if (this.active) {
      effectScopeStack.push(this);
      activeEffectScope = this;
    }
  }
  off() {
    if (this.active) {
      effectScopeStack.pop();
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
    }
  }
  stop(fromParent) {
    if (this.active) {
      this.effects.forEach((e) => e.stop());
      this.cleanups.forEach((cleanup) => cleanup());
      if (this.scopes) {
        this.scopes.forEach((e) => e.stop(true));
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope) {
  scope = scope || activeEffectScope;
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    if (!effectStack.includes(this)) {
      try {
        effectStack.push(activeEffect = this);
        enableTracking();
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        resetTracking();
        effectStack.pop();
        const n = effectStack.length;
        activeEffect = n > 0 ? effectStack[n - 1] : void 0;
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = createDep());
  }
  trackEffects(dep);
}
function isTracking() {
  return shouldTrack && activeEffect !== void 0;
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$1(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray$1(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger$1(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger$1(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$1,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive$1;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger$1(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger$1(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger$1(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger$1(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive$1;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive$1;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (target && target["__v_isReadonly"]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive$1 = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (isTracking()) {
    ref2 = toRaw(ref2);
    if (!ref2.dep) {
      ref2.dep = createDep();
    }
    {
      trackEffects(ref2.dep);
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, _shallow) {
    this._shallow = _shallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = _shallow ? value : toRaw(value);
    this._value = _shallow ? value : toReactive$1(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this._shallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this._shallow ? newVal : toReactive$1(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get: get2, set: set2 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
    this._get = get2;
    this._set = set2;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
function toRefs$1(object) {
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key) {
    this._object = _object;
    this._key = _key;
    this.__v_isRef = true;
  }
  get value() {
    return this._object[this._key];
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2) {
    this._setter = _setter;
    this.dep = void 0;
    this._dirty = true;
    this.__v_isRef = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter);
  return cRef;
}
Promise.resolve();
function emit$1(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number2, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    } else if (number2) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev2 = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev2;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render: render2, renderCache, data: data2, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev2 = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data2, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render3 = Component;
      if (false)
        ;
      result = normalizeVNode(render3.length > 1 ? render3(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render3(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev2);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return slots.default;
    }
    const cache = new Map();
    const keys = new Set();
    let current = null;
    const parentSuspense = instance.suspense;
    const { renderer: { p: patch, m: move, um: _unmount, o: { createElement: createElement2 } } } = sharedContext;
    const storageContainer = createElement2("div");
    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense);
    }
    function pruneCache(filter2) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && (!filter2 || !filter2(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(() => [props.include, props.exclude], ([include, exclude]) => {
      include && pruneCache((name) => matches(include, name));
      exclude && pruneCache((name) => !matches(exclude, name));
    }, { flush: "post", deep: true });
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
      const { include, exclude, max } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return rawVNode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if (isArray$1(pattern)) {
    return pattern.some((p2) => matches(p2, name));
  } else if (isString$2(pattern)) {
    return pattern.split(",").indexOf(name) > -1;
  } else if (pattern.test) {
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove$1(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  let shapeFlag = vnode.shapeFlag;
  if (shapeFlag & 256) {
    shapeFlag -= 256;
  }
  if (shapeFlag & 512) {
    shapeFlag -= 512;
  }
  vnode.shapeFlag = shapeFlag;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data2 = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data2))
      ;
    else {
      instance.data = reactive(data2);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v) => c2.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key)) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger$1(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else
          ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive2) {
        if (!directive2) {
          return context.directives[name];
        }
        context.directives[name] = directive2;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      }
    };
    return app2;
  };
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next2;
    while (el && el !== anchor) {
      next2 = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next2;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next2;
    while (el && el !== anchor) {
      next2 = hostNextSibling(el);
      hostRemove(el);
      el = next2;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev2 = oldProps[key];
            const next2 = newProps[key];
            if (next2 !== prev2 || key === "value") {
              hostPatchProp(el, key, prev2, next2, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next2 = newProps[key];
        const prev2 = oldProps[key];
        if (next2 !== prev2 && key !== "value") {
          hostPatchProp(el, key, prev2, next2, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        effect.allowRecurse = false;
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        effect.allowRecurse = true;
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next: next2, bu, u, parent, vnode } = instance;
        let originNext = next2;
        let vnodeHook;
        effect.allowRecurse = false;
        if (next2) {
          next2.el = vnode.el;
          updateComponentPreRender(instance, next2, optimized);
        } else {
          next2 = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next2.props && next2.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next2, vnode);
        }
        effect.allowRecurse = true;
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        next2.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next2.props && next2.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next2, vnode), parentSuspense);
        }
      }
    };
    const effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update = instance.update = effect.run.bind(effect);
    update.id = instance.uid;
    effect.allowRecurse = update.allowRecurse = true;
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s2; j2 <= e2; j2++) {
            if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j2 < 0 || i !== increasingNewIndexSequence[j2]) {
            move(nextChild, container, anchor, 2);
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next2;
    while (cur !== end) {
      next2 = hostNextSibling(cur);
      hostRemove(cur);
      cur = next2;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$2(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isString$2(ref2)) {
    const doSet = () => {
      {
        refs[ref2] = value;
      }
      if (hasOwn(setupState, ref2)) {
        setupState[ref2] = value;
      }
    };
    if (value) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isRef(ref2)) {
    const doSet = () => {
      ref2.value = value;
    };
    if (value) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else
    ;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j2, u, v, c2;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i] = j2;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c2 = u + v >> 1;
        if (arr[result[c2]] < arrI) {
          u = c2 + 1;
        } else {
          v = c2;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const COMPONENTS = "components";
const DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2 }) => {
  return ref2 != null ? isString$2(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2 } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$2(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$2(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$2(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray$1(source) || isString$2(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE) {
    return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data: data2, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 0:
            return setupState[key];
          case 1:
            return data2[key];
          case 3:
            return ctx[key];
          case 2:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 0;
        return setupState[key];
      } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
        accessCache[key] = 1;
        return data2[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 2;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 3;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 4;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 3;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data: data2, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
      data2[key] = value;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data: data2, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return accessCache[key] !== void 0 || data2 !== EMPTY_OBJ && hasOwn(data2, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  }
};
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb2, activeQueue, pendingQueue, index2) {
  if (!isArray$1(cb2)) {
    if (!activeQueue || !activeQueue.includes(cb2, cb2.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb2);
    }
  } else {
    pendingQueue.push(...cb2);
  }
  queueFlush();
}
function queuePreFlushCb(cb2) {
  queueCb(cb2, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb2) {
  queueCb(cb2, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue.sort((a2, b2) => getId(a2) - getId(b2));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb2, options) {
  return doWatch(source, cb2, options);
}
function doWatch(source, cb2, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = !!source._shallow;
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb2) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onInvalidate]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb2 && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onInvalidate = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onInvalidate = NOOP;
    if (!cb2) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb2, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onInvalidate
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb2) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb2, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onInvalidate
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb2;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb2) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove$1(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb2;
  if (isFunction(value)) {
    cb2 = value;
  } else {
    cb2 = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb2.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path2) {
  const segments = path2.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const version = "3.2.22";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const staticTemplateCache = new Map();
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    let template = staticTemplateCache.get(content);
    if (!template) {
      const t = doc.createElement("template");
      t.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      template = t.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      staticTemplateCache.set(content, template);
    }
    parent.insertBefore(template.cloneNode(true), anchor);
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev2, next2) {
  const style = el.style;
  const isCssString = isString$2(next2);
  if (next2 && !isCssString) {
    for (const key in next2) {
      setStyle(style, key, next2[key]);
    }
    if (prev2 && !isString$2(prev2)) {
      for (const key in prev2) {
        if (next2[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev2 !== next2) {
        style.cssText = next2;
      }
    } else if (prev2) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS") {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      el[key] = includeBooleanAttr(value);
      return;
    } else if (value == null && type === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type === "number") {
      try {
        el[key] = 0;
      } catch (_a2) {
      }
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
}
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== "undefined") {
  if (_getNow() > document.createEvent("Event").timeStamp) {
    _getNow = () => performance.now();
  }
  const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
  skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
let cachedNow = 0;
const p$1 = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p$1.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$2(value)) {
    return false;
  }
  return key in el;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"];
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    trigger(target, "input");
  }
}
function trigger(el, type) {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number: number2 } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number2 || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number: number2 } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el) {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number2 || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function normalizeContainer(container) {
  if (isString$2(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$1.call(b2, prop))
      __defNormalProp$1(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b2)) {
      if (__propIsEnum$1.call(b2, prop))
        __defNormalProp$1(a2, prop, b2[prop]);
    }
  return a2;
};
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    let value = attrs[key];
    if (key === "key" || value === false) {
      continue;
    }
    if (key === "children") {
      el.textContent = value;
    } else {
      el.setAttribute(key, value);
    }
  }
  return el;
};
var getTagKey = (props) => {
  if (props.key !== void 0) {
    return { name: "key", value: props.key };
  }
  if (props.name !== void 0) {
    return { name: "name", value: props.name };
  }
  if (props.property !== void 0) {
    return {
      name: "property",
      value: props.property
    };
  }
};
var injectHead = () => {
  const head = inject(PROVIDE_KEY);
  if (!head) {
    throw new Error(`You may forget to apply app.use(head)`);
  }
  return head;
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "htmlAttrs",
  "bodyAttrs"
];
var headObjToTags = (obj) => {
  const tags = [];
  for (const key of Object.keys(obj)) {
    if (obj[key] == null)
      continue;
    if (key === "title") {
      tags.push({ tag: key, props: { children: obj[key] } });
    } else if (key === "base") {
      tags.push({ tag: key, props: __spreadValues$1({ key: "default" }, obj[key]) });
    } else if (acceptFields.includes(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          tags.push({ tag: key, props: item });
        });
      } else if (value) {
        tags.push({ tag: key, props: value });
      }
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      el.removeAttribute(key);
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var insertTags = (tags, document2 = window.document) => {
  const head = document2.head;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldElements = [];
  if (headCountEl) {
    for (let i = 0, j2 = headCountEl.previousElementSibling; i < headCount; i++, j2 = j2.previousElementSibling) {
      if (j2) {
        oldElements.push(j2);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  const newElements = [];
  let title;
  let htmlAttrs = {};
  let bodyAttrs = {};
  for (const tag of tags) {
    if (tag.tag === "title") {
      title = tag.props.children;
      continue;
    }
    if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
      continue;
    }
    if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
      continue;
    }
    if (tag.tag === "meta") {
      const key = getTagKey(tag.props);
      if (key) {
        const elementList = [
          ...head.querySelectorAll(`meta[${key.name}="${key.value}"]`)
        ];
        for (const el of elementList) {
          if (!oldElements.includes(el)) {
            oldElements.push(el);
          }
        }
      }
    }
    newElements.push(createElement(tag.tag, tag.props, document2));
  }
  oldElements.forEach((el) => {
    if (el.nextSibling && el.nextSibling.nodeType === Node.TEXT_NODE) {
      el.nextSibling.remove();
    }
    el.remove();
  });
  if (title !== void 0) {
    document2.title = title;
  }
  setAttrs(document2.documentElement, htmlAttrs);
  setAttrs(document2.body, bodyAttrs);
  newElements.forEach((el) => {
    head.insertBefore(el, headCountEl);
  });
  headCountEl.setAttribute("content", "" + newElements.length);
};
var createHead = () => {
  let allHeadObjs = [];
  const head = {
    install(app2) {
      app2.config.globalProperties.$head = head;
      app2.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(objs.value);
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base") {
            const key = getTagKey(tag.props);
            if (key) {
              let index2 = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev2 = deduped[i];
                const prevValue = prev2.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev2.tag === tag.tag && prevValue === nextValue) {
                  index2 = i;
                  break;
                }
              }
              if (index2 !== -1) {
                deduped.splice(index2, 1);
              }
            }
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2) {
      insertTags(head.headTags, document2);
    }
  };
  return head;
};
var IS_BROWSER = typeof window !== "undefined";
var useHead = (obj) => {
  const headObj = ref(obj);
  const head = injectHead();
  head.addHeadObjs(headObj);
  if (IS_BROWSER) {
    watchEffect(() => {
      head.updateDOM();
    });
    onBeforeUnmount(() => {
      head.removeHeadObjs(headObj);
      head.updateDOM();
    });
  }
};
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
function and(...args) {
  return computed(() => args.every((i) => unref(i)));
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const isClient = typeof window !== "undefined";
const toString = Object.prototype.toString;
const isNumber = (val) => typeof val === "number";
const isString$1 = (val) => typeof val === "string";
const isObject = (val) => toString.call(val) === "[object Object]";
const timestamp = () => +Date.now();
const noop$1 = () => {
};
function createFilterWrapper(filter2, fn) {
  function wrapper(...args) {
    filter2(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function increaseWithUnit(target, delta) {
  var _a2;
  if (typeof target === "number")
    return target + delta;
  const value = ((_a2 = target.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : _a2[0]) || "";
  const unit = target.slice(value.length);
  const result = parseFloat(value) + delta;
  if (Number.isNaN(result))
    return target;
  return result + unit;
}
var __getOwnPropSymbols$9$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$9$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$9$1 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9$1)
    for (var prop of __getOwnPropSymbols$9$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb2, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter
  } = _a2, watchOptions = __objRest$5(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb2), watchOptions);
}
function not(v) {
  return computed(() => !unref(v));
}
function toReactive(objectRef) {
  if (!isRef(objectRef))
    return reactive(objectRef);
  const proxy = new Proxy({}, {
    get(_2, p2, receiver) {
      return Reflect.get(objectRef.value, p2, receiver);
    },
    set(_2, p2, value) {
      objectRef.value[p2] = value;
      return true;
    },
    deleteProperty(_2, p2) {
      return Reflect.deleteProperty(objectRef.value, p2);
    },
    has(_2, p2) {
      return Reflect.has(objectRef.value, p2);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(proxy);
}
var __defProp$2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$3.call(b2, prop))
      __defNormalProp$2(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b2)) {
      if (__propIsEnum$3.call(b2, prop))
        __defNormalProp$2(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps2 = (a2, b2) => __defProps2(a2, __getOwnPropDescs2(b2));
function toRefs(objectRef) {
  if (!isRef(objectRef))
    return toRefs$1(objectRef);
  const result = Array.isArray(objectRef.value) ? new Array(objectRef.value.length) : {};
  for (const key in objectRef.value) {
    result[key] = customRef(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        if (Array.isArray(objectRef.value)) {
          const copy = [...objectRef.value];
          copy[key] = v;
          objectRef.value = copy;
        } else {
          objectRef.value = __spreadProps2(__spreadValues$2({}, objectRef.value), { [key]: v });
        }
      }
    }));
  }
  return result;
}
function tryOnUnmounted(fn) {
  if (getCurrentInstance())
    onUnmounted(fn);
}
function useToggle(initialValue = false) {
  if (isRef(initialValue)) {
    return (value) => {
      initialValue.value = typeof value === "boolean" ? value : !initialValue.value;
    };
  } else {
    const boolean = ref(initialValue);
    const toggle = (value) => {
      boolean.value = typeof value === "boolean" ? value : !boolean.value;
    };
    return [boolean, toggle];
  }
}
function whenever(source, cb2, options) {
  return watch(source, (v, ov, onInvalidate) => {
    if (v)
      cb2(v, ov, onInvalidate);
  }, options);
}
function unrefElement(elRef) {
  var _a2;
  const plain = unref(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
const defaultWindow = isClient ? window : void 0;
const defaultDocument = isClient ? window.document : void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString$1(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop$1;
  let cleanup = noop$1;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop$1;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, event = "pointerdown" } = options;
  if (!window2)
    return;
  const listener = (event2) => {
    const el = unrefElement(target);
    if (!el)
      return;
    if (el === event2.target || event2.composedPath().includes(el))
      return;
    handler(event2);
  };
  return useEventListener(window2, event, listener, { passive: true });
}
const createKeyPredicate = (keyFilter) => {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  else if (keyFilter)
    return () => true;
  else
    return () => false;
};
function onKeyStroke(key, handler, options = {}) {
  const { target = defaultWindow, eventName = "keydown", passive = false } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
function useActiveElement(options = {}) {
  const { window: window2 = defaultWindow } = options;
  const counter = ref(0);
  if (window2) {
    useEventListener(window2, "blur", () => counter.value += 1, true);
    useEventListener(window2, "focus", () => counter.value += 1, true);
  }
  return computed(() => {
    counter.value;
    return window2 == null ? void 0 : window2.document.activeElement;
  });
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  if (!window2)
    return ref(false);
  const mediaQuery = window2.matchMedia(query);
  const matches2 = ref(mediaQuery.matches);
  const handler = (event) => {
    matches2.value = event.matches;
  };
  if ("addEventListener" in mediaQuery)
    mediaQuery.addEventListener("change", handler);
  else
    mediaQuery.addListener(handler);
  tryOnScopeDispose(() => {
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler);
    else
      mediaQuery.removeListener(handler);
  });
  return matches2;
}
const breakpointsTailwind = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
};
var __defProp$b = Object.defineProperty;
var __getOwnPropSymbols$d = Object.getOwnPropertySymbols;
var __hasOwnProp$d = Object.prototype.hasOwnProperty;
var __propIsEnum$d = Object.prototype.propertyIsEnumerable;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$b = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$d.call(b2, prop))
      __defNormalProp$b(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(b2)) {
      if (__propIsEnum$d.call(b2, prop))
        __defNormalProp$b(a2, prop, b2[prop]);
    }
  return a2;
};
function useBreakpoints(breakpoints2, options = {}) {
  function getValue(k, delta) {
    let v = breakpoints2[k];
    if (delta != null)
      v = increaseWithUnit(v, delta);
    if (typeof v === "number")
      v = `${v}px`;
    return v;
  }
  const { window: window2 = defaultWindow } = options;
  function match(query) {
    if (!window2)
      return false;
    return window2.matchMedia(query).matches;
  }
  const greater = (k) => {
    return useMediaQuery(`(min-width: ${getValue(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints2).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => greater(k),
      enumerable: true,
      configurable: true
    });
    return shortcuts;
  }, {});
  return __spreadValues$b({
    greater,
    smaller(k) {
      return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`, options);
    },
    between(a2, b2) {
      return useMediaQuery(`(min-width: ${getValue(a2)}) and (max-width: ${getValue(b2, -0.1)})`, options);
    },
    isGreater(k) {
      return match(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k) {
      return match(`(max-width: ${getValue(k, -0.1)})`);
    },
    isInBetween(a2, b2) {
      return match(`(min-width: ${getValue(a2)}) and (max-width: ${getValue(b2, -0.1)})`);
    }
  }, shortcutMethods);
}
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  }
};
function useStorage(key, initialValue, storage = ((_a2) => (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage)(), options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = unref(initialValue);
  const type = rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
  const data2 = (shallow ? shallowRef : ref)(initialValue);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        data2.value = rawInit;
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
      } else {
        data2.value = serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", (e) => setTimeout(() => read(e), 0));
  if (storage) {
    watchWithFilter(data2, () => {
      try {
        if (data2.value == null)
          storage.removeItem(key);
        else
          storage.setItem(key, serializer.write(data2.value));
      } catch (e) {
        onError(e);
      }
    }, {
      flush,
      deep,
      eventFilter
    });
  }
  return data2;
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
var __defProp$8 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$a.call(b2, prop))
      __defNormalProp$8(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b2)) {
      if (__propIsEnum$a.call(b2, prop))
        __defNormalProp$8(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps$3 = (a2, b2) => __defProps$3(a2, __getOwnPropDescs$3(b2));
function useDraggable(target, options = {}) {
  var _a2, _b2;
  const draggingElement = (_a2 = options.draggingElement) != null ? _a2 : defaultWindow;
  const position = ref((_b2 = options.initialValue) != null ? _b2 : { x: 0, y: 0 });
  const pressedDelta = ref();
  const filterEvent = (e) => {
    if (options.pointerTypes)
      return options.pointerTypes.includes(e.pointerType);
    return true;
  };
  const preventDefault = (e) => {
    if (unref(options.preventDefault))
      e.preventDefault();
  };
  const start = (e) => {
    var _a22;
    if (!filterEvent(e))
      return;
    if (unref(options.exact) && e.target !== unref(target))
      return;
    const react = unref(target).getBoundingClientRect();
    const pos = {
      x: e.pageX - react.left,
      y: e.pageY - react.top
    };
    if (((_a22 = options.onStart) == null ? void 0 : _a22.call(options, pos, e)) === false)
      return;
    pressedDelta.value = pos;
    preventDefault(e);
  };
  const move = (e) => {
    var _a22;
    if (!filterEvent(e))
      return;
    if (!pressedDelta.value)
      return;
    position.value = {
      x: e.pageX - pressedDelta.value.x,
      y: e.pageY - pressedDelta.value.y
    };
    (_a22 = options.onMove) == null ? void 0 : _a22.call(options, position.value, e);
    preventDefault(e);
  };
  const end = (e) => {
    var _a22;
    if (!filterEvent(e))
      return;
    pressedDelta.value = void 0;
    (_a22 = options.onEnd) == null ? void 0 : _a22.call(options, position.value, e);
    preventDefault(e);
  };
  if (isClient) {
    useEventListener(target, "pointerdown", start, true);
    useEventListener(draggingElement, "pointermove", move, true);
    useEventListener(draggingElement, "pointerup", end, true);
  }
  return __spreadProps$3(__spreadValues$8({}, toRefs(position)), {
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(() => `left:${position.value.x}px;top:${position.value.y}px;`)
  });
}
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
  let observer;
  const isSupported = window2 && "ResizeObserver" in window2;
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported && window2 && el) {
      observer = new window2.ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  useResizeObserver(target, ([entry]) => {
    width.value = entry.contentRect.width;
    height.value = entry.contentRect.height;
  }, options);
  return {
    width,
    height
  };
}
const functionsMap = [
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenchange",
    "fullscreenerror"
  ],
  [
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    "mozfullscreenchange",
    "mozfullscreenerror"
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    "MSFullscreenChange",
    "MSFullscreenError"
  ]
];
function useFullscreen(target, options = {}) {
  const { document: document2 = defaultDocument } = options;
  const targetRef = target || (document2 == null ? void 0 : document2.querySelector("html"));
  const isFullscreen = ref(false);
  let isSupported = false;
  let map = functionsMap[0];
  if (!document2) {
    isSupported = false;
  } else {
    for (const m of functionsMap) {
      if (m[1] in document2) {
        map = m;
        isSupported = true;
        break;
      }
    }
  }
  const [REQUEST, EXIT, ELEMENT, , EVENT] = map;
  async function exit() {
    if (!isSupported)
      return;
    if (document2 == null ? void 0 : document2[ELEMENT])
      await document2[EXIT]();
    isFullscreen.value = false;
  }
  async function enter() {
    if (!isSupported)
      return;
    await exit();
    const target2 = unrefElement(targetRef);
    if (target2) {
      await target2[REQUEST]();
      isFullscreen.value = true;
    }
  }
  async function toggle() {
    if (isFullscreen.value)
      await exit();
    else
      await enter();
  }
  if (document2) {
    useEventListener(document2, EVENT, () => {
      isFullscreen.value = !!(document2 == null ? void 0 : document2[ELEMENT]);
    }, false);
  }
  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle
  };
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0.1,
    window: window2 = defaultWindow
  } = options;
  const isSupported = window2 && "IntersectionObserver" in window2;
  let cleanup = noop$1;
  const stopWatch = isSupported ? watch(() => ({
    el: unrefElement(target),
    root: unrefElement(root)
  }), ({ el, root: root2 }) => {
    cleanup();
    if (!el)
      return;
    const observer = new window2.IntersectionObserver(callback, {
      root: root2,
      rootMargin,
      threshold
    });
    observer.observe(el);
    cleanup = () => {
      observer.disconnect();
      cleanup = noop$1;
    };
  }, { immediate: true, flush: "post" }) : noop$1;
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
const DefaultMagicKeysAliasMap = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function useMagicKeys(options = {}) {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop$1
  } = options;
  const current = reactive(new Set());
  const obj = { toJSON() {
    return {};
  }, current };
  const refs = useReactive ? reactive(obj) : obj;
  function updateRefs(e, value) {
    const key = e.key.toLowerCase();
    const code2 = e.code.toLowerCase();
    const values = [code2, key];
    if (value)
      current.add(e.code);
    else
      current.delete(e.code);
    for (const key2 of values) {
      if (key2 in refs) {
        if (useReactive)
          refs[key2] = value;
        else
          refs[key2].value = value;
      }
    }
  }
  if (target) {
    useEventListener(target, "keydown", (e) => {
      updateRefs(e, true);
      return onEventFired(e);
    }, { passive });
    useEventListener(target, "keyup", (e) => {
      updateRefs(e, false);
      return onEventFired(e);
    }, { passive });
  }
  const proxy = new Proxy(refs, {
    get(target2, prop, rec) {
      if (typeof prop !== "string")
        return Reflect.get(target2, prop, rec);
      prop = prop.toLowerCase();
      if (prop in aliasMap)
        prop = aliasMap[prop];
      if (!(prop in refs)) {
        if (/[+_-]/.test(prop)) {
          const keys = prop.split(/[+_-]/g).map((i) => i.trim());
          refs[prop] = computed(() => keys.every((key) => unref(proxy[key])));
        } else {
          refs[prop] = ref(false);
        }
      }
      const r = Reflect.get(target2, prop, rec);
      return useReactive ? unref(r) : r;
    }
  });
  return proxy;
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
function usePointerSwipe(target, options = {}) {
  const targetRef = ref(target);
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart
  } = options;
  const posStart = reactive({ x: 0, y: 0 });
  const updatePosStart = (x, y) => {
    posStart.x = x;
    posStart.y = y;
  };
  const posEnd = reactive({ x: 0, y: 0 });
  const updatePosEnd = (x, y) => {
    posEnd.x = x;
    posEnd.y = y;
  };
  const distanceX = computed(() => posStart.x - posEnd.x);
  const distanceY = computed(() => posStart.y - posEnd.y);
  const { max, abs } = Math;
  const isThresholdExceeded = computed(() => max(abs(distanceX.value), abs(distanceY.value)) >= threshold);
  const isSwiping = ref(false);
  const isPointerDown = ref(false);
  const direction = computed(() => {
    if (!isThresholdExceeded.value)
      return SwipeDirection.NONE;
    if (abs(distanceX.value) > abs(distanceY.value)) {
      return distanceX.value > 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT;
    } else {
      return distanceY.value > 0 ? SwipeDirection.UP : SwipeDirection.DOWN;
    }
  });
  const filterEvent = (e) => {
    if (options.pointerTypes)
      return options.pointerTypes.includes(e.pointerType);
    return true;
  };
  const stops = [
    useEventListener(target, "pointerdown", (e) => {
      var _a2, _b2;
      if (!filterEvent(e))
        return;
      isPointerDown.value = true;
      (_b2 = (_a2 = targetRef.value) == null ? void 0 : _a2.style) == null ? void 0 : _b2.setProperty("touch-action", "none");
      const eventTarget = e.target;
      eventTarget == null ? void 0 : eventTarget.setPointerCapture(e.pointerId);
      const { clientX: x, clientY: y } = e;
      updatePosStart(x, y);
      updatePosEnd(x, y);
      onSwipeStart == null ? void 0 : onSwipeStart(e);
    }),
    useEventListener(target, "pointermove", (e) => {
      if (!filterEvent(e))
        return;
      if (!isPointerDown.value)
        return;
      const { clientX: x, clientY: y } = e;
      updatePosEnd(x, y);
      if (!isSwiping.value && isThresholdExceeded.value)
        isSwiping.value = true;
      if (isSwiping.value)
        onSwipe == null ? void 0 : onSwipe(e);
    }),
    useEventListener(target, "pointerup", (e) => {
      var _a2, _b2;
      if (!filterEvent(e))
        return;
      if (isSwiping.value)
        onSwipeEnd == null ? void 0 : onSwipeEnd(e, direction.value);
      isPointerDown.value = false;
      isSwiping.value = false;
      (_b2 = (_a2 = targetRef.value) == null ? void 0 : _a2.style) == null ? void 0 : _b2.setProperty("touch-action", "initial");
    })
  ];
  const stop = () => stops.forEach((s) => s());
  return {
    isSwiping: readonly(isSwiping),
    direction: readonly(direction),
    posStart: readonly(posStart),
    posEnd: readonly(posEnd),
    distanceX,
    distanceY,
    stop
  };
}
function useVModel(props, key, emit, options = {}) {
  var _a2;
  const {
    passive = false,
    eventName,
    deep = false
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a2 = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a2.bind(vm));
  let event = eventName;
  if (!key) {
    {
      key = "modelValue";
    }
  }
  event = eventName || event || `update:${key}`;
  if (passive) {
    const proxy = ref(props[key]);
    watch(() => props[key], (v) => proxy.value = v);
    watch(proxy, (v) => {
      if (v !== props[key] || deep)
        _emit(event, v);
    }, {
      deep
    });
    return proxy;
  } else {
    return computed({
      get() {
        return props[key];
      },
      set(value) {
        _emit(event, value);
      }
    });
  }
}
function useWindowSize({ window: window2 = defaultWindow, initialWidth = Infinity, initialHeight = Infinity } = {}) {
  if (!window2) {
    return {
      width: ref(initialWidth),
      height: ref(initialHeight)
    };
  }
  const width = ref(window2.innerWidth);
  const height = ref(window2.innerHeight);
  useEventListener("resize", () => {
    width.value = window2.innerWidth;
    height.value = window2.innerHeight;
  }, { passive: true });
  return { width, height };
}
/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
const viewDepthKey = /* @__PURE__ */ PolySymbol("rvd");
const routerKey = /* @__PURE__ */ PolySymbol("r");
const routeLocationKey = /* @__PURE__ */ PolySymbol("rl");
const routerViewLocationKey = /* @__PURE__ */ PolySymbol("rvl");
const isBrowser$1 = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path2) => path2.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path2, query = {}, searchString = "", hash = "";
  const searchPos = location2.indexOf("?");
  const hashPos = location2.indexOf("#", searchPos > -1 ? searchPos : 0);
  if (searchPos > -1) {
    path2 = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path2 = path2 || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path2 = resolveRelativePath(path2 != null ? path2 : location2, currentLocation);
  return {
    fullPath: path2 + (searchString && "?") + searchString + hash,
    path: path2,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b2) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b2.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b2.params) && stringifyQuery2(a2.query) === stringifyQuery2(b2.query) && a2.hash === b2.hash;
}
function isSameRouteRecord(a2, b2) {
  return (a2.aliasOf || a2) === (b2.aliasOf || b2);
}
function isSameRouteLocationParams(a2, b2) {
  if (Object.keys(a2).length !== Object.keys(b2).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b2[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b2) {
  return Array.isArray(a2) ? isEquivalentArray(a2, b2) : Array.isArray(b2) ? isEquivalentArray(b2, a2) : a2 === b2;
}
function isEquivalentArray(a2, b2) {
  return Array.isArray(b2) ? a2.length === b2.length && a2.every((value, i) => value === b2[i]) : a2.length === 1 && a2[0] === b2;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (position === 1 || segment === ".")
      continue;
    if (segment === "..")
      position--;
    else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser$1) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path2, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path2;
}
const scrollPositions = new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path2 = stripBase(pathname, base);
  return path2 + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data2) {
    const state = assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data2, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data2) {
    const currentState = assign({}, historyState.value, history2.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data2);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go2(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go: go2,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function isRouteLocation(route2) {
  return typeof route2 === "string" || route2 && typeof route2 === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = /* @__PURE__ */ PolySymbol("nf");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re3 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re3 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re3})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re3}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re3})(?:/(?:${re3}))*)` : `(${re3})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re3 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re2 = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse2(path2) {
    const match = path2.match(re2);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path2 = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path2.endsWith("/"))
        path2 += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path2 += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (Array.isArray(param) && !repeatable)
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          const text = Array.isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path2.endsWith("/"))
                  path2 = path2.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path2 += text;
        }
      }
    }
    return path2;
  }
  return {
    re: re2,
    score,
    keys,
    parse: parse2,
    stringify
  };
}
function compareScoreArray(a2, b2) {
  let i = 0;
  while (i < a2.length && i < b2.length) {
    const diff = b2[i] - a2[i];
    if (diff)
      return diff;
    i++;
  }
  if (a2.length < b2.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b2.length) {
    return b2.length === 1 && b2[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b2) {
  let i = 0;
  const aScore = a2.score;
  const bScore = b2.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  return bScore.length - aScore.length;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path2) {
  if (!path2)
    return [[]];
  if (path2 === "/")
    return [[ROOT_TOKEN]];
  if (!path2.startsWith("/")) {
    throw new Error(`Invalid path "${path2}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path2.length) {
    char = path2[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path: path2 } = normalizedRecord;
      if (parent && path2[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path2 && connectingSlash + path2);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if ("children" in mainNormalizedRecord) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
      insertMatcher(matcher);
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0)
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path2;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(paramsFromLocation(currentLocation.params, matcher.keys.filter((k) => !k.optional).map((k) => k.name)), location2.params);
      path2 = matcher.stringify(params);
    } else if ("path" in location2) {
      path2 = location2.path;
      matcher = matchers.find((m) => m.re.test(path2));
      if (matcher) {
        params = matcher.parse(path2);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path2 = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path: path2,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route2) => addRoute(route2));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || {} : { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!Array.isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = Array.isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = Array.isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset2() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset: reset2
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next2 = (valid) => {
      if (valid === false)
        reject(createRouterError(4, {
          from,
          to
        }));
      else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function")
          enterCallbackArray.push(valid);
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, next2);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next2);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router2 = inject(routerKey);
  const currentRoute2 = inject(routeLocationKey);
  const route2 = computed(() => router2.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route2.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute2.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute2.params, route2.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute2.matched.length - 1 && isSameRouteLocationParams(currentRoute2.params, route2.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      return router2[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
    }
    return Promise.resolve();
  }
  return {
    route: route2,
    href: computed(() => route2.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const depth = inject(viewDepthKey, 0);
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth]);
    provide(viewDepthKey, depth + 1);
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route2 = routeToDisplay.value;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[props.name];
      const currentName = props.name;
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route: route2 });
      }
      const routePropsOption = matchedRoute.props[props.name];
      const routeProps = routePropsOption ? routePropsOption === true ? route2.params : typeof routePropsOption === "function" ? routePropsOption(route2) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, { Component: component, route: route2 }) || component;
    };
  }
});
function normalizeSlot(slot, data2) {
  if (!slot)
    return null;
  const slotContent = slot(data2);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute2 = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser$1 && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route2) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route2;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute2.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute2.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute2.value;
    const data2 = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
        state: data2,
        force,
        replace: replace2
      }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? error : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          return pushWithRedirect(assign(locationAsObject(failure2.to), {
            state: data2,
            force,
            replace: replace2
          }), redirectedFrom || toLocation);
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data2);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (Array.isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data2) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser$1 ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data2));
      else
        routerHistory.push(toLocation.fullPath, data2);
    }
    currentRoute2.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute2.value;
      if (isBrowser$1) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, 4 | 8)) {
          return error;
        }
        if (isNavigationFailure(error, 2)) {
          pushWithRedirect(error.to, toLocation).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta)
          routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute2.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (ready)
      return;
    ready = true;
    setupListeners();
    readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
    readyHandlers.reset();
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser$1 || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go2 = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = new Set();
  const router2 = {
    currentRoute: currentRoute2,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go: go2,
    back: () => go2(-1),
    forward: () => go2(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app2) {
      const router3 = this;
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router3;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute2)
      });
      if (isBrowser$1 && !started && currentRoute2.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute2.value[key]);
      }
      app2.provide(routerKey, router3);
      app2.provide(routeLocationKey, reactive(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute2);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          currentRoute2.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  return router2;
}
function runGuardQueue(guards) {
  return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function toArray(array) {
  array = array || [];
  if (Array.isArray(array))
    return array;
  return [array];
}
function remove(array, value) {
  if (!array)
    return false;
  const index2 = array.indexOf(value);
  if (index2 >= 0) {
    array.splice(index2, 1);
    return true;
  }
  return false;
}
function notNullish(v) {
  return v != null;
}
function objectMap(obj, fn) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => fn(k, v)).filter(notNullish));
}
function objectKeys(obj) {
  return Object.keys(obj);
}
var _configs = { "theme": "apple-basic", "title": "FlashFill", "titleTemplate": "%s", "remoteAssets": false, "monaco": "dev", "download": false, "info": false, "highlighter": "shiki", "lineNumbers": true, "colorSchema": "auto", "routerMode": "history", "aspectRatio": 1.7777777777777777, "canvasWidth": 980, "selectable": false, "themeConfig": {}, "fonts": { "sans": ['"Helvetica Neue"', "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'], "serif": ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"], "mono": ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"], "webfonts": ["Helvetica Neue"], "provider": "google", "local": ["Helvetica Neue"], "italic": false, "weights": ["200", "400", "600"] }, "drawings": { "enabled": true, "persist": false, "presenterOnly": false, "syncAll": true }, "plantUmlServer": "https://www.plantuml.com/plantuml", "layout": "intro", "class": "text-center" };
function define(target, key, value) {
  Object.defineProperty(target, key, {
    value,
    writable: true,
    enumerable: false
  });
}
const data$1 = reactive({ "page": 0, "clicks": 0 });
let onSet$1 = [];
let onPatch$1 = [];
define(data$1, "$syncUp", true);
define(data$1, "$syncDown", true);
define(data$1, "$paused", false);
define(data$1, "$onSet", (fn) => onSet$1.push(fn));
define(data$1, "$onPatch", (fn) => onPatch$1.push(fn));
{
  define(data$1, "$patch", async () => false);
}
const data = reactive({});
let onSet = [];
let onPatch = [];
define(data, "$syncUp", true);
define(data, "$syncDown", true);
define(data, "$paused", false);
define(data, "$onSet", (fn) => onSet.push(fn));
define(data, "$onPatch", (fn) => onPatch.push(fn));
{
  define(data, "$patch", async () => false);
}
const serverState = data$1;
const serverDrawingState = data;
const configs = _configs;
const slideAspect = (_a = configs.aspectRatio) != null ? _a : 16 / 9;
const slideWidth = (_b = configs.canvasWidth) != null ? _b : 980;
const slideHeight = Math.round(slideWidth / slideAspect);
const themeVars = computed(() => {
  return objectMap(configs.themeConfig || {}, (k, v) => [`--slidev-theme-${k}`, v]);
});
ref(false);
const showInfoDialog = ref(false);
const showGotoDialog = ref(false);
const shortcutsEnabled = ref(true);
const breakpoints = useBreakpoints(__spreadValues({
  xs: 460
}, breakpointsTailwind));
const windowSize = useWindowSize();
const magicKeys = useMagicKeys();
const isScreenVertical = computed(() => windowSize.height.value - windowSize.width.value / slideAspect > 180);
const fullscreen = useFullscreen(isClient ? document.body : null);
const activeElement = useActiveElement();
const isInputting = computed(() => {
  var _a2, _b2;
  return ["INPUT", "TEXTAREA"].includes(((_a2 = activeElement.value) == null ? void 0 : _a2.tagName) || "") || ((_b2 = activeElement.value) == null ? void 0 : _b2.classList.contains("CodeMirror-code"));
});
const isOnFocus = computed(() => {
  var _a2;
  return ["BUTTON", "A"].includes(((_a2 = activeElement.value) == null ? void 0 : _a2.tagName) || "");
});
useStorage("slidev-camera", "default");
useStorage("slidev-mic", "default");
const slideScale = useStorage("slidev-scale", 0);
const showOverview = useStorage("slidev-show-overview", false);
useStorage("slidev-presenter-cursor", true);
const showEditor = useStorage("slidev-show-editor", false);
useStorage("slidev-editor-width", isClient ? window.innerWidth * 0.4 : 100);
const toggleOverview = useToggle(showOverview);
function Y(e, t, u, x = (g) => g) {
  return e * x(0.5 - t * (0.5 - u));
}
function c$1(e, t) {
  return [e[0] + t[0], e[1] + t[1]];
}
function p(e, t) {
  return [e[0] - t[0], e[1] - t[1]];
}
function b$1(e, t) {
  return [e[0] * t, e[1] * t];
}
function fe(e, t) {
  return [e[0] / t, e[1] / t];
}
function I(e) {
  return [e[1], -e[0]];
}
function re(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function oe(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function be(e) {
  return Math.hypot(e[0], e[1]);
}
function ge(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function Z(e, t) {
  return ge(p(e, t));
}
function K(e) {
  return fe(e, be(e));
}
function se(e, t) {
  return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function ue(e, t) {
  return b$1(c$1(e, t), 0.5);
}
function V(e, t, u) {
  let x = Math.sin(u), g = Math.cos(u), y = e[0] - t[0], r = e[1] - t[1], d = y * g - r * x, L = y * x + r * g;
  return [d + t[0], L + t[1]];
}
function H(e, t, u) {
  return c$1(e, b$1(p(t, e), u));
}
function $(e, t, u) {
  return c$1(e, b$1(t, u));
}
var { min: _, PI: de } = Math, ie = 0.275, j = de + 1e-4;
function pe(e, t = {}) {
  let { size: u = 16, smoothing: x = 0.5, thinning: g = 0.5, simulatePressure: y = true, easing: r = (n) => n, start: d = {}, end: L = {}, last: q = false } = t, { cap: S = true, taper: k = 0, easing: C = (n) => n * (2 - n) } = d, { cap: a2 = true, taper: l = 0, easing: T = (n) => --n * n * n + 1 } = L;
  if (e.length === 0 || u <= 0)
    return [];
  let N = e[e.length - 1].runningLength, B = Math.pow(u * x, 2), O = [], P = [], U = e.slice(0, 10).reduce((n, i) => {
    let o = i.pressure;
    if (y) {
      let s = _(1, i.distance / u), f = _(1, 1 - s);
      o = _(1, n + (f - n) * (s * ie));
    }
    return (n + o) / 2;
  }, e[0].pressure), m = Y(u, g, e[e.length - 1].pressure, r), X, A = e[0].vector, z = e[0].point, F = z, E = z, M = F;
  for (let n = 0; n < e.length - 1; n++) {
    let { pressure: i } = e[n], { point: o, vector: s, distance: f, runningLength: R } = e[n];
    if (N - R < 3)
      continue;
    if (g) {
      if (y) {
        let D2 = _(1, f / u), W = _(1, 1 - D2);
        i = _(1, U + (W - U) * (D2 * ie));
      }
      m = Y(u, g, i, r);
    } else
      m = u / 2;
    X === void 0 && (X = m);
    let ae = R < k ? C(R / k) : 1, le = N - R < l ? T((N - R) / l) : 1;
    m = Math.max(0.01, m * Math.min(ae, le));
    let ee = e[n + 1].vector, te = re(s, ee);
    if (te < 0) {
      let D2 = b$1(I(A), m);
      for (let W = 1 / 13, G = 0; G <= 1; G += W)
        E = V(p(o, D2), o, j * G), O.push(E), M = V(c$1(o, D2), o, j * -G), P.push(M);
      z = E, F = M;
      continue;
    }
    let ne = b$1(I(H(ee, s, te)), m);
    E = p(o, ne), (n === 0 || Z(z, E) > B) && (O.push(E), z = E), M = c$1(o, ne), (n === 0 || Z(F, M) > B) && (P.push(M), F = M), U = i, A = s;
  }
  let v = e[0].point.slice(0, 2), h2 = e.length > 1 ? e[e.length - 1].point.slice(0, 2) : c$1(e[0].point, [1, 1]), J = O.length <= 1 || P.length <= 1, Q = [], w = [];
  if (J) {
    if (!(k || l) || q) {
      let n = $(v, K(I(p(v, h2))), -(X || m)), i = [];
      for (let o = 1 / 13, s = o; s <= 1; s += o)
        i.push(V(n, v, j * 2 * s));
      return i;
    }
  } else {
    if (!(k || l && J))
      if (S)
        for (let o = 1 / 13, s = o; s <= 1; s += o) {
          let f = V(P[0], v, j * s);
          Q.push(f);
        }
      else {
        let o = p(O[0], P[0]), s = b$1(o, 0.5), f = b$1(o, 0.51);
        Q.push(p(v, s), p(v, f), c$1(v, f), c$1(v, s));
      }
    let n = ue(O[O.length - 1], P[P.length - 1]), i = I(K(p(h2, n)));
    if (l || k && J)
      w.push(h2);
    else if (a2) {
      let o = $(h2, i, m);
      for (let s = 1 / 29, f = 0; f <= 1; f += s) {
        let R = V(o, h2, j * 3 * f);
        w.push(R);
      }
    } else
      w.push(c$1(h2, b$1(i, m)), c$1(h2, b$1(i, m * 0.99)), p(h2, b$1(i, m * 0.99)), p(h2, b$1(i, m)));
  }
  return O.concat(w, P.reverse(), Q);
}
function me(e, t = {}) {
  var C;
  let { streamline: u = 0.5, size: x = 16, last: g = false } = t;
  if (e.length === 0)
    return [];
  let y = 0.15 + (1 - u) * 0.85, r = Array.isArray(e[0]) ? e : e.map(({ x: a2, y: l, pressure: T = 0.5 }) => [a2, l, T]);
  r.length === 1 && (r = [...r, [...c$1(r[0], [1, 1]), ...r[0].slice(2)]]);
  let d = [{ point: [r[0][0], r[0][1]], pressure: r[0][2] >= 0 ? r[0][2] : 0.25, vector: [1, 1], distance: 0, runningLength: 0 }], L = false, q = 0, S = d[0], k = r.length - 1;
  for (let a2 = 1; a2 < r.length; a2++) {
    let l = g && a2 === k ? r[a2] : H(S.point, r[a2], y);
    if (oe(S.point, l))
      continue;
    let T = se(l, S.point);
    if (q += T, a2 < k && !L) {
      if (q < x)
        continue;
      L = true;
    }
    S = { point: l, pressure: r[a2][2] >= 0 ? r[a2][2] : 0.5, vector: K(p(S.point, l)), distance: T, runningLength: q }, d.push(S);
  }
  return d[0].vector = ((C = d[1]) == null ? void 0 : C.vector) || [0, 0], d;
}
function ce(e, t = {}) {
  return pe(me(e, t), t);
}
var qe = ce;
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp2.call(b2, prop))
      __defNormalProp2(a2, prop, b2[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b2)) {
      if (__propIsEnum2.call(b2, prop))
        __defNormalProp2(a2, prop, b2[prop]);
    }
  return a2;
};
typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var createNanoEvents = () => ({
  events: {},
  emit(event, ...args) {
    (this.events[event] || []).forEach((i) => i(...args));
  },
  on(event, cb2) {
    (this.events[event] = this.events[event] || []).push(cb2);
    return () => this.events[event] = (this.events[event] || []).filter((i) => i !== cb2);
  }
});
function numSort(a2, b2) {
  return a2 - b2;
}
function getSymbol(a2) {
  if (a2 < 0)
    return -1;
  return 1;
}
function splitNum(a2) {
  return [Math.abs(a2), getSymbol(a2)];
}
function guid() {
  const S4 = () => ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}
var DECIMAL = 2;
var D = DECIMAL;
var BaseModel = class {
  constructor(drauu2) {
    this.drauu = drauu2;
    this.event = void 0;
    this.point = void 0;
    this.start = void 0;
    this.el = null;
  }
  onStart(point) {
    return void 0;
  }
  onMove(point) {
    return false;
  }
  onEnd(point) {
    return void 0;
  }
  get brush() {
    return this.drauu.brush;
  }
  get shiftPressed() {
    return this.drauu.shiftPressed;
  }
  get altPressed() {
    return this.drauu.altPressed;
  }
  getMousePosition(event) {
    var _a2, _b2;
    const el = this.drauu.el;
    const scale2 = (_a2 = this.drauu.options.coordinateScale) != null ? _a2 : 1;
    if (this.drauu.options.coordinateTransform === false) {
      const rect = this.drauu.el.getBoundingClientRect();
      return {
        x: (event.pageX - rect.left) * scale2,
        y: (event.pageY - rect.top) * scale2,
        pressure: event.pressure
      };
    } else {
      const point = this.drauu.svgPoint;
      point.x = event.clientX;
      point.y = event.clientY;
      const loc = point.matrixTransform((_b2 = el.getScreenCTM()) == null ? void 0 : _b2.inverse());
      return {
        x: loc.x * scale2,
        y: loc.y * scale2,
        pressure: event.pressure
      };
    }
  }
  createElement(name, overrides) {
    var _a2;
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    const brush2 = overrides ? __spreadValues2(__spreadValues2({}, this.brush), overrides) : this.brush;
    el.setAttribute("fill", (_a2 = brush2.fill) != null ? _a2 : "transparent");
    el.setAttribute("stroke", brush2.color);
    el.setAttribute("stroke-width", brush2.size.toString());
    el.setAttribute("stroke-linecap", "round");
    if (brush2.dasharray)
      el.setAttribute("stroke-dasharray", brush2.dasharray);
    return el;
  }
  attr(name, value) {
    this.el.setAttribute(name, typeof value === "string" ? value : value.toFixed(D));
  }
  _setEvent(event) {
    this.event = event;
    this.point = this.getMousePosition(event);
  }
  _eventDown(event) {
    this._setEvent(event);
    this.start = this.point;
    return this.onStart(this.point);
  }
  _eventMove(event) {
    this._setEvent(event);
    return this.onMove(this.point);
  }
  _eventUp(event) {
    this._setEvent(event);
    return this.onEnd(this.point);
  }
};
var StylusModel = class extends BaseModel {
  constructor() {
    super(...arguments);
    this.points = [];
  }
  onStart(point) {
    this.el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.points = [point];
    this.attr("fill", this.brush.color);
    this.attr("d", this.getSvgData(this.points));
    return this.el;
  }
  onMove(point) {
    if (!this.el)
      this.onStart(point);
    if (this.points[this.points.length - 1] !== point)
      this.points.push(point);
    this.attr("d", this.getSvgData(this.points));
    return true;
  }
  onEnd() {
    const path2 = this.el;
    this.el = null;
    if (!path2)
      return false;
    return true;
  }
  getSvgData(points) {
    const stroke = qe(points, __spreadValues2({
      size: this.brush.size * 2,
      thinning: 0.9,
      simulatePressure: false,
      start: {
        taper: 5
      },
      end: {
        taper: 5
      }
    }, this.brush.stylusOptions));
    if (!stroke.length)
      return "";
    const d = stroke.reduce((acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    }, ["M", ...stroke[0], "Q"]);
    d.push("Z");
    return d.map((i) => typeof i === "number" ? i.toFixed(2) : i).join(" ");
  }
};
var EllipseModel = class extends BaseModel {
  onStart(point) {
    this.el = this.createElement("ellipse");
    this.attr("cx", point.x);
    this.attr("cy", point.y);
    return this.el;
  }
  onMove(point) {
    if (!this.el || !this.start)
      return false;
    let [dx, sx] = splitNum(point.x - this.start.x);
    let [dy, sy] = splitNum(point.y - this.start.y);
    if (this.shiftPressed) {
      const d = Math.min(dx, dy);
      dx = d;
      dy = d;
    }
    if (this.altPressed) {
      this.attr("cx", this.start.x);
      this.attr("cy", this.start.y);
      this.attr("rx", dx);
      this.attr("ry", dy);
    } else {
      const [x1, x2] = [this.start.x, this.start.x + dx * sx].sort(numSort);
      const [y1, y2] = [this.start.y, this.start.y + dy * sy].sort(numSort);
      this.attr("cx", (x1 + x2) / 2);
      this.attr("cy", (y1 + y2) / 2);
      this.attr("rx", (x2 - x1) / 2);
      this.attr("ry", (y2 - y1) / 2);
    }
    return true;
  }
  onEnd() {
    const path2 = this.el;
    this.el = null;
    if (!path2)
      return false;
    if (!path2.getTotalLength())
      return false;
    return true;
  }
};
function createArrowHead(id, fill) {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  const head = document.createElementNS("http://www.w3.org/2000/svg", "path");
  head.setAttribute("fill", fill);
  marker.setAttribute("id", id);
  marker.setAttribute("viewBox", "0 -5 10 10");
  marker.setAttribute("refX", "5");
  marker.setAttribute("refY", "0");
  marker.setAttribute("markerWidth", "4");
  marker.setAttribute("markerHeight", "4");
  marker.setAttribute("orient", "auto");
  head.setAttribute("d", "M0,-5L10,0L0,5");
  marker.appendChild(head);
  defs.appendChild(marker);
  return defs;
}
var LineModel = class extends BaseModel {
  onStart(point) {
    this.el = this.createElement("line", { fill: "transparent" });
    this.attr("x1", point.x);
    this.attr("y1", point.y);
    this.attr("x2", point.x);
    this.attr("y2", point.y);
    if (this.brush.arrowEnd) {
      const id = guid();
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.append(createArrowHead(id, this.brush.color));
      g.append(this.el);
      this.attr("marker-end", `url(#${id})`);
      return g;
    }
    return this.el;
  }
  onMove(point) {
    if (!this.el)
      return false;
    let { x, y } = point;
    if (this.shiftPressed) {
      const dx = point.x - this.start.x;
      const dy = point.y - this.start.y;
      if (dy !== 0) {
        let slope = dx / dy;
        slope = Math.round(slope);
        if (Math.abs(slope) <= 1) {
          x = this.start.x + dy * slope;
          y = this.start.y + dy;
        } else {
          x = this.start.x + dx;
          y = this.start.y;
        }
      }
    }
    if (this.altPressed) {
      this.attr("x1", this.start.x * 2 - x);
      this.attr("y1", this.start.y * 2 - y);
      this.attr("x2", x);
      this.attr("y2", y);
    } else {
      this.attr("x1", this.start.x);
      this.attr("y1", this.start.y);
      this.attr("x2", x);
      this.attr("y2", y);
    }
    return true;
  }
  onEnd() {
    const path2 = this.el;
    this.el = null;
    if (!path2)
      return false;
    if (path2.getTotalLength() < 5)
      return false;
    return true;
  }
};
var RectModel = class extends BaseModel {
  onStart(point) {
    this.el = this.createElement("rect");
    if (this.brush.cornerRadius) {
      this.attr("rx", this.brush.cornerRadius);
      this.attr("ry", this.brush.cornerRadius);
    }
    this.attr("x", point.x);
    this.attr("y", point.y);
    return this.el;
  }
  onMove(point) {
    if (!this.el || !this.start)
      return false;
    let [dx, sx] = splitNum(point.x - this.start.x);
    let [dy, sy] = splitNum(point.y - this.start.y);
    if (this.shiftPressed) {
      const d = Math.min(dx, dy);
      dx = d;
      dy = d;
    }
    if (this.altPressed) {
      this.attr("x", this.start.x - dx);
      this.attr("y", this.start.y - dy);
      this.attr("width", dx * 2);
      this.attr("height", dy * 2);
    } else {
      const [x1, x2] = [this.start.x, this.start.x + dx * sx].sort(numSort);
      const [y1, y2] = [this.start.y, this.start.y + dy * sy].sort(numSort);
      this.attr("x", x1);
      this.attr("y", y1);
      this.attr("width", x2 - x1);
      this.attr("height", y2 - y1);
    }
    return true;
  }
  onEnd() {
    const path2 = this.el;
    this.el = null;
    if (!path2)
      return false;
    if (!path2.getTotalLength())
      return false;
    return true;
  }
};
function getSqDist(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}
function getSqSegDist(p2, p1, p22) {
  let x = p1.x;
  let y = p1.y;
  let dx = p22.x - x;
  let dy = p22.y - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p2.x - x) * dx + (p2.y - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p22.x;
      y = p22.y;
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p2.x - x;
  dy = p2.y - y;
  return dx * dx + dy * dy;
}
function simplifyRadialDist(points, sqTolerance) {
  let prevPoint = points[0];
  const newPoints = [prevPoint];
  let point;
  for (let i = 1, len = points.length; i < len; i++) {
    point = points[i];
    if (getSqDist(point, prevPoint) > sqTolerance) {
      newPoints.push(point);
      prevPoint = point;
    }
  }
  if (prevPoint !== point && point)
    newPoints.push(point);
  return newPoints;
}
function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance;
  let index2 = 0;
  for (let i = first + 1; i < last; i++) {
    const sqDist = getSqSegDist(points[i], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index2 = i;
      maxSqDist = sqDist;
    }
  }
  if (maxSqDist > sqTolerance) {
    if (index2 - first > 1)
      simplifyDPStep(points, first, index2, sqTolerance, simplified);
    simplified.push(points[index2]);
    if (last - index2 > 1)
      simplifyDPStep(points, index2, last, sqTolerance, simplified);
  }
}
function simplifyDouglasPeucker(points, sqTolerance) {
  const last = points.length - 1;
  const simplified = [points[0]];
  simplifyDPStep(points, 0, last, sqTolerance, simplified);
  simplified.push(points[last]);
  return simplified;
}
function simplify(points, tolerance, highestQuality = false) {
  if (points.length <= 2)
    return points;
  const sqTolerance = tolerance !== void 0 ? tolerance * tolerance : 1;
  points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
  points = simplifyDouglasPeucker(points, sqTolerance);
  return points;
}
var DrawModel = class extends BaseModel {
  constructor() {
    super(...arguments);
    this.points = [];
    this.count = 0;
  }
  onStart(point) {
    this.el = this.createElement("path", { fill: "transparent" });
    this.points = [point];
    if (this.brush.arrowEnd) {
      this.arrowId = guid();
      const head = createArrowHead(this.arrowId, this.brush.color);
      this.el.appendChild(head);
    }
    return this.el;
  }
  onMove(point) {
    if (!this.el)
      this.onStart(point);
    if (this.points[this.points.length - 1] !== point) {
      this.points.push(point);
      this.count += 1;
    }
    if (this.count > 5) {
      this.points = simplify(this.points, 1, true);
      this.count = 0;
    }
    this.attr("d", toSvgData(this.points));
    return true;
  }
  onEnd() {
    const path2 = this.el;
    this.el = null;
    if (!path2)
      return false;
    path2.setAttribute("d", toSvgData(simplify(this.points, 1, true)));
    if (!path2.getTotalLength())
      return false;
    return true;
  }
};
function line(a2, b2) {
  const lengthX = b2.x - a2.x;
  const lengthY = b2.y - a2.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
}
function controlPoint(current, previous, next2, reverse) {
  const p2 = previous || current;
  const n = next2 || current;
  const smoothing = 0.2;
  const o = line(p2, n);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return { x, y };
}
function bezierCommand(point, i, points) {
  const cps = controlPoint(points[i - 1], points[i - 2], point);
  const cpe = controlPoint(point, points[i - 1], points[i + 1], true);
  return `C ${cps.x.toFixed(D)},${cps.y.toFixed(D)} ${cpe.x.toFixed(D)},${cpe.y.toFixed(D)} ${point.x.toFixed(D)},${point.y.toFixed(D)}`;
}
function toSvgData(points) {
  return points.reduce((acc, point, i, a2) => i === 0 ? `M ${point.x.toFixed(D)},${point.y.toFixed(D)}` : `${acc} ${bezierCommand(point, i, a2)}`, "");
}
function createModels(drauu2) {
  return {
    draw: new DrawModel(drauu2),
    stylus: new StylusModel(drauu2),
    line: new LineModel(drauu2),
    rectangle: new RectModel(drauu2),
    ellipse: new EllipseModel(drauu2)
  };
}
var Drauu = class {
  constructor(options = {}) {
    this.options = options;
    this.el = null;
    this.svgPoint = null;
    this.eventEl = null;
    this.shiftPressed = false;
    this.altPressed = false;
    this.drawing = false;
    this._emitter = createNanoEvents();
    this._models = createModels(this);
    this._undoStack = [];
    this._disposables = [];
    if (!this.options.brush)
      this.options.brush = { color: "black", size: 3, mode: "stylus" };
    if (options.el)
      this.mount(options.el, options.eventTarget);
  }
  get model() {
    return this._models[this.mode];
  }
  get mounted() {
    return !!this.el;
  }
  get mode() {
    return this.options.brush.mode || "stylus";
  }
  set mode(v) {
    this.options.brush.mode = v;
  }
  get brush() {
    return this.options.brush;
  }
  set brush(v) {
    this.options.brush = v;
  }
  resolveSelector(selector) {
    if (typeof selector === "string")
      return document.querySelector(selector);
    else
      return selector || null;
  }
  mount(el, eventEl) {
    if (this.el)
      throw new Error("[drauu] already mounted, unmount previous target first");
    this.el = this.resolveSelector(el);
    if (!this.el)
      throw new Error("[drauu] target element not found");
    if (this.el.tagName.toLocaleLowerCase() !== "svg")
      throw new Error("[drauu] can only mount to a SVG element");
    if (!this.el.createSVGPoint) {
      throw new Error("[drauu] SVG element must be create by document.createElementNS('http://www.w3.org/2000/sv', 'svg')");
    }
    this.svgPoint = this.el.createSVGPoint();
    const target = this.resolveSelector(eventEl) || this.el;
    const start = this.eventStart.bind(this);
    const move = this.eventMove.bind(this);
    const end = this.eventEnd.bind(this);
    const keyboard = this.eventKeyboard.bind(this);
    target.addEventListener("pointerdown", start, { passive: false });
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end, { passive: false });
    window.addEventListener("pointercancel", end, { passive: false });
    window.addEventListener("keydown", keyboard, false);
    window.addEventListener("keyup", keyboard, false);
    this._disposables.push(() => {
      target.removeEventListener("pointerdown", start);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      window.removeEventListener("keydown", keyboard, false);
      window.removeEventListener("keyup", keyboard, false);
    });
    this._emitter.emit("mounted");
  }
  unmount() {
    this._disposables.forEach((fn) => fn());
    this._disposables.length = 0;
    this.el = null;
    this._emitter.emit("unmounted");
  }
  on(type, fn) {
    return this._emitter.on(type, fn);
  }
  undo() {
    const el = this.el;
    if (!el.lastElementChild)
      return false;
    this._undoStack.push(el.lastElementChild.cloneNode(true));
    el.lastElementChild.remove();
    this._emitter.emit("changed");
    return true;
  }
  redo() {
    if (!this._undoStack.length)
      return false;
    this.el.appendChild(this._undoStack.pop());
    this._emitter.emit("changed");
    return true;
  }
  canRedo() {
    return !!this._undoStack.length;
  }
  canUndo() {
    var _a2;
    return !!((_a2 = this.el) == null ? void 0 : _a2.lastElementChild);
  }
  eventMove(event) {
    if (!this.acceptsInput(event) || !this.drawing)
      return;
    if (this.model._eventMove(event)) {
      event.stopPropagation();
      event.preventDefault();
      this._emitter.emit("changed");
    }
  }
  eventStart(event) {
    if (!this.acceptsInput(event))
      return;
    event.stopPropagation();
    event.preventDefault();
    if (this._currentNode)
      this.cancel();
    this.drawing = true;
    this._emitter.emit("start");
    this._currentNode = this.model._eventDown(event);
    if (this._currentNode)
      this.el.appendChild(this._currentNode);
    this._emitter.emit("changed");
  }
  eventEnd(event) {
    if (!this.acceptsInput(event) || !this.drawing)
      return;
    const result = this.model._eventUp(event);
    if (!result) {
      this.cancel();
    } else {
      if (result instanceof Element && result !== this._currentNode)
        this._currentNode = result;
      this.commit();
    }
    this.drawing = false;
    this._emitter.emit("end");
    this._emitter.emit("changed");
  }
  acceptsInput(event) {
    return !this.options.acceptsInputTypes || this.options.acceptsInputTypes.includes(event.pointerType);
  }
  eventKeyboard(event) {
    if (this.shiftPressed === event.shiftKey && this.altPressed === event.altKey)
      return;
    this.shiftPressed = event.shiftKey;
    this.altPressed = event.altKey;
    if (this.model.point) {
      if (this.model.onMove(this.model.point))
        this._emitter.emit("changed");
    }
  }
  commit() {
    this._undoStack.length = 0;
    const node = this._currentNode;
    this._currentNode = void 0;
    this._emitter.emit("committed", node);
  }
  clear() {
    this._undoStack.length = 0;
    this.cancel();
    this.el.innerHTML = "";
    this._emitter.emit("changed");
  }
  cancel() {
    if (this._currentNode) {
      this.el.removeChild(this._currentNode);
      this._currentNode = void 0;
      this._emitter.emit("canceled");
    }
  }
  dump() {
    return this.el.innerHTML;
  }
  load(svg) {
    this.clear();
    this.el.innerHTML = svg;
  }
};
function createDrauu(options) {
  return new Drauu(options);
}
const brushColors = [
  "#ff595e",
  "#ffca3a",
  "#8ac926",
  "#1982c4",
  "#6a4c93",
  "#ffffff",
  "#000000"
];
const drawingEnabled = useStorage("slidev-drawing-enabled", false);
const drawingPinned = useStorage("slidev-drawing-pinned", false);
const canUndo = ref(false);
const canRedo = ref(false);
const canClear = ref(false);
const isDrawing = ref(false);
const brush = toReactive(useStorage("slidev-drawing-brush", {
  color: brushColors[0],
  size: 4,
  mode: "stylus"
}));
const _mode = ref("stylus");
let disableDump = false;
const drawingMode = computed({
  get() {
    return _mode.value;
  },
  set(v) {
    _mode.value = v;
    if (v === "arrow") {
      brush.mode = "line";
      brush.arrowEnd = true;
    } else {
      brush.mode = v;
      brush.arrowEnd = false;
    }
  }
});
const drauuOptions = reactive({
  brush,
  acceptsInputTypes: computed(() => drawingEnabled.value ? void 0 : ["pen"]),
  coordinateTransform: false
});
const drauu = markRaw(createDrauu(drauuOptions));
function clearDrauu() {
  drauu.clear();
  serverDrawingState.$patch({ [currentPage.value]: "" });
}
function updateState() {
  var _a2;
  canRedo.value = drauu.canRedo();
  canUndo.value = drauu.canUndo();
  canClear.value = !!((_a2 = drauu.el) == null ? void 0 : _a2.children.length);
}
function loadCanvas() {
  disableDump = true;
  const data2 = serverDrawingState[currentPage.value];
  if (data2 != null)
    drauu.load(data2);
  else
    drauu.clear();
  disableDump = false;
}
drauu.on("changed", () => {
  updateState();
  if (!disableDump) {
    const dump = drauu.dump();
    const key = currentPage.value;
    if ((serverDrawingState[key] || "") !== dump) {
      serverDrawingState[key] = drauu.dump();
    }
  }
});
nextTick(() => {
  watch(currentPage, () => {
    if (!drauu.mounted)
      return;
    loadCanvas();
  }, { immediate: true });
  watchEffect(() => {
    serverDrawingState.$syncUp = configs.drawings.syncAll || isPresenter.value;
  });
});
drauu.on("start", () => isDrawing.value = true);
drauu.on("end", () => isDrawing.value = false);
window.addEventListener("keydown", (e) => {
  if (!drawingEnabled.value)
    return;
  const noModifier = !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey;
  let handled = true;
  if (e.code === "KeyZ" && (e.ctrlKey || e.metaKey)) {
    if (e.shiftKey)
      drauu.redo();
    else
      drauu.undo();
  } else if (e.code === "Escape") {
    drawingEnabled.value = false;
  } else if (e.code === "KeyL" && noModifier) {
    drawingMode.value = "line";
  } else if (e.code === "KeyA" && noModifier) {
    drawingMode.value = "arrow";
  } else if (e.code === "KeyS" && noModifier) {
    drawingMode.value = "stylus";
  } else if (e.code === "KeyR" && noModifier) {
    drawingMode.value = "rectangle";
  } else if (e.code === "KeyE" && noModifier) {
    drawingMode.value = "ellipse";
  } else if (e.code === "KeyC" && noModifier) {
    clearDrauu();
  } else if (e.code.startsWith("Digit") && noModifier && +e.code[5] <= brushColors.length) {
    brush.color = brushColors[+e.code[5] - 1];
  } else {
    handled = false;
  }
  if (handled) {
    e.preventDefault();
    e.stopPropagation();
  }
}, false);
function defineShortcutsSetup(fn) {
  return fn;
}
var __n1 = defineShortcutsSetup((nav2) => {
  return [
    {
      key: "enter",
      fn: () => nav2.next(),
      autoRepeat: true
    },
    {
      key: "backspace",
      fn: () => nav2.prev(),
      autoRepeat: true
    }
  ];
});
const preferredDark = usePreferredDark();
const store = useStorage("slidev-color-schema", "auto");
const isColorSchemaConfigured = computed(() => configs.colorSchema !== "auto");
const isDark = computed({
  get() {
    if (isColorSchemaConfigured.value)
      return configs.colorSchema === "dark";
    return store.value === "auto" ? preferredDark.value : store.value === "dark";
  },
  set(v) {
    if (isColorSchemaConfigured.value)
      return;
    store.value = v === preferredDark.value ? "auto" : v ? "dark" : "light";
  }
});
const toggleDark = useToggle(isDark);
if (isClient) {
  watch(isDark, (v) => {
    const html = document.querySelector("html");
    html.classList.toggle("dark", v);
    html.classList.toggle("light", !v);
  }, { immediate: true });
}
function setupShortcuts() {
  const injection_arg = {
    next,
    prev,
    nextSlide,
    prevSlide,
    downloadPDF,
    toggleDark,
    toggleOverview,
    toggleDrawing: () => drawingEnabled.value = !drawingEnabled.value,
    escapeOverview: () => showOverview.value = false,
    showGotoDialog: () => showGotoDialog.value = !showGotoDialog.value
  };
  let injection_return = [];
  injection_return = __n1(injection_arg);
  return injection_return;
}
const _shortcut = and(not(isInputting), not(isOnFocus), shortcutsEnabled);
function shortcut(key, fn, autoRepeat = false) {
  if (typeof key === "string")
    key = magicKeys[key];
  const source = and(key, _shortcut);
  let count = 0;
  let timer;
  const trigger2 = () => {
    clearTimeout(timer);
    if (!source.value) {
      count = 0;
      return;
    }
    if (autoRepeat) {
      timer = setTimeout(trigger2, Math.max(1e3 - count * 250, 150));
      count++;
    }
    fn();
  };
  return watch(source, trigger2, { flush: "sync" });
}
function strokeShortcut(key, fn) {
  return onKeyStroke(key, (ev) => {
    if (!_shortcut.value)
      return;
    if (!ev.repeat)
      fn();
  });
}
function registerShortcuts() {
  const customShortcuts = setupShortcuts();
  const { escape, space, shift, left, right, d, g, o } = magicKeys;
  const shortcuts = new Map([
    { key: and(space, not(shift)), fn: next, autoRepeat: true },
    { key: and(space, shift), fn: prev, autoRepeat: true },
    { key: and(right, not(shift)), fn: next, autoRepeat: true },
    { key: and(left, not(shift)), fn: prev, autoRepeat: true },
    { key: "pageDown", fn: next, autoRepeat: true },
    { key: "pageUp", fn: prev, autoRepeat: true },
    { key: "up", fn: () => prevSlide(false), autoRepeat: true },
    { key: "down", fn: nextSlide, autoRepeat: true },
    { key: and(left, shift), fn: () => prevSlide(false), autoRepeat: true },
    { key: and(right, shift), fn: nextSlide, autoRepeat: true },
    { key: and(d, not(drawingEnabled)), fn: toggleDark },
    { key: and(o, not(drawingEnabled)), fn: toggleOverview },
    { key: and(escape, not(drawingEnabled)), fn: () => showOverview.value = false },
    { key: and(g, not(drawingEnabled)), fn: () => showGotoDialog.value = !showGotoDialog.value },
    ...customShortcuts
  ].map((options) => [options.key, options]));
  shortcuts.forEach((options) => {
    if (options.fn)
      shortcut(options.key, options.fn, options.autoRepeat);
  });
  strokeShortcut("f", () => fullscreen.toggle());
}
const _hoisted_1$H = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$w = /* @__PURE__ */ createBaseVNode("path", {
  d: "M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$r = [
  _hoisted_2$w
];
function render$j(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$H, _hoisted_3$r);
}
var __unplugin_components_0$6 = { name: "carbon-close", render: render$j };
function getSlideClass(route2) {
  var _a2, _b2;
  const no = (_b2 = (_a2 = route2 == null ? void 0 : route2.meta) == null ? void 0 : _a2.slide) == null ? void 0 : _b2.no;
  if (no != null)
    return `slidev-page-${no}`;
  return "";
}
const injectionClicks = Symbol("v-click-clicks");
const injectionClicksElements = Symbol("v-click-clicks-elements");
const injectionOrderMap = Symbol("v-click-clicks-order-map");
const injectionClicksDisabled = Symbol("v-click-clicks-disabled");
const injectionSlideScale = Symbol("slidev-slide-scale");
const CLASS_VCLICK_TARGET = "slidev-vclick-target";
const CLASS_VCLICK_HIDDEN = "slidev-vclick-hidden";
const CLASS_VCLICK_FADE = "slidev-vclick-fade";
const CLASS_VCLICK_HIDDEN_EXP = "slidev-vclick-hidden-explicitly";
const CLASS_VCLICK_CURRENT = "slidev-vclick-current";
const CLASS_VCLICK_PRIOR = "slidev-vclick-prior";
var SlideContainer_vue_vue_type_style_index_0_lang = "";
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  props: {
    width: {
      type: Number
    },
    meta: {
      default: () => ({})
    },
    scale: {
      type: [Number, String]
    }
  },
  setup(__props) {
    const props = __props;
    const root = ref();
    const element = useElementSize(root);
    const width = computed(() => props.width ? props.width : element.width.value);
    const height = computed(() => props.width ? props.width / slideAspect : element.height.value);
    if (props.width) {
      watchEffect(() => {
        if (root.value) {
          root.value.style.width = `${width.value}px`;
          root.value.style.height = `${height.value}px`;
        }
      });
    }
    const screenAspect = computed(() => width.value / height.value);
    const scale2 = computed(() => {
      if (props.scale)
        return props.scale;
      if (screenAspect.value < slideAspect)
        return width.value / slideWidth;
      return height.value * slideAspect / slideWidth;
    });
    const style = computed(() => ({
      height: `${slideHeight}px`,
      width: `${slideWidth}px`,
      transform: `translate(-50%, -50%) scale(${scale2.value})`
    }));
    const className = computed(() => ({
      "select-none": !configs.selectable,
      "slidev-code-line-numbers": configs.lineNumbers
    }));
    provide(injectionSlideScale, scale2);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "slide-container",
        ref: (_value, _refs) => {
          _refs["root"] = _value;
          root.value = _value;
        },
        class: normalizeClass(unref(className))
      }, [
        createBaseVNode("div", {
          id: "slide-content",
          style: normalizeStyle(unref(style))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 4),
        renderSlot(_ctx.$slots, "controls")
      ], 2);
    };
  }
});
var SlideWrapper = defineComponent({
  props: {
    clicks: {
      type: [Number, String],
      default: 0
    },
    clicksElements: {
      type: Array,
      default: () => []
    },
    clicksOrderMap: {
      type: Map,
      default: () => new Map()
    },
    clicksDisabled: {
      type: Boolean,
      default: false
    },
    is: {
      type: Object,
      default: void 0
    }
  },
  setup(props, { emit }) {
    const clicks2 = useVModel(props, "clicks", emit);
    const clicksElements2 = useVModel(props, "clicksElements", emit);
    const clicksDisabled = useVModel(props, "clicksDisabled", emit);
    const clicksOrderMap = useVModel(props, "clicksOrderMap", emit);
    clicksElements2.value.length = 0;
    provide(injectionClicks, clicks2);
    provide(injectionClicksDisabled, clicksDisabled);
    provide(injectionClicksElements, clicksElements2);
    provide(injectionOrderMap, clicksOrderMap);
  },
  render() {
    var _a2, _b2;
    if (this.$props.is)
      return h(this.$props.is);
    return (_b2 = (_a2 = this.$slots) == null ? void 0 : _a2.default) == null ? void 0 : _b2.call(_a2);
  }
});
const _hoisted_1$G = ["innerHTML"];
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  props: {
    page: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return unref(serverDrawingState)[__props.page] ? (openBlock(), createElementBlock("svg", {
        key: 0,
        ref: (_value, _refs) => {
          _refs["svg"] = _value;
        },
        class: "w-full h-full absolute top-0 pointer-events-none",
        innerHTML: unref(serverDrawingState)[__props.page]
      }, null, 8, _hoisted_1$G)) : createCommentVNode("v-if", true);
    };
  }
});
var SlidesOverview_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$F = { class: "slides-overview bg-main !bg-opacity-75 p-16 overflow-y-auto" };
const _hoisted_2$v = ["onClick"];
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: { type: Boolean }
  },
  emits: [],
  setup(__props, { emit }) {
    const props = __props;
    const value = useVModel(props, "modelValue", emit);
    function close() {
      value.value = false;
    }
    function go$1(page) {
      go(page);
      close();
    }
    const xs = breakpoints.smaller("xs");
    const sm = breakpoints.smaller("sm");
    const padding = 4 * 16 * 2;
    const gap = 2 * 16;
    const cardWidth = computed(() => {
      if (xs.value)
        return windowSize.width.value - padding;
      else if (sm.value)
        return (windowSize.width.value - padding - gap) / 2;
      return 300;
    });
    return (_ctx, _cache) => {
      const _component_carbon58close = __unplugin_components_0$6;
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives(createBaseVNode("div", _hoisted_1$F, [
          createBaseVNode("div", {
            class: "grid gap-y-4 gap-x-8 w-full",
            style: normalizeStyle(`grid-template-columns: repeat(auto-fit,minmax(${unref(cardWidth)}px,1fr))`)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(rawRoutes).slice(0, -1), (route2, idx) => {
              return openBlock(), createElementBlock("div", {
                key: route2.path,
                class: "relative"
              }, [
                createBaseVNode("div", {
                  class: "inline-block border border-gray-400 rounded border-opacity-50 overflow-hidden bg-main hover:border-$slidev-theme-primary",
                  onClick: ($event) => go$1(+route2.path)
                }, [
                  createVNode(_sfc_main$s, {
                    key: route2.path,
                    width: unref(cardWidth),
                    "clicks-disabled": true,
                    class: "pointer-events-none"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$r, {
                        page: +route2.path
                      }, null, 8, ["page"]),
                      createVNode(unref(SlideWrapper), {
                        is: route2 == null ? void 0 : route2.component,
                        "clicks-disabled": true,
                        class: normalizeClass(unref(getSlideClass)(route2))
                      }, null, 8, ["is", "class"])
                    ]),
                    _: 2
                  }, 1032, ["width"])
                ], 8, _hoisted_2$v),
                createBaseVNode("div", {
                  class: "absolute top-0 opacity-50",
                  style: normalizeStyle(`left: ${unref(cardWidth) + 5}px`)
                }, toDisplayString(idx + 1), 5)
              ]);
            }), 128))
          ], 4)
        ], 512), [
          [vShow, unref(value)]
        ]),
        unref(value) ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "fixed text-2xl top-4 right-4 icon-btn text-gray-400",
          onClick: close
        }, [
          createVNode(_component_carbon58close)
        ])) : createCommentVNode("v-if", true)
      ], 64);
    };
  }
});
var _imports_0$1 = "/assets/logo.b72bde5d.png";
const _hoisted_1$E = {
  key: 0,
  class: "fixed top-0 bottom-0 left-0 right-0 grid z-20"
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: {
      default: false
    },
    class: {
      default: ""
    }
  },
  emits: ["modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const value = useVModel(props, "modelValue", emit);
    function onClick() {
      value.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(KeepAlive, null, [
        unref(value) ? (openBlock(), createElementBlock("div", _hoisted_1$E, [
          createBaseVNode("div", {
            bg: "black opacity-80",
            class: "absolute top-0 bottom-0 left-0 right-0 -z-1",
            onClick: _cache[0] || (_cache[0] = ($event) => onClick())
          }),
          createBaseVNode("div", {
            class: normalizeClass(["m-auto rounded-md bg-main shadow", props.class]),
            "dark:border": "~ gray-400 opacity-10"
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ])) : createCommentVNode("v-if", true)
      ], 1024);
    };
  }
});
var InfoDialog_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$D = { class: "slidev-info-dialog slidev-layout flex flex-col gap-4 text-base" };
const _hoisted_2$u = ["innerHTML"];
const _hoisted_3$q = /* @__PURE__ */ createBaseVNode("a", {
  href: "https://github.com/slidevjs/slidev",
  target: "_blank",
  class: "!opacity-100 !border-none !text-current"
}, [
  /* @__PURE__ */ createBaseVNode("div", { class: "flex gap-1 children:my-auto" }, [
    /* @__PURE__ */ createBaseVNode("div", { class: "opacity-50 text-sm mr-2" }, "Powered by"),
    /* @__PURE__ */ createBaseVNode("img", {
      class: "w-5 h-5",
      src: _imports_0$1,
      alt: "Slidev"
    }),
    /* @__PURE__ */ createBaseVNode("div", { style: { "color": "#2082A6" } }, [
      /* @__PURE__ */ createBaseVNode("b", null, "Sli"),
      /* @__PURE__ */ createTextVNode("dev ")
    ])
  ])
], -1);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: {
      default: false
    }
  },
  emits: ["modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const value = useVModel(props, "modelValue", emit);
    const hasInfo = computed(() => typeof configs.info === "string");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$p, {
        modelValue: unref(value),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(value) ? value.value = $event : null),
        class: "px-6 py-4"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$D, [
            unref(hasInfo) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "mb-4",
              innerHTML: unref(configs).info
            }, null, 8, _hoisted_2$u)) : createCommentVNode("v-if", true),
            _hoisted_3$q
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
var Goto_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _hoisted_1$C = ["disabled", "onKeydown"];
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const input = ref();
    const text = ref("");
    const num = computed(() => +text.value);
    const valid = computed(() => !isNaN(num.value) && num.value > 0 && num.value <= total.value);
    function goTo() {
      if (valid.value)
        go(num.value);
      close();
    }
    function close() {
      showGotoDialog.value = false;
    }
    whenever(showGotoDialog, async () => {
      var _a2;
      text.value = "";
      await nextTick();
      (_a2 = input.value) == null ? void 0 : _a2.focus();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "slidev-goto-dialog",
        class: normalizeClass(["fixed right-5 bg-main transform transition-all", unref(showGotoDialog) ? "top-5" : "-top-20"]),
        shadow: "~",
        p: "x-4 y-2",
        border: "~ transparent rounded dark:gray-400 dark:opacity-25"
      }, [
        withDirectives(createBaseVNode("input", {
          ref: (_value, _refs) => {
            _refs["input"] = _value;
            input.value = _value;
          },
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => text.value = $event),
          type: "number",
          disabled: !unref(showGotoDialog),
          class: normalizeClass(["outline-none bg-transparent", { "text-red-400": !unref(valid) && text.value }]),
          placeholder: "Goto...",
          onKeydown: [
            withKeys(goTo, ["enter"]),
            withKeys(close, ["escape"])
          ],
          onBlur: close
        }, null, 42, _hoisted_1$C), [
          [vModelText, text.value]
        ])
      ], 2);
    };
  }
});
var Goto = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-5af5c1d4"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  setup(__props) {
    shallowRef();
    shallowRef();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$q, {
          modelValue: unref(showOverview),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(showOverview) ? showOverview.value = $event : null)
        }, null, 8, ["modelValue"]),
        createVNode(Goto),
        createCommentVNode("v-if", true),
        unref(configs).info ? (openBlock(), createBlock(_sfc_main$o, {
          key: 1,
          modelValue: unref(showInfoDialog),
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(showInfoDialog) ? showInfoDialog.value = $event : null)
        }, null, 8, ["modelValue"])) : createCommentVNode("v-if", true)
      ], 64);
    };
  }
});
const _hoisted_1$B = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$t = /* @__PURE__ */ createBaseVNode("path", {
  d: "M30 8h-4.1c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2h14.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30V8zm-9 4c-1.7 0-3-1.3-3-3s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$p = /* @__PURE__ */ createBaseVNode("path", {
  d: "M2 24h4.1c.5 2.3 2.5 4 4.9 4s4.4-1.7 4.9-4H30v-2H15.9c-.5-2.3-2.5-4-4.9-4s-4.4 1.7-4.9 4H2v2zm9-4c1.7 0 3 1.3 3 3s-1.3 3-3 3s-3-1.3-3-3s1.3-3 3-3z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$a = [
  _hoisted_2$t,
  _hoisted_3$p
];
function render$i(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$B, _hoisted_4$a);
}
var __unplugin_components_15 = { name: "carbon-settings-adjust", render: render$i };
const _hoisted_1$A = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$s = /* @__PURE__ */ createBaseVNode("path", {
  d: "M17 22v-8h-4v2h2v6h-3v2h8v-2h-3z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$o = /* @__PURE__ */ createBaseVNode("path", {
  d: "M16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$9 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_5$3 = [
  _hoisted_2$s,
  _hoisted_3$o,
  _hoisted_4$9
];
function render$h(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$A, _hoisted_5$3);
}
var __unplugin_components_14 = { name: "carbon-information", render: render$h };
const _hoisted_1$z = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$r = /* @__PURE__ */ createBaseVNode("path", {
  d: "M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$n = /* @__PURE__ */ createBaseVNode("path", {
  d: "M26 14l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$8 = [
  _hoisted_2$r,
  _hoisted_3$n
];
function render$g(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$z, _hoisted_4$8);
}
var __unplugin_components_13 = { name: "carbon-download", render: render$g };
const _hoisted_1$y = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$q = /* @__PURE__ */ createBaseVNode("path", {
  d: "M27.307 6.107L30 3.414L28.586 2l-2.693 2.693L24.8 3.6a1.933 1.933 0 0 0-2.8 0l-18 18V28h6.4l18-18a1.933 1.933 0 0 0 0-2.8zM9.6 26H6v-3.6L23.4 5L27 8.6z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$m = /* @__PURE__ */ createBaseVNode("path", {
  d: "M9 11.586L16.586 4L18 5.414L10.414 13z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$7 = [
  _hoisted_2$q,
  _hoisted_3$m
];
function render$f(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$y, _hoisted_4$7);
}
var __unplugin_components_0$5 = { name: "carbon-pen", render: render$f };
const _hoisted_1$x = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 256 256"
};
const _hoisted_2$p = /* @__PURE__ */ createBaseVNode("path", {
  d: "M213.663 202.343a8 8 0 0 1-11.315 11.314L139.23 150.54l-20.304 55.836a15.86 15.86 0 0 1-14.957 10.532h-.084a15.855 15.855 0 0 1-14.976-10.382L30.695 51.289a16 16 0 0 1 20.598-20.6l155.238 58.214a16 16 0 0 1-.15 30.018l-55.837 20.305z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$l = [
  _hoisted_2$p
];
function render$e(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$x, _hoisted_3$l);
}
var __unplugin_components_0$4 = { name: "ph-cursor-fill", render: render$e };
const _hoisted_1$w = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$o = /* @__PURE__ */ createStaticVNode('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>', 9);
const _hoisted_11$2 = [
  _hoisted_2$o
];
function render$d(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$w, _hoisted_11$2);
}
var __unplugin_components_6 = { name: "carbon-sun", render: render$d };
const _hoisted_1$v = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$n = /* @__PURE__ */ createBaseVNode("path", {
  d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$k = [
  _hoisted_2$n
];
function render$c(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$v, _hoisted_3$k);
}
var __unplugin_components_5 = { name: "carbon-moon", render: render$c };
const _hoisted_1$u = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$m = /* @__PURE__ */ createBaseVNode("path", {
  d: "M8 4v4H4V4zm2-2H2v8h8zm8 2v4h-4V4zm2-2h-8v8h8zm8 2v4h-4V4zm2-2h-8v8h8zM8 14v4H4v-4zm2-2H2v8h8zm8 2v4h-4v-4zm2-2h-8v8h8zm8 2v4h-4v-4zm2-2h-8v8h8zM8 24v4H4v-4zm2-2H2v8h8zm8 2v4h-4v-4zm2-2h-8v8h8zm8 2v4h-4v-4zm2-2h-8v8h8z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$j = [
  _hoisted_2$m
];
function render$b(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$u, _hoisted_3$j);
}
var __unplugin_components_4 = { name: "carbon-apps", render: render$b };
const _hoisted_1$t = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$l = /* @__PURE__ */ createBaseVNode("path", {
  d: "M18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$i = [
  _hoisted_2$l
];
function render$a(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$t, _hoisted_3$i);
}
var __unplugin_components_3$2 = { name: "carbon-arrow-right", render: render$a };
const _hoisted_1$s = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$k = /* @__PURE__ */ createBaseVNode("path", {
  d: "M14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16l10 10z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$h = [
  _hoisted_2$k
];
function render$9(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$s, _hoisted_3$h);
}
var __unplugin_components_2$1 = { name: "carbon-arrow-left", render: render$9 };
const _hoisted_1$r = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$j = /* @__PURE__ */ createBaseVNode("path", {
  d: "M20 2v2h6.586L18 12.582L19.414 14L28 5.414V12h2V2H20z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$g = /* @__PURE__ */ createBaseVNode("path", {
  d: "M14 19.416L12.592 18L4 26.586V20H2v10h10v-2H5.414L14 19.416z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$6 = [
  _hoisted_2$j,
  _hoisted_3$g
];
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$r, _hoisted_4$6);
}
var __unplugin_components_1$2 = { name: "carbon-maximize", render: render$8 };
const _hoisted_1$q = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$i = /* @__PURE__ */ createBaseVNode("path", {
  d: "M4 18v2h6.586L2 28.582L3.414 30L12 21.414V28h2V18H4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$f = /* @__PURE__ */ createBaseVNode("path", {
  d: "M30 3.416L28.592 2L20 10.586V4h-2v10h10v-2h-6.586L30 3.416z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$5 = [
  _hoisted_2$i,
  _hoisted_3$f
];
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$q, _hoisted_4$5);
}
var __unplugin_components_0$3 = { name: "carbon-minimize", render: render$7 };
const _hoisted_1$p = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$h = /* @__PURE__ */ createBaseVNode("path", {
  d: "M13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$e = [
  _hoisted_2$h
];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$p, _hoisted_3$e);
}
var __unplugin_components_0$2 = { name: "carbon-checkmark", render: render$6 };
var SelectList_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$o = { class: "select-list" };
const _hoisted_2$g = { class: "title" };
const _hoisted_3$d = { class: "items" };
const _hoisted_4$4 = ["onClick"];
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: {
      type: [Object, String, Number]
    },
    title: {
      type: String
    },
    items: {
      type: Array
    }
  },
  setup(__props, { emit }) {
    const props = __props;
    const value = useVModel(props, "modelValue", emit, { passive: true });
    return (_ctx, _cache) => {
      const _component_carbon58checkmark = __unplugin_components_0$2;
      return openBlock(), createElementBlock("div", _hoisted_1$o, [
        createBaseVNode("div", _hoisted_2$g, toDisplayString(__props.title), 1),
        createBaseVNode("div", _hoisted_3$d, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
            return openBlock(), createElementBlock("div", {
              key: item.value,
              class: normalizeClass(["item", { active: unref(value) === item.value }]),
              onClick: () => {
                var _a2;
                value.value = item.value;
                (_a2 = item.onClick) == null ? void 0 : _a2.call(item);
              }
            }, [
              createVNode(_component_carbon58checkmark, {
                class: normalizeClass(["text-green-500", { "opacity-0": unref(value) !== item.value }])
              }, null, 8, ["class"]),
              createTextVNode(" " + toDisplayString(item.display || item.value), 1)
            ], 10, _hoisted_4$4);
          }), 128))
        ])
      ]);
    };
  }
});
var SelectList = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-6fbb6a02"]]);
const _hoisted_1$n = { class: "text-sm" };
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const items = [
      {
        display: "Fit",
        value: 0
      },
      {
        display: "1:1",
        value: 1
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        createVNode(SelectList, {
          modelValue: unref(slideScale),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(slideScale) ? slideScale.value = $event : null),
          title: "Scale",
          items
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
const _hoisted_1$m = {
  key: 0,
  class: "rounded-md bg-main shadow absolute bottom-10 left-0 z-20",
  "dark:border": "~ gray-400 opacity-10"
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: {
      default: false
    },
    disabled: {
      default: false
    }
  },
  setup(__props, { emit }) {
    const props = __props;
    const value = useVModel(props, "modelValue", emit, { passive: true });
    const el = ref();
    onClickOutside(el, () => {
      value.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref: (_value, _refs) => {
          _refs["el"] = _value;
          el.value = _value;
        },
        class: "flex relative"
      }, [
        createBaseVNode("button", {
          class: normalizeClass({ disabled: __props.disabled }),
          onClick: _cache[0] || (_cache[0] = ($event) => value.value = !unref(value))
        }, [
          renderSlot(_ctx.$slots, "button", {
            class: normalizeClass({ disabled: __props.disabled })
          })
        ], 2),
        (openBlock(), createBlock(KeepAlive, null, [
          unref(value) ? (openBlock(), createElementBlock("div", _hoisted_1$m, [
            renderSlot(_ctx.$slots, "menu")
          ])) : createCommentVNode("v-if", true)
        ], 1024))
      ], 512);
    };
  }
});
const _sfc_main$i = {};
const _hoisted_1$l = { class: "w-1px m-2 opacity-10 bg-current" };
function _sfc_render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$l);
}
var VerticalDivider = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$4]]);
const _hoisted_1$k = { class: "icon-btn" };
const _hoisted_2$f = {
  class: "h-40px flex",
  p: "l-1 t-0.5 r-2",
  text: "sm leading-2"
};
const _hoisted_3$c = { class: "my-auto" };
const _hoisted_4$3 = { class: "opacity-50" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  props: {
    persist: {
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    breakpoints.smaller("md");
    const { isFullscreen, toggle: toggleFullscreen } = fullscreen;
    computed(() => `/presenter/${currentPage.value}`);
    computed(() => `/${currentPage.value}`);
    const root = ref();
    const onMouseLeave = () => {
      if (root.value && activeElement.value && root.value.contains(activeElement.value))
        activeElement.value.blur();
    };
    const barStyle = computed(() => props.persist ? "text-$slidev-controls-foreground bg-transparent" : "rounded-md bg-main shadow dark:border dark:border-gray-400 dark:border-opacity-10");
    shallowRef();
    const DrawingControls = shallowRef();
    import("./DrawingControls.0ccec462.js").then((v) => DrawingControls.value = v.default);
    return (_ctx, _cache) => {
      const _component_carbon58minimize = __unplugin_components_0$3;
      const _component_carbon58maximize = __unplugin_components_1$2;
      const _component_carbon58arrow_left = __unplugin_components_2$1;
      const _component_carbon58arrow_right = __unplugin_components_3$2;
      const _component_carbon58apps = __unplugin_components_4;
      const _component_carbon_moon = __unplugin_components_5;
      const _component_carbon_sun = __unplugin_components_6;
      const _component_carbon58pen = __unplugin_components_0$5;
      resolveComponent("RouterLink");
      const _component_carbon58download = __unplugin_components_13;
      const _component_carbon58information = __unplugin_components_14;
      const _component_carbon58settings_adjust = __unplugin_components_15;
      return openBlock(), createElementBlock("nav", {
        ref: (_value, _refs) => {
          _refs["root"] = _value;
          root.value = _value;
        },
        class: "flex flex-col"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["flex flex-wrap-reverse text-xl p-2 gap-1", unref(barStyle)]),
          onMouseleave: onMouseLeave
        }, [
          !unref(isEmbedded) ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "icon-btn",
            onClick: _cache[0] || (_cache[0] = (...args) => unref(toggleFullscreen) && unref(toggleFullscreen)(...args))
          }, [
            unref(isFullscreen) ? (openBlock(), createBlock(_component_carbon58minimize, { key: 0 })) : (openBlock(), createBlock(_component_carbon58maximize, { key: 1 }))
          ])) : createCommentVNode("v-if", true),
          createBaseVNode("button", {
            class: normalizeClass(["icon-btn", { disabled: !unref(hasPrev) }]),
            onClick: _cache[1] || (_cache[1] = (...args) => unref(prev) && unref(prev)(...args))
          }, [
            createVNode(_component_carbon58arrow_left)
          ], 2),
          createBaseVNode("button", {
            class: normalizeClass(["icon-btn", { disabled: !unref(hasNext) }]),
            title: "Next",
            onClick: _cache[2] || (_cache[2] = (...args) => unref(next) && unref(next)(...args))
          }, [
            createVNode(_component_carbon58arrow_right)
          ], 2),
          !unref(isEmbedded) ? (openBlock(), createElementBlock("button", {
            key: 1,
            class: "icon-btn",
            title: "Slides overview",
            onClick: _cache[3] || (_cache[3] = ($event) => unref(toggleOverview)())
          }, [
            createVNode(_component_carbon58apps)
          ])) : createCommentVNode("v-if", true),
          !unref(isColorSchemaConfigured) ? (openBlock(), createElementBlock("button", {
            key: 2,
            class: "icon-btn",
            title: "Toggle dark mode",
            onClick: _cache[4] || (_cache[4] = ($event) => unref(toggleDark)())
          }, [
            unref(isDark) ? (openBlock(), createBlock(_component_carbon_moon, { key: 0 })) : (openBlock(), createBlock(_component_carbon_sun, { key: 1 }))
          ])) : createCommentVNode("v-if", true),
          createVNode(VerticalDivider),
          createCommentVNode("v-if", true),
          !unref(configs).drawings.presenterOnly && !unref(isEmbedded) ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
            createBaseVNode("button", {
              class: "icon-btn relative",
              title: "Drawing",
              onClick: _cache[6] || (_cache[6] = ($event) => drawingEnabled.value = !unref(drawingEnabled))
            }, [
              createVNode(_component_carbon58pen),
              unref(drawingEnabled) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "absolute left-1 right-1 bottom-0 h-0.7 rounded-full",
                style: normalizeStyle({ background: unref(brush).color })
              }, null, 4)) : createCommentVNode("v-if", true)
            ]),
            createVNode(VerticalDivider)
          ], 64)) : createCommentVNode("v-if", true),
          createCommentVNode("v-if", true),
          (openBlock(), createElementBlock(Fragment, { key: 6 }, [
            unref(configs).download ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "icon-btn",
              onClick: _cache[8] || (_cache[8] = (...args) => unref(downloadPDF) && unref(downloadPDF)(...args))
            }, [
              createVNode(_component_carbon58download)
            ])) : createCommentVNode("v-if", true)
          ], 2112)),
          !unref(isPresenter) && unref(configs).info && !unref(isEmbedded) ? (openBlock(), createElementBlock("button", {
            key: 7,
            class: "icon-btn",
            onClick: _cache[9] || (_cache[9] = ($event) => showInfoDialog.value = !unref(showInfoDialog))
          }, [
            createVNode(_component_carbon58information)
          ])) : createCommentVNode("v-if", true),
          !unref(isPresenter) && !unref(isEmbedded) ? (openBlock(), createBlock(_sfc_main$j, { key: 8 }, {
            button: withCtx(() => [
              createBaseVNode("button", _hoisted_1$k, [
                createVNode(_component_carbon58settings_adjust)
              ])
            ]),
            menu: withCtx(() => [
              createVNode(_sfc_main$k)
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          !unref(isEmbedded) ? (openBlock(), createBlock(VerticalDivider, { key: 9 })) : createCommentVNode("v-if", true),
          createBaseVNode("div", _hoisted_2$f, [
            createBaseVNode("div", _hoisted_3$c, [
              createTextVNode(toDisplayString(unref(currentPage)) + " ", 1),
              createBaseVNode("span", _hoisted_4$3, "/ " + toDisplayString(unref(total)), 1)
            ])
          ])
        ], 34)
      ], 512);
    };
  }
});
var GlobalTop = {
  render() {
    return [];
  }
};
var GlobalBottom = {
  render() {
    return [];
  }
};
const _hoisted_1$j = {
  key: 0,
  class: "absolute top-0 left-0 right-0 bottom-0 pointer-events-none text-xl"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_ph58cursor_fill = __unplugin_components_0$4;
      return unref(serverState).cursor ? (openBlock(), createElementBlock("div", _hoisted_1$j, [
        createVNode(_component_ph58cursor_fill, {
          class: "absolute",
          style: normalizeStyle({ left: `${unref(serverState).cursor.x}%`, top: `${unref(serverState).cursor.y}%` })
        }, null, 8, ["style"])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  setup(__props) {
    watch(currentRoute, () => {
      var _a2, _b2;
      if (((_a2 = currentRoute.value) == null ? void 0 : _a2.meta) && currentRoute.value.meta.preload !== false)
        currentRoute.value.meta.__preloaded = true;
      if (((_b2 = nextRoute.value) == null ? void 0 : _b2.meta) && nextRoute.value.meta.preload !== false)
        nextRoute.value.meta.__preloaded = true;
    }, { immediate: true });
    const DrawingLayer = shallowRef();
    import("./DrawingLayer.04034d48.js").then((v) => DrawingLayer.value = v.default);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createCommentVNode(" Global Bottom "),
        createVNode(unref(GlobalBottom)),
        createCommentVNode(" Slides "),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(rawRoutes), (route2) => {
          var _a2, _b2;
          return openBlock(), createElementBlock(Fragment, {
            key: route2.path
          }, [
            ((_a2 = route2.meta) == null ? void 0 : _a2.__preloaded) || route2 === unref(currentRoute) ? withDirectives((openBlock(), createBlock(unref(SlideWrapper), {
              key: 0,
              is: route2 == null ? void 0 : route2.component,
              clicks: route2 === unref(currentRoute) ? unref(clicks) : 0,
              "clicks-elements": ((_b2 = route2.meta) == null ? void 0 : _b2.__clicksElements) || [],
              "clicks-disabled": false,
              class: normalizeClass(unref(getSlideClass)(route2))
            }, null, 8, ["is", "clicks", "clicks-elements", "class"])), [
              [vShow, route2 === unref(currentRoute)]
            ]) : createCommentVNode("v-if", true)
          ], 64);
        }), 128)),
        createCommentVNode(" Global Top "),
        createVNode(unref(GlobalTop)),
        unref(DrawingLayer) ? (openBlock(), createBlock(unref(DrawingLayer), { key: 0 })) : createCommentVNode("v-if", true),
        !unref(isPresenter) ? (openBlock(), createBlock(_sfc_main$g, { key: 1 })) : createCommentVNode("v-if", true)
      ], 64);
    };
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  setup(__props) {
    registerShortcuts();
    const root = ref();
    function onClick(e) {
      var _a2;
      if (showEditor.value)
        return;
      if (((_a2 = e.target) == null ? void 0 : _a2.id) === "slide-container") {
        if (e.screenX / window.innerWidth > 0.6)
          next();
        else
          prev();
      }
    }
    useSwipeControls(root);
    const presistNav = computed(() => isScreenVertical.value || showEditor.value);
    shallowRef();
    const DrawingControls = shallowRef();
    import("./DrawingControls.0ccec462.js").then((v) => DrawingControls.value = v.default);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          id: "page-root",
          ref: (_value, _refs) => {
            _refs["root"] = _value;
            root.value = _value;
          },
          class: "grid grid-cols-[1fr,max-content]",
          style: normalizeStyle(unref(themeVars))
        }, [
          createVNode(_sfc_main$s, {
            class: "w-full h-full",
            style: normalizeStyle({ background: "var(--slidev-slide-container-background, black)" }),
            width: unref(isPrintMode) ? unref(windowSize).width.value : void 0,
            scale: unref(slideScale),
            onPointerdown: onClick
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$f)
            ]),
            controls: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(["absolute bottom-0 left-0 transition duration-300 opacity-0 hover:opacity-100", [
                  unref(presistNav) ? "opacity-100 right-0" : "oapcity-0 p-2",
                  unref(isDrawing) ? "pointer-events-none" : ""
                ]])
              }, [
                createVNode(_sfc_main$h, {
                  class: "m-auto",
                  persist: unref(presistNav)
                }, null, 8, ["persist"])
              ], 2),
              !unref(configs).drawings.presenterOnly && !unref(isEmbedded) && unref(DrawingControls) ? (openBlock(), createBlock(unref(DrawingControls), {
                key: 0,
                class: "ml-0"
              })) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }, 8, ["style", "width", "scale"]),
          createCommentVNode("v-if", true)
        ], 4),
        createVNode(_sfc_main$m)
      ], 64);
    };
  }
});
var end_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$d = {};
const _hoisted_1$i = { class: "slidev-layout end" };
function _sfc_render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$i, " END ");
}
var __layout__end = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$3], ["__scopeId", "data-v-7b5f9a33"]]);
let wasm;
let cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
const heap = new Array(32).fill(void 0);
heap.push(void 0, null, true, false);
let heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function getObject(idx) {
  return heap[idx];
}
let WASM_VECTOR_LEN = 0;
let cachedTextEncoder = new TextEncoder("utf-8");
const encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code2 = arg.charCodeAt(offset);
    if (code2 > 127)
      break;
    mem[ptr + offset] = code2;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}
function dropObject(idx) {
  if (idx < 36)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
function run$1(inputs, results) {
  var ret = wasm.run(addHeapObject(inputs), addHeapObject(results));
  return takeObject(ret);
}
async function load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
async function init(input) {
  if (typeof input === "undefined") {
    input = new URL("/assets/flashfill_core_bg.7a93a0cd.wasm", self.location);
  }
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
    var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = JSON.stringify(obj === void 0 ? null : obj);
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_log_28ec202ee0469987 = function(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
    input = fetch(input);
  }
  const { instance, module } = await load(await input, imports);
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  return wasm;
}
let initialized = init();
async function run(inputs, results) {
  await initialized;
  try {
    return run$1(inputs, results);
  } catch {
    return void 0;
  }
}
const _hoisted_1$h = { class: "absolute top-4 right-4 flex items-center" };
const _hoisted_2$e = {
  key: 0,
  class: "rounded-1 w-4 h-4 inline-block mr-2"
};
const _hoisted_3$b = {
  key: 1,
  class: "rounded-1 bg-green-400 w-4 h-4 inline-block mr-2"
};
const _hoisted_4$2 = {
  key: 2,
  class: "rounded-1 bg-red-400 w-4 h-4 inline-block mr-2"
};
const _hoisted_5$2 = {
  key: 3,
  class: "text-gray-500"
};
const _hoisted_6$2 = {
  key: 4,
  class: "text-gray-500"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const status = ref(-1);
    run([
      ["123", "456", "789"],
      ["ABC", "DEF", "GHI"],
      ["abc", "def", "ghi"]
    ], ["123", "ABC", null]).then((res) => {
      if (res[2] === "abc") {
        status.value = 0;
      } else {
        status.value = 1;
      }
    }).catch(() => {
      status.value = 1;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$h, [
        status.value === -1 ? (openBlock(), createElementBlock("span", _hoisted_2$e)) : status.value === 0 ? (openBlock(), createElementBlock("span", _hoisted_3$b)) : status.value === 1 ? (openBlock(), createElementBlock("span", _hoisted_4$2)) : createCommentVNode("v-if", true),
        status.value === 0 ? (openBlock(), createElementBlock("span", _hoisted_5$2, "Flashfill Ok")) : status.value === 1 ? (openBlock(), createElementBlock("span", _hoisted_6$2, "Flashfill Fail")) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
const _sfc_main$b = {};
const _hoisted_1$g = { class: "slidev-layout intro" };
const _hoisted_2$d = { class: "my-auto" };
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createBaseVNode("div", _hoisted_2$d, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var InjectedLayout$2 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$2]]);
const _hoisted_1$f = /* @__PURE__ */ createBaseVNode("h1", { class: "!text-4xl" }, "Automating string processing in spreadsheets", -1);
const _hoisted_2$c = /* @__PURE__ */ createBaseVNode("h1", { class: "!text-4xl" }, "using input-output examples", -1);
const _hoisted_3$a = /* @__PURE__ */ createBaseVNode("h2", { class: "pt-20 text-gray-500" }, "Junliang Yan", -1);
const _sfc_main$a = {
  setup(__props) {
    const frontmatter = { "theme": "apple-basic", "titleTemplate": "%s", "highlighter": "shiki", "lineNumbers": true, "drawings": { "persist": false }, "layout": "intro", "class": "text-center" };
    return (_ctx, _cache) => {
      const _component_Status = _sfc_main$c;
      return openBlock(), createBlock(InjectedLayout$2, normalizeProps(guardReactiveProps(frontmatter)), {
        default: withCtx(() => [
          _hoisted_1$f,
          _hoisted_2$c,
          _hoisted_3$a,
          createBaseVNode("p", null, [
            createVNode(_component_Status)
          ])
        ]),
        _: 1
      }, 16);
    };
  }
};
var _imports_0 = "/spreadsheets.png";
const _sfc_main$9 = {};
const _hoisted_1$e = { class: "slidev-layout default" };
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var InjectedLayout$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$1]]);
const _hoisted_1$d = /* @__PURE__ */ createBaseVNode("h1", null, "Spreadsheets", -1);
const _hoisted_2$b = /* @__PURE__ */ createBaseVNode("img", {
  class: "inline-block mt-8",
  src: _imports_0,
  alt: "spreadsheets",
  style: { "zoom": "60%" }
}, null, -1);
const _sfc_main$8 = {
  setup(__props) {
    const frontmatter = { "class": "text-center" };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(InjectedLayout$1, normalizeProps(guardReactiveProps(frontmatter)), {
        default: withCtx(() => [
          _hoisted_1$d,
          _hoisted_2$b
        ]),
        _: 1
      }, 16);
    };
  }
};
const _hoisted_1$c = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24"
};
const _hoisted_2$a = /* @__PURE__ */ createBaseVNode("path", {
  d: "M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$9 = [
  _hoisted_2$a
];
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$c, _hoisted_3$9);
}
var __unplugin_components_2 = { name: "mdi-check", render: render$5 };
const _hoisted_1$b = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24"
};
const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$8 = [
  _hoisted_2$9
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$b, _hoisted_3$8);
}
var __unplugin_components_1$1 = { name: "mdi-close", render: render$4 };
const _hoisted_1$a = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24"
};
const _hoisted_2$8 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M10 16.5v-9l6 4.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$7 = [
  _hoisted_2$8
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, _hoisted_3$7);
}
var __unplugin_components_3$1 = { name: "mdi-play-circle", render: render$3 };
const _hoisted_1$9 = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24"
};
const _hoisted_2$7 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$6 = [
  _hoisted_2$7
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _hoisted_3$6);
}
var __unplugin_components_0$1 = { name: "mdi-loading", render: render$2 };
const _hoisted_1$8 = {
  key: 0,
  class: "font-mono w-full"
};
const _hoisted_2$6 = { style: { "border-top-width": "1px" } };
const _hoisted_3$5 = { key: 0 };
const _hoisted_4$1 = { key: 1 };
const _hoisted_5$1 = { class: "flex justify-between" };
const _hoisted_6$1 = { key: 0 };
const _hoisted_7$1 = { key: 1 };
const _hoisted_8$1 = { key: 2 };
const _hoisted_9$1 = { key: 3 };
const _hoisted_10$1 = { key: 4 };
const _hoisted_11$1 = { key: 0 };
const _hoisted_12$1 = ["onUpdate:modelValue"];
const _hoisted_13$1 = { key: 0 };
const _hoisted_14$1 = ["onUpdate:modelValue", "onChange"];
const _hoisted_15$1 = { key: 2 };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    data: null,
    edit: { type: Boolean },
    append: { type: Boolean },
    outputWidth: null,
    hideRun: { type: Boolean },
    inputLabel: null,
    outputLabel: null
  },
  setup(__props) {
    const props = __props;
    const { data: data2, edit } = toRefs$1(props);
    const inputLength = computed(() => data2.value.length > 0 ? data2.value[0].input.length : 0);
    const rawInput = ref(data2.value.map((data22) => data22.input));
    const rawOutput = ref(data2.value.map((data22) => data22.output));
    const output = ref(data2.value.map((data22) => data22.output));
    const running = ref(false);
    const status = ref(0);
    const dirty = ref(data2.value.map((data22) => !!data22.output));
    const markDirty = (index2) => {
      var _a2;
      status.value = 0;
      const cur = rawOutput.value[index2];
      if (!!data2.value[index2].output) {
        dirty.value[index2] = true;
      } else if (cur !== ((_a2 = data2.value[index2].output) != null ? _a2 : "")) {
        dirty.value[index2] = true;
      } else {
        dirty.value[index2] = false;
      }
    };
    async function start() {
      var _a2, _b2;
      output.value = rawOutput.value.map((out, id) => dirty.value[id] ? out : null);
      if (output.value.every((out) => out !== null)) {
        return;
      }
      running.value = true;
      console.log("Run:");
      for (let i = 0; i < rawInput.value.length; i++) {
        const text = `[${rawInput.value[i].map((t) => `\`${t}\``).join(", ")}] => \`${(_a2 = output.value[i]) != null ? _a2 : ""}\``;
        console.log(text);
      }
      const result = await run(rawInput.value, output.value);
      console.log("Result:");
      for (let i = 0; i < rawInput.value.length; i++) {
        const text = `[${rawInput.value[i].map((t) => `\`${t}\``).join(", ")}] => \`${(_b2 = result[i]) != null ? _b2 : ""}\``;
        console.log(text);
      }
      if (result) {
        let errorFlag = true;
        for (let i = 0; i < result.length; i++) {
          output.value[i] = result[i];
          rawOutput.value[i] = result[i];
          if (!dirty.value[i]) {
            if (result[i].length > 0) {
              errorFlag = false;
            }
          }
        }
        running.value = false;
        if (errorFlag) {
          status.value = -1;
        } else {
          status.value = 1;
        }
      } else {
        status.value = -1;
      }
    }
    return (_ctx, _cache) => {
      var _a2;
      const _component_mdi_loading = __unplugin_components_0$1;
      const _component_mdi_check = __unplugin_components_2;
      const _component_mdi_close = __unplugin_components_1$1;
      const _component_mdi_play_circle = __unplugin_components_3$1;
      return unref(data2).length > 0 ? (openBlock(), createElementBlock("table", _hoisted_1$8, [
        createBaseVNode("thead", null, [
          createBaseVNode("tr", _hoisted_2$6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(inputLength), (i) => {
              return openBlock(), createElementBlock("th", null, [
                __props.inputLabel && !!__props.inputLabel[i - 1] ? (openBlock(), createElementBlock("span", _hoisted_3$5, toDisplayString(__props.inputLabel[i - 1]), 1)) : (openBlock(), createElementBlock("span", _hoisted_4$1, "Input " + toDisplayString(i), 1))
              ]);
            }), 256)),
            createBaseVNode("th", {
              style: normalizeStyle({ borderLeftWidth: "3px", width: (_a2 = __props.outputWidth) != null ? _a2 : "40%" })
            }, [
              createBaseVNode("div", _hoisted_5$1, [
                createBaseVNode("span", null, [
                  !!__props.outputLabel ? (openBlock(), createElementBlock("span", _hoisted_6$1, toDisplayString(__props.outputLabel), 1)) : (openBlock(), createElementBlock("span", _hoisted_7$1, "Output")),
                  running.value ? (openBlock(), createElementBlock("span", _hoisted_8$1, [
                    createVNode(_component_mdi_loading, { class: "animate-spin text-light-900" })
                  ])) : status.value === 1 ? (openBlock(), createElementBlock("span", _hoisted_9$1, [
                    createVNode(_component_mdi_check, { class: "text-green-500" })
                  ])) : status.value === -1 ? (openBlock(), createElementBlock("span", _hoisted_10$1, [
                    createVNode(_component_mdi_close, { class: "text-red-500" })
                  ])) : createCommentVNode("v-if", true)
                ]),
                !__props.hideRun ? (openBlock(), createBlock(_component_mdi_play_circle, {
                  key: 0,
                  class: "ml-1 text-green-500 cursor-pointer",
                  onClick: start
                })) : createCommentVNode("v-if", true)
              ])
            ], 4)
          ])
        ]),
        createBaseVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(data2), (row, i) => {
            return openBlock(), createElementBlock("tr", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(inputLength), (j2) => {
                return openBlock(), createElementBlock("td", null, [
                  !unref(edit) ? (openBlock(), createElementBlock("span", _hoisted_11$1, toDisplayString(row.input[j2 - 1]), 1)) : rawInput.value ? withDirectives((openBlock(), createElementBlock("input", {
                    key: 1,
                    type: "text",
                    "onUpdate:modelValue": ($event) => rawInput.value[i][j2 - 1] = $event
                  }, null, 8, _hoisted_12$1)), [
                    [vModelText, rawInput.value[i][j2 - 1]]
                  ]) : createCommentVNode("v-if", true)
                ]);
              }), 256)),
              createBaseVNode("td", {
                style: { "border-left-width": "3px" },
                class: normalizeClass(!dirty.value[i] && status.value === 1 && "bg-green-100")
              }, [
                !running.value && !unref(edit) ? (openBlock(), createElementBlock("span", _hoisted_13$1, toDisplayString(output.value[i]), 1)) : !running.value && unref(edit) ? withDirectives((openBlock(), createElementBlock("input", {
                  key: 1,
                  type: "text",
                  class: normalizeClass(!dirty.value[i] && status.value === 1 && "bg-green-100"),
                  "onUpdate:modelValue": ($event) => rawOutput.value[i] = $event,
                  onChange: ($event) => markDirty(i)
                }, null, 42, _hoisted_14$1)), [
                  [vModelText, rawOutput.value[i]]
                ]) : (openBlock(), createElementBlock("span", _hoisted_15$1, toDisplayString(output.value[i]), 1))
              ], 2)
            ]);
          }), 256))
        ])
      ])) : createCommentVNode("v-if", true);
    };
  }
});
const _hoisted_1$7 = /* @__PURE__ */ createBaseVNode("h1", null, "Collect cities of residence", -1);
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("span", { class: "underline" }, "Copy-Paste one by one?", -1);
const _hoisted_3$4 = /* @__PURE__ */ createBaseVNode("span", { class: "underline" }, "Flashfill using input-output example!", -1);
const _sfc_main$6 = {
  setup(__props) {
    const frontmatter = { "clicks": 1 };
    return (_ctx, _cache) => {
      const _component_flashfill = _sfc_main$7;
      const _component_mdi_close = __unplugin_components_1$1;
      const _component_mdi_check = __unplugin_components_2;
      const _directive_click = resolveDirective("click");
      return openBlock(), createBlock(InjectedLayout$1, normalizeProps(guardReactiveProps(frontmatter)), {
        default: withCtx(() => [
          _hoisted_1$7,
          createBaseVNode("p", null, [
            createVNode(_component_flashfill, {
              class: "mt-12",
              edit: "",
              data: [
                { input: ["A", "Jiangsu, nanjing, nju"] },
                { input: ["B", "Hubei, wuhan, hust"] },
                { input: ["C", "Shandong, jinan, sdu"] },
                { input: ["D", "Hunan, changsha, csu"] }
              ],
              "input-label": ["Name", "Adress"],
              "output-label": "City"
            })
          ]),
          createBaseVNode("h2", null, [
            withDirectives(createVNode(_component_mdi_close, { class: "text-red-500" }, null, 512), [
              [_directive_click, 1]
            ]),
            _hoisted_2$5
          ]),
          withDirectives(createBaseVNode("h2", null, [
            createVNode(_component_mdi_check, { class: "text-green-500" }),
            _hoisted_3$4
          ], 512), [
            [_directive_click, 1]
          ])
        ]),
        _: 1
      }, 16);
    };
  }
};
const _hoisted_1$6 = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24"
};
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M4 15V9h8V4.16L19.84 12L12 19.84V15H4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$4
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_3$3);
}
var __unplugin_components_3 = { name: "mdi-arrow-right-bold", render: render$1 };
var VClicks = defineComponent({
  props: {
    every: {
      type: Number,
      default: 1
    },
    at: {
      type: [Number, String],
      default: null
    },
    hide: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    }
  },
  render() {
    var _a2, _b2;
    const click = resolveDirective("click");
    const after = resolveDirective("after");
    const applyDirective = (node, directive2, delta) => withDirectives(node, [[
      directive2,
      this.at != null ? +this.at + delta : null,
      "",
      {
        hide: this.hide,
        fade: this.fade
      }
    ]]);
    let defaults = (_b2 = (_a2 = this.$slots).default) == null ? void 0 : _b2.call(_a2);
    if (!defaults)
      return;
    defaults = toArray(defaults);
    const mapChildren = (children) => {
      return children.map((i, idx) => isVNode(i) ? applyDirective(h(i), idx % this.every === 0 ? click : after, Math.floor(idx / this.every)) : i);
    };
    if (defaults.length === 1 && ["ul", "ol"].includes(defaults[0].type) && Array.isArray(defaults[0].children))
      return h(defaults[0], {}, [mapChildren(defaults[0].children)]);
    return mapChildren(defaults);
  }
});
var __unplugin_components_1 = defineComponent({
  props: {
    at: {
      type: [Number, String],
      default: null
    },
    hide: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return createVNode(VClicks, {
      every: 99999,
      at: this.at,
      hide: this.hide,
      fade: this.fade
    }, { default: this.$slots.default });
  }
});
const _hoisted_1$5 = {
  class: "slidev-icon",
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "16",
  cy: "16",
  r: "8",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$3
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$2);
}
var __unplugin_components_0 = { name: "carbon-dot-mark", render };
const _hoisted_1$4 = /* @__PURE__ */ createBaseVNode("h1", null, "Flashfill using input-output examples", -1);
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("h3", { class: "mt-12" }, null, -1);
const _hoisted_3$1 = /* @__PURE__ */ createTextVNode(" String Manipulation Language");
const _hoisted_4 = { class: "mt-8" };
const _hoisted_5 = /* @__PURE__ */ createTextVNode(" Algorithm to ");
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("strong", null, "synthesize", -1);
const _hoisted_7 = /* @__PURE__ */ createTextVNode(" a program with ");
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("strong", null, "input-output examples", -1);
const _hoisted_9 = { class: "flex justify-center items-center font-2xl" };
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("p", { class: "text-center" }, [
  /* @__PURE__ */ createBaseVNode("span", null, "Input-output examples")
], -1);
const _hoisted_11 = { class: "mx-8 text-center" };
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", null, "Synthesize", -1);
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("pre", { class: "slidev-code border" }, [
  /* @__PURE__ */ createBaseVNode("code", null, "SubStr2(\n  Input(2),\n  TokenSeq(AlphaToken),\n  2\n)")
], -1);
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("p", { class: "text-center" }, [
  /* @__PURE__ */ createBaseVNode("span", null, "Program")
], -1);
const _hoisted_15 = [
  _hoisted_13,
  _hoisted_14
];
const _sfc_main$5 = {
  setup(__props) {
    const frontmatter = { "clicks": 2 };
    return (_ctx, _cache) => {
      const _component_carbon_dot_mark = __unplugin_components_0;
      const _component_v_click = __unplugin_components_1;
      const _component_flashfill = _sfc_main$7;
      const _component_mdi_arrow_right_bold = __unplugin_components_3;
      const _directive_click = resolveDirective("click");
      return openBlock(), createBlock(InjectedLayout$1, normalizeProps(guardReactiveProps(frontmatter)), {
        default: withCtx(() => [
          _hoisted_1$4,
          _hoisted_2$2,
          createVNode(_component_v_click, null, {
            default: withCtx(() => [
              createBaseVNode("p", null, [
                createVNode(_component_carbon_dot_mark),
                _hoisted_3$1
              ])
            ]),
            _: 1
          }),
          createVNode(_component_v_click, null, {
            default: withCtx(() => [
              createBaseVNode("p", _hoisted_4, [
                createVNode(_component_carbon_dot_mark),
                _hoisted_5,
                _hoisted_6,
                _hoisted_7,
                _hoisted_8
              ])
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_9, [
            withDirectives(createBaseVNode("div", null, [
              createVNode(_component_flashfill, {
                class: "text-sm",
                "hide-run": "",
                "output-width": "200",
                data: [
                  { input: ["A", "Jiangsu, nanjing, nju"], output: "nanjing" }
                ]
              }),
              _hoisted_10
            ], 512), [
              [_directive_click, 2]
            ]),
            withDirectives(createBaseVNode("div", _hoisted_11, [
              _hoisted_12,
              createBaseVNode("div", null, [
                createVNode(_component_mdi_arrow_right_bold)
              ])
            ], 512), [
              [_directive_click, 2]
            ]),
            withDirectives(createBaseVNode("div", null, _hoisted_15, 512), [
              [_directive_click, 1]
            ])
          ])
        ]),
        _: 1
      }, 16);
    };
  }
};
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("h1", null, "String Manipulation Language", -1);
const _sfc_main$4 = {
  setup(__props) {
    const frontmatter = {};
    return (_ctx, _cache) => {
      return openBlock(), createBlock(InjectedLayout$1, normalizeProps(guardReactiveProps(frontmatter)), {
        default: withCtx(() => [
          _hoisted_1$3
        ]),
        _: 1
      }, 16);
    };
  }
};
const _hoisted_1$2 = /* @__PURE__ */ createBaseVNode("h1", null, "Alogrithm", -1);
const _sfc_main$3 = {
  setup(__props) {
    const frontmatter = {};
    return (_ctx, _cache) => {
      return openBlock(), createBlock(InjectedLayout$1, normalizeProps(guardReactiveProps(frontmatter)), {
        default: withCtx(() => [
          _hoisted_1$2
        ]),
        _: 1
      }, 16);
    };
  }
};
const _sfc_main$2 = {};
const _hoisted_1$1 = { class: "slidev-layout center h-full grid place-content-center" };
const _hoisted_2$1 = { class: "my-auto" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var InjectedLayout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", null, "END", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "h-8" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("h1", null, "Q & A", -1);
const _sfc_main$1 = {
  setup(__props) {
    const frontmatter = { "layout": "center", "class": "text-center" };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(InjectedLayout, normalizeProps(guardReactiveProps(frontmatter)), {
        default: withCtx(() => [
          _hoisted_1,
          _hoisted_2,
          _hoisted_3
        ]),
        _: 1
      }, 16);
    };
  }
};
var _rawRoutes = [
  { path: "1", name: "page-1", component: _sfc_main$a, meta: { "theme": "apple-basic", "title": "FlashFill", "titleTemplate": "%s", "highlighter": "shiki", "lineNumbers": true, "drawings": { "persist": false }, "layout": "intro", "class": "text-center", "slide": { "start": 0, "end": 28, "note": "", "filepath": "slides.md", "id": 0, "no": 1 }, "__clicksElements": [], "__preloaded": false } },
  { path: "2", name: "page-2", component: _sfc_main$8, meta: { "class": "text-center", "slide": { "start": 28, "end": 36, "filepath": "slides.md", "id": 1, "no": 2 }, "__clicksElements": [], "__preloaded": false } },
  { path: "3", name: "page-3", component: _sfc_main$6, meta: { "clicks": 1, "slide": { "start": 36, "end": 59, "filepath": "slides.md", "id": 2, "no": 3 }, "__clicksElements": [], "__preloaded": false } },
  { path: "4", name: "page-4", component: _sfc_main$5, meta: { "clicks": 2, "slide": { "start": 59, "end": 100, "filepath": "slides.md", "id": 3, "no": 4 }, "__clicksElements": [], "__preloaded": false } },
  { path: "5", name: "page-5", component: _sfc_main$4, meta: { "slide": { "start": 101, "end": 104, "filepath": "slides.md", "id": 4, "no": 5 }, "__clicksElements": [], "__preloaded": false } },
  { path: "6", name: "page-6", component: _sfc_main$3, meta: { "slide": { "start": 105, "end": 108, "filepath": "slides.md", "id": 5, "no": 6 }, "__clicksElements": [], "__preloaded": false } },
  { path: "7", name: "page-7", component: _sfc_main$1, meta: { "layout": "center", "class": "text-center", "slide": { "start": 108, "end": 119, "filepath": "slides.md", "id": 6, "no": 7 }, "__clicksElements": [], "__preloaded": false } },
  { path: "8", component: __layout__end, meta: { layout: "end" } }
];
const rawRoutes = _rawRoutes;
const routes = [
  {
    name: "play",
    path: "/",
    component: _sfc_main$e,
    children: [
      ...rawRoutes
    ]
  },
  { path: "", redirect: { path: "/1" } },
  { path: "/:pathMatch(.*)", redirect: { path: "/1" } }
];
const router = createRouter({
  history: createWebHistory("/"),
  routes
});
function useRouteQuery(name, defaultValue, {
  mode = "replace"
} = {}) {
  return computed({
    get() {
      const data2 = router.currentRoute.value.query[name];
      if (data2 == null)
        return defaultValue != null ? defaultValue : null;
      if (Array.isArray(data2))
        return data2.filter(Boolean);
      return data2;
    },
    set(v) {
      nextTick(() => {
        router[unref(mode)]({ query: __spreadProps(__spreadValues({}, router.currentRoute.value.query), { [name]: v }) });
      });
    }
  });
}
const routeForceRefresh = ref(0);
nextTick(() => {
  router.afterEach(async () => {
    await nextTick();
    routeForceRefresh.value += 1;
  });
});
const route = computed(() => router.currentRoute.value);
const isPrintMode = computed(() => route.value.query.print !== void 0);
const isPrintWithClicks = computed(() => route.value.query.print === "clicks");
const isEmbedded = computed(() => route.value.query.embedded !== void 0);
const isPresenter = computed(() => route.value.path.startsWith("/presenter"));
const isClicksDisabled = computed(() => isPrintMode.value && !isPrintWithClicks.value);
const queryClicks = useRouteQuery("clicks", "0");
const total = computed(() => rawRoutes.length - 1);
const path = computed(() => route.value.path);
const currentPage = computed(() => parseInt(path.value.split(/\//g).slice(-1)[0]) || 1);
const currentPath = computed(() => getPath(currentPage.value));
const currentRoute = computed(() => rawRoutes.find((i) => i.path === `${currentPage.value}`));
const currentSlideId = computed(() => {
  var _a2, _b2, _c;
  return (_c = (_b2 = (_a2 = currentRoute.value) == null ? void 0 : _a2.meta) == null ? void 0 : _b2.slide) == null ? void 0 : _c.id;
});
const currentLayout = computed(() => {
  var _a2, _b2;
  return (_b2 = (_a2 = currentRoute.value) == null ? void 0 : _a2.meta) == null ? void 0 : _b2.layout;
});
const nextRoute = computed(() => rawRoutes.find((i) => i.path === `${Math.min(rawRoutes.length, currentPage.value + 1)}`));
const clicksElements = computed(() => {
  var _a2, _b2;
  routeForceRefresh.value;
  return ((_b2 = (_a2 = currentRoute.value) == null ? void 0 : _a2.meta) == null ? void 0 : _b2.__clicksElements) || [];
});
const clicks = computed({
  get() {
    if (isClicksDisabled.value)
      return 99999;
    let clicks2 = +(queryClicks.value || 0);
    if (isNaN(clicks2))
      clicks2 = 0;
    return clicks2;
  },
  set(v) {
    queryClicks.value = v.toString();
  }
});
const clicksTotal = computed(() => {
  var _a2, _b2, _c;
  return +((_c = (_b2 = (_a2 = currentRoute.value) == null ? void 0 : _a2.meta) == null ? void 0 : _b2.clicks) != null ? _c : clicksElements.value.length);
});
const hasNext = computed(() => currentPage.value < rawRoutes.length - 1 || clicks.value < clicksTotal.value);
const hasPrev = computed(() => currentPage.value > 1 || clicks.value > 0);
function next() {
  if (clicksTotal.value <= clicks.value)
    nextSlide();
  else
    clicks.value += 1;
}
async function prev() {
  if (clicks.value <= 0)
    await prevSlide();
  else
    clicks.value -= 1;
}
function getPath(no) {
  return isPresenter.value ? `/presenter/${no}` : `/${no}`;
}
function nextSlide() {
  const next2 = Math.min(rawRoutes.length, currentPage.value + 1);
  return go(next2);
}
async function prevSlide(lastClicks = true) {
  const next2 = Math.max(1, currentPage.value - 1);
  await go(next2);
  if (lastClicks && clicksTotal.value)
    router.replace({ query: __spreadProps(__spreadValues({}, route.value.query), { clicks: clicksTotal.value }) });
}
function go(page, clicks2) {
  return router.push({ path: getPath(page), query: __spreadProps(__spreadValues({}, route.value.query), { clicks: clicks2 }) });
}
function useSwipeControls(root) {
  const swipeBegin = ref(0);
  const { direction, distanceX, distanceY } = usePointerSwipe(root, {
    onSwipeStart(e) {
      if (e.pointerType !== "touch")
        return;
      if (isDrawing.value)
        return;
      swipeBegin.value = timestamp();
    },
    onSwipeEnd(e) {
      if (e.pointerType !== "touch")
        return;
      if (!swipeBegin.value)
        return;
      if (isDrawing.value)
        return;
      const x = Math.abs(distanceX.value);
      const y = Math.abs(distanceY.value);
      if (x / window.innerWidth > 0.3 || x > 100) {
        if (direction.value === SwipeDirection.LEFT)
          next();
        else
          prev();
      } else if (y / window.innerHeight > 0.4 || y > 200) {
        if (direction.value === SwipeDirection.DOWN)
          prevSlide();
        else
          nextSlide();
      }
    }
  });
}
async function downloadPDF() {
  const { saveAs } = await import("./FileSaver.min.22b920da.js").then(function(n) {
    return n.F;
  });
  saveAs(isString$1(configs.download) ? configs.download : `${"/"}slidev-exported.pdf`, `${configs.title}.pdf`);
}
async function openInEditor(url) {
  var _a2, _b2;
  if (url == null) {
    const slide = (_b2 = (_a2 = currentRoute.value) == null ? void 0 : _a2.meta) == null ? void 0 : _b2.slide;
    if (!(slide == null ? void 0 : slide.filepath))
      return false;
    url = `${slide.filepath}:${slide.start}`;
  }
  await fetch(`/__open-in-editor?file=${encodeURIComponent(url)}`);
  return true;
}
var nav = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  rawRoutes,
  router,
  route,
  isPrintMode,
  isPrintWithClicks,
  isEmbedded,
  isPresenter,
  isClicksDisabled,
  queryClicks,
  total,
  path,
  currentPage,
  currentPath,
  currentRoute,
  currentSlideId,
  currentLayout,
  nextRoute,
  clicksElements,
  clicks,
  clicksTotal,
  hasNext,
  hasPrev,
  next,
  prev,
  getPath,
  nextSlide,
  prevSlide,
  go,
  useSwipeControls,
  downloadPDF,
  openInEditor
});
function setupRoot() {
  useHead({
    title: configs.titleTemplate.replace("%s", configs.title || "Slidev")
  });
  function onServerStateChanged() {
    if (isPresenter.value)
      return;
    if (+serverState.page !== +currentPage.value || clicks.value !== serverState.clicks) {
      router.replace({
        path: getPath(serverState.page),
        query: __spreadProps(__spreadValues({}, router.currentRoute.value.query), {
          clicks: serverState.clicks || 0
        })
      });
    }
  }
  function updateServerState() {
    if (isPresenter.value) {
      serverState.page = +currentPage.value;
      serverState.clicks = clicks.value;
    }
  }
  router.afterEach(updateServerState);
  watch(clicks, updateServerState);
  router.isReady().then(() => {
    watch(serverState, onServerStateChanged, { deep: true });
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    setupRoot();
    return (_ctx, _cache) => {
      const _component_RouterView = resolveComponent("RouterView");
      return openBlock(), createBlock(_component_RouterView);
    };
  }
});
const defaultTimestep = 1 / 60 * 1e3;
const getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
const onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index2 = toRunNextFrame.indexOf(callback);
      if (index2 !== -1)
        toRunNextFrame.splice(index2, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = toRun[i];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}
const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const frame = {
  delta: 0,
  timestamp: 0
};
const stepsOrder = [
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
const steps = stepsOrder.reduce((acc, key) => {
  acc[key] = createRenderStep(() => runNextFrame = true);
  return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
  const step = steps[key];
  acc[key] = (process, keepAlive = false, immediate = false) => {
    if (!runNextFrame)
      startLoop();
    return step.schedule(process, keepAlive, immediate);
  };
  return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frame);
  return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frame);
const processFrame = (timestamp2) => {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp2 - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp2;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
const startLoop = () => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
const getFrameData = () => frame;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t[p2[i]] = s[p2[i]];
    }
  return t;
}
var warning = function() {
};
var invariant = function() {
};
const clamp$1 = (min, max, v) => Math.min(Math.max(v, min), max);
const safeMin = 1e-3;
const minDuration = 0.01;
const maxDuration = 10;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3);
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp$1(minDamping, maxDamping, dampingRatio);
  duration = clamp$1(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a2 / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b2;
    };
    derivative = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a2) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a2, options = __rest(_a2, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      };
      resolveVelocity = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t)) - envelope * (Math.cos(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t) => to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const freqForT = Math.min(dampedAngularFreq * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
spring.needsInterpolation = (a2, b2) => typeof a2 === "string" || typeof b2 === "string";
const zero = (_t) => 0;
const progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
const mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;
const clamp = (min, max) => (v) => Math.max(Math.min(v, max), min);
const sanitize = (v) => v % 1 ? Number(v.toFixed(5)) : v;
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v) {
  return typeof v === "string";
}
const number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
const alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
const scale = Object.assign(Object.assign({}, number), { default: 1 });
const createUnitType = (unit) => ({
  test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
const degrees = createUnitType("deg");
const percent = createUnitType("%");
const px = createUnitType("px");
const progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });
const isColorString = (type, testProp) => (v) => {
  return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
};
const splitColor = (aName, bName, cName) => (v) => {
  if (!isString(v))
    return v;
  const [a2, b2, c2, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a2),
    [bName]: parseFloat(b2),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};
const hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
const clampRgbUnit = clamp(0, 255);
const rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
const rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v) {
  let r = "";
  let g = "";
  let b2 = "";
  let a2 = "";
  if (v.length > 5) {
    r = v.substr(1, 2);
    g = v.substr(3, 2);
    b2 = v.substr(5, 2);
    a2 = v.substr(7, 2);
  } else {
    r = v.substr(1, 1);
    g = v.substr(2, 1);
    b2 = v.substr(3, 1);
    a2 = v.substr(4, 1);
    r += r;
    g += g;
    b2 += b2;
    a2 += a2;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b2, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
const hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
const color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};
const colorToken = "${c}";
const numberToken = "${n}";
function test(v) {
  var _a2, _b2, _c, _d;
  return isNaN(v) && isString(v) && ((_b2 = (_a2 = v.match(floatRegex)) === null || _a2 === void 0 ? void 0 : _a2.length) !== null && _b2 !== void 0 ? _b2 : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse$1(v) {
  if (typeof v === "number")
    v = `${v}`;
  const values = [];
  let numColors = 0;
  const colors = v.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v = v.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v.match(floatRegex);
  if (numbers) {
    v = v.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v };
}
function parse(v) {
  return analyse$1(v).values;
}
function createTransformer(v) {
  const { values, numColors, tokenised } = analyse$1(v);
  const numValues = values.length;
  return (v2) => {
    let output = tokenised;
    for (let i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
    }
    return output;
  };
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone$1(v) {
  const parsed = parse(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
const complex = { test, parse, createTransformer, getAnimatableNone: getAnimatableNone$1 };
const maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  let [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /([a-z-]*)\(.*?\)/g;
const filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
  const functions = v.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v;
} });
const mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
const mixColor = (from, to) => {
  const fromColorType = getColorType(from);
  const toColorType = getColorType(to);
  invariant(fromColorType.transform === toColorType.transform);
  if (!fromColorType || !toColorType || fromColorType.transform !== toColorType.transform) {
    return (p2) => `${p2 > 0 ? to : from}`;
  }
  const fromColor = fromColorType.parse(from);
  const toColor = toColorType.parse(to);
  const blended = Object.assign({}, fromColor);
  const mixFunc = fromColorType === hsla ? mix : mixLinearColor;
  return (v) => {
    for (const key in blended) {
      if (key !== "alpha") {
        blended[key] = mixFunc(fromColor[key], toColor[key], v);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
    return fromColorType.transform(blended);
  };
};
const isNum = (v) => typeof v === "number";
const combineFunctions = (a2, b2) => (v) => b2(a2(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v) => mix(origin, target, v);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
const mixArray = (from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
  return (v) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }
    return output;
  };
};
const mixObject = (origin, target) => {
  const output = Object.assign(Object.assign({}, origin), target);
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
};
function analyse(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
const mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyse(origin);
  const targetStats = analyse(target);
  const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
  } else {
    return (p2) => `${p2 > 0 ? target : origin}`;
  }
};
const mixNumber = (from, to) => (p2) => mix(from, to, p2);
function detectMixerFactory(v) {
  if (typeof v === "number") {
    return mixNumber;
  } else if (typeof v === "string") {
    if (color.test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (typeof v === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v) => mixer(progress(from, to, v));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i = 1;
      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length);
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1);
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v) => interpolator(clamp$1(input[0], input[inputLength - 1], v)) : interpolator;
}
const reverseEasing = (easing) => (p2) => 1 - easing(1 - p2);
const mirrorEasing = (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;
const createExpoIn = (power) => (p2) => Math.pow(p2, power);
const createBackIn = (power) => (p2) => p2 * p2 * ((power + 1) * p2 - power);
const createAnticipate = (power) => {
  const backEasing = createBackIn(power);
  return (p2) => (p2 *= 2) < 1 ? 0.5 * backEasing(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));
};
const DEFAULT_OVERSHOOT_STRENGTH = 1.525;
const BOUNCE_FIRST_THRESHOLD = 4 / 11;
const BOUNCE_SECOND_THRESHOLD = 8 / 11;
const BOUNCE_THIRD_THRESHOLD = 9 / 10;
const linear = (p2) => p2;
const easeIn = createExpoIn(2);
const easeOut = reverseEasing(easeIn);
const easeInOut = mirrorEasing(easeIn);
const circIn = (p2) => 1 - Math.sin(Math.acos(p2));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circOut);
const backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
const backOut = reverseEasing(backIn);
const backInOut = mirrorEasing(backIn);
const anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
const ca = 4356 / 361;
const cb = 35442 / 1805;
const cc = 16061 / 1805;
const bounceOut = (p2) => {
  if (p2 === 1 || p2 === 0)
    return p2;
  const p22 = p2 * p2;
  return p2 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p22 : p2 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p22 - 9.9 * p2 + 3.4 : p2 < BOUNCE_THIRD_THRESHOLD ? ca * p22 - cb * p2 + cc : 10.8 * p2 * p2 - 20.52 * p2 + 10.72;
};
const bounceIn = reverseEasing(bounceOut);
const bounceInOut = (p2) => p2 < 0.5 ? 0.5 * (1 - bounceOut(1 - p2 * 2)) : 0.5 * bounceOut(p2 * 2 - 1) + 0.5;
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function keyframes$1({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t) => {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t) => {
      const delta = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: () => {
    }
  };
}
const types = { keyframes: keyframes$1, spring, decay };
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes$1;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes$1;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes$1;
}
function loopElapsed(elapsed, duration, delay = 0) {
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
const framesync = (update) => {
  const passTimestamp = ({ delta }) => update(delta);
  return {
    start: () => sync.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
};
function animate(_a2) {
  var _b2, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a2, options = __rest(_a2, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options);
  if ((_c = (_b2 = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b2, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update(delta) {
    if (!isForwardPlayback)
      delta = -delta;
    elapsed += delta;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v) {
    return min !== void 0 && v < min || max !== void 0 && v > max;
  }
  function boundaryNearest(v) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }
  function startAnimation(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object.assign(Object.assign({}, options), {
      driver,
      onUpdate: (v) => {
        var _a2;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
        (_a2 = options.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(options, v);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options) {
    startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev2;
    let current;
    const checkBoundary = (v) => {
      prev2 = current;
      current = v;
      velocity = velocityPerSecond(v - prev2, getFrameData().delta);
      if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
        startSpring({ from: v, to: boundary, velocity });
      }
    };
    startAnimation({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}
const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
const b = (a1, a2) => 3 * a2 - 6 * a1;
const c = (a1) => 3 * a1;
const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
const newtonIterations = 8;
const newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < newtonIterations; ++i) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
const kSplineTableSize = 11;
const kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
const motionState = {};
class SubscriptionManager {
  constructor() {
    this.subscriptions = new Set();
  }
  add(handler) {
    this.subscriptions.add(handler);
    return () => void this.subscriptions.delete(handler);
  }
  notify(a2, b2, c2) {
    if (!this.subscriptions.size)
      return;
    for (const handler of this.subscriptions) {
      handler(a2, b2, c2);
    }
  }
  clear() {
    this.subscriptions.clear();
  }
}
const isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
class MotionValue {
  constructor(init2) {
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = (v) => {
      this.prev = this.current;
      this.current = v;
      const { delta, timestamp: timestamp2 } = getFrameData();
      if (this.lastUpdated !== timestamp2) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp2;
      }
      sync.postRender(this.scheduleVelocityCheck);
      this.updateSubscribers.notify(this.current);
    };
    this.scheduleVelocityCheck = () => sync.postRender(this.velocityCheck);
    this.velocityCheck = ({ timestamp: timestamp2 }) => {
      if (!this.canTrackVelocity)
        this.canTrackVelocity = isFloat(this.current);
      if (timestamp2 !== this.lastUpdated) {
        this.prev = this.current;
      }
    };
    this.prev = this.current = init2;
    this.canTrackVelocity = isFloat(this.current);
  }
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  set(v) {
    this.updateAndNotify(v);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  }
  start(animation) {
    this.stop();
    return new Promise((resolve2) => {
      const { stop } = animation(resolve2);
      this.stopAnimation = stop;
    }).then(() => this.clearAnimation());
  }
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  isAnimating() {
    return !!this.stopAnimation;
  }
  clearAnimation() {
    this.stopAnimation = null;
  }
  destroy() {
    this.updateSubscribers.clear();
    this.stop();
  }
}
function getMotionValue(init2) {
  return new MotionValue(init2);
}
const { isArray } = Array;
function useMotionValues() {
  const motionValues = ref({});
  const stop = (keys) => {
    const destroyKey = (key) => {
      if (!motionValues.value[key])
        return;
      motionValues.value[key].stop();
      motionValues.value[key].destroy();
      del(motionValues.value, key);
    };
    if (keys) {
      if (isArray(keys)) {
        keys.forEach(destroyKey);
      } else {
        destroyKey(keys);
      }
    } else {
      Object.keys(motionValues.value).forEach(destroyKey);
    }
  };
  const get2 = (key, from, target) => {
    if (motionValues.value[key])
      return motionValues.value[key];
    const motionValue = getMotionValue(from);
    motionValue.onChange((v) => {
      set(target, key, v);
    });
    set(motionValues.value, key, motionValue);
    return motionValue;
  };
  tryOnUnmounted(stop);
  return {
    motionValues,
    get: get2,
    stop
  };
}
const isKeyframesTarget = (v) => {
  return Array.isArray(v);
};
const underDampedSpring = () => ({
  type: "spring",
  stiffness: 500,
  damping: 25,
  restDelta: 0.5,
  restSpeed: 10
});
const criticallyDampedSpring = (to) => ({
  type: "spring",
  stiffness: 550,
  damping: to === 0 ? 2 * Math.sqrt(550) : 30,
  restDelta: 0.01,
  restSpeed: 10
});
const overDampedSpring = (to) => ({
  type: "spring",
  stiffness: 550,
  damping: to === 0 ? 100 : 30,
  restDelta: 0.01,
  restSpeed: 10
});
const linearTween = () => ({
  type: "keyframes",
  ease: "linear",
  duration: 300
});
const keyframes = (values) => ({
  type: "keyframes",
  duration: 800,
  values
});
const defaultTransitions = {
  default: overDampedSpring,
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  backgroundColor: linearTween,
  color: linearTween,
  opacity: linearTween
};
const getDefaultTransition = (valueKey, to) => {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return __spreadValues({ to }, transitionFactory(to));
};
const int = __spreadProps(__spreadValues({}, number), {
  transform: Math.round
});
const valueTypes = {
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  filter,
  WebkitFilter: filter,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
const getValueType = (key) => valueTypes[key];
const getValueAsType = (value, type) => {
  return type && typeof value === "number" && type.transform ? type.transform(value) : value;
};
function getAnimatableNone(key, value) {
  let defaultValueType = getValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
const easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
const easingDefinitionToFunction = (definition) => {
  if (Array.isArray(definition)) {
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
};
const isEasingArray = (ease) => {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};
const isAnimatable = (key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to];
    options.to[0] = options.from;
  }
  return options;
}
function convertTransitionToAnimationOptions(_c) {
  var _d = _c, {
    ease,
    times,
    delay
  } = _d, transition = __objRest(_d, [
    "ease",
    "times",
    "delay"
  ]);
  const options = __spreadValues({}, transition);
  if (times)
    options["offset"] = times;
  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (delay) {
    options["elapsed"] = -delay;
  }
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  if (Array.isArray(options.to)) {
    if (!transition.duration)
      transition.duration = 800;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = __spreadValues(__spreadValues({}, transition), getDefaultTransition(key, options.to));
  }
  return __spreadValues(__spreadValues({}, options), convertTransitionToAnimationOptions(transition));
}
function isTransitionDefined(_e) {
  var _f = _e, {
    delay,
    repeat,
    repeatType,
    repeatDelay,
    from
  } = _f, transition = __objRest(_f, [
    "delay",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from"
  ]);
  return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
function getAnimation(key, value, target, transition, onComplete) {
  const valueTransition = getValueTransition(transition, key);
  let origin = valueTransition.from === null || valueTransition.from === void 0 ? value.get() : valueTransition.from;
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone(key, target);
  }
  const isOriginAnimatable = isAnimatable(key, origin);
  function start(complete) {
    const options = {
      from: origin,
      to: target,
      velocity: transition.velocity ? transition.velocity : value.getVelocity(),
      onUpdate: (v) => value.set(v)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__spreadValues(__spreadValues({}, options), valueTransition)) : animate(__spreadProps(__spreadValues({}, getPopmotionAnimationOptions(valueTransition, options, key)), {
      onUpdate: (v) => {
        options.onUpdate(v);
        if (valueTransition.onUpdate)
          valueTransition.onUpdate(v);
      },
      onComplete: () => {
        if (transition.onComplete)
          transition.onComplete();
        if (onComplete)
          onComplete();
        if (complete)
          complete();
      }
    }));
  }
  function set2(complete) {
    value.set(target);
    if (transition.onComplete)
      transition.onComplete();
    if (onComplete)
      onComplete();
    if (complete)
      complete();
    return { stop: () => {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set2 : start;
}
function useMotionTransitions() {
  const { motionValues, stop, get: get2 } = useMotionValues();
  const push = (key, value, target, transition = {}, onComplete) => {
    const from = target[key];
    const motionValue = get2(key, from, target);
    if (transition && transition.immediate) {
      motionValue.set(value);
      return;
    }
    const animation = getAnimation(key, motionValue, value, transition, onComplete);
    motionValue.start(animation);
  };
  return { motionValues, stop, push };
}
function useMotionControls(motionProperties, variants = {}, { motionValues, push, stop } = useMotionTransitions()) {
  const _variants = unref(variants);
  const isAnimating = ref(false);
  const _stopWatchAnimating = watch(motionValues, (newVal) => {
    isAnimating.value = Object.values(newVal).filter((value) => value.isAnimating()).length > 0;
  }, {
    immediate: true,
    deep: true
  });
  const getVariantFromKey = (variant) => {
    if (!_variants || !_variants[variant]) {
      throw new Error(`The variant ${variant} does not exist.`);
    }
    return _variants[variant];
  };
  const apply = (variant) => {
    if (typeof variant === "string") {
      variant = getVariantFromKey(variant);
    }
    return Promise.all(Object.entries(variant).map(([key, value]) => {
      if (key === "transition")
        return;
      return new Promise((resolve2) => {
        push(key, value, motionProperties, variant.transition || getDefaultTransition(key, variant[key]), resolve2);
      });
    }));
  };
  const set2 = (variant) => {
    let variantData = isObject(variant) ? variant : getVariantFromKey(variant);
    Object.entries(variantData).forEach(([key, value]) => {
      if (key === "transition")
        return;
      push(key, value, motionProperties, {
        immediate: true
      });
    });
  };
  const leave = async (done) => {
    let leaveVariant;
    if (_variants) {
      if (_variants.leave) {
        leaveVariant = _variants.leave;
      }
      if (!_variants.leave && _variants.initial) {
        leaveVariant = _variants.initial;
      }
    }
    if (!leaveVariant) {
      done();
      return;
    }
    await apply(leaveVariant);
    done();
  };
  return {
    isAnimating,
    apply,
    set: set2,
    stopTransitions: () => {
      _stopWatchAnimating();
      stop();
    },
    leave
  };
}
const isBrowser = typeof window !== "undefined";
const supportsPointerEvents = () => isBrowser && window.onpointerdown === null;
const supportsTouchEvents = () => isBrowser && window.ontouchstart === null;
const supportsMouseEvents = () => isBrowser && window.onmousedown === null;
function registerEventListeners({
  target,
  state,
  variants,
  apply
}) {
  const _variants = unref(variants);
  const _eventListeners = [];
  const _useEventListener = (...args) => {
    const _stop = useEventListener.apply(null, args);
    _eventListeners.push(_stop);
    return _stop;
  };
  const hovered = ref(false);
  const tapped = ref(false);
  const focused = ref(false);
  const mutableKeys = computed(() => {
    let result = [];
    if (!_variants)
      return result;
    if (_variants.hovered) {
      result = [...result, ...Object.keys(_variants.hovered)];
    }
    if (_variants.tapped) {
      result = [...result, ...Object.keys(_variants.tapped)];
    }
    if (_variants.focused) {
      result = [...result, ...Object.keys(_variants.focused)];
    }
    return result;
  });
  const computedProperties = computed(() => {
    const result = {};
    Object.assign(result, state.value);
    if (hovered.value && _variants.hovered) {
      Object.assign(result, _variants.hovered);
    }
    if (tapped.value && _variants.tapped) {
      Object.assign(result, _variants.tapped);
    }
    if (focused.value && _variants.focused) {
      Object.assign(result, _variants.focused);
    }
    for (const key in result) {
      if (!mutableKeys.value.includes(key))
        delete result[key];
    }
    return result;
  });
  if (_variants.hovered) {
    _useEventListener(target, "mouseenter", () => {
      hovered.value = true;
    });
    _useEventListener(target, "mouseleave", () => {
      hovered.value = false;
      tapped.value = false;
    });
    _useEventListener(target, "mouseout", () => {
      hovered.value = false;
      tapped.value = false;
    });
  }
  if (_variants.tapped) {
    if (supportsMouseEvents()) {
      _useEventListener(target, "mousedown", () => {
        tapped.value = true;
      });
      _useEventListener(target, "mouseup", () => {
        tapped.value = false;
      });
    }
    if (supportsPointerEvents()) {
      _useEventListener(target, "pointerdown", () => {
        tapped.value = true;
      });
      _useEventListener(target, "pointerup", () => {
        tapped.value = false;
      });
    }
    if (supportsTouchEvents()) {
      _useEventListener(target, "touchstart", () => {
        tapped.value = true;
      });
      _useEventListener(target, "touchend", () => {
        tapped.value = false;
      });
    }
  }
  if (_variants.focused) {
    _useEventListener(target, "focus", () => {
      focused.value = true;
    });
    _useEventListener(target, "blur", () => {
      focused.value = false;
    });
  }
  const _stopSync = watch(computedProperties, apply);
  const stop = () => {
    _eventListeners.forEach((stopFn) => stopFn());
    _stopSync();
  };
  return { stop };
}
function registerLifeCycleHooks({
  set: set2,
  target,
  variants,
  variant
}) {
  const _variants = unref(variants);
  const stop = watch(() => target, () => {
    if (!_variants)
      return;
    if (_variants.initial)
      set2("initial");
    if (_variants.enter)
      variant.value = "enter";
  }, {
    immediate: true,
    flush: "pre"
  });
  return { stop };
}
function registerVariantsSync({
  state,
  apply
}) {
  const stop = watch(state, (newVal) => {
    if (newVal)
      apply(newVal);
  }, {
    immediate: true
  });
  return { stop };
}
function registerVisibilityHooks({
  target,
  variants,
  variant
}) {
  const _variants = unref(variants);
  let stop = noop$1;
  if (_variants && _variants.visible) {
    const { stop: stopObserver } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        variant.value = "visible";
      } else {
        variant.value = "initial";
      }
    });
    stop = stopObserver;
  }
  return {
    stop
  };
}
function useMotionFeatures(instance, options = {
  syncVariants: true,
  lifeCycleHooks: true,
  visibilityHooks: true,
  eventListeners: true
}) {
  const toStop = ref([]);
  if (options.lifeCycleHooks) {
    const { stop: stopLifeCycleHooks } = registerLifeCycleHooks(instance);
    toStop.value.push(stopLifeCycleHooks);
  }
  if (options.syncVariants) {
    const { stop: stopVariantSync } = registerVariantsSync(instance);
    toStop.value.push(stopVariantSync);
  }
  if (options.visibilityHooks) {
    const { stop: stopVisibilityHooks } = registerVisibilityHooks(instance);
    toStop.value.push(stopVisibilityHooks);
  }
  if (options.eventListeners) {
    const { stop: stopEventListeners } = registerEventListeners(instance);
    toStop.value.push(stopEventListeners);
  }
  const stop = () => toStop.value.forEach((_stop) => _stop());
  tryOnUnmounted(stop);
  return { stop };
}
function reactiveStyle(props = {}) {
  const state = reactive(__spreadValues({}, props));
  const style = ref({});
  watch(state, () => {
    const result = {};
    for (const [key, value] of Object.entries(state)) {
      const valueType = getValueType(key);
      const valueAsType = getValueAsType(value, valueType);
      result[key] = valueAsType;
    }
    style.value = result;
  }, {
    immediate: true,
    deep: true
  });
  return {
    state,
    style
  };
}
const transformAxes = ["", "X", "Y", "Z"];
const order = ["perspective", "translate", "scale", "rotate", "skew"];
const transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach((operationKey) => {
  transformAxes.forEach((axesKey) => {
    const key = operationKey + axesKey;
    transformProps.push(key);
  });
});
const transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
const transformOriginProps = new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}
function useElementStyle(target, onInit) {
  let _cache;
  let _target = void 0;
  const { state, style } = reactiveStyle();
  const stopInitWatch = watch(() => unrefElement(target), (el) => {
    if (!el)
      return;
    _target = el;
    for (const key of Object.keys(valueTypes)) {
      if (el.style[key] === null || el.style[key] === "" || isTransformProp(key) || isTransformOriginProp(key))
        continue;
      set(state, key, el.style[key]);
    }
    if (_cache) {
      Object.entries(_cache).forEach(([key, value]) => set(el.style, key, value));
    }
    if (onInit)
      onInit(state);
  }, {
    immediate: true
  });
  const stopSyncWatch = watch(style, (newVal) => {
    if (!_target) {
      _cache = newVal;
      return;
    }
    for (const key in newVal)
      set(_target.style, key, newVal[key]);
  }, {
    immediate: true
  });
  const stop = () => {
    _target = void 0;
    _cache = void 0;
    stopInitWatch();
    stopSyncWatch();
  };
  return {
    style: state,
    stop
  };
}
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
function reactiveTransform(props = {}, enableHardwareAcceleration = true) {
  const state = reactive(__spreadValues({}, props));
  const transform = ref("");
  watch(state, (newVal) => {
    let result = "";
    let hasHardwareAcceleration = false;
    if (enableHardwareAcceleration && (newVal.x || newVal.y || newVal.z)) {
      const str = [newVal.x || 0, newVal.y || 0, newVal.z || 0].map(px.transform).join(",");
      result += `translate3d(${str}) `;
      hasHardwareAcceleration = true;
    }
    for (const [key, value] of Object.entries(newVal)) {
      if (enableHardwareAcceleration && (key === "x" || key === "y" || key === "z"))
        continue;
      const valueType = getValueType(key);
      const valueAsType = getValueAsType(value, valueType);
      result += `${translateAlias[key] || key}(${valueAsType}) `;
    }
    if (enableHardwareAcceleration && !hasHardwareAcceleration) {
      result += `translateZ(0px) `;
    }
    transform.value = result.trim();
  }, {
    immediate: true,
    deep: true
  });
  return {
    state,
    transform
  };
}
function parseTransform(transform) {
  const transforms = transform.trim().split(/\) |\)/);
  if (transforms.length === 1) {
    return {};
  }
  const parseValues = (value) => {
    if (value.endsWith("px") || value.endsWith("deg"))
      return parseFloat(value);
    if (isNaN(Number(value)))
      return Number(value);
    return value;
  };
  return transforms.reduce((acc, transform2) => {
    if (!transform2)
      return acc;
    const [name, transformValue] = transform2.split("(");
    const valueArray = transformValue.split(",");
    const values = valueArray.map((val) => {
      return parseValues(val.endsWith(")") ? val.replace(")", "") : val.trim());
    });
    const value = values.length === 1 ? values[0] : values;
    return __spreadProps(__spreadValues({}, acc), {
      [name]: value
    });
  }, {});
}
function stateFromTransform(state, transform) {
  Object.entries(parseTransform(transform)).forEach(([key, value]) => {
    value = parseFloat(value);
    const axes = ["x", "y", "z"];
    if (key === "translate3d") {
      value.forEach((axisValue, index2) => {
        set(state, axes[index2], axisValue);
      });
      return;
    }
    if (key === "translateX") {
      set(state, "x", value);
      return;
    }
    if (key === "translateY") {
      set(state, "y", value);
      return;
    }
    if (key === "translateZ") {
      set(state, "z", value);
      return;
    }
    set(state, key, value);
  });
}
function useElementTransform(target, onInit) {
  let _cache;
  let _target = void 0;
  const { state, transform } = reactiveTransform();
  const stopInitWatch = watch(() => unrefElement(target), (el) => {
    if (!el)
      return;
    _target = el;
    if (el.style.transform)
      stateFromTransform(state, el.style.transform);
    if (_cache) {
      el.style.transform = _cache;
    }
    if (onInit)
      onInit(state);
  }, {
    immediate: true
  });
  const stopSyncWatch = watch(transform, (newValue) => {
    if (!_target) {
      _cache = newValue;
      return;
    }
    _target.style.transform = newValue;
  }, {
    immediate: true
  });
  const stop = () => {
    _cache = void 0;
    _target = void 0;
    stopInitWatch();
    stopSyncWatch();
  };
  return {
    transform: state,
    stop
  };
}
function useMotionProperties(target, defaultValues) {
  const motionProperties = reactive({});
  const apply = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      set(motionProperties, key, value);
    });
  };
  const { style, stop: stopStyleWatchers } = useElementStyle(target, apply);
  const { transform, stop: stopTransformWatchers } = useElementTransform(target, apply);
  const stopPropertiesWatch = watch(motionProperties, (newVal) => {
    Object.entries(newVal).forEach(([key, value]) => {
      const target2 = isTransformProp(key) ? transform : style;
      if (target2[key] && target2[key] === value)
        return;
      set(target2, key, value);
    });
  }, {
    immediate: true,
    deep: true
  });
  const stopInitWatch = watch(() => unrefElement(target), (el) => {
    if (!el)
      return;
    if (defaultValues)
      apply(defaultValues);
  }, {
    immediate: true
  });
  const stop = () => {
    stopStyleWatchers();
    stopTransformWatchers();
    stopPropertiesWatch();
    stopInitWatch();
  };
  return {
    motionProperties,
    style,
    transform,
    stop
  };
}
function useMotionVariants(variants = {}) {
  const _variants = unref(variants);
  const variant = ref();
  const state = computed(() => {
    if (!variant.value)
      return;
    return _variants[variant.value];
  });
  return {
    state,
    variant
  };
}
function useMotion(target, variants = {}, options) {
  const { motionProperties, stop: stopMotionProperties } = useMotionProperties(target);
  const { variant, state } = useMotionVariants(variants);
  const controls = useMotionControls(motionProperties, variants);
  const instance = __spreadProps(__spreadValues({
    target,
    variant,
    variants,
    state,
    motionProperties
  }, controls), {
    stop: (force = false) => {
    }
  });
  const { stop: stopMotionFeatures } = useMotionFeatures(instance, options);
  instance.stop = (force = false) => {
    const _stop = () => {
      instance.stopTransitions();
      stopMotionProperties();
      stopMotionFeatures();
    };
    if (!force && variants.value && variants.value["leave"]) {
      const _stopWatch = watch(instance.isAnimating, (newVal) => {
        if (!newVal) {
          _stopWatch();
          _stop();
        }
      });
    } else {
      _stop();
    }
  };
  tryOnUnmounted(() => instance.stop());
  return instance;
}
const directivePropsKeys = [
  "initial",
  "enter",
  "leave",
  "visible",
  "hovered",
  "tapped",
  "focused",
  "delay"
];
const resolveVariants = (node, variantsRef) => {
  const target = node.props ? node.props : node.data && node.data.attrs ? node.data.attrs : {};
  if (target) {
    if (target["variants"] && isObject(target["variants"])) {
      variantsRef.value = __spreadValues(__spreadValues({}, variantsRef.value), target["variants"]);
    }
    directivePropsKeys.forEach((key) => {
      if (key === "delay") {
        if (target && target[key] && isNumber(target[key])) {
          const delay = target[key];
          if (variantsRef && variantsRef.value) {
            if (variantsRef.value.enter) {
              if (!variantsRef.value.enter.transition) {
                variantsRef.value.enter.transition = {};
              }
              variantsRef.value.enter.transition = __spreadProps(__spreadValues({}, variantsRef.value.enter.transition), {
                delay
              });
            }
            if (variantsRef.value.visible) {
              if (!variantsRef.value.visible.transition) {
                variantsRef.value.visible.transition = {};
              }
              variantsRef.value.visible.transition = __spreadProps(__spreadValues({}, variantsRef.value.visible.transition), {
                delay
              });
            }
          }
        }
        return;
      }
      if (target && target[key] && isObject(target[key])) {
        variantsRef.value[key] = target[key];
      }
    });
  }
};
const directive = (variants) => {
  const register = (el, binding, node) => {
    const key = binding.value || node.key;
    if (key && motionState[key])
      motionState[key].stop();
    const variantsRef = ref(variants || {});
    resolveVariants(node, variantsRef);
    const motionInstance = useMotion(el, variantsRef);
    el.motionInstance = motionInstance;
    if (key)
      set(motionState, key, motionInstance);
  };
  const unregister = (el, _2, __) => {
    if (el.motionInstance)
      el.motionInstance.stop();
  };
  return {
    created: register,
    unmounted: unregister,
    bind: register,
    unbind: unregister
  };
};
const fade = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1
  }
};
const fadeVisible = {
  initial: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};
const pop = {
  initial: {
    scale: 0,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1
  }
};
const popVisible = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1
  }
};
const rollLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const slideLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const presets = {
  __proto__: null,
  fade,
  fadeVisible,
  pop,
  popVisible,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop
};
function slugify(string) {
  const a2 = "\xE0\xE1\xE2\xE4\xE6\xE3\xE5\u0101\u0103\u0105\xE7\u0107\u010D\u0111\u010F\xE8\xE9\xEA\xEB\u0113\u0117\u0119\u011B\u011F\u01F5\u1E27\xEE\xEF\xED\u012B\u012F\xEC\u0142\u1E3F\xF1\u0144\u01F9\u0148\xF4\xF6\xF2\xF3\u0153\xF8\u014D\xF5\u0151\u1E55\u0155\u0159\xDF\u015B\u0161\u015F\u0219\u0165\u021B\xFB\xFC\xF9\xFA\u016B\u01D8\u016F\u0171\u0173\u1E83\u1E8D\xFF\xFD\u017E\u017A\u017C\xB7/_,:;";
  const b2 = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p2 = new RegExp(a2.split("").join("|"), "g");
  return string.toString().replace(/[A-Z]/g, (s) => "-" + s).toLowerCase().replace(/\s+/g, "-").replace(p2, (c2) => b2.charAt(a2.indexOf(c2))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
const MotionPlugin = {
  install(app2, options) {
    app2.directive("motion", directive());
    if (!options || options && !options.excludePresets) {
      for (const key in presets) {
        const preset = presets[key];
        app2.directive(`motion-${slugify(key)}`, directive(preset));
      }
    }
    if (options && options.directives) {
      for (const key in options.directives) {
        const variants = options.directives[key];
        if (!variants.initial && false) {
          console.warn(`Your directive v-motion-${key} is missing initial variant!`);
        }
        app2.directive(`motion-${key}`, directive(variants));
      }
    }
  }
};
function setupMain(context) {
  function setMaxHeight() {
    document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
  }
  setMaxHeight();
  window.addEventListener("resize", setMaxHeight);
  context.app.use(MotionPlugin);
}
function dirInject(dir, key, defaultValue) {
  var _a2, _b2;
  return (_b2 = ((_a2 = dir.instance) == null ? void 0 : _a2.$).provides[key]) != null ? _b2 : defaultValue;
}
function createDirectives() {
  return {
    install(app2) {
      app2.directive("click", {
        name: "v-click",
        mounted(el, dir) {
          var _a2, _b2, _c, _d;
          if (isClicksDisabled.value || ((_a2 = dirInject(dir, injectionClicksDisabled)) == null ? void 0 : _a2.value))
            return;
          const elements = dirInject(dir, injectionClicksElements);
          const clicks2 = dirInject(dir, injectionClicks);
          const orderMap = dirInject(dir, injectionOrderMap);
          const hide = dir.modifiers.hide !== false && dir.modifiers.hide != null;
          const fade2 = dir.modifiers.fade !== false && dir.modifiers.fade != null;
          const prev2 = ((_b2 = elements == null ? void 0 : elements.value) == null ? void 0 : _b2.length) || 0;
          const CLASS_HIDE = fade2 ? CLASS_VCLICK_FADE : CLASS_VCLICK_HIDDEN;
          if (elements && !((_c = elements == null ? void 0 : elements.value) == null ? void 0 : _c.includes(el)))
            elements.value.push(el);
          if (dir.value === null)
            dir.value = elements == null ? void 0 : elements.value.length;
          if (!(orderMap == null ? void 0 : orderMap.value.has(dir.value))) {
            orderMap == null ? void 0 : orderMap.value.set(dir.value, [el]);
          } else {
            if (!((_d = orderMap == null ? void 0 : orderMap.value.get(dir.value)) == null ? void 0 : _d.includes(el))) {
              const afterClicks = (orderMap == null ? void 0 : orderMap.value.get(dir.value)) || [];
              orderMap == null ? void 0 : orderMap.value.set(dir.value, [el].concat(afterClicks));
            }
          }
          el == null ? void 0 : el.classList.toggle(CLASS_VCLICK_TARGET, true);
          if (clicks2) {
            watch(clicks2, () => {
              var _a3;
              const c2 = (_a3 = clicks2 == null ? void 0 : clicks2.value) != null ? _a3 : 0;
              const show = dir.value != null ? c2 >= dir.value : c2 > prev2;
              if (!el.classList.contains(CLASS_VCLICK_HIDDEN_EXP))
                el.classList.toggle(CLASS_HIDE, !show);
              if (hide !== false && hide !== void 0)
                el.classList.toggle(CLASS_HIDE, show);
              el.classList.toggle(CLASS_VCLICK_CURRENT, false);
              const currentElArray = orderMap == null ? void 0 : orderMap.value.get(c2);
              currentElArray == null ? void 0 : currentElArray.forEach((cEl, idx) => {
                cEl.classList.toggle(CLASS_VCLICK_PRIOR, false);
                if (idx === currentElArray.length - 1)
                  cEl.classList.toggle(CLASS_VCLICK_CURRENT, true);
                else
                  cEl.classList.toggle(CLASS_VCLICK_PRIOR, true);
              });
              if (!el.classList.contains(CLASS_VCLICK_CURRENT))
                el.classList.toggle(CLASS_VCLICK_PRIOR, show);
            }, { immediate: true });
          }
        },
        unmounted(el, dir) {
          el == null ? void 0 : el.classList.toggle(CLASS_VCLICK_TARGET, false);
          const elements = dirInject(dir, injectionClicksElements);
          if (elements == null ? void 0 : elements.value)
            remove(elements.value, el);
        }
      });
      app2.directive("after", {
        name: "v-after",
        mounted(el, dir) {
          var _a2, _b2;
          if (isClicksDisabled.value || ((_a2 = dirInject(dir, injectionClicksDisabled)) == null ? void 0 : _a2.value))
            return;
          const elements = dirInject(dir, injectionClicksElements);
          const clicks2 = dirInject(dir, injectionClicks);
          const orderMap = dirInject(dir, injectionOrderMap);
          const prev2 = elements == null ? void 0 : elements.value.length;
          if (dir.value === void 0)
            dir.value = elements == null ? void 0 : elements.value.length;
          if (orderMap == null ? void 0 : orderMap.value.has(dir.value))
            (_b2 = orderMap == null ? void 0 : orderMap.value.get(dir.value)) == null ? void 0 : _b2.push(el);
          else
            orderMap == null ? void 0 : orderMap.value.set(dir.value, [el]);
          el == null ? void 0 : el.classList.toggle(CLASS_VCLICK_TARGET, true);
          if (clicks2) {
            watch(clicks2, () => {
              var _a3, _b3, _c;
              const show = ((_a3 = clicks2.value) != null ? _a3 : 0) >= ((_c = (_b3 = dir.value) != null ? _b3 : prev2) != null ? _c : 0);
              if (!el.classList.contains(CLASS_VCLICK_HIDDEN_EXP))
                el.classList.toggle(CLASS_VCLICK_HIDDEN, !show);
              el.classList.toggle(CLASS_VCLICK_CURRENT, false);
              if (!el.classList.contains(CLASS_VCLICK_CURRENT))
                el.classList.toggle(CLASS_VCLICK_PRIOR, show);
            }, { immediate: true });
          }
        },
        unmounted(el) {
          el == null ? void 0 : el.classList.toggle(CLASS_VCLICK_TARGET, true);
        }
      });
      app2.directive("click-hide", {
        name: "v-click-hide",
        mounted(el, dir) {
          var _a2, _b2, _c;
          if (isClicksDisabled.value || ((_a2 = dirInject(dir, injectionClicksDisabled)) == null ? void 0 : _a2.value))
            return;
          const elements = dirInject(dir, injectionClicksElements);
          const clicks2 = dirInject(dir, injectionClicks);
          const prev2 = ((_b2 = elements == null ? void 0 : elements.value) == null ? void 0 : _b2.length) || 0;
          if (elements && !((_c = elements == null ? void 0 : elements.value) == null ? void 0 : _c.includes(el)))
            elements.value.push(el);
          el == null ? void 0 : el.classList.toggle(CLASS_VCLICK_TARGET, true);
          if (clicks2) {
            watch(clicks2, () => {
              var _a3;
              const c2 = (_a3 = clicks2 == null ? void 0 : clicks2.value) != null ? _a3 : 0;
              const hide = dir.value != null ? c2 >= dir.value : c2 > prev2;
              el.classList.toggle(CLASS_VCLICK_HIDDEN, hide);
              el.classList.toggle(CLASS_VCLICK_HIDDEN_EXP, hide);
            }, { immediate: true });
          }
        },
        unmounted(el, dir) {
          el == null ? void 0 : el.classList.toggle(CLASS_VCLICK_TARGET, false);
          const elements = dirInject(dir, injectionClicksElements);
          if (elements == null ? void 0 : elements.value)
            remove(elements.value, el);
        }
      });
    }
  };
}
function createSlidevContext() {
  return {
    install(app2) {
      const navObj = {};
      for (const key of objectKeys(nav)) {
        if (typeof key === "string")
          navObj[key] = nav[key];
      }
      const context = reactive({
        nav: navObj,
        configs,
        themeConfigs: computed(() => configs.themeConfig)
      });
      app2.config.globalProperties.$slidev = readonly(context);
    }
  };
}
var windiBase = "";
var windiComponents = "";
var vars = "";
var index = "";
var code$1 = "";
var layout = "";
var code = "";
var windiUtilities = "";
const app = createApp(_sfc_main);
app.use(router);
app.use(createHead());
app.use(createDirectives());
app.use(createSlidevContext());
setupMain({ app, router });
app.mount("#app");
export { drauu as A, brush as B, inject as C, injectionSlideScale as D, onMounted as E, Fragment as F, watch as G, loadCanvas as H, onBeforeUnmount as I, VerticalDivider as V, __unplugin_components_0$5 as _, createBaseVNode as a, useDraggable as b, createElementBlock as c, defineComponent as d, renderSlot as e, unref as f, createBlock as g, normalizeClass as h, drawingEnabled as i, drawingPinned as j, createVNode as k, drawingMode as l, renderList as m, normalizeStyle as n, openBlock as o, brushColors as p, canUndo as q, ref as r, canRedo as s, canClear as t, useStorage as u, clearDrauu as v, withCtx as w, withDirectives as x, vShow as y, createCommentVNode as z };
