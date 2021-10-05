/*
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-09-29 13:40:21
 */
// ! function(a, b, c) {
//     function d(c) {
//         var d = b.createElement("iframe"),
//             e = "https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=" + c.appid + "&agentid=" + c.agentid + "&redirect_uri=" + c.redirect_uri + "&state=" + c.state + "&login_type=jssdk";
//         e += c.style ? "&style=" + c.style : "", e += c.href ? "&href=" + c.href : "", d.src = e, d.frameBorder = "0", d.allowTransparency = "true", d.scrolling = "no", d.width = "300px", d.height = "400px";
//         var f = b.getElementById(c.id);
//         f.innerHTML = "", f.appendChild(d), d.onload = function() {
//             d.contentWindow.postMessage && a.addEventListener && (a.addEventListener("message", function(b) {
//                 b.data && b.origin.indexOf("work.weixin.qq.com") > -1 && (a.location.href = b.data)
//             }), d.contentWindow.postMessage("ask_usePostMessage", "*"))
//         }
//     }
//     a.WwLogin = d
// }(window, document);
! function(e, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = e || self).WwLogin = n() }(this, (function() {
    "use strict";

    function e(e, n) { if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function") }

    function n(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
    }
    var t = { sso: "/wwopen/sso/qrConnect", tww: "/login/wwLogin/sso/qrConnect", native: "/native/sso/qrConnect" };
    return function() {
        function o() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e(this, o), n.version = "1.2.4", this.options = n, this.url = this.getUrl(n), this.init(this.url)
        }
        var i, s, r;
        return i = o, (s = [{ key: "init", value: function(e) { this.options.is_mobile ? window.location = e : this.createFrame(e) } }, {
            key: "getUrl",
            value: function(e) {
                var n = ["login_type=jssdk"];
                for (var o in e) e[o] && "id" !== o && n.push("".concat(o, "=").concat(e[o]));
                e.business_type = e.business_type || "sso";
                var i = t[e.business_type];
                if (!i) throw new Error("Argument business_type not match. Current version is ".concat("1.2.4", "."));
                return "".concat("https://open.work.weixin.qq.com").concat(i, "?").concat(n.join("&"))
            }
        }, {
            key: "createFrame",
            value: function(e) {
                var n = document.createElement("iframe"),
                    t = document.getElementById(this.options.id);
                n.src = e, n.frameBorder = "0", n.allowTransparency = "true", n.scrolling = "no", n.width = "300px", n.height = "400px", t.innerHTML = "", t.appendChild(n), n.onload = function() { n.contentWindow.postMessage && window.addEventListener && (window.addEventListener("message", (function(e) { var n = e.data; "string" == typeof n && /^http/.test(n) && n && e.origin.indexOf("work.weixin.qq.com") > -1 && (window.location.href = n) })), n.contentWindow.postMessage("ask_usePostMessage", "*")) }
            }
        }]) && n(i.prototype, s), r && n(i, r), o
    }()
}));