(function browserMinJSPackages() { /* workerTimers */! function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).fastUniqueNumbers = {}) }(this, function (e) { "use strict"; var t, r = void 0 === Number.MAX_SAFE_INTEGER ? 9007199254740991 : Number.MAX_SAFE_INTEGER, n = new WeakMap, i = function (e, t) { return function (n) { var i = t.get(n), o = void 0 === i ? n.size : i < 1073741824 ? i + 1 : 0; if (!n.has(o)) return e(n, o); if (n.size < 536870912) { for (; n.has(o);) o = Math.floor(1073741824 * Math.random()); return e(n, o) } if (n.size > r) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!"); for (; n.has(o);) o = Math.floor(Math.random() * r); return e(n, o) } }((t = n, function (e, r) { return t.set(e, r), r }), n), o = function (e) { return function (t) { var r = e(t); return t.add(r), r } }(i); e.addUniqueNumber = o, e.generateUniqueNumber = i, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("fast-unique-numbers")) : "function" == typeof define && define.amd ? define(["exports", "fast-unique-numbers"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimersBroker = {}, e.fastUniqueNumbers) }(this, function (e, t) { "use strict"; e.load = function (e) { var r = new Map([[0, function () { }]]), n = new Map([[0, function () { }]]), i = new Map, o = new Worker(e); o.addEventListener("message", function (e) { var t = e.data; if (function (e) { return void 0 !== e.method && "call" === e.method }(t)) { var o = t.params, a = o.timerId, s = o.timerType; if ("interval" === s) { var u = r.get(a); if ("number" == typeof u) { var d = i.get(u); if (void 0 === d || d.timerId !== a || d.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === u) throw new Error("The timer is in an undefined state."); u() } } else if ("timeout" === s) { var f = n.get(a); if ("number" == typeof f) { var l = i.get(f); if (void 0 === l || l.timerId !== a || l.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === f) throw new Error("The timer is in an undefined state."); f(), n.delete(a) } } } else { if (! function (e) { return null === e.error && "number" == typeof e.id }(t)) { var m = t.error.message; throw new Error(m) } var c = t.id, p = i.get(c); if (void 0 === p) throw new Error("The timer is in an undefined state."); var v = p.timerId, h = p.timerType; i.delete(c), "interval" === h ? r.delete(v) : n.delete(v) } }); return { clearInterval: function (e) { var n = t.generateUniqueNumber(i); i.set(n, { timerId: e, timerType: "interval" }), r.set(e, n), o.postMessage({ id: n, method: "clear", params: { timerId: e, timerType: "interval" } }) }, clearTimeout: function (e) { var r = t.generateUniqueNumber(i); i.set(r, { timerId: e, timerType: "timeout" }), n.set(e, r), o.postMessage({ id: r, method: "clear", params: { timerId: e, timerType: "timeout" } }) }, setInterval: function (e, n) { var i = t.generateUniqueNumber(r); return r.set(i, function () { e(), "function" == typeof r.get(i) && o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }) }), o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }), i }, setTimeout: function (e, r) { var i = t.generateUniqueNumber(n); return n.set(i, e), o.postMessage({ id: null, method: "set", params: { delay: r, now: performance.now(), timerId: i, timerType: "timeout" } }), i } } }, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("worker-timers-broker")) : "function" == typeof define && define.amd ? define(["exports", "worker-timers-broker"], t) : t(window.workerTimers = {}, e.workerTimersBroker) }(this, function (e, t) { "use strict"; var r = null, n = function (e, t) { return function () { if (null !== r) return r; var n = new Blob([t], { type: "application/javascript; charset=utf-8" }), i = URL.createObjectURL(n); return (r = e(i)).setTimeout(function () { return URL.revokeObjectURL(i) }, 0), r } }(t.load, '(()=>{var e={67:(e,t,r)=>{var o,i;void 0===(i="function"==typeof(o=function(){"use strict";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)},o=function(e){var r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)},i=function(e,t){var r,o=performance.now();return{expected:o+(r=e-Math.max(0,o-t)),remainingDelay:r}},n=function e(t,r,o,i){var n=performance.now();n>o?postMessage({id:null,method:"call",params:{timerId:r,timerType:i}}):t.set(r,setTimeout(e,o-n,t,r,o,i))},a=function(t,r,o){var a=i(t,o),s=a.expected,d=a.remainingDelay;e.set(r,setTimeout(n,d,e,r,s,"interval"))},s=function(e,r,o){var a=i(e,o),s=a.expected,d=a.remainingDelay;t.set(r,setTimeout(n,d,t,r,s,"timeout"))};addEventListener("message",(function(e){var t=e.data;try{if("clear"===t.method){var i=t.id,n=t.params,d=n.timerId,c=n.timerType;if("interval"===c)r(d),postMessage({error:null,id:i});else{if("timeout"!==c)throw new Error(\'The given type "\'.concat(c,\'" is not supported\'));o(d),postMessage({error:null,id:i})}}else{if("set"!==t.method)throw new Error(\'The given method "\'.concat(t.method,\'" is not supported\'));var u=t.params,l=u.delay,p=u.now,m=u.timerId,v=u.timerType;if("interval"===v)a(l,m,p);else{if("timeout"!==v)throw new Error(\'The given type "\'.concat(v,\'" is not supported\'));s(l,m,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}}))})?o.call(t,r,t,e):o)||(e.exports=i)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(67)})()})();'); e.clearInterval = function (e) { return n().clearInterval(e) }, e.clearTimeout = function (e) { return n().clearTimeout(e) }, e.setInterval = function (e, t) { return n().setInterval(e, t) }, e.setTimeout = function (e, t) { return n().setTimeout(e, t) }, Object.defineProperty(e, "__esModule", { value: !0 }) }); })();
! function(t) { if ("object" == typeof exports) module.exports = t(); else if ("function" == typeof define && define.amd) define(t); else { var e; "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.PF = t() } }(function() { return function t(e, i, n) { function o(a, s) { if (!i[a]) { if (!e[a]) { var l = "function" == typeof require && require; if (!s && l) return l(a, !0); if (r) return r(a, !0); throw new Error("Cannot find module '" + a + "'") } var h = i[a] = { exports: {} }; e[a][0].call(h.exports, function(t) { var i = e[a][1][t]; return o(i ? i : t) }, h, h.exports, t, e, i, n) } return i[a].exports } for (var r = "function" == typeof require && require, a = 0; a < n.length; a++) o(n[a]); return o }({ 1: [function(t, e, i) { e.exports = t("./lib/heap") }, { "./lib/heap": 2 }], 2: [function(t, e, i) { (function() { var t, i, n, o, r, a, s, l, h, u, p, c, f, d, g; n = Math.floor, u = Math.min, i = function(t, e) { return e > t ? -1 : t > e ? 1 : 0 }, h = function(t, e, o, r, a) { var s; if (null == o && (o = 0), null == a && (a = i), 0 > o) throw new Error("lo must be non-negative"); for (null == r && (r = t.length); r > o;) s = n((o + r) / 2), a(e, t[s]) < 0 ? r = s : o = s + 1; return [].splice.apply(t, [o, o - o].concat(e)), e }, a = function(t, e, n) { return null == n && (n = i), t.push(e), d(t, 0, t.length - 1, n) }, r = function(t, e) { var n, o; return null == e && (e = i), n = t.pop(), t.length ? (o = t[0], t[0] = n, g(t, 0, e)) : o = n, o }, l = function(t, e, n) { var o; return null == n && (n = i), o = t[0], t[0] = e, g(t, 0, n), o }, s = function(t, e, n) { var o; return null == n && (n = i), t.length && n(t[0], e) < 0 && (o = [t[0], e], e = o[0], t[0] = o[1], g(t, 0, n)), e }, o = function(t, e) { var o, r, a, s, l, h; for (null == e && (e = i), s = function() { h = []; for (var e = 0, i = n(t.length / 2); i >= 0 ? i > e : e > i; i >= 0 ? e++ : e--) h.push(e); return h }.apply(this).reverse(), l = [], r = 0, a = s.length; a > r; r++) o = s[r], l.push(g(t, o, e)); return l }, f = function(t, e, n) { var o; return null == n && (n = i), o = t.indexOf(e), -1 !== o ? (d(t, 0, o, n), g(t, o, n)) : void 0 }, p = function(t, e, n) { var r, a, l, h, u; if (null == n && (n = i), a = t.slice(0, e), !a.length) return a; for (o(a, n), u = t.slice(e), l = 0, h = u.length; h > l; l++) r = u[l], s(a, r, n); return a.sort(n).reverse() }, c = function(t, e, n) { var a, s, l, p, c, f, d, g, b, v; if (null == n && (n = i), 10 * e <= t.length) { if (p = t.slice(0, e).sort(n), !p.length) return p; for (l = p[p.length - 1], g = t.slice(e), c = 0, d = g.length; d > c; c++) a = g[c], n(a, l) < 0 && (h(p, a, 0, null, n), p.pop(), l = p[p.length - 1]); return p } for (o(t, n), v = [], s = f = 0, b = u(e, t.length); b >= 0 ? b > f : f > b; s = b >= 0 ? ++f : --f) v.push(r(t, n)); return v }, d = function(t, e, n, o) { var r, a, s; for (null == o && (o = i), r = t[n]; n > e && (s = n - 1 >> 1, a = t[s], o(r, a) < 0);) t[n] = a, n = s; return t[n] = r }, g = function(t, e, n) { var o, r, a, s, l; for (null == n && (n = i), r = t.length, l = e, a = t[e], o = 2 * e + 1; r > o;) s = o + 1, r > s && !(n(t[o], t[s]) < 0) && (o = s), t[e] = t[o], e = o, o = 2 * e + 1; return t[e] = a, d(t, l, e, n) }, t = function() { function t(t) { this.cmp = null != t ? t : i, this.nodes = [] } return t.push = a, t.pop = r, t.replace = l, t.pushpop = s, t.heapify = o, t.updateItem = f, t.nlargest = p, t.nsmallest = c, t.prototype.push = function(t) { return a(this.nodes, t, this.cmp) }, t.prototype.pop = function() { return r(this.nodes, this.cmp) }, t.prototype.peek = function() { return this.nodes[0] }, t.prototype.contains = function(t) { return -1 !== this.nodes.indexOf(t) }, t.prototype.replace = function(t) { return l(this.nodes, t, this.cmp) }, t.prototype.pushpop = function(t) { return s(this.nodes, t, this.cmp) }, t.prototype.heapify = function() { return o(this.nodes, this.cmp) }, t.prototype.updateItem = function(t) { return f(this.nodes, t, this.cmp) }, t.prototype.clear = function() { return this.nodes = [] }, t.prototype.empty = function() { return 0 === this.nodes.length }, t.prototype.size = function() { return this.nodes.length }, t.prototype.clone = function() { var e; return e = new t, e.nodes = this.nodes.slice(0), e }, t.prototype.toArray = function() { return this.nodes.slice(0) }, t.prototype.insert = t.prototype.push, t.prototype.top = t.prototype.peek, t.prototype.front = t.prototype.peek, t.prototype.has = t.prototype.contains, t.prototype.copy = t.prototype.clone, t }(), ("undefined" != typeof e && null !== e ? e.exports : void 0) ? e.exports = t : window.Heap = t }).call(this) }, {}], 3: [function(t, e, i) { var n = { Always: 1, Never: 2, IfAtMostOneObstacle: 3, OnlyWhenNoObstacles: 4 }; e.exports = n }, {}], 4: [function(t, e, i) { function n(t, e, i) { var n; "object" != typeof t ? n = t : (e = t.length, n = t[0].length, i = t), this.width = n, this.height = e, this.nodes = this._buildNodes(n, e, i) } var o = t("./Node"), r = t("./DiagonalMovement"); n.prototype._buildNodes = function(t, e, i) { var n, r, a = new Array(e); for (n = 0; e > n; ++n) for (a[n] = new Array(t), r = 0; t > r; ++r) a[n][r] = new o(r, n); if (void 0 === i) return a; if (i.length !== e || i[0].length !== t) throw new Error("Matrix size does not fit"); for (n = 0; e > n; ++n) for (r = 0; t > r; ++r) i[n][r] && (a[n][r].walkable = !1); return a }, n.prototype.getNodeAt = function(t, e) { return this.nodes[e][t] }, n.prototype.isWalkableAt = function(t, e) { return this.isInside(t, e) && this.nodes[e][t].walkable }, n.prototype.isInside = function(t, e) { return t >= 0 && t < this.width && e >= 0 && e < this.height }, n.prototype.setWalkableAt = function(t, e, i) { this.nodes[e][t].walkable = i }, n.prototype.getNeighbors = function(t, e) { var i = t.x, n = t.y, o = [], a = !1, s = !1, l = !1, h = !1, u = !1, p = !1, c = !1, f = !1, d = this.nodes; if (this.isWalkableAt(i, n - 1) && (o.push(d[n - 1][i]), a = !0), this.isWalkableAt(i + 1, n) && (o.push(d[n][i + 1]), l = !0), this.isWalkableAt(i, n + 1) && (o.push(d[n + 1][i]), u = !0), this.isWalkableAt(i - 1, n) && (o.push(d[n][i - 1]), c = !0), e === r.Never) return o; if (e === r.OnlyWhenNoObstacles) s = c && a, h = a && l, p = l && u, f = u && c; else if (e === r.IfAtMostOneObstacle) s = c || a, h = a || l, p = l || u, f = u || c; else { if (e !== r.Always) throw new Error("Incorrect value of diagonalMovement"); s = !0, h = !0, p = !0, f = !0 } return s && this.isWalkableAt(i - 1, n - 1) && o.push(d[n - 1][i - 1]), h && this.isWalkableAt(i + 1, n - 1) && o.push(d[n - 1][i + 1]), p && this.isWalkableAt(i + 1, n + 1) && o.push(d[n + 1][i + 1]), f && this.isWalkableAt(i - 1, n + 1) && o.push(d[n + 1][i - 1]), o }, n.prototype.clone = function() { var t, e, i = this.width, r = this.height, a = this.nodes, s = new n(i, r), l = new Array(r); for (t = 0; r > t; ++t) for (l[t] = new Array(i), e = 0; i > e; ++e) l[t][e] = new o(e, t, a[t][e].walkable); return s.nodes = l, s }, e.exports = n }, { "./DiagonalMovement": 3, "./Node": 6 }], 5: [function(t, e, i) { e.exports = { manhattan: function(t, e) { return t + e }, euclidean: function(t, e) { return Math.sqrt(t * t + e * e) }, octile: function(t, e) { var i = Math.SQRT2 - 1; return e > t ? i * t + e : i * e + t }, chebyshev: function(t, e) { return Math.max(t, e) } } }, {}], 6: [function(t, e, i) { function n(t, e, i) { this.x = t, this.y = e, this.walkable = void 0 === i ? !0 : i } e.exports = n }, {}], 7: [function(t, e, i) { function n(t) { for (var e = [ [t.x, t.y] ]; t.parent;) t = t.parent, e.push([t.x, t.y]); return e.reverse() } function o(t, e) { var i = n(t), o = n(e); return i.concat(o.reverse()) } function r(t) { var e, i, n, o, r, a = 0; for (e = 1; e < t.length; ++e) i = t[e - 1], n = t[e], o = i[0] - n[0], r = i[1] - n[1], a += Math.sqrt(o * o + r * r); return a } function a(t, e, i, n) { var o, r, a, s, l, h, u = Math.abs, p = []; for (a = u(i - t), s = u(n - e), o = i > t ? 1 : -1, r = n > e ? 1 : -1, l = a - s;;) { if (p.push([t, e]), t === i && e === n) break; h = 2 * l, h > -s && (l -= s, t += o), a > h && (l += a, e += r) } return p } function s(t) { var e, i, n, o, r, s, l = [], h = t.length; if (2 > h) return l; for (r = 0; h - 1 > r; ++r) for (e = t[r], i = t[r + 1], n = a(e[0], e[1], i[0], i[1]), o = n.length, s = 0; o - 1 > s; ++s) l.push(n[s]); return l.push(t[h - 1]), l } function l(t, e) { var i, n, o, r, s, l, h, u, p, c, f, d = e.length, g = e[0][0], b = e[0][1], v = e[d - 1][0], A = e[d - 1][1]; for (i = g, n = b, s = [ [i, n] ], l = 2; d > l; ++l) { for (u = e[l], o = u[0], r = u[1], p = a(i, n, o, r), f = !1, h = 1; h < p.length; ++h) if (c = p[h], !t.isWalkableAt(c[0], c[1])) { f = !0; break } f && (lastValidCoord = e[l - 1], s.push(lastValidCoord), i = lastValidCoord[0], n = lastValidCoord[1]) } return s.push([v, A]), s } function h(t) { if (t.length < 3) return t; var e, i, n, o, r, a, s = [], l = t[0][0], h = t[0][1], u = t[1][0], p = t[1][1], c = u - l, f = p - h; for (r = Math.sqrt(c * c + f * f), c /= r, f /= r, s.push([l, h]), a = 2; a < t.length; a++) e = u, i = p, n = c, o = f, u = t[a][0], p = t[a][1], c = u - e, f = p - i, r = Math.sqrt(c * c + f * f), c /= r, f /= r, c === n && f === o || s.push([e, i]); return s.push([u, p]), s } i.backtrace = n, i.biBacktrace = o, i.pathLength = r, i.interpolate = a, i.expandPath = s, i.smoothenPath = l, i.compressPath = h }, {}], 8: [function(t, e, i) { e.exports = { Heap: t("heap"), Node: t("./core/Node"), Grid: t("./core/Grid"), Util: t("./core/Util"), DiagonalMovement: t("./core/DiagonalMovement"), Heuristic: t("./core/Heuristic"), AStarFinder: t("./finders/AStarFinder"), BestFirstFinder: t("./finders/BestFirstFinder"), BreadthFirstFinder: t("./finders/BreadthFirstFinder"), DijkstraFinder: t("./finders/DijkstraFinder"), BiAStarFinder: t("./finders/BiAStarFinder"), BiBestFirstFinder: t("./finders/BiBestFirstFinder"), BiBreadthFirstFinder: t("./finders/BiBreadthFirstFinder"), BiDijkstraFinder: t("./finders/BiDijkstraFinder"), IDAStarFinder: t("./finders/IDAStarFinder"), JumpPointFinder: t("./finders/JumpPointFinder") } }, { "./core/DiagonalMovement": 3, "./core/Grid": 4, "./core/Heuristic": 5, "./core/Node": 6, "./core/Util": 7, "./finders/AStarFinder": 9, "./finders/BestFirstFinder": 10, "./finders/BiAStarFinder": 11, "./finders/BiBestFirstFinder": 12, "./finders/BiBreadthFirstFinder": 13, "./finders/BiDijkstraFinder": 14, "./finders/BreadthFirstFinder": 15, "./finders/DijkstraFinder": 16, "./finders/IDAStarFinder": 17, "./finders/JumpPointFinder": 22, heap: 1 }], 9: [function(t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.heuristic = t.heuristic || a.manhattan, this.weight = t.weight || 1, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = s.OnlyWhenNoObstacles : this.diagonalMovement = s.IfAtMostOneObstacle : this.diagonalMovement = s.Never), this.diagonalMovement === s.Never ? this.heuristic = t.heuristic || a.manhattan : this.heuristic = t.heuristic || a.octile } var o = t("heap"), r = t("../core/Util"), a = t("../core/Heuristic"), s = t("../core/DiagonalMovement"); n.prototype.findPath = function(t, e, i, n, a) { var s, l, h, u, p, c, f, d, g = new o(function(t, e) { return t.f - e.f }), b = a.getNodeAt(t, e), v = a.getNodeAt(i, n), A = this.heuristic, m = this.diagonalMovement, y = this.weight, k = Math.abs, M = Math.SQRT2; for (b.g = 0, b.f = 0, g.push(b), b.opened = !0; !g.empty();) { if (s = g.pop(), s.closed = !0, s === v) return r.backtrace(v); for (l = a.getNeighbors(s, m), u = 0, p = l.length; p > u; ++u) h = l[u], h.closed || (c = h.x, f = h.y, d = s.g + (c - s.x === 0 || f - s.y === 0 ? 1 : M), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || y * A(k(c - i), k(f - n)), h.f = h.g + h.h, h.parent = s, h.opened ? g.updateItem(h) : (g.push(h), h.opened = !0))) } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Util": 7, heap: 1 }], 10: [function(t, e, i) { function n(t) { o.call(this, t); var e = this.heuristic; this.heuristic = function(t, i) { return 1e6 * e(t, i) } } var o = t("./AStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./AStarFinder": 9 }], 11: [function(t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.heuristic = t.heuristic || a.manhattan, this.weight = t.weight || 1, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = s.OnlyWhenNoObstacles : this.diagonalMovement = s.IfAtMostOneObstacle : this.diagonalMovement = s.Never), this.diagonalMovement === s.Never ? this.heuristic = t.heuristic || a.manhattan : this.heuristic = t.heuristic || a.octile } var o = t("heap"), r = t("../core/Util"), a = t("../core/Heuristic"), s = t("../core/DiagonalMovement"); n.prototype.findPath = function(t, e, i, n, a) { var s, l, h, u, p, c, f, d, g = function(t, e) { return t.f - e.f }, b = new o(g), v = new o(g), A = a.getNodeAt(t, e), m = a.getNodeAt(i, n), y = this.heuristic, k = this.diagonalMovement, M = this.weight, W = Math.abs, w = Math.SQRT2, N = 1, x = 2; for (A.g = 0, A.f = 0, b.push(A), A.opened = N, m.g = 0, m.f = 0, v.push(m), m.opened = x; !b.empty() && !v.empty();) { for (s = b.pop(), s.closed = !0, l = a.getNeighbors(s, k), u = 0, p = l.length; p > u; ++u) if (h = l[u], !h.closed) { if (h.opened === x) return r.biBacktrace(s, h); c = h.x, f = h.y, d = s.g + (c - s.x === 0 || f - s.y === 0 ? 1 : w), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || M * y(W(c - i), W(f - n)), h.f = h.g + h.h, h.parent = s, h.opened ? b.updateItem(h) : (b.push(h), h.opened = N)) } for (s = v.pop(), s.closed = !0, l = a.getNeighbors(s, k), u = 0, p = l.length; p > u; ++u) if (h = l[u], !h.closed) { if (h.opened === N) return r.biBacktrace(h, s); c = h.x, f = h.y, d = s.g + (c - s.x === 0 || f - s.y === 0 ? 1 : w), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || M * y(W(c - t), W(f - e)), h.f = h.g + h.h, h.parent = s, h.opened ? v.updateItem(h) : (v.push(h), h.opened = x)) } } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Util": 7, heap: 1 }], 12: [function(t, e, i) { function n(t) { o.call(this, t); var e = this.heuristic; this.heuristic = function(t, i) { return 1e6 * e(t, i) } } var o = t("./BiAStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./BiAStarFinder": 11 }], 13: [function(t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = r.OnlyWhenNoObstacles : this.diagonalMovement = r.IfAtMostOneObstacle : this.diagonalMovement = r.Never) } var o = t("../core/Util"), r = t("../core/DiagonalMovement"); n.prototype.findPath = function(t, e, i, n, r) { var a, s, l, h, u, p = r.getNodeAt(t, e), c = r.getNodeAt(i, n), f = [], d = [], g = this.diagonalMovement, b = 0, v = 1; for (f.push(p), p.opened = !0, p.by = b, d.push(c), c.opened = !0, c.by = v; f.length && d.length;) { for (l = f.shift(), l.closed = !0, a = r.getNeighbors(l, g), h = 0, u = a.length; u > h; ++h) if (s = a[h], !s.closed) if (s.opened) { if (s.by === v) return o.biBacktrace(l, s) } else f.push(s), s.parent = l, s.opened = !0, s.by = b; for (l = d.shift(), l.closed = !0, a = r.getNeighbors(l, g), h = 0, u = a.length; u > h; ++h) if (s = a[h], !s.closed) if (s.opened) { if (s.by === b) return o.biBacktrace(s, l) } else d.push(s), s.parent = l, s.opened = !0, s.by = v } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Util": 7 }], 14: [function(t, e, i) { function n(t) { o.call(this, t), this.heuristic = function(t, e) { return 0 } } var o = t("./BiAStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./BiAStarFinder": 11 }], 15: [function(t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = r.OnlyWhenNoObstacles : this.diagonalMovement = r.IfAtMostOneObstacle : this.diagonalMovement = r.Never) } var o = t("../core/Util"), r = t("../core/DiagonalMovement"); n.prototype.findPath = function(t, e, i, n, r) { var a, s, l, h, u, p = [], c = this.diagonalMovement, f = r.getNodeAt(t, e), d = r.getNodeAt(i, n); for (p.push(f), f.opened = !0; p.length;) { if (l = p.shift(), l.closed = !0, l === d) return o.backtrace(d); for (a = r.getNeighbors(l, c), h = 0, u = a.length; u > h; ++h) s = a[h], s.closed || s.opened || (p.push(s), s.opened = !0, s.parent = l) } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Util": 7 }], 16: [function(t, e, i) { function n(t) { o.call(this, t), this.heuristic = function(t, e) { return 0 } } var o = t("./AStarFinder"); n.prototype = new o, n.prototype.constructor = n, e.exports = n }, { "./AStarFinder": 9 }], 17: [function(t, e, i) { function n(t) { t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.heuristic = t.heuristic || o.manhattan, this.weight = t.weight || 1, this.trackRecursion = t.trackRecursion || !1, this.timeLimit = t.timeLimit || 1 / 0, this.diagonalMovement || (this.allowDiagonal ? this.dontCrossCorners ? this.diagonalMovement = a.OnlyWhenNoObstacles : this.diagonalMovement = a.IfAtMostOneObstacle : this.diagonalMovement = a.Never), this.diagonalMovement === a.Never ? this.heuristic = t.heuristic || o.manhattan : this.heuristic = t.heuristic || o.octile } var o = (t("../core/Util"), t("../core/Heuristic")), r = t("../core/Node"), a = t("../core/DiagonalMovement"); n.prototype.findPath = function(t, e, i, n, o) { var a, s, l, h = 0, u = (new Date).getTime(), p = function(t, e) { return this.heuristic(Math.abs(e.x - t.x), Math.abs(e.y - t.y)) }.bind(this), c = function(t, e) { return t.x === e.x || t.y === e.y ? 1 : Math.SQRT2 }, f = function(t, e, i, n, a) { if (h++, this.timeLimit > 0 && (new Date).getTime() - u > 1e3 * this.timeLimit) return 1 / 0; var s = e + p(t, g) * this.weight; if (s > i) return s; if (t == g) return n[a] = [t.x, t.y], t; var l, d, b, v, A = o.getNeighbors(t, this.diagonalMovement); for (b = 0, l = 1 / 0; v = A[b]; ++b) { if (this.trackRecursion && (v.retainCount = v.retainCount + 1 || 1, v.tested !== !0 && (v.tested = !0)), d = f(v, e + c(t, v), i, n, a + 1), d instanceof r) return n[a] = [t.x, t.y], d; this.trackRecursion && 0 === --v.retainCount && (v.tested = !1), l > d && (l = d) } return l }.bind(this), d = o.getNodeAt(t, e), g = o.getNodeAt(i, n), b = p(d, g); for (a = 0; !0; ++a) { if (s = [], l = f(d, 0, b, s, 0), l === 1 / 0) return []; if (l instanceof r) return s; b = l } return [] }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Node": 6, "../core/Util": 7 }], 18: [function(t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function(t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (this.trackJumpRecursion === !0 && (o.getNodeAt(t, e).tested = !0), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r && 0 !== a) { if (o.isWalkableAt(t - r, e + a) && !o.isWalkableAt(t - r, e) || o.isWalkableAt(t + r, e - a) && !o.isWalkableAt(t, e - a)) return [t, e]; if (this._jump(t + r, e, t, e) || this._jump(t, e + a, t, e)) return [t, e] } else if (0 !== r) { if (o.isWalkableAt(t + r, e + 1) && !o.isWalkableAt(t, e + 1) || o.isWalkableAt(t + r, e - 1) && !o.isWalkableAt(t, e - 1)) return [t, e] } else if (o.isWalkableAt(t + 1, e + a) && !o.isWalkableAt(t + 1, e) || o.isWalkableAt(t - 1, e + a) && !o.isWalkableAt(t - 1, e)) return [t, e]; return this._jump(t + r, e + a, t, e) }, n.prototype._findNeighbors = function(t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p + n, c + o) && d.push([p + n, c + o]), f.isWalkableAt(p - n, c) || d.push([p - n, c + o]), f.isWalkableAt(p, c - o) || d.push([p + n, c - o])) : 0 === n ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + 1, c) || d.push([p + 1, c + o]), f.isWalkableAt(p - 1, c) || d.push([p - 1, c + o])) : (f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p, c + 1) || d.push([p + n, c + 1]), f.isWalkableAt(p, c - 1) || d.push([p + n, c - 1])); else for (a = f.getNeighbors(t, r.Always), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 19: [function(t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function(t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (this.trackJumpRecursion === !0 && (o.getNodeAt(t, e).tested = !0), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r && 0 !== a) { if (o.isWalkableAt(t - r, e + a) && !o.isWalkableAt(t - r, e) || o.isWalkableAt(t + r, e - a) && !o.isWalkableAt(t, e - a)) return [t, e]; if (this._jump(t + r, e, t, e) || this._jump(t, e + a, t, e)) return [t, e] } else if (0 !== r) { if (o.isWalkableAt(t + r, e + 1) && !o.isWalkableAt(t, e + 1) || o.isWalkableAt(t + r, e - 1) && !o.isWalkableAt(t, e - 1)) return [t, e] } else if (o.isWalkableAt(t + 1, e + a) && !o.isWalkableAt(t + 1, e) || o.isWalkableAt(t - 1, e + a) && !o.isWalkableAt(t - 1, e)) return [t, e]; return o.isWalkableAt(t + r, e) || o.isWalkableAt(t, e + a) ? this._jump(t + r, e + a, t, e) : null }, n.prototype._findNeighbors = function(t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), (f.isWalkableAt(p, c + o) || f.isWalkableAt(p + n, c)) && d.push([p + n, c + o]), !f.isWalkableAt(p - n, c) && f.isWalkableAt(p, c + o) && d.push([p - n, c + o]), !f.isWalkableAt(p, c - o) && f.isWalkableAt(p + n, c) && d.push([p + n, c - o])) : 0 === n ? f.isWalkableAt(p, c + o) && (d.push([p, c + o]), f.isWalkableAt(p + 1, c) || d.push([p + 1, c + o]), f.isWalkableAt(p - 1, c) || d.push([p - 1, c + o])) : f.isWalkableAt(p + n, c) && (d.push([p + n, c]), f.isWalkableAt(p, c + 1) || d.push([p + n, c + 1]), f.isWalkableAt(p, c - 1) || d.push([p + n, c - 1])); else for (a = f.getNeighbors(t, r.IfAtMostOneObstacle), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 20: [function(t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function(t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (this.trackJumpRecursion === !0 && (o.getNodeAt(t, e).tested = !0), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r && 0 !== a) { if (this._jump(t + r, e, t, e) || this._jump(t, e + a, t, e)) return [t, e] } else if (0 !== r) { if (o.isWalkableAt(t, e - 1) && !o.isWalkableAt(t - r, e - 1) || o.isWalkableAt(t, e + 1) && !o.isWalkableAt(t - r, e + 1)) return [t, e] } else if (0 !== a && (o.isWalkableAt(t - 1, e) && !o.isWalkableAt(t - 1, e - a) || o.isWalkableAt(t + 1, e) && !o.isWalkableAt(t + 1, e - a))) return [t, e]; return o.isWalkableAt(t + r, e) && o.isWalkableAt(t, e + a) ? this._jump(t + r, e + a, t, e) : null }, n.prototype._findNeighbors = function(t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) if (e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o) f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p, c + o) && f.isWalkableAt(p + n, c) && d.push([p + n, c + o]); else { var g; if (0 !== n) { g = f.isWalkableAt(p + n, c); var b = f.isWalkableAt(p, c + 1), v = f.isWalkableAt(p, c - 1); g && (d.push([p + n, c]), b && d.push([p + n, c + 1]), v && d.push([p + n, c - 1])), b && d.push([p, c + 1]), v && d.push([p, c - 1]) } else if (0 !== o) { g = f.isWalkableAt(p, c + o); var A = f.isWalkableAt(p + 1, c), m = f.isWalkableAt(p - 1, c); g && (d.push([p, c + o]), A && d.push([p + 1, c + o]), m && d.push([p - 1, c + o])), A && d.push([p + 1, c]), m && d.push([p - 1, c]) } } else for (a = f.getNeighbors(t, r.OnlyWhenNoObstacles), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 21: [function(t, e, i) { function n(t) { o.call(this, t) } var o = t("./JumpPointFinderBase"), r = t("../core/DiagonalMovement"); n.prototype = new o, n.prototype.constructor = n, n.prototype._jump = function(t, e, i, n) { var o = this.grid, r = t - i, a = e - n; if (!o.isWalkableAt(t, e)) return null; if (this.trackJumpRecursion === !0 && (o.getNodeAt(t, e).tested = !0), o.getNodeAt(t, e) === this.endNode) return [t, e]; if (0 !== r) { if (o.isWalkableAt(t, e - 1) && !o.isWalkableAt(t - r, e - 1) || o.isWalkableAt(t, e + 1) && !o.isWalkableAt(t - r, e + 1)) return [t, e] } else { if (0 === a) throw new Error("Only horizontal and vertical movements are allowed"); if (o.isWalkableAt(t - 1, e) && !o.isWalkableAt(t - 1, e - a) || o.isWalkableAt(t + 1, e) && !o.isWalkableAt(t + 1, e - a)) return [t, e]; if (this._jump(t + 1, e, t, e) || this._jump(t - 1, e, t, e)) return [t, e] } return this._jump(t + r, e + a, t, e) }, n.prototype._findNeighbors = function(t) { var e, i, n, o, a, s, l, h, u = t.parent, p = t.x, c = t.y, f = this.grid, d = []; if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n ? (f.isWalkableAt(p, c - 1) && d.push([p, c - 1]), f.isWalkableAt(p, c + 1) && d.push([p, c + 1]), f.isWalkableAt(p + n, c) && d.push([p + n, c])) : 0 !== o && (f.isWalkableAt(p - 1, c) && d.push([p - 1, c]), f.isWalkableAt(p + 1, c) && d.push([p + 1, c]), f.isWalkableAt(p, c + o) && d.push([p, c + o])); else for (a = f.getNeighbors(t, r.Never), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]); return d }, e.exports = n }, { "../core/DiagonalMovement": 3, "./JumpPointFinderBase": 23 }], 22: [function(t, e, i) { function n(t) { return t = t || {}, t.diagonalMovement === o.Never ? new r(t) : t.diagonalMovement === o.Always ? new a(t) : t.diagonalMovement === o.OnlyWhenNoObstacles ? new s(t) : new l(t) } var o = t("../core/DiagonalMovement"), r = t("./JPFNeverMoveDiagonally"), a = t("./JPFAlwaysMoveDiagonally"), s = t("./JPFMoveDiagonallyIfNoObstacles"), l = t("./JPFMoveDiagonallyIfAtMostOneObstacle"); e.exports = n }, { "../core/DiagonalMovement": 3, "./JPFAlwaysMoveDiagonally": 18, "./JPFMoveDiagonallyIfAtMostOneObstacle": 19, "./JPFMoveDiagonallyIfNoObstacles": 20, "./JPFNeverMoveDiagonally": 21 }], 23: [function(t, e, i) { function n(t) { t = t || {}, this.heuristic = t.heuristic || a.manhattan, this.trackJumpRecursion = t.trackJumpRecursion || !1 } var o = t("heap"), r = t("../core/Util"), a = t("../core/Heuristic"); t("../core/DiagonalMovement"); n.prototype.findPath = function(t, e, i, n, a) { var s, l = this.openList = new o(function(t, e) { return t.f - e.f }), h = this.startNode = a.getNodeAt(t, e), u = this.endNode = a.getNodeAt(i, n); for (this.grid = a, h.g = 0, h.f = 0, l.push(h), h.opened = !0; !l.empty();) { if (s = l.pop(), s.closed = !0, s === u) return r.expandPath(r.backtrace(u)); this._identifySuccessors(s) } return [] }, n.prototype._identifySuccessors = function(t) { var e, i, n, o, r, s, l, h, u, p, c = this.grid, f = this.heuristic, d = this.openList, g = this.endNode.x, b = this.endNode.y, v = t.x, A = t.y, m = Math.abs; Math.max; for (e = this._findNeighbors(t), o = 0, r = e.length; r > o; ++o) if (i = e[o], n = this._jump(i[0], i[1], v, A)) { if (s = n[0], l = n[1], p = c.getNodeAt(s, l), p.closed) continue; h = a.octile(m(s - v), m(l - A)), u = t.g + h, (!p.opened || u < p.g) && (p.g = u, p.h = p.h || f(m(s - g), m(l - b)), p.f = p.g + p.h, p.parent = t, p.opened ? d.updateItem(p) : (d.push(p), p.opened = !0)) } }, e.exports = n }, { "../core/DiagonalMovement": 3, "../core/Heuristic": 5, "../core/Util": 7, heap: 1 }] }, {}, [8])(8) });
function a() {}
var b = [];
var c = ["\"\"TlErZ574|#ML", "}t_.w", "q=^A", "MUcQ)eepH;x`Ok<1", "x^YQasLH=J", "CRNAj?SmHvjY$Jn}", "v{RSb)8\"", "[R*M", "(Wx1~?ynz,|RSz,}.MHj,[:^6vw5$J)<#(yfDD/pAMLBqNG|gPK%zJLmed\"P{lf~mtP%o+f@]GqU+|O&d}{SQj3Wfa", "F!RM3", "q`^SBjqFAYsG(H", "r!*SJ?+U6", "/X}6~", "c!@jf2w4VdjYO", "c!@jf2w4VdjYO", "c!@jf2w4VdjYO", "3`TS)?K", "c!2SVo9m6", "+X3Pz", "SW_j{Dr\"", "h!ajw?f\"", "A!/1c", "(X01", "44xB(+BICr", "r9ajj?v.(Fov92a7X=(bHS\"H*S32a\"}GuRd9<><O", "r9ajj?v.(Fov92a7X=2zL><=!^ZNmW3PSJ,~,FP4if$X", "r}`77ITJGVtXwj25?%`7Gd2a9iYTnY4:Lc_n6[4sj#*W<Q", "r}`77ITJGVtXwj25?%`7Gd2acqLWTa#@q7u~;r)?C>h{hh`\"vFa", "hhK#w7`Qi:S<F%J5xz", ".RL{%;yEU~", "fXdP>D&m@dSt\"y@", "!!`A8[oLF9g4ub", "RT*S3", "(X01", "!!QSsoCL<@!zO", "x~4Da", "tW4,z2=o:d<t]2:<u!uiejCLOCn5dH", "!!`AQja\"1d>;:f.}mO", "ud,Hv&&@OPB5)^Q~", "%}*M,[mmfa", "B<hZvtIn(/(qgT", "WfUMsZK", "F!J]NZ8\"", "OX3Pz", "[74,SJK", "XXi]x]jqT", "XXi]x]X/T", "XXi]x]jqQM", "XXi]x]X/UM", "8faj3", "Pf>SVot\"", "3XM+RjB.6", ":Q*SRje`]G5ZO", "Phk]??<oOYi", "@`9juwA?Xdo5O", "/9;j$W{FJv?jjH", "z!4jzJlL/Gi46b", "](_jo?%/,vbP6b", "+X3P|?Zc>~Y46b", "HHFSx]*O/GFB+|!", "79L{W5q?~Y{dL2/", "0}*S)?ypDGNG1b/", "=<6A+J^F$/*_?H7", "R(6As[..j>*CE#/", "=<6A+JO31dE%:fP}", "fXHjXoCL97fBI94}", "+!GA2E`m:/Tpg!n}mO", "DRq]cJlL1dE%:fP}", "qHv{$2Y/uF#5TNQ^vPT", "`f/1jtHMz~B4(HF<TS7i&^K", "&XmA3", ">Xo{%,I^sa", "&X2Sn]=osa55s%b(SWZP_", "]<3P@.^/yGbd!Na<s@/1^wQU6", "D77AE#&m1a", "bXFS3", "l0k]j?BLPFW", "&fv{3", "?7Gix", "^R#{GBO:1a8", "%Th]E)$.Xd8", "{XZP3", "`{*S32a\"", "x`q]1D~,q", "1fUM_JN\"", "bX^c~", "#Q;jyBGm>~P", "?7|+a", "#Q;jNp@MKrB", "?7~w|", "#Q;jUt/37QJZO", "#Q;jUt/3wQOyVH", "#Q;jd`Bm>~G_TN9^", "#Q;jd`Bm>~bh!87", "#Q;j$W{FSCkGVH", "?7|+~", "e(4,??C@@~vZO", "x`*SSwN\"", "Ist{JuUO8YW46b", "B(@j,[lLq", "iR6Am", "?7Giu", "#Q;jeyQEbF", "bXRSp;<\"", "l0q]zJK", "#Q;jyB{,?Y8", "?7Gi~", "3`NAi5K", "#Q;jNp[.=ai", "#Q;j<Q.LjGP", "?7y1x", "#Q;jd`F,bF8", "?7Gi|", "+RL{d#{Fq", "#Q;jt%R/]~", "TfWPmw8\"", "nQg{t;UqT", "V}M{mJK", "h}TS]unhedE%dH", "6Haj_Jt4zdbpEH", "#Q;jBR_m6", "#Q;jd`].or", "R(6As[..Gg;Z>89^", "0}4,a]CL6", "F!RMo?f\"", "#Q;jUttm>dNG(H", "?7|+F", "#Q;j<Q3UU~", "#Q;j;,[oQ~", "#Q;jRgUE,FB", "#Q;j>t6&%rsiO", "#Q;jq9nEPv\"yO", "RRq]zJ^Fq", "%T7A7t@M~Y_d6b", "%T7AJ,?^@~v5H2!k9PT", "%T7AeP3Uuv;ZAN7", "#74,~?K", "ls4,~?K", "<R4,/?K", "^Rq]AwzFq", "MfRSkPY/fa", "$sM+7?K", "iTOw!?K", "/faj&p@M_GW", "QT2SMt@M~Y_d6b", "9T>S+wRpfa", ".7ajR[q?fa", "rfRSWj2qfa", "dT9,1DkFq", "l0L{_J^Fq", "\"9t{i[Bmfa", "7X%P7?K", "3`k]j?BLPFSzryQ^{O", "#Q;jyBSmQ~", "XX.ABj\".trQ4\"b", "XX.ABjK", "XX.ABj1L6", "#Q;jt%^/uF", "?7y1r", ">H*SVoK", "G<Eq", "G<jq", "+REq", "+Rjq", "YTx1p%q?9Go5O", "?7y1a", "/}UM", "%}2SBj..>d9", "RR4,|?KMXdGCjH", "c!uAcJCmQ~]`g2@", "/}M{/D%pYbWO6ya}P{4,@cK", "m!v{5,[o|r", "2R4,|?KMXd3z$Jn}", "2R4,|?KMXd)3FNb(KY2M3", "KH/16,DLq", "R(4,hJ,VRFxRO", "ls`i};ZVU~", "HXRSSQ@MeGo56b", "Isv6dt1.CW6aO", "Isv6dt1.]>b/d&+LwK", "_{M65ijO", "<ReD*i@4NB<", "YTu4JijO", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.hdxd!N.}wRWP?wZV/>Hp`y)}m92M", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.h~LBoz3<`@qHyj9.Md?jvpu}S!T", "(Wx1~?ynfMHpE#3&NWGAuEVF]~w%(#n}0}ui;E,UA,n?9zq(Bf_j!4$D4BO/F[^N^faj]0?EAx5*g2@", "(Wx1~?ynfMHpE#3&NWGAuEVF]~w%(#n}0}ui;E,UA,n?9zq(Bf_j!4$D4BO/F[^N^fajQt8muv+d}#+&", "7X$6K*UO[W}q}!Df!J\"", "|WIR*t$r@Q)!D?IuP<jq", "Isv6K*UO[W}q}!Df!J\"", "6fu_5iaLEy:uI&+LwTv6ZGK", "f(M6)8]r]QuzJ7Xf$:*b9,:O", "$7}6tRIcEy:uI&+LwTv6ZGK", "7X$6K*UO[W}qV9pzm(jq", "|WIR*t$r@Q)!D?^Ll7zcu", "Isv6K*UO[W}qV9pzm(jq", "6fu_5iaLEy:uI&+L1!^cAP:O", "f(M6)8]r]QuzJ7Xf$:{R*tm4b", "$7}6tRIcEy:uI&+L1!^cAP:O", "7X$6K*?nn/beopUfIK", "|WIR*tPL.B;3}!Df!J\"", "Isv6K*?nn/beopUfIK", "6fu_5iaL;|Xx=3p+X<Fcu", "f(M6)8]r]Q/6h[n_wTv6ZGK", "$7}6tRIc;|Xx=3p+X<Fcu", "7X$6K*?nn/beR5+L|J\"", "|WIR*tPL.B;3V9pzm(jq", "Isv6K*?nn/beR5+L|J\"", "6fu_5iaL;|Xx=3p+/}P_ZGK", "f(M6)8]r]Q/6h[n_1!^cAP:O", "$7}6tRIc;|Xx=3p+/}P_ZGK", "l0:ZCt?n+9tx5?TL6X;D$0~EY!", "l0:ZCt?nQ7RxvQ0+.sIRT*.;NBe", "l0:ZCt?n8W_~5?TL6X;D$0~EY!", "l0:ZCt?n\"WZO![tz::pZ5ir.e>z~lT", "l0:ZCt?n0gVqvT&A|W<M;i=@5yx~i7>", "l0:ZCt?neQT/h7Bc$:pZ5ir.e>z~lT", "l0:ZCt?n+9tx5?TL6X;DJtjcPBe", "l0:ZCt?nQ7RxvQ0+.sIRT*fo~W,^O", "l0:ZCt?n8W_~5?TL6X;DJtjcPBe", "l0:ZCt?n\"WZO![tz::pZ5ir.~@sqQ7>", "l0:ZCt?n0gVqvT&A|W<M;i=@5y6a_Q&A", "l0:ZCt?neQT/h7Bc$:pZ5ir.~@sqQ7>", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.:ddCy90}8f.AlAQE6v+d}#+&mRq]aXZ/9d8", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.ua;C1y:!3`J]cJg6bF5oT\"]NA$%S:2jh@dG4O", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD./Y0Gy90}8f.AlAQE6v+d}#+&mRq]aXZ/9d8", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gG=`42UNy(>17Dem=4NGO|A|g}i]AopVZ1$5Ny@", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.MGB41bYstW`Jq)rv]G9`5%Ysp0aj,e@MKCXZfyy^", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.qdaB9!n}G(>17Dem=4NGO|A|g}i]AopVZ1$5Ny@", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.:ddCy90}8f.AlA=o]G5oT\"]NA$%S:2jh@dG4O", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.ua;C1y:!3`J]cJ>cNvjYj#}k[a,8t;EUka|UVH", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD./Y0Gy90}8f.AlA=o]G5oT\"]NA$%S:2jh@dG4O", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gG=`42UNy(>17Dem=4hdd9Ysp0aj,e@MKCXZfyy^", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.MGB41bYstW`Jq)rv]Gf41ysNd})P*#B@/GV.izzV1O", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.qdaB9!n}G(>17Dem=4hdd9Ysp0aj,e@MKCXZfyy^", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2$VNX],eSx?~Yy5H2ix2RUS3", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2R}XXFS*<OOkv|IL|IVngRSSJK", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2A&I<],eSx?~Yy5H2ix2RUS3", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2f^$T@j9jV/>Mcd_2!}5d&b0ovm6", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2x<L!x1^nT3YM5*g2fu6HK+;?Bm]~", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2F}kfmA)?X/>Mcd_2!}5d&b0ovm6", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2$VNXmAeSx?~Yy5H2ix2RUS3", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2R}XXFS}^OOkv|IL|IVngRSSJK", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2A&I<mAeSx?~Yy5H2ix2RUS3", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2f^$T@j9jUq>Mcd_2!}5d&b0ovm6", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2x<L!x1^nT3)M5*g2fu6HK+;?Bm]~", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gGdC#2F}kfmA)?jq>Mcd_2!}5d&b0ovm6", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.:ddCy90}8f.AlAP.,FlY3%>Nd})P*#B@/GV.izzV1O", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.ua;C1y:!3`J]cJ0hPvn5u/1NpJqHyj9.Md?jvpu}S!T", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD./Y0Gy90}8f.AlAP.,FlY3%>Nd})P*#B@/GV.izzV1O", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gG=`42UNy(>17DemIq9C&zI!U<TSGSx?~Yy5H2ix2RUS3", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.MGB41bYstW`Jq)rv]Go892x}_Tt{&nOOkv|IL|IVngRSSJK", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.qdaB9!n}G(>17DemIq9C&zI!U<TSGSx?~Yy5H2ix2RUS3", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.:ddCy90}8f.AlAP.,FlY:J9^tJqHyj9.Md?jvpu}S!T", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.ua;C1y:!3`J]cJ0hPvn5hBDNG(Gi?wZV/>Hp`y)}m92M", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD./Y0Gy90}8f.AlAP.,FlY:J9^tJqHyj9.Md?jvpu}S!T", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.gG=`42UNy(>17DemIq9C&zI!0}NA&nOOkv|IL|IVngRSSJK", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.MGB41bYstW`Jq)rv]Go892x}R7FSn]k?dFsif3L<?[aiP[a\"", "(Wx1~?ynz,xB1bfVs}x]:]96`C$5WHM(NXTD)Acqo@%Cc%|k3X{S1DD.qdaB9!n}G(>17DemIq9C&zI!0}NA&nOOkv|IL|IVngRSSJK", "B<u_5tGrb", "Mf*c~", "I7M6~", "5Tv6F", "l0:ZCtK", "HfJZe%w@~@", "|WIR*tXVe>z~O", "Isv6K*%q(/N", "6fu_5iaLEyoO+t{", "7X$6K*?nn/V", "uhiZzQK", "|WIR*t$r@Q)!HT", "Isv6K*UO[W}qO", "6fu_5iaLEy:uI&+L", "|WIR*tPL.B;3O", "Isv6K*?nn/V", "6fu_5iaL;|Xx=31", "jQu4l0icH", "f(M6)8]r]Q)SopUf", "f(M6)8]r]QuzJ7XfEK", "f(M6)8]r]Q/6h[n_", "$7Uc[WncU>>/KJ{", "m({Rn0|LEyUO:\"53l7\"", "3;N4n0Ih./beQ7Qh1f^cK*mL./sqO", "3;N4n0Ih./beQ7Qh1f^cK*:n(/<", "3;N4n0Ih./beQ7Qh1f^cK*@4egpxVtM", "3;N4n0Ih./beQ7Qh1f^cK*4D|@d>G(Qc", "3;N4n0Ih./beQ7Qh1f^cK*nco@T/$QM", "3;N4n0Ih./beQ7Qh1f^cK*9D|@wO+tM", "3;N4n0Ih./beQ7Qh1f^cK*)n17XqgT", "3;N4n0Ih./beQ7Qh1f^cK*w@./k", "3;N4n0Ih./beQ7Qh1f^cK*u.>Ql&O", "3;N4n0Ih./beQ7Qh1f^cK*Vq17Y>C3<L", "3;N4n0Ih./beQ7Qh1f^cK*hqOW<", "3;N4n0Ih./beQ7Qh1f^cK*ncyge", "3;N4n0Ih./beQ7Qh1f^cK*)nX>N", "3;N4n0Ih./beQ7Qh1f^cK*bqO9Br<3J3l7\"", ">X2cAPK", "shP_hQ$rrWK6O", "3fo6AP>E(/", "+RP_Kte.|96aO", "\"!v6F", ":Q#6$4<oEyeqbtM", "{XIR~", "PTxq8R)n9Q(qKT", "khIRqi,cQ7KelQSL;K", "#7K6", ">XzchQ@.9Q(qKT", "8Tu4Jiu.9Q(qKT", "7X$6K*?nn/be9TJ3?7\"", "|WIR*tPL.B;3.(u_;AM6", "Isv6K*?nn/be9TJ3?7\"", "6fu_5iaL;|Xx=3p+l0:ZCtK", "f(M6)8]r]Q/6h[n_0PRc.4pO", "$7}6tRIcEyoO+t{", "$7}6tRIc;|Xx=31", "$7}6tRIcEy:uI&+L", "$7}6tRIc;|Xx=3p+l0:ZCtK", "5T2cwWUcNB>a.(<LO@\"", "X<XcK*\"mXQ:XlQSL;K", "7XdR~", "l0}6dtZO", "$sEq", "#7;8a", "^RhZ;idO", "rf*cTiFqH", "sRhZCtdO", "<R;8|", "t<u_*tK", "QTMm=C;@0gex}T", "ls;8a", "<R;8=CjnQQV", "%Tm_b*;@0gex}T", "%Tm_b*zq|9S", "iT~Ur", "\"9v6O9ncH", "CTo6K*_.XQN", "%Tm_b*cqPBpxvT{", "9Tzc5iw`H", "dT]8pRjO", "RRP_8B>/rW*H}Q3clK", "D7*bK*jnp!", "khIRqi,cQ7Ke![_h", "<R*bEtK", "{f|6x", ".7&D$Q<oH", "X<XcK*\"mXQ:X![_h", "gdIRHtK", "rfkZr", "jQxq", "rfkZO*:n(/<", "rfkZO*@4egpxVtM", "gdIRHtXVn/H6O", "gdIRHtPL?WBrKJOL", "iTo6~", "rfkZO*_.n/<", "rf*chQ2n9Q4xWtM", "4T*c=Qz^B7", "ns*bx", "7X$6K*UOrWy3O", "l0P_jWK", "Isv6K*UOrWy3O", "6fu_5iaLEy:uz7l_", "^RhZ;i1.Q7Xq<31", "QTMm=CUOrWy3O", "<R;8=CUOrWy3O", "m({Rn0|LEy:uz7l_", "nsbq;tr.Q7Xq<31", "}RIR\"*UOrWy3O", ">XRcXY$r@QJOgT", "CTbqw8w@rWuz#Q.u[K", "WT`_K*UOrWy3O", "IQm_b*UOrWy3O", "ns*b\"*UOrWy3O", "%tKmmPG@?@sq.(u_4Txq", "$7}6tRIcEyZS=3\"L", "6fu_5iaL;|E30t<LKW:Z6iK", "f(M6)8]r]Q\"h^[Bcr{2cEidO", "$7}6tRIc;|E30t<LKW:Z6iK", "3;bq5incXQ5>op1", "rf*chQ2nCWe_O", "|WIR*t{p|@vrbt1", "Isv6K*dcNBVqvT", "6fu_5iaL;|kqgQ+LlK", "m({Rn0|L;|kqgQ+LlK", "nsbq;tr.CWh~9QWc", "}RIR\"*dcNBVqvT", ">XRcXY{p|@vrbt1", "CTbqw8w@rW5>bt|z\"W\"", "WT`_K*dcNBVqvT", "IQm_b*dcNBVqvT", "ns*b\"*dcNBVqvT", "%tKmmPG@?@sq~H+L((M6x", "lseDr", "%TL6", "gdIRHtdqPB`_k7_clK", "rfkZO*4D|@d>G(Qc", "rfkZO*nco@T/$QM", "rfkZO*9D|@wO+tM", "rfkZO*)n17XqgT", "rfkZO*w@./k", "rfkZO*u.>Ql&O", "rfkZO*Vq17Y>C3<L", "rfkZO*hqOW<", "rfkZO*ncyge", "rfkZO*)nX>N", "rfkZO*bqO9Br<3J3l7\"", "f(M6)8]r]Quz#Q.u[K", "$7}6tRIcEy:uz7l_", "iTzc*tZO", "iTzc*tr.8W_~KT", "iTzc*tr.\"WZO![tz;K", "iTzc*tr.0gVqvT&A|W\"", "iTzc*tr.eQT/h7BcEK", "8T4DWB{qs7^", "uh*c4B=Degbek7Wc", "p<YZ?8nhb", "f(M6)8]r]Q5>bt|z\"W\"", "$7}6tRIc;|kqgQ+LlK", "=QRcwW{pegvr831", "iTzc*tr.rWVq)7Df;K", "iTzc*tr.jgnu#Ql_", "iTzc*tr.?@8x}T", "iTzc*tr.]Qnu<3>", "iTzc*tr.9QwutT53$7\"", "iTzc*tr.qBIbHT", "iTzc*tr.eQ3TlT", "iTzc*tr.jg]OST", "iTzc*tr.0gIc@Q:uaf^c~", "NhIREtyO", "=QRcwWPLo@@/F[0+=Q}6x", "6fMmbi:niBqz_T", "5T2cwW<o%W*H^5`+jQv6F", "NhIREt6.8W_~KT", "NhIREt6.\"WZO![tz;K", "NhIREt6.0gVqvT&A|W\"", "NhIREt6.eQT/h7BcEK", "NhIREt6.rWVq)7Df;K", "NhIREt6.jgnu#Ql_", "NhIREt6.?@8x}T", "NhIREt6.]Qnu<3>", "NhIREt6.9QwutT53$7\"", "NhIREt6.qBIbHT", "NhIREt6.eQ3TlT", "NhIREt6.jg]OST", "NhIREt6.0gIc@Q:uaf^c~", "rflDD8nnXQ(", "rflDD8nnXQ*5K", "l0;86i5@b", "9T2bCtIcH", "gdIRHtXV:Bb6O", "7X$6K*dcNBVqvT", "^RhZ;i1.CWh~9QWc", "QTMm=CdcNBVqvT", "<ReDMi$rXQ!TO", "^RhZ;i1.9Q4xWtM", "QTMm=CFV./q6O", "gdIRHtamPBY3opOL", "gdIRHt$rn/.u831", "gdIRHtC4XQ>aO", "gdIRHtPL./jO$T", "gdIRHt$re>.uk7n_EK", "gdIRHtSBX>(qO", "gdIRHtA/K!t^O", "gdIRHt$r.Bx~O", "gdIRHtdqzQ)OQ7l_~}M6", "7X$6K*jnA!", "|WIR*tA/.BX", "Isv6K*jnA!", "6fu_5iaL;|sx]T", "f(M6)8]r]QmTh[1", "$7}6tRIc;|sx]T", "^RhZ;i1.ygJSO", "m({Rn0|L;|sx]T", "nsbq;tr.ygJSO", "}RIR\"*jnA!", ">XRcXYA/.BX", "CTbqw8w@rWmTh[1", "WT`_K*jnA!", "IQm_b*jnA!", "ns*b\"*jnA!", "%tKmmPG@?@sqYf)z:K", "7X$6K*]`?Wh~KT", "|WIR*t$rCWkq+tM", "Isv6K*]`?Wh~KT", "6fu_5iaLEyv>eQDf;K", "f(M6)8]r]Quzk7+LM@\"", "$7}6tRIcEyv>eQDf;K", "m({Rn0|LEyv>eQDf;K", "nsbq;tr.Q7b/btOL", "}RIR\"*]`?Wh~KT", ">XRcXY$rCWkq+tM", "CTbqw8w@rWuzk7+LM@\"", "WT`_K*]`?Wh~KT", "IQm_b*]`?Wh~KT", "ns*b\"*]`?Wh~KT", "%tKmmPG@?@sq.(k3)7v6~", "<ReDMiXVXQ(q}T", "<ReDMie.XQHa&QM", "<ReDMiA/NB0qO", "K9u4?0AqT", "K9u4?0$@T", "rfaDfQ{p|@vrbt1", "=s$6~", ".7hZn0aLb", "3fo6Etr.CWtxKT", "3fo6Etr.@QJO27pzlK", "t<eDEtr.CWe_O", "jQ;D?8nhb", "CTK6B,pO", "3flDD8K", "|fZR:QUO", "5To6Q<K", "5To6S^K", "7X$6K*}`~@", "|WIR*tdqt9<", "Isv6K*}`~@", "6fu_5iaLEy1<HT", "f(M6)8]r]QlO/9M", "$7}6tRIcEy1<HT", "m({Rn0|LEy1<HT", "nsbq;tr.e>pqO", "}RIR\"*}`~@", ">XRcXYdqt9<", "CTbqw8w@rWlO/9M", "WT`_K*}`~@", "IQm_b*}`~@", "ns*b\"*}`~@", "%tKmmPG@?@sq}!TAEK", "Mf*cN%_4b", "7X$6K*G@eQJSO", "|WIR*tdqs78x]T", "Isv6K*G@eQJSO", "6fu_5iaLEyy3^[Ym", "f(M6)8]r]QlO>f?z:K", "$7}6tRIcEyy3^[Ym", "^RhZ;i1.e>53h[1", "m({Rn0|LEyy3^[Ym", "nsbq;tr.e>53h[1", "}RIR\"*G@eQJSO", ">XRcXYdqs78x]T", "CTbqw8w@rWlO>f?z:K", "WT`_K*G@eQJSO", "IQm_b*G@eQJSO", "ns*b\"*G@eQJSO", "%tKmmPG@?@sq}!l_{Xyq", "|WIR*tK", "7X$6~", "B<;8fQK", "Isv6~", "6fu_5iaLH", "7X;Dg`foU>&", "27*bx", "nseDCt?niBJOvT", "YTRcwWK", "f(M6)8]rU7", "+R}6>8pO", "CTo6~", "ls(qG,2n<WA~ST", "6Hv{Aw3F<YdZ!\"", "6Hv{Aw3F<YdZF\"", "ls(qG,2nrWlu:7>", "sRhZCt1.9Q6/}T", "5T2cwW<o%W*H^5{", "t<Xc[WK", "nseD%RpO", "3fv6K*l`~We_O", "8T>c~", "$s$6N%erd@", "$s$6N%erCW*Hh[XfO@\"", "S{*b*tUO", "NRXcMi0O", "B<$6x", "u{M6", "+RP_KtK", "CTo6<yerv@", "jQ;D}y<oUQY3O", "e<KmK*)ns7<", "TXkZr", "^RhZ;i1.CWJOWt1", "QTMm=CdcX>,_O", "TXkZsgerx/", "nsxq~", "jQ;D}yhES@", "j7zc*tXVXQ(q}T", "j7zc*te.XQHa&QM", "j7zc*tA/NB0qO", "l0iZpR.;;|lcgT", "l0iZpR.;;|lc^[v~", "ZQkZCtu.<WA~ST", "ZQkZCtu.rWlu:7>", "xf3RF", "^RhZ;i1.jg3THT", "^RhZ;i1../LTO", "QTMm=Cicyg<", "QTMm=C=@9>", ":Q#6$4<oH", "PTxq8RXO", "khIRqi,cQ7&", "%To6[0YcH", "<R;8=CmL[W]!O", "<R;8=C6.n/s", "=Q5_jW$rX>k", "8To6JGK", "PTxql0aLH", "$7}6tRIcH", "nsbq;tZO", "}RIRF", ">XRcXYK", "CTbqw8w@~@", "WT`_~", "IQm_u", "ns*bF", "%tKmmPG@?@sqO", "8Tu4JijO", ">XzchQ*O", "5T2cwWUcNB>aO", "X<XcK*\"mXQS", "7X$6K*u.S9Y3O", ".7&D$Q<o;|Nqopk3&R\"", "ls*bx", "y<M6~", "HX`4fQA/.By3O", "B<;8*tK", "iT~UO*ycX>d>831", "\"9v6O9nc;|Nqopk3&R\"", "8T2bO9UO", "6Hv{Aw3F<YdZh\"", "rflDD8nnXQOeJ7l_lK", "rfaDfQXVNBqzlQ3c", "jQ;Dy`+qs7", "CTo6<y=@iB,7K!9hEK", "jQ;D(P4DPBR_|T", "jQ;D<pr.]gb6xt+L", "YTu4Jiu.<WJOvT+L[K", "jQ;DDiicNBR_O", "%T^cTikO", "6Hv{Aw3F<YdZz\"", "D7FcLQpO", ")Qxqx", "nsv6~", ")Q&DdtZO", "Ig2czpQO", "5TaDr", "b@Fc~", "w7*bF", "\"!Ub", "[TdP%;t\"", "*Rq]&QxpXa", "SW,1", "j<NA}oncX~B", "[TdP%;t\"", "cXv{c", ";;wp&;5.,FGut!((7O", "tW4j8U{Fsd8GVH", "79L{W5e4Jv8", "}ft{yB~,qv8", "c!UM", "5RNABjK", "}ft{yB~,qv8", "`fFSsyDLsa4", "tW4j8UCLD~ZZO", "}ft{<QxpXa", "TXh]cJr\"", "c}HjlEemQ~", "=<g{", "4WQM", "XXmq0oq?|r", "ERzSz", "HL]4", "%aongEN=G+T7v.0", "_)OqxEbJdy\">H", "lT:_o", "%aongEN=G+T7v.0", "_)OqxEbJdy\">H", ":,WnAct", "%aongEN=G+T7v.0", "Ph4,kp.L]G0ZO", "nT/1@*A?tr<#O", "ifUM", "[Tg{", "qH2S3", "tW4j8U{Fsd8GVH", "`fFSsyDLsa4", "/!PAQj^qsa4", "&X2SSQ}\"", "`fFSSQ}\"", "tW4j8Ua\"", "WGI=@82XD", "iPE8eo54q", ":T9j[2N\"1d>;:f.}mO", "_9/1f", "_9/1f", "sXh]cJ8\"", "c!RM<nmL@~G4O", "U<3PSJK", "r!;j=JcFQdW", "fX_j@Da\"", "3`TS)?K", "gP&,zJLmed\"Pmb", "3`TS)?K", "Nf(1", "tWy1mJK", "*Pl,GB*E]GGZO", "(XFS3", "kXQS)?v.(F", "}fM+i5K", "XXo{", "R0w{m", "h!K{c", "P0LT", ":&_Jk?YpN}n", ":&_Jk?)Oh}(2DYUWnIwD", "ccyONu{!r", "80w{]u{OCF9", "?DZ]<4~pYmE&<?N@b&D", "3X{w+ZBLPvQ", "8=r\"Ss|txHvl:>~r:`5O%!+0oTj+$Ku%f^[K", "=8Ut(`YH", "S+,ci", "1TJVDXlJkWP", "fXHjXoK", ";fln0", "0hLV(`3CVfmY:@I", "80w{m", ":&_Jk?u;SU(}l", ",XK]VufJ>L.>)AI", "A!,1}pF?Xdhd1b", "OH4j>DN\"", "cXv{YB4B]~", "LQbtq", "Gh>tSo0yjW$Ml", "%THj+wC=bADDUE98MUJNq(+!T", "A!,1YB2q9G$jO", "SeVH^fQQb/m]lsMWZ+VH9k{Jbt]Ed3i7Hdpl9k%+1$~bYHZfl/N@wT%+yHYENlk,)jlkp2g2yHYELleOz#9ZV@Xt[tvELlBO:`9c@N]2K]/y.),cR%Jf<sd+GoZ2DF~DR%<e1$~bYHZfl/N@wT%+yHYENlk,)jlkp2g2yHYELleOz#9ZV@Xt[tvELlBO:`9c@N]2K]/y.),cR%Jf<sd+GoZ2DF~DR%<e1$~bYHZfl/N@wT%+yHYENlk,)jlkp2g2yHYELleOz#9ZV@Xt[tvELlBO:`9c@N]2K]/y.),cR%Jf<sd+GoZ2DF~DR%<e1$~bYHZfl/N@wT%+yHYENlk,)jlkp2g2yHYELleOz#9ZV@Xt[tvELlBO:`9c@N]2K]/y)", "OH4j>DlL4Fg", "@8CV;]$_K", "M2:Oq", "u9/1!Do4)g_d<yDN3O", "3`q]zJu@U~Kwd9DN", "79x1^wN\"", "cTCV", "FnT1P]vuH(q<SN", "P0,1", "0hLV(`XH", "Qg(_(%!OT", "{~T15>Ip", "%OGA.9OuR", "Zgw{m", "c@mA|2=osaMBq8y^3!b1", "152#,qM", "^XM{", "H!/1dEO,eGW4(H", "`e_nF8.5h", "zhOt", "NOrJi#eV9(elF", "%}^S[?K", "iJ^S3", "1TJVG", "80*f{", "OH4j>DlL4Fg", "P0,1", "0hLV(`XH", "S+JV.M*3jW&+SX5ztl", "3X{w6Dc,NvR", "3Xb1_JQULG<)O", "c@mA|2=osaMBq8y^3!b1", "ETdV1bz?r", "ETdV", "C[aF!M)", "IBV++0S", "zhOt", "w8%+{6lwvF]ZcX&8hddT", "0hq1q", "GTiR8:ts1UB7\"c", "mW4,s^K", "`Xb1W5amkvdZ6b", "nT/1@*A?tr<#O", "ifUM", "8fUM", "o<y1", "Bh_j??K", "2Ry13wBL6", "*Rq]9R\"M~Y8", "OH,1", "*Rq]9R\"M~Y8", "*Rq]9R\"M~Y8", "M%b1c", "A!6Az", "M%b1c", "M%b1c", "`{*SSwN\"", "mW4,s^K", "4fM{)?K", "_9/1f", "c!o{p;_m6", "OH;j(ZK", "c!o{p;_m6", "ERzSNp2q>dXCy9@", "ERzSNp2q>dXCy9@", "ERzSNp2q>dXCy9@", "W;k]L", "_9/1f", "j6wA[E8\"", "u!~w_", "KYl,(nK", "V}y1", "iPE8eo54q", "u!~w_", "u!~w_", "_9/1f", "jMLZ~?YVNv~RGWw<<K", "}7dM!Q}\"%R+tK", "fXHjXo3O\"v)YFNq", "fXHjXo3O_C}Gt2=VQK", "r9ajj?v.(F", "XXmq0oq?|r", "V}y1", "sX>S3", "(XFS3", "r!x1", "m!x1", "Y6/1", "wR4,*#a\"", "`f>S3", "jMLZ~?YVNv~RGWw<<K", "}7dM!Q}\"%R+tK", "fXHjXo3O\"", "fXHjXo3O_C}Gt2=VQK", "jMTMtRz^|@eqr(SL\"OXf5A@D.4%YK", "c!^S0;8\"", "fXHjXo3Oqd~Ri\"", "jM8U*iYOe>1/k[tz\"OXf5A@D.4%YK", "c!^S0;8\"", "fXHjXo3Oqd~Ri\"", "_9/1f", "iPE8eo54q", "V}y1", "r!x1", "m!x1", "jMLZ~?YVNv~RGWw<<K", "}7dM!Q}\"%R+tK", "fXHjXo3O\"v)YFNq", "fXHjXo3O_C}Gt2=VQK", "_9/1f", "j6wA[E8\"", "r!x1", "m!x1", "jMLZ~?YVNv~RGWw<<K", "}7dM!Q}\"%R+tK", "fXHjXo3O\"v)YFNq", "fXHjXo3O_C}Gt2=VQK", "_9/1f", "3X#{mJ[o6", "r!x1", "m!x1", "jMLZ~?YVNv~RGWw<<K", "}7dM!Q}\"%R+tK", "fXHjXo3O\"v)YFNq", "fXHjXo3O_C}Gt2=VQK", "_9/1f", "*rAxk$~iOhxxmEVH^&(;U*=}_zo3u", "}7dM*AX)RFXYf%$<sfajJud/PF94T8vsx~zSGj$o\"", "fXHjXo3Oqd~Ri\"", "fXHjXo3O_C}Gt2=VQK", "_9/1f", "r!x1", "m!x1", "r9ajj?v.(F", "jMLZ~?YVNv~RGWw<<K", "}7dM!Q}\"%R+tK", "fXHjXo3O\"v)YFNq", "fXHjXo3O_C}Gt2=VQK", "XXmq0oq?|r", "jMLZ~?YVNv~RGWw<<K", "}7dM!Q}\"%R+tK", "fXHjXo3O\"v)YFNq", "fXHjXo3O_C}Gt2=VQK", "jMY_1D`mQ~__?H[udPJ]Bj3O%R+tK", "}7dM!Q}\"w@uRVHRaN7x]1", "jM+5qDRpv8htn9.<NDO", "fXHjXo3Oqd~Ri\"", "fXHjXo3O_C}Gt2=VQK", "XXp_j?LmX7N", "C(q]_JTOkvR", "iPxDp;mmQ~", "}ft{yB~,qv8", "}ft{z", "`fFSsyDLsa4", "tW4j8U{Fsd8GVH", "tW4j8Ua\"", "/!PAQj^qsa4", "&X2SSQ}\"", "vR*MzwK", "j<_jAJ^qsa4", "[TdP%;t\"", "r!;juwlL]~ZZO", "qH2S3", "2R4,|?KMXd8", "c!/1^wBm6", "PAeE+ruC", "*L_3f+{ByuT", "i5HE>|6CB", "PAzqw)}", "i5HE,TBGXH", "&X2SSQ}\"", "/!L+cJ^Fga,]s%/k", "+lD+3\"{ByuT", "[TdP%;t\"", "r!;juwlL]~ZZO", "qH2S3", "2R4,|?KMXd8", "c!/1^wBm6", "VX*Sj?a\"", "/!PAQj^qsa4", "`fFS&p@\"q", "VXmiW5K", "`fFSc4q,(F", "&X2SSQ}\"", "/!L+cJ^Fga,]s%/k", "j<_jAJ^qsa4", "[TdP%;t\"", "r!;juwlL]~ZZO", "qH2S3", "2R4,|?KMXd8", "c!/1^wBm6", "/!PAQj^qsa4", "`fFS&p@\"q", "VXmiW5K", "`fFSc4q,(F", "&X2SSQ}\"", "/!L+cJ^Fga,]s%/k", "j<_jAJ^qsa4", "[TdP%;t\"", "r!;juwlL]~ZZO", "qH2S3", "2R4,|?KMXd8", "VX*Sj?a\"", "c!*Mc", "c!/1^wBm6", "j:!WTIfb", "ABI*M#^5EiZZF", "kJz*3k)", "R3%0R", "II#q{I?xK62MfBQQ~F", "@a6HROuKQ6", "VXmiW5K", "qa%0", "5BuEWjLd*yR/C\"", "5BuEWjLd*yR/C\"", "6B|EYZ)", "}ft{yB~,qv8", "naf0r", "&oOKvw)[3!p", "+BKCG@F6Ei5LC`_", "pfUMx]a\"", "/!PAQj^qsa4", "}ft{yB~,qv8", "naf0Jyhq3c", ">BW+y*$u7cO", "f,O*p<067!p2t(", "`fFSsyDLsa4", "tW4j8UCLD~ZZO", "naf0`LiKu%p", "naf0Jyhq3c", "&0_AbE:~6", "Qg{#?+m@6", "sQjHd&C66", "sQlJ!Jw<T", "&0dMEERh6", "&05%P<ihT", "Ft;JDNWh6", "&00]K&KrT", "qH2S3", "?<ZPe;KMTFog3H", "U<3PSJK", "c!/1^wBm6", "qH2S3", "2R4,|?KMXd8", "[Tg{", "VX*Sj?a\"", "sfx1", "z`mAj?a\"", "V}5Az", ",fv{", "fX/1", "iJ^S3", "8fUM", "c!/1^wBm6", "qH2S3", "2R4,|?KMXd8", "[Tg{", "VX*Sj?a\"", "sfx1", "z`mAj?a\"", "V}5Az", ",fv{", "fX/1", "iJ^S3", "8fUM", "c!/1^wBm6", "qH2S3", "2R4,|?KMXd8", "[Tg{", "VX*Sj?a\"", "sfx1", "z`mAj?a\"", "V}5Az", ",fv{", "fX/1", "Pf>S3", "?<ZPe;KMTFog3H", "nT/1@*A?tr<#O", "ifUM", "8fUM", "OH,1", "pfv{", "OH,1", "pfv{", "?<ZPe;KMTFog3H", "?<ZPe;KMTFog3H", "c!/1^wBm6", "A62bdtl}dWs7ct|zbXRc?WmLK!US@!5AY6*M_JWV+YQQC%XN(X^SeoT3QaOw%|6XStlJv&l<v{eoK", "o<_jXoK", "6Hv{Aw&\"", "j6wA[E8\"", "_9/1f", "_9/1f", "j6wA[E8\"", "NRL{3", "sXminEa\"", "m!;jV;Lv>~kGv!o}", "m!;jV;Lv>~kGv!o}", "m!;jV;Lv>~kGv!o}", "m!;jV;Lv>~kGv!o}", "m!;jV;Lv>~kGv!o}", "!PCS}o|4(FP4\"b", "U<Hj=2@4@GyC{|1N", "zXv{}p[.zdjH&z]N;R/1", "}fv{%gBL+r", "m!v{M*#.Ud8", "m!v{M*#.Ud8", "m!v{M*#.Ud8", "m!v{M*#.Ud8", "m!v{M*#.Ud8", "m!v{M*#.Ud8", "m!v{M*#.Ud8", "m!v{M*#.Ud8", "mrba\"#P", "SrcW|.L4", "Bh_j??K", "Zi=\"b", "2R4,|?KMXd8", "IguW", "8fUM", "yig\"\"#d4", "=<6A+J^Fq", "0x=\"/MP", "Z<l,SJ5.b", "Nf/1@*h,(FG4\"b", "ndkc_v%0g", "L~~R~", "v>/io", "o<_jXoK", "L~%z4kG@T", "&0xH@", "c!/1^wBm6", "+!GA2E`m6", "XXK+VoK", "XXK+Voj^!x", "pfv{", "OH,1", "qH2S3", "v{RMmJK", "[Tg{", "c!/1^wBm6", "pfv{", "OH,1", "+!GA2E`m5|m)A\"", "qH2S3", "v{RMmJK", "[Tg{", "c!/1^wBm6", "XXK+VoK", "pfv{", "OH,1", "XXK+Voj^!x", "qH2S3", "v{RMmJK", "[Tg{", "c!/1^wBm6", "pfv{", "OH,1", "+!GA2E`m5|m)A\"", "qH2S3", "v{RMmJK", "[Tg{", "c!/1^wBm6", "+!GA2E`m6", "XXK+VoK", "XXK+Voj^!x", "pfv{", "OH,1", "qH2S3", "?<ZPe;KMTFog3H", "v{RMmJK", "[Tg{", "c!/1^wBm6", "pfv{", "OH,1", "+!GA2E`m5|m)A\"", "qH2S3", "?<ZPe;KMTFog3H", "v{RMmJK", "[Tg{", "c!/1^wBm6", "XXK+VoK", "pfv{", "OH,1", "XXK+Voj^!x", "qH2S3", "?<ZPe;KMTFog3H", "v{RMmJK", "[Tg{", "c!/1^wBm6", "pfv{", "OH,1", "+!GA2E`m5|m)A\"", "qH2S3", "?<ZPe;KMTFog3H", "v{RMmJK", "[Tg{", "c!/1^wBm6", "sXh]cJ8\"", "i}*M+w9m6", "r!*S/]+UU~;Z!7]3{O", "5h#{>*\"M>dW41b", "tWy1mJK", "m!x1&o}\"]~5Zmb", "x`*SSwD.prFe#!sN1O", "A9RSM*mm6vYZVH", "[TajzJ5.fd$5a2f^)<2MSJK", "5h#{>*T3@~5Z:fJ(NWT", "c!uAb)g.s~Hp`%7", "AX>SM*k/@~vZO", "Ph4j9j6M9df#1b", ",f{P1*h,(F9Cub", "A!6A1*8.!x", ">HL{!DZV6", "i}#{AJN\"", "m!v{3", "tWRSQjL\"", "HH4jAJK", "U<3PSJK", "tfh]Qj3UU~", "%}^S[?K", "1HTSSJK", "[T>SVo@\"", "79L{W5K", "m!v{M*fm%rxRO", "nT/1@*A?tr<#O", "ifUM", "o<_jXoK", "tWRSQj[4OY9", "],/]bE<@6", "$7/1t;^?trsi8Ex|", "vRi]5<K", "vRi]X^K", "q`o{&nK", "XXmq0oq?|r", "m!x1qDtmPvJZ\"/_>SO\",p;~,UdR0>2_^Y[A3A", "r9ajj?v.(FcZQN[}4faj(_[KU1MvHMXdt]VHw<X@NAEu;\"", "3fA]_J8\"", ")Rl,<w?E6", "c@7ihJ0/jG?gO", "CRNAj?jqW~mGt!G^hO", "=<6Am", "=<6Am", "r!*S/]+UU~;Z4zBs0<q]~?Aquv8", "5Rk]e;$Le~=`0Lu<#a2M", "tWy1mJK", "Nf/1L]54q", "(XFS3", "r!*S/]+UU~;Z!7]3{O", "2Rl,Q5@\"", "tWy1mJK", "Nf/1L]54q", "c!@jf2a\"", "r!*S/]+UU~;Z!7]3{O", "W;RMP[%pIqCCry%k", "tWy1mJK", "Nf/1L]54q", "c!@jf2a\"", "fXdPmJGLq", "L!9jt;&m6", "Pf>SAwq3q", "2R4,|?DL8Y_dO", "EQHDY?&`q", "Z2nRI0Wrj", ")]Q|![Tl", "U<l,??K", "PY<TH", "fXv{0o:E6", "x`*SSwzFq", "gP&,zJLmed\"Pmb", "0<._HijO", "u!~w_", "cXRS(;~p6", "r9ajj?v.(F", "XXmq0oq?|r", "j6wA[E8\"", "PTzc~", "j6wA[E8\"", "j6wA[E8\"", "7XxqTtK", "j6wA[E8\"", "^P{Ra", "j6wA[E8\"", "j<5ABj8\"", "sXh]cJ8\"", "?Tv{0;&m6", "]<3P@.^/yGh#+|l}*PT", "L!9jt;&m6", "c!uA:E`mJyMyO", "79L{W5e.or", "3!Ow\")KMSCo5O", "r!;j=JcFQdW", "tWRSQj[4OY9", "G(o{NnA/jGW", "*iNX}Jj", "ru)MRI>&qh5G0", "&6HM)W#=", "r!;j]?VUU~", "0ft{1*IE@Gv4\"b", "*Y.Mqe`}S", "hfv{J<D6MaHpmb", "kYuH$_FwWR{K!Qr|", "kYfxTqz*F^)zi;w", "Vf2SM*Wp]GyZO", "Vf2SM*(/jG!R:[BV0}T", "1:&81niwMJYd0", "j<6A.]dq9df#o2F}Dd4,B5K", "Vf2SM*;mbFP", ",$_x1n0Z]o[c,:Z|S:n1/?4=", "Vf2SM*O:,F8", "Vf2SM*DLjGP", "MH.AM*xpXaHp<%~khO", "1:&81neer3V<0", "MH.AM*~p]G5ZO", "{|:Mle.&~^>AX%[", "/FuH@n^yHJ<G0", "T$uH@nJ*PJr", "aF`rvnJ*PJr", "uYA]xWr\"MJ}h0", "{|\"@LIj", "rud1k", "ngStU", "IgN:1", "m!TS[E..s~Hp`%7", "kYYHFqO=", "zu)MIIj", "YY.]8W0oMJ^zp{~O", "m!v{M*fm%rxRO", "*Y6xEe&&yLdH0", "E6CMBW<&~^:y4tXiEC6", "[Q^?_H/wEhhG0", "z`mAj?g.fdkijH", "YY6x?I>&yLdH0", "c!uA:E`mJy3drb", "tW#{>*BLedE%dH", "m!v{M*BLedE%dH", "*Y3@1nEqRLzA0", "*Y3@1n;&}5%", "m!v{M*~p>~B", "^X/1c", "T$#@*WL=", "c@7ihJ0/jG?gO", "$F5r*WJ\"WR)zS{Yg%!6", ",|{v", "Z63@[I_XIh%", ".T>S3", "_dA]RIj1F5%", "rugHII8wzCWGi;]|", "kQ\"@k", "8YS8vn%&Ys", "5h#{>*T3@~5Z:fJ(NWT", "AX>SM*k/@~vZO", "c!uAb)g.s~Hp`%7", "x`*SSwD.prFe#!sN1O", "A9RSM*mm6vYZVH", "[TajzJ5.fd$5a2f^)<2MSJK", "Ph4j9j6M9df#1b", "ndXHPnio}^fA0", "m9v{", "Phk]pUdq9GW", "=<6A/*?quv8", "XX.ABj\"49Gm", "h!x1", "#$uHfM`}}^", "tWy1mJK", "%}^S[?K", "kXQS)?v.(F", ">$gHk", "`Xb1W5K", "=<6A+J^Fq", "`Xb1W5amkvdZ6b", "D6wvPn8I#Lp;0", "OH&j.2@MEF94\"b", "Wul]B", "sXminEa\"", "kF}1", "*Pl,_", "<!t{z", "Wfv{n]UEbF", "!.m9#.J\"ro!", "F$}1", "dRNAP5e.UdhdO", "]$@rB", "r96ip;_m6", "*Pl,u8G.faB", "!!TS+nK", "rugHIIj", "U<3PSJK", "c!h]9j8mX~B", ",FnxMIC=", "8YS8B", "XX*Sn]K", "F!TSmJ8\"", "[Tg{", "nrl]gy`}S", "z`mAj?a\"", "fXv{0o:E6", "*Pl,kpF?sa*CEH", "*Pl,u8LmrYf#O", "8Y>@)", "cX#{3", "^fb1", "oYd1k", "%}(1", "nrl]fdR2X", "E6CMPIneHJJG0", "|$3@1n7\"MJr", "wQ.Mvnp*}^%", "KdA]?Ij", "nrl]gyP1jLz", "CR4,w?q?|r", "(dl]Y79,X", "YYfx,q%=", "c@UM", "nrl]P#@oH^<G0", "A!g{AJT3q", "!$3@xW4=", "nrl]T{XIF5q<0", "m!*SRjGm1a6pEH", "y}/1@D;Lq", "1HTSSJt\"", "gFq@", "*YsvX7#*r3WG0", "*YsvX7#*r3WG0", "{|wvP7.\"X", "kXo{", "9$}1", "4fM{)?K", "kYd1pD*\"P^JA0", "FFh)JlK\"S", "OH{w%[b,XdW", "#6^A", "%$}1", "HpXHy}j", "DhL{SJK", "a9b1c", "{6AaFNG", "27|+uf{", "3d9HF/j", "H]wHNepPS", ">X.ABj3O\"", "{`wv{IH&3%I>2B&|s^Gr7m+AF5yJRq^g:/}1^DA*3N\"zbQ/UFFa<iGEq^hdT!t)m", "$F)MP7C=", "#!A]B_>&~51{VWrs", "UF&8zM]^ahs5GQB/>>GrQmj", "B4*8MI9,!5y8$t$,dr6", "fX_j@Da\"", "tW4,z2g.sdMy$JPx", "B4*8MI9,!5y8$t$,dr6", "]<3P@.^/9~", "Pf>S3", "0:@?tEN]F5!", "ifUM", "*YsvX7#*r3WG0", "c!RM<nmL@~G4O", "BFm8bH+qF5\"J5QQ/F!6", "Mp<8zMD,yLhG]:", "j<5ABjRpDGkiP%7", "LYnxwHa}}^.GY[H`@0", "5h#{>*\"M>dW41b", "*Ysv2q|=H^<G*N", "b4oML.)bV5sxEP", "fX_j@Da\"", "#!A]B_>&~51{VWrs", "XXmq0oq?|r", "qH2SQBCLed3dzN7", "1&Di>t+/bs[i{]{/nhy", "c!RM<nmL@~G4O", "b>nxIex=3S2:HYA|v0", ">$fxoe}e#L7q{#\"p8Y6", ">$fxoe4*S", "SR4,1D|\"", "Gf:MT.w]U^9", "oZk](ZK", "RTFS!?f\"", "M[dxy.O=", "OdO8#}j", "0}`JrEK", "w|1@w7tyhN66`RD|9rJ8v", "T|T$LIj", "lTA]w7tyS", "FP;j9jnq(F", "1$5rw7tyS", "(Rl,lEf\"", "(fCMT.w]U^9", "~}A]9j{F8YxdO", "6WRM/D[o6", "WT^SWj{F]~", "=FdxT.O=", "7fx14[[o%YxdO", "QTui!D[o6", "bX4jSJ[4>~g0y?5(B{47z", "}f.MiGj", "XF6xYI$=", "0WK%}oK", "qXb1i[&mjGy4NOLh6HL+u]nqNva", "0W=T??K", "qXb1i[&mjGy4NO]zJhl,/cK", "@FUx!MDXio", "IQ9j7D[o6", "y<ZP%;S\"", "y<ZPSJb,>~i", "gd2M>D%p6", "K94j@D%p6", "oARS1Db,>~i", "GH0N%LJC=", "uh3PmJ9mYb.f?9tk`f`Ai5[K", "Mu+64.l\"X", "mu`r*WQ*hNx)`RB/O!WHQMfe`X", "R3r2O@_xJ};o6sXg>.ybBp8)*43q3PtQn3iI!~L)Q$lFwQ^Qh3z7", "L!x1Swr\"", "=!Z=r", "C5e7V6+C=", "x(W[b6810={~B_^", "q`o{/DZqXdGCg2m(sXv{", "3XmAm", "ml$GD", "HH9jKlY/9~", "tWRMi[t\"", "&,o,J", "\"!%x!M:<U^JA{QpU", "l&ItyuK", ">$fxoe}e#L7q{#\"p8Y6", ">$fxoe4*S", "SR4,1D|\"", "Gf:MT.w]U^9", "qGgHiGj", "d6oxYI$=", "j7RSp;N\"", "OdO8#}j", "T|4WLej", "w|1@w7tyhN66`RD|9rJ8v", "T|T$LIj", "l04,/D%p6", "FP;j9jnq(F", "1$5rw7tyS", "(Rl,lEf\"", ")Qaj0;/,>~i", "^|8HQM@o%hs50", "cC&b$TWEc", "!6/x!M@oH^", "\"XRS0;N\"", ",DOo5WWE\"+OGy", "QTui!D[o6", "NFAMxWEAU^>T{I<iz@A[B", "Qg_s1}B", "XF6xYI$=", "0WK%}oK", "`#zo:Wn@st{5;y*Lc~*/qRN`;A4", "vCfaPPB", "qXb1i[&mjGy4NO]zJhl,/cK", "@FUx!MDXio", "Yg0s,TWEc", "{m}^\"_x%", "{pGrxWN]U^9", "<GKbJT\"9c", "jQAMP7tyS", "q8dxv7N]U^9", "Mu+64.BoX", "uh3PmJ9mYb.f?9tk`f`Ai5[K", "jh=T`;lLq", "qL[^@30@+zxZ[67(;C3R0sg>[`", "i!sv^I{DB]<GW$f,T|bxLel&cJ!A!;nOp!0?Fq.&OC:y9OPO*!_1", "\"Ysvx?L=", "qXcqx", "F!RM_J^Fq", "NlA2x3I*f`wEj{u", "X4q@w7GXF5JK>_*i~F3@", "[#@?@", "j:CM`", "~~0sBI+$0V", "rC&b:Wr%", ">rGrB", "^Nxf", "XH]jM", "rugHy}K\"S", "*Rq]=W].Kr", "S&(nT", "ndXHk", "[Tt{z", ",TL{mJr\"ZQg0hQK&%}2MEW].KrZb3|IV%}M{", "]6\"@*WL=Gf>Tufj2t|_1e!H&jLGN`Rb,t|1@", "Ki1@", "dHvnM", "]<q]pUK", "DhL{SJK", "]<q]pUK", "DhL{SJK", "%}p]z", "qH2S3", "S&(n*&xI8Pk", "E65rt.#=", "TEyLoi{.w", "]6\"@*WL=Gf>TT`\"p)0XS_IP1F^.K=Nuu9$#@U7G,3%@5\"_w", "Ki1@", "t|yHB", "]<q]pUK", "<tZF25a", "n|(nvsa", "DhL{SJK", "dHvnM", "(D)2f", "*Rq]9R\"M~Y8", "1c@#d%Bx", "TEyLoi{.w", ",TL{mJr\"ZQg003L<_OU8AJBLv8^]$J&>ZQL{W5q?|r]@+#!k", "C(M{", "t|yHB", "v:6xxW#=", "k,sI", "]<q]pUK", "7u\"@xWj", "LDc225Bx", "k,sI", "HpXHy}j", "7u\"@xWj", "%}p]z", "(D)2f", "S&(n*&xI8Pk", "1c@#d%Bx", "c!/1^wBm6", "pcZF.5?xblKmmfZ|CA)<9^!sPV)<{dCodHIF;&Urp0", "Ki1@", "DU*L9", "L,)L*75", "7u\"@xWj", "n|(nvsa", "O>TvwI5", "dHvnM", "(D)2f", "g2)L02KG1@~", "E65rt.#=", "T*,zu/_Fg", "pcZF.5?xblKmmfZ|CAE.l>jsB?J[_tYX)|.jl>ZxizV#^D", "Ki1@", "t|yHB", "n|(nvsa", "7u\"@xWj", "]<q]pUK", "7u\"@xWj", "%}p]z", "WEzCr", "S&(n*&xI8Pk", "yqKi)}Te", "9]5*p6c\":", ",TL{mJr\"ZQg003L<_Oy_0oHMeGR0!Qq(}@3P*#AR^FyCO", ":QIF", "%}p]z", "HpXHy}j", "<tZF25a", "]<q]pUK", "<tZF25a", "%}p]z", "(D)2f", "*Rq]9R\"M~Y8", "[TdP%;t\"", "c!/1^wBm6", "]6\"@*WL=Gf>TT`\"p)0Y*sHp=*Q|Je:5`1L;@", "Ki1@", "LDc225Bx", "%$}1", "n|(nvsa", "DhL{SJK", "%}p]z", "(D)2f", "S&(n*&xI8Pk", "[TdP%;t\"", "kYwv/?z*S", ",TL{mJr\"ZQg003L<_O,_mJ@MbFR0B7.<sfFSJu<oOYi", "7,YL", "XH]jM", "#t;nvs:Zw", "*Rq]/t].1a", "S&(nT", "*Rq]c", "dHvnM", "E6#@B", ",TL{mJr\"ZQg077UN{O`Z+w`\"I>Hp0|UN@O", ",TL{mJr\"ZQg0hQK&%}2M2p].1aZb3|IV%}M{", "~$sv", ",|<8B", "rugHy}K\"S", "*Rq]YB{,?Y8", "*Rq]c", "ndXHk", "1cBFM", "]6\"@*WL=Gf>T[[}O@04Ga?4=bU:yTR}OP0", ",TL{mJr\"ZQg0hQK&%}2MsB{,?YR003L<Wfaj3", "~$sv", ",|<8B", "]6\"@*WL=Gf>T[[}O@0ENkW6`3N3<:_XiEC6", "#t;nvs:Zw", "S&(nHvR.,}{", "ndXHk", "*Rq]c", "[Tt{z", ",TL{mJr\"ZQg077UN{O[bcJT3vbv5H2q([aT", "`{*SSwN\"", "dHvnM", "C(M{", "(D)2f", "7,YL", "V}5Az", "fX/1", "p,uF", "^Xh]f", "kYwv/?z*S", "]6\"@*WL=Gf>TT`\"p)0KNuHQ=GU>AX%iUpiXH)W#=", "`{*SSwN\"", "dHvnM", "X:_x`", "^|b#J%aIc09KfD", "Ki1@", "TWuFT", "R0w{]uqq6vdCNOa<rcL{", "tW4j8U{Fsd8GVH", "]<q]pUK", "G,027\"<Z7}h", "#!AM%}K\"7^GG0", "}ft{yB~,qv8", "7u\"@xWj", "|$#@pfsyFC", "TEyLoi{.w", "]6\"@*WL=Gf>TT`\"p)0ENkW6`5%hh:_f/\"0", "Phk]pUCL6", "*Rq]}p@MXd8", "S&(nT", "ndXHk", "C*yL,", "E6#@B", ",TL{mJr\"ZQg077UN{OmZYlFh{d?j/#+&", "r$Ux`", "g5o2f", "t|yHB", "XXY_GlCL6", "X:_x`", "cXv{c", "N.?@HmXXS35KO0CpLk\"@", "B6h>ksF07@k[XD", "n|(nvsa", "4$ox~{7\"~CA", "A!,1T`O,|ri", "eEuF25Gx", "tW4j8UCLD~ZZO", "g5o2f", "o&`F<+>$EY", "F,aFs+>$EY", "%}p]z", "7[d1WmMDYs", "m$UxWm`0=", "H,BF\"{8p(uk", "DhL{SJK", "}ft{<QxpXa", "TEyLoi{.w", "pcZF.5?xblKmmfZ|CA.bP_j&o0\":A", "(D)2f", "/!PAQj^qsa4", "G,027\"<Z7}h", "2F_xxf|=", "4$oxxf|=", "#!AM%}@o~5%J,:", "Z8A#E5YTw", "#!AM%}C=", "c!/1^wBm6", ",TL{mJr\"ZQg003L<_OMRo?DLSxk>v!1NJh+5^ojZRFY46yDN3Ob4AJ]4X~;C\"bd3Mr#{", "g,sI", "G,027\"<Z7}h", "wYr8fM/X~CA", "&X2SSQ}\"", "4$oxxf|=", "B6h>ksF07@k[XD", "HpXHy}j", "#!AM%}C=", "(D)2f", "kF3@k", "b;w{]uqq6vdCNOa<rcL{", "B6h>ksF07@k[XD", "HpXHy}j", "G,027\"<Z7}h", "tW4j8UCLD~ZZO", "K63@V_hwmo]0A_$,F!PN1", "H,BF\"{8p(uk", "<tZF25a", "H,BF|lYvW}", "c!/1^wBm6", "pcZF.5?xblKmmfZ|CA<T6>pXh0_P;G?HGF_p8^a", "9$}1", "`fFSsyDLsa4", "wYr8fM/X~CA", "rW)22lHx", "4$oxxf|=", "tW4j8U{Fsd8GVH", "_9b1L]a\"", "tW4j8Ua\"", "X:_x`", "kF3@k", "N.?@HmXXS35KO0CpLk\"@", "#!AM%}@o~5%J,:", "]<q]pUK", "4$ox~{7\"~CA", "#!AM%}K\"7^GG0", "sRq]cJN\"sgvCy#n}9=K", "|$#@{z^]X3%", "7u\"@xWj", "|$#@pfsyFC", "TEyLoi{.w", "pcZF.5?xblKmmfZ|CAK&B%J.Q0CCfU~|%&yL", "d5MzC&EhT", "3GEH?+bOT", "5<1BK2eu6", "d5MzC&EhT", "rm%5RQ.zc", "@]pD^5VAc", "d5MzC&EhT", "3GEH?+bOT", "5<1BK2eu6", "rm%5RQ.zc", "5<]:IWN06", "`Je:IaN06", "d5MzC&EhT", "d5MzC&EhT", "&0xHEEa`T", "&0;JN(m@T", "2T.WOi*P6", "5<]:IWN06", "2T.WOi*P6", "L~~R~", "\"^^d^", "L~~R~", "L~~R~", "Z88&8", "pcZF.5?xblKmmfZ|CA3w7bWyuV`]cRlou#c", "g,sI", "X:_x`", "%$}1", "\"Hajx]a\"", "R,yLzStpQ0[hxV", "XXK+VoK", "qp{v", "ndXHk", "S&(nzS:.!Pbdx\"z", "+!GA2E`m5|m)A\"", "WWa!X9>oEY", "7,YL", "aYJ8_e4*S", "j<#{sZa\"", "LQCMMI3&io", "!E[j)NG.w", "Phk]pUCL6", "*Rq]c", "ndXHPnK*ahGt={P", "1cBFM", "C*yL,", "_9/1f", "1cBFM", "{tC>^^Jh+uk", "FFh)JlK\"S", "pcZF.5?xblKmeesRFAD(v%`.L}KI\"`3|#,b#U^a", "Bh_j??e4uv8", "%$}1", "kF3@k", "hmiFn+((wu@:RA}|?TZF", "aTkMCZ!Xu*Cp<^", "]<q]pUK", ":(X&ugD%uPk", "B6h>ks:Z<8bbA", "FFh)JlK\"S", "H,BF\"{8p(uk", "7u\"@xWj", "=(a!;K)h8P", "QI`#rf?t6", "8fUM", "O8!MpCNIQspcdf", "`J<t0;N06", "Z8A#E5YTw", "G,027\"<Z7}h", "wYr8fM/X~CA", "&X2SSQ}\"", "4$oxxf|=", "tW4j8Ua\"", "TEyLoi{.w", ",TL{mJr\"ZQg0TTG^!9*SJu3E@Gv4\"b+3NX.AQjL\"AWAd<%q(i}T", "(D)2f", "cXv{c", "b;w{]uqq6vdCNOa<rcL{", "#!AM%}@o~5%J,:", "n|(nvsa", "`fFSsyDLsa4", "}ft{yB~,qv8", "DhL{SJK", "IpGrc.j16oq>`:", "MS?8Ee%=", "VWiv,i?rM@wcfUCo?EyL", "9W/x`", "g5o2f", "W|BF", "9W/x`", "B6h>ks:Z<8bbA", "LDc225Bx", "%$}1", "H,BF|lYvW}", "LDc225Bx", "k,sI", "B6h>ks:Z<8bbA", "VzqVI", "8fUM", "|$#@pfsyFC", "NPUN1", "8fUM", "B6h>ks:Z<8bbA", "1DU\"", "|$#@pfsyFC", "1DU\"", "#!AM%}K\"7^GG0", "U7}=", "|$#@pfsyFC", "q<sx", "k,sI", "#!AM%}K\"7^GG0", "NPUN1", "}ft{<QxpXa", "VzqVI", "#!AM%}K\"7^GG0", "hJ^S6VvK", "|$#@pfsyFC", "hJ^S6VvK", "%$}1", "g5o2f", "#!AM%}K\"7^GG0", "H,BF|lYvW}", "g5o2f", "B6h>ks:Z<8bbA", "H,BF|lYvW}", "kYwv/?z*S", ",TL{mJr\"ZQg00(y^i>2,8[QVU~W", "(D)2f", "TWuFT", "N.?@HmXXS35KO0CpLk\"@", "tW4j8U{Fsd8GVH", "HpXHy}j", "G,027\"<Z7}h", "H,BF\"{8p(uk", "]&Rj{>a", "#!AM%}K\"7^GG0", "H,BF|lYvW}", "L!q]P[BmjQc)1b", "&!t{+wg\"", "TEyLoi{.w", "(D)2f", "TWuFT", "N.?@HmXXS35KO0CpLk\"@", "#!AM%}@o~5%J,:", "n|(nvsa", "4$ox~{7\"~CA", "H,BF\"{8p(uk", "c!UM", "B6h>ks:Z<8bbA", "H,BF|lYvW}", "\"YXHrEz*Mfk(vN", "2Y#@a?>=", "TEyLoi{.w", "[TdP%;t\"", "qH2S3", "Hp`rP&/wQ^", "*Rq]9R\"M~Y8", "*Rq]9R\"M~Y8", "ndXHQd=1^h%", "FFh)JlK\"S", "kF3@k", "40w{]uqq6vdCNOa<rcL{", "B6h>ksF07@k[XD", "n|(nvsa", "4$ox~{7\"~CA", "#!AM%}K\"7^GG0", "}ft{yB~,qv8", "7u\"@xWj", "}ft{<QxpXa", "pcZF.5?xblKmlcU;CATCg]j&o0\":A", "TEyLoi{.w", "qH2S3", "kF3@k", "hmiFn+((wu@:RA}|?TZF", "G,027\"<Z7}h", "B6h>ksF07@k[XD", "HpXHy}j", "#!AM%}K\"7^GG0", "H,BF\"{8p(uk", "DhL{SJK", "H,BF|lYvW}", "kYwv/?z*S", "qH2S3", "cXv{c", "AT?@HmXXS35KO0CpLk\"@", "tW4j8U{Fsd8GVH", "n|(nvsa", "G,027\"<Z7}h", "B6h>ks:Z<8bbA", "|$#@{z^]X3%", "7u\"@xWj", "|$#@pfsyFC", "c!/1^wBm6", "YG_pM", "X:_x`", "MW+j=nO9W@Z[@**oW6c", "Mp<8zMD,yLhG]:", "cXv{c", "Ld?@HmXXS35KO0CpLk\"@", "#!AM%}@o~5%J,:", "]<q]pUK", "G,027\"<Z7}h", "#!AM%}K\"7^GG0", "WWPC[_:Zw", "H,BF\"{8p(uk", "sQMz@&3c6", "c!UM", "}ft{<QxpXa", "TEyLoi{.w", "(D)2f", "MW+j=nO9W@Z[@**oW6c", ">|]j{>$Xv?PbpD", "TWuFT", "sKiFn+((wu@:RA}|?TZF", "B6h>ksF07@k[XD", "sI2dv;@&c", "`fFSsyDLsa4", "tW4j8UCLD~ZZO", "o<_jXoK", "}ft{yB~,qv8", "<tZF25a", "H,BF|lYvW}", "QgeAe5(/T", "@]@I1!9|c", "&0xH6Eg}T", "7lIMzrfTw", "kYwv/?z*S", "X:_x`", "^|b#J%aIc09KfD", "4$ox~{7\"~CA", "tW4j8U{Fsd8GVH", "7lIMzrfTw", "c!UM", "/!PAQj^qsa4", "3dn1", "#!AM%}C=", "4fM{)?K", "c!/1^wBm6", "!!RMsZ4r~r", "2T*SL", "j<_jAJK", "ifUM", "ifUM", "o<y1", "aYJ8_e4*S", "Mp;@~GC=", "r$Ux`", "]<3P@.^/9~", "ifUM", "ifUM", "=:CMsHC=", "9$}1", "=:CMsHC=", "9$}1", "=:CMsHC=", "ifUM", "=:CMsHC=", "q`v{%;L\"", "V}${", "B0xH?+bOXM", "Pfx1mJK", "h@{REt6.>QY3GWozD7rM", "/XL{JuC\"79f", "U<J]BjK", "4fM{)?K", "XXi]x]iVWdH|v!!", "XXi]x]iVWd^T!8.}i}T", "*Rq]d#^/6v8", "cXv{YB4B]~", "cXt{_J^Fq", "LfQS%;hFq", "iJ^S3", "Phk]pU8.!x", "KH7Ax]K", "J0/1", "j6wA[E8\"", ")R#{AJO3Sx", "i}lb`;ZVU~", "qH2SQBCLed3dzN7", "rfaj3", "qH2SQBCLed3dzN7", "uf>SVoK", "qH2SQBCLed3dzN7", ".74jzJlL/Gi46b", "qH2SQBCLed3dzN7", "OX3P|?s<Qbs4#Jy^LO", "qH2SQBCLed3dzN7", "B<6A+J^Fd8@dk`/kxO", "qH2SQBCLed3dzN7", "uhk]??AR^FyCO", "qH2SQBCLed3dzN7", "ls,1kR|&,F", "qH2SQBCLed3dzN7", "ZQL{W5q?|r]@+#!k", "qH2SQBCLed3dzN7", "nsHjXoCLv8$*^N9^LO", "qH2SQBCLed3dzN7", "HX2SJuO/]~aB<%7", "qH2SQBCLed3dzN7", "e(_jo?f\"VQdChN7", "qH2SQBCLed3dzN7", "o06AP[a\"VQdChN7", "qH2SQBCLed3dzN7", "e<3P]uroQ~[fo2x}rO", "qH2SQBCLed3dzN7", "m!TS[E8\"", "Nh_jUuFqeGc#O", "x`*SSwzFq", "lsx1^w&\"&BKP1b", ";~K{", "qH2SQBCLed3dzN7", "bXwpfwr&zd6T3|_^r!/1", "B<6A+J`\"w@{zO", "X<t{", "qH2SQBCLed3dzN7", "6Haj_JK", "{XZP7?K", "pfv{", "OH,1", "tW2M_", "qH2SQBCLed3dzN7", "O!GA2E`mfa", "qH2SQBCLed3dzN7", "YTFSx]t\"", "qH2SQBCLed3dzN7", "r!*S/]+UU~;Z!7]3{O", "5h#{>*\"M>dW41b", "tWy1mJK", "m!x1&o}\"]~5Zmb", "x`*SSwD.prFe#!sN1O", "A9RSM*mm6vYZVH", "[TajzJ5.fd$5a2f^)<2MSJK", "5h#{>*T3@~5Z:fJ(NWT", "c!uAb)g.s~Hp`%7", "AX>SM*k/@~vZO", "Ph4j9j6M9df#1b", ",f{P1*h,(F9Cub", "_1q_zT\"215", "B<6A+J^Fq", "qH2SQBCLed3dzN7", "sRq]cJzFq", "qH2SQBCLed3dzN7", "CTv{syY/hvW", "qH2SQBCLed3dzN7", "%T7A]u;@/GyCiN7", "qH2SQBCLed3dzN7", "W?/pXvh}fKWyy8t\"&Viso", "qH2SQBCLed3dzN7", "%T7A]ucquvvC1b,}", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", "}^@*$6;tZK8Kha/", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", "MfRSJuM._GW", "}^@*$6;tZK8Kha/", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", "5!isCv;AAS8wu", "}^@*$6;tZK8Kha/", "QT2S5u;@/GyCiN7", "}^@*$6;tZK8Kha/", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", "}^@*$6;tZK8Kha/", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", "qH2SQBCLed3dzN7", "}^@*$6;tZK8Kha/", "!f9jL", "#Q;jZuncfaTpE#/", "qH2SQBCLed3dzN7", "w$9s)vs_7eB", "qH2SQBCLed3dzN7", "#Q;jZuerU~", "}^@*$6;tZK8Kha/", "w$9s)v&tskaku", "}^@*$6;tZK8Kha/", "#Q;jZuzq(F8", "qH2SQBCLed3dzN7", "#Q;jZuXquv8", "qH2SQBCLed3dzN7", "w$9s)vQDfS^1rWA", "}^@*$6;tZK8Kha/", "#Q;jZu&46v;ZO", "}^@*$6;tZK8Kha/", "#Q;jZu@4Ud3d%H", "qH2SQBCLed3dzN7", "w$9s)v6m+eXWK^", "}^@*$6;tZK8Kha/", "w$9s)vvdVKs#u", "}^@*$6;tZK8Kha/", "w$9s)v0lfSJ", "}^@*$6;tZK8Kha/", "w$9s)v;A,e*Ku", "}^@*$6;tZK8Kha/", "89v,g9kt7L6yd/(j~u", "}^@*$6;tZK8Kha/", "89v,g9kt7L6yC$dI", "qH2SQBCLed3dzN7", "`Gap7rLObk[{u", "qH2SQBCLed3dzN7", "+RNAP5C=_1c", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", "Nh_jUukqNvi4O", "pQUX2FSBBL,", "}^@*$6;tZK8Kha/", "NRy~([TmS#J", "}^@*$6;tZK8Kha/", "HXmA3", "Ig*S?ES\"v6&H]!4}1O", "}^@*$6;tZK8Kha/", "w$9s)vBlW.:Gu", "qH2SQBCLed3dzN7", "B<#{r?K", "}^@*$6;tZK8Kha/", "Nyap,r%", "qH2SQBCLed3dzN7", ":Qx1FpNmfaB", "qH2SQBCLed3dzN7", "Cyl}", "}^@*$6;tZK8Kha/", "<R4,w?q?|r", "#Q;jNp@MKrQ0RQGsBK", "/Q:~MFNtDS))>8jjJ=:~", "/Q:~MFNtDS))?!SchU4~a_%", "qH2SQBCLed3dzN7", "w$9s][=L*;ckx^a!ICA4", "}^@*$6;tZK8Kha/", "#Q;jZuC@@~vZO", "qH2SQBCLed3dzN7", "#Q;jZunceG?%\"y@", "}^@*$6;tZK8Kha/", "Zj{BEEBS=K2B~4", "}^@*$6;tZK8Kha/", "$7L{>DGmv8?`5%,}", "$7L{>DGmv8$*^N9^LO", "!j@3R)WLViT!SYrjG7?", "6f6A+wlLv8$*^N9^LO", "]/t=bDk&eJDs|hlMtu", "$7L{>DGmv8$*v!a}LO", "]/t=bDk&#4I{<HQM;7?", "$7L{>DGmv8dg?91N8PT", "qH2SQBCLed3dzN7", "!jh*ksJ<", "qH2SQBCLed3dzN7", "l0J]@DZV6", "w$9sH6=BE#GyG$kR6%", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", "#Q;jeyQEbFQ!v!Ra", "qH2SQBCLed3dzN7", "}^@*$6;tZK8Kha/", "~!f3oCa<P/Q{RWA", "}^@*$6;tZK8Kha/", "B?G*5D)x+", "#Q;jt%^/uFQ!v!Ra", "qH2SQBCLed3dzN7", "}^@*$6;tZK8Kha/", "#Q;jeyBL]~W", "}^@*$6;tZK8Kha/", "79x1^wN\"", ">Xo{H]I^safC0H2^vRg{", "q=n**Fa<", "nT/1@*A?tr<#O", "ifUM", "}^@*$6;tZK8Kha/", "NR:~MF|<}Kc,7Wjb=.F1y9$f+", "_?5~AnpEg.\"wu", "ifUM", "qH2SQBCLed3dzN7", "CT`AJu7.tr;ZO", "nT/1@*A?tr<#O", "ifUM", "}^@*$6;tZK8Kha/", "YTx1\"#q?Q~", "YTx1\"#q?9Go5|^g^XDO", "qH2SQBCLed3dzN7", "YTx1\"#q?9Go5O", "}^@*$6;tZK8Kha/", "=!@*CvvdeJ[PLadI", "}^@*$6;tZK8Kha/", "0<6A.]C=8SL2v.QdB087n}", "qH2SQBCLed3dzN7", "A!,1c", "YTx1#unO", "}^@*$6;tZK8Kha/", "YTx1#u:O", "}^@*$6;tZK8Kha/", "I7x1SgBL+rxBw%Q^hOFDlEBL8Y_dO", "_?5~AnpEg.\"wu", "ifUM", "m\"osVm%", "}^@*$6;tZK8Kha/", "R(*b", "qH2SQBCLed3dzN7", "$79j,[^F]GB0s[&>uhk]??K", "}^@*$6;tZK8Kha/", "?7Gi7", "}^@*$6;tZK8Kha/", "w$9sKqdtVi6{u", "qH2SQBCLed3dzN7", "F/G3mE!<", "}^@*$6;tZK8Kha/", "GG{BYE%3VKJ", "YV&,DvflhK^1)Q{I", "qH2SQBCLed3dzN7", "$?isGT1xfS", "*G{B~DY<", ")$^sy95BbS,", "oZk](ZK", "RTFS!?f\"", "s/G*19a<", "aGapgf%", "/}M{/D%pYbTT3|n}iPGA1", "Ny{B5DW1+", "L79sQs_}jL", "3!K75DW1+", "(Rl,lEf\"", "z$isy95BbS,", "SIpXQs=LJ#:Ku", "+[G35DTm+", "WT^SWj{F]~", "\"XRS0;N\"", "7fx14[[o%YxdO", "QTui!D[o6", "4V{s*CT{bSPyHErj6={/h", "UQ;j(ZK", "qXTS!?f\"", "}V4~,T|&skH{autO+^t`vX_}aei", "qXb1i[&mjGy4NO]zJhl,/cK", "=Vb*[s_}jL", "IQ9j7D[o6", "y<ZP%;S\"", "H\")7*C4BbS,", "gd2M>D%p6", "%Q{sADW1+", "oARS1Db,>~i", "vO87&CQ&#4d!EQgcq!qplCX{<", "vO87&CQ&#4*o8YhMa[CXQs$(8}", "}^@*$6;tZK8Kha/", "A[kpxms)Dk`w^@$Mtu", "}^@*$6;tZK8Kha/", "qH2SQBCLed3dzN7", ">X.ABjK", "}^@*$6;tZK8Kha/", ">X.ABjARK@", "qH2SQBCLed3dzN7", ";?@*CvvdE#OKu", "fX_j@Da\"", "g[{Bh@PdRK3H]C7:", "g[{Bh@PdRK3H]CJ`jA|4", "],/]bE<@6", "0<J]pUC=\"S+nFh4Fu7/|UNggyAJuVqUd~Rk`/ku!FSM", "}^@*$6;tZK8Kha/", "_RM*XvvdE#OKu", "ns^S]uRp%YW", "4uV3hFZ&jL&y%", "<gzjcJb,K@m0K", "bOXM", "%Th]#uu.YbtCUfGs", "c!h]9j8mX~B", "RVOXlCJ<", "c!RM<nmL@~G4O", "],/]bE<@6", "SR2M~n4md8|Ufy^>tXc1J24m6FR0K|5(1OCjZu9.Yb:`>N&>XXj\"sZa\"\"vkt4!cu", "j<_jAJK", "U<3PSJK", "lQt=l", "&Qe=", "^!e=/E%", "NycXsE6t7L6yG$kR6%", "qH2SQBCLed3dzN7", "^R#{GBO:1aR0RQGsBK", "}^@*$6;tZK8Kha/", "iR6A]uJcAxc", "}^@*$6;tZK8Kha/", "~!&pCve.bK39~4a!ICA4", "qH2SQBCLed3dzN7", "#Q;j<Q3UU~Q!v!Ra", "}^@*$6;tZK8Kha/", "?![7&FJ<i6;mG<", "qH2SQBCLed3dzN7", "w$9sgWG5XS$UeUGi", "}^@*$6;tZK8Kha/", "w$9sKqLB4LGyG$kR6%", "}^@*$6;tZK8Kha/", "#Q;jNp[.=ag0RQGsBK", "qH2SQBCLed3dzN7", "w$9s\"$dtsk,yG$kR6%", "qH2SQBCLed3dzN7", "w$9sH6k&bS,yG$kR6%", "}^@*$6;tZK8Kha/", "`Gap7rLObk[{YMPMVDu", "}^@*$6;tZK8Kha/", "`Gap7r;>o~fvClp:l", "}^@*$6;tZK8Kha/", "#Q;jUttm>dNG(HNf}J@b", "}^@*$6;tZK8Kha/", "89v,g9kt7L6yd/(j~u~l\"_8u", "`sDm:P,&1p)p;{i", "3;uit;GLPFB0JQ.}zA(A>VK", "}^@*$6;tZK8Kha/", "}^@*$6;tZK8Kha/", "FG&pxm;t.QakaH{I", "HH9jKlY/9~", "(Wx1~?ynz,5ZJfQV0}ISrEl.eGW4W#*N<WOwXo;.hde]FNW^%W3P*#t\"", "L!x1Swr\"", "}Vl}:", "LUG3oCML}", "_Re=*CNt>}6m.HA", "q`o{/DZqXdGCg2m(sXv{", "8V&p&", "g[G*$sT{u#Q", "}^@*LJLBH$#)`YfaB7?", "u!~w_", "LQCXvFY|W#G", "}ft{SJ`\"", "OHo{", "pXb1", "(Gh*h", "u^m=", "ERzSNp2q>dXCy9@", "7O{Bc1dtXky)u", "+X3Pz", "hq&psE,x[K1p!W!xG7?", "vUSFo", "LQCXvFY|W#G", "lVG*j9S1+", ".Un*5X`ffS9)U/X8=u", "fXv{SJlLq", "c9l,(n:c6vJ%o2x}", "WIM*TEqt*:Q{.8F\"LUOXL(x1+GZa6WB:\"%", "7OcX1f;t+", "c9l,(n:c6vJ%o2x}", "WIM*TEqt*:Q{.8AIxI7pSt_#1.*dyu", "%}^S[?`LSx94r3CNw(7AVo?Z6yFRr3H", "1HTSSJK", "lQNBj_0l+eCWm@:I", "m!TS[E}vprS.0O", "1HTSSJK", "c9l,(n:c6vJ%o2x}", "%}^S[?`LSx94r3]}W;ui0dB49G7tK", "1HTSSJK", "79L{W5K", "q!is!", "JRl,3", "(Wx1~?ynfMyCw%P}ra_j*#`m>~fB,#)<#(GJ/?J/1>I`b|>N2[c_a]].Wqw`Jf6(y>J]q)KMSC6#0|pk", "lUg=", "tWy1mJ%p]GYZO", ",I^s19.<", "Nf(1", "!Ve=W9}EfS[", "LQt=", "tWy1mJK", "kXQS)?v.(F", "}fM+i5K", "LQCXvFY|W#G", "E?OX;wTd6ivG;EbaFG?", "\"R[,!Jxc6", "8V4~oCq<", "[yB~]m0(g.GywABM,/s!8", "3Xb1_JE/1~aB2N7", "[yB~", "Q!#=oC6<", ":5tz7", "3X{w+ZBLPvQ", "WyB~+aV1KJ7rN^abdi/p|o{9$4/kjuWU`y4^2o%", "Nf/1L]54q", "o<2Mm", "o<2M7tR/jGGZ&2UN", "!V?*2Xa<", "3X{w6Dc,NvR", "8V4~oC$ftk\"zu", "q!L*@JF{Y.K)u", "h!K{c", "XXo{", "2R4,|?B.>dP", "@G{BYE%3VKDP\"61U`yr8~", "8V4~oCu8{LyS]CNIK?&p{Tg<", "WyB~", "3Xb1_JO34Fn3&2v&2R8M>DVFq", "XXo{", "2R4,|?B.>dP", "@G{BYE%3VKDP\"61U`yr8~", "8V4~oCu8{LyS]CNIK?&p{Tg<", "3Xb1_JO34Fn3&2v&2R8M>DVFq", "WyB~", "pfUMx]a\"", "/Ue=*Cq<", "VVm=", "7yt?", "@G{BYE6dbK7", "@G{BYE%3VKDPv6dYU\"&8|jSl:}", "8V4~oCu8{LyS]CNIK?&p{Tg<", "8V4~oCu8{L_8|@e|@GJ3bDxL}", "!94j<w`\"", "rG{Bt", "UUqpJTmt}", "3XmAm", "F9L{qD65U~", "pUB~I1LEVKOK~4", "Ft&A!JFc6", "9)S6)(7", "tSu78", "^^f3bD)x+", "YGF=&", "A!,1T`O,|ri", "8V4~oCu8{LyS]CNIK?&p{Tg<", "C3Pv", "3Xb1_JO34Fn3&2v&2R8M>DVFq", "u^{sbDH5GLC)/H5", "40,1", "_1hv@Q(n$aYi,[Q~.u", "8q}XhCvAfS%FKQDa", "f\"CX6s~tsk&wu", "D@F*tKsk", "21}P{Zj2^FKC(H84),q*", "C45t+Ms0t81n/.e4G4d>A0Sk", "2)?t{<Ao^", "lA&pY@>mRi36}JHM8U4~", "&X]jAJP.=ai", "g[w={PTdreM,!W}j,I?", "c@mA|2=osaMBq8y^3!b1", "w)b6>Kdxg=c", "ESn6YK\"k", "s\"}XSEo{!i6", "9)F*C<JM9=", "(X=TVopV6", "s\"rp6sG14", "{rp]AJ65Z~vZO", "j<5ABj~,b", "{rp]AJb34Fg", "5R4,~Eq?|r", "+^isoCU5ASA90!/", "^S=6YKVJYL4Lu", "w9F*l[eEUR1nkI", "&U?*T(_x~K^9.HiI", "m!TS[E65{~,4EH", "/Q:~MF)x~K^9.HiI", ">@Pvs[eEUR1nkI", "pUB~rBM5fS7", "0}ui7D{Fq", "iPE8eo54q", "rG{BS(}EY.", "w)b6>K;x:i\"", "s\"rp6sG14", "XXo{", "6,#>p6API", "&X]jAJ4\"q", "^S=6YK@heAe<j9D", "^S=6YKVJYL4Lu", "|!e=RHA3(LQ{<4", "y@]t+UZGviS</[=4", "m!TS[E65{~,4EH", "/Q:~MF)x~K^9.HiI", "pUB~qHA3(LQ{<4", "pUB~rBM5fS7", "yIv,/D=L}", ",7(JZmr{}", "uS.d~oRM)imivI", "P$F=&", "P9y>/U5hJ", "6$t?", "vO}PS;#x7!T", "5Q9sh", "9)F*tK}0J", "z30]", "],O#@", "UQ5~MF?BhK`?UJdI,I?", "D$5~MF?BhKJ", "XBuw%|%.?", "{)Rt.", "P0,1", "z3Pv\",*ur8", "kX3Po?X/q", "OH4j>DnEZ~vZO", "lVe=JW8fg.rmu", "C]S6XW!gI>QQYk", "~#NBtXr{}", "x=D>wYn<|IDL{uC@X3nK7wU?k", "Jy:^E`%", "XXo{", "80*f{", "qz;*na+x#F5c9CJ{c4]", "_@[v>W5M^", "_@rXE$7", "<GJB*9;++", "GyF=&", "8=f\"Ss|tEHvl:>~r:`5O%!+0oTj+$Ku%ZN[K", "G)3v", "d38SF}7", "u^=F}Det`.", "6yt?", "W|0*RoGRTi+OeV.,d9NdV", "u^{sbDa<", "40w{m", "Hf0VD", ".)IvYKUh?RKND[$9gA_c4<bn|iz", "P3Pv", "i}@j,[9m,FY4\"b", "i}@j,[9mPvJZO", ",In35D+e+", ".Un*5X`ffS9)U/X8=u", "fLW*y", "NaW*y", "Jy:^eN%", "I7x1]4w4vbTBw%@", "?3Pv\",*ur8", "QaW*y", "6,Kbo:7", "\".4m1*kCbNQV7_@&*4z;v6TrV@;|d;m<vxLM]mrTw@v", "b,ycY", "yZkJD", "Rd_>]$=k", "c!@jf2SmZdhd>8\"(tWl,mJ`\"", "kGw{m", "NaW*y", "\"38SF}7", "DPF=&", "%}^S[?K", "~^?**C%", "u^{sbDH5g#fP~4", "JyF=&", "8q{Bh", "\"30]", "MH4j_J8\"", "cXt{_JE/gaJZ(#/", "@A~E=6$/", "7OcX1fs_U:XqBQ~a", "mH^M=6&y=%o%u", "^S=6YKoJ^FLnmDP4g,^>y", "&fv{C,^/U~P", "&fv{Y`q3ed_dO", "y@]t+U^#*APnUS", "3AkqL~P/7^h", "pUB~rBM5fS7", "]<mi_", "fLW*y", ")PF=&", "\"38SF}7", "WyB~VcV1}", "Dgw{m", "vS]ttK7", "~^?**C%", "Ph4,*#a\"", "3^{soCJ<", "@G{BYE6dbK7", "@G{BYE6dbK7", "d30]", "H?nPrMpxBid", "@G{BYE%3VKDPv6dYU\"&8|jSl:}", "]<mi_", "ckF=&", "Zgw{m", "80xHvlK", "QaW*y", "%}^S[?K", "Phk]pUCL6", "dmnP`;=k", "3^{soCJ<", "@G{BYE6dbK7", "2R4,|?B.>dP", "P0LT", "@G{BYE6dbK7", "2R4,|?KMXdDguB.|!<m3&(~cxq", "^S=6YK@heAe<j9D", "6Haj_Jzq_G}GO", "w9F*l[eEUR1nkI", "&U?*T(_x~K^9.HiI", "m!TS[E65{~,4EH", "79x1^wZV1dH;rya}", ">@Pvs[eEUR1nkI", "A!,15,^/U~P", "yIv,/D=L}", "iPE8eo54q", "B)cb8b=kozBh?k", ".9:ElN.u", "w7J]NZDBT", "$sv{Uus4tC@[K", "o0q]1D~,31", "),Kbp6.u", "1HTSSJK", "[7K{c", ")/e=*Cq<", "=9E*$M7", "W|0*ssJ.TiYi?k", "MG}XKwM5+eAT%", "fXmA3", "r!*S/]+UU~;Z!7]3{O", "0<_jAJK", "uSn6BQ}0nRa", "JyF=XvX\";LQ", ")PF=&", "2R4,|?DL8Y_dO", "M]mb!;+xp=_?<5@f5)Iv6XMAm=", "&X]jAJr&]~W", "$PB^5", "w)b6>Kny)=", "j<J]pUK", "(Wx1~?ynz,5ZJfQV0}ISrEl.eGW4W#*N<WOwXo;.hde]a2xViP[M[?q?~YW", "0@8vtW/k", "}Vl}:", "LUG3oCML}", "_Re=*CNt>}6m.HA", "Js(*hQNJ)iL!aHy{l)F*", "g[G*$sT{u#Q", "R1KbmKI.C/lc^I", "HH9jKlY/9~", "b,ycY", "C4RtG(E0dh~", "i>3PUuv\"$G_d<yl^B(L{&n3Oo6J`t2|k+0bADDYVEq2J#J,}.,l,7D@vy8Y0@#tk8WTMNnPmZi}%j9.<Z6#{EzH\"QxW,(#n}<~6A/DO,31Ti771NNXj\"};&B%Y{G!^L<9P`JAJ/,OYm00bS@", "%I2v+MRMF\"L3mH:~6{T>}b:U>8y3=0/,5);*taUJiOfcZuT4G4|t7M)hC/\"H[z~B57", "W_oSdxl,PR<NsU_,o9]tBGE4pa~L1HwBO]nPeQ,<1\"Soc~%@y@?tk;Vu7_^LK9|5Au:v:KRM)iOPC1^{oKeIoVJJ^Fi!~u=,/2KbS>PAeA>;<5[5n9ob1_<kaLqb^.+@,@@beQO:mi$#+CB~M]IvdxE4C/ONEVyBP3*W1_\"xv=dn9[h42e#>/M.u|PN`SfyB,uY>.HCzjnOnJ~^{6{p64(jUIRjs9[64^Smb;_Fk0LUCTH=4V1F*^GPA@*fNdks,W?y>G(_eeA=pH~\"=rq[SF}Vu7_Q\"h;\"=R{%t/Ugn)i%K$9Afx,D>4(3m,OZO2SV)%IJbo:ohcF>i[1$,%,Nd*GPA$*J$dks,W?y>G(_eeA=pH~\"=rq[SF}Vu0LZ#[1=41g/ktlNP;*hQ/kr^J$=wyB,umd^$J.JrQ(/[P8$EL>+UchPRocESV)@](*>K5heAbCj9yB{)Rt#GE4C/ONEVyB?3W*:Gi3bLfcdC\"=g\"8SF}Vu0LZ#[1=41g_ktlNP;*hQ/kr^fNSwyB.)IvYK|:Ji@?M1d41g9ktl[gh[x4s9Rt^G)$PR|nckW,}?16)(.u!F.pWC[5R6:k3(+(ViiNwH:~1g?@x,$=n6P+}0OI&Fj5z@%INdp#)h7P|!qH84X3^CuMVu7_6z6SVG86!t*$X:+?NaR~U{.)*WsiD/XOKC%1V5YbWoT<^Fr/`![;Y51g\"st/qbboyWu.:A}OBHB~W?eIF0Iu&AJ<$5yB,umd^$J.JrQ(/[P8$EL>+UchPRocd9M,R@mb2Klp_c%P,[=4YbX#yW}0bA<N?kUh5by.6_}7:v,+1yBi%KlC15tzeIG6RMbLy33Ite", "_]wpe;6v|r*Cy#_^nM#{+w5By8lJa&EFq;rbwwBL9G3dHzm>W0{w9u8.1aP4fy/}ja|{1V:>CFy0U2>N(@+58<jqZG_4i\"F^iPo{p;lB9bVGVH2ax~TSyl0htry4<%q(i}@bdE:EQdzdi\"L&q`@b8<bO~Cm00bS@", "24l~TELEeJkyGUd\"zi{sBTNt>{$;g@:IQ>hMY\"\"?<h(xBSBLe;gh&btStW?\"v<j~%g|hlM9GA4xsLEXk&yYYhMa!is+xKy;LHy.<xc8sX1&Fu8fSN#tYhM:Q/,Qv:uS;&yPQvIRV+,QvFdg.9)0!TiPPG*[sUBVKk;*h&bE?OX;wTd6ivGauvYu7*8y9Q&)}l)8YDa5.)7]X;>+WuEXoAkH{duq\"n9qCx)6t7eQy[(>Stu|p5E~eQ4k{hJ2Uf\"CX6s8u<e%7za&ba!5~tXr{8~[B<H&RH>8W+j1Iy!zE`f!i&yPQDapU{sQvE}(L&yQtxc8sX1&FCfvi>qY@>xQ>~<2S99F1@F6<}KMg8^_Yq>b1ob!\"f<Z*:lO{&y#@BIa[CXQs8u}KIk!W}j`Ui4/F;&~ixkQ@JiFvt=,r>mI~V#5w]ULUCXa)D6HJwnN^@i_E`r3", "%I2v+MRM0vL!l[=4YbWoT<^Fr/`![;Y5ZE;*XW#p[\"yN.Cr,5]=IuUGo7PMa9C@fGQ:kp_Aur8*U/ktlg\"*dT<+g(]6X&78Sz_:$rdRH[z~B57", "Ibc1[?F?3iE%+|BV1OU1y?@MNvqP&zeN9=DNu<h!8TeSO^h4m0q2As.,GAP5UV31Y*!^VkcOEHvl:>~r:`5O%!+0oTj+$Ku%f^ZR&1In|^H", "24l~TELEUB(W`Y6x~uf~u(uLE#Er/HXaHj:XOX#58~jW76e.H>}@pRdBkp7rfx8~#nN9xclu&WTF6<}KMg8^_Yq>b1ob!\"f<Z*CG|~!;UJAaWINBQv=uY:@CTW+j=u3?Wcb#HJ#yWu", "Ibc1[?F?L1,4L2x}1OU1dEF?Xdhdgzm>>arbwwcF%r_B(#%a!T!]<w`med%2N`9^^W@b*A!O8Rm0)2tk9=uB.|+]A5!DvL+rm0r\".|+]U\"cJYVSra[2h.|P7rbOEOF?Y?57y]NuD]pt;]4>~?YTzL<Nfl,o?E~trw%\"yi!=8{Pe;@@+P|G2hvrA<]p((G;Qb$v(/_>80LTWuZ/@~A#~|a}0}x19&~cu4m0izL<9PL{!DF?L1fC~|.<NWy1j+/chah0izL<9Pp]Xo&\"sMZDDNm>x`q]1D~,31Y*P\"]}6HajH#Y/uFm0DNu<h!8T$_zOeC2Ww%Q^sDU\"WVjZd8~", "Ibc1[?F?L1GCsya}L6l,AwBmv8G0oHL<(f*S>Vm6(1cZ3|DN/rZP$]3Ohd:`\"yr7lk2fiVjZvb", "7OcX1fs_U:XqBQ~a", "+^isoCU5ASA90!/", "6Haj_Jzq_G}GO", "^S=6YKoJ^FLnmDP4g,^>y", "|!e=RHA3(LQ{<4", "&fv{C,^/U~P", "w9F*OsJ.TiYiu", "m!TS[EnV1dH;rya}", "&U?*T(+r=SB{(^", "79x1^wZV1dH;rya}", ">@Pvs[eEUR1nkI", "pUB~rBM5fS7", ">@Pv1?~k|=p", "?#<4", "R@?EYKsk", "\"3W*b_R2!R1", "8=r\"SskQw{]u?V_G#g>p_>f<U\"qAC=4J$_K", "R0,18<bO|x", "w)b6>Kg()i(#u", "$PB^5", "&X]jAJ`m>~Y4O", "_9/1f", "o<2ML8[.=a", "%}^S[?K", "7OcX1f;t+", "MH4j_J8\"", "7O{Bnwi<", "]<mi_", "oQ5~!", "x](*", "R0,18<bO|x", "w)b6>Kg()i(#u", "$PB^5", "|VXspCq&bS#{u", "WIM*TE%", "o<2ML8[.=a", "hQ:~5DJ&+", "M]mb!;+xp=_?~u_rud]", "pfv{xJYVSrB", "c3Pv", "91zdVKsk", "z3W*y", "$PB^5", "GyB~]m0(g.GyWurLP%", "HHUM>DZV}BKP1b", "JyF=&", "%0,1j+XpvbJ*fb3~R0,1", "Gyt?", "]<mi_", "lVvp.E{&Vi", "]<mi_", "u!y1", "/}*SVoK", "X\"&,o", "oQ5~!", "R0,18<bO|x", "&X]jAJ=oXdo5O", "/7^Xf", "&X]jAJ`m>~Y4O", "3`4,z", "EXTHwl{f}F@7J1", "m\"@3tJTd>i", "y\"CX1fs))S", "Qg,H/", "gj^J", "?3Pv&(jUq/?3Cu#Ra7", "Q6BHClh#Oz", "gj#a", "?Th]C#[.BauRNOu|OP[Ty?@MNvqP&zeN+06%O?K", "sQ|z/", "Y69jh]q3]~", "]B(<|$T~/1(.\"EuyOj1Xq$p", "E?OXPrTd(L46rWHMOu", "]<mi}_!O~Ca", "pRk]~?m6Nvy0$9Gs()B,2XInbFR0#&$<q`2My?}\"k~B4Jf(>Jh2MOEq?Q~}gr[tzqfz8}o+O1df#6b_Lv{RMAJFhPF(%#J:<)<T", "/@`thbX::A<N@Db.*u", "6i3<%", "L7vp?zi<", "c!@jf2SmZdhd>8\"(tWl,mJ`\"", "2@e69HtyNimiB\"k{qz}PyKsk", "!V&p8", "L7vp?zi<", "lUAs!@*&)KOKbJ<jg[NB&Cq<", "Y1hv9", "GyB~J\"4uY:", "|VXspC>mVKmru", "$PB^5", "|VXspCq&bS#{u", "u^{sbDH5g#fP~4", "(,HE0\"+xg=", "$PB^5", "GyB~]m0(g.GyWurLP%", "Ph4,*#a\"", "X\"&,o", "oQ5~!", "R0,18<bO|x", "n%9x~v\"D%$D01", "Qg,H/", "|VXspCq&bS#{u", "|aPSh", "R0,1$o:EtrR0%O5FgK", "pfajqDvL+r", "?Th]C#[.BauRNOu|OP[Ty?@MNvqP&zeN+06%O?K", "\"3Pv", "D,7jPl3`\"{", "l|rVh", "_9/1f", "?3Pv\",Iur8", "u^{sbDH5g#fP~4", "(I+q&?}1Xl", "WIM*TE%", "%0,1j+XpvbJ*fbmr;;T", "?3Pv&(jUq/?3Cu#Ra7", "$PB^5", "P30]", "1!e=:C#x*.6", "cXuAr?K", "mw>bUhyJwl", ">x<O", "MZ^k$(4", "X\"&,o", "_@AWY", "lVg=oC(5PiC)jw5", "_9/1f", "|aPSh", "b,ycY", "Ibc1[?F?6", "j<q]~?_4faB", "lAf3", "2@e69H=k", "r!*S/]+UU~;Z!7]3{O", "qz;*na+x#F5c9CJ{c4]", "j[:~SEH_hBr)C!$xyI2*.(NdZk[{[wna\"[uFVm9d<e<1Y@:x,7T3TE}ES#[", "L!x1Swr\"", "}Vl}:", "LUG3oCML}", "nsv{SJlL=qBory@", "q`o{/DZqXdGCg2m(sXv{", "3XmAm", "g[G*$sT{u#Q", "HH9jKlY/9~", "CONBh", "g[G3,Tg<", "gPZPz", "(Wx1~?ynz,5ZJfQV0}ISrEl.eGW4W#*N<WOwXo;.\"v\"p!NW^%W3P*#t\"", "g[G3,Tg<", "P7)7h", "g[{Bh@PdRK3H]C5", "tW4,z2g.sdMy$J8+(@T", "fX_j@Da\"", "g[{Bh@PdRK3H]C7:", "r!*S/]+UU~;Z!7]3{O", "d?b*3n)}jL+1+4", "r!;juwlL]~ZZO", "*Rq]9R\"M~Y8", "}qm=|_%", "RVOXlCJ<", "c!RM<nmL@~G4O", "f\"87*C%", "?<ZPe;KMTFog3H", "VV&}ym}EY.", "nG}XQG<3S#DP)uhVoX.*sE+|XSjWTW$M<u%b", ".QissEedjLl)$aTI{!isjoT%f~3e^3VKgXx^F\"VAap(v9<", "lA&pY@>mRi36}JHM8U4~", "u!y1Aw^?6", "fXmA3", "7OG3AnH(7e<Hu", "g[H~&C%", "Nf/1L]54q", "WI?*$s`fOSe;ba5", "fX>Sp;lLgBrBSz>kcO", "m\"@3&", "F9L{", "(XFS3", "5h#{>*\"M>dW41b", "&U:~|mI<XSr)&4", "x`*SSwD.prFe#!sN1O", "pQG*3n&&+e#)x^", "T?ishCrd!K]ri@!Mz\"@3*C%", "rOw=bn?8ASr)0!Cja[?", "c!uAb)g.s~Hp`%7", "AX>SM*k/@~vZO", "7O{sQs+3QK!w~4", ",f{P1*h,(F9Cub", "pU+p~nJdU:", "o<2Mm", "(XFS3", "LQt=", "rOw=bn<3bK[{~4", "&U:~|mI<XSr)&4", "x`*SSwD.prFe#!sN1O", "A9RSM*mm6vYZVH", "[TajzJ5.fd$5a2f^)<2MSJK", "rOw=bn?8ASr)0!Cja[?", "c!uAb)g.s~Hp`%7", "AX>SM*k/@~vZO", "7O{sQs+3QK!w~4", "B!=7~nOBjLQ;v4", "pU+p~nJdU:", "7OG3AnH(7e<Hu", "tWy1mJK", "a!5~tXr{}", "WI?*$s`fOSe;ba5", "!Vb*19NtP6.6*hbclu", "U<3PSJK", "RVOXlCJ<", "c!RM<nmL@~G4O", "nT/1@*A?tr<#O", ",!f3", "UU?*FEPd1.GXu", "u!|+M)K", "fXmA3", "PhRM@*yEPv\"yO", "tWy1mJK", "a!5~tXr{}", "WI?*$s`fOSe;ba5", "fX>Sp;lLgBrBSz>kcO", "f\"87*C%", "RVOXlCJ<", "c!RM<nmL@~G4O", "c!QSM.a\"", "&U:~}Dg&7eC)u", "UU@*@(i<1.e{thi\"7!w=", "<!!]@DZ/1G\"y/#+&|WZPAJ&4|C}G)7l}SXT", "|Vr,|9+eg.R,HgSclU{lkNn(y$H)|@5", "QPA_?E=4Nvfzo2x}>`h{+JW/1~_B?H", "s++X1f}ES#7)|hHM.!3`:Xc}VKk;u", "E?OXAD)xQ/9;!HtoH9@3][6tJ#,", "%}FSVo84Q~[gO", "%}FSVodc%YUg1b", "%}^S[?A/@~_B?H", "g[H~&C%", "e=G3&C%", "T?P=", "hVvp2X>mVKtkKQQMV[?", "j<5ABjnVprYZ,H", "s\"rp6sG1Dkc,7W/", "xV&,[r%", "d?XsoCg<", "lVw=8", "%}(1", "m\"osVm%", "m\"osVm%", "o<_jXoK", "o<_jXoK", "m\"osVm%", "o<_jXoK", "m\"osVm%", "m\"osVm%", "o<_jXoK", "o<_jXoK", "o<_jXoK", "&U?*T(dd1.GXu", "RVOXlCJ<", "c!RM<nmL@~G4O", "f\"87*C%", ".T]j_Jt\"", "pUP=o", "LUG3l", "CR4,w?K", "CR4,w?q?|r", "nT/1@*A?tr<#O", "ifUM", "lRt{", "b#M*IZ%", "Pf>S3", "WIj~", ")Rl,!DiVq", "m!TS[E..prR]O", "WIj~", "zGNBUD,x}", "&U?*T(dd1.GXu", "0)8w", ")Rl,!DiVq", "&U?*T(dd1.GXu", "lVw=8", ")Rl,!DiVq", "%}(1", "m!TS[E..prR]O", "m!TS[E..prR]O", "m!TS[E..prR]O", "rYf47&00IbjU+", "m!TS[E..prR]O", "m!TS[E..prR]O", "&U?*T(dd1.GXu", "&U?*T(dd1.GXu", "m!TS[E..prR]O", "&U?*T(dd1.GXu", "gv@&P800!h?R|", "&U?*T(dd1.GXu", "m!TS[E..prR]O", "&U?*T(dd1.GXu", "sXh]cJ8\"", "c!RM<nmL@~G4O", "f\"87*C%", "qV4~[ri&ceK)+4", "_?5~AnpEg.\"wu", "ifUM", "U<TSm", "J!f3", "^Xh]f", ";G{BFE%", "CR4,w?q?|r", "V!f3", "3^dp3nS1Xkr)u", "RVOXlCJ<", "lUG3\"_&tASk{u", "U<3PSJK", "_?5~AnpEg.\"wu", ",!f3", "WIj~", "CR4,w?K", "CR4,w?q?|r", "o<_jXoK", "&Ue=8", "zGNBUD,x}", "6Hv{Aw&\"", "m!TS[E..prR]O", "&U:~}Dg&7eC)u", "m!v{M*fm%rxRO", "m!v{M*fm%rxRO", "CR4,w?K", ")Rl,!DiVq", "sXh]cJ8\"", "c!RM<nmL@~G4O", "f\"87*C%", "nT/1@*A?tr<#O", ",!f3", "WIj~", "CR4,w?K", ";G{BFE}EY.", "m\"osVm%", "&Ue=8", ")Rl,!DiVq", "+^e=pF|<", "&U?*T(dd1.GXu", "&U:~}Dg&7eC)u", "&Ue=3n!&W.:Gu", "&Ue=3n!&W.:Gu", "CR4,w?K", "zGNBUD,x}", "sXh]cJ8\"", "lUG3\"_&tASk{u", "f\"87*C%", "nT/1@*A?tr<#O", "ifUM", "CR4,w?K", "CR4,w?q?|r", "%}(1", "o<_jXoK", "&Ue=8", "sXh]cJ8\"", "c!RM<nmL@~G4O", "f\"87*C%", "_?5~AnpEg.\"wu", "ifUM", "CR4,w?K", ";G{BFE}EY.", "&U?*T(ddRS^1qW/", "sXh]cJ8\"", "lUG3\"_&tASk{u", "f\"87*C%", "nT/1@*A?tr<#O", ",!f3", ";G{BFE%", "CR4,w?q?|r", "lUvp0(q&CH8K.4", "RVOXlCJ<", "c!RM<nmL@~G4O", "U<3PSJK", "nT/1@*A?tr<#O", "ifUM", "qV4~[ri&ceK)+4", "V!f3", "%}p]z", "MH.AM*xpXaHp<%~khO", "<iSg\"K#FGfDx<%F)9%K\"V*?;", "RVOXlCJ<", "lUG3\"_&tASk{u", "U<3PSJK", "qV4~[ri&ceK)+4", "nT/1@*A?tr<#O", ",!f3", "XfUM", "Vf2SM*(/jG!R:[BV0}T", "MH.AM*(/jG!RO", "nT/1@*A?tr<#O", "ifUM", "V!f3", "x!@*3n[1XkH)u", "3^dp3n((7e]ru", "sXh]cJ8\"", "c!RM<nmL@~G4O", "U<3PSJK", ";G{BFE%", ";G{BFE}EY.", "%}(1", "IV\"H", "IV\"H", "d>/Km300G^qRJI_", "sXh]cJ8\"", "c!RM<nmL@~G4O", "U<3PSJK", "nT/1@*A?tr<#O", ",!f3", "Bh_j??K", "qV4~[ri&ceK)+4", "F!TSmJ8\"", "b^t=l", "NGg=", "fX>S,[b,Xd9", "c!QS0oBmX~_B(#/", "J!f3", "V!f3", "sXh]cJ8\"", "lUG3\"_&tASk{u", "f\"87*C%", "nT/1@*A?tr<#O", ",!f3", "`Xb1W5amkvdZ6b", "VVn*_X%", "b^t=l", "pU+ph", "WI1Xh", "J!f3", "`V87~nk&Ak7", "RVOXlCJ<", "c!RM<nmL@~G4O", "f\"87*C%", "_?5~AnpEg.\"wu", ",!f3", "CR4,w?K", ";G{BFE}EY.", "WIj~", "o<_jXoK", "m!v{3", "m\"osVm%", "m!v{3", "m\"osVm%", "m!v{3", "m\"osVm%", "xV&,[r%", "m!v{M*#.Ud8", "&Ue=3nwdfKJ", "RVOXlCJ<", "lUG3\"_&tASk{u", "U<3PSJK", "_?5~AnpEg.\"wu", ",!f3", "g[w=bn6tZK(WK^", "tW#{>*BLedE%dH", "[Tg{", "g[w=bn6tZK(WK^", "tW#{>*BLedE%dH", "tW#{>*BLedE%dH", "&Ue=3n6tZK(WK^", "m!v{M*[o|rB4O", "g[w=bn6tZK(WK^", "sXh]cJ8\"", "lUG3\"_&tASk{u", "U<3PSJK", "lRt{", "!Vb*BT4BVKQ", "_?5~AnpEg.\"wu", "ifUM", "m\"osVm%", ".T]j_Jt\"", "WIj~", "s\"w=R)i<", "XXY_GlCL6", "&U?*T(dd1.GXu", "m!TS[E..prR]O", "RVOXlCJ<", "c!RM<nmL@~G4O", "U<3PSJK", "NGg=", "fX>S,[b,Xd9", "nT/1@*A?tr<#O", "ifUM", "%}(1", "o<_jXoK", ".T]j_Jt\"", "&U?*T(dd1.GXu", "sXh]cJ8\"", "lUG3\"_&tASk{u", "U<3PSJK", "lRt{", "fX>S,[b,Xd9", "nT/1@*A?tr<#O", "ifUM", "qV4~[ri&ceK)+4", "%}(1", "f\"?*&", "J!f3", "^Xh]f", "V!f3", "Vf2SM*DLjGP", "RVOXlCJ<", "lUG3\"_&tASk{u", "U<3PSJK", "_?5~AnpEg.\"wu", "ifUM", "WIj~", ";G{BFE%", ";G{BFE}EY.", "m!v{3", "sXh]cJ8\"", "c!RM<nmL@~G4O", "U<3PSJK", "_?5~AnpEg.\"wu", ",!f3", "y+FpT(J<", "6f/1%;zFU~", "jQajj?v.(F", "`Xb1W5amkvdZ6b", "WI1Xh", "m\"osVm%", "d?XsoCg<", "%}p]z", "WIj~", "&U?*T(dd1.GXu", "%}(1", "&U?*T(dd1.GXu", "m!TS[E..prR]O", "WIj~", "m!TS[E..prR]O", "&U?*T(dd1.GXu", "#+5~", "6Hv{Aw&\"", "&Ue=3nwdfKJ", "&Ue=3n6tZK(WK^", "tW#{>*BLedE%dH", "#+5~", "m!v{M*#.Ud8", "sXh]cJ8\"", "lUG3\"_&tASk{u", "U<3PSJK", "nT/1@*A?tr<#O", "ifUM", "NGg=", "W;^SVoVUU~;Zf%/", "%}(1", "`Ukp@(q&+", "m!TS[E..prR]O", "xV&,[r%", "qV4~[ri&ceK)+4", "f\"?*&", "J!f3", "MVOX!", "XfUM", "Vf2SM*DLjGP", "RVOXlCJ<", "c!RM<nmL@~G4O", "f\"87*C%", "_?5~AnpEg.\"wu", ",!f3", "lRt{", "W;^SVoVUU~;Zf%/", "Y6/1", "&Ue=3nwdfKJ", "m!v{M*BLedE%dH", "g[w=bn6tZK(WK^", "RVOXlCJ<", "lUG3\"_&tASk{u", "f\"87*C%", "nT/1@*A?tr<#O", "ifUM", "m\"H~", "+!GA2E`m6", "3W4~l", "#+5~", "&U?*T(dd1.GXu", "RVOXlCJ<", "c!RM<nmL@~G4O", "f\"87*C%", "nT/1@*A?tr<#O", "ifUM", "CR4,w?K", "m\"osVm%", "s\"w=R)i<", "LU?*&CJ<", "b^t=l", "NGg=", "!Vb*BT4BVKQ", "`Ukp@(q&+", "WIj~", "m!TS[E..prR]O", "m!TS[E..prR]O", "o<_jXoK", "_9/1f", "sXh]cJ8\"", "c!RM<nmL@~G4O", "U<3PSJK", "_?5~AnpEg.\"wu", ",!f3", "%}(1", "o<y1", "qV4~[ri&ceK)+4", "*rjgX", "s\"w=R)i<", "m!TS[E..prR]O", "j<#{sZa\"", "s62;L!++j]1gi", "s62;L!++j]1gi", "m!v{M*BLedE%dH", "tW#{>*BLedE%dH", "m!TS[E..prR]O", "&Ue=3n6tZK(WK^", "tW#{>*BLedE%dH", "s\"w=R)i<", "m!TS[E..prR]O", "RVOXlCJ<", "c!RM<nmL@~G4O", "U<3PSJK", "qV4~[ri&ceK)+4", "nT/1@*A?tr<#O", ",!f3", "f\"?*&", "8fUM", "MVOX!", "CR4,w?K", ";G{BFE}EY.", "%}(1", "XfUM", "y}HjlE;.s~g4q87", ".T^Sf", "5Q:~xM%", "SW_joE.LU~", "i}Hjp;r\"", "&Un*Gsk&~i+1(^", "}{xq4R{qNBp0m7b(h!UM!Q}\"7@v4W9.}1OUD}o_\"XagMy#:<PfZP|?K", "RVOXlCJ<", "lUG3\"_&tASk{u", "U<3PSJK", "WIL*xmKlW#fP~4", "}^@*8", "cXv{c", "49F=Xv}}+eK;aui\".lt=", "g[{sJf=LRKJkx^", "]<q]pUK", "q!L*RHDtRi{", "I!g=H6SB}eJ", "DhL{SJK", "g[{sJf;tDS))u", "I!g=\"$:1Vi", "c!/1^wBm6", "RVOXlCJ<", "lUG3\"_&tASk{u", "U<3PSJK", "_?5~AnpEg.\"wu", ",!f3", "?7~wa", "*G{s>@E_>i,", "T?P=", "E/SF:", "*G{s>@zu}", "T?P=", "?7y1~", "*G{s>@I{Y.K)u", "T?P=", "E/Y`Y", "*G{s>@)l%.6", "[Tg{", ".U9s>ClL$K[", "q`v{%;L\"", "V}${", "lRt{", "&fFS}o!3mx94O", "79OP_JBm9GQY7y]N3O", "W;*SBj!,,FA#O", ")R#{^w4.bF", "c!RM<nmL@~G4O", "j<_jAJK", "HH4jAJK", "Wfv{Aw^?q~cd+|S&cTFS_vrDMq", "dbS.G@&CbfH:Bd8hn6^a`?X9^4AsWMS+3>gv$", "wk&V/xaU.]+<3E5LqaOe/XSr", "%B^*UK5FWm&S%M#Ul]`ZsPSr", "r7QaQ2nSNNI&^kE{mxB.b9Y3#0nM;k", "0R<!SR@u9CQU>)ehC{~j0Xn7!f5M8F|"];
var d = (e, f, g, h, i) => {
  if (typeof h === "undefined") {
    h = r;
  }
  if (typeof i === "undefined") {
    i = b;
  }
  if (e !== f) {
    return i[e] ||= h(c[e]);
  }
  if (h === undefined) {
    d = i;
  }
  if (g && h !== r) {
    d = r;
    return d(e, -1, g, h, i);
  }
  if (g == e) {
    return f[b[g]] = d(e, f);
  }
};
function e() {
  return globalThis;
}
function f() {
  return global;
}
function g() {
  return window;
}
function h() {
  return new Function("return this")();
}
function i(b = [e, f, g, h]) {
  var c;
  var d = [];
  try {
    a(c = Object, d.push("".__proto__.constructor.name));
  } catch (e) {}
  shg0BY: for (var k = 0; k < b.length; k++) {
    try {
      c = b[k]();
      for (var l = 0; l < d.length; l++) {
        if (typeof c[d[l]] === "undefined") {
          continue shg0BY;
        }
      }
      return c;
    } catch (e) {}
  }
  return c || this;
}
var j = i() || {};
var k = j.TextDecoder;
var l = j.Uint8Array;
var m = j.Buffer;
var n = j.String || String;
var o = j.Array || Array;
var p = function () {
  var b = new o(128);
  var c = n.fromCodePoint || n.fromCharCode;
  var d = [];
  return function (e) {
    var f;
    var g;
    var h = e.length;
    d.length = 0;
    for (var j = 0; j < h;) {
      g = e[j++];
      if (g <= 127) {
        f = g;
      } else if (g <= 223) {
        f = (g & 31) << 6 | e[j++] & 63;
      } else if (g <= 239) {
        f = (g & 15) << 12 | (e[j++] & 63) << 6 | e[j++] & 63;
      } else if (n.fromCodePoint) {
        f = (g & 7) << 18 | (e[j++] & 63) << 12 | (e[j++] & 63) << 6 | e[j++] & 63;
      } else {
        a(f = 63, j += 3);
      }
      d.push(b[f] ||= c(f));
    }
    return d.join("");
  };
}();
function q(a) {
  if (typeof k !== "undefined" && k) {
    return new k().decode(new l(a));
  } else if (typeof m !== "undefined" && m) {
    return m.from(a).toString("utf-8");
  } else {
    return p(a);
  }
}
(() => {
  var d = (e, f, g, h, i) => {
    if (typeof h === "undefined") {
      h = cW;
    }
    if (typeof i === "undefined") {
      i = b;
    }
    if (h === d) {
      cW = f;
      return cW(g);
    }
    if (e !== f) {
      return i[e] ||= h(c[e]);
    }
    if (g && h !== cW) {
      d = cW;
      return d(e, -1, g, h, i);
    }
  };
  var e = d(7);
  var f = d(114);
  var g = d(77);
  var h = d(82);
  var i = d(89);
  var j = d(82);
  var k = d(61);
  var l = [d(31), d(32), d(34), d(37), d(38), d(49), d(77), d(77), d(70), d(85), d([70]), d(162), d(250), d(7)];
  var m = d(11);
  var n = d(12);
  var o = d(11);
  var p = d(8);
  var r = {
    c: d(6),
    d: d([7]),
    h: d(43),
    i: d([58]),
    j: d(63),
    k: d(66),
    l: d(82),
    m: d(82),
    n: d(117)
  };
  function s(d, e) {
    try {
      if (!e) {
        alert(`[SCRIPT] TAB CRASHED: Case ${d}`);
      } else {
        alert(`[SCRIPT] TAB CRASHED: Case ${d} | Error ${e} |`);
      }
      while (true) {
        ;
      }
    } catch {
      while (true) {
        ;
      }
    }
    ;
  }
  ;
  function t() {
    var d = (e, f, h, i, j) => {
      if (typeof i === "undefined") {
        i = g;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (h == e) {
        return f[b[h]] = d(e, f);
      }
      if (f) {
        [j, f] = [i(j), e || h];
        return d(e, j, h);
      }
      if (e !== f) {
        return j[e] ||= i(c[e]);
      }
      if (h && i !== g) {
        d = g;
        return d(e, -1, h, i, j);
      }
    };
    var e = [d(3)];
    var f = {
      a: d(1),
      b: d(2)
    };
    if (document[d(0)][f.a][f.b]() - d(3) > d(4) || e[0] - document[d([0])][d(1)][d(2)]() > d(4)) {
      try {
        alert(`[SCRIPT] CODE EXPIRED`);
        while (true) {
          ;
        }
      } catch {
        while (true) {
          ;
        }
      }
    }
    ;
    function g(d) {
      var e = "[HGtQLCgJBAXp+I\"v1D7*YMR5w2!~>&l.s%keqKF0W,=6^ThufE}#c;n|zx<4oj{)U@_(P`V8?m$d3yOZarS/9]:iNb";
      var f = "" + (d || "");
      var g = f.length;
      var h = [];
      var j = 0;
      var k = 0;
      var l = -1;
      for (var m = 0; m < g; m++) {
        var o = e.indexOf(f[m]);
        if (o === -1) {
          continue;
        }
        if (l < 0) {
          l = o;
        } else {
          a(l += o * 91, j |= l << k, k += (l & 8191) > 88 ? 13 : 14);
          do {
            a(h.push(j & 255), j >>= 8, k -= 8);
          } while (k > 7);
          l = -1;
        }
      }
      if (l > -1) {
        h.push((j | l << k) & 255);
      }
      return q(h);
    }
  }
  ;
  const u = document[d(5)](r.c);
  a(u[r.d] = p, document[d(9)][d(10)](u));
  if (localStorage[o](n)) {
    var v = {
      e: d(12)
    };
    localStorage[d(13)](v.e);
  }
  if (localStorage[d([11])]("  ")) {
    var w = [d(14)];
    localStorage[w[0]]("  ");
  }
  if (localStorage[d(11)](" ")) {
    localStorage[d(15)](" ");
  }
  function x(e) {
    var f = [d(16)];
    return e[f[0]]("")[d(17)]()[d(18)]("");
  }
  ;
  let y = localStorage[m](d(19));
  if (!y) {
    try {
      s(1);
      while (true) {
        ;
      }
    } catch {
      while (true) {
        ;
      }
    }
  } else {
    y = x(y);
  }
  if (y[d(20)] != 50 || !/^[A-Za-z]+$/[d(21)](y)) {
    try {
      s(2);
      while (true) {
        ;
      }
    } catch {
      while (true) {
        ;
      }
    }
  }
  ;
  try {
    var z = (d, e, f, g, h) => {
      if (typeof g === "undefined") {
        g = H;
      }
      if (typeof h === "undefined") {
        h = b;
      }
      if (g === z) {
        H = e;
        return H(f);
      }
      if (d !== e) {
        return h[d] ||= g(c[d]);
      }
      if (f == g) {
        if (e) {
          return d[h[e]];
        } else {
          return b[d] || (f = h[d] || g, b[d] = f(c[d]));
        }
      }
    };
    var A = z(23);
    var B = d(22);
    var C = [d(24), d(22)];
    var D = {
      f: d(22)
    };
    if ((Date[D.f][z(23)]() == C[0] || Date[B][z([23])]() == d(25)) && (Date[C[1]][z(23)][A]() == z(26) || Date[d(22)][z(23)][z(23)]() == z(27))) {
      var E = {
        g: d([30])
      };
      var F = d([29]);
      var G = [d(22)];
      a(Object[z([28])](Date, G[0], {
        [F]: false,
        [d(30)]: false
      }), Reflect[z([28])](Date, d(22), {
        [d(29)]: false,
        [E.g]: false
      }));
    } else {
      try {
        s(3);
        while (true) {
          ;
        }
      } catch {
        while (true) {
          ;
        }
      }
    }
    ;
    function H(d) {
      var e = "azQAnbRBYpiSsPZhCfrV`.W]~D%Udtx#$y[>=Gj{5_l4O(KkL;13?\"Hq0guw},^)T:&|<*@E!Xo9c76M+I2mNvJF/e8";
      var f = "" + (d || "");
      var g = f.length;
      var h = [];
      var j = 0;
      var k = 0;
      var l = -1;
      for (var m = 0; m < g; m++) {
        var o = e.indexOf(f[m]);
        if (o === -1) {
          continue;
        }
        if (l < 0) {
          l = o;
        } else {
          a(l += o * 91, j |= l << k, k += (l & 8191) > 88 ? 13 : 14);
          do {
            a(h.push(j & 255), j >>= 8, k -= 8);
          } while (k > 7);
          l = -1;
        }
      }
      if (l > -1) {
        h.push((j | l << k) & 255);
      }
      return q(h);
    }
  } catch {
    try {
      s(4);
      while (true) {
        ;
      }
    } catch {
      while (true) {
        ;
      }
    }
    ;
  }
  ;
  let I = document[l[0]][l[1]][d(33)]();
  const J = {
    [l[2]]: 1000
  };
  let K = 1000 / J[d(34)];
  let L = 0;
  let M = 0;
  let N = performance.now();
  let O = 0;
  let P = 0;
  const Q = requestAnimationFrame;
  let R;
  a(requestAnimationFrame = function (e) {
    var f = [d(33)];
    const g = performance[f[0]]();
    if (g - N >= 1000) {
      a(M = O, O = 0, N = g, P = M + d(35));
    }
    ;
    const h = g - L;
    if (h >= K) {
      a(L = g - h % K, O++, Q(e));
    } else {
      Q(() => {
        return requestAnimationFrame(e);
      });
    }
    ;
  }, setFps = function (e) {
    a(J[d(34)] = e, K = 1000 / J[d(34)]);
  });
  let S = -1;
  let T;
  let U;
  let V = false;
  let W = false;
  let X = 0;
  let Y = null;
  let Z = null;
  let aa = null;
  let ab = null;
  let ac = null;
  let img = null;
  let ae = false;
  let af = false;
  let ag = null;
  let ah;
  let ai = d(36);
  let aj = false;
  let ak = [];
  let al = function () {};
  let am = function () {};
  let an = function () {};
  let ao = function () {};
  let ap = Object[l[3]];
  let aq = false;
  let client;
  let game;
  let UI;
  let world;
  let user;
  let aw = false;
  if (l[4][d([39])](d([40]))) {
    aw = true;
  }
  let ax = Infinity;
  let ay = 0;
  ;
  let az = 0;
  let aA = 0;
  ;
  let aB = false;
  let aC = {};
  ;
  let aD = {
    [d(41)]: 0,
    [d(42)]: 0
  };
  let aE = -1;
  ;
  let aF = -1;
  let aG = -1;
  ;
  let aH = document[d(31)][d(32)][d([33])]();
  let aI = {};
  ;
  let aJ = {};
  let aK = true;
  ;
  let aL = true;
  let aM = true;
  ;
  let aN = true;
  let aO;
  let aP;
  let aQ = 0;
  let aR = 0;
  ;
  let aS = [];
  let aT = [];
  let aU = [];
  let aV = {};
  let aW = {};
  ;
  let aX = {};
  let aY = false;
  ;
  let aZ = false;
  let ba = false;
  ;
  let bb = false;
  let bc = {};
  ;
  let bd = false;
  let be = -1;
  ;
  let bf = false;
  ;
  let bg = false;
  let bh = null;
  ;
  let bi = 0;
  ;
  let bj = false;
  let bk = false;
  ;
  let bl = false;
  let bm = 0;
  let bn = 0;
  let bo = false;
  ;
  let bp = 0;
  let bq = 0;
  ;
  let br = false;
  ;
  let bs;
  ;
  let bt = 0;
  let bu = 0;
  ;
  let bv = {
    [r.h]: [],
    [d(44)]: [],
    [d(45)]: false,
    [d(46)]: false,
    [d(47)]: false,
    [d(48)]: false
  };
  let Settings = {
    [l[5]]: 1,
    [d(50)]: 1,
    [d(51)]: 1,
    [d(52)]: 10,
    [d(53)]: 1,
    [d(54)]: 1,
    [d(55)]: 1,
    [d([56])]: 1,
    [d(57)]: 1,
    [r.i]: 1,
    [d(59)]: 0.5,
    [d(60)]: 1,
    [k]: 1,
    [d(62)]: 1,
    [r.j]: 1,
    [d(64)]: 1,
    [d(65)]: 1,
    [r.k]: 0.5,
    [d(67)]: 1,
    [d(68)]: 1,
    [d(69)]: {
      [d(70)]: d(71)
    },
    [d(72)]: 1,
    [d(73)]: 1,
    [d(74)]: {
      [d(70)]: d(75)
    },
    [d(76)]: {
      [d([77])]: d(78)
    },
    [d(79)]: {
      [d(77)]: d(80)
    },
    [d(81)]: {
      [j]: 1,
      [d(83)]: 0.5
    },
    [d(84)]: {
      [d(82)]: 0,
      [d(77)]: d(85)
    },
    [d(86)]: {
      [r.l]: 0,
      [d([77])]: d(87)
    },
    [d(88)]: {
      [d(82)]: 0,
      [d(77)]: i
    },
    [d(90)]: {
      [h]: 0,
      [l[6]]: d(85)
    },
    [d(91)]: {
      [d(82)]: 0,
      [d(77)]: d(85)
    },
    [d(92)]: {
      [d([82])]: 0,
      [d(77)]: d(85)
    },
    [d(93)]: {
      [d(82)]: 0,
      [g]: d(85)
    },
    [d(94)]: {
      [d(82)]: 0,
      [d(77)]: d(95)
    },
    [d(96)]: {
      [r.m]: 0,
      [d(97)]: d(98),
      [d(99)]: 10
    },
    [d(100)]: {
      [d(82)]: 1,
      [d(83)]: 0.5,
      [d(77)]: d(101)
    },
    [d(102)]: {
      [d(82)]: 0,
      [d(70)]: d(103),
      [d(77)]: d(104)
    },
    [d(105)]: {
      [d(82)]: 0,
      [d([70])]: d(103),
      [d(77)]: d(106),
      [d(107)]: 4
    },
    [d(108)]: {
      [d(82)]: 0,
      [l[7]]: d(85)
    },
    [d(109)]: {
      [d(82)]: 0,
      [d(77)]: d(110)
    },
    [d(111)]: {
      [d(82)]: 0,
      [d(77)]: d(112),
      [l[8]]: d(113)
    },
    [f]: {
      [d(82)]: 0,
      [d(77)]: l[9]
    },
    [d(115)]: {
      [d(82)]: 0,
      [d(77)]: d(116),
      [d(117)]: 0,
      [l[10]]: d(118),
      [d(119)]: 0
    },
    [d(120)]: {
      [d(82)]: 1
    },
    [d(121)]: {
      [d(82)]: 1
    },
    [d(122)]: {
      [d(123)]: 0,
      [d(124)]: 30
    },
    [d(125)]: {
      [d(82)]: 0,
      [d(77)]: d(126),
      [d(117)]: 0
    },
    [d(127)]: {
      [d(82)]: 0,
      [d([77])]: d(85),
      [r.n]: 0
    },
    [d([128])]: {
      [d(82)]: 0
    },
    [d(129)]: {
      [d(82)]: 0
    },
    [d(130)]: {
      [d(82)]: 0
    },
    [d(131)]: {
      [d(82)]: 0
    },
    [d(132)]: {
      [d(133)]: 0,
      [d(134)]: 0,
      [d(135)]: 0,
      [d(136)]: 0,
      [d(137)]: 0,
      [d(138)]: 0,
      [d(139)]: 0,
      [d([140])]: 0,
      [d(141)]: 0,
      [d(142)]: 0,
      [d([143])]: 0,
      [d([144])]: 0,
      [d(145)]: 0,
      [d(146)]: 0,
      [d(147)]: 0,
      [d(148)]: 0,
      [d(149)]: 0,
      [d(150)]: 0,
      [d([151])]: 0
    },
    [d(152)]: 25,
    [d([153])]: {
      [d(82)]: 0
    },
    [d(154)]: {
      [d(155)]: "",
      [d(156)]: ""
    },
    [d(157)]: {
      [d(82)]: 0,
      [d(77)]: d(158),
      [d([117])]: 0,
      [d(159)]: 1,
      [d(160)]: 0,
      [d([161])]: 0,
      [l[11]]: 0,
      [d(163)]: 0,
      SX: 0,
      SY: 0
    },
    [d(164)]: {
      [d(82)]: 0,
      [d(77)]: d(165),
      [d([166])]: {
        x: -1,
        y: -1
      },
      [d(167)]: 1
    },
    [d(168)]: {
      [d([169])]: d(170),
      [d(171)]: d(170),
      [d(172)]: 0,
      [d(173)]: 1
    },
    [d(174)]: 0,
    [d(175)]: {
      [d([82])]: 0,
      [d(77)]: d(85)
    },
    [d([176])]: 300,
    [d(177)]: {
      [d(178)]: 0,
      [d(179)]: 0,
      [d(180)]: 0,
      [d(181)]: 0,
      [d(182)]: 0
    }
  };
  var bx = new Image();
  bx[d([7])] = d(183);
  var by = new Image();
  by[d([7])] = d([184]);
  var bz = new Image();
  bz[d(7)] = d(185);
  var bA = new Image();
  a(bA[e] = d(186), aW[d(187)] = new Image(), aW[d(188)] = new Image(), aW[d(189)] = new Image(), aW[d([190])] = new Image(), aW[d(191)] = new Image(), aW[d(192)] = new Image(), aW[d(193)] = new Image(), aW[d(194)] = new Image(), aW[d(195)] = new Image(), aW[d(196)] = new Image(), aW[d(197)] = new Image(), aW[d(198)] = new Image(), aW[d(199)] = new Image(), aW[d([200])] = new Image(), aW[d(201)] = new Image(), aW[d(202)] = new Image(), aW[d(203)] = new Image(), aW[d([204])] = new Image(), aW[d([205])] = new Image(), aW[d(206)] = new Image(), aW[d(207)] = new Image(), aW[d(208)] = new Image(), aW[d(209)] = new Image(), aW[d([210])] = new Image(), aW[d([211])] = new Image(), aW[d(212)] = new Image(), aW[d(213)] = new Image(), aW[d(214)] = new Image(), aW[d(215)] = new Image(), aW[d(216)] = new Image(), aW[d(217)] = new Image(), aW[d(218)] = new Image(), aW[d(219)] = new Image(), aW[d(220)] = new Image(), aW[d(221)] = new Image(), aW[d(222)] = new Image(), aW[d(187)][d(7)] = d(223), aW[d(188)][d(7)] = d(224), aW[d(189)][d(7)] = d(225), aW[d([190])][d(7)] = d(226), aW[d(191)][d(7)] = d(227), aW[d(192)][d(7)] = d(228), aW[d(193)][d(7)] = d(229), aW[d(194)][d(7)] = d(230), aW[d(195)][d(7)] = d(231), aW[d(196)][d(7)] = d(232), aW[d(197)][d(7)] = d(233), aW[d(198)][d(7)] = d(234), aW[d(199)][d(7)] = d([235]), aW[d(200)][d([7])] = d(236), aW[d(201)][d(7)] = d(237), aW[d(202)][d(7)] = d(238), aW[d(203)][d(7)] = d(239), aW[d(204)][d(7)] = d(240), aW[d(205)][d([7])] = d(241), aW[d(206)][d(7)] = d(242), aW[d(207)][d([7])] = d(243), aW[d(208)][d(7)] = d(244), aW[d(209)][d([7])] = d(245), aW[d(210)][d([7])] = d([246]), aW[d(211)][d(7)] = d(247), aW[d(212)][d(7)] = d(248), aW[d(213)][d(7)] = d(249), aW[d(214)][d(7)] = l[12], aW[d(215)][d(7)] = d(251), aW[d(216)][d([7])] = d(252), aW[d(217)][d(7)] = d([253]), aW[d(218)][l[13]] = d([254]), aW[d(219)][d(7)] = d(255), aW[d(220)][d(7)] = d(256), aW[d(221)][d(7)] = d(257), aW[d(222)][d(7)] = d(258));
  const units = {
    PLAYERS: 0,
    [d(260)]: 1,
    [d(261)]: 3,
    [d(262)]: 4,
    [d([263])]: 5,
    [d(264)]: 6,
    [d(265)]: 7,
    [d([266])]: 8,
    [d(267)]: 9,
    [d(268)]: 10,
    [d(269)]: 11,
    [d(270)]: 12,
    [d([271])]: 13,
    [d(272)]: 14,
    [d(273)]: 15,
    [d(274)]: 16,
    [d(275)]: 17,
    [d([276])]: 18,
    [d([277])]: 19,
    [d(278)]: 20,
    [d(279)]: 21,
    [d(280)]: 22,
    [d(281)]: 23,
    [d(282)]: 24,
    [d(283)]: 25,
    [d(284)]: 26,
    [d(285)]: 27,
    [d([286])]: 28,
    [d(287)]: 29,
    [d([288])]: 30,
    [d(289)]: 31,
    [d(290)]: 32,
    [d(291)]: 33,
    [d(292)]: 34,
    [d([293])]: 35,
    [d(294)]: 36,
    [d(295)]: 37,
    [d(296)]: 38,
    [d(297)]: 40,
    [d(298)]: 41,
    BREAD_OVEN: 43,
    [d(300)]: 44,
    [d(301)]: 46,
    [d([302])]: 47,
    [d(303)]: 48,
    [d(304)]: 49,
    BED: 50,
    [d(306)]: 52,
    [d(307)]: 53,
    [d(308)]: 54,
    [d(309)]: 55,
    [d(310)]: 56,
    [d(311)]: 57,
    [d(312)]: 58,
    [d(313)]: 59,
    [d(314)]: 60,
    [d(315)]: 61,
    [d(316)]: 62,
    [d(317)]: 63,
    [d(318)]: 64,
    [d(319)]: 67,
    [d(320)]: 68,
    [d(321)]: 69,
    [d(322)]: 70,
    [d(323)]: 71,
    [d(324)]: 72,
    [d(325)]: 73,
    [d(326)]: 74,
    [d([327])]: 75,
    [d(328)]: 76,
    [d([329])]: 77,
    [d(330)]: 78,
    [d(331)]: 79,
    [d([332])]: 80,
    [d(333)]: 81,
    [d(334)]: 82,
    [d(335)]: 83,
    [d(336)]: 84,
    [d(337)]: 85,
    [d(182)]: 86,
    [d(180)]: 87,
    [d(181)]: 88,
    [d(179)]: 89,
    [d(178)]: 90,
    [d(338)]: 92,
    [d(339)]: 93,
    [d(340)]: 94,
    [d(341)]: 97,
    [d(342)]: 98,
    [d(343)]: 99,
    [d(344)]: 100,
    [d(345)]: 101
  };
  COUNTER = 0;
const INV = {
  SWORD: 0,
  [d(347)]: 1,
  [d(348)]: 2,
  [d(349)]: 3,
  [d(350)]: 4,
  [d(351)]: 5,
  [d([352])]: 6,
  [d(353)]: 7,
  [d(354)]: 8,
  [d(355)]: 9,
  [d(356)]: 10,
  [d(357)]: 11,
  [d(358)]: 12,
  [d([359])]: 13,
  [d([360])]: 14,
  [d(361)]: 15,
  [d(362)]: 16,
  [d(363)]: 17,
  [d(364)]: 18,
  [d(365)]: 19,
  [d(366)]: 20,
  [d(367)]: 21,
  [d(368)]: 22,
  [d(369)]: 23,
  [d(370)]: 24,
  [d(371)]: 25,
  [d(372)]: 26,
  [d(373)]: 27,
  [d(374)]: 28,
  [d(375)]: 29,
  [d(376)]: 30,
  [d([377])]: 31,
  [d(378)]: 32,
  [d(379)]: 33,
  [d(380)]: 34,
  [d(381)]: 35,
  [d(382)]: 36,
  [d(383)]: 37,
  [d(384)]: 38,
  [d(385)]: 39,
  [d(386)]: 40,
  [d(387)]: 41,
  [d([388])]: 42,
  [d(389)]: 43,
  [d(390)]: 44,
  [d(391)]: 45,
  BOOK: 46,
  [d(393)]: 47,
  [d(394)]: 48,
  [d(395)]: 49,
  [d(396)]: 50,
  [d(397)]: 51,
  [d(398)]: 52,
  [d(399)]: 53,
  [d(400)]: 54,
  [d(401)]: 55,
  [d(402)]: 56,
  [d([403])]: 57,
  [d(404)]: 58,
  [d(405)]: 59,
  [d(406)]: 60,
  [d(407)]: 61,
  [d(408)]: 62,
  [d(409)]: 63,
  [d(410)]: 64,
  [d(411)]: 65,
  HAMMER_REIDITE: 66,
  [d(413)]: 67,
  [d(414)]: 68,
  [d(415)]: 69,
  [d(416)]: 70,
  [d(417)]: 71,
  [d(418)]: 72,
  [d([419])]: 73,
  [d(420)]: 74,
  [d(421)]: 75,
  [d(422)]: 76,
  [d(423)]: 77,
  [d(424)]: 78,
  [d(425)]: 79,
  [d(426)]: 80,
  [d(427)]: 81,
  [d(428)]: 82,
  [d(429)]: 83,
  [d(430)]: 84,
  WATERING_CAN_FULL: 85,
  [d([432])]: 86,
  [d(433)]: 87,
  [d(434)]: 88,
  [d(435)]: 89,
  [d(436)]: 90,
  [d(437)]: 91,
  [d(438)]: 92,
  [d(439)]: 93,
  [d(440)]: 94,
  [d(441)]: 95,
  [d(442)]: 96,
  [d(443)]: 97,
  [d(444)]: 98,
  PITCHFORK: 99,
  PITCHFORK2: 100,
  [d(447)]: 101,
  [d(448)]: 102,
  [d(449)]: 103,
  [d(450)]: 104,
  [d(451)]: 105,
  [d(452)]: 106,
  [d(453)]: 107,
  [d(454)]: 108,
  [d(455)]: 109,
  [d(456)]: 110,
  [d(457)]: 111,
  [d(458)]: 112,
  [d(459)]: 113,
  [d(460)]: 114,
  [d(461)]: 115,
  [d(462)]: 116,
  [d(463)]: 117,
  [d(464)]: 118,
  [d(465)]: 119,
  [d(466)]: 120,
  [d(467)]: 121,
  [d(468)]: 122,
  [d([469])]: 123,
  [d(470)]: 124,
  [d(471)]: 125,
  [d(472)]: 126,
  [d(473)]: 127,
  [d(474)]: 128,
  [d(475)]: 129,
  [d(476)]: 130,
  [d(477)]: 131,
  [d(478)]: 132,
  [d(479)]: 133,
  [d(480)]: 134,
  [d(481)]: 135,
  [d(482)]: 136,
  [d(483)]: 137,
  [d(484)]: 138,
  [d(485)]: 139,
  [d(486)]: 140,
  [d(487)]: 141,
  [d(488)]: 142,
  [d([489])]: 143,
  [d(490)]: 144,
  [d(491)]: 145,
  [d([492])]: 146,
  [d(493)]: 147,
  [d(494)]: 148,
  [d(495)]: 149,
  [d(496)]: 150,
  [d(497)]: 151,
  CROWN_BLUE: 152,
  [d(499)]: 153,
  [d(500)]: 154,
  [d(501)]: 155,
  [d(502)]: 156,
  [d(503)]: 157,
  [d(504)]: 158,
  [d(505)]: 159,
  [d(506)]: 160,
  [d([507])]: 161,
  [d([508])]: 162,
  [d(509)]: 163,
  [d(510)]: 164,
  [d(511)]: 165,
  [d(512)]: 166,
  [d(513)]: 167,
  [d(514)]: 168,
  [d(515)]: 169,
  [d(516)]: 170,
  [d(517)]: 171,
  [d(518)]: 172,
  [d(519)]: 173,
  [d(520)]: 174,
  [d(521)]: 175,
  [d(522)]: 176,
  [d(523)]: 177,
  [d(524)]: 178,
  [d(525)]: 179,
  [d(526)]: 180,
  [d(527)]: 181,
  [d(528)]: 182,
  [d(529)]: 183,
  [d(530)]: 184,
  [d(531)]: 185,
  [d(532)]: 186,
  [d(533)]: 187,
  [d(534)]: 188,
  [d([535])]: 189,
  [d(536)]: 190,
  [d(537)]: 191,
  [d(538)]: 192,
  [d(539)]: 193,
  [d(540)]: 194,
  [d(541)]: 195,
  [d(542)]: 196,
  [d(543)]: 197,
  [d(544)]: 198,
  [d(545)]: 199,
  [d(546)]: 200,
  [d(547)]: 201,
  [d(548)]: 202,
  [d(549)]: 203,
  [d(260)]: 204,
  [d(550)]: 205,
  [d(261)]: 206,
  [d(551)]: 207,
  [d(552)]: 208,
  [d(264)]: 209,
  [d(276)]: 210,
  [d(553)]: 211,
  [d([554])]: 212,
  [d(277)]: 213,
  [d(278)]: 214,
  [d(279)]: 215,
  [d([555])]: 216,
  [d(556)]: 217,
  [d(557)]: 218,
  [d(558)]: 219,
  [d(559)]: 220,
  [d(560)]: 221,
  [d(561)]: 222,
  [d(562)]: 223,
  [d(563)]: 224,
  [d(297)]: 225,
  [d(564)]: 226,
  [d(565)]: 227,
  [d(298)]: 228,
  [d(566)]: 229,
  [d([567])]: 230,
  [d(568)]: 231,
  [d(569)]: 232,
  [d(570)]: 233,
  [d(571)]: 234,
  [d(572)]: 235,
  [d(573)]: 236,
  BREAD_OVEN: 237,
  [d(574)]: 238,
  [d(575)]: 239,
  [d(576)]: 240,
  [d(577)]: 241,
  [d(578)]: 242,
  [d(579)]: 243,
  [d(280)]: 244,
  [d(281)]: 245,
  [d(282)]: 246,
  [d(283)]: 247,
  [d(284)]: 248,
  [d(285)]: 249,
  [d(286)]: 250,
  [d([287])]: 251,
  [d([288])]: 252,
  [d(289)]: 253,
  [d(290)]: 254,
  [d(291)]: 255,
  [d([292])]: 256,
  [d(293)]: 257,
  [d([294])]: 258,
  [d(295)]: 259,
  [d(580)]: 260,
  [d(296)]: 261,
  [d(263)]: 262,
  [d(581)]: 263,
  [d(262)]: 264,
  [d(265)]: 265,
  [d(266)]: 266,
  [d(267)]: 267,
  [d(268)]: 268,
  [d([269])]: 269,
  [d(270)]: 270,
  [d(271)]: 271,
  [d(272)]: 272,
  [d(273)]: 273,
  [d([274])]: 274,
  [d(275)]: 275,
  [d(582)]: 276,
  [d(583)]: 277,
  [d(584)]: 278,
  [d([585])]: 279,
  [d(586)]: 280,
  [d(587)]: 281,
  [d(588)]: 282,
  [d(589)]: 283,
  [d(300)]: 284,
  [d(590)]: 285,
  [d(591)]: 286,
  [d(592)]: 287,
  [d(593)]: 288,
  [d(594)]: 289,
  [d(301)]: 290,
  [d(595)]: 291,
  [d(302)]: 292,
  [d(303)]: 293,
  [d(596)]: 294,
  [d(304)]: 295,
  [d(597)]: 296,
  [d(598)]: 297,
  [d(599)]: 298,
  [d([600])]: 299,
  BED: 300,
  [d(601)]: 301,
  [d(602)]: 302,
  [d(603)]: 303,
  [d(604)]: 304,
  [d(327)]: 305,
  [d(605)]: 306,
  [d(606)]: 307,
  [d(607)]: 308,
  [d(608)]: 309,
  [d(609)]: 310,
  [d(610)]: 311,
  [d(611)]: 312,
  [d(612)]: 313,
  [d([307])]: 314,
  [d(613)]: 315,
  [d([306])]: 316,
  [d(614)]: 317,
  [d(317)]: 318,
  [d(615)]: 319,
  [d(318)]: 320,
  [d(616)]: 321,
  [d(308)]: 322,
  [d([309])]: 323,
  [d(310)]: 324,
  [d(311)]: 325,
  [d(312)]: 326,
  [d(313)]: 327,
  [d(314)]: 328,
  [d(315)]: 329,
  [d(316)]: 330,
  [d(617)]: 331,
  [d(618)]: 332,
  [d(619)]: 333,
  [d(620)]: 334,
  [d(621)]: 335,
  [d(330)]: 336,
  [d(331)]: 337,
  [d(332)]: 338,
  [d(333)]: 339,
  [d(622)]: 340,
  [d(623)]: 341,
  [d(624)]: 342,
  [d(625)]: 343,
  [d(626)]: 344,
  [d(627)]: 345,
  [d(628)]: 346,
  [d(629)]: 347,
  [d(630)]: 348,
  [d(336)]: 349,
  [d(631)]: 350,
  [d(632)]: 351,
  [d(633)]: 352,
  [d(634)]: 353,
  [d(182)]: 354,
  [d(334)]: 355,
  [d(635)]: 356,
  [d(636)]: 357,
  [d(178)]: 358
};
  var bD = {
    [d(637)]: 1,
    [d(638)]: 2,
    [d([639])]: 4,
    [d(640)]: 8,
    [d(641)]: 16,
    [d(642)]: 32,
    [d(643)]: 64,
    [d(644)]: 128,
    [d(645)]: 256
  };
  class bE {
    constructor(e, f, g) {
      a(this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = e, this.canvas.height = f, this.buildType = g);
    }
    [d(647)](e, f, g, h) {
      var i = (e, f, g, h, d) => {
        if (typeof h === "undefined") {
          h = j;
        }
        if (typeof d === "undefined") {
          d = b;
        }
        if (e !== f) {
          return d[e] ||= h(c[e]);
        }
        if (h === undefined) {
          i = d;
        }
        if (g == h) {
          if (f) {
            return e[d[f]];
          } else {
            return b[e] || (g = d[e] || h, b[e] = g(c[e]));
          }
        }
      };
      a(this[d(648)][d(649)](0, 0, this[d(650)][d(41)], this[d(650)][d([42])]), this[d([648])][d([651])] = f + d(652), this[d(648)][d(653)] = g);
      if (this[d(654)] == 3) {
        this[d(648)][d(655)] = (e[1] & 16) >> 4 ? d(656) : d(657);
      } else {
        this[d(648)][d(658)] = h;
      }
      this[d(648)][d(659)] = 7;
      switch (this[d(654)]) {
        case 1:
          a(this[d(648)][d(660)]("x" + (e & 255), 15, 40), this[d(648)][d(661)]("x" + (e & 255), 15, 40), this[d(648)][d(660)]("x" + ((e & 65280) >> 8), 15, 60), this[d(648)][d(661)]("x" + ((e & 65280) >> 8), 15, 60));
          break;
        case 2:
          a(this[d(648)][d([660])]("x" + (e & 31), 15, 40), this[d(648)][d(661)]("x" + (e & 31), 15, 40), this[d(648)][d(660)]("x" + ((e & 992) >> 5), 15, 60), this[d(648)][d(661)]("x" + ((e & 992) >> 5), 15, 60), this[d(648)][d(660)]("x" + ((e & 31744) >> 10), 15, 80), this[d(648)][d(661)]("x" + ((e & 31744) >> 10), 15, 80));
          break;
        case 3:
          a(this[d(648)][d(660)](e[0], 15, 40), this[d(648)][d(661)](e[0], 15, 40), this[d(648)][d(660)]((e[1] & 16) >> 4 ? d(662) : d(663), 15, 60), this[d(648)][d(661)]((e[1] & 16) >> 4 ? d(662) : d(663), 15, 60), this[d(648)][d(660)]((e[1] & 16) >> 4 ? e[1] - 16 : e[1], 15, 80), this[d(648)][d(661)]((e[1] & 16) >> 4 ? e[1] - 16 : e[1], 15, 80));
          break;
        case 4:
          a(this[d(648)][d(660)]("x" + e, 15, 40), this[d([648])][d(661)]("x" + e, 15, 40));
          break;
        default:
          a(this[d(648)][d(660)](e, 15, 40), this[d(648)][d(661)](e, 15, 40));
          break;
      }
      ;
      function j(e) {
        var f = "u~7:&^9wOs[d|S_P#gVH6om]2f0r<=RXKCTI!)B.A{/p@+cl$MWLtjD8h`keFE4YJ*(Zy%nG>3}N\"v5?qa,xbUz1;Qi";
        var g = "" + (e || "");
        var h = g.length;
        var j = [];
        var d = 0;
        var k = 0;
        var l = -1;
        for (var m = 0; m < h; m++) {
          var o = f.indexOf(g[m]);
          if (o === -1) {
            continue;
          }
          if (l < 0) {
            l = o;
          } else {
            a(l += o * 91, d |= l << k, k += (l & 8191) > 88 ? 13 : 14);
            do {
              a(j.push(d & 255), d >>= 8, k -= 8);
            } while (k > 7);
            l = -1;
          }
        }
        if (l > -1) {
          j.push((d | l << k) & 255);
        }
        return q(j);
      }
    }
  }
  ;
  let bF = {
    L: 0,
    I: new bE(250, 70, 0),
    E: false
  };
  let bG = ["t", "b", "f", "s", "g", "d", "a", "re", d(664), "p", "cs", "c", "m"];
  let bH = [d(665), "r", "l"];
  let bI = [];
  let bJ = [];
  let bK = eval;
  const bL = 99999999999999;
  const bM = 88888888888888;
  const bN = 77777777777777;
  function bO(e) {
    var f = (e, g, h, i, j) => {
      if (typeof i === "undefined") {
        i = l;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (i === undefined) {
        f = j;
      }
      if (i === f) {
        l = g;
        return l(h);
      }
      if (h && i !== l) {
        f = l;
        return f(e, -1, h, i, j);
      }
      if (g) {
        [j, g] = [i(j), e || h];
        return f(e, j, h);
      }
      if (e !== g) {
        return j[e] ||= i(c[e]);
      }
    };
    e = e[d(666)]();
    let g = Array[d(667)](e)[f(668)](e => {
      return String[f(669)](e[f(670)](0) ^ bN);
    })[f(671)]("");
    const h = Array[d(667)](g)[f([668])](e => {
      return String[f(672)](e[f(673)](0) ^ bM);
    })[f(671)]("");
    const [i, j] = h[f(674)](":");
    const k = Number(i) ^ bL;
    return Array[d(667)](j)[f(668)](e => {
      return String[f(675)](e[d(676)](0) ^ k);
    })[f(671)]("");
    function l(e) {
      var f = "tHMWLDs=84XG0Cp/m$k2U<&)J:;o!i#znlV3*6gx9@QT~\",EuYhaOq_IjBP|.vyZ}+7`1%F5K>(fd[^A]cRNS?bew{r";
      var g = "" + (e || "");
      var h = g.length;
      var j = [];
      var k = 0;
      var l = 0;
      var d = -1;
      for (var m = 0; m < h; m++) {
        var o = f.indexOf(g[m]);
        if (o === -1) {
          continue;
        }
        if (d < 0) {
          d = o;
        } else {
          a(d += o * 91, k |= d << l, l += (d & 8191) > 88 ? 13 : 14);
          do {
            a(j.push(k & 255), k >>= 8, l -= 8);
          } while (l > 7);
          d = -1;
        }
      }
      if (d > -1) {
        j.push((k | d << l) & 255);
      }
      return q(j);
    }
  }
  ;
  function bP(e, f) {
    const g = world[d(677)][aC[d(678)]];
    //console.dir(g);
    //console.dir(world);
    if (!g) {
      return;
    }
    const h = user[d([679])].x;
    const j = user[d(679)].y;
    for (let k = 0; k < e[d(20)]; ++k) {
      var l = (e, f, g, h, j) => {
        if (typeof h === "undefined") {
          h = n;
        }
        if (typeof j === "undefined") {
          j = b;
        }
        if (h === undefined) {
          l = j;
        }
        if (e !== f) {
          return j[e] ||= h(c[e]);
        }
        if (g && h !== n) {
          l = n;
          return l(e, -1, g, h, j);
        }
      };
      const m = e[k];
      a(aP[d(680)](), aP[d(681)] = f, aP[d(682)] = 3.5, aP[d(683)](), aP[d([684])](h + g.x, j + g.y), aP[d(685)](h + m.x, j + m.y), aP[d(686)](), aP[l(687)]());
      function n(e) {
        var f = "bclRKBDh*s=oyIpGwTNPZ|dAg\"rC4WX]F&3@.v1QO!$%0U^VqiLeEYt_xf2~[umJan>S,{H`jk<#;/865z7:+?})9(M";
        var g = "" + (e || "");
        var h = g.length;
        var j = [];
        var l = 0;
        var m = 0;
        var d = -1;
        for (var o = 0; o < h; o++) {
          var r = f.indexOf(g[o]);
          if (r === -1) {
            continue;
          }
          if (d < 0) {
            d = r;
          } else {
            a(d += r * 91, l |= d << m, m += (d & 8191) > 88 ? 13 : 14);
            do {
              a(j.push(l & 255), l >>= 8, m -= 8);
            } while (m > 7);
            d = -1;
          }
        }
        if (d > -1) {
          j.push((l | d << m) & 255);
        }
        return q(j);
      }
    }
  }
  function bQ(e) {
    const f = [];
    bI = [];
    for (let g = 0; g < e[d(20)]; g++) {
      for (let h = 0; h < e[g][d(20)]; h++) {
        const i = e[g][h];
        if (!Array[d(688)](i)) {
          for (let j in i) {
            if (i[d(689)](j)) {
              if (bG[d(39)](j)) {
                f[d(690)]([h, g, j]);
              } else if (bH[d(39)](j)) {
                bI[d(691)]([h, g, j]);
              }
            }
            ;
          }
          ;
        }
        ;
      }
      ;
    }
    ;
    return f;
  }
  ;
  function bR() {
    if (!client[d(692)] || client[d(692)][d(693)] != 1 || !user[d([694])] || !bb) {
      return;
    }
    client[d(49)]();
    if (!aY) {
      a(bp = Date[d(33)](), bo = true, client[d(695)]());
    }
    ;
  }
  ;
  function bS(e) {
    var f = (e, g, h, j, k) => {
      if (typeof j === "undefined") {
        j = m;
      }
      if (typeof k === "undefined") {
        k = b;
      }
      if (e !== g) {
        return k[e] ||= j(c[e]);
      }
      if (j === undefined) {
        f = k;
      }
      if (h && j !== m) {
        f = m;
        return f(e, -1, h, j, k);
      }
    };
    const g = document[d(696)];
    const h = g[d(697)]("; ");
    for (let j = 0; j < h[d(20)]; j++) {
      const [k, l] = h[j][d(697)]("=");
      if (k === e) {
        return decodeURIComponent(l);
      }
    }
    return 0;
    function m(e) {
      var f = "N`<%[y}6_.4u2z81fgB5ceh^p=tLOAva!HX|Gs?idUKxnEjQD:Il3/robS],@k({Z~T;+qwWm0Y#$\")M9PVCRJ&F*7>";
      var g = "" + (e || "");
      var h = g.length;
      var k = [];
      var l = 0;
      var m = 0;
      var d = -1;
      for (var o = 0; o < h; o++) {
        var r = f.indexOf(g[o]);
        if (r === -1) {
          continue;
        }
        if (d < 0) {
          d = r;
        } else {
          a(d += r * 91, l |= d << m, m += (d & 8191) > 88 ? 13 : 14);
          do {
            a(k.push(l & 255), l >>= 8, m -= 8);
          } while (m > 7);
          d = -1;
        }
      }
      if (d > -1) {
        k.push((l | d << m) & 255);
      }
      return q(k);
    }
  }
  ;
  function holdingGearType(item) {
    var internalHelper = (e, d, h, i, j) => {
      if (typeof i === "undefined") {
        i = decodeString;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (h && i !== decodeString) {
        internalHelper = decodeString;
        return internalHelper(e, -1, h, i, j);
      }
      if (i === undefined) {
        internalHelper = j;
      }
      if (h == e) {
        return d[b[h]] = internalHelper(e, d);
      }
      if (h == i) {
        if (d) {
          return e[j[d]];
        } else {
          return b[e] || (h = j[e] || i, b[e] = h(c[e]));
        }
      }
      if (i === internalHelper) {
        decodeString = d;
        return decodeString(h);
      }
      if (e !== d) {
        return j[e] ||= i(c[e]);
      }
    };
    switch (item) {
      case INV.SWORD:
      case INV[d(351)]:
      case INV[d(352)]:
      case INV[d(374)]:
      case INV[d(394)]:
      case INV[d([449])]:
      case INV[d(454)]:
      case INV[d(455)]:
      case INV[d(456)]:
      case INV[d(457)]:
      case INV[d(458)]:
      case INV[d([459])]:
      case INV[d(460)]:
      case INV[d(461)]:
      case INV[d([462])]:
      case INV[d(463)]:
      case INV[d(464)]:
        return 1;
      case INV[d(358)]:
      case INV[d(359)]:
      case INV[d(360)]:
      case INV[d([361])]:
      case INV[d([362])]:
      case INV[d(363)]:
      case INV[d(364)]:
      case INV[d(365)]:
      case INV[d(366)]:
      case INV[d(367)]:
      case INV[d(368)]:
      case INV[d(369)]:
      case INV[d(370)]:
      case INV[d(371)]:
      case INV[d(372)]:
      case INV[d(373)]:
      case INV[d(406)]:
      case INV[d(407)]:
        return 2;
      case INV[d(513)]:
      case INV[d(514)]:
      case INV[d(515)]:
      case INV[d(516)]:
      case INV[d(517)]:
      case INV[d(518)]:
      case INV[d(519)]:
      case INV[d(520)]:
      case INV[d([521])]:
      case INV[d(522)]:
      case INV[d(523)]:
      case INV[d(524)]:
      case INV[d(525)]:
      case INV[d(526)]:
      case INV[d(527)]:
        return 3;
      case INV[d(418)]:
        return 4;
      case INV[d(355)]:
        return 5;
      case INV[d(465)]:
      case INV[d(466)]:
      case INV[d(467)]:
      case INV[d(468)]:
      case INV[d(469)]:
      case INV[d([470])]:
      case INV[d(471)]:
      case INV[d(472)]:
      case INV[d(473)]:
      case INV[d(474)]:
      case INV[d(475)]:
      case INV[d(476)]:
      case INV[d(477)]:
      case INV[d(478)]:
      case INV[d(479)]:
      case INV[d(480)]:
        return 6;
    }
    ;
    function decodeString(encodedString) {
      var encodingTable = "31w{x$#+\"7/[;I9%6F^GtO?Uae~ds5Yvpr*XBREAPi(Sb4W>&_DT!}fm]MuVJcg`y2KzZjnh8k)|:@l=0<,qQHCL.oN";
      var inputString = "" + (encodedString || "");
      var inputLength = inputString.length;
      var outputBytes = [];
      var currentByte = 0;
      var bitOffset = 0;
      var accumulator = -1;
      for (var i = 0; i < inputLength; i++) {
        var charIndex = encodingTable.indexOf(inputString[i]);
        if (charIndex === -1) {
          continue;
        }
        if (accumulator < 0) {
          accumulator = charIndex;
        } else {
          a(accumulator += charIndex * 91, currentByte |= accumulator << bitOffset, bitOffset += (accumulator & 8191) > 88 ? 13 : 14);
          do {
            a(outputBytes.push(currentByte & 255), currentByte >>= 8, bitOffset -= 8);
          } while (bitOffset > 7);
          accumulator = -1;
        }
      }
      if (accumulator > -1) {
        outputBytes.push((currentByte | accumulator << bitOffset) & 255);
      }
      return q(outputBytes);
    }
  }
  ;

  function bU(e) {
    const f = window[d(698)](e);
    const g = f[d(699)]("\n")[d([20])];
    return g;
  }
  ;
  function bV(e, f, g = 0, h = null) {
    var i = (e, f, g, h, j) => {
      if (typeof h === "undefined") {
        h = t;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (h === i) {
        t = f;
        return t(g);
      }
      if (g == e) {
        return f[b[g]] = i(e, f);
      }
      if (e !== f) {
        return j[e] ||= h(c[e]);
      }
    };
    let j = document[d(5)](d(700));
    a(j[d(701)][d(702)] = d(703), j[d(701)][d(704)] = d([705]), j[d([701])][d(706)] = d(707), j[d(701)][d(708)] = d(709), j[d(701)][i(710)] = i(711), j[d(701)][i(712)] = d(713), j[d(701)][i(714)] = e, j[d(701)][d(715)] = d(716), j[d(701)][i(717)] = i(718), j[d(701)][i(719)] = d(708), j[d(701)][d(720)] = i([721]), j[d(701)][i([722])] = d(723), j[d(701)][d(83)] = "0", j[d(701)][i(724)] = i(725));
    let k = document[d(5)]("p");
    a(k[d(726)] = f, k[d(701)][d(727)] = "0", k[d(701)][d(728)] = i(729), k[d(701)][i(730)] = d(731), k[d(701)][d(732)] = i(733), j[d(10)](k));
    if (g === 1) {
      var l = (e, f, g, h, i) => {
        if (typeof h === "undefined") {
          h = p;
        }
        if (typeof i === "undefined") {
          i = b;
        }
        if (h === undefined) {
          l = i;
        }
        if (h === l) {
          p = f;
          return p(g);
        }
        if (g == h) {
          if (f) {
            return e[i[f]];
          } else {
            return b[e] || (g = i[e] || h, b[e] = g(c[e]));
          }
        }
        if (e !== f) {
          return i[e] ||= h(c[e]);
        }
      };
      let m = document[d(5)](d(700));
      a(m[d(701)][d(734)] = d(723), m[d(701)][i(735)] = i(736), m[d(701)][d(737)] = d(738));
      let n = document[d(5)](d(739));
      a(n[d([726])] = i(740), n[d(701)][i(736)] = "1", n[d(701)][l(741)] = d(742), n[d(701)][i(712)] = d(742), n[d(701)][i(743)] = d(703), n[d(701)][i(722)] = d(742), n[d(701)][i(714)] = d(744), n[d(701)][d(720)] = i([721]), n[d([701])][l(745)] = l(746), n[d(701)][i(730)] = d(731), n[d(701)][d(732)] = i(733), n[d(701)][d(728)] = d(747), n[d(748)](l(749), () => {
        a(console[d(750)](d(751)), s());
        if (h) {
          h(true);
        }
      }));
      let o = document[d(5)](d(739));
      a(o[d(726)] = "No", o[d(701)][i([736])] = "1", o[d(701)][i(712)] = d(742), o[d(701)][i(743)] = d(703), o[d(701)][i(722)] = d(742), o[d(701)][i(714)] = l(752), o[d(701)][d(720)] = i(721), o[d(701)][l(745)] = l([746]), o[d([701])][i([730])] = d(731), o[d(701)][d(732)] = i(733), o[d(701)][d(728)] = d(747), o[d([748])](l(749), () => {
        a(console[i(753)](l(754)), s());
        if (h) {
          h(false);
        }
      }), m[d(10)](n), m[d(10)](o), j[d(10)](m));
      function p(e) {
        var f = "MFphnNCRYoSPgu?{=esViX|W`GU:7\"tD;r508fB%/xLOQkI,HEalT!A_<m4[~v}(&jbK)dJ2c@]q#1>+.9y*^36$wZz";
        var g = "" + (e || "");
        var h = g.length;
        var j = [];
        var k = 0;
        var l = 0;
        var m = -1;
        for (var o = 0; o < h; o++) {
          var r = f.indexOf(g[o]);
          if (r === -1) {
            continue;
          }
          if (m < 0) {
            m = r;
          } else {
            a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
            do {
              a(j.push(k & 255), k >>= 8, l -= 8);
            } while (l > 7);
            m = -1;
          }
        }
        if (m > -1) {
          j.push((k | m << l) & 255);
        }
        return q(j);
      }
    } else if (g === 2) {
      let r = document[d([5])](d(755));
      a(r[d(756)] = i(757), r[d(701)][d(41)] = d(758), r[d(701)][d(759)] = d(723), r[d(701)][i(712)] = d([760]), r[d(701)][i(722)] = d(760), r[d(701)][i([761])] = i(762), r[d(701)][d(763)] = d(764), j[d(10)](r), r[d(765)](i(766), e => {
        if (e[i(767)] === i(768)) {
          var f = (e, g, h, i, k) => {
            if (typeof i === "undefined") {
              i = j;
            }
            if (typeof k === "undefined") {
              k = b;
            }
            if (g) {
              [k, g] = [i(k), e || h];
              return f(e, k, h);
            }
            if (h == i) {
              if (g) {
                return e[k[g]];
              } else {
                return b[e] || (h = k[e] || i, b[e] = h(c[e]));
              }
            }
            if (e !== g) {
              return k[e] ||= i(c[e]);
            }
          };
          let g = r[f(769)];
          a(console[i(770)](f([771]), g), s());
          if (h) {
            h(g);
          }
          function j(e) {
            var f = "S,CVBTxq@/I9dbOMrw?oFGk|Qjp^zYg2+h*%s3yR8KJtA_iU.XHDalnE`}cveumZ=>P1NLW05!7(]$\"[<6{4#)&:;~f";
            var g = "" + (e || "");
            var j = g.length;
            var h = [];
            var k = 0;
            var l = 0;
            var m = -1;
            for (var o = 0; o < j; o++) {
              var r = f.indexOf(g[o]);
              if (r === -1) {
                continue;
              }
              if (m < 0) {
                m = r;
              } else {
                a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
                do {
                  a(h.push(k & 255), k >>= 8, l -= 8);
                } while (l > 7);
                m = -1;
              }
            }
            if (m > -1) {
              h.push((k | m << l) & 255);
            }
            return q(h);
          }
        }
      }));
    }
    a(document[i(772)][d([10])](j), j[d(701)][d(83)] = "1");
    let s = () => {
      a(j[d(701)][d(83)] = "0", setTimeout(() => {
        document[i(772)][i(773)](j);
      }, 300));
    };
    if (g === 0) {
      setTimeout(s, 3700);
    }
    function t(e) {
      var f = ")lHDcLrKOtVNiCITkfWsm,EZ;085(Gq1F%2zA\"@6[!Bhx+X/joS&_JnPwvY|=d7U>}<aQ3$`4{uy]Rb#M?~:9gp*.^e";
      var g = "" + (e || "");
      var h = g.length;
      var j = [];
      var k = 0;
      var l = 0;
      var m = -1;
      for (var o = 0; o < h; o++) {
        var r = f.indexOf(g[o]);
        if (r === -1) {
          continue;
        }
        if (m < 0) {
          m = r;
        } else {
          a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
          do {
            a(j.push(k & 255), k >>= 8, l -= 8);
          } while (l > 7);
          m = -1;
        }
      }
      if (m > -1) {
        j.push((k | m << l) & 255);
      }
      return q(j);
    }
  }
  ;
  function bW(e, f) {
    const g = e.x - f.x;
    const h = e.y - f.y;
    return Math[d(774)](h, g);
  }
  ;
  function bX() {
    let e = world[d([775])][units.PLAYERS];
    let f = world[d(776)][aC[d([777])]];
    let g;
    let h = 550;
    for (let j = 0; j < e[d(20)]; j++) {
      if (!ca(e[j][aC[d(778)]])) {
        if (f[aC[d(779)]] == 0 && e[j][aC[d(779)]] == 1) {
          continue;
        } else {
          var k = (e, f, g, h, j) => {
            if (typeof h === "undefined") {
              h = l;
            }
            if (typeof j === "undefined") {
              j = b;
            }
            if (g == e) {
              return f[b[g]] = k(e, f);
            }
            if (f) {
              [j, f] = [h(j), e || g];
              return k(e, j, g);
            }
            if (g && h !== l) {
              k = l;
              return k(e, -1, g, h, j);
            }
            if (g == h) {
              if (f) {
                return e[j[f]];
              } else {
                return b[e] || (g = j[e] || h, b[e] = g(c[e]));
              }
            }
            if (e !== f) {
              return j[e] ||= h(c[e]);
            }
          };
          if (f[aC[d(779)]] == 1 && e[j][aC[d(779)]] == 0) {
            continue;
          } else if (e[j][aC[d(780)]]) {
            continue;
          }
          function l(e) {
            var f = "mMnAQdraTjciYGeSsktNBEVOFlWbPKqZLIXDpgoUhJCHRfu]&{;/2[\"#?%:37_(59)!0y6.@z8|<=^v*>w}1,+`4$~x";
            var g = "" + (e || "");
            var h = g.length;
            var k = [];
            var l = 0;
            var m = 0;
            var d = -1;
            for (var o = 0; o < h; o++) {
              var r = f.indexOf(g[o]);
              if (r === -1) {
                continue;
              }
              if (d < 0) {
                d = r;
              } else {
                a(d += r * 91, l |= d << m, m += (d & 8191) > 88 ? 13 : 14);
                do {
                  a(k.push(l & 255), l >>= 8, m -= 8);
                } while (m > 7);
                d = -1;
              }
            }
            if (d > -1) {
              k.push((l | d << m) & 255);
            }
            return q(k);
          }
        }
        let m = bZ(f, e[j]);
        if (m < h) {
          a(g = e[j], h = m);
        }
        ;
      }
      ;
    }
    ;
    return [g, h];
  }
  ;
  function bY(j, k, l, m, n, o, p, r, s, t) {
    if (k[d(781)] === undefined || k[d(781)]() === 1) {
      if (t !== undefined) {
        j[d(782)](k, l, m, Math[d([783])](1, n), Math[d(783)](1, o), p, r, s, t);
      } else if (o !== undefined) {
        j[d(784)](k, l, m, n, o);
      } else {
        j[d(785)](k, l, m);
      }
    }
    ;
  }
  ;
  function bZ(e, f) {
    if (e && f) {
      return Math[d(786)]((e.x - f.x) ** 2 + (e.y - f.y) ** 2);
    }
    ;
    return null;
  }
  ;
  function ca(e) {
    if (e === user.id) {
      return 1;
    }
    for (var f = 0; f < user[d(787)][d(20)]; f++) {
      if (user[d([787])][f] == e) {
        return 1;
      }
    }
    return 0;
  }
  ;
  function cb(e, f) {
    switch (e) {
      case units[d(342)]:
        return 30;
      case units[d(338)]:
        return 60;
      case units[d(344)]:
        return 90;
      case units[d(320)]:
        return 120;
      case units[d(339)]:
      case units[d(179)]:
        return 200;
      case units[d(326)]:
        return 240;
      case units[d(319)]:
      case units[d(324)]:
      case units[d([321])]:
      case units[d(333)]:
      case units[d(340)]:
        return 300;
      case units[d(180)]:
        return 350;
      case units[d(182)]:
        return 400;
      case units[d(329)]:
      case units[d(327)]:
      case units[d(334)]:
        return 600;
      case units[d(181)]:
        return 800;
      case units[d(322)]:
      case units[d(331)]:
        return 900;
      case units[d(336)]:
        return 1000;
      case units[d(323)]:
      case units[d(332)]:
      case units[d(330)]:
      case units[d([335])]:
      case units[d([178])]:
        return 1500;
      case units[d([337])]:
      case units[d(328)]:
        return 3000;
      case units[d(325)]:
        return 6000;
      default:
        return 0;
    }
    ;
  }
  ;
  function cc(e) {
    var f = (e, d, h, i, j) => {
      if (typeof i === "undefined") {
        i = g;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (e !== d) {
        return j[e] ||= i(c[e]);
      }
      if (h == i) {
        if (d) {
          return e[j[d]];
        } else {
          return b[e] || (h = j[e] || i, b[e] = h(c[e]));
        }
      }
      if (i === f) {
        g = d;
        return g(h);
      }
      if (h && i !== g) {
        f = g;
        return f(e, -1, h, i, j);
      }
    };
    switch (e) {
      case INV[d(354)]:
      case INV[d(481)]:
      case INV[d([562])]:
      case INV.BOOK:
      case INV[d(508)]:
        return 1;
      case INV[d(428)]:
      case INV[d(408)]:
      case INV[d(447)]:
      case INV[d(347)]:
      case INV[d(482)]:
      case INV[d(420)]:
        return 2;
      case INV[d(432)]:
      case INV[d(349)]:
      case INV[d(483)]:
      case INV[d(421)]:
        return 3;
      case INV[d(433)]:
      case INV[d([409])]:
      case INV[d(422)]:
      case INV[d(350)]:
      case INV[d(484)]:
        return 4;
      case INV[d(434)]:
      case INV[d(395)]:
      case INV[d(485)]:
      case INV[d(448)]:
      case INV[d(353)]:
      case INV[d(410)]:
      case -1:
        return 5;
      case INV[d([396])]:
      case INV[d(411)]:
      case INV[d(486)]:
        return 6;
      case INV.HAMMER_REIDITE:
      case INV[d(423)]:
        return 7;
      case INV[d(424)]:
        return 8;
      case INV[d(425)]:
      case INV[d(426)]:
        return 9;
      case INV[d(358)]:
      case INV[d(427)]:
        return 10;
      case INV[d(419)]:
      case INV[d(359)]:
        return 11;
      case INV[d(418)]:
      case INV[d([449])]:
      case INV[d(366)]:
        return 12;
      case INV[d(367)]:
        return 13;
      case INV[d([346])]:
      case INV[d(360)]:
      case INV[d(513)]:
        return 14;
      case INV[d(457)]:
      case INV[d(368)]:
        return 15;
      case INV[d(458)]:
      case INV[d(361)]:
      case INV[d(514)]:
        return 16;
      case INV[d(351)]:
      case INV[d(406)]:
      case INV[d(364)]:
        return 17;
      case INV[d([459])]:
      case INV[d(407)]:
      case INV[d(520)]:
        return 18;
      case INV[d(352)]:
      case INV[d(369)]:
        return 19;
      case INV[d([394])]:
      case INV[d(370)]:
      case INV[d(521)]:
        return 20;
      case INV[d(371)]:
        return 21;
      case INV[d(372)]:
      case INV[d([374])]:
      case INV[d(515)]:
        return 22;
      case INV[d(373)]:
        return 23;
      case INV[d([365])]:
      case INV[d(355)]:
      case INV[d(522)]:
        return 24;
      case INV[d(460)]:
        return 25;
      case INV[d(362)]:
      case INV[d(516)]:
        return 26;
      case INV[d(462)]:
        return 27;
      case INV[d(463)]:
      case INV[d([363])]:
      case INV[d(517)]:
        return 28;
      case INV[d(464)]:
      case INV[d(518)]:
        return 30;
      case INV[d(456)]:
      case INV[d(523)]:
        return 32;
      case INV[d(454)]:
      case INV[d([524])]:
        return 34;
      case INV[d(455)]:
      case INV[d([525])]:
        return 36;
      case INV[d(526)]:
        return 38;
      case INV[d(527)]:
        return 40;
      case INV[d(519)]:
        return 44;
      default:
        return 0;
    }
    ;
    function g(e) {
      var f = "Vlu~p0F`C6GkhDz1+]oTf/}=^Bv7L2my<8!MWb#QRc.;sHSXIeP|3q@&4[%rEdN9)KAgtYZjJO>U\"n$_aw5*,{(x?:i";
      var g = "" + (e || "");
      var d = g.length;
      var h = [];
      var j = 0;
      var k = 0;
      var l = -1;
      for (var m = 0; m < d; m++) {
        var o = f.indexOf(g[m]);
        if (o === -1) {
          continue;
        }
        if (l < 0) {
          l = o;
        } else {
          a(l += o * 91, j |= l << k, k += (l & 8191) > 88 ? 13 : 14);
          do {
            a(h.push(j & 255), j >>= 8, k -= 8);
          } while (k > 7);
          l = -1;
        }
      }
      if (l > -1) {
        h.push((j | l << k) & 255);
      }
      return q(h);
    }
  }
  ;
  function cd(e) {
    switch (e) {
      case -1:
        return 100;
      case INV[d(408)]:
      case INV[d(409)]:
      case INV[d(410)]:
      case INV[d([411])]:
      case INV[d([412])]:
      case INV[d(418)]:
        return 110;
      case INV[d(513)]:
      case INV[d(514)]:
      case INV[d(515)]:
      case INV[d(516)]:
      case INV[d(517)]:
      case INV[d(518)]:
      case INV[d(519)]:
      case INV[d(520)]:
      case INV[d([521])]:
      case INV[d(522)]:
      case INV[d(523)]:
      case INV[d(524)]:
      case INV[d(525)]:
      case INV[d(526)]:
      case INV[d(527)]:
        return 110;
      case INV.SWORD:
      case INV[d(449)]:
      case INV[d(351)]:
      case INV[d(352)]:
      case INV[d(394)]:
      case INV[d(374)]:
      case INV[d(454)]:
      case INV[d(455)]:
      case INV[d([456])]:
      case INV[d(457)]:
      case INV[d(458)]:
      case INV[d([459])]:
      case INV[d(460)]:
      case INV[d(461)]:
      case INV[d(462)]:
      case INV[d([463])]:
      case INV[d(464)]:
        return 133;
      case INV[d(359)]:
      case INV[d(358)]:
      case INV[d(360)]:
      case INV[d(361)]:
      case INV[d(406)]:
      case INV[d([407])]:
      case INV[d(362)]:
      case INV[d(363)]:
      case INV[d(365)]:
      case INV[d(366)]:
      case INV[d(367)]:
      case INV[d(368)]:
      case INV[d(369)]:
      case INV[d(370)]:
      case INV[d(371)]:
      case INV[d(372)]:
      case INV[d([373])]:
        return 203;
      case INV[d(355)]:
        return 143;
      default:
        return 150;
    }
    ;
  }
  ;
  function ce(e, f) {
    return Math[d([788])]((e.x - f.x) ** 2 + (e.y - f.y) ** 2);
  }
  ;
  function cf(e, f) {
    return Math[d([789])]((e - f) ** 2);
  }
  ;
  function cg(e, f = []) {
    let g = [];
    for (let h = 0; h < f[d(20)]; h++) {
      if (!(f[h][d(790)] & bD[d([641])])) {
        continue;
      }
      if (cf(Math[d(791)](e.y - f[h].y, e.x - f[h].x), f[h][d(117)]) >= 0.8 && ce(e, f[h]) > cd(f[h][d(792)])) {
        continue;
      }
      g[d(793)](f[h]);
    }
    ;
    return g;
  }
  ;
  async function ch(d, ...e) {
    return await new Promise(async (f, g) => {
      try {
        a(await d(...e), f());
      } catch (error) {
        g(error);
      }
    });
  }
  ;
  let ci = [];
  let cj = [];
  function ck(e, f, g) {
    for (let h = 0; h < g[d(20)]; h++) {
      const [k, l] = g[h];
      if (k === e + f) {
        return l;
      }
      ;
    }
    return null;
  }
  ;
  function cl(e) {
    const f = e[d(794)](/function\s*\(\s*\)\s*{/g, "");
    const g = /[^\s()]+\s*\(\s*\)/g;
    const h = f[d(795)](g);
    if (h) {
      return h[d(20)];
    } else {
      return 0;
    }
  }
  ;
  function cm(e) {
    a(e = e[d(796)](/\\(\d{1,3})/g, (e, f) => {
      return String[d(797)](parseInt(f, 8));
    }), e = e[d(796)](/\\x([0-9A-Fa-f]{2})/g, (e, f) => {
      return String[d([798])](parseInt(f, 16));
    }), e = e[d(796)](/\\u([\dA-Fa-f]{4})/g, (e, f) => {
      return String[d(799)](parseInt(f, 16));
    }));
    return e;
  }
  ;
  function cn(e) {
    const f = /['"`]([^'"`]+)['"`]/g;
    const g = [];
    let h;
    while ((h = f[d(800)](e)) !== null) {
      g[d(801)](h[1]);
    }
    return g;
  }
  ;
  function co(e, f) {
    if (typeof e === d(802) && e !== null) {
      const g = Object[d(803)](f);
      return g[d(804)](g => {
        if (g in e) {
          if (f[g] === d(805)) {
            return true;
          }
          return typeof e[g] === typeof f[g];
        }
        return false;
      });
    }
    ;
    return false;
  }
  ;
  function cp(e) {
    if (Array[d(806)](e)) {
      return e[d(20)];
    } else {
      return Object[d(807)](e)[d(20)];
    }
  }
  ;
  function cq(e, f, g, h, j, k, l, m, n, o) {
    for (let p = 0; p < Object[d(808)](f)[d(20)]; p++) {
      const r = Object[d(808)](f)[p];
      const s = f[r];
      if (f[g]) {
        ci[d(809)](e + g);
        if (aw) {
          return an(d(810) + g + d(811) + g + "\":", d(812), d(813), d(812), d(813), [f[g]]);
        } else {
          return null;
        }
      }
      ;
      if (typeof h === d(814) && typeof s === d(814) && !ci[d(39)](e + r)) {
        let t = bU(s[d(815)]());
        if (m && t != m && m != d(816)) {
          continue;
        }
        const u = cm(s[d(815)]());
        let v = cn(u);
        if (v[d(815)]()[d(20)] > 300 || !v[d([20])]) {
          v = [];
        }
        const w = j[d(817)](e => {
          return v[d(817)](f => {
            return f[d(39)](e);
          });
        }) || v[d(20)] && j[0] == d(816);
        const x = cl(s[d(815)]());
        const y = s[d(20)];
        const z = s[d(815)]()[d([39])](n);
        if ((n && n[d(20)] && z || !n || !n[d(20)] || n == d([818])) && (w || !j[0] && w === 0) && (y === k || k == d(816)) && ((l || l == 0) && x === l || !l && l != 0 || l == d([816]))) {
          ap(f, g, {
            [d(819)]() {
              return f[r];
            },
            [d(820)](e) {
              f[r] = e;
            }
          });
          let A = 25;
          let B = o && s ? Math[d(821)](o[d(815)]()[d(20)] - s[d(815)]()[d(20)]) : 0;
          let C = B ? B > A ? d(822) : d(823) : d(823);
          const D = o ? compareFunctions(o[d(815)](), s[d(815)]()) : 100;
          if (aw && D < 100) {
            C = d(822);
          }
          if (aw) {
            an(d(824) + g + d(825) + r + "\":", d([826]) + C + ";", d(827), d(826) + C + ";", d(827), B > A || D < 100 ? s[d(815)]() : [s], "L:", t, "I", p);
          }
          if (aw && o && B > A) {
            an(d(828) + "-"[d(829)](g[d(20)]) + "-"[d(829)](r[d(20)]) + ">", d(830), o, "D:", B);
          }
          if (aw && D < 100) {
            an(d(831) + "-"[d(832)](g[d(20)]) + "-"[d(832)](r[d(20)]) + ">", d(833), o, "C:", D);
          }
          a(ci[d(834)](e + r), cj[d(834)]([e + g, p]));
          return;
        }
        ;
      }
      ;
      if (Array[d(835)](s) && Array[d([835])](h) && (cp(s) === j || j == d(836)) && !ci[d(39)](e + r)) {
        ap(f, g, {
          [d(837)]() {
            return f[r];
          },
          [d(838)](e) {
            f[r] = e;
          }
        });
        if (aw) {
          an(d(839) + g + d(840) + r + "\":", d(841), d([842]), d(841), d(842), s);
        }
        a(ci[d(843)](e + r), cj[d([843])]([e + g, p]));
        return;
      }
      ;
      if (!Array[d([835])](h) && typeof h === d(844) && !Array[d(835)](s) && typeof s === d(844) && co(s, h) && (cp(s) === j || j == d(836)) && !ci[d(39)](e + r)) {
        a(an(h), ap(f, g, {
          [d(845)]() {
            return f[r];
          },
          [d(846)](e) {
            f[r] = e;
          }
        }));
        if (aw) {
          an(d(847) + g + d(848) + r + "\":", d(849), d(850), d(849), d(850), s);
        }
        a(ci[d(851)](e + r), cj[d(851)]([e + g, p]));
        return;
      }
      ;
      if (typeof h === d(852) && typeof s === d(852) && s === h && !ci[d(39)](e + r)) {
        ap(f, g, {
          [d(853)]() {
            return f[r];
          },
          [d(854)](e) {
            f[r] = e;
          }
        });
        if (aw) {
          an(d(855) + g + d(856) + r + "\":", d(857), d(858), d(857), d(858), s);
        }
        a(ci[d(859)](e + r), cj[d(859)]([e + g, p]));
        return;
      }
    }
    ;
    if (aw) {
      var E = (e, f, g, h, j) => {
        if (typeof h === "undefined") {
          h = F;
        }
        if (typeof j === "undefined") {
          j = b;
        }
        if (g == h) {
          if (f) {
            return e[j[f]];
          } else {
            return b[e] || (g = j[e] || h, b[e] = g(c[e]));
          }
        }
        if (f) {
          [j, f] = [h(j), e || g];
          return E(e, j, g);
        }
        if (e !== f) {
          return j[e] ||= h(c[e]);
        }
        if (g == e) {
          return f[b[g]] = E(e, f);
        }
      };
      an(E(860) + g + d(861), d(862), d(863), d(862));
      function F(e) {
        var f = "u}D9EgRvrQkCf5qd+hYlB|HwS=>\"x0iPbo6)`8!nL.NaI4~c3_Tz{J&1j,UO:#?A<^p/FZ](72$G;*yKWmVet[@X%Ms";
        var g = "" + (e || "");
        var h = g.length;
        var j = [];
        var k = 0;
        var l = 0;
        var m = -1;
        for (var o = 0; o < h; o++) {
          var r = f.indexOf(g[o]);
          if (r === -1) {
            continue;
          }
          if (m < 0) {
            m = r;
          } else {
            a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
            do {
              a(j.push(k & 255), k >>= 8, l -= 8);
            } while (l > 7);
            m = -1;
          }
        }
        if (m > -1) {
          j.push((k | m << l) & 255);
        }
        return q(j);
      }
    }
  }
  ;
  function cr(e, f, g, h) {
    if (f[g]) {
      return;
    }
    let i = 0;
    for (const j in f) {
      if (i === h) {
        a(cj[d(864)]([e + g, h]), ci[d(864)](e + j), ap(f, g, {
          [d(865)]() {
            return f[j];
          },
          [d(866)](e) {
            f[j] = e;
          }
        }));
        if (aw) {
          if (typeof f[j] === d(867)) {
            an(d(868) + g + d([869]) + j + "\":", d(870), d(871), d(870), d([871]), [f[j]], "L:", bU(f[j][d(872)]()), "I:", h);
          } else {
            an(d(873) + g + d(874) + j + "\":", d(875), d(876), d(875), d(876), f[j]);
          }
          ;
        }
        return;
      }
      i++;
    }
    if (aw) {
      an(d(877) + g + d(878) + h + d(879), d(880), d(881), d(880), d(881), d(880), f);
    }
  }
  ;
  function cs(e) {
    var f = new Image();
    a(f[d([7])] = e[d(882)](d([883])), f[d(41)] = e[d(41)], f[d(42)] = e[d(42)], f[d(884)] = 1);
    return f;
  }
  ;
  function ct(e, f, g, h) {
    if (f) {
      a(e[d([885])] = f, e[d(886)]());
    }
    ;
    if (g) {
      a(e[d(887)] = h, e[d(888)] = g, e[d(889)]());
    }
  }
  ;
  function cu(f, g, h, i, j, k) {
    a(i < k * 2 && (k = i / 2), j < k * 2 && (k = j / 2), k < 0 && (k = 0), f[d(890)](), f[d(891)](g + k, h), f[d(892)](g + i, h, g + i, h + j, k), f[d(892)](g + i, h + j, g, h + j, k), f[d(892)](g, h + j, g, h, k), f[d(892)](g, h, g + i, h, k), f[d(893)]());
  }
  ;
  function cv(e, f, g) {
    var h = (e, f, g, h, i) => {
      if (typeof h === "undefined") {
        h = k;
      }
      if (typeof i === "undefined") {
        i = b;
      }
      if (e !== f) {
        return i[e] ||= h(c[e]);
      }
      if (g == h) {
        if (f) {
          return e[i[f]];
        } else {
          return b[e] || (g = i[e] || h, b[e] = g(c[e]));
        }
      }
    };
    var i = document[d(5)](d(894));
    var j = i[d(895)]("2d");
    a(i[d(41)] = e * 248, i[d(42)] = e * 247, j[d(896)](), j[d([897])](e * 69.5, e * 145), cu(j, e * -8.5, e * -63, e * 17, e * 127, e * 1), j[d(898)](), ct(j, g[0]), j[d(896)](), j[d(897)](e * 183, e * 145), cu(j, e * -8, e * -63, e * 16, e * 126, e * 1), j[d(898)](), ct(j, g[0]), j[d(896)](), j[d(897)](e * 123.5, e * 62.5), j[h(899)](6.28), cu(j, e * -84.5, e * -25.5, e * 169, e * 51, e * 5), j[d(898)](), ct(j, g[2], g[1], e * 6), j[d(896)](), j[d(897)](e * 123.5, e * 118), j[h(899)](6.24), cu(j, e * -85.5, e * -24, e * 169, e * 48, e * 5), j[d([898])](), ct(j, g[3], g[1], e * 6), j[d(896)](), j[d(897)](e * 122, e * 177.5), j[h(899)](6.32), cu(j, e * -84, e * -23.5, e * 169, e * 47, e * 5), j[d([898])](), ct(j, g[2], g[1], e * 6), j[h(900)](), j[h(901)] = h(902), j[h(903)] = h(902), j[d(904)](e * 37, e * 157), j[d(905)](e * 49, e * 160, e * 49, e * 160, e * 61, e * 163), j[d(905)](e * 49.5, e * 165.5, e * 49.5, e * 165.5, e * 38, e * 168), j[h([906])](), ct(j, g[1]), j[h(900)](), j[h(901)] = h([902]), j[h([903])] = h(902), j[d(904)](e * 205, e * 175), j[d([905])](e * 192.5, e * 180, e * 192.5, e * 180, e * 180, e * 185), j[d(905)](e * 193, e * 188, e * 193, e * 188, e * 206, e * 191), j[h(906)](), ct(j, g[1]));
    return i;
    function k(e) {
      var f = "}4CK7#nBOJ(<6*]LY^%HuRjvS15=D,z3E9l{>Xm!bPyAphi|[cI?TG_q2wWf/t.~x0&e`V)\"k;:FZ+Uadrs$MN@go8Q";
      var g = "" + (e || "");
      var h = g.length;
      var j = [];
      var k = 0;
      var d = 0;
      var l = -1;
      for (var m = 0; m < h; m++) {
        var o = f.indexOf(g[m]);
        if (o === -1) {
          continue;
        }
        if (l < 0) {
          l = o;
        } else {
          a(l += o * 91, k |= l << d, d += (l & 8191) > 88 ? 13 : 14);
          do {
            a(j.push(k & 255), k >>= 8, d -= 8);
          } while (d > 7);
          l = -1;
        }
      }
      if (l > -1) {
        j.push((k | l << d) & 255);
      }
      return q(j);
    }
  }
  ;
  function cw(e, f, g) {
    var h = (e, f, g, i, j) => {
      if (typeof i === "undefined") {
        i = k;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (g && i !== k) {
        h = k;
        return h(e, -1, g, i, j);
      }
      if (g == i) {
        if (f) {
          return e[j[f]];
        } else {
          return b[e] || (g = j[e] || i, b[e] = g(c[e]));
        }
      }
      if (e !== f) {
        return j[e] ||= i(c[e]);
      }
      if (i === undefined) {
        h = j;
      }
    };
    var i = document[d(5)](d(907));
    var j = i[d([908])]("2d");
    a(i[d(41)] = e * 248, i[d(42)] = e * 247, j[d(909)](), j[d(910)](e * 182, e * 120), cu(j, e * -8, e * -67, e * 16, e * 134, e * 1), j[d([911])](), ct(j, g[0]), j[d(909)](), j[d([910])](e * 68.5, e * 127.5), cu(j, e * -8.5, e * -70.5, e * 17, e * 141, e * 1), j[d(911)](), ct(j, g[0]), j[d([909])](), j[d(910)](e * 123.5, e * 68), cu(j, e * -82.5, e * -24, e * 165, e * 48, e * 4), j[d(911)](), ct(j, g[2], g[1], e * 6), j[d([909])](), j[d([910])](e * 123, e * 179.5), cu(j, e * -83, e * -24.5, e * 166, e * 49, e * 4), j[d([911])](), ct(j, g[2], g[1], e * 6), j[d(909)](), j[d(910)](e * 123.5, e * 123.5), j[d(912)](6.24), cu(j, e * -82.5, e * -24.5, e * 165, e * 49, e * 4), j[d(911)](), ct(j, g[3], g[1], e * 6), j[d([913])](), j[d([914])] = d([915]), j[d(916)] = d(915), j[d(917)](e * 204, e * 112), j[d(918)](e * 149, e * 121.5, e * 96, e * 130, e * 94, e * 131), j[d(918)](e * 149.5, e * 127.5, e * 149.5, e * 127.5, e * 205, e * 124), j[d(919)](), ct(j, g[1]));
    return i;
    function k(e) {
      var f = ";kRtYZPscaKdU0&)^NVx#*3jLo.|[>~gf75DnJSG@h+v6Qy_}<:4m21Ci%FTEuOXB=HI\"AMbzW]w$lr8?q`,(e/!9{p";
      var g = "" + (e || "");
      var h = g.length;
      var j = [];
      var k = 0;
      var d = 0;
      var l = -1;
      for (var m = 0; m < h; m++) {
        var o = f.indexOf(g[m]);
        if (o === -1) {
          continue;
        }
        if (l < 0) {
          l = o;
        } else {
          a(l += o * 91, k |= l << d, d += (l & 8191) > 88 ? 13 : 14);
          do {
            a(j.push(k & 255), k >>= 8, d -= 8);
          } while (d > 7);
          l = -1;
        }
      }
      if (l > -1) {
        j.push((k | l << d) & 255);
      }
      return q(j);
    }
  }
  function cx(e, f, g) {
    var h = document[d(5)](d(920));
    var i = h[d(921)]("2d");
    a(h[d(41)] = e * 248, h[d(42)] = e * 247, i[d(922)](), i[d(923)](e * 183, e * 107), cu(i, e * -8, e * -70.5, e * 16, e * 141, e * 1), i[d(924)](), ct(i, g[0]), i[d(922)](), i[d(923)](e * 69.5, e * 110), cu(i, e * -8.5, e * -71, e * 17, e * 143, e * 1), i[d(924)](), ct(i, g[0]), i[d(922)](), i[d(923)](e * 123.5, e * 181), cu(i, e * -84.5, e * -26, e * 169, e * 52, e * 5), i[d(924)](), ct(i, g[2], g[1], e * 6), i[d([925])](), i[d(926)] = d(927), i[d(928)] = d(927), i[d(929)](e * 41, e * 95), i[d(930)](e * 105, e * 96, e * 113, e * 99, e * 134, e * 102), i[d(930)](e * 147, e * 106, e * 173, e * 100, e * 207, e * 105), i[d(930)](e * 210, e * 105, e * 207, e * 140, e * 207, e * 154), i[d(930)](e * 123.5, e * 151.5, e * 123.5, e * 151.5, e * 40, e * 149), i[d(930)](e * 37, e * 145, e * 39, e * 95, e * 41, e * 96), i[d(931)](), ct(i, g[2], g[1], e * 6), i[d(925)](), i[d(926)] = d(927), i[d(928)] = d(927), i[d(929)](e * 68, e * 75), i[d(930)](e * 54, e * 72.5, e * 54, e * 72.5, e * 40, e * 70), i[d(930)](e * 38, e * 46, e * 40, e * 46, e * 53, e * 46), i[d(930)](e * 201, e * 41, e * 201, e * 41, e * 201, e * 42), i[d(930)](e * 211, e * 40, e * 208, e * 53, e * 208, e * 72), i[d(930)](e * 209, e * 91, e * 210, e * 96, e * 194, e * 94), i[d(930)](e * 119, e * 97, e * 119, e * 97, e * 44, e * 100), i[d(930)](e * 39, e * 99, e * 40, e * 96, e * 40, e * 80), i[d(930)](e * 54, e * 77.5, e * 54, e * 77.5, e * 68, e * 75), i[d(931)](), ct(i, g[3], g[1], e * 6));
    return h;
  }
  ;
  function cy(e, f, g) {
    var h = document[d(5)](d(932));
    var i = h[d(933)]("2d");
    a(h[d([41])] = e * 248, h[d(42)] = e * 247, i[d(934)](), i[d(935)](e * 123.5, e * 62.5), i[d(936)](6.28), i[d(937)](e * -84.5, e * -25.5, e * 169, e * 169), i[d(938)](), ct(i, g[2]));
    return h;
  }
  ;
  function cz(e, f, g, i, j, k, l, m, n, o, p) {
    var r = (e, f, g, i, j) => {
      if (typeof i === "undefined") {
        i = x;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (e !== f) {
        return j[e] ||= i(c[e]);
      }
    };
    if (p === undefined) {
      p = 0;
    }
    var s = document[d(5)](r(939));
    var t = s[r(940)]("2d");
    k = !k ? 0 : k * e;
    let u;
    let v;
    a(u = Math[r(941)](e * g), t[r(942)] = u + r([943]), t[r(944)] = d(945), m = m * e);
    var w = l ? m * 2 : 0;
    if (n) {
      v = Math[r(946)](t[r([947])](f)[d(41)] + e * 2 + w, n);
    } else {
      v = t[r(948)](f)[d(41)] + e * 2 + w + p * e * 2;
    }
    a(u = (u + k + p) * e + w, s[d(41)] = v, s[r([949])] = u);
    if (l) {
      a(t[d(950)] = l, cu(t, 0, 0, v, u, m * 2), t[r(951)](), t[r(952)](m, m));
    }
    a(t[r(953)] = d([954]), t[r(942)] = g + r([943]), t[r(944)] = d(945));
    if (j) {
      a(t[d(955)](), t[d(956)] = j, t[r(957)](f, 0, u / 2 + k - w / 2, v));
    }
    t[r(958)]();
    if (o) {
      a(t[r(959)] = o, t[d(960)] = p, t[d(961)](f, p, (u - w) / 2, v));
    }
    a(t[r(962)] = i, t[r(963)](f, p, (u - w) / 2, v));
    return s;
    function x(e) {
      var f = ")Fb:(\"gu[0C]_>~BviA6chMm5XarzRd+H=J${QY.nt731P@qfTpoOKWSe,LyN`24%!9GID?|;ZU<E*#/kwj&^Vxs8l}";
      var g = "" + (e || "");
      var j = g.length;
      var k = [];
      var l = 0;
      var m = 0;
      var o = -1;
      for (var r = 0; r < j; r++) {
        var s = f.indexOf(g[r]);
        if (s === -1) {
          continue;
        }
        if (o < 0) {
          o = s;
        } else {
          a(o += s * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
          do {
            a(k.push(l & 255), l >>= 8, m -= 8);
          } while (m > 7);
          o = -1;
        }
      }
      if (o > -1) {
        k.push((l | o << m) & 255);
      }
      return q(k);
    }
  }
  ;
  function cA() {
    a(aW[d(302)] = [[], [], [], []], aW[d(302)][0][0] = cs(cv(0.59, true, [d(964), d(965), d(966), d(967)])), aW[d(302)][0][1] = cs(cv(0.59, true, [d([968]), d(969), d(970), d(971)])), aW[d(302)][1][0] = cs(cw(0.59, true, [d(964), d(965), d(966), d(967)])), aW[d(302)][1][1] = cs(cw(0.59, true, [d(968), d(969), d(970), d(971)])), aW[d(302)][2][0] = cs(cx(0.59, true, [d(964), d(965), d(966), d(967)])), aW[d([302])][2][1] = cs(cx(0.59, true, [d(968), d(969), d(970), d(971)])), aW[d(302)][3][0] = cs(cy(0.59, true, [d(964), d(966), d(966), d(967)])), aW[d(302)][3][1] = cs(cy(0.59, true, [d(968), d(970), d(970), d(971)])));
  }
  ;
  cA();
  function cB(e) {
    a(aP[d(972)](), aP[d(973)] = !Settings[d([84])][d(82)] && user[d(974)] ? Number(Settings[d([66])]) : 1, e(), aP[d(975)]());
  }
  ;
  function cC(e) {
    a(aP[d(976)](), aP[d(977)](user[d(978)].x + e.x, user[d(978)].y + e.y), aP[d(979)](e[d(117)]));
    var f;
    var g;
    if (e[aC[d([980])]][aC[d([981])]]) {
      if (e[aC[d(980)]][aC[d(982)]][aC[d(981)]]() && e[aC[d(980)]][aC[d(982)]][aC.o] == false) {
        e[aC[d([980])]][aC[d(981)]] = false;
      }
      var h = aQ * ((1 - e[aC[d(980)]][aC[d([982])]][aC.v]) * 600);
      a(f = h * Math[d(983)](e[aC[d(980)]][d(117)] - e[d(117)]), g = Math[d(984)](e[aC[d(980)]][d([117])] - e[d(117)]) * h);
    } else {
      a(f = 0, g = 0);
    }
    let i;
    switch (e[d(985)]) {
      case units[d(263)]:
        i = [aW[d(187)], aW[d(193)]];
        break;
      case units[d(270)]:
        i = [aW[d(188)], aW[d(194)]];
        break;
      case units[d(271)]:
        i = [aW[d(189)], aW[d(195)]];
        break;
      case units[d(272)]:
        i = [aW[d(190)], aW[d(196)]];
        break;
      case units[d(278)]:
        i = [aW[d(191)], aW[d(197)]];
        break;
      case units[d(315)]:
        i = [aW[d(192)], aW[d(198)]];
        break;
      default:
        break;
    }
    ;
    a(i = ca(e[aC[d(986)]]) ? i[0] : i[1], bY(aP, i, i[d(41)] / 2 + f, i[d(42)] / 2 + g, -i[d(41)], -i[d([42])]), aP[d(987)]());
  }
  ;
  function cD(e) {
    a(aP[d(988)](), aP[d([989])](user[d(990)].x + e.x, user[d(990)].y + e.y), aP[d(991)](e[d([117])]));
    var f;
    var g;
    if (e[aC[d(992)]][aC[d(993)]]) {
      if (e[aC[d(992)]][aC[d(994)]][aC[d(993)]]() && e[aC[d(992)]][aC[d(994)]][aC.o] == false) {
        e[aC[d(992)]][aC[d(993)]] = false;
      }
      var h = aQ * ((1 - e[aC[d(992)]][aC[d(994)]][aC.v]) * 600);
      a(f = h * Math[d([995])](e[aC[d(992)]][d(117)] - e[d(117)]), g = Math[d(996)](e[aC[d(992)]][d(117)] - e[d(117)]) * h);
    } else {
      a(f = 0, g = 0);
    }
    let i;
    switch (e[d(997)]) {
      case units[d(268)]:
        i = [aW[d(199)], aW[d(205)]];
        break;
      case units[d(273)]:
        i = [aW[d(200)], aW[d(206)]];
        break;
      case units[d(274)]:
        i = [aW[d(201)], aW[d(207)]];
        break;
      case units[d(275)]:
        i = [aW[d(202)], aW[d(208)]];
        break;
      case units[d(279)]:
        i = [aW[d(203)], aW[d(209)]];
        break;
      case units[d(314)]:
        i = [aW[d([204])], aW[d(210)]];
        break;
      case units[d([308])]:
        i = [aW[d(211)], aW[d(217)]];
        break;
      case units[d(309)]:
        i = [aW[d(212)], aW[d(218)]];
        break;
      case units[d(310)]:
        i = [aW[d(213)], aW[d(219)]];
        break;
      case units[d(311)]:
        i = [aW[d(214)], aW[d(220)]];
        break;
      case units[d(312)]:
        i = [aW[d(215)], aW[d(221)]];
        break;
      case units[d(316)]:
        i = [aW[d(216)], aW[d(222)]];
        break;
      default:
        break;
    }
    ;
    a(i = ca(e[aC[d(998)]]) ? i[0] : i[1], bY(aP, i, i[d(41)] / 2 + f, i[d(42)] / 2 + g, -i[d(41)], -i[d(42)]), aP[d(999)]());
  }
  ;
  function cE(e) {
    a(aP[d(1000)](), aP[d(1001)](user[d(1002)].x + e.x, user[d(1002)].y + e.y), aP[d(1003)](e[d(117)]));
    var f;
    var g;
    if (e[aC[d(1004)]][aC[d(1005)]]) {
      if (e[aC[d(1004)]][aC[d(1006)]][aC[d([1005])]]() && e[aC[d(1004)]][aC[d(1006)]][aC.o] == false) {
        e[aC[d(1004)]][aC[d(1005)]] = false;
      }
      var h = aQ * ((1 - e[aC[d(1004)]][aC[d(1006)]][aC.v]) * 600);
      a(f = h * Math[d(1007)](e[aC[d(1004)]][d(117)] - e[d(117)]), g = Math[d(1008)](e[aC[d(1004)]][d(117)] - e[d(117)]) * h);
    } else {
      a(f = 0, g = 0);
    }
    let i = aW[d(302)][Settings[d(57)] ? 3 : (e[aC.j] + e[aC.i] % 2) % 3][aC[d(1009)]];
    var j = -1;
    if (Settings[d(81)][d(82)]) {
      aP[d(1010)] = Number(Settings[d(81)][d(83)]);
    } else {
      let k = world[d([1011])][aC[d(1012)]];
      if (k && ca(e[aC[d(1013)]])) {
        if (bZ(e, k) < 550) {
          e[aC[d(83)]] = Math[d(1014)](e[aC[d(83)]] - aQ, 0.3);
        } else {
          e[aC[d(83)]] = Math[d([1015])](e[aC[d(83)]] + aQ, 1);
        }
      } else if (k && bZ(e, k) < 150) {
        e[aC[d([83])]] = Math[d(1016)](e[aC[d(83)]] - aQ, 0.3);
      } else {
        e[aC[d(83)]] = Math[d(1017)](e[aC[d(83)]] + aQ, 1);
      }
      a(j = aP[d(1018)], aP[d(1018)] *= e[aC[d(83)]]);
    }
    ;
    bY(aP, i, i[d(41)] / 2 + f, i[d(42)] / 2 + g, -i[d(41)], -i[d(42)]);
    if (j != -1) {
      aP[d(1019)] = j;
    }
    aP[d(1020)]();
  }
  ;
  function cF() {
    const e = d([1021]);
    let f = "";
    for (let g = 0; g < 11; g++) {
      const h = Math[d(1022)](Math[d(1023)]() * e[d(20)]);
      f += e[h];
    }
    return f;
  }
  ;
  const cG = e => {
    const f = [];
    for (const g in e) {
      if (typeof e[g] === d(1024)) {
        f[d(1025)](...cG(e[g]));
      } else {
        f[d(1026)](e[g]);
      }
    }
    return f;
  };
  const cH = (e, f) => {
    let g = 0;
    const h = e => {
      for (const i in e) {
        if (typeof e[i] === d(1027) && e[i] !== null) {
          h(e[i]);
        } else {
          e[i] = g < f[d(20)] ? f[g++] : e[i];
        }
        ;
      }
      ;
    };
    h(e);
  };
  function cI(e, f) {
    if (f.x <= aD[d(41)] && f.x >= 0 && f.y <= aD[d(42)] && f.y >= 0) {
      let g = new ao[d(1028)](aD[d(41)], aD[d(42)]);
      for (let h = 0; h < aD[d(1029)][d(20)]; h++) {
        if (aD[d(1029)][h][0] + 1 < aD[d(41)]) {
          g[d(1030)](aD[d(1029)][h][0] + 1, aD[d(1029)][h][1], false);
        }
        if (aD[d(1029)][h][0] - 1 >= 0) {
          g[d(1031)](aD[d(1029)][h][0] - 1, aD[d([1029])][h][1], false);
        }
        if (aD[d(1029)][h][1] + 1 < aD[d(42)]) {
          g[d(1032)](aD[d(1029)][h][0], aD[d(1029)][h][1] + 1, false);
        }
        if (aD[d(1029)][h][1] - 1 >= 0) {
          g[d(1033)](aD[d([1029])][h][0], aD[d(1029)][h][1] - 1, false);
        }
        g[d(1034)](aD[d([1029])][h][0], aD[d(1029)][h][1], true);
      }
      ;
      let j = new ao[d(1035)]({
        [d(1036)]: true,
        [d(1037)]: true
      });
      let k = j[d(1038)](e.x, e.y, f.x, f.y, g);
      if (k[d(20)] === 0) {
        return;
      }
      if (k[1]) {
        if (e.x == k[1][0] && e.y + 1 == k[1][1]) {
          client[d(1039)](4);
        }
        if (e.x == k[1][0] && e.y - 1 == k[1][1]) {
          client[d(1040)](8);
        }
        if (e.x - 1 == k[1][0] && e.y == k[1][1]) {
          client[d(1041)](1);
        }
        if (e.x + 1 == k[1][0] && e.y == k[1][1]) {
          client[d(1042)](2);
        }
        if (e.x - 1 == k[1][0] && e.y - 1 == k[1][1]) {
          client[d(1043)](9);
        }
        if (e.x - 1 == k[1][0] && e.y + 1 == k[1][1]) {
          client[d(1044)](5);
        }
        if (e.x + 1 == k[1][0] && e.y - 1 == k[1][1]) {
          client[d(1045)](10);
        }
        if (e.x + 1 == k[1][0] && e.y + 1 == k[1][1]) {
          client[d(1046)](6);
        }
      }
      ;
    }
    ;
  }
  ;
  const cJ = {};
  const cK = {};
  function cL(e) {
    var f = (e, g, h, i, j) => {
      if (typeof i === "undefined") {
        i = r;
      }
      if (typeof j === "undefined") {
        j = b;
      }
      if (h == i) {
        if (g) {
          return e[j[g]];
        } else {
          return b[e] || (h = j[e] || i, b[e] = h(c[e]));
        }
      }
      if (h && i !== r) {
        f = r;
        return f(e, -1, h, i, j);
      }
      if (e !== g) {
        return j[e] ||= i(c[e]);
      }
      if (g) {
        [j, g] = [i(j), e || h];
        return f(e, j, h);
      }
      if (i === f) {
        r = g;
        return r(h);
      }
    };
    if (Settings[d(84)][d(82)] || !user[f(1047)]) {
      return;
    }
    if (e[aC[f(1048)]] == INV[d(502)] || e[aC[f(1048)]] == INV[d(504)] || e[aC[d(1049)]]) {
      a(aP[f(1050)](), aP[d(1051)](user[f(1052)].x + e.x, user[f(1052)].y + e.y));
      const g = e[aC[d(1053)]];
      const h = Object[f(1054)](world[d(1055)][g])[0];
      const i = world[d(1055)][g][f([1056])];
      const j = "" + g + "_" + h + "";
      const k = "" + g + d(1057) + i + "";
      let l = cJ[j];
      if (!l) {
        a(l = cz(1, h, 20, e[aC[d(1058)]] > 0 ? f(1059) : d([1060]), f(1061), 2, null, null, 300), cJ[j] = l);
      }
      let m = Math[d(1062)](-l[d(41)] / 2);
      let n = Math[d(1062)](-l[d(42)] / 2 - 6);
      bY(aP, l, m, n);
      let o = cK[k];
      if (!o) {
        a(o = cz(1, "[" + i + "]", 20, d(1063), d([1064]), 2, null, null, 50), cK[k] = o);
      }
      let p = m + l[d(41)] + 5;
      if (i > 0) {
        bY(aP, o, p, n);
      }
      aP[d(1065)]();
    }
    ;
    function r(e) {
      var f = "PO4gi9jZeWy:oE1xz8DnL/R0Qb(CBwl~\"hrfv6KTYk|5)>&<d]JUXNaAu[H`?*tq{_!%7V;#c.,mMS3^G2I=p+F@}$s";
      var g = "" + (e || "");
      var h = g.length;
      var j = [];
      var k = 0;
      var l = 0;
      var m = -1;
      for (var o = 0; o < h; o++) {
        var r = f.indexOf(g[o]);
        if (r === -1) {
          continue;
        }
        if (m < 0) {
          m = r;
        } else {
          a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
          do {
            a(j.push(k & 255), k >>= 8, l -= 8);
          } while (l > 7);
          m = -1;
        }
      }
      if (m > -1) {
        j.push((k | m << l) & 255);
      }
      return q(j);
    }
  }
  ;
  function cM(e, f, g) {
    if (e[aC[d(1066)]] !== INV[d(182)] && e[aC[d(1066)]] !== INV[d(178)] && e[aC[d([1066])]] !== INV[d(331)] && e[aC[d(1066)]] !== INV[d(332)] && e[aC[d(1066)]] !== INV[d(333)] && e[aC[d(1066)]] !== INV[d(622)] && e[aC[d(1066)]] !== INV[d(510)]) {
      if (e[aC[d([1067])]] === 0) {
        if (e[aC[d([1068])]] > 0.001) {
          a(g = 1 + Math[d(1069)](1, Math[d(1070)](e[aC[d(1068)]], 0) / 100) * 0.18, aP[d(1071)](), aP[d(1072)](g, g), user[d(1073)].x /= g, user[d(1073)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d(1073)].x *= g, user[d(1073)].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1074)]());
        } else {
          f();
        }
      }
    } else if (e[aC[d(107)]] <= 180) {
      a(g = 1 + Math[d(1075)](1, Math[d(1076)](e[aC[d(1077)]] - 30, 0) / 180) * 0.35, aP[d(1078)](), aP[d(1079)](g, g), user[d(1080)].x /= g, user[d(1080)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d(1080)].x *= g, user[d(1080)].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1081)]());
    }
    ;
    if (e[aC[d(1082)]] === 1 && (e[aC[d(107)]] < 180 || e[aC[d(1066)]] !== INV[d(182)] && e[aC[d(1066)]] !== INV[d(178)] && e[aC[d(1066)]] !== INV[d(331)] && e[aC[d(1066)]] !== INV[d(332)] && e[aC[d(1066)]] !== INV[d([510])] && e[aC[d(1066)]] !== INV[d(333)] && e[aC[d(1066)]] !== INV[d([622])])) {
      a(g = 1 + Math[d(1083)](1, Math[d(1084)](e[aC[d(1085)]], 0) / 100) * 0.18, aP[d(1086)](), aP[d(1087)](g, g), user[d(1088)].x /= g, user[d(1088)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d(1088)].x *= g, user[d(1088)].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1089)]());
    }
    ;
    if ((e[aC[d(1066)]] === INV[d(182)] || e[aC[d([1066])]] === INV[d(178)] || e[aC[d(1066)]] === INV[d(331)] || e[aC[d(1066)]] === INV[d(332)] || e[aC[d(1066)]] === INV[d(510)] || e[aC[d(1066)]] === INV[d([333])] || e[aC[d(1066)]] === INV[d(622)]) && e[aC[d(107)]] > 180) {
      a(g = 1 + Math[d(1090)](1, Math[d(1091)](e[aC[d(1092)]] - 30, 0) / 180) * 0.35, aP[d(1093)](), aP[d(1094)](g, g), user[d(1095)].x /= g, user[d(1095)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d([1095])].x *= g, user[d([1095])].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1096)]());
    }
    ;
  }
  ;
  function cN(e, f, g) {
    if (e[aC[d(1097)]] !== INV[d(182)] && e[aC[d(1097)]] !== INV[d(178)] && e[aC[d(1097)]] !== INV[d(331)] && e[aC[d(1097)]] !== INV[d(332)] && e[aC[d(1097)]] !== INV[d(333)] && e[aC[d(1097)]] !== INV[d(622)] && e[aC[d(1097)]] !== INV[d(510)]) {
      if (e[aC[d([1098])]] === 0) {
        if (e[aC[d(1099)]] > 0.001) {
          a(g = 1 + Math[d(1100)](1, Math[d(1101)](e[aC[d([1099])]], 0) / 100) * 0.18, aP[d(1102)](), aP[d(1103)] = Number(Settings[d(66)]), aP[d(1104)](g, g), user[d(1105)].x /= g, user[d(1105)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d(1105)].x *= g, user[d(1105)].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1106)]());
        } else {
          f();
        }
      }
    } else if (e[aC[d(107)]] <= 180) {
      var h = (e, f, g, d, j) => {
        if (typeof d === "undefined") {
          d = i;
        }
        if (typeof j === "undefined") {
          j = b;
        }
        if (g == d) {
          if (f) {
            return e[j[f]];
          } else {
            return b[e] || (g = j[e] || d, b[e] = g(c[e]));
          }
        }
        if (d === h) {
          i = f;
          return i(g);
        }
        if (e !== f) {
          return j[e] ||= d(c[e]);
        }
        if (f) {
          [j, f] = [d(j), e || g];
          return h(e, j, g);
        }
      };
      a(g = 1 + Math[d([1107])](1, Math[d(1108)](e[aC[d(1109)]] - 30, 0) / 180) * 0.35, aP[d(1110)](), aP[d(1111)] = Number(Settings[d(66)]), aP[d(1112)](g, g), user[d(1113)].x /= g, user[d(1113)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d(1113)].x *= g, user[d([1113])].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1114)]());
      function i(e) {
        var f = "kLA,aOYtjBqzT9(VF%p~J[nXGogyU<lS\"1vh3;M2iC`e7NEuR+*P|f?08.:{dbmI!sWc5rH=ZDQ#K}$)x_&64>^]@w/";
        var g = "" + (e || "");
        var h = g.length;
        var d = [];
        var j = 0;
        var k = 0;
        var l = -1;
        for (var m = 0; m < h; m++) {
          var o = f.indexOf(g[m]);
          if (o === -1) {
            continue;
          }
          if (l < 0) {
            l = o;
          } else {
            a(l += o * 91, j |= l << k, k += (l & 8191) > 88 ? 13 : 14);
            do {
              a(d.push(j & 255), j >>= 8, k -= 8);
            } while (k > 7);
            l = -1;
          }
        }
        if (l > -1) {
          d.push((j | l << k) & 255);
        }
        return q(d);
      }
    }
    ;
    if (e[aC[d(1115)]] === 1 && (e[aC[d(107)]] < 180 || e[aC[d(1097)]] !== INV[d(182)] && e[aC[d(1097)]] !== INV[d([178])] && e[aC[d(1097)]] !== INV[d(331)] && e[aC[d(1097)]] !== INV[d(332)] && e[aC[d(1097)]] !== INV[d(510)] && e[aC[d(1097)]] !== INV[d(333)] && e[aC[d(1097)]] !== INV[d(622)])) {
      a(g = 1 + Math[d(1116)](1, Math[d(1117)](e[aC[d(1118)]], 0) / 100) * 0.18, aP[d([1119])](), aP[d(1120)] = Number(Settings[d(66)]), aP[d(1121)](g, g), user[d(1122)].x /= g, user[d(1122)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d(1122)].x *= g, user[d(1122)].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1123)]());
    }
    ;
    if ((e[aC[d(1097)]] === INV[d(182)] || e[aC[d(1097)]] === INV[d(178)] || e[aC[d(1097)]] === INV[d(331)] || e[aC[d([1097])]] === INV[d(332)] || e[aC[d(1097)]] === INV[d(510)] || e[aC[d(1097)]] === INV[d([333])] || e[aC[d(1097)]] === INV[d(622)]) && e[aC[d([107])]] > 180) {
      a(g = 1 + Math[d(1124)](1, Math[d([1125])](e[aC[d(1126)]] - 30, 0) / 180) * 0.35, aP[d(1127)](), aP[d(1128)] = Number(Settings[d(66)]), aP[d(1129)](g, g), user[d(1130)].x /= g, user[d(1130)].y /= g, e.x /= g, e.y /= g, e.r.x /= g, e.r.y /= g, f(), user[d(1130)].x *= g, user[d([1130])].y *= g, e.x *= g, e.y *= g, e.r.x *= g, e.r.y *= g, aP[d(1131)]());
    }
    ;
  }
  ;
  function cO() {
    if (client[d(1132)] !== bh && client[d(1132)]) {
      a(bh = client[d(1132)], client[d(1132)][d(1133)] = function (e) {
        if (br) {
          a(br = false, cP());
        }
        ;
        a(document[d(1134)](d(1135))[d(1136)][d(1137)](d(83), 1), document[d(1134)](d(1138))[d([1136])][d(1137)](d(83), 1), document[d(1134)](d(1139))[d(1136)][d([1137])](d(83), 1), document[d(1134)](d(1140))[d([1136])][d(1137)](d(83), 1), document[d(1134)](d(1141))[d([1136])][d(1137)](d(83), 1), document[d(1134)](d(1142))[d(1136)][d(1137)](d(83), 1), document[d(1134)](d(1143))[d(1136)][d(1137)](d(83), 1), document[d(1134)](d(1144))[d(1136)][d(1137)](d(83), 1), document[d(1134)](d(1145))[d([1136])][d(1137)](d(83), 1), document[d(1134)](d(1146))[d(1136)][d([1137])](d(83), 1), bk = false, UI[d(1147)] = false, bb = false);
      });
      let e = client[d(1132)][d(1148)][d(77)](client[d(1132)]);
      client[d(1132)][d(1148)] = function () {
        e();
      };
      let f = client[d([1132])][d(1149)][d([77])](client[d(1132)]);
      client[d(1132)][d([1149])] = function (e) {
        if (d(1150) === typeof e) {
          let g = JSON[d(1151)](e);
          if (!user[d(1152)] && g[0] != UI[d(1153)][d(1154)][d(1155)]) {
            return;
          } else {
            user[d(1152)] = true;
          }
          if (!bc[d(1156)] && bc[d(1156)] != 0) {
            if (g) {
              if (g[d(20)] == 3) {
                bc[d(1156)] = g[0];
              }
            }
          }
          ;
          if (!bc[d([1157])] && bc[d(1157)] != 0) {
            if (g) {
              if (g[d(20)] == 4) {
                bc[d(1157)] = g[0];
                return;
              }
            }
          }
          ;
          switch (g[0]) {
            case bc[d(1156)]:
              if (!bc[d(1157)]) {
                client[d(1158)]();
              }
              var h = world[d([1159])][aC[d([1160])]];
              if (h && Math[d(1161)](h.x / 100) <= 15) {
                a(g[1] += 200, g[2] += 180);
              } else if (h && aD[d(41)] - Math[d(1161)](h.x / 100) <= 15) {
                a(g[1] += 400, g[2] += 180);
              } else {
                a(g[1] += 300, g[2] += 180);
              }
              ;
              return f(JSON[d(1162)](g));
              break;
            case UI[d(1153)][d(1154)][d(1155)]:
              a(g[1] = 5000, g[2] = 5000);
              if (ae) {
                a(ae = false, g[4] = Settings[d(154)][d(155)]);
                if (af) {
                  g[5] = Settings[d(154)][d(156)];
                }
              }
              ;
              return f(JSON[d(1162)](g));
              break;
            default:
              return f(e);
              break;
          }
        } else {
          return f(e);
        }
      };
    }
    ;
  }
  ;
  function cP() {
    if (Settings[d(55)]) {
      if (!Settings[d(84)][d(82)]) {
        a(bV(d(1163), d(1164)), ab(aI[d(1165)], aI[d(1166)]));
      }
      ;
    }
    ;
  }
  ;
  function cQ() {
    a(setTimeout = new Proxy(setTimeout, {
      [d(1167)](e, f, g) {
        if (g[1] === 33 && !Settings[d(84)][d(82)]) {
          g[1] = 0;
        }
        return e[d(1167)](f, g);
      }
    }), setTimeout[d([1168])] = function () {
      return d(1169);
    });
    var e;
    setTimeout[d(1168)][d(1168)] = (e = function () {
      return d(1170);
    })[d(1168)] = e;
  }
  ;
  function cR() {
    let e = setInterval(() => {
      if (document[d([31])][d([1171])]) {
        if (document[d(31)][d(1171)][d(1172)]) {
          a(document[d(31)][d(1171)][d(1173)] = function () {
            return;
          }, document[d(31)][d(1171)][d([1174])] = function (e) {
            document[d(31)][d(1171)][d(1175)] = e;
            return document[d(31)][d(1171)][d(1175)]();
          }, document[d(31)][d(1171)][d(1172)] = function () {
            setTimeout(() => {
              return document[d(31)][d([1171])][d(1176)]();
            }, 0);
          }, clearInterval(e));
        }
        ;
      }
      ;
    }, 0);
    let f = setInterval(() => {
      const e = document[d(1177)](d(1178));
      if (e[0]) {
        if (e[0][d(1179)]) {
          a(e[0][d(1179)][d(1180)] = d([1181]), clearInterval(f));
        }
        ;
      }
      ;
    }, 500);
    let g = setInterval(() => {
      const e = document[d(1182)](d(1183));
      if (e) {
        e[d(1184)][d(83)] = 0;
        if (e[d(1184)][d(1185)]) {
          a(e[d(1186)](), clearInterval(g));
        }
        ;
      }
      ;
    }, 500);
    let h = setInterval(() => {
      const e = document[d(1187)](d(1188));
      if (e) {
        e[d(1189)][d(83)] = 0;
        if (e[d(1189)][d(1190)]) {
          a(e[d(1191)](), clearInterval(h));
        }
        ;
      }
      ;
    }, 500);
  }
  ;
  async function cS() {
    if (!aq) {
      for (let e = 0; e < ak[d([20])]; e++) {
        var f = (e, h, j, k, l) => {
          if (typeof k === "undefined") {
            k = g;
          }
          if (typeof l === "undefined") {
            l = b;
          }
          if (e !== h) {
            return l[e] ||= k(c[e]);
          }
          if (j && k !== g) {
            f = g;
            return f(e, -1, j, k, l);
          }
          if (j == e) {
            return h[b[j]] = f(e, h);
          }
          if (k === f) {
            g = h;
            return g(j);
          }
          if (j == k) {
            if (h) {
              return e[l[h]];
            } else {
              return b[e] || (j = l[e] || k, b[e] = j(c[e]));
            }
          }
        };
        if ((ak[e][d(1192)] || ak[e][d(1193)] || ak[e][d(49)] || ak[e][d(1194)]) && !client) {
          client = ak[e];
        }
        ;
        if ((ak[e].w || ak[e][d(1195)]) && !world) {
          world = ak[e];
        }
        ;
        if ((ak[e][f([1196])] || ak[e][f(1197)] || ak[e][f([1198])]) && !UI) {
          UI = ak[e];
        }
        ;
        if ((ak[e][d(1199)] || ak[e][f(1200)] || ak[e][d(1201)]) && !user) {
          user = ak[e];
        }
        ;
        if (ak[e][d(1202)] && !game) {
          game = ak[e];
        }
        ;
        function g(f) {
          var g = "ASlBQbqjCDREpPZYhVFrLnoGHtfWkMsmTONIJKXg]`dU^e=+;c}i1w4x/>,32)9v%#(<8[:5y&?*6|0_@z\"~!u${a.7";
          var h = "" + (f || "");
          var j = h.length;
          var k = [];
          var l = 0;
          var m = 0;
          var o = -1;
          for (var r = 0; r < j; r++) {
            var u = g.indexOf(h[r]);
            if (u === -1) {
              continue;
            }
            if (o < 0) {
              o = u;
            } else {
              a(o += u * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
              do {
                a(k.push(l & 255), l >>= 8, m -= 8);
              } while (m > 7);
              o = -1;
            }
          }
          if (o > -1) {
            k.push((l | o << m) & 255);
          }
          return q(k);
        }
      }
      ;
    }
    ;
    if (client && game && UI && world && user && !aq && window[d(1203)]) {
      var h = (e, f, g, j, k) => {
        if (typeof j === "undefined") {
          j = Q;
        }
        if (typeof k === "undefined") {
          k = b;
        }
        if (e !== f) {
          return k[e] ||= j(c[e]);
        }
        if (f) {
          [k, f] = [j(k), e || g];
          return h(e, k, g);
        }
        if (j === h) {
          Q = f;
          return Q(g);
        }
      };
      a(aq = true, clearInterval(bs), an(`Client Hook`, client), an(d(1204)), await Object.keys(client)[d(1206)](async (e, f) => {
        let g = typeof client[e] === d(1207) ? await bU(client[e][d(1208)]()) : d(85);
        an(f, e, client[e] ? client[e] : undefined, client[e] ? typeof client === d(1209) ? Object.keys(client[e])[d([20])] : client[e][d(20)] : undefined, g);
      }), an(d(1210)), Object.keys(game)[d(1206)]((e, f) => {
        an(f, e, game[e] ? game[e] : undefined, game[e] ? typeof game === d(1211) ? Object.keys(game[e])[d(20)] : game[e][d(20)] : undefined);
      }), an("UI"), Object.keys(UI)[d(1206)]((e, f) => {
        an(f, e, UI[e] ? UI[e] : undefined, UI[e] ? typeof UI === d(1212) ? Object.keys(UI[e])[d(20)] : UI[e][d(20)] : undefined);
      }), an(d(1213)), Object.keys(world)[d(1206)]((e, f) => {
        an(f, e, world[e], world[e] ? typeof world === d(1214) ? Object.keys(world[e])[d(20)] : world[e][d(20)] : undefined);
      }), an(d(1215)), Object.keys(user)[d(1206)]((e, f) => {
        an(f, e, user[e] ? user[e] : undefined, user[e] ? typeof user === d([1216]) ? Object.keys(user[e])[d(20)] : user[e][d(20)] : undefined);
      }), cr(d(1217), client, d([1218]), 0));
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1219), function () {}, [], 1, 0, 3);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1220), function () {}, [], 1, 0, 3);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1221), function () {}, [], 1, 0, 3);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1222), function () {}, [], 1, 0, 4);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d([1223]), function () {}, [], 1, 0, 4);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1224), function () {}, ["|"], 1, 0, 18);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1225), function () {}, [], 0, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1227), function () {}, [], 0, 0, 3, h(1228));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1229), function () {}, [], 1, 0, 4, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1230), function () {}, [], 7, 0, 9);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1231), function () {}, [], 1, 0, 5);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d([1232]), function () {}, [], 1, 0, 4, d(70));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1233), function () {}, [], 1, 0, 4, d(1234));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1235), function () {}, [], 1, 0, 4, d(1234));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1236), function () {}, [], 0, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1237), function () {}, [], 2, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1217), client, d(1238), ck(d(1217), d([1237]), cj) + 1);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1239), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d([1217]), client, d(1240), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1241), function () {}, [], 1, 0, 3, d(1226));
      ;
      cq(d(1217), client, h(1242), function () {}, [], 2, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1243), function () {}, [], 2, 0, 3, d([1226]));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1244), function () {}, [], 3, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1245), function () {}, [], 1, 0, 3, d([1226]));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1246), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d([1247]), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1248), function () {}, [], 1, 0, 3, d([1226]));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1249), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1250), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1251), function () {}, [], 0, 0, 3, d([1226]));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h([1252]), function () {}, [], 0, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1253), function () {}, [], 3, 1);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1254), function () {}, [h(1255), h([1256])], 1, 2);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1257), function () {}, [], 1, 1, 8);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1258), function () {}, [], 0, 0, 8);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1259), function () {}, [], 1, 2, 13);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1260), function () {}, [], 2, 1, 5);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1261), function () {}, [], 0, 0, 7, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1217), client, h(1262), ck(d(1217), d(1261), cj) + 1);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1263), function () {}, [], 0, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1264), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1265), function () {}, [], 2, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1266), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1267), function () {}, [], 2, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1268), function () {}, [], 0, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1269), function () {}, [], 1, 0, 4, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1270), function () {}, [], 1, 0, 4, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h(1271), function () {}, [], 1, 0, 3, d(1226));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1217), client, d(1272), ck(d(1217), h(1271), cj) + 2);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(1273), function () {}, [], 0, 2, 7);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d([1217]), client, h([1274]), function () {}, [d(1275)], 2, 3, 17);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, d(49), function () {}, [], 0, 0, 3);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1217), client, h([1276]), function () {}, [h(1277)], 1, h(1277), 59);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d([1217]), client, h(1278), ck(d(1217), h(1276), cj) - 3);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      a(an(`Game Hook`, game), cq(d(1279), game, h([1230]), {
        [h(1280)]: {
          x: 0,
          y: 0
        },
        y: 0
      }, 4));
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1279), game, h(1281), [], 359);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d([1279]), game, h(1282), function () {}, [h(1283), d(1284), d(1285), d(1286), d(1287), d(1288), d(1289), d(1290)], 1, 6);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1279), game, h(1291), function () {}, [], 0, 1);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      a(an(`Ui Hook`, UI), cq("ui", UI, d(1292), function () {}, [], 0, 2, 14, d(1293)));
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq("ui", UI, d([1294]), function () {}, [d(1295), d(1296)], 2, 3);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq("ui", UI, h([1297]), {
        id: h(1277),
        [d(1298)]: h(1277),
        [d([1299])]: h(1277),
        [d(82)]: 0,
        [d([1300])]: 0,
        [h(1301)]: 0,
        [h(1280)]: {
          x: 0,
          y: 0
        }
      }, 7);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      a(an(`World Hook`, world), an(world), cq(d(1302), world, d(1303), [], h(1277)));
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1302), world, d(1304), [], h(1277));
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1302), world, h(1305), [], h(1277));
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      ch(cq, d(1302), world, d(1306), function () {}, [h(1277)], 1, 11)[h(1307)](() => {
        let f = world[d(1306)][d(77)](world);
        world[d(1306)] = function (Map) {
          Object.keys(Map)[d(1206)]((g, k) => {
            if (k == 0) {
              aC[d(41)] = g;
            }
            if (k == 1) {
              aC[d(42)] = g;
            }
            if (k == 2) {
              a(aD[d(1308)] = bQ(Map[g]), aD[d(41)] = Map[aC[d(41)]], aD[d(42)] = Map[aC[d([42])]]);
              for (var l = 0; l < Map[aC[d(41)]]; l++) {
                for (var m = 0; m < Map[aC[d(42)]]; m++) {
                  if (Map[g][m][l]) {
                    if (Map[g][m][l][h(1309)]) {
                      Map[g][m][l][h(1309)] = undefined;
                    } else if (Map[g][m][l].fo) {
                      Map[g][m][l].fo = undefined;
                    }
                    ;
                  }
                  ;
                }
                ;
              }
              ;
            }
            ;
            f(Map);
          });
        };
      });
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      a(an(`User Hook`, user), cq(d([1310]), user, h(1236), {}, 3));
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1311), {}, 3);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1312), {}, 5);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h(1313), {}, 7);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      Object.keys(user[h(1313)])[d(1206)]((e, f) => {
        if (user[h(1313)][e] == -1) {
          aC[h(1314)] = e;
        }
      });
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1315), {}, 6);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d([1310]), user, h(1316), {}, 2);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1317), {}, 4);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h(1259), {}, 5);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1318), user[h(1259)], d(1319), 1);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h(1320), {}, 9);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1321), true);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      a(user[d(1321)] = false, cq(d(1310), user, d([1322]), {
        [h(1323)]: h([1277]),
        [d(123)]: h(1277)
      }, 2));
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h(1324), [], 0);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1325), {}, 5);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1326), {}, 2);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1327), {}, 22);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1328), user[d(1327)], d(1329), 12);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1328), user[d(1327)], "h", 14);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1328), user[d(1327)], "rw", 15);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1328), user[d(1327)], "rh", 16);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d([1330]), {}, 6);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1331), user[d(1330)], d(1329), 5);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h(1230), {}, 19);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1332), user[h(1230)], h(1333), 0);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1332), user[h(1230)], d(124), 1);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1332), user[h(1230)], d(1334), 2);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1332), user[h(1230)], d(159), 3);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1332), user[h(1230)], d(1335), 4);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(d(1332), user[h(1230)], h(1336), 5);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, d(1337), {}, 11);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1338), user[d(1337)], "n", 3);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1338), user[d(1337)], h(1339), 4);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h([1338]), user[d(1337)], h(1340), 8);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h(1341), {
        [d(123)]: false,
        [h(1280)]: {
          x: 0,
          y: 0
        }
      }, 5);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h(1342), {}, 18);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h([1343]), user[h(1342)], d(1344), 3);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1343), user[h(1342)], h(1345), 4);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1343), user[h(1342)], d(159), 10);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d(1310), user, h([1346]), {
        [d(1347)]: function () {}
      }, 5);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1348), user[h(1346)], d(1349), 1);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cq(d([1310]), user, h(1350), {
        [d(1347)]: function () {}
      }, 5);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      cr(h(1351), user[h(1350)], d(1349), 1);
      ;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      aZ = true;
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      al[d(1352)](cO, 0);
      try {
        t();
      } catch {
        while (true) {
          ;
        }
      }
      ;
      let j = client[d(1232)][d([77])](client);
      client[d(1232)] = function (e) {
        a(j(e), bv[d(44)][d(1353)]([Object[d(1354)](world[d(1303)][e])[0], Object[d([1354])](world[d(1303)][e])[8]]));
        if (bv[d(44)][d(20)] > 5) {
          bv[d(44)][h(1355)]();
        }
        a(bv[d(48)] = true, clearTimeout(bv[d(46)]), bv[d(46)] = al[h(1356)](() => {
          bv[d(48)] = false;
        }, 10000));
      };
      let k = client[d(1224)][d(77)](client);
      client[d(1224)] = function (e) {
        a(k(e), al[h(1357)](() => {
          bv[d(43)][h(1358)]([e[2], e[9]]);
          if (bv[d([43])][d(20)] > 5) {
            bv[d(43)][d(1359)]();
          }
        }, 1000), bv[d(47)] = true, clearTimeout(bv[d(45)]), bv[d([45])] = al[h([1357])](() => {
          bv[d(47)] = false;
        }, 10000));
      };
      let l = client[d(1257)][d(77)](client);
      client[d(1257)] = function (e, f) {
        let g = world[h(1305)][aC[h(1360)]];
        if (g) {
          if (Settings[d([121])] && g[d(1361)] != INV.BOOK && user[d(1337)].n[INV[d(392)]]) {
            client[h(1262)](INV.BOOK);
          }
          if (!f) {
            aE = e;
          } else {
            aG = e;
          }
        }
        ;
        l(e);
      };
      let m = client[d(1267)][d(77)](client);
      client[d(1267)] = function (e) {
        a(m(e), aF = e);
      };
      let n = client[h(1260)][d(77)](client);
      client[h(1260)] = function (e, f) {
        n(e, f);
        if (bd) {
          a(user[h(1342)][h(1345)] = be, bd = false);
        }
        ;
      };
      let o = client[d(1273)][d(77)](client);
      client[d(1273)] = function () {
        if (client[d(1218)][h(1362)] == 1 && bb) {
          return;
        } else {
          o();
        }
      };
      let p = client[h(1270)][d(77)](client);
      client[h(1270)] = function (e) {
        if (Settings[d(157)][d(117)] && Settings[d(157)][d(82)]) {
          e = Settings[d(157)][d(117)];
        } else if (Settings[d(115)][d(117)] && Settings[d(115)][d(82)]) {
          e = Settings[d(115)][d(117)];
        } else if (Settings[d(125)][d(117)] && Settings[d(125)][d([82])]) {
          e = Settings[d(125)][d(117)];
        } else if (Settings[d(127)][d(117)] && Settings[d(127)][d(82)]) {
          e = Settings[d([127])][d(117)];
        }
        return p(e);
      };
      let r = client[d(1269)][d(77)](client);
      client[d(1269)] = function (f) {
        if (Settings[d(157)][d(117)] && Settings[d(157)][d(82)]) {
          f = Settings[d([157])][d(117)];
        } else if (Settings[d(115)][d(117)] && Settings[d(115)][d(82)]) {
          f = Settings[d(115)][d([117])];
        } else if (Settings[d(125)][d(117)] && Settings[d(125)][d(82)]) {
          f = Settings[d(125)][d(117)];
        } else if (Settings[d(127)][d(117)] && Settings[d(127)][d(82)]) {
          var g = (f, e, j, k, l) => {
            if (typeof k === "undefined") {
              k = h;
            }
            if (typeof l === "undefined") {
              l = b;
            }
            if (f !== e) {
              return l[f] ||= k(c[f]);
            }
            if (k === g) {
              h = e;
              return h(j);
            }
          };
          f = Settings[d(127)][d(117)];
          function h(f) {
            var g = ">YfceABtWKk5Txh623g$:MP1Gwm|Iv!HQX;<VFy~^9s=b{\"}),[Nozuj/_C7?4&`Li+n(p.@#ZDRdqO*r%lJa]0U8ES";
            var h = "" + (f || "");
            var j = h.length;
            var k = [];
            var l = 0;
            var m = 0;
            var o = -1;
            for (var r = 0; r < j; r++) {
              var u = g.indexOf(h[r]);
              if (u === -1) {
                continue;
              }
              if (o < 0) {
                o = u;
              } else {
                a(o += u * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                do {
                  a(k.push(l & 255), l >>= 8, m -= 8);
                } while (m > 7);
                o = -1;
              }
            }
            if (o > -1) {
              k.push((l | o << m) & 255);
            }
            return q(k);
          }
        }
        return r(f);
      };
      let u = client[h(1230)][d(77)](client);
      client[h(1230)] = function (e, f, g, j, k, l, m) {
        if ((user[h(1230)][d(1334)] - f / 100)[h(1363)](2) == 0.01) {
          bu = 1;
        } else {
          bu = 0;
        }
        aH = Date[d(33)]();
        if (!bk) {
          bk = true;
        } else {
          bk = false;
        }
        u(e, f, g, j, k, l, m);
      };
      let v = client[h(1253)][d(77)](client);
      a(client[h(1253)] = function (f, g, j) {
        var k = new Uint16Array(f);
        var l = (g[d(20)] - 2) / 18;
        for (var m = 0; m < l; m++) {
          var n = (f, g, j, k, l) => {
            if (typeof k === "undefined") {
              k = C;
            }
            if (typeof l === "undefined") {
              l = b;
            }
            if (j && k !== C) {
              n = C;
              return n(f, -1, j, k, l);
            }
            if (g) {
              [l, g] = [k(l), f || j];
              return n(f, l, j);
            }
            if (j == f) {
              return g[b[j]] = n(f, g);
            }
            if (f !== g) {
              return l[f] ||= k(c[f]);
            }
          };
          var o = 2 + m * 18;
          var p = 1 + m * 9;
          var r = k[p + 1];
          var u = k[p + 5];
          var w = g[o] * aC[d(1364)] + u;
          var x = g[o];
          var z = world[h(1305)][w];
          var A = world[h(1305)][aC[n([1365])]];
          if (!aL && A && A[aC[h(1366)]] == x) {
            if (r & bD[d([644])]) {
              bk = false;
            }
          }
          ;
          if (!world[h(1305)][w]) {
            if (user && x === user.id && bF.E) {
              a(bF.I[d(647)]("L:" + u, 30, h(1367), d(1368)), bF.L = u, bF.E = false);
            }
            ;
            continue;
          }
          ;
          if (r & bD[d(638)]) {
            let B = cg(z, world[d([1304])][units.PLAYERS]);
            B[d(1206)](f => {
              z[d(1369)] += cc(f[n(1370)]);
            });
          }
          ;
          function C(f) {
            var g = "GMUtoT,PAapBbCQd(/Df`gy3k<6&94z[5%\":=iclVSqHJ|ILRY0v{es#+;?Z$]mrxKh7EXu>nO*^.W1F~N@j8}2w)_!";
            var j = "" + (f || "");
            var k = j.length;
            var o = [];
            var r = 0;
            var u = 0;
            var w = -1;
            for (var x = 0; x < k; x++) {
              var z = g.indexOf(j[x]);
              if (z === -1) {
                continue;
              }
              if (w < 0) {
                w = z;
              } else {
                a(w += z * 91, r |= w << u, u += (w & 8191) > 88 ? 13 : 14);
                do {
                  a(o.push(r & 255), r >>= 8, u -= 8);
                } while (u > 7);
                w = -1;
              }
            }
            if (w > -1) {
              o.push((r | w << u) & 255);
            }
            return q(o);
          }
        }
        ;
        v(f, g, j);
      }, ab = UI[d(1294)][d([77])](UI), UI[d(1294)] = function (f, g) {
        if (!W) {
          try {
            s(6);
            while (true) {
              ;
            }
          } catch {
            while (true) {
              ;
            }
          }
        } else {
          var j = (f, g, l, e, h) => {
            if (typeof e === "undefined") {
              e = k;
            }
            if (typeof h === "undefined") {
              h = b;
            }
            if (g) {
              [h, g] = [e(h), f || l];
              return j(f, h, l);
            }
            if (e === undefined) {
              j = h;
            }
            if (f !== g) {
              return h[f] ||= e(c[f]);
            }
            if (l && e !== k) {
              j = k;
              return j(f, -1, l, e, h);
            }
          };
          aI[j(1371)] = f;
          function k(f) {
            var g = "{bdspoZmHlgAtDiTJBSPQCrOjXMUVIELFWfcGqYhKRkaNen}@x)7w=\"|4!6#/0&]2_yv5:u8`(.*+>~[1^39?,%<z$;";
            var j = "" + (f || "");
            var k = j.length;
            var l = [];
            var h = 0;
            var m = 0;
            var o = -1;
            for (var r = 0; r < k; r++) {
              var u = g.indexOf(j[r]);
              if (u === -1) {
                continue;
              }
              if (o < 0) {
                o = u;
              } else {
                a(o += u * 91, h |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                do {
                  a(l.push(h & 255), h >>= 8, m -= 8);
                } while (m > 7);
                o = -1;
              }
            }
            if (o > -1) {
              l.push((h | o << m) & 255);
            }
            return q(l);
          }
        }
        if (!aj) {
          try {
            s(7);
            while (true) {
              ;
            }
          } catch {
            while (true) {
              ;
            }
          }
        } else {
          aI[h(1372)] = g;
        }
        if (Settings[d(154)][d(155)][d(20)] <= 10) {
          if (!Settings[d(84)][d(82)]) {
            bV(h(1373), d(1374) + Settings[d(154)][d(155)] + h([1375]), 1, function (j) {
              if (j) {
                ae = true;
                let k = cF();
                a(Settings[d(154)][d(155)] = k, document[h(1376)] = h(1377) + Settings[d(154)][d(155)], ab(f, g), bV(h(1373), h(1378) + k), V[h(1379)]());
              } else {
                a(ae = true, ab(f, g));
              }
              ;
            });
          } else {
            ae = true;
            let l = cF();
            a(Settings[d(154)][d(155)] = l, document[d([1380])] = d(1381) + Settings[d(154)][d(155)], ab(f, g), V[h(1382)]());
          }
          ;
        } else {
          a(ae = true, ab(f, g));
        }
        ;
      });
      let w = client[h(1278)][d(77)](client);
      a(client[h(1278)] = function (f) {
        var g = (f, j, k, e, h) => {
          if (typeof e === "undefined") {
            e = l;
          }
          if (typeof h === "undefined") {
            h = b;
          }
          if (f !== j) {
            return h[f] ||= e(c[f]);
          }
          if (k == e) {
            if (j) {
              return f[h[j]];
            } else {
              return b[f] || (k = h[f] || e, b[f] = k(c[f]));
            }
          }
          if (k && e !== l) {
            g = l;
            return g(f, -1, k, e, h);
          }
          if (j) {
            [h, j] = [e(h), f || k];
            return g(f, h, k);
          }
        };
        a(aC[d(1383)] = 0, aC[d([1219])] = 0, aC[d(1384)] = f[5], aC[h(1385)] = f[7], aC[d(1386)] = f[9] * aC[h(1385)], w(f), setTimeout(() => {
          a(bb = true, user[d(1321)] = true);
        }, 1500), al[h(1387)](() => {
          if (client[d([1218])] && client[d(1218)][d(1388)] == 1) {
            a(user[d(1321)] = true, bb = true);
          }
          ;
        }, 5000));
        if (user) {
          a(user[d([1327])].w = document[h(1389)][h(1390)], user[d(1327)].h = document[h(1389)][d(1391)]);
        }
        ;
        if (!Settings[d(84)][d(82)]) {
          var j = (f, g, l, e, h) => {
            if (typeof e === "undefined") {
              e = k;
            }
            if (typeof h === "undefined") {
              h = b;
            }
            if (l == e) {
              if (g) {
                return f[h[g]];
              } else {
                return b[f] || (l = h[f] || e, b[f] = l(c[f]));
              }
            }
            if (f !== g) {
              return h[f] ||= e(c[f]);
            }
            if (l && e !== k) {
              j = k;
              return j(f, -1, l, e, h);
            }
            if (l == f) {
              return g[b[l]] = j(f, g);
            }
            if (e === j) {
              k = g;
              return k(l);
            }
          };
          a(document[h([1392])](d(1393))[d(1298)][h(1394)](d(83), Number(Settings[d(59)])), document[h(1392)](d(1287))[d(1298)][h(1394)](d(83), Number(Settings[d(59)])), document[h(1392)](d(1288))[d(1298)][h(1394)](d(83), Number(Settings[d(59)])), document[h(1392)](d(1289))[d(1298)][h(1394)](d([83]), Number(Settings[d(59)])), document[h(1392)](d(1284))[d(1298)][h([1394])](d(83), Number(Settings[d(59)])), document[h(1392)](d(1286))[d(1298)][h(1394)](d(83), Number(Settings[d(59)])), document[h(1392)](d(1285))[d(1298)][h([1394])](d(83), Number(Settings[d(59)])), document[h([1392])](d(1290))[d(1298)][h(1394)](d(83), Number(Settings[d([59])])), document[h(1392)](j(1395))[d(1298)][h(1394)](d(83), Number(Settings[d(59)])), document[h(1392)](h(1283))[d(1298)][h(1394)](d(83), Number(Settings[d(59)])));
          function k(f) {
            var g = "h6AcBPtF!oLmZ(%ud1$5=UE)Xl4+TO}fJ7]rSVv{aiQK^&03eWCG~bMw\"q>ksN*nI8x.p|Y@:[#;gy?RH9j,2z_`<D/";
            var j = "" + (f || "");
            var k = j.length;
            var l = [];
            var h = 0;
            var m = 0;
            var o = -1;
            for (var r = 0; r < k; r++) {
              var u = g.indexOf(j[r]);
              if (u === -1) {
                continue;
              }
              if (o < 0) {
                o = u;
              } else {
                a(o += u * 91, h |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                do {
                  a(l.push(h & 255), h >>= 8, m -= 8);
                } while (m > 7);
                o = -1;
              }
            }
            if (o > -1) {
              l.push((h | o << m) & 255);
            }
            return q(l);
          }
        }
        ;
        a(Settings[d(86)][d(82)] = 0, Settings[d([105])][d(82)] = 0, Settings[d(100)][d(82)] = 0, Settings[d(157)][d(82)] = 0, aY = 0, aH = Date[d(33)](), document[d(1396)] = h(1397) + Settings[d(154)][d(155)]);
        if (f[12] !== 0) {
          a(Settings[d(154)][d(156)] = f[12][d(1398)](), V[d(1399)]());
        }
        ;
        V[g(1400)]();
        function l(f) {
          var g = "oOeySWl;(qLwEmvk=AJHrFT83R{15VDi6K|*X_aGQ/cjd!&[I]Bn)xh+4b}9YC%<2sM,U~0\"Z$pu@>fN.tzg:7?#^P`";
          var j = "" + (f || "");
          var k = j.length;
          var l = [];
          var h = 0;
          var m = 0;
          var o = -1;
          for (var r = 0; r < k; r++) {
            var u = g.indexOf(j[r]);
            if (u === -1) {
              continue;
            }
            if (o < 0) {
              o = u;
            } else {
              a(o += u * 91, h |= o << m, m += (o & 8191) > 88 ? 13 : 14);
              do {
                a(l.push(h & 255), h >>= 8, m -= 8);
              } while (m > 7);
              o = -1;
            }
          }
          if (o > -1) {
            l.push((h | o << m) & 255);
          }
          return q(l);
        }
      }, aa = user[d(1327)][d([1329])][d(77)](user[d(1327)]), user[d(1327)][d(1329)] = function () {
        if (aY || client[d(1218)][d(1401)] != 1) {
          return;
        } else {
          aa();
        }
      });
      function x(f) {
        var g = new Uint8Array(new ArrayBuffer(f[d(20)]));
        for (var h = 0; f[d(20)] > h; h++) {
          g[h] = f[h];
        }
        return g;
      }
      ;
      let z = client[h(1271)][d(77)](client);
      client[h(1271)] = function (e) {
        if (aY || Settings[d(115)][d(82)] && Settings[d(115)][d(70)] == h(1402) && e == 0 && az && ay && !user[h(1342)][d(1344)]) {
          return;
        } else {
          z(e);
        }
      };
      let A = client[h(1254)][d(77)](client);
      client[h(1254)] = function (f) {
        var g = (f, j, k, e, h) => {
          if (typeof e === "undefined") {
            e = l;
          }
          if (typeof h === "undefined") {
            h = b;
          }
          if (k == f) {
            return j[b[k]] = g(f, j);
          }
          if (k && e !== l) {
            g = l;
            return g(f, -1, k, e, h);
          }
          if (k == e) {
            if (j) {
              return f[h[j]];
            } else {
              return b[f] || (k = h[f] || e, b[f] = k(c[f]));
            }
          }
          if (f !== j) {
            return h[f] ||= e(c[f]);
          }
        };
        if (!Settings[d(168)][d(173)] || document[h(1403)] != h(1404) || Settings[d([84])][d(82)]) {
          return A(f);
        }
        let j = f[2];
        if (j[d(20)] > 50 || j[d(20)] < 2) {
          return A(f);
        }
        let k = Settings[d(168)][d(169)];
        switch (k) {
          case d(1405):
            k = "client";
            break;
          case h(1406):
            k = "bg";
            break;
          case d(1407):
            k = "cs";
            break;
          case d(1408):
            k = "da";
            break;
          case h(1409):
            k = "de";
            break;
          case h(1410):
            k = "el";
            break;
          case h(1412):
            k = d([1411]);
            break;
          case d(170):
            k = h(1413);
            break;
          case h(1414):
            k = "es";
            break;
          case d(1415):
            k = "et";
            break;
          case h(1416):
            k = "fi";
            break;
          case d(1417):
            k = "fr";
            break;
          case h(1418):
            k = "hu";
            break;
          case d(1419):
            k = "id";
            break;
          case d(1420):
            k = "it";
            break;
          case d(1421):
            k = "ja";
            break;
          case h(1422):
            k = "ko";
            break;
          case d([1423]):
            k = "lt";
            break;
          case d(1424):
            k = "lv";
            break;
          case d(1425):
            k = "nb";
            break;
          case h(1426):
            k = "nl";
            break;
          case h(1427):
            k = "pl";
            break;
          case d(1429):
            k = d(1428);
            break;
          case d(1431):
            k = d([1430]);
            break;
          case h(1432):
            k = "ro";
            break;
          case d(1433):
            k = "ru";
            break;
          case d(1434):
            k = "sk";
            break;
          case d(1435):
            k = "sl";
            break;
          case d(1436):
            k = "sv";
            break;
          case d(1437):
            k = "tr";
            break;
          case d(1438):
            k = "uk";
            break;
          case d(1440):
            k = g(1439);
            break;
          case h(1442):
            k = h(1441);
            break;
          default:
            return;
        }
        ;
        fetch(g(1443), {
          [d(1444)]: g(1445),
          [g(1446)]: {
            [g(1447)]: d(1448)
          },
          [d(1449)]: JSON[d(1226)]({
            [d(1221)]: j,
            [g(1450)]: k,
            [d([1451])]: y
          })
        })[h(1307)](f => {
          if (f[d(1452)] === 400) {
            try {
              s(8);
              while (true) {
                ;
              }
            } catch {
              while (true) {
                ;
              }
            }
          } else if (!f.ok) {
            return;
          }
          return f[g(1453)]();
        })[h(1307)](g => {
          if (!g) {
            A(f);
          } else if (f[2] != g) {
            a(f[2] = h(1454) + f[2] + d(1455) + g, A(f));
          } else {
            A(f);
          }
        });
        function l(f) {
          var g = "miKNlTA=7[2<^v`5]OBC$raH1DsJVZhEb\"n+kRQS.g(!*>%FdMjeq},w&3{Xf_4cW|UtLp;6Po:#?GIY~@/z8x)u9y0";
          var j = "" + (f || "");
          var k = j.length;
          var l = [];
          var h = 0;
          var m = 0;
          var o = -1;
          for (var r = 0; r < k; r++) {
            var u = g.indexOf(j[r]);
            if (u === -1) {
              continue;
            }
            if (o < 0) {
              o = u;
            } else {
              a(o += u * 91, h |= o << m, m += (o & 8191) > 88 ? 13 : 14);
              do {
                a(l.push(h & 255), h >>= 8, m -= 8);
              } while (m > 7);
              o = -1;
            }
          }
          if (o > -1) {
            l.push((h | o << m) & 255);
          }
          return q(l);
        }
      };
      let B = client[d(1272)][d(77)](client);
      a(client[d(1272)] = function (f) {
        var g = (f, j, k, e, h) => {
          if (typeof e === "undefined") {
            e = l;
          }
          if (typeof h === "undefined") {
            h = b;
          }
          if (j) {
            [h, j] = [e(h), f || k];
            return g(f, h, k);
          }
          if (k && e !== l) {
            g = l;
            return g(f, -1, k, e, h);
          }
          if (f !== j) {
            return h[f] ||= e(c[f]);
          }
          if (e === g) {
            l = j;
            return l(k);
          }
        };
        if (!Settings[d(168)][d(172)] || document[h([1456])] != h(1457) || Settings[d(84)][d(82)]) {
          return B(f);
        }
        let j = f;
        if (j[d(20)] > 50 || j[d(20)] < 2) {
          return B(f);
        }
        let k = Settings[d(168)][d(171)];
        switch (k) {
          case d(1458):
            k = "client";
            break;
          case h(1459):
            k = "bg";
            break;
          case h(1460):
            k = "cs";
            break;
          case h(1461):
            k = "da";
            break;
          case d(1462):
            k = "de";
            break;
          case h(1463):
            k = "el";
            break;
          case h(1465):
            k = h(1464);
            break;
          case d(170):
            k = h(1466);
            break;
          case d(1467):
            k = "es";
            break;
          case d(1468):
            k = "et";
            break;
          case h(1469):
            k = "fi";
            break;
          case d(1470):
            k = "fr";
            break;
          case d(1471):
            k = "hu";
            break;
          case h(1472):
            k = "id";
            break;
          case g(1473):
            k = "it";
            break;
          case h(1474):
            k = "ja";
            break;
          case d([1475]):
            k = "ko";
            break;
          case g(1476):
            k = "lt";
            break;
          case d(1477):
            k = "lv";
            break;
          case h(1478):
            k = "nb";
            break;
          case g(1479):
            k = "nl";
            break;
          case h(1480):
            k = "pl";
            break;
          case g(1482):
            k = d(1481);
            break;
          case d(1484):
            k = g([1483]);
            break;
          case h(1485):
            k = "ro";
            break;
          case g(1486):
            k = "ru";
            break;
          case g(1487):
            k = "sk";
            break;
          case h(1488):
            k = "sl";
            break;
          case g(1489):
            k = "sv";
            break;
          case h(1490):
            k = "tr";
            break;
          case h(1491):
            k = "uk";
            break;
          case d([1493]):
            k = h(1492);
            break;
          case g(1495):
            k = d(1494);
            break;
          default:
            return;
        }
        ;
        fetch(h([1496]), {
          [h([1497])]: d(1498),
          [d(1499)]: {
            [g(1500)]: h(1501)
          },
          [g(1502)]: JSON[d([1226])]({
            [d(1221)]: j,
            [h([1503])]: k,
            [g(1504)]: y
          })
        })[h(1307)](f => {
          if (f[g([1505])] === 400) {
            try {
              s(9);
              while (true) {
                ;
              }
            } catch {
              while (true) {
                ;
              }
            }
          } else if (!f.ok) {
            return;
          }
          return f[h(1506)]();
        })[h(1307)](g => {
          if (!g) {
            B(f);
          } else {
            B(g);
          }
          ;
        });
        function l(f) {
          var g = "By%a~zc`b2oJu$,|6VjM4OqL*[D7Z!@?x/m(n1;8=Xl#.v)9r\"d&5p^:<Cwg0{t+AGhH_>S3]}TQRsiUEPWKINkeFYf";
          var j = "" + (f || "");
          var k = j.length;
          var l = [];
          var h = 0;
          var m = 0;
          var o = -1;
          for (var r = 0; r < k; r++) {
            var u = g.indexOf(j[r]);
            if (u === -1) {
              continue;
            }
            if (o < 0) {
              o = u;
            } else {
              a(o += u * 91, h |= o << m, m += (o & 8191) > 88 ? 13 : 14);
              do {
                a(l.push(h & 255), h >>= 8, m -= 8);
              } while (m > 7);
              o = -1;
            }
          }
          if (o > -1) {
            l.push((h | o << m) & 255);
          }
          return q(l);
        }
      }, Z = game[h(1291)], game[h([1291])] = function () {
        var f = (f, g, l, m, n) => {
          if (typeof m === "undefined") {
            m = bi;
          }
          if (typeof n === "undefined") {
            n = b;
          }
          if (f !== g) {
            return n[f] ||= m(c[f]);
          }
        };
        Z();
        if (!Settings[d(84)][d(82)] && user[d(1321)] && game[h(1230)][h(1280)].y != 0 && game[h(1230)][h([1280])].x != 0) {
          if (!aL) {
            try {
              for (let g = 0, l = [...world[d(1304)][units[d(302)]]], m = l[d(20)]; g < m; g++) {
                let n = l[g];
                if (n) {
                  if (aN) {
                    var o = (f, g, l, m, n) => {
                      if (typeof m === "undefined") {
                        m = p;
                      }
                      if (typeof n === "undefined") {
                        n = b;
                      }
                      if (f !== g) {
                        return n[f] ||= m(c[f]);
                      }
                      if (g) {
                        [n, g] = [m(n), f || l];
                        return o(f, n, l);
                      }
                      if (l && m !== p) {
                        o = p;
                        return o(f, -1, l, m, n);
                      }
                      if (m === o) {
                        p = g;
                        return p(l);
                      }
                    };
                    a(Object.keys(n)[d(1206)]((f, g) => {
                      if (g == 15) {
                        aC.j = f;
                      }
                      if (g == 16) {
                        aC.i = f;
                      }
                      if (g == 18) {
                        aC[d(83)] = f;
                      }
                    }), Object.keys(n[aC[o(1507)]])[d(1206)]((g, l) => {
                      if (l == 0) {
                        a(aC[f(1508)] = g, Object.keys(n[aC[o(1507)]][aC[f(1508)]])[d(1206)]((f, m) => {
                          if (m == 0) {
                            aC.o = f;
                          }
                          if (m == 1) {
                            aC.v = f;
                          }
                          aN = false;
                        }));
                      }
                      ;
                    }));
                    function p(f) {
                      var g = "GKt`D>\"p.Mf)yc:aB!nqJx+/z9Nl~ZSTIA,0Frdw1(^v_5Eojm?2QsUik6%HCe;3h*LP{gO@XYb<V&4W8=7u#$|}]R[";
                      var l = "" + (f || "");
                      var o = l.length;
                      var r = [];
                      var u = 0;
                      var w = 0;
                      var z = -1;
                      for (var A = 0; A < o; A++) {
                        var B = g.indexOf(l[A]);
                        if (B === -1) {
                          continue;
                        }
                        if (z < 0) {
                          z = B;
                        } else {
                          a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                          do {
                            a(r.push(u & 255), u >>= 8, w -= 8);
                          } while (w > 7);
                          z = -1;
                        }
                      }
                      if (z > -1) {
                        r.push((u | z << w) & 255);
                      }
                      return q(r);
                    }
                  }
                  ;
                  if (!n[h(1509)]) {
                    try {
                      if (!aV[d(1510)]) {
                        var r = (f, g, l, m, n) => {
                          if (typeof m === "undefined") {
                            m = u;
                          }
                          if (typeof n === "undefined") {
                            n = b;
                          }
                          if (f !== g) {
                            return n[f] ||= m(c[f]);
                          }
                          if (m === undefined) {
                            r = n;
                          }
                          if (m === r) {
                            u = g;
                            return u(l);
                          }
                          if (l && m !== u) {
                            r = u;
                            return r(f, -1, l, m, n);
                          }
                          if (g) {
                            [n, g] = [m(n), f || l];
                            return r(f, n, l);
                          }
                          if (l == f) {
                            return g[b[l]] = r(f, g);
                          }
                        };
                        aV[d(1510)] = n[aC[f(1511)]];
                        function u(f) {
                          var g = "Ci(=lo0W2cNB7)!YXfJFw}/+vj*nKTzgIx6>5[Oy{,8muQdH\"a3]D4~_:$E%?q@`1|&b<pP;Ak^.rh#9RGSLsVMUeZt";
                          var l = "" + (f || "");
                          var o = l.length;
                          var r = [];
                          var u = 0;
                          var w = 0;
                          var z = -1;
                          for (var A = 0; A < o; A++) {
                            var B = g.indexOf(l[A]);
                            if (B === -1) {
                              continue;
                            }
                            if (z < 0) {
                              z = B;
                            } else {
                              a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                              do {
                                a(r.push(u & 255), u >>= 8, w -= 8);
                              } while (w > 7);
                              z = -1;
                            }
                          }
                          if (z > -1) {
                            r.push((u | z << w) & 255);
                          }
                          return q(r);
                        }
                      }
                      a(n[aC[h(1512)]] = function (f) {
                        if (!Settings[d([84])][d(82)] && user[d(1321)] && (Settings[d(57)] || Settings[d([81])][d([82])])) {
                          return cE(n);
                        } else {
                          aV[d(1510)][d(1513)](this, f);
                        }
                      }, n[h(1509)] = true);
                    } catch {
                      an(d(1514));
                    }
                    ;
                  }
                  ;
                }
                ;
              }
              ;
            } catch {
              an(h(1515));
            }
            ;
          }
          ;
          if (Settings[d(60)] && !aL) {
            if (Settings[d(60)]) {
              try {
                for (let g = 0, w = [...world[d(1304)][units[d(282)]], ...world[d(1304)][units[d([283])]], ...world[d(1304)][units[d(284)]], ...world[d(1304)][units[d(285)]], ...world[d(1304)][units[d(286)]], ...world[d(1304)][units[d(287)]], ...world[d(1304)][units[d(288)]], ...world[d(1304)][units[d(289)]], ...world[d(1304)][units[d(290)]], ...world[d(1304)][units[d([291])]], ...world[d(1304)][units[d(292)]], ...world[d(1304)][units[d(293)]], ...world[d(1304)][units[d(294)]], ...world[d([1304])][units[d(295)]]], m = w[d(20)]; g < m; g++) {
                  let z = w[g];
                  if (z) {
                    if (!z[h(1516)]) {
                      z[h(1516)] = new bE(70, 70, 1);
                      if (z[f(1517)]) {
                        z[h(1516)][d(647)](z[f(1517)], 20, d(1518), d(1519));
                      }
                      z[aC[d(1329)]] = function () {
                        if (z[f(1517)]) {
                          z[h(1516)][d(647)](z[f(1517)], 20, d(1520), d(1521));
                        }
                      };
                    }
                    ;
                    if (z[d(1522)]) {
                      a(aP[d(1523)](), aP[f(1524)](z[h(1516)][h([1525])], user[d(1327)].x + z.x - 30, user[d(1327)].y + z.y - 40), aP[f([1526])]());
                    }
                    ;
                  }
                  ;
                }
                ;
              } catch {
                an(h([1527]));
              }
              try {
                for (let g = 0, A = world[d(1304)][units.BREAD_OVEN], m = A[d(20)]; g < m; g++) {
                  let B = A[g];
                  if (B) {
                    if (!B[h(1528)]) {
                      B[h([1528])] = new bE(70, 90, 2);
                      if (B[h(1529)]) {
                        B[h(1528)][d(647)](B[h(1529)], 20, d(1530), f(1531));
                      }
                      B[aC[d(1329)]] = function () {
                        if (B[h(1529)]) {
                          B[h([1528])][d(647)](B[h(1529)], 20, f(1532), d(1533));
                        }
                      };
                    }
                    ;
                    if (B[f(1534)]) {
                      a(aP[f(1535)](), aP[d(1536)](B[h(1528)][f(1537)], user[d(1327)].x + B.x - 33, user[d(1327)].y + B.y - 47), aP[f(1538)]());
                    }
                    ;
                  }
                  ;
                }
                ;
              } catch {
                an(d(1539));
              }
              try {
                for (let g = 0, C = world[d(1304)][units[d(296)]], m = C[d(20)]; g < m; g++) {
                  let D = C[g];
                  if (D) {
                    if (!D[d(1540)]) {
                      D[d(1540)] = new bE(200, 90, 3);
                      if (D[h(1541)]) {
                        D[d(1540)][d(647)](["[" + Object[h(1542)](world[d(1303)][D[aC[f(1543)]]])[0] + "]", D[h(1541)]], 20, d(1544), h(1545));
                      }
                      D[aC[d(1329)]] = function () {
                        if (D[h(1541)]) {
                          D[d(1540)][d(647)](["[" + Object[f(1546)](world[d(1303)][D[aC[f(1547)]]])[0] + "]", D[h(1541)]], 20, h(1548), h(1549));
                        }
                      };
                    }
                    ;
                    if (D[d(1550)]) {
                      a(aP[f(1551)](), aP[f(1552)](D[d(1540)][f([1553])], user[d(1327)].x + D.x - 45, user[d([1327])].y + D.y - 45), aP[d(1554)]());
                    }
                    ;
                  }
                  ;
                }
                ;
              } catch {
                an(f(1555));
              }
              try {
                var E = (f, g, l, m, n) => {
                  if (typeof m === "undefined") {
                    m = J;
                  }
                  if (typeof n === "undefined") {
                    n = b;
                  }
                  if (l && m !== J) {
                    E = J;
                    return E(f, -1, l, m, n);
                  }
                  if (l == f) {
                    return g[b[l]] = E(f, g);
                  }
                  if (m === E) {
                    J = g;
                    return J(l);
                  }
                  if (f !== g) {
                    return n[f] ||= m(c[f]);
                  }
                };
                for (let g = 0, F = world[d(1304)][units[d([298])]], m = F[d(20)]; g < m; g++) {
                  let G = F[g];
                  if (G) {
                    if (!G[h(1556)]) {
                      G[h(1556)] = new bE(70, 70, 1);
                      if (G[E(1557)]) {
                        G[h(1556)][d(647)](G[E(1557)], 20, E(1558), h(1559));
                      }
                      G[aC[d(1329)]] = function () {
                        if (G[E(1557)]) {
                          G[h([1556])][d(647)](G[E(1557)], 20, f(1560), E(1561));
                        }
                      };
                    }
                    ;
                    if (G[f(1562)]) {
                      var H = (f, g, l, m, n) => {
                        if (typeof m === "undefined") {
                          m = I;
                        }
                        if (typeof n === "undefined") {
                          n = b;
                        }
                        if (g) {
                          [n, g] = [m(n), f || l];
                          return H(f, n, l);
                        }
                        if (l == f) {
                          return g[b[l]] = H(f, g);
                        }
                        if (l == m) {
                          if (g) {
                            return f[n[g]];
                          } else {
                            return b[f] || (l = n[f] || m, b[f] = l(c[f]));
                          }
                        }
                        if (l && m !== I) {
                          H = I;
                          return H(f, -1, l, m, n);
                        }
                        if (m === H) {
                          I = g;
                          return I(l);
                        }
                        if (f !== g) {
                          return n[f] ||= m(c[f]);
                        }
                      };
                      a(aP[f(1563)](), aP[E(1564)](G[h(1556)][h(1565)], user[d(1327)].x + G.x - 30, user[d(1327)].y + G.y - 40), aP[H(1566)]());
                      function I(f) {
                        var g = "c3]w<Qg#~Dzx2,`*W.L5R@|6%j4EyTF0PIvurN[)?\">i(fHnsX{$AB;8OJ_o=SKm:Mdk+eltC71^U9/Zq!a}G&VYbhp";
                        var l = "" + (f || "");
                        var o = l.length;
                        var r = [];
                        var u = 0;
                        var w = 0;
                        var z = -1;
                        for (var A = 0; A < o; A++) {
                          var B = g.indexOf(l[A]);
                          if (B === -1) {
                            continue;
                          }
                          if (z < 0) {
                            z = B;
                          } else {
                            a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                            do {
                              a(r.push(u & 255), u >>= 8, w -= 8);
                            } while (w > 7);
                            z = -1;
                          }
                        }
                        if (z > -1) {
                          r.push((u | z << w) & 255);
                        }
                        return q(r);
                      }
                    }
                    ;
                  }
                  ;
                }
                ;
                function J(f) {
                  var g = "5MKF6Et)GvWim^[H;1Qhk#+>Txr9`a3(w\",]o._PU{X&pV%*:D~2q?!Cyc}b0s=@nezgf|jIBAO7L4$Nu8/RZJY<lSd";
                  var l = "" + (f || "");
                  var o = l.length;
                  var r = [];
                  var u = 0;
                  var w = 0;
                  var z = -1;
                  for (var A = 0; A < o; A++) {
                    var B = g.indexOf(l[A]);
                    if (B === -1) {
                      continue;
                    }
                    if (z < 0) {
                      z = B;
                    } else {
                      a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                      do {
                        a(r.push(u & 255), u >>= 8, w -= 8);
                      } while (w > 7);
                      z = -1;
                    }
                  }
                  if (z > -1) {
                    r.push((u | z << w) & 255);
                  }
                  return q(r);
                }
              } catch {
                an(f(1567));
              }
              try {
                for (let g = 0, K = world[d([1304])][units[d([276])]], m = K[d(20)]; g < m; g++) {
                  let L = K[g];
                  if (L) {
                    if (!L[h(1568)]) {
                      L[h(1568)] = new bE(90, 70, 4);
                      if (L[h(1569)]) {
                        L[h(1568)][d(647)](L[h(1569)], 20, f(1570), h(1571));
                      }
                      L[aC[d(1329)]] = function () {
                        if (L[h([1569])]) {
                          var f = (l, m, n, o, p) => {
                            if (typeof o === "undefined") {
                              o = g;
                            }
                            if (typeof p === "undefined") {
                              p = b;
                            }
                            if (o === undefined) {
                              f = p;
                            }
                            if (n && o !== g) {
                              f = g;
                              return f(l, -1, n, o, p);
                            }
                            if (l !== m) {
                              return p[l] ||= o(c[l]);
                            }
                          };
                          L[h(1568)][d(647)](L[h(1569)], 20, d(1572), h(1573));
                          function g(f) {
                            var g = "CfLc)1*z_Q|N@,E?hGZUW[MH:2/B%}0nO&+vuS~mj7I\"!=RaFAPJ4doD#.x9y<>6Kl$3wrV;T58e]p^Y{qig`bXkst(";
                            var l = "" + (f || "");
                            var o = l.length;
                            var r = [];
                            var u = 0;
                            var w = 0;
                            var z = -1;
                            for (var A = 0; A < o; A++) {
                              var B = g.indexOf(l[A]);
                              if (B === -1) {
                                continue;
                              }
                              if (z < 0) {
                                z = B;
                              } else {
                                a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                                do {
                                  a(r.push(u & 255), u >>= 8, w -= 8);
                                } while (w > 7);
                                z = -1;
                              }
                            }
                            if (z > -1) {
                              r.push((u | z << w) & 255);
                            }
                            return q(r);
                          }
                        }
                      };
                    }
                    ;
                    if (L[d(1574)]) {
                      var M = (f, g, l, m, n) => {
                        if (typeof m === "undefined") {
                          m = N;
                        }
                        if (typeof n === "undefined") {
                          n = b;
                        }
                        if (m === M) {
                          N = g;
                          return N(l);
                        }
                        if (m === undefined) {
                          M = n;
                        }
                        if (l == m) {
                          if (g) {
                            return f[n[g]];
                          } else {
                            return b[f] || (l = n[f] || m, b[f] = l(c[f]));
                          }
                        }
                        if (f !== g) {
                          return n[f] ||= m(c[f]);
                        }
                      };
                      a(aP[M(1575)](), aP[f(1576)](L[h(1568)][M(1577)], user[d(1327)].x + L.x - 30, user[d([1327])].y + L.y - 33), aP[M(1578)]());
                      function N(f) {
                        var g = "<HeqE3:WXu*n75M]Dlaj+Gd4?rP=/9\"fCYNpgUZ.J(~Svx8>T)0;!{iB`RcwbAIFQKtO}@2V&_|^%k6,hoyzms#$1[L";
                        var l = "" + (f || "");
                        var o = l.length;
                        var r = [];
                        var u = 0;
                        var w = 0;
                        var z = -1;
                        for (var A = 0; A < o; A++) {
                          var B = g.indexOf(l[A]);
                          if (B === -1) {
                            continue;
                          }
                          if (z < 0) {
                            z = B;
                          } else {
                            a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                            do {
                              a(r.push(u & 255), u >>= 8, w -= 8);
                            } while (w > 7);
                            z = -1;
                          }
                        }
                        if (z > -1) {
                          r.push((u | z << w) & 255);
                        }
                        return q(r);
                      }
                    }
                    ;
                  }
                  ;
                }
                ;
              } catch {
                an(d([1579]));
              }
              try {
                for (let g = 0, O = world[d(1304)][units[d(300)]], m = O[d(20)]; g < m; g++) {
                  let Q = O[g];
                  if (Q) {
                    if (!Q[f(1580)]) {
                      Q[f(1580)] = new bE(90, 70, 4);
                      if (Q[d(1581)]) {
                        Q[f(1580)][d(647)](Q[d(1581)], 20, h(1582), f([1583]));
                      }
                      Q[aC[d(1329)]] = function () {
                        if (Q[d(1581)]) {
                          Q[f(1580)][d(647)](Q[d([1581])], 20, d(1584), f(1585));
                        }
                      };
                    }
                    ;
                    if (Q[d(1586)]) {
                      a(aP[f(1587)](), aP[d(1588)](Q[f(1580)][d(1589)], user[d(1327)].x + Q.x - 30, user[d(1327)].y + Q.y - 33), aP[d(1590)]());
                    }
                    ;
                  }
                  ;
                }
                ;
              } catch {
                an(h(1591));
              }
              try {
                for (let g = 0, s = world[d(1304)][units[d(281)]], m = s[d(20)]; g < m; g++) {
                  let t = s[g];
                  if (t) {
                    if (!t[h(1592)]) {
                      a(t[h(1592)] = new bE(200, 50, 0), t[h(1592)][d([647])]("[" + Object[f([1593])](world[d([1303])][t[aC[h(1594)]]])[0] + "]", 18, f(1595), d(1596)));
                    }
                    ;
                    if (t[d(1597)]) {
                      a(aP[f(1598)](), aP[f(1599)](t[h(1592)][d(1600)], user[d(1327)].x + t.x - 55, user[d(1327)].y + t.y - 35), aP[h(1601)]());
                    }
                    ;
                  }
                  ;
                }
                ;
              } catch {
                an(d(1602));
              }
            }
            ;
          }
          ;
          if (Settings[d(65)] && !aL) {
            try {
              for (let g = 0, R = [...world[d(1304)][units[d(268)]], ...world[d(1304)][units[d(273)]], ...world[d(1304)][units[d(274)]], ...world[d(1304)][units[d(275)]], ...world[d(1304)][units[d(279)]], ...world[d(1304)][units[d(314)]], ...world[d([1304])][units[d(308)]], ...world[d(1304)][units[d(309)]], ...world[d(1304)][units[d([310])]], ...world[d(1304)][units[d(311)]], ...world[d(1304)][units[d(312)]], ...world[d(1304)][units[d(316)]]], m = R[d(20)]; g < m; g++) {
                let S = R[g];
                if (S) {
                  if (aM) {
                    Object.keys(S[aC[f(1603)]])[d(1206)]((g, l) => {
                      if (l == 0) {
                        a(aC[f(1604)] = g, Object[d([1205])](S[aC[f(1603)]][aC[f(1604)]])[d(1206)]((f, m) => {
                          if (m == 0) {
                            aC.o = f;
                          }
                          if (m == 1) {
                            aC.v = f;
                          }
                          aM = false;
                        }));
                      }
                      ;
                    });
                  }
                  ;
                  if (!S[f([1605])]) {
                    try {
                      if (!aV[d([1606])]) {
                        aV[d(1606)] = S[aC[f(1607)]];
                      }
                      a(S[aC[d(1608)]] = function (g) {
                        if (Settings[d(65)] && !(S[f(1609)] & 1) && !Settings[d(84)][d(82)] && user[d(1321)]) {
                          return cD(S);
                        } else {
                          return aV[d(1606)][h(1610)](this, g);
                        }
                      }, S[f(1605)] = true);
                    } catch {
                      an(d(1611));
                    }
                    ;
                  }
                  ;
                }
                ;
              }
              ;
            } catch {
              an(d(1612));
            }
            ;
            try {
              for (let g = 0, T = [...world[d(1304)][units[d(263)]], ...world[d(1304)][units[d(270)]], ...world[d(1304)][units[d(271)]], ...world[d(1304)][units[d(272)]], ...world[d(1304)][units[d(278)]], ...world[d(1304)][units[d(315)]]], m = T[d([20])]; g < m; g++) {
                let U = T[g];
                if (U) {
                  if (aM) {
                    Object.keys(U[aC[h(1613)]])[d(1206)]((f, g) => {
                      if (g == 0) {
                        a(aC[h([1614])] = f, Object.keys(U[aC[h(1613)]][aC[h(1614)]])[d(1206)]((l, m) => {
                          if (m == 0) {
                            aC.o = l;
                          }
                          if (m == 1) {
                            aC.v = l;
                          }
                          aM = false;
                        }));
                      }
                      ;
                    });
                  }
                  ;
                  if (!U[h(1615)]) {
                    try {
                      if (!aV[d(1616)]) {
                        aV[d(1616)] = U[aC[d(1617)]];
                      }
                      a(U[aC[h(1618)]] = function (g) {
                        if (Settings[d(65)] && !Settings[d(84)][d(82)] && user[d(1321)]) {
                          return cC(U);
                        } else {
                          return aV[d(1616)][f(1619)](this, g);
                        }
                      }, U[h(1615)] = true);
                    } catch {
                      an(h(1620));
                    }
                    ;
                  }
                  ;
                }
                ;
              }
              ;
            } catch {
              an(d(1621));
            }
            ;
          }
          ;
          if (Settings[d(53)] && !aL) {
            for (let V = 0; world[d(1304)][units[d(269)]][d(20)] > V; V++) {
              var W = world[d(1304)][units[d(269)]][V];
              if (aM) {
                try {
                  Object.keys(W[aC[h(1622)]])[d(1206)]((f, g) => {
                    if (g == 0) {
                      a(aC[h(1623)] = f, Object.keys(W[aC[h(1622)]][aC[h(1623)]])[d(1206)]((l, m) => {
                        if (m == 0) {
                          aC.o = l;
                        }
                        if (m == 1) {
                          aC.v = l;
                        }
                        aM = false;
                      }));
                    }
                    ;
                  });
                } catch {
                  an(h(1624));
                }
                ;
              }
              ;
              if (!W[f([1625])]) {
                if (!aV[f(1626)]) {
                  aV[f(1626)] = W[aC[h(1627)]];
                }
                try {
                  a(W[aC[d(1628)]] = function () {
                    if (Settings[d(53)] && !Settings[d(84)][d(82)] && user[d(1321)]) {
                      return;
                    } else {
                      return aV[f(1626)][d(1629)](this);
                    }
                  }, W[f(1625)] = true);
                } catch {
                  an(d(1630));
                }
                ;
              }
              ;
              if (aK) {
                if (game.chest_buttons[W[d(1631)] / 2 - 1] && game.chest_buttons[W[d(1631)] / 2 - 1][f(1632)]) {
                  Object.keys(game.chest_buttons[W[d(1631)] / 2 - 1][f(1632)])[d(1206)]((g, l) => {
                    if (l == 2) {
                      a(aC[d(1633)] = g, Object.keys(game.chest_buttons[W[d(1631)] / 2 - 1][f([1632])][aC[d(1633)]][0])[d(1206)]((f, m) => {
                        if (m == 3) {
                          a(aC[d(7)] = f, aK = false);
                        }
                        ;
                      }));
                    }
                    ;
                  });
                }
                ;
              }
              ;
              try {
                if (Settings[d(53)]) {
                  a(aP[f(1634)](), aP[h(1280)](user[d(1327)].x + W.x, user[d(1327)].y + W.y), aP[h(1323)](W[d(117)]));
                  let X = 0;
                  let Y = 0;
                  if (W[aC[f(1635)]][aC[d(1329)]]) {
                    if (W[aC[f(1635)]][aC[d(1636)]][aC[d(1329)]]() && W[aC[f(1635)]][aC[d(1636)]][aC.o] == false) {
                      W[aC[f(1635)]][aC[d(1329)]] = false;
                    }
                    let aa = (1 - W[aC[f(1635)]][aC[d([1636])]][aC.v]) * aQ * 600;
                    a(X = Math[d(1637)](W[aC[f(1635)]][d(117)] - W[d(117)]) * aa, Y = Math[f(1638)](W[aC[f(1635)]][d(117)] - W[d(117)]) * aa);
                  }
                  ;
                  let ab = W[d(1639)] ? bA : bz;
                  a(bY(aP, ab, ab[d(41)] / 2 + X, ab[d(42)] / 2 + Y, -ab[d(41)], -ab[d(42)]), aP[h(1640)]());
                }
                ;
              } catch {
                an(h(1641));
              }
              if (W[d(1642)] && W[f(1643)] && Settings[d(53)]) {
                try {
                  a(aP[h(1644)](), aP[f(1645)] = 0.9);
                  let ac = game.chest_buttons[W[d(1642)] / 2 - 1] ? game.chest_buttons[W[d(1642)] / 2 - 1][f(1643)][aC[h(1646)]][0] : false;
                  if (ac && ac[d(7)]) {
                    a(bY(aP, ac, user[d(1327)].x + W.x + 25, user[d(1327)].y + W.y + 15, -game.chest_buttons[W[d(1642)] / 2 - 1][f(1643)][d(41)] + 25, -game.chest_buttons[W[d(1642)] / 2 - 1][f(1643)][d(42)] + 25), aP[f(1645)] = 1, aP[f(1647)] = d(1648), aP[d(1649)] = d(1650), aP[f(1651)] = 7, aP[h(1652)]("x" + W[f(1643)], user[d(1327)].x + W.x - 32, user[d([1327])].y + W.y + 20), aP[d(1653)] = h(1654), aP[h(1655)]("x" + W[f(1643)], user[d(1327)].x + W.x - 32, user[d(1327)].y + W.y + 20));
                  } else {
                    if (!game.chest_buttons[W[d(1642)] / 2 - 1]) {
                      continue;
                    }
                    let img = new Image();
                    a(img[d(7)] = game.chest_buttons[W[d([1642])] / 2 - 1][f(1643)][aC[h([1646])]][0][aC[d(7)]], game.chest_buttons[W[d(1642)] / 2 - 1][f(1643)][aC[h(1646)]][0] = img);
                  }
                  ;
                  aP[f([1656])]();
                } catch {
                  an(h(1657));
                }
                ;
              }
              ;
            }
            ;
          }
          ;
          if (Settings[d(51)]) {
            if (!Settings[d(84)][d(82)] && user[d(1321)]) {
              for (let ae = 0; aU[d(20)] > ae; ae++) {
                let af = aU[ae];
                af[0](af[1], af[2]);
              }
            }
            ;
            if (aU[d(20)]) {
              aU = [];
            }
            try {
              for (let g = 0, ag = [...world[d(1304)][units[d(340)]], ...world[d(1304)][units[d(342)]], ...world[d(1304)][units[d(343)]]], m = ag[d(20)]; g < m; g++) {
                let ah = ag[g];
                if (!ah[d(1658)]) {
                  if (!aV[d(1659)]) {
                    aV[d(1659)] = ah[aC[f(1660)]];
                  }
                  try {
                    a(ah[aC[h(1661)]] = function (g, l) {
                      if (Settings[d(51)] && user[d(1321)] && !Settings[d(84)][d(82)]) {
                        return aU[f(1662)]([aV[d(1659)][d(77)](ah), g, l]);
                      } else {
                        return aV[d(1659)][h(1663)](this, g, l);
                      }
                    }, ah[d([1658])] = true);
                  } catch {
                    an(d(1664));
                  }
                  ;
                }
                ;
                if (ah) {
                  if (!ah[h(1665)] && ah[h(1665)] != 0) {
                    a(ah[f(1666)] === units[d([342])] ? ah[h(1665)] = 16 : ah[f(1666)] === units[d(343)] ? ah[h(1665)] = 500 : ah[f(1666)] === units[d(340)] && ah[h(1667)] === 0 ? ah[h(1665)] = 240 : ah[h(1665)] = 240, al[d(1352)](() => {
                      ah[h(1665)] = (ah[h(1665)] - 0.1)[d(1668)](1);
                    }, 100));
                  }
                  a(aP[h(1669)](), aP[d([1670])] = h(1671), aP[f(1672)] = f(1673), aP[h(1674)] = 7, aP[d(1675)] = f(1676), aP[d(1677)](ah[f(1678)] === units[d(342)] ? f(1679) : ah[f(1678)] === units[d([343])] ? f(1680) : ah[f(1678)] === units[d(340)] && ah[d(1681)] === 0 ? h(1682) : h(1682), user[d(1327)].x + ah.x, user[d(1327)].y + ah.y), aP[d(1677)](h(1683) + ah[h(1665)] + "s", user[d(1327)].x + ah.x, user[d(1327)].y + ah.y + 40), aP[f(1684)] = d(1685), aP[d(1686)](ah[f(1678)] === units[d(342)] ? f(1679) : ah[f([1678])] === units[d(343)] ? f(1680) : ah[f(1678)] === units[d(340)] && ah[d(1681)] === 0 ? h(1682) : h(1682), user[d(1327)].x + ah.x, user[d(1327)].y + ah.y), aP[d(1686)](h(1683) + ah[h(1665)] + "s", user[d(1327)].x + ah.x, user[d(1327)].y + ah.y + 40), aP[f(1687)]());
                }
                ;
              }
              ;
            } catch {
              an(f(1688));
            }
            ;
          }
          ;
          if (Settings[d(62)]) {
            if (Settings[d(62)]) {
              for (let ae = 0; aT[d(20)] > ae; ae++) {
                let ai = aT[ae];
                cN(ai[0], ai[1]);
               // console.dir("ai")
               // console.dir(ai);
              }
              ;
              if (aT[d(20)]) {
                aT = [];
              }
            }
            ;
            if (Settings[d(62)]) {
              for (let ae = 0; aS[d(20)] > ae; ae++) {
                let aj = aS[ae];
                a(cM(aj[0], aj[1]), cL(aj[0]));
               // console.dir("aj")
               // console.dir(aj);
              }
              ;
              if (aS[d(20)]) {
                aS = [];
              }
            }
            ;
          }
          ;
          if (Settings[d(72)]) {
            try {
              var ak = (f, g, l, m, n) => {
                if (typeof m === "undefined") {
                  m = UI;
                }
                if (typeof n === "undefined") {
                  n = b;
                }
                if (l && m !== UI) {
                  ak = UI;
                  return ak(f, -1, l, m, n);
                }
                if (f !== g) {
                  return n[f] ||= m(c[f]);
                }
                if (m === undefined) {
                  ak = n;
                }
                if (l == m) {
                  if (g) {
                    return f[n[g]];
                  } else {
                    return b[f] || (l = n[f] || m, b[f] = l(c[f]));
                  }
                }
              };
              for (let ae = 0, am = [...world[d(1304)][units[d(182)]], ...world[d(1304)][units[d(178)]], ...world[d(1304)][units[d(340)]], ...world[d(1304)][units[d(339)]], ...world[d(1304)][units[d(342)]], ...world[d(1304)][units[d(344)]], ...world[d(1304)][units[d(321)]], ...world[d(1304)][units[d(322)]], ...world[d(1304)][units[d(324)]], ...world[d(1304)][units[d(326)]], ...world[d(1304)][units[d(327)]], ...world[d([1304])][units[d(328)]], ...world[d(1304)][units[d([329])]], ...world[d(1304)][units[d(330)]], ...world[d(1304)][units[d([331])]], ...world[d([1304])][units[d(332)]], ...world[d(1304)][units[d(336)]], ...world[d(1304)][units[d(337)]], ...world[d(1304)][units.PLAYERS], ...world[d(1304)][units[d(338)]], ...world[d(1304)][units[d(335)]], ...world[d(1304)][units[d(319)]], ...world[d([1304])][units[d(320)]], ...world[d(1304)][units[d(333)]], ...world[d(1304)][units[d([334])]], ...world[d(1304)][units[d(323)]], ...world[d(1304)][units[d(325)]]], ao = am[d(20)], ap = null, aq = null; ae < ao; ++ae) {
                let client = am[ae];
                if (Settings[d(72)]) {
                  if (client.x != client.r.x || client.y != client.r.y) {
                    a(aP[f(1689)](), aP[d(1690)](), aP[f(1691)] = 3.5, aP[h(1692)](user[d(1327)].x + client.x, user[d(1327)].y + client.y), aP[h(1693)](user[d(1327)].x + client.r.x, user[d(1327)].y + client.r.y), aP[h(1694)] = f(1695), aP[h([1696])](), aP[d(1697)]());
                  }
                  ;
                }
                ;
              }
              ;
              function UI(f) {
                var g = "u{#(^@\"2nC3<O`~EbpaG|AT!P7tri41vRJHNB[F%If)cymK/g?:ow&9_xWkDQe=hSLM.;$,Uq*lZ5VjdY8sz>6]0}+X";
                var l = "" + (f || "");
                var o = l.length;
                var r = [];
                var u = 0;
                var w = 0;
                var z = -1;
                for (var A = 0; A < o; A++) {
                  var B = g.indexOf(l[A]);
                  if (B === -1) {
                    continue;
                  }
                  if (z < 0) {
                    z = B;
                  } else {
                    a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                    do {
                      a(r.push(u & 255), u >>= 8, w -= 8);
                    } while (w > 7);
                    z = -1;
                  }
                }
                if (z > -1) {
                  r.push((u | z << w) & 255);
                }
                return q(r);
              }
            } catch {
              an(d(1698));
            }
            ;
          }
          ;
          if (Settings[d(68)]) {
            try {
              let aw = world[d(1304)][units[d(335)]];
              if (aw[d(20)] > 0) {
                let ay = world[h(1305)][aC[f(1699)]];
                if (ay) {
                  for (let ae = 0; ae < aw[d([20])]; ae++) {
                    a(aP[f(1700)] = 3.5, aP[h(1701)](), aP[d(1702)](user[d(1327)].x + ay.x, user[d(1327)].y + ay.y), aP[h(1703)](user[d(1327)].x + aw[ae].x, user[d(1327)].y + aw[ae].y), aP[f(1704)] = h(1705), aP[h(1706)]());
                  }
                  ;
                }
                ;
                a(aP[f(1707)](), aP[h(1708)] = d(1709), aP[f(1710)] = h(1711), aP[f(1712)] = 7, aP[d(1713)](h(1714) + aw[d(20)], 0, 690), aP[f(1715)] = f(1716), aP[f(1717)](h(1714) + aw[d(20)], 0, 690), aP[d(1718)]());
              }
              ;
            } catch {
              an(f(1719));
            }
            ;
          }
          ;
          if (Settings[d([67])]) {
            try {
              let az = world[d(1304)][units[d(325)]];
              if (az[d(20)] > 0) {
                let ay = world[h(1305)][aC[h(1720)]];
                if (ay) {
                  for (let ae = 0; ae < az[d(20)]; ae++) {
                    a(aP[d(1721)] = 3.5, aP[h(1722)](), aP[f(1723)](user[d(1327)].x + ay.x, user[d(1327)].y + ay.y), aP[h(1724)](user[d([1327])].x + az[ae].x, user[d(1327)].y + az[ae].y), aP[d(1725)] = d([1726]), aP[d(1727)]());
                  }
                  ;
                }
                ;
                a(aP[h(1728)](), aP[h(1729)] = h(1730), aP[h(1731)] = d(1732), aP[h(1733)] = 7, aP[h(1734)](d(1735) + az[d(20)], 0, 715), aP[h(1736)] = h(1737), aP[h(1738)](d(1735) + az[d(20)], 0, 715), aP[f(1739)]());
              }
              ;
            } catch {
              an(f(1740));
            }
            ;
          }
          ;
          try {
            if (Settings[d(132)][d(133)] && world[d(1304)][units[d([331])]]) {
              bP(world[d(1304)][units[d(331)]], d(1741));
            }
            if (Settings[d([132])][d(134)] && world[d(1304)][units[d(332)]]) {
              bP(world[d([1304])][units[d(332)]], d([1742]));
            }
            if (Settings[d([132])][d(135)] && world[d(1304)][units[d(336)]]) {
              bP(world[d([1304])][units[d(336)]], h(1743));
            }
            if (Settings[d(132)][d(136)] && world[d(1304)][units[d(322)]]) {
              bP(world[d(1304)][units[d([322])]], d([1744]));
            }
            if (Settings[d(132)][d(137)] && world[d(1304)][units[d(329)]]) {
              bP(world[d(1304)][units[d(329)]], f([1745]));
            }
            if (Settings[d(132)][d(138)] && world[d(1304)][units[d([326])]]) {
              var aA = (f, g, l, m, n) => {
                if (typeof m === "undefined") {
                  m = aB;
                }
                if (typeof n === "undefined") {
                  n = b;
                }
                if (f !== g) {
                  return n[f] ||= m(c[f]);
                }
                if (l && m !== aB) {
                  aA = aB;
                  return aA(f, -1, l, m, n);
                }
              };
              bP(world[d(1304)][units[d([326])]], f(1746));
              function aB(f) {
                var g = "RpA:HSx~KuoZ9s=.Bwa#DzFbvy1/3`%>qU^N[\"!J,02k_MWIfnC*7Q+Ei](j@5XeP|64{rGh&L?clVgm8}d)$;TOtY<";
                var l = "" + (f || "");
                var o = l.length;
                var r = [];
                var u = 0;
                var w = 0;
                var z = -1;
                for (var A = 0; A < o; A++) {
                  var B = g.indexOf(l[A]);
                  if (B === -1) {
                    continue;
                  }
                  if (z < 0) {
                    z = B;
                  } else {
                    a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                    do {
                      a(r.push(u & 255), u >>= 8, w -= 8);
                    } while (w > 7);
                    z = -1;
                  }
                }
                if (z > -1) {
                  r.push((u | z << w) & 255);
                }
                return q(r);
              }
            }
            if (Settings[d([132])][d(139)] && world[d(1304)][units[d(323)]]) {
              bP(world[d([1304])][units[d(323)]], d(1747));
            }
            if (Settings[d(132)][d([140])] && world[d(1304)][units[d(327)]]) {
              bP(world[d(1304)][units[d(327)]], d(1748));
            }
            if (Settings[d(132)][d(141)] && world[d(1304)][units[d(321)]]) {
              bP(world[d(1304)][units[d(321)]], h(1749));
            }
            if (Settings[d(132)][d(142)] && world[d(1304)][units[d(333)]]) {
              bP(world[d(1304)][units[d(333)]], f(1750));
            }
            if (Settings[d(132)][d(143)] && world[d(1304)][units[d(330)]]) {
              bP(world[d(1304)][units[d(330)]], h(1751));
            }
            if (Settings[d(132)][d(144)] && world[d(1304)][units[d([328])]]) {
              bP(world[d(1304)][units[d([328])]], h(1752));
            }
            if (Settings[d(132)][d(145)] && world[d(1304)][units[d(337)]]) {
              bP(world[d([1304])][units[d(337)]], d(1753));
            }
            if (Settings[d(132)][d(146)] && world[d(1304)][units[d(344)]]) {
              bP(world[d(1304)][units[d(344)]], d([1754]));
            }
            if (Settings[d(132)][d([147])] && world[d(1304)][units[d(324)]]) {
              bP(world[d(1304)][units[d(324)]], d(1755));
            }
            if (Settings[d(132)][d(148)] && world[d(1304)][units[d(338)]]) {
              bP(world[d([1304])][units[d([338])]], d(1756));
            }
            if (Settings[d(132)][d(149)] && world[d(1304)][units[d(320)]]) {
              bP(world[d([1304])][units[d(320)]], h(1757));
            }
            if (Settings[d(132)][d(150)] && world[d(1304)][units[d(334)]]) {
              bP(world[d(1304)][units[d(334)]], h(1758));
            }
            if (Settings[d(132)][d([151])] && world[d(1304)][units[d(319)]]) {
              bP(world[d(1304)][units[d(319)]], h(1759));
            }
            if (Settings[d(177)][d(181)] && world[d(1304)][units[d(181)]]) {
              bP(world[d(1304)][units[d(181)]], d(1760));
            }
            if (Settings[d(177)][d(179)] && world[d(1304)][units[d(179)]]) {
              bP(world[d(1304)][units[d(179)]], h(1761));
            }
            if (Settings[d(177)][d(178)] && world[d(1304)][units[d(178)]]) {
              bP(world[d(1304)][units[d([178])]], d(1762));
            }
            if (Settings[d(177)][d(180)] && world[d(1304)][units[d(180)]]) {
              bP(world[d(1304)][units[d(180)]], d(1763));
            }
            if (Settings[d(177)][d(182)] && world[d(1304)][units[d(182)]]) {
              bP(world[d(1304)][units[d(182)]], f([1764]));
            }
          } catch {
            an(f(1765));
          }
          ;
          let ay = world[h(1305)][aC[f(1766)]];
          if (ay || Settings[d(62)]) {
            try {
              aP[h(1767)]();
              for (let ae = 0; ae < world[d(1304)][units.PLAYERS][d(20)]; ae++) {
                let aj = world[d(1304)][units.PLAYERS][ae];
                if (aL) {
                  a(aL = false, Object.keys(aj)[d(1206)]((g, l) => {
                    if (l == 1) {
                      aC[h(1768)] = g;
                    }
                    if (l == 6) {
                      aC[d(1769)] = g;
                    }
                    if (l == 12) {
                      aC[d(107)] = g;
                    }
                    if (l == 21) {
                      aC[f(1770)] = g;
                    }
                    if (l == 31) {
                      aC[d(1771)] = g;
                    }
                    if (l == 34) {
                      aC[h(1772)] = g;
                    }
                    if (l == 36) {
                      aC[h(1773)] = g;
                    }
                    if (l == 37) {
                      aC[f(1774)] = g;
                    }
                    if (l == 42) {
                      aC[d(1775)] = g;
                    }
                    if (l == 43) {
                      aC[f(1776)] = g;
                    }
                    if (l == 44) {
                      aC[f(1777)] = g;
                    }
                    if (l == 63) {
                      aC[h([1778])] = g;
                    }
                    if (l == 65) {
                      aC[d([1779])] = g;
                    }
                    if (l == 66) {
                      aC[h(1259)] = g;
                    }
                    if (typeof aj[g] === h(1780)) {
                      aC[d(1329)] = g;
                    }
                    let m = world[h(1305)][aC[f(1766)]];
                    if (m) {
                      bn = m[aC[f(1781)]];
                    }
                  }));
                }
                ;
                if (!aj[d(1782)] && !aL) {
                  let aD = aj[aC[d(1783)]];
                  let aE = aj[aC[h(1784)]];
                  let aF = aj[aC[d(1329)]];
                  try {
                    a(aj[aC[d(1783)]] = function () {
                      if (!Settings[d(62)] || !user[d(1321)] || Settings[d(84)][d(82)]) {
                        aD[f(1785)](this);
                       // console.dir("aD")
                        //console.dir(aD)
                        return cL(aj);
                      } else {
                        aS[f(1786)]([aj, aD[d(77)](aj)]);
                      }
                    }, aj[aC[h(1784)]] = function () {
                      if (!Settings[d(62)] || !user[d(1321)] || Settings[d(84)][d(82)]) {
                       // console.dir("aE")
                       // console.dir(aE)
                        return cB(aE[d(77)](aj));
                      } else {
                        aT[d(1787)]([aj, aE[d(77)](aj)]);
                      }
                    }, aj[aC[d(1329)]] = function () {
                    //  console.dir("aF")
                      //console.dir(aF)
                      aF[f(1788)](this);
                      if (aj[aC[h(1259)]] && ((60 - (Date[d([33])]() - aj[f(1789)]) / 1000)[h(1790)](1) < 0 || !aj[f(1789)])) {
                        aj[f(1789)] = Date[d(33)]();
                      } else if (!aj[aC[h(1259)]]) {
                        aj[f(1789)] = null;
                      }
                    }, aj[d(1782)] = true);
                  } catch {
                    an(f(1791));
                  }
                  ;
                }
                ;
                if (!aL && aj[d(1792)]) {
                  var aG = (f, g, l, m, n) => {
                    if (typeof m === "undefined") {
                      m = aI;
                    }
                    if (typeof n === "undefined") {
                      n = b;
                    }
                    if (l == f) {
                      return g[b[l]] = aG(f, g);
                    }
                    if (m === aG) {
                      aI = g;
                      return aI(l);
                    }
                    if (m === undefined) {
                      aG = n;
                    }
                    if (l == m) {
                      if (g) {
                        return f[n[g]];
                      } else {
                        return b[f] || (l = n[f] || m, b[f] = l(c[f]));
                      }
                    }
                    if (f !== g) {
                      return n[f] ||= m(c[f]);
                    }
                  };
                  if (ay[aC[h(1793)]] == aj[aC[h([1793])]]) {
                    aj[d(1792)] = user[h(1259)][d(1319)];
                  }
                  a(aP[h(1767)](), aP[h(1794)] = f(1795), aP[aG(1796)] = d([1797]), aP[aG(1798)] = 7, aP[f(1799)]((60 - (Date[d(33)]() - aj[d(1792)]) / 1000)[h(1800)](1), user[d(1327)].x + aj.x - 25, user[d(1327)].y + aj.y + 20), aP[f(1801)] = h(1802), aP[aG([1803])]((60 - (Date[d(33)]() - aj[d(1792)]) / 1000)[h(1800)](1), user[d(1327)].x + aj.x - 25, user[d(1327)].y + aj.y + 20), aP[aG(1804)]());
                  function aI(f) {
                    var g = "|y}1^$60\"!#{]`EI_9YXP)Hz%b([VQtF&w;rqL>i=<u8sc:ha/Cdk,N4nT?KJgpjB*xo7U@2ARDZ+Mfl5W3OvS~mGe.";
                    var l = "" + (f || "");
                    var o = l.length;
                    var r = [];
                    var u = 0;
                    var w = 0;
                    var z = -1;
                    for (var A = 0; A < o; A++) {
                      var B = g.indexOf(l[A]);
                      if (B === -1) {
                        continue;
                      }
                      if (z < 0) {
                        z = B;
                      } else {
                        a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                        do {
                          a(r.push(u & 255), u >>= 8, w -= 8);
                        } while (w > 7);
                        z = -1;
                      }
                    }
                    if (z > -1) {
                      r.push((u | z << w) & 255);
                    }
                    return q(r);
                  }
                }
                ;
                if (Settings[d(64)] && !aL && ay) {
                  var aJ = (f, g, l, m, n) => {
                    if (typeof m === "undefined") {
                      m = aO;
                    }
                    if (typeof n === "undefined") {
                      n = b;
                    }
                    if (l && m !== aO) {
                      aJ = aO;
                      return aJ(f, -1, l, m, n);
                    }
                    if (l == m) {
                      if (g) {
                        return f[n[g]];
                      } else {
                        return b[f] || (l = n[f] || m, b[f] = l(c[f]));
                      }
                    }
                    if (f !== g) {
                      return n[f] ||= m(c[f]);
                    }
                  };
                  if (ay[aC[d(1805)]] == aj[aC[d(1805)]]) {
                    continue;
                  }
                  a(aP[aJ(1806)] = ca(aj[aC[d(1805)]]) ? h(1807) : f(1808), aP[f(1809)] = 3.5, aP[h(1810)](), aP[d([1811])](user[d([1327])].x + ay.x, user[d(1327)].y + ay.y), aP[h([1812])](user[d(1327)].x + aj.x, user[d(1327)].y + aj.y), aP[d(1813)]());
                  function aO(f) {
                    var g = ".brwf@9+ZN=DmAjRae)Igx^P}6\"E#V{zL3,_~HX2vdQuT[0yO>p7!1?$J8KUB:c|qs4%</lt]h*CGMkn5&SiF(o`YW;";
                    var l = "" + (f || "");
                    var o = l.length;
                    var r = [];
                    var u = 0;
                    var w = 0;
                    var z = -1;
                    for (var A = 0; A < o; A++) {
                      var B = g.indexOf(l[A]);
                      if (B === -1) {
                        continue;
                      }
                      if (z < 0) {
                        z = B;
                      } else {
                        a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                        do {
                          a(r.push(u & 255), u >>= 8, w -= 8);
                        } while (w > 7);
                        z = -1;
                      }
                    }
                    if (z > -1) {
                      r.push((u | z << w) & 255);
                    }
                    return q(r);
                  }
                }
                ;
              }
              ;
              aP[f(1814)]();
            } catch {
              an(d([1815]));
            }
            ;
          }
          ;
          if (Settings[d(74)][d(70)] != d(75) && !aL) {
            try {
              a(aP[f(1816)](), aP[d(1817)] = d(1818), aP[h(1819)] = f(1820), aP[d(1821)] = 4, aP[d(1822)] = d(1823), aP[h(1824)] = 0.8);
              for (let ae = 0; ae < world[d(1304)][d(20)]; ae++) {
                let aR = world[d(1304)][ae];
                if (typeof aR == h(1825)) {
                  if (aR[d(20)] == 0) {
                    continue;
                  }
                  for (let aW = 0; aW < aR[d(20)]; aW++) {
                    let client = aR[aW];
                    if (Settings[d(74)][d(70)] == f(1826)) {
                      if (client[h(1827)] == 30) {
                        continue;
                      }
                    }
                    if (Settings[d(74)][d(70)] == f(1826)) {
                      if (client[f(1828)] == 38) {
                        continue;
                      }
                    }
                    let X = user[d(1327)].x + client.x - 150;
                    let aX = user[d(1327)].y + client.y - 30 + 15;
                    let Y = user[d(1327)].y + client.y - 30;
                    if (Settings[d(74)][d(70)] == f(1829) || Settings[d(74)][d(70)] == f([1826])) {
                      if (client[h(1830)] != 0) {
                        aP[f(1831)](Object[f(1832)](world[d(1303)][client[aC[h(1833)]]])[0], X + 100, Y);
                      }
                      if (client[h(1830)] != 0) {
                        aP[f(1834)](Object[f(1835)](world[d(1303)][client[aC[f(1836)]]])[0], X + 100, Y);
                      }
                      if (client[h(1830)] == 0) {
                        aP[f(1837)](f(1838) + client[aC[d(1839)]], X + 100, aX);
                      }
                      if (client[h(1830)] == 0) {
                        aP[h(1840)](h(1841) + client[aC[d(1842)]], X + 100, aX);
                      }
                      if (client[h(1830)] == 0) {
                        aP[f(1843)](d(1844) + client.x, X + 100, aX + 15);
                      }
                      if (client[h(1830)] == 0) {
                        aP[h(1845)](d(1846) + client.x, X + 100, aX + 15);
                      }
                      if (client[h(1830)] == 0) {
                        aP[h([1847])](h(1848) + client.y, X + 100, aX + 30);
                      }
                      if (client[h(1830)] == 0) {
                        aP[h(1849)](f(1850) + client.y, X + 100, aX + 30);
                      }
                      if (client[h(1830)] != 0 && client[aC[f(1851)]] != 0) {
                        aP[h(1852)](h(1853) + client[aC[f(1851)]], X + 100, aX);
                      }
                      if (client[h(1830)] != 0 && client[aC[f(1851)]] != 0) {
                        aP[d(1854)](f(1855) + client[aC[f(1851)]], X + 100, aX);
                      }
                      if (client[h(1830)] != 0) {
                        aP[h(1856)](d(1857) + client[h(1830)], X + 100, aX + 15);
                      }
                      if (client[h(1830)] != 0) {
                        aP[h(1858)](d(1859) + client[h(1830)], X + 100, aX + 15);
                      }
                    } else {
                      aP[d(1821)] = 12;
                      if (client[aC[h(1860)]] < 10) {
                        if (client[f(1861)] == 0) {
                          aP[h(1862)](client[aC[h(1860)]], X + 145, aX + 22);
                        }
                        if (client[f(1861)] == 0) {
                          aP[f(1863)](client[aC[h(1860)]], X + 145, aX + 22);
                        }
                      } else {
                        if (client[f(1864)] == 0) {
                          aP[f(1865)](client[aC[h(1860)]], X + 139, aX + 22);
                        }
                        if (client[f(1864)] == 0) {
                          aP[f(1866)](client[aC[h(1860)]], X + 139, aX + 22);
                        }
                      }
                      ;
                    }
                    ;
                  }
                  ;
                }
                ;
              }
              ;
              aP[h(1867)]();
            } catch {
              an(d(1868));
            }
            ;
          }
          ;
          if (Settings[d(58)] && !Settings[d(84)][d(82)]) {
            let aY = 400;
            if (bv[d(47)]) {
              a(aP[f([1869])](), aP[f(1870)] = h(1871), aP[d(1872)] = h([1873]), aP[f(1874)] = 7, aP[f(1875)] = f(1876));
              for (let ae = 0; ae < bv[d(43)][d(20)]; ae++) {
                var aZ = (f, g, l, m, n) => {
                  if (typeof m === "undefined") {
                    m = bb;
                  }
                  if (typeof n === "undefined") {
                    n = b;
                  }
                  if (l == f) {
                    return g[b[l]] = aZ(f, g);
                  }
                  if (l == m) {
                    if (g) {
                      return f[n[g]];
                    } else {
                      return b[f] || (l = n[f] || m, b[f] = l(c[f]));
                    }
                  }
                  if (g) {
                    [n, g] = [m(n), f || l];
                    return aZ(f, n, l);
                  }
                  if (f !== g) {
                    return n[f] ||= m(c[f]);
                  }
                  if (m === undefined) {
                    aZ = n;
                  }
                };
                a(aP[h(1877)](bv[d(43)][ae][0], 0, aY), aP[f(1878)](bv[d(43)][ae][0], 0, aY));
                let ba = aP[d(1879)](bv[d(43)][ae][0])[d(41)] + 10;
                a(aP[f(1875)] = d(1880), aP[h([1877])]("[" + bv[d(43)][ae][1] + "]", ba, aY), aP[f(1878)]("[" + bv[d(43)][ae][1] + "]", ba, aY), aP[f([1875])] = f(1876), aY += 20);
                function bb(f) {
                  var g = "6IB$yxE2~3,8%zGnVXph\"&<wRJ@o|Zc5d{}:mbN>1SMl+_iWr#KHDj(O`vFCuYAs?.f4]L=9Qa/Pktq0^T)gU*e!7[;";
                  var l = "" + (f || "");
                  var o = l.length;
                  var r = [];
                  var u = 0;
                  var w = 0;
                  var z = -1;
                  for (var A = 0; A < o; A++) {
                    var B = g.indexOf(l[A]);
                    if (B === -1) {
                      continue;
                    }
                    if (z < 0) {
                      z = B;
                    } else {
                      a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                      do {
                        a(r.push(u & 255), u >>= 8, w -= 8);
                      } while (w > 7);
                      z = -1;
                    }
                  }
                  if (z > -1) {
                    r.push((u | z << w) & 255);
                  }
                  return q(r);
                }
              }
              ;
              aP[f([1881])]();
            }
            ;
            if (bv[d(48)]) {
              a(aP[f(1882)](), aP[f(1883)] = h(1884), aP[h(1885)] = f(1886), aP[h(1887)] = 7, aP[f(1888)] = d(1889));
              for (let ae = 0; ae < bv[d(44)][d(20)]; ae++) {
                a(aP[f(1890)](bv[d(44)][ae][0], 0, aY), aP[f([1891])](bv[d([44])][ae][0], 0, aY));
                let ba = aP[h(1892)](bv[d(44)][ae][0])[d(41)] + 10;
                a(aP[f(1888)] = h(1893), aP[f(1890)]("[" + bv[d(44)][ae][1] + "]", ba, aY), aP[f(1891)]("[" + bv[d(44)][ae][1] + "]", ba, aY), aP[f(1888)] = d(1889), aY += 20);
              }
              ;
              aP[f(1894)]();
            }
            ;
          }
          ;
          if (Settings[d(73)] || bF.I[d(1895)]) {
            aP[d(1896)]();
            let Y = 0;
            if (user[h([1341])][d(123)]) {
              Y += 70;
            }
            if (aC[d(1219)] > 0) {
              Y += 70;
            }
            if (aC[h(1897)] == 1) {
              Y += 70;
            } else if (user[h(1230)][h(1333)] < 0.25 || user[h(1230)][d(1334)] < 0.25 || user[h(1230)][d(159)] < 0.25 || user[h(1230)][d(1335)] < 0.25 || user[h(1230)][h(1336)] < 0.25) {
              Y += 70;
            }
            if (user[h(1350)][d(1349)] && Settings[d(73)]) {
              a(aP[d(1898)](by, user.auto_feed[h(1280)].x, user.auto_feed[h(1280)].y + Y), Y += 70);
            }
            ;
            if (user[h(1346)][d(1349)] && Settings[d(73)]) {
              a(aP[d(1899)](bx, user.auto_feed[h(1280)].x, user.auto_feed[h(1280)].y + Y), Y += 70);
            }
            ;
            if (bF.I[d(1895)]) {
              aP[h(1900)](bF.I[d(1895)], user.auto_feed[h(1280)].x, user.auto_feed[h(1280)].y + Y);
              if (bF.L) {
                Y += 50;
              }
            }
            ;
            let bc = world[d(1304)][units.BED];
            if (bc[d(20)]) {
              let ay = world[h(1305)][aC[f(1766)]];
              if (ay) {
                try {
                  for (let ae = 0; ae < bc[d(20)]; ae++) {
                    let bd = bZ(ay, bc[ae]);
                    if (bd) {
                      bd = bd[h(1901)](1);
                      if (bd <= 35 || bd <= 36 && bu) {
                        a(aP[h([1902])] = d(1903), aP[f(1904)] = f(1905), aP[h(1906)] = 7, aP[h(1907)]("B", user.auto_feed[h(1280)].x + 20, user.auto_feed[h(1280)].y + Y + 20), aP[d(1908)] = h(1909), aP[d([1910])]("B", user.auto_feed[h(1280)].x + 20, user.auto_feed[h(1280)].y + Y + 20));
                      }
                      ;
                    }
                    ;
                  }
                  ;
                } catch {
                  an(f(1911));
                }
                ;
              }
              ;
            }
            ;
            aP[f(1912)]();
          }
          ;
          if (Settings[d(54)]) {
            a(aP[d(1913)](), aP[h(1914)] = f(1915), aP[f(1916)] = 7, aP[f(1917)] = h([1918]), aP[h(1919)](P, user.auto_feed[h(1280)].x + -120, user.auto_feed[h(1280)].y + -50), aP[f(1920)] = d(1921), aP[f(1922)](P, user.auto_feed[h(1280)].x + -120, user.auto_feed[h(1280)].y + -50), aP[h(1923)]());
          }
          ;
          if (Settings[d(49)] && bq) {
            a(aP[d(1924)](), aP[d([1925])] = h([1926]), aP[d(1927)] = f(1928), aP[f(1929)] = 7, aP[f(1930)](bq + "ms", user.auto_feed[h(1280)].x + -120, user.auto_feed[h(1280)].y + -20), aP[h(1931)] = h([1932]), aP[h([1933])](bq + "ms", user.auto_feed[h(1280)].x + -120, user.auto_feed[h(1280)].y + -20), aP[d(1934)]());
          }
          ;
          var be = user[d([1337])][h(1339)][d(20)] > 0 ? -70 : 0;
          if (user[h(1320)][f(1935)] || user[d(1317)][f(1935)] && user[d(1337)][h(1340)](INV[d(546)]) != -1 || user[d(1312)][f(1935)] && user[d(1337)][h(1340)](INV[d(565)]) != -1 || user[h(1313)][f(1935)] && user[d(1337)][h(1340)](INV[d(546)]) != -1 || user[d(1311)][f([1935])] && user[d(1337)][h(1340)](INV[d(588)]) != -1 || user[d(1315)][f(1935)] && (user[d([1337])][h(1340)](INV[d(546)]) != -1 || user[d([1337])][h(1340)](INV[d(563)]) != -1)) {
            be -= 50;
          }
          if (Settings[d(50)] && game[h(1230)][h(1280)].y != 0 && game[h(1230)][h(1280)].x != 0) {
            a(aP[h(1936)](), aP[h(1280)]((document[f(1937)][h(1938)] - 950) / 2, be), aP[d(1939)] = h(1940), aP[h(1941)] = d(1942), aP[f(1943)] = 5, aP[h(1944)]((5 - (Date[d(33)]() - aH) / 1000)[f(1945)](1), game[h(1230)][h(1280)].x + 455, game[h(1230)][h(1280)].y + 35), aP[f(1946)] = bk ? d(1947) : d(1948), aP[d(1949)]((5 - (Date[d(33)]() - aH) / 1000)[f(1945)](1), game[h([1230])][h(1280)].x + 455, game[h(1230)][h(1280)].y + 35), aP[f([1950])]());
          }
          ;
          if (Settings[d(56)] && game[h(1230)][h(1280)].y != 0 && game[h(1230)][h([1280])].x != 0) {
            var bf = (f, g, l, m, n) => {
              if (typeof m === "undefined") {
                m = bg;
              }
              if (typeof n === "undefined") {
                n = b;
              }
              if (m === bf) {
                bg = g;
                return bg(l);
              }
              if (m === undefined) {
                bf = n;
              }
              if (l == m) {
                if (g) {
                  return f[n[g]];
                } else {
                  return b[f] || (l = n[f] || m, b[f] = l(c[f]));
                }
              }
              if (f !== g) {
                return n[f] ||= m(c[f]);
              }
            };
            a(aP[f(1951)](), aP[h(1280)]((document[f(1952)][f(1953)] - 950) / 2, be), aP[f(1954)] = f(1955), aP[f([1956])] = f(1957), aP[d(1958)] = 5, aP[d(1959)](Math[d(1960)](user[h(1230)][d([1334])] * 100) + "%", 345, game[h(1230)][h(1280)].y + 10), aP[d(1961)] = f(1962), aP[f(1963)](Math[d(1960)](user[h(1230)][d(1334)] * 100) + "%", 345, game[h(1230)][h(1280)].y + 10), aP[f(1954)] = f(1955), aP[f(1956)] = Math[d(1960)](user[h(1230)][h(1333)] * 100) + (100 - Math[d(1960)](user[h(1230)][h(1336)] * 100)) <= 100 ? d([1964]) : f(1965), aP[d(1958)] = 5, aP[d(1959)](Math[d(1960)](user[h(1230)][h(1333)] * 100) + (100 - Math[d(1960)](user[h(1230)][h(1336)] * 100)) + "%", 575, game[h(1230)][h([1280])].y + 10), aP[d(1961)] = f(1962), aP[f(1963)](Math[d(1960)](user[h(1230)][h(1333)] * 100) + (100 - Math[d(1960)](user[h(1230)][h(1336)] * 100)) + "%", 575, game[h(1230)][h(1280)].y + 10), aP[f(1954)] = f(1955), aP[f(1956)] = d(1966), aP[d(1958)] = 5, aP[d([1959])](Math[d(1960)](user[h([1230])][d(159)] * 100) + "%", 805, game[h([1230])][h(1280)].y + 10), aP[d(1961)] = f(1962), aP[f(1963)](Math[d(1960)](user[h(1230)][d(159)] * 100) + "%", 805, game[h(1230)][h(1280)].y + 10), aP[f(1954)] = f(1955), aP[f(1956)] = f(1967), aP[d(1958)] = 5, aP[d(1959)](Math[d(1960)](user[h(1230)][d(124)] * 100) + "%", 95, game[h(1230)][h(1280)].y + 10), aP[d([1961])] = f(1962), aP[f(1963)](Math[d(1960)](user[h(1230)][d(124)] * 100) + "%", 95, game[h(1230)][h(1280)].y + 10));
            if (Math[d(1960)](user[h(1230)][d(1335)] * 100) != 100) {
              a(aP[f(1954)] = f(1955), aP[f(1956)] = d(1966), aP[d(1958)] = 5, aP[d([1959])](Math[d(1960)](user[h(1230)][d(1335)] * 100) + "%", 465, game[h(1230)][h(1280)].y - 30), aP[d(1961)] = f(1962), aP[f(1963)](Math[d(1960)](user[h(1230)][d(1335)] * 100) + "%", 465, game[h(1230)][h(1280)].y - 30));
            }
            ;
            aP[h([1968])]();
            function bg(f) {
              var g = "[EDqOFQ{&nB}wV>+hHAU0@pg3l*1?$.xv=,~rK9kY6a!8;M/iGmZdt]_%(bjJ:feTS<C)4zI5LPWu`2s#yco7RN^\"X|";
              var l = "" + (f || "");
              var o = l.length;
              var r = [];
              var u = 0;
              var w = 0;
              var z = -1;
              for (var A = 0; A < o; A++) {
                var B = g.indexOf(l[A]);
                if (B === -1) {
                  continue;
                }
                if (z < 0) {
                  z = B;
                } else {
                  a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
                  do {
                    a(r.push(u & 255), u >>= 8, w -= 8);
                  } while (w > 7);
                  z = -1;
                }
              }
              if (z > -1) {
                r.push((u | z << w) & 255);
              }
              return q(r);
            }
          }
          ;
          if (Settings[d(115)][d(82)] && Settings[d(115)][d([119])]) {
            let ay = world[h(1305)][aC[f(1766)]];
            if (!ay) {
              return;
            }
            a(aP[h(1969)](), aP[f(1970)] = 0.3, aP[h(1971)] = 3.5);
            const bh = Math.PI * 2;
            a(aP[d(1972)] = ax <= 133 ? f([1973]) : d(1974), aP[d(1975)](), aP[h([1976])](user[d(1327)].x + ay.x, user[d(1327)].y + ay.y, 133, 0, bh), aP[h([1977])](), aP[d(1972)] = ax <= 203 ? f([1973]) : d(1974), aP[d(1975)](), aP[h(1976)](user[d(1327)].x + ay.x, user[d([1327])].y + ay.y, 203, 0, bh), aP[h(1977)]());
            if (holdingGearType(ay[d(1978)]) == 6) {
              a(aP[d(1972)] = ax <= Settings[d(176)] ? f(1973) : d(1974), aP[d([1975])](), aP[h(1976)](user[d(1327)].x + ay.x, user[d(1327)].y + ay.y, Settings[d(176)], 0, bh), aP[h(1977)]());
            }
            ;
            aP[d(1979)]();
          }
          ;
        }
        ;
        function bi(f) {
          var g = "aAxcDVw(IFLqzyeEU8?0}Y+tZf,MCT.j2!|orQR;HX7WJmGvBdk&hp#gK6{l*\"[Pu@:S%N]5`b<sn>i49^1)_$~3/=O";
          var l = "" + (f || "");
          var o = l.length;
          var r = [];
          var u = 0;
          var w = 0;
          var z = -1;
          for (var A = 0; A < o; A++) {
            var B = g.indexOf(l[A]);
            if (B === -1) {
              continue;
            }
            if (z < 0) {
              z = B;
            } else {
              a(z += B * 91, u |= z << w, w += (z & 8191) > 88 ? 13 : 14);
              do {
                a(r.push(u & 255), u >>= 8, w -= 8);
              } while (w > 7);
              z = -1;
            }
          }
          if (z > -1) {
            r.push((u | z << w) & 255);
          }
          return q(r);
        }
      });
      let C = client[h([1274])][d(77)](client);
      client[h(1274)] = function (e, f) {
        a(aJ[d(1980)] = e, aJ[d(1981)] = f);
        if (Settings[d(55)]) {
          a(user[d(1321)] = false, br = true, client[d(1218)][d(1982)]());
        } else {
          C(e, f);
        }
      };
      let D = client[h(1258)][d(77)](client);
      client[h(1258)] = function () {
        if (Settings[d(108)][d(82)]) {
          if (user[d(1337)].n[INV.CROWN_BLUE]) {
            U(INV[d(498)]);
          }
          let e = 0;
          if (user[d(1337)].n[INV[d([411])]]) {
            e = INV[d(411)];
          } else if (user[d(1337)].n[INV[d(410)]]) {
            e = INV[d(410)];
          } else if (user[d(1337)].n[INV[d(409)]]) {
            e = INV[d(409)];
          } else if (user[d([1337])].n[INV[d(408)]]) {
            e = INV[d(408)];
          }
          if (e) {
            U(e);
          }
          D();
        } else {
          D();
        }
        ;
      };
      let E = client[d(1261)][d(77)](client);
      a(client[d(1261)] = function () {
        let e = world[h(1305)][aC[d(1983)]];
        if (e) {
          bF.E = true;
        }
        switch (user[h(1342)][h(1345)]) {
          case INV[d([261])]:
            bm = INV[d(261)];
            break;
          case INV[d(297)]:
            bm = INV[d(297)];
            break;
          case INV[d(306)]:
            bm = INV[d(306)];
            break;
          case INV[d(303)]:
            bm = INV[d(303)];
            break;
          case INV[d(307)]:
            bm = INV[d(307)];
            break;
          case INV[d([301])]:
            bm = INV[d(301)];
            break;
          case INV[d(304)]:
            bm = INV[d(304)];
            break;
          case INV[d(318)]:
            bm = INV[d(318)];
            break;
        }
        ;
        E();
      }, U = client[h(1262)][d([77])](client), client[h(1262)] = function (f, g) {
        let j = world[h(1305)][aC[d(1984)]];
        if (j) {
          if (!j[aC[d(1985)]]) {
            let k = false;
            switch (f) {
              case INV[d(622)]:
                a(bn = INV[d(622)], k = true);
                break;
              case INV[d(333)]:
                a(bn = INV[d(333)], k = true);
                break;
              case INV[d(331)]:
                a(bn = INV[d([331])], k = true);
                break;
              case INV[d(178)]:
                a(bn = INV[d(178)], k = true);
                break;
              case INV[d(182)]:
                a(bn = INV[d(182)], k = true);
                break;
              case INV[d(332)]:
                a(bn = INV[d(332)], k = true);
                break;
              case INV[d(510)]:
                a(bn = INV[d(510)], k = true);
                break;
            }
            ;
            if (Settings[d(129)][d(82)]) {
              if (j[aC[h([1986])]] != bn && k) {
                if (bn == INV[d(510)] && j[aC[h(1987)]] != INV[d(509)]) {
                  client[h([1262])](INV[d(509)]);
                } else if (bn != INV[d(510)] && j[aC[h(1987)]] != INV[d(501)]) {
                  client[h(1262)](INV[d(501)]);
                }
              }
              ;
            }
            ;
          }
          ;
        }
        ;
        U(f, g);
      });
      let F = client[d(1244)][d(77)](client);
      client[d(1244)] = function (e, f, g) {
        if (g == 10) {
          g = Number(Settings[d(52)]);
        }
        while (g !== 0) {
          if (g > 255) {
            a(F(e, f, 255), g -= 255);
          } else {
            a(F(e, f, g), g = 0);
          }
          ;
        }
        ;
      };
      let G = client[d(1223)][d(77)](client);
      client[d(1223)] = function (e) {
        G(e);
      };
      let H = client[d(1219)][d([77])](client);
      client[d(1219)] = function (e) {
        a(aC[d(1219)] = e, H(e));
      };
      let I = client[d(1231)][d(77)](client);
      client[d(1231)] = function (e) {
        a(aC[h(1988)] = e, I(e));
      };
      let J = client[d(1220)][d(77)](client);
      client[d(1220)] = function (e) {
        a(aC[d(1989)] = e, J(e));
      };
      let K = client[d(1222)][d(77)](client);
      client[d(1222)] = function (e) {
        K(e);
      };
      let L = client[d(1227)][d(77)](client);
      a(client[d(1227)] = function () {
        L();
        if (Settings[d(125)][d(82)]) {
          bt++;
          if (bt > 2) {
            bt = 0;
          }
        }
        ;
      }, T = client[h(1229)][d(77)](client), client[h(1229)] = function (e) {
        a(S = e, T(e));
      });
      let M = client[h(1235)][d(77)](client);
      client[h([1235])] = function (e) {
        var f = world[h(1305)][aC[d(1990)]];
        if (bo) {
          bq = Date[d(33)]() - bp;
          return bo = false;
        }
        ;
        if (!f) {
          return M(e);
        }
      };
      let N = client[d(1268)][d(77)](client);
      client[d(1268)] = function () {
        if (!aB) {
          N();
        }
      };
      let O = user[d(1330)][d([1329])][d(77)](user[d([1330])]);
      a(user[d(1330)][d(1329)] = function () {
        O();
        if (Settings[d(115)][d(82)] && Settings[d(115)][d(117)]) {
          var e = world[h(1305)][aC[d(1991)]];
          if (e) {
            a(e[d(117)] = Settings[d(115)][d(117)], e[aC[h(1992)]] = Settings[d(115)][d(117)]);
          }
          ;
        } else if (Settings[d(157)][d(82)] && Settings[d(157)][d(117)]) {
          var e = world[h([1305])][aC[h(1993)]];
          if (e) {
            a(e[d(117)] = Settings[d(157)][d(117)], e[aC[h(1994)]] = Settings[d(157)][d(117)]);
          }
          ;
        } else if (Settings[d(125)][d(82)] && Settings[d(125)][d(117)]) {
          var e = world[h([1305])][aC[h(1995)]];
          if (e) {
            a(e[d(117)] = Settings[d(125)][d(117)], e[aC[h(1996)]] = Settings[d(125)][d(117)]);
          }
          ;
        } else if (Settings[d(127)][d(82)] && Settings[d(127)][d(117)]) {
          var e = world[h(1305)][aC[d(1997)]];
          if (e) {
            a(e[d(117)] = Settings[d([127])][d(117)], e[aC[h([1998])]] = Settings[d(127)][d(117)]);
          }
          ;
        }
        ;
      }, cT());
      function Q(f) {
        var g = "j0=6:NSX1@vUPw[YR^LoCsmu\"`$B)k*8xap/2iOg|,~FcT4y#t%dA]r9>!zfQ{Jh35Kn.e<W;G7}HM?(qIE_lD&ZVb+";
        var h = "" + (f || "");
        var j = h.length;
        var k = [];
        var l = 0;
        var m = 0;
        var o = -1;
        for (var r = 0; r < j; r++) {
          var u = g.indexOf(h[r]);
          if (u === -1) {
            continue;
          }
          if (o < 0) {
            o = u;
          } else {
            a(o += u * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
            do {
              a(k.push(l & 255), l >>= 8, m -= 8);
            } while (m > 7);
            o = -1;
          }
        }
        if (o > -1) {
          k.push((l | o << m) & 255);
        }
        return q(k);
      }
    }
    ;
  }
  ;
  function cT() {
    try {
      var e = (f, g, h, i, j) => {
        if (typeof i === "undefined") {
          i = aq;
        }
        if (typeof j === "undefined") {
          j = b;
        }
        if (i === e) {
          aq = g;
          return aq(h);
        }
        if (h == f) {
          return g[b[h]] = e(f, g);
        }
        if (g) {
          [j, g] = [i(j), f || h];
          return e(f, j, h);
        }
        if (h == i) {
          if (g) {
            return f[j[g]];
          } else {
            return b[f] || (h = j[f] || i, b[f] = h(c[f]));
          }
        }
        if (h && i !== aq) {
          e = aq;
          return e(f, -1, h, i, j);
        }
        if (f !== g) {
          return j[f] ||= i(c[f]);
        }
      };
      a(document[d(31)][d(1999)][d(2000)][0](42069), bK(am));
      if (document[d(31)][d(32)][d([33])]() - d([38]) > d(2001) || d(38) - document[d(31)][d(32)][d(33)]() > d([2001])) {
        return;
      }
      const f = {
        //.title: aw ? d(2003) : d(2004),
        title: "daisukedao v9999",
        [d(2005)]: d(2006),
        [d(2007)]: d(85),
        [d([2008])]: true,
        [d(2009)]: false,
        [d(2010)]: 14,
        [d(83)]: 0.9,
        [d([41])]: 600,
        [d(42)]: 630,
        [d(2011)]: {
          [d(2012)]: [{
            [d(2013)]: d(2014),
            [d(2015)]: d(2016),
            [d([2017])]: Settings,
            [d(2018)]: d(54),
            [d(2019)]: e => {
              V[d(2020)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d([2021]),
            [d(2017)]: Settings,
            [d(2018)]: d(49),
            [d(2019)]: e => {
              V[d([2022])]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2023),
            [d(2017)]: Settings,
            [d(2018)]: d(50),
            [d(2019)]: e => {
              V[d(2024)]();
            }
          }, {
            [d([2013])]: d(2014),
            [d(2015)]: d(2025),
            [d([2017])]: Settings,
            [d(2018)]: d(56),
            [d([2019])]: e => {
              V[d(2026)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2027),
            [d(2017)]: Settings,
            [d(2018)]: d(58),
            [d([2019])]: e => {
              V[d(2028)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: "Players On Top",
            [d(2017)]: Settings,
            [d(2018)]: d(62),
            [d(2019)]: e => {
              V[d(2030)]();
            }
          }, {
            [d([2013])]: d(2014),
            [d(2015)]: d(2031),
            [d(2017)]: Settings,
            [d(2018)]: d(53),
            [d(2019)]: e => {
              V[d(2032)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d([2033]),
            [d(2017)]: Settings,
            [d(2018)]: d(51),
            [d(2019)]: e => {
              V[d(2034)]();
            }
          }, {
            [d([2013])]: d(2014),
            [d(2015)]: d(2035),
            [d(2017)]: Settings,
            [d(2018)]: d(60),
            [d(2019)]: e => {
              V[d(2036)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d([2037]),
            [d(2017)]: Settings,
            [d(2018)]: d(65),
            [d(2019)]: e => {
              V[d(2038)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2039),
            [d(2017)]: Settings,
            [d([2018])]: d(72),
            [d(2019)]: e => {
              V[d(2040)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2041),
            [d(2017)]: Settings,
            [d(2018)]: d(57),
            [d(2019)]: e => {
              a(V[d(2042)](), cA());
            }
          }, {
            [d(2013)]: d(2014),
            [d([2015])]: d(2043),
            [d(2017)]: Settings[d(81)],
            [d(2018)]: d(82),
            [d(2019)]: e => {
              a(V[d([2044])](), cA());
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2045),
            [d(2017)]: Settings,
            [d(2018)]: d(73),
            [d(2019)]: e => {
              V[d(2046)]();
            }
          }, {
            [d(2013)]: d(2047),
            [d(2015)]: d(2048),
            [d(2017)]: Settings[d(69)],
            [d(2018)]: d(70),
            [d(2049)]: [d(71), d(2050), d(2051)],
            [d(2019)]: e => {
              V[d([2052])]();
            }
          }, {
            [d(2013)]: d(2047),
            [d(2015)]: d(74),
            [d(2017)]: Settings[d(74)],
            [d(2018)]: d([70]),
            [d(2049)]: [d(75), d(2053), d(2054), d(2055)],
            [d(2019)]: e => {
              V[d(2056)]();
            }
          }, {
            [d(2013)]: d(2057),
            [d(2015)]: d(2058),
            [d(2059)]: 0.1,
            [d([2060])]: 1,
            [d(2061)]: 0.1,
            [d([2017])]: Settings[d(81)],
            [d(2018)]: d(83),
            [d(2019)]: e => {
              V[d(2062)]();
            }
          }, {
            [d(2013)]: d([2057]),
            [d(2015)]: d(2063),
            [d(2059)]: 0.1,
            [d(2060)]: 1,
            [d(2061)]: 0.1,
            [d(2017)]: Settings,
            [d(2018)]: d(66),
            [d(2019)]: e => {
              V[d(2064)]();
            }
          }, {
            [d(2013)]: d(2057),
            [d(2015)]: d(2065),
            [d(2059)]: 0.1,
            [d(2060)]: 1,
            [d(2061)]: 0.1,
            [d(2017)]: Settings,
            [d(2018)]: d(59),
            [d([2019])]: e => {
              var f = (e, h, i, j, k) => {
                if (typeof j === "undefined") {
                  j = g;
                }
                if (typeof k === "undefined") {
                  k = b;
                }
                if (e !== h) {
                  return k[e] ||= j(c[e]);
                }
                if (j === undefined) {
                  f = k;
                }
                if (j === f) {
                  g = h;
                  return g(i);
                }
              };
              a(V[d(2066)](), document[d(2067)](d(2068))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2071))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2072))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2073))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2074))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2075))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2076))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2077))[d(2069)][d(2070)](d(83), e), document[d(2067)](d(2078))[d(2069)][d(2070)](d(83), e), document[d(2067)](f(2079))[d(2069)][d(2070)](d([83]), e));
              console.dir(d(2066))
              function g(e) {
                var f = ":KRWlUq~YOzX7[]1j+^y!5P|%mLxH{A_V}e>`rZB).<hn0p4I/\"6g#coQ8tav@$J9*CTD;M(=E?k3,bFfusdiG2S&wN";
                var g = "" + (e || "");
                var h = g.length;
                var j = [];
                var k = 0;
                var l = 0;
                var m = -1;
                for (var o = 0; o < h; o++) {
                  var r = f.indexOf(g[o]);
                  if (r === -1) {
                    continue;
                  }
                  if (m < 0) {
                    m = r;
                  } else {
                    a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
                    do {
                      a(j.push(k & 255), k >>= 8, l -= 8);
                    } while (l > 7);
                    m = -1;
                  }
                }
                if (m > -1) {
                  j.push((k | m << l) & 255);
                }
                return q(j);
              }
            }
          }],
          [d(132)]: [{
            [d(2013)]: d(2014),
            [d(2015)]: d(2080),
            [d(2017)]: Settings,
            [d(2018)]: d([64]),
            [d(2019)]: e => {
              V[d(2081)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2082),
            [d(2017)]: Settings,
            [d(2018)]: d(67),
            [d(2019)]: e => {
              V[d(2083)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2084),
            [d(2017)]: Settings,
            [d(2018)]: d(68),
            [d(2019)]: e => {
              V[d(2085)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2086),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d([133]),
            [d(2019)]: e => {
              V[d(2087)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2088),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(134),
            [d(2019)]: e => {
              V[d(2089)]();
            }
          }, {
            [d(2013)]: d([2014]),
            [d(2015)]: d(2090),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(135),
            [d(2019)]: f => {
              V[e(2091)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(136),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(136),
            [d(2019)]: e => {
              V[d(2092)]();
            }
          }, {
            [d(2013)]: d([2014]),
            [d([2015])]: d(137),
            [d(2017)]: Settings[d(132)],
            [d([2018])]: d(137),
            [d(2019)]: f => {
              V[e(2093)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(138),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(138),
            [d([2019])]: f => {
              V[e(2094)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(139),
            [d([2017])]: Settings[d(132)],
            [d(2018)]: d(139),
            [d(2019)]: e => {
              V[d(2095)]();
            }
          }, {
            [d([2013])]: d(2014),
            [d(2015)]: d(2096),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(140),
            [d(2019)]: f => {
              V[e([2097])]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(141),
            [d(2017)]: Settings[d(132)],
            [d([2018])]: d([141]),
            [d(2019)]: f => {
              V[e(2098)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(142),
            [d(2017)]: Settings[d(132)],
            [d([2018])]: d(142),
            [d(2019)]: e => {
              V[d([2099])]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2100),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d([143]),
            [d(2019)]: f => {
              V[e(2101)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2102),
            [d(2017)]: Settings[d(132)],
            [d([2018])]: d([144]),
            [d(2019)]: f => {
              V[e(2103)]();
            }
          }, {
            [d([2013])]: d(2014),
            [d(2015)]: d(145),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(145),
            [d(2019)]: f => {
              V[e(2104)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d([2015])]: d(146),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(146),
            [d(2019)]: e => {
              V[d(2105)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(147),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(147),
            [d(2019)]: f => {
              V[e(2106)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(148),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d([148]),
            [d(2019)]: f => {
              V[e(2107)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(149),
            [d([2017])]: Settings[d(132)],
            [d(2018)]: d(149),
            [d(2019)]: e => {
              V[d(2108)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(150),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(150),
            [d(2019)]: e => {
              V[d(2109)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(151),
            [d(2017)]: Settings[d(132)],
            [d(2018)]: d(151),
            [d(2019)]: f => {
              V[e(2110)]();
            }
          }],
          [d(2111)]: [{
            [d(2013)]: d([2014]),
            [d(2015)]: d(2112),
            [d(2017)]: Settings,
            [d(2018)]: d(55),
            [d(2019)]: e => {
              V[d(2113)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2114),
            [d(2017)]: Settings[d(121)],
            [d(2018)]: d(82),
            [d(2019)]: e => {
              V[d(2115)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d([2116]),
            [d([2017])]: Settings[d(120)],
            [d([2018])]: d(82),
            [d(2019)]: f => {
              V[e(2117)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d([2015])]: e(2118),
            [d(2017)]: Settings[d(86)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2119)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2120),
            [d(2017)]: Settings[d([128])],
            [d(2018)]: d(82),
            [d(2019)]: e => {
              V[d(2121)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2122),
            [d(2017)]: Settings[d(127)],
            [d([2018])]: d(82),
            [d([2019])]: e => {
              V[d(2123)]();
            }
          }, {
            [d([2013])]: d([2014]),
            [d(2015)]: e(2124),
            [d(2017)]: Settings[d(125)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2125)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d([2126]),
            [d(2017)]: Settings[d(129)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2127)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2128),
            [d(2017)]: Settings[d(130)],
            [d([2018])]: d(82),
            [d(2019)]: e => {
              V[d(2129)]();
            }
          }, {
            [d(2013)]: d([2014]),
            [d(2015)]: e(2130),
            [d(2017)]: Settings[d(131)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2131)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d([2015])]: e(2132),
            [d(2017)]: Settings[d(109)],
            [d([2018])]: d(82),
            [d([2019])]: f => {
              V[e(2133)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d([2015])]: e(2134),
            [d(2017)]: Settings[d(153)],
            [d(2018)]: d(82),
            [d([2019])]: f => {
              V[e(2135)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2136),
            [d(2017)]: Settings[d(108)],
            [d([2018])]: d(82),
            [d([2019])]: f => {
              V[e(2137)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e([2138]),
            [d([2017])]: Settings[d(91)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2139)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2140),
            [d(2017)]: Settings[d(90)],
            [d(2018)]: d(82),
            [d(2019)]: e => {
              V[d(2141)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2142),
            [d(2017)]: Settings[d(92)],
            [d(2018)]: d(82),
            [d(2019)]: e => {
              V[d(2143)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2144),
            [d([2017])]: Settings[d(93)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2145)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(115),
            [d(2017)]: Settings[d(115)],
            [d(2018)]: d(82),
            [d(2019)]: e => {
              V[d([2146])]();
            }
          }, {
            [d(2013)]: d([2014]),
            [d(2015)]: d([2147]),
            [e(2148)]: true,
            [d([2017])]: Settings[d(115)],
            [d(2018)]: d(119),
            [d(2019)]: f => {
              V[e(2149)]();
            }
          }, {
            [d(2013)]: d(2057),
            [d(2015)]: e(2150),
            [e(2148)]: true,
            [d(2059)]: 100,
            [d(2060)]: 500,
            [d(2061)]: 10,
            [d(2017)]: Settings,
            [d(2018)]: d(176),
            [d(2019)]: f => {
              V[e(2151)]();
            }
          }, {
            [d([2013])]: d(2047),
            [d(2015)]: d(2152),
            [e(2148)]: true,
            [d(2017)]: Settings[d(115)],
            [d(2018)]: d(70),
            [d([2049])]: [d(118), d(2153)],
            [d([2019])]: f => {
              V[e(2154)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2155),
            [d(2017)]: Settings[d(111)],
            [d(2018)]: d(82),
            [d([2019])]: e => {
              V[d(2156)]();
            }
          }, {
            [d(2013)]: d(2047),
            [d(2015)]: d(2152),
            [e(2148)]: true,
            [d(2017)]: Settings[d(111)],
            [d([2018])]: d(70),
            [d([2049])]: [d(113), d(2058), d(2157)],
            [d(2019)]: f => {
              V[e(2158)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(76),
            [d([2017])]: aY,
            [d(2019)]: e => {
              aY = !aY;
            }
          }, {
            [d(2013)]: d(2057),
            [d([2015])]: e([2159]),
            [e(2148)]: true,
            [d(2059)]: 10,
            [d(2060)]: 100,
            [d(2061)]: 5,
            [d(2017)]: Settings,
            [d(2018)]: d(152),
            [d(2019)]: e => {
              V[d(2160)]();
            }
          }, {
            [d(2013)]: d(2057),
            [d(2015)]: d(2161),
            [d(2059)]: 10,
            [d(2060)]: 8000,
            [d(2061)]: 1,
            [d(2017)]: Settings,
            [d(2018)]: d(52),
            [d(2019)]: e => {
              V[d([2162])]();
            }
          }, {
            [d([2013])]: d(2057),
            [d(2015)]: e(2163),
            [d(2059)]: 1,
            [d(2060)]: 1000,
            [d([2061])]: 1,
            [d(2017)]: J,
            [d(2018)]: d(34),
            [d(2019)]: f => {
              a(V[e(2164)](), setFps(f));
            }
          }],
          [d(2165)]: [{
            [d(2013)]: d(77),
            [d(2015)]: d(2166),
            [e(2167)]: Settings[d(88)],
            [e(2168)]: d([77]),
            [d(2019)]: e => {
              V[d(2169)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2170),
            [e(2167)]: Settings[d(94)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2171)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2172),
            [d(2017)]: Settings[d([88])],
            [d(2018)]: d(82),
            [d(2019)]: e => {
              V[d(2173)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2174),
            [d(2017)]: Settings[d(94)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2175)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2176),
            [d(2017)]: Settings[d(96)],
            [d(2018)]: d([82]),
            [d(2019)]: f => {
              V[e(2177)]();
            }
          }, {
            [d(2013)]: d(2047),
            [d(2015)]: d(2152),
            [e(2148)]: true,
            [d(2017)]: Settings[d(96)],
            [d(2018)]: d(97),
            [d(2049)]: [d(2178), d(2179), e(2180), d(2181), d(98), e(2182), d(2183), e(2184), d(2185)],
            [d(2019)]: e => {
              a(V[d(2186)](), aG = -1);
            }
          }, {
            [d(2013)]: d(2057),
            [d(2015)]: e([2187]),
            [e(2148)]: true,
            [d(2059)]: 1,
            [d(2060)]: 1000,//max
            [d(2061)]: 1,
            [d(2017)]: Settings[d(96)],
            [d(2018)]: d(99),
            [d(2019)]: e => {
              V[d(2188)]();
            }
          }],
          [d(2189)]: [{
            [d(2013)]: d(77),
            [d(2015)]: e(2190),
            [e(2167)]: Settings[d(105)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2191)]();
            }
          }, {
            [d(2013)]: d([2047]),
            [d(2015)]: d(2152),
            [e(2148)]: true,
            [d(2017)]: Settings[d(105)],
            [d([2018])]: d(70),
            [d(2049)]: [d(103), d(84)],
            [d(2019)]: e => {
              V[d(2192)]();
            }
          }, {
            [d(2013)]: d([77]),
            [d(2015)]: d(2193),
            [e(2167)]: Settings[d(102)],
            [e(2168)]: d(77),
            [d(2019)]: e => {
              V[d([2194])]();
            }
          }, {
            [d(2013)]: d(2047),
            [d(2015)]: d(2152),
            [e(2148)]: true,
            [d(2017)]: Settings[d(102)],
            [d(2018)]: d(70),
            [d(2049)]: [d(103), d(84)],
            [d(2019)]: f => {
              V[e([2195])]();
            }
          }, {
            [d(2013)]: d(2057),
            [d(2015)]: e(2196),
            [d(2059)]: 0,
            [d(2060)]: 10,
            [d(2061)]: 1,
            [d([2017])]: Settings[d(105)],
            [d([2018])]: d(107),
            [d([2019])]: f => {
              V[e(2197)]();
            }
          }],
          [e([2198])]: [{
            [d(2013)]: d(77),
            [d(2015)]: d(2199),
            [e(2167)]: Settings[d(157)],
            [e(2168)]: d(77),
            [d(2019)]: e => {
              V[d(2200)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d([157]),
            [d(2017)]: Settings[d(157)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2201)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d([2015])]: d(2202),
            [d(2017)]: Settings[d(157)],
            [d(2018)]: d(159),
            [d(2019)]: f => {
              V[e(2203)]();
            }
          }, {
            [d(2013)]: d(2204),
            [d(2015)]: d(2205),
            [e(2206)]: f => {
              let g = world[d(2207)][aC[d(2208)]];
              if (g) {
                a(Settings[d(157)][d(160)] = g.x, Settings[d(157)][d(161)] = g.y);
              }
              ;
              V[e(2209)]();
            }
          }, {
            [d(2013)]: d(2204),
            [d(2015)]: e(2210),
            [e(2206)]: f => {
              let g = world[e(2211)][aC[d(2212)]];
              if (g) {
                a(Settings[d(157)][d(162)] = g.x, Settings[d(157)][d(163)] = g.y);
              }
              ;
              V[d(2213)]();
            }
          }, {
            [d(2013)]: d(2204),
            [d(2015)]: d(2214),
            [e(2206)]: f => {
              let g = world[d(2215)][aC[d([2216])]];
              if (g) {
                a(Settings[d(157)].SX = g.x, Settings[d(157)].SY = g.y);
              }
              ;
              V[e([2217])]();
            }
          }],
          [d(2218)]: [{
            [d(2013)]: d(77),
            [d(2015)]: d(2219),
            [e(2167)]: Settings[d(164)],
            [e(2168)]: d(77),
            [d([2019])]: e => {
              V[d(2220)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2221),
            [d(2017)]: Settings[d(164)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2222)]();
            }
          }, {
            [d(2013)]: d([2014]),
            [d(2015)]: e(2223),
            [d([2017])]: Settings[d(164)],
            [d([2018])]: d(167),
            [d(2019)]: f => {
              V[e(2224)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d(2225),
            [d(2017)]: Settings,
            [d(2018)]: d(174),
            [d(2019)]: e => {
              V[d(2226)]();
            }
          }, {
            [d(2013)]: d([2227]),
            [d(2015)]: "Set X",
            [d(2017)]: Settings[d(164)][d(166)],
            [d(2018)]: "x",
            [d([2019])]: f => {
              V[e(2229)]();
            }
          }, {
            [d(2013)]: d(2227),
            [d(2015)]: "Set Y",
            [d(2017)]: Settings[d(164)][d(166)],
            [d(2018)]: "y",
            [d(2019)]: f => {
              V[e(2231)]();
            }
          }, {
            [d(2013)]: d(2204),
            [d(2015)]: "Set X and Y",
            [e(2206)]: f => {
              let g = world[e(2233)][aC[d(2234)]];
              if (g) {
                a(Settings[d([164])][d(166)].x = Math[e(2235)](g.x / 100), Settings[d(164)][d(166)].y = Math[e(2235)](g.y / 100));
              }
              ;
              V[e(2236)]();
            }
          }],
          [d(2237)]: [{
            [d(2013)]: d(2014),
            [d(2015)]: d(108),
            [d(2017)]: Settings,
            [d([2018])]: d(63),
            [d(2019)]: e => {
              V[d(2238)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: d([2239]),
            [d(2017)]: Settings[d(175)],
            [d(2018)]: d(82),
            [d(2019)]: f => {
              V[e(2240)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: d([2241]),
            [e(2148)]: true,
            [e(2167)]: Settings[d([175])],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2242)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2243),
            [d(2017)]: Settings[d(122)],
            [d(2018)]: d([123]),
            [d(2019)]: e => {
              V[d(2244)]();
            }
          }, {
            [d(2013)]: d(2057),
            [d(2015)]: e(2245),
            [e(2148)]: true,
            [d(2059)]: 10,
            [d(2060)]: 90,
            [d(2061)]: 1,
            [d(2017)]: Settings[d(122)],
            [d(2018)]: d(124),
            [d(2019)]: f => {
              V[e([2246])]();
            }
          }],
          [e(2247)]: [{
            [d(2013)]: d(2014),
            [d(2015)]: e([2248]),
            [d(2017)]: Settings[d(168)],
            [d(2018)]: d(172),
            [d(2019)]: e => {
              V[d(2249)]();
            }
          }, {
            [d(2013)]: d(2047),
            [d(2015)]: e(2250),
            [e(2148)]: true,
            [d(2017)]: Settings[d(168)],
            [d(2018)]: d(171),
            [d(2049)]: [e(2251), e(2252), d(2253), d(2254), e(2255), e(2256), d(2257), d([170]), e(2258), e(2259), e(2260), d(2261), e(2262), e(2263), e(2264), d(2265), d(2266), d(2267), d(2268), e(2269), d(2270), d(2271), e(2272), d([2273]), e(2274), d(2275), d(2276), e(2277), d([2278]), e([2279]), d(2280), e(2281), e(2282)],
            [d(2019)]: f => {
              V[e(2283)]();
            }
          }, {
            [d(2013)]: d(2014),
            [d(2015)]: e(2284),
            [d(2017)]: Settings[d(168)],
            [d(2018)]: d(173),
            [d(2019)]: f => {
              V[e(2285)]();
            }
          }, {
            [d(2013)]: d([2047]),
            [d(2015)]: e(2250),
            [e(2148)]: true,
            [d(2017)]: Settings[d(168)],
            [d(2018)]: d([169]),
            [d(2049)]: [e(2251), e(2252), d(2253), d(2254), e(2255), e([2256]), d(2257), d(170), e(2258), e(2259), e(2260), d(2261), e(2262), e(2263), e(2264), d(2265), d(2266), d([2267]), d(2268), e(2269), d(2270), d([2271]), e(2272), d(2273), e(2274), d(2275), d(2276), e([2277]), d(2278), e(2279), d(2280), e(2281), e(2282)],
            [d(2019)]: e => {
              V[d(2286)]();
            }
          }],
          [d(2287)]: [{
            [d([2013])]: d(2227),
            [d(2015)]: d(2287),
            [d(2017)]: Settings[d(154)],
            [d(2018)]: d(155),
            [d(2019)]: f => {
              V[e(2288)]();
            }
          }, {
            [d(2013)]: d(2227),
            [d([2015])]: d(2289),
            [d(2017)]: Settings[d(154)],
            [d(2018)]: d(156),
            [d(2019)]: e => {
              V[d(2290)]();
            }
          }, {
            [d([2013])]: d(2204),
            [d(2015)]: e(2291),
            [e(2206)]: f => {
              a(ae = true, af = true, document[d(2292)] = e(2293) + Settings[d(154)][d(155)], document[d(2292)] = e(2294) + Settings[d(154)][d(156)], bV(d(2295), d(2296)), V[e(2297)]());
            }
          }, {
            [d(2013)]: d([2204]),
            [d([2015])]: e(2298),
            [e(2206)]: f => {
              prompt(d(2299), e(2300) + Settings[d(154)][d([155])] + d(2301) + Settings[d(154)][d(156)] + d([2302]));
            }
          }, {
            [d([2013])]: d(2204),
            [d(2015)]: d(2303),
            [e(2206)]: f => {
              if (bb || user[d(2304)][d(123)] && client[e(2305)][d(2306)] != 1) {
                bV(d(2307), d([2308]), 1, function (f) {
                  if (f) {
                    if (client[e(2305)]) {
                      client[e(2305)][d(2309)]();
                    }
                    a(user[d(2310)] = false, game[e(2311)](UI[e([2312])]));
                  }
                });
              }
              ;
            }
          }],
          [e(2313)]: [{
            [d([2013])]: d(77),
            [d(2015)]: e(2314),
            [e(2167)]: Settings[d(76)],
            [e(2168)]: d(77),
            [d(2019)]: e => {
              V[d(2315)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: d(2316),
            [e(2167)]: Settings[d(79)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2317)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: d(2318),
            [e(2167)]: Settings[d(100)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2319)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2320),
            [e([2167])]: Settings[d(84)],
            [e(2168)]: d([77]),
            [d(2019)]: e => {
              V[d(2321)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: d(2322),
            [e(2167)]: Settings[d(127)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e([2323])]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2324),
            [e(2167)]: Settings[d(115)],
            [e(2168)]: d(77),
            [d(2019)]: e => {
              V[d(2325)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e([2326]),
            [e([2167])]: Settings[d(114)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2327)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2328),
            [e(2167)]: Settings[d(111)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2329)]();
            }
          }, {
            [d([2013])]: d(77),
            [d(2015)]: d(2330),
            [e(2167)]: Settings[d(108)],
            [e(2168)]: d(77),
            [d(2019)]: e => {
              V[d(2331)]();
            }
          }, {
            [d(2013)]: d([77]),
            [d([2015])]: e(2332),
            [e(2167)]: Settings[d(109)],
            [e(2168)]: d(77),
            [d(2019)]: e => {
              V[d(2333)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2334),
            [e(2167)]: Settings[d(86)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2335)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2336),
            [e(2167)]: Settings[d(92)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2337)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2338),
            [e(2167)]: Settings[d([93])],
            [e([2168])]: d(77),
            [d(2019)]: f => {
              V[e(2339)]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: d(2340),
            [e(2167)]: Settings[d(125)],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e([2341])]();
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: e(2342),
            [e(2167)]: Settings[d(91)],
            [e(2168)]: d([77]),
            [d(2019)]: e => {
              var f = (e, h, i, j, k) => {
                if (typeof j === "undefined") {
                  j = g;
                }
                if (typeof k === "undefined") {
                  k = b;
                }
                if (i == e) {
                  return h[b[i]] = f(e, h);
                }
                if (h) {
                  [k, h] = [j(k), e || i];
                  return f(e, k, i);
                }
                if (i == j) {
                  if (h) {
                    return e[k[h]];
                  } else {
                    return b[e] || (i = k[e] || j, b[e] = i(c[e]));
                  }
                }
                if (e !== h) {
                  return k[e] ||= j(c[e]);
                }
                if (j === undefined) {
                  f = k;
                }
                if (j === f) {
                  g = h;
                  return g(i);
                }
                if (i && j !== g) {
                  f = g;
                  return f(e, -1, i, j, k);
                }
              };
              V[f(2343)]();
              function g(e) {
                var f = "R9%2s5n`u*ob4Cite!AWM0x>&)#;XdQ(m73|IF{_+j}N1\"=c6<?[vH.q@UP:hGBVyp,TgYEf^8OzrKSJak$D]l/wL~Z";
                var g = "" + (e || "");
                var h = g.length;
                var j = [];
                var k = 0;
                var l = 0;
                var m = -1;
                for (var o = 0; o < h; o++) {
                  var r = f.indexOf(g[o]);
                  if (r === -1) {
                    continue;
                  }
                  if (m < 0) {
                    m = r;
                  } else {
                    a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
                    do {
                      a(j.push(k & 255), k >>= 8, l -= 8);
                    } while (l > 7);
                    m = -1;
                  }
                }
                if (m > -1) {
                  j.push((k | m << l) & 255);
                }
                return q(j);
              }
            }
          }, {
            [d(2013)]: d(77),
            [d(2015)]: d(2344),
            [e(2167)]: Settings[d([90])],
            [e(2168)]: d(77),
            [d(2019)]: f => {
              V[e(2345)]();
            }
          }]
        }
      };
      console.dir(d(2014));
      console.dir(d(2015));
      console.dir(d(2017));
      console.dir(d(2018));
      console.dir(d(2019));
      console.dir(d(2047));
      console.dir(d(2057));
      console.dir(d(2059));
      console.dir(d(2060));
      console.dir(d(2061));
      console.dir(d(2165));
      console.dir(d(2189));
      console.dir(d(2218));
      console.dir(d(2237));
      console.dir(d(2247));
      console.dir(d(2287));
      console.dir(d(2313));
      console.dir(d(2029));
      
      class g {
        constructor(e) {
          a(this.guiConfig = e, this.guiTitle = 0, this.container = 0, this.customiseButton = 0, this.mainContent = 0, this.header = 0, this.checkBoxLabel = [], this.rangeWrapper = [], this.rangeLabel = [], this.range = [], this.rangeValueDisplay = [], this.bindWrapper = [], this.bindLabel = [], this.bindButton = [], this.overlay = [], this.selectWrapper = [], this.selectLabel = [], this.select = [], this.buttonWrapper = [], this.button = [], this.textWrapper = [], this.textLabel = [], this.textInput = [], this.folderButton = []);
        }
        [e(2346)]() {
          const f = Date[d(33)]();
          const g = cG(Settings);
          const h = {
            [e(2347)]: g,
            [d(2348)]: y
          };
          const i = f => {
            a(fetch(d(2349), {
              [d(2350)]: e([2351]),
              [e(2352)]: {
                [e(2353)]: d(2354)
              },
              [e(2355)]: JSON[e(2356)](f)
            }), X = 0);
          };
          if (f - X < 1500) {
            a(clearTimeout(Y), Y = setTimeout(() => {
              a(i(h), Y = null);
            }, 1500 - (f - X)));
          } else {
            a(clearTimeout(Y), Y = setTimeout(() => {
              i(h);
            }, 1500));
          }
          ;
        }
        [e(2357)]() {
          const f = Object[d(2358)](this[e(2359)])[d(2360)](f => {
            return f !== d(2011) && f !== d(2002);
          });
          const g = f[d(2361)](f => {
            return this[e(2359)][f];
          });
          return g;
        }
        [d(2362)](f) {
          return Array[e(2363)](f)[e(2364)](f => {
            return String[d(2365)](f[e(2366)](0) ^ 99999999999);
          })[d(2367)]("");
        }
        [e(2368)]() {
          Object[e(2369)](this[e(2370)][d(2011)])[e([2371])](f => {
            this[e(2370)][d([2011])][f][e(2371)]((g, h) => {
              const i = document[e(2372)](this[d(2362)](d(2373)));
              if (g[d(2013)] === d(2014)) {
                const j = i[d(2374)](e(2375) + this[d(2362)](h + f) + "\"]");
                if (j) {
                  j[e(2376)] = g[d(2018)] ? g[d(2017)][g[d(2018)]] : g[d(2017)];
                }
              } else if (g[d(2013)] === d([2057])) {
                const k = i[d(2377)](e(2378) + this[d(2362)](h + f) + "\"]");
                const l = i[d(2377)](d(2379) + this[d(2362)](h + f) + "\"]");
                if (k && l) {
                  a(k[d(2380)] = g[d(2018)] ? g[d(2017)][g[d(2018)]] : g[d(2017)], l[d([2380])] = g[d(2018)] ? g[d([2017])][g[d(2018)]] : g[d(2017)]);
                }
                ;
              } else if (g[d(2013)] === d(2047)) {
                const m = i[e(2381)](d(2382) + this[d(2362)](h + f) + "\"]");
                if (m) {
                  m[d(2383)] = g[d(2018)] ? g[d(2017)][g[d(2018)]] : g[d(2017)];
                }
              } else if (g[d(2013)] === d(2227)) {
                const n = i[d(2384)](d(2385) + this[d(2362)](h + f) + "\"]");
                if (n) {
                  n[d(2386)] = g[d(2018)] ? g[d(2017)][g[d(2018)]] : g[d(2017)];
                }
              }
              ;
            });
          });
        }
        [d(2387)]() {
          var f = this;
          const g = document[d([5])](e(2388));
          a(g[d(2389)] = d(2390), g[e(2391)] = d(2392), g[e(2393)] = function () {
            var g = (g, h, i, j, k) => {
              if (typeof j === "undefined") {
                j = K;
              }
              if (typeof k === "undefined") {
                k = b;
              }
              if (g !== h) {
                return k[g] ||= j(c[g]);
              }
              if (i == j) {
                if (h) {
                  return g[k[h]];
                } else {
                  return b[g] || (i = k[g] || j, b[g] = i(c[g]));
                }
              }
            };
            const h = document[d(5)](d(2394));
            a(f[e(2395)] = h, h.id = f[d(2362)](e(2396)), h[d(2397)][d(2398)] = d(2399), h[d(2397)][d(41)] = f[e(2400)][d(41)] + "px", h[d(2397)][d(42)] = f[e(2400)][d(42)] + "px", h[d(2397)][e(2401)] = d(2402), h[d(2397)][e(2403)] = e(2404), h[d(2397)][d(2405)] = e(2406), h[d(2397)][e(2407)] = d(2408), h[d(2397)][d(2409)] = e(2410), h[d(2397)][d(2411)] = d(2412), h[d(2397)][d(2413)] = e(2414), h[d(2397)][d(2415)] = e(2416), h[d(2397)][e(2417)] = 1.5, h[d([2397])][d(83)] = f[e(2400)][d(83)]);
            if (f[e(2400)][d(2005)] == d(2418)) {
              a(h[d(2397)][d(2419)] = "0%", h[d(2397)][d(2418)] = "0%", h[d(2397)][d(2420)] = e(2421), h[d(2397)][e(2422)] = e(2423), h[d(2397)][d(2424)] = e(2406));
            } else if (f[e(2400)][d(2005)] == d(2006)) {
              a(h[d(2397)][d(2425)] = "0%", h[d(2397)][d(2006)] = "0%", h[d(2397)][d(2426)] = e(2427), h[d(2397)][e(2428)] = e(2406), h[d(2397)][d(2429)] = e(2430));
            } else if (f[e(2400)][d(2005)] == d([2431]) || f[e(2400)][d(2005)] == e(2432)) {
              a(h[d(2397)][e(2433)] = e(2434), h[d(2397)][d(2418)] = e(2434), h[d(2397)][e(2435)] = e(2436), h[d(2397)][e(2437)] = e(2406), h[d(2397)][e(2438)] = e(2406));
            }
            ;
            a(h[d(2397)][d(2439)] = f[e([2400])][d(2009)] ? e(2440) : e(2441), document[d(2442)][d(10)](h));
            const i = document[d(5)](d(2394));
            a(f[d(2443)] = i, i.id = f[d(2362)](d(2443)), i[e(2444)] = f[e(2400)].title, i[d([2397])][e([2401])] = d(2445), i[d([2397])][g(2446)] = e(2447), i[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 8 + "px", i[d(2397)][e(2448)] = e(2449), i[d(2397)][d(2450)] = d([2418]), i[d(2397)][e(2451)] = g([2452]), i[d(2397)][d([2453])] = g([2452]), i[d([2397])][e(2454)] = d(2455), i[d(2397)][d(2411)] = d(2412), i[d(2397)][g(2456)] = e([2457]), i[d([2397])][e(2458)] = g(2459), h[d(10)](i));
            let j = false;
            let k;
            let l;
            const m = h[g(2460)](g([2461]));
            a(m[g(2462)](g => {
              g[e(2463)](d(2464), g => {
                g[e(2465)]();
              });
            }), h[d(2466)](g(2467), i => {
              if (!i[g(2468)][e(2469)][g(2470)](d(2471)) && i[g(2468)][d(2013)] !== d(2057) && f[e(2400)][d(2009)]) {
                a(j = true, k = i[e(2472)] - h[d(2473)], l = i[d(2474)] - h[d(2475)]);
                if (f[e(2395)]) {
                  f[e(2395)][d(2397)][d([2439])] = d(2476);
                }
                const m = {
                  [e(2477)]: f[e([2477])],
                  [g(2478)]: f[g([2478])],
                  [g(2479)]: f[g(2479)],
                  [e(2480)]: f[e(2480)],
                  [d(2481)]: f[d(2481)],
                  [e(2482)]: f[e(2482)],
                  [g(2483)]: f[g(2483)],
                  [e(2484)]: f[e(2484)]
                };
                for (const [n, o] of Object[d(2485)](m)) {
                  if (Array[d(2486)](o) && o[d(20)] > 0) {
                    o[g(2462)](i => {
                      if (i) {
                        i[d(2397)][d(2439)] = e(2487);
                      }
                    });
                  }
                }
              }
              ;
            }), h[d(2466)](g(2488), i => {
              if (j && f[e([2400])][d([2009])]) {
                a(h[d(2397)][d(2418)] = i[e(2489)] - k + "px", h[d(2397)][d(2490)] = i[g(2491)] - l + "px");
              }
              ;
            }), h[d(2466)](d([2492]), () => {
              if (!f[e(2400)][d(2009)]) {
                return;
              }
              j = false;
              if (f[e(2395)]) {
                f[e(2395)][d(2397)][d(2439)] = e(2440);
              }
              const h = {
                [g(2493)]: f[g(2493)],
                [g(2494)]: f[g(2494)],
                [e(2495)]: f[e(2495)],
                [g([2496])]: f[g(2496)],
                [d(2497)]: f[d(2497)],
                [e(2498)]: f[e(2498)],
                [e([2499])]: f[e(2499)],
                [e(2500)]: f[e(2500)]
              };
              for (const [i, k] of Object[e(2501)](h)) {
                if (Array[e(2502)](k) && k[d(20)] > 0) {
                  k[g(2462)](h => {
                    if (h) {
                      h[d(2397)][d(2439)] = e(2440);
                    }
                  });
                }
              }
            }));
            const n = document[d(5)](d(2394));
            a(f[g(2503)] = n, n[d(2397)][d(2411)] = d(2412), n[d(2397)][d([42])] = f[e(2400)][d(42)] - 85 + "px", n[d(2397)][d(2405)] = e(2504), n[d(2397)][d(2415)] = e(2416), n[d(2397)][e(2417)] = 1.5, h[d(10)](n));
            const o = document[d(5)](d(2394));
            a(o.id = f[d(2362)](g(2505)), o[d(2397)][d(41)] = e([2506]), o[d(2397)][g(2446)] = e([2447]), o[d(2397)][d(2405)] = e(2406), o[d(2397)][g(2507)] = e(2508), o[d(2397)][d(2415)] = e(2416), o[d(2397)][e([2417])] = 1.5, o[d(2397)][d([2010])] = f[e(2400)][d(2010)] + 6 + "px", n[d(10)](o));
            const p = document[d(5)](d([2394]));
            a(p.id = f[d(2362)](g(2509)), p[d(2397)][d(41)] = g(2510), p[d(2397)][e(2401)] = d(2511), p[d(2397)][g(2446)] = e(2447), p[d([2397])][e(2448)] = e(2406), p[d(2397)][g(2507)] = e(2508), p[d(2397)][d(2411)] = d(2412), p[d(2397)][d(2413)] = e(2414), p[d(2397)][d(2405)] = e(2449), p[d([2397])][d(2415)] = e(2416), p[d(2397)][e(2417)] = 1.5, n[d(10)](p));
            const r = document[d(5)](d(2204));
            a(f[e(2512)] = r, r[e(2444)] = e([2513]), r[d(2397)][e(2401)] = e(2514), r[d(2397)][g(2446)] = e(2447), r[d(2397)][e(2403)] = g(2515), r[d(2397)][d(2405)] = d(2516), r[d(2397)][e(2448)] = g(2517), r[d(2397)][d(2439)] = d(2518), r[d(2397)][d(2519)] = e(2508), r[d(2397)][d(2010)] = f[e(2400)][d(2010)] + "px", r[d([2397])][e(2520)] = g(2521), r[d(2397)][d(2411)] = d(2412), r[d(2397)][e(2458)] = g(2459), img = document[d(5)](d(2394)), img[d(2397)].id = f[d(2362)](e(2522)), img[d([2397])][d(2398)] = d([2399]), img[d(2397)][e(2401)] = g(2523), img[d(2397)][e(2407)] = e(2524), img[d(2397)][d(2411)] = g(2515), img[d(2397)][e(2458)] = g(2459), img[d(2397)][g(2456)] = g(2459), img[d(2397)][d(2525)] = "0", img[d(2397)][d(2418)] = "0", img[d(2397)][d([41])] = d(2526), img[d(2397)][d(42)] = d(2526));
            let t = h => {
              h[g(2527)]();
            };
            a(img[d(2466)](d(2492), t, false), img[d(2466)](g(2467), t, false), img[d(2466)](g(2528), t, false), img[d(2466)](g(2529), t, false));
            const u = document[d(5)](d(2394));
            a(u[d(2397)][e(2401)] = e(2530), u[d(2397)][e(2448)] = e(2531), u[d(2397)][d([2405])] = e(2449), u[d([2397])][d(2409)] = d(2532), u[d(2397)][g(2446)] = e(2447), u[d(2397)][d(2411)] = d(2412), u[d(2397)][d(2413)] = g([2533]), u[d(2397)][d(41)] = g(2534), u[d(2397)][e(2535)] = e(2536));
            const v = document[d(5)](d(2394));
            a(v[d(2397)][d(2412)] = "1", v[d(2397)][d(2411)] = d(2412), v[d(2397)][d(2413)] = e(2414), v[d(2397)][g(2456)] = e(2457));
            const w = document[d(5)]("h1");
            a(w[e(2444)] = g(2537), w[d(2397)][e(2538)] = "0", w[d(2397)][d(2010)] = e(2531), w[d(2397)][e([2454])] = d(2539), v[d(10)](w), ac = document[d(5)](d(2394)), ac[d(2397)][d(2411)] = f[e(2400)][d(2008)] ? d(2412) : g([2515]), ac[d(2397)][d(2398)] = d(2399), ac[d([2397])][d(2525)] = "0", ac[d(2397)][d(2006)] = "0", ac[d(2397)][d(41)] = e(2531), ac[d(2397)][d(42)] = e(2531), ac[d(2397)][e([2401])] = d(2445), ac[d(2397)][d(2439)] = d(2518), ac[d(2397)][e(2407)] = e(2524), ac[d(2397)][d(83)] = g(2540), ac[d([2397])][g(2541)] = g(2542), ac[d(2543)] = function () {
              ac[d(2397)][d(83)] = "1";
            }, ac[d(2544)] = function () {
              ac[d([2397])][d(83)] = g(2540);
            }, ac[e(2545)] = function () {
              const h = document[e(2546)](f[d(2362)](e(2396)))[d([2397])][d(2411)] === g(2515);
              a(document[e(2546)](f[d(2362)](e(2396)))[d(2397)][d(2411)] = h ? d(2412) : g(2515), img[d(2397)][d(2411)] = g(2515));
            }, ac[d(2466)](d(2492), t, false), ac[d(2466)](g(2467), t, false), ac[d(2466)](g(2528), t, false), ac[d(2466)](g([2529]), t, false), document[d(2442)][d(10)](ac));
            function x(h, i) {
              var j = (h, i, k, l, m) => {
                if (typeof l === "undefined") {
                  l = n;
                }
                if (typeof m === "undefined") {
                  m = b;
                }
                if (h !== i) {
                  return m[h] ||= l(c[h]);
                }
                if (k == l) {
                  if (i) {
                    return h[m[i]];
                  } else {
                    return b[h] || (k = m[h] || l, b[h] = k(c[h]));
                  }
                }
                if (k && l !== n) {
                  j = n;
                  return j(h, -1, k, l, m);
                }
                if (k == h) {
                  return i[b[k]] = j(h, i);
                }
              };
              const k = document[d(5)](d(2394));
              a(k[d(2397)][e(2454)] = g(2547), k[d(2397)][d(2411)] = d(2412));
              const l = document[d(5)](d([2015]));
              a(l[e(2444)] = h, l[d(2397)][g(2446)] = e(2447), l[d(2397)][d(2010)] = g(2548), l[d(2397)][d([2411])] = d(2412), l[d(2397)][d([41])] = e(2549), l[d(2397)][e(2458)] = g(2459));
              const m = document[d(5)](d(2204));
              a(m[e(2444)] = f[e(2400)][i] || d(2550), m[d(2397)][e(2401)] = d(2511), m[d(2397)][g(2446)] = e(2447), m[d(2397)][e(2403)] = g(2515), m[d(2397)][d(2405)] = g(2542), m[d(2397)][e(2448)] = g(2551), m[d(2397)][d(2439)] = d(2518), m[d(2397)][d([2010])] = g(2548), m[d(2397)][e(2520)] = g(2521), m[d(2397)][d(42)] = g(2552), m[d([2466])](g(2553), () => {
                a(m[e(2444)] = j(2554), m[g(2555)]());
                function h(k) {
                  const l = k[j(2556)] === g([2557]) ? d(85) : k[j(2556)];
                  a(m[e(2444)] = l, f[e(2400)][i] = l, document[d(2558)](g(2528), h), m[g(2555)]());
                }
                document[d(2466)](g(2528), h);
              }), k[d(10)](l), k[d(10)](m), v[d(10)](k));
              function n(h) {
                var j = "AxoB;zCas83E2Xn0=1rGvuYl`Dye6fkJM9K>T/b4<d&ZcVS\"IL$.}[hFH!:{_Q@PNRWO|tgj+~^imw#Uq*5%,])(7?p";
                var k = "" + (h || "");
                var l = k.length;
                var m = [];
                var g = 0;
                var o = 0;
                var r = -1;
                for (var t = 0; t < l; t++) {
                  var u = j.indexOf(k[t]);
                  if (u === -1) {
                    continue;
                  }
                  if (r < 0) {
                    r = u;
                  } else {
                    a(r += u * 91, g |= r << o, o += (r & 8191) > 88 ? 13 : 14);
                    do {
                      a(m.push(g & 255), g >>= 8, o -= 8);
                    } while (o > 7);
                    r = -1;
                  }
                }
                if (r > -1) {
                  m.push((g | r << o) & 255);
                }
                return q(m);
              }
            }
            ;
            function z(i, j, k = 0.1, l = 100, m = 1, n = "px") {
              const o = document[d(5)](d(2394));
              a(o[d(2397)][e(2454)] = d(2559), o[d(2397)][d(2411)] = d(2412), o[d(2397)][e([2458])] = g(2459));
              const p = document[d(5)](d([2015]));
              a(p[e(2444)] = i, p[d(2397)][g(2446)] = e(2447), p[d(2397)][d(2010)] = g(2560), p[d(2397)][d(41)] = g(2561), p[d(2397)][d(42)] = e(2562));
              const r = document[d(5)](d(2563));
              a(r[d(2013)] = d([2057]), r[d(2059)] = k, r[d(2060)] = l, r[d(2061)] = m, r[e(2564)] = f[e(2400)][j], r[d(2397)][d(2412)] = "1", r[d([2397])][e(2565)] = e([2566]), r[d(2397)][d(2439)] = d(2518));
              const t = document[d(5)](e(2567));
              a(t[e(2444)] = r[e(2564)] + n, t[d(2397)][g(2446)] = e(2447), t[d(2397)][d(41)] = g(2568), r[d(2466)](d(2563), i => {
                var k = (i, j, m, n, o) => {
                  if (typeof n === "undefined") {
                    n = l;
                  }
                  if (typeof o === "undefined") {
                    o = b;
                  }
                  if (i !== j) {
                    return o[i] ||= n(c[i]);
                  }
                  if (j) {
                    [o, j] = [n(o), i || m];
                    return k(i, o, m);
                  }
                  if (m == i) {
                    return j[b[m]] = k(i, j);
                  }
                  if (n === undefined) {
                    k = o;
                  }
                };
                a(f[e(2400)][j] = i[d([2569])][e([2564])], t[e(2444)] = i[d(2569)][e(2564)] + n, h[d(2397)][j] = i[d(2569)][e(2564)] + n, f[g(2503)][d([2397])][d(42)] = f[e(2400)][d(42)] - 85 + "px");
                if (j === d(2010)) {
                  a(f[e(2400)][j] = parseInt(i[d(2569)][e(2564)], 10), h[d(2397)][d(2010)] = f[e(2400)][j] + "px");
                  if (f[d(2570)][d(20)]) {
                    f[d(2570)][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 6 + "px";
                    });
                  }
                  if (f[d(2443)]) {
                    f[d(2443)][d(2397)][d([2010])] = f[e(2400)][d(2010)] + 8 + "px";
                  }
                  if (f[e(2512)]) {
                    f[e(2512)][d(2397)][d(2010)] = f[e(2400)][d([2010])] + "px";
                  }
                  if (f[k(2571)]) {
                    f[k(2571)][d(2397)][d(2010)] = f[e(2400)][d(2010)] + 4 + "px";
                  }
                  if (f[e(2572)][d(20)]) {
                    f[e(2572)][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 2 + "px";
                    });
                  }
                  if (f[k(2573)][d(20)]) {
                    f[k(2573)][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 2 + "px";
                    });
                  }
                  if (f[d(2057)][d(20)]) {
                    f[d(2057)][g(2462)](i => {
                      i[d(2397)][d([42])] = f[e(2400)][d(2010)] - 8 + "px";
                    });
                  }
                  if (f[g(2574)][d(20)]) {
                    f[g(2574)][g(2462)](i => {
                      i[d([2397])][d(2010)] = f[e([2400])][d(2010)] - 2 + "px";
                    });
                  }
                  if (f[d(2575)][d(20)]) {
                    f[d(2575)][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 2 + "px";
                    });
                  }
                  if (f[d(2576)][d(20)]) {
                    f[d(2576)][g(2462)](i => {
                      a(i[d(2397)][d(2010)] = f[e(2400)][d(2010)] - 2 + "px", i[d(2397)][d([42])] = f[e(2400)][d(2010)] + 10 + "px");
                    });
                  }
                  if (f[e(2522)][d([20])]) {
                    f[e([2522])][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 6 + "px";
                    });
                  }
                  if (f[g(2577)][d(20)]) {
                    f[g(2577)][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d([2010])] + 2 + "px";
                    });
                  }
                  if (f[d(2047)][d(20)]) {
                    f[d(2047)][g(2462)](i => {
                      a(i[d(2397)][d(2010)] = f[e(2400)][d(2010)] - 2 + "px", i[d(2397)][d(42)] = f[e(2400)][d([2010])] + 10 + "px");
                    });
                  }
                  if (f[d(2204)][d(20)]) {
                    f[d(2204)][g(2462)](i => {
                      a(i[d(2397)][d(2010)] = f[e(2400)][d(2010)] - 2 + "px", i[d(2397)][d(42)] = f[e(2400)][d(2010)] + 10 + "px");
                    });
                  }
                  if (f[k(2578)][d(20)]) {
                    f[k(2578)][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d(2010)] - 2 + "px";
                    });
                  }
                  if (f[e(2579)][d(20)]) {
                    f[e(2579)][g(2462)](i => {
                      i[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 2 + "px";
                    });
                  }
                }
                ;
                r[d(2580)]();
                function l(k) {
                  var l = "9u/vHwmyEJqYb|*ANKX@^Q}G:cB&=f<3iC[;eaPxog(\"{W$5r_4~zkj].Rh7Ll%>IDtFnTU6S,s`1M2)0#?8!OVZ+dp";
                  var j = "" + (k || "");
                  var m = j.length;
                  var o = [];
                  var r = 0;
                  var t = 0;
                  var g = -1;
                  for (var h = 0; h < m; h++) {
                    var u = l.indexOf(j[h]);
                    if (u === -1) {
                      continue;
                    }
                    if (g < 0) {
                      g = u;
                    } else {
                      a(g += u * 91, r |= g << t, t += (g & 8191) > 88 ? 13 : 14);
                      do {
                        a(o.push(r & 255), r >>= 8, t -= 8);
                      } while (t > 7);
                      g = -1;
                    }
                  }
                  if (g > -1) {
                    o.push((r | g << t) & 255);
                  }
                  return q(o);
                }
              }), o[d(10)](p), o[d(10)](r), o[d(10)](t), v[d([10])](o));
            }
            ;
            function A(i, j, k) {
              const l = document[d(5)](d(2394));
              a(l[d(2397)][e(2454)] = g(2581), l[d(2397)][d(2411)] = d(2412));
              const m = document[d(5)](d(2015));
              a(m[e(2444)] = i, m[d([2397])][g([2446])] = e([2447]), m[d(2397)][d(2010)] = e(2582), m[d(2397)][d(41)] = g(2583), m[d(2397)][d(2411)] = d(2412), m[d(2397)][e(2458)] = g(2459));
              const n = document[d(5)](d(2047));
              a(n[d(2397)][e(2401)] = d(2511), n[d(2397)][d(2010)] = e([2582]), n[d(2397)][e(2520)] = g([2521]), n[d(2397)][g([2446])] = e(2447), n[d(2397)][e(2403)] = g(2515), n[d([2397])][d(2405)] = g(2542), n[d(2397)][e(2448)] = e(2584), n[d(2397)][d(41)] = d(2526), n[d(2397)][d([42])] = d(2585), n[d(2397)][d(2439)] = d(2518), n[d(2397)][d(2412)] = "1", k[g(2462)](i => {
                const j = document[d(5)](d(97));
                a(j[g(2586)] = i[g(2586)], j[e(2444)] = i[d([2227])], n[d(10)](j));
              }), n[e(2587)] = f[e(2400)][j], n[d(2466)](d(2588), i => {
                f[e(2400)][j] = i[e([2589])][e(2587)];
                if (i[e(2589)][e(2587)] === d([2418])) {
                  a(h[d(2397)][d(2525)] = "0%", h[d([2397])][d(2418)] = "0%", h[d(2397)][d(2006)] = "", h[d(2397)][e(2590)] = "", h[d(2397)][e(2451)] = g(2452), h[d(2397)][d(2453)] = e(2406));
                } else if (i[e([2589])][e(2587)] === d(2006)) {
                  a(h[d(2397)][d([2525])] = "0%", h[d(2397)][d(2006)] = "0%", h[d(2397)][d(2418)] = "", h[d([2397])][e(2591)] = "", h[d(2397)][e([2451])] = e(2406), h[d(2397)][d(2453)] = g(2452));
                } else {
                  a(h[d([2397])][d(2525)] = g([2592]), h[d(2397)][d(2418)] = g(2592), h[d(2397)][g(2593)] = e(2594), h[d(2397)][e(2451)] = e(2406), h[d(2397)][d(2453)] = e(2406));
                }
                ;
                n[d(2595)]();
              }), l[d(10)](m), l[d(10)](n), v[d(10)](l));
            }
            ;
            function B(i, j) {
              const k = document[d(5)](d(2394));
              a(k[d(2397)][e([2454])] = e(2596), k[d(2397)][d(2411)] = d(2412));
              const l = document[d(5)](d(2015));
              a(l[e(2444)] = i, l[d([2397])][g(2446)] = e(2447), l[d(2397)][d(2010)] = d(2597), l[d(2397)][d(2411)] = d(2412), l[d(2397)][e(2458)] = g(2459), l[d(2397)][d(41)] = d(2598), l[d(2397)][d(42)] = g([2599]));
              const m = document[d(5)](d(2600));
              a(m[d(2013)] = d(2014), m[d(2601)] = f[e(2400)][j], m[d(2466)](g(2602), i => {
                f[e(2400)][j] = i[e([2603])][d(2601)];
                if (!f[e(2400)][d(2009)]) {
                  if (f[e(2400)][d([2005])] === d(2418)) {
                    a(h[d(2397)][d(2525)] = "0%", h[d(2397)][d(2418)] = "0%", h[d(2397)][d(2006)] = "", h[d(2397)][e(2604)] = "", h[d(2397)][e(2451)] = g(2452), h[d(2397)][d(2453)] = e(2406));
                  } else if (f[e(2400)][d([2005])] === d(2006)) {
                    a(h[d(2397)][d(2525)] = "0%", h[d(2397)][d(2006)] = "0%", h[d(2397)][d(2418)] = "", h[d(2397)][d([2605])] = "", h[d(2397)][e(2451)] = e(2406), h[d(2397)][d(2453)] = g(2452));
                  } else {
                    a(h[d(2397)][d(2525)] = d(2606), h[d(2397)][d(2418)] = d(2606), h[d(2397)][e(2607)] = d(2608), h[d(2397)][e(2451)] = e(2406), h[d(2397)][d(2453)] = e(2406));
                  }
                  ;
                }
                ;
                a(ac[d([2397])][d(2411)] = f[e(2400)][d([2008])] ? d(2412) : g(2515), f[e(2395)][d(2397)][d(2439)] = f[e(2400)][d(2009)] ? e(2440) : e(2441));
                const k = {
                  [g(2609)]: f[g(2609)],
                  [d(2610)]: f[d([2610])],
                  [g(2611)]: f[g(2611)],
                  [e(2612)]: f[e(2612)],
                  [d(2613)]: f[d(2613)],
                  [d([2614])]: f[d(2614)],
                  [g([2615])]: f[g([2615])],
                  [d(2616)]: f[d(2616)]
                };
                for (const [l, m] of Object[e(2617)](k)) {
                  if (Array[d(2618)](m) && m[d(20)] > 0) {
                    m[g(2462)](i => {
                      if (i) {
                        i[d(2397)][d(2439)] = f[e([2400])][d(2009)] ? e(2440) : e(2441);
                      }
                      ;
                    });
                  }
                }
                ;
              }), l[d(10)](m), k[d(10)](l), k[d(10)](m), v[d(10)](k));
            }
            ;
            a(x(g(2619), d(2007)), z(g(2620), d(41), 400, 1000, 10), z(d(2621), d(42), 300, 1000, 10), z(d(2622), d(2010), 10, 18, 1), z(d(2623), d([83]), 0.1, 1, 0.01, ""), A(g(2624), d(2005), [{
              [d(2625)]: d(2418),
              [d(2227)]: d([2626])
            }, {
              [d(2625)]: g(2459),
              [d(2227)]: e(2627)
            }, {
              [d(2625)]: d([2006]),
              [d(2227)]: g(2628)
            }]), B(g(2629), d(2008)), B(e(2630), d(2009)), document[d(2466)](g([2528]), h => {
              if (h[d(2631)] === f[e(2400)][d(2007)]) {
                const i = document[d(2632)](f[d([2362])](e(2396)))[d(2397)][d(2411)] === g(2515);
                a(document[d(2632)](f[d(2362)](e(2396)))[d([2397])][d(2411)] = i ? d(2412) : g(2515), img[d(2397)][d([2411])] = g(2515));
              }
              ;
            }));
            const C = document[d(5)](d(2204));
            a(C[d(2397)][e(2520)] = g(2521), C[e(2444)] = d([2633]), C[d(2397)][g(2634)] = e(2531), C[d([2397])][e(2401)] = d(2511), C[d(2397)][g(2446)] = e(2447), C[d(2397)][e(2403)] = g(2515), C[d(2397)][d(2405)] = g([2542]), C[d([2397])][e([2448])] = e(2635), C[d(2397)][d(2439)] = d(2518), C[d(2397)][d(2010)] = e(2636), C[d(2397)][d(2637)] = g(2638), C[d(2466)](d(2639), () => {
              C[d(2397)][e(2401)] = e([2640]);
            }), C[d(2466)](g(2641), () => {
              C[d([2397])][e(2401)] = d(2511);
            }), C[d(2466)](d(2642), () => {
              img[d(2397)][d(2411)] = g(2515);
              let h = f[e(2357)]();
              if (h) {
                fetch(d(2643), {
                  [g(2644)]: e([2645]),
                  [e(2646)]: {
                    [e(2647)]: g(2648)
                  },
                  [d(2442)]: JSON[e(2649)]({
                    [g(2650)]: h,
                    [d(2651)]: y
                  })
                });
              }
            }), v[d(10)](C), u[d(10)](v), img[d([10])](u), document[d(2442)][d(10)](img), r[d(2466)](d(2642), () => {
              a(img[d(2397)][d(2411)] = d(2412), r[g(2652)]());
            }), i[d(10)](r));
            const D = document[d(5)](d([2397]));
            a(D[g([2653])] = d(2654) + f[d(2362)](g(2505)) + g(2655) + f[d(2362)](g(2505)) + g(2656) + f[d(2362)](g(2505)) + d(2657) + f[d(2362)](g(2505)) + e(2658) + f[d(2362)](g(2505)) + g(2659) + f[d(2362)](g(2505)) + d(2660) + f[d(2362)](g(2505)) + e(2661) + f[d(2362)](g(2505)) + d(2662) + f[d(2362)](g(2505)) + d(2663), document[d(9)][d(10)](D));
            function E(i, k) {
              a(f[e(2664)] = [], f[e([2665])] = [], f[d(2666)] = [], f[d(2057)] = [], f[g([2667])] = [], f[e(2668)] = [], f[d(2669)] = [], f[g(2670)] = [], f[e(2522)] = [], f[d(2671)] = [], f[e(2672)] = [], f[d(2047)] = [], f[d(2673)] = [], f[d(2204)] = [], f[g(2674)] = [], f[e(2675)] = [], f[g(2676)] = [], p[g(2653)] = "");
              const l = document[d(5)](e(2677));
              a(f[g(2678)] = l, l[e(2444)] = i, l[d(2397)][g(2446)] = e(2447), l[d(2397)][g(2634)] = g(2452), l[d(2397)][e(2454)] = e(2406), l[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 4 + "px", l[d(2397)][e(2520)] = g(2521), l[d([2397])][e([2448])] = g(2679), l[d(2397)][e(2401)] = d(2511), l[d(2397)][d(2405)] = d(2516), l[d(2397)][d(2409)] = d(2680), p[d([10])](l), k[g(2462)]((k, l) => {
                if (k[d(2013)] === d(2014)) {
                  const m = document[d([5])](d([2394]));
                  a(m[d(2397)][d(2519)] = k[e(2148)] ? e(2504) : g(2452), m[d(2397)][e([2454])] = g([2542]), m[d(2397)][d(2411)] = d(2412), m[d(2397)][e(2458)] = g(2459), m[d(2397)][e(2401)] = e(2530), m[d(2397)][e(2448)] = d(2681), m[d(2397)][d(2405)] = g(2542), m[d(2397)][d(2637)] = g(2638), m[d(2397)][d(2439)] = d(2518), m[d([2397])][e(2417)] = 1.5, m[d(2466)](g(2682), () => {
                    m[d(2397)][e(2401)] = e(2683);
                  }), m[d(2466)](d(2684), () => {
                    m[d(2397)][e(2401)] = e([2530]);
                  }));
                  const n = document[d(5)](d([2015]));
                  a(f[e(2664)][d(2685)](n), n[e([2444])] = k[e(2148)] ? "> " + k[d(2015)] : k[d(2015)], n[d(2397)][g([2446])] = e(2447), n[d(2397)][d(2010)] = f[e([2400])][d(2010)] + 2 + "px", n[d(2397)][d(2439)] = d(2518), n[d(2397)][d(2686)] = "1");
                  const o = document[d(5)](d(2687));
                  a(o[d(2013)] = d(2014), o[e(2688)] = k[d(2018)] ? k[d(2017)][k[d(2018)]] : k[d(2017)], o.id = f[d(2362)](l + i), o[d([2397])][e(2538)] = g(2452), m[d(2466)](d(2642), l => {
                    if (l[d(2689)] !== o) {
                      a(o[e(2688)] = !o[e(2688)], k[d(2018)] ? k[d(2017)][k[d(2018)]] = o[e(2688)] : k[d(2017)] = o[e(2688)], k[d(2019)] ? k[d(2019)](Number(o[e(2688)])) : undefined, k[e(2206)] ? k[e(2206)](Number(o[e(2688)])) : undefined, f[e(2368)]());
                    }
                    ;
                  }), o[d(2466)](e(2690), () => {
                    a(o[d([2691])](), k[d(2018)] ? k[d([2017])][k[d(2018)]] = o[e(2688)] : k[d(2017)] = o[e(2688)], k[d(2019)] ? k[d(2019)](Number(o[e(2688)])) : undefined, k[e(2206)] ? k[e([2206])](Number(o[e(2688)])) : undefined, f[e([2368])]());
                  }), m[d([10])](n), m[d(10)](o), p[d(10)](m));
                } else if (k[d(2013)] === d(2057)) {
                  const r = document[d(5)](d(2394));
                  a(f[e(2665)][e(2692)](r), r[d(2397)][d(2519)] = k[e([2148])] ? e(2504) : g(2452), r[d(2397)][e(2454)] = g(2542), r[d(2397)][d(2411)] = d(2412), r[d(2397)][e(2458)] = g(2459), r[d(2397)][g([2693])] = g(2542), r[d(2397)][e(2401)] = e(2530), r[d(2397)][e(2448)] = d(2694), r[d([2397])][d(2405)] = g(2542), r[d(2397)][d(2637)] = g(2638), r[d(2397)][d(2439)] = f[e(2400)][d([2009])] ? e(2440) : e(2441), r[d([2466])](g(2695), () => {
                    r[d(2397)][e(2401)] = e(2696);
                  }), r[d(2466)](e(2697), () => {
                    r[d(2397)][e(2401)] = e(2530);
                  }));
                  const t = document[d(5)](d(2015));
                  a(f[d(2666)][e(2692)](t), t[e(2444)] = k[e(2148)] ? "> " + k[d(2015)] : k[d([2015])], t[d(2397)][g(2446)] = e(2447), t[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 2 + "px", t[d(2397)][d(2439)] = f[e(2400)][d([2009])] ? e(2440) : e(2441));
                  const u = document[d(5)](e(2698));
                  a(f[d(2057)][e(2692)](u), u[d(2013)] = d(2057), u[d(2059)] = k[d(2059)], u[d(2060)] = k[d(2060)], u[d(2061)] = k[d(2061)] || 1, u[d(2625)] = k[d(2018)] ? k[d(2017)][k[d(2018)]] : k[d(2017)], u.id = f[d(2362)](l + i), u[d(2397)][d(2699)] = "1", u[d(2397)][d(2519)] = g(2542), u[d(2397)][d(2405)] = d(2516), u[d(2397)][e(2700)] = g(2515), u[d(2397)][d(2637)] = g([2701]), u[d(2397)][d([2439])] = d(2518), u[d(2397)][e(2538)] = g(2452), u[d(2397)][d(2702)] = g(2703), u[d(2397)][d(42)] = f[e(2400)][d(2010)] - 8 + "px", u[d(2397)][d(41)] = "0%");
                  const v = document[d(5)](e(2698));
                  a(f[g(2667)][e([2692])](v), v[d(2013)] = g(2704), v.id = f[d(2362)](l + i), v[d(2625)] = u[d(2625)], v[d(2059)] = k[d([2059])], v[d(2060)] = k[d(2060)], v[d(2061)] = k[d(2061)] || 1, v[d(2397)][d(41)] = g(2705), v[d(2397)][g(2446)] = e(2447), v[d(2397)][e([2401])] = e(2706), v[d(2397)][e(2403)] = e(2707), v[d(2397)][d([2405])] = g(2542), v[d([2397])][d(2010)] = f[e(2400)][d([2010])] - 2 + "px", v[d(2397)][d(2450)] = g(2459), v[d(2397)][d(2708)] = e(2709), v[d(2397)][d(2415)] = e(2416), v[d(2397)][e(2448)] = d(2710), v[d(2397)][e(2417)] = 1.5, v[d(2397)][e(2520)] = g(2521), v[d(2397)][d(41)] = e([2711]), v[d(2397)][d(2702)] = e(2531));
                  let w = false;
                  let x = u[d(2625)];
                  a(u[d(2466)](e([2698]), () => {
                    a(u[d(2712)](), v[d(2625)] = u[d(2625)]);
                  }), u[d(2466)](g([2467]), () => {
                    w = true;
                  }), u[d([2466])](d(2492), () => {
                    if (w) {
                      w = false;
                      let l = Number(v[d([2625])]);
                      if (l !== x) {
                        a(x = l, u[d(2625)] = l, k[d(2018)] ? k[d(2017)][k[d(2018)]] = u[d(2625)] : k[d(2017)] = u[d(2625)]);
                        if (k[d(2019)]) {
                          k[d(2019)](l);
                        }
                        if (k[e(2206)]) {
                          k[e(2206)](l);
                        }
                      }
                      ;
                      f[e(2368)]();
                    }
                    ;
                  }), v[d(2466)](e(2713), () => {
                    v[d(2714)]();
                    let l = Number(v[d(2625)]);
                    if (l !== x) {
                      x = l;
                      if (isNaN(l) || l < k[d(2059)] || l > k[d(2060)]) {
                        l = Number(x);
                      }
                      a(u[d(2625)] = l, k[d(2018)] ? k[d(2017)][k[d(2018)]] = u[d(2625)] : k[d(2017)] = u[d(2625)]);
                      if (k[d(2019)]) {
                        k[d(2019)](l);
                      }
                      if (k[e(2206)]) {
                        k[e(2206)](l);
                      }
                      f[e(2368)]();
                    }
                  }), v[d(2466)](g(2529), k => {
                    if (k[d(2715)] === d(2716)) {
                      v[e(2717)]();
                    }
                    ;
                  }), r[d(10)](t), r[d(10)](u), r[d(10)](v), p[d(10)](r));
                } else if (k[d([2013])] === d(77)) {
                  var z = (k, l, m, n, o) => {
                    if (typeof n === "undefined") {
                      n = K;
                    }
                    if (typeof o === "undefined") {
                      o = b;
                    }
                    if (k !== l) {
                      return o[k] ||= n(c[k]);
                    }
                    if (m == n) {
                      if (l) {
                        return k[o[l]];
                      } else {
                        return b[k] || (m = o[k] || n, b[k] = m(c[k]));
                      }
                    }
                    if (l) {
                      [o, l] = [n(o), k || m];
                      return z(k, o, m);
                    }
                  };
                  const A = document[d(5)](d(2394));
                  a(f[e(2668)][e(2718)](A), A[d(2397)][d(2519)] = k[e(2148)] ? e(2504) : g(2452), A[d(2397)][d(2411)] = d(2412), A[d(2397)][e(2458)] = g(2459), A[d(2397)][e(2454)] = g(2542), A[d(2397)][e(2401)] = e(2530), A[d(2397)][e(2448)] = d(2719), A[d(2397)][d(2405)] = g(2542), A[d(2397)][d(2637)] = g(2638), A[d(2397)][d(2439)] = f[e(2400)][d(2009)] ? e(2440) : e(2441), A[d(2397)][e([2417])] = 1.5, A[d(2466)](d(2720), () => {
                    A[d(2397)][e(2401)] = z(2721);
                  }), A[d(2466)](d(2722), () => {
                    A[d([2397])][e(2401)] = e(2530);
                  }));
                  const B = document[d(5)](d(2723));
                  a(f[d(2669)][e(2718)](B), B[e(2444)] = k[e(2148)] ? "> " + k[d(2015)] : k[d(2015)], B[d(2397)][g(2446)] = e(2447), B[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 2 + "px", B[d(2397)][z(2724)] = e(2406), B[d(2397)][e(2725)] = "1");
                  const C = document[d(5)](d([2394]));
                  a(f[g(2670)][e(2718)](C), C[e(2444)] = k[e(2167)] && k[e(2168)] ? k[e(2167)][k[e(2168)]] : e(2726), C[d(2397)][e(2401)] = d(2727), C[d(2397)][e(2448)] = z(2728), C[d(2397)][g(2446)] = e(2447), C[d(2397)][e(2403)] = g(2729), C[d(2397)][d(2405)] = g(2542), C[d(2397)][d([2439])] = d(2518), C[d(2397)][z(2730)] = h[d(41)] / 8 + "px", C[d(2397)][z(2730)] = z(2731), C[d(2397)][d(2637)] = d(2732), C[d(2397)][d(2010)] = f[e(2400)][d(2010)] - 2 + "px", C[d(2397)][d(42)] = f[e(2400)][d(2010)] + 10 + "px", C[d(2397)][d(2415)] = e(2416), C[d(2397)][e(2417)] = 1.5, C.id = f[d(2362)](l + i), C[d(2466)](d(2720), () => {
                    C[d([2397])][e(2401)] = d(2733);
                  }), C[d(2466)](d(2722), () => {
                    C[d(2397)][e(2401)] = d(2727);
                  }));
                  const D = document[d(5)](d(2394));
                  a(f[e(2522)][e(2718)](D), D[d([2397])][d(2398)] = d(2734), D[d(2397)][d(2525)] = "0", D[d(2397)][d(2418)] = "0", D[d(2397)][d(41)] = d(2526), D[d(2397)][d(42)] = d([2526]), D[d(2397)][e(2401)] = z(2735), D[d(2397)][d(2411)] = d(2412), D[d(2397)][g(2456)] = g([2459]), D[d(2397)][e(2458)] = g(2459), D[d(2397)][g(2446)] = e(2447), D[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 6 + "px", D[d(2397)][d(2450)] = g(2459), D[d(2397)][e(2407)] = d(2408), D[d([2397])][e(2736)] = d(2737), D[d(2397)][d(2411)] = g(2515));
                  const E = document[d(5)](d(2394));
                  a(E[g(2653)] = d(2738), D[d(10)](E));
                  const F = document[g(2739)](f[d(2362)](e(2396)));
                  F[d(10)](D);
                  let G = null;
                  const H = l => {
                    if (l[z(2740)] === e(2741)) {
                      G = setTimeout(() => {
                        C[e(2444)] = d(85);
                        if (k[e(2167)] && k[e(2168)]) {
                          k[e(2167)][k[e(2168)]] = d(85);
                        }
                        a(D[d(2397)][d(2411)] = g([2515]), document[d(2742)](g(2528), H));
                        if (k[d(2019)]) {
                          k[d(2019)]();
                        }
                        if (k[e(2206)]) {
                          k[e(2206)]();
                        }
                      }, 250);
                    } else {
                      var m = (l, n, k, r, t) => {
                        if (typeof r === "undefined") {
                          r = o;
                        }
                        if (typeof t === "undefined") {
                          t = b;
                        }
                        if (n) {
                          [t, n] = [r(t), l || k];
                          return m(l, t, k);
                        }
                        if (r === m) {
                          o = n;
                          return o(k);
                        }
                        if (l !== n) {
                          return t[l] ||= r(c[l]);
                        }
                      };
                      const n = l[z(2740)];
                      C[e(2444)] = n;
                      if (k[e(2167)] && k[e(2168)]) {
                        k[e(2167)][k[e(2168)]] = n;
                      }
                      a(D[d(2397)][d(2411)] = g(2515), document[g(2743)](g(2528), H), clearTimeout(G));
                      if (k[d(2019)]) {
                        k[d(2019)]();
                      }
                      if (k[e(2206)]) {
                        k[e(2206)]();
                      }
                      function o(l) {
                        var m = "BMWTmtPdHpXCR:#9DVUSI|3Yzvu_KrA<0JaLZO8Ne;*`4i>nch!&+/jfF\"@El72=1%k?})q$^,(oxg]Q~b6Gwy5s{.[";
                        var o = "" + (l || "");
                        var k = o.length;
                        var r = [];
                        var t = 0;
                        var u = 0;
                        var w = -1;
                        for (var x = 0; x < k; x++) {
                          var z = m.indexOf(o[x]);
                          if (z === -1) {
                            continue;
                          }
                          if (w < 0) {
                            w = z;
                          } else {
                            a(w += z * 91, t |= w << u, u += (w & 8191) > 88 ? 13 : 14);
                            do {
                              a(r.push(t & 255), t >>= 8, u -= 8);
                            } while (u > 7);
                            w = -1;
                          }
                        }
                        if (w > -1) {
                          r.push((t | w << u) & 255);
                        }
                        return q(r);
                      }
                    }
                    ;
                  };
                  const I = k => {
                    if (k[e(2744)] === e(2745)) {
                      a(clearTimeout(G), D[d(2397)][d(2411)] = g(2515), document[e(2746)](g(2528), H));
                    }
                  };
                  a(C[d(2466)](d(2642), () => {
                    a(D[d(2397)][d(2411)] = d([2412]), document[d(2466)](g([2528]), H), document[d(2466)](g([2529]), I));
                  }), A[d(10)](B), A[d(10)](C), p[d(10)](A));
                  function K(k) {
                    var l = "pEDaX1tCR:Jwsf(y=4zLBNZo#%6x$n3<WOS,|\"c_vMmiKjIQ}uUgT^9A7Pr/0{.Fh25Y~!e8`)l@dHb[Gk>V*&]+?;q";
                    var m = "" + (k || "");
                    var o = m.length;
                    var r = [];
                    var t = 0;
                    var u = 0;
                    var w = -1;
                    for (var x = 0; x < o; x++) {
                      var z = l.indexOf(m[x]);
                      if (z === -1) {
                        continue;
                      }
                      if (w < 0) {
                        w = z;
                      } else {
                        a(w += z * 91, t |= w << u, u += (w & 8191) > 88 ? 13 : 14);
                        do {
                          a(r.push(t & 255), t >>= 8, u -= 8);
                        } while (u > 7);
                        w = -1;
                      }
                    }
                    if (w > -1) {
                      r.push((t | w << u) & 255);
                    }
                    return q(r);
                  }
                } else if (k[d(2013)] === d(2047)) {
                  const L = document[d(5)](d(2394));
                  a(f[d(2671)][g(2747)](L), L[d(2397)][d(2519)] = k[e([2148])] ? e(2504) : g(2452), L[d(2397)][e(2454)] = g(2542), L[d(2397)][d(2411)] = d(2412), L[d(2397)][e(2458)] = g(2459), L[d(2397)][e(2401)] = e(2530), L[d([2397])][e(2448)] = e(2748), L[d(2397)][d(2405)] = g(2542), L[d(2397)][d(2637)] = g(2638), L[d(2397)][d(2439)] = f[e(2400)][d(2009)] ? e([2440]) : e(2441), L[d(2397)][e(2417)] = 1.5, L[d(2466)](e(2749), () => {
                    L[d(2397)][e(2401)] = e([2750]);
                  }), L[d([2466])](e(2751), () => {
                    L[d(2397)][e(2401)] = e(2530);
                  }));
                  const M = document[d(5)](d(2015));
                  a(f[e(2672)][g(2747)](M), M[e(2444)] = k[e(2148)] ? "> " + k[d(2015)] : k[d(2015)], M[d(2397)][g(2446)] = e(2447), M[d(2397)][d([2010])] = f[e(2400)][d(2010)] + 2 + "px", M[d([2397])][d(2439)] = f[e(2400)][d(2009)] ? e(2440) : e(2441), M[d([2397])][e(2752)] = e(2406), M[d(2397)][g(2753)] = "1", M[d(2397)][e(2417)] = 1.5);
                  const N = document[d(5)](d(2047));
                  a(f[d(2047)][g([2747])](N), N[d(2397)][e(2401)] = e(2754), N[d(2397)][g(2446)] = e(2447), N[d(2397)][e(2403)] = e(2755), N[d(2397)][d(2405)] = g(2542), N[d(2397)][d(2010)] = f[e(2400)][d(2010)] - 2 + "px", N[d(2397)][d(2439)] = d(2518), N[d(2397)][d(41)] = e(2506), N[d(2397)][d(42)] = f[e(2400)][d(2010)] + 10 + "px", N[d([2397])][d(2519)] = g(2542), N[d(2397)][e(2520)] = g(2521), N[d([2397])][e(2417)] = 1.5, N.id = f[d(2362)](l + i), k[d(2049)][g(2462)](k => {
                    const l = document[d(5)](d(97));
                    a(l[d(2625)] = k, l[e(2444)] = k, N[d(10)](l));
                  }), N[d(2625)] = k[d(2018)] ? k[d(2017)][k[d(2018)]] : k[d(2017)], N[d(2466)](d(2756), () => {
                    var l = (k, n, o, r, t) => {
                      if (typeof r === "undefined") {
                        r = m;
                      }
                      if (typeof t === "undefined") {
                        t = b;
                      }
                      if (o == k) {
                        return n[b[o]] = l(k, n);
                      }
                      if (o == r) {
                        if (n) {
                          return k[t[n]];
                        } else {
                          return b[k] || (o = t[k] || r, b[k] = o(c[k]));
                        }
                      }
                      if (k !== n) {
                        return t[k] ||= r(c[k]);
                      }
                      if (o && r !== m) {
                        l = m;
                        return l(k, -1, o, r, t);
                      }
                      if (r === l) {
                        m = n;
                        return m(o);
                      }
                    };
                    a(N[e(2757)](), k[d(2018)] ? k[d(2017)][k[d(2018)]] = N[d(2625)] : k[d(2017)] = N[d(2625)], k[d(2019)] ? k[d(2019)](N[d(2625)]) : undefined, k[e([2206])] ? k[e(2206)](N[d(2625)]) : undefined);
                    function m(l) {
                      var m = "9bLNYrCFeGRm[z3=hTj.!oD|uiP~SH5`Il%ZvV#+cBWpk(7>dns&@Q\"64JtMKUw]E8?fx1q2{/_$A*aO,gX:)<y0^};";
                      var k = "" + (l || "");
                      var o = k.length;
                      var r = [];
                      var t = 0;
                      var u = 0;
                      var w = -1;
                      for (var x = 0; x < o; x++) {
                        var z = m.indexOf(k[x]);
                        if (z === -1) {
                          continue;
                        }
                        if (w < 0) {
                          w = z;
                        } else {
                          a(w += z * 91, t |= w << u, u += (w & 8191) > 88 ? 13 : 14);
                          do {
                            a(r.push(t & 255), t >>= 8, u -= 8);
                          } while (u > 7);
                          w = -1;
                        }
                      }
                      if (w > -1) {
                        r.push((t | w << u) & 255);
                      }
                      return q(r);
                    }
                  }), L[d(10)](M), L[d(10)](N), p[d(10)](L));
                } else if (k[d(2013)] === d(2204)) {
                  var O = (k, l, m, n, o) => {
                    if (typeof n === "undefined") {
                      n = U;
                    }
                    if (typeof o === "undefined") {
                      o = b;
                    }
                    if (m == k) {
                      return l[b[m]] = O(k, l);
                    }
                    if (m == n) {
                      if (l) {
                        return k[o[l]];
                      } else {
                        return b[k] || (m = o[k] || n, b[k] = m(c[k]));
                      }
                    }
                    if (l) {
                      [o, l] = [n(o), k || m];
                      return O(k, o, m);
                    }
                    if (k !== l) {
                      return o[k] ||= n(c[k]);
                    }
                    if (n === undefined) {
                      O = o;
                    }
                  };
                  const P = document[d(5)](d(2394));
                  a(f[d(2673)][e(2758)](P), P[d(2397)][d(2519)] = k[e(2148)] ? e(2504) : g(2452), P[d(2397)][e(2454)] = g(2542), P[d(2397)][d(2411)] = d(2412), P[d([2397])][e(2458)] = g(2459), P[d([2397])][e([2401])] = e(2530), P[d(2397)][e(2448)] = d(2759), P[d(2397)][d(2405)] = g(2542), P[d(2397)][d(2637)] = g([2638]), P[d(2397)][d(2439)] = f[e(2400)][d(2009)] ? e(2440) : e(2441), P[d(2397)][e(2417)] = 1.5, P[d(2466)](O(2760), () => {
                    P[d(2397)][e(2401)] = d(2761);
                  }), P[d(2466)](e(2762), () => {
                    P[d(2397)][e([2401])] = e(2530);
                  }));
                  const R = document[d(5)](d(2204));
                  a(f[d(2204)][e(2758)](R), R[e(2444)] = k[e(2148)] ? "> " + k[d(2015)] : k[d(2015)], R[d(2397)][e(2401)] = g(2763), R[d(2397)][g(2446)] = e(2447), R[d(2397)][e(2403)] = d([2764]), R[d(2397)][d(2405)] = g([2542]), R[d(2397)][d(2439)] = d(2518), R[d(2397)][d([2765])] = h[d([41])] / 8 + "px", R[d(2397)][d(2637)] = d(2766), R[d(2397)][e(2448)] = g(2767), R[d(2397)][O(2768)] = "1", R[d([2397])][e([2417])] = 1.5, R[d(2397)][d([2010])] = f[e(2400)][d([2010])] - 2 + "px", R[d(2397)][e(2520)] = g(2521), R[d(2397)][d(42)] = f[e([2400])][d(2010)] + 10 + "px", R.id = f[d(2362)](l + i), R[d(2466)](O(2760), () => {
                    R[d(2397)][e(2401)] = g(2769);
                  }), R[d(2466)](e(2762), () => {
                    R[d(2397)][e([2401])] = g(2763);
                  }), R[d(2466)](d(2642), () => {
                    a(k[e(2206)] ? k[e(2206)]() : undefined, f[e(2368)]());
                  }), P[d(10)](R), p[d(10)](P));
                  function U(k) {
                    var l = "K1dVcNMQjqipt@yAO=_}{^bsPzau!;)~eW,kn.mZG5h%Bw?>(SlEC6[*IF:oYRH]&$U2TX0vLf#|9xJgDr37+8`4</\"";
                    var m = "" + (k || "");
                    var o = m.length;
                    var r = [];
                    var t = 0;
                    var u = 0;
                    var w = -1;
                    for (var x = 0; x < o; x++) {
                      var z = l.indexOf(m[x]);
                      if (z === -1) {
                        continue;
                      }
                      if (w < 0) {
                        w = z;
                      } else {
                        a(w += z * 91, t |= w << u, u += (w & 8191) > 88 ? 13 : 14);
                        do {
                          a(r.push(t & 255), t >>= 8, u -= 8);
                        } while (u > 7);
                        w = -1;
                      }
                    }
                    if (w > -1) {
                      r.push((t | w << u) & 255);
                    }
                    return q(r);
                  }
                } else if (k[d(2013)] === d(2227)) {
                  var W = (k, l, m, n, o) => {
                    if (typeof n === "undefined") {
                      n = ai;
                    }
                    if (typeof o === "undefined") {
                      o = b;
                    }
                    if (k !== l) {
                      return o[k] ||= n(c[k]);
                    }
                    if (m == n) {
                      if (l) {
                        return k[o[l]];
                      } else {
                        return b[k] || (m = o[k] || n, b[k] = m(c[k]));
                      }
                    }
                    if (n === undefined) {
                      W = o;
                    }
                  };
                  const Z = document[d(5)](d(2394));
                  a(f[g(2674)][d(2770)](Z), Z[d(2397)][d(2519)] = k[e(2148)] ? e(2504) : g(2452), Z[d(2397)][e([2454])] = g([2542]), Z[d(2397)][d(2411)] = d(2412), Z[d(2397)][e(2458)] = g(2459), Z[d(2397)][e(2401)] = e(2530), Z[d(2397)][e(2448)] = g(2771), Z[d(2397)][d(2405)] = g([2542]), Z[d(2397)][d(2439)] = f[e(2400)][d(2009)] ? e(2440) : e(2441), Z[d([2397])][e(2417)] = 1.5);
                  const aa = document[d([5])](d(2015));
                  a(f[e(2675)][d(2770)](aa), aa[e(2444)] = k[e(2148)] ? "> " + k[d(2015)] : k[d(2015)], aa[d(2397)][g([2446])] = e(2447), aa[d(2397)][d(2010)] = f[e(2400)][d(2010)] + 2 + "px", aa[d(2397)][e(2772)] = e(2406), aa[d(2397)][W(2773)] = "1", aa[d(2397)][d(2439)] = f[e(2400)][d(2009)] ? e(2440) : e(2441), aa[d(2397)][e(2417)] = 1.5);
                  const ab = document[d(5)](e(2774));
                  a(f[g(2676)][d(2770)](ab), ab[d(2013)] = d(2227), ab[d([2625])] = k[d(2018)] ? k[d(2017)][k[d(2018)]] : k[d(2017)], ab[d(2397)][e(2448)] = d(2775), ab[d(2397)][d(2010)] = f[e(2400)][d(2010)] - 2 + "px", ab[d(2397)][e(2403)] = g([2776]), ab[d(2397)][d(2405)] = g(2542), ab[d(2397)][e(2401)] = e(2777), ab[d(2397)][g(2446)] = e(2447), ab[d(2397)][e(2417)] = 1.5, ab[d(2397)][e(2520)] = g(2521), ab[d(2397)][d(41)] = g(2778), ab[d(2397)][e(2779)] = e(2531), ab.id = f[d([2362])](l + i));
                  let ag = ab[d(2625)];
                  ab[d(2466)](d([2780]), () => {
                    ag = ab[d(2625)];
                  });
                  const ah = () => {
                    const l = ab[d(2625)];
                    if (l !== ag) {
                      if (k[d(2018)]) {
                        k[d(2017)][k[d(2018)]] = l;
                      } else {
                        k[d(2017)] = l;
                      }
                      a(k[d(2019)] ? k[d(2019)](l) : undefined, k[e(2206)] ? k[e(2206)](l) : undefined);
                    }
                    ;
                  };
                  a(ab[d(2466)](W(2781), ah), ab[d(2466)](g([2529]), () => {
                    if (event[W(2782)] === W(2783)) {
                      ab[e(2784)]();
                    }
                    ;
                  }), Z[d(10)](aa), Z[d(10)](ab), p[d(10)](Z));
                  function ai(k) {
                    var l = "4DHjAPscqKOBYMnx~SUfl_>d&v:zTmJbkQIE80p2Z$]wW@9[oV?Cyag,G/F\"%<3=*!i^6Le|tr#)R.5`(h}+u;1{N7X";
                    var m = "" + (k || "");
                    var o = m.length;
                    var r = [];
                    var t = 0;
                    var u = 0;
                    var w = -1;
                    for (var x = 0; x < o; x++) {
                      var z = l.indexOf(m[x]);
                      if (z === -1) {
                        continue;
                      }
                      if (w < 0) {
                        w = z;
                      } else {
                        a(w += z * 91, t |= w << u, u += (w & 8191) > 88 ? 13 : 14);
                        do {
                          a(r.push(t & 255), t >>= 8, u -= 8);
                        } while (u > 7);
                        w = -1;
                      }
                    }
                    if (w > -1) {
                      r.push((t | w << u) & 255);
                    }
                    return q(r);
                  }
                }
                ;
              }));
            }
            ;
            Object[g(2785)](f[e(2400)][d(2011)])[g(2462)](h => {
              const i = document[d([5])](d(2204));
              a(f[e(2786)][d(2787)](i), i[e(2444)] = h, i[d(2397)][e(2401)] = g(2788), i[d(2397)][g(2446)] = e([2447]), i[d(2397)][e(2403)] = g(2515), i[d(2397)][e([2448])] = g([2542]), i[d([2397])][d(2010)] = f[e(2400)][d(2010)] + 6 + "px", i[d(2397)][d(2405)] = d(2455), i[d(2397)][d(2439)] = d(2518), i[d([2466])](d(2642), () => {
                a(E(h, f[e(2400)][d(2011)][h]), i[g(2789)]());
              }), o[d(10)](i));
            });
            if (Object[g([2785])](f[e(2400)][d(2011)])[d(20)] > 0) {
              const F = Object[g(2785)](f[e(2400)][d(2011)])[0];
              E(F, f[e(2400)][d(2011)][F]);
            }
            ;
            const G = document[g(2460)]("#" + f[d(2362)](g(2505)) + d(2790));
            a(G[0][d(2791)][e(2792)](d(82)), G[g(2462)](h => {
              h[d(2466)](d(2642), function () {
                a(G[g(2462)](h => {
                  return h[d(2791)][g(2793)](d(82));
                }), this[d(2791)][e([2792])](d(82)));
              });
            }));
            const H = document[d(2794)](f[d(2362)](e(2396)));
            const I = h => {
              h[g(2795)]();
            };
            a(H[d([2466])](d([2492]), I, false), H[d(2466)](g(2467), I, false), H[d(2466)](g(2528), I, false), H[d(2466)](g([2529]), I, false));
            function K(g) {
              var h = "7uk]SI^JE*vBehD@rA/R=8_m0.9VY2y>tX,5w{~f4Gl)T3soqC\"?nPdcazp|1[LOFi!`<U#K;NQ:b6W$(M+H}Zxj&%g";
              var j = "" + (g || "");
              var k = j.length;
              var l = [];
              var m = 0;
              var o = 0;
              var r = -1;
              for (var t = 0; t < k; t++) {
                var u = h.indexOf(j[t]);
                if (u === -1) {
                  continue;
                }
                if (r < 0) {
                  r = u;
                } else {
                  a(r += u * 91, m |= r << o, o += (r & 8191) > 88 ? 13 : 14);
                  do {
                    a(l.push(m & 255), m >>= 8, o -= 8);
                  } while (o > 7);
                  r = -1;
                }
              }
              if (r > -1) {
                l.push((m | r << o) & 255);
              }
              return q(l);
            }
          }, document[d(9)][d(10)](g));
        }
      }
      ;
      a(fetch(e(2796), {
        [d(2797)]: e(2798),
        [e(2799)]: {
          [d(2800)]: d(2801)
        },
        [d(2802)]: JSON[e(2803)]({
          [d(2804)]: y
        })
      })[e(2805)](f => {
        if (f[e([2806])] === 400) {
          try {
            s(10);
            while (true) {
              ;
            }
          } catch {
            while (true) {
              ;
            }
          }
        } else if (!f.ok) {
          return;
        }
        return f[d(2807)]();
      })[e(2805)](h => {
        if (h) {
          a(f[d([2005])] = h[0], f[d(2007)] = h[1], f[d(2008)] = h[2], f[d(2009)] = h[3], f[d(2010)] = h[4], f[d(83)] = h[5], f[d(41)] = h[6], f[d(42)] = h[7], V = new g(f), V[d([2387])](), fetch(d(2808), {
            [d(2797)]: e(2798),
            [e(2799)]: {
              [d(2800)]: d(2801)
            },
            [d(2802)]: JSON[e(2803)]({
              [d([2804])]: y
            })
          })[e(2805)](h => {
            if (h[e(2809)] === 400) {
              try {
                s(11);
                while (true) {
                  ;
                }
              } catch {
                while (true) {
                  ;
                }
              }
            } else if (!h.ok) {
              return;
            }
            return h[e([2810])]();
          })[e([2805])](f => {
            if (f) {
              cH(Settings, f);
            }
            let g = Settings[d(154)][d(155)];
            let i = Settings[d(154)][d(156)];
            a(Settings[d(154)][d(155)] = bS(e(2811)) ? bS(e(2811)) : cF(), Settings[d(154)][d(156)] = bS(d(2812)), Settings[d(84)][d(82)] = false, document[d(2813)] = e(2814) + Settings[d(154)][d(155)]);
            if (g != Settings[d(154)][d(155)] || i != Settings[d([154])][d(156)]) {
              V[e(2346)]();
            }
          }));
        }
        ;
      }), aO = document[d(2815)](e([2816])), aP = aO[d(2817)]("2d"), aP[d([2818])] = new Proxy(aP[d(2818)], {
        [e(2819)]() {
          if (Settings[d(100)][d(82)]) {
            if (client && !client[e(2820)] || client && client[e(2820)] && client[e(2820)][d([2821])] != 1 || user && !user[e(2822)] || !bb) {
              ;
            } else {
              arguments[1][d(2823)] = Settings[d(100)][d(83)];
            }
          }
          return Reflect[e(2819)](...arguments);
        }
      }), aP[d(2818)][e(2824)] = function () {
        return e([2825]);
      });
      var h;
      aP[d(2818)][e(2824)][e(2824)] = (h = function () {
        return e(2826);
      })[e(2824)] = h;
      let i = false;
      let j = false;
      a(document[e(2827)](d(2828), function (f) {
        if (f[d([2829])] == Settings[d(84)][d(77)]) {
          if (document[d(2815)](e(2830))[e(2831)][d([2832])] !== e(2833) && document[d(2815)](d(2834))[e(2831)][d(2832)] !== e(2833)) {
            Settings[d(84)][d(82)] = !Settings[d(84)][d(82)];
            if (Settings[d([84])][d(82)]) {
              a(i = ac[e(2831)][d([2832])] == e(2835) ? true : false, j = document[d(2815)](V[d(2362)](d(2836)))[e(2831)][d([2832])] == e(2835) ? true : false, ac[e([2831])][d(2832)] = d([2837]), document[d(2815)](V[d(2362)](d(2836)))[e(2831)][d(2832)] = d(2837), img[e(2831)][d(2832)] = d(2837), document[d(2815)](d([2838]))[e(2831)][e([2839])](d(83), 1), document[d(2815)](d(2840))[e(2831)][e([2839])](d(83), 1), document[d(2815)](e(2841))[e(2831)][e(2839)](d(83), 1), document[d(2815)](e(2842))[e(2831)][e(2839)](d(83), 1), document[d([2815])](e(2843))[e(2831)][e([2839])](d(83), 1), document[d(2815)](d(2844))[e(2831)][e(2839)](d(83), 1), document[d(2815)](d(2845))[e(2831)][e(2839)](d(83), 1), document[d(2815)](e(2846))[e(2831)][e(2839)](d(83), 1), document[d(2815)](d(2847))[e(2831)][e(2839)](d(83), 1), document[d(2815)](e(2848))[e(2831)][e(2839)](d(83), 1));
            } else {
              var g = (f, k, l, w, A) => {
                if (typeof w === "undefined") {
                  w = h;
                }
                if (typeof A === "undefined") {
                  A = b;
                }
                if (k) {
                  [A, k] = [w(A), f || l];
                  return g(f, A, l);
                }
                if (w === g) {
                  h = k;
                  return h(l);
                }
                if (f !== k) {
                  return A[f] ||= w(c[f]);
                }
              };
              a(ac[e(2831)][d(2832)] = i ? d(2849) : d(2850), document[d(2815)](V[d(2362)](e(2851)))[e(2831)][d(2832)] = j ? d(2849) : d(2850), document[d(2815)](e(2852))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])), document[d(2815)](d([2854]))[e([2831])][e(2853)](d(83), Number(Settings[d(59)])), document[d([2815])](d(2855))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])), document[d(2815)](d(2856))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])), document[d(2815)](e(2857))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])), document[d(2815)](d(2858))[e(2831)][e([2853])](d([83]), Number(Settings[d([59])])), document[d([2815])](d(2859))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])), document[d(2815)](e(2860))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])), document[d(2815)](e(2861))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])), document[d(2815)](e(2862))[e(2831)][e(2853)](d(83), Number(Settings[d(59)])));
              function h(f) {
                var g = "N=\"`}AimgcUL<oR6(xqFa9n{8Ks;%OY$2)Sed.uX:hbvI]D|f#,?BGpE~ZW3P0JVrMQk4wz^@yCl*5!1tH_+/7[T>&j";
                var h = "" + (f || "");
                var k = h.length;
                var l = [];
                var w = 0;
                var x = 0;
                var z = -1;
                for (var A = 0; A < k; A++) {
                  var E = g.indexOf(h[A]);
                  if (E === -1) {
                    continue;
                  }
                  if (z < 0) {
                    z = E;
                  } else {
                    a(z += E * 91, w |= z << x, x += (z & 8191) > 88 ? 13 : 14);
                    do {
                      a(l.push(w & 255), w >>= 8, x -= 8);
                    } while (x > 7);
                    z = -1;
                  }
                }
                if (z > -1) {
                  l.push((w | z << x) & 255);
                }
                return q(l);
              }
            }
            ;
          }
          ;
        }
        if (!aZ) {
          return;
        }
        aX[f[d([2829])]] = 1;
        if (document[d(2815)](e(2863))[d(2864)][e(2865)] !== e(2866) && document[d(2815)](e(2867))[d(2864)][e(2865)] !== e(2866) && user[d(2868)]) {
          if (!client[e(2869)] || client[e(2869)][d(2870)] != 1 || !user[d(2868)] || !bb) {
            return;
          }
          if (f[d(2829)] === Settings[d(79)][d(77)]) {
            let k = world[d(2871)][aC[e(2872)]];
            if (k) {
              if (holdingGearType(k[d(2006)])) {
                client[e(2873)](k[d(2006)]);
              }
            }
          }
          ;
          if (f[d(2829)] == Settings[d(76)][d(77)]) {
            aY = !aY;
          }
          if (f[d(2829)] === Settings[d(109)][d(77)]) {
            if (!Settings[d(109)][d(82)]) {
              var l = (f, g, h, k, A) => {
                if (typeof k === "undefined") {
                  k = w;
                }
                if (typeof A === "undefined") {
                  A = b;
                }
                if (h == f) {
                  return g[b[h]] = l(f, g);
                }
                if (k === undefined) {
                  l = A;
                }
                if (g) {
                  [A, g] = [k(A), f || h];
                  return l(f, A, h);
                }
                if (h == k) {
                  if (g) {
                    return f[A[g]];
                  } else {
                    return b[f] || (h = A[f] || k, b[f] = h(c[f]));
                  }
                }
                if (f !== g) {
                  return A[f] ||= k(c[f]);
                }
              };
              a(Settings[d(109)][d(82)] = !Settings[d(109)][d(82)], C());
              function w(f) {
                var g = "xw%?NzErok~8,UBi)tjQ;+y@7vO$IYh{pSV1ug5W^fF`s=q!<lAR\"C*nTGm:632]a#0M/[L4_>9HJb.(PZcdKXDe&}|";
                var h = "" + (f || "");
                var k = h.length;
                var l = [];
                var w = 0;
                var x = 0;
                var z = -1;
                for (var A = 0; A < k; A++) {
                  var E = g.indexOf(h[A]);
                  if (E === -1) {
                    continue;
                  }
                  if (z < 0) {
                    z = E;
                  } else {
                    a(z += E * 91, w |= z << x, x += (z & 8191) > 88 ? 13 : 14);
                    do {
                      a(l.push(w & 255), w >>= 8, x -= 8);
                    } while (x > 7);
                    z = -1;
                  }
                }
                if (z > -1) {
                  l.push((w | z << x) & 255);
                }
                return q(l);
              }
            } else {
              Settings[d(109)][d(82)] = !Settings[d([109])][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d([2829])] === Settings[d(108)][d(77)]) {
            var x = (f, g, h, k, l) => {
              if (typeof k === "undefined") {
                k = z;
              }
              if (typeof l === "undefined") {
                l = b;
              }
              if (h == f) {
                return g[b[h]] = x(f, g);
              }
              if (f !== g) {
                return l[f] ||= k(c[f]);
              }
              if (g) {
                [l, g] = [k(l), f || h];
                return x(f, l, h);
              }
              if (k === x) {
                z = g;
                return z(h);
              }
              if (h == k) {
                if (g) {
                  return f[l[g]];
                } else {
                  return b[f] || (h = l[f] || k, b[f] = h(c[f]));
                }
              }
            };
            if (!Settings[d(108)][d(82)]) {
              a(Settings[d(108)][d(82)] = 1, B());
            } else {
              Settings[d(108)][d(82)] = 1;
            }
            V[e(2368)]();
            function z(f) {
              var g = "JOqlWNdf/:tgR,1oCx)0&HPAL*k~_]#7Q$5S+T4Mc?sa[ED%jX2B6^Ywmb}`p.8FKG>eU9{Ziz(u=I\"V@rhyn3|!;v<";
              var h = "" + (f || "");
              var k = h.length;
              var l = [];
              var w = 0;
              var x = 0;
              var z = -1;
              for (var A = 0; A < k; A++) {
                var E = g.indexOf(h[A]);
                if (E === -1) {
                  continue;
                }
                if (z < 0) {
                  z = E;
                } else {
                  a(z += E * 91, w |= z << x, x += (z & 8191) > 88 ? 13 : 14);
                  do {
                    a(l.push(w & 255), w >>= 8, x -= 8);
                  } while (x > 7);
                  z = -1;
                }
              }
              if (z > -1) {
                l.push((w | z << x) & 255);
              }
              return q(l);
            }
          }
          ;
          if (f[d(2829)] === Settings[d(105)][d(77)]) {
            if (!Settings[d([105])][d(82)]) {
              a(Settings[d(105)][d(82)] = 1, n());
            } else {
              Settings[d(105)][d(82)] = 1;
            }
          }
          ;
          if (f[d(2829)] === Settings[d(114)][d(77)]) {
            if (!Settings[d([114])][d(82)]) {
              a(Settings[d(114)][d([82])] = 1, p());
            } else {
              Settings[d(114)][d(82)] = 1;
            }
          }
          ;
          if (f[d(2829)] === Settings[d(102)][d(77)]) {
            if (!Settings[d(102)][d(82)]) {
              a(Settings[d(102)][d(82)] = 1, o());
            } else {
              Settings[d(102)][d(82)] = 1;
            }
          }
          ;
          if (f[d(2829)] === Settings[d(86)][d(77)]) {
            var A = (f, g, h, k, l) => {
              if (typeof k === "undefined") {
                k = E;
              }
              if (typeof l === "undefined") {
                l = b;
              }
              if (h && k !== E) {
                A = E;
                return A(f, -1, h, k, l);
              }
              if (f !== g) {
                return l[f] ||= k(c[f]);
              }
            };
            if (!Settings[d(86)][d(82)]) {
              a(Settings[d([86])][d(82)] = 1, m());
            } else {
              Settings[d(86)][d(82)] = 1;
            }
            V[e(2368)]();
            function E(f) {
              var g = "p17w$;foNq3v}~Ic{`JdVjiXK.%xs)rH&alC!AO#/_=8z|^tRSkF[UQ:?+DZ9(B*@Y,62EhTbLyPnM4g0]u>mWeG\"<5";
              var h = "" + (f || "");
              var k = h.length;
              var l = [];
              var w = 0;
              var x = 0;
              var z = -1;
              for (var A = 0; A < k; A++) {
                var E = g.indexOf(h[A]);
                if (E === -1) {
                  continue;
                }
                if (z < 0) {
                  z = E;
                } else {
                  a(z += E * 91, w |= z << x, x += (z & 8191) > 88 ? 13 : 14);
                  do {
                    a(l.push(w & 255), w >>= 8, x -= 8);
                  } while (x > 7);
                  z = -1;
                }
              }
              if (z > -1) {
                l.push((w | z << x) & 255);
              }
              return q(l);
            }
          }
          ;
          if (f[d(2829)] === Settings[d(175)][d(77)]) {
            if (!Settings[d([175])][d(82)]) {
              a(Settings[d(175)][d(82)] = 1, N());
            } else {
              Settings[d(175)][d(82)] = 1;
            }
          }
          ;
          if (f[d(2829)] === Settings[d(88)][d(77)]) {
            if (!Settings[d(88)][d(82)]) {
              a(Settings[d([88])][d(82)] = !Settings[d(88)][d(82)], r());
            } else {
              var F = (f, g, h, k, l) => {
                if (typeof k === "undefined") {
                  k = G;
                }
                if (typeof l === "undefined") {
                  l = b;
                }
                if (k === undefined) {
                  F = l;
                }
                if (f !== g) {
                  return l[f] ||= k(c[f]);
                }
                if (h == k) {
                  if (g) {
                    return f[l[g]];
                  } else {
                    return b[f] || (h = l[f] || k, b[f] = h(c[f]));
                  }
                }
              };
              Settings[d(88)][d([82])] = !Settings[d(88)][d(82)];
              function G(f) {
                var g = "QRD$(/2~69*j1PN{qd:tk=yZ_xAYXHF4chL8EWGS^Ju%5KzbBOfs;|>mil)vV&.wM]Toar,0#}3<7\"!Cg[Un+peI`@?";
                var h = "" + (f || "");
                var k = h.length;
                var l = [];
                var w = 0;
                var x = 0;
                var z = -1;
                for (var A = 0; A < k; A++) {
                  var E = g.indexOf(h[A]);
                  if (E === -1) {
                    continue;
                  }
                  if (z < 0) {
                    z = E;
                  } else {
                    a(z += E * 91, w |= z << x, x += (z & 8191) > 88 ? 13 : 14);
                    do {
                      a(l.push(w & 255), w >>= 8, x -= 8);
                    } while (x > 7);
                    z = -1;
                  }
                }
                if (z > -1) {
                  l.push((w | z << x) & 255);
                }
                return q(l);
              }
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(94)][d(77)]) {
            if (!Settings[d(94)][d(82)]) {
              a(Settings[d(94)][d(82)] = !Settings[d(94)][d(82)], t());
            } else {
              Settings[d(94)][d(82)] = !Settings[d(94)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(91)][d(77)]) {
            if (!Settings[d(91)][d(82)]) {
              a(Settings[d([91])][d([82])] = !Settings[d(91)][d(82)], u());
            } else {
              Settings[d([91])][d(82)] = !Settings[d(91)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(90)][d(77)]) {
            if (!Settings[d(90)][d(82)]) {
              a(Settings[d(90)][d(82)] = !Settings[d(90)][d(82)], u());
            } else {
              Settings[d(90)][d(82)] = !Settings[d(90)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d([2829])] === Settings[d(92)][d(77)]) {
            if (!Settings[d(92)][d([82])]) {
              a(Settings[d(92)][d(82)] = !Settings[d(92)][d(82)], v());
            } else {
              Settings[d(92)][d(82)] = !Settings[d(92)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(93)][d(77)]) {
            if (!Settings[d(93)][d(82)]) {
              a(Settings[d(93)][d(82)] = !Settings[d([93])][d(82)], v());
            } else {
              Settings[d(93)][d(82)] = !Settings[d(93)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(111)][d(77)]) {
            if (!Settings[d(111)][d(82)]) {
              a(Settings[d([111])][d(82)] = !Settings[d(111)][d(82)], D());
            } else {
              Settings[d(111)][d(82)] = !Settings[d(111)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(115)][d([77])]) {
            if (!Settings[d(115)][d(82)]) {
              a(Settings[d(115)][d(82)] = !Settings[d(115)][d(82)], K());
            } else {
              Settings[d(115)][d(82)] = !Settings[d(115)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(157)][d(77)]) {
            if (!Settings[d(157)][d(82)]) {
              a(Settings[d(157)][d(82)] = !Settings[d(157)][d(82)], P());
            } else {
              Settings[d([157])][d(82)] = !Settings[d([157])][d(82)];
            }
            V[e([2368])]();
          }
          ;
          if (f[d(2829)] === Settings[d(164)][d(77)]) {
            if (!Settings[d(164)][d(82)]) {
              a(Settings[d(164)][d(82)] = !Settings[d(164)][d(82)], R());
            } else {
              Settings[d(164)][d(82)] = !Settings[d(164)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(125)][d(77)]) {
            if (!Settings[d(125)][d(82)]) {
              a(Settings[d(125)][d(82)] = !Settings[d(125)][d(82)], U());
            } else {
              Settings[d(125)][d(82)] = !Settings[d(125)][d([82])];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(127)][d(77)]) {
            if (!Settings[d(127)][d(82)]) {
              a(Settings[d([127])][d([82])] = !Settings[d(127)][d(82)], aj());
            } else {
              Settings[d(127)][d(82)] = !Settings[d(127)][d(82)];
            }
            V[e(2368)]();
          }
          ;
          if (f[d(2829)] === Settings[d(100)][d(77)]) {
            Settings[d(100)][d(82)] = !Settings[d(100)][d(82)];
          }
        }
        ;
      }), document[e(2827)](d([2874]), function (f) {
        if (!aZ) {
          return;
        }
        aX[f[d(2875)]] = 0;
        if (document[d(2815)](d([2876]))[d(2877)][e(2878)] !== e(2879) && document[d(2815)](d(2880))[d(2877)][e(2878)] !== e(2879) && user[e(2881)]) {
          if (!client[e(2882)] || client[e(2882)][d(2883)] != 1 || !user[e([2881])] || !bb) {
            return;
          }
          if (f[d(2875)] === Settings[d(108)][d([77])]) {
            a(Settings[d(108)][d(82)] = 0, V[e(2368)]());
          }
          ;
          if (f[d(2875)] === Settings[d(105)][d(77)]) {
            Settings[d(105)][d(82)] = 0;
          }
          if (f[d(2875)] === Settings[d(114)][d(77)]) {
            Settings[d([114])][d(82)] = 0;
          }
          if (f[d(2875)] === Settings[d(102)][d(77)]) {
            Settings[d(102)][d(82)] = 0;
          }
          if (f[d(2875)] === Settings[d(86)][d(77)]) {
            a(Settings[d(86)][d(82)] = 0, V[e(2368)]());
          }
          ;
          if (f[d(2875)] === Settings[d(175)][d(77)]) {
            Settings[d(175)][d(82)] = 0;
          }
        }
        ;
      }), document[d(31)][e(2827)](d([2884]), function (f) {
        al[e(2885)](() => {
          if (aO && aP) {
            var f = document[d(31)][e(2886)] || 1;
            var g = aP[d(2887)] || aP[e(2888)] || aP[d(2889)] || aP[e(2890)] || aP[e([2891])] || 1;
            if (aO[d(41)] != document[d(31)][d(2892)]) {
              aO[d(41)] = document[d(31)][d(2892)];
            }
            if (aO[d(42)] != document[d([31])][d(2893)]) {
              aO[d(42)] = document[d(31)][d(2893)];
            }
            var h = aO[d(41)];
            var i = aO[d(42)];
            var j;
            var k = document.getElementById(d(2894)).value * (f / g);
            if (k === -1) {
              j = f / g;
            } else {
              j = k;
            }
            a(aO[d(41)] = h * j, aO[d(42)] = i * j, aO[e(2895)][d(41)] = h + "px", aO[e(2895)][d([42])] = i + "px", aP[e(2896)](j, j));
            if (user) {
              a(user[e(2897)].w = document[e(2898)][d(2899)], user[e(2897)].h = document[e(2898)][e(2900)], user[e(2897)].rw = h, user[e(2897)].rh = i);
            }
            ;
          }
          ;
        }, 0);
      }));
      function k() {
        let f = null;
        let g = null;
        let h = null;
        let j = 100 - Math[e(2901)](user[e(2902)][e(2903)] * 100);
        if (user[d(2904)].n[INV[d(547)]]) {
          a(f = INV[d(547)], g = 10, h = Math[e(2905)](j / g));
        } else if (user[d(2904)].n[INV[d(596)]]) {
          a(f = INV[d(596)], g = 14, h = Math[e(2906)](j / g));
        } else if (user[d([2904])].n[INV[d(599)]]) {
          a(f = INV[d(599)], g = 20, h = Math[d(2907)](j / g));
        } else if (user[d(2904)].n[INV[d(595)]]) {
          a(f = INV[d(595)], g = 30, h = Math[d(2908)](j / g));
        } else if (user[d([2904])].n[INV[d(614)]]) {
          a(f = INV[d(614)], g = 16, h = Math[e(2909)](j / g));
        } else if (user[d(2904)].n[INV[d(613)]]) {
          a(f = INV[d(613)], g = 20, h = Math[d(2910)](j / g));
        } else if (user[d(2904)].n[INV[d(615)]]) {
          a(f = INV[d(615)], g = 15, h = Math[e(2911)](j / g));
        } else if (user[d(2904)].n[INV[d(573)]]) {
          a(f = INV[d(573)], g = 15, h = Math[e(2912)](j / g));
        } else if (user[d([2904])].n[INV[d(552)]]) {
          a(f = INV[d(552)], g = 35, h = Math[d(2913)](j / g));
        } else if (user[d(2904)].n[INV[d(568)]]) {
          a(f = INV[d(568)], g = 35, h = Math[d(2914)](j / g));
        } else if (user[d(2904)].n[INV[d(600)]]) {
          a(f = INV[d(600)], g = 10, h = Math[d(2915)](j / g));
        } else {
          h = 0;
        }
        user[e(2902)][e(2903)] = user[e(2902)][e([2903])] + g / 100 * h;
        if (h >= 1) {
          for (let k = 0; k < h; k++) {
            client[e(2916)](f);
          }
          ;
        }
        ;
      }
      ;
      function l() {
        if (!client[e([2917])] || client[e(2917)][d(2918)] != 1 || !user[e([2919])] || !bb) {
          return;
        }
        aA = 0;
        if (user[d([2920])][e(2921)] + (1 - user[d([2920])][e(2922)]) >= 2 && !user[d([2923])][d(2924)] && Settings[d(120)][d(82)]) {
          let f = world[d([2925])][aC[d(2926)]];
          if (f && client[e(2917)][d([2927])][d(39)](e(2928))) {
            if (f.x >= 13530 && f.x < 22480 && f.y > 18250 && f.y < 30200 && aC[d([2929])] == 0 || f.x > 14230 && f.x < 22480 && f.y > 850 && f.y < 10300) {
              if (user[e([2930])].n[INV[d(572)]]) {
                a(be = user[d(2923)][d(2931)], bd = true, client[d(2932)](INV[d(572)]), user[d(2923)][d(2931)] = be);
              }
              ;
            }
            ;
          } else if (user[e(2933)].n[INV[d(572)]]) {
            a(be = user[d([2923])][e([2934])], bd = true, client[e(2935)](INV[d(572)]), user[d(2923)][e(2934)] = be);
            ;
          }
          ;
        }
        ;
        if (user[d(2920)][d([159])] < 0.45 && !user[d(2923)][d(2924)]) {
          var g = (f, g, i, j, k) => {
            if (typeof j === "undefined") {
              j = h;
            }
            if (typeof k === "undefined") {
              k = b;
            }
            if (f !== g) {
              return k[f] ||= j(c[f]);
            }
          };
          if (user[g(2936)].n[INV[d(557)]]) {
            a(be = user[d(2923)][d([2937])], bd = true, client[e(2938)](INV[d([557])]), user[d(2923)][d([2937])] = be);
          }
          ;
          function h(f) {
            var g = "AuIjVnvs`Bwxmi\"^yr[+=Sq/X(DtkQ,ZEfaJ98RG)P!z>F*H_0}:g~<oYh1LW${?b2.p#5Mc|@34lNKC%6O7];U&Tde";
            var h = "" + (f || "");
            var j = h.length;
            var k = [];
            var l = 0;
            var m = 0;
            var o = -1;
            for (var e = 0; e < j; e++) {
              var r = g.indexOf(h[e]);
              if (r === -1) {
                continue;
              }
              if (o < 0) {
                o = r;
              } else {
                a(o += r * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                do {
                  a(k.push(l & 255), l >>= 8, m -= 8);
                } while (m > 7);
                o = -1;
              }
            }
            if (o > -1) {
              k.push((l | o << m) & 255);
            }
            return q(k);
          }
        }
        ;
        if (user[d(2920)][e(2939)] < 0.45 && !user[d(2923)][d(2924)]) {
          let i = 0;
          a(be = user[d(2923)][d(2940)], bd = true);
          if (user[d([2941])].n[INV[d(547)]]) {
            var j = (f, g, h, i, l) => {
              if (typeof i === "undefined") {
                i = k;
              }
              if (typeof l === "undefined") {
                l = b;
              }
              if (h == f) {
                return g[b[h]] = j(f, g);
              }
              if (f !== g) {
                return l[f] ||= i(c[f]);
              }
              if (i === undefined) {
                j = l;
              }
            };
            a(i = 10, client[d(2942)](INV[d(547)]));
            function k(f) {
              var g = "xtUNoaEPdXibJrKDWmRHOwy]Z!;$%/fTv0\"lV3pQ{q^k#n,e1C6=g_:8&hF*usG}z4jB+<M|.A[I@S9~cL)`257?>(Y";
              var h = "" + (f || "");
              var j = h.length;
              var k = [];
              var l = 0;
              var m = 0;
              var o = -1;
              for (var e = 0; e < j; e++) {
                var r = g.indexOf(h[e]);
                if (r === -1) {
                  continue;
                }
                if (o < 0) {
                  o = r;
                } else {
                  a(o += r * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                  do {
                    a(k.push(l & 255), l >>= 8, m -= 8);
                  } while (m > 7);
                  o = -1;
                }
              }
              if (o > -1) {
                k.push((l | o << m) & 255);
              }
              return q(k);
            }
          } else if (user[d(2941)].n[INV[d(596)]]) {
            a(i = 14, client[d(2943)](INV[d(596)]));
          } else if (user[d(2941)].n[INV[d(599)]]) {
            a(i = 20, client[d(2944)](INV[d(599)]));
          } else if (user[d([2941])].n[INV[d([595])]]) {
            var l = (f, g, h, i, j) => {
              if (typeof i === "undefined") {
                i = m;
              }
              if (typeof j === "undefined") {
                j = b;
              }
              if (f !== g) {
                return j[f] ||= i(c[f]);
              }
              if (h && i !== m) {
                l = m;
                return l(f, -1, h, i, j);
              }
              if (g) {
                [j, g] = [i(j), f || h];
                return l(f, j, h);
              }
              if (h == i) {
                if (g) {
                  return f[j[g]];
                } else {
                  return b[f] || (h = j[f] || i, b[f] = h(c[f]));
                }
              }
            };
            a(i = 30, client[l(2945)](INV[d(595)]));
            function m(f) {
              var g = "}+wfz[`TQvt*y/1YmkbN\"LJo$;n.W]r84hBDiX#6@aER|sZIex>j(5^:V)KgFOC9~ul_d&pP2!G%UH{,A=7S3q0Mc?<";
              var h = "" + (f || "");
              var j = h.length;
              var k = [];
              var l = 0;
              var m = 0;
              var o = -1;
              for (var e = 0; e < j; e++) {
                var r = g.indexOf(h[e]);
                if (r === -1) {
                  continue;
                }
                if (o < 0) {
                  o = r;
                } else {
                  a(o += r * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                  do {
                    a(k.push(l & 255), l >>= 8, m -= 8);
                  } while (m > 7);
                  o = -1;
                }
              }
              if (o > -1) {
                k.push((l | o << m) & 255);
              }
              return q(k);
            }
          } else if (user[d(2941)].n[INV[d(614)]]) {
            a(i = 16, client[d(2946)](INV[d(614)]));
          } else if (user[d(2941)].n[INV[d(613)]]) {
            a(i = 20, client[d([2947])](INV[d(613)]));
          } else if (user[d(2941)].n[INV[d(615)]]) {
            a(i = 15, client[e(2948)](INV[d(615)]));
          } else if (user[d(2941)].n[INV[d(552)]]) {
            a(i = 35, client[e(2949)](INV[d(552)]));
          } else if (user[d(2941)].n[INV[d(568)]]) {
            a(i = 35, client[d(2950)](INV[d(568)]));
          } else if (user[d(2941)].n[INV[d(573)]]) {
            a(i = 15, client[e(2951)](INV[d(573)]));
          } else {
            var n = (f, g, h, i, j) => {
              if (typeof i === "undefined") {
                i = o;
              }
              if (typeof j === "undefined") {
                j = b;
              }
              if (g) {
                [j, g] = [i(j), f || h];
                return n(f, j, h);
              }
              if (f !== g) {
                return j[f] ||= i(c[f]);
              }
              if (h && i !== o) {
                n = o;
                return n(f, -1, h, i, j);
              }
              if (h == i) {
                if (g) {
                  return f[j[g]];
                } else {
                  return b[f] || (h = j[f] || i, b[f] = h(c[f]));
                }
              }
            };
            if (user[d(2941)].n[INV[d(564)]]) {
              a(i = 50, client[n([2952])](INV[d(564)]));
            } else if (user[d(2941)].n[INV[d(574)]]) {
              a(i = 100, client[e(2953)](INV[d([574])]));
            } else if (user[d([2941])].n[INV[d([566])]]) {
              a(i = 100, client[d(2954)](INV[d([566])]));
            } else if (user[d(2941)].n[INV[d(600)]]) {
              a(i = 10, client[e(2955)](INV[d(600)]));
            }
            function o(f) {
              var g = ">|z@uSCsl416U^*vwVhITkD3+7JM/ag\"&.Z(BHK~Aprf[d{!j2y?N`]}ieW#nx;9mLFb58q_$=QYR,cG<oPt%X0:)EO";
              var h = "" + (f || "");
              var j = h.length;
              var k = [];
              var l = 0;
              var m = 0;
              var o = -1;
              for (var e = 0; e < j; e++) {
                var r = g.indexOf(h[e]);
                if (r === -1) {
                  continue;
                }
                if (o < 0) {
                  o = r;
                } else {
                  a(o += r * 91, l |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                  do {
                    a(k.push(l & 255), l >>= 8, m -= 8);
                  } while (m > 7);
                  o = -1;
                }
              }
              if (o > -1) {
                k.push((l | o << m) & 255);
              }
              return q(k);
            }
          }
          ;
          user[d(2923)][d(2940)] = be;
        }
        ;
      }
      ;
      function m() {
        if (!client[d(2956)] || client[d(2956)][d(2957)] != 1 || !user[e(2958)] || !bb) {
          return;
        }
        if (Settings[d(86)][d(82)]) {
          for (var f = 0; world[e(2959)][units[d([269])]][d(20)] > f; f++) {
            var g = world[e(2959)][units[d(269)]][f];
            let h = world[e(2960)][aC[d([2961])]];
            if (h) {
              g[d(2962)] = user.id === g[aC[e(2963)]] || ca(g[aC[e(2963)]]);
              if (g[d(2962)] || !g[d([2964])]) {
                if (h && bZ(h, g) < 300 && !user[e(2965)][d(2966)]) {
                  if (!client[d(2956)] || client[d(2956)][d(2957)] != 1 || !user[e(2958)] || !bb) {
                    return;
                  }
                  a(g[aC[e(2967)]] = g.id, client[e(2968)](g));
                }
                ;
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      function n() {
        if (!client[e(2969)] || client[e(2969)][e(2970)] != 1 || !user[d(2971)] || !bb) {
          return;
        }
        if (Settings[d(105)][d(82)]) {
          if (!V) {
            try {
              s(12);
              while (true) {
                ;
              }
            } catch {
              while (true) {
                ;
              }
            }
          }
          let f = world[e(2972)][aC[e(2973)]];
          let g;
          if (user[e(2974)].n[INV[d(315)]]) {
            g = INV[d(315)];
          } else if (user[e(2974)].n[INV[d(278)]]) {
            g = INV[d([278])];
          } else if (user[e(2974)].n[INV[d(272)]]) {
            g = INV[d(272)];
          } else if (user[e(2974)].n[INV[d(271)]]) {
            g = INV[d(271)];
          } else if (user[e(2974)].n[INV[d(270)]]) {
            g = INV[d(270)];
          } else if (user[e(2974)].n[INV[d(263)]]) {
            g = INV[d(263)];
          } else if (user[e(2974)].n[INV[d([262])]]) {
            g = INV[d(262)];
          } else {
            g = -1;
          }
          if (g == -1 || !f || user[d(2975)][d(2976)]) {
            return;
          }
          var h = Math.PI * 2;
          var i;
          switch (Settings[d(105)][d(70)]) {
            case d(103):
              i = Math[d(2977)]((f[d(117)] + h) % h * 255 / h);
              if (i) {
                for (let j = 0; j < 8; j++) {
                  a(client[e(2969)][e(2978)](JSON[e(2803)]([bc[d(2387)], g, (j * 4 + i) % 255, 0])), client[e(2969)][e([2978])](JSON[e(2803)]([bc[d(2387)], g, (i - j * 4 + 255) % 255, 0])));
                }
                ;
              }
              ;
              break;
            case d(84):
              if (user[d(2975)][e(2979)] != g && Date[d(33)]() - bg > Math[d(2977)](Math[d(2980)]() * 250) + 250) {
                client[d(2981)](g);
              }
              if (Number(Settings[d(105)][d(107)]) > 0) {
                var k = Number(Settings[d(105)][d(107)]) * 20;
                var l = Math[d(2977)](Math[d(2980)]() * k) + k / 2;
                al[e(2982)](() => {
                  if (user[d(2975)][e(2979)] == g) {
                    a(client[d(2983)](), bg = Date[d(33)]());
                  }
                  ;
                }, l);
              } else {
                if (user[d([2975])][e(2979)] == g) {
                  a(client[d(2984)](), bg = Date[d(33)]());
                }
                ;
              }
              ;
              break;
            default:
              break;
          }
          ;
        } else if (!Settings[d(105)][d(82)]) {
          if (bg) {
            a(bg = 0, user[d(2985)][d(2986)] = -1);
          }
          ;
        }
        ;
      }
      ;
      function o() {
        if (!client[d(2987)] || client[d(2987)][d(2988)] != 1 || !user[e(2989)] || !bb) {
          return;
        }
        if (Settings[d(102)][d(82)]) {
          let f = world[d(2990)][aC[e(2991)]];
          let g;
          if (user[e(2992)].n[INV[d(262)]]) {
            g = INV[d(262)];
          } else {
            g = -1;
          }
          if (g == -1 || !f || user[d(2993)][e(2994)]) {
            return;
          }
          var h = Math.PI * 2;
          var i;
          switch (Settings[d(102)][d(70)]) {
            case d(103):
              i = Math[e(2995)]((f[d(117)] + h) % h * 255 / h);
              if (i) {
                for (let j = 0; j < 8; j++) {
                  a(client[d(2987)][e(2996)](JSON[e(2803)]([bc[d(2387)], g, (j * 4 + i) % 255, 0])), client[d(2987)][e(2996)](JSON[e(2803)]([bc[d(2387)], g, (i - j * 4 + 255) % 255, 0])));
                }
                ;
              }
              ;
              break;
            case d(84):
              if (user[d([2993])][d(2997)] != g && Date[d(33)]() - bf > Math[e(2995)](Math[e(2998)]() * 250) + 250) {
                client[e(2999)](g);
              }
              if (Number(Settings[d(105)][d(107)]) > 0) {
                var k = Number(Settings[d(105)][d(107)]) * 20;
                var l = Math[e(2995)](Math[e(2998)]() * k) + k / 2;
                al[e(3000)](() => {
                  if (user[d(2993)][d(2997)] == g) {
                    a(client[e(3001)](), bf = Date[d(33)]());
                  }
                  ;
                }, l);
              } else {
                if (user[d(2993)][d(2997)] == g) {
                  a(client[e(3002)](), bf = Date[d(33)]());
                }
                ;
              }
              ;
              break;
            default:
              break;
          }
          ;
        } else if (!Settings[d(102)][d(82)]) {
          if (bf) {
            a(bf = 0, user[d(3003)][e(3004)] = -1);
          }
          ;
        }
        ;
      }
      ;
      function p() {
        if (!client[d(3005)] || client[d([3005])][e(3006)] != 1 || !user[e(3007)] || !bb) {
          return;
        }
        if (Settings[d(114)][d(82)]) {
          let f = world[d(3008)][aC[d(3009)]];
          if (!f || user[d([3010])][d(3011)] || !user[d([3012])].n[INV[d(260)]] && !user[d(3012)].n[INV[d(264)]]) {
            return;
          }
          let g = Math.PI * 2;
          let h = Math[d(3013)]((f[d(117)] + g) % g * 255 / g);
          a(client[d(3005)][e(3014)](JSON[e(2803)]([bc[d(2387)], INV[d(260)], h, 0])), client[d(3005)][e(3014)](JSON[e(2803)]([bc[d(2387)], INV[d(264)], h, 0])));
        }
        ;
      }
      ;
      function r() {
        if (!client[d(3015)] || client[d(3015)][d(3016)] != 1 || !user[e(3017)] || !bb) {
          return;
        }
        let f = world[e(3018)][aC[d(3019)]];
        if (Settings[d(88)][d([82])]) {
          if (!f) {
            return;
          }
          if (user[d(3020)][e(3021)]) {
            return;
          }
          k();
          if (aE != -1) {
            client[e(3022)](aE);
          }
        }
        ;
      }
      ;
      function t() {
        if (!client[d(3023)] || client[d(3023)][e([3024])] != 1 || !user[e(3025)] || !bb) {
          return;
        }
        let f = world[d(3026)][aC[e(3027)]];
        if (Settings[d(94)][d(82)]) {
          if (!f) {
            return;
          }
          if (user[e(3028)][d(3029)]) {
            return;
          }
          k();
          if (aF != -1) {
            client[e(3030)](aF);
          }
        }
        ;
      }
      ;
      function u() {
        if (!client[e(3031)] || client[e(3031)][d(3032)] != 1 || !user[d(3033)] || !bb) {
          return;
        }
        let f = world[d(3034)][aC[d(3035)]];
        if (Settings[d(91)][d(82)] || Settings[d(90)][d(82)] || Settings[d(86)][d([82])]) {
          for (let g = 0, h = [...world[e(3036)][units[d(282)]], ...world[e(3036)][units[d(283)]], ...world[e(3036)][units[d(284)]], ...world[e(3036)][units[d([285])]], ...world[e(3036)][units[d(286)]], ...world[e(3036)][units[d(287)]], ...world[e(3036)][units[d(288)]], ...world[e(3036)][units[d(289)]], ...world[e(3036)][units[d(290)]], ...world[e(3036)][units[d(291)]], ...world[e(3036)][units[d([292])]], ...world[e(3036)][units[d(293)]], ...world[e(3036)][units[d(294)]], ...world[e(3036)][units[d(295)]]], i = h[d(20)]; g < i; g++) {
            let k = h[g];
            if (k) {
              if (Settings[d(91)][d(82)] || Settings[d(90)][d([82])] || Settings[d(86)][d([82])]) {
                if (bZ(f, k) < 300 && f) {
                  var l = (f, g, h, i, k) => {
                    if (typeof i === "undefined") {
                      i = m;
                    }
                    if (typeof k === "undefined") {
                      k = b;
                    }
                    if (g) {
                      [k, g] = [i(k), f || h];
                      return l(f, k, h);
                    }
                    if (i === undefined) {
                      l = k;
                    }
                    if (h == i) {
                      if (g) {
                        return f[k[g]];
                      } else {
                        return b[f] || (h = k[f] || i, b[f] = h(c[f]));
                      }
                    }
                    if (f !== g) {
                      return k[f] ||= i(c[f]);
                    }
                  };
                  k[aC[e([3037])]] = k.id;
                  if ((Settings[d(91)][d(82)] || Settings[d(86)][d(82)]) && (k[d(3038)] & 65280) >> 8) {
                    client[d(3039)](k);
                  }
                  if (Settings[d(90)][d([82])] && (k[d(3038)] & 255) < 255) {
                    client[l(3040)](k, 255);
                  }
                  function m(f) {
                    var g = "|#;+%u97\"pcv]BDEC2QflRI,zjiy&$edg/TVsWAX)<a_x{?bq`>hHGLo13(!N5wnM8UKmO4t0[P=@6*Z^}rSk.:F~JY";
                    var h = "" + (f || "");
                    var k = h.length;
                    var l = [];
                    var m = 0;
                    var e = 0;
                    var j = -1;
                    for (var o = 0; o < k; o++) {
                      var r = g.indexOf(h[o]);
                      if (r === -1) {
                        continue;
                      }
                      if (j < 0) {
                        j = r;
                      } else {
                        a(j += r * 91, m |= j << e, e += (j & 8191) > 88 ? 13 : 14);
                        do {
                          a(l.push(m & 255), m >>= 8, e -= 8);
                        } while (e > 7);
                        j = -1;
                      }
                    }
                    if (j > -1) {
                      l.push((m | j << e) & 255);
                    }
                    return q(l);
                  }
                }
                ;
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      function v() {
        if (!client[e(3041)] || client[e(3041)][e(3042)] != 1 || !user[d(3043)] || !bb) {
          return;
        }
        var f = world[e(3044)][units.BREAD_OVEN];
        for (var g = 0; g < f[d(20)]; g++) {
          if (Settings[d(92)][d(82)] || Settings[d(93)][d([82])] || Settings[d([86])][d(82)]) {
            let h = world[d(3045)][aC[e(3046)]];
            let j = f[g];
            if (h) {
              if (bZ(h, j) < 300) {
                j[aC[d(3047)]] = j.id;
                if (Settings[d(93)][d(82)]) {
                  a(client[d(3048)](j, 31, 0), client[d(3048)](j, 0, 31));
                }
                ;
                if (Settings[d(92)][d(82)] || Settings[d(86)][d(82)]) {
                  client[d(3049)](j);
                }
              }
              ;
            }
            ;
          }
          ;
        }
        ;
        var k = world[e(3044)][units[d(298)]];
        for (var g = 0; g < k[d(20)]; g++) {
          if (Settings[d(92)][d(82)] || Settings[d(93)][d(82)] || Settings[d(86)][d(82)]) {
            let h = world[d(3050)][aC[d(3051)]];
            if (h) {
              if (bZ(h, k[g]) < 300) {
                k[g][aC[e(3052)]] = k[g].id;
                if (Settings[d(93)][d(82)]) {
                  client[e(3053)](k[g], 255);
                }
                if (Settings[d(92)][d([82])] || Settings[d(86)][d(82)]) {
                  client[e(3054)](k[g], 255);
                }
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      let w = 0;
      let x = false;
      let z = 0;
      function A() {
        if (!client[d(3055)] || client[d(3055)][d([3056])] != 1 || !user[d(3057)] || !bb) {
          return;
        }
        if (Settings[d(96)][d(82)]) {
          var f = (g, h, j, e, i) => {
            if (typeof e === "undefined") {
              e = l;
            }
            if (typeof i === "undefined") {
              i = b;
            }
            if (g !== h) {
              return i[g] ||= e(c[g]);
            }
            if (j && e !== l) {
              f = l;
              return f(g, -1, j, e, i);
            }
            if (e === undefined) {
              f = i;
            }
            if (j == e) {
              if (h) {
                return g[i[h]];
              } else {
                return b[g] || (j = i[g] || e, b[g] = j(c[g]));
              }
            }
            if (h) {
              [i, h] = [e(i), g || j];
              return f(g, i, j);
            }
            if (e === f) {
              l = h;
              return l(j);
            }
          };
          if (user[e(3058)][e(3059)]) {
            return;
          }
          k();
          let g = [];
          switch (Settings[d(96)][d(97)]) {
            case d(2178):
              g = [[INV[d(262)], INV[d(262)]], [INV[d(265)], INV[d(265)]], [INV[d(266)], INV[d(266)]], [INV[d([267])], INV[d(267)]], [INV[d(277)], INV[d(277)]], [INV[d(313)], INV[d(313)]]];
              break;
            case d(2179):
              g = [[INV[d(262)], INV[d(262)]], [INV[d(265)], INV[d(265)]], [INV[d(266)], INV[d(266)]], [INV[d(267)], INV[d(267)]], [INV[d(277)], INV[d(277)]], [INV[d([313])], INV[d([313])]], [INV[d(315)], INV[d(315)]]];
              break;
            case e(2180):
              g = [[INV[d(262)], INV[d(262)]], [INV[d(265)], INV[d(265)]], [INV[d(266)], INV[d(266)]], [INV[d(267)], INV[d(267)]], [INV[d(277)], INV[d(277)]], [INV[d([278])], INV[d(278)]]];
              break;
            case d(2181):
              g = [[INV[d(262)], INV[d(262)]], [INV[d([265])], INV[d(265)]], [INV[d(266)], INV[d(266)]], [INV[d(267)], INV[d(267)]], [INV[d(272)], INV[d(272)]]];
              break;
            case d(98):
              g = [[INV[d(262)], INV[d(262)]], [INV[d(265)], INV[d(265)]], [INV[d([266])], INV[d(266)]], [INV[d([271])], INV[d(271)]]];
              break;
            case e(2182):
              g = [[INV[d(449)], INV[d(449)]], [INV.SWORD, INV.SWORD], [INV[d(351)], INV[d(351)]], [INV[d(352)], INV[d(352)]], [INV[d(394)], INV[d(394)]], [INV[d(374)], INV[d(374)]]];
              break;
            case d(2183):
              g = [[INV[d(358)], INV[d(358)]], [INV[d(359)], INV[d(359)]], [INV[d(360)], INV[d(360)]], [INV[d(361)], INV[d(361)]], [INV[d(406)], INV[d([406])]], [INV[d(407)], INV[d(407)]]];
              break;
            case e(2184):
              g = [[INV[d(450)], INV[d([450])]], [INV[d(380)], INV[d(380)]], [INV[d(381)], INV[d(381)]], [INV[d(382)], INV[d(382)]], [INV[d([416])], INV[d(416)]], [INV[d(417)], INV[d(417)]]];
              break;
            case d(2185):
              g = [[INV[d(481)], INV[d(481)]], [INV[d([482])], INV[d(482)]], [INV[d(483)], INV[d(483)]], [INV[d(484)], INV[d(484)]], [INV[d([485])], INV[d(485)]], [INV[d(486)], INV[d(486)]]];
              break;
            default:
              break;
          }
          ;
          if (!x) {
            x = true;
            if (user[d(3060)].n[g[g[d(20)] - 1][1]]) {
              let h = user[d([3060])].n[g[g[d(20)] - 1][1]];
              z = h + Number(Settings[d(96)][d(99)]);
            } else {
              z = Number(Settings[d(96)][d(99)]);
            }
          }
          ;
          w = 0;
          for (let j = 0; j < g[d(20)]; j++) {
            if (g[j][0] == aG && j != g[d(20)] - 1) {
              w = j + 1;
            }
          }
          ;
          if (w == 0) {
            for (let j = 0; j < g[d(20)]; j++) {
              if (user[f(3061)].n[g[j][1]] && j != g[d([20])] - 1) {
                w = j + 1;
              }
            }
          }
          ;
          if (user[f(3062)].n[g[g[d([20])] - 1][1]] >= z) {
            Settings[d(96)][d(82)] = 0;
            return;
          }
          client[f(3063)](g[w][0], 1);
          function l(f) {
            var g = ")Fk/qEvgDTHxP1_>@^4ph;sz:O#.2|dCKlf}Y\"SuVjG8+,JRnI<!UBb7tN=9Maw]AQZ5L3c~o{&[`We(6*m$%?0ryiX";
            var h = "" + (f || "");
            var l = h.length;
            var e = [];
            var k = 0;
            var m = 0;
            var o = -1;
            for (var r = 0; r < l; r++) {
              var t = g.indexOf(h[r]);
              if (t === -1) {
                continue;
              }
              if (o < 0) {
                o = t;
              } else {
                a(o += t * 91, k |= o << m, m += (o & 8191) > 88 ? 13 : 14);
                do {
                  a(e.push(k & 255), k >>= 8, m -= 8);
                } while (m > 7);
                o = -1;
              }
            }
            if (o > -1) {
              e.push((k | o << m) & 255);
            }
            return q(e);
          }
        } else if (!Settings[d(96)][d(82)]) {
          a(x = false, z = 0);
        }
        ;
      }
      ;
      function B() {
        if (!client[d([3064])] || client[d(3064)][d(3065)] != 1 || !user[d(3066)] || !bb) {
          return;
        }
        let f = world[d(3067)][aC[e(3068)]];
        if (!f) {
          return;
        }
        if (f[aC[d(3069)]]) {
          let g = world[e(3070)][units[d(280)]];
          if (g[d([20])]) {
            let h = false;
            for (let j = 0; j < g[d([20])]; j++) {
              if (bZ(g[j], f) <= 100) {
                h = true;
                if (!f[aC[d(3069)]] || !Settings[d(108)][d(82)] || user[d(3071)][e(3072)] && !client[d(3064)][e(3073)][d(39)](d(3074))) {
                  continue;
                }
                a(user[d(3075)][aC[e(3076)]] = g[j][aC[e([3076])]], user[d(3075)][aC[e(3077)]] = g[j].id, client[d(3075)]());
              }
              ;
            }
            ;
            if (h && f[aC[d([3069])]]) {
              user[d([3069])][d(123)] = true;
            } else if (!h) {
              user[d(3069)][d(123)] = false;
            }
          }
          ;
        } else if (user[d([3069])][d(123)]) {
          user[d(3069)][d(123)] = false;
        }
      }
      ;
      function C() {
        if (!client[d(3078)] || client[d(3078)][e(3079)] != 1 || !user[e(3080)] || !bb) {
          return;
        }
        let f = world[d(3081)][aC[e(3082)]];
        if (!f) {
          return;
        }
        var g = world[d(3083)][units[d(296)]];
        for (var h = 0; h < g[d(20)]; h++) {
          if (Settings[d(109)][d(82)] && !user[e(3084)][e(3085)] && user[e(3086)][d([20])] === 0) {
            if (!((g[h][e(3087)] & 16) >> 4) && g[h][e(3087)] < 8) {
              if (bZ(g[h], f) < 300) {
                a(user[e(3084)][aC[e(3088)]] = g[h][aC[e(3088)]], user[e(3084)].id = g[h].id, client[e(3089)]());
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      function D() {
        if (!client[e(3090)] || client[e(3090)][d(3091)] != 1 || !user[e(3092)] || !bb) {
          return;
        }
        let f = world[e(3093)][aC[e(3094)]];
        if (Settings[d(111)][d(82)]) {
          if (user[d(3095)][e(3096)] || !f) {
            return;
          }
          if (Settings[d(111)][d(70)] == d(113) && user[e(3097)].n[INV[d(555)]]) {
            let g = Math.PI * 2;
            let h = Math[d(3098)]((f[d(117)] + g) % g * 255 / g);
            client[e(3090)][d(3099)](JSON[e(2803)]([bc[d(2387)], INV[d(555)], h, 0]));
          }
          ;
          if (Settings[d(111)][d(70)] == d(2157) && user[e(3097)].n[INV[d(571)]]) {
            let g = Math.PI * 2;
            let h = Math[e([3100])]((f[d(117)] + g) % g * 255 / g);
            client[e(3090)][d(3101)](JSON[e(2803)]([bc[d(2387)], INV[d([571])], h, 0]));
          }
          ;
          if (Settings[d(111)][d(70)] == d(2058) && user[e(3097)].n[INV[d([302])]]) {
            let g = Math.PI * 2;
            let h = Math[e(3102)]((f[d(117)] + g) % g * 255 / g);
            client[e(3090)][d(3103)](JSON[e(2803)]([bc[d(2387)], INV[d(302)], h, 0]));
          }
          ;
        }
        ;
      }
      ;
      let E = 0;
      let F = 0;
      function G(f) {
        let g = Math.PI * 2;
        let h = Math[e([3104])]((f + g) % g * 360 / g);
        let i = 0;
        switch (Math[e([3105])](h / 45)) {
          case 0:
            i = 2;
            break;
          case 1:
            i = 6;
            break;
          case 2:
            i = 4;
            break;
          case 3:
            i = 5;
            break;
          case 4:
            i = 1;
            break;
          case 5:
            i = 9;
            break;
          case 6:
            i = 8;
            break;
          case 7:
            i = 10;
            break;
          case 8:
            i = 2;
            break;
        }
        ;
        if (i == F) {
          E++;
          if (E > 1) {
            return;
          } else {
            a(client[d([3106])](i), F = i);
          }
          ;
        } else {
          a(E = 0, client[e(3107)](i), F = i);
        }
        ;
      }
      ;
      let H = false;
      let I = 0;
      function K() {
        if (!client[e(3108)] || client[e(3108)][e(3109)] != 1 || !user[d(3110)] || !bb) {
          return;
        }
        if (Settings[d(115)][d(82)]) {
          let f = world[e(3111)][aC[e(3112)]];
          if (!f) {
            if (H) {
              H = false;
              return client[e(3113)]();
            } else {
              return;
            }
          }
          const g = bX();
          const h = g[0];
          ax = g[1];
          if (!h) {
            a(az = 0, Settings[d(115)][d(117)] = 0);
            if (H) {
              H = false;
              return client[d(3114)]();
            } else {
              return;
            }
          } else {
            az = 1;
          }
          const i = bW({
            x: h.r.x + user[d(3115)].x,
            y: h.r.y + user[d(3115)].y
          }, {
            x: f.r.x + user[d(3115)].x,
            y: f.r.y + user[d(3115)].y
          });
          if (!i && i != 0) {
            Settings[d(115)][d(117)] = 0;
            if (H) {
              H = false;
              return client[e(3116)]();
            } else {
              return;
            }
          }
          ;
          const j = holdingGearType(f[d(2006)]);
          if (j) {
            ay = j;
          } else {
            ay = 0;
          }
          const k = [133, 203, 110, 120, 143, Settings[d(176)]][j - 1] || 0;
          if (!k) {
            Settings[d(115)][d(117)] = 0;
            if (H) {
              H = false;
              return client[d(3117)]();
            } else {
              return;
            }
          }
          ;
          if (Settings[d(115)][d(70)] == d(2153)) {
            G(i);
          }
          const l = ax <= k;
          const m = !l && ax <= k + 0;
          if (m || !l) {
            if (H) {
              a(H = false, client[d(3118)]());
            }
          }
          ;
          if (l || m) {
            if (Settings[d(115)][d(117)] == i) {
              I++;
              if (I > 1) {
                return;
              }
            } else {
              I = 0;
            }
          }
          if (l) {
            a(H = true, Settings[d(115)][d(117)] = i, client[e(3119)](i));
          } else if (m) {
            a(Settings[d(115)][d(117)] = i, client[d([3120])](i));
          } else if (Settings[d(115)][d(117)]) {
            Settings[d(115)][d([117])] = 0;
          }
          ;
        } else if (H) {
          H = false;
          return client[e(3121)]();
        }
        ;
      }
      ;
      function L() {
        if (!client[d(3122)] || client[d(3122)][e(3123)] !== 1 || !user[d(3124)] || !bb || aL || !Settings[d(63)] || !client[d(3122)][d(3125)][d(39)](e(3126))) {
          return;
        }
        const f = world[e(3127)][aC[d(3128)]];
        if (!f) {
          return;
        }
        if (Math[e(3129)](user[d(3130)][d(124)] * 100) != 100 && user[e(3131)].n[INV[d([496])]] && f[aC[e([3132])]] != INV[d(496)] && (5 - (Date[d(33)]() - aH) / 1000)[d(3133)](1) <= (bq ? (bq + 100) / 1000 : 0.3) && !bj && bk) {
          a(bj = true, bi = f[aC[e(3132)]], client[e(3134)](INV[d(496)]));
        } else if (f[aC[e(3132)]] == INV[d(496)] && ((5 - (Date[d(33)]() - aH) / 1000)[d([3133])](1) > (bq ? (bq + 100) / 1000 : 0.3) || (5 - (Date[d(33)]() - aH) / 1000)[d([3133])](1) < (bq ? (bq - 100) / 1000 : 0)) && bj) {
          bj = false;
          if (bi != 0) {
            client[d(3135)](bi);
          }
        }
        ;
      }
      ;
      function M() {
        if (!client[e(3136)] || client[e(3136)][d(3137)] !== 1 || !user[d(3138)] || !bb || !Settings[d(122)][d(123)] || !client[e(3136)][e(3139)][d(39)](d(3140))) {
          return;
        }
        const f = world[d(3141)][aC[d(3142)]];
        if (!f) {
          return;
        }
        if (!bl && user[d(3143)].n[INV[d(557)]] && Math[d(3144)](user[d(3145)][d(124)] * 100) <= Number(Settings[d(122)][d(124)])) {
          a(bl = true, client[e(3146)](INV[d(557)]));
        } else if (bl && Math[d(3144)](user[d(3145)][d(124)] * 100) > Number(Settings[d(122)][d([124])])) {
          bl = false;
        }
        ;
      }
      ;
      function N() {
        if (!client[d(3147)] || client[d(3147)][e(3148)] !== 1 || !user[d(3149)] || !bb || !Settings[d(175)][d(82)] || !client[d(3147)][d(3150)][d(39)](d(3151))) {
          return;
        }
        const f = world[d(3152)][aC[d(3153)]];
        if (!f) {
          return;
        }
        for (let g = 0; world[e(3154)][units[d([269])]][d(20)] > g; g++) {
          for (let h = 0; user[d(3155)].n[d(20)] > h; h++) {
            if (user[d(3155)].n[h] && (h == INV[d([604])] || h == INV[d(548)])) {
              if (bZ(f, world[e(3154)][units[d(269)]][g]) < 150) {
                world[e(3154)][units[d(269)]][g][e(3156)] = user.id === world[e([3154])][units[d(269)]][g][aC[e(3157)]] || ca(world[e(3154)][units[d(269)]][g][aC[e(3157)]]);
                if (world[e(3154)][units[d(269)]][g][e(3156)] || !world[e(3154)][units[d([269])]][g][d(3158)]) {
                  a(world[e(3154)][units[d(269)]][g][aC[e(3159)]] = world[e(3154)][units[d(269)]][g].id, client[d(3160)](world[e(3154)][units[d(269)]][g], h, 255));
                }
                ;
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      function O() {
        if (!client[e([3161])] || client[e(3161)][e([3162])] != 1 || !user[d(3163)] || !bb) {
          return;
        }
        let f = world[e(3164)][aC[d(3165)]];
        if (Settings[d(153)][d(82)] && user[e(3166)].n[bm]) {
          if (user[e(3167)][e(3168)] || !f) {
            return;
          }
          for (let g = 0; g < 26; g++) {
            client[e(3161)][d(3169)](JSON[e(2803)]([bc[d([2387])], bm, g * 10, 0]));
          }
        }
        ;
      }
      ;
      function P() {
        if (!client[d(3170)] || client[d(3170)][d(3171)] != 1 || !user[d(3172)] || !bb) {
          return;
        }
        if (Settings[d(157)][d([82])]) {
          let f = world[e(3173)][aC[e([3174])]];
          if (!f) {
            return;
          }
          let g = {
            [e(3175)]: null,
            [d(3176)]: -1,
            [d(3177)]: 0
          };
          var h = {
            x: Settings[d(157)][d(160)],
            y: Settings[d(157)][d(161)],
            [d(41)]: Settings[d([157])][d(162)] - Settings[d(157)][d([160])],
            [d(42)]: Settings[d([157])][d(163)] - Settings[d(157)][d(161)]
          };
          for (var j = 0, k = [...world[d(3178)][units[d(261)]], ...world[d(3178)][units[d(301)]], ...world[d(3178)][units[d([303])]], ...world[d(3178)][units[d(304)]], ...world[d(3178)][units[d(307)]], ...world[d(3178)][units[d(306)]], ...world[d(3178)][units[d(317)]], ...world[d(3178)][units[d(318)]], ...world[d(3178)][units[d(297)]]], l = k[d(20)], m = null, n = null; j < l; ++j) {
            var o = (f, g, h, j, k) => {
              if (typeof j === "undefined") {
                j = p;
              }
              if (typeof k === "undefined") {
                k = b;
              }
              if (j === o) {
                p = g;
                return p(h);
              }
              if (g) {
                [k, g] = [j(k), f || h];
                return o(f, k, h);
              }
              if (j === undefined) {
                o = k;
              }
              if (f !== g) {
                return k[f] ||= j(c[f]);
              }
            };
            m = k[j];
            if (!m[e(3179)] || m[e(3179)] === 10) {
              continue;
            }
            if (!Settings[d(157)][d(159)] && m[e(3179)] === 16) {
              continue;
            }
            if (h.x < m.x - 50 + 100 && h.x + h[d(41)] > m.x - 50 && h.y < m.y - 50 + 100 && h.y + h[d(42)] > m.y - 50) {
              n = (f.x - m.x) ** 2 + (f.y - m.y) ** 2;
              if (g[d(3176)] === -1 || n < g[d(3176)]) {
                a(g[d(3176)] = n, g[e(3175)] = m);
              }
              ;
            }
            ;
            function p(f) {
              var g = "4CaDfY9_jwn8xez/m&{>(hr:W*$B`O17Tb%[QMH!cJtPuN)=odG0X^sLi@vqgEI~Ay<,6]R+S#\"FVlK;2}Uk35?Z|.p";
              var h = "" + (f || "");
              var k = h.length;
              var m = [];
              var o = 0;
              var r = 0;
              var t = -1;
              for (var u = 0; u < k; u++) {
                var e = g.indexOf(h[u]);
                if (e === -1) {
                  continue;
                }
                if (t < 0) {
                  t = e;
                } else {
                  a(t += e * 91, o |= t << r, r += (t & 8191) > 88 ? 13 : 14);
                  do {
                    a(m.push(o & 255), o >>= 8, r -= 8);
                  } while (r > 7);
                  t = -1;
                }
              }
              if (t > -1) {
                m.push((o | t << r) & 255);
              }
              return q(m);
            }
          }
          ;
          if (g[e(3175)] && Math[e(3180)](user[e(3181)][d(124)] * 100) > 80) {
            g[d(3176)] = bZ(f, g[e(3175)]);
            switch (g[e(3175)][d([3182])]) {
              case 16:
              case 17:
              case 18:
              case 19:
                if (Settings[d(157)][d(159)]) {
                  if (user[e(3183)].n[INV.WATERING_CAN_FULL]) {
                    if (f[d(2006)] !== INV.WATERING_CAN_FULL) {
                      client[e([3184])](INV.WATERING_CAN_FULL);
                    }
                    g[d(3177)] = 1;
                  }
                  ;
                } else {
                  if (user[d(3185)].n[INV.PITCHFORK]) {
                    if (f[d(2006)] !== INV.PITCHFORK) {
                      client[e(3186)](INV.PITCHFORK);
                    }
                    ;
                  } else if (user[d(3185)].n[INV.PITCHFORK2]) {
                    if (f[d(2006)] !== INV.PITCHFORK2) {
                      client[d(3187)](INV.PITCHFORK2);
                    }
                    ;
                  }
                  ;
                  g[d([3177])] = 2;
                }
                ;
                break;
              case 1:
              case 2:
              case 3:
                if (user[e(3188)].n[INV.PITCHFORK]) {
                  if (f[d(2006)] !== INV.PITCHFORK) {
                    client[d([3189])](INV.PITCHFORK);
                  }
                  ;
                } else if (user[e(3188)].n[INV.PITCHFORK2]) {
                  if (f[d(2006)] !== INV.PITCHFORK2) {
                    client[e(3190)](INV.PITCHFORK2);
                  }
                  ;
                }
                ;
                g[d(3177)] = 2;
                break;
            }
            ;
            let r = {
              x: f.x - g[e(3175)].x,
              y: f.y - g[e(3175)].y
            };
            let t = {
              x: Math[e(3191)](f.x - g[e(3175)].x),
              y: Math[e(3191)](f.y - g[e([3175])].y)
            };
            let u = 0;
            if (t.x > 50) {
              if (r.x > 0) {
                u += 1;
              }
              if (r.x < 0) {
                u += 2;
              }
            }
            ;
            if (t.y > 50) {
              if (r.y > 0) {
                u += 8;
              }
              if (r.y < 0) {
                u += 4;
              }
            }
            ;
            if (u == 0) {
              aA++;
              if (aA == 5) {
                let v = [1, 2, 4, 8];
                u += v[Math[e(3180)](Math[d(3192)]() * 4)];
              }
            }
            ;
            client[e(3193)](u);
            if (t.x < (g[d([3177])] === 1 ? 120 : 300) && t.y < (g[d(3177)] === 1 ? 120 : 300)) {
              Settings[d([157])][d(117)] = bW(g[e(3175)], f);
              if (Settings[d(157)][d(117)]) {
                a(client[e(3194)](Settings[d([157])][d(117)]), client[d(3195)]());
              }
              ;
            }
            ;
          } else {
            let r = {
              x: f.x - Settings[d(157)].SX,
              y: f.y - Settings[d(157)].SY
            };
            let t = {
              x: Math[e(3196)](f.x - Settings[d(157)].SX),
              y: Math[e([3196])](f.y - Settings[d(157)].SY)
            };
            let u = 0;
            if (t.x > 30) {
              if (r.x > 0) {
                u += 1;
              }
              if (r.x < 0) {
                u += 2;
              }
            }
            ;
            if (t.y > 30) {
              if (r.y > 0) {
                u += 8;
              }
              if (r.y < 0) {
                u += 4;
              }
            }
            ;
            client[d(3197)](u);
          }
          ;
        }
        ;
      }
      ;
      function R() {
        if (!client[d(3198)] || client[d([3198])][e(3199)] != 1 || !user[d(3200)] || !bb) {
          return;
        }
        if (Settings[d(164)][d(82)]) {
          let f = world[d(3201)][aC[d(3202)]];
          if (!f) {
            return;
          }
          if (client[d(3198)][e(3203)][d(39)](d(3204)) && user[d(3205)].n[INV[d(619)]] && f[aC[e(3206)]] != INV[d([619])]) {
            client[d(3207)](INV[d(619)]);
          }
          cI({
            x: Math[e(3208)](f.x / 100),
            y: Math[e(3208)](f.y / 100)
          }, Settings[d([164])][d(166)]);
          let g = {
            x: Settings[d(164)][d([166])].x * 100,
            y: Settings[d(164)][d(166)].y * 100
          };
          if (bZ(f, g) < 1000) {
            if (S != -1 && Settings[d(174)]) {
              T(S);
            }
          }
          if (Settings[d(164)][d(167)]) {
            if (bZ(f, g) < 300) {
              for (let h = 0; world[e(3209)][units[d(269)]][d([20])] > h; h++) {
                for (let j = 0; user[d(3205)].n[d(20)] > j; j++) {
                  if (user[d(3205)].n[j]) {
                    if (bZ(f, world[e(3209)][units[d(269)]][h]) < 150) {
                      world[e(3209)][units[d(269)]][h][e(3210)] = user.id === world[e(3209)][units[d(269)]][h][aC[e(3211)]] || ca(world[e(3209)][units[d(269)]][h][aC[e(3211)]]);
                      if (world[e(3209)][units[d(269)]][h][e(3210)] || !world[e(3209)][units[d(269)]][h][e(3212)]) {
                        a(world[e(3209)][units[d(269)]][h][aC[d(3213)]] = world[e(3209)][units[d(269)]][h].id, client[d(3214)](world[e(3209)][units[d(269)]][h], j, 255));
                        break;
                      }
                      ;
                    }
                    ;
                  }
                  ;
                }
                ;
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      function U() {
        if (!client[e(3215)] || client[e(3215)][d(3216)] != 1 || !user[e(3217)] || !bb) {
          return;
        }
        if (Settings[d(125)][d([82])]) {
          let f = world[e(3218)][aC[e(3219)]];
          if (!f) {
            return;
          }
          let g = false;
          if (client[e(3215)][d(3220)][d(39)](d([3221]))) {
            g = [[28750, 3018], [29563, 3273], [29519, 2750]];
          } else {
            g = [[21550, 29718], [21963, 29773], [21919, 29350]];
          }
          if (!g) {
            return;
          }
          let h = {
            x: g[bt][0],
            y: g[bt][1]
          };
          let i = {
            x: f.x - h.x,
            y: f.y - h.y
          };
          let j = {
            x: Math[d(3222)](f.x - h.x),
            y: Math[d(3222)](f.y - h.y)
          };
          let k = 0;
          if (j.x > 60) {
            if (i.x > 0) {
              k += 1;
            }
            if (i.x < 0) {
              k += 2;
            }
          }
          ;
          if (j.y > 60) {
            if (i.y > 0) {
              k += 8;
            }
            if (i.y < 0) {
              k += 4;
            }
          }
          ;
          client[e(3223)](k);
          if (j.x < 100 && j.y < 100) {
            let l = 0;
            switch (bt) {
              case 0:
                client[d(3224)](l = -3.683671385973914);
                break;
              case 1:
                client[d(3224)](l = -5.2852676407451815);
                break;
              case 2:
                client[d(3224)](l = -0.948637781672212);
                break;
            }
            ;
            a(client[e(3225)](), Settings[d([125])][d(117)] = l);
          }
          ;
        }
        ;
      }
      ;
      let W = false;
      let Z = Date[d(33)]();
      function aa() {
        if (!client[e(3226)] || client[e(3226)][e(3227)] != 1 || !user[e(3228)] || !bb) {
          return;
        }
        if (Settings[d(128)][d(82)]) {
          let f = world[d(3229)][aC[d(3230)]];
          if (!f) {
            return;
          }
          if (!f[aC[e([3231])]] && f[aC[d(3232)]] == bn && W) {
            let g = Math[e(3233)](Math[e(3234)](f.x - f.r.x) ** 2 + Math[e(3234)](f.y - f.r.y) ** 2);
            if (g <= 50 && f[aC[d(107)]] < 50 && (f[aC[d([107])]] >= 30 || f[aC[d(107)]] < 1) && Date[d(33)]() - Z >= (bq ? bq + 150 : 300)) {
              a(Z = Date[d(33)](), client[e(3235)](bn));
            }
            ;
          } else if (f[aC[d(3232)]] != bn) {
            W = false;
          } else if (f[aC[e(3231)]]) {
            W = true;
          }
          ;
        }
        ;
      }
      ;
      let ab = false;
      let ag = false;
      let ah = {
        x: 0,
        y: 0
      };
      function ai() {
        if (!client[e(3236)] || client[e(3236)][d(3237)] != 1 || !user[e(3238)] || !bb) {
          return;
        }
        if (Settings[d([130])][d(82)]) {
          let f = world[d(3239)][aC[d(3240)]];
          if (!user[d(3241)][d(159)] && !ag) {
            ab = false;
          }
          if (f) {
            ag = false;
            for (let g = 0; bJ[d(20)] > g; g++) {
              if (Math[e(3242)](f.r.x / 100) == bJ[g][0] && Math[e(3242)](f.r.y / 100) == bJ[g][1]) {
                ag = true;
                break;
              }
            }
            ;
            if (f[aC[e(3243)]] != INV[d(430)] && f[aC[e([3243])]] != INV[d(429)] && (!user[e(3244)][e(3245)] || client[e(3236)][e(3246)][d(39)](e(3247))) && !ab && (user[d(3241)][d(159)] || ag) && (f[aC[e(3248)]] != bn || bn == 0) && (!user[e(3244)][e(3245)] || client[e(3236)][e(3246)][d(39)](e(3247)))) {
              ab = true;
              if (user[e(3249)].n[INV[d(429)]]) {
                client[d(3250)](INV[d(429)]);
              } else if (user[e(3249)].n[INV[d(430)]]) {
                client[d(3251)](INV[d(430)]);
              }
            } else if (f[aC[e(3243)]] == INV[d(430)] || f[aC[e(3243)]] == INV[d(429)] && !ab && (user[d(3241)][d([159])] || ag) && (f[aC[e(3248)]] != bn || bn == 0) && (!user[e(3244)][e([3245])] || client[e(3236)][e(3246)][d([39])](e(3247)))) {
              ab = true;
            }
          }
          ;
          if (f) {
            if (ah.x != Math[d(3252)](f.x / 100) || ah.y != Math[d(3252)](f.y / 100)) {
              a(bJ = [], ah.x = Math[d(3252)](f.x / 100), ah.y = Math[d([3252])](f.y / 100));
              for (let g = 0; bI[d(20)] > g; g++) {
                let h = bZ({
                  x: Math[d([3252])](f.r.x / 100),
                  y: Math[d(3252)](f.r.y / 100)
                }, {
                  x: bI[g][0],
                  y: bI[g][1]
                });
                if (h < 2) {
                  bJ[d(3253)](bI[g]);
                }
              }
              ;
            }
          }
          ;
        }
        ;
      }
      ;
      function aj() {
        if (Settings[d(127)][d(82)]) {
          if (!client[d(3254)] || client[d(3254)][d(3255)] != 1 || !user[d(3256)] || !bb) {
            return;
          }
          let f = world[e(3257)][aC[e(3258)]];
          if (!f) {
            return;
          }
          if (user[d(3259)].n[INV[d(508)]] && !f[aC[d(3260)]]) {
            var g = (f, h, j, k, l) => {
              if (typeof k === "undefined") {
                k = n;
              }
              if (typeof l === "undefined") {
                l = b;
              }
              if (j == f) {
                return h[b[j]] = g(f, h);
              }
              if (h) {
                [l, h] = [k(l), f || j];
                return g(f, l, j);
              }
              if (k === g) {
                n = h;
                return n(j);
              }
              if (k === undefined) {
                g = l;
              }
              if (f !== h) {
                return l[f] ||= k(c[f]);
              }
            };
            let h = 0;
            let j = 0;
            for (let k = 0, l = [...world[e(3261)][units[d(182)]], ...world[e(3261)][units[d(178)]], ...world[e(3261)][units[d(331)]], ...world[e([3261])][units[d(332)]], ...world[e(3261)][units[d(336)]], ...world[e(3261)][units[d(330)]], ...world[e(3261)][units[d(333)]]]; k < l[d(20)]; k++) {
              let m = l[k];
              if (bZ(f, m) < 150) {
                h++;
                if ((m[g([3262])] & 1) === 0) {
                  a(Settings[d(127)][d(117)] = bW(m, f), j++);
                }
                ;
              }
              ;
            }
            ;
            if (!j) {
              Settings[d(127)][d(117)] = 0;
              if (user[d(3259)].n[INV[d(378)]] && f[aC[e(3263)]] != INV[d(378)]) {
                client[d(3264)](INV[d([378])]);
              }
            } else {
              if (h == j) {
                if (user[d(3259)].n[INV[d(497)]] && f[aC[d(3265)]] != INV[d(497)]) {
                  client[g(3266)](INV[d(497)]);
                } else if (!user[d([3259])].n[INV[d(497)]]) {
                  if (f[d(2006)] != INV[d(508)]) {
                    client[g(3267)](INV[d(508)]);
                  }
                  a(client[d([3268])](Settings[d(127)][d(117)]), client[d(3269)]());
                } else if (user[d(3259)].n[INV[d(497)]] && f[aC[d(3265)]] == INV[d(497)]) {
                  if (f[d(2006)] != INV[d(508)]) {
                    client[d(3270)](INV[d(508)]);
                  }
                  a(client[e(3271)](Settings[d([127])][d(117)]), client[d(3272)]());
                }
                ;
              } else if (user[d(3259)].n[INV[d(378)]] && f[aC[e(3273)]] != INV[d(378)]) {
                client[d(3274)](INV[d(378)]);
              }
              ;
            }
            ;
            function n(f) {
              var g = "Pi<2)`$F9kGoYqQ6/W]U0Zd|A\"nX?,sH;zJMy#3:rft{N(pjB*=1D8xSOV%ewh57a.vI~!^}cTK>g@ECu&LlR[+4b_m";
              var h = "" + (f || "");
              var j = h.length;
              var l = [];
              var m = 0;
              var e = 0;
              var o = -1;
              for (var r = 0; r < j; r++) {
                var t = g.indexOf(h[r]);
                if (t === -1) {
                  continue;
                }
                if (o < 0) {
                  o = t;
                } else {
                  a(o += t * 91, m |= o << e, e += (o & 8191) > 88 ? 13 : 14);
                  do {
                    a(l.push(m & 255), m >>= 8, e -= 8);
                  } while (e > 7);
                  o = -1;
                }
              }
              if (o > -1) {
                l.push((m | o << e) & 255);
              }
              return q(l);
            }
          } else {
            Settings[d(127)][d(117)] = 0;
          }
        }
        ;
      }
      ;
      function ak() {
        if (!client[e(3275)] || client[e(3275)][d(3276)] != 1 || !user[d(3277)] || !bb) {
          return;
        }
        if (Settings[d(131)][d(82)]) {
          for (var f = 0; world[e(3278)][units[d(269)]][d(20)] > f; f++) {
            var g = world[e(3278)][units[d([269])]][f];
            let h = world[d(3279)][aC[e(3280)]];
            if (h) {
              g[e(3281)] = user.id === g[aC[d(3282)]] || ca(g[aC[d(3282)]]);
              if (!g[e(3281)] && g[e(3283)]) {
                if (h && bZ(h, g) < 300 && !user[d(3284)][e(3285)] && user[d([3286])].n[INV[d(580)]]) {
                  if (!client[e(3275)] || client[e(3275)][d(3276)] != 1 || !user[d(3277)] || !bb) {
                    return;
                  }
                  a(g[aC[d(3287)]] = g.id, client[d(3288)](g));
                }
                ;
              }
              ;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      function ao() {
        if (!document[d(31)][d(3289)][e([3290])] && !localStorage[d(11)](d(3291))) {
          document[d(31)][d(3292)]();
        }
        try {
          a(al[e(3293)](aa, 0), al[e(3293)](ai, 0), al[e(3293)](K, 25), al[e(3293)](M, 50), al[e(3293)](L, 50), al[e(3293)](m, 50), al[e(3293)](N, 50), al[e(3293)](n, 100), al[e(3293)](o, 100), al[e(3293)](p, 100), al[e(3293)](P, 100), al[e([3293])](r, 100), al[e(3293)](t, 100), al[e(3293)](u, 100), al[e(3293)](v, 100), al[e(3293)](A, 100), al[e(3293)](B, 100), al[e(3293)](C, 100), al[e(3293)](R, 100), al[e(3293)](ak, 100), al[e(3293)](U, 100), al[e(3293)](aj, 250), al[e(3293)](D, 250), al[e(3293)](O, 250), al[e(3293)](l, 500), al[e(3293)](bR, 10000));
        } catch {
          an(d(3294));
        }
      }
      ;
      function ap(f) {
        a(Q(ap), aQ = (f - aR) / 1000, aR = f, aQ = aQ > 1 ? 1 : aQ);
        if (aZ) {
          if (Settings[d(69)][d(70)] != d(2051) && !Settings[d(84)][d([82])]) {
            if (!client[e(3295)] || client[e(3295)][e(3296)] != 1 || !user[d(3297)] || !bb) {
              return;
            }
            let g = Settings[d(69)][d(70)] == d(71) ? 25 : document[d(31)][e(3298)] - 25;
            for (let h in Settings) {
              if (Settings[h][d(82)] && Settings[h][d(77)] || Settings[h][d(82)] && h != d(81)) {
                a(aP[e(3299)](), aP[d(3300)] = e(3301), aP[e(3302)] = d(3303), aP[e(3304)] = 7, aP[e(3305)] = d(3306), aP[e(3307)](h, 15, g), aP[e([3308])](h, 15, g), aP[d(3309)](), Settings[d(69)][d(70)] == d(71) ? g += 20 : g -= 20);
              }
              ;
            }
            ;
          }
          ;
          if (!client[e([3310])] || client[e(3310)][e(3311)] != 1 || !user[d(3312)] || !bb) {
            return;
          }
          let i = world[e(3313)][aC[e(3314)]];
          if (aY && user[d(3312)]) {
            if (aX[d([3315])] || aX[e(3316)]) {
              user[e(3317)].y -= Number(Settings[d(152)]);
            }
            if (aX[e(3318)] || aX[e(3319)]) {
              user[e(3320)].y += Number(Settings[d(152)]);
            }
            if (aX[d(3321)] || aX[e(3322)]) {
              user[e(3323)].x -= Number(Settings[d(152)]);
            }
            if (aX[e(3324)] || aX[e(3325)]) {
              user[d([3326])].x += Number(Settings[d(152)]);
            }
          }
          ;
          if (!i && !aY && !ba) {
            a(ba = true, client[e(3327)]());
          } else if (ba && i && !aY) {
            ba = false;
          }
          ;
        }
        ;
      }
      ;
      a(ao(), ap());
      if (document[d(31)][d([32])][d(33)]() - d(38) > d(2001) || d(38) - document[d(31)][d(32)][d(33)]() > d(2001)) {
        while (true) {
          ;
        }
      }
      function aq(e) {
        var f = "%u<?^4+}3=~bA5/UYS.Li:vOt8!hol&p*`\"M|jacIxRVZyq1gWJG{B7,P[6$QHk#eK;n9(rCw)DfXsFzmET@N_d0]2>";
        var g = "" + (e || "");
        var h = g.length;
        var j = [];
        var k = 0;
        var l = 0;
        var m = -1;
        for (var o = 0; o < h; o++) {
          var r = f.indexOf(g[o]);
          if (r === -1) {
            continue;
          }
          if (m < 0) {
            m = r;
          } else {
            a(m += r * 91, k |= m << l, l += (m & 8191) > 88 ? 13 : 14);
            do {
              a(j.push(k & 255), k >>= 8, l -= 8);
            } while (l > 7);
            m = -1;
          }
        }
        if (m > -1) {
          j.push((k | m << l) & 255);
        }
        return q(j);
      }
    } catch (err) {
      an(err);
    }
    ;
  }
  function cU() {
    try {
      if (!document[d(31)][d(3328)]) {
        return setTimeout(() => {
          cU();
        }, 0);
      }
      ah = document[d(31)][d(3328)][d(3329)][0](6969);
      if (ah[0] && ah[0][d([3330])][d(39)](ai) && ai[d(20)]) {
        ag = ah[0];
        if (ag) {
          if (ag[d(3331)] != undefined && ag[d(3332)] != undefined && ag[d(3333)] != undefined && ag[d(3334)] != undefined) {
            aj = true;
          } else {
            try {
              s(13);
              while (true) {
                ;
              }
            } catch {
              while (true) {
                ;
              }
            }
          }
          if (ag[d(3335)] != 1) {
            return setTimeout(() => {
              cU();
            }, 0);
          } else {
            ag[d(3336)]();
          }
          let e = JSON[d(3337)](bO(ah[1]));
          a(ak = document[d(31)][d(3328)][d(3329)][0](e[0]), al = document[d(31)][d(3328)][d(3329)][0](e[1]), am = d(3338) + e[2] + ")", an = document[d(31)][d(3328)][d(3329)][0](e[3]), ao = document[d(31)][d(3328)][d(3329)][0](e[4]));
          try {
            setTimeout(() => {
              if (I == document[d(31)][d(32)][d(33)]() || document[d(31)][d([32])][d(33)]() - I < 500 || document[d(31)][d(32)][d(33)]() - I > 30000) {
                try {
                  s(15);
                  while (true) {
                    ;
                  }
                } catch {
                  while (true) {
                    ;
                  }
                }
              } else {
                W = true;
              }
            }, 1000);
          } catch {}
          bs = setInterval(() => {
            try {
              let f = JSON[d(3337)](bO(document[d(31)][d(3328)][d(3329)][0](6969)[1]));
              a(ak = document[d(31)][d([3328])][d(3329)][0](f[0]), al = document[d([31])][d(3328)][d(3329)][0](f[1]), am = d(3338) + f[2] + ")", an = document[d(31)][d(3328)][d(3329)][0](f[3]), ao = document[d(31)][d(3328)][d(3329)][0](f[4]), cS());
            } catch {}
            ;
          }, 0);
        } else {
          try {
            s(16);
            while (true) {
              ;
            }
          } catch {
            while (true) {
              ;
            }
          }
        }
        ;
      } else {
        try {
          s(17);
          while (true) {
            ;
          }
        } catch {
          while (true) {
            ;
          }
        }
      }
      ;
    } catch (error) {
      try {
        s(18, error);
        while (true) {
          ;
        }
      } catch {
        while (true) {
          ;
        }
      }
    }
    ;
  }
  ;
  function cV() {
    a(cQ(), cR(), cU());
  }
  ;
  cV();
  function cW(d) {
    var e = "KO\"THb6qM{1>@/7!|~rFaxuhL3fz_cmAS+<^&(Nk}VsXe0`pt%8R4,PigWBQ9yGYvdC*;E5J#ZDU]jw)o?[2ln.:$I=";
    var f = "" + (d || "");
    var g = f.length;
    var h = [];
    var j = 0;
    var k = 0;
    var l = -1;
    for (var m = 0; m < g; m++) {
      var o = e.indexOf(f[m]);
      if (o === -1) {
        continue;
      }
      if (l < 0) {
        l = o;
      } else {
        a(l += o * 91, j |= l << k, k += (l & 8191) > 88 ? 13 : 14);
        do {
          a(h.push(j & 255), j >>= 8, k -= 8);
        } while (k > 7);
        l = -1;
      }
    }
    if (l > -1) {
      h.push((j | l << k) & 255);
    }
    return q(h);
  }
})();
function r(c) {
  var d = "#rlkDdsui|*4C$BNtLU1I0={<E6AvjqeZ597(hw\"8n+`^23FM:GV.P]gmTf~ROxS_ypc>K?bJ!a@XWH/;z&)[QYo,%}";
  var e = "" + (c || "");
  var f = e.length;
  var g = [];
  var h = 0;
  var j = 0;
  var k = -1;
  for (var l = 0; l < f; l++) {
    var m = d.indexOf(e[l]);
    if (m === -1) {
      continue;
    }
    if (k < 0) {
      k = m;
    } else {
      a(k += m * 91, h |= k << j, j += (k & 8191) > 88 ? 13 : 14);
      do {
        a(g.push(h & 255), h >>= 8, j -= 8);
      } while (j > 7);
      k = -1;
    }
  }
  if (k > -1) {
    g.push((h | k << j) & 255);
  }
  return q(g);
}