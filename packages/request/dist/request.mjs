import Or from "object-hash";
var Ye = { exports: {} }, p = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tr;
function Mt() {
  if (Tr)
    return p;
  Tr = 1;
  var O = Symbol.for("react.element"), s = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), D = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), N = Symbol.for("react.suspense"), V = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), x = Symbol.iterator;
  function oe(t) {
    return t === null || typeof t != "object" ? null : (t = x && t[x] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Y = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Q = Object.assign, de = {};
  function z(t, u, d) {
    this.props = t, this.context = u, this.refs = de, this.updater = d || Y;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(t, u) {
    if (typeof t != "object" && typeof t != "function" && t != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, t, u, "setState");
  }, z.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function pe() {
  }
  pe.prototype = z.prototype;
  function Z(t, u, d) {
    this.props = t, this.context = u, this.refs = de, this.updater = d || Y;
  }
  var ee = Z.prototype = new pe();
  ee.constructor = Z, Q(ee, z.prototype), ee.isPureReactComponent = !0;
  var B = Array.isArray, j = Object.prototype.hasOwnProperty, F = { current: null }, q = { key: !0, ref: !0, __self: !0, __source: !0 };
  function J(t, u, d) {
    var m, v = {}, E = null, k = null;
    if (u != null)
      for (m in u.ref !== void 0 && (k = u.ref), u.key !== void 0 && (E = "" + u.key), u)
        j.call(u, m) && !q.hasOwnProperty(m) && (v[m] = u[m]);
    var R = arguments.length - 2;
    if (R === 1)
      v.children = d;
    else if (1 < R) {
      for (var C = Array(R), $ = 0; $ < R; $++)
        C[$] = arguments[$ + 2];
      v.children = C;
    }
    if (t && t.defaultProps)
      for (m in R = t.defaultProps, R)
        v[m] === void 0 && (v[m] = R[m]);
    return { $$typeof: O, type: t, key: E, ref: k, props: v, _owner: F.current };
  }
  function ve(t, u) {
    return { $$typeof: O, type: t.type, key: u, ref: t.ref, props: t.props, _owner: t._owner };
  }
  function ue(t) {
    return typeof t == "object" && t !== null && t.$$typeof === O;
  }
  function Pe(t) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(d) {
      return u[d];
    });
  }
  var ye = /\/+/g;
  function ie(t, u) {
    return typeof t == "object" && t !== null && t.key != null ? Pe("" + t.key) : u.toString(36);
  }
  function re(t, u, d, m, v) {
    var E = typeof t;
    (E === "undefined" || E === "boolean") && (t = null);
    var k = !1;
    if (t === null)
      k = !0;
    else
      switch (E) {
        case "string":
        case "number":
          k = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case O:
            case s:
              k = !0;
          }
      }
    if (k)
      return k = t, v = v(k), t = m === "" ? "." + ie(k, 0) : m, B(v) ? (d = "", t != null && (d = t.replace(ye, "$&/") + "/"), re(v, u, d, "", function($) {
        return $;
      })) : v != null && (ue(v) && (v = ve(v, d + (!v.key || k && k.key === v.key ? "" : ("" + v.key).replace(ye, "$&/") + "/") + t)), u.push(v)), 1;
    if (k = 0, m = m === "" ? "." : m + ":", B(t))
      for (var R = 0; R < t.length; R++) {
        E = t[R];
        var C = m + ie(E, R);
        k += re(E, u, d, C, v);
      }
    else if (C = oe(t), typeof C == "function")
      for (t = C.call(t), R = 0; !(E = t.next()).done; )
        E = E.value, C = m + ie(E, R++), k += re(E, u, d, C, v);
    else if (E === "object")
      throw u = String(t), Error("Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead.");
    return k;
  }
  function U(t, u, d) {
    if (t == null)
      return t;
    var m = [], v = 0;
    return re(t, m, "", "", function(E) {
      return u.call(d, E, v++);
    }), m;
  }
  function G(t) {
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
  var f = { current: null }, X = { transition: null }, he = { ReactCurrentDispatcher: f, ReactCurrentBatchConfig: X, ReactCurrentOwner: F };
  return p.Children = { map: U, forEach: function(t, u, d) {
    U(t, function() {
      u.apply(this, arguments);
    }, d);
  }, count: function(t) {
    var u = 0;
    return U(t, function() {
      u++;
    }), u;
  }, toArray: function(t) {
    return U(t, function(u) {
      return u;
    }) || [];
  }, only: function(t) {
    if (!ue(t))
      throw Error("React.Children.only expected to receive a single React element child.");
    return t;
  } }, p.Component = z, p.Fragment = h, p.Profiler = A, p.PureComponent = Z, p.StrictMode = b, p.Suspense = N, p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = he, p.cloneElement = function(t, u, d) {
    if (t == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
    var m = Q({}, t.props), v = t.key, E = t.ref, k = t._owner;
    if (u != null) {
      if (u.ref !== void 0 && (E = u.ref, k = F.current), u.key !== void 0 && (v = "" + u.key), t.type && t.type.defaultProps)
        var R = t.type.defaultProps;
      for (C in u)
        j.call(u, C) && !q.hasOwnProperty(C) && (m[C] = u[C] === void 0 && R !== void 0 ? R[C] : u[C]);
    }
    var C = arguments.length - 2;
    if (C === 1)
      m.children = d;
    else if (1 < C) {
      R = Array(C);
      for (var $ = 0; $ < C; $++)
        R[$] = arguments[$ + 2];
      m.children = R;
    }
    return { $$typeof: O, type: t.type, key: v, ref: E, props: m, _owner: k };
  }, p.createContext = function(t) {
    return t = { $$typeof: D, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: g, _context: t }, t.Consumer = t;
  }, p.createElement = J, p.createFactory = function(t) {
    var u = J.bind(null, t);
    return u.type = t, u;
  }, p.createRef = function() {
    return { current: null };
  }, p.forwardRef = function(t) {
    return { $$typeof: M, render: t };
  }, p.isValidElement = ue, p.lazy = function(t) {
    return { $$typeof: W, _payload: { _status: -1, _result: t }, _init: G };
  }, p.memo = function(t, u) {
    return { $$typeof: V, type: t, compare: u === void 0 ? null : u };
  }, p.startTransition = function(t) {
    var u = X.transition;
    X.transition = {};
    try {
      t();
    } finally {
      X.transition = u;
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
var le = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
le.exports;
var kr;
function Vt() {
  return kr || (kr = 1, function(O, s) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var h = "18.2.0", b = Symbol.for("react.element"), A = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), N = Symbol.for("react.provider"), V = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), oe = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), Q = Symbol.for("react.lazy"), de = Symbol.for("react.offscreen"), z = Symbol.iterator, pe = "@@iterator";
      function Z(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = z && e[z] || e[pe];
        return typeof r == "function" ? r : null;
      }
      var ee = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, B = {
        transition: null
      }, j = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, F = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, q = {}, J = null;
      function ve(e) {
        J = e;
      }
      q.setExtraStackFrame = function(e) {
        J = e;
      }, q.getCurrentStack = null, q.getStackAddendum = function() {
        var e = "";
        J && (e += J);
        var r = q.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var ue = !1, Pe = !1, ye = !1, ie = !1, re = !1, U = {
        ReactCurrentDispatcher: ee,
        ReactCurrentBatchConfig: B,
        ReactCurrentOwner: F
      };
      U.ReactDebugCurrentFrame = q, U.ReactCurrentActQueue = j;
      function G(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          X("warn", e, n);
        }
      }
      function f(e) {
        {
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          X("error", e, n);
        }
      }
      function X(e, r, n) {
        {
          var a = U.ReactDebugCurrentFrame, o = a.getStackAddendum();
          o !== "" && (r += "%s", n = n.concat([o]));
          var c = n.map(function(i) {
            return String(i);
          });
          c.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, c);
        }
      }
      var he = {};
      function t(e, r) {
        {
          var n = e.constructor, a = n && (n.displayName || n.name) || "ReactClass", o = a + "." + r;
          if (he[o])
            return;
          f("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, a), he[o] = !0;
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
      }, d = Object.assign, m = {};
      Object.freeze(m);
      function v(e, r, n) {
        this.props = e, this.context = r, this.refs = m, this.updater = n || u;
      }
      v.prototype.isReactComponent = {}, v.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, v.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var E = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, k = function(e, r) {
          Object.defineProperty(v.prototype, e, {
            get: function() {
              G("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var R in E)
          E.hasOwnProperty(R) && k(R, E[R]);
      }
      function C() {
      }
      C.prototype = v.prototype;
      function $(e, r, n) {
        this.props = e, this.context = r, this.refs = m, this.updater = n || u;
      }
      var Ae = $.prototype = new C();
      Ae.constructor = $, d(Ae, v.prototype), Ae.isPureReactComponent = !0;
      function jr() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var Dr = Array.isArray;
      function me(e) {
        return Dr(e);
      }
      function Ir(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return n;
        }
      }
      function $r(e) {
        try {
          return ze(e), !1;
        } catch {
          return !0;
        }
      }
      function ze(e) {
        return "" + e;
      }
      function _e(e) {
        if ($r(e))
          return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ir(e)), ze(e);
      }
      function Lr(e, r, n) {
        var a = e.displayName;
        if (a)
          return a;
        var o = r.displayName || r.name || "";
        return o !== "" ? n + "(" + o + ")" : n;
      }
      function Be(e) {
        return e.displayName || "Context";
      }
      function K(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case g:
            return "Fragment";
          case A:
            return "Portal";
          case M:
            return "Profiler";
          case D:
            return "StrictMode";
          case x:
            return "Suspense";
          case oe:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case V:
              var r = e;
              return Be(r) + ".Consumer";
            case N:
              var n = e;
              return Be(n._context) + ".Provider";
            case W:
              return Lr(e, e.render, "ForwardRef");
            case Y:
              var a = e.displayName || null;
              return a !== null ? a : K(e.type) || "Memo";
            case Q: {
              var o = e, c = o._payload, i = o._init;
              try {
                return K(i(c));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var se = Object.prototype.hasOwnProperty, He = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, qe, Ge, je;
      je = {};
      function Ke(e) {
        if (se.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Qe(e) {
        if (se.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function xr(e, r) {
        var n = function() {
          qe || (qe = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
      function Fr(e, r) {
        var n = function() {
          Ge || (Ge = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
      function Mr(e) {
        if (typeof e.ref == "string" && F.current && e.__self && F.current.stateNode !== e.__self) {
          var r = K(F.current.type);
          je[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), je[r] = !0);
        }
      }
      var De = function(e, r, n, a, o, c, i) {
        var l = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: b,
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
      function Vr(e, r, n) {
        var a, o = {}, c = null, i = null, l = null, y = null;
        if (r != null) {
          Ke(r) && (i = r.ref, Mr(r)), Qe(r) && (_e(r.key), c = "" + r.key), l = r.__self === void 0 ? null : r.__self, y = r.__source === void 0 ? null : r.__source;
          for (a in r)
            se.call(r, a) && !He.hasOwnProperty(a) && (o[a] = r[a]);
        }
        var _ = arguments.length - 2;
        if (_ === 1)
          o.children = n;
        else if (_ > 1) {
          for (var w = Array(_), S = 0; S < _; S++)
            w[S] = arguments[S + 2];
          Object.freeze && Object.freeze(w), o.children = w;
        }
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (a in T)
            o[a] === void 0 && (o[a] = T[a]);
        }
        if (c || i) {
          var P = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          c && xr(o, P), i && Fr(o, P);
        }
        return De(e, c, i, l, y, F.current, o);
      }
      function Ur(e, r) {
        var n = De(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return n;
      }
      function Nr(e, r, n) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var a, o = d({}, e.props), c = e.key, i = e.ref, l = e._self, y = e._source, _ = e._owner;
        if (r != null) {
          Ke(r) && (i = r.ref, _ = F.current), Qe(r) && (_e(r.key), c = "" + r.key);
          var w;
          e.type && e.type.defaultProps && (w = e.type.defaultProps);
          for (a in r)
            se.call(r, a) && !He.hasOwnProperty(a) && (r[a] === void 0 && w !== void 0 ? o[a] = w[a] : o[a] = r[a]);
        }
        var S = arguments.length - 2;
        if (S === 1)
          o.children = n;
        else if (S > 1) {
          for (var T = Array(S), P = 0; P < S; P++)
            T[P] = arguments[P + 2];
          o.children = T;
        }
        return De(e.type, c, i, l, y, _, o);
      }
      function te(e) {
        return typeof e == "object" && e !== null && e.$$typeof === b;
      }
      var Je = ".", Wr = ":";
      function Yr(e) {
        var r = /[=:]/g, n = {
          "=": "=0",
          ":": "=2"
        }, a = e.replace(r, function(o) {
          return n[o];
        });
        return "$" + a;
      }
      var Xe = !1, zr = /\/+/g;
      function Ze(e) {
        return e.replace(zr, "$&/");
      }
      function Ie(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (_e(e.key), Yr("" + e.key)) : r.toString(36);
      }
      function ge(e, r, n, a, o) {
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
                case b:
                case A:
                  i = !0;
              }
          }
        if (i) {
          var l = e, y = o(l), _ = a === "" ? Je + Ie(l, 0) : a;
          if (me(y)) {
            var w = "";
            _ != null && (w = Ze(_) + "/"), ge(y, r, w, "", function(Ft) {
              return Ft;
            });
          } else
            y != null && (te(y) && (y.key && (!l || l.key !== y.key) && _e(y.key), y = Ur(
              y,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              n + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (y.key && (!l || l.key !== y.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                Ze("" + y.key) + "/"
              ) : "") + _
            )), r.push(y));
          return 1;
        }
        var S, T, P = 0, I = a === "" ? Je : a + Wr;
        if (me(e))
          for (var Te = 0; Te < e.length; Te++)
            S = e[Te], T = I + Ie(S, Te), P += ge(S, r, n, T, o);
        else {
          var We = Z(e);
          if (typeof We == "function") {
            var Cr = e;
            We === Cr.entries && (Xe || G("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Xe = !0);
            for (var Lt = We.call(Cr), wr, xt = 0; !(wr = Lt.next()).done; )
              S = wr.value, T = I + Ie(S, xt++), P += ge(S, r, n, T, o);
          } else if (c === "object") {
            var Sr = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (Sr === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : Sr) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return P;
      }
      function be(e, r, n) {
        if (e == null)
          return e;
        var a = [], o = 0;
        return ge(e, a, "", "", function(c) {
          return r.call(n, c, o++);
        }), a;
      }
      function Br(e) {
        var r = 0;
        return be(e, function() {
          r++;
        }), r;
      }
      function Hr(e, r, n) {
        be(e, function() {
          r.apply(this, arguments);
        }, n);
      }
      function qr(e) {
        return be(e, function(r) {
          return r;
        }) || [];
      }
      function Gr(e) {
        if (!te(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function Kr(e) {
        var r = {
          $$typeof: V,
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
          $$typeof: N,
          _context: r
        };
        var n = !1, a = !1, o = !1;
        {
          var c = {
            $$typeof: V,
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
                o || (G("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", i), o = !0);
              }
            }
          }), r.Consumer = c;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var ce = -1, $e = 0, er = 1, Qr = 2;
      function Jr(e) {
        if (e._status === ce) {
          var r = e._result, n = r();
          if (n.then(function(c) {
            if (e._status === $e || e._status === ce) {
              var i = e;
              i._status = er, i._result = c;
            }
          }, function(c) {
            if (e._status === $e || e._status === ce) {
              var i = e;
              i._status = Qr, i._result = c;
            }
          }), e._status === ce) {
            var a = e;
            a._status = $e, a._result = n;
          }
        }
        if (e._status === er) {
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
      function Xr(e) {
        var r = {
          // We use these fields to store the result.
          _status: ce,
          _result: e
        }, n = {
          $$typeof: Q,
          _payload: r,
          _init: Jr
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
      function Zr(e) {
        e != null && e.$$typeof === Y ? f("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? f("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && f("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && f("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: W,
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
      var rr;
      rr = Symbol.for("react.module.reference");
      function tr(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === g || e === M || re || e === D || e === x || e === oe || ie || e === de || ue || Pe || ye || typeof e == "object" && e !== null && (e.$$typeof === Q || e.$$typeof === Y || e.$$typeof === N || e.$$typeof === V || e.$$typeof === W || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === rr || e.getModuleId !== void 0));
      }
      function et(e, r) {
        tr(e) || f("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var n = {
          $$typeof: Y,
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
      function L() {
        var e = ee.current;
        return e === null && f(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function rt(e) {
        var r = L();
        if (e._context !== void 0) {
          var n = e._context;
          n.Consumer === e ? f("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : n.Provider === e && f("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function tt(e) {
        var r = L();
        return r.useState(e);
      }
      function nt(e, r, n) {
        var a = L();
        return a.useReducer(e, r, n);
      }
      function at(e) {
        var r = L();
        return r.useRef(e);
      }
      function ot(e, r) {
        var n = L();
        return n.useEffect(e, r);
      }
      function ut(e, r) {
        var n = L();
        return n.useInsertionEffect(e, r);
      }
      function it(e, r) {
        var n = L();
        return n.useLayoutEffect(e, r);
      }
      function st(e, r) {
        var n = L();
        return n.useCallback(e, r);
      }
      function ct(e, r) {
        var n = L();
        return n.useMemo(e, r);
      }
      function ft(e, r, n) {
        var a = L();
        return a.useImperativeHandle(e, r, n);
      }
      function lt(e, r) {
        {
          var n = L();
          return n.useDebugValue(e, r);
        }
      }
      function dt() {
        var e = L();
        return e.useTransition();
      }
      function pt(e) {
        var r = L();
        return r.useDeferredValue(e);
      }
      function vt() {
        var e = L();
        return e.useId();
      }
      function yt(e, r, n) {
        var a = L();
        return a.useSyncExternalStore(e, r, n);
      }
      var fe = 0, nr, ar, or, ur, ir, sr, cr;
      function fr() {
      }
      fr.__reactDisabledLog = !0;
      function ht() {
        {
          if (fe === 0) {
            nr = console.log, ar = console.info, or = console.warn, ur = console.error, ir = console.group, sr = console.groupCollapsed, cr = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: fr,
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
          fe++;
        }
      }
      function mt() {
        {
          if (fe--, fe === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: d({}, e, {
                value: nr
              }),
              info: d({}, e, {
                value: ar
              }),
              warn: d({}, e, {
                value: or
              }),
              error: d({}, e, {
                value: ur
              }),
              group: d({}, e, {
                value: ir
              }),
              groupCollapsed: d({}, e, {
                value: sr
              }),
              groupEnd: d({}, e, {
                value: cr
              })
            });
          }
          fe < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Le = U.ReactCurrentDispatcher, xe;
      function Ee(e, r, n) {
        {
          if (xe === void 0)
            try {
              throw Error();
            } catch (o) {
              var a = o.stack.trim().match(/\n( *(at )?)/);
              xe = a && a[1] || "";
            }
          return `
` + xe + e;
        }
      }
      var Fe = !1, Re;
      {
        var _t = typeof WeakMap == "function" ? WeakMap : Map;
        Re = new _t();
      }
      function lr(e, r) {
        if (!e || Fe)
          return "";
        {
          var n = Re.get(e);
          if (n !== void 0)
            return n;
        }
        var a;
        Fe = !0;
        var o = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var c;
        c = Le.current, Le.current = null, ht();
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
              } catch (I) {
                a = I;
              }
              Reflect.construct(e, [], i);
            } else {
              try {
                i.call();
              } catch (I) {
                a = I;
              }
              e.call(i.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (I) {
              a = I;
            }
            e();
          }
        } catch (I) {
          if (I && a && typeof I.stack == "string") {
            for (var l = I.stack.split(`
`), y = a.stack.split(`
`), _ = l.length - 1, w = y.length - 1; _ >= 1 && w >= 0 && l[_] !== y[w]; )
              w--;
            for (; _ >= 1 && w >= 0; _--, w--)
              if (l[_] !== y[w]) {
                if (_ !== 1 || w !== 1)
                  do
                    if (_--, w--, w < 0 || l[_] !== y[w]) {
                      var S = `
` + l[_].replace(" at new ", " at ");
                      return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && Re.set(e, S), S;
                    }
                  while (_ >= 1 && w >= 0);
                break;
              }
          }
        } finally {
          Fe = !1, Le.current = c, mt(), Error.prepareStackTrace = o;
        }
        var T = e ? e.displayName || e.name : "", P = T ? Ee(T) : "";
        return typeof e == "function" && Re.set(e, P), P;
      }
      function gt(e, r, n) {
        return lr(e, !1);
      }
      function bt(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function Ce(e, r, n) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return lr(e, bt(e));
        if (typeof e == "string")
          return Ee(e);
        switch (e) {
          case x:
            return Ee("Suspense");
          case oe:
            return Ee("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case W:
              return gt(e.render);
            case Y:
              return Ce(e.type, r, n);
            case Q: {
              var a = e, o = a._payload, c = a._init;
              try {
                return Ce(c(o), r, n);
              } catch {
              }
            }
          }
        return "";
      }
      var dr = {}, pr = U.ReactDebugCurrentFrame;
      function we(e) {
        if (e) {
          var r = e._owner, n = Ce(e.type, e._source, r ? r.type : null);
          pr.setExtraStackFrame(n);
        } else
          pr.setExtraStackFrame(null);
      }
      function Et(e, r, n, a, o) {
        {
          var c = Function.call.bind(se);
          for (var i in e)
            if (c(e, i)) {
              var l = void 0;
              try {
                if (typeof e[i] != "function") {
                  var y = Error((a || "React class") + ": " + n + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw y.name = "Invariant Violation", y;
                }
                l = e[i](r, i, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (_) {
                l = _;
              }
              l && !(l instanceof Error) && (we(o), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, i, typeof l), we(null)), l instanceof Error && !(l.message in dr) && (dr[l.message] = !0, we(o), f("Failed %s type: %s", n, l.message), we(null));
            }
        }
      }
      function ne(e) {
        if (e) {
          var r = e._owner, n = Ce(e.type, e._source, r ? r.type : null);
          ve(n);
        } else
          ve(null);
      }
      var Me;
      Me = !1;
      function vr() {
        if (F.current) {
          var e = K(F.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function Rt(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + r + ":" + n + ".";
        }
        return "";
      }
      function Ct(e) {
        return e != null ? Rt(e.__source) : "";
      }
      var yr = {};
      function wt(e) {
        var r = vr();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
      function hr(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var n = wt(r);
          if (!yr[n]) {
            yr[n] = !0;
            var a = "";
            e && e._owner && e._owner !== F.current && (a = " It was passed a child from " + K(e._owner.type) + "."), ne(e), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), ne(null);
          }
        }
      }
      function mr(e, r) {
        if (typeof e == "object") {
          if (me(e))
            for (var n = 0; n < e.length; n++) {
              var a = e[n];
              te(a) && hr(a, r);
            }
          else if (te(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var o = Z(e);
            if (typeof o == "function" && o !== e.entries)
              for (var c = o.call(e), i; !(i = c.next()).done; )
                te(i.value) && hr(i.value, r);
          }
        }
      }
      function _r(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var n;
          if (typeof r == "function")
            n = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === W || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          r.$$typeof === Y))
            n = r.propTypes;
          else
            return;
          if (n) {
            var a = K(r);
            Et(n, e.props, "prop", a, e);
          } else if (r.PropTypes !== void 0 && !Me) {
            Me = !0;
            var o = K(r);
            f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function St(e) {
        {
          for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
            var a = r[n];
            if (a !== "children" && a !== "key") {
              ne(e), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), ne(null);
              break;
            }
          }
          e.ref !== null && (ne(e), f("Invalid attribute `ref` supplied to `React.Fragment`."), ne(null));
        }
      }
      function gr(e, r, n) {
        var a = tr(e);
        if (!a) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var c = Ct(r);
          c ? o += c : o += vr();
          var i;
          e === null ? i = "null" : me(e) ? i = "array" : e !== void 0 && e.$$typeof === b ? (i = "<" + (K(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : i = typeof e, f("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", i, o);
        }
        var l = Vr.apply(this, arguments);
        if (l == null)
          return l;
        if (a)
          for (var y = 2; y < arguments.length; y++)
            mr(arguments[y], e);
        return e === g ? St(l) : _r(l), l;
      }
      var br = !1;
      function Ot(e) {
        var r = gr.bind(null, e);
        return r.type = e, br || (br = !0, G("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return G("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function Tt(e, r, n) {
        for (var a = Nr.apply(this, arguments), o = 2; o < arguments.length; o++)
          mr(arguments[o], a.type);
        return _r(a), a;
      }
      function kt(e, r) {
        var n = B.transition;
        B.transition = {};
        var a = B.transition;
        B.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (B.transition = n, n === null && a._updatedFibers) {
            var o = a._updatedFibers.size;
            o > 10 && G("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), a._updatedFibers.clear();
          }
        }
      }
      var Er = !1, Se = null;
      function Pt(e) {
        if (Se === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), n = O && O[r];
            Se = n.call(O, "timers").setImmediate;
          } catch {
            Se = function(o) {
              Er === !1 && (Er = !0, typeof MessageChannel > "u" && f("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var c = new MessageChannel();
              c.port1.onmessage = o, c.port2.postMessage(void 0);
            };
          }
        return Se(e);
      }
      var ae = 0, Rr = !1;
      function At(e) {
        {
          var r = ae;
          ae++, j.current === null && (j.current = []);
          var n = j.isBatchingLegacy, a;
          try {
            if (j.isBatchingLegacy = !0, a = e(), !n && j.didScheduleLegacyUpdate) {
              var o = j.current;
              o !== null && (j.didScheduleLegacyUpdate = !1, Ne(o));
            }
          } catch (T) {
            throw Oe(r), T;
          } finally {
            j.isBatchingLegacy = n;
          }
          if (a !== null && typeof a == "object" && typeof a.then == "function") {
            var c = a, i = !1, l = {
              then: function(T, P) {
                i = !0, c.then(function(I) {
                  Oe(r), ae === 0 ? Ve(I, T, P) : T(I);
                }, function(I) {
                  Oe(r), P(I);
                });
              }
            };
            return !Rr && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              i || (Rr = !0, f("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), l;
          } else {
            var y = a;
            if (Oe(r), ae === 0) {
              var _ = j.current;
              _ !== null && (Ne(_), j.current = null);
              var w = {
                then: function(T, P) {
                  j.current === null ? (j.current = [], Ve(y, T, P)) : T(y);
                }
              };
              return w;
            } else {
              var S = {
                then: function(T, P) {
                  T(y);
                }
              };
              return S;
            }
          }
        }
      }
      function Oe(e) {
        e !== ae - 1 && f("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), ae = e;
      }
      function Ve(e, r, n) {
        {
          var a = j.current;
          if (a !== null)
            try {
              Ne(a), Pt(function() {
                a.length === 0 ? (j.current = null, r(e)) : Ve(e, r, n);
              });
            } catch (o) {
              n(o);
            }
          else
            r(e);
        }
      }
      var Ue = !1;
      function Ne(e) {
        if (!Ue) {
          Ue = !0;
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
            Ue = !1;
          }
        }
      }
      var jt = gr, Dt = Tt, It = Ot, $t = {
        map: be,
        forEach: Hr,
        count: Br,
        toArray: qr,
        only: Gr
      };
      s.Children = $t, s.Component = v, s.Fragment = g, s.Profiler = M, s.PureComponent = $, s.StrictMode = D, s.Suspense = x, s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = U, s.cloneElement = Dt, s.createContext = Kr, s.createElement = jt, s.createFactory = It, s.createRef = jr, s.forwardRef = Zr, s.isValidElement = te, s.lazy = Xr, s.memo = et, s.startTransition = kt, s.unstable_act = At, s.useCallback = st, s.useContext = rt, s.useDebugValue = lt, s.useDeferredValue = pt, s.useEffect = ot, s.useId = vt, s.useImperativeHandle = ft, s.useInsertionEffect = ut, s.useLayoutEffect = it, s.useMemo = ct, s.useReducer = nt, s.useRef = at, s.useState = tt, s.useSyncExternalStore = yt, s.useTransition = dt, s.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(le, le.exports)), le.exports;
}
process.env.NODE_ENV === "production" ? Ye.exports = Mt() : Ye.exports = Vt();
var ke = Ye.exports;
function Ut(O, s) {
  let [h, b] = ke.useState(() => s(O.read()));
  return ke.useEffect(() => {
    const A = (g) => {
      const D = s(g);
      Object.is(h, D) || (h = D, b(D));
    };
    return A(O.read()), O.watch(A);
  }, [O, s]), h;
}
const Pr = "____REQUEST_CACHE", Nt = { isLoading: !1, loadingState: "NEVER_LOADED" }, H = (O, s) => O[s], Ar = (O, s, h, b) => {
  var A, g;
  return (g = (A = H(O, s)) == null ? void 0 : A[h]) == null ? void 0 : g[b];
}, Wt = async (O, s, h, b, A) => {
  var M, N, V, W;
  const g = s.read(), D = () => Ar(g, h, b, A);
  D() === void 0 ? s.write({
    ...g,
    [h]: {
      ...H(g, h),
      [b]: {
        ...((M = H(g, h)) == null ? void 0 : M[b]) ?? {},
        [A]: { isLoading: !0, loadingState: "LOADING" }
      }
    }
  }) : s.write({
    ...g,
    [h]: {
      ...H(g, h),
      [b]: {
        ...((N = H(g, h)) == null ? void 0 : N[b]) ?? {},
        [A]: { ...D(), isLoading: !0, loadingState: "LOADING" }
      }
    }
  });
  try {
    const x = await O;
    return s.write({
      ...g,
      [h]: {
        ...H(g, h),
        [b]: {
          ...((V = H(g, h)) == null ? void 0 : V[b]) ?? {},
          [A]: { ...D(), data: x, isLoading: !1, loadingState: "LOADED" }
        }
      }
    }), x;
  } catch (x) {
    return s.write({
      ...g,
      [h]: {
        ...H(g, h),
        [b]: {
          ...((W = H(g, h)) == null ? void 0 : W[b]) ?? {},
          [A]: { ...D(), error: x, isLoading: !1, loadingState: "ERROR" }
        }
      }
    }), x;
  }
}, zt = (O, s, ...h) => {
  const b = ke.useMemo(() => Or(s), [s]), A = ke.useMemo(() => Or(h), [h]), D = Ut(O, ((N) => (V) => Ar(
    V,
    Pr,
    b,
    N
  ))(A)) ?? Nt, M = async () => await Wt(s(...h), O, Pr, b, A);
  return D.loadingState === "NEVER_LOADED" && b !== void 0 && h !== void 0 && h.length > 0 && M(), [D, M];
};
export {
  Wt as requestHandler,
  zt as useRequest
};
