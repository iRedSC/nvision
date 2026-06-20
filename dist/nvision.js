var t,e,i,n,s,a,r,o,l,c,h,d,u,m,g,p,f,_,v,y,b,x,w,$,M,k,C,S,A,z,E,P,T,I,L,O,R,N,q,F,j,D,U,H,B,G,W,V,Y,Q,K,X,Z,J,tt,et,it,nt,st,at,rt,ot,lt,ct=Object.defineProperty,ht=(t,e)=>()=>(t&&(e=t(t=0)),e),dt=(t,e)=>{let i={};for(var n in t)ct(i,n,{get:t[n],enumerable:!0});return e||ct(i,Symbol.toStringTag,{value:"Module"}),i},ut=ht(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=/* @__PURE__ */new WeakMap,s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}},a=t=>new s("string"==typeof t?t:t+"",void 0,i),r=(t,...e)=>new s(1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]),t,i),o=(i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t}),mt=ht(()=>{ut(),({is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:g}=Object),p=globalThis,f=p.trustedTypes,_=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x},Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=/* @__PURE__ */new WeakMap,$=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&h(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const a=n?.call(this);s?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return o(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n;const a=s.fromAttribute(e,t.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const a=this.constructor;if(!1===n&&(s=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},a){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==s||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=/* @__PURE__ */new Map,$[y("finalized")]=/* @__PURE__ */new Map,v?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.2")});function gt(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}function pt(t,e,i=t,n){if(e===Y)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const a=L(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=pt(t,s._$AS(t,e.values),s,n)),e}var ft,_t,vt,yt,bt,xt,wt=ht(()=>{M=globalThis,k=t=>t,C=M.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,P=`<${E="?"+z}>`,T=document,I=()=>T.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,R=t=>O(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,j=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=G(1),V=G(2),G(3),Y=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),K=/* @__PURE__ */new WeakMap,X=T.createTreeWalker(T,129),Z=(t,e)=>{const i=t.length-1,n=[];let s,a=2===e?"<svg>":3===e?"<math>":"",r=q;for(let o=0;o<i;o++){const e=t[o];let i,l,c=-1,h=0;for(;h<e.length&&(r.lastIndex=h,l=r.exec(e),null!==l);)h=r.lastIndex,r===q?"!--"===l[1]?r=F:void 0!==l[1]?r=j:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=s??q,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?D:'"'===l[3]?H:U):r===H||r===U?r=D:r===F||r===j?r=q:(r=D,s=void 0);const d=r===D&&t[o+1].startsWith("/>")?" ":"";a+=r===q?e+P:c>=0?(n.push(i),e.slice(0,c)+A+e.slice(c)+z+d):e+z+(-2===c?o:d)}return[gt(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]},J=class t{constructor({strings:e,_$litType$:i},n){let s;this.parts=[];let a=0,r=0;const o=e.length-1,l=this.parts,[c,h]=Z(e,i);if(this.el=t.createElement(c,n),X.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=h[r++],i=s.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?nt:"?"===n[1]?st:"@"===n[1]?at:it}),s.removeAttribute(t)}else t.startsWith(z)&&(l.push({type:6,index:a}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(z),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],I()),X.nextNode(),l.push({type:2,index:++a});s.append(t[e],I())}}}else if(8===s.nodeType)if(s.data===E)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(z,t+1));)l.push({type:7,index:a}),t+=z.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}},tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);X.currentNode=n;let s=X.nextNode(),a=0,r=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new et(s,s.nextSibling,this,t):1===o.type?e=new o.ctor(s,o.name,o.strings,this,t):6===o.type&&(e=new rt(s,this,t)),this._$AV.push(e),o=i[++r]}a!==o?.index&&(s=X.nextNode(),a++)}return X.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},et=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=pt(this,t,e),L(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):R(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Q&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(gt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new J(t)),e}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const a of e)s===i.length?i.push(n=new t(this.O(I()),this.O(I()),this,this.options)):n=i[s],n._$AI(a),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},it=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=Q}_$AI(t,e=this,i,n){const s=this.strings;let a=!1;if(void 0===s)t=pt(this,t,e,0),a=!L(t)||t!==this._$AH&&t!==Y,a&&(this._$AH=t);else{const n=t;let r,o;for(t=s[0],r=0;r<s.length-1;r++)o=pt(this,n[i+r],e,r),o===Y&&(o=this._$AH[r]),a||=!L(o)||o!==this._$AH[r],o===Q?t=Q:t!==Q&&(t+=(o??"")+s[r+1]),this._$AH[r]=o}a&&!n&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},nt=class extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}},st=class extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}},at=class extends it{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=pt(this,t,e,0)??Q)===Y)return;const i=this._$AH,n=t===Q&&i!==Q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==Q&&(i===Q||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){pt(this,t)}},ot=M.litHtmlPolyfillSupport,ot?.(J,et),(M.litHtmlVersions??=[]).push("3.3.3"),lt=(t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new et(e.insertBefore(I(),t),t,void 0,i??{})}return s._$AI(t),s}}),$t=ht(()=>{mt(),mt(),wt(),wt(),ft=globalThis,_t=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}},_t._$litElement$=!0,_t.finalized=!0,ft.litElementHydrateSupport?.({LitElement:_t}),vt=ft.litElementPolyfillSupport,vt?.({LitElement:_t}),(ft.litElementVersions??=[]).push("4.2.2")}),Mt=ht(()=>{}),kt=ht(()=>{mt(),wt(),$t(),Mt()}),Ct=ht(()=>{yt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function St(t){return(e,i)=>"object"==typeof i?xt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var At=ht(()=>{mt(),bt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},xt=(t=bt,e,i)=>{const{kind:n,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=/* @__PURE__ */new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)}});function zt(t){return St({...t,state:!0,attribute:!1})}var Et,Pt=ht(()=>{At()}),Tt=ht(()=>{}),It=ht(()=>{Et=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i)});function Lt(t,e){return(i,n,s)=>{const a=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof n?i:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return Et(i,n,{get(){let i=t.call(this);return void 0===i&&(i=a(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return Et(i,n,{get(){return a(this)}})}}var Ot,Rt=ht(()=>{It()});var Nt=ht(()=>{It()}),qt=ht(()=>{}),Ft=ht(()=>{}),jt=ht(()=>{}),Dt=ht(()=>{Ct(),At(),Pt(),Tt(),Rt(),Nt(),qt(),Ft(),jt()});function Ut(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}function Ht(t){if(!t)return"—";const{state:e}=t;if("unavailable"===e||"unknown"===e)return"—";const i=t.attributes?.unit_of_measurement;if("string"==typeof i&&i.length>0){const t=e.trim();return t.endsWith(i)?t:`${t} ${i}`.trim()}return e}kt(),Dt();var Bt,Gt,Wt=r`
  :host {
    --nv-value-font-size: var(--ha-font-size-l);
    --nv-label-font-size: var(--ha-font-size-s);
    --nv-title-font-size: var(--ha-font-size-m);
    --nv-subtitle-font-size: var(--ha-font-size-s);
    --nv-icon-size: 24px;
    --nv-gauge-max-size: min(100%, 160px);
  }
`,Vt=r`
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
`,Qt=ht(()=>{Bt="nvision-blank-card",Gt="nvision-blank-card-editor"});function Kt(t,e,i,n){var s,a=arguments.length,r=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a<3?s(r):a>3?s(e,i,r):s(e,i))||r);return a>3&&r&&Object.defineProperty(e,i,r),r}var Xt=ht(()=>{});function Zt(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}var Jt,te,ee,ie=ht(()=>{}),ne=ht(()=>{kt(),Xt(),Jt=class extends _t{},Kt([St({attribute:!1})],Jt.prototype,"hass",void 0)}),se=/* @__PURE__ */dt({NvisionBlankCardEditor:()=>ee}),ae=ht(()=>{kt(),Dt(),ie(),ne(),Qt(),Xt(),te=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}}],ee=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${te}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],ee.prototype,"_config",void 0),ee=Kt([yt(Gt)],ee)});kt(),Dt(),Qt(),Xt(),Ut({type:Bt,name:"Nvision Blank",description:"Neutral starting point for nvision cards"});var re=class extends _t{static async getConfigElement(){return await Promise.resolve().then(()=>(ae(),se)),document.createElement(Gt)}static getStubConfig(t,e,i){const n=e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Bt}`,entity:n}}setConfig(t){this._config=t}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Ht(t);return W`
      <ha-card>
        <div class="content">
          ${t?W`<ha-state-icon
                .hass=${this.hass}
                .stateObj=${t}
              ></ha-state-icon>`:Q}
          <ha-tile-info
            .primary=${e}
            .secondary=${i}
          ></ha-tile-info>
        </div>
      </ha-card>
    `}static{this.styles=[Wt,Yt,r`
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
  `]}};Kt([St({attribute:!1})],re.prototype,"hass",void 0),Kt([zt()],re.prototype,"_config",void 0),re=Kt([yt(Bt)],re);var oe=1,le=t=>(...e)=>({_$litDirective$:t,values:e}),ce=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};wt();var he,de,ue,me,ge=le(class extends ce{constructor(t){if(super(t),t.type!==oe||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const n=t[i];return null==n?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const n of this.ft)e[n]??(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in e){const t=e[n];if(null!=t){this.ft.add(n);const e="string"==typeof t&&t.endsWith(" !important");n.includes("-")||e?i.setProperty(n,e?t.slice(0,-11):t,e?"important":""):i[n]=t}}return Y}});function pe(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function fe(t,e){if(!t)return e;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}return e}function _e(t,e,i,n){return fe(t,pe(e,i,n))}function ve(t){he??=document.createElement("canvas"),he.width=1,he.height=1;const e=he.getContext("2d");if(!e)return[41,182,246];e.fillStyle="#000000",e.fillStyle=t,e.fillRect(0,0,1,1);const[i,n,s]=e.getImageData(0,0,1,1).data;return[i,n,s]}function ye([t,e,i]){return`rgb(${t}, ${e}, ${i})`}function be(t,e,i){return[Math.round(t[0]+(e[0]-t[0])*i),Math.round(t[1]+(e[1]-t[1])*i),Math.round(t[2]+(e[2]-t[2])*i)]}function xe(t,e){return e>=0?be(t,[255,255,255],e):be(t,[0,0,0],-e)}function we(t,e){const i=ve(pe(t,"--success-color","#4caf50")),n=ve(pe(t,"--warning-color","#ff9800")),s=ve(pe(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return ye(a<=.5?be(i,n,2*a):be(n,s,2*(a-.5)))}var $e,Me,ke=ht(()=>{de="nvision-activity-card",ue="nvision-activity-card-editor",me={still:"idle",unknown:"idle",on_foot:"on_foot",walking:"walking",running:"running",on_bicycle:"bicycle",in_vehicle:"vehicle",automotive:"vehicle",tilting:"tilting"}}),Ce=/* @__PURE__ */dt({NvisionActivityCardEditor:()=>Me}),Se=ht(()=>{kt(),Dt(),ie(),ne(),ke(),Xt(),$e=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"color",selector:{color_rgb:{}}},{name:"speed",required:!0,default:1,selector:{number:{min:.25,max:3,step:.05}}}],Me=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"color"===t.name?"Figure color":"speed"===t.name?"Animation speed":"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={speed:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${$e}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],Me.prototype,"_config",void 0),Me=Kt([yt(ue)],Me)});function Ae(t,e,i){const n=.7*i;return V`
    <circle class="rim" cx=${t} cy=${e} r=${i} />
    <g class="spokes">
      <line x1=${t-i} y1=${e} x2=${t+i} y2=${e} />
      <line x1=${t} y1=${e-i} x2=${t} y2=${e+i} />
      <line x1=${t-n} y1=${e-n} x2=${t+n} y2=${e+n} />
      <line x1=${t-n} y1=${e+n} x2=${t+n} y2=${e-n} />
    </g>
    <circle class="hub" cx=${t} cy=${e} r="3" />
  `}kt(),Dt(),ke(),Xt(),Ut({type:de,name:"Nvision Activity",description:"Animated figure that reacts to detected activity (walking, running, cycling, driving…)"});var ze,Ee,Pe,Te,Ie=class extends _t{static async getConfigElement(){return await Promise.resolve().then(()=>(Se(),Ce)),document.createElement(ue)}static getStubConfig(t,e,i){const n=e.find(t=>t.toLowerCase().includes("activity"))||e.find(t=>t.startsWith("sensor."))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${de}`,entity:n}}setConfig(t){this._config={speed:1,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:4}}_renderScene(t){return"bicycle"===t?this._renderCyclist():"vehicle"===t?this._renderCar():this._renderPerson()}_renderPerson(){return V`
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
    `}_renderCar(){return V`
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
    `}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity,e=t?this.hass.states[t]:void 0,i=(n=e?.state,n?me[n.toLowerCase().trim()]??"idle":"idle");var n;const s=function(t){return t&&"unknown"!==t&&"unavailable"!==t?t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):"Unknown"}(e?.state),a=this._config.name||e?.attributes.friendly_name||"Activity",r=function(t){if(t)return fe(t,"")||void 0}(this._config.color),o=this._config.speed??1;return W`
      <ha-card
        style=${ge({...r?{"--figure-color":r}:{},"--anim-speed":String(o)})}
      >
        <div class="body">
          <div class="stage ${i}">${this._renderScene(i)}</div>
          <p class="title">${a}</p>
          <p class="subtitle">${s}</p>
        </div>
      </ha-card>
    `}static{this.styles=[Wt,r`
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
  `]}};function Le(t){const e=Math.min(1,Math.max(0,t));return e<=0?0:Pe+e*(1-Pe)}function Oe(t,e){if(t){if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}}return Be(e,"--warning-color","")||Be(e,"--state-active-color","")||Be(e,"--primary-color","#ffb300")}function Re(t,e){const i=Le(t);return Math.max(1.5,e*(.008+i*i*.26))}function Ne(t,e){return We(void 0===t?0:function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,e.min??0,e.max??3e3),e.effects_min??0,e.effects_max??1)}function qe(t){return Math.min(1,Math.pow(Math.min(1,Math.max(0,t)),.5)/.75)}function Fe(t,e,i){return i<=e||t<=i?0:Math.min(2,(t-i)/(i-e))}function je(t){return Be(t,"--error-color","#f44336")}function De(t,e,i,n){const s=Math.cos(n),a=Math.sin(n);let r=1/0;return s>.001?r=Math.min(r,(e-t.x)/s):s<-.001&&(r=Math.min(r,-t.x/s)),a>.001?r=Math.min(r,(i-t.y)/a):a<-.001&&(r=Math.min(r,-t.y/a)),Number.isFinite(r)?Math.max(0,r):0}function Ue(t,e){const i=Math.min(1,t),n=1+1.6*Le(i);return Re(i,e)+3*n+n}function He(t,e,i,n,s,a,r){if(s<=0||i<=0||n<=0)return;const o=Math.min(1,s/2),l=Math.min(6,Math.max(1,Math.round(.35+3.5*o))),c=.14+.86*o,h=1.2+1.4*o,d=.48+.28*o,u=Math.min(1,.22+.58*o);for(let m=0;m<l;m+=1){const s=Ye(Math.floor(a*h)+17.3*m)*Math.PI*2,o=De(e,i,n,s),l=Ue(u,o),g=Math.max(0,o-l);if(g<6)continue;const p=g*c*(.5+.5*Ye(a+3.7*m));t.push({from:e,to:{x:e.x+Math.cos(s)*p,y:e.y+Math.sin(s)*p},intensity:u,alphaScale:d,wiggleScale:.5,color:r})}}function Be(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function Ge(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function We(t,e=0,i=1){const n=Math.min(e,i);return n+Math.min(1,Math.max(0,t))*(Math.max(e,i)-n)}function Ve(t,e,i="center"){if(!t)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect();if(s.width<=0||s.height<=0)return;let a=s.left+s.width/2-n.left,r=s.top+s.height/2-n.top;return"top"===i?r=s.top-n.top:"bottom"===i?r=s.bottom-n.top:"left"===i?a=s.left-n.left:"right"===i&&(a=s.right-n.left),{x:a,y:r}}function Ye(t){const e=43758.5453*Math.sin(127.1*t+311.7*t);return e-Math.floor(e)}function Qe(t,e,i,n,s,a,r=1,o=1){const l=Math.min(1,n),c=Le(l),h=Math.hypot(i.x-e.x,i.y-e.y);h<4||function(t,e,i,n,s){if(!(e.length<2)){t.save(),t.lineCap="round",t.lineJoin="round",t.strokeStyle=i,t.shadowColor=i,t.shadowBlur=3*s,t.globalAlpha=n,t.lineWidth=s,t.beginPath(),t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i+=1)t.lineTo(e[i].x,e[i].y);t.stroke(),t.restore()}}(t,function(t,e,i,n,s){const a=[t],r=e.x-t.x,o=e.y-t.y,l=Math.hypot(r,o)||1,c=-o/l,h=r/l,d=r/l,u=o/l;for(let m=1;m<i;m+=1){const e=m/i,l=Math.sin(e*Math.PI),g=2*Ye(s+5.17*m)-1,p=2*Ye(s+9.43*m)-1,f=n*l;a.push({x:t.x+r*e+c*f*g+d*f*.2*p,y:t.y+o*e+h*f*g+u*f*.2*p})}return a.push(e),a}(e,i,Math.min(14,Math.max(5,Math.round(h/14))),Re(l,h)*o,s),a,(.5+.42*c)*r,1+1.6*c)}function Ke(t,e,i,n,s,a,r=1,o=1){n<=0||Math.hypot(i.x-e.x,i.y-e.y)<4||Qe(t,e,i,n,Math.floor(3*s),a,r,o)}Kt([St({attribute:!1})],Ie.prototype,"hass",void 0),Kt([zt()],Ie.prototype,"_config",void 0),Ie=Kt([yt(de)],Ie);var Xe,Ze,Je,ti,ei,ii=ht(()=>{ze=3e3,Ee=.12,Pe=.18,Te=class{constructor(t,e,i,n){this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._host=t,this._getArcs=e,this._getColor=i,this._onFrame=n}attach(t){this._canvas!==t&&(this.detach(),this._canvas=t,this._ctx=t.getContext("2d")??void 0),this._ctx&&this._canvas&&(this._resizeObserver||(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this._host),this._resizeCanvas()),this._animating||(this._lastFrame=0,this._startAnimation()))}detach(){cancelAnimationFrame(this._frameId),this._animating=!1,this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._canvas=void 0,this._ctx=void 0}_resizeCanvas(){const t=this._canvas,e=this._ctx;if(!t||!e)return;const i=t.getBoundingClientRect(),n=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(i.width*n)),t.height=Math.max(1,Math.floor(i.height*n)),e.setTransform(n,0,0,n,0,0)}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this._animating||!this._ctx||!this._canvas?.isConnected)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._onFrame?.(i),this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;const a=this._getArcs(this._phase),r=a.reduce((t,e)=>Math.max(t,Math.min(1,e.intensity)),0);this._phase+=t*(.32+.38*r),i.clearRect(0,0,n,s);const o=this._getColor();for(const l of a)Ke(i,l.from,l.to,l.intensity,this._phase,l.color??o,l.alphaScale??1,l.wiggleScale??1)}}}),ni=ht(()=>{Xe="nvision-liquid-card",Ze="nvision-liquid-card-editor",Je="bubbles"}),si=/* @__PURE__ */dt({NvisionLiquidCardEditor:()=>ei}),ai=ht(()=>{kt(),Dt(),ie(),ne(),ni(),Xt(),ti=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"liquid_style",required:!0,default:Je,selector:{select:{options:[{value:"none",label:"None"},{value:"bubbles",label:"Bubbles"},{value:"electricity",label:"Electricity"}],mode:"dropdown"}}},{name:"level_color",selector:{boolean:{}}},{name:"level_color_invert",selector:{boolean:{}}},{name:"color",selector:{color_rgb:{}}}],ei=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Liquid color":"level_color"===t.name?"Level-based color":"level_color_invert"===t.name?"Invert level colors":"liquid_style"===t.name?"Liquid style":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,liquid_style:Je,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ti}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],ei.prototype,"_config",void 0),ei=Kt([yt(Ze)],ei)});kt(),Dt(),ii(),ni(),Xt(),Ut({type:Xe,name:"Nvision Liquid",description:"Animated liquid background with sensor state in the foreground"});var ri=.92,oi=4,li=.022,ci=2.4,hi=2.5,di=.034,ui=1.7,mi=1.5,gi=.015,pi=3.1;function fi(t,e,i,n,s,a,r){const o=t=>{const e=43758.5453*Math.sin(127.1*(r+t)+311.7*(r+t));return e-Math.floor(e)},l=Math.floor(3*o(0)),c=.08+.82*o(1);if(0===l){const r=vi(0,t,e,i,n,s,a);return{x:0,y:r+(e-r)*c}}if(1===l){const r=vi(t,t,e,i,n,s,a);return{x:t,y:r+(e-r)*c}}const h=o(3)*t;return{x:h,y:vi(h,t,e,i,n,s,a)}}function _i(t,e,i){if(void 0===t||"unavailable"===t||"unknown"===t)return.62;const n=Number(t);return Number.isFinite(n)?Math.min(ri,Math.max(0,function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(n,e,i))):.62}function vi(t,e,i,n,s,a,r){return i*(1-n)+1.2*Math.sin(.65*s)*a+(t-e/2)*r.x*i*.42*.08+Math.sin(t*li+s*ci)*oi*a+Math.sin(t*di+s*ui+1.2)*hi*a+Math.sin(t*gi-s*pi+2.4)*mi*a}var yi,bi,xi,wi,$i,Mi,ki,Ci,Si,Ai,zi,Ei,Pi,Ti=class extends _t{constructor(...t){super(...t),this._frameId=0,this._phase=0,this._lastFrame=0,this._animating=!1,this._bubbles=[],this._lightningPhase=0,this._gravity={x:0,y:1},this._orientationBeta=90,this._orientationGamma=0,this._spawnTimer=0,this._agitation=0,this._mouseAgitation=0,this._mouseAgitationTarget=0,this._scrollElements=[],this._lastTouchY=0,this._lastMouseX=0,this._lastMouseY=0,this._mouseOver=!1,this._displayFill=0,this._targetFill=0,this._onWheel=t=>{this._boostAgitation(Math.min(.45,.0018*Math.abs(t.deltaY)))},this._onScroll=()=>{this._boostAgitation(.34)},this._onTouchMove=t=>{if(!t.touches.length)return;const e=t.touches[0].clientY;this._lastTouchY&&this._boostAgitation(Math.min(.3,Math.abs(e-this._lastTouchY)/100)),this._lastTouchY=e},this._onTouchEnd=()=>{this._lastTouchY=0},this._onPointerMove=t=>{const e=this.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.clientX,n=t.clientY;if(i>=e.left&&i<=e.right&&n>=e.top&&n<=e.bottom){if(this._mouseOver){const t=Math.hypot(i-this._lastMouseX,n-this._lastMouseY);this._mouseAgitationTarget=Math.min(1,this._mouseAgitationTarget+Math.min(.2,.004*t))}this._lastMouseX=i,this._lastMouseY=n,this._mouseOver=!0}else this._mouseOver=!1},this._onDeviceOrientation=t=>{null!=t.beta&&(this._orientationBeta=t.beta),null!=t.gamma&&(this._orientationGamma=t.gamma)}}static async getConfigElement(){return await Promise.resolve().then(()=>(ai(),si)),document.createElement(Ze)}static getStubConfig(t,e,i){const n=e.find(e=>"%"===t.states[e]?.attributes?.unit_of_measurement)||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Xe}`,entity:n,min:0,max:100}}_boostAgitation(t){this._agitation=Math.min(1,this._agitation+t)}_ampScale(t){return this._agitation=Math.max(0,this._agitation-.016*t),this._mouseAgitation+=.055*(this._mouseAgitationTarget-this._mouseAgitation)*t,this._mouseAgitationTarget=Math.max(0,this._mouseAgitationTarget-.02*t),.3+Math.min(1,this._agitation+this._mouseAgitation)*(2.2-.3)}_bindScroll(){window.addEventListener("wheel",this._onWheel,{passive:!0}),window.addEventListener("touchmove",this._onTouchMove,{passive:!0}),window.addEventListener("touchend",this._onTouchEnd,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove,{passive:!0}),window.addEventListener("deviceorientation",this._onDeviceOrientation,{passive:!0}),this._bindScrollParents()}_unbindScroll(){window.removeEventListener("wheel",this._onWheel),window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("deviceorientation",this._onDeviceOrientation);for(const t of this._scrollElements)t.removeEventListener("scroll",this._onScroll);this._scrollElements=[]}_bindScrollParents(){for(const e of this._scrollElements)e.removeEventListener("scroll",this._onScroll);this._scrollElements=[];let t=this;for(;t;){if(t===document.documentElement||t===document.body){t=t.parentElement;continue}const{overflowY:e,overflow:i}=getComputedStyle(t);(/(auto|scroll)/.test(e)||/(auto|scroll)/.test(i))&&(t.addEventListener("scroll",this._onScroll,{passive:!0}),this._scrollElements.push(t)),t=t.parentElement}}setConfig(t){this._config={min:0,max:100,liquid_style:Je,...t}}_liquidStyle(){return this._config?.liquid_style??"bubbles"}_tickGravity(){const t=function(t,e){const i=e*Math.PI/180,n=t*Math.PI/180,s=Math.sin(i),a=Math.sin(n),r=Math.hypot(s,a);return r<.05?{x:0,y:1}:{x:s/r,y:a/r}}(this._orientationBeta,this._orientationGamma);return this._gravity=function(t,e){return{x:t.x+.1*(e.x-t.x),y:t.y+.1*(e.y-t.y)}}(this._gravity,t),this._gravity}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._bindScroll(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._unbindScroll(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}updated(t){if(t.has("_config")){const t=this._config?.entity;t!==this._trackedEntity&&(this._trackedEntity=t,this._trackedState=void 0,this._displayFill=0,this._bubbles=[],this._lightningPhase=0,this._spawnTimer=0)}if(t.has("hass")){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0;if(e!==this._trackedState){this._trackedState=e;const{min:t,max:i}=this._range();this._targetFill=_i(e,t,i)}}this._ensureCanvas(),this._bindScrollParents()}_syncFillTarget(){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0,{min:i,max:n}=this._range(),s=_i(e,i,n);if(void 0===this._trackedState)return this._displayFill=0,this._targetFill=s,this._trackedState=e,void(this._trackedEntity=t);e!==this._trackedState&&(this._trackedState=e,this._targetFill=s)}_tickFill(t){const e=this._targetFill-this._displayFill;if(Math.abs(e)<.002)return this._displayFill=this._targetFill,this._displayFill;const i=Math.sign(e)*Math.min(Math.abs(e),(e>0?.026:.036)*t);return this._displayFill=Math.min(ri,Math.max(0,this._displayFill+i)),this._boostAgitation(Math.min(.05,1.8*Math.abs(i))),this._displayFill}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._phase+=.045*i,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_drawLiquidPath(t,e,i,n,s,a,r){t.beginPath(),t.moveTo(0,i);for(let o=0;o<=e;o+=2)t.lineTo(o,vi(o,e,i,n,s,a,r));t.lineTo(e,i),t.closePath()}_spawnBubble(t,e){if(this._bubbles.length>=14)return;const i=12+Math.random()*(t-24),n=e+20*Math.random();this._bubbles.push({x:i,y:n,radius:2+4*Math.random(),speed:.6+.8*Math.random(),wobble:Math.random()*Math.PI*2,wobbleSpeed:.04+.04*Math.random(),popProgress:0})}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncFillTarget();const a=this._tickFill(t),r=this._ampScale(t),o=this._tickGravity(),l=this._liquidStyle(),c=a/ri,h=this._config?.level_color?we(this,this._config.level_color_invert?1-c:c):_e(this._config?.color,this,"--info-color","#29b6f6"),d=pe(this,"--card-background-color","#1c1c1c"),u=function(t,e){const i=ve(t),n=ve(e);return{surface:ye(xe(i,.3)),mid:ye(i),deep:ye(xe(i,-.38)),glow:ye(be(i,n,.72))}}(h,d);i.clearRect(0,0,n,s);const m=i.createLinearGradient(0,0,0,s);m.addColorStop(0,d),m.addColorStop(.55,d),m.addColorStop(1,u.glow),i.fillStyle=m,i.globalAlpha=.14,i.fillRect(0,0,n,s),i.globalAlpha=1,this._drawLiquidPath(i,n,s,a,this._phase,r,o);const g=s*(1-a),p=i.createLinearGradient(0,g,0,s);p.addColorStop(0,u.surface),p.addColorStop(.35,u.mid),p.addColorStop(1,u.deep),i.fillStyle=p,i.globalAlpha=.5,i.fill(),i.globalAlpha=1,i.beginPath();for(let f=0;f<=n;f+=2){const t=vi(f,n,s,a,this._phase,r,o);0===f?i.moveTo(f,t):i.lineTo(f,t)}if(i.strokeStyle=u.surface,i.globalAlpha=.35,i.lineWidth=1.5,i.stroke(),i.globalAlpha=1,"bubbles"===l){this._spawnTimer+=t,this._spawnTimer>28&&a>.04&&(this._spawnTimer=0,this._spawnBubble(n,s)),this._bubbles=this._bubbles.filter(e=>{if(e.popProgress>0)return e.popProgress+=.06*t,e.popProgress<1;e.wobble+=e.wobbleSpeed*t,e.x-=o.x*e.speed*t,e.y-=o.y*e.speed*t,e.x+=.15*Math.sin(e.wobble);const i=vi(e.x,n,s,a,this._phase,r,o);return e.y-e.radius<=i&&(e.popProgress=.01),!0});for(const t of this._bubbles){if(t.popProgress>0){const e=t.popProgress,n=t.radius*(1+2.2*e);i.beginPath(),i.arc(t.x,t.y,n,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.5*(1-e),i.lineWidth=1.2,i.stroke(),i.globalAlpha=1;continue}i.beginPath(),i.arc(t.x,t.y,t.radius,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.55,i.lineWidth=1.1,i.stroke(),i.globalAlpha=1}}else this._bubbles=[];if("electricity"===l&&a>.04){this._lightningPhase+=t*(.1+.2*a);const e=function(t,e){return{x:t/2,y:e}}(n,s),l=Math.min(3,1+Math.floor(2*a)),c=Math.floor(.65*this._lightningPhase),h=.6*a;for(let t=0;t<l;t+=1)Ke(i,e,fi(n,s,a,this._phase,r,o,c+17*t),h,this._lightningPhase+.85*t,u.mid)}else"electricity"!==l&&(this._lightningPhase=0)}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Ht(t);return W`
      <ha-card>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="content">
            ${t?W`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:Q}
            <ha-tile-info
              .primary=${i}
              .secondary=${e}
            ></ha-tile-info>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Wt,Vt,Yt,r`
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
  `]}};Kt([St({attribute:!1})],Ti.prototype,"hass",void 0),Kt([zt()],Ti.prototype,"_config",void 0),Kt([Lt("canvas")],Ti.prototype,"_canvas",void 0),Ti=Kt([yt(Xe)],Ti);var Ii=ht(()=>{yi="nvision-waveform-card",bi="nvision-waveform-card-editor",xi=.72,wi=.78,$i=.45,Mi="line",ki="balanced",Ci="surge",Si={wave:"surge",echo:"spawn",pulse:"surge",stream:"jet",spectrum:"surge",cascade:"spawn"},Ai={line:"line",circle:"ring",grid:"field"},zi=[{value:"line",label:"Line"},{value:"ring",label:"Ring"},{value:"field",label:"Field"}],Ei=[{value:"compact",label:"Compact"},{value:"balanced",label:"Balanced"},{value:"expansive",label:"Expansive"}],Pi=[{value:"surge",label:"Surge"},{value:"spawn",label:"Spawn"},{value:"jet",label:"Jet stream"}]});function Li(t){return t-Math.floor(t)}Ii();var Oi={compact:{dotScale:.88,span:.94,phaseSpeed:.92},balanced:{dotScale:1,span:.98,phaseSpeed:1},expansive:{dotScale:1.08,span:1,phaseSpeed:1.08}},Ri={line:{compact:16,balanced:24,expansive:32},ring:{compact:18,balanced:24,expansive:32},field:{compact:16,balanced:25,expansive:36}};function Ni(t){return t*t*(3-2*t)}function qi(t,e){const i=Math.max(.08,t),n=Ni(i);return e*(.28+.16*(1-n)+.22*n+.26*Math.max(0,i-.5)**2)}function Fi(t){if("ring"===t.layout){const e=t.width/2,i=t.height/2,n=Math.atan2(t.baseY-i,t.baseX-e);return{primary:{x:-Math.sin(n),y:Math.cos(n)},perp:{x:Math.cos(n),y:Math.sin(n)}}}return{primary:{x:0,y:1},perp:{x:1,y:0}}}function ji(t,e){const{x:i,y:n}=function(t,e,i){const{dot:n,index:s,phase:a,intensity:r,variant:o,height:l}=t;if(r<=.38)return{x:e,y:i};const c=Fi(t),h=(a+1.4*o)*(1+.18*r),d=s+.47*o,u=r*r;let m=Math.sin(h*(3.1+2.4*n.seed)+.85*d)*l*u*.12;if(r>.45){const t=(r-.45)**2;m+=Math.cos(7.4*h+1.7*d+n.phase+o)*l*t*.18,m+=Math.sin(8.2*h+2.1*d)*l*t*.1}return{x:e+c.perp.x*m,y:i+c.perp.y*m}}(t,e.x,e.y);return{...e,x:i,y:n}}function Di(t){const e=function(t){return t.layout?t.layout:t.shape?Ai[t.shape]??"line":Mi}(t),i=function(t){if(t.size)return t.size;const e=t.dot_count;if(void 0!==e){if(e<=18)return"compact";if(e>=30)return"expansive"}return ki}(t),n=function(t){return t.motion?Si[t.motion]??t.motion:t.overlap_dots?"spawn":Ci}(t),s=Oi[i];return{layout:e,size:i,motion:n,dotCount:Ri[e][i],dotScale:s.dotScale,span:s.span,phaseSpeed:s.phaseSpeed}}function Ui(t){return Array.from({length:t},(e,i)=>{const n=.618033988749895*i%1;return{phase:i/t*Math.PI*2,seed:n,sign:n>.5?1:-1}})}function Hi(t){return.5*t}var Bi={spawn:function(t){const{dot:e,phase:i,intensity:n,height:s,width:a,baseX:r,baseY:o,layout:l}=t,c=Ni(n),h=3.6-1.4*c,d=Li(i*(.05+c*c*1.15)*(.06+.22*c)+e.seed*h),u=Math.sin(d*Math.PI),m=qi(n,s)*d*(.85+.45*c),g=e.sign;if("ring"===l){const e=a/2,i=s/2,n=Math.atan2(o-i,r-e),l=.06*Math.min(a,s),h=Math.hypot(r-e,o-i),m=h*(.18+.55*c),p=Math.max(l,h+g*d*m);return ji(t,{x:e+Math.cos(n)*p,y:i+Math.sin(n)*p,radiusMul:.52+u*(.65+.35*c),alphaMul:u*(.32+.58*c)})}const p=Fi(t),f=m*g*(.45+.35*e.seed);return ji(t,{x:r+p.primary.x*f,y:o+p.primary.y*f,radiusMul:.5+u*(.62+.38*c),alphaMul:u*(.32+.58*c)})},jet:function(t){const{dot:e,index:i,count:n,phase:s,intensity:a,height:r,width:o,baseX:l,baseY:c,layout:h}=t,d=Ni(Math.max(.1,a)),u=.16+.78*d,m=u*(.4+1.35*e.seed),g=qi(a,r)*(.035+.1*d),p=Math.sin(s*(1.6+.8*e.seed)+9.4*e.seed)*g,f=m/(1.75*u),_=.58+.32*f+.28*d;if("ring"===h){const a=o/2,l=r/2,c=.06*Math.min(o,r),h=Math.min(o,r)/2-c,u=i/n*Math.PI*2-Math.PI/2+.35*e.seed,g=Li(s*(.05+d*d*.24)*m+2.6*e.seed),p=h+g*(h*(.2+.75*d)),v=1-g;return ji(t,{x:a+Math.cos(u)*p,y:l+Math.sin(u)*p,radiusMul:_*(.88+.22*(1-g)),alphaMul:(.38+.18*f+.32*d)*v})}const v=.12*o,y=c+p;return ji(t,{x:Li(s*m*.32+2.1*e.seed+.04*i)*(o+2*v)-v,y:y,radiusMul:_,alphaMul:.42+.2*f+.4*d})},surge:function(t){const{index:e,count:i,phase:n,intensity:s,height:a,baseX:r,baseY:o,layout:l}=t,c=Ni(s),h=qi(s,a),d=function(t){return.42+.68*Ni(Math.max(.08,t))}(s),u=e%2==0,m=n*d-e/Math.max(1,i-1)*Math.PI*1.6,g=.5*Math.sin(m)+.5,p=h*(.25+g*(.55+.65*c)),f=.06*a,_=.58+g*(.28+.42*c);if("ring"===l){const n=t.width/2,s=t.height/2,a=e/i*Math.PI*2-Math.PI/2,l=u?-1:1,h=Math.hypot(r-n,o-s)+l*p*.85;return ji(t,{x:n+Math.cos(a)*h,y:s+Math.sin(a)*h,radiusMul:_,alphaMul:.4+g*(.28+.48*c)})}return ji(t,{x:r,y:u?f+p:a-f-p,radiusMul:_,alphaMul:.38+g*(.3+.5*c)})}};function Gi(t,e,i,n,s,a,r,o,l){const c=Math.min(r,o),h=function(t,e,i,n,s,a){const r=Math.min(n,s),o=.04*r;switch(t){case"ring":{const t=n/2,o=s/2,l=.06*r,c=(Math.min(n,s)/2-l)*(.92+.06*a),h=(e+.5)/i*Math.PI*2-Math.PI/2;return{x:t+Math.cos(h)*c,y:o+Math.sin(h)*c}}case"field":{const t=Math.ceil(Math.sqrt(i)),o=Math.ceil(i/t),l=.04*r,c=.04*r,h=.028*r*a,d=(n-2*l-h*(t-1))/t,u=(s-2*c-h*(o-1))/o;return{x:l+e%t*(d+h)+d/2,y:c+Math.floor(e/t)*(u+h)+u/2}}default:{const t=n-o,r=(t-o)*a;return{x:(o+t-r)/2+(i<=1?.5:e/(i-1))*r,y:Hi(s)}}}}(t.layout,i,n,r,o,t.span),d={dot:e,index:i,count:n,phase:s,intensity:a,scale:c,baseX:h.x,baseY:h.y,width:r,height:o,variant:l,layout:t.layout};return Bi[t.motion](d)}function Wi(t,e,i,n){const s=.04*i,a=.58*i;let r=1;t<a&&(r=t<=s?.06:.06+.94*Ni((t-s)/(a-s)));const o=.5*n,l=.42*n,c=Math.abs(e-o);let h=1;return t<a&&c<l&&(h=.08+.92*Ni(c/l)),r*h}function Vi(t,e,i,n,s,a){if("ring"===a)return 1;const r=Math.max(4,.06*s),o=Math.max(3,.04*s),l=Math.min(1,Math.max(0,t/r)),c=Math.min(1,Math.max(0,(i-t)/r)),h=Math.min(1,Math.max(0,e/o)),d=Math.min(1,Math.max(0,(n-e)/o));return"line"===a?Math.min(l,c):Math.min(l,c,h,d)}var Yi,Qi,Ki=/* @__PURE__ */dt({NvisionWaveformCardEditor:()=>Qi}),Xi=ht(()=>{kt(),Dt(),ie(),ne(),Ii(),Xt(),Yi=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{type:"grid",name:"",schema:[{name:"layout",required:!0,default:Mi,selector:{select:{options:[...zi],mode:"dropdown"}}},{name:"size",required:!0,default:ki,selector:{select:{options:[...Ei],mode:"dropdown"}}}]},{name:"motion",required:!0,default:Ci,selector:{select:{options:[...Pi],mode:"dropdown"}}},{name:"shake_speed",required:!0,default:$i,selector:{number:{min:.15,max:1.5,step:.05}}}],Qi=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Waveform color":"layout"===t.name?"Layout":"size"===t.name?"Size":"motion"===t.name?"Motion":"shake_speed"===t.name?"Shake speed":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,layout:Mi,size:ki,motion:Ci,shake_speed:$i,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Yi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],Qi.prototype,"_config",void 0),Qi=Kt([yt(bi)],Qi)});kt(),Dt(),Ii(),Xt(),Ut({type:yi,name:"Nvision Waveform",description:"Oscilloscope dot patterns driven by a numeric sensor"});function Zi(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}var Ji,tn,en=class extends _t{constructor(...t){super(...t),this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._displayIntensity=0,this._targetIntensity=0,this._dots=Ui(24)}static async getConfigElement(){return await Promise.resolve().then(()=>(Xi(),Ki)),document.createElement(bi)}static getStubConfig(t,e,i){const n=e.find(e=>void 0!==Zi(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${yi}`,entity:n,min:0,max:100,layout:Mi,size:ki,motion:Ci}}setConfig(t){this._config={min:0,max:100,layout:Mi,size:ki,motion:Ci,shake_at:xi,shake_peak:wi,shake_speed:$i,...t},this._syncDots()}_presets(){return Di(this._config??{})}_syncDots(){const{dotCount:t}=this._presets();this._dots.length!==t&&(this._dots=Ui(t))}_shakeThresholds(){return{shakeAt:this._config?.shake_at??.72,shakePeak:this._config?.shake_peak??.78,shakeSpeed:this._config?.shake_speed??.45}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this.style.transform="",super.disconnectedCallback()}updated(t){(t.has("hass")||t.has("_config"))&&this._syncIntensity(),t.has("_config")&&this._syncDots(),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncIntensity(){const t=this._config?.entity,e=Zi(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetIntensity=void 0!==e?function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(e,i,n):0}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(this._stage??t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0),this._syncDots()}_tickIntensity(t){const e=this._targetIntensity-this._displayIntensity;return Math.abs(e)<.001?this._displayIntensity=this._targetIntensity:this._displayIntensity+=.1*e*t,this._displayIntensity}_applyShake(t){const{shakeAt:e,shakePeak:i}=this._shakeThresholds();if(t<e)return void(this.style.transform="");const n=(t-e)/(1-e)*i,s=this._phase,a=Math.sin(14.3*s)*n*2.4+Math.cos(19.7*s)*n*1.2,r=Math.cos(16.1*s)*n*1.8+Math.sin(11.2*s)*n*.9,o=Math.sin(21.5*s)*n*.4;this.style.transform=`translate(${a}px, ${r}px) rotate(${o}deg)`}_drawDot(t,e,i,n,s,a){a<=.01||(t.save(),t.shadowColor=s,t.shadowBlur=2.4*n,t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=.35*a,t.fill(),t.restore(),t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=a,t.fill(),t.globalAlpha=1)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncIntensity();const a=this._tickIntensity(t),r=Math.max(.12,a),{shakeSpeed:o}=this._shakeThresholds(),l=this._presets(),c=function(t,e,i,n){const s=Math.max(.08,e),a=Ni(s),r=(.014+s*s*.1)*i*n;switch(t){case"jet":{const t=.14+.86*a,e=.12+.78*a;return Math.min(1,.42*t+.48*e+1.4*r+a*a*.35)}case"spawn":{const t=(.06+a*a*.28)*n;return Math.min(1,a*t*4.5+.75*r)}default:return Math.min(1,a*a*1.05*n+.75*r)}}(l.motion,a,l.phaseSpeed,o),h=c>.72?1+2.2*(c-xi):1;this._phase+=t*(.014+r*r*.1)*l.phaseSpeed*h*o,this._applyShake(c);const d=(u=this._config?.color,_e(u,this,"--primary-color","#03a9f4"));var u;const m=Math.min(n,s),g=function(t,e){return Math.max(1.1,.0115*t)*e}(m,l.dotScale);i.clearRect(0,0,n,s);for(let p=0;p<this._dots.length;p+=1){const t=Gi(l,this._dots[p],p,this._dots.length,this._phase,Math.max(.12,a),n,s,0),e=Vi(t.x,t.y,n,s,m,l.layout)*Wi(t.x,t.y,n,s),o=g*t.radiusMul*(.82+.28*r),c=(.3+.52*r)*t.alphaMul*e;this._drawDot(i,t.x,t.y,o,d,c)}}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Waveform",i=Ht(t);return W`
      <ha-card>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div class="content">
            ${t?W`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:Q}
            <ha-tile-info
              .primary=${i}
              .secondary=${e}
            ></ha-tile-info>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Wt,Vt,Yt,r`
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
  `]}};Kt([St({attribute:!1})],en.prototype,"hass",void 0),Kt([zt()],en.prototype,"_config",void 0),Kt([Lt(".stage")],en.prototype,"_stage",void 0),Kt([Lt("canvas")],en.prototype,"_canvas",void 0),en=Kt([yt(yi)],en);var nn,sn,an=ht(()=>{Ji="nvision-air-quality-card",tn="nvision-air-quality-card-editor"}),rn=/* @__PURE__ */dt({NvisionAirQualityCardEditor:()=>sn}),on=ht(()=>{kt(),Dt(),ie(),ne(),an(),Xt(),nn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"color_good",selector:{color_rgb:{}}},{name:"color_warning",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_bad",selector:{color_rgb:{}}},{name:"color_mist",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_clear",selector:{color_rgb:{}}},{name:"color_sky",selector:{color_rgb:{}}}]}],sn=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color_good"===t.name?"Good gauge color":"color_warning"===t.name?"Moderate gauge color":"color_bad"===t.name?"Poor gauge color":"color_mist"===t.name?"Mist color":"color_clear"===t.name?"Clear glow color":"color_sky"===t.name?"Sky glow color":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${nn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],sn.prototype,"_config",void 0),sn=Kt([yt(tn)],sn)});kt(),Dt(),an(),Xt(),Ut({type:Ji,name:"Nvision Air Quality",description:"Gauge with gradient arc, mist when air is poor, crisp glow when clear"});var ln=40*Math.PI,cn=.38,hn=.62;function dn(t){return t>=cn?0:(cn-t)/cn}function un(t){return t<=hn?0:(t-hn)/.38}function mn(t,e){return{good:_e(t?.color_good,e,"--success-color","#4caf50"),warning:_e(t?.color_warning,e,"--warning-color","#ff9800"),bad:_e(t?.color_bad,e,"--error-color","#f44336"),mist:_e(t?.color_mist,e,"--secondary-text-color","#888888"),clear:_e(t?.color_clear,e,"--success-color","#4caf50"),sky:_e(t?.color_sky,e,"--info-color","#2196f3")}}function gn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function pn(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}var fn,_n,vn=0,yn=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._gradientId="aq-gradient-"+ ++vn,this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._displayValue=0,this._targetValue=0,this._mist=[]}static async getConfigElement(){return await Promise.resolve().then(()=>(on(),rn)),document.createElement(tn)}static getStubConfig(t,e,i){const n=e.find(e=>function(t,e){const i=t.states[e];if(!i)return!1;const n=i.attributes?.device_class;return"aqi"===n||"pm25"===n||"pm10"===n||/aqi|air_quality|pm2/i.test(e)}(t,e))||e.find(e=>void 0!==gn(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Ji}`,entity:n,min:0,max:100}}setConfig(t){this._config={min:0,max:100,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0})}updated(t){(t.has("hass")||t.has("_config"))&&(this._syncValue(),this._applyEffectLevels(this._badness(this._targetValue))),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncValue(){const t=this._config?.entity,e=gn(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetValue=void 0!==e?Math.min(n,Math.max(i,e)):i}_tickValue(t){const e=this._targetValue-this._displayValue;return Math.abs(e)<.05?this._displayValue=this._targetValue:this._displayValue+=.08*e*t,this._displayValue}_badness(t){const{min:e,max:i}=this._range();return pn(t,e,i)}_applyEffectLevels(t){this._stage?.style.setProperty("--haze",String(un(t))),this._stage?.style.setProperty("--clarity",String(dn(t)))}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_ensureMist(t,e,i){const n=Math.floor(16*i);for(;this._mist.length<n;)this._mist.push({x:Math.random()*t,y:Math.random()*e,radius:18+42*Math.random(),vx:.22*(Math.random()-.5),vy:-.04-.18*Math.random(),alpha:.04+.1*Math.random()});this._mist.length>n&&(this._mist.length=n)}_drawMist(t,e,i,n,s,a){if(!(n<.08)){this._ensureMist(e,i,n);for(const r of this._mist){r.x+=r.vx*s,r.y+=r.vy*s,r.y+r.radius<0&&(r.y=i+r.radius,r.x=Math.random()*e),r.x<-r.radius&&(r.x=e+r.radius),r.x>e+r.radius&&(r.x=-r.radius);const o=t.createRadialGradient(r.x,r.y,0,r.x,r.y,r.radius);o.addColorStop(0,a),o.addColorStop(1,"rgba(0,0,0,0)"),t.beginPath(),t.arc(r.x,r.y,r.radius,0,2*Math.PI),t.fillStyle=o,t.globalAlpha=r.alpha*n*1.4,t.fill()}t.globalAlpha=1}}_drawClearGlow(t,e,i,n,s,a){if(n<.2)return;const r=.5*e,o=.36*i,l=.94+.06*Math.sin(.5*this._phase),c=.62*Math.min(e,i)*l,h=t.createRadialGradient(r,o,0,r,o,c);h.addColorStop(0,s),h.addColorStop(.55,a),h.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=h,t.globalAlpha=n*n*.1,t.fillRect(0,0,e,i);const d=t.createLinearGradient(0,0,0,.55*i);d.addColorStop(0,a),d.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=d,t.globalAlpha=.06*n,t.fillRect(0,0,e,i),t.globalAlpha=1}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncValue();const a=this._tickValue(t),r=this._badness(a),o=dn(r),l=un(r);this._phase+=.025*t,this._applyEffectLevels(r);const c=mn(this._config,this);i.clearRect(0,0,n,s),this._drawClearGlow(i,n,s,o,c.clear,c.sky),this._drawMist(i,n,s,l,t,c.mist)}_renderGauge(t,e,i,n,s,a){const{min:r,max:o}=this._range(),l=function(t,e,i){return 180*pn(t,e,i)}(t,r,o),c=this._gaugeReady?ln*(1-l/180):ln;return V`
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
          stroke-dasharray=${ln}
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
        ${i?V`<text
              class="unit-text"
              x="0"
              y="6"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              ${i}
            </text>`:Q}
      </svg>
    `}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=gn(t?.state),i=e??this._targetValue,n=this._config.name||t?.attributes.friendly_name||"Air Quality",s=t?.attributes.unit_of_measurement??"",a=void 0!==e?String(Math.round(10*e)/10):"—",r=mn(this._config,this);return W`
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
    `}static{this.styles=[Wt,r`
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
  `]}};Kt([St({attribute:!1})],yn.prototype,"hass",void 0),Kt([zt()],yn.prototype,"_config",void 0),Kt([zt()],yn.prototype,"_gaugeReady",void 0),Kt([Lt("canvas")],yn.prototype,"_canvas",void 0),Kt([Lt(".stage")],yn.prototype,"_stage",void 0),yn=Kt([yt(Ji)],yn);var bn,xn,wn=ht(()=>{fn="nvision-circle-gauge-card",_n="nvision-circle-gauge-card-editor"}),$n=/* @__PURE__ */dt({NvisionCircleGaugeCardEditor:()=>xn}),Mn=ht(()=>{kt(),Dt(),ie(),ne(),wn(),Xt(),bn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{name:"track_color",selector:{color_rgb:{}}},{name:"reverse",selector:{boolean:{}}}],xn=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Gauge color":"track_color"===t.name?"Track color":"reverse"===t.name?"Reverse":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],xn.prototype,"_config",void 0),xn=Kt([yt(_n)],xn)});kt(),Dt(),wn(),Xt(),Ut({type:fn,name:"Nvision Circle Gauge",description:"Full-circle gauge with the value centered, ideal for timers"});var kn=2*Math.PI*40;function Cn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Sn(t){const e=t.split(":").map(Number);return 3===e.length?3600*e[0]+60*e[1]+e[2]:2===e.length?60*e[0]+e[1]:Number(t)||0}function An(t){const e=t.attributes.duration;return"string"==typeof e?Sn(e):0}function zn(t,e,i){return"idle"===t.state&&void 0===e?"Idle":void 0===e?"—":"idle"===t.state&&0===e?"Idle":function(t,e){const i=Math.max(0,Math.floor(t)),n=Math.floor(i/3600),s=Math.floor(i%3600/60),a=i%60,r={};if(n&&(r.hours=n),s&&(r.minutes=s),(a||!n&&!s)&&(r.seconds=a),e?.language&&"undefined"!=typeof Intl&&"DurationFormat"in Intl)return new Intl.DurationFormat(e.language,{style:"narrow",hoursDisplay:n?"always":"auto"}).format(r);const o=[];return n&&o.push(`${n}h`),s&&o.push(`${s}m`),(a||0===o.length)&&o.push(`${a}s`),o.join(" ")}(e,i)}function En(t){return t?.startsWith("timer.")??!1}var Pn,Tn,In=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._tick=0,this._rescaleOnConnect=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(Mn(),$n)),document.createElement(_n)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("timer."))||e.find(e=>function(t,e){const i=t.states[e];return!(!i||!En(e)&&void 0===Cn(i.state))}(t,e))||e[0]||i[0]||Object.keys(t.states)[0],s=t.states[n],a=s&&En(n)&&An(s)||100;return{type:`custom:${fn}`,entity:n,min:0,max:a}}setConfig(t){this._config={min:0,max:100,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:3}}connectedCallback(){super.connectedCallback(),this._syncTimerInterval(),this._rescaleOnConnect&&requestAnimationFrame(()=>{this._rescaleTextSvg(),this._rescaleOnConnect=!1})}disconnectedCallback(){this._clearTimerInterval(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0,this._rescaleTextSvg()})}updated(t){(t.has("hass")||t.has("_config"))&&this._syncTimerInterval(),(t.has("hass")||t.has("_config")||t.has("_tick")||t.has("_gaugeReady"))&&requestAnimationFrame(()=>this._rescaleTextSvg())}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_clearTimerInterval(){void 0!==this._timerInterval&&(clearInterval(this._timerInterval),this._timerInterval=void 0)}_syncTimerInterval(){this._clearTimerInterval();const t=this._config?.entity,e=t?this.hass?.states[t]:void 0;e&&En(t)&&"active"===e.state&&(this._timerInterval=window.setInterval(()=>{this._tick+=1},1e3))}_reading(){this._tick;const t=this._config?.entity,e=t?this.hass?.states[t]:void 0,{min:i,max:n}=this._range();if(!e)return{value:i,valueText:"—",unit:""};if(En(t)){const t=An(e),s=function(t){const e=t.attributes.remaining;if("string"!=typeof e)return;let i=Sn(e);if("active"===t.state&&t.attributes.finishes_at){const e=new Date(String(t.attributes.finishes_at)).getTime();i=Math.max((e-Date.now())/1e3,0)}return i}(e),a=n>i?n:t||n;return{value:s??("idle"===e.state?a:i),valueText:zn(e,s??t,this.hass?.locale),unit:""}}const s=Cn(e.state),a=s??i;if(this.hass?.formatEntityStateToParts){const t=this.hass.formatEntityStateToParts(e);return{value:a,valueText:t.find(t=>"value"===t.type)?.value??(void 0!==s?String(s):"—"),unit:t.find(t=>"unit"===t.type)?.value??""}}const r=String(e.attributes.unit_of_measurement??"");return{value:a,valueText:void 0!==s?String(s):"—",unit:r}}_rescaleTextSvg(){if(!this.isConnected)return void(this._rescaleOnConnect=!0);const t=this.shadowRoot?.querySelector(".text"),e=t?.querySelector(".text-group");if(!t||!e)return;const i=e.getBBox();0===i.width&&0===i.height||t.setAttribute("viewBox",`${i.x} ${i.y} ${i.width} ${i.height}`)}_renderGauge(t,e,i,n,s){const{min:a,max:r}=this._range(),o=this._config?.entity,l=o?this.hass?.states[o]:void 0,c=l&&En(o)?An(l):r,h=function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,a,En(o)&&c>a?c:r),d=this._config?.reverse?1-h:h;return V`
      <svg viewBox="-50 -50 100 100" class="gauge">
        <circle class="track" cx="0" cy="0" r=${40} stroke=${s} />
        <circle
          class="value"
          cx="0"
          cy="0"
          r=${40}
          stroke=${n}
          stroke-dasharray=${kn}
          style=${ge({strokeDashoffset:`${this._gaugeReady?kn*(1-d):this._config?.reverse?0:kn}`})}
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
              </text>`:Q}
        </g>
      </svg>
    `}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity,e=t?this.hass.states[t]:void 0,{value:i,valueText:n,unit:s}=this._reading(),a=_e(this._config.color,this,"--primary-color","#03a9f4");const r=function(t,e){return _e(t,e,"--primary-background-color","#e0e0e0")}(this._config.track_color,this),o=this._config.name||e?.attributes.friendly_name||"Circle Gauge";return W`
      <ha-card>
        <div class="body">
          <div class="gauge-wrap">
            ${this._renderGauge(i,n,s,a,r)}
          </div>
          <p class="title">${o}</p>
        </div>
      </ha-card>
    `}static{this.styles=[Wt,r`
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
  `]}};Kt([St({attribute:!1})],In.prototype,"hass",void 0),Kt([zt()],In.prototype,"_config",void 0),Kt([zt()],In.prototype,"_gaugeReady",void 0),Kt([zt()],In.prototype,"_tick",void 0),In=Kt([yt(fn)],In);var Ln,On,Rn=ht(()=>{Pn="nvision-power-draw-card",Tn="nvision-power-draw-card-editor"}),Nn=/* @__PURE__ */dt({NvisionPowerDrawCardEditor:()=>On}),qn=ht(()=>{kt(),Dt(),ie(),ne(),ii(),Rn(),Xt(),Ln=[{name:"entity",selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:ze,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}}],On=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:ze,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ln}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],On.prototype,"_config",void 0),On=Kt([yt(Tn)],On)});kt(),Dt(),ii(),Rn(),Xt(),Ut({type:Pn,name:"Nvision Power Draw",description:"Power consumption with animated lightning from a plug"});var Fn,jn,Dn=class extends _t{constructor(...t){super(...t),this._displayIntensity=0}static async getConfigElement(){return await Promise.resolve().then(()=>(qn(),Nn)),document.createElement(Tn)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return"power"===i?.attributes.device_class||e.includes("power")||void 0!==Ge(i?.state)})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Pn}`,entity:n,min:0,max:ze}}setConfig(t){this._config={min:0,max:ze,effects_min:0,effects_max:1,...t}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Oe(this._config?.color,this)}_overMaxColor(){return je(this)}_rawValue(){const t=this._config?.entity;return Ge(t?this.hass?.states[t]?.state:void 0)}_overMaxSeverity(){const t=this._rawValue();return void 0===t?0:Fe(t,this._config?.min??0,this._config?.max??3e3)}_syncLightningTheme(){const t=this._overMaxSeverity()>0?this._overMaxColor():this._lightningColor();this.style.setProperty("--lightning-color",t),this.style.setProperty("--lightning-glow",String(qe(this._displayIntensity)))}_targetIntensity(){return Ne(this._rawValue(),this._config??{})}_tickIntensity(t){const e=this._targetIntensity(),i=e-this._displayIntensity;return Math.abs(i)<.001?this._displayIntensity=e:this._displayIntensity+=i*Ee*t,this._syncLightningTheme(),this._displayIntensity}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Te(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>{this._tickIntensity(t)})),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=Ve(this._plug,e,"center"),n=Ve(this._entityIcon,e,"center");if(!i||!n)return[];const s=this._overMaxSeverity(),a=s>0?this._overMaxColor():this._lightningColor(),r=[{from:i,to:n,intensity:this._displayIntensity,color:a}];if(s>0){const{width:i,height:o}=e.getBoundingClientRect();He(r,n,i,o,s,t,a)}return r}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Power Draw",i=Ht(t);return W`
      <ha-card class=${this._overMaxSeverity()>0?"over-max":""}>
        <div class="stage">
          <div class="content">
            ${t?W`<ha-state-icon
                  class="entity-icon glow-icon"
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:Q}
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
    `}static{this.styles=[Wt,Vt,Yt,r`
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
  `]}};Kt([St({attribute:!1})],Dn.prototype,"hass",void 0),Kt([zt()],Dn.prototype,"_config",void 0),Kt([Lt("canvas")],Dn.prototype,"_canvas",void 0),Kt([Lt(".plug")],Dn.prototype,"_plug",void 0),Kt([Lt(".entity-icon")],Dn.prototype,"_entityIcon",void 0),Dn=Kt([yt(Pn)],Dn);var Un,Hn,Bn=ht(()=>{Fn="nvision-power-glance-card",jn="nvision-power-glance-card-editor"}),Gn=/* @__PURE__ */dt({NvisionPowerGlanceCardEditor:()=>Hn}),Wn=ht(()=>{kt(),Dt(),ie(),ne(),ii(),Bn(),Xt(),Un=[{name:"entities",selector:{entity:{multiple:!0,domain:"sensor"}}},{name:"columns",default:3,selector:{number:{min:1,max:6,mode:"box"}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:ze,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}}],Hn=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"entities"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entities"):"columns"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.columns"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={entities:[],columns:3,min:0,max:ze,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Un}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],Hn.prototype,"_config",void 0),Hn=Kt([yt(jn)],Hn)});kt(),Dt(),ii(),Bn(),Xt(),Ut({type:Fn,name:"Nvision Power Glance",description:"Multiple power sensors with lightning from a bottom plug"});var Vn=class extends _t{constructor(...t){super(...t),this._displayIntensities=/* @__PURE__ */new Map}static async getConfigElement(){return await Promise.resolve().then(()=>(Wn(),Gn)),document.createElement(jn)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)],s=/* @__PURE__ */new Set,a=[];for(const r of n){if(s.has(r))continue;s.add(r);const e=t.states[r];if(("power"===e?.attributes.device_class||r.includes("power")||void 0!==Ge(e?.state))&&a.push(r),a.length>=4)break}return{type:`custom:${Fn}`,entities:a.length?a:n.slice(0,3),columns:3,min:0,max:ze}}setConfig(t){this._config={entities:[],columns:3,min:0,max:ze,effects_min:0,effects_max:1,...t},this._syncGridColumns()}_syncGridColumns(){const t=this._config?.columns??3,e=this._config?.entities?.length??0,i=e>0?Math.min(t,e):t;this.style.setProperty("--columns",String(i))}getCardSize(){const t=this._config?.entities?.length??1,e=this._config?.columns??3;return Math.max(1,Math.ceil(t/e))}getGridOptions(){return{columns:6,rows:this.getCardSize()}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncGridColumns(),this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Oe(this._config?.color,this)}_overMaxColor(){return je(this)}_entitySeverity(t){const e=Ge(this.hass?.states[t]?.state);return void 0===e?0:Fe(e,this._config?.min??0,this._config?.max??3e3)}_rawValues(){return this._entityIds().map(t=>Ge(this.hass?.states[t]?.state))}_overMaxSeverity(){return function(t,e){const i=e.min??0,n=e.max??3e3;return t.reduce((t,e)=>Math.max(t,void 0!==e?Fe(e,i,n):0),0)}(this._rawValues(),this._config??{})}_syncLightningTheme(){const t=this._lightningColor(),e=this._overMaxColor(),i=this._overMaxSeverity()>0;this.style.setProperty("--lightning-color",t);const n=this._entityIds(),s=this._entityIcons?Array.from(this._entityIcons):[];let a=qe(0);n.forEach((i,n)=>{const r=qe(this._displayIntensities.get(i)??0);a=Math.max(a,r);const o=s[n];o?.style.setProperty("--lightning-glow",String(r)),o?.style.setProperty("--lightning-color",this._entitySeverity(i)>0?e:t)}),this._plug?.style.setProperty("--lightning-glow",String(a)),this._plug?.style.setProperty("--lightning-color",i?e:t)}_entityIds(){return this._config?.entities??[]}_targetIntensity(t){const e=this.hass?.states[t]?.state;return Ne(Ge(e),this._config??{})}_tickIntensities(t){for(const e of this._entityIds()){const i=this._targetIntensity(e),n=this._displayIntensities.get(e)??0,s=i-n;Math.abs(s)<.001?this._displayIntensities.set(e,i):this._displayIntensities.set(e,n+s*Ee*t)}this._syncLightningTheme()}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Te(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>this._tickIntensities(t))),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=Ve(this._plug,e,"center");if(!i)return[];const n=this._entityIcons?Array.from(this._entityIcons):[],s=this._entityIds(),a=this._lightningColor(),r=this._overMaxColor(),{width:o,height:l}=e.getBoundingClientRect(),c=[];return s.forEach((s,h)=>{const d=Ve(n[h],e,"center"),u=this._displayIntensities.get(s)??0,m=this._entitySeverity(s);if(!d)return;const g=m>0?r:a;c.push({from:i,to:d,intensity:u,color:g}),m>0&&He(c,d,o,l,m,t,r)}),c}render(){if(!this._config||!this.hass)return Q;const t=this._entityIds();return W`
      <ha-card class=${this._overMaxSeverity()>0?"over-max":""}>
        <div class="stage">
          <div class="entities">
            ${t.map(t=>{const e=this.hass.states[t],i=Ht(e);return W`
                <div class="entity">
                  ${e?W`<ha-state-icon
                        class="entity-icon glow-icon"
                        .hass=${this.hass}
                        .stateObj=${e}
                      ></ha-state-icon>`:Q}
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
    `}static{this.styles=[Wt,Yt,r`
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
  `]}};Kt([St({attribute:!1})],Vn.prototype,"hass",void 0),Kt([zt()],Vn.prototype,"_config",void 0),Kt([Lt("canvas")],Vn.prototype,"_canvas",void 0),Kt([Lt(".plug")],Vn.prototype,"_plug",void 0),Kt([function(t){return(e,i)=>Et(e,i,{get(){return(this.renderRoot??(Ot??=document.createDocumentFragment())).querySelectorAll(t)}})}(".entity-icon")],Vn.prototype,"_entityIcons",void 0),Vn=Kt([yt(Fn)],Vn),wt();var Yn=le(class extends ce{constructor(t){if(super(t),t.type!==oe||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=/* @__PURE__ */new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const t=!!e[n];t===this.st.has(n)||this.nt?.has(n)||(t?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return Y}});function Qn(t){const e=t.attributes.brightness;return e&&"on"===t.state?`brightness(${(e+245)/5}%)`:""}function Kn(t){const e=Math.max(1e3,Math.min(4e4,t))/100;let i,n,s;return e<=66?(i=255,n=Math.min(255,Math.max(0,99.4708025861*Math.log(e)-161.1195681661)),s=e<=19?0:Math.min(255,Math.max(0,138.5177312231*Math.log(e-10)-305.0447927307))):(i=Math.min(255,Math.max(0,329.698727446*(e-60)**-.1332047592)),n=Math.min(255,Math.max(0,288.1221695283*(e-60)**-.0755148492)),s=255),[Math.round(i),Math.round(n),Math.round(s)]}function Xn(t){if("on"!==t.state)return;const e=t.attributes.rgb_color;if(e)return e;const i=t.attributes.color_temp_kelvin;if("number"==typeof i)return Kn(i);const n=t.attributes.color_temp;if("number"==typeof n&&n>0)return Kn(Math.round(1e6/n));const s=t.attributes.hs_color;return s?function(t,e,i){const n=e/100,s=i/100,a=(1-Math.abs(2*s-1))*n,r=t/60,o=a*(1-Math.abs(r%2-1));let l=0,c=0,h=0;r>=0&&r<1?(l=a,c=o):r<2?(l=o,c=a):r<3?(c=a,h=o):r<4?(c=o,h=a):r<5?(l=o,h=a):(l=a,h=o);const d=s-a/2;return[Math.round(255*(l+d)),Math.round(255*(c+d)),Math.round(255*(h+d))]}(s[0],s[1],50):void 0}ie();var Zn={tap:"toggle",hold:"more-info",double_tap:"none"},Jn={tap:"tap_action",hold:"hold_action",double_tap:"double_tap_action"};function ts(t,e,i,n){const s=i[Jn[n]],a=s?.action??Zn[n];if("none"===a)return;const r=s?.entity??i.entity;if(r)switch(a){case"toggle":return void e.callService("homeassistant","toggle",{entity_id:r});case"more-info":return void Zt(t,"hass-more-info",{entityId:r});case"navigate":return void(s?.navigation_path&&Zt(t,"hass-navigate",{navigation_path:s.navigation_path}));case"url":return void(s?.url_path&&window.open(s.url_path));case"call-service":if(s?.service){const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target)}return;default:return}}var es,is,ns,ss,as="nvision-light-glow-stack";var rs,os,ls=ht(()=>{es="nvision-light-card",is="nvision-light-card-editor",ns=.72,ss=.62}),cs=/* @__PURE__ */dt({NvisionLightCardEditor:()=>os}),hs=ht(()=>{kt(),Dt(),ie(),ne(),ls(),Xt(),rs=[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"glow_size",required:!0,default:165,selector:{number:{min:20,max:300,step:5,unit_of_measurement:"%"}}},{name:"glow_intensity",required:!0,default:ns,selector:{number:{min:0,max:1,step:.05}}}]},{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}]}],os=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"glow_size"===t.name?"Glow size":"glow_intensity"===t.name?"Glow intensity":"interactions"===t.name?"Interactions":"hold_action"===t.name||"double_tap_action"===t.name?`${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`:this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:ns,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${rs}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Zt(this,"config-changed",{config:t.detail.value})}},Kt([zt()],os.prototype,"_config",void 0),os=Kt([yt(is)],os)});kt(),Dt(),ie(),ls(),Xt(),Ut({type:es,name:"Nvision Light",description:"Light control with ambient color glow"}),function(t){if("undefined"==typeof document||document.getElementById(as))return;const e=document.createElement("style");e.id=as,e.textContent=`\n    hui-card:has(${t}),\n    .card:has(${t}) {\n      position: relative;\n      z-index: 0;\n      overflow: visible;\n    }\n\n    hui-card:not(:has(${t})),\n    .card:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section:has(${t}) {\n      position: relative;\n      z-index: 0;\n    }\n\n    section:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section .meta {\n      position: relative;\n      z-index: 2;\n    }\n\n    .preview:has(${t}) {\n      overflow: visible;\n    }\n  `,document.head.appendChild(e)}(es);var ds,us,ms,gs=class extends _t{constructor(...t){super(...t),this._holdTriggered=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(hs(),cs)),document.createElement(is)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("light."))||i.find(t=>t.startsWith("light."))||Object.keys(t.states).find(t=>t.startsWith("light."))||e[0]||i[0]||"";return{type:`custom:${es}`,entity:n,glow_size:165,glow_intensity:ns}}setConfig(t){if(!t.entity||"light"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the light domain");this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:ns,...t}}getCardSize(){return 5}getGridOptions(){return{columns:6,rows:5,min_rows:3}}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return W`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=Math.round((t.attributes.brightness||0)/255*100),i="on"===t.state,n="unavailable"===t.state||"unknown"===t.state,s=function(t){const e=t.attributes.supported_features;if("number"==typeof e&&1&e)return!0;const i=t.attributes.supported_color_modes;return Boolean(i?.some(t=>"onoff"!==t))}(t),a=function(t){const e=Xn(t);return e?`rgb(${e.join(", ")})`:"on"===t.state?"var(--state-light-active-color, var(--state-active-color, #ffb74d))":"transparent"}(t),r=function(t){if("on"!==t.state)return 0;const e=t.attributes.brightness;return"number"!=typeof e?1:Math.max(0,Math.min(1,e/255))}(t),o=this._config.glow_size??165,l=(this._config.glow_intensity??.72)*r,c=o*ss,h=this._config.name||t.attributes.friendly_name||this._config.entity,d={filter:Qn(t),color:i&&t.attributes.rgb_color?`rgb(${t.attributes.rgb_color.join(",")})`:""},u={"--bulb-color":a,"--nv-glow-size":`${o}%`,"--nv-glow-intensity":String(l),"--nv-glow-spread":`${c}px`};return W`
      <div
        class=${Yn({stage:!0,"state-on":i,"state-off":!i})}
        style=${ge(u)}
      >
        <div class="glow-backdrop" aria-hidden="true"></div>
        <div class="glow-ambient" aria-hidden="true"></div>

        <ha-card class=${Yn({"state-on":i,"state-off":!i})}>
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
                class=${Yn({"light-button":!0,"state-on":i,"state-unavailable":n})}
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
            ${n?W`<div class="state-label">${t.state}</div>`:W`
                  <div class="brightness">
                    ${e}<span class="unit"> %</span>
                  </div>
                `}
            ${h}
          </div>
        </div>
        </ha-card>
      </div>
    `}_handleMoreInfo(){this._config?.entity&&Zt(this,"hass-more-info",{entityId:this._config.entity})}_handleTap(t){if(this._holdTriggered)return this._holdTriggered=!1,void t.preventDefault();this.hass&&this._config&&ts(this,this.hass,this._config,"tap")}_handleDoubleTap(t){t.preventDefault(),this.hass&&this._config&&ts(this,this.hass,this._config,"double_tap")}_handleHoldStart(){window.clearTimeout(this._holdTimer),this._holdTriggered=!1,this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,this.hass&&this._config&&ts(this,this.hass,this._config,"hold")},500)}_handleHoldEnd(){window.clearTimeout(this._holdTimer)}_dragBrightness(t){const e=this.shadowRoot?.querySelector(".brightness");e&&(e.innerHTML=`${t.detail.value}<span class="unit"> %</span>`,e.classList.add("show_brightness")),window.clearTimeout(this._brightnessTimeout),this._brightnessTimeout=window.setTimeout(()=>{e?.classList.remove("show_brightness")},500)}_setBrightness(t){this.hass&&this._config?.entity&&this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:t.detail.value})}static{this.styles=r`
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
  `}};function ps(t){return String(t).padStart(2,"0")}function fs(t,e){const i=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hour12:!1,weekday:"short"}),n=Object.fromEntries(i.formatToParts(new Date(t)).map(t=>[t.type,t.value])),s=ms.indexOf(String(n.weekday))>=0?ms.indexOf(String(n.weekday)):0,a=Number(n.year),r=Number(n.month),o=Number(n.day),l=Number(n.hour)%24,c=`${a}-${ps(r)}-${ps(o)}`,h=fs(_s(t,e,0),e);return{year:a,month:r,day:o,hour:l,weekday:s,dateKey:c,weekKey:`${h.year}-${ps(h.month)}-${ps(h.day)}`,monthKey:`${a}-${ps(r)}`}}function _s(t,e,i){const n=fs(t,e),s=(n.weekday-i+7)%7;return vs(n.year,n.month,n.day,0,0,e)-24*s*60*60*1e3}function vs(t,e,i,n,s,a){const r=Date.UTC(t,e-1,i,n,s,0),o=new Intl.DateTimeFormat("en-US",{timeZone:a,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}),l=Object.fromEntries(o.formatToParts(new Date(r)).map(t=>[t.type,t.value]));return r-(Date.UTC(Number(l.year),Number(l.month)-1,Number(l.day),Number(l.hour),Number(l.minute),0)-r)}function ys(t,e,i,n){if("none"===t)return"";const s=fs(e,i);switch(t){case"hour":return String(s.hour);case"weekday":return String(s.weekday);case"day":return s.dateKey;case"week":return s.weekKey;case"month":return s.monthKey;case"time":return String(Math.floor(e/n)*n);default:return}}function bs(t,e,i,n,s){const a=/* @__PURE__ */new Map;if("none"===t)return{keys:[""],labels:[""],bucketRanges:a};if("hour"===t)return{keys:Array.from({length:24},(t,e)=>String(e)),labels:Array.from({length:24},(t,e)=>function(t){return new Date(Date.UTC(2024,0,1,t,0,0)).toLocaleTimeString([],{hour:"numeric"})}(e)),bucketRanges:a};if("weekday"===t){const t=Array.from({length:7},(t,e)=>(n+e)%7);return{keys:t.map(String),labels:t.map(t=>ms[t]),bucketRanges:a}}if("day"===t){const t=function(t,e){const i=[];let n=vs(fs(t.startMs,e).year,fs(t.startMs,e).month,fs(t.startMs,e).day,0,0,e);for(;n<=t.endMs;){const t=fs(n,e);i.push({key:t.dateKey,label:`${t.month}/${t.day}`}),n+=864e5}return i.slice(-Math.ceil(t.hours/24))}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("week"===t){const t=function(t,e,i){const n=[];let s=_s(t.startMs,e,i);for(;s<=t.endMs;){const t=fs(s,e);n.push({key:t.weekKey,label:`${t.month}/${t.day}`}),s+=6048e5}return n}(e,i,n);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("month"===t){const t=function(t,e){const i=[],n=fs(t.startMs,e);let s=n.year,a=n.month;for(;;){const n=`${s}-${ps(a)}`;if(i.push({key:n,label:`${s}-${ps(a)}`}),a+=1,a>12&&(a=1,s+=1),vs(s,a,1,0,0,e)>t.endMs)break}return i}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}const r=function(t,e){const i=[];let n=Math.floor(t.startMs/e)*e;for(;n<t.endMs;){const t=n+e,s=new Date(n);i.push({key:String(n),start:n,end:t,label:s.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}),n=t}return i}(e,s);for(const o of r)a.set(o.key,`${new Date(o.start).toLocaleString()} – ${new Date(o.end).toLocaleString()}`);return{keys:r.map(t=>t.key),labels:r.map(t=>t.label),bucketRanges:a}}function xs(t,e,i,n,s,a,r){return"time"===t?r.get(i)??s:"none"===e?s:"hour"===t&&"day"===e||"hour"===t&&"weekday"===e||"weekday"===t&&"week"===e?`${a} ${s}`:`${a} · ${s}`}function ws(t,e,i,n,s,a,r=0,o,l){const c=function(t,e=Date.now()){return{hours:t,endMs:e,startMs:e-60*t*60*1e3}}(ds[n]),h=(d=c.hours)<=24||d<=48||d<=336?36e5:864e5;var d;const u=bs(e,c,a,r,h),m=bs(i,c,a,r,h),g=/* @__PURE__ */new Map;for(const y of t){if(y.time<c.startMs||y.time>c.endMs)continue;const t=ys(e,y.time,a,h),n=ys(i,y.time,a,h);if(void 0===t||void 0===n)continue;if(!u.keys.includes(t)||!m.keys.includes(n))continue;const s=`${n}|${t}`,r=g.get(s)??[];r.push(y.value),g.set(s,r)}const p=[],f=m.keys.map((t,n)=>u.keys.map((a,r)=>{const o=g.get(`${t}|${a}`)??[],l=function(t,e){if(!t.length)return null;switch(e){case"sum":case"count":return t.reduce((t,e)=>t+e,0);case"max":return Math.max(...t);case"min":return Math.min(...t);case"last":return t[t.length-1];default:return t.reduce((t,e)=>t+e,0)/t.length}}(o,s);return null!==l&&p.push(l),{value:l,count:o.length,rangeLabel:xs(e,i,a,0,u.labels[r],m.labels[n],u.bucketRanges)}}));let _=o,v=l;if(void 0===_||void 0===v){const t=p.length?Math.min(...p):0,e=p.length?Math.max(...p):1;_=_??t,v=v??(e===t?t+1:e)}return v<=_&&(v=_+1),{xLabels:u.labels,yLabels:m.labels,xKeys:u.keys,yKeys:m.keys,cells:f,min:_,max:v}}Kt([St({attribute:!1})],gs.prototype,"hass",void 0),Kt([zt()],gs.prototype,"_config",void 0),gs=Kt([yt(es)],gs);var $s=ht(()=>{ds={"24h":24,"48h":48,"7d":168,"14d":336,"30d":720,"90d":2160,"365d":8760},us={week_hourly:{x:"hour",y:"day",period:"7d"},daily_rhythm:{x:"hour",y:"weekday",period:"30d"},month_calendar:{x:"weekday",y:"week",period:"90d"},timeline:{x:"time",y:"none",period:"24h"}},ms=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]});function Ms(t){if(!t.callWS)throw new Error("WebSocket API unavailable");return t.callWS.bind(t)}function ks(t){if(!t)return!1;const e=t.split(".",1)[0];return"binary_sensor"===e||"input_boolean"===e}function Cs(t){return ks(t)?"count":"mean"}function Ss(t,e){switch(e){case"mean":default:return t.mean??t.state??void 0;case"sum":return t.sum??t.change??void 0;case"max":return t.max??void 0;case"min":return t.min??void 0;case"last":return t.state??t.mean??void 0;case"count":return t.change??void 0}}async function As(t,e,i,n,s){return function(t,e){const i=[];let n=!1;for(const s of t){const t=1e3*(s.lu??s.lc??0);if(e){const e="on"===s.s;e&&!n&&i.push({time:t,value:1}),n=e;continue}const a=Number(s.s);Number.isFinite(a)&&i.push({time:t,value:a})}return i}((await Ms(t)({type:"history/history_during_period",start_time:i.toISOString(),end_time:n.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0}))[e]??[],s)}async function zs(t,e,i,n,s,a){const r=Ms(t),o="sum"===s?["sum","change"]:"max"===s?["max"]:"min"===s?["min"]:["mean","state"];return function(t,e){const i=[];for(const n of t){const t=Ss(n,e);null!=t&&Number.isFinite(t)&&i.push({time:n.start,value:t})}return i}((await r({type:"recorder/statistics_during_period",start_time:i.toISOString(),end_time:n.toISOString(),statistic_ids:[e],period:a,types:o}))[e]??[],s)}var Es,Ps,Ts,Is,Ls,Os,Rs,Ns,qs,Fs,js,Ds=ht(()=>{}),Us=ht(()=>{$s(),Es="nvision-heat-map-card",Ps="nvision-heat-map-card-editor",Ts="week_hourly",Is="primary",Ls=[{value:"week_hourly",label:"Week hourly"},{value:"daily_rhythm",label:"Daily rhythm"},{value:"month_calendar",label:"Month calendar"},{value:"timeline",label:"Timeline"},{value:"custom",label:"Custom"}],Os=[{value:"24h",label:"24 hours"},{value:"48h",label:"48 hours"},{value:"7d",label:"7 days"},{value:"14d",label:"14 days"},{value:"30d",label:"30 days"},{value:"90d",label:"90 days"},{value:"365d",label:"365 days"}],Rs=[{value:"hour",label:"Hour of day"},{value:"weekday",label:"Day of week"},{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"time",label:"Time"},{value:"none",label:"None"}],Ns=[{value:"mean",label:"Mean"},{value:"sum",label:"Sum"},{value:"max",label:"Maximum"},{value:"min",label:"Minimum"},{value:"count",label:"Count"},{value:"last",label:"Last"}],qs=[{value:"primary",label:"Primary"},{value:"semantic",label:"Semantic"},{value:"temperature",label:"Temperature"}]}),Hs=/* @__PURE__ */dt({NvisionHeatMapCardEditor:()=>js}),Bs=ht(()=>{kt(),Dt(),ie(),ne(),Ds(),Us(),Xt(),Fs=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"preset",required:!0,default:Ts,selector:{select:{options:[...Ls],mode:"dropdown"}}},{name:"period",required:!0,default:"7d",selector:{select:{options:[...Os],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"x_axis",selector:{select:{options:[...Rs],mode:"dropdown"}}},{name:"y_axis",selector:{select:{options:[...Rs],mode:"dropdown"}}}]},{name:"aggregate",selector:{select:{options:[...Ns],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"min",selector:{number:{step:"any"}}},{name:"max",selector:{number:{step:"any"}}}]},{name:"color_mode",required:!0,default:Is,selector:{select:{options:[...qs],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_axis_labels",selector:{boolean:{}}},{name:"show_legend",selector:{boolean:{}}},{name:"show_current",selector:{boolean:{}}}]}],js=class extends Jt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"preset"===t.name?"Preset":"period"===t.name?"Period":"x_axis"===t.name?"X axis":"y_axis"===t.name?"Y axis":"aggregate"===t.name?"Aggregate":"min"===t.name?"Minimum (optional)":"max"===t.name?"Maximum (optional)":"color_mode"===t.name?"Color mode":"show_axis_labels"===t.name?"Axis labels":"show_legend"===t.name?"Legend":"show_current"===t.name?"Current value":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={preset:Ts,period:"7d",color_mode:Is,show_axis_labels:!0,show_legend:!0,show_current:!0,...t,aggregate:t.aggregate??Cs(t.entity)}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Fs}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){const e=t.detail.value;Zt(this,"config-changed",{config:{...e,aggregate:e.aggregate??Cs(e.entity)}})}},Kt([zt()],js.prototype,"_config",void 0),js=Kt([yt(Ps)],js)});function Gs(t,e,i){return"semantic"===i?we(t,e):"temperature"===i?function(t,e){const i=ve(pe(t,"--info-color","#2196f3")),n=ve(pe(t,"--warning-color","#ff9800")),s=ve(pe(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return ye(a<=.5?be(i,n,2*a):be(n,s,2*(a-.5)))}(t,e):"var(--primary-color)"}function Ws(t,e,i){if(null===t)return"—";const n="count"===e?String(Math.round(t)):Number.isInteger(t)?String(t):t.toFixed(1);return i?`${n} ${i}`:n}kt(),Dt(),$s(),Ds(),Us(),Xt(),Ut({type:Es,name:"Nvision Heat Map",description:"Temporal heat map for sensor history and patterns"});var Vs=class extends _t{constructor(...t){super(...t),this._loading=!1,this._fetchVersion=0}static async getConfigElement(){return await Promise.resolve().then(()=>(Bs(),Hs)),document.createElement(Ps)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return e.startsWith("sensor.")||e.startsWith("binary_sensor.")||Number.isFinite(Number(i?.state))})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Es}`,entity:n,preset:Ts,period:"7d",aggregate:Cs(n),color_mode:Is,show_axis_labels:!0,show_legend:!0,show_current:!0}}setConfig(t){this._config={preset:Ts,period:"7d",color_mode:Is,show_axis_labels:!0,show_legend:!0,show_current:!0,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t,aggregate:t.aggregate??Cs(t.entity)}}getCardSize(){const t=this._grid?.yLabels.length??4;return Math.max(3,Math.min(8,Math.ceil(.75*t)+2))}getGridOptions(){const t=this._grid?.yLabels.length??4;return{columns:6,rows:Math.max(3,Math.min(8,Math.ceil(.75*t)+2)),min_rows:3}}updated(t){(t.has("_config")||t.has("hass"))&&this._loadData()}async _loadData(){const t=this._config,e=this.hass,i=t?.entity;if(!t||!e||!i)return this._grid=void 0,void(this._error=void 0);if(!e.callWS)return this._error="History unavailable",void(this._grid=void 0);const n=++this._fetchVersion;this._loading=!0,this._error=void 0;try{const s=function(t,e,i,n){if(t&&"custom"!==t&&us[t]){const e=us[t];return{...e,period:n??e.period}}return{x:e??"hour",y:i??"day",period:n??"7d"}}(t.preset,t.x_axis,t.y_axis,t.period),a=t.aggregate??Cs(i),r=await async function(t,e,i,n){const s=/* @__PURE__ */new Date,a=/* @__PURE__ */new Date(s.getTime()-60*i*60*1e3);if(ks(e)||"count"===n)return As(t,e,a,s,!0);if(i>48)try{const r=await zs(t,e,a,s,n,i>336?"day":"hour");if(r.length>0)return r}catch{}return As(t,e,a,s,!1)}(e,i,ds[s.period],a);if(n!==this._fetchVersion)return;this._grid=ws(r,s.x,s.y,s.period,a,e.config.time_zone,1,t.min,t.max)}catch{if(n!==this._fetchVersion)return;this._error="Could not load history",this._grid=void 0}finally{n===this._fetchVersion&&(this._loading=!1)}}_handleCardAction(t){this.hass&&this._config&&ts(this,this.hass,this._config,t)}_handleHeaderClick(t){t.stopPropagation(),this._handleCardAction("tap")}_handleCardClick(){this._tooltip=void 0,this._handleCardAction("tap")}_handleCellClick(t,e,i,n){t.stopPropagation();const s=this._config,a=s?.entity?this.hass?.states[s.entity]:void 0,r=String(a?.attributes.unit_of_measurement??""),o=Ws(n.value,s?.aggregate,"count"===s?.aggregate?"":r);this._tooltip?.x!==i||this._tooltip?.y!==e?this._tooltip={x:i,y:e,label:n.rangeLabel,value:o,count:n.count}:this._tooltip=void 0}_renderLegend(t){return W`
      <div class="legend" aria-hidden="true">
        ${[0,.5,1].map(e=>W`
            <span
              class="legend-stop"
              style=${ge({background:`color-mix(in srgb, ${Gs(this,e,t)} 85%, var(--card-background-color))`})}
            ></span>
          `)}
      </div>
    `}_renderGrid(t){const e=this._config,i=e.color_mode??"primary",n=!1!==e.show_axis_labels,s=e.entity?this.hass?.states[e.entity]:void 0,a=String(s?.attributes.unit_of_measurement??""),r=n?2:1,o=n?2:1;return W`
      <div class="grid-wrap">
        <div
          class="grid"
          style=${ge({gridTemplateColumns:n?`auto repeat(${t.xLabels.length}, minmax(0, 1fr))`:`repeat(${t.xLabels.length}, minmax(0, 1fr))`,gridTemplateRows:n?`auto repeat(${t.yLabels.length}, minmax(12px, 1fr))`:`repeat(${t.yLabels.length}, minmax(12px, 1fr))`})}
        >
          ${n?W`<div class="corner"></div>`:Q}
          ${n?t.xLabels.map((t,e)=>W`
                  <div
                    class="axis x"
                    style=${ge({gridColumn:String(e+2),gridRow:"1"})}
                  >
                    ${t}
                  </div>
                `):Q}
          ${t.cells.flatMap((s,l)=>[n?W`
                  <div
                    class="axis y"
                    style=${ge({gridColumn:"1",gridRow:String(l+o)})}
                  >
                    ${t.yLabels[l]}
                  </div>
                `:Q,...s.map((n,s)=>{const c=(h=n.value,d=t.min,u=t.max,null===h?0:Math.min(1,Math.max(0,(h-d)/(u-d))));var h,d,u;const m=Gs(this,c,i);return W`
                <button
                  type="button"
                  class=${Yn({cell:!0,active:this._tooltip?.x===s&&this._tooltip?.y===l,empty:null===n.value})}
                  style=${ge({gridColumn:String(s+r),gridRow:String(l+o),background:null===n.value?"var(--state-inactive-color, var(--divider-color))":`color-mix(in srgb, ${m} calc(${Math.max(c,.08)} * 85%), var(--card-background-color))`})}
                  title=${Ws(n.value,e.aggregate,"count"===e.aggregate?"":a)}
                  @click=${t=>this._handleCellClick(t,l,s,n)}
                ></button>
              `})])}
        </div>
        ${this._tooltip?W`
              <div class="tooltip" role="status">
                <div class="tooltip-label">${this._tooltip.label}</div>
                <div class="tooltip-value">${this._tooltip.value}</div>
                <div class="tooltip-meta">
                  ${this._tooltip.count} sample${1===this._tooltip.count?"":"s"}
                </div>
              </div>
            `:Q}
      </div>
    `}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||this._config.entity||"Heat Map",i=!1!==this._config.show_current?Ht(t):"";return W`
      <ha-card @click=${this._handleCardClick}>
        <div class="stage">
          <div class="header" @click=${this._handleHeaderClick}>
            ${t?W`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:Q}
            <ha-tile-info
              .primary=${e}
              .secondary=${i}
            ></ha-tile-info>
          </div>

          ${this._loading?W`<div class="status">Loading…</div>`:this._error?W`<div class="status error">${this._error}</div>`:this._grid?this._renderGrid(this._grid):W`<div class="status">No data</div>`}

          ${!1!==this._config.show_legend&&this._grid?this._renderLegend(this._config.color_mode??"primary"):Q}
        </div>
      </ha-card>
    `}static{this.styles=[Wt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      cursor: pointer;
    }

    .stage {
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100%;
      min-height: 120px;
      padding: var(--ha-space-3, 12px);
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

    .grid-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .grid {
      flex: 1;
      min-height: 0;
      display: grid;
      gap: 2px;
    }

    .corner {
      min-width: 0;
    }

    .axis {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 2px;
    }

    .axis.y {
      justify-content: flex-end;
      padding-right: 4px;
    }

    .cell {
      border: none;
      border-radius: 3px;
      min-height: 12px;
      padding: 0;
      cursor: pointer;
      background: var(--state-inactive-color, var(--divider-color));
      opacity: 0.95;
    }

    .cell.empty {
      opacity: 0.35;
    }

    .cell.active {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
    }

    .tooltip {
      margin-top: 8px;
      padding: 8px 10px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--secondary-background-color, var(--card-background-color));
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
      font-size: var(--nv-label-font-size);
    }

    .tooltip-label {
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }

    .tooltip-value {
      font-size: var(--nv-value-font-size);
      font-weight: var(--ha-font-weight-medium, 500);
    }

    .tooltip-meta {
      margin-top: 2px;
      color: var(--secondary-text-color);
    }

    .legend {
      display: flex;
      gap: 4px;
      justify-content: flex-end;
    }

    .legend-stop {
      width: 28px;
      height: 6px;
      border-radius: 999px;
    }
  `]}};Kt([St({attribute:!1})],Vs.prototype,"hass",void 0),Kt([zt()],Vs.prototype,"_config",void 0),Kt([zt()],Vs.prototype,"_grid",void 0),Kt([zt()],Vs.prototype,"_loading",void 0),Kt([zt()],Vs.prototype,"_error",void 0),Kt([zt()],Vs.prototype,"_tooltip",void 0),Vs=Kt([yt(Es)],Vs),console.info("%c nvision 0.1.0 ","color: var(--primary-color, #03a9f4); font-weight: 700;");