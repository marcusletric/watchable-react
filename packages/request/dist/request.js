import { useSelected as gn } from "@watchable/store-react";
import { useMemo as ln } from "react";
const cn = "____REQUEST_CACHE", yn = { isLoading: !1, loadingState: "NEVER_LOADED" }, P = (q, J) => q[J], hn = (q, J, m, x) => {
  var L, I;
  return (I = (L = P(q, J)) == null ? void 0 : L[m]) == null ? void 0 : I[x];
}, wn = async (q, J, m, x, L) => {
  var O, F, C, R;
  const I = J.read(), M = () => hn(I, m, x, L);
  M() === void 0 ? J.write({
    ...I,
    [m]: {
      ...P(I, m),
      [x]: {
        ...((O = P(I, m)) == null ? void 0 : O[x]) ?? {},
        [L]: { isLoading: !0, loadingState: "LOADING" }
      }
    }
  }) : J.write({
    ...I,
    [m]: {
      ...P(I, m),
      [x]: {
        ...((F = P(I, m)) == null ? void 0 : F[x]) ?? {},
        [L]: { ...M(), isLoading: !0, loadingState: "LOADING" }
      }
    }
  });
  try {
    const V = await q;
    return J.write({
      ...I,
      [m]: {
        ...P(I, m),
        [x]: {
          ...((C = P(I, m)) == null ? void 0 : C[x]) ?? {},
          [L]: { ...M(), data: V, isLoading: !1, loadingState: "LOADED" }
        }
      }
    }), V;
  } catch (V) {
    return J.write({
      ...I,
      [m]: {
        ...P(I, m),
        [x]: {
          ...((R = P(I, m)) == null ? void 0 : R[x]) ?? {},
          [L]: { ...M(), error: V, isLoading: !1, loadingState: "ERROR" }
        }
      }
    }), V;
  }
};
function bn(q) {
  return q && q.__esModule && Object.prototype.hasOwnProperty.call(q, "default") ? q.default : q;
}
function rn(q) {
  throw new Error('Could not dynamically require "' + q + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var pn = { exports: {} };
(function(q, J) {
  (function(m) {
    q.exports = m();
  })(function() {
    return function m(x, L, I) {
      function M(C, R) {
        if (!L[C]) {
          if (!x[C]) {
            var V = typeof rn == "function" && rn;
            if (!R && V)
              return V(C, !0);
            if (O)
              return O(C, !0);
            throw new Error("Cannot find module '" + C + "'");
          }
          R = L[C] = { exports: {} }, x[C][0].call(R.exports, function(Q) {
            var X = x[C][1][Q];
            return M(X || Q);
          }, R, R.exports, m, x, L, I);
        }
        return L[C].exports;
      }
      for (var O = typeof rn == "function" && rn, F = 0; F < I.length; F++)
        M(I[F]);
      return M;
    }({ 1: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        var y = m("crypto");
        function E(s, f) {
          f = v(s, f);
          var r;
          return (r = f.algorithm !== "passthrough" ? y.createHash(f.algorithm) : new A()).write === void 0 && (r.write = r.update, r.end = r.update), h(f, r).dispatch(s), r.update || r.end(""), r.digest ? r.digest(f.encoding === "buffer" ? void 0 : f.encoding) : (s = r.read(), f.encoding !== "buffer" ? s.toString(f.encoding) : s);
        }
        (L = x.exports = E).sha1 = function(s) {
          return E(s);
        }, L.keys = function(s) {
          return E(s, { excludeValues: !0, algorithm: "sha1", encoding: "hex" });
        }, L.MD5 = function(s) {
          return E(s, { algorithm: "md5", encoding: "hex" });
        }, L.keysMD5 = function(s) {
          return E(s, { algorithm: "md5", encoding: "hex", excludeValues: !0 });
        };
        var l = y.getHashes ? y.getHashes().slice() : ["sha1", "md5"], p = (l.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
        function v(s, f) {
          var r = {};
          if (r.algorithm = (f = f || {}).algorithm || "sha1", r.encoding = f.encoding || "hex", r.excludeValues = !!f.excludeValues, r.algorithm = r.algorithm.toLowerCase(), r.encoding = r.encoding.toLowerCase(), r.ignoreUnknown = f.ignoreUnknown === !0, r.respectType = f.respectType !== !1, r.respectFunctionNames = f.respectFunctionNames !== !1, r.respectFunctionProperties = f.respectFunctionProperties !== !1, r.unorderedArrays = f.unorderedArrays === !0, r.unorderedSets = f.unorderedSets !== !1, r.unorderedObjects = f.unorderedObjects !== !1, r.replacer = f.replacer || void 0, r.excludeKeys = f.excludeKeys || void 0, s === void 0)
            throw new Error("Object argument required.");
          for (var o = 0; o < l.length; ++o)
            l[o].toLowerCase() === r.algorithm.toLowerCase() && (r.algorithm = l[o]);
          if (l.indexOf(r.algorithm) === -1)
            throw new Error('Algorithm "' + r.algorithm + '"  not supported. supported values: ' + l.join(", "));
          if (p.indexOf(r.encoding) === -1 && r.algorithm !== "passthrough")
            throw new Error('Encoding "' + r.encoding + '"  not supported. supported values: ' + p.join(", "));
          return r;
        }
        function g(s) {
          if (typeof s == "function")
            return /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(s)) != null;
        }
        function h(s, f, r) {
          r = r || [];
          function o(t) {
            return f.update ? f.update(t, "utf8") : f.write(t, "utf8");
          }
          return { dispatch: function(t) {
            return this["_" + ((t = s.replacer ? s.replacer(t) : t) === null ? "null" : typeof t)](t);
          }, _object: function(t) {
            var u, a = Object.prototype.toString.call(t), S = /\[object (.*)\]/i.exec(a);
            if (S = (S = S ? S[1] : "unknown:[" + a + "]").toLowerCase(), 0 <= (a = r.indexOf(t)))
              return this.dispatch("[CIRCULAR:" + a + "]");
            if (r.push(t), O !== void 0 && O.isBuffer && O.isBuffer(t))
              return o("buffer:"), o(t);
            if (S === "object" || S === "function" || S === "asyncfunction")
              return a = Object.keys(t), s.unorderedObjects && (a = a.sort()), s.respectType === !1 || g(t) || a.splice(0, 0, "prototype", "__proto__", "constructor"), s.excludeKeys && (a = a.filter(function(B) {
                return !s.excludeKeys(B);
              })), o("object:" + a.length + ":"), u = this, a.forEach(function(B) {
                u.dispatch(B), o(":"), s.excludeValues || u.dispatch(t[B]), o(",");
              });
            if (!this["_" + S]) {
              if (s.ignoreUnknown)
                return o("[" + S + "]");
              throw new Error('Unknown object type "' + S + '"');
            }
            this["_" + S](t);
          }, _array: function(t, B) {
            B = B !== void 0 ? B : s.unorderedArrays !== !1;
            var a = this;
            if (o("array:" + t.length + ":"), !B || t.length <= 1)
              return t.forEach(function(U) {
                return a.dispatch(U);
              });
            var S = [], B = t.map(function(U) {
              var _ = new A(), T = r.slice();
              return h(s, _, T).dispatch(U), S = S.concat(T.slice(r.length)), _.read().toString();
            });
            return r = r.concat(S), B.sort(), this._array(B, !1);
          }, _date: function(t) {
            return o("date:" + t.toJSON());
          }, _symbol: function(t) {
            return o("symbol:" + t.toString());
          }, _error: function(t) {
            return o("error:" + t.toString());
          }, _boolean: function(t) {
            return o("bool:" + t.toString());
          }, _string: function(t) {
            o("string:" + t.length + ":"), o(t.toString());
          }, _function: function(t) {
            o("fn:"), g(t) ? this.dispatch("[native]") : this.dispatch(t.toString()), s.respectFunctionNames !== !1 && this.dispatch("function-name:" + String(t.name)), s.respectFunctionProperties && this._object(t);
          }, _number: function(t) {
            return o("number:" + t.toString());
          }, _xml: function(t) {
            return o("xml:" + t.toString());
          }, _null: function() {
            return o("Null");
          }, _undefined: function() {
            return o("Undefined");
          }, _regexp: function(t) {
            return o("regex:" + t.toString());
          }, _uint8array: function(t) {
            return o("uint8array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _uint8clampedarray: function(t) {
            return o("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(t));
          }, _int8array: function(t) {
            return o("int8array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _uint16array: function(t) {
            return o("uint16array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _int16array: function(t) {
            return o("int16array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _uint32array: function(t) {
            return o("uint32array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _int32array: function(t) {
            return o("int32array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _float32array: function(t) {
            return o("float32array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _float64array: function(t) {
            return o("float64array:"), this.dispatch(Array.prototype.slice.call(t));
          }, _arraybuffer: function(t) {
            return o("arraybuffer:"), this.dispatch(new Uint8Array(t));
          }, _url: function(t) {
            return o("url:" + t.toString());
          }, _map: function(t) {
            return o("map:"), t = Array.from(t), this._array(t, s.unorderedSets !== !1);
          }, _set: function(t) {
            return o("set:"), t = Array.from(t), this._array(t, s.unorderedSets !== !1);
          }, _file: function(t) {
            return o("file:"), this.dispatch([t.name, t.size, t.type, t.lastModfied]);
          }, _blob: function() {
            if (s.ignoreUnknown)
              return o("[blob]");
            throw Error(`Hashing Blob objects is currently not supported
(see https://github.com/puleos/object-hash/issues/26)
Use "options.replacer" or "options.ignoreUnknown"
`);
          }, _domwindow: function() {
            return o("domwindow");
          }, _bigint: function(t) {
            return o("bigint:" + t.toString());
          }, _process: function() {
            return o("process");
          }, _timer: function() {
            return o("timer");
          }, _pipe: function() {
            return o("pipe");
          }, _tcp: function() {
            return o("tcp");
          }, _udp: function() {
            return o("udp");
          }, _tty: function() {
            return o("tty");
          }, _statwatcher: function() {
            return o("statwatcher");
          }, _securecontext: function() {
            return o("securecontext");
          }, _connection: function() {
            return o("connection");
          }, _zlib: function() {
            return o("zlib");
          }, _context: function() {
            return o("context");
          }, _nodescript: function() {
            return o("nodescript");
          }, _httpparser: function() {
            return o("httpparser");
          }, _dataview: function() {
            return o("dataview");
          }, _signal: function() {
            return o("signal");
          }, _fsevent: function() {
            return o("fsevent");
          }, _tlswrap: function() {
            return o("tlswrap");
          } };
        }
        function A() {
          return { buf: "", write: function(s) {
            this.buf += s;
          }, end: function(s) {
            this.buf += s;
          }, read: function() {
            return this.buf;
          } };
        }
        L.writeToStream = function(s, f, r) {
          return r === void 0 && (r = f, f = {}), h(f = v(s, f), r).dispatch(s);
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
    }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        (function(y) {
          var E = typeof Uint8Array < "u" ? Uint8Array : Array, l = "+".charCodeAt(0), p = "/".charCodeAt(0), v = "0".charCodeAt(0), g = "a".charCodeAt(0), h = "A".charCodeAt(0), A = "-".charCodeAt(0), s = "_".charCodeAt(0);
          function f(r) {
            return r = r.charCodeAt(0), r === l || r === A ? 62 : r === p || r === s ? 63 : r < v ? -1 : r < v + 10 ? r - v + 26 + 26 : r < h + 26 ? r - h : r < g + 26 ? r - g + 26 : void 0;
          }
          y.toByteArray = function(r) {
            var o, t;
            if (0 < r.length % 4)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var u = r.length, u = r.charAt(u - 2) === "=" ? 2 : r.charAt(u - 1) === "=" ? 1 : 0, a = new E(3 * r.length / 4 - u), S = 0 < u ? r.length - 4 : r.length, B = 0;
            function U(_) {
              a[B++] = _;
            }
            for (o = 0; o < S; o += 4, 0)
              U((16711680 & (t = f(r.charAt(o)) << 18 | f(r.charAt(o + 1)) << 12 | f(r.charAt(o + 2)) << 6 | f(r.charAt(o + 3)))) >> 16), U((65280 & t) >> 8), U(255 & t);
            return u == 2 ? U(255 & (t = f(r.charAt(o)) << 2 | f(r.charAt(o + 1)) >> 4)) : u == 1 && (U((t = f(r.charAt(o)) << 10 | f(r.charAt(o + 1)) << 4 | f(r.charAt(o + 2)) >> 2) >> 8 & 255), U(255 & t)), a;
          }, y.fromByteArray = function(r) {
            var o, t, u, a, S = r.length % 3, B = "";
            function U(_) {
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(_);
            }
            for (o = 0, u = r.length - S; o < u; o += 3)
              t = (r[o] << 16) + (r[o + 1] << 8) + r[o + 2], B += U((a = t) >> 18 & 63) + U(a >> 12 & 63) + U(a >> 6 & 63) + U(63 & a);
            switch (S) {
              case 1:
                B = (B += U((t = r[r.length - 1]) >> 2)) + U(t << 4 & 63) + "==";
                break;
              case 2:
                B = (B = (B += U((t = (r[r.length - 2] << 8) + r[r.length - 1]) >> 10)) + U(t >> 4 & 63)) + U(t << 2 & 63) + "=";
            }
            return B;
          };
        })(L === void 0 ? this.base64js = {} : L);
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
    }, { buffer: 3, lYpoI2: 11 }], 3: [function(m, x, L) {
      (function(I, M, l, F, C, R, V, Q, X) {
        var y = m("base64-js"), E = m("ieee754");
        function l(n, e, i) {
          if (!(this instanceof l))
            return new l(n, e, i);
          var d, c, b, j, Y = typeof n;
          if (e === "base64" && Y == "string")
            for (n = (j = n).trim ? j.trim() : j.replace(/^\s+|\s+$/g, ""); n.length % 4 != 0; )
              n += "=";
          if (Y == "number")
            d = z(n);
          else if (Y == "string")
            d = l.byteLength(n, e);
          else {
            if (Y != "object")
              throw new Error("First argument needs to be a number, array or string.");
            d = z(n.length);
          }
          if (l._useTypedArrays ? c = l._augment(new Uint8Array(d)) : ((c = this).length = d, c._isBuffer = !0), l._useTypedArrays && typeof n.byteLength == "number")
            c._set(n);
          else if (D(j = n) || l.isBuffer(j) || j && typeof j == "object" && typeof j.length == "number")
            for (b = 0; b < d; b++)
              l.isBuffer(n) ? c[b] = n.readUInt8(b) : c[b] = n[b];
          else if (Y == "string")
            c.write(n, 0, e);
          else if (Y == "number" && !l._useTypedArrays && !i)
            for (b = 0; b < d; b++)
              c[b] = 0;
          return c;
        }
        function p(n, e, i, d) {
          return l._charsWritten = tn(function(c) {
            for (var b = [], j = 0; j < c.length; j++)
              b.push(255 & c.charCodeAt(j));
            return b;
          }(e), n, i, d);
        }
        function v(n, e, i, d) {
          return l._charsWritten = tn(function(c) {
            for (var b, j, Y = [], H = 0; H < c.length; H++)
              j = c.charCodeAt(H), b = j >> 8, j = j % 256, Y.push(j), Y.push(b);
            return Y;
          }(e), n, i, d);
        }
        function g(n, e, i) {
          var d = "";
          i = Math.min(n.length, i);
          for (var c = e; c < i; c++)
            d += String.fromCharCode(n[c]);
          return d;
        }
        function h(n, e, i, b) {
          b || (w(typeof i == "boolean", "missing or invalid endian"), w(e != null, "missing offset"), w(e + 1 < n.length, "Trying to read beyond buffer length"));
          var c, b = n.length;
          if (!(b <= e))
            return i ? (c = n[e], e + 1 < b && (c |= n[e + 1] << 8)) : (c = n[e] << 8, e + 1 < b && (c |= n[e + 1])), c;
        }
        function A(n, e, i, b) {
          b || (w(typeof i == "boolean", "missing or invalid endian"), w(e != null, "missing offset"), w(e + 3 < n.length, "Trying to read beyond buffer length"));
          var c, b = n.length;
          if (!(b <= e))
            return i ? (e + 2 < b && (c = n[e + 2] << 16), e + 1 < b && (c |= n[e + 1] << 8), c |= n[e], e + 3 < b && (c += n[e + 3] << 24 >>> 0)) : (e + 1 < b && (c = n[e + 1] << 16), e + 2 < b && (c |= n[e + 2] << 8), e + 3 < b && (c |= n[e + 3]), c += n[e] << 24 >>> 0), c;
        }
        function s(n, e, i, d) {
          if (d || (w(typeof i == "boolean", "missing or invalid endian"), w(e != null, "missing offset"), w(e + 1 < n.length, "Trying to read beyond buffer length")), !(n.length <= e))
            return d = h(n, e, i, !0), 32768 & d ? -1 * (65535 - d + 1) : d;
        }
        function f(n, e, i, d) {
          if (d || (w(typeof i == "boolean", "missing or invalid endian"), w(e != null, "missing offset"), w(e + 3 < n.length, "Trying to read beyond buffer length")), !(n.length <= e))
            return d = A(n, e, i, !0), 2147483648 & d ? -1 * (4294967295 - d + 1) : d;
        }
        function r(n, e, i, d) {
          return d || (w(typeof i == "boolean", "missing or invalid endian"), w(e + 3 < n.length, "Trying to read beyond buffer length")), E.read(n, e, i, 23, 4);
        }
        function o(n, e, i, d) {
          return d || (w(typeof i == "boolean", "missing or invalid endian"), w(e + 7 < n.length, "Trying to read beyond buffer length")), E.read(n, e, i, 52, 8);
        }
        function t(n, e, i, d, c) {
          if (c || (w(e != null, "missing value"), w(typeof d == "boolean", "missing or invalid endian"), w(i != null, "missing offset"), w(i + 1 < n.length, "trying to write beyond buffer length"), en(e, 65535)), c = n.length, !(c <= i))
            for (var b = 0, j = Math.min(c - i, 2); b < j; b++)
              n[i + b] = (e & 255 << 8 * (d ? b : 1 - b)) >>> 8 * (d ? b : 1 - b);
        }
        function u(n, e, i, d, c) {
          if (c || (w(e != null, "missing value"), w(typeof d == "boolean", "missing or invalid endian"), w(i != null, "missing offset"), w(i + 3 < n.length, "trying to write beyond buffer length"), en(e, 4294967295)), c = n.length, !(c <= i))
            for (var b = 0, j = Math.min(c - i, 4); b < j; b++)
              n[i + b] = e >>> 8 * (d ? b : 3 - b) & 255;
        }
        function a(n, e, i, d, c) {
          c || (w(e != null, "missing value"), w(typeof d == "boolean", "missing or invalid endian"), w(i != null, "missing offset"), w(i + 1 < n.length, "Trying to write beyond buffer length"), on(e, 32767, -32768)), n.length <= i || t(n, 0 <= e ? e : 65535 + e + 1, i, d, c);
        }
        function S(n, e, i, d, c) {
          c || (w(e != null, "missing value"), w(typeof d == "boolean", "missing or invalid endian"), w(i != null, "missing offset"), w(i + 3 < n.length, "Trying to write beyond buffer length"), on(e, 2147483647, -2147483648)), n.length <= i || u(n, 0 <= e ? e : 4294967295 + e + 1, i, d, c);
        }
        function B(n, e, i, d, c) {
          c || (w(e != null, "missing value"), w(typeof d == "boolean", "missing or invalid endian"), w(i != null, "missing offset"), w(i + 3 < n.length, "Trying to write beyond buffer length"), an(e, 34028234663852886e22, -34028234663852886e22)), n.length <= i || E.write(n, e, i, d, 23, 4);
        }
        function U(n, e, i, d, c) {
          c || (w(e != null, "missing value"), w(typeof d == "boolean", "missing or invalid endian"), w(i != null, "missing offset"), w(i + 7 < n.length, "Trying to write beyond buffer length"), an(e, 17976931348623157e292, -17976931348623157e292)), n.length <= i || E.write(n, e, i, d, 52, 8);
        }
        L.Buffer = l, L.SlowBuffer = l, L.INSPECT_MAX_BYTES = 50, l.poolSize = 8192, l._useTypedArrays = function() {
          try {
            var n = new ArrayBuffer(0), e = new Uint8Array(n);
            return e.foo = function() {
              return 42;
            }, e.foo() === 42 && typeof e.subarray == "function";
          } catch {
            return !1;
          }
        }(), l.isEncoding = function(n) {
          switch (String(n).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }, l.isBuffer = function(n) {
          return !(n == null || !n._isBuffer);
        }, l.byteLength = function(n, e) {
          var i;
          switch (n += "", e || "utf8") {
            case "hex":
              i = n.length / 2;
              break;
            case "utf8":
            case "utf-8":
              i = Z(n).length;
              break;
            case "ascii":
            case "binary":
            case "raw":
              i = n.length;
              break;
            case "base64":
              i = sn(n).length;
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              i = 2 * n.length;
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return i;
        }, l.concat = function(n, e) {
          if (w(D(n), `Usage: Buffer.concat(list, [totalLength])
list should be an Array.`), n.length === 0)
            return new l(0);
          if (n.length === 1)
            return n[0];
          if (typeof e != "number")
            for (c = e = 0; c < n.length; c++)
              e += n[c].length;
          for (var i = new l(e), d = 0, c = 0; c < n.length; c++) {
            var b = n[c];
            b.copy(i, d), d += b.length;
          }
          return i;
        }, l.prototype.write = function(n, e, i, d) {
          isFinite(e) ? isFinite(i) || (d = i, i = void 0) : (H = d, d = e, e = i, i = H), e = Number(e) || 0;
          var c, b, j, Y, H = this.length - e;
          switch ((!i || H < (i = Number(i))) && (i = H), d = String(d || "utf8").toLowerCase()) {
            case "hex":
              c = function($, K, G, W) {
                G = Number(G) || 0;
                var N = $.length - G;
                (!W || N < (W = Number(W))) && (W = N), w((N = K.length) % 2 == 0, "Invalid hex string"), N / 2 < W && (W = N / 2);
                for (var nn = 0; nn < W; nn++) {
                  var fn = parseInt(K.substr(2 * nn, 2), 16);
                  w(!isNaN(fn), "Invalid hex string"), $[G + nn] = fn;
                }
                return l._charsWritten = 2 * nn, nn;
              }(this, n, e, i);
              break;
            case "utf8":
            case "utf-8":
              b = this, j = e, Y = i, c = l._charsWritten = tn(Z(n), b, j, Y);
              break;
            case "ascii":
            case "binary":
              c = p(this, n, e, i);
              break;
            case "base64":
              b = this, j = e, Y = i, c = l._charsWritten = tn(sn(n), b, j, Y);
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              c = v(this, n, e, i);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return c;
        }, l.prototype.toString = function(n, e, i) {
          var d, c, b, j, Y = this;
          if (n = String(n || "utf8").toLowerCase(), e = Number(e) || 0, (i = i !== void 0 ? Number(i) : Y.length) === e)
            return "";
          switch (n) {
            case "hex":
              d = function(H, $, K) {
                var G = H.length;
                (!$ || $ < 0) && ($ = 0), (!K || K < 0 || G < K) && (K = G);
                for (var W = "", N = $; N < K; N++)
                  W += k(H[N]);
                return W;
              }(Y, e, i);
              break;
            case "utf8":
            case "utf-8":
              d = function(H, $, K) {
                var G = "", W = "";
                K = Math.min(H.length, K);
                for (var N = $; N < K; N++)
                  H[N] <= 127 ? (G += un(W) + String.fromCharCode(H[N]), W = "") : W += "%" + H[N].toString(16);
                return G + un(W);
              }(Y, e, i);
              break;
            case "ascii":
            case "binary":
              d = g(Y, e, i);
              break;
            case "base64":
              c = Y, j = i, d = (b = e) === 0 && j === c.length ? y.fromByteArray(c) : y.fromByteArray(c.slice(b, j));
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              d = function(H, $, K) {
                for (var G = H.slice($, K), W = "", N = 0; N < G.length; N += 2)
                  W += String.fromCharCode(G[N] + 256 * G[N + 1]);
                return W;
              }(Y, e, i);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return d;
        }, l.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        }, l.prototype.copy = function(n, e, i, d) {
          if (e = e || 0, (d = d || d === 0 ? d : this.length) !== (i = i || 0) && n.length !== 0 && this.length !== 0) {
            w(i <= d, "sourceEnd < sourceStart"), w(0 <= e && e < n.length, "targetStart out of bounds"), w(0 <= i && i < this.length, "sourceStart out of bounds"), w(0 <= d && d <= this.length, "sourceEnd out of bounds"), d > this.length && (d = this.length);
            var c = (d = n.length - e < d - i ? n.length - e + i : d) - i;
            if (c < 100 || !l._useTypedArrays)
              for (var b = 0; b < c; b++)
                n[b + e] = this[b + i];
            else
              n._set(this.subarray(i, i + c), e);
          }
        }, l.prototype.slice = function(n, e) {
          var i = this.length;
          if (n = T(n, i, 0), e = T(e, i, i), l._useTypedArrays)
            return l._augment(this.subarray(n, e));
          for (var d = e - n, c = new l(d, void 0, !0), b = 0; b < d; b++)
            c[b] = this[b + n];
          return c;
        }, l.prototype.get = function(n) {
          return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(n);
        }, l.prototype.set = function(n, e) {
          return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(n, e);
        }, l.prototype.readUInt8 = function(n, e) {
          if (e || (w(n != null, "missing offset"), w(n < this.length, "Trying to read beyond buffer length")), !(n >= this.length))
            return this[n];
        }, l.prototype.readUInt16LE = function(n, e) {
          return h(this, n, !0, e);
        }, l.prototype.readUInt16BE = function(n, e) {
          return h(this, n, !1, e);
        }, l.prototype.readUInt32LE = function(n, e) {
          return A(this, n, !0, e);
        }, l.prototype.readUInt32BE = function(n, e) {
          return A(this, n, !1, e);
        }, l.prototype.readInt8 = function(n, e) {
          if (e || (w(n != null, "missing offset"), w(n < this.length, "Trying to read beyond buffer length")), !(n >= this.length))
            return 128 & this[n] ? -1 * (255 - this[n] + 1) : this[n];
        }, l.prototype.readInt16LE = function(n, e) {
          return s(this, n, !0, e);
        }, l.prototype.readInt16BE = function(n, e) {
          return s(this, n, !1, e);
        }, l.prototype.readInt32LE = function(n, e) {
          return f(this, n, !0, e);
        }, l.prototype.readInt32BE = function(n, e) {
          return f(this, n, !1, e);
        }, l.prototype.readFloatLE = function(n, e) {
          return r(this, n, !0, e);
        }, l.prototype.readFloatBE = function(n, e) {
          return r(this, n, !1, e);
        }, l.prototype.readDoubleLE = function(n, e) {
          return o(this, n, !0, e);
        }, l.prototype.readDoubleBE = function(n, e) {
          return o(this, n, !1, e);
        }, l.prototype.writeUInt8 = function(n, e, i) {
          i || (w(n != null, "missing value"), w(e != null, "missing offset"), w(e < this.length, "trying to write beyond buffer length"), en(n, 255)), e >= this.length || (this[e] = n);
        }, l.prototype.writeUInt16LE = function(n, e, i) {
          t(this, n, e, !0, i);
        }, l.prototype.writeUInt16BE = function(n, e, i) {
          t(this, n, e, !1, i);
        }, l.prototype.writeUInt32LE = function(n, e, i) {
          u(this, n, e, !0, i);
        }, l.prototype.writeUInt32BE = function(n, e, i) {
          u(this, n, e, !1, i);
        }, l.prototype.writeInt8 = function(n, e, i) {
          i || (w(n != null, "missing value"), w(e != null, "missing offset"), w(e < this.length, "Trying to write beyond buffer length"), on(n, 127, -128)), e >= this.length || (0 <= n ? this.writeUInt8(n, e, i) : this.writeUInt8(255 + n + 1, e, i));
        }, l.prototype.writeInt16LE = function(n, e, i) {
          a(this, n, e, !0, i);
        }, l.prototype.writeInt16BE = function(n, e, i) {
          a(this, n, e, !1, i);
        }, l.prototype.writeInt32LE = function(n, e, i) {
          S(this, n, e, !0, i);
        }, l.prototype.writeInt32BE = function(n, e, i) {
          S(this, n, e, !1, i);
        }, l.prototype.writeFloatLE = function(n, e, i) {
          B(this, n, e, !0, i);
        }, l.prototype.writeFloatBE = function(n, e, i) {
          B(this, n, e, !1, i);
        }, l.prototype.writeDoubleLE = function(n, e, i) {
          U(this, n, e, !0, i);
        }, l.prototype.writeDoubleBE = function(n, e, i) {
          U(this, n, e, !1, i);
        }, l.prototype.fill = function(n, e, i) {
          if (e = e || 0, i = i || this.length, w(typeof (n = typeof (n = n || 0) == "string" ? n.charCodeAt(0) : n) == "number" && !isNaN(n), "value is not a number"), w(e <= i, "end < start"), i !== e && this.length !== 0) {
            w(0 <= e && e < this.length, "start out of bounds"), w(0 <= i && i <= this.length, "end out of bounds");
            for (var d = e; d < i; d++)
              this[d] = n;
          }
        }, l.prototype.inspect = function() {
          for (var n = [], e = this.length, i = 0; i < e; i++)
            if (n[i] = k(this[i]), i === L.INSPECT_MAX_BYTES) {
              n[i + 1] = "...";
              break;
            }
          return "<Buffer " + n.join(" ") + ">";
        }, l.prototype.toArrayBuffer = function() {
          if (typeof Uint8Array > "u")
            throw new Error("Buffer.toArrayBuffer not supported in this browser");
          if (l._useTypedArrays)
            return new l(this).buffer;
          for (var n = new Uint8Array(this.length), e = 0, i = n.length; e < i; e += 1)
            n[e] = this[e];
          return n.buffer;
        };
        var _ = l.prototype;
        function T(n, e, i) {
          return typeof n != "number" ? i : e <= (n = ~~n) ? e : 0 <= n || 0 <= (n += e) ? n : 0;
        }
        function z(n) {
          return (n = ~~Math.ceil(+n)) < 0 ? 0 : n;
        }
        function D(n) {
          return (Array.isArray || function(e) {
            return Object.prototype.toString.call(e) === "[object Array]";
          })(n);
        }
        function k(n) {
          return n < 16 ? "0" + n.toString(16) : n.toString(16);
        }
        function Z(n) {
          for (var e = [], i = 0; i < n.length; i++) {
            var d = n.charCodeAt(i);
            if (d <= 127)
              e.push(n.charCodeAt(i));
            else
              for (var c = i, b = (55296 <= d && d <= 57343 && i++, encodeURIComponent(n.slice(c, i + 1)).substr(1).split("%")), j = 0; j < b.length; j++)
                e.push(parseInt(b[j], 16));
          }
          return e;
        }
        function sn(n) {
          return y.toByteArray(n);
        }
        function tn(n, e, i, d) {
          for (var c = 0; c < d && !(c + i >= e.length || c >= n.length); c++)
            e[c + i] = n[c];
          return c;
        }
        function un(n) {
          try {
            return decodeURIComponent(n);
          } catch {
            return String.fromCharCode(65533);
          }
        }
        function en(n, e) {
          w(typeof n == "number", "cannot write a non-number as a number"), w(0 <= n, "specified a negative value for writing an unsigned value"), w(n <= e, "value is larger than maximum value for type"), w(Math.floor(n) === n, "value has a fractional component");
        }
        function on(n, e, i) {
          w(typeof n == "number", "cannot write a non-number as a number"), w(n <= e, "value larger than maximum allowed value"), w(i <= n, "value smaller than minimum allowed value"), w(Math.floor(n) === n, "value has a fractional component");
        }
        function an(n, e, i) {
          w(typeof n == "number", "cannot write a non-number as a number"), w(n <= e, "value larger than maximum allowed value"), w(i <= n, "value smaller than minimum allowed value");
        }
        function w(n, e) {
          if (!n)
            throw new Error(e || "Failed assertion");
        }
        l._augment = function(n) {
          return n._isBuffer = !0, n._get = n.get, n._set = n.set, n.get = _.get, n.set = _.set, n.write = _.write, n.toString = _.toString, n.toLocaleString = _.toString, n.toJSON = _.toJSON, n.copy = _.copy, n.slice = _.slice, n.readUInt8 = _.readUInt8, n.readUInt16LE = _.readUInt16LE, n.readUInt16BE = _.readUInt16BE, n.readUInt32LE = _.readUInt32LE, n.readUInt32BE = _.readUInt32BE, n.readInt8 = _.readInt8, n.readInt16LE = _.readInt16LE, n.readInt16BE = _.readInt16BE, n.readInt32LE = _.readInt32LE, n.readInt32BE = _.readInt32BE, n.readFloatLE = _.readFloatLE, n.readFloatBE = _.readFloatBE, n.readDoubleLE = _.readDoubleLE, n.readDoubleBE = _.readDoubleBE, n.writeUInt8 = _.writeUInt8, n.writeUInt16LE = _.writeUInt16LE, n.writeUInt16BE = _.writeUInt16BE, n.writeUInt32LE = _.writeUInt32LE, n.writeUInt32BE = _.writeUInt32BE, n.writeInt8 = _.writeInt8, n.writeInt16LE = _.writeInt16LE, n.writeInt16BE = _.writeInt16BE, n.writeInt32LE = _.writeInt32LE, n.writeInt32BE = _.writeInt32BE, n.writeFloatLE = _.writeFloatLE, n.writeFloatBE = _.writeFloatBE, n.writeDoubleLE = _.writeDoubleLE, n.writeDoubleBE = _.writeDoubleBE, n.fill = _.fill, n.inspect = _.inspect, n.toArrayBuffer = _.toArrayBuffer, n;
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
    }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(m, x, L) {
      (function(I, M, y, F, C, R, V, Q, X) {
        var y = m("buffer").Buffer, E = 4, l = new y(E);
        l.fill(0), x.exports = { hash: function(p, v, g, h) {
          for (var A = v(function(t, u) {
            t.length % E != 0 && (a = t.length + (E - t.length % E), t = y.concat([t, l], a));
            for (var a, S = [], B = u ? t.readInt32BE : t.readInt32LE, U = 0; U < t.length; U += E)
              S.push(B.call(t, U));
            return S;
          }(p = y.isBuffer(p) ? p : new y(p), h), 8 * p.length), v = h, s = new y(g), f = v ? s.writeInt32BE : s.writeInt32LE, r = 0; r < A.length; r++)
            f.call(s, A[r], 4 * r, !0);
          return s;
        } };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 5: [function(m, x, L) {
      (function(I, M, y, F, C, R, V, Q, X) {
        var y = m("buffer").Buffer, E = m("./sha"), l = m("./sha256"), p = m("./rng"), v = { sha1: E, sha256: l, md5: m("./md5") }, g = 64, h = new y(g);
        function A(t, u) {
          var a = v[t = t || "sha1"], S = [];
          return a || s("algorithm:", t, "is not yet supported"), { update: function(B) {
            return y.isBuffer(B) || (B = new y(B)), S.push(B), B.length, this;
          }, digest: function(B) {
            var U = y.concat(S), U = u ? function(_, T, z) {
              y.isBuffer(T) || (T = new y(T)), y.isBuffer(z) || (z = new y(z)), T.length > g ? T = _(T) : T.length < g && (T = y.concat([T, h], g));
              for (var D = new y(g), k = new y(g), Z = 0; Z < g; Z++)
                D[Z] = 54 ^ T[Z], k[Z] = 92 ^ T[Z];
              return z = _(y.concat([D, z])), _(y.concat([k, z]));
            }(a, u, U) : a(U);
            return S = null, B ? U.toString(B) : U;
          } };
        }
        function s() {
          var t = [].slice.call(arguments).join(" ");
          throw new Error([t, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join(`
`));
        }
        h.fill(0), L.createHash = function(t) {
          return A(t);
        }, L.createHmac = A, L.randomBytes = function(t, u) {
          if (!u || !u.call)
            return new y(p(t));
          try {
            u.call(this, void 0, new y(p(t)));
          } catch (a) {
            u(a);
          }
        };
        var f, r = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], o = function(t) {
          L[t] = function() {
            s("sorry,", t, "is not implemented yet");
          };
        };
        for (f in r)
          o(r[f]);
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        var y = m("./helpers");
        function E(s, f) {
          s[f >> 5] |= 128 << f % 32, s[14 + (f + 64 >>> 9 << 4)] = f;
          for (var r = 1732584193, o = -271733879, t = -1732584194, u = 271733878, a = 0; a < s.length; a += 16) {
            var S = r, B = o, U = t, _ = u, r = p(r, o, t, u, s[a + 0], 7, -680876936), u = p(u, r, o, t, s[a + 1], 12, -389564586), t = p(t, u, r, o, s[a + 2], 17, 606105819), o = p(o, t, u, r, s[a + 3], 22, -1044525330);
            r = p(r, o, t, u, s[a + 4], 7, -176418897), u = p(u, r, o, t, s[a + 5], 12, 1200080426), t = p(t, u, r, o, s[a + 6], 17, -1473231341), o = p(o, t, u, r, s[a + 7], 22, -45705983), r = p(r, o, t, u, s[a + 8], 7, 1770035416), u = p(u, r, o, t, s[a + 9], 12, -1958414417), t = p(t, u, r, o, s[a + 10], 17, -42063), o = p(o, t, u, r, s[a + 11], 22, -1990404162), r = p(r, o, t, u, s[a + 12], 7, 1804603682), u = p(u, r, o, t, s[a + 13], 12, -40341101), t = p(t, u, r, o, s[a + 14], 17, -1502002290), r = v(r, o = p(o, t, u, r, s[a + 15], 22, 1236535329), t, u, s[a + 1], 5, -165796510), u = v(u, r, o, t, s[a + 6], 9, -1069501632), t = v(t, u, r, o, s[a + 11], 14, 643717713), o = v(o, t, u, r, s[a + 0], 20, -373897302), r = v(r, o, t, u, s[a + 5], 5, -701558691), u = v(u, r, o, t, s[a + 10], 9, 38016083), t = v(t, u, r, o, s[a + 15], 14, -660478335), o = v(o, t, u, r, s[a + 4], 20, -405537848), r = v(r, o, t, u, s[a + 9], 5, 568446438), u = v(u, r, o, t, s[a + 14], 9, -1019803690), t = v(t, u, r, o, s[a + 3], 14, -187363961), o = v(o, t, u, r, s[a + 8], 20, 1163531501), r = v(r, o, t, u, s[a + 13], 5, -1444681467), u = v(u, r, o, t, s[a + 2], 9, -51403784), t = v(t, u, r, o, s[a + 7], 14, 1735328473), r = g(r, o = v(o, t, u, r, s[a + 12], 20, -1926607734), t, u, s[a + 5], 4, -378558), u = g(u, r, o, t, s[a + 8], 11, -2022574463), t = g(t, u, r, o, s[a + 11], 16, 1839030562), o = g(o, t, u, r, s[a + 14], 23, -35309556), r = g(r, o, t, u, s[a + 1], 4, -1530992060), u = g(u, r, o, t, s[a + 4], 11, 1272893353), t = g(t, u, r, o, s[a + 7], 16, -155497632), o = g(o, t, u, r, s[a + 10], 23, -1094730640), r = g(r, o, t, u, s[a + 13], 4, 681279174), u = g(u, r, o, t, s[a + 0], 11, -358537222), t = g(t, u, r, o, s[a + 3], 16, -722521979), o = g(o, t, u, r, s[a + 6], 23, 76029189), r = g(r, o, t, u, s[a + 9], 4, -640364487), u = g(u, r, o, t, s[a + 12], 11, -421815835), t = g(t, u, r, o, s[a + 15], 16, 530742520), r = h(r, o = g(o, t, u, r, s[a + 2], 23, -995338651), t, u, s[a + 0], 6, -198630844), u = h(u, r, o, t, s[a + 7], 10, 1126891415), t = h(t, u, r, o, s[a + 14], 15, -1416354905), o = h(o, t, u, r, s[a + 5], 21, -57434055), r = h(r, o, t, u, s[a + 12], 6, 1700485571), u = h(u, r, o, t, s[a + 3], 10, -1894986606), t = h(t, u, r, o, s[a + 10], 15, -1051523), o = h(o, t, u, r, s[a + 1], 21, -2054922799), r = h(r, o, t, u, s[a + 8], 6, 1873313359), u = h(u, r, o, t, s[a + 15], 10, -30611744), t = h(t, u, r, o, s[a + 6], 15, -1560198380), o = h(o, t, u, r, s[a + 13], 21, 1309151649), r = h(r, o, t, u, s[a + 4], 6, -145523070), u = h(u, r, o, t, s[a + 11], 10, -1120210379), t = h(t, u, r, o, s[a + 2], 15, 718787259), o = h(o, t, u, r, s[a + 9], 21, -343485551), r = A(r, S), o = A(o, B), t = A(t, U), u = A(u, _);
          }
          return Array(r, o, t, u);
        }
        function l(s, f, r, o, t, u) {
          return A((f = A(A(f, s), A(o, u))) << t | f >>> 32 - t, r);
        }
        function p(s, f, r, o, t, u, a) {
          return l(f & r | ~f & o, s, f, t, u, a);
        }
        function v(s, f, r, o, t, u, a) {
          return l(f & o | r & ~o, s, f, t, u, a);
        }
        function g(s, f, r, o, t, u, a) {
          return l(f ^ r ^ o, s, f, t, u, a);
        }
        function h(s, f, r, o, t, u, a) {
          return l(r ^ (f | ~o), s, f, t, u, a);
        }
        function A(s, f) {
          var r = (65535 & s) + (65535 & f);
          return (s >> 16) + (f >> 16) + (r >> 16) << 16 | 65535 & r;
        }
        x.exports = function(s) {
          return y.hash(s, E, 16);
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        x.exports = function(y) {
          for (var E, l = new Array(y), p = 0; p < y; p++)
            !(3 & p) && (E = 4294967296 * Math.random()), l[p] = E >>> ((3 & p) << 3) & 255;
          return l;
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 8: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        var y = m("./helpers");
        function E(v, g) {
          v[g >> 5] |= 128 << 24 - g % 32, v[15 + (g + 64 >> 9 << 4)] = g;
          for (var h, A, s, f = Array(80), r = 1732584193, o = -271733879, t = -1732584194, u = 271733878, a = -1009589776, S = 0; S < v.length; S += 16) {
            for (var B = r, U = o, _ = t, T = u, z = a, D = 0; D < 80; D++) {
              f[D] = D < 16 ? v[S + D] : p(f[D - 3] ^ f[D - 8] ^ f[D - 14] ^ f[D - 16], 1);
              var k = l(l(p(r, 5), (k = o, A = t, s = u, (h = D) < 20 ? k & A | ~k & s : !(h < 40) && h < 60 ? k & A | k & s | A & s : k ^ A ^ s)), l(l(a, f[D]), (h = D) < 20 ? 1518500249 : h < 40 ? 1859775393 : h < 60 ? -1894007588 : -899497514)), a = u, u = t, t = p(o, 30), o = r, r = k;
            }
            r = l(r, B), o = l(o, U), t = l(t, _), u = l(u, T), a = l(a, z);
          }
          return Array(r, o, t, u, a);
        }
        function l(v, g) {
          var h = (65535 & v) + (65535 & g);
          return (v >> 16) + (g >> 16) + (h >> 16) << 16 | 65535 & h;
        }
        function p(v, g) {
          return v << g | v >>> 32 - g;
        }
        x.exports = function(v) {
          return y.hash(v, E, 20, !0);
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        function y(g, h) {
          var A = (65535 & g) + (65535 & h);
          return (g >> 16) + (h >> 16) + (A >> 16) << 16 | 65535 & A;
        }
        function E(g, h) {
          var A, s = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), f = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), r = new Array(64);
          g[h >> 5] |= 128 << 24 - h % 32, g[15 + (h + 64 >> 9 << 4)] = h;
          for (var o, t, u = 0; u < g.length; u += 16) {
            for (var a = f[0], S = f[1], B = f[2], U = f[3], _ = f[4], T = f[5], z = f[6], D = f[7], k = 0; k < 64; k++)
              r[k] = k < 16 ? g[k + u] : y(y(y((t = r[k - 2], p(t, 17) ^ p(t, 19) ^ v(t, 10)), r[k - 7]), (t = r[k - 15], p(t, 7) ^ p(t, 18) ^ v(t, 3))), r[k - 16]), A = y(y(y(y(D, p(t = _, 6) ^ p(t, 11) ^ p(t, 25)), _ & T ^ ~_ & z), s[k]), r[k]), o = y(p(o = a, 2) ^ p(o, 13) ^ p(o, 22), a & S ^ a & B ^ S & B), D = z, z = T, T = _, _ = y(U, A), U = B, B = S, S = a, a = y(A, o);
            f[0] = y(a, f[0]), f[1] = y(S, f[1]), f[2] = y(B, f[2]), f[3] = y(U, f[3]), f[4] = y(_, f[4]), f[5] = y(T, f[5]), f[6] = y(z, f[6]), f[7] = y(D, f[7]);
          }
          return f;
        }
        var l = m("./helpers"), p = function(g, h) {
          return g >>> h | g << 32 - h;
        }, v = function(g, h) {
          return g >>> h;
        };
        x.exports = function(g) {
          return l.hash(g, E, 32, !0);
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        L.read = function(y, E, l, p, u) {
          var g, h, A = 8 * u - p - 1, s = (1 << A) - 1, f = s >> 1, r = -7, o = l ? u - 1 : 0, t = l ? -1 : 1, u = y[E + o];
          for (o += t, g = u & (1 << -r) - 1, u >>= -r, r += A; 0 < r; g = 256 * g + y[E + o], o += t, r -= 8)
            ;
          for (h = g & (1 << -r) - 1, g >>= -r, r += p; 0 < r; h = 256 * h + y[E + o], o += t, r -= 8)
            ;
          if (g === 0)
            g = 1 - f;
          else {
            if (g === s)
              return h ? NaN : 1 / 0 * (u ? -1 : 1);
            h += Math.pow(2, p), g -= f;
          }
          return (u ? -1 : 1) * h * Math.pow(2, g - p);
        }, L.write = function(y, E, l, p, v, a) {
          var h, A, s = 8 * a - v - 1, f = (1 << s) - 1, r = f >> 1, o = v === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, t = p ? 0 : a - 1, u = p ? 1 : -1, a = E < 0 || E === 0 && 1 / E < 0 ? 1 : 0;
          for (E = Math.abs(E), isNaN(E) || E === 1 / 0 ? (A = isNaN(E) ? 1 : 0, h = f) : (h = Math.floor(Math.log(E) / Math.LN2), E * (p = Math.pow(2, -h)) < 1 && (h--, p *= 2), 2 <= (E += 1 <= h + r ? o / p : o * Math.pow(2, 1 - r)) * p && (h++, p /= 2), f <= h + r ? (A = 0, h = f) : 1 <= h + r ? (A = (E * p - 1) * Math.pow(2, v), h += r) : (A = E * Math.pow(2, r - 1) * Math.pow(2, v), h = 0)); 8 <= v; y[l + t] = 255 & A, t += u, A /= 256, v -= 8)
            ;
          for (h = h << v | A, s += v; 0 < s; y[l + t] = 255 & h, t += u, h /= 256, s -= 8)
            ;
          y[l + t - u] |= 128 * a;
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
    }, { buffer: 3, lYpoI2: 11 }], 11: [function(m, x, L) {
      (function(I, M, O, F, C, R, V, Q, X) {
        var y, E, l;
        function p() {
        }
        (I = x.exports = {}).nextTick = (E = typeof window < "u" && window.setImmediate, l = typeof window < "u" && window.postMessage && window.addEventListener, E ? function(v) {
          return window.setImmediate(v);
        } : l ? (y = [], window.addEventListener("message", function(v) {
          var g = v.source;
          g !== window && g !== null || v.data !== "process-tick" || (v.stopPropagation(), 0 < y.length && y.shift()());
        }, !0), function(v) {
          y.push(v), window.postMessage("process-tick", "*");
        }) : function(v) {
          setTimeout(v, 0);
        }), I.title = "browser", I.browser = !0, I.env = {}, I.argv = [], I.on = p, I.addListener = p, I.once = p, I.off = p, I.removeListener = p, I.removeAllListeners = p, I.emit = p, I.binding = function(v) {
          throw new Error("process.binding is not supported");
        }, I.cwd = function() {
          return "/";
        }, I.chdir = function(v) {
          throw new Error("process.chdir is not supported");
        };
      }).call(this, m("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, m("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
    }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
  });
})(pn);
var mn = pn.exports;
const dn = /* @__PURE__ */ bn(mn), En = (q, J, ...m) => {
  const x = ln(() => dn(J), [J]), L = ln(() => dn(m), [m]), M = gn(q, ((F) => (C) => hn(
    C,
    cn,
    x,
    F
  ))(L)) ?? yn, O = async () => await wn(J(...m), q, cn, x, L);
  return M.loadingState === "NEVER_LOADED" && x !== void 0 && m !== void 0 && m.length > 0 && O(), [M, O];
};
export {
  wn as requestHandler,
  En as useRequest
};
