(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[799],{40896:function(e,t,n){Promise.resolve().then(n.t.bind(n,38173,23)),Promise.resolve().then(n.bind(n,36493)),Promise.resolve().then(n.bind(n,26694)),Promise.resolve().then(n.bind(n,77334)),Promise.resolve().then(n.bind(n,14050))},66648:function(e,t,n){"use strict";n.d(t,{default:function(){return l.a}});var r=n(55601),l=n.n(r)},55601:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return c},getImageProps:function(){return i}});let r=n(99920),l=n(80497),s=n(38173),a=r._(n(21241));function i(e){let{props:t}=(0,l.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,n]of Object.entries(t))void 0===n&&delete t[e];return{props:t}}let c=s.Image},36493:function(e,t,n){"use strict";n.d(t,{default:function(){return u}});var r=n(57437),l=n(2265),s=n(97743),a=n(81419);n(76822);var i=n(43946),c=n(58092);let o=e=>{let{children:t,id:n,toggleAccordion:s,isOpen:d}=e,u=null,f=null;return l.Children.forEach(t,e=>{switch(e.type){case o.Header:u=e;break;case o.Body:f=e}}),(0,r.jsxs)("div",{className:"border-b border-black px-4 ".concat(d?"pt-6 pb-4":"py-6"),id:"accordion-".concat(n),children:[(0,r.jsxs)("button",{"aria-expanded":d,"aria-controls":"accordion-".concat(n,"-body"),onClick:s,onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&s()},className:"flex gap-3 items-center w-full py-5 group",children:[u,(0,r.jsx)(i.default,{Icon:(0,r.jsx)(c.Z,{}),hover:!0,HoverIcon:(0,r.jsx)(c.Z,{}),className:"flex-grow-0 shrink-0 mr-0 ml-auto",direction:d?"up":"down",size:"md",border:!1})]}),(0,r.jsx)(a.E.div,{id:"accordion-".concat(n,"-body"),role:"region","aria-labelledby":"accordion-header",initial:!1,animate:{height:d?"auto":0,opacity:d?1:0},transition:{height:{duration:.3},opacity:{duration:.2}},style:{overflow:"hidden"},className:"",children:(0,r.jsx)(a.E.div,{initial:{opacity:0},animate:{opacity:d?1:0},transition:{duration:.3},children:f})})]})};o.Header=e=>{let{children:t}=e;return(0,r.jsx)(r.Fragment,{children:t})},o.Body=e=>{let{children:t,className:n="pt-4 pr-16"}=e;return(0,r.jsx)("div",{size:"md",className:n,children:t})};var d=n(88396),u=e=>{let{faqData:t}=e,[n,a]=(0,l.useState)(t.map(e=>({id:(0,d.x)(e.question),question:e.question,answer:e.answer,isOpen:!1}))),i=e=>{a(t=>t.map((t,n)=>n===e?{...t,isOpen:!t.isOpen}:t))};return(0,r.jsx)(s.Z,{size:"lg",className:"py-10 lg:py-20",children:n.map((e,t)=>(0,r.jsxs)(o,{id:e.id,isOpen:e.isOpen,toggleAccordion:()=>i(t),children:[(0,r.jsx)(o.Header,{children:e.question}),(0,r.jsx)(o.Body,{children:(0,r.jsx)("p",{children:e.answer})})]},e.id))})}},97743:function(e,t,n){"use strict";var r=n(57437);t.Z=e=>{let{children:t,size:n="lg",padding:l=!0,className:s="",ref:a,id:i}=e;return(0,r.jsx)("div",{id:i,className:"".concat({noMax:"w-full mx-auto",md:"w-full max-w-[1160px] mx-auto",lg:"w-full max-w-[1265px] mx-auto",xl:"w-full max-w-[1408px] mx-auto"}[n]," ").concat(l?"px-4 md:px-10":""," ").concat(s),ref:a,children:t})}},26694:function(e,t,n){"use strict";var r=n(57437),l=n(97743);n(77334);var s=n(80472),a=n(76822),i=n(49718);t.default=e=>{let{title:t,buttons:n,ctaIndicator:c,blurbTitle:o,blurbCopy:d}=e,{isBannerVisible:u}=(0,i.S)();return(0,r.jsx)("section",{className:"bg-white-weak relative border-b border-black lg:min-h-[550px]",children:(0,r.jsx)(l.Z,{size:"lg",className:"relative z-10",children:(0,r.jsxs)("div",{className:"".concat(u?"pt-64 lg:pt-72":"pt-36 lg:pt-56"," pb-16 lg:pb-20 lg:flex"),children:[(0,r.jsxs)("div",{className:"lg:w-7/12",children:[(0,r.jsx)("div",{className:"flex",children:(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)(a.sS,{size:"sm",className:"mb-10",children:t})})}),n&&(0,r.jsxs)("div",{className:"flex mb-5",children:[(0,r.jsx)("div",{className:"w-full md:w-2/3 pr-6",children:n.map((e,t)=>(0,r.jsx)(s.Z,{href:e.url,className:"inline-flex clear-both ".concat(n.length>1?"w-full":""),iconDirection:e.iconDirection,children:e.text},t))}),c?(0,r.jsx)("div",{className:"w-1/3",children:(0,r.jsxs)(a.uT,{size:"sm",className:"text-right lg:text-left",children:["[",c,"]"]})}):(0,r.jsx)("div",{className:"lg:w-2/3"})]})]}),(0,r.jsxs)("div",{className:"lg:w-5/12",children:[(0,r.jsx)(a.X6,{tag:"h2",size:"md",className:"mb-2 lg:mb-6",children:o}),d&&(0,r.jsx)(a.uT,{size:"md",children:d})]})]})})})}},49718:function(e,t,n){"use strict";n.d(t,{BannerProvider:function(){return a},S:function(){return i}});var r=n(57437),l=n(2265);let s=(0,l.createContext)();function a(e){let{children:t}=e,[n,a]=(0,l.useState)(!0),[i,c]=(0,l.useState)(0),o=(0,l.useRef)(null);return(0,l.useEffect)(()=>{if(!o.current)return;let e=new ResizeObserver(e=>{for(let t of e)c(t.borderBoxSize[0].blockSize)});return e.observe(o.current),()=>e.disconnect()},[]),(0,r.jsx)(s.Provider,{value:{isBannerVisible:n,setIsBannerVisible:a,bannerHeight:i,setBannerHeight:c,bannerRef:o},children:t})}function i(){let e=(0,l.useContext)(s);if(!e)throw Error("useBanner must be used within a BannerProvider");return e}},80472:function(e,t,n){"use strict";var r=n(57437),l=n(77334),s=n(57559),a=n(43946),i=n(58092);t.Z=e=>{let{onClick:t=null,href:n=null,self:c=null,children:o,className:d,iconDirection:u="down-right"}=e,f=(0,s.Y)(n,t),x={anchor:l.default,button:"button",div:"div"}[f];return(0,r.jsxs)(x,{href:n,onClick:t,self:c,className:"flex justify-between items-center group py-3 px-0 group relative overflow-hidden transition-all duration-200 hover:px-4 text-black no-underline border-t border-black ".concat(d),children:[(0,r.jsx)("div",{className:"z-0 absolute w-0 h-[200%] top-full left-1/2 -translate-x-1/2 block rounded-full transition-all duration-200 group-hover:top-0 group-hover:w-full group-hover:scale-125 bg-black"}),(0,r.jsx)("p",{className:"relative z-10 text-xl leading-[1.2] uppercase tracking-wider grow-1 pr-14 group-hover:text-white transition-colors duration-200",children:o}),(0,r.jsx)(a.default,{Icon:(0,r.jsx)(i.Z,{}),hover:!0,HoverIcon:(0,r.jsx)(i.Z,{}),className:"flex-grow-0 shrink-0",direction:u,border:!1,size:"sm",transparentBg:!0})]})}},76822:function(e,t,n){"use strict";n.d(t,{uT:function(){return l},sS:function(){return s},X6:function(){return a},__:function(){return i},bN:function(){return c}});var r=n(57437),l=e=>{let{children:t,className:n,tag:l="p",size:s="md"}=e;return(0,r.jsx)(l,{className:"text-pretty ".concat({xs:"text-xs leading-[1.2857]",sm:"text-sm leading-[1.2857]",md:"text-[1.0625rem] leading-[1.647]",lg:"text-[1.0625rem] leading-[2rem] lg:text-2xl lg:leading-[2rem]"}[s]," ").concat(n),children:t})},s=e=>{let{children:t,className:n,tag:l="h1",size:s="lg"}=e;return(0,r.jsx)(l,{className:"text-pretty font-youth ".concat({xs:"text-sm leading-[1.714]",sm:"text-[2.3125rem] leading-[1.2] lg:text-6xl leading-[1.066666666666667]",md:"text-[3.125rem] leading-[1.1] tracking-normal lg:text-7xl lg:leading-[1.1111]",lg:"text-[4rem] leading-[1] tracking-normal lg:text-[5.125rem] lg:leading-[1]",xl:"text-[5.125rem] leading-[1.073171] tracking-normal lg:text-5.5rem] lg:leading-[1.0909091]"}[s]," ").concat(n),children:t})},a=e=>{let{children:t,className:n,tag:l="h1",size:s="lg",...a}=e;return(0,r.jsx)(l,{...a,className:"font-youth ".concat({xs:"",sm:"text-xl leading-[1.4] lg:text-2xl lg:leading-[1.333333333333333]",md:"text-[1.75rem] leading-[1.2] lg:text-[2rem] lg:leading-tight",lg:"text-4xl leading-[1.2] lg:text-[2.5rem] lg:leading-tight"}[s]," ").concat(n),children:t})},i=e=>{let{children:t,className:n,tag:l="p",size:s="md"}=e;return(0,r.jsx)(l,{className:"uppercase ".concat({xs:"",sm:"",md:"",lg:"text-xl leading-[1.2]"}[s]," ").concat(n),children:t})},c=e=>{let{children:t,mobileFontSize:n="lg",className:l,tag:s="h1"}=e;return(0,r.jsx)(s,{className:"".concat("lg"==n?"text-scaled-mobile-50":"text-scaled-mobile-40"," leading-[1.1] lg:text-scaled-desktop-82 ").concat(l),children:t})}},43946:function(e,t,n){"use strict";n.d(t,{default:function(){return a}});var r=n(57437);let l=e=>{switch(e){case"top":case"up":default:return"rotate-0";case"top-right":case"up-right":case"right-up":return"rotate-45";case"right":return"rotate-90";case"bottom-right":case"down-right":case"right-down":return"rotate-[135deg]";case"bottom":case"down":return"rotate-180";case"bottom-left":case"down-left":case"left-down":return"-rotate-[135deg]";case"left":return"-rotate-90";case"top-left":case"up-left":case"left-up":return"-rotate-45"}};var s=n(58092),a=e=>{let{Icon:t=(0,r.jsx)(s.Z,{}),direction:n="up",hover:a=!1,HoverIcon:i=(0,r.jsx)(s.Z,{}),hoverDirection:c="up",className:o,size:d="md",border:u=!0,dark:f=!1,transparentBg:x=!1}=e;return(0,r.jsx)("div",{className:"\n        ".concat(a?"group":""," transition-colors duration-200 relative overflow-hidden rounded-full \n        ").concat({xs:"h-4 w-4",sm:"h-6 w-6",40:"h-10 w-10",md:"h-12 w-12",lg:"h-16 w-16"}[d],"\n        ").concat(u?"border ".concat(f?"border-white ".concat(a?"group-hover:border-white":""):"border-black ".concat(a?"group-hover:border-white":"")):"","\n        ").concat(x?"bg-transparent":f?"bg-black ".concat(a?"group-hover:bg-white":""):"bg-white ".concat(a?"group-hover:bg-black":""),"\n        ").concat(o,"\n        "),children:(0,r.jsx)("div",{className:"absolute top-0 left-0 h-full w-full transition-transform \n            ".concat(l(n)),children:(0,r.jsxs)("div",{className:"absolute top-0 left-0 h-full w-full transition-all duration-300\n            ".concat(a?"group-hover:-top-full":""),children:[(0,r.jsx)("div",{className:"top-0 left-0 absolute h-full w-full flex justify-center items-center",children:t}),a&&(0,r.jsx)("div",{className:"top-full left-0 absolute h-full w-full flex justify-center items-center transition-transform \n                ".concat(l(c)),children:i})]})})})}},77334:function(e,t,n){"use strict";n.r(t);var r=n(57437),l=n(87138),s=n(32687);t.default=e=>{let{children:t,href:n,self:a=null,...i}=e,c=(0,s.F)(n);return(0,r.jsx)(l.default,{href:n,target:a||c?"_self":"_blank",prefetch:c,scroll:!0,...i,children:t})}},58092:function(e,t,n){"use strict";var r=n(57437),l=n(40830);t.Z=e=>{let{dark:t=!1,className:n=""}=e,s=(0,l.Z)(),a=t?s.white.DEFAULT:s.black.DEFAULT;return(0,r.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.4893 3.10496L4.29687 9.46964L4.95957 10.2185L11.3208 4.58936L11.3208 21.2959L12.3208 21.2959L12.3208 4.58766L18.6848 10.2039L19.3465 9.45408L12.1515 3.10451C11.9623 2.93752 11.6783 2.93772 11.4893 3.10496Z",fill:a,className:"group-hover:fill-[".concat(t?s.black.DEFAULT:s.white.DEFAULT,"] transition duration-300 ").concat(n)})})}},14050:function(e,t,n){"use strict";n.d(t,{Body:function(){return u},Heading:function(){return d},Image:function(){return f},Link:function(){return h},ListItem:function(){return x},Section:function(){return m}});var r=n(57437),l=n(76822),s=n(40830),a=e=>{let{dark:t=!1,className:n=""}=e,l=(0,s.Z)(),a=t?l.white.DEFAULT:l.black.DEFAULT;return(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:n,children:(0,r.jsx)("path",{d:"M6.67055 0H9.37609V6.49697L15.1603 4.46061L16 7.12727L10.1224 9.16364L13.7143 14.303L11.5685 16L8.02332 10.7636L4.47813 16L2.28571 14.303L5.87755 9.16364L0 7.12727L0.83965 4.46061L6.67055 6.49697V0Z",fill:a})})},i=e=>{let{title:t,children:n,type:s="star",lightMode:i=!1,border:c=!0,index:o}=e;return(0,r.jsxs)("div",{className:"flex flex-col gap-4 pb-6 lg:pb-7\n        ".concat(c?"border-t pt-4":"-mt-6 lg:-mt-7"," \n        ").concat(i?"border-black":"border-white"," "),children:[t&&(0,r.jsx)(l.__,{tag:"h3",size:"lg",children:t}),(0,r.jsxs)("div",{className:"pt-4 pb-2 pl-10 relative block w-full",children:["star"===s&&(0,r.jsx)(a,{className:"absolute top-5 left-2.5",dark:!i}),"number"===s&&(0,r.jsxs)(l.__,{size:"lg",className:"absolute top-4 left-2.5",dark:!i,children:[o,"."]}),n]})]})},c=n(66648),o=n(87138);let d=e=>{let{children:t,className:n="mb-6",...s}=e;return(0,r.jsx)(l.X6,{size:"md",...s,className:n,children:t})},u=e=>{let{children:t,className:n="mb-6",...s}=e;return(0,r.jsx)(l.uT,{size:"md",...s,className:n,children:t})},f=e=>{let{children:t,className:n="mb-6 w-full h-auto",...l}=e;return(0,r.jsx)(c.default,{...l,className:n,width:1440,height:800,children:t})},x=e=>{let{children:t,className:n="mb-6",...l}=e;return(0,r.jsx)(i,{...l,className:n,lightMode:!0,children:t})},m=e=>{let{children:t,className:n="mb-12",...l}=e;return(0,r.jsx)("section",{...l,className:n,children:t})},h=e=>{let{children:t,className:n="underline",...l}=e;return(0,r.jsxs)(o.default,{...l,className:"text-link text-link-underline-anim ".concat(n),children:[(0,r.jsx)("span",{className:"text",children:t}),(0,r.jsx)("svg",{className:"svg",viewBox:"0 0 13 20",children:(0,r.jsx)("polyline",{points:"0.5 19.5 3 19.5 12.5 10 3 0.5"})})]})}},57559:function(e,t,n){"use strict";n.d(t,{Y:function(){return r}});let r=(e,t)=>e?"anchor":t?"button":"div"},32687:function(e,t,n){"use strict";function r(e){return!!e&&(e.startsWith("/")||!e.startsWith("http"))}n.d(t,{F:function(){return r}})},88396:function(e,t,n){"use strict";n.d(t,{x:function(){return r}});let r=e=>e.replace(/\s+/g,"-").toLowerCase()},40830:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(2265),l=n(5481),s=n.n(l),a=n(7722),i=n.n(a);let c={hero:{md:"70vh",lg:"90vh"}};function o(){return(0,r.useMemo)(()=>({...s()(i()).theme.colors,viewportHeights:c}),[])}},7722:function(e,t,n){"use strict";let r;let l=e=>e/1440*100+"vw",s=e=>e/390*100+"vw";e.exports={content:["./src/pages/**/*.{js,ts,jsx,tsx,mdx}","./src/components/**/*.{js,ts,jsx,tsx,mdx}","./src/macros/**/*.{js,ts,jsx,tsx,mdx}","./src/app/**/*.{js,ts,jsx,tsx,mdx}","./src/utils/**/*.{js,ts,jsx,tsx,mdx}"],safelist:["group-hover:fill-[#ffffff], group-hover:fill-[#17141A], line-clamp-1, line-clamp-2, line-clamp-3, line-clamp-4, line-clamp-5, line-clamp-6, line-clamp-7, line-clamp-8, line-clamp-9, line-clamp-10"],theme:{extend:{backgroundImage:{"gradient-radial":"radial-gradient(var(--tw-gradient-stops))","gradient-conic":"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"},colors:{black:{DEFAULT:"#17141A",subtle:"#453D51",pure:"#000000"},white:{DEFAULT:"#ffffff",weak:"#F6F6F6",pure:"#ffffff"},purple:{DEFAULT:"#7b2bf9",weak:"#995DF9",dark:"#38167F"},red:{DEFAULT:"#EC5643",error:{DEFAULT:"#ff4949",subtle:"#FFC7C7"}},weak:{DEFAULT:"#D9D9DB"},subtle:{DEFAULT:"#5D5C62"},green:{DEFAULT:"#42D885"}},fontFamily:{untitledSans:['"UntitledSans"',"sans-serif"],youth:['"Youth"',"sans-serif"]},fontSize:(r={},[82,50,40,32,24,20,18,16,14,12,10,8].forEach(e=>{r["scaled-desktop-".concat(e)]=l(e),r["scaled-mobile-".concat(e)]=s(e)}),r),backgroundImage:{"explore-card-gradient":"linear-gradient(161.19deg, #4E4D51 17.03%, #29242A 100.02%)"},width:{"1/10":"10%","2/10":"20%","3/10":"30%","4/10":"40%","5/10":"50%","6/10":"60%","7/10":"70%","8/10":"80%","9/10":"90%"}}},plugins:[n(56243),function(e){let{addUtilities:t}=e;t({".no-scrollbar":{"-ms-overflow-style":"none","scrollbar-width":"none"},".no-scrollbar::-webkit-scrollbar":{display:"none"}})}]}}},function(e){e.O(0,[6273,8173,1419,2971,7023,1744],function(){return e(e.s=40896)}),_N_E=e.O()}]);