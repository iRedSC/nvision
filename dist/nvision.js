var t,e,i,n,s,a,r,o,l,c,h,d,u,m,g,p,f,_,v,y,b,x,w,$,M,k,C,S,A,z,E,P,T,L,I,O,q,R,F,N,j,D,U,B,H,G,V,W,Y,K,X,Q,Z,J,tt,et,it,nt,st,at,rt,ot,lt,ct=Object.defineProperty,ht=(t,e)=>()=>(t&&(e=t(t=0)),e),dt=(t,e)=>{let i={};for(var n in t)ct(i,n,{get:t[n],enumerable:!0});return e||ct(i,Symbol.toStringTag,{value:"Module"}),i},ut=ht(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=/* @__PURE__ */new WeakMap,s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}},a=t=>new s("string"==typeof t?t:t+"",void 0,i),r=(t,...e)=>new s(1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]),t,i),o=(i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t}),mt=ht(()=>{ut(),({is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:g}=Object),p=globalThis,f=p.trustedTypes,_=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x},Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=/* @__PURE__ */new WeakMap,$=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&h(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const a=n?.call(this);s?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return o(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n;const a=s.fromAttribute(e,t.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const a=this.constructor;if(!1===n&&(s=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},a){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==s||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=/* @__PURE__ */new Map,$[y("finalized")]=/* @__PURE__ */new Map,v?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.2")});function gt(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}function pt(t,e,i=t,n){if(e===Y)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const a=I(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=pt(t,s._$AS(t,e.values),s,n)),e}var ft,_t,vt,yt,bt,xt,wt=ht(()=>{M=globalThis,k=t=>t,C=M.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,P=`<${E="?"+z}>`,T=document,L=()=>T.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,q=t=>O(t)||"function"==typeof t?.[Symbol.iterator],R="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,D=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,B=/"/g,H=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=G(1),W=G(2),G(3),Y=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),X=/* @__PURE__ */new WeakMap,Q=T.createTreeWalker(T,129),Z=(t,e)=>{const i=t.length-1,n=[];let s,a=2===e?"<svg>":3===e?"<math>":"",r=F;for(let o=0;o<i;o++){const e=t[o];let i,l,c=-1,h=0;for(;h<e.length&&(r.lastIndex=h,l=r.exec(e),null!==l);)h=r.lastIndex,r===F?"!--"===l[1]?r=N:void 0!==l[1]?r=j:void 0!==l[2]?(H.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=s??F,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?D:'"'===l[3]?B:U):r===B||r===U?r=D:r===N||r===j?r=F:(r=D,s=void 0);const d=r===D&&t[o+1].startsWith("/>")?" ":"";a+=r===F?e+P:c>=0?(n.push(i),e.slice(0,c)+A+e.slice(c)+z+d):e+z+(-2===c?o:d)}return[gt(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]},J=class t{constructor({strings:e,_$litType$:i},n){let s;this.parts=[];let a=0,r=0;const o=e.length-1,l=this.parts,[c,h]=Z(e,i);if(this.el=t.createElement(c,n),Q.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=h[r++],i=s.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?nt:"?"===n[1]?st:"@"===n[1]?at:it}),s.removeAttribute(t)}else t.startsWith(z)&&(l.push({type:6,index:a}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(z),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),Q.nextNode(),l.push({type:2,index:++a});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===E)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(z,t+1));)l.push({type:7,index:a}),t+=z.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}},tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);Q.currentNode=n;let s=Q.nextNode(),a=0,r=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new et(s,s.nextSibling,this,t):1===o.type?e=new o.ctor(s,o.name,o.strings,this,t):6===o.type&&(e=new rt(s,this,t)),this._$AV.push(e),o=i[++r]}a!==o?.index&&(s=Q.nextNode(),a++)}return Q.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},et=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=pt(this,t,e),I(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):q(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(gt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const a of e)s===i.length?i.push(n=new t(this.O(L()),this.O(L()),this,this.options)):n=i[s],n._$AI(a),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},it=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,n){const s=this.strings;let a=!1;if(void 0===s)t=pt(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==Y,a&&(this._$AH=t);else{const n=t;let r,o;for(t=s[0],r=0;r<s.length-1;r++)o=pt(this,n[i+r],e,r),o===Y&&(o=this._$AH[r]),a||=!I(o)||o!==this._$AH[r],o===K?t=K:t!==K&&(t+=(o??"")+s[r+1]),this._$AH[r]=o}a&&!n&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},nt=class extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}},st=class extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}},at=class extends it{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=pt(this,t,e,0)??K)===Y)return;const i=this._$AH,n=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){pt(this,t)}},ot=M.litHtmlPolyfillSupport,ot?.(J,et),(M.litHtmlVersions??=[]).push("3.3.3"),lt=(t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new et(e.insertBefore(L(),t),t,void 0,i??{})}return s._$AI(t),s}}),$t=ht(()=>{mt(),mt(),wt(),wt(),ft=globalThis,_t=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}},_t._$litElement$=!0,_t.finalized=!0,ft.litElementHydrateSupport?.({LitElement:_t}),vt=ft.litElementPolyfillSupport,vt?.({LitElement:_t}),(ft.litElementVersions??=[]).push("4.2.2")}),Mt=ht(()=>{}),kt=ht(()=>{mt(),wt(),$t(),Mt()}),Ct=ht(()=>{yt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function St(t){return(e,i)=>"object"==typeof i?xt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var At=ht(()=>{mt(),bt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},xt=(t=bt,e,i)=>{const{kind:n,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=/* @__PURE__ */new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)}});function zt(t){return St({...t,state:!0,attribute:!1})}var Et,Pt=ht(()=>{At()}),Tt=ht(()=>{}),Lt=ht(()=>{Et=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i)});function It(t,e){return(i,n,s)=>{const a=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof n?i:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return Et(i,n,{get(){let i=t.call(this);return void 0===i&&(i=a(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return Et(i,n,{get(){return a(this)}})}}var Ot,qt=ht(()=>{Lt()});var Rt=ht(()=>{Lt()}),Ft=ht(()=>{}),Nt=ht(()=>{}),jt=ht(()=>{}),Dt=ht(()=>{Ct(),At(),Pt(),Tt(),qt(),Rt(),Ft(),Nt(),jt()});function Ut(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}function Bt(t){if(!t)return"—";const{state:e}=t;if("unavailable"===e||"unknown"===e)return"—";const i=t.attributes?.unit_of_measurement;if("string"==typeof i&&i.length>0){const t=e.trim();return t.endsWith(i)?t:`${t} ${i}`.trim()}return e}kt(),Dt();var Ht,Gt,Vt=r`
  :host {
    --nv-value-font-size: var(--ha-font-size-l);
    --nv-label-font-size: var(--ha-font-size-s);
    --nv-title-font-size: var(--ha-font-size-m);
    --nv-subtitle-font-size: var(--ha-font-size-s);
    --nv-icon-size: 24px;
    --nv-gauge-max-size: min(100%, 160px);
  }
`,Wt=r`
  ha-tile-info {
    --ha-tile-info-primary-font-size: var(--nv-value-font-size);
    --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
    --ha-tile-info-secondary-font-size: var(--nv-label-font-size);
    --ha-tile-info-secondary-color: var(--secondary-text-color);
  }
`,Yt=r`
  ha-state-icon {
    --mdc-icon-size: var(--nv-icon-size);
  }
`,Kt=ht(()=>{Ht="nvision-blank-card",Gt="nvision-blank-card-editor"});function Xt(t,e,i,n){var s,a=arguments.length,r=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a<3?s(r):a>3?s(e,i,r):s(e,i))||r);return a>3&&r&&Object.defineProperty(e,i,r),r}var Qt=ht(()=>{});function Zt(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}var Jt,te,ee,ie=ht(()=>{}),ne=ht(()=>{kt(),Qt(),Jt=class extends _t{},Xt([St({attribute:!1})],Jt.prototype,"hass",void 0)}),se=/* @__PURE__ */dt({NvisionBlankCardEditor:()=>ee}),ae=ht(()=>{kt(),Dt(),ie(),ne(),Kt(),Qt(),te=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}}],ee=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config=t}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${te}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],ee.prototype,"_config",void 0),ee=Xt([yt(Gt)],ee)});kt(),Dt(),Kt(),Qt(),Ut({type:Ht,name:"Nvision Blank",description:"Neutral starting point for nvision cards"});var re=class extends _t{static async getConfigElement(){return await Promise.resolve().then(()=>(ae(),se)),document.createElement(Gt)}static getStubConfig(t,e,i){const n=e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Ht}`,entity:n}}setConfig(t){this._config=t}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Bt(t);return V`
      <ha-card>
        <div class="content">
          ${t?V`<ha-state-icon
                .hass=${this.hass}
                .stateObj=${t}
              ></ha-state-icon>`:K}
          <ha-tile-info
            .primary=${e}
            .secondary=${i}
          ></ha-tile-info>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,Yt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
    }

    .content {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
      height: 100%;
      min-height: 56px;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
      --ha-tile-info-primary-font-size: var(--nv-label-font-size);
      --ha-tile-info-secondary-font-size: var(--nv-value-font-size);
      --ha-tile-info-secondary-font-weight: var(--ha-font-weight-medium, 500);
    }
  `]}};Xt([St({attribute:!1})],re.prototype,"hass",void 0),Xt([zt()],re.prototype,"_config",void 0),re=Xt([yt(Ht)],re);var oe=1,le=t=>(...e)=>({_$litDirective$:t,values:e}),ce=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};wt();var he,de,ue,me,ge=le(class extends ce{constructor(t){if(super(t),t.type!==oe||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const n=t[i];return null==n?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const n of this.ft)e[n]??(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in e){const t=e[n];if(null!=t){this.ft.add(n);const e="string"==typeof t&&t.endsWith(" !important");n.includes("-")||e?i.setProperty(n,e?t.slice(0,-11):t,e?"important":""):i[n]=t}}return Y}});function pe(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function fe(t,e){if(!t)return e;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}return e}function _e(t,e,i,n){return fe(t,pe(e,i,n))}function ve(t){he??=document.createElement("canvas"),he.width=1,he.height=1;const e=he.getContext("2d");if(!e)return[41,182,246];e.fillStyle="#000000",e.fillStyle=t,e.fillRect(0,0,1,1);const[i,n,s]=e.getImageData(0,0,1,1).data;return[i,n,s]}function ye([t,e,i]){return`rgb(${t}, ${e}, ${i})`}function be(t,e,i){return[Math.round(t[0]+(e[0]-t[0])*i),Math.round(t[1]+(e[1]-t[1])*i),Math.round(t[2]+(e[2]-t[2])*i)]}function xe(t,e){return e>=0?be(t,[255,255,255],e):be(t,[0,0,0],-e)}function we(t,e){const i=ve(pe(t,"--success-color","#4caf50")),n=ve(pe(t,"--warning-color","#ff9800")),s=ve(pe(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return ye(a<=.5?be(i,n,2*a):be(n,s,2*(a-.5)))}var $e,Me,ke=ht(()=>{de="nvision-activity-card",ue="nvision-activity-card-editor",me={still:"idle",unknown:"idle",on_foot:"on_foot",walking:"walking",running:"running",on_bicycle:"bicycle",in_vehicle:"vehicle",automotive:"vehicle",tilting:"tilting"}}),Ce=/* @__PURE__ */dt({NvisionActivityCardEditor:()=>Me}),Se=ht(()=>{kt(),Dt(),ie(),ne(),ke(),Qt(),$e=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"color",selector:{color_rgb:{}}},{name:"speed",required:!0,default:1,selector:{number:{min:.25,max:3,step:.05}}}],Me=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"color"===t.name?"Figure color":"speed"===t.name?"Animation speed":"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={speed:1,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${$e}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],Me.prototype,"_config",void 0),Me=Xt([yt(ue)],Me)});function Ae(t,e,i){const n=.7*i;return W`
    <circle class="rim" cx=${t} cy=${e} r=${i} />
    <g class="spokes">
      <line x1=${t-i} y1=${e} x2=${t+i} y2=${e} />
      <line x1=${t} y1=${e-i} x2=${t} y2=${e+i} />
      <line x1=${t-n} y1=${e-n} x2=${t+n} y2=${e+n} />
      <line x1=${t-n} y1=${e+n} x2=${t+n} y2=${e-n} />
    </g>
    <circle class="hub" cx=${t} cy=${e} r="3" />
  `}kt(),Dt(),ke(),Qt(),Ut({type:de,name:"Nvision Activity",description:"Animated figure that reacts to detected activity (walking, running, cycling, driving…)"});var ze,Ee,Pe,Te,Le=class extends _t{static async getConfigElement(){return await Promise.resolve().then(()=>(Se(),Ce)),document.createElement(ue)}static getStubConfig(t,e,i){const n=e.find(t=>t.toLowerCase().includes("activity"))||e.find(t=>t.startsWith("sensor."))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${de}`,entity:n}}setConfig(t){this._config={speed:1,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:4}}_renderScene(t){return"bicycle"===t?this._renderCyclist():"vehicle"===t?this._renderCar():this._renderPerson()}_renderPerson(){return W`
      <svg class="person" viewBox="0 0 160 160">
        <g class="lean">
          <g class="figure">
            <rect class="limb leg-left" x="69" y="88" width="11" height="52" rx="5.5" />
            <rect class="limb leg-right" x="80" y="88" width="11" height="52" rx="5.5" />
            <rect class="limb arm-left" x="58" y="46" width="9" height="50" rx="4.5" />
            <rect class="limb arm-right" x="93" y="46" width="9" height="50" rx="4.5" />
            <path
              class="torso"
              d="M67 46 Q67 44 69 44 L91 44 Q93 44 93 46 L89 90 Q89 92 87 92 L73 92 Q71 92 71 90 Z"
            />
            <circle class="head" cx="80" cy="28" r="14" />
          </g>
        </g>
      </svg>
    `}_renderCyclist(){return W`
      <svg class="person" viewBox="0 0 160 160">
        <g class="ride">
          ${Ae(40,120,24)} ${Ae(120,120,24)}
          <g class="frame">
            <line x1="40" y1="120" x2="78" y2="120" />
            <line x1="40" y1="120" x2="72" y2="78" />
            <line x1="78" y1="120" x2="72" y2="78" />
            <line x1="72" y1="78" x2="110" y2="78" />
            <line x1="78" y1="120" x2="110" y2="78" />
            <line x1="110" y1="78" x2="120" y2="120" />
            <line x1="110" y1="78" x2="118" y2="68" />
          </g>
          <circle class="hub" cx="78" cy="120" r="4" />
          <g class="rider">
            <line class="rider-seg" x1="72" y1="78" x2="94" y2="52" />
            <line class="rider-seg" x1="94" y1="52" x2="110" y2="78" />
            <line class="rider-seg" x1="72" y1="78" x2="80" y2="98" />
            <line class="rider-seg" x1="80" y1="98" x2="78" y2="120" />
            <circle class="rider-head" cx="99" cy="44" r="10" />
          </g>
        </g>
      </svg>
    `}_renderCar(){return W`
      <svg class="person" viewBox="0 0 160 160">
        <g class="ride">
          <g class="car-group" transform="translate(80 98) scale(1.22) translate(-80 -98)">
            ${Ae(50,126,18)} ${Ae(110,126,18)}
            <g transform="translate(160 0) scale(-1 1)">
              <rect class="car-body" x="20" y="96" width="120" height="28" rx="9" />
              <path
                class="car-body"
                d="M52 98 L64 66 Q66 62 70 62 L104 62 Q108 62 110 66 L122 98 Z"
              />
              <path
                class="window"
                d="M64 94 L72 72 Q73 70 76 70 L100 70 Q103 70 104 72 L110 94 Z"
              />
              <line class="pillar" x1="89" y1="70" x2="89" y2="94" />
              <path class="rider-head" d="M68 94 Q68 84 78 84 Q88 84 88 94 Z" />
              <circle class="rider-head" cx="78" cy="80" r="8" />
            </g>
          </g>
        </g>
      </svg>
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,i=(n=e?.state,n?me[n.toLowerCase().trim()]??"idle":"idle");var n;const s=function(t){return t&&"unknown"!==t&&"unavailable"!==t?t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):"Unknown"}(e?.state),a=this._config.name||e?.attributes.friendly_name||"Activity",r=function(t){if(t)return fe(t,"")||void 0}(this._config.color),o=this._config.speed??1;return V`
      <ha-card
        style=${ge({...r?{"--figure-color":r}:{},"--anim-speed":String(o)})}
      >
        <div class="body">
          <div class="stage ${i}">${this._renderScene(i)}</div>
          <p class="title">${a}</p>
          <p class="subtitle">${s}</p>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,r`
    :host {
      --figure-color: var(--primary-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: var(--ha-space-3, 12px);
      box-sizing: border-box;
    }

    .stage {
      position: relative;
      width: 100%;
      max-width: var(--nv-gauge-max-size);
      aspect-ratio: 1;
    }

    .person {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }

    .head,
    .torso,
    .limb,
    .rider-head {
      fill: var(--figure-color);
    }

    .limb {
      transform-box: fill-box;
      transform-origin: center top;
    }

    .leg-left {
      transform: rotate(-3deg);
    }
    .leg-right {
      transform: rotate(3deg);
    }

    .figure {
      transform-box: fill-box;
      transform-origin: 50% 70%;
    }

    .lean {
      transform-box: fill-box;
      transform-origin: 50% 90%;
      transition: transform 0.4s ease;
    }

    /* Bicycle + car shared parts */
    .frame line,
    .rider-seg {
      fill: none;
      stroke: var(--figure-color);
      stroke-linecap: round;
    }
    .frame line {
      stroke-width: 4;
    }
    .rider-seg {
      stroke-width: 6;
    }

    .spokes {
      transform-box: fill-box;
      transform-origin: center;
    }

    .bicycle .rim {
      fill: none;
      stroke: var(--figure-color);
      stroke-width: 4;
    }
    .bicycle .spokes line {
      stroke: var(--figure-color);
      stroke-width: 2;
    }
    .bicycle .hub {
      fill: var(--figure-color);
    }

    .car-body {
      fill: var(--figure-color);
    }
    .window {
      fill: var(--card-background-color, #fff);
    }
    .pillar {
      stroke: var(--figure-color);
      stroke-width: 4;
      stroke-linecap: round;
    }
    .vehicle .rim {
      fill: var(--figure-color);
    }
    .vehicle .spokes line {
      stroke: var(--card-background-color, #fff);
      stroke-width: 2.5;
    }
    .vehicle .hub {
      fill: var(--card-background-color, #fff);
    }

    .title {
      width: 100%;
      margin: 12px 0 0;
      text-align: center;
      font-size: var(--nv-title-font-size);
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .subtitle {
      width: 100%;
      margin: 2px 0 0;
      text-align: center;
      font-size: var(--nv-subtitle-font-size);
      color: var(--secondary-text-color);
    }

    @media (prefers-reduced-motion: no-preference) {
      .idle .figure {
        animation: bob calc(3.6s / var(--anim-speed, 1)) ease-in-out infinite;
        --bob: 2px;
      }

      .on_foot .leg-left,
      .walking .leg-left,
      .running .leg-left {
        animation: swingLeg var(--dur) ease-in-out infinite;
      }
      .on_foot .leg-right,
      .walking .leg-right,
      .running .leg-right {
        animation: swingLeg var(--dur) ease-in-out infinite;
        animation-delay: calc(var(--dur) / -2);
      }
      .on_foot .arm-left,
      .walking .arm-left,
      .running .arm-left {
        animation: swingArm var(--dur) ease-in-out infinite;
        animation-delay: calc(var(--dur) / -2);
      }
      .on_foot .arm-right,
      .walking .arm-right,
      .running .arm-right {
        animation: swingArm var(--dur) ease-in-out infinite;
      }
      .on_foot .figure,
      .walking .figure,
      .running .figure {
        animation: bob calc(var(--dur) / 2) ease-in-out infinite;
      }

      .on_foot {
        --leg: 12deg;
        --arm: 9deg;
        --bob: 2px;
        --dur: calc(1.5s / var(--anim-speed, 1));
      }
      .walking {
        --leg: 24deg;
        --arm: 16deg;
        --bob: 3px;
        --dur: calc(1s / var(--anim-speed, 1));
      }
      .running {
        --leg: 42deg;
        --arm: 34deg;
        --bob: 5px;
        --dur: calc(0.6s / var(--anim-speed, 1));
      }
      .running .lean {
        transform: rotate(9deg);
      }

      .bicycle .ride {
        animation: rideBob calc(0.9s / var(--anim-speed, 1)) ease-in-out infinite;
      }
      .bicycle .spokes {
        animation: spin calc(0.7s / var(--anim-speed, 1)) linear infinite;
      }

      .vehicle .ride {
        animation: carBob calc(0.5s / var(--anim-speed, 1)) ease-in-out infinite;
      }
      .vehicle .spokes {
        animation: spin calc(0.45s / var(--anim-speed, 1)) linear infinite;
      }

      .tilting .figure {
        animation: tilt calc(2.4s / var(--anim-speed, 1)) ease-in-out infinite;
      }
    }

    @keyframes swingLeg {
      0%,
      100% {
        transform: rotate(calc(-1 * var(--leg)));
      }
      50% {
        transform: rotate(var(--leg));
      }
    }

    @keyframes swingArm {
      0%,
      100% {
        transform: rotate(calc(-1 * var(--arm)));
      }
      50% {
        transform: rotate(var(--arm));
      }
    }

    @keyframes bob {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(calc(-1 * var(--bob, 3px)));
      }
    }

    @keyframes tilt {
      0%,
      100% {
        transform: rotate(-12deg);
      }
      50% {
        transform: rotate(12deg);
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes rideBob {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-2.5px);
      }
    }

    @keyframes carBob {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-1.5px);
      }
      100% {
        transform: translateY(0);
      }
    }
  `]}};function Ie(t){const e=Math.min(1,Math.max(0,t));return e<=0?0:Pe+e*(1-Pe)}function Oe(t,e){if(t){if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}}return He(e,"--warning-color","")||He(e,"--state-active-color","")||He(e,"--primary-color","#ffb300")}function qe(t,e){const i=Ie(t);return Math.max(1.5,e*(.008+i*i*.26))}function Re(t,e){return Ve(void 0===t?0:function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,e.min??0,e.max??3e3),e.effects_min??0,e.effects_max??1)}function Fe(t){return Math.min(1,Math.pow(Math.min(1,Math.max(0,t)),.5)/.75)}function Ne(t,e,i){return i<=e||t<=i?0:Math.min(2,(t-i)/(i-e))}function je(t){return He(t,"--error-color","#f44336")}function De(t,e,i,n){const s=Math.cos(n),a=Math.sin(n);let r=1/0;return s>.001?r=Math.min(r,(e-t.x)/s):s<-.001&&(r=Math.min(r,-t.x/s)),a>.001?r=Math.min(r,(i-t.y)/a):a<-.001&&(r=Math.min(r,-t.y/a)),Number.isFinite(r)?Math.max(0,r):0}function Ue(t,e){const i=Math.min(1,t),n=1+1.6*Ie(i);return qe(i,e)+3*n+n}function Be(t,e,i,n,s,a,r){if(s<=0||i<=0||n<=0)return;const o=Math.min(1,s/2),l=Math.min(6,Math.max(1,Math.round(.35+3.5*o))),c=.14+.86*o,h=1.2+1.4*o,d=.48+.28*o,u=Math.min(1,.22+.58*o);for(let m=0;m<l;m+=1){const s=Ye(Math.floor(a*h)+17.3*m)*Math.PI*2,o=De(e,i,n,s),l=Ue(u,o),g=Math.max(0,o-l);if(g<6)continue;const p=g*c*(.5+.5*Ye(a+3.7*m));t.push({from:e,to:{x:e.x+Math.cos(s)*p,y:e.y+Math.sin(s)*p},intensity:u,alphaScale:d,wiggleScale:.5,color:r})}}function He(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function Ge(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ve(t,e=0,i=1){const n=Math.min(e,i);return n+Math.min(1,Math.max(0,t))*(Math.max(e,i)-n)}function We(t,e,i="center"){if(!t)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect();if(s.width<=0||s.height<=0)return;let a=s.left+s.width/2-n.left,r=s.top+s.height/2-n.top;return"top"===i?r=s.top-n.top:"bottom"===i?r=s.bottom-n.top:"left"===i?a=s.left-n.left:"right"===i&&(a=s.right-n.left),{x:a,y:r}}function Ye(t){const e=43758.5453*Math.sin(127.1*t+311.7*t);return e-Math.floor(e)}function Ke(t,e,i,n,s,a,r=1,o=1){const l=Math.min(1,n),c=Ie(l),h=Math.hypot(i.x-e.x,i.y-e.y);h<4||function(t,e,i,n,s){if(!(e.length<2)){t.save(),t.lineCap="round",t.lineJoin="round",t.strokeStyle=i,t.shadowColor=i,t.shadowBlur=3*s,t.globalAlpha=n,t.lineWidth=s,t.beginPath(),t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i+=1)t.lineTo(e[i].x,e[i].y);t.stroke(),t.restore()}}(t,function(t,e,i,n,s){const a=[t],r=e.x-t.x,o=e.y-t.y,l=Math.hypot(r,o)||1,c=-o/l,h=r/l,d=r/l,u=o/l;for(let m=1;m<i;m+=1){const e=m/i,l=Math.sin(e*Math.PI),g=2*Ye(s+5.17*m)-1,p=2*Ye(s+9.43*m)-1,f=n*l;a.push({x:t.x+r*e+c*f*g+d*f*.2*p,y:t.y+o*e+h*f*g+u*f*.2*p})}return a.push(e),a}(e,i,Math.min(14,Math.max(5,Math.round(h/14))),qe(l,h)*o,s),a,(.5+.42*c)*r,1+1.6*c)}function Xe(t,e,i,n,s,a,r=1,o=1){n<=0||Math.hypot(i.x-e.x,i.y-e.y)<4||Ke(t,e,i,n,Math.floor(3*s),a,r,o)}Xt([St({attribute:!1})],Le.prototype,"hass",void 0),Xt([zt()],Le.prototype,"_config",void 0),Le=Xt([yt(de)],Le);var Qe,Ze,Je,ti,ei,ii=ht(()=>{ze=3e3,Ee=.12,Pe=.18,Te=class{constructor(t,e,i,n){this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._host=t,this._getArcs=e,this._getColor=i,this._onFrame=n}attach(t){this._canvas!==t&&(this.detach(),this._canvas=t,this._ctx=t.getContext("2d")??void 0),this._ctx&&this._canvas&&(this._resizeObserver||(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this._host),this._resizeCanvas()),this._animating||(this._lastFrame=0,this._startAnimation()))}detach(){cancelAnimationFrame(this._frameId),this._animating=!1,this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._canvas=void 0,this._ctx=void 0}_resizeCanvas(){const t=this._canvas,e=this._ctx;if(!t||!e)return;const i=t.getBoundingClientRect(),n=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(i.width*n)),t.height=Math.max(1,Math.floor(i.height*n)),e.setTransform(n,0,0,n,0,0)}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this._animating||!this._ctx||!this._canvas?.isConnected)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._onFrame?.(i),this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;const a=this._getArcs(this._phase),r=a.reduce((t,e)=>Math.max(t,Math.min(1,e.intensity)),0);this._phase+=t*(.32+.38*r),i.clearRect(0,0,n,s);const o=this._getColor();for(const l of a)Xe(i,l.from,l.to,l.intensity,this._phase,l.color??o,l.alphaScale??1,l.wiggleScale??1)}}}),ni=ht(()=>{Qe="nvision-liquid-card",Ze="nvision-liquid-card-editor",Je="bubbles"}),si=/* @__PURE__ */dt({NvisionLiquidCardEditor:()=>ei}),ai=ht(()=>{kt(),Dt(),ie(),ne(),ni(),Qt(),ti=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"liquid_style",required:!0,default:Je,selector:{select:{options:[{value:"none",label:"None"},{value:"bubbles",label:"Bubbles"},{value:"electricity",label:"Electricity"}],mode:"dropdown"}}},{name:"level_color",selector:{boolean:{}}},{name:"level_color_invert",selector:{boolean:{}}},{name:"color",selector:{color_rgb:{}}}],ei=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Liquid color":"level_color"===t.name?"Level-based color":"level_color_invert"===t.name?"Invert level colors":"liquid_style"===t.name?"Liquid style":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,liquid_style:Je,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ti}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],ei.prototype,"_config",void 0),ei=Xt([yt(Ze)],ei)});kt(),Dt(),ii(),ni(),Qt(),Ut({type:Qe,name:"Nvision Liquid",description:"Animated liquid background with sensor state in the foreground"});var ri=.92,oi=4,li=.022,ci=2.4,hi=2.5,di=.034,ui=1.7,mi=1.5,gi=.015,pi=3.1;function fi(t,e,i,n,s,a,r){const o=t=>{const e=43758.5453*Math.sin(127.1*(r+t)+311.7*(r+t));return e-Math.floor(e)},l=Math.floor(3*o(0)),c=.08+.82*o(1);if(0===l){const r=vi(0,t,e,i,n,s,a);return{x:0,y:r+(e-r)*c}}if(1===l){const r=vi(t,t,e,i,n,s,a);return{x:t,y:r+(e-r)*c}}const h=o(3)*t;return{x:h,y:vi(h,t,e,i,n,s,a)}}function _i(t,e,i){if(void 0===t||"unavailable"===t||"unknown"===t)return.62;const n=Number(t);return Number.isFinite(n)?Math.min(ri,Math.max(0,function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(n,e,i))):.62}function vi(t,e,i,n,s,a,r){return i*(1-n)+1.2*Math.sin(.65*s)*a+(t-e/2)*r.x*i*.42*.08+Math.sin(t*li+s*ci)*oi*a+Math.sin(t*di+s*ui+1.2)*hi*a+Math.sin(t*gi-s*pi+2.4)*mi*a}var yi,bi,xi,wi,$i,Mi,ki,Ci,Si,Ai,zi,Ei,Pi,Ti=class extends _t{constructor(...t){super(...t),this._frameId=0,this._phase=0,this._lastFrame=0,this._animating=!1,this._bubbles=[],this._lightningPhase=0,this._gravity={x:0,y:1},this._orientationBeta=90,this._orientationGamma=0,this._spawnTimer=0,this._agitation=0,this._mouseAgitation=0,this._mouseAgitationTarget=0,this._scrollElements=[],this._lastTouchY=0,this._lastMouseX=0,this._lastMouseY=0,this._mouseOver=!1,this._displayFill=0,this._targetFill=0,this._onWheel=t=>{this._boostAgitation(Math.min(.45,.0018*Math.abs(t.deltaY)))},this._onScroll=()=>{this._boostAgitation(.34)},this._onTouchMove=t=>{if(!t.touches.length)return;const e=t.touches[0].clientY;this._lastTouchY&&this._boostAgitation(Math.min(.3,Math.abs(e-this._lastTouchY)/100)),this._lastTouchY=e},this._onTouchEnd=()=>{this._lastTouchY=0},this._onPointerMove=t=>{const e=this.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.clientX,n=t.clientY;if(i>=e.left&&i<=e.right&&n>=e.top&&n<=e.bottom){if(this._mouseOver){const t=Math.hypot(i-this._lastMouseX,n-this._lastMouseY);this._mouseAgitationTarget=Math.min(1,this._mouseAgitationTarget+Math.min(.2,.004*t))}this._lastMouseX=i,this._lastMouseY=n,this._mouseOver=!0}else this._mouseOver=!1},this._onDeviceOrientation=t=>{null!=t.beta&&(this._orientationBeta=t.beta),null!=t.gamma&&(this._orientationGamma=t.gamma)}}static async getConfigElement(){return await Promise.resolve().then(()=>(ai(),si)),document.createElement(Ze)}static getStubConfig(t,e,i){const n=e.find(e=>"%"===t.states[e]?.attributes?.unit_of_measurement)||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Qe}`,entity:n,min:0,max:100}}_boostAgitation(t){this._agitation=Math.min(1,this._agitation+t)}_ampScale(t){return this._agitation=Math.max(0,this._agitation-.016*t),this._mouseAgitation+=.055*(this._mouseAgitationTarget-this._mouseAgitation)*t,this._mouseAgitationTarget=Math.max(0,this._mouseAgitationTarget-.02*t),.3+Math.min(1,this._agitation+this._mouseAgitation)*(2.2-.3)}_bindScroll(){window.addEventListener("wheel",this._onWheel,{passive:!0}),window.addEventListener("touchmove",this._onTouchMove,{passive:!0}),window.addEventListener("touchend",this._onTouchEnd,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove,{passive:!0}),window.addEventListener("deviceorientation",this._onDeviceOrientation,{passive:!0}),this._bindScrollParents()}_unbindScroll(){window.removeEventListener("wheel",this._onWheel),window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("deviceorientation",this._onDeviceOrientation);for(const t of this._scrollElements)t.removeEventListener("scroll",this._onScroll);this._scrollElements=[]}_bindScrollParents(){for(const e of this._scrollElements)e.removeEventListener("scroll",this._onScroll);this._scrollElements=[];let t=this;for(;t;){if(t===document.documentElement||t===document.body){t=t.parentElement;continue}const{overflowY:e,overflow:i}=getComputedStyle(t);(/(auto|scroll)/.test(e)||/(auto|scroll)/.test(i))&&(t.addEventListener("scroll",this._onScroll,{passive:!0}),this._scrollElements.push(t)),t=t.parentElement}}setConfig(t){this._config={min:0,max:100,liquid_style:Je,...t}}_liquidStyle(){return this._config?.liquid_style??"bubbles"}_tickGravity(){const t=function(t,e){const i=e*Math.PI/180,n=t*Math.PI/180,s=Math.sin(i),a=Math.sin(n),r=Math.hypot(s,a);return r<.05?{x:0,y:1}:{x:s/r,y:a/r}}(this._orientationBeta,this._orientationGamma);return this._gravity=function(t,e){return{x:t.x+.1*(e.x-t.x),y:t.y+.1*(e.y-t.y)}}(this._gravity,t),this._gravity}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._bindScroll(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._unbindScroll(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}updated(t){if(t.has("_config")){const t=this._config?.entity;t!==this._trackedEntity&&(this._trackedEntity=t,this._trackedState=void 0,this._displayFill=0,this._bubbles=[],this._lightningPhase=0,this._spawnTimer=0)}if(t.has("hass")){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0;if(e!==this._trackedState){this._trackedState=e;const{min:t,max:i}=this._range();this._targetFill=_i(e,t,i)}}this._ensureCanvas(),this._bindScrollParents()}_syncFillTarget(){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0,{min:i,max:n}=this._range(),s=_i(e,i,n);if(void 0===this._trackedState)return this._displayFill=0,this._targetFill=s,this._trackedState=e,void(this._trackedEntity=t);e!==this._trackedState&&(this._trackedState=e,this._targetFill=s)}_tickFill(t){const e=this._targetFill-this._displayFill;if(Math.abs(e)<.002)return this._displayFill=this._targetFill,this._displayFill;const i=Math.sign(e)*Math.min(Math.abs(e),(e>0?.026:.036)*t);return this._displayFill=Math.min(ri,Math.max(0,this._displayFill+i)),this._boostAgitation(Math.min(.05,1.8*Math.abs(i))),this._displayFill}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._phase+=.045*i,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_drawLiquidPath(t,e,i,n,s,a,r){t.beginPath(),t.moveTo(0,i);for(let o=0;o<=e;o+=2)t.lineTo(o,vi(o,e,i,n,s,a,r));t.lineTo(e,i),t.closePath()}_spawnBubble(t,e){if(this._bubbles.length>=14)return;const i=12+Math.random()*(t-24),n=e+20*Math.random();this._bubbles.push({x:i,y:n,radius:2+4*Math.random(),speed:.6+.8*Math.random(),wobble:Math.random()*Math.PI*2,wobbleSpeed:.04+.04*Math.random(),popProgress:0})}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncFillTarget();const a=this._tickFill(t),r=this._ampScale(t),o=this._tickGravity(),l=this._liquidStyle(),c=a/ri,h=this._config?.level_color?we(this,this._config.level_color_invert?1-c:c):_e(this._config?.color,this,"--info-color","#29b6f6"),d=pe(this,"--card-background-color","#1c1c1c"),u=function(t,e){const i=ve(t),n=ve(e);return{surface:ye(xe(i,.3)),mid:ye(i),deep:ye(xe(i,-.38)),glow:ye(be(i,n,.72))}}(h,d);i.clearRect(0,0,n,s);const m=i.createLinearGradient(0,0,0,s);m.addColorStop(0,d),m.addColorStop(.55,d),m.addColorStop(1,u.glow),i.fillStyle=m,i.globalAlpha=.14,i.fillRect(0,0,n,s),i.globalAlpha=1,this._drawLiquidPath(i,n,s,a,this._phase,r,o);const g=s*(1-a),p=i.createLinearGradient(0,g,0,s);p.addColorStop(0,u.surface),p.addColorStop(.35,u.mid),p.addColorStop(1,u.deep),i.fillStyle=p,i.globalAlpha=.5,i.fill(),i.globalAlpha=1,i.beginPath();for(let f=0;f<=n;f+=2){const t=vi(f,n,s,a,this._phase,r,o);0===f?i.moveTo(f,t):i.lineTo(f,t)}if(i.strokeStyle=u.surface,i.globalAlpha=.35,i.lineWidth=1.5,i.stroke(),i.globalAlpha=1,"bubbles"===l){this._spawnTimer+=t,this._spawnTimer>28&&a>.04&&(this._spawnTimer=0,this._spawnBubble(n,s)),this._bubbles=this._bubbles.filter(e=>{if(e.popProgress>0)return e.popProgress+=.06*t,e.popProgress<1;e.wobble+=e.wobbleSpeed*t,e.x-=o.x*e.speed*t,e.y-=o.y*e.speed*t,e.x+=.15*Math.sin(e.wobble);const i=vi(e.x,n,s,a,this._phase,r,o);return e.y-e.radius<=i&&(e.popProgress=.01),!0});for(const t of this._bubbles){if(t.popProgress>0){const e=t.popProgress,n=t.radius*(1+2.2*e);i.beginPath(),i.arc(t.x,t.y,n,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.5*(1-e),i.lineWidth=1.2,i.stroke(),i.globalAlpha=1;continue}i.beginPath(),i.arc(t.x,t.y,t.radius,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.55,i.lineWidth=1.1,i.stroke(),i.globalAlpha=1}}else this._bubbles=[];if("electricity"===l&&a>.04){this._lightningPhase+=t*(.1+.2*a);const e=function(t,e){return{x:t/2,y:e}}(n,s),l=Math.min(3,1+Math.floor(2*a)),c=Math.floor(.65*this._lightningPhase),h=.6*a;for(let t=0;t<l;t+=1)Xe(i,e,fi(n,s,a,this._phase,r,o,c+17*t),h,this._lightningPhase+.85*t,u.mid)}else"electricity"!==l&&(this._lightningPhase=0)}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Bt(t);return V`
      <ha-card>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="content">
            ${t?V`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:K}
            <ha-tile-info
              .primary=${i}
              .secondary=${e}
            ></ha-tile-info>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,Wt,Yt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      position: relative;
      height: 100%;
      min-height: 96px;
    }

    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      box-sizing: border-box;
      height: 100%;
      min-height: 96px;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
    }
  `]}};Xt([St({attribute:!1})],Ti.prototype,"hass",void 0),Xt([zt()],Ti.prototype,"_config",void 0),Xt([It("canvas")],Ti.prototype,"_canvas",void 0),Ti=Xt([yt(Qe)],Ti);var Li=ht(()=>{yi="nvision-waveform-card",bi="nvision-waveform-card-editor",xi=.6,wi=.28,$i=.45,Mi="line",ki="balanced",Ci="surge",Si={wave:"surge",echo:"spawn",pulse:"surge",stream:"jet",spectrum:"surge",cascade:"spawn"},Ai={line:"line",circle:"ring",grid:"field"},zi=[{value:"line",label:"Line"},{value:"ring",label:"Ring"},{value:"field",label:"Field"}],Ei=[{value:"compact",label:"Compact"},{value:"balanced",label:"Balanced"},{value:"expansive",label:"Expansive"},{value:"dense",label:"Dense"},{value:"packed",label:"Packed"}],Pi=[{value:"surge",label:"Surge"},{value:"spawn",label:"Spawn"},{value:"jet",label:"Jet stream"}]});function Ii(t){return t-Math.floor(t)}Li();var Oi={compact:{dotScale:.88,span:.94,phaseSpeed:.92},balanced:{dotScale:1,span:.98,phaseSpeed:1},expansive:{dotScale:1.08,span:1,phaseSpeed:1.08},dense:{dotScale:.94,span:1,phaseSpeed:1.1},packed:{dotScale:.86,span:1,phaseSpeed:1.14}},qi={line:{compact:16,balanced:24,expansive:32,dense:40,packed:48},ring:{compact:18,balanced:24,expansive:32,dense:40,packed:48},field:{compact:16,balanced:25,expansive:36,dense:49,packed:64}};function Ri(t){return t*t*(3-2*t)}function Fi(t,e){if(t<=0)return 0;return e*(.22*Ri(t)+.3*Math.max(0,t-.5)**2)}function Ni(t){if("ring"===t.layout){const e=t.width/2,i=t.height/2,n=Math.atan2(t.baseY-i,t.baseX-e);return{primary:{x:-Math.sin(n),y:Math.cos(n)},perp:{x:Math.cos(n),y:Math.sin(n)}}}return{primary:{x:0,y:1},perp:{x:1,y:0}}}function ji(t,e){const{x:i,y:n}=function(t,e,i,n){const{dot:s,index:a,phase:r,intensity:o,variant:l,height:c}=t;if(o<n)return{x:e,y:i};const h=Ni(t),d=(r+1.4*l)*(1+.18*o),u=a+.47*l,m=Math.max(.001,1-n),g=((o-n)/m)**2;let p=Math.sin(d*(3.1+2.4*s.seed)+.85*u)*c*g*.12;if(o>n+.15*m){const t=g**1.5;p+=Math.cos(7.4*d+1.7*u+s.phase+l)*c*t*.18,p+=Math.sin(8.2*d+2.1*u)*c*t*.1}return{x:e+h.perp.x*p,y:i+h.perp.y*p}}(t,e.x,e.y,t.chaosAt);return{...e,x:i,y:n}}function Di(t){const e=function(t){return t.layout?t.layout:t.shape?Ai[t.shape]??"line":Mi}(t),i=function(t){if(t.size)return t.size;const e=t.dot_count;if(void 0!==e){if(e<=18)return"compact";if(e>=48)return"packed";if(e>=40)return"dense";if(e>=30)return"expansive"}return ki}(t),n=function(t){return t.motion?Si[t.motion]??t.motion:t.overlap_dots?"spawn":Ci}(t),s=Oi[i];return{layout:e,size:i,motion:n,dotCount:qi[e][i],dotScale:s.dotScale,span:s.span,phaseSpeed:s.phaseSpeed}}function Ui(t){return Array.from({length:t},(e,i)=>{const n=.618033988749895*i%1;return{phase:i/t*Math.PI*2,seed:n,sign:n>.5?1:-1}})}function Bi(t){return.5*t}var Hi={spawn:function(t){const{dot:e,phase:i,intensity:n,height:s,width:a,baseX:r,baseY:o,layout:l}=t,c=Ri(n),h=3.6-1.4*c,d=Ii(i*(.05+c*c*1.15)*(.06+.22*c)+e.seed*h),u=Math.sin(d*Math.PI),m=Fi(n,s)*d*(.85+.45*c),g=e.sign;if("ring"===l){const e=a/2,i=s/2,n=Math.atan2(o-i,r-e),l=.06*Math.min(a,s),h=Math.hypot(r-e,o-i),m=h*(.18+.55*c),p=Math.max(l,h+g*d*m);return ji(t,{x:e+Math.cos(n)*p,y:i+Math.sin(n)*p,radiusMul:.52+u*(.65+.35*c),alphaMul:u*(.32+.58*c)})}const p=Ni(t),f=m*g*(.45+.35*e.seed);return ji(t,{x:r+p.primary.x*f,y:o+p.primary.y*f,radiusMul:.5+u*(.62+.38*c),alphaMul:u*(.32+.58*c)})},jet:function(t){const{dot:e,index:i,count:n,phase:s,intensity:a,height:r,width:o,baseX:l,baseY:c,layout:h}=t,d=Ri(a),u=.16+.78*d,m=u*(.4+1.35*e.seed),g=Fi(a,r)*(.035+.1*d),p=Math.sin(s*(1.6+.8*e.seed)+9.4*e.seed)*g,f=m/(1.75*u),_=.58+.32*f+.28*d;if("ring"===h){const a=o/2,l=r/2,c=.06*Math.min(o,r),h=Math.min(o,r)/2-c,u=i/n*Math.PI*2-Math.PI/2+.35*e.seed,g=Ii(s*(.05+d*d*.24)*m+2.6*e.seed),p=h+g*(h*(.2+.75*d)),v=1-g;return ji(t,{x:a+Math.cos(u)*p,y:l+Math.sin(u)*p,radiusMul:_*(.88+.22*(1-g)),alphaMul:(.38+.18*f+.32*d)*v})}const v=.12*o,y=c+p;return ji(t,{x:Ii(s*m*.32+2.1*e.seed+.04*i)*(o+2*v)-v,y:y,radiusMul:_,alphaMul:.42+.2*f+.4*d})},surge:function(t){const{index:e,count:i,phase:n,intensity:s,height:a,baseX:r,baseY:o,layout:l}=t,c=Ri(s),h=Fi(s,a),d=function(t){return.35+.72*Ri(t)}(s),u=e%2==0,m=n*d-e/Math.max(1,i-1)*Math.PI*1.6,g=.5*Math.sin(m)+.5,p=h*(.25+g*(.55+.65*c)),f=.06*a,_=.58+g*(.28+.42*c);if("ring"===l){const n=t.width/2,s=t.height/2,a=e/i*Math.PI*2-Math.PI/2,l=u?-1:1,h=Math.hypot(r-n,o-s)+l*p*.85;return ji(t,{x:n+Math.cos(a)*h,y:s+Math.sin(a)*h,radiusMul:_,alphaMul:.4+g*(.28+.48*c)})}return ji(t,{x:r,y:u?f+p:a-f-p,radiusMul:_,alphaMul:.38+g*(.3+.5*c)})}};function Gi(t,e,i,n,s,a,r,o,l,c){const h=Math.min(r,o),d=function(t,e,i,n,s,a){const r=Math.min(n,s),o=.04*r;switch(t){case"ring":{const t=n/2,o=s/2,l=.06*r,c=(Math.min(n,s)/2-l)*(.92+.06*a),h=(e+.5)/i*Math.PI*2-Math.PI/2;return{x:t+Math.cos(h)*c,y:o+Math.sin(h)*c}}case"field":{const t=Math.ceil(Math.sqrt(i)),o=Math.ceil(i/t),l=.04*r,c=.04*r,h=.028*r*a,d=(n-2*l-h*(t-1))/t,u=(s-2*c-h*(o-1))/o;return{x:l+e%t*(d+h)+d/2,y:c+Math.floor(e/t)*(u+h)+u/2}}default:{const t=n-o,r=(t-o)*a;return{x:(o+t-r)/2+(i<=1?.5:e/(i-1))*r,y:Bi(s)}}}}(t.layout,i,n,r,o,t.span);if(a<=0)return{x:d.x,y:d.y,radiusMul:.55,alphaMul:.42};const u={dot:e,index:i,count:n,phase:s,intensity:a,chaosAt:c,scale:h,baseX:d.x,baseY:d.y,width:r,height:o,variant:l,layout:t.layout};return Hi[t.motion](u)}function Vi(t,e,i,n){const s=.04*i,a=.58*i;let r=1;t<a&&(r=t<=s?.06:.06+.94*Ri((t-s)/(a-s)));const o=.5*n,l=.42*n,c=Math.abs(e-o);let h=1;return t<a&&c<l&&(h=.08+.92*Ri(c/l)),r*h}function Wi(t,e,i,n,s,a){if("ring"===a)return 1;const r=Math.max(4,.06*s),o=Math.max(3,.04*s),l=Math.min(1,Math.max(0,t/r)),c=Math.min(1,Math.max(0,(i-t)/r)),h=Math.min(1,Math.max(0,e/o)),d=Math.min(1,Math.max(0,(n-e)/o));return"line"===a?Math.min(l,c):Math.min(l,c,h,d)}var Yi,Ki,Xi=/* @__PURE__ */dt({NvisionWaveformCardEditor:()=>Ki}),Qi=ht(()=>{kt(),Dt(),ie(),ne(),Li(),Qt(),Yi=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{type:"grid",name:"",schema:[{name:"layout",required:!0,default:Mi,selector:{select:{options:[...zi],mode:"dropdown"}}},{name:"size",required:!0,default:ki,selector:{select:{options:[...Ei],mode:"dropdown"}}}]},{name:"motion",required:!0,default:Ci,selector:{select:{options:[...Pi],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"shake_at",required:!0,default:xi,selector:{number:{min:.1,max:.95,step:.05}}},{name:"shake_speed",required:!0,default:$i,selector:{number:{min:.15,max:1.5,step:.05}}}]}],Ki=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Waveform color":"layout"===t.name?"Layout":"size"===t.name?"Size":"motion"===t.name?"Motion":"shake_at"===t.name?"Shake starts at":"shake_speed"===t.name?"Shake speed":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,layout:Mi,size:ki,motion:Ci,shake_at:xi,shake_speed:$i,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Yi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],Ki.prototype,"_config",void 0),Ki=Xt([yt(bi)],Ki)});kt(),Dt(),Li(),Qt(),Ut({type:yi,name:"Nvision Waveform",description:"Oscilloscope dot patterns driven by a numeric sensor"});function Zi(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ji(t,e){return t<=e?0:(t-e)/(1-e)}var tn,en,nn=class extends _t{constructor(...t){super(...t),this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._shakePhase=0,this._displayIntensity=0,this._targetIntensity=0,this._dots=Ui(24)}static async getConfigElement(){return await Promise.resolve().then(()=>(Qi(),Xi)),document.createElement(bi)}static getStubConfig(t,e,i){const n=e.find(e=>void 0!==Zi(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${yi}`,entity:n,min:0,max:100,layout:Mi,size:ki,motion:Ci}}setConfig(t){this._config={min:0,max:100,layout:Mi,size:ki,motion:Ci,shake_at:xi,shake_peak:wi,shake_speed:$i,...t},this._syncDots()}_presets(){return Di(this._config??{})}_syncDots(){const{dotCount:t}=this._presets();this._dots.length!==t&&(this._dots=Ui(t))}_shakeThresholds(){return{shakeAt:this._config?.shake_at??.6,shakePeak:this._config?.shake_peak??.28,shakeSpeed:this._config?.shake_speed??.45}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this._clearShakeTransform(),this._shakePhase=0,super.disconnectedCallback()}_shakeTarget(){return this._stage??this}_clearShakeTransform(){this.style.transform="",this._stage&&(this._stage.style.transform="")}updated(t){(t.has("hass")||t.has("_config"))&&this._syncIntensity(),t.has("_config")&&this._syncDots(),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncIntensity(){const t=this._config?.entity,e=Zi(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetIntensity=void 0!==e?function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(e,i,n):0}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(this._stage??t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0),this._syncDots()}_tickIntensity(t){const e=this._targetIntensity-this._displayIntensity;return Math.abs(e)<.001?this._displayIntensity=this._targetIntensity:this._displayIntensity+=.1*e*t,this._displayIntensity}_applyShake(t,e){const{shakeAt:i,shakePeak:n}=this._shakeThresholds(),s=this._shakeTarget();if(t<i)return void this._clearShakeTransform();const a=Ji(t,i)*n,r=e,o=Math.sin(14.3*r)*a*2.4+Math.cos(19.7*r)*a*1.2,l=Math.cos(16.1*r)*a*1.8+Math.sin(11.2*r)*a*.9,c=Math.sin(21.5*r)*a*.4;s.style.transform=`translate(${o}px, ${l}px) rotate(${c}deg)`}_drawDot(t,e,i,n,s,a,r){a<=.01||(t.save(),t.shadowColor=s,t.shadowBlur=n*r,t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=.35*a,t.fill(),t.restore(),t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=a,t.fill(),t.globalAlpha=1)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncIntensity();const a=this._tickIntensity(t),{shakeAt:r,shakeSpeed:o}=this._shakeThresholds(),l=this._presets(),c=Ji(a,r);c>0&&(this._phase+=.04*t*l.phaseSpeed),a>=r?(this._shakePhase+=t*o*.06,this._applyShake(a,this._shakePhase)):(this._shakePhase=0,this._applyShake(a,0));const h=(d=this._config?.color,_e(d,this,"--primary-color","#03a9f4"));var d;const u=Math.min(n,s),m=function(t,e){return Math.max(1.1,.0115*t)*e}(u,l.dotScale),g=Math.max(0,a-.55);i.clearRect(0,0,n,s);for(let p=0;p<this._dots.length;p+=1){const t=Gi(l,this._dots[p],p,this._dots.length,this._phase,c,n,s,0,r),e=Wi(t.x,t.y,n,s,u,l.layout)*Vi(t.x,t.y,n,s),o=m*t.radiusMul*(.75+.35*a+.45*g),d=(.18+.42*a+g*g*1.1)*t.alphaMul*e,f=2.2+1.4*a+1.6*g;this._drawDot(i,t.x,t.y,o,h,d,f)}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Waveform",i=Bt(t);return V`
      <ha-card>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="content">
            ${t?V`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:K}
            <ha-tile-info
              .primary=${i}
              .secondary=${e}
            ></ha-tile-info>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,Wt,Yt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      position: relative;
      height: 100%;
      min-height: 56px;
      overflow: hidden;
    }

    canvas {
      position: absolute;
      inset: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      min-height: 56px;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
    }
  `]}};Xt([St({attribute:!1})],nn.prototype,"hass",void 0),Xt([zt()],nn.prototype,"_config",void 0),Xt([It(".stage")],nn.prototype,"_stage",void 0),Xt([It("canvas")],nn.prototype,"_canvas",void 0),nn=Xt([yt(yi)],nn);var sn,an,rn=ht(()=>{tn="nvision-air-quality-card",en="nvision-air-quality-card-editor"}),on=/* @__PURE__ */dt({NvisionAirQualityCardEditor:()=>an}),ln=ht(()=>{kt(),Dt(),ie(),ne(),rn(),Qt(),sn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"color_good",selector:{color_rgb:{}}},{name:"color_warning",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_bad",selector:{color_rgb:{}}},{name:"color_mist",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_clear",selector:{color_rgb:{}}},{name:"color_sky",selector:{color_rgb:{}}}]}],an=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color_good"===t.name?"Good gauge color":"color_warning"===t.name?"Moderate gauge color":"color_bad"===t.name?"Poor gauge color":"color_mist"===t.name?"Mist color":"color_clear"===t.name?"Clear glow color":"color_sky"===t.name?"Sky glow color":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${sn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],an.prototype,"_config",void 0),an=Xt([yt(en)],an)});kt(),Dt(),rn(),Qt(),Ut({type:tn,name:"Nvision Air Quality",description:"Gauge with gradient arc, mist when air is poor, crisp glow when clear"});var cn=40*Math.PI,hn=.38,dn=.62;function un(t){return t>=hn?0:(hn-t)/hn}function mn(t){return t<=dn?0:(t-dn)/.38}function gn(t,e){return{good:_e(t?.color_good,e,"--success-color","#4caf50"),warning:_e(t?.color_warning,e,"--warning-color","#ff9800"),bad:_e(t?.color_bad,e,"--error-color","#f44336"),mist:_e(t?.color_mist,e,"--secondary-text-color","#888888"),clear:_e(t?.color_clear,e,"--success-color","#4caf50"),sky:_e(t?.color_sky,e,"--info-color","#2196f3")}}function pn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function fn(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}var _n,vn,yn=0,bn=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._gradientId="aq-gradient-"+ ++yn,this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._displayValue=0,this._targetValue=0,this._mist=[]}static async getConfigElement(){return await Promise.resolve().then(()=>(ln(),on)),document.createElement(en)}static getStubConfig(t,e,i){const n=e.find(e=>function(t,e){const i=t.states[e];if(!i)return!1;const n=i.attributes?.device_class;return"aqi"===n||"pm25"===n||"pm10"===n||/aqi|air_quality|pm2/i.test(e)}(t,e))||e.find(e=>void 0!==pn(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${tn}`,entity:n,min:0,max:100}}setConfig(t){this._config={min:0,max:100,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0})}updated(t){(t.has("hass")||t.has("_config"))&&(this._syncValue(),this._applyEffectLevels(this._badness(this._targetValue))),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncValue(){const t=this._config?.entity,e=pn(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetValue=void 0!==e?Math.min(n,Math.max(i,e)):i}_tickValue(t){const e=this._targetValue-this._displayValue;return Math.abs(e)<.05?this._displayValue=this._targetValue:this._displayValue+=.08*e*t,this._displayValue}_badness(t){const{min:e,max:i}=this._range();return fn(t,e,i)}_applyEffectLevels(t){this._stage?.style.setProperty("--haze",String(mn(t))),this._stage?.style.setProperty("--clarity",String(un(t)))}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_ensureMist(t,e,i){const n=Math.floor(16*i);for(;this._mist.length<n;)this._mist.push({x:Math.random()*t,y:Math.random()*e,radius:18+42*Math.random(),vx:.22*(Math.random()-.5),vy:-.04-.18*Math.random(),alpha:.04+.1*Math.random()});this._mist.length>n&&(this._mist.length=n)}_drawMist(t,e,i,n,s,a){if(!(n<.08)){this._ensureMist(e,i,n);for(const r of this._mist){r.x+=r.vx*s,r.y+=r.vy*s,r.y+r.radius<0&&(r.y=i+r.radius,r.x=Math.random()*e),r.x<-r.radius&&(r.x=e+r.radius),r.x>e+r.radius&&(r.x=-r.radius);const o=t.createRadialGradient(r.x,r.y,0,r.x,r.y,r.radius);o.addColorStop(0,a),o.addColorStop(1,"rgba(0,0,0,0)"),t.beginPath(),t.arc(r.x,r.y,r.radius,0,2*Math.PI),t.fillStyle=o,t.globalAlpha=r.alpha*n*1.4,t.fill()}t.globalAlpha=1}}_drawClearGlow(t,e,i,n,s,a){if(n<.2)return;const r=.5*e,o=.36*i,l=.94+.06*Math.sin(.5*this._phase),c=.62*Math.min(e,i)*l,h=t.createRadialGradient(r,o,0,r,o,c);h.addColorStop(0,s),h.addColorStop(.55,a),h.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=h,t.globalAlpha=n*n*.1,t.fillRect(0,0,e,i);const d=t.createLinearGradient(0,0,0,.55*i);d.addColorStop(0,a),d.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=d,t.globalAlpha=.06*n,t.fillRect(0,0,e,i),t.globalAlpha=1}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncValue();const a=this._tickValue(t),r=this._badness(a),o=un(r),l=mn(r);this._phase+=.025*t,this._applyEffectLevels(r);const c=gn(this._config,this);i.clearRect(0,0,n,s),this._drawClearGlow(i,n,s,o,c.clear,c.sky),this._drawMist(i,n,s,l,t,c.mist)}_renderGauge(t,e,i,n,s,a){const{min:r,max:o}=this._range(),l=function(t,e,i){return 180*fn(t,e,i)}(t,r,o),c=this._gaugeReady?cn*(1-l/180):cn;return W`
      <svg viewBox="-50 -50 100 55" class="gauge">
        <defs>
          <linearGradient
            id=${this._gradientId}
            x1="-40"
            y1="0"
            x2="40"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stop-color=${n} />
            <stop offset="50%" stop-color=${s} />
            <stop offset="100%" stop-color=${a} />
          </linearGradient>
        </defs>
        <path class="levels-base" d="M -40 0 A 40 40 0 0 1 40 0" />
        <path
          class="value"
          d="M -40 0 A 40 40 0 0 1 40 0"
          stroke=${`url(#${this._gradientId})`}
          stroke-dasharray=${cn}
          style=${ge({strokeDashoffset:`${c}`})}
        />
        <text
          class="value-text"
          x="0"
          y="-6"
          dominant-baseline="middle"
          text-anchor="middle"
        >
          ${e}
        </text>
        ${i?W`<text
              class="unit-text"
              x="0"
              y="6"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              ${i}
            </text>`:K}
      </svg>
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=pn(t?.state),i=e??this._targetValue,n=this._config.name||t?.attributes.friendly_name||"Air Quality",s=t?.attributes.unit_of_measurement??"",a=void 0!==e?String(Math.round(10*e)/10):"—",r=gn(this._config,this);return V`
      <ha-card
        style=${ge({"--aq-good-color":r.good,"--aq-warning-color":r.warning,"--aq-bad-color":r.bad,"--aq-mist-color":r.mist,"--aq-clear-color":r.clear,"--aq-sky-color":r.sky})}
      >
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="clear-overlay" aria-hidden="true"></div>
          <div class="haze-overlay" aria-hidden="true"></div>
          <div class="body">
            <div class="gauge-wrap">
              ${this._renderGauge(i,a,s,r.good,r.warning,r.bad)}
            </div>
            <p class="title" .title=${n}>${n}</p>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      position: relative;
      height: 100%;
      min-height: 120px;
    }

    canvas {
      position: absolute;
      inset: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }

    .clear-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: calc(var(--clarity, 0) * 0.9);
      background:
        radial-gradient(
          ellipse 85% 55% at 50% 38%,
          color-mix(in srgb, var(--aq-clear-color, var(--success-color)) 16%, transparent),
          transparent 72%
        ),
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--aq-sky-color, var(--info-color)) 10%, transparent),
          transparent 50%
        );
      transition: opacity 0.8s ease;
    }

    .haze-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: calc(var(--haze, 0) * 0.85);
      backdrop-filter: blur(calc(var(--haze, 0) * 5px));
      background: color-mix(
        in srgb,
        var(--aq-mist-color, var(--secondary-text-color)) calc(var(--haze, 0) * 18%),
        transparent
      );
      transition: opacity 0.8s ease;
    }

    .body {
      position: relative;
      z-index: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: var(--ha-space-3, 12px);
      box-sizing: border-box;
      filter: blur(calc(var(--haze, 0) * 1.6px))
        saturate(calc(1 + var(--clarity, 0) * 0.14))
        contrast(calc(1 + var(--clarity, 0) * 0.05));
      transition: filter 0.8s ease;
    }

    .gauge-wrap {
      position: relative;
      width: 100%;
      max-width: var(--nv-gauge-max-size);
    }

    .gauge {
      width: 100%;
      display: block;
    }

    .levels-base {
      fill: none;
      stroke: var(--primary-background-color);
      stroke-width: 12;
      stroke-linecap: butt;
    }

    .value {
      fill: none;
      stroke-width: 12;
      stroke-linecap: butt;
      transition: stroke-dashoffset 1s ease;
    }

    .value-text {
      font-size: var(--nv-value-font-size);
      font-weight: 500;
      fill: var(--primary-text-color);
    }

    .unit-text {
      font-size: var(--nv-label-font-size);
      fill: var(--secondary-text-color);
    }

    .title {
      width: 100%;
      font-size: var(--nv-title-font-size);
      line-height: var(--ha-line-height-expanded, 1.5);
      margin: 0;
      margin-top: 4px;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: none;
      color: var(--primary-text-color);
    }
  `]}};Xt([St({attribute:!1})],bn.prototype,"hass",void 0),Xt([zt()],bn.prototype,"_config",void 0),Xt([zt()],bn.prototype,"_gaugeReady",void 0),Xt([It("canvas")],bn.prototype,"_canvas",void 0),Xt([It(".stage")],bn.prototype,"_stage",void 0),bn=Xt([yt(tn)],bn);var xn,wn,$n=ht(()=>{_n="nvision-circle-gauge-card",vn="nvision-circle-gauge-card-editor"}),Mn=/* @__PURE__ */dt({NvisionCircleGaugeCardEditor:()=>wn}),kn=ht(()=>{kt(),Dt(),ie(),ne(),$n(),Qt(),xn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{name:"track_color",selector:{color_rgb:{}}},{name:"reverse",selector:{boolean:{}}}],wn=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Gauge color":"track_color"===t.name?"Track color":"reverse"===t.name?"Reverse":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${xn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],wn.prototype,"_config",void 0),wn=Xt([yt(vn)],wn)});kt(),Dt(),$n(),Qt(),Ut({type:_n,name:"Nvision Circle Gauge",description:"Full-circle gauge with the value centered, ideal for timers"});var Cn=2*Math.PI*40;function Sn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function An(t){const e=t.split(":").map(Number);return 3===e.length?3600*e[0]+60*e[1]+e[2]:2===e.length?60*e[0]+e[1]:Number(t)||0}function zn(t){const e=t.attributes.duration;return"string"==typeof e?An(e):0}function En(t,e,i){return"idle"===t.state&&void 0===e?"Idle":void 0===e?"—":"idle"===t.state&&0===e?"Idle":function(t,e){const i=Math.max(0,Math.floor(t)),n=Math.floor(i/3600),s=Math.floor(i%3600/60),a=i%60,r={};if(n&&(r.hours=n),s&&(r.minutes=s),(a||!n&&!s)&&(r.seconds=a),e?.language&&"undefined"!=typeof Intl&&"DurationFormat"in Intl)return new Intl.DurationFormat(e.language,{style:"narrow",hoursDisplay:n?"always":"auto"}).format(r);const o=[];return n&&o.push(`${n}h`),s&&o.push(`${s}m`),(a||0===o.length)&&o.push(`${a}s`),o.join(" ")}(e,i)}function Pn(t){return t?.startsWith("timer.")??!1}var Tn,Ln,In=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._tick=0,this._rescaleOnConnect=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(kn(),Mn)),document.createElement(vn)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("timer."))||e.find(e=>function(t,e){const i=t.states[e];return!(!i||!Pn(e)&&void 0===Sn(i.state))}(t,e))||e[0]||i[0]||Object.keys(t.states)[0],s=t.states[n],a=s&&Pn(n)&&zn(s)||100;return{type:`custom:${_n}`,entity:n,min:0,max:a}}setConfig(t){this._config={min:0,max:100,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:3}}connectedCallback(){super.connectedCallback(),this._syncTimerInterval(),this._rescaleOnConnect&&requestAnimationFrame(()=>{this._rescaleTextSvg(),this._rescaleOnConnect=!1})}disconnectedCallback(){this._clearTimerInterval(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0,this._rescaleTextSvg()})}updated(t){(t.has("hass")||t.has("_config"))&&this._syncTimerInterval(),(t.has("hass")||t.has("_config")||t.has("_tick")||t.has("_gaugeReady"))&&requestAnimationFrame(()=>this._rescaleTextSvg())}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_clearTimerInterval(){void 0!==this._timerInterval&&(clearInterval(this._timerInterval),this._timerInterval=void 0)}_syncTimerInterval(){this._clearTimerInterval();const t=this._config?.entity,e=t?this.hass?.states[t]:void 0;e&&Pn(t)&&"active"===e.state&&(this._timerInterval=window.setInterval(()=>{this._tick+=1},1e3))}_reading(){this._tick;const t=this._config?.entity,e=t?this.hass?.states[t]:void 0,{min:i,max:n}=this._range();if(!e)return{value:i,valueText:"—",unit:""};if(Pn(t)){const t=zn(e),s=function(t){const e=t.attributes.remaining;if("string"!=typeof e)return;let i=An(e);if("active"===t.state&&t.attributes.finishes_at){const e=new Date(String(t.attributes.finishes_at)).getTime();i=Math.max((e-Date.now())/1e3,0)}return i}(e),a=n>i?n:t||n;return{value:s??("idle"===e.state?a:i),valueText:En(e,s??t,this.hass?.locale),unit:""}}const s=Sn(e.state),a=s??i;if(this.hass?.formatEntityStateToParts){const t=this.hass.formatEntityStateToParts(e);return{value:a,valueText:t.find(t=>"value"===t.type)?.value??(void 0!==s?String(s):"—"),unit:t.find(t=>"unit"===t.type)?.value??""}}const r=String(e.attributes.unit_of_measurement??"");return{value:a,valueText:void 0!==s?String(s):"—",unit:r}}_rescaleTextSvg(){if(!this.isConnected)return void(this._rescaleOnConnect=!0);const t=this.shadowRoot?.querySelector(".text"),e=t?.querySelector(".text-group");if(!t||!e)return;const i=e.getBBox();0===i.width&&0===i.height||t.setAttribute("viewBox",`${i.x} ${i.y} ${i.width} ${i.height}`)}_renderGauge(t,e,i,n,s){const{min:a,max:r}=this._range(),o=this._config?.entity,l=o?this.hass?.states[o]:void 0,c=l&&Pn(o)?zn(l):r,h=function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,a,Pn(o)&&c>a?c:r),d=this._config?.reverse?1-h:h;return W`
      <svg viewBox="-50 -50 100 100" class="gauge">
        <circle class="track" cx="0" cy="0" r=${40} stroke=${s} />
        <circle
          class="value"
          cx="0"
          cy="0"
          r=${40}
          stroke=${n}
          stroke-dasharray=${Cn}
          style=${ge({strokeDashoffset:`${this._gaugeReady?Cn*(1-d):this._config?.reverse?0:Cn}`})}
          transform="rotate(-90)"
        />
      </svg>
      <svg class="text">
        <g class="text-group">
          <text
            class="value-text"
            x="0"
            y=${i?-4:0}
            dominant-baseline="middle"
            text-anchor="middle"
          >
            ${e}
          </text>
          ${i?W`<text
                class="unit-text"
                x="0"
                y="12"
                dominant-baseline="middle"
                text-anchor="middle"
              >
                ${i}
              </text>`:K}
        </g>
      </svg>
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,{value:i,valueText:n,unit:s}=this._reading(),a=_e(this._config.color,this,"--primary-color","#03a9f4");const r=function(t,e){return _e(t,e,"--primary-background-color","#e0e0e0")}(this._config.track_color,this),o=this._config.name||e?.attributes.friendly_name||"Circle Gauge";return V`
      <ha-card>
        <div class="body">
          <div class="gauge-wrap">
            ${this._renderGauge(i,n,s,a,r)}
          </div>
          <p class="title">${o}</p>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 0;
      padding: var(--ha-space-3, 12px);
      box-sizing: border-box;
    }

    .gauge-wrap {
      position: relative;
      flex: 1 1 0;
      min-height: 0;
      min-width: 0;
      align-self: center;
      width: min(100%, var(--nv-gauge-max-size));
      max-height: var(--nv-gauge-max-size);
      aspect-ratio: 1;
    }

    .gauge {
      width: 100%;
      height: 100%;
      display: block;
    }

    .text {
      position: absolute;
      max-height: 45%;
      max-width: 55%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .track {
      fill: none;
      stroke-width: 10;
    }

    .value {
      fill: none;
      stroke-width: 10;
      stroke-linecap: round;
      transition: stroke-dashoffset 1s ease;
    }

    .value-text {
      font-size: 16px;
      font-weight: 500;
      fill: var(--primary-text-color);
    }

    .unit-text {
      font-size: 11px;
      fill: var(--secondary-text-color);
    }

    .title {
      width: 100%;
      font-size: var(--nv-title-font-size);
      line-height: var(--ha-line-height-expanded, 1.5);
      margin: 0;
      margin-top: 4px;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: none;
      color: var(--primary-text-color);
    }
  `]}};Xt([St({attribute:!1})],In.prototype,"hass",void 0),Xt([zt()],In.prototype,"_config",void 0),Xt([zt()],In.prototype,"_gaugeReady",void 0),Xt([zt()],In.prototype,"_tick",void 0),In=Xt([yt(_n)],In);var On,qn,Rn=ht(()=>{Tn="nvision-power-draw-card",Ln="nvision-power-draw-card-editor"}),Fn=/* @__PURE__ */dt({NvisionPowerDrawCardEditor:()=>qn}),Nn=ht(()=>{kt(),Dt(),ie(),ne(),ii(),Rn(),Qt(),On=[{name:"entity",selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:ze,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}}],qn=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:ze,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${On}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],qn.prototype,"_config",void 0),qn=Xt([yt(Ln)],qn)});kt(),Dt(),ii(),Rn(),Qt(),Ut({type:Tn,name:"Nvision Power Draw",description:"Power consumption with animated lightning from a plug"});var jn,Dn,Un=class extends _t{constructor(...t){super(...t),this._displayIntensity=0}static async getConfigElement(){return await Promise.resolve().then(()=>(Nn(),Fn)),document.createElement(Ln)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return"power"===i?.attributes.device_class||e.includes("power")||void 0!==Ge(i?.state)})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Tn}`,entity:n,min:0,max:ze}}setConfig(t){this._config={min:0,max:ze,effects_min:0,effects_max:1,...t}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Oe(this._config?.color,this)}_overMaxColor(){return je(this)}_rawValue(){const t=this._config?.entity;return Ge(t?this.hass?.states[t]?.state:void 0)}_overMaxSeverity(){const t=this._rawValue();return void 0===t?0:Ne(t,this._config?.min??0,this._config?.max??3e3)}_syncLightningTheme(){const t=this._overMaxSeverity()>0?this._overMaxColor():this._lightningColor();this.style.setProperty("--lightning-color",t),this.style.setProperty("--lightning-glow",String(Fe(this._displayIntensity)))}_targetIntensity(){return Re(this._rawValue(),this._config??{})}_tickIntensity(t){const e=this._targetIntensity(),i=e-this._displayIntensity;return Math.abs(i)<.001?this._displayIntensity=e:this._displayIntensity+=i*Ee*t,this._syncLightningTheme(),this._displayIntensity}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Te(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>{this._tickIntensity(t)})),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=We(this._plug,e,"center"),n=We(this._entityIcon,e,"center");if(!i||!n)return[];const s=this._overMaxSeverity(),a=s>0?this._overMaxColor():this._lightningColor(),r=[{from:i,to:n,intensity:this._displayIntensity,color:a}];if(s>0){const{width:i,height:o}=e.getBoundingClientRect();Be(r,n,i,o,s,t,a)}return r}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Power Draw",i=Bt(t);return V`
      <ha-card class=${this._overMaxSeverity()>0?"over-max":""}>
        <div class="stage">
          <div class="content">
            ${t?V`<ha-state-icon
                  class="entity-icon glow-icon"
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:K}
            <ha-tile-info
              .primary=${i}
              .secondary=${e}
            ></ha-tile-info>
          </div>
          <div class="plug glow-icon" aria-hidden="true">
            <ha-icon .icon=${this._config.icon??"mdi:power-plug"}></ha-icon>
          </div>
          <canvas aria-hidden="true"></canvas>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,Wt,Yt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      --lightning-color: var(--warning-color, #ffb300);
      --lightning-glow: 0;
      display: block;
      height: 100%;
      overflow: visible;
      position: relative;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    ha-card.over-max {
      overflow: visible;
    }

    .stage {
      position: relative;
      height: 100%;
      min-height: 56px;
    }

    .content {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 46px 10px 10px;
      box-sizing: border-box;
      height: 100%;
      min-height: 56px;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-state-icon.glow-icon {
      --state-icon-color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow) * 100%),
        var(--primary-text-color)
      );
      color: var(--state-icon-color);
    }

    .glow-icon {
      color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow) * 100%),
        var(--primary-text-color)
      );
      filter: drop-shadow(
          0 0 calc(var(--lightning-glow) * 14px) var(--lightning-color)
        )
        drop-shadow(
          0 0 calc(var(--lightning-glow) * 5px) var(--lightning-color)
        );
    }

    .plug {
      position: absolute;
      right: 0;
      top: 50%;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(-50%) rotate(-90deg);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
    }

    .plug ha-icon {
      --mdc-icon-size: var(--nv-icon-size);
      opacity: 0.92;
    }

    canvas {
      position: absolute;
      inset: -28px;
      z-index: 1;
      width: calc(100% + 56px);
      height: calc(100% + 56px);
      display: block;
      pointer-events: none;
    }

    ha-card.over-max canvas {
      inset: -44px;
      width: calc(100% + 88px);
      height: calc(100% + 88px);
    }
  `]}};Xt([St({attribute:!1})],Un.prototype,"hass",void 0),Xt([zt()],Un.prototype,"_config",void 0),Xt([It("canvas")],Un.prototype,"_canvas",void 0),Xt([It(".plug")],Un.prototype,"_plug",void 0),Xt([It(".entity-icon")],Un.prototype,"_entityIcon",void 0),Un=Xt([yt(Tn)],Un);var Bn,Hn,Gn=ht(()=>{jn="nvision-power-glance-card",Dn="nvision-power-glance-card-editor"}),Vn=/* @__PURE__ */dt({NvisionPowerGlanceCardEditor:()=>Hn}),Wn=ht(()=>{kt(),Dt(),ie(),ne(),ii(),Gn(),Qt(),Bn=[{name:"entities",selector:{entity:{multiple:!0,domain:"sensor"}}},{name:"columns",default:3,selector:{number:{min:1,max:6,mode:"box"}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:ze,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}}],Hn=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"entities"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entities"):"columns"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.columns"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={entities:[],columns:3,min:0,max:ze,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Bn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],Hn.prototype,"_config",void 0),Hn=Xt([yt(Dn)],Hn)});kt(),Dt(),ii(),Gn(),Qt(),Ut({type:jn,name:"Nvision Power Glance",description:"Multiple power sensors with lightning from a bottom plug"});var Yn=class extends _t{constructor(...t){super(...t),this._displayIntensities=/* @__PURE__ */new Map}static async getConfigElement(){return await Promise.resolve().then(()=>(Wn(),Vn)),document.createElement(Dn)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)],s=/* @__PURE__ */new Set,a=[];for(const r of n){if(s.has(r))continue;s.add(r);const e=t.states[r];if(("power"===e?.attributes.device_class||r.includes("power")||void 0!==Ge(e?.state))&&a.push(r),a.length>=4)break}return{type:`custom:${jn}`,entities:a.length?a:n.slice(0,3),columns:3,min:0,max:ze}}setConfig(t){this._config={entities:[],columns:3,min:0,max:ze,effects_min:0,effects_max:1,...t},this._syncGridColumns()}_syncGridColumns(){const t=this._config?.columns??3,e=this._config?.entities?.length??0,i=e>0?Math.min(t,e):t;this.style.setProperty("--columns",String(i))}getCardSize(){const t=this._config?.entities?.length??1,e=this._config?.columns??3;return Math.max(1,Math.ceil(t/e))}getGridOptions(){return{columns:6,rows:this.getCardSize()}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncGridColumns(),this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Oe(this._config?.color,this)}_overMaxColor(){return je(this)}_entitySeverity(t){const e=Ge(this.hass?.states[t]?.state);return void 0===e?0:Ne(e,this._config?.min??0,this._config?.max??3e3)}_rawValues(){return this._entityIds().map(t=>Ge(this.hass?.states[t]?.state))}_overMaxSeverity(){return function(t,e){const i=e.min??0,n=e.max??3e3;return t.reduce((t,e)=>Math.max(t,void 0!==e?Ne(e,i,n):0),0)}(this._rawValues(),this._config??{})}_syncLightningTheme(){const t=this._lightningColor(),e=this._overMaxColor(),i=this._overMaxSeverity()>0;this.style.setProperty("--lightning-color",t);const n=this._entityIds(),s=this._entityIcons?Array.from(this._entityIcons):[];let a=Fe(0);n.forEach((i,n)=>{const r=Fe(this._displayIntensities.get(i)??0);a=Math.max(a,r);const o=s[n];o?.style.setProperty("--lightning-glow",String(r)),o?.style.setProperty("--lightning-color",this._entitySeverity(i)>0?e:t)}),this._plug?.style.setProperty("--lightning-glow",String(a)),this._plug?.style.setProperty("--lightning-color",i?e:t)}_entityIds(){return this._config?.entities??[]}_targetIntensity(t){const e=this.hass?.states[t]?.state;return Re(Ge(e),this._config??{})}_tickIntensities(t){for(const e of this._entityIds()){const i=this._targetIntensity(e),n=this._displayIntensities.get(e)??0,s=i-n;Math.abs(s)<.001?this._displayIntensities.set(e,i):this._displayIntensities.set(e,n+s*Ee*t)}this._syncLightningTheme()}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Te(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>this._tickIntensities(t))),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=We(this._plug,e,"center");if(!i)return[];const n=this._entityIcons?Array.from(this._entityIcons):[],s=this._entityIds(),a=this._lightningColor(),r=this._overMaxColor(),{width:o,height:l}=e.getBoundingClientRect(),c=[];return s.forEach((s,h)=>{const d=We(n[h],e,"center"),u=this._displayIntensities.get(s)??0,m=this._entitySeverity(s);if(!d)return;const g=m>0?r:a;c.push({from:i,to:d,intensity:u,color:g}),m>0&&Be(c,d,o,l,m,t,r)}),c}render(){if(!this._config||!this.hass)return K;const t=this._entityIds();return V`
      <ha-card class=${this._overMaxSeverity()>0?"over-max":""}>
        <div class="stage">
          <div class="entities">
            ${t.map(t=>{const e=this.hass.states[t],i=Bt(e);return V`
                <div class="entity">
                  ${e?V`<ha-state-icon
                        class="entity-icon glow-icon"
                        .hass=${this.hass}
                        .stateObj=${e}
                      ></ha-state-icon>`:K}
                  <ha-tile-info
                    .primary=${e?.attributes.friendly_name??t}
                    .secondary=${i}
                  ></ha-tile-info>
                </div>
              `})}
          </div>
          <div class="plug-wrap" aria-hidden="true">
            <div class="plug glow-icon">
              <ha-icon .icon=${this._config.icon??"mdi:power-plug"}></ha-icon>
            </div>
          </div>
          <canvas aria-hidden="true"></canvas>
        </div>
      </ha-card>
    `}static{this.styles=[Vt,Yt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      --columns: 3;
      --lightning-color: var(--warning-color, #ffb300);
      --lightning-glow: 0;
      display: block;
      height: 100%;
      overflow: visible;
      position: relative;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
    }

    ha-card.over-max {
      overflow: visible;
    }

    .stage {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 72px;
    }

    .entities {
      position: relative;
      z-index: 3;
      display: grid;
      grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
      justify-content: space-evenly;
      gap: 8px 10px;
      padding: 10px 10px 30px;
      box-sizing: border-box;
      flex: 1;
      width: 100%;
    }

    .entity {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-state-icon.glow-icon {
      --state-icon-color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow, 0) * 100%),
        var(--primary-text-color)
      );
      color: var(--state-icon-color);
    }

    .glow-icon {
      color: color-mix(
        in srgb,
        var(--lightning-color) calc(var(--lightning-glow, 0) * 100%),
        var(--primary-text-color)
      );
      filter: drop-shadow(
          0 0 calc(var(--lightning-glow, 0) * 14px) var(--lightning-color)
        )
        drop-shadow(
          0 0 calc(var(--lightning-glow, 0) * 5px) var(--lightning-color)
        );
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
      --ha-tile-info-primary-font-size: var(--nv-label-font-size);
      --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
      --ha-tile-info-secondary-font-size: var(--nv-value-font-size);
      --ha-tile-info-secondary-font-weight: var(--ha-font-weight-medium, 500);
      --ha-tile-info-secondary-color: var(--primary-text-color);
    }

    .plug-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      pointer-events: none;
    }

    .plug {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .plug ha-icon {
      --mdc-icon-size: var(--nv-icon-size);
      opacity: 0.92;
      display: block;
    }

    canvas {
      position: absolute;
      inset: -28px;
      z-index: 1;
      width: calc(100% + 56px);
      height: calc(100% + 56px);
      display: block;
      pointer-events: none;
    }

    ha-card.over-max canvas {
      inset: -44px;
      width: calc(100% + 88px);
      height: calc(100% + 88px);
    }
  `]}};Xt([St({attribute:!1})],Yn.prototype,"hass",void 0),Xt([zt()],Yn.prototype,"_config",void 0),Xt([It("canvas")],Yn.prototype,"_canvas",void 0),Xt([It(".plug")],Yn.prototype,"_plug",void 0),Xt([function(t){return(e,i)=>Et(e,i,{get(){return(this.renderRoot??(Ot??=document.createDocumentFragment())).querySelectorAll(t)}})}(".entity-icon")],Yn.prototype,"_entityIcons",void 0),Yn=Xt([yt(jn)],Yn),wt();var Kn=le(class extends ce{constructor(t){if(super(t),t.type!==oe||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=/* @__PURE__ */new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const t=!!e[n];t===this.st.has(n)||this.nt?.has(n)||(t?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return Y}});function Xn(t){const e=t.attributes.brightness;return e&&"on"===t.state?`brightness(${(e+245)/5}%)`:""}function Qn(t){const e=Math.max(1e3,Math.min(4e4,t))/100;let i,n,s;return e<=66?(i=255,n=Math.min(255,Math.max(0,99.4708025861*Math.log(e)-161.1195681661)),s=e<=19?0:Math.min(255,Math.max(0,138.5177312231*Math.log(e-10)-305.0447927307))):(i=Math.min(255,Math.max(0,329.698727446*(e-60)**-.1332047592)),n=Math.min(255,Math.max(0,288.1221695283*(e-60)**-.0755148492)),s=255),[Math.round(i),Math.round(n),Math.round(s)]}function Zn(t){if("on"!==t.state)return;const e=t.attributes.rgb_color;if(e)return e;const i=t.attributes.color_temp_kelvin;if("number"==typeof i)return Qn(i);const n=t.attributes.color_temp;if("number"==typeof n&&n>0)return Qn(Math.round(1e6/n));const s=t.attributes.hs_color;return s?function(t,e,i){const n=e/100,s=i/100,a=(1-Math.abs(2*s-1))*n,r=t/60,o=a*(1-Math.abs(r%2-1));let l=0,c=0,h=0;r>=0&&r<1?(l=a,c=o):r<2?(l=o,c=a):r<3?(c=a,h=o):r<4?(c=o,h=a):r<5?(l=o,h=a):(l=a,h=o);const d=s-a/2;return[Math.round(255*(l+d)),Math.round(255*(c+d)),Math.round(255*(h+d))]}(s[0],s[1],50):void 0}ie();var Jn={tap:"toggle",hold:"more-info",double_tap:"none"},ts={tap:"tap_action",hold:"hold_action",double_tap:"double_tap_action"};function es(t,e,i,n){const s=i[ts[n]],a=s?.action??Jn[n];if("none"===a)return;const r=s?.entity??i.entity;if(r)switch(a){case"toggle":return void e.callService("homeassistant","toggle",{entity_id:r});case"more-info":return void Zt(t,"hass-more-info",{entityId:r});case"navigate":return void(s?.navigation_path&&Zt(t,"hass-navigate",{navigation_path:s.navigation_path}));case"url":return void(s?.url_path&&window.open(s.url_path));case"call-service":if(s?.service){const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target)}return;default:return}}var is,ns,ss,as,rs="nvision-light-glow-stack";var os,ls,cs=ht(()=>{is="nvision-light-card",ns="nvision-light-card-editor",ss=.72,as=.62}),hs=/* @__PURE__ */dt({NvisionLightCardEditor:()=>ls}),ds=ht(()=>{kt(),Dt(),ie(),ne(),cs(),Qt(),os=[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"glow_size",required:!0,default:165,selector:{number:{min:20,max:300,step:5,unit_of_measurement:"%"}}},{name:"glow_intensity",required:!0,default:ss,selector:{number:{min:0,max:1,step:.05}}}]},{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}]}],ls=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"glow_size"===t.name?"Glow size":"glow_intensity"===t.name?"Glow intensity":"interactions"===t.name?"Interactions":"hold_action"===t.name||"double_tap_action"===t.name?`${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`:this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:ss,...t}}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${os}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Xt([zt()],ls.prototype,"_config",void 0),ls=Xt([yt(ns)],ls)});kt(),Dt(),ie(),cs(),Qt(),Ut({type:is,name:"Nvision Light",description:"Light control with ambient color glow"}),function(t){if("undefined"==typeof document||document.getElementById(rs))return;const e=document.createElement("style");e.id=rs,e.textContent=`\n    hui-card:has(${t}),\n    .card:has(${t}) {\n      position: relative;\n      z-index: 0;\n      overflow: visible;\n    }\n\n    hui-card:not(:has(${t})),\n    .card:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section:has(${t}) {\n      position: relative;\n      z-index: 0;\n    }\n\n    section:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section .meta {\n      position: relative;\n      z-index: 2;\n    }\n\n    .preview:has(${t}) {\n      overflow: visible;\n    }\n  `,document.head.appendChild(e)}(is);var us,ms,gs,ps,fs,_s,vs,ys=class extends _t{constructor(...t){super(...t),this._holdTriggered=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(ds(),hs)),document.createElement(ns)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("light."))||i.find(t=>t.startsWith("light."))||Object.keys(t.states).find(t=>t.startsWith("light."))||e[0]||i[0]||"";return{type:`custom:${is}`,entity:n,glow_size:165,glow_intensity:ss}}setConfig(t){if(!t.entity||"light"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the light domain");this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:ss,...t}}getCardSize(){return 5}getGridOptions(){return{columns:6,rows:5,min_rows:3}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return V`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=Math.round((t.attributes.brightness||0)/255*100),i="on"===t.state,n="unavailable"===t.state||"unknown"===t.state,s=function(t){const e=t.attributes.supported_features;if("number"==typeof e&&1&e)return!0;const i=t.attributes.supported_color_modes;return Boolean(i?.some(t=>"onoff"!==t))}(t),a=function(t){const e=Zn(t);return e?`rgb(${e.join(", ")})`:"on"===t.state?"var(--state-light-active-color, var(--state-active-color, #ffb74d))":"transparent"}(t),r=function(t){if("on"!==t.state)return 0;const e=t.attributes.brightness;return"number"!=typeof e?1:Math.max(0,Math.min(1,e/255))}(t),o=this._config.glow_size??165,l=(this._config.glow_intensity??.72)*r,c=o*as,h=this._config.name||t.attributes.friendly_name||this._config.entity,d={filter:Xn(t),color:i&&t.attributes.rgb_color?`rgb(${t.attributes.rgb_color.join(",")})`:""},u={"--bulb-color":a,"--nv-glow-size":`${o}%`,"--nv-glow-intensity":String(l),"--nv-glow-spread":`${c}px`};return V`
      <div
        class=${Kn({stage:!0,"state-on":i,"state-off":!i})}
        style=${ge(u)}
      >
        <div class="glow-backdrop" aria-hidden="true"></div>
        <div class="glow-ambient" aria-hidden="true"></div>

        <ha-card class=${Kn({"state-on":i,"state-off":!i})}>
          <ha-icon-button
            class="more-info"
            .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
            @click=${this._handleMoreInfo}
          ></ha-icon-button>

          <div class="content">
          <div id="controls">
            <div id="slider">
              <round-slider
                min="1"
                max="100"
                .value=${e}
                .disabled=${n}
                style=${ge({visibility:s?"visible":"hidden"})}
                @value-changing=${this._dragBrightness}
                @value-changed=${this._setBrightness}
              ></round-slider>
              <ha-icon-button
                class=${Kn({"light-button":!0,"state-on":i,"state-unavailable":n})}
                style=${ge(d)}
                @click=${this._handleTap}
                @dblclick=${this._handleDoubleTap}
                @pointerdown=${this._handleHoldStart}
                @pointerup=${this._handleHoldEnd}
                @pointerleave=${this._handleHoldEnd}
                @pointercancel=${this._handleHoldEnd}
              >
                <ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                  .overrideIcon=${this._config.icon}
                ></ha-state-icon>
              </ha-icon-button>
            </div>
          </div>
          <div id="info">
            ${n?V`<div class="state-label">${t.state}</div>`:V`
                  <div class="brightness">
                    ${e}<span class="unit"> %</span>
                  </div>
                `}
            ${h}
          </div>
        </div>
        </ha-card>
      </div>
    `}_handleMoreInfo(){this._config?.entity&&Zt(this,"hass-more-info",{entityId:this._config.entity})}_handleTap(t){if(this._holdTriggered)return this._holdTriggered=!1,void t.preventDefault();this.hass&&this._config&&es(this,this.hass,this._config,"tap")}_handleDoubleTap(t){t.preventDefault(),this.hass&&this._config&&es(this,this.hass,this._config,"double_tap")}_handleHoldStart(){window.clearTimeout(this._holdTimer),this._holdTriggered=!1,this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,this.hass&&this._config&&es(this,this.hass,this._config,"hold")},500)}_handleHoldEnd(){window.clearTimeout(this._holdTimer)}_dragBrightness(t){const e=this.shadowRoot?.querySelector(".brightness");e&&(e.innerHTML=`${t.detail.value}<span class="unit"> %</span>`,e.classList.add("show_brightness")),window.clearTimeout(this._brightnessTimeout),this._brightnessTimeout=window.setTimeout(()=>{e?.classList.remove("show_brightness")},500)}_setBrightness(t){this.hass&&this._config?.entity&&this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:t.detail.value})}static{this.styles=r`
    :host {
      display: block;
      height: 100%;
      overflow: visible;
      position: relative;
      z-index: 0;
    }

    .stage {
      position: relative;
      height: 100%;
      overflow: visible;
    }

    ha-card {
      height: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      overflow: hidden;
      text-align: center;
      --name-font-size: 1.2rem;
      --brightness-font-size: 1.2rem;
      background: var(--card-background-color);
    }

    ha-card.state-on {
      --ha-card-border-width: 0px;
      --ha-card-box-shadow: none;
      border: none;
      box-shadow: none;
    }

    .glow-backdrop {
      position: absolute;
      inset: calc(var(--nv-glow-spread, 48px) * -1);
      z-index: -1;
      pointer-events: none;
      background: radial-gradient(
        ellipse var(--nv-glow-size, 165%) var(--nv-glow-size, 165%) at 50% 42%,
        color-mix(
          in srgb,
          var(--bulb-color) calc(var(--nv-glow-intensity, 0) * 55%),
          transparent
        ),
        color-mix(
          in srgb,
          var(--bulb-color) calc(var(--nv-glow-intensity, 0) * 28%),
          transparent
        )
          45%,
        transparent 100%
      );
      filter: blur(calc(var(--nv-glow-spread, 48px) * 0.9));
      opacity: calc(0.45 + var(--nv-glow-intensity, 0) * 0.55);
      transition:
        opacity 0.45s ease,
        filter 0.45s ease;
    }

    .glow-ambient {
      position: absolute;
      inset: calc(var(--nv-glow-spread, 48px) * -0.5);
      z-index: -1;
      pointer-events: none;
      background: radial-gradient(
        ellipse 110% 95% at 50% 38%,
        color-mix(
          in srgb,
          var(--bulb-color) calc(var(--nv-glow-intensity, 0) * 40%),
          transparent
        ),
        transparent 100%
      );
      filter: blur(calc(var(--nv-glow-spread, 48px) * 0.35));
      transition: opacity 0.45s ease;
    }

    .stage.state-off .glow-backdrop,
    .stage.state-off .glow-ambient {
      opacity: 0;
    }

    .warning {
      padding: 16px;
      color: var(--error-color);
    }

    .more-info {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
      inset-inline-start: initial;
      inset-inline-end: 0;
      border-radius: var(--ha-border-radius-pill, 9999px);
      color: var(--secondary-text-color);
      z-index: 2;
      direction: var(--direction);
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    #controls {
      display: flex;
      justify-content: center;
      padding: 16px;
      position: relative;
    }

    #slider {
      width: 100%;
      max-width: 200px;
      min-width: 100px;
      aspect-ratio: 1;
      position: relative;
      flex: none;
    }

    round-slider {
      --round-slider-path-color: var(--slider-track-color);
      --round-slider-bar-color: var(--primary-color);
      padding-bottom: 10%;
    }

    .light-button {
      color: var(--state-icon-color);
      width: 60%;
      height: auto;
      position: absolute;
      max-width: calc(100% - 40px);
      box-sizing: border-box;
      border-radius: var(--ha-border-radius-pill, 9999px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      --ha-icon-button-size: 100%;
      --mdc-icon-size: min(72px, 100%);
    }

    .light-button.state-on {
      color: var(--state-light-active-color);
    }

    .light-button.state-unavailable {
      color: var(--state-unavailable-color);
    }

    #info {
      text-align: center;
      margin-top: -56px;
      padding: 16px;
      font-size: var(--name-font-size);
      color: var(--primary-text-color);
    }

    .brightness {
      font-size: var(--brightness-font-size);
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .state-label {
      font-size: var(--brightness-font-size);
      color: var(--secondary-text-color);
      text-transform: capitalize;
    }

    .brightness.show_brightness {
      opacity: 1;
    }

    .unit {
      font-size: 0.85em;
    }
  `}};function bs(t){return String(t).padStart(2,"0")}function xs(t,e){const i=Object.fromEntries(function(t){let e=fs.get(t);return e||(e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hour12:!1,weekday:"short"}),fs.set(t,e)),e}(e).formatToParts(new Date(t)).map(t=>[t.type,t.value])),n=ps.indexOf(String(i.weekday))>=0?ps.indexOf(String(i.weekday)):0,s=Number(i.year),a=Number(i.month),r=Number(i.day);return{year:s,month:a,day:r,hour:Number(i.hour)%24,weekday:n,dateKey:`${s}-${bs(a)}-${bs(r)}`,monthKey:`${s}-${bs(a)}`}}function ws(t,e,i){const n=xs($s(t,e,i),e);return`${n.year}-${bs(n.month)}-${bs(n.day)}`}function $s(t,e,i){const n=xs(t,e),s=(n.weekday-i+7)%7;return Ms(n.year,n.month,n.day,0,0,e)-24*s*60*60*1e3}function Ms(t,e,i,n,s,a){const r=Date.UTC(t,e-1,i,n,s,0),o=Object.fromEntries(function(t){let e=_s.get(t);return e||(e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}),_s.set(t,e)),e}(a).formatToParts(new Date(r)).map(t=>[t.type,t.value]));return r-(Date.UTC(Number(o.year),Number(o.month)-1,Number(o.day),Number(o.hour),Number(o.minute),0)-r)}function ks(t,e,i,n,s){if("none"===t)return"";const a=function(t,e,i=0){return{...xs(t,e),weekKey:ws(t,e,i)}}(e,i,s);switch(t){case"hour":return String(a.hour);case"weekday":return String(a.weekday);case"day":return a.dateKey;case"week":return a.weekKey;case"month":return a.monthKey;case"time":return String(Math.floor(e/n)*n);default:return}}function Cs(t,e,i,n,s){const a=/* @__PURE__ */new Map;if("none"===t)return{keys:[""],labels:[""],bucketRanges:a};if("hour"===t)return{keys:Array.from({length:24},(t,e)=>String(e)),labels:Array.from({length:24},(t,e)=>function(t){return new Date(Date.UTC(2024,0,1,t,0,0)).toLocaleTimeString([],{hour:"numeric"})}(e)),bucketRanges:a};if("weekday"===t){const t=Array.from({length:7},(t,e)=>(n+e)%7);return{keys:t.map(String),labels:t.map(t=>ps[t]),bucketRanges:a}}if("day"===t){const t=function(t,e){const i=[],n=xs(t.startMs,e);let s=Ms(n.year,n.month,n.day,0,0,e);for(;s<=t.endMs;){const t=xs(s,e);i.push({key:t.dateKey,label:`${t.month}/${t.day}`}),s+=864e5}return i.slice(-Math.ceil(t.hours/24))}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("week"===t){const t=function(t,e,i){const n=[];let s=$s(t.startMs,e,i);for(;s<=t.endMs;){const t=xs(s,e);n.push({key:t.dateKey,label:`${t.month}/${t.day}`}),s+=6048e5}return n}(e,i,n);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("month"===t){const t=function(t,e){const i=[],n=xs(t.startMs,e);let s=n.year,a=n.month;for(;;){const n=`${s}-${bs(a)}`;if(i.push({key:n,label:`${s}-${bs(a)}`}),a+=1,a>12&&(a=1,s+=1),Ms(s,a,1,0,0,e)>t.endMs)break}return i}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}const r=function(t,e){const i=[];let n=Math.floor(t.startMs/e)*e;for(;n<t.endMs;){const t=n+e,s=new Date(n);i.push({key:String(n),start:n,end:t,label:s.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}),n=t}return i}(e,s);for(const o of r)a.set(o.key,`${new Date(o.start).toLocaleString()} – ${new Date(o.end).toLocaleString()}`);return{keys:r.map(t=>t.key),labels:r.map(t=>t.label),bucketRanges:a}}function Ss(t,e,i,n,s,a,r){return"time"===t?r.get(i)??s:"none"===e?s:"hour"===t&&"day"===e||"hour"===t&&"weekday"===e||"weekday"===t&&"week"===e?`${a} ${s}`:`${a} · ${s}`}function As(t){return ms[t&&gs[t]||(t&&t in ms?t:void 0)||"week_hourly"]}function zs(t,e,i,n,s,a,r=0,o,l){const c=function(t,e=Date.now()){return{hours:t,endMs:e,startMs:e-60*t*60*1e3}}(us[n]),h=(d=c.hours)<=24||d<=48||d<=336?36e5:864e5;var d;const u=Cs(e,c,a,r,h),m=Cs(i,c,a,r,h),g=new Set(u.keys),p=new Set(m.keys),f=/* @__PURE__ */new Map;for(const x of t){if(x.time<c.startMs||x.time>c.endMs)continue;const t=ks(e,x.time,a,h,r),n=ks(i,x.time,a,h,r);if(void 0===t||void 0===n)continue;if(!g.has(t)||!p.has(n))continue;const s=`${n}|${t}`,o=f.get(s)??[];o.push({time:x.time,value:x.value}),f.set(s,o)}const _=[],v=m.keys.map((t,n)=>u.keys.map((a,r)=>{const o=f.get(`${t}|${a}`)??[],l=function(t,e){if(!t.length)return null;switch(e){case"sum":case"count":return t.reduce((t,e)=>t+e.value,0);case"max":return Math.max(...t.map(t=>t.value));case"min":return Math.min(...t.map(t=>t.value));case"last":{let e=t[0];for(const i of t)i.time>=e.time&&(e=i);return e.value}default:return t.reduce((t,e)=>t+e.value,0)/t.length}}(o,s);return null!==l&&_.push(l),{value:l,count:o.length,rangeLabel:Ss(e,i,a,0,u.labels[r],m.labels[n],u.bucketRanges)}}));let y=o,b=l;if(void 0===y||void 0===b){const t=_.length?Math.min(..._):0,e=_.length?Math.max(..._):1;y=y??t,b=b??(e===t?t+1:e)}return b<=y&&(b=y+1),{xLabels:u.labels,yLabels:m.labels,xKeys:u.keys,yKeys:m.keys,cells:v,min:y,max:b}}function Es(t,e,i){return null===t?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}Xt([St({attribute:!1})],ys.prototype,"hass",void 0),Xt([zt()],ys.prototype,"_config",void 0),ys=Xt([yt(is)],ys);var Ps=ht(()=>{us={"24h":24,"48h":48,"7d":168,"14d":336,"30d":720,"90d":2160,"365d":8760},ms={week_hourly:{x:"hour",y:"day",period:"7d"},two_weeks:{x:"hour",y:"day",period:"14d"},daily_rhythm:{x:"hour",y:"weekday",period:"30d"},month_days:{x:"weekday",y:"week",period:"30d"},month_calendar:{x:"weekday",y:"week",period:"90d"},quarter:{x:"week",y:"month",period:"90d"},timeline_24h:{x:"time",y:"none",period:"24h"},timeline_48h:{x:"time",y:"none",period:"48h"},year_overview:{x:"week",y:"month",period:"365d"}},gs={timeline:"timeline_24h",custom:"week_hourly"},ps=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],fs=/* @__PURE__ */new Map,_s=/* @__PURE__ */new Map,vs=["day","week","month"]});function Ts(t){if(t.callWS)return t.callWS.bind(t);const e=t.connection;if(e?.sendMessagePromise)return e.sendMessagePromise.bind(e);throw new Error("WebSocket API unavailable")}function Ls(t){return Ts(t)}function Is(t){if(!t)return!1;const e=t.split(".",1)[0];return"binary_sensor"===e||"input_boolean"===e}function Os(t,e){const i=(...t)=>{for(const e of t){if(null==e)continue;const t=Number(e);if(Number.isFinite(t))return t}};switch(e){case"mean":default:return i(t.mean,t.state);case"sum":return i(t.sum,t.change,t.state);case"max":return i(t.max,t.state,t.sum);case"min":return i(t.min,t.state);case"last":return i(t.state,t.mean);case"count":return i(t.change)}}function qs(t){if("string"==typeof t){const e=Date.parse(t);return Number.isFinite(e)?e:void 0}return t<1e11?1e3*t:t}var Rs,Fs,Ns,js,Ds,Us,Bs;async function Hs(t,e,i,n,s,a="mean"){const r=Ls(t),o=function(t){return"max"===t||"last"===t}(a);return function(t,e,i=!1){if(t.length<=e)return t;const n=Math.ceil(t.length/e),s=[];for(let a=0;a<t.length;a+=n){const e=t.slice(a,a+n);e.length&&(i?s.push(e.reduce((t,e)=>e.value>t.value||e.value===t.value&&e.time>t.time?e:t,e[0])):s.push(e[0]))}return s}(function(t,e){const i=[];let n=!1;for(const s of t){const t=1e3*(s.lu??s.lc??0);if(e){const e="on"===s.s;e&&!n&&i.push({time:t,value:1}),n=e;continue}const a=Number(s.s);Number.isFinite(a)&&i.push({time:t,value:a})}return i}(function(t,e){return Array.isArray(t)?t[0]??[]:t[e]??[]}(await r({type:"history/history_during_period",start_time:i.toISOString(),end_time:n.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!o}),e),s),8e3,o)}async function Gs(t,e,i,n,s,a){const r=Ls(t),o="sum"===s?["sum","change","state"]:"max"===s?["max","state","sum"]:"min"===s?["min","state"]:["mean","state"];return function(t,e){const i=[];for(const n of t){const t=Os(n,e);if(null==t||!Number.isFinite(t))continue;const s=qs(n.start);void 0!==s&&i.push({time:s,value:t})}return i}((await r({type:"recorder/statistics_during_period",start_time:i.toISOString(),end_time:n.toISOString(),statistic_ids:[e],period:a,types:o}))[e]??[],s)}var Vs,Ws,Ys,Ks=ht(()=>{Ps(),Rs="nvision-heat-map-card",Fs="nvision-heat-map-card-editor",Ns="week_hourly",js="theme",Ds=[{value:"week_hourly",label:"Week — hour × day"},{value:"two_weeks",label:"Two weeks — hour × day"},{value:"daily_rhythm",label:"Daily rhythm — hour × weekday"},{value:"month_days",label:"Month — weekday × week"},{value:"month_calendar",label:"Quarter calendar — weekday × week"},{value:"quarter",label:"Quarter — week × month"},{value:"timeline_24h",label:"Timeline — 24 hours"},{value:"timeline_48h",label:"Timeline — 48 hours"},{value:"year_overview",label:"Year — week × month"}],Us=[{value:"theme",label:"Theme"},{value:"semantic",label:"Semantic"},{value:"temperature",label:"Temperature"},{value:"custom",label:"Custom"}],Bs=[{value:"auto",label:"Auto"},{value:"mean",label:"Mean"},{value:"sum",label:"Sum"},{value:"max",label:"Maximum"},{value:"min",label:"Minimum"},{value:"count",label:"Count"},{value:"last",label:"Last"}]}),Xs=/* @__PURE__ */dt({NvisionHeatMapCardEditor:()=>Ys}),Qs=ht(()=>{kt(),Dt(),ie(),ne(),Ks(),Qt(),Vs=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"preset",required:!0,default:Ns,selector:{select:{options:[...Ds],mode:"dropdown"}}},{name:"operation",default:"auto",selector:{select:{options:[...Bs],mode:"dropdown"}}},{name:"color_mode",required:!0,default:js,selector:{select:{options:[...Us],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_axis_labels",selector:{boolean:{}}},{name:"show_legend",selector:{boolean:{}}},{name:"show_cell_values",selector:{boolean:{}}},{name:"show_current",selector:{boolean:{}}},{name:"dim_low_values",selector:{boolean:{}}}]}],Ws=[{type:"grid",name:"",schema:[{name:"color_low",selector:{color_rgb:{}}},{name:"color_high",selector:{color_rgb:{}}}]}],Ys=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"preset"===t.name?"View":"color_mode"===t.name?"Color mode":"operation"===t.name?"Operation":"color_low"===t.name?"Low color":"color_high"===t.name?"High color":"show_axis_labels"===t.name?"Axis labels":"show_legend"===t.name?"Scale":"show_cell_values"===t.name?"Values in cells":"dim_low_values"===t.name?"Dim low values":"show_current"===t.name?"Current value":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={preset:Ns,color_mode:js,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1,...t,color_mode:"primary"===t.color_mode?"theme":t.color_mode,operation:t.operation??"auto"}}_schema(){return"custom"===this._config?.color_mode?[...Vs,...Ws]:Vs}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){const e=t.detail.value;Zt(this,"config-changed",{config:{...e,color_mode:"primary"===e.color_mode?"theme":e.color_mode}})}},Xt([zt()],Ys.prototype,"_config",void 0),Ys=Xt([yt(Fs)],Ys)});function Zs(t){return t&&"primary"!==t?t:"theme"}function Js(t,e,i,n){const s=Zs(i);return"semantic"===s?we(t,e):"temperature"===s?function(t,e){const i=ve(pe(t,"--info-color","#2196f3")),n=ve(pe(t,"--warning-color","#ff9800")),s=ve(pe(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return ye(a<=.5?be(i,n,2*a):be(n,s,2*(a-.5)))}(t,e):"custom"===s?function(t,e,i,n){return ye(be(ve(fe(i,pe(t,"--info-color","#2196f3"))),ve(fe(n,pe(t,"--error-color","#f44336"))),Math.min(1,Math.max(0,e))))}(t,e,n.color_low,n.color_high):function(t,e){const i=ve(pe(t,"--primary-color","#03a9f4")),n=ve(pe(t,"--card-background-color","#1c1c1c")),s=Math.min(1,Math.max(0,e));return ye(be(be(n,i,.18),i,.35+.65*s))}(t,e)}kt(),Dt(),Ps(),Ks(),Qt(),Ut({type:Rs,name:"Nvision Heat Map",description:"Temporal heat map for sensor history and patterns"});function ta(t,e,i,n,s){if(!s)return"rgba(0, 0, 0, 0.05)";const a=Js(t,e,i,n);return n.dim_low_values?`color-mix(in srgb, ${a} ${22+e*e*78}%, var(--card-background-color))`:a}function ea(t,e,i,n=!1){if(null===t)return"—";const s="count"===e?String(Math.round(t)):Number.isInteger(t)?String(t):n?t.toFixed(0):t.toFixed(1);return i&&"count"!==e?n?s:`${s} ${i}`:s}function ia(t,e,i){return ea(t,e,i,!0)}var na=null;function sa(t,e){return na??=document.createElement("canvas").getContext("2d"),na?(na.font=e,na.measureText(t).width):6*t.length}var aa=class extends _t{constructor(...t){super(...t),this._loading=!1,this._fetchVersion=0,this._measureFrame=0}static async getConfigElement(){return await Promise.resolve().then(()=>(Qs(),Xs)),document.createElement(Fs)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return e.startsWith("sensor.")||e.startsWith("binary_sensor.")||Number.isFinite(Number(i?.state))})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Rs}`,entity:n,preset:Ns,operation:"auto",color_mode:js,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1}}_entityAttributes(){const t=this._config?.entity;if(t&&this.hass)return this.hass.states[t]?.attributes}_resolveAggregate(t){const e=this._config?.operation;if(e&&"auto"!==e)return e;const i=this._config?.entity,n=this._entityAttributes();return s=t.x,a=t.y,r=function(t,e){return Is(t)?"count":function(t,e){return!!function(t){return"string"==typeof t?.start&&"string"==typeof t?.end&&void 0!==t?.value}(e)||!!e?.last_reset||!(!t||!/_today$/i.test(t))}(t,e)?"max":function(t){const e=t?.state_class;return"total_increasing"===e||"total"===e}(e)?"last":"mean"}(i,n),"count"===r?"count":vs.includes(s)||vs.includes(a)?"max":r;var s,a,r}_computeLoadKey(){const t=this._config;if(!t?.entity)return"";const e=As(t.preset),i=this._entityAttributes();return JSON.stringify({entity:t.entity,preset:t.preset,operation:t.operation??"auto",stateClass:i?.state_class,aggregate:this._resolveAggregate(e),axes:e})}setConfig(t){this._config={preset:Ns,operation:"auto",color_mode:js,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t,color_mode:Zs(t.color_mode)},this._loadKey=void 0}getCardSize(){const t=this._grid?.yLabels.length??4;return Math.max(3,Math.min(8,Math.ceil(.75*t)+2))}getGridOptions(){const t=this._grid?.yLabels.length??4;return{columns:6,rows:Math.max(3,Math.min(8,Math.ceil(.75*t)+2)),min_rows:3}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>this._scheduleXLabelMeasure())}disconnectedCallback(){this._resizeObserver?.disconnect(),cancelAnimationFrame(this._measureFrame),super.disconnectedCallback()}updated(t){if(t.has("_config")||t.has("hass")){const t=this._computeLoadKey();t&&this.hass&&t!==this._loadKey&&(this._loadKey=t,this._loadData())}t.has("_grid")&&(this._xLabelVisible=void 0),this._grid&&!1!==this._config?.show_axis_labels&&this._scheduleXLabelMeasure()}_scheduleXLabelMeasure(){cancelAnimationFrame(this._measureFrame),this._measureFrame=requestAnimationFrame(()=>this._updateXLabelVisibility())}_observeGridWrap(t){this._resizeObserver&&t!==this._observedWrap&&(this._observedWrap&&this._resizeObserver.unobserve(this._observedWrap),this._observedWrap=t,this._resizeObserver.observe(t))}_updateXLabelVisibility(){const t=this._grid,e=this.shadowRoot;if(!t||!e||!1===this._config?.show_axis_labels)return;const i=e.querySelector(".grid-wrap"),n=e.querySelector(".data-grid .cell")??e.querySelector(".timeline-grid .cell");if(!i||!n)return;this._observeGridWrap(i);const s=e.querySelectorAll(".data-grid .cell, .timeline-grid .cell");let a=n.getBoundingClientRect().width;if(s.length>1){const t=s[0].getBoundingClientRect();a=s[1].getBoundingClientRect().left-t.left}const r=e.querySelector(".axis.x"),o=r?getComputedStyle(r).font:"500 10px Roboto, sans-serif",l=function(t,e,i,n=6){if(e<=0||!t.length)return t.map(()=>!0);const s=t.map(()=>!1);let a=-1/0;for(let r=0;r<t.length;r++){const o=t[r];if(!o)continue;const l=sa(o,i),c=(r+.5)*e;c-l/2>=a+n&&(s[r]=!0,a=c+l/2)}return s}(t.xLabels,a,o);(function(t,e){return!(!t||!e||t.length!==e.length)&&t.every((t,i)=>t===e[i])})(l,this._xLabelVisible)||(this._xLabelVisible=l)}async _loadData(){const t=this._config,e=this.hass,i=t?.entity;if(!t||!e||!i)return this._grid=void 0,void(this._error=void 0);try{Ts(e)}catch{return this._error="History unavailable",void(this._grid=void 0)}const n=++this._fetchVersion;this._loading=!0,this._error=void 0;try{const s=As(t.preset),a=this._resolveAggregate(s),r=await async function(t,e,i,n){const s=/* @__PURE__ */new Date,a=/* @__PURE__ */new Date(s.getTime()-60*i*60*1e3);if(Is(e)||"count"===n)return Hs(t,e,a,s,!0,n);if(i>=24&&("max"===n||"sum"===n))try{const r=await Gs(t,e,a,s,n,i>336?"day":"hour");if(function(t,e){return!!t.length&&("max"!==e&&"sum"!==e||t.some(t=>t.value>0))}(r,n))return r}catch{}if(i>=24&&"mean"===n)try{const r=await Gs(t,e,a,s,n,i>336?"day":"hour");if(r.length>0)return r}catch{}return Hs(t,e,a,s,!1,n)}(e,i,us[s.period],a);if(n!==this._fetchVersion)return;if(await new Promise(t=>{"function"!=typeof requestIdleCallback?setTimeout(t,0):requestIdleCallback(()=>t(),{timeout:120})}),n!==this._fetchVersion)return;this._grid=zs(r,s.x,s.y,s.period,a,e.config.time_zone||"UTC",1)}catch(s){if(n!==this._fetchVersion)return;this._error=function(t,e="Could not load history"){return t instanceof Error||"object"==typeof t&&null!==t&&"message"in t&&"string"==typeof t.message?t.message:e}(s),this._grid=void 0}finally{n===this._fetchVersion&&(this._loading=!1)}}_handleHeaderClick(t){t.stopPropagation(),this.hass&&this._config&&es(this,this.hass,this._config,"tap")}_showPopover(t,e){const i=t.currentTarget,n=i.closest(".grid-wrap");if(!n)return;const s=i.getBoundingClientRect(),a=n.getBoundingClientRect(),r=this._config,o=r.entity?this.hass?.states[r.entity]:void 0,l=String(o?.attributes.unit_of_measurement??""),c=this._resolveAggregate(As(r.preset));this._popover={anchorX:s.left-a.left+s.width/2,anchorY:s.top-a.top,label:e.rangeLabel,value:ea(e.value,c,"count"===c?"":l),count:e.count}}_hidePopover(){this._popover=void 0}_renderLegend(t){const e=this._config,i=Zs(e.color_mode),n=e.entity?this.hass?.states[e.entity]:void 0,s=String(n?.attributes.unit_of_measurement??""),a=this._resolveAggregate(As(e.preset)),r=`linear-gradient(to bottom, ${Array.from({length:12},(t,n)=>{const s=n/11,a=(100*s).toFixed(1);return`${ta(this,s,i,e,!0)} ${a}%`}).join(", ")})`,o=(t.min+t.max)/2;return V`
      <div class="legend-wrap" aria-hidden="true">
        <div class="legend-labels">
          <span>${ia(t.max,a,s)}</span>
          <span>${ia(o,a,s)}</span>
          <span>${ia(t.min,a,s)}</span>
        </div>
        <div
          class="legend-bar"
          style=${ge({background:r})}
        ></div>
      </div>
    `}_renderCell(t,e,i,n,s,a,r){const o=Es(t.value,n.min,n.max),l=null!==t.value;return V`
      <div
        class=${Kn({cell:!0,empty:!l,"has-value":l})}
        tabindex=${l?0:K}
        style=${ge({background:ta(this,o,e,i,l)})}
        @pointerenter=${e=>this._showPopover(e,t)}
        @pointerleave=${this._hidePopover}
        @focus=${e=>this._showPopover(e,t)}
        @blur=${this._hidePopover}
      >
        ${r&&l?V`<span class="cell-value"
              >${ea(t.value,s,"count"===s?"":a,!0)}</span
            >`:K}
      </div>
    `}_renderTimelineGrid(t,e,i,n,s,a,r,o,l){const c=t.cells[0]??[];return V`
      <div class="heatmap-body" style=${ge({"--heatmap-columns":String(Math.max(1,t.xLabels.length))})}>
        <div class="cells-legend-row">
          <div class="grid-wrap">
            <div class="timeline-grid">
                ${c.map((a,c)=>V`
                    <div class="timeline-slot">
                      ${n?V`<div class="axis x timeline-axis">
                            ${l[c]?t.xLabels[c]:K}
                          </div>`:K}
                      ${this._renderCell(a,i,e,t,r,o,s)}
                    </div>
                  `)}
              </div>
              ${this._renderPopover()}
            </div>
          ${a?this._renderLegend(t):K}
        </div>
      </div>
    `}_renderPopover(){return this._popover?V`
      <div
        class="popover"
        role="tooltip"
        style=${ge({left:`${this._popover.anchorX}px`,top:`${this._popover.anchorY}px`})}
      >
        <div class="popover-label">${this._popover.label}</div>
        <div class="popover-value">${this._popover.value}</div>
        <div class="popover-meta">
          ${this._popover.count} sample${1===this._popover.count?"":"s"}
        </div>
      </div>
    `:K}_renderGrid(t){const e=this._config,i=Zs(e.color_mode),n=!1!==e.show_axis_labels,s=!0===e.show_cell_values,a=!1!==e.show_legend,r=e.entity?this.hass?.states[e.entity]:void 0,o=String(r?.attributes.unit_of_measurement??""),l=this._resolveAggregate(As(e.preset)),c=n?2:1,h=this._xLabelVisible??t.xLabels.map(()=>!0);if(function(t){return 1===t.yKeys.length&&""===t.yKeys[0]}(t))return this._renderTimelineGrid(t,e,i,n,s,a,l,o,h);const d={"--heatmap-columns":String(Math.max(1,t.xLabels.length))},u=`repeat(${t.yLabels.length}, minmax(0, 1fr))`,m=n?`minmax(24px, clamp(32px, 16%, 56px)) repeat(${t.xLabels.length}, minmax(0, 1fr))`:`repeat(${t.xLabels.length}, minmax(0, 1fr))`;return V`
      <div class="heatmap-body" style=${ge(d)}>
        <div class="cells-legend-row">
          <div class="grid-stack">
            ${n?V`
                  <div
                    class="x-axis-row"
                    style=${ge({gridTemplateColumns:m})}
                  >
                    <div class="corner"></div>
                    ${t.xLabels.map((t,e)=>V`
                        <div class="axis x">
                          ${h[e]?t:K}
                        </div>
                      `)}
                  </div>
                `:K}
            <div class="grid-wrap">
              <div
                class="data-grid"
                style=${ge({gridTemplateColumns:m,gridTemplateRows:u})}
              >
                    ${t.cells.flatMap((a,r)=>{const h=r+1;return[n?V`
                            <div
                              class="axis y"
                              style=${ge({gridColumn:"1",gridRow:String(h)})}
                            >
                              ${t.yLabels[r]}
                            </div>
                          `:K,...a.map((n,a)=>{const r=Es(n.value,t.min,t.max),d=null!==n.value;return V`
                          <div
                            class=${Kn({cell:!0,empty:!d,"has-value":d})}
                            tabindex=${d?0:K}
                            style=${ge({gridColumn:String(a+c),gridRow:String(h),background:ta(this,r,i,e,d)})}
                            @pointerenter=${t=>this._showPopover(t,n)}
                            @pointerleave=${this._hidePopover}
                            @focus=${t=>this._showPopover(t,n)}
                            @blur=${this._hidePopover}
                          >
                            ${s&&d?V`<span class="cell-value"
                                  >${ea(n.value,l,"count"===l?"":o,!0)}</span
                                >`:K}
                          </div>
                        `})]})}
                  </div>
                  ${this._renderPopover()}
                </div>
              </div>
          ${a?this._renderLegend(t):K}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||this._config.entity||"Heat Map",i=!1!==this._config.show_current?Bt(t):"";return V`
      <ha-card>
        <div class="stage">
          <div class="header" @click=${this._handleHeaderClick}>
            ${t?V`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:K}
            <ha-tile-info
              .primary=${e}
              .secondary=${i}
            ></ha-tile-info>
          </div>

          ${this._loading?V`<div class="status">Loading…</div>`:this._error?V`<div class="status error">${this._error}</div>`:this._grid?this._renderGrid(this._grid):V`<div class="status">No data</div>`}
        </div>
      </ha-card>
    `}static{this.styles=[Vt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
      container-type: size;
    }

    ha-card {
      height: 100%;
    }

    .stage {
      display: flex;
      flex-direction: column;
      gap: clamp(4px, 1.5cqh, 8px);
      height: 100%;
      min-height: 96px;
      padding: clamp(8px, 2.5cqw, var(--ha-space-3, 12px));
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      cursor: pointer;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
      --mdc-icon-size: var(--nv-icon-size);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
      --ha-tile-info-primary-font-size: var(--nv-title-font-size);
      --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
      --ha-tile-info-secondary-font-size: var(--nv-label-font-size);
      --ha-tile-info-secondary-color: var(--secondary-text-color);
    }

    .status {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      font-size: var(--nv-label-font-size);
    }

    .status.error {
      color: var(--error-color);
    }

    .heatmap-body {
      --heatmap-gap: clamp(1px, 0.7cqw, 3px);
      --heatmap-cell-radius: clamp(2px, 1.2cqw, 6px);
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: visible;
    }

    .grid-stack {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: var(--heatmap-gap);
      min-height: 0;
      min-width: 0;
      overflow: visible;
    }

    .cells-legend-row {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: stretch;
      gap: clamp(6px, 1.5cqw, 10px);
      min-height: 0;
      min-width: 0;
    }

    .grid-wrap {
      position: relative;
      flex: 1;
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .x-axis-row,
    .data-grid {
      display: grid;
      gap: var(--heatmap-gap);
      min-width: 0;
    }

    .x-axis-row {
      overflow: visible;
      position: relative;
      z-index: 2;
      min-height: clamp(10px, 4cqh, 14px);
      margin-bottom: var(--heatmap-gap);
    }

    .data-grid {
      flex: 1;
      height: 100%;
      min-height: 0;
      align-content: stretch;
    }

    .timeline-grid {
      display: grid;
      flex: 1;
      grid-template-columns: repeat(
        auto-fit,
        minmax(clamp(12px, calc(100% / var(--heatmap-columns)), 22px), 1fr)
      );
      grid-auto-rows: minmax(16px, 1fr);
      gap: var(--heatmap-gap);
      min-height: 0;
      align-content: stretch;
    }

    .timeline-slot {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--heatmap-gap);
      min-width: 0;
      min-height: 0;
    }

    .timeline-axis {
      min-height: clamp(10px, 3cqh, 12px);
      width: 100%;
      overflow: visible;
      white-space: nowrap;
    }

    .corner {
      min-width: 0;
    }

    .axis {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(8px, 2.5cqw, 10px);
      color: var(--secondary-text-color);
      padding: 0 2px;
      min-width: 0;
    }

    .axis.x {
      overflow: visible;
      white-space: nowrap;
      text-overflow: clip;
      position: relative;
      z-index: 1;
    }

    .axis.y {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      justify-content: flex-end;
      padding-right: 4px;
    }

    .cell {
      border: none;
      border-radius: var(--heatmap-cell-radius);
      width: 100%;
      height: 100%;
      min-height: 4px;
      min-width: 0;
      padding: 0;
      touch-action: manipulation;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .timeline-grid .cell {
      flex: 1 1 auto;
    }

    .cell.empty {
      background: rgba(0, 0, 0, 0.05);
    }

    .cell.has-value:hover,
    .cell.has-value:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
      z-index: 1;
    }

    .cell-value {
      font-size: clamp(6px, min(2.4cqw, 2.4cqh), 9px);
      line-height: 1;
      font-weight: var(--ha-font-weight-medium, 500);
      color: var(--primary-text-color);
      text-shadow: 0 0 3px var(--card-background-color);
      pointer-events: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
      padding: 0 1px;
    }

    .popover {
      position: absolute;
      z-index: 3;
      pointer-events: none;
      transform: translate(-50%, calc(-100% - 8px));
      padding: 6px 8px;
      border-radius: var(--ha-card-border-radius, 10px);
      background: var(--secondary-background-color, var(--card-background-color));
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
      font-size: var(--nv-label-font-size);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
      max-width: min(220px, 90vw);
      white-space: nowrap;
    }

    .popover-label {
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }

    .popover-value {
      font-size: var(--nv-value-font-size);
      font-weight: var(--ha-font-weight-medium, 500);
    }

    .popover-meta {
      margin-top: 2px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }

    .legend-wrap {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 6px;
      flex-shrink: 0;
      align-self: stretch;
      width: auto;
      height: 100%;
      min-height: 0;
    }

    .legend-labels {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: clamp(8px, 2.4cqw, 10px);
      color: var(--secondary-text-color);
      text-align: right;
      line-height: 1.2;
      padding: 2px 0;
      height: 100%;
      min-width: 0;
    }

    .legend-bar {
      width: clamp(8px, 2cqw, 12px);
      height: 100%;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
    }

    @container (max-height: 110px) {
      .stage {
        gap: 4px;
        padding: 8px;
      }

      .x-axis-row {
        min-height: 10px;
      }

      .timeline-axis,
      .cell-value {
        display: none;
      }
    }

    @container (max-width: 160px) {
      .legend-wrap {
        display: none;
      }
    }

    @container (max-width: 220px) {
      ha-state-icon,
      .cell-value,
      .legend-labels span:nth-child(2) {
        display: none;
      }
    }
  `]}};Xt([St({attribute:!1})],aa.prototype,"hass",void 0),Xt([zt()],aa.prototype,"_config",void 0),Xt([zt()],aa.prototype,"_grid",void 0),Xt([zt()],aa.prototype,"_loading",void 0),Xt([zt()],aa.prototype,"_error",void 0),Xt([zt()],aa.prototype,"_popover",void 0),Xt([zt()],aa.prototype,"_xLabelVisible",void 0),aa=Xt([yt(Rs)],aa),console.info("%c nvision 0.1.1 ","color: var(--primary-color, #03a9f4); font-weight: 700;");