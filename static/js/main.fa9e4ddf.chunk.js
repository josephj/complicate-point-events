(this["webpackJsonppoint-events-prototype"]=this["webpackJsonppoint-events-prototype"]||[]).push([[0],[,,,,,function(e,n,t){e.exports=t(12)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var o,r=t(0),c=t.n(r),a=t(4),l=t.n(a),i=(t(10),t(1)),s=t(2),u=t.n(s);document.addEventListener("pointercancel",(function(e){console.log("handleDocumentPointerCancel")}));var f=Object(r.forwardRef)((function(e,n){var t=Object(r.useState)(!1),a=Object(i.a)(t,2),l=a[0],s=a[1],f=Object(r.useState)(null),m=Object(i.a)(f,2),p=m[0],v=m[1];return c.a.createElement("span",{ref:n,className:u()("Crop",{"Crop--moving":l}),onPointerDown:function(e){console.log("handlePointerDown"),v(e.clientX);var t=n.current;o=setTimeout((function(){s(!0),t.style.touchAction="none",t.closest(".Item ").style.touchAction="none",console.log("touchAction",t.closest(".Item").style.touchAction),o=null}),500)},onPointerUp:function(e){if(o)clearTimeout(o),console.log("handlePointerUp > Failed to long press");else{var t=n.current;t.style.touchAction="",t.closest(".Item ").style.touchAction="",console.log("touchAction",t.closest(".Item").style.touchAction),console.log("handlePointerUp > Long pressed")}s(!1)},onPointerMove:function(e){if(l){console.log("handlePointerMove");var n=e.currentTarget,t=n.parentNode.offsetWidth-n.offsetWidth-8,o=p-e.clientX,r=Math.min(Math.max(0,n.offsetLeft-o),t);n.style.top=0,n.style.left="".concat(r,"px"),v(e.clientX)}},onPointerCancel:function(e){console.log("handlePointerCancel"),o&&clearTimeout(o),v(null),s(!1)},onContextMenu:function(e){return e.preventDefault()}})})),m=function(e,n,t){var o=t||{},c=o.duration,a=void 0===c?150:c,l=o.isSkipMouse,i=void 0===l||l;Object(r.useEffect)((function(){var t=e.current,o=null,r=function(){t.removeEventListener("pointerup",s),t.removeEventListener("pointerleave",l),t.removeEventListener("pointercancel",l)},c=function(){o=performance.now(),t.addEventListener("pointerup",s),t.addEventListener("pointerleave",l),t.addEventListener("pointercancel",l)},l=function(){o=null,r()},s=function(e){var t="mouse"===e.pointerType,c=i&&t,l=performance.now()-o>=a;(c||l)&&n(e),o=null,r()};return t.addEventListener("pointerdown",c),function(){return t.removeEventListener("pointerdown",c)}}),[e,n,a,i])},p=function(e){var n=e.id,t=Object(r.useRef)(null),o=Object(r.useState)(!1),a=Object(i.a)(o,2),l=a[0],s=a[1],p=Object(r.useCallback)((function(e){return s(!l)}),[l]);m(t,p);var v=Object(r.useRef)(null);return c.a.createElement("li",{ref:t,className:u()("Item",{"Item--selected":l})},c.a.createElement(f,{ref:v}),c.a.createElement("span",{className:"Label"},"#",n+1))};t(11);var v=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("h1",null,"Pointer Events"),c.a.createElement("p",null,"Scrolling, Item Selection, and Crop Moving"),c.a.createElement("ul",null,Array.from(Array(50)).map((function(e,n){return c.a.createElement(p,{key:n,id:n})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.fa9e4ddf.chunk.js.map