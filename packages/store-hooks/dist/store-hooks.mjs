class Dt {
  constructor(s = []) {
    this.notify = async (C) => {
      const $ = this.watchers;
      await Promise.resolve();
      for (const T of $)
        T(C);
    }, this.watch = (C) => (this.watchers = [...this.watchers, C], () => {
      this.watchers = this.watchers.filter(
        ($) => $ !== C
      );
    }), this.watchers = s;
  }
}
class Ft extends Dt {
  constructor(s, C, $) {
    super($), this.store = s, this.key = C, this.track = () => {
      let T = this.store.read()[this.key];
      this.store.watch((A) => {
        const I = A[this.key];
        Object.is(I, T) || (T = I, this.notify(I));
      });
    }, this.read = () => this.store.read()[this.key], this.write = (T) => {
      const A = this.store.read();
      return this.store.write({
        ...A,
        [this.key]: T
      }), T;
    }, this.select = (T) => T(this.read()), this.notify(this.read()), this.track();
  }
}
function xt(O, s, C) {
  return new Ft(O, s, C);
}
var Ue = { exports: {} }, p = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sr;
function Lt() {
  if (Sr)
    return p;
  Sr = 1;
  var O = Symbol.for("react.element"), s = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), A = Symbol.for("react.provider"), I = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), G = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), B = Symbol.iterator;
  function ae(t) {
    return t === null || typeof t != "object" ? null : (t = B && t[B] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var M = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, H = Object.assign, le = {};
  function N(t, u, d) {
    this.props = t, this.context = u, this.refs = le, this.updater = d || M;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(t, u) {
    if (typeof t != "object" && typeof t != "function" && t != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, t, u, "setState");
  }, N.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function de() {
  }
  de.prototype = N.prototype;
  function Q(t, u, d) {
    this.props = t, this.context = u, this.refs = le, this.updater = d || M;
  }
  var J = Q.prototype = new de();
  J.constructor = Q, H(J, N.prototype), J.isPureReactComponent = !0;
  var V = Array.isArray, P = Object.prototype.hasOwnProperty, x = { current: null }, U = { key: !0, ref: !0, __self: !0, __source: !0 };
  function q(t, u, d) {
    var h, v = {}, _ = null, S = null;
    if (u != null)
      for (h in u.ref !== void 0 && (S = u.ref), u.key !== void 0 && (_ = "" + u.key), u)
        P.call(u, h) && !U.hasOwnProperty(h) && (v[h] = u[h]);
    var g = arguments.length - 2;
    if (g === 1)
      v.children = d;
    else if (1 < g) {
      for (var b = Array(g), D = 0; D < g; D++)
        b[D] = arguments[D + 2];
      v.children = b;
    }
    if (t && t.defaultProps)
      for (h in g = t.defaultProps, g)
        v[h] === void 0 && (v[h] = g[h]);
    return { $$typeof: O, type: t, key: _, ref: S, props: v, _owner: x.current };
  }
  function pe(t, u) {
    return { $$typeof: O, type: t.type, key: u, ref: t.ref, props: t.props, _owner: t._owner };
  }
  function oe(t) {
    return typeof t == "object" && t !== null && t.$$typeof === O;
  }
  function ke(t) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(d) {
      return u[d];
    });
  }
  var ve = /\/+/g;
  function ue(t, u) {
    return typeof t == "object" && t !== null && t.key != null ? ke("" + t.key) : u.toString(36);
  }
  function X(t, u, d, h, v) {
    var _ = typeof t;
    (_ === "undefined" || _ === "boolean") && (t = null);
    var S = !1;
    if (t === null)
      S = !0;
    else
      switch (_) {
        case "string":
        case "number":
          S = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case O:
            case s:
              S = !0;
          }
      }
    if (S)
      return S = t, v = v(S), t = h === "" ? "." + ue(S, 0) : h, V(v) ? (d = "", t != null && (d = t.replace(ve, "$&/") + "/"), X(v, u, d, "", function(D) {
        return D;
      })) : v != null && (oe(v) && (v = pe(v, d + (!v.key || S && S.key === v.key ? "" : ("" + v.key).replace(ve, "$&/") + "/") + t)), u.push(v)), 1;
    if (S = 0, h = h === "" ? "." : h + ":", V(t))
      for (var g = 0; g < t.length; g++) {
        _ = t[g];
        var b = h + ue(_, g);
        S += X(_, u, d, b, v);
      }
    else if (b = ae(t), typeof b == "function")
      for (t = b.call(t), g = 0; !(_ = t.next()).done; )
        _ = _.value, b = h + ue(_, g++), S += X(_, u, d, b, v);
    else if (_ === "object")
      throw u = String(t), Error("Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead.");
    return S;
  }
  function L(t, u, d) {
    if (t == null)
      return t;
    var h = [], v = 0;
    return X(t, h, "", "", function(_) {
      return u.call(d, _, v++);
    }), h;
  }
  function W(t) {
    if (t._status === -1) {
      var u = t._result;
      u = u(), u.then(function(d) {
        (t._status === 0 || t._status === -1) && (t._status = 1, t._result = d);
      }, function(d) {
        (t._status === 0 || t._status === -1) && (t._status = 2, t._result = d);
      }), t._status === -1 && (t._status = 0, t._result = u);
    }
    if (t._status === 1)
      return t._result.default;
    throw t._result;
  }
  var f = { current: null }, K = { transition: null }, ye = { ReactCurrentDispatcher: f, ReactCurrentBatchConfig: K, ReactCurrentOwner: x };
  return p.Children = { map: L, forEach: function(t, u, d) {
    L(t, function() {
      u.apply(this, arguments);
    }, d);
  }, count: function(t) {
    var u = 0;
    return L(t, function() {
      u++;
    }), u;
  }, toArray: function(t) {
    return L(t, function(u) {
      return u;
    }) || [];
  }, only: function(t) {
    if (!oe(t))
      throw Error("React.Children.only expected to receive a single React element child.");
    return t;
  } }, p.Component = N, p.Fragment = C, p.Profiler = T, p.PureComponent = Q, p.StrictMode = $, p.Suspense = ne, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ye, p.cloneElement = function(t, u, d) {
    if (t == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
    var h = H({}, t.props), v = t.key, _ = t.ref, S = t._owner;
    if (u != null) {
      if (u.ref !== void 0 && (_ = u.ref, S = x.current), u.key !== void 0 && (v = "" + u.key), t.type && t.type.defaultProps)
        var g = t.type.defaultProps;
      for (b in u)
        P.call(u, b) && !U.hasOwnProperty(b) && (h[b] = u[b] === void 0 && g !== void 0 ? g[b] : u[b]);
    }
    var b = arguments.length - 2;
    if (b === 1)
      h.children = d;
    else if (1 < b) {
      g = Array(b);
      for (var D = 0; D < b; D++)
        g[D] = arguments[D + 2];
      h.children = g;
    }
    return { $$typeof: O, type: t.type, key: v, ref: _, props: h, _owner: S };
  }, p.createContext = function(t) {
    return t = { $$typeof: I, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: A, _context: t }, t.Consumer = t;
  }, p.createElement = q, p.createFactory = function(t) {
    var u = q.bind(null, t);
    return u.type = t, u;
  }, p.createRef = function() {
    return { current: null };
  }, p.forwardRef = function(t) {
    return { $$typeof: te, render: t };
  }, p.isValidElement = oe, p.lazy = function(t) {
    return { $$typeof: z, _payload: { _status: -1, _result: t }, _init: W };
  }, p.memo = function(t, u) {
    return { $$typeof: G, type: t, compare: u === void 0 ? null : u };
  }, p.startTransition = function(t) {
    var u = K.transition;
    K.transition = {};
    try {
      t();
    } finally {
      K.transition = u;
    }
  }, p.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, p.useCallback = function(t, u) {
    return f.current.useCallback(t, u);
  }, p.useContext = function(t) {
    return f.current.useContext(t);
  }, p.useDebugValue = function() {
  }, p.useDeferredValue = function(t) {
    return f.current.useDeferredValue(t);
  }, p.useEffect = function(t, u) {
    return f.current.useEffect(t, u);
  }, p.useId = function() {
    return f.current.useId();
  }, p.useImperativeHandle = function(t, u, d) {
    return f.current.useImperativeHandle(t, u, d);
  }, p.useInsertionEffect = function(t, u) {
    return f.current.useInsertionEffect(t, u);
  }, p.useLayoutEffect = function(t, u) {
    return f.current.useLayoutEffect(t, u);
  }, p.useMemo = function(t, u) {
    return f.current.useMemo(t, u);
  }, p.useReducer = function(t, u, d) {
    return f.current.useReducer(t, u, d);
  }, p.useRef = function(t) {
    return f.current.useRef(t);
  }, p.useState = function(t) {
    return f.current.useState(t);
  }, p.useSyncExternalStore = function(t, u, d) {
    return f.current.useSyncExternalStore(t, u, d);
  }, p.useTransition = function() {
    return f.current.useTransition();
  }, p.version = "18.2.0", p;
}
var fe = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
fe.exports;
var Or;
function Mt() {
  return Or || (Or = 1, function(O, s) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var C = "18.2.0", $ = Symbol.for("react.element"), T = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), te = Symbol.for("react.profiler"), ne = Symbol.for("react.provider"), G = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), M = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), le = Symbol.for("react.offscreen"), N = Symbol.iterator, de = "@@iterator";
      function Q(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = N && e[N] || e[de];
        return typeof r == "function" ? r : null;
      }
      var J = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, V = {
        transition: null
      }, P = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, x = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, U = {}, q = null;
      function pe(e) {
        q = e;
      }
      U.setExtraStackFrame = function(e) {
        q = e;
      }, U.getCurrentStack = null, U.getStackAddendum = function() {
        var e = "";
        q && (e += q);
        var r = U.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var oe = !1, ke = !1, ve = !1, ue = !1, X = !1, L = {
        ReactCurrentDispatcher: J,
        ReactCurrentBatchConfig: V,
        ReactCurrentOwner: x
      };
      L.ReactDebugCurrentFrame = U, L.ReactCurrentActQueue = P;
      function W(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          K("warn", e, n);
        }
      }
      function f(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          K("error", e, n);
        }
      }
      function K(e, r, n) {
        {
          var a = L.ReactDebugCurrentFrame, o = a.getStackAddendum();
          o !== "" && (r += "%s", n = n.concat([o]));
          var c = n.map(function(i) {
            return String(i);
          });
          c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
        }
      }
      var ye = {};
      function t(e, r) {
        {
          var n = e.constructor, a = n && (n.displayName || n.name) || "ReactClass", o = a + "." + r;
          if (ye[o])
            return;
          f("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, a), ye[o] = !0;
        }
      }
      var u = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(e, r, n) {
          t(e, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(e, r, n, a) {
          t(e, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(e, r, n, a) {
          t(e, "setState");
        }
      }, d = Object.assign, h = {};
      Object.freeze(h);
      function v(e, r, n) {
        this.props = e, this.context = r, this.refs = h, this.updater = n || u;
      }
      v.prototype.isReactComponent = {}, v.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, v.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var _ = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, S = function(e, r) {
          Object.defineProperty(v.prototype, e, {
            get: function() {
              W("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var g in _)
          _.hasOwnProperty(g) && S(g, _[g]);
      }
      function b() {
      }
      b.prototype = v.prototype;
      function D(e, r, n) {
        this.props = e, this.context = r, this.refs = h, this.updater = n || u;
      }
      var Te = D.prototype = new b();
      Te.constructor = D, d(Te, v.prototype), Te.isPureReactComponent = !0;
      function kr() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var Tr = Array.isArray;
      function he(e) {
        return Tr(e);
      }
      function Pr(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return n;
        }
      }
      function jr(e) {
        try {
          return Ye(e), !1;
        } catch {
          return !0;
        }
      }
      function Ye(e) {
        return "" + e;
      }
      function me(e) {
        if (jr(e))
          return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pr(e)), Ye(e);
      }
      function Ar(e, r, n) {
        var a = e.displayName;
        if (a)
          return a;
        var o = r.displayName || r.name || "";
        return o !== "" ? n + "(" + o + ")" : n;
      }
      function ze(e) {
        return e.displayName || "Context";
      }
      function Y(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case A:
            return "Fragment";
          case T:
            return "Portal";
          case te:
            return "Profiler";
          case I:
            return "StrictMode";
          case B:
            return "Suspense";
          case ae:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case G:
              var r = e;
              return ze(r) + ".Consumer";
            case ne:
              var n = e;
              return ze(n._context) + ".Provider";
            case z:
              return Ar(e, e.render, "ForwardRef");
            case M:
              var a = e.displayName || null;
              return a !== null ? a : Y(e.type) || "Memo";
            case H: {
              var o = e, c = o._payload, i = o._init;
              try {
                return Y(i(c));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var ie = Object.prototype.hasOwnProperty, Be = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, He, qe, Pe;
      Pe = {};
      function Ke(e) {
        if (ie.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Ge(e) {
        if (ie.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Ir(e, r) {
        var n = function() {
          He || (He = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
      function $r(e, r) {
        var n = function() {
          qe || (qe = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
      function Dr(e) {
        if (typeof e.ref == "string" && x.current && e.__self && x.current.stateNode !== e.__self) {
          var r = Y(x.current.type);
          Pe[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), Pe[r] = !0);
        }
      }
      var je = function(e, r, n, a, o, c, i) {
        var l = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: $,
          // Built-in properties that belong on the element
          type: e,
          key: r,
          ref: n,
          props: i,
          // Record the component responsible for creating this element.
          _owner: c
        };
        return l._store = {}, Object.defineProperty(l._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(l, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: a
        }), Object.defineProperty(l, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: o
        }), Object.freeze && (Object.freeze(l.props), Object.freeze(l)), l;
      };
      function Fr(e, r, n) {
        var a, o = {}, c = null, i = null, l = null, y = null;
        if (r != null) {
          Ke(r) && (i = r.ref, Dr(r)), Ge(r) && (me(r.key), c = "" + r.key), l = r.__self === void 0 ? null : r.__self, y = r.__source === void 0 ? null : r.__source;
          for (a in r)
            ie.call(r, a) && !Be.hasOwnProperty(a) && (o[a] = r[a]);
        }
        var m = arguments.length - 2;
        if (m === 1)
          o.children = n;
        else if (m > 1) {
          for (var E = Array(m), R = 0; R < m; R++)
            E[R] = arguments[R + 2];
          Object.freeze && Object.freeze(E), o.children = E;
        }
        if (e && e.defaultProps) {
          var w = e.defaultProps;
          for (a in w)
            o[a] === void 0 && (o[a] = w[a]);
        }
        if (c || i) {
          var k = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          c && Ir(o, k), i && $r(o, k);
        }
        return je(e, c, i, l, y, x.current, o);
      }
      function xr(e, r) {
        var n = je(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return n;
      }
      function Lr(e, r, n) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var a, o = d({}, e.props), c = e.key, i = e.ref, l = e._self, y = e._source, m = e._owner;
        if (r != null) {
          Ke(r) && (i = r.ref, m = x.current), Ge(r) && (me(r.key), c = "" + r.key);
          var E;
          e.type && e.type.defaultProps && (E = e.type.defaultProps);
          for (a in r)
            ie.call(r, a) && !Be.hasOwnProperty(a) && (r[a] === void 0 && E !== void 0 ? o[a] = E[a] : o[a] = r[a]);
        }
        var R = arguments.length - 2;
        if (R === 1)
          o.children = n;
        else if (R > 1) {
          for (var w = Array(R), k = 0; k < R; k++)
            w[k] = arguments[k + 2];
          o.children = w;
        }
        return je(e.type, c, i, l, y, m, o);
      }
      function Z(e) {
        return typeof e == "object" && e !== null && e.$$typeof === $;
      }
      var Qe = ".", Mr = ":";
      function Nr(e) {
        var r = /[=:]/g, n = {
          "=": "=0",
          ":": "=2"
        }, a = e.replace(r, function(o) {
          return n[o];
        });
        return "$" + a;
      }
      var Je = !1, Vr = /\/+/g;
      function Xe(e) {
        return e.replace(Vr, "$&/");
      }
      function Ae(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (me(e.key), Nr("" + e.key)) : r.toString(36);
      }
      function _e(e, r, n, a, o) {
        var c = typeof e;
        (c === "undefined" || c === "boolean") && (e = null);
        var i = !1;
        if (e === null)
          i = !0;
        else
          switch (c) {
            case "string":
            case "number":
              i = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case $:
                case T:
                  i = !0;
              }
          }
        if (i) {
          var l = e, y = o(l), m = a === "" ? Qe + Ae(l, 0) : a;
          if (he(y)) {
            var E = "";
            m != null && (E = Xe(m) + "/"), _e(y, r, E, "", function($t) {
              return $t;
            });
          } else
            y != null && (Z(y) && (y.key && (!l || l.key !== y.key) && me(y.key), y = xr(
              y,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              n + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (y.key && (!l || l.key !== y.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                Xe("" + y.key) + "/"
              ) : "") + m
            )), r.push(y));
          return 1;
        }
        var R, w, k = 0, j = a === "" ? Qe : a + Mr;
        if (he(e))
          for (var Oe = 0; Oe < e.length; Oe++)
            R = e[Oe], w = j + Ae(R, Oe), k += _e(R, r, n, w, o);
        else {
          var Ve = Q(e);
          if (typeof Ve == "function") {
            var Rr = e;
            Ve === Rr.entries && (Je || W("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Je = !0);
            for (var At = Ve.call(Rr), wr, It = 0; !(wr = At.next()).done; )
              R = wr.value, w = j + Ae(R, It++), k += _e(R, r, n, w, o);
          } else if (c === "object") {
            var Cr = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (Cr === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : Cr) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return k;
      }
      function ge(e, r, n) {
        if (e == null)
          return e;
        var a = [], o = 0;
        return _e(e, a, "", "", function(c) {
          return r.call(n, c, o++);
        }), a;
      }
      function Ur(e) {
        var r = 0;
        return ge(e, function() {
          r++;
        }), r;
      }
      function Wr(e, r, n) {
        ge(e, function() {
          r.apply(this, arguments);
        }, n);
      }
      function Yr(e) {
        return ge(e, function(r) {
          return r;
        }) || [];
      }
      function zr(e) {
        if (!Z(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function Br(e) {
        var r = {
          $$typeof: G,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        r.Provider = {
          $$typeof: ne,
          _context: r
        };
        var n = !1, a = !1, o = !1;
        {
          var c = {
            $$typeof: G,
            _context: r
          };
          Object.defineProperties(c, {
            Provider: {
              get: function() {
                return a || (a = !0, f("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), r.Provider;
              },
              set: function(i) {
                r.Provider = i;
              }
            },
            _currentValue: {
              get: function() {
                return r._currentValue;
              },
              set: function(i) {
                r._currentValue = i;
              }
            },
            _currentValue2: {
              get: function() {
                return r._currentValue2;
              },
              set: function(i) {
                r._currentValue2 = i;
              }
            },
            _threadCount: {
              get: function() {
                return r._threadCount;
              },
              set: function(i) {
                r._threadCount = i;
              }
            },
            Consumer: {
              get: function() {
                return n || (n = !0, f("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), r.Consumer;
              }
            },
            displayName: {
              get: function() {
                return r.displayName;
              },
              set: function(i) {
                o || (W("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", i), o = !0);
              }
            }
          }), r.Consumer = c;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var se = -1, Ie = 0, Ze = 1, Hr = 2;
      function qr(e) {
        if (e._status === se) {
          var r = e._result, n = r();
          if (n.then(function(c) {
            if (e._status === Ie || e._status === se) {
              var i = e;
              i._status = Ze, i._result = c;
            }
          }, function(c) {
            if (e._status === Ie || e._status === se) {
              var i = e;
              i._status = Hr, i._result = c;
            }
          }), e._status === se) {
            var a = e;
            a._status = Ie, a._result = n;
          }
        }
        if (e._status === Ze) {
          var o = e._result;
          return o === void 0 && f(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, o), "default" in o || f(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, o), o.default;
        } else
          throw e._result;
      }
      function Kr(e) {
        var r = {
          // We use these fields to store the result.
          _status: se,
          _result: e
        }, n = {
          $$typeof: H,
          _payload: r,
          _init: qr
        };
        {
          var a, o;
          Object.defineProperties(n, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return a;
              },
              set: function(c) {
                f("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), a = c, Object.defineProperty(n, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return o;
              },
              set: function(c) {
                f("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), o = c, Object.defineProperty(n, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return n;
      }
      function Gr(e) {
        e != null && e.$$typeof === M ? f("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? f("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && f("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && f("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: z,
          render: e
        };
        {
          var n;
          Object.defineProperty(r, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return n;
            },
            set: function(a) {
              n = a, !e.name && !e.displayName && (e.displayName = a);
            }
          });
        }
        return r;
      }
      var er;
      er = Symbol.for("react.module.reference");
      function rr(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === A || e === te || X || e === I || e === B || e === ae || ue || e === le || oe || ke || ve || typeof e == "object" && e !== null && (e.$$typeof === H || e.$$typeof === M || e.$$typeof === ne || e.$$typeof === G || e.$$typeof === z || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === er || e.getModuleId !== void 0));
      }
      function Qr(e, r) {
        rr(e) || f("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var n = {
          $$typeof: M,
          type: e,
          compare: r === void 0 ? null : r
        };
        {
          var a;
          Object.defineProperty(n, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return a;
            },
            set: function(o) {
              a = o, !e.name && !e.displayName && (e.displayName = o);
            }
          });
        }
        return n;
      }
      function F() {
        var e = J.current;
        return e === null && f(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function Jr(e) {
        var r = F();
        if (e._context !== void 0) {
          var n = e._context;
          n.Consumer === e ? f("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : n.Provider === e && f("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function Xr(e) {
        var r = F();
        return r.useState(e);
      }
      function Zr(e, r, n) {
        var a = F();
        return a.useReducer(e, r, n);
      }
      function et(e) {
        var r = F();
        return r.useRef(e);
      }
      function rt(e, r) {
        var n = F();
        return n.useEffect(e, r);
      }
      function tt(e, r) {
        var n = F();
        return n.useInsertionEffect(e, r);
      }
      function nt(e, r) {
        var n = F();
        return n.useLayoutEffect(e, r);
      }
      function at(e, r) {
        var n = F();
        return n.useCallback(e, r);
      }
      function ot(e, r) {
        var n = F();
        return n.useMemo(e, r);
      }
      function ut(e, r, n) {
        var a = F();
        return a.useImperativeHandle(e, r, n);
      }
      function it(e, r) {
        {
          var n = F();
          return n.useDebugValue(e, r);
        }
      }
      function st() {
        var e = F();
        return e.useTransition();
      }
      function ct(e) {
        var r = F();
        return r.useDeferredValue(e);
      }
      function ft() {
        var e = F();
        return e.useId();
      }
      function lt(e, r, n) {
        var a = F();
        return a.useSyncExternalStore(e, r, n);
      }
      var ce = 0, tr, nr, ar, or, ur, ir, sr;
      function cr() {
      }
      cr.__reactDisabledLog = !0;
      function dt() {
        {
          if (ce === 0) {
            tr = console.log, nr = console.info, ar = console.warn, or = console.error, ur = console.group, ir = console.groupCollapsed, sr = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: cr,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          ce++;
        }
      }
      function pt() {
        {
          if (ce--, ce === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: d({}, e, {
                value: tr
              }),
              info: d({}, e, {
                value: nr
              }),
              warn: d({}, e, {
                value: ar
              }),
              error: d({}, e, {
                value: or
              }),
              group: d({}, e, {
                value: ur
              }),
              groupCollapsed: d({}, e, {
                value: ir
              }),
              groupEnd: d({}, e, {
                value: sr
              })
            });
          }
          ce < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var $e = L.ReactCurrentDispatcher, De;
      function be(e, r, n) {
        {
          if (De === void 0)
            try {
              throw Error();
            } catch (o) {
              var a = o.stack.trim().match(/\n( *(at )?)/);
              De = a && a[1] || "";
            }
          return `
` + De + e;
        }
      }
      var Fe = !1, Ee;
      {
        var vt = typeof WeakMap == "function" ? WeakMap : Map;
        Ee = new vt();
      }
      function fr(e, r) {
        if (!e || Fe)
          return "";
        {
          var n = Ee.get(e);
          if (n !== void 0)
            return n;
        }
        var a;
        Fe = !0;
        var o = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var c;
        c = $e.current, $e.current = null, dt();
        try {
          if (r) {
            var i = function() {
              throw Error();
            };
            if (Object.defineProperty(i.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(i, []);
              } catch (j) {
                a = j;
              }
              Reflect.construct(e, [], i);
            } else {
              try {
                i.call();
              } catch (j) {
                a = j;
              }
              e.call(i.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (j) {
              a = j;
            }
            e();
          }
        } catch (j) {
          if (j && a && typeof j.stack == "string") {
            for (var l = j.stack.split(`
`), y = a.stack.split(`
`), m = l.length - 1, E = y.length - 1; m >= 1 && E >= 0 && l[m] !== y[E]; )
              E--;
            for (; m >= 1 && E >= 0; m--, E--)
              if (l[m] !== y[E]) {
                if (m !== 1 || E !== 1)
                  do
                    if (m--, E--, E < 0 || l[m] !== y[E]) {
                      var R = `
` + l[m].replace(" at new ", " at ");
                      return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), typeof e == "function" && Ee.set(e, R), R;
                    }
                  while (m >= 1 && E >= 0);
                break;
              }
          }
        } finally {
          Fe = !1, $e.current = c, pt(), Error.prepareStackTrace = o;
        }
        var w = e ? e.displayName || e.name : "", k = w ? be(w) : "";
        return typeof e == "function" && Ee.set(e, k), k;
      }
      function yt(e, r, n) {
        return fr(e, !1);
      }
      function ht(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function Re(e, r, n) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return fr(e, ht(e));
        if (typeof e == "string")
          return be(e);
        switch (e) {
          case B:
            return be("Suspense");
          case ae:
            return be("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case z:
              return yt(e.render);
            case M:
              return Re(e.type, r, n);
            case H: {
              var a = e, o = a._payload, c = a._init;
              try {
                return Re(c(o), r, n);
              } catch {
              }
            }
          }
        return "";
      }
      var lr = {}, dr = L.ReactDebugCurrentFrame;
      function we(e) {
        if (e) {
          var r = e._owner, n = Re(e.type, e._source, r ? r.type : null);
          dr.setExtraStackFrame(n);
        } else
          dr.setExtraStackFrame(null);
      }
      function mt(e, r, n, a, o) {
        {
          var c = Function.call.bind(ie);
          for (var i in e)
            if (c(e, i)) {
              var l = void 0;
              try {
                if (typeof e[i] != "function") {
                  var y = Error((a || "React class") + ": " + n + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw y.name = "Invariant Violation", y;
                }
                l = e[i](r, i, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (m) {
                l = m;
              }
              l && !(l instanceof Error) && (we(o), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, i, typeof l), we(null)), l instanceof Error && !(l.message in lr) && (lr[l.message] = !0, we(o), f("Failed %s type: %s", n, l.message), we(null));
            }
        }
      }
      function ee(e) {
        if (e) {
          var r = e._owner, n = Re(e.type, e._source, r ? r.type : null);
          pe(n);
        } else
          pe(null);
      }
      var xe;
      xe = !1;
      function pr() {
        if (x.current) {
          var e = Y(x.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function _t(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + r + ":" + n + ".";
        }
        return "";
      }
      function gt(e) {
        return e != null ? _t(e.__source) : "";
      }
      var vr = {};
      function bt(e) {
        var r = pr();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
      function yr(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var n = bt(r);
          if (!vr[n]) {
            vr[n] = !0;
            var a = "";
            e && e._owner && e._owner !== x.current && (a = " It was passed a child from " + Y(e._owner.type) + "."), ee(e), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), ee(null);
          }
        }
      }
      function hr(e, r) {
        if (typeof e == "object") {
          if (he(e))
            for (var n = 0; n < e.length; n++) {
              var a = e[n];
              Z(a) && yr(a, r);
            }
          else if (Z(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var o = Q(e);
            if (typeof o == "function" && o !== e.entries)
              for (var c = o.call(e), i; !(i = c.next()).done; )
                Z(i.value) && yr(i.value, r);
          }
        }
      }
      function mr(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var n;
          if (typeof r == "function")
            n = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === z || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          r.$$typeof === M))
            n = r.propTypes;
          else
            return;
          if (n) {
            var a = Y(r);
            mt(n, e.props, "prop", a, e);
          } else if (r.PropTypes !== void 0 && !xe) {
            xe = !0;
            var o = Y(r);
            f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Et(e) {
        {
          for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
            var a = r[n];
            if (a !== "children" && a !== "key") {
              ee(e), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), ee(null);
              break;
            }
          }
          e.ref !== null && (ee(e), f("Invalid attribute `ref` supplied to `React.Fragment`."), ee(null));
        }
      }
      function _r(e, r, n) {
        var a = rr(e);
        if (!a) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var c = gt(r);
          c ? o += c : o += pr();
          var i;
          e === null ? i = "null" : he(e) ? i = "array" : e !== void 0 && e.$$typeof === $ ? (i = "<" + (Y(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : i = typeof e, f("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", i, o);
        }
        var l = Fr.apply(this, arguments);
        if (l == null)
          return l;
        if (a)
          for (var y = 2; y < arguments.length; y++)
            hr(arguments[y], e);
        return e === A ? Et(l) : mr(l), l;
      }
      var gr = !1;
      function Rt(e) {
        var r = _r.bind(null, e);
        return r.type = e, gr || (gr = !0, W("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return W("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function wt(e, r, n) {
        for (var a = Lr.apply(this, arguments), o = 2; o < arguments.length; o++)
          hr(arguments[o], a.type);
        return mr(a), a;
      }
      function Ct(e, r) {
        var n = V.transition;
        V.transition = {};
        var a = V.transition;
        V.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (V.transition = n, n === null && a._updatedFibers) {
            var o = a._updatedFibers.size;
            o > 10 && W("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), a._updatedFibers.clear();
          }
        }
      }
      var br = !1, Ce = null;
      function St(e) {
        if (Ce === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), n = O && O[r];
            Ce = n.call(O, "timers").setImmediate;
          } catch {
            Ce = function(o) {
              br === !1 && (br = !0, typeof MessageChannel > "u" && f("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var c = new MessageChannel();
              c.port1.onmessage = o, c.port2.postMessage(void 0);
            };
          }
        return Ce(e);
      }
      var re = 0, Er = !1;
      function Ot(e) {
        {
          var r = re;
          re++, P.current === null && (P.current = []);
          var n = P.isBatchingLegacy, a;
          try {
            if (P.isBatchingLegacy = !0, a = e(), !n && P.didScheduleLegacyUpdate) {
              var o = P.current;
              o !== null && (P.didScheduleLegacyUpdate = !1, Ne(o));
            }
          } catch (w) {
            throw Se(r), w;
          } finally {
            P.isBatchingLegacy = n;
          }
          if (a !== null && typeof a == "object" && typeof a.then == "function") {
            var c = a, i = !1, l = {
              then: function(w, k) {
                i = !0, c.then(function(j) {
                  Se(r), re === 0 ? Le(j, w, k) : w(j);
                }, function(j) {
                  Se(r), k(j);
                });
              }
            };
            return !Er && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              i || (Er = !0, f("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), l;
          } else {
            var y = a;
            if (Se(r), re === 0) {
              var m = P.current;
              m !== null && (Ne(m), P.current = null);
              var E = {
                then: function(w, k) {
                  P.current === null ? (P.current = [], Le(y, w, k)) : w(y);
                }
              };
              return E;
            } else {
              var R = {
                then: function(w, k) {
                  w(y);
                }
              };
              return R;
            }
          }
        }
      }
      function Se(e) {
        e !== re - 1 && f("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), re = e;
      }
      function Le(e, r, n) {
        {
          var a = P.current;
          if (a !== null)
            try {
              Ne(a), St(function() {
                a.length === 0 ? (P.current = null, r(e)) : Le(e, r, n);
              });
            } catch (o) {
              n(o);
            }
          else
            r(e);
        }
      }
      var Me = !1;
      function Ne(e) {
        if (!Me) {
          Me = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var n = e[r];
              do
                n = n(!0);
              while (n !== null);
            }
            e.length = 0;
          } catch (a) {
            throw e = e.slice(r + 1), a;
          } finally {
            Me = !1;
          }
        }
      }
      var kt = _r, Tt = wt, Pt = Rt, jt = {
        map: ge,
        forEach: Wr,
        count: Ur,
        toArray: Yr,
        only: zr
      };
      s.Children = jt, s.Component = v, s.Fragment = A, s.Profiler = te, s.PureComponent = D, s.StrictMode = I, s.Suspense = B, s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L, s.cloneElement = Tt, s.createContext = Br, s.createElement = kt, s.createFactory = Pt, s.createRef = kr, s.forwardRef = Gr, s.isValidElement = Z, s.lazy = Kr, s.memo = Qr, s.startTransition = Ct, s.unstable_act = Ot, s.useCallback = at, s.useContext = Jr, s.useDebugValue = it, s.useDeferredValue = ct, s.useEffect = rt, s.useId = ft, s.useImperativeHandle = ut, s.useInsertionEffect = tt, s.useLayoutEffect = nt, s.useMemo = ot, s.useReducer = Zr, s.useRef = et, s.useState = Xr, s.useSyncExternalStore = lt, s.useTransition = st, s.version = C, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(fe, fe.exports)), fe.exports;
}
process.env.NODE_ENV === "production" ? Ue.exports = Lt() : Ue.exports = Mt();
var We = Ue.exports;
function Nt(O, s) {
  let [C, $] = We.useState(() => s(O.read()));
  return We.useEffect(() => {
    const T = (A) => {
      const I = s(A);
      Object.is(C, I) || (C = I, $(I));
    };
    return T(O.read()), O.watch(T);
  }, [O, s]), C;
}
function Vt(O, s) {
  const C = We.useRef(null);
  return C.current === null && (C.current = xt(O, s)), [C.current !== null ? Nt(C.current, (A) => A) : void 0, (A) => {
    var I;
    return (I = C.current) == null ? void 0 : I.write(A);
  }];
}
export {
  Vt as usePartition
};
