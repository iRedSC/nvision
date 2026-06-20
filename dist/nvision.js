var t,e,i,n,s,a,o,r,l,c,h,d,u,m,p,g,f,_,v,y,b,x,w,$,M,k,C,S,A,z,P,E,T,O,I,L,q,R,N,F,j,B,D,U,H,W,G,V,Y,K,X,Q,Z,J,tt,et,it,nt,st,at,ot,rt,lt,ct=Object.defineProperty,ht=(t,e)=>()=>(t&&(e=t(t=0)),e),dt=(t,e)=>{let i={};for(var n in t)ct(i,n,{get:t[n],enumerable:!0});return e||ct(i,Symbol.toStringTag,{value:"Module"}),i},ut=ht(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=/* @__PURE__ */new WeakMap,s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}},a=t=>new s("string"==typeof t?t:t+"",void 0,i),o=(t,...e)=>new s(1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]),t,i),r=(i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t}),mt=ht(()=>{ut(),({is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:p}=Object),g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x},Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=/* @__PURE__ */new WeakMap,$=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&h(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const a=n?.call(this);s?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n;const a=s.fromAttribute(e,t.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const a=this.constructor;if(!1===n&&(s=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},a){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==s||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=/* @__PURE__ */new Map,$[y("finalized")]=/* @__PURE__ */new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2")});function pt(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}function gt(t,e,i=t,n){if(e===Y)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const a=I(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=gt(t,s._$AS(t,e.values),s,n)),e}var ft,_t,vt,yt,bt,xt,wt=ht(()=>{M=globalThis,k=t=>t,C=M.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,E=`<${P="?"+z}>`,T=document,O=()=>T.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,q=t=>L(t)||"function"==typeof t?.[Symbol.iterator],R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,j=/>/g,B=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,U=/"/g,H=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=W(1),V=W(2),W(3),Y=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),X=/* @__PURE__ */new WeakMap,Q=T.createTreeWalker(T,129),Z=(t,e)=>{const i=t.length-1,n=[];let s,a=2===e?"<svg>":3===e?"<math>":"",o=N;for(let r=0;r<i;r++){const e=t[r];let i,l,c=-1,h=0;for(;h<e.length&&(o.lastIndex=h,l=o.exec(e),null!==l);)h=o.lastIndex,o===N?"!--"===l[1]?o=F:void 0!==l[1]?o=j:void 0!==l[2]?(H.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=B):void 0!==l[3]&&(o=B):o===B?">"===l[0]?(o=s??N,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,i=l[1],o=void 0===l[3]?B:'"'===l[3]?U:D):o===U||o===D?o=B:o===F||o===j?o=N:(o=B,s=void 0);const d=o===B&&t[r+1].startsWith("/>")?" ":"";a+=o===N?e+E:c>=0?(n.push(i),e.slice(0,c)+A+e.slice(c)+z+d):e+z+(-2===c?r:d)}return[pt(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]},J=class t{constructor({strings:e,_$litType$:i},n){let s;this.parts=[];let a=0,o=0;const r=e.length-1,l=this.parts,[c,h]=Z(e,i);if(this.el=t.createElement(c,n),Q.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=h[o++],i=s.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?nt:"?"===n[1]?st:"@"===n[1]?at:it}),s.removeAttribute(t)}else t.startsWith(z)&&(l.push({type:6,index:a}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(z),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),Q.nextNode(),l.push({type:2,index:++a});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(z,t+1));)l.push({type:7,index:a}),t+=z.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}},tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);Q.currentNode=n;let s=Q.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new et(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new ot(s,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(s=Q.nextNode(),a++)}return Q.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},et=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=gt(this,t,e),I(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):q(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(pt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const a of e)s===i.length?i.push(n=new t(this.O(O()),this.O(O()),this,this.options)):n=i[s],n._$AI(a),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},it=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,n){const s=this.strings;let a=!1;if(void 0===s)t=gt(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==Y,a&&(this._$AH=t);else{const n=t;let o,r;for(t=s[0],o=0;o<s.length-1;o++)r=gt(this,n[i+o],e,o),r===Y&&(r=this._$AH[o]),a||=!I(r)||r!==this._$AH[o],r===K?t=K:t!==K&&(t+=(r??"")+s[o+1]),this._$AH[o]=r}a&&!n&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},nt=class extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}},st=class extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}},at=class extends it{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=gt(this,t,e,0)??K)===Y)return;const i=this._$AH,n=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ot=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){gt(this,t)}},rt=M.litHtmlPolyfillSupport,rt?.(J,et),(M.litHtmlVersions??=[]).push("3.3.3"),lt=(t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new et(e.insertBefore(O(),t),t,void 0,i??{})}return s._$AI(t),s}}),$t=ht(()=>{mt(),mt(),wt(),wt(),ft=globalThis,_t=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}},_t._$litElement$=!0,_t.finalized=!0,ft.litElementHydrateSupport?.({LitElement:_t}),vt=ft.litElementPolyfillSupport,vt?.({LitElement:_t}),(ft.litElementVersions??=[]).push("4.2.2")}),Mt=ht(()=>{}),kt=ht(()=>{mt(),wt(),$t(),Mt()}),Ct=ht(()=>{yt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function St(t){return(e,i)=>"object"==typeof i?xt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var At=ht(()=>{mt(),bt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},xt=(t=bt,e,i)=>{const{kind:n,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=/* @__PURE__ */new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)}});function zt(t){return St({...t,state:!0,attribute:!1})}var Pt,Et=ht(()=>{At()}),Tt=ht(()=>{}),Ot=ht(()=>{Pt=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i)});function It(t,e){return(i,n,s)=>{const a=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof n?i:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return Pt(i,n,{get(){let i=t.call(this);return void 0===i&&(i=a(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return Pt(i,n,{get(){return a(this)}})}}var Lt,qt=ht(()=>{Ot()});var Rt=ht(()=>{Ot()}),Nt=ht(()=>{}),Ft=ht(()=>{}),jt=ht(()=>{}),Bt=ht(()=>{Ct(),At(),Et(),Tt(),qt(),Rt(),Nt(),Ft(),jt()});function Dt(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}function Ut(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}kt(),Bt();var Ht=ht(()=>{});Ht();var Wt={tap:"toggle",hold:"more-info",double_tap:"none"},Gt={tap:"tap_action",hold:"hold_action",double_tap:"double_tap_action"};function Vt(t,e,i,n){const s=i[Gt[n]],a=s?.action??Wt[n];if("none"===a)return;const o=s?.entity??i.entity;if(o)switch(a){case"toggle":return void e.callService("homeassistant","toggle",{entity_id:o});case"more-info":return void Ut(t,"hass-more-info",{entityId:o});case"navigate":return void(s?.navigation_path&&Ut(t,"hass-navigate",{navigation_path:s.navigation_path}));case"url":return void(s?.url_path&&window.open(s.url_path));case"call-service":if(s?.service){const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target)}return;default:return}}var Yt=class{constructor(t,e,i){this.getHost=t,this.getHass=e,this.getConfig=i,this._holdTriggered=!1,this.onKeydown=(t,e)=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._dispatch("tap",e))},this.onTap=(t,e)=>{if(this._holdTriggered)return this._holdTriggered=!1,void t.preventDefault();this._dispatch("tap",e)},this.onDoubleTap=(t,e)=>{t.preventDefault(),this._dispatch("double_tap",e)},this.onHoldStart=t=>{window.clearTimeout(this._holdTimer),this._holdTriggered=!1,this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,this._dispatch("hold",t)},500)},this.onHoldEnd=()=>{window.clearTimeout(this._holdTimer)}}bind(t){return{click:e=>this.onTap(e,t),dblclick:e=>this.onDoubleTap(e,t),keydown:e=>this.onKeydown(e,t),pointerdown:()=>this.onHoldStart(t),pointerup:this.onHoldEnd,pointerleave:this.onHoldEnd,pointercancel:this.onHoldEnd}}_dispatch(t,e){const i=this.getHass(),n=this.getConfig();i&&n&&Vt(this.getHost(),i,e?{...n,entity:e}:n,t)}};function Kt(t){if(!t)return"—";const{state:e}=t;if("unavailable"===e||"unknown"===e)return"—";const i=t.attributes?.unit_of_measurement;if("string"==typeof i&&i.length>0){const t=e.trim();return t.endsWith(i)?t:`${t} ${i}`.trim()}return e}var Xt,Qt,Zt=o`
  :host {
    --nv-value-font-size: var(--ha-font-size-l);
    --nv-label-font-size: var(--ha-font-size-s);
    --nv-title-font-size: var(--ha-font-size-m);
    --nv-subtitle-font-size: var(--ha-font-size-s);
    --nv-icon-size: 24px;
    --nv-gauge-max-size: min(100%, 160px);
  }
`,Jt=o`
  ha-tile-info {
    --ha-tile-info-primary-font-size: var(--nv-value-font-size);
    --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
    --ha-tile-info-secondary-font-size: var(--nv-label-font-size);
    --ha-tile-info-secondary-color: var(--secondary-text-color);
  }
`,te=o`
  ha-state-icon {
    --mdc-icon-size: var(--nv-icon-size);
  }
`,ee=ht(()=>{Xt="nvision-blank-card",Qt="nvision-blank-card-editor"});function ie(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}var ne,se=ht(()=>{}),ae=ht(()=>{kt(),se(),ne=class extends _t{},ie([St({attribute:!1})],ne.prototype,"hass",void 0)});function oe(t="more-info"){return{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:t}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}]}}function re(t,e){return"interactions"===e.name?"Interactions":"hold_action"===e.name||"double_tap_action"===e.name?`${t.localize(`ui.panel.lovelace.editor.card.generic.${e.name}`)} (${t.localize("ui.panel.lovelace.editor.card.config.optional")})`:void 0}var le,ce,he=ht(()=>{}),de=/* @__PURE__ */dt({NvisionBlankCardEditor:()=>ce}),ue=ht(()=>{kt(),Bt(),Ht(),ae(),he(),ee(),se(),le=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},oe()],ce=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config=t}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${le}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],ce.prototype,"_config",void 0),ce=ie([yt(Qt)],ce)});kt(),Bt(),ee(),se(),Dt({type:Xt,name:"Nvision Blank",description:"Neutral starting point for nvision cards"});var me=class extends _t{constructor(...t){super(...t),this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(ue(),de)),document.createElement(Qt)}static getStubConfig(t,e,i){const n=e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Xt}`,entity:n}}setConfig(t){this._config={tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Kt(t);return G`
      <ha-card>
        <div
          class="content"
          role="button"
          tabindex="0"
          @click=${this._actions.bind().click}
          @dblclick=${this._actions.bind().dblclick}
          @keydown=${this._actions.bind().keydown}
          @pointerdown=${this._actions.bind().pointerdown}
          @pointerup=${this._actions.bind().pointerup}
          @pointerleave=${this._actions.bind().pointerleave}
          @pointercancel=${this._actions.bind().pointercancel}
        >
          ${t?G`<ha-state-icon
                .hass=${this.hass}
                .stateObj=${t}
              ></ha-state-icon>`:K}
          <ha-tile-info
            .primary=${e}
            .secondary=${i}
          ></ha-tile-info>
        </div>
      </ha-card>
    `}static{this.styles=[Zt,te,o`
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
      cursor: pointer;
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
  `]}};ie([St({attribute:!1})],me.prototype,"hass",void 0),ie([zt()],me.prototype,"_config",void 0),me=ie([yt(Xt)],me);var pe=1,ge=t=>(...e)=>({_$litDirective$:t,values:e}),fe=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};wt();var _e,ve,ye,be,xe=ge(class extends fe{constructor(t){if(super(t),t.type!==pe||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const n=t[i];return null==n?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const n of this.ft)e[n]??(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in e){const t=e[n];if(null!=t){this.ft.add(n);const e="string"==typeof t&&t.endsWith(" !important");n.includes("-")||e?i.setProperty(n,e?t.slice(0,-11):t,e?"important":""):i[n]=t}}return Y}});function we(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function $e(t,e){if(!t)return e;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}return e}function Me(t,e,i,n){return $e(t,we(e,i,n))}function ke(t){_e??=document.createElement("canvas"),_e.width=1,_e.height=1;const e=_e.getContext("2d");if(!e)return[41,182,246];e.fillStyle="#000000",e.fillStyle=t,e.fillRect(0,0,1,1);const[i,n,s]=e.getImageData(0,0,1,1).data;return[i,n,s]}function Ce([t,e,i]){return`rgb(${t}, ${e}, ${i})`}function Se(t,e,i){return[Math.round(t[0]+(e[0]-t[0])*i),Math.round(t[1]+(e[1]-t[1])*i),Math.round(t[2]+(e[2]-t[2])*i)]}function Ae(t,e){return e>=0?Se(t,[255,255,255],e):Se(t,[0,0,0],-e)}function ze(t,e){const i=ke(we(t,"--success-color","#4caf50")),n=ke(we(t,"--warning-color","#ff9800")),s=ke(we(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return Ce(a<=.5?Se(i,n,2*a):Se(n,s,2*(a-.5)))}var Pe,Ee,Te=ht(()=>{ve="nvision-activity-card",ye="nvision-activity-card-editor",be={still:"idle",unknown:"idle",on_foot:"on_foot",walking:"walking",running:"running",on_bicycle:"bicycle",in_vehicle:"vehicle",automotive:"vehicle",tilting:"tilting"}}),Oe=/* @__PURE__ */dt({NvisionActivityCardEditor:()=>Ee}),Ie=ht(()=>{kt(),Bt(),Ht(),ae(),he(),Te(),se(),Pe=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"color",selector:{color_rgb:{}}},{name:"speed",required:!0,default:1,selector:{number:{min:.25,max:3,step:.05}}},oe()],Ee=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"color"===t.name?"Figure color":"speed"===t.name?"Animation speed":"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={speed:1,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Pe}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],Ee.prototype,"_config",void 0),Ee=ie([yt(ye)],Ee)});function Le(t,e,i){const n=.7*i;return V`
    <circle class="rim" cx=${t} cy=${e} r=${i} />
    <g class="spokes">
      <line x1=${t-i} y1=${e} x2=${t+i} y2=${e} />
      <line x1=${t} y1=${e-i} x2=${t} y2=${e+i} />
      <line x1=${t-n} y1=${e-n} x2=${t+n} y2=${e+n} />
      <line x1=${t-n} y1=${e+n} x2=${t+n} y2=${e-n} />
    </g>
    <circle class="hub" cx=${t} cy=${e} r="3" />
  `}kt(),Bt(),Te(),se(),Dt({type:ve,name:"Nvision Activity",description:"Animated figure that reacts to detected activity (walking, running, cycling, driving…)"});var qe,Re,Ne,Fe,je=class extends _t{constructor(...t){super(...t),this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(Ie(),Oe)),document.createElement(ye)}static getStubConfig(t,e,i){const n=e.find(t=>t.toLowerCase().includes("activity"))||e.find(t=>t.startsWith("sensor."))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${ve}`,entity:n}}setConfig(t){this._config={speed:1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:4}}_renderScene(t){return"bicycle"===t?this._renderCyclist():"vehicle"===t?this._renderCar():this._renderPerson()}_renderPerson(){return V`
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
    `}_renderCyclist(){return V`
      <svg class="person" viewBox="0 0 160 160">
        <g class="ride">
          ${Le(40,120,24)} ${Le(120,120,24)}
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
    `}_renderCar(){return V`
      <svg class="person" viewBox="0 0 160 160">
        <g class="ride">
          <g class="car-group" transform="translate(80 98) scale(1.22) translate(-80 -98)">
            ${Le(50,126,18)} ${Le(110,126,18)}
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
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,i=(n=e?.state,n?be[n.toLowerCase().trim()]??"idle":"idle");var n;const s=function(t){return t&&"unknown"!==t&&"unavailable"!==t?t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):"Unknown"}(e?.state),a=this._config.name||e?.attributes.friendly_name||"Activity",o=function(t){if(t)return $e(t,"")||void 0}(this._config.color),r=this._config.speed??1;return G`
      <ha-card
        style=${xe({...o?{"--figure-color":o}:{},"--anim-speed":String(r)})}
      >
        <div
          class="body"
          role="button"
          tabindex="0"
          @click=${this._actions.bind().click}
          @dblclick=${this._actions.bind().dblclick}
          @keydown=${this._actions.bind().keydown}
          @pointerdown=${this._actions.bind().pointerdown}
          @pointerup=${this._actions.bind().pointerup}
          @pointerleave=${this._actions.bind().pointerleave}
          @pointercancel=${this._actions.bind().pointercancel}
        >
          <div class="stage ${i}">${this._renderScene(i)}</div>
          <p class="title">${a}</p>
          <p class="subtitle">${s}</p>
        </div>
      </ha-card>
    `}static{this.styles=[Zt,o`
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
      cursor: pointer;
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
  `]}};function Be(t){const e=Math.min(1,Math.max(0,t));return e<=0?0:Ne+e*(1-Ne)}function De(t,e){if(t){if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}}return Qe(e,"--warning-color","")||Qe(e,"--state-active-color","")||Qe(e,"--primary-color","#ffb300")}function Ue(t,e){const i=Be(t);return Math.max(1.5,e*(.008+i*i*.26))}function He(t,e){return ti(void 0===t?0:Je(t,e.min??0,e.max??3e3),e.effects_min??0,e.effects_max??1)}function We(t){return Math.min(1,Math.pow(Math.min(1,Math.max(0,t)),.5)/.75)}function Ge(t,e,i){return i<=e||t<=i?0:Math.min(2,(t-i)/(i-e))}function Ve(t){return Qe(t,"--error-color","#f44336")}function Ye(t,e,i,n){const s=Math.cos(n),a=Math.sin(n);let o=1/0;return s>.001?o=Math.min(o,(e-t.x)/s):s<-.001&&(o=Math.min(o,-t.x/s)),a>.001?o=Math.min(o,(i-t.y)/a):a<-.001&&(o=Math.min(o,-t.y/a)),Number.isFinite(o)?Math.max(0,o):0}function Ke(t,e){const i=Math.min(1,t),n=1+1.6*Be(i);return Ue(i,e)+3*n+n}function Xe(t,e,i,n,s,a,o){if(s<=0||i<=0||n<=0)return;const r=Math.min(1,s/2),l=Math.min(6,Math.max(1,Math.round(.35+3.5*r))),c=.2+.8*r,h=1.2+1.4*r,d=.48+.28*r,u=Math.min(1,.22+.58*r);for(let m=0;m<l;m+=1){const s=ii(Math.floor(a*h)+17.3*m)*Math.PI*2,r=Ye(e,i,n,s),l=Ke(u,r),p=Math.max(0,r-l);if(p<6)continue;const g=p*c*(.5+.5*ii(a+3.7*m));t.push({from:e,to:{x:e.x+Math.cos(s)*g,y:e.y+Math.sin(s)*g},intensity:u,alphaScale:d,wiggleScale:.5,color:o})}}function Qe(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function Ze(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Je(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}function ti(t,e=0,i=1){const n=Math.min(e,i);return n+Math.min(1,Math.max(0,t))*(Math.max(e,i)-n)}function ei(t,e,i="center"){if(!t)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect();if(s.width<=0||s.height<=0)return;let a=s.left+s.width/2-n.left,o=s.top+s.height/2-n.top;return"top"===i?o=s.top-n.top:"bottom"===i?o=s.bottom-n.top:"left"===i?a=s.left-n.left:"right"===i&&(a=s.right-n.left),{x:a,y:o}}function ii(t){const e=43758.5453*Math.sin(127.1*t+311.7*t);return e-Math.floor(e)}function ni(t,e,i,n,s,a,o=1,r=1){const l=Math.min(1,n),c=Be(l),h=Math.hypot(i.x-e.x,i.y-e.y);h<4||function(t,e,i,n,s){if(!(e.length<2)){t.save(),t.lineCap="round",t.lineJoin="round",t.strokeStyle=i,t.shadowColor=i,t.shadowBlur=3*s,t.globalAlpha=n,t.lineWidth=s,t.beginPath(),t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i+=1)t.lineTo(e[i].x,e[i].y);t.stroke(),t.restore()}}(t,function(t,e,i,n,s){const a=[t],o=e.x-t.x,r=e.y-t.y,l=Math.hypot(o,r)||1,c=-r/l,h=o/l,d=o/l,u=r/l;for(let m=1;m<i;m+=1){const e=m/i,l=Math.sin(e*Math.PI),p=2*ii(s+5.17*m)-1,g=2*ii(s+9.43*m)-1,f=n*l;a.push({x:t.x+o*e+c*f*p+d*f*.2*g,y:t.y+r*e+h*f*p+u*f*.2*g})}return a.push(e),a}(e,i,Math.min(14,Math.max(5,Math.round(h/14))),Ue(l,h)*r,s),a,(.5+.42*c)*o,1+1.6*c)}function si(t,e,i,n,s,a,o=1,r=1){n<=0||Math.hypot(i.x-e.x,i.y-e.y)<4||ni(t,e,i,n,Math.floor(3*s),a,o,r)}ie([St({attribute:!1})],je.prototype,"hass",void 0),ie([zt()],je.prototype,"_config",void 0),je=ie([yt(ve)],je);var ai,oi,ri,li,ci,hi=ht(()=>{qe=3e3,Re=.12,Ne=.18,Fe=class{constructor(t,e,i,n){this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._host=t,this._getArcs=e,this._getColor=i,this._onFrame=n}attach(t){this._canvas!==t&&(this.detach(),this._canvas=t,this._ctx=t.getContext("2d")??void 0),this._ctx&&this._canvas&&(this._resizeObserver||(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t),this._resizeObserver.observe(t.parentElement??this._host),this._resizeCanvas()),this._animating||(this._lastFrame=0,this._startAnimation()))}detach(){cancelAnimationFrame(this._frameId),this._animating=!1,this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._canvas=void 0,this._ctx=void 0}_resizeCanvas(){const t=this._canvas,e=this._ctx;if(!t||!e)return;const i=t.getBoundingClientRect(),n=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(i.width*n)),t.height=Math.max(1,Math.floor(i.height*n)),e.setTransform(n,0,0,n,0,0)}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this._animating||!this._ctx||!this._canvas?.isConnected)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._onFrame?.(i),this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;const a=this._getArcs(this._phase),o=a.reduce((t,e)=>Math.max(t,Math.min(1,e.intensity)),0);this._phase+=t*(.32+.38*o),i.clearRect(0,0,n,s);const r=this._getColor();for(const l of a)si(i,l.from,l.to,l.intensity,this._phase,l.color??r,l.alphaScale??1,l.wiggleScale??1)}}}),di=ht(()=>{ai="nvision-liquid-card",oi="nvision-liquid-card-editor",ri="bubbles"}),ui=/* @__PURE__ */dt({NvisionLiquidCardEditor:()=>ci}),mi=ht(()=>{kt(),Bt(),Ht(),ae(),he(),di(),se(),li=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"liquid_style",required:!0,default:ri,selector:{select:{options:[{value:"none",label:"None"},{value:"bubbles",label:"Bubbles"},{value:"electricity",label:"Electricity"}],mode:"dropdown"}}},{name:"level_color",selector:{boolean:{}}},{name:"level_color_invert",selector:{boolean:{}}},{name:"color",selector:{color_rgb:{}}},oe()],ci=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Liquid color":"level_color"===t.name?"Level-based color":"level_color_invert"===t.name?"Invert level colors":"liquid_style"===t.name?"Liquid style":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,liquid_style:ri,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${li}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],ci.prototype,"_config",void 0),ci=ie([yt(oi)],ci)});kt(),Bt(),hi(),di(),se(),Dt({type:ai,name:"Nvision Liquid",description:"Animated liquid background with sensor state in the foreground"});var pi=.92,gi=4,fi=.022,_i=2.4,vi=2.5,yi=.034,bi=1.7,xi=1.5,wi=.015,$i=3.1;function Mi(t,e,i,n,s,a,o){const r=t=>{const e=43758.5453*Math.sin(127.1*(o+t)+311.7*(o+t));return e-Math.floor(e)},l=Math.floor(3*r(0)),c=.08+.82*r(1);if(0===l){const o=Ci(0,t,e,i,n,s,a);return{x:0,y:o+(e-o)*c}}if(1===l){const o=Ci(t,t,e,i,n,s,a);return{x:t,y:o+(e-o)*c}}const h=r(3)*t;return{x:h,y:Ci(h,t,e,i,n,s,a)}}function ki(t,e,i){if(void 0===t||"unavailable"===t||"unknown"===t)return.62;const n=Number(t);return Number.isFinite(n)?Math.min(pi,Math.max(0,function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(n,e,i))):.62}function Ci(t,e,i,n,s,a,o){return i*(1-n)+1.2*Math.sin(.65*s)*a+(t-e/2)*o.x*i*.42*.08+Math.sin(t*fi+s*_i)*gi*a+Math.sin(t*yi+s*bi+1.2)*vi*a+Math.sin(t*wi-s*$i+2.4)*xi*a}var Si,Ai,zi,Pi,Ei,Ti,Oi,Ii,Li,qi,Ri,Ni,Fi,ji=class extends _t{constructor(...t){super(...t),this._actions=new Yt(()=>this,()=>this.hass,()=>this._config),this._frameId=0,this._phase=0,this._lastFrame=0,this._animating=!1,this._bubbles=[],this._lightningPhase=0,this._gravity={x:0,y:1},this._orientationBeta=90,this._orientationGamma=0,this._spawnTimer=0,this._agitation=0,this._mouseAgitation=0,this._mouseAgitationTarget=0,this._scrollElements=[],this._lastTouchY=0,this._lastMouseX=0,this._lastMouseY=0,this._mouseOver=!1,this._displayFill=0,this._targetFill=0,this._onWheel=t=>{this._boostAgitation(Math.min(.45,.0018*Math.abs(t.deltaY)))},this._onScroll=()=>{this._boostAgitation(.34)},this._onTouchMove=t=>{if(!t.touches.length)return;const e=t.touches[0].clientY;this._lastTouchY&&this._boostAgitation(Math.min(.3,Math.abs(e-this._lastTouchY)/100)),this._lastTouchY=e},this._onTouchEnd=()=>{this._lastTouchY=0},this._onPointerMove=t=>{const e=this.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.clientX,n=t.clientY;if(i>=e.left&&i<=e.right&&n>=e.top&&n<=e.bottom){if(this._mouseOver){const t=Math.hypot(i-this._lastMouseX,n-this._lastMouseY);this._mouseAgitationTarget=Math.min(1,this._mouseAgitationTarget+Math.min(.2,.004*t))}this._lastMouseX=i,this._lastMouseY=n,this._mouseOver=!0}else this._mouseOver=!1},this._onDeviceOrientation=t=>{null!=t.beta&&(this._orientationBeta=t.beta),null!=t.gamma&&(this._orientationGamma=t.gamma)}}static async getConfigElement(){return await Promise.resolve().then(()=>(mi(),ui)),document.createElement(oi)}static getStubConfig(t,e,i){const n=e.find(e=>"%"===t.states[e]?.attributes?.unit_of_measurement)||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${ai}`,entity:n,min:0,max:100}}_boostAgitation(t){this._agitation=Math.min(1,this._agitation+t)}_ampScale(t){return this._agitation=Math.max(0,this._agitation-.016*t),this._mouseAgitation+=.055*(this._mouseAgitationTarget-this._mouseAgitation)*t,this._mouseAgitationTarget=Math.max(0,this._mouseAgitationTarget-.02*t),.3+Math.min(1,this._agitation+this._mouseAgitation)*(2.2-.3)}_bindScroll(){window.addEventListener("wheel",this._onWheel,{passive:!0}),window.addEventListener("touchmove",this._onTouchMove,{passive:!0}),window.addEventListener("touchend",this._onTouchEnd,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove,{passive:!0}),window.addEventListener("deviceorientation",this._onDeviceOrientation,{passive:!0}),this._bindScrollParents()}_unbindScroll(){window.removeEventListener("wheel",this._onWheel),window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("deviceorientation",this._onDeviceOrientation);for(const t of this._scrollElements)t.removeEventListener("scroll",this._onScroll);this._scrollElements=[]}_bindScrollParents(){for(const e of this._scrollElements)e.removeEventListener("scroll",this._onScroll);this._scrollElements=[];let t=this;for(;t;){if(t===document.documentElement||t===document.body){t=t.parentElement;continue}const{overflowY:e,overflow:i}=getComputedStyle(t);(/(auto|scroll)/.test(e)||/(auto|scroll)/.test(i))&&(t.addEventListener("scroll",this._onScroll,{passive:!0}),this._scrollElements.push(t)),t=t.parentElement}}setConfig(t){this._config={min:0,max:100,liquid_style:ri,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}_liquidStyle(){return this._config?.liquid_style??"bubbles"}_tickGravity(){const t=function(t,e){const i=e*Math.PI/180,n=t*Math.PI/180,s=Math.sin(i),a=Math.sin(n),o=Math.hypot(s,a);return o<.05?{x:0,y:1}:{x:s/o,y:a/o}}(this._orientationBeta,this._orientationGamma);return this._gravity=function(t,e){return{x:t.x+.1*(e.x-t.x),y:t.y+.1*(e.y-t.y)}}(this._gravity,t),this._gravity}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._bindScroll(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._unbindScroll(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}updated(t){if(t.has("_config")){const t=this._config?.entity;t!==this._trackedEntity&&(this._trackedEntity=t,this._trackedState=void 0,this._displayFill=0,this._bubbles=[],this._lightningPhase=0,this._spawnTimer=0)}if(t.has("hass")){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0;if(e!==this._trackedState){this._trackedState=e;const{min:t,max:i}=this._range();this._targetFill=ki(e,t,i)}}this._ensureCanvas(),this._bindScrollParents()}_syncFillTarget(){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0,{min:i,max:n}=this._range(),s=ki(e,i,n);if(void 0===this._trackedState)return this._displayFill=0,this._targetFill=s,this._trackedState=e,void(this._trackedEntity=t);e!==this._trackedState&&(this._trackedState=e,this._targetFill=s)}_tickFill(t){const e=this._targetFill-this._displayFill;if(Math.abs(e)<.002)return this._displayFill=this._targetFill,this._displayFill;const i=Math.sign(e)*Math.min(Math.abs(e),(e>0?.026:.036)*t);return this._displayFill=Math.min(pi,Math.max(0,this._displayFill+i)),this._boostAgitation(Math.min(.05,1.8*Math.abs(i))),this._displayFill}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._phase+=.045*i,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_drawLiquidPath(t,e,i,n,s,a,o){t.beginPath(),t.moveTo(0,i);for(let r=0;r<=e;r+=2)t.lineTo(r,Ci(r,e,i,n,s,a,o));t.lineTo(e,i),t.closePath()}_spawnBubble(t,e){if(this._bubbles.length>=14)return;const i=12+Math.random()*(t-24),n=e+20*Math.random();this._bubbles.push({x:i,y:n,radius:2+4*Math.random(),speed:.6+.8*Math.random(),wobble:Math.random()*Math.PI*2,wobbleSpeed:.04+.04*Math.random(),popProgress:0})}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncFillTarget();const a=this._tickFill(t),o=this._ampScale(t),r=this._tickGravity(),l=this._liquidStyle(),c=a/pi,h=this._config?.level_color?ze(this,this._config.level_color_invert?1-c:c):Me(this._config?.color,this,"--info-color","#29b6f6"),d=we(this,"--card-background-color","#1c1c1c"),u=function(t,e){const i=ke(t),n=ke(e);return{surface:Ce(Ae(i,.3)),mid:Ce(i),deep:Ce(Ae(i,-.38)),glow:Ce(Se(i,n,.72))}}(h,d);i.clearRect(0,0,n,s);const m=i.createLinearGradient(0,0,0,s);m.addColorStop(0,d),m.addColorStop(.55,d),m.addColorStop(1,u.glow),i.fillStyle=m,i.globalAlpha=.14,i.fillRect(0,0,n,s),i.globalAlpha=1,this._drawLiquidPath(i,n,s,a,this._phase,o,r);const p=s*(1-a),g=i.createLinearGradient(0,p,0,s);g.addColorStop(0,u.surface),g.addColorStop(.35,u.mid),g.addColorStop(1,u.deep),i.fillStyle=g,i.globalAlpha=.5,i.fill(),i.globalAlpha=1,i.beginPath();for(let f=0;f<=n;f+=2){const t=Ci(f,n,s,a,this._phase,o,r);0===f?i.moveTo(f,t):i.lineTo(f,t)}if(i.strokeStyle=u.surface,i.globalAlpha=.35,i.lineWidth=1.5,i.stroke(),i.globalAlpha=1,"bubbles"===l){this._spawnTimer+=t,this._spawnTimer>28&&a>.04&&(this._spawnTimer=0,this._spawnBubble(n,s)),this._bubbles=this._bubbles.filter(e=>{if(e.popProgress>0)return e.popProgress+=.06*t,e.popProgress<1;e.wobble+=e.wobbleSpeed*t,e.x-=r.x*e.speed*t,e.y-=r.y*e.speed*t,e.x+=.15*Math.sin(e.wobble);const i=Ci(e.x,n,s,a,this._phase,o,r);return e.y-e.radius<=i&&(e.popProgress=.01),!0});for(const t of this._bubbles){if(t.popProgress>0){const e=t.popProgress,n=t.radius*(1+2.2*e);i.beginPath(),i.arc(t.x,t.y,n,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.5*(1-e),i.lineWidth=1.2,i.stroke(),i.globalAlpha=1;continue}i.beginPath(),i.arc(t.x,t.y,t.radius,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.55,i.lineWidth=1.1,i.stroke(),i.globalAlpha=1}}else this._bubbles=[];if("electricity"===l&&a>.04){this._lightningPhase+=t*(.1+.2*a);const e=function(t,e){return{x:t/2,y:e}}(n,s),l=Math.min(3,1+Math.floor(2*a)),c=Math.floor(.65*this._lightningPhase),h=.6*a;for(let t=0;t<l;t+=1)si(i,e,Mi(n,s,a,this._phase,o,r,c+17*t),h,this._lightningPhase+.85*t,u.mid)}else"electricity"!==l&&(this._lightningPhase=0)}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Kt(t);return G`
      <ha-card>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div
            class="content"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            ${t?G`<ha-state-icon
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
    `}static{this.styles=[Zt,Jt,te,o`
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
      cursor: pointer;
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
  `]}};ie([St({attribute:!1})],ji.prototype,"hass",void 0),ie([zt()],ji.prototype,"_config",void 0),ie([It("canvas")],ji.prototype,"_canvas",void 0),ji=ie([yt(ai)],ji);var Bi=ht(()=>{Si="nvision-waveform-card",Ai="nvision-waveform-card-editor",zi=.6,Pi=.28,Ei=.45,Ti="line",Oi="balanced",Ii="surge",Li={wave:"surge",echo:"spawn",pulse:"surge",stream:"jet",spectrum:"surge",cascade:"spawn"},qi={line:"line",circle:"ring",grid:"field"},Ri=[{value:"line",label:"Line"},{value:"ring",label:"Ring"},{value:"field",label:"Field"}],Ni=[{value:"compact",label:"Compact"},{value:"balanced",label:"Balanced"},{value:"expansive",label:"Expansive"},{value:"dense",label:"Dense"},{value:"packed",label:"Packed"}],Fi=[{value:"surge",label:"Surge"},{value:"spawn",label:"Spawn"},{value:"jet",label:"Jet stream"}]});function Di(t){return t-Math.floor(t)}Bi();var Ui={compact:{dotScale:.88,span:.94,phaseSpeed:.92},balanced:{dotScale:1,span:.98,phaseSpeed:1},expansive:{dotScale:1.08,span:1,phaseSpeed:1.08},dense:{dotScale:.94,span:1,phaseSpeed:1.1},packed:{dotScale:.86,span:1,phaseSpeed:1.14}},Hi={line:{compact:16,balanced:24,expansive:32,dense:40,packed:48},ring:{compact:18,balanced:24,expansive:32,dense:40,packed:48},field:{compact:16,balanced:25,expansive:36,dense:49,packed:64}};function Wi(t){return t*t*(3-2*t)}function Gi(t,e){const i=Math.max(.08,t),n=Wi(i);return e*(.28+.16*(1-n)+.22*n+.26*Math.max(0,i-.5)**2)}function Vi(t){if("ring"===t.layout){const e=t.width/2,i=t.height/2,n=Math.atan2(t.baseY-i,t.baseX-e);return{primary:{x:-Math.sin(n),y:Math.cos(n)},perp:{x:Math.cos(n),y:Math.sin(n)}}}return{primary:{x:0,y:1},perp:{x:1,y:0}}}function Yi(t,e){const{x:i,y:n}=function(t,e,i,n){const{dot:s,index:a,phase:o,intensity:r,variant:l,height:c}=t;if(r<n)return{x:e,y:i};const h=Vi(t),d=(o+1.4*l)*(1+.18*r),u=a+.47*l,m=Math.max(.001,1-n),p=((r-n)/m)**2;let g=Math.sin(d*(3.1+2.4*s.seed)+.85*u)*c*p*.12;if(r>n+.15*m){const t=p**1.5;g+=Math.cos(7.4*d+1.7*u+s.phase+l)*c*t*.18,g+=Math.sin(8.2*d+2.1*u)*c*t*.1}return{x:e+h.perp.x*g,y:i+h.perp.y*g}}(t,e.x,e.y,t.chaosAt);return{...e,x:i,y:n}}function Ki(t){const e=function(t){return t.layout?t.layout:t.shape?qi[t.shape]??"line":Ti}(t),i=function(t){if(t.size)return t.size;const e=t.dot_count;if(void 0!==e){if(e<=18)return"compact";if(e>=48)return"packed";if(e>=40)return"dense";if(e>=30)return"expansive"}return Oi}(t),n=function(t){return t.motion?Li[t.motion]??t.motion:t.overlap_dots?"spawn":Ii}(t),s=Ui[i];return{layout:e,size:i,motion:n,dotCount:Hi[e][i],dotScale:s.dotScale,span:s.span,phaseSpeed:s.phaseSpeed}}function Xi(t){return Array.from({length:t},(e,i)=>{const n=.618033988749895*i%1;return{phase:i/t*Math.PI*2,seed:n,sign:n>.5?1:-1}})}function Qi(t){return.5*t}var Zi={spawn:function(t){const{dot:e,phase:i,intensity:n,height:s,width:a,baseX:o,baseY:r,layout:l}=t,c=Wi(n),h=3.6-1.4*c,d=Di(i*(.05+c*c*1.15)*(.06+.22*c)+e.seed*h),u=Math.sin(d*Math.PI),m=Gi(n,s)*d*(.85+.45*c),p=e.sign;if("ring"===l){const e=a/2,i=s/2,n=Math.atan2(r-i,o-e),l=.06*Math.min(a,s),h=Math.hypot(o-e,r-i),m=h*(.18+.55*c),g=Math.max(l,h+p*d*m);return Yi(t,{x:e+Math.cos(n)*g,y:i+Math.sin(n)*g,radiusMul:.44+u*(.56+.58*c+c*c*.42),alphaMul:u*(.32+.58*c)})}const g=Vi(t),f=m*p*(.45+.35*e.seed);return Yi(t,{x:o+g.primary.x*f,y:r+g.primary.y*f,radiusMul:.44+u*(.56+.58*c+c*c*.42),alphaMul:u*(.32+.58*c)})},jet:function(t){const{dot:e,index:i,count:n,phase:s,intensity:a,height:o,width:r,baseX:l,baseY:c,layout:h}=t,d=Wi(a),u=.16+.78*d,m=u*(.4+1.35*e.seed),p=Gi(a,o)*(.035+.1*d),g=Math.sin(s*(1.6+.8*e.seed)+9.4*e.seed)*p,f=m/(1.75*u),_=.52+.36*f+.38*d+d*d*.48;if("ring"===h){const a=r/2,l=o/2,c=.06*Math.min(r,o),h=Math.min(r,o)/2-c,u=i/n*Math.PI*2-Math.PI/2+.35*e.seed,p=Di(s*(.05+d*d*.24)*m+2.6*e.seed),g=h+p*(h*(.2+.75*d)),v=1-p;return Yi(t,{x:a+Math.cos(u)*g,y:l+Math.sin(u)*g,radiusMul:_*(.88+.22*(1-p)),alphaMul:(.38+.18*f+.32*d)*v})}const v=.12*r,y=c+g;return Yi(t,{x:Di(s*m*.32+2.1*e.seed+.04*i)*(r+2*v)-v,y:y,radiusMul:_,alphaMul:.42+.2*f+.4*d})},surge:function(t){const{index:e,count:i,phase:n,intensity:s,height:a,baseX:o,baseY:r,layout:l}=t,c=Wi(s),h=Gi(s,a),d=function(t){return.42+.68*Wi(Math.max(.08,t))}(s),u=e%2==0,m=n*d-e/Math.max(1,i-1)*Math.PI*1.6,p=.5*Math.sin(m)+.5,g=h*(.25+p*(.55+.65*c)),f=.06*a,_=.5+p*(.34+.52*c+c*c*.45);if("ring"===l){const n=t.width/2,s=t.height/2,a=e/i*Math.PI*2-Math.PI/2,l=u?-1:1,h=Math.hypot(o-n,r-s)+l*g*.85;return Yi(t,{x:n+Math.cos(a)*h,y:s+Math.sin(a)*h,radiusMul:_,alphaMul:.4+p*(.28+.48*c)})}return Yi(t,{x:o,y:u?f+g:a-f-g,radiusMul:_,alphaMul:.38+p*(.3+.5*c)})}};function Ji(t,e,i,n,s,a,o,r,l,c){const h=Math.min(o,r),d=function(t,e,i,n,s,a){const o=Math.min(n,s),r=.04*o;switch(t){case"ring":{const t=n/2,r=s/2,l=.06*o,c=(Math.min(n,s)/2-l)*(.92+.06*a),h=(e+.5)/i*Math.PI*2-Math.PI/2;return{x:t+Math.cos(h)*c,y:r+Math.sin(h)*c}}case"field":{const t=Math.ceil(Math.sqrt(i)),r=Math.ceil(i/t),l=.04*o,c=.04*o,h=.028*o*a,d=(n-2*l-h*(t-1))/t,u=(s-2*c-h*(r-1))/r;return{x:l+e%t*(d+h)+d/2,y:c+Math.floor(e/t)*(u+h)+u/2}}default:{const t=n-r,o=(t-r)*a;return{x:(r+t-o)/2+(i<=1?.5:e/(i-1))*o,y:Qi(s)}}}}(t.layout,i,n,o,r,t.span),u={dot:e,index:i,count:n,phase:s,intensity:a,chaosAt:c,scale:h,baseX:d.x,baseY:d.y,width:o,height:r,variant:l,layout:t.layout};return Zi[t.motion](u)}function tn(t,e,i,n){const s=.04*i,a=.58*i;let o=1;t<a&&(o=t<=s?.06:.06+.94*Wi((t-s)/(a-s)));const r=.5*n,l=.42*n,c=Math.abs(e-r);let h=1;return t<a&&c<l&&(h=.08+.92*Wi(c/l)),o*h}function en(t,e,i,n,s,a){if("ring"===a)return 1;const o=Math.max(4,.06*s),r=Math.max(3,.04*s),l=Math.min(1,Math.max(0,t/o)),c=Math.min(1,Math.max(0,(i-t)/o)),h=Math.min(1,Math.max(0,e/r)),d=Math.min(1,Math.max(0,(n-e)/r));return"line"===a?Math.min(l,c):Math.min(l,c,h,d)}var nn,sn,an=/* @__PURE__ */dt({NvisionWaveformCardEditor:()=>sn}),on=ht(()=>{kt(),Bt(),Ht(),ae(),he(),Bi(),se(),nn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{type:"grid",name:"",schema:[{name:"layout",required:!0,default:Ti,selector:{select:{options:[...Ri],mode:"dropdown"}}},{name:"size",required:!0,default:Oi,selector:{select:{options:[...Ni],mode:"dropdown"}}}]},{name:"motion",required:!0,default:Ii,selector:{select:{options:[...Fi],mode:"dropdown"}}},{name:"shake_speed",required:!0,default:Ei,selector:{number:{min:.15,max:1.5,step:.05}}},oe()],sn=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Waveform color":"layout"===t.name?"Layout":"size"===t.name?"Size":"motion"===t.name?"Motion":"shake_speed"===t.name?"Shake speed":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,layout:Ti,size:Oi,motion:Ii,shake_speed:Ei,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${nn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],sn.prototype,"_config",void 0),sn=ie([yt(Ai)],sn)});kt(),Bt(),Bi(),se(),Dt({type:Si,name:"Nvision Waveform",description:"Oscilloscope dot patterns driven by a numeric sensor"});function rn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}var ln,cn,hn=class extends _t{constructor(...t){super(...t),this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._shakePhase=0,this._displayIntensity=0,this._targetIntensity=0,this._dots=Xi(24),this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(on(),an)),document.createElement(Ai)}static getStubConfig(t,e,i){const n=e.find(e=>void 0!==rn(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Si}`,entity:n,min:0,max:100,layout:Ti,size:Oi,motion:Ii}}setConfig(t){this._config={min:0,max:100,layout:Ti,size:Oi,motion:Ii,shake_at:zi,shake_peak:Pi,shake_speed:Ei,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t},this._syncDots()}_presets(){return Ki(this._config??{})}_syncDots(){const{dotCount:t}=this._presets();this._dots.length!==t&&(this._dots=Xi(t))}_shakeThresholds(){return{shakeAt:this._config?.shake_at??.6,shakePeak:this._config?.shake_peak??.28,shakeSpeed:this._config?.shake_speed??.45}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this.style.transform="",this._shakePhase=0,super.disconnectedCallback()}updated(t){(t.has("hass")||t.has("_config"))&&this._syncIntensity(),t.has("_config")&&this._syncDots(),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncIntensity(){const t=this._config?.entity,e=rn(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetIntensity=void 0!==e?function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(e,i,n):0}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(this._stage??t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0),this._syncDots()}_tickIntensity(t){const e=this._targetIntensity-this._displayIntensity;return Math.abs(e)<.001?this._displayIntensity=this._targetIntensity:this._displayIntensity+=.1*e*t,this._displayIntensity}_applyShake(t,e){const{shakeAt:i,shakePeak:n}=this._shakeThresholds();if(t<i)return void(this.style.transform="");const s=(t-i)/(1-i)*n,a=e,o=Math.sin(14.3*a)*s*2.4+Math.cos(19.7*a)*s*1.2,r=Math.cos(16.1*a)*s*1.8+Math.sin(11.2*a)*s*.9,l=Math.sin(21.5*a)*s*.4;this.style.transform=`translate(${o}px, ${r}px) rotate(${l}deg)`}_drawDot(t,e,i,n,s,a){a<=.01||(t.save(),t.shadowColor=s,t.shadowBlur=2.4*n,t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=.35*a,t.fill(),t.restore(),t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=a,t.fill(),t.globalAlpha=1)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncIntensity();const a=this._tickIntensity(t),o=Math.max(.12,a),{shakeAt:r,shakeSpeed:l}=this._shakeThresholds(),c=this._presets();this._phase+=t*(.014+o*o*.1)*c.phaseSpeed,a>=r?(this._shakePhase+=t*l*.06,this._applyShake(a,this._shakePhase)):(this._shakePhase=0,this._applyShake(a,0));const h=(d=this._config?.color,Me(d,this,"--primary-color","#03a9f4"));var d;const u=Math.min(n,s),m=function(t,e){return Math.max(1.1,.0115*t)*e}(u,c.dotScale),p=Math.max(0,a-.55);i.clearRect(0,0,n,s);for(let g=0;g<this._dots.length;g+=1){const t=Ji(c,this._dots[g],g,this._dots.length,this._phase,o,n,s,0,r),e=en(t.x,t.y,n,s,u,c.layout)*tn(t.x,t.y,n,s),a=m*t.radiusMul*(.68+.38*o+p*p*.85),l=(.3+.52*o+p*p*.6)*t.alphaMul*e;this._drawDot(i,t.x,t.y,a,h,l)}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Waveform",i=Kt(t);return G`
      <ha-card>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div
            class="content"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            ${t?G`<ha-state-icon
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
    `}static{this.styles=[Zt,Jt,te,o`
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
      cursor: pointer;
    }

    ha-state-icon {
      flex: none;
      color: var(--primary-text-color);
    }

    ha-tile-info {
      min-width: 0;
      flex: 1;
    }
  `]}};ie([St({attribute:!1})],hn.prototype,"hass",void 0),ie([zt()],hn.prototype,"_config",void 0),ie([It(".stage")],hn.prototype,"_stage",void 0),ie([It("canvas")],hn.prototype,"_canvas",void 0),hn=ie([yt(Si)],hn);var dn,un,mn=ht(()=>{ln="nvision-air-quality-card",cn="nvision-air-quality-card-editor"}),pn=/* @__PURE__ */dt({NvisionAirQualityCardEditor:()=>un}),gn=ht(()=>{kt(),Bt(),Ht(),ae(),he(),mn(),se(),dn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"color_good",selector:{color_rgb:{}}},{name:"color_warning",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_bad",selector:{color_rgb:{}}},{name:"color_mist",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_clear",selector:{color_rgb:{}}},{name:"color_sky",selector:{color_rgb:{}}}]},oe()],un=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color_good"===t.name?"Good gauge color":"color_warning"===t.name?"Moderate gauge color":"color_bad"===t.name?"Poor gauge color":"color_mist"===t.name?"Mist color":"color_clear"===t.name?"Clear glow color":"color_sky"===t.name?"Sky glow color":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${dn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],un.prototype,"_config",void 0),un=ie([yt(cn)],un)});kt(),Bt(),mn(),se(),Dt({type:ln,name:"Nvision Air Quality",description:"Gauge with gradient arc, mist when air is poor, crisp glow when clear"});var fn=40*Math.PI,_n=.38,vn=.62;function yn(t){return t>=_n?0:(_n-t)/_n}function bn(t){return t<=vn?0:(t-vn)/.38}function xn(t,e){return{good:Me(t?.color_good,e,"--success-color","#4caf50"),warning:Me(t?.color_warning,e,"--warning-color","#ff9800"),bad:Me(t?.color_bad,e,"--error-color","#f44336"),mist:Me(t?.color_mist,e,"--secondary-text-color","#888888"),clear:Me(t?.color_clear,e,"--success-color","#4caf50"),sky:Me(t?.color_sky,e,"--info-color","#2196f3")}}function wn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function $n(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}var Mn,kn,Cn=0,Sn=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._gradientId="aq-gradient-"+ ++Cn,this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._displayValue=0,this._targetValue=0,this._mist=[],this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(gn(),pn)),document.createElement(cn)}static getStubConfig(t,e,i){const n=e.find(e=>function(t,e){const i=t.states[e];if(!i)return!1;const n=i.attributes?.device_class;return"aqi"===n||"pm25"===n||"pm10"===n||/aqi|air_quality|pm2/i.test(e)}(t,e))||e.find(e=>void 0!==wn(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${ln}`,entity:n,min:0,max:100}}setConfig(t){this._config={min:0,max:100,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0})}updated(t){(t.has("hass")||t.has("_config"))&&(this._syncValue(),this._applyEffectLevels(this._badness(this._targetValue))),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncValue(){const t=this._config?.entity,e=wn(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetValue=void 0!==e?Math.min(n,Math.max(i,e)):i}_tickValue(t){const e=this._targetValue-this._displayValue;return Math.abs(e)<.05?this._displayValue=this._targetValue:this._displayValue+=.08*e*t,this._displayValue}_badness(t){const{min:e,max:i}=this._range();return $n(t,e,i)}_applyEffectLevels(t){this._stage?.style.setProperty("--haze",String(bn(t))),this._stage?.style.setProperty("--clarity",String(yn(t)))}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_ensureMist(t,e,i){const n=Math.floor(16*i);for(;this._mist.length<n;)this._mist.push({x:Math.random()*t,y:Math.random()*e,radius:18+42*Math.random(),vx:.22*(Math.random()-.5),vy:-.04-.18*Math.random(),alpha:.04+.1*Math.random()});this._mist.length>n&&(this._mist.length=n)}_drawMist(t,e,i,n,s,a){if(!(n<.08)){this._ensureMist(e,i,n);for(const o of this._mist){o.x+=o.vx*s,o.y+=o.vy*s,o.y+o.radius<0&&(o.y=i+o.radius,o.x=Math.random()*e),o.x<-o.radius&&(o.x=e+o.radius),o.x>e+o.radius&&(o.x=-o.radius);const r=t.createRadialGradient(o.x,o.y,0,o.x,o.y,o.radius);r.addColorStop(0,a),r.addColorStop(1,"rgba(0,0,0,0)"),t.beginPath(),t.arc(o.x,o.y,o.radius,0,2*Math.PI),t.fillStyle=r,t.globalAlpha=o.alpha*n*1.4,t.fill()}t.globalAlpha=1}}_drawClearGlow(t,e,i,n,s,a){if(n<.2)return;const o=.5*e,r=.36*i,l=.94+.06*Math.sin(.5*this._phase),c=.62*Math.min(e,i)*l,h=t.createRadialGradient(o,r,0,o,r,c);h.addColorStop(0,s),h.addColorStop(.55,a),h.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=h,t.globalAlpha=n*n*.1,t.fillRect(0,0,e,i);const d=t.createLinearGradient(0,0,0,.55*i);d.addColorStop(0,a),d.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=d,t.globalAlpha=.06*n,t.fillRect(0,0,e,i),t.globalAlpha=1}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncValue();const a=this._tickValue(t),o=this._badness(a),r=yn(o),l=bn(o);this._phase+=.025*t,this._applyEffectLevels(o);const c=xn(this._config,this);i.clearRect(0,0,n,s),this._drawClearGlow(i,n,s,r,c.clear,c.sky),this._drawMist(i,n,s,l,t,c.mist)}_renderGauge(t,e,i,n,s,a){const{min:o,max:r}=this._range(),l=function(t,e,i){return 180*$n(t,e,i)}(t,o,r),c=this._gaugeReady?fn*(1-l/180):fn;return V`
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
          stroke-dasharray=${fn}
          style=${xe({strokeDashoffset:`${c}`})}
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
        ${i?V`<text
              class="unit-text"
              x="0"
              y="6"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              ${i}
            </text>`:K}
      </svg>
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=wn(t?.state),i=e??this._targetValue,n=this._config.name||t?.attributes.friendly_name||"Air Quality",s=t?.attributes.unit_of_measurement??"",a=void 0!==e?String(Math.round(10*e)/10):"—",o=xn(this._config,this);return G`
      <ha-card
        style=${xe({"--aq-good-color":o.good,"--aq-warning-color":o.warning,"--aq-bad-color":o.bad,"--aq-mist-color":o.mist,"--aq-clear-color":o.clear,"--aq-sky-color":o.sky})}
      >
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="clear-overlay" aria-hidden="true"></div>
          <div class="haze-overlay" aria-hidden="true"></div>
          <div
            class="body"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            <div class="gauge-wrap">
              ${this._renderGauge(i,a,s,o.good,o.warning,o.bad)}
            </div>
            <p class="title" .title=${n}>${n}</p>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Zt,o`
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
      cursor: pointer;
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
  `]}};ie([St({attribute:!1})],Sn.prototype,"hass",void 0),ie([zt()],Sn.prototype,"_config",void 0),ie([zt()],Sn.prototype,"_gaugeReady",void 0),ie([It("canvas")],Sn.prototype,"_canvas",void 0),ie([It(".stage")],Sn.prototype,"_stage",void 0),Sn=ie([yt(ln)],Sn);var An,zn,Pn=ht(()=>{Mn="nvision-circle-gauge-card",kn="nvision-circle-gauge-card-editor"}),En=/* @__PURE__ */dt({NvisionCircleGaugeCardEditor:()=>zn}),Tn=ht(()=>{kt(),Bt(),Ht(),ae(),he(),Pn(),se(),An=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{name:"track_color",selector:{color_rgb:{}}},{name:"reverse",selector:{boolean:{}}},oe("toggle")],zn=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Gauge color":"track_color"===t.name?"Track color":"reverse"===t.name?"Reverse":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${An}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],zn.prototype,"_config",void 0),zn=ie([yt(kn)],zn)});kt(),Bt(),Pn(),se(),Dt({type:Mn,name:"Nvision Circle Gauge",description:"Full-circle gauge with the value centered, ideal for timers"});var On=2*Math.PI*40;function In(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ln(t){const e=t.split(":").map(Number);return 3===e.length?3600*e[0]+60*e[1]+e[2]:2===e.length?60*e[0]+e[1]:Number(t)||0}function qn(t){const e=t.attributes.duration;return"string"==typeof e?Ln(e):0}function Rn(t,e,i){return"idle"===t.state&&void 0===e?"Idle":void 0===e?"—":"idle"===t.state&&0===e?"Idle":function(t,e){const i=Math.max(0,Math.floor(t)),n=Math.floor(i/3600),s=Math.floor(i%3600/60),a=i%60,o={};if(n&&(o.hours=n),s&&(o.minutes=s),(a||!n&&!s)&&(o.seconds=a),e?.language&&"undefined"!=typeof Intl&&"DurationFormat"in Intl)return new Intl.DurationFormat(e.language,{style:"narrow",hoursDisplay:n?"always":"auto"}).format(o);const r=[];return n&&r.push(`${n}h`),s&&r.push(`${s}m`),(a||0===r.length)&&r.push(`${a}s`),r.join(" ")}(e,i)}function Nn(t){return t?.startsWith("timer.")??!1}var Fn,jn,Bn=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._tick=0,this._rescaleOnConnect=!1,this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(Tn(),En)),document.createElement(kn)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("timer."))||e.find(e=>function(t,e){const i=t.states[e];return!(!i||!Nn(e)&&void 0===In(i.state))}(t,e))||e[0]||i[0]||Object.keys(t.states)[0],s=t.states[n],a=s&&Nn(n)&&qn(s)||100;return{type:`custom:${Mn}`,entity:n,min:0,max:a}}setConfig(t){const e=t.entity?.startsWith("timer.")?{tap_action:{action:"toggle"},hold_action:{action:"more-info"}}:{tap_action:{action:"more-info"},hold_action:{action:"more-info"}};this._config={min:0,max:100,...e,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:3}}connectedCallback(){super.connectedCallback(),this._syncTimerInterval(),this._rescaleOnConnect&&requestAnimationFrame(()=>{this._rescaleTextSvg(),this._rescaleOnConnect=!1})}disconnectedCallback(){this._clearTimerInterval(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0,this._rescaleTextSvg()})}updated(t){(t.has("hass")||t.has("_config"))&&this._syncTimerInterval(),(t.has("hass")||t.has("_config")||t.has("_tick")||t.has("_gaugeReady"))&&requestAnimationFrame(()=>this._rescaleTextSvg())}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_clearTimerInterval(){void 0!==this._timerInterval&&(clearInterval(this._timerInterval),this._timerInterval=void 0)}_syncTimerInterval(){this._clearTimerInterval();const t=this._config?.entity,e=t?this.hass?.states[t]:void 0;e&&Nn(t)&&"active"===e.state&&(this._timerInterval=window.setInterval(()=>{this._tick+=1},1e3))}_reading(){this._tick;const t=this._config?.entity,e=t?this.hass?.states[t]:void 0,{min:i,max:n}=this._range();if(!e)return{value:i,valueText:"—",unit:""};if(Nn(t)){const t=qn(e),s=function(t){const e=t.attributes.remaining;if("string"!=typeof e)return;let i=Ln(e);if("active"===t.state&&t.attributes.finishes_at){const e=new Date(String(t.attributes.finishes_at)).getTime();i=Math.max((e-Date.now())/1e3,0)}return i}(e),a=n>i?n:t||n;return{value:s??("idle"===e.state?a:i),valueText:Rn(e,s??t,this.hass?.locale),unit:""}}const s=In(e.state),a=s??i;if(this.hass?.formatEntityStateToParts){const t=this.hass.formatEntityStateToParts(e);return{value:a,valueText:t.find(t=>"value"===t.type)?.value??(void 0!==s?String(s):"—"),unit:t.find(t=>"unit"===t.type)?.value??""}}const o=String(e.attributes.unit_of_measurement??"");return{value:a,valueText:void 0!==s?String(s):"—",unit:o}}_rescaleTextSvg(){if(!this.isConnected)return void(this._rescaleOnConnect=!0);const t=this.shadowRoot?.querySelector(".text"),e=t?.querySelector(".text-group");if(!t||!e)return;const i=e.getBBox();0===i.width&&0===i.height||t.setAttribute("viewBox",`${i.x} ${i.y} ${i.width} ${i.height}`)}_renderGauge(t,e,i,n,s){const{min:a,max:o}=this._range(),r=this._config?.entity,l=r?this.hass?.states[r]:void 0,c=l&&Nn(r)?qn(l):o,h=function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,a,Nn(r)&&c>a?c:o),d=this._config?.reverse?1-h:h;return V`
      <svg viewBox="-50 -50 100 100" class="gauge">
        <circle class="track" cx="0" cy="0" r=${40} stroke=${s} />
        <circle
          class="value"
          cx="0"
          cy="0"
          r=${40}
          stroke=${n}
          stroke-dasharray=${On}
          style=${xe({strokeDashoffset:`${this._gaugeReady?On*(1-d):this._config?.reverse?0:On}`})}
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
          ${i?V`<text
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
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,{value:i,valueText:n,unit:s}=this._reading(),a=Me(this._config.color,this,"--primary-color","#03a9f4");const o=function(t,e){return Me(t,e,"--primary-background-color","#e0e0e0")}(this._config.track_color,this),r=this._config.name||e?.attributes.friendly_name||"Circle Gauge";return G`
      <ha-card>
        <div
          class="body"
          role="button"
          tabindex="0"
          @click=${this._actions.bind().click}
          @dblclick=${this._actions.bind().dblclick}
          @keydown=${this._actions.bind().keydown}
          @pointerdown=${this._actions.bind().pointerdown}
          @pointerup=${this._actions.bind().pointerup}
          @pointerleave=${this._actions.bind().pointerleave}
          @pointercancel=${this._actions.bind().pointercancel}
        >
          <div class="gauge-wrap">
            ${this._renderGauge(i,n,s,a,o)}
          </div>
          <p class="title">${r}</p>
        </div>
      </ha-card>
    `}static{this.styles=[Zt,o`
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
      cursor: pointer;
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
  `]}};ie([St({attribute:!1})],Bn.prototype,"hass",void 0),ie([zt()],Bn.prototype,"_config",void 0),ie([zt()],Bn.prototype,"_gaugeReady",void 0),ie([zt()],Bn.prototype,"_tick",void 0),Bn=ie([yt(Mn)],Bn);var Dn,Un,Hn=ht(()=>{Fn="nvision-power-draw-card",jn="nvision-power-draw-card-editor"}),Wn=/* @__PURE__ */dt({NvisionPowerDrawCardEditor:()=>Un}),Gn=ht(()=>{kt(),Bt(),Ht(),ae(),he(),hi(),Hn(),se(),Dn=[{name:"entity",selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:qe,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}},oe()],Un=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:qe,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Dn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],Un.prototype,"_config",void 0),Un=ie([yt(jn)],Un)});kt(),Bt(),hi(),Hn(),se(),Dt({type:Fn,name:"Nvision Power Draw",description:"Power consumption with animated lightning from a plug"});var Vn,Yn,Kn=class extends _t{constructor(...t){super(...t),this._displayIntensity=0,this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(Gn(),Wn)),document.createElement(jn)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return"power"===i?.attributes.device_class||e.includes("power")||void 0!==Ze(i?.state)})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Fn}`,entity:n,min:0,max:qe}}setConfig(t){this._config={min:0,max:qe,effects_min:0,effects_max:1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return De(this._config?.color,this)}_overMaxColor(){return Ve(this)}_rawValue(){const t=this._config?.entity;return Ze(t?this.hass?.states[t]?.state:void 0)}_overMaxSeverity(){const t=this._rawValue();return void 0===t?0:Ge(t,this._config?.min??0,this._config?.max??3e3)}_syncLightningTheme(){const t=this._overMaxSeverity()>0?this._overMaxColor():this._lightningColor();this.style.setProperty("--lightning-color",t),this.style.setProperty("--lightning-glow",String(We(this._displayIntensity)))}_targetIntensity(){return He(this._rawValue(),this._config??{})}_tickIntensity(t){const e=this._targetIntensity(),i=e-this._displayIntensity;return Math.abs(i)<.001?this._displayIntensity=e:this._displayIntensity+=i*Re*t,this._syncLightningTheme(),this._displayIntensity}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Fe(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>{this._tickIntensity(t)})),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=ei(this._plug,e,"center"),n=ei(this._entityIcon,e,"center");if(!i||!n)return[];const s=this._overMaxSeverity(),a=s>0?this._overMaxColor():this._lightningColor(),o=[{from:i,to:n,intensity:this._displayIntensity,color:a}];if(s>0){const{width:i,height:r}=e.getBoundingClientRect();Xe(o,n,i,r,s,t,a)}return o}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Power Draw",i=Kt(t);return G`
      <ha-card class=${this._overMaxSeverity()>0?"over-max":""}>
        <div class="stage">
          <div
            class="content"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            ${t?G`<ha-state-icon
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
    `}static{this.styles=[Zt,Jt,te,o`
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
      cursor: pointer;
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
  `]}};ie([St({attribute:!1})],Kn.prototype,"hass",void 0),ie([zt()],Kn.prototype,"_config",void 0),ie([It("canvas")],Kn.prototype,"_canvas",void 0),ie([It(".plug")],Kn.prototype,"_plug",void 0),ie([It(".entity-icon")],Kn.prototype,"_entityIcon",void 0),Kn=ie([yt(Fn)],Kn);var Xn,Qn,Zn=ht(()=>{Vn="nvision-power-glance-card",Yn="nvision-power-glance-card-editor"}),Jn=/* @__PURE__ */dt({NvisionPowerGlanceCardEditor:()=>Qn}),ts=ht(()=>{kt(),Bt(),Ht(),ae(),he(),hi(),Zn(),se(),Xn=[{name:"entities",selector:{entity:{multiple:!0,domain:"sensor"}}},{name:"columns",default:3,selector:{number:{min:1,max:6,mode:"box"}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:qe,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}},oe()],Qn=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"entities"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entities"):"columns"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.columns"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={entities:[],columns:3,min:0,max:qe,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Xn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],Qn.prototype,"_config",void 0),Qn=ie([yt(Yn)],Qn)});kt(),Bt(),hi(),Zn(),se(),Dt({type:Vn,name:"Nvision Power Glance",description:"Multiple power sensors with lightning from a bottom plug"});var es=class extends _t{constructor(...t){super(...t),this._displayIntensities=/* @__PURE__ */new Map,this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(ts(),Jn)),document.createElement(Yn)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)],s=/* @__PURE__ */new Set,a=[];for(const o of n){if(s.has(o))continue;s.add(o);const e=t.states[o];if(("power"===e?.attributes.device_class||o.includes("power")||void 0!==Ze(e?.state))&&a.push(o),a.length>=4)break}return{type:`custom:${Vn}`,entities:a.length?a:n.slice(0,3),columns:3,min:0,max:qe}}setConfig(t){this._config={entities:[],columns:3,min:0,max:qe,effects_min:0,effects_max:1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t},this._syncGridColumns()}_syncGridColumns(){const t=this._config?.columns??3,e=this._config?.entities?.length??0,i=e>0?Math.min(t,e):t;this.style.setProperty("--columns",String(i))}getCardSize(){const t=this._config?.entities?.length??1,e=this._config?.columns??3;return Math.max(1,Math.ceil(t/e))}getGridOptions(){return{columns:6,rows:this.getCardSize()}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncGridColumns(),this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return De(this._config?.color,this)}_overMaxColor(){return Ve(this)}_entitySeverity(t){const e=Ze(this.hass?.states[t]?.state);return void 0===e?0:Ge(e,this._config?.min??0,this._config?.max??3e3)}_rawValues(){return this._entityIds().map(t=>Ze(this.hass?.states[t]?.state))}_overMaxSeverity(){return function(t,e){const i=e.min??0,n=e.max??3e3;return t.reduce((t,e)=>Math.max(t,void 0!==e?Ge(e,i,n):0),0)}(this._rawValues(),this._config??{})}_syncLightningTheme(){const t=this._lightningColor(),e=this._overMaxColor(),i=this._overMaxSeverity()>0;this.style.setProperty("--lightning-color",t);const n=this._entityIds(),s=this._entityIcons?Array.from(this._entityIcons):[];let a=We(0);n.forEach((i,n)=>{const o=We(this._displayIntensities.get(i)??0);a=Math.max(a,o);const r=s[n];r?.style.setProperty("--lightning-glow",String(o)),r?.style.setProperty("--lightning-color",this._entitySeverity(i)>0?e:t)}),this._plug?.style.setProperty("--lightning-glow",String(a)),this._plug?.style.setProperty("--lightning-color",i?e:t)}_entityIds(){return this._config?.entities??[]}_targetIntensity(t){const e=this.hass?.states[t]?.state;return He(Ze(e),this._config??{})}_tickIntensities(t){for(const e of this._entityIds()){const i=this._targetIntensity(e),n=this._displayIntensities.get(e)??0,s=i-n;Math.abs(s)<.001?this._displayIntensities.set(e,i):this._displayIntensities.set(e,n+s*Re*t)}this._syncLightningTheme()}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Fe(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>this._tickIntensities(t))),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=ei(this._plug,e,"center");if(!i)return[];const n=this._entityIcons?Array.from(this._entityIcons):[],s=this._entityIds(),a=this._lightningColor(),o=this._overMaxColor(),{width:r,height:l}=e.getBoundingClientRect(),c=[];return s.forEach((s,h)=>{const d=ei(n[h],e,"center"),u=this._displayIntensities.get(s)??0,m=this._entitySeverity(s);if(!d)return;const p=m>0?o:a;c.push({from:i,to:d,intensity:u,color:p}),m>0&&Xe(c,d,r,l,m,t,o)}),c}render(){if(!this._config||!this.hass)return K;const t=this._entityIds();return G`
      <ha-card class=${this._overMaxSeverity()>0?"over-max":""}>
        <div class="stage">
          <div class="entities">
            ${t.map(t=>{const e=this.hass.states[t],i=Kt(e);return G`
                <div
                  class="entity"
                  role="button"
                  tabindex="0"
                  @click=${this._actions.bind(t).click}
                  @dblclick=${this._actions.bind(t).dblclick}
                  @keydown=${this._actions.bind(t).keydown}
                  @pointerdown=${this._actions.bind(t).pointerdown}
                  @pointerup=${this._actions.bind(t).pointerup}
                  @pointerleave=${this._actions.bind(t).pointerleave}
                  @pointercancel=${this._actions.bind(t).pointercancel}
                >
                  ${e?G`<ha-state-icon
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
    `}static{this.styles=[Zt,te,o`
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
      cursor: pointer;
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
  `]}};ie([St({attribute:!1})],es.prototype,"hass",void 0),ie([zt()],es.prototype,"_config",void 0),ie([It("canvas")],es.prototype,"_canvas",void 0),ie([It(".plug")],es.prototype,"_plug",void 0),ie([function(t){return(e,i)=>Pt(e,i,{get(){return(this.renderRoot??(Lt??=document.createDocumentFragment())).querySelectorAll(t)}})}(".entity-icon")],es.prototype,"_entityIcons",void 0),es=ie([yt(Vn)],es),wt();var is=ge(class extends fe{constructor(t){if(super(t),t.type!==pe||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=/* @__PURE__ */new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const t=!!e[n];t===this.st.has(n)||this.nt?.has(n)||(t?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return Y}});function ns(t){if("on"!==t.state)return 0;const e=t.attributes.brightness;return"number"!=typeof e?1:Math.max(0,Math.min(1,e/255))}function ss(t){const e=t.attributes.brightness;return e&&"on"===t.state?`brightness(${(e+245)/5}%)`:""}function as(t){const e=Math.max(1e3,Math.min(4e4,t))/100;let i,n,s;return e<=66?(i=255,n=Math.min(255,Math.max(0,99.4708025861*Math.log(e)-161.1195681661)),s=e<=19?0:Math.min(255,Math.max(0,138.5177312231*Math.log(e-10)-305.0447927307))):(i=Math.min(255,Math.max(0,329.698727446*(e-60)**-.1332047592)),n=Math.min(255,Math.max(0,288.1221695283*(e-60)**-.0755148492)),s=255),[Math.round(i),Math.round(n),Math.round(s)]}function os(t){if("on"!==t.state)return;const e=t.attributes.rgb_color;if(e)return e;const i=t.attributes.color_temp_kelvin;if("number"==typeof i)return as(i);const n=t.attributes.color_temp;if("number"==typeof n&&n>0)return as(Math.round(1e6/n));const s=t.attributes.hs_color;return s?function(t,e,i){const n=e/100,s=i/100,a=(1-Math.abs(2*s-1))*n,o=t/60,r=a*(1-Math.abs(o%2-1));let l=0,c=0,h=0;o>=0&&o<1?(l=a,c=r):o<2?(l=r,c=a):o<3?(c=a,h=r):o<4?(c=r,h=a):o<5?(l=r,h=a):(l=a,h=r);const d=s-a/2;return[Math.round(255*(l+d)),Math.round(255*(c+d)),Math.round(255*(h+d))]}(s[0],s[1],50):void 0}var rs,ls,cs,hs,ds="nvision-light-glow-stack";var us,ms,ps=ht(()=>{rs="nvision-light-card",ls="nvision-light-card-editor",cs=.72,hs=.62}),gs=/* @__PURE__ */dt({NvisionLightCardEditor:()=>ms}),fs=ht(()=>{kt(),Bt(),Ht(),ae(),ps(),se(),us=[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"glow_size",required:!0,default:165,selector:{number:{min:20,max:300,step:5,unit_of_measurement:"%"}}},{name:"glow_intensity",required:!0,default:cs,selector:{number:{min:0,max:1,step:.05}}}]},{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}]}],ms=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"glow_size"===t.name?"Glow size":"glow_intensity"===t.name?"Glow intensity":"interactions"===t.name?"Interactions":"hold_action"===t.name||"double_tap_action"===t.name?`${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`:this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:cs,...t}}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${us}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],ms.prototype,"_config",void 0),ms=ie([yt(ls)],ms)});kt(),Bt(),Ht(),ps(),se(),Dt({type:rs,name:"Nvision Light",description:"Light control with ambient color glow"}),function(t){if("undefined"==typeof document||document.getElementById(ds))return;const e=document.createElement("style");e.id=ds,e.textContent=`\n    hui-card:has(${t}),\n    .card:has(${t}) {\n      position: relative;\n      z-index: 0;\n      overflow: visible;\n    }\n\n    hui-card:not(:has(${t})),\n    .card:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section:has(${t}) {\n      position: relative;\n      z-index: 0;\n    }\n\n    section:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section .meta {\n      position: relative;\n      z-index: 2;\n    }\n\n    .preview:has(${t}) {\n      overflow: visible;\n    }\n  `,document.head.appendChild(e)}(rs);var _s,vs,ys,bs,xs,ws,$s,Ms=class extends _t{constructor(...t){super(...t),this._holdTriggered=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(fs(),gs)),document.createElement(ls)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("light."))||i.find(t=>t.startsWith("light."))||Object.keys(t.states).find(t=>t.startsWith("light."))||e[0]||i[0]||"";return{type:`custom:${rs}`,entity:n,glow_size:165,glow_intensity:cs}}setConfig(t){if(!t.entity||"light"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the light domain");this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:cs,...t}}getCardSize(){return 5}getGridOptions(){return{columns:6,rows:5,min_rows:3}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return G`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=Math.round((t.attributes.brightness||0)/255*100),i="on"===t.state,n="unavailable"===t.state||"unknown"===t.state,s=function(t){const e=t.attributes.supported_features;if("number"==typeof e&&1&e)return!0;const i=t.attributes.supported_color_modes;return Boolean(i?.some(t=>"onoff"!==t))}(t),a=function(t){const e=os(t);return e?`rgb(${e.join(", ")})`:"on"===t.state?"var(--state-light-active-color, var(--state-active-color, #ffb74d))":"transparent"}(t),o=ns(t),r=this._config.glow_size??165,l=(this._config.glow_intensity??.72)*o,c=r*hs,h=this._config.name||t.attributes.friendly_name||this._config.entity,d={filter:ss(t),color:i&&t.attributes.rgb_color?`rgb(${t.attributes.rgb_color.join(",")})`:""},u={"--bulb-color":a,"--nv-glow-size":`${r}%`,"--nv-glow-intensity":String(l),"--nv-glow-spread":`${c}px`};return G`
      <div
        class=${is({stage:!0,"state-on":i,"state-off":!i})}
        style=${xe(u)}
      >
        <div class="glow-backdrop" aria-hidden="true"></div>
        <div class="glow-ambient" aria-hidden="true"></div>

        <ha-card class=${is({"state-on":i,"state-off":!i})}>
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
                style=${xe({visibility:s?"visible":"hidden"})}
                @value-changing=${this._dragBrightness}
                @value-changed=${this._setBrightness}
              ></round-slider>
              <ha-icon-button
                class=${is({"light-button":!0,"state-on":i,"state-unavailable":n})}
                style=${xe(d)}
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
            ${n?G`<div class="state-label">${t.state}</div>`:G`
                  <div class="brightness">
                    ${e}<span class="unit"> %</span>
                  </div>
                `}
            ${h}
          </div>
        </div>
        </ha-card>
      </div>
    `}_handleMoreInfo(){this._config?.entity&&Ut(this,"hass-more-info",{entityId:this._config.entity})}_handleTap(t){if(this._holdTriggered)return this._holdTriggered=!1,void t.preventDefault();this.hass&&this._config&&Vt(this,this.hass,this._config,"tap")}_handleDoubleTap(t){t.preventDefault(),this.hass&&this._config&&Vt(this,this.hass,this._config,"double_tap")}_handleHoldStart(){window.clearTimeout(this._holdTimer),this._holdTriggered=!1,this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,this.hass&&this._config&&Vt(this,this.hass,this._config,"hold")},500)}_handleHoldEnd(){window.clearTimeout(this._holdTimer)}_dragBrightness(t){const e=this.shadowRoot?.querySelector(".brightness");e&&(e.innerHTML=`${t.detail.value}<span class="unit"> %</span>`,e.classList.add("show_brightness")),window.clearTimeout(this._brightnessTimeout),this._brightnessTimeout=window.setTimeout(()=>{e?.classList.remove("show_brightness")},500)}_setBrightness(t){this.hass&&this._config?.entity&&this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:t.detail.value})}static{this.styles=o`
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
  `}};function ks(t){return String(t).padStart(2,"0")}function Cs(t,e){const i=Object.fromEntries(function(t){let e=xs.get(t);return e||(e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hour12:!1,weekday:"short"}),xs.set(t,e)),e}(e).formatToParts(new Date(t)).map(t=>[t.type,t.value])),n=bs.indexOf(String(i.weekday))>=0?bs.indexOf(String(i.weekday)):0,s=Number(i.year),a=Number(i.month),o=Number(i.day);return{year:s,month:a,day:o,hour:Number(i.hour)%24,weekday:n,dateKey:`${s}-${ks(a)}-${ks(o)}`,monthKey:`${s}-${ks(a)}`}}function Ss(t,e,i){const n=Cs(As(t,e,i),e);return`${n.year}-${ks(n.month)}-${ks(n.day)}`}function As(t,e,i){const n=Cs(t,e),s=(n.weekday-i+7)%7;return zs(n.year,n.month,n.day,0,0,e)-24*s*60*60*1e3}function zs(t,e,i,n,s,a){const o=Date.UTC(t,e-1,i,n,s,0),r=Object.fromEntries(function(t){let e=ws.get(t);return e||(e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}),ws.set(t,e)),e}(a).formatToParts(new Date(o)).map(t=>[t.type,t.value]));return o-(Date.UTC(Number(r.year),Number(r.month)-1,Number(r.day),Number(r.hour),Number(r.minute),0)-o)}function Ps(t,e,i,n,s){if("none"===t)return"";const a=function(t,e,i=0){return{...Cs(t,e),weekKey:Ss(t,e,i)}}(e,i,s);switch(t){case"hour":return String(a.hour);case"weekday":return String(a.weekday);case"day":return a.dateKey;case"week":return a.weekKey;case"month":return a.monthKey;case"time":return String(Math.floor(e/n)*n);default:return}}function Es(t,e,i,n,s){const a=/* @__PURE__ */new Map;if("none"===t)return{keys:[""],labels:[""],bucketRanges:a};if("hour"===t)return{keys:Array.from({length:24},(t,e)=>String(e)),labels:Array.from({length:24},(t,e)=>function(t){return new Date(Date.UTC(2024,0,1,t,0,0)).toLocaleTimeString([],{hour:"numeric"})}(e)),bucketRanges:a};if("weekday"===t){const t=Array.from({length:7},(t,e)=>(n+e)%7);return{keys:t.map(String),labels:t.map(t=>bs[t]),bucketRanges:a}}if("day"===t){const t=function(t,e){const i=[],n=Cs(t.startMs,e);let s=zs(n.year,n.month,n.day,0,0,e);for(;s<=t.endMs;){const t=Cs(s,e);i.push({key:t.dateKey,label:`${t.month}/${t.day}`}),s+=864e5}return i.slice(-Math.ceil(t.hours/24))}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("week"===t){const t=function(t,e,i){const n=[];let s=As(t.startMs,e,i);for(;s<=t.endMs;){const t=Cs(s,e);n.push({key:t.dateKey,label:`${t.month}/${t.day}`}),s+=6048e5}return n}(e,i,n);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("month"===t){const t=function(t,e){const i=[],n=Cs(t.startMs,e);let s=n.year,a=n.month;for(;;){const n=`${s}-${ks(a)}`;if(i.push({key:n,label:`${s}-${ks(a)}`}),a+=1,a>12&&(a=1,s+=1),zs(s,a,1,0,0,e)>t.endMs)break}return i}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}const o=function(t,e){const i=[];let n=Math.floor(t.startMs/e)*e;for(;n<t.endMs;){const t=n+e,s=new Date(n);i.push({key:String(n),start:n,end:t,label:s.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}),n=t}return i}(e,s);for(const r of o)a.set(r.key,`${new Date(r.start).toLocaleString()} – ${new Date(r.end).toLocaleString()}`);return{keys:o.map(t=>t.key),labels:o.map(t=>t.label),bucketRanges:a}}function Ts(t,e,i,n,s,a,o){return"time"===t?o.get(i)??s:"none"===e?s:"hour"===t&&"day"===e||"hour"===t&&"weekday"===e||"weekday"===t&&"week"===e?`${a} ${s}`:`${a} · ${s}`}function Os(t){return vs[t&&ys[t]||(t&&t in vs?t:void 0)||"week_hourly"]}function Is(t,e,i,n,s){const a=function(t,e=Date.now()){return{hours:t,endMs:e,startMs:e-60*t*60*1e3}}(_s[i]),o=(r=a.hours)<=24||r<=48||r<=336?36e5:864e5;var r;const l=Es(t,a,n,s,o),c=Es(e,a,n,s,o);return{window:a,bucketMs:o,xAxis:l,yAxis:c,xKeySet:new Set(l.keys),yKeySet:new Set(c.keys),bucketMap:/* @__PURE__ */new Map}}function Ls(t,e,i,n,s,a){if(e.time<t.window.startMs||e.time>t.window.endMs)return;const o=Ps(i,e.time,s,t.bucketMs,a),r=Ps(n,e.time,s,t.bucketMs,a);if(void 0===o||void 0===r)return;if(!t.xKeySet.has(o)||!t.yKeySet.has(r))return;const l=`${r}|${o}`,c=t.bucketMap.get(l)??[];c.push({time:e.time,value:e.value}),t.bucketMap.set(l,c)}function qs(t,e,i,n,s,a){const o=[],r=t.yAxis.keys.map((s,a)=>t.xAxis.keys.map((r,l)=>{const c=t.bucketMap.get(`${s}|${r}`)??[],h=function(t,e){if(!t.length)return null;switch(e){case"sum":case"count":return t.reduce((t,e)=>t+e.value,0);case"max":return Math.max(...t.map(t=>t.value));case"min":return Math.min(...t.map(t=>t.value));case"last":{let e=t[0];for(const i of t)i.time>=e.time&&(e=i);return e.value}default:return t.reduce((t,e)=>t+e.value,0)/t.length}}(c,n);return null!==h&&o.push(h),{value:h,count:c.length,rangeLabel:Ts(e,i,r,0,t.xAxis.labels[l],t.yAxis.labels[a],t.xAxis.bucketRanges)}}));let l=s,c=a;if(void 0===l||void 0===c){const t=o.length?Math.min(...o):0,e=o.length?Math.max(...o):1;l=l??t,c=c??(e===t?t+1:e)}return c<=l&&(c=l+1),{xLabels:t.xAxis.labels,yLabels:t.yAxis.labels,xKeys:t.xAxis.keys,yKeys:t.yAxis.keys,cells:r,min:l,max:c}}function Rs(t,e,i){return null===t?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}ie([St({attribute:!1})],Ms.prototype,"hass",void 0),ie([zt()],Ms.prototype,"_config",void 0),Ms=ie([yt(rs)],Ms);var Ns=ht(()=>{_s={"24h":24,"48h":48,"7d":168,"14d":336,"30d":720,"90d":2160,"365d":8760},vs={week_hourly:{x:"hour",y:"day",period:"7d"},two_weeks:{x:"hour",y:"day",period:"14d"},daily_rhythm:{x:"hour",y:"weekday",period:"30d"},month_days:{x:"weekday",y:"week",period:"30d"},month_calendar:{x:"weekday",y:"week",period:"90d"},quarter:{x:"week",y:"month",period:"90d"},timeline_24h:{x:"time",y:"none",period:"24h"},timeline_48h:{x:"time",y:"none",period:"48h"},year_overview:{x:"week",y:"month",period:"365d"}},ys={timeline:"timeline_24h",custom:"week_hourly"},bs=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],xs=/* @__PURE__ */new Map,ws=/* @__PURE__ */new Map,$s=["day","week","month"]});function Fs(t){if(t.callWS)return t.callWS.bind(t);const e=t.connection;if(e?.sendMessagePromise)return e.sendMessagePromise.bind(e);throw new Error("WebSocket API unavailable")}function js(t){return Fs(t)}function Bs(t){if(!t)return!1;const e=t.split(".",1)[0];return"binary_sensor"===e||"input_boolean"===e}function Ds(t,e){const i=(...t)=>{for(const e of t){if(null==e)continue;const t=Number(e);if(Number.isFinite(t))return t}};switch(e){case"mean":default:return i(t.mean,t.state);case"sum":return i(t.sum,t.change,t.state);case"max":return i(t.max,t.state,t.sum);case"min":return i(t.min,t.state);case"last":return i(t.state,t.mean);case"count":return i(t.change)}}function Us(t){if("string"==typeof t){const e=Date.parse(t);return Number.isFinite(e)?e:void 0}return t<1e11?1e3*t:t}var Hs,Ws,Gs,Vs,Ys,Ks,Xs;async function Qs(t,e,i,n,s,a="mean"){const o=js(t),r=function(t){return"max"===t||"last"===t}(a);return function(t,e,i=!1){if(t.length<=e)return t;const n=Math.ceil(t.length/e),s=[];for(let a=0;a<t.length;a+=n){const e=t.slice(a,a+n);e.length&&(i?s.push(e.reduce((t,e)=>e.value>t.value||e.value===t.value&&e.time>t.time?e:t,e[0])):s.push(e[0]))}return s}(function(t,e){const i=[];let n=!1;for(const s of t){const t=1e3*(s.lu??s.lc??0);if(e){const e="on"===s.s;e&&!n&&i.push({time:t,value:1}),n=e;continue}const a=Number(s.s);Number.isFinite(a)&&i.push({time:t,value:a})}return i}(function(t,e){return Array.isArray(t)?t[0]??[]:t[e]??[]}(await o({type:"history/history_during_period",start_time:i.toISOString(),end_time:n.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!r}),e),s),8e3,r)}async function Zs(t,e,i,n,s,a){const o=js(t),r="sum"===s?["sum","change","state"]:"max"===s?["max","state","sum"]:"min"===s?["min","state"]:["mean","state"];return function(t,e){const i=[];for(const n of t){const t=Ds(n,e);if(null==t||!Number.isFinite(t))continue;const s=Us(n.start);void 0!==s&&i.push({time:s,value:t})}return i}((await o({type:"recorder/statistics_during_period",start_time:i.toISOString(),end_time:n.toISOString(),statistic_ids:[e],period:a,types:r}))[e]??[],s)}var Js,ta,ea,ia=ht(()=>{Ns(),Hs="nvision-heat-map-card",Ws="nvision-heat-map-card-editor",Gs="week_hourly",Vs="theme",Ys=[{value:"week_hourly",label:"Week — hour × day"},{value:"two_weeks",label:"Two weeks — hour × day"},{value:"daily_rhythm",label:"Daily rhythm — hour × weekday"},{value:"month_days",label:"Month — weekday × week"},{value:"month_calendar",label:"Quarter calendar — weekday × week"},{value:"quarter",label:"Quarter — week × month"},{value:"timeline_24h",label:"Timeline — 24 hours"},{value:"timeline_48h",label:"Timeline — 48 hours"},{value:"year_overview",label:"Year — week × month"}],Ks=[{value:"theme",label:"Theme"},{value:"semantic",label:"Semantic"},{value:"temperature",label:"Temperature"},{value:"custom",label:"Custom"}],Xs=[{value:"auto",label:"Auto"},{value:"mean",label:"Mean"},{value:"sum",label:"Sum"},{value:"max",label:"Maximum"},{value:"min",label:"Minimum"},{value:"count",label:"Count"},{value:"last",label:"Last"}]}),na=/* @__PURE__ */dt({NvisionHeatMapCardEditor:()=>ea}),sa=ht(()=>{kt(),Bt(),Ht(),ae(),he(),ia(),se(),Js=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"preset",required:!0,default:Gs,selector:{select:{options:[...Ys],mode:"dropdown"}}},{name:"operation",default:"auto",selector:{select:{options:[...Xs],mode:"dropdown"}}},{name:"color_mode",required:!0,default:Vs,selector:{select:{options:[...Ks],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_axis_labels",selector:{boolean:{}}},{name:"show_legend",selector:{boolean:{}}},{name:"show_cell_values",selector:{boolean:{}}},{name:"show_current",selector:{boolean:{}}},{name:"dim_low_values",selector:{boolean:{}}}]},oe()],ta=[{type:"grid",name:"",schema:[{name:"color_low",selector:{color_rgb:{}}},{name:"color_high",selector:{color_rgb:{}}}]}],ea=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"preset"===t.name?"View":"color_mode"===t.name?"Color mode":"operation"===t.name?"Operation":"color_low"===t.name?"Low color":"color_high"===t.name?"High color":"show_axis_labels"===t.name?"Axis labels":"show_legend"===t.name?"Scale":"show_cell_values"===t.name?"Values in cells":"dim_low_values"===t.name?"Dim low values":"show_current"===t.name?"Current value":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={preset:Gs,color_mode:Vs,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1,...t,color_mode:"primary"===t.color_mode?"theme":t.color_mode,operation:t.operation??"auto"}}_schema(){return"custom"===this._config?.color_mode?[...Js,...ta]:Js}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){const e=t.detail.value;Ut(this,"config-changed",{config:{...e,color_mode:"primary"===e.color_mode?"theme":e.color_mode}})}},ie([zt()],ea.prototype,"_config",void 0),ea=ie([yt(Ws)],ea)});function aa(){return new Promise(t=>{"function"!=typeof requestIdleCallback?setTimeout(t,0):requestIdleCallback(()=>t(),{timeout:120})})}function oa(t){return t&&"primary"!==t?t:"theme"}function ra(t,e,i,n){const s=oa(i);return"semantic"===s?ze(t,e):"temperature"===s?function(t,e){const i=ke(we(t,"--info-color","#2196f3")),n=ke(we(t,"--warning-color","#ff9800")),s=ke(we(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return Ce(a<=.5?Se(i,n,2*a):Se(n,s,2*(a-.5)))}(t,e):"custom"===s?function(t,e,i,n){return Ce(Se(ke($e(i,we(t,"--info-color","#2196f3"))),ke($e(n,we(t,"--error-color","#f44336"))),Math.min(1,Math.max(0,e))))}(t,e,n.color_low,n.color_high):function(t,e){const i=ke(we(t,"--primary-color","#03a9f4")),n=ke(we(t,"--card-background-color","#1c1c1c")),s=Math.min(1,Math.max(0,e));return Ce(Se(Se(n,i,.18),i,.35+.65*s))}(t,e)}kt(),Bt(),Ns(),ia(),se(),Dt({type:Hs,name:"Nvision Heat Map",description:"Temporal heat map for sensor history and patterns"});function la(t,e,i,n,s){if(!s)return"rgba(0, 0, 0, 0.05)";const a=ra(t,e,i,n);return n.dim_low_values?`color-mix(in srgb, ${a} ${22+e*e*78}%, var(--card-background-color))`:a}function ca(t,e,i,n=!1){if(null===t)return"—";const s="count"===e?String(Math.round(t)):Number.isInteger(t)?String(t):n?t.toFixed(0):t.toFixed(1);return i&&"count"!==e?n?s:`${s} ${i}`:s}function ha(t,e,i){return ca(t,e,i,!0)}var da=null;function ua(t,e){return da??=document.createElement("canvas").getContext("2d"),da?(da.font=e,da.measureText(t).width):6*t.length}var ma,pa,ga,fa,_a,va=class extends _t{constructor(...t){super(...t),this._loading=!1,this._fetchVersion=0,this._measureFrame=0,this._actions=new Yt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(sa(),na)),document.createElement(Ws)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return e.startsWith("sensor.")||e.startsWith("binary_sensor.")||Number.isFinite(Number(i?.state))})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Hs}`,entity:n,preset:Gs,operation:"auto",color_mode:Vs,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1}}_entityAttributes(){const t=this._config?.entity;if(t&&this.hass)return this.hass.states[t]?.attributes}_resolveAggregate(t){const e=this._config?.operation;if(e&&"auto"!==e)return e;const i=this._config?.entity,n=this._entityAttributes();return s=t.x,a=t.y,o=function(t,e){return Bs(t)?"count":function(t,e){return!!function(t){return"string"==typeof t?.start&&"string"==typeof t?.end&&void 0!==t?.value}(e)||!!e?.last_reset||!(!t||!/_today$/i.test(t))}(t,e)?"max":function(t){const e=t?.state_class;return"total_increasing"===e||"total"===e}(e)?"last":"mean"}(i,n),"count"===o?"count":$s.includes(s)||$s.includes(a)?"max":o;var s,a,o}_computeLoadKey(){const t=this._config;if(!t?.entity)return"";const e=Os(t.preset),i=this._entityAttributes();return JSON.stringify({entity:t.entity,preset:t.preset,operation:t.operation??"auto",stateClass:i?.state_class,aggregate:this._resolveAggregate(e),axes:e})}setConfig(t){this._config={preset:Gs,operation:"auto",color_mode:Vs,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t,color_mode:oa(t.color_mode)},this._loadKey=void 0}getCardSize(){const t=this._grid?.yLabels.length??4;return Math.max(3,Math.min(8,Math.ceil(.75*t)+2))}getGridOptions(){const t=this._grid?.yLabels.length??4;return{columns:6,rows:Math.max(3,Math.min(8,Math.ceil(.75*t)+2)),min_rows:3}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>this._scheduleXLabelMeasure())}disconnectedCallback(){this._resizeObserver?.disconnect(),cancelAnimationFrame(this._measureFrame),super.disconnectedCallback()}shouldUpdate(t){if(1!==t.size||!t.has("hass"))return!0;const e=t.get("hass"),i=this._config?.entity;return!(e&&this.hass&&i)||(e.states[i]!==this.hass.states[i]||e.config.time_zone!==this.hass.config.time_zone)}updated(t){if(t.has("_config")||t.has("hass")){const t=this._computeLoadKey();t&&this.hass&&t!==this._loadKey&&(this._loadKey=t,this._loadData())}t.has("_grid")&&(this._xLabelVisible=void 0),this._grid&&!1!==this._config?.show_axis_labels&&this._scheduleXLabelMeasure()}_scheduleXLabelMeasure(){cancelAnimationFrame(this._measureFrame),this._measureFrame=requestAnimationFrame(()=>this._updateXLabelVisibility())}_observeGridWrap(t){this._resizeObserver&&t!==this._observedWrap&&(this._observedWrap&&this._resizeObserver.unobserve(this._observedWrap),this._observedWrap=t,this._resizeObserver.observe(t))}_updateXLabelVisibility(){const t=this._grid,e=this.shadowRoot;if(!t||!e||!1===this._config?.show_axis_labels)return;const i=e.querySelector(".grid-wrap"),n=e.querySelector(".data-grid .cell")??e.querySelector(".timeline-grid .cell");if(!i||!n)return;this._observeGridWrap(i);const s=e.querySelector(".data-grid .cell + .cell")??e.querySelector(".timeline-slot + .timeline-slot .cell");let a=n.getBoundingClientRect().width;if(s){const t=n.getBoundingClientRect();a=s.getBoundingClientRect().left-t.left}const o=e.querySelector(".axis.x"),r=o?getComputedStyle(o).font:"500 10px Roboto, sans-serif",l=function(t,e,i,n=6){if(e<=0||!t.length)return t.map(()=>!0);const s=t.map(()=>!1);let a=-1/0;for(let o=0;o<t.length;o++){const r=t[o];if(!r)continue;const l=ua(r,i),c=(o+.5)*e;c-l/2>=a+n&&(s[o]=!0,a=c+l/2)}return s}(t.xLabels,a,r);(function(t,e){return!(!t||!e||t.length!==e.length)&&t.every((t,i)=>t===e[i])})(l,this._xLabelVisible)||(this._xLabelVisible=l)}async _loadData(){const t=this._config,e=this.hass,i=t?.entity;if(!t||!e||!i)return this._grid=void 0,void(this._error=void 0);try{Fs(e)}catch{return this._error="History unavailable",void(this._grid=void 0)}const n=++this._fetchVersion;this._loading=!0,this._error=void 0;try{const s=Os(t.preset),a=this._resolveAggregate(s),o=await async function(t,e,i,n){const s=/* @__PURE__ */new Date,a=/* @__PURE__ */new Date(s.getTime()-60*i*60*1e3);if(Bs(e)||"count"===n)return Qs(t,e,a,s,!0,n);if(i>=24&&("max"===n||"sum"===n))try{const o=await Zs(t,e,a,s,n,i>336?"day":"hour");if(function(t,e){return!!t.length&&("max"!==e&&"sum"!==e||t.some(t=>t.value>0))}(o,n))return o}catch{}if(i>=24&&"mean"===n)try{const o=await Zs(t,e,a,s,n,i>336?"day":"hour");if(o.length>0)return o}catch{}return Qs(t,e,a,s,!1,n)}(e,i,_s[s.period],a);if(n!==this._fetchVersion)return;if(await aa(),n!==this._fetchVersion)return;const r=await async function(t,e,i,n,s,a,o=0,r={}){const l=Is(e,i,n,a,o),c=r.yieldEvery??250;for(let h=0;h<t.length;h++){if(!1===r.shouldContinue?.())return;Ls(l,t[h],e,i,a,o),r.yieldToMain&&(h+1)%c===0&&await r.yieldToMain()}if(!1!==r.shouldContinue?.())return qs(l,e,i,s,r.minOverride,r.maxOverride)}(o,s.x,s.y,s.period,a,e.config.time_zone||"UTC",1,{shouldContinue:()=>n===this._fetchVersion,yieldToMain:aa});if(n!==this._fetchVersion||!r)return;this._grid=r}catch(s){if(n!==this._fetchVersion)return;this._error=function(t,e="Could not load history"){return t instanceof Error||"object"==typeof t&&null!==t&&"message"in t&&"string"==typeof t.message?t.message:e}(s),this._grid=void 0}finally{n===this._fetchVersion&&(this._loading=!1)}}_showPopover(t,e){const i=t.currentTarget,n=i.closest(".grid-wrap");if(!n)return;const s=i.getBoundingClientRect(),a=n.getBoundingClientRect(),o=this._config,r=o.entity?this.hass?.states[o.entity]:void 0,l=String(r?.attributes.unit_of_measurement??""),c=this._resolveAggregate(Os(o.preset));this._popover={anchorX:s.left-a.left+s.width/2,anchorY:s.top-a.top,label:e.rangeLabel,value:ca(e.value,c,"count"===c?"":l),count:e.count}}_hidePopover(){this._popover=void 0}_renderLegend(t){const e=this._config,i=oa(e.color_mode),n=e.entity?this.hass?.states[e.entity]:void 0,s=String(n?.attributes.unit_of_measurement??""),a=this._resolveAggregate(Os(e.preset)),o=`linear-gradient(to bottom, ${Array.from({length:12},(t,n)=>{const s=n/11,a=(100*s).toFixed(1);return`${la(this,s,i,e,!0)} ${a}%`}).join(", ")})`,r=(t.min+t.max)/2;return G`
      <div class="legend-wrap" aria-hidden="true">
        <div class="legend-labels">
          <span>${ha(t.max,a,s)}</span>
          <span>${ha(r,a,s)}</span>
          <span>${ha(t.min,a,s)}</span>
        </div>
        <div
          class="legend-bar"
          style=${xe({background:o})}
        ></div>
      </div>
    `}_renderCell(t,e,i,n,s,a,o){const r=Rs(t.value,n.min,n.max),l=null!==t.value;return G`
      <div
        class=${is({cell:!0,empty:!l,"has-value":l})}
        tabindex=${l?0:K}
        style=${xe({background:la(this,r,e,i,l)})}
        @pointerenter=${e=>this._showPopover(e,t)}
        @pointerleave=${this._hidePopover}
        @focus=${e=>this._showPopover(e,t)}
        @blur=${this._hidePopover}
      >
        ${o&&l?G`<span class="cell-value"
              >${ca(t.value,s,"count"===s?"":a,!0)}</span
            >`:K}
      </div>
    `}_renderTimelineGrid(t,e,i,n,s,a,o,r,l){const c=t.cells[0]??[];return G`
      <div class="heatmap-body" style=${xe({"--heatmap-columns":String(Math.max(1,t.xLabels.length))})}>
        <div class="cells-legend-row">
          <div class="grid-wrap">
            <div class="timeline-grid">
                ${c.map((a,c)=>G`
                    <div class="timeline-slot">
                      ${n?G`<div class="axis x timeline-axis">
                            ${l[c]?t.xLabels[c]:K}
                          </div>`:K}
                      ${this._renderCell(a,i,e,t,o,r,s)}
                    </div>
                  `)}
              </div>
              ${this._renderPopover()}
            </div>
          ${a?this._renderLegend(t):K}
        </div>
      </div>
    `}_renderPopover(){return this._popover?G`
      <div
        class="popover"
        role="tooltip"
        style=${xe({left:`${this._popover.anchorX}px`,top:`${this._popover.anchorY}px`})}
      >
        <div class="popover-label">${this._popover.label}</div>
        <div class="popover-value">${this._popover.value}</div>
        <div class="popover-meta">
          ${this._popover.count} sample${1===this._popover.count?"":"s"}
        </div>
      </div>
    `:K}_renderGrid(t){const e=this._config,i=oa(e.color_mode),n=!1!==e.show_axis_labels,s=!0===e.show_cell_values,a=!1!==e.show_legend,o=e.entity?this.hass?.states[e.entity]:void 0,r=String(o?.attributes.unit_of_measurement??""),l=this._resolveAggregate(Os(e.preset)),c=n?2:1,h=this._xLabelVisible??t.xLabels.map(()=>!0);if(function(t){return 1===t.yKeys.length&&""===t.yKeys[0]}(t))return this._renderTimelineGrid(t,e,i,n,s,a,l,r,h);const d={"--heatmap-columns":String(Math.max(1,t.xLabels.length))},u=`repeat(${t.yLabels.length}, minmax(0, 1fr))`,m=n?`minmax(24px, clamp(32px, 16%, 56px)) repeat(${t.xLabels.length}, minmax(0, 1fr))`:`repeat(${t.xLabels.length}, minmax(0, 1fr))`;return G`
      <div class="heatmap-body" style=${xe(d)}>
        <div class="cells-legend-row">
          <div class="grid-stack">
            ${n?G`
                  <div
                    class="x-axis-row"
                    style=${xe({gridTemplateColumns:m})}
                  >
                    <div class="corner"></div>
                    ${t.xLabels.map((t,e)=>G`
                        <div class="axis x">
                          ${h[e]?t:K}
                        </div>
                      `)}
                  </div>
                `:K}
            <div class="grid-wrap">
              <div
                class="data-grid"
                style=${xe({gridTemplateColumns:m,gridTemplateRows:u})}
              >
                    ${t.cells.flatMap((a,o)=>{const h=o+1;return[n?G`
                            <div
                              class="axis y"
                              style=${xe({gridColumn:"1",gridRow:String(h)})}
                            >
                              ${t.yLabels[o]}
                            </div>
                          `:K,...a.map((n,a)=>{const o=Rs(n.value,t.min,t.max),d=null!==n.value;return G`
                          <div
                            class=${is({cell:!0,empty:!d,"has-value":d})}
                            tabindex=${d?0:K}
                            style=${xe({gridColumn:String(a+c),gridRow:String(h),background:la(this,o,i,e,d)})}
                            @pointerenter=${t=>this._showPopover(t,n)}
                            @pointerleave=${this._hidePopover}
                            @focus=${t=>this._showPopover(t,n)}
                            @blur=${this._hidePopover}
                          >
                            ${s&&d?G`<span class="cell-value"
                                  >${ca(n.value,l,"count"===l?"":r,!0)}</span
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
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||this._config.entity||"Heat Map",i=!1!==this._config.show_current?Kt(t):"";return G`
      <ha-card>
        <div class="stage">
          <div
            class="header"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            ${t?G`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:K}
            <ha-tile-info
              .primary=${e}
              .secondary=${i}
            ></ha-tile-info>
          </div>

          ${this._loading?G`<div class="status">Loading…</div>`:this._error?G`<div class="status error">${this._error}</div>`:this._grid?this._renderGrid(this._grid):G`<div class="status">No data</div>`}
        </div>
      </ha-card>
    `}static{this.styles=[Zt,o`
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
  `]}};ie([St({attribute:!1})],va.prototype,"hass",void 0),ie([zt()],va.prototype,"_config",void 0),ie([zt()],va.prototype,"_grid",void 0),ie([zt()],va.prototype,"_loading",void 0),ie([zt()],va.prototype,"_error",void 0),ie([zt()],va.prototype,"_popover",void 0),ie([zt()],va.prototype,"_xLabelVisible",void 0),va=ie([yt(Hs)],va);var ya=ht(()=>{ma="nvision-reactor-core-card",pa="nvision-reactor-core-card-editor",ga="auto",fa=["sensor","binary_sensor","switch","light","timer"],_a=["sensor","binary_sensor","switch","light","timer"]});function ba(t){const e=t.split(":").map(Number);return 3===e.length?3600*e[0]+60*e[1]+e[2]:2===e.length?60*e[0]+e[1]:Number(t)||0}function xa(t){return void 0!==t&&"unavailable"!==t&&"unknown"!==t&&("on"===t||"true"===t||"open"===t||"home"===t||"active"===t)}function wa(t,e){const i=e.split(".",1)[0];if("light"===i)return"light";if("timer"===i)return"timer";if("switch"===i||Bs(e))return"toggle";const n=t.states[e]?.state;return void 0!==Ze(n)?"numeric":"other"}function $a(t,e,i,n){const s=Ze(t.states[e]?.state);return void 0===s?.35:Je(s,i,n)}function Ma(t,e){const i=t.states[e];if(!i||"active"!==i.state)return 0;const n=function(t){const e=t.attributes.remaining;if("string"!=typeof e)return;let i=ba(e);if("active"===t.state&&t.attributes.finishes_at){const e=new Date(String(t.attributes.finishes_at)).getTime();i=Math.max((e-Date.now())/1e3,0)}return i}(i),s=function(t){const e=t.attributes.duration;return"string"==typeof e?ba(e):0}(i);return void 0===n||s<=0?.55:1-Math.min(1,Math.max(0,n/s))}function ka(t,e,i,n){const s=t.states[e]?.state,a=wa(t,e),o="light"===a?function(t,e){const i=t.states[e];if(!i||"on"!==i.state)return{lightBrightness:0};const n=os(i);return{lightColor:n?`rgb(${n.join(", ")})`:void 0,lightBrightness:ns(i)}}(t,e):{};return{kind:a,isOn:xa(s),numericNorm:$a(t,e,i,n),lightColor:o.lightColor,lightBrightness:o.lightBrightness??0,timerUrgency:"timer"===a?Ma(t,e):0,unavailable:"unavailable"===s||"unknown"===s}}ya(),hi();var Ca=[.42,.58,.72,.84],Sa=[185,198,215,248,278,312,42],Aa=2*Math.PI;function za(t){let e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function Pa(t,e){const i=Math.min(Ca.length,Math.max(2,Math.ceil(Math.sqrt(e)))),n=t%i,s=Math.ceil(e/i);return{shell:n,slot:Math.floor(t/i)%s,slotsOnShell:s}}function Ea(t,e){const i=(14e-6*e+.31*t)%Sa.length,n=Math.floor(i);return Sa[n]+(Sa[(n+1)%Sa.length]-Sa[n])*(i-n)}function Ta(t,e,i,n){const s=ka(e,t.entityId,i,n);t.kind=s.kind,t.isOn=s.isOn,t.numericNorm=s.numericNorm,t.lightColor=s.lightColor,t.lightBrightness=s.lightBrightness,t.timerUrgency=s.timerUrgency,t.unavailable=s.unavailable}function Oa(t,e){const i=function(t,e){return"numeric"===t.kind?Ia(e,t.numericNorm):"light"===t.kind?e*(.008+.024*t.lightBrightness):La(e,t.kind)}(t,e),n=.014*e;return Math.min(3.4,Math.max(.5,n/Math.max(i,.004*e)))}function Ia(t,e){return t*(.006+.028*e)}function La(t,e){switch(e){case"toggle":return.016*t;case"light":return.011*t;case"timer":return.013*t;case"numeric":return.012*t;default:return.01*t}}function qa(t,e){e.push({x:t.x,y:t.y,age:0,seed:t.seed})}function Ra(t,e){if("manual"===(e.mode??"auto")&&e.entities?.length)return e.entities.filter(e=>Boolean(t.states[e]));const i=e.domains?.length?e.domains:fa,n=e.max_particles??32,s=e.exclude??[];return Object.keys(t.states).filter(e=>{const n=e.split(".",1)[0];return!!i.includes(n)&&(!function(t,e){for(const i of e)if(i)if(i.includes("*")){if(new RegExp(`^${i.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*")}$`).test(t))return!0}else if(t===i)return!0;return!1}(e,s)&&"unavailable"!==t.states[e]?.state)}).sort((t,e)=>t.localeCompare(e)).slice(0,n)}function Na(t,e,i,n,s,a){const o=za(e),r=za(`${e}:y`),l=Pa(s,a),c=t.states[e]?.state,h={entityId:e,kind:wa(t,e),seed:o,seedY:r,x:0,y:0,phase:o*Aa,shell:l.shell,slot:l.slot,slotsOnShell:l.slotsOnShell,orbitTilt:o*Aa,orbitRyScale:.62+.32*r,baseOrbitSpeed:85e-5+.0011*o,wobbleSpeed:.0016+.0024*r,vx:0,vy:0,isOn:!1,lastState:c,numericNorm:.35,lightBrightness:0,timerUrgency:0,unavailable:"unavailable"===c||"unknown"===c,placed:!1};return Ta(h,t,i,n),h}function Fa(t,e){const i=t/2,n=Math.min(.22*e,72),s=(e-n)/2,a=Math.max(10,.06*t),o=Math.max(10,.06*e+.35*n),r=Math.max(1,t/2-a),l=Math.max(1,(e-n)/2-o);return{cx:i,cy:s,halfW:r,halfH:l,scale:Math.min(t,e),clampX:r,clampY:l}}function ja(t,e,i,n){const{cx:s,cy:a,halfW:o,halfH:r}=Fa(e,i),l=Ca[t.shell%Ca.length],c=t.slot/Math.max(1,t.slotsOnShell)*Aa+.55*t.seed+t.phase,h=o*l,d=r*l*t.orbitRyScale,u=Math.cos(c)*h,m=Math.sin(c)*d,p=t.orbitTilt;let g=s+u*Math.cos(p)-m*Math.sin(p),f=a+u*Math.sin(p)+m*Math.cos(p);const _=.001*n,v=.028+.018*t.seed;return g+=Math.cos(_*t.wobbleSpeed+11*t.seed)*h*v,f+=Math.sin(_*t.wobbleSpeed*1.23+9*t.seedY)*d*v,{x:g,y:f}}function Ba(t,e,i,n){const s=ja(t,e,i,n);t.x=s.x,t.y=s.y,t.placed=!0}function Da(t,e,i){const n=Ea(t.seed,e);let s=82,a=58;return t.unavailable&&(s=18,a=42),`hsla(${n}, ${s}%, ${a}%, ${i})`}function Ua(t,e,i,n,s,a,o=.5){t.beginPath(),t.arc(e,i,n*(1+a*o),0,Aa),t.fillStyle=s.replace(/[\d.]+\)$/,.07+.1*a+")"),t.fill(),t.beginPath(),t.arc(e,i,n,0,Aa),t.fillStyle=s,t.fill()}function Ha(t,e,i,n){const s=La(i,"toggle"),a=e.isOn?.012:.007,o=Math.sin(n*a+12*e.seed),r=e.isOn?.38+.48*o:.06+.06*o,l=Ea(e.seed,n),c=e.isOn?.92:.34,h=e.unavailable?`hsla(${l}, 18%, 42%, ${.4*c})`:`hsla(${l}, ${e.isOn?90:38}%, ${e.isOn?65:36}%, ${c})`;Ua(t,e.x,e.y,s,h,r)}function Wa(t,e,i,n){const s=e.lightBrightness,a=i*(.008+.024*s),o=e.unavailable?.25:e.isOn?.22+.72*s:.18,r=e.lightColor??(e.isOn?"rgb(255, 183, 77)":Da(e,n,.25));Ua(t,e.x,e.y,a,function(t,e){const i=t.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);return i?`rgba(${i[1]}, ${i[2]}, ${i[3]}, ${e})`:t.match(/hsla?\(([^)]+)\)/)?t.replace(/[\d.]+\)$/,`${e})`):t}(r,o),o)}function Ga(t,e,i,n){const s=e.timerUrgency,a=.005+.048*s,o=Math.sin(n*a+10*e.seed),r=1+o*(.15+.35*s),l=e.unavailable?.25:.35+.25*s,c=(.22+.3*o)*(.3+.7*s)*r,h=La(i,"timer")*r,d=Ea(e.seed,n);Ua(t,e.x,e.y,h,`hsla(${d}, 86%, ${58+12*s}%, ${l})`,c)}function Va(t,e,i,n){const s="numeric"===e.kind?Ia(i,e.numericNorm):La(i,e.kind),a=e.unavailable?.28:.78,o=Da(e,n,a);Ua(t,e.x,e.y,s,o,.65*a)}function Ya(t,e,i,n,s,a,o,r){const l=r?.15:1,c=i?.min??0,h=i?.max??100;if(e)for(const d of t)"timer"!==d.kind&&"light"!==d.kind&&"numeric"!==d.kind&&"toggle"!==d.kind||Ta(d,e,c,h);!function(t,e,i,n,s,a){const{cx:o,cy:r,scale:l,clampX:c,clampY:h}=Fa(e,i),d=.13*l,u=.0032*a,m=.11*a;for(const p of t){p.phase+=p.baseOrbitSpeed*Oa(p,l)*n;const g=ja(p,e,i,s);p.vx+=(g.x-p.x)*u*n,p.vy+=(g.y-p.y)*u*n;for(const e of t){if(e===p)continue;const t=p.x-e.x,i=p.y-e.y,s=Math.hypot(t,i);if(s>.5&&s<d){const e=((d-s)/d)**1.5*m*n;p.vx+=t/s*e,p.vy+=i/s*e}}const f=o-p.x,_=r-p.y,v=Math.hypot(f,_);v>.96*Math.min(c,h)&&(p.vx+=f/v*.006*n*a,p.vy+=_/v*.006*n*a),p.vx*=.88,p.vy*=.88,p.x+=p.vx*n*a*16,p.y+=p.vy*n*a*16,p.x=Math.min(o+c,Math.max(o-c,p.x)),p.y=Math.min(r+h,Math.max(r-h,p.y)),p.placed=!0}}(t,n,s,a,o,l)}function Ka(t,e,i,n,s,a,o=[]){const{cx:r,cy:l,scale:c}=Fa(n,s);t.clearRect(0,0,n,s);const h=t.createRadialGradient(r,l,0,r,l,.72*c);h.addColorStop(0,"hsla(200, 70%, 58%, 0.06)"),h.addColorStop(.35,"hsla(260, 55%, 42%, 0.03)"),h.addColorStop(1,"hsla(0, 0%, 0%, 0)"),t.fillStyle=h,t.fillRect(0,0,n,s),function(t,e,i,n){for(const s of e){const e=s.age/1400,a=i*(.03+.48*e),o=(1-e)**1.2*.11,r=Ea(s.seed,n);t.beginPath(),t.arc(s.x,s.y,a,0,Aa),t.strokeStyle=`hsla(${r}, 86%, 64%, ${o})`,t.lineWidth=1+1.4*(1-e),t.stroke()}}(t,i,c,a);for(const d of e)switch(d.kind){case"toggle":Ha(t,d,c,a);break;case"light":Wa(t,d,c,a);break;case"timer":Ga(t,d,c,a);break;default:Va(t,d,c,a)}o.length&&function(t,e,i,n){for(const s of e){const e=`hsla(${Ea(s.seed,n)}, 78%, 62%, 0.42)`;t.beginPath(),t.moveTo(s.fromX,s.fromY),t.lineTo(s.toX,s.toY),t.strokeStyle=e,t.lineWidth=1,t.stroke(),t.beginPath(),t.arc(s.toX,s.toY,.0045*i,0,Aa),t.fillStyle=e.replace(/[\d.]+\)$/,"0.65)"),t.fill()}}(t,o,c,a);Ua(t,r,l,.012*c*(.55+.12*Math.sin(.0018*a)),`hsla(${Sa[Math.floor(14e-6*a%Sa.length)]}, 88%, 68%, 0.65)`,.5,.3)}var Xa,Qa,Za,Ja=/* @__PURE__ */dt({NvisionReactorCoreCardEditor:()=>Za}),to=ht(()=>{kt(),Bt(),Ht(),ae(),he(),ya(),se(),Xa=[{name:"name",selector:{text:{}}},{name:"mode",required:!0,default:ga,selector:{select:{options:[{value:"auto",label:"Auto-discover entities"},{value:"manual",label:"Manual entity list"}]}}},{name:"max_particles",default:32,selector:{number:{min:4,max:64,mode:"box"}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},oe()],Qa=[{name:"entities",selector:{entity:{multiple:!0,domain:[..._a]}}}],Za=class extends ne{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"mode"===t.name?"Entity source":"entities"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entities"):"max_particles"===t.name?"Maximum particles":"min"===t.name?"Numeric orbit min":"max"===t.name?"Numeric orbit max":re(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={mode:ga,max_particles:32,min:0,max:100,entities:[],...t}}_schema(){return"manual"===this._config?.mode?[...Xa.slice(0,3),...Qa,...Xa.slice(3)]:Xa}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ie([zt()],Za.prototype,"_config",void 0),Za=ie([yt(pa)],Za)});kt(),Bt(),ya(),se(),Dt({type:ma,name:"Nvision Reactor Core",description:"Orbiting sensor particles with reactor-style pulse effects"});var eo=class extends _t{constructor(...t){super(...t),this._nearestIds=["","","",""],this._frameId=0,this._animating=!1,this._lastFrame=0,this._particles=[],this._pulses=[],this._entityKey="",this._cursorX=0,this._cursorY=0,this._actions=new Yt(()=>this,()=>this.hass,()=>this._config),this._onPointerMove=t=>{const e=this._stage;if(!e)return;const i=e.getBoundingClientRect();this._cursorX=t.clientX-i.left,this._cursorY=t.clientY-i.top,this._updateNearest()},this._onPointerLeave=()=>{this._resetCursorToCenter()}}static async getConfigElement(){return await Promise.resolve().then(()=>(to(),Ja)),document.createElement(pa)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)],s=/* @__PURE__ */new Set,a=[];for(const o of n){if(s.has(o))continue;s.add(o);const t=o.split(".",1)[0];if("sensor"!==t&&"binary_sensor"!==t&&"switch"!==t&&"light"!==t&&"timer"!==t||a.push(o),a.length>=8)break}return{type:`custom:${ma}`,mode:ga,entities:a.length?a:void 0,max_particles:32,min:0,max:100}}setConfig(t){this._config={mode:ga,max_particles:32,min:0,max:100,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t},this._entityKey="",this._pulses=[]}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._lastFrame=0,this._startAnimation()}firstUpdated(){this._resetCursorToCenter()}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,super.disconnectedCallback()}updated(t){(t.has("hass")||t.has("_config"))&&this.hass&&this._config&&this._syncParticles(),this._ensureCanvas()}_canvasSize(){const t=this._canvas;return t?{width:t.clientWidth,height:t.clientHeight}:{width:0,height:0}}_syncParticles(t=performance.now()){if(!this.hass||!this._config)return;const{width:e,height:i}=this._canvasSize(),n=function(t,e){if("manual"===(e.mode??"auto")&&e.entities?.length)return e.entities.filter(e=>Boolean(t.states[e]));const i=e.domains?.length?e.domains:[..._a],n=e.max_particles??32;return Object.keys(t.states).filter(t=>i.includes(t.split(".",1)[0])).sort((t,e)=>t.localeCompare(e)).slice(0,n)}(this.hass,this._config).join("|"),s=[this._config.mode,this._config.max_particles,(this._config.domains??[]).join(","),(this._config.exclude??[]).join(","),this._config.min,this._config.max,(this._config.entities??[]).join(",")].join(";");n+s!==this._entityKey&&(this._pulses=[],this._entityKey=n+s),this._particles=function(t,e,i,n,s=0,a=0,o=0){const r=i.min??0,l=i.max??100,c=Ra(e,i),h=new Map(t.map(t=>[t.entityId,t])),d=[];for(let u=0;u<c.length;u+=1){const t=c[u],i=h.get(t);if(i){const s=Pa(u,c.length),a=e.states[t]?.state??"";i.shell=s.shell,i.slot=s.slot,i.slotsOnShell=s.slotsOnShell,void 0!==i.lastState&&a!==i.lastState&&qa(i,n),i.lastState=a,Ta(i,e,r,l),d.push(i);continue}const m=Na(e,t,r,l,u,c.length);s>0&&a>0&&Ba(m,s,a,o),d.push(m)}return d}(this._particles,this.hass,this._config,this._pulses,e,i,t),this._updateNearest()}_resetCursorToCenter(){const{width:t,height:e}=this._canvasSize();this._cursorX=t/2,this._cursorY=e/2,this._updateNearest()}_updateNearest(){const t=function(t,e,i,n){return[...t].filter(t=>t.placed).sort((t,n)=>(t.x-e)**2+(t.y-i)**2-((n.x-e)**2+(n.y-i)**2)).slice(0,n)}(this._particles,this._cursorX,this._cursorY,4).map(t=>t.entityId);for(;t.length<4;)t.push("");t.join("|")!==this._nearestIds.join("|")&&(this._nearestIds=t)}_infoAnchors(){const t=this._stage;if(!t)return[];const e=t.getBoundingClientRect(),i=this.shadowRoot?.querySelectorAll(".info-slot")??[];return Array.from(i).map(t=>{const i=t.getBoundingClientRect();return{x:i.left+i.width/2-e.left,y:i.top+2-e.top}})}_buildConnections(){const t=this._infoAnchors(),e=[];for(let i=0;i<4;i+=1){const n=this._nearestIds[i];if(!n)continue;const s=this._particles.find(t=>t.entityId===n),a=t[i];s?.placed&&a&&e.push({fromX:s.x,fromY:s.y,toX:a.x,toY:a.y,seed:s.seed})}return e}_ensureCanvas(){const t=this._canvas;if(t){if(!this._ctx){if(this._ctx=t.getContext("2d")??void 0,!this._ctx)return;this._resizeObserver=new ResizeObserver(()=>{this._resizeCanvas(),this._syncParticles()}),this._resizeObserver.observe(this._stage??t.parentElement??this)}this._resizeCanvas(),this._syncParticles(),this._animating||(this._lastFrame=0,this._startAnimation())}}_startAnimation(){if(this._animating||!this._ctx)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1,n=this._lastFrame?e-this._lastFrame:16.67;this._lastFrame=e,this._draw(i,n,e),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_draw(t,e,i){const n=this._canvas,s=this._ctx;if(!(n&&s&&this.hass&&this._config))return;const a=n.clientWidth,o=n.clientHeight;if(a<=0||o<=0)return;this._particles.length||this._syncParticles(i);const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;Ya(this._particles,this.hass,this._config,a,o,t,i,r),function(t,e){for(let i=t.length-1;i>=0;i-=1)t[i].age+=e,t[i].age>=1400&&t.splice(i,1)}(this._pulses,e),Ka(s,this._particles,this._pulses,a,o,i,this._buildConnections())}render(){return this._config&&this.hass?G`
      <ha-card aria-label=${this._config.name||"Reactor Core"}>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div
            class="overlay"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${this._actions.bind().pointerdown}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._onPointerLeave}
            @pointercancel=${this._actions.bind().pointercancel}
            @pointermove=${this._onPointerMove}
          >
            <div class="info-bar">
              ${this._nearestIds.map((t,e)=>{const i=t?this.hass.states[t]:void 0;return G`
                  <div
                    class="info-slot ${t?"active":""}"
                    data-slot=${e}
                    @click=${t=>t.stopPropagation()}
                  >
                    ${i?G`
                          <ha-state-icon
                            .hass=${this.hass}
                            .stateObj=${i}
                          ></ha-state-icon>
                          <ha-tile-info
                            .primary=${i.attributes.friendly_name??t}
                            .secondary=${Kt(i)}
                          ></ha-tile-info>
                        `:G`<span class="info-empty">—</span>`}
                  </div>
                `})}
            </div>
          </div>
        </div>
      </ha-card>
    `:K}static{this.styles=[Zt,Jt,te,o`
      :host {
        display: block;
        height: 100%;
      }

      ha-card {
        height: 100%;
        overflow: hidden;
        background: var(--card-background-color);
      }

      .stage {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 160px;
        overflow: hidden;
      }

      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      }

      .overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 8px 6px;
        box-sizing: border-box;
        cursor: crosshair;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.34),
          rgba(0, 0, 0, 0)
        );
      }

      .info-bar {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
        width: 100%;
      }

      .info-slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        min-width: 0;
        min-height: 52px;
        padding: 6px 4px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.28);
        text-align: center;
        pointer-events: none;
      }

      .info-slot.active {
        background: rgba(0, 0, 0, 0.42);
      }

      .info-slot ha-state-icon {
        --mdc-icon-size: 18px;
        opacity: 0.92;
      }

      .info-slot ha-tile-info {
        width: 100%;
        --ha-tile-info-primary-font-size: var(--nv-label-font-size, 0.72rem);
        --ha-tile-info-secondary-font-size: var(--nv-subtitle-font-size, 0.66rem);
      }

      .info-empty {
        font-size: var(--nv-subtitle-font-size, 0.78rem);
        color: var(--secondary-text-color);
        opacity: 0.55;
      }
    `]}};ie([St({attribute:!1})],eo.prototype,"hass",void 0),ie([zt()],eo.prototype,"_config",void 0),ie([zt()],eo.prototype,"_nearestIds",void 0),ie([It(".stage")],eo.prototype,"_stage",void 0),ie([It("canvas")],eo.prototype,"_canvas",void 0),eo=ie([yt(ma)],eo),console.info("%c nvision 0.1.0 ","color: var(--primary-color, #03a9f4); font-weight: 700;");