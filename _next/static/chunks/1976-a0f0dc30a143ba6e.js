(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1976,972],{66648:function(e,t,n){"use strict";n.d(t,{default:function(){return i.a}});var r=n(55601),i=n.n(r)},90622:function(){},55601:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return l},getImageProps:function(){return u}});let r=n(99920),i=n(80497),s=n(38173),o=r._(n(21241));function u(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,n]of Object.entries(t))void 0===n&&delete t[e];return{props:t}}let l=s.Image},43398:function(e,t,n){"use strict";var r=n(20357);n(90622);var i=n(2265),s=i&&"object"==typeof i&&"default"in i?i:{default:i},o=void 0!==r&&r.env&&!0,u=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,n=t.name,r=void 0===n?"stylesheet":n,i=t.optimizeForSpeed,s=void 0===i?o:i;c(u(r),"`name` must be a string"),this._name=r,this._deletedRulePlaceholder="#"+r+"-deleted-rule____{}",c("boolean"==typeof s,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=s,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="undefined"!=typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t=e.prototype;return t.setOptimizeForSpeed=function(e){c("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),c(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},t.isOptimizeForSpeed=function(){return this._optimizeForSpeed},t.inject=function(){var e=this;if(c(!this._injected,"sheet already injected"),this._injected=!0,"undefined"!=typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,n){return"number"==typeof n?e._serverSheet.cssRules[n]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),n},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},t.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},t.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},t.insertRule=function(e,t){if(c(u(e),"`insertRule` accepts only strings"),"undefined"==typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var n=this.getSheet();"number"!=typeof t&&(t=n.cssRules.length);try{n.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var r=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,r))}return this._rulesCount++},t.replaceRule=function(e,t){if(this._optimizeForSpeed||"undefined"==typeof window){var n="undefined"!=typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!n.cssRules[e])return e;n.deleteRule(e);try{n.insertRule(t,e)}catch(r){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),n.insertRule(this._deletedRulePlaceholder,e)}}else{var r=this._tags[e];c(r,"old rule at index `"+e+"` not found"),r.textContent=t}return e},t.deleteRule=function(e){if("undefined"==typeof window){this._serverSheet.deleteRule(e);return}if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];c(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},t.flush=function(){this._injected=!1,this._rulesCount=0,"undefined"!=typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},t.cssRules=function(){var e=this;return"undefined"==typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,n){return n?t=t.concat(Array.prototype.map.call(e.getSheetForTag(n).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},t.makeStyleTag=function(e,t,n){t&&c(u(t),"makeStyleTag accepts only strings as second parameter");var r=document.createElement("style");this._nonce&&r.setAttribute("nonce",this._nonce),r.type="text/css",r.setAttribute("data-"+e,""),t&&r.appendChild(document.createTextNode(t));var i=document.head||document.getElementsByTagName("head")[0];return n?i.insertBefore(r,n):i.appendChild(r),r},function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,[{key:"length",get:function(){return this._rulesCount}}]),e}();function c(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,n=e.length;n;)t=33*t^e.charCodeAt(--n);return t>>>0},a={};function h(e,t){if(!t)return"jsx-"+e;var n=String(t),r=e+n;return a[r]||(a[r]="jsx-"+d(e+"-"+n)),a[r]}function f(e,t){"undefined"==typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var n=e+t;return a[n]||(a[n]=t.replace(/__jsx-style-dynamic-selector/g,e)),a[n]}var p=function(){function e(e){var t=void 0===e?{}:e,n=t.styleSheet,r=void 0===n?null:n,i=t.optimizeForSpeed,s=void 0!==i&&i;this._sheet=r||new l({name:"styled-jsx",optimizeForSpeed:s}),this._sheet.inject(),r&&"boolean"==typeof s&&(this._sheet.setOptimizeForSpeed(s),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"undefined"==typeof window||this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var n=this.getIdAndRules(e),r=n.styleId,i=n.rules;if(r in this._instancesCounts){this._instancesCounts[r]+=1;return}var s=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[r]=s,this._instancesCounts[r]=1},t.remove=function(e){var t=this,n=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(n in this._instancesCounts,"styleId: `"+n+"` not found"),this._instancesCounts[n]-=1,this._instancesCounts[n]<1){var r=this._fromServer&&this._fromServer[n];r?(r.parentNode.removeChild(r),delete this._fromServer[n]):(this._indices[n].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[n]),delete this._instancesCounts[n]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],n=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return n[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,n;return t=this.cssRules(),void 0===(n=e)&&(n={}),t.map(function(e){var t=e[0],r=e[1];return s.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:n.nonce?n.nonce:void 0,dangerouslySetInnerHTML:{__html:r}})})},t.getIdAndRules=function(e){var t=e.children,n=e.dynamic,r=e.id;if(n){var i=h(r,n);return{styleId:i,rules:Array.isArray(t)?t.map(function(e){return f(i,e)}):[f(i,t)]}}return{styleId:h(r),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=i.createContext(null);m.displayName="StyleSheetContext";var _=s.default.useInsertionEffect||s.default.useLayoutEffect,y="undefined"!=typeof window?new p:void 0;function v(e){var t=y||i.useContext(m);return t&&("undefined"==typeof window?t.add(e):_(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}v.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},t.style=v},48059:function(e,t,n){"use strict";e.exports=n(43398).style},95127:function(e,t,n){"use strict";n.d(t,{M:function(){return v}});var r=n(57437),i=n(2265),s=n(9033);function o(){let e=(0,i.useRef)(!1);return(0,s.L)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}var u=n(86219),l=n(67797),c=n(30458),d=n(29791);class a extends i.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function h({children:e,isPresent:t}){let n=(0,i.useId)(),s=(0,i.useRef)(null),o=(0,i.useRef)({width:0,height:0,top:0,left:0}),{nonce:u}=(0,i.useContext)(d._);return(0,i.useInsertionEffect)(()=>{let{width:e,height:r,top:i,left:l}=o.current;if(t||!s.current||!e||!r)return;s.current.dataset.motionPopId=n;let c=document.createElement("style");return u&&(c.nonce=u),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${r}px !important;
            top: ${i}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[t]),(0,r.jsx)(a,{isPresent:t,childRef:s,sizeRef:o,children:i.cloneElement(e,{ref:s})})}let f=({children:e,initial:t,isPresent:n,onExitComplete:s,custom:o,presenceAffectsLayout:u,mode:d})=>{let a=(0,c.h)(p),f=(0,i.useId)(),m=(0,i.useMemo)(()=>({id:f,initial:t,isPresent:n,custom:o,onExitComplete:e=>{for(let t of(a.set(e,!0),a.values()))if(!t)return;s&&s()},register:e=>(a.set(e,!1),()=>a.delete(e))}),u?[Math.random()]:[n]);return(0,i.useMemo)(()=>{a.forEach((e,t)=>a.set(t,!1))},[n]),i.useEffect(()=>{n||a.size||!s||s()},[n]),"popLayout"===d&&(e=(0,r.jsx)(h,{isPresent:n,children:e})),(0,r.jsx)(l.O.Provider,{value:m,children:e})};function p(){return new Map}var m=n(5050),_=n(19047);let y=e=>e.key||"",v=({children:e,custom:t,initial:n=!0,onExitComplete:l,exitBeforeEnter:c,presenceAffectsLayout:d=!0,mode:a="sync"})=>{var h;(0,_.k)(!c,"Replace exitBeforeEnter with mode='wait'");let p=(0,i.useContext)(m.p).forceRender||function(){let e=o(),[t,n]=(0,i.useState)(0),r=(0,i.useCallback)(()=>{e.current&&n(t+1)},[t]);return[(0,i.useCallback)(()=>u.Wi.postRender(r),[r]),t]}()[0],v=o(),S=function(e){let t=[];return i.Children.forEach(e,e=>{(0,i.isValidElement)(e)&&t.push(e)}),t}(e),g=S,R=(0,i.useRef)(new Map).current,w=(0,i.useRef)(g),x=(0,i.useRef)(new Map).current,C=(0,i.useRef)(!0);if((0,s.L)(()=>{C.current=!1,function(e,t){e.forEach(e=>{let n=y(e);t.set(n,e)})}(S,x),w.current=g}),h=()=>{C.current=!0,x.clear(),R.clear()},(0,i.useEffect)(()=>()=>h(),[]),C.current)return(0,r.jsx)(r.Fragment,{children:g.map(e=>(0,r.jsx)(f,{isPresent:!0,initial:!!n&&void 0,presenceAffectsLayout:d,mode:a,children:e},y(e)))});g=[...g];let z=w.current.map(y),b=S.map(y),j=z.length;for(let e=0;e<j;e++){let t=z[e];-1!==b.indexOf(t)||R.has(t)||R.set(t,void 0)}return"wait"===a&&R.size&&(g=[]),R.forEach((e,n)=>{if(-1!==b.indexOf(n))return;let i=x.get(n);if(!i)return;let s=z.indexOf(n),o=e;o||(o=(0,r.jsx)(f,{isPresent:!1,onExitComplete:()=>{R.delete(n);let e=Array.from(x.keys()).filter(e=>!b.includes(e));if(e.forEach(e=>x.delete(e)),w.current=S.filter(t=>{let r=y(t);return r===n||e.includes(r)}),!R.size){if(!1===v.current)return;p(),l&&l()}},custom:t,presenceAffectsLayout:d,mode:a,children:i},y(i)),R.set(n,o)),g.splice(s,0,o)}),g=g.map(e=>{let t=e.key;return R.has(t)?e:(0,r.jsx)(f,{isPresent:!0,presenceAffectsLayout:d,mode:a,children:e},y(e))}),(0,r.jsx)(r.Fragment,{children:R.size?g:g.map(e=>(0,i.cloneElement)(e))})}}}]);