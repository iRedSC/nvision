var t,e,i,n,s,a,o,r,l,c,h,d,u,m,p,g,f,_,v,y,b,x,w,$,M,k,C,S,A,z,P,T,E,I,O,L,N,F,R,q,D,j,B,H,U,G,W,V,Y,K,X,Q,Z,J,tt,et,it,nt,st,at,ot,rt,lt,ct,ht=Object.defineProperty,dt=(t,e)=>()=>(t&&(e=t(t=0)),e),ut=(t,e)=>{let i={};for(var n in t)ht(i,n,{get:t[n],enumerable:!0});return e||ht(i,Symbol.toStringTag,{value:"Module"}),i},mt=dt(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=/* @__PURE__ */new WeakMap,s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}},a=t=>new s("string"==typeof t?t:t+"",void 0,i),o=(t,...e)=>new s(1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]),t,i),r=(i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t}),pt=dt(()=>{mt(),({is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:p}=Object),g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x},Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=/* @__PURE__ */new WeakMap,$=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&h(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const a=n?.call(this);s?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n;const a=s.fromAttribute(e,t.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const a=this.constructor;if(!1===n&&(s=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},a){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==s||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=/* @__PURE__ */new Map,$[y("finalized")]=/* @__PURE__ */new Map,v?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2")});function gt(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}function ft(t,e,i=t,n){if(e===Y)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=ft(t,s._$AS(t,e.values),s,n)),e}var _t,vt,yt,bt,xt,wt,$t=dt(()=>{M=globalThis,k=t=>t,C=M.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,T=`<${P="?"+z}>`,E=document,I=()=>E.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,N=t=>L(t)||"function"==typeof t?.[Symbol.iterator],F="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,D=/>/g,j=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,H=/"/g,U=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=G(1),V=G(2),G(3),Y=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),X=/* @__PURE__ */new WeakMap,Q=E.createTreeWalker(E,129),Z=(t,e)=>{const i=t.length-1,n=[];let s,a=2===e?"<svg>":3===e?"<math>":"",o=R;for(let r=0;r<i;r++){const e=t[r];let i,l,c=-1,h=0;for(;h<e.length&&(o.lastIndex=h,l=o.exec(e),null!==l);)h=o.lastIndex,o===R?"!--"===l[1]?o=q:void 0!==l[1]?o=D:void 0!==l[2]?(U.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=s??R,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,i=l[1],o=void 0===l[3]?j:'"'===l[3]?H:B):o===H||o===B?o=j:o===q||o===D?o=R:(o=j,s=void 0);const d=o===j&&t[r+1].startsWith("/>")?" ":"";a+=o===R?e+T:c>=0?(n.push(i),e.slice(0,c)+A+e.slice(c)+z+d):e+z+(-2===c?r:d)}return[gt(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]},J=class t{constructor({strings:e,_$litType$:i},n){let s;this.parts=[];let a=0,o=0;const r=e.length-1,l=this.parts,[c,h]=Z(e,i);if(this.el=t.createElement(c,n),Q.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=h[o++],i=s.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?nt:"?"===n[1]?st:"@"===n[1]?at:it}),s.removeAttribute(t)}else t.startsWith(z)&&(l.push({type:6,index:a}),s.removeAttribute(t));if(U.test(s.tagName)){const t=s.textContent.split(z),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],I()),Q.nextNode(),l.push({type:2,index:++a});s.append(t[e],I())}}}else if(8===s.nodeType)if(s.data===P)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(z,t+1));)l.push({type:7,index:a}),t+=z.length-1}a++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}},tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??E).importNode(e,!0);Q.currentNode=n;let s=Q.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new et(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new ot(s,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(s=Q.nextNode(),a++)}return Q.currentNode=E,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},et=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ft(this,t,e),O(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):N(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(gt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const a of e)s===i.length?i.push(n=new t(this.O(I()),this.O(I()),this,this.options)):n=i[s],n._$AI(a),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},it=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,n){const s=this.strings;let a=!1;if(void 0===s)t=ft(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==Y,a&&(this._$AH=t);else{const n=t;let o,r;for(t=s[0],o=0;o<s.length-1;o++)r=ft(this,n[i+o],e,o),r===Y&&(r=this._$AH[o]),a||=!O(r)||r!==this._$AH[o],r===K?t=K:t!==K&&(t+=(r??"")+s[o+1]),this._$AH[o]=r}a&&!n&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},nt=class extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}},st=class extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}},at=class extends it{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=ft(this,t,e,0)??K)===Y)return;const i=this._$AH,n=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ot=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ft(this,t)}},rt={M:A,P:z,A:P,C:1,L:Z,R:tt,D:N,V:ft,I:et,H:it,N:st,U:at,B:nt,F:ot},lt=M.litHtmlPolyfillSupport,lt?.(J,et),(M.litHtmlVersions??=[]).push("3.3.3"),ct=(t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new et(e.insertBefore(I(),t),t,void 0,i??{})}return s._$AI(t),s}}),Mt=dt(()=>{pt(),pt(),$t(),$t(),_t=globalThis,vt=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}},vt._$litElement$=!0,vt.finalized=!0,_t.litElementHydrateSupport?.({LitElement:vt}),yt=_t.litElementPolyfillSupport,yt?.({LitElement:vt}),(_t.litElementVersions??=[]).push("4.2.2")}),kt=dt(()=>{}),Ct=dt(()=>{pt(),$t(),Mt(),kt()}),St=dt(()=>{bt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function At(t){return(e,i)=>"object"==typeof i?wt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var zt=dt(()=>{pt(),xt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},wt=(t=xt,e,i)=>{const{kind:n,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=/* @__PURE__ */new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)}});function Pt(t){return At({...t,state:!0,attribute:!1})}var Tt,Et=dt(()=>{zt()}),It=dt(()=>{}),Ot=dt(()=>{Tt=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i)});function Lt(t,e){return(i,n,s)=>{const a=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof n?i:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return Tt(i,n,{get(){let i=t.call(this);return void 0===i&&(i=a(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return Tt(i,n,{get(){return a(this)}})}}var Nt,Ft=dt(()=>{Ot()});var Rt=dt(()=>{Ot()}),qt=dt(()=>{}),Dt=dt(()=>{}),jt=dt(()=>{}),Bt=dt(()=>{St(),zt(),Et(),It(),Ft(),Rt(),qt(),Dt(),jt()});function Ht(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}function Ut(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}Ct(),Bt();var Gt=dt(()=>{});Gt();var Wt={tap:"toggle",hold:"more-info",double_tap:"none"},Vt={tap:"tap_action",hold:"hold_action",double_tap:"double_tap_action"};function Yt(t,e,i,n){const s=i[Vt[n]],a=s?.action??Wt[n];if("none"===a)return;const o=s?.entity??i.entity;if(o)switch(a){case"toggle":return void e.callService("homeassistant","toggle",{entity_id:o});case"more-info":return void Ut(t,"hass-more-info",{entityId:o});case"navigate":return void(s?.navigation_path&&Ut(t,"hass-navigate",{navigation_path:s.navigation_path}));case"url":return void(s?.url_path&&window.open(s.url_path));case"call-service":if(s?.service){const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target)}return;default:return}}var Kt=class{constructor(t,e,i){this.getHost=t,this.getHass=e,this.getConfig=i,this._holdTriggered=!1,this.onKeydown=(t,e)=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._dispatch("tap",e))},this.onTap=(t,e)=>{if(this._holdTriggered)return this._holdTriggered=!1,void t.preventDefault();this._dispatch("tap",e)},this.onDoubleTap=(t,e)=>{t.preventDefault(),this._dispatch("double_tap",e)},this.onHoldStart=t=>{window.clearTimeout(this._holdTimer),this._holdTriggered=!1,this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,this._dispatch("hold",t)},500)},this.onHoldEnd=()=>{window.clearTimeout(this._holdTimer)}}bind(t){return{click:e=>this.onTap(e,t),dblclick:e=>this.onDoubleTap(e,t),keydown:e=>this.onKeydown(e,t),pointerdown:()=>this.onHoldStart(t),pointerup:this.onHoldEnd,pointerleave:this.onHoldEnd,pointercancel:this.onHoldEnd}}_dispatch(t,e){const i=this.getHass(),n=this.getConfig();i&&n&&Yt(this.getHost(),i,e?{...n,entity:e}:n,t)}};function Xt(t){if(!t)return"—";const{state:e}=t;if("unavailable"===e||"unknown"===e)return"—";const i=t.attributes?.unit_of_measurement;if("string"==typeof i&&i.length>0){const t=e.trim();return t.endsWith(i)?t:`${t} ${i}`.trim()}return e}var Qt,Zt,Jt=o`
  :host {
    --nv-value-font-size: var(--ha-font-size-l);
    --nv-label-font-size: var(--ha-font-size-s);
    --nv-title-font-size: var(--ha-font-size-m);
    --nv-subtitle-font-size: var(--ha-font-size-s);
    --nv-icon-size: 24px;
    --nv-gauge-max-size: min(100%, 160px);
  }
`,te=o`
  ha-tile-info {
    --ha-tile-info-primary-font-size: var(--nv-value-font-size);
    --ha-tile-info-primary-font-weight: var(--ha-font-weight-medium, 500);
    --ha-tile-info-secondary-font-size: var(--nv-label-font-size);
    --ha-tile-info-secondary-color: var(--secondary-text-color);
  }
`,ee=o`
  ha-state-icon {
    --mdc-icon-size: var(--nv-icon-size);
  }
`,ie=dt(()=>{Qt="nvision-blank-card",Zt="nvision-blank-card-editor"});function ne(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}var se,ae=dt(()=>{}),oe=dt(()=>{Ct(),ae(),se=class extends vt{},ne([At({attribute:!1})],se.prototype,"hass",void 0)});function re(t="more-info"){return{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:t}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}]}}function le(t,e){return"interactions"===e.name?"Interactions":"hold_action"===e.name||"double_tap_action"===e.name?`${t.localize(`ui.panel.lovelace.editor.card.generic.${e.name}`)} (${t.localize("ui.panel.lovelace.editor.card.config.optional")})`:void 0}var ce,he,de=dt(()=>{}),ue=/* @__PURE__ */ut({NvisionBlankCardEditor:()=>he}),me=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),ie(),ae(),ce=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},re()],he=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ce}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],he.prototype,"_config",void 0),he=ne([bt(Zt)],he)});Ct(),Bt(),ie(),ae(),Ht({type:Qt,name:"Nvision Blank",description:"Neutral starting point for nvision cards"});var pe=class extends vt{constructor(...t){super(...t),this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(me(),ue)),document.createElement(Zt)}static getStubConfig(t,e,i){const n=e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Qt}`,entity:n}}setConfig(t){this._config={tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Xt(t);return W`
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
          ${t?W`<ha-state-icon
                .hass=${this.hass}
                .stateObj=${t}
              ></ha-state-icon>`:K}
          <ha-tile-info
            .primary=${e}
            .secondary=${i}
          ></ha-tile-info>
        </div>
      </ha-card>
    `}static{this.styles=[Jt,ee,o`
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
  `]}};ne([At({attribute:!1})],pe.prototype,"hass",void 0),ne([Pt()],pe.prototype,"_config",void 0),pe=ne([bt(Qt)],pe);var ge=1,fe=2,_e=t=>(...e)=>({_$litDirective$:t,values:e}),ve=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};$t();var ye,be,xe,we,$e=_e(class extends ve{constructor(t){if(super(t),t.type!==ge||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const n=t[i];return null==n?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const n of this.ft)e[n]??(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in e){const t=e[n];if(null!=t){this.ft.add(n);const e="string"==typeof t&&t.endsWith(" !important");n.includes("-")||e?i.setProperty(n,e?t.slice(0,-11):t,e?"important":""):i[n]=t}}return Y}});function Me(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function ke(t,e){if(!t)return e;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}return e}function Ce(t,e,i,n){return ke(t,Me(e,i,n))}function Se(t){ye??=document.createElement("canvas"),ye.width=1,ye.height=1;const e=ye.getContext("2d");if(!e)return[41,182,246];e.fillStyle="#000000",e.fillStyle=t,e.fillRect(0,0,1,1);const[i,n,s]=e.getImageData(0,0,1,1).data;return[i,n,s]}function Ae([t,e,i]){return`rgb(${t}, ${e}, ${i})`}function ze(t,e,i){return[Math.round(t[0]+(e[0]-t[0])*i),Math.round(t[1]+(e[1]-t[1])*i),Math.round(t[2]+(e[2]-t[2])*i)]}function Pe(t,e){return e>=0?ze(t,[255,255,255],e):ze(t,[0,0,0],-e)}function Te(t,e){const i=Se(Me(t,"--success-color","#4caf50")),n=Se(Me(t,"--warning-color","#ff9800")),s=Se(Me(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return Ae(a<=.5?ze(i,n,2*a):ze(n,s,2*(a-.5)))}var Ee,Ie,Oe=dt(()=>{be="nvision-activity-card",xe="nvision-activity-card-editor",we={still:"idle",unknown:"idle",on_foot:"on_foot",walking:"walking",running:"running",on_bicycle:"bicycle",in_vehicle:"vehicle",automotive:"vehicle",tilting:"tilting"}}),Le=/* @__PURE__ */ut({NvisionActivityCardEditor:()=>Ie}),Ne=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),Oe(),ae(),Ee=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"color",selector:{color_rgb:{}}},{name:"speed",required:!0,default:1,selector:{number:{min:.25,max:3,step:.05}}},re()],Ie=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"color"===t.name?"Figure color":"speed"===t.name?"Animation speed":"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={speed:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ee}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],Ie.prototype,"_config",void 0),Ie=ne([bt(xe)],Ie)});function Fe(t,e,i){const n=.7*i;return V`
    <circle class="rim" cx=${t} cy=${e} r=${i} />
    <g class="spokes">
      <line x1=${t-i} y1=${e} x2=${t+i} y2=${e} />
      <line x1=${t} y1=${e-i} x2=${t} y2=${e+i} />
      <line x1=${t-n} y1=${e-n} x2=${t+n} y2=${e+n} />
      <line x1=${t-n} y1=${e+n} x2=${t+n} y2=${e-n} />
    </g>
    <circle class="hub" cx=${t} cy=${e} r="3" />
  `}Ct(),Bt(),Oe(),ae(),Ht({type:be,name:"Nvision Activity",description:"Animated figure that reacts to detected activity (walking, running, cycling, driving…)"});var Re,qe,De,je,Be=class extends vt{constructor(...t){super(...t),this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(Ne(),Le)),document.createElement(xe)}static getStubConfig(t,e,i){const n=e.find(t=>t.toLowerCase().includes("activity"))||e.find(t=>t.startsWith("sensor."))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${be}`,entity:n}}setConfig(t){this._config={speed:1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:4}}_renderScene(t){return"bicycle"===t?this._renderCyclist():"vehicle"===t?this._renderCar():this._renderPerson()}_renderPerson(){return V`
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
          ${Fe(40,120,24)} ${Fe(120,120,24)}
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
            ${Fe(50,126,18)} ${Fe(110,126,18)}
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
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,i=(n=e?.state,n?we[n.toLowerCase().trim()]??"idle":"idle");var n;const s=function(t){return t&&"unknown"!==t&&"unavailable"!==t?t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):"Unknown"}(e?.state),a=this._config.name||e?.attributes.friendly_name||"Activity",o=function(t){if(t)return ke(t,"")||void 0}(this._config.color),r=this._config.speed??1;return W`
      <ha-card
        style=${$e({...o?{"--figure-color":o}:{},"--anim-speed":String(r)})}
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
    `}static{this.styles=[Jt,o`
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
  `]}};function He(t){const e=Math.min(1,Math.max(0,t));return e<=0?0:De+e*(1-De)}function Ue(t,e){if(t){if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}}return Je(e,"--warning-color","")||Je(e,"--state-active-color","")||Je(e,"--primary-color","#ffb300")}function Ge(t,e){const i=He(t);return Math.max(1.5,e*(.008+i*i*.26))}function We(t,e){return ii(void 0===t?0:ei(t,e.min??0,e.max??3e3),e.effects_min??0,e.effects_max??1)}function Ve(t){return Math.min(1,Math.pow(Math.min(1,Math.max(0,t)),.5)/.75)}function Ye(t,e,i){return i<=e||t<=i?0:Math.min(2,(t-i)/(i-e))}function Ke(t){return Je(t,"--error-color","#f44336")}function Xe(t,e,i,n){const s=Math.cos(n),a=Math.sin(n);let o=1/0;return s>.001?o=Math.min(o,(e-t.x)/s):s<-.001&&(o=Math.min(o,-t.x/s)),a>.001?o=Math.min(o,(i-t.y)/a):a<-.001&&(o=Math.min(o,-t.y/a)),Number.isFinite(o)?Math.max(0,o):0}function Qe(t,e){const i=Math.min(1,t),n=1+1.6*He(i);return Ge(i,e)+3*n+n}function Ze(t,e,i,n,s,a,o){if(s<=0||i<=0||n<=0)return;const r=Math.min(1,s/2),l=Math.min(6,Math.max(1,Math.round(.35+3.5*r))),c=.2+.8*r,h=1.2+1.4*r,d=.48+.28*r,u=Math.min(1,.22+.58*r);for(let m=0;m<l;m+=1){const s=si(Math.floor(a*h)+17.3*m)*Math.PI*2,r=Xe(e,i,n,s),l=Qe(u,r),p=Math.max(0,r-l);if(p<6)continue;const g=p*c*(.5+.5*si(a+3.7*m));t.push({from:e,to:{x:e.x+Math.cos(s)*g,y:e.y+Math.sin(s)*g},intensity:u,alphaScale:d,wiggleScale:.5,color:o})}}function Je(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function ti(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function ei(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}function ii(t,e=0,i=1){const n=Math.min(e,i);return n+Math.min(1,Math.max(0,t))*(Math.max(e,i)-n)}function ni(t,e,i="center"){if(!t)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect();if(s.width<=0||s.height<=0)return;let a=s.left+s.width/2-n.left,o=s.top+s.height/2-n.top;return"top"===i?o=s.top-n.top:"bottom"===i?o=s.bottom-n.top:"left"===i?a=s.left-n.left:"right"===i&&(a=s.right-n.left),{x:a,y:o}}function si(t){const e=43758.5453*Math.sin(127.1*t+311.7*t);return e-Math.floor(e)}function ai(t,e,i,n,s,a,o=1,r=1){const l=Math.min(1,n),c=He(l),h=Math.hypot(i.x-e.x,i.y-e.y);h<4||function(t,e,i,n,s){if(!(e.length<2)){t.save(),t.lineCap="round",t.lineJoin="round",t.strokeStyle=i,t.shadowColor=i,t.shadowBlur=3*s,t.globalAlpha=n,t.lineWidth=s,t.beginPath(),t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i+=1)t.lineTo(e[i].x,e[i].y);t.stroke(),t.restore()}}(t,function(t,e,i,n,s){const a=[t],o=e.x-t.x,r=e.y-t.y,l=Math.hypot(o,r)||1,c=-r/l,h=o/l,d=o/l,u=r/l;for(let m=1;m<i;m+=1){const e=m/i,l=Math.sin(e*Math.PI),p=2*si(s+5.17*m)-1,g=2*si(s+9.43*m)-1,f=n*l;a.push({x:t.x+o*e+c*f*p+d*f*.2*g,y:t.y+r*e+h*f*p+u*f*.2*g})}return a.push(e),a}(e,i,Math.min(14,Math.max(5,Math.round(h/14))),Ge(l,h)*r,s),a,(.5+.42*c)*o,1+1.6*c)}function oi(t,e,i,n,s,a,o=1,r=1){n<=0||Math.hypot(i.x-e.x,i.y-e.y)<4||ai(t,e,i,n,Math.floor(3*s),a,o,r)}ne([At({attribute:!1})],Be.prototype,"hass",void 0),ne([Pt()],Be.prototype,"_config",void 0),Be=ne([bt(be)],Be);var ri,li,ci,hi,di,ui=dt(()=>{Re=3e3,qe=.12,De=.18,je=class{constructor(t,e,i,n){this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._host=t,this._getArcs=e,this._getColor=i,this._onFrame=n}attach(t){this._canvas!==t&&(this.detach(),this._canvas=t,this._ctx=t.getContext("2d")??void 0),this._ctx&&this._canvas&&(this._resizeObserver||(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t),this._resizeObserver.observe(t.parentElement??this._host),this._resizeCanvas()),this._animating||(this._lastFrame=0,this._startAnimation()))}detach(){cancelAnimationFrame(this._frameId),this._animating=!1,this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._canvas=void 0,this._ctx=void 0}_resizeCanvas(){const t=this._canvas,e=this._ctx;if(!t||!e)return;const i=t.getBoundingClientRect(),n=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(i.width*n)),t.height=Math.max(1,Math.floor(i.height*n)),e.setTransform(n,0,0,n,0,0)}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this._animating||!this._ctx||!this._canvas?.isConnected)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._onFrame?.(i),this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;const a=this._getArcs(this._phase),o=a.reduce((t,e)=>Math.max(t,Math.min(1,e.intensity)),0);this._phase+=t*(.32+.38*o),i.clearRect(0,0,n,s);const r=this._getColor();for(const l of a)oi(i,l.from,l.to,l.intensity,this._phase,l.color??r,l.alphaScale??1,l.wiggleScale??1)}}}),mi=dt(()=>{ri="nvision-liquid-card",li="nvision-liquid-card-editor",ci="bubbles"}),pi=/* @__PURE__ */ut({NvisionLiquidCardEditor:()=>di}),gi=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),mi(),ae(),hi=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"liquid_style",required:!0,default:ci,selector:{select:{options:[{value:"none",label:"None"},{value:"bubbles",label:"Bubbles"},{value:"electricity",label:"Electricity"}],mode:"dropdown"}}},{name:"level_color",selector:{boolean:{}}},{name:"level_color_invert",selector:{boolean:{}}},{name:"color",selector:{color_rgb:{}}},re()],di=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Liquid color":"level_color"===t.name?"Level-based color":"level_color_invert"===t.name?"Invert level colors":"liquid_style"===t.name?"Liquid style":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,liquid_style:ci,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${hi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],di.prototype,"_config",void 0),di=ne([bt(li)],di)});Ct(),Bt(),ui(),mi(),ae(),Ht({type:ri,name:"Nvision Liquid",description:"Animated liquid background with sensor state in the foreground"});var fi=.92,_i=4,vi=.022,yi=2.4,bi=2.5,xi=.034,wi=1.7,$i=1.5,Mi=.015,ki=3.1;function Ci(t,e,i,n,s,a,o){const r=t=>{const e=43758.5453*Math.sin(127.1*(o+t)+311.7*(o+t));return e-Math.floor(e)},l=Math.floor(3*r(0)),c=.08+.82*r(1);if(0===l){const o=Ai(0,t,e,i,n,s,a);return{x:0,y:o+(e-o)*c}}if(1===l){const o=Ai(t,t,e,i,n,s,a);return{x:t,y:o+(e-o)*c}}const h=r(3)*t;return{x:h,y:Ai(h,t,e,i,n,s,a)}}function Si(t,e,i){if(void 0===t||"unavailable"===t||"unknown"===t)return.62;const n=Number(t);return Number.isFinite(n)?Math.min(fi,Math.max(0,function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(n,e,i))):.62}function Ai(t,e,i,n,s,a,o){return i*(1-n)+1.2*Math.sin(.65*s)*a+(t-e/2)*o.x*i*.42*.08+Math.sin(t*vi+s*yi)*_i*a+Math.sin(t*xi+s*wi+1.2)*bi*a+Math.sin(t*Mi-s*ki+2.4)*$i*a}var zi,Pi,Ti,Ei,Ii,Oi,Li,Ni,Fi,Ri,qi,Di,ji,Bi=class extends vt{constructor(...t){super(...t),this._actions=new Kt(()=>this,()=>this.hass,()=>this._config),this._frameId=0,this._phase=0,this._lastFrame=0,this._animating=!1,this._bubbles=[],this._lightningPhase=0,this._gravity={x:0,y:1},this._orientationBeta=90,this._orientationGamma=0,this._spawnTimer=0,this._agitation=0,this._mouseAgitation=0,this._mouseAgitationTarget=0,this._scrollElements=[],this._lastTouchY=0,this._lastMouseX=0,this._lastMouseY=0,this._mouseOver=!1,this._displayFill=0,this._targetFill=0,this._onWheel=t=>{this._boostAgitation(Math.min(.45,.0018*Math.abs(t.deltaY)))},this._onScroll=()=>{this._boostAgitation(.34)},this._onTouchMove=t=>{if(!t.touches.length)return;const e=t.touches[0].clientY;this._lastTouchY&&this._boostAgitation(Math.min(.3,Math.abs(e-this._lastTouchY)/100)),this._lastTouchY=e},this._onTouchEnd=()=>{this._lastTouchY=0},this._onPointerMove=t=>{const e=this.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.clientX,n=t.clientY;if(i>=e.left&&i<=e.right&&n>=e.top&&n<=e.bottom){if(this._mouseOver){const t=Math.hypot(i-this._lastMouseX,n-this._lastMouseY);this._mouseAgitationTarget=Math.min(1,this._mouseAgitationTarget+Math.min(.2,.004*t))}this._lastMouseX=i,this._lastMouseY=n,this._mouseOver=!0}else this._mouseOver=!1},this._onDeviceOrientation=t=>{null!=t.beta&&(this._orientationBeta=t.beta),null!=t.gamma&&(this._orientationGamma=t.gamma)}}static async getConfigElement(){return await Promise.resolve().then(()=>(gi(),pi)),document.createElement(li)}static getStubConfig(t,e,i){const n=e.find(e=>"%"===t.states[e]?.attributes?.unit_of_measurement)||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${ri}`,entity:n,min:0,max:100}}_boostAgitation(t){this._agitation=Math.min(1,this._agitation+t)}_ampScale(t){return this._agitation=Math.max(0,this._agitation-.016*t),this._mouseAgitation+=.055*(this._mouseAgitationTarget-this._mouseAgitation)*t,this._mouseAgitationTarget=Math.max(0,this._mouseAgitationTarget-.02*t),.3+Math.min(1,this._agitation+this._mouseAgitation)*(2.2-.3)}_bindScroll(){window.addEventListener("wheel",this._onWheel,{passive:!0}),window.addEventListener("touchmove",this._onTouchMove,{passive:!0}),window.addEventListener("touchend",this._onTouchEnd,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove,{passive:!0}),window.addEventListener("deviceorientation",this._onDeviceOrientation,{passive:!0}),this._bindScrollParents()}_unbindScroll(){window.removeEventListener("wheel",this._onWheel),window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("deviceorientation",this._onDeviceOrientation);for(const t of this._scrollElements)t.removeEventListener("scroll",this._onScroll);this._scrollElements=[]}_bindScrollParents(){for(const e of this._scrollElements)e.removeEventListener("scroll",this._onScroll);this._scrollElements=[];let t=this;for(;t;){if(t===document.documentElement||t===document.body){t=t.parentElement;continue}const{overflowY:e,overflow:i}=getComputedStyle(t);(/(auto|scroll)/.test(e)||/(auto|scroll)/.test(i))&&(t.addEventListener("scroll",this._onScroll,{passive:!0}),this._scrollElements.push(t)),t=t.parentElement}}setConfig(t){this._config={min:0,max:100,liquid_style:ci,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}_liquidStyle(){return this._config?.liquid_style??"bubbles"}_tickGravity(){const t=function(t,e){const i=e*Math.PI/180,n=t*Math.PI/180,s=Math.sin(i),a=Math.sin(n),o=Math.hypot(s,a);return o<.05?{x:0,y:1}:{x:s/o,y:a/o}}(this._orientationBeta,this._orientationGamma);return this._gravity=function(t,e){return{x:t.x+.1*(e.x-t.x),y:t.y+.1*(e.y-t.y)}}(this._gravity,t),this._gravity}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._bindScroll(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._unbindScroll(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}updated(t){if(t.has("_config")){const t=this._config?.entity;t!==this._trackedEntity&&(this._trackedEntity=t,this._trackedState=void 0,this._displayFill=0,this._bubbles=[],this._lightningPhase=0,this._spawnTimer=0)}if(t.has("hass")){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0;if(e!==this._trackedState){this._trackedState=e;const{min:t,max:i}=this._range();this._targetFill=Si(e,t,i)}}this._ensureCanvas(),this._bindScrollParents()}_syncFillTarget(){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0,{min:i,max:n}=this._range(),s=Si(e,i,n);if(void 0===this._trackedState)return this._displayFill=0,this._targetFill=s,this._trackedState=e,void(this._trackedEntity=t);e!==this._trackedState&&(this._trackedState=e,this._targetFill=s)}_tickFill(t){const e=this._targetFill-this._displayFill;if(Math.abs(e)<.002)return this._displayFill=this._targetFill,this._displayFill;const i=Math.sign(e)*Math.min(Math.abs(e),(e>0?.026:.036)*t);return this._displayFill=Math.min(fi,Math.max(0,this._displayFill+i)),this._boostAgitation(Math.min(.05,1.8*Math.abs(i))),this._displayFill}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._phase+=.045*i,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_drawLiquidPath(t,e,i,n,s,a,o){t.beginPath(),t.moveTo(0,i);for(let r=0;r<=e;r+=2)t.lineTo(r,Ai(r,e,i,n,s,a,o));t.lineTo(e,i),t.closePath()}_spawnBubble(t,e){if(this._bubbles.length>=14)return;const i=12+Math.random()*(t-24),n=e+20*Math.random();this._bubbles.push({x:i,y:n,radius:2+4*Math.random(),speed:.6+.8*Math.random(),wobble:Math.random()*Math.PI*2,wobbleSpeed:.04+.04*Math.random(),popProgress:0})}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncFillTarget();const a=this._tickFill(t),o=this._ampScale(t),r=this._tickGravity(),l=this._liquidStyle(),c=a/fi,h=this._config?.level_color?Te(this,this._config.level_color_invert?1-c:c):Ce(this._config?.color,this,"--info-color","#29b6f6"),d=Me(this,"--card-background-color","#1c1c1c"),u=function(t,e){const i=Se(t),n=Se(e);return{surface:Ae(Pe(i,.3)),mid:Ae(i),deep:Ae(Pe(i,-.38)),glow:Ae(ze(i,n,.72))}}(h,d);i.clearRect(0,0,n,s);const m=i.createLinearGradient(0,0,0,s);m.addColorStop(0,d),m.addColorStop(.55,d),m.addColorStop(1,u.glow),i.fillStyle=m,i.globalAlpha=.14,i.fillRect(0,0,n,s),i.globalAlpha=1,this._drawLiquidPath(i,n,s,a,this._phase,o,r);const p=s*(1-a),g=i.createLinearGradient(0,p,0,s);g.addColorStop(0,u.surface),g.addColorStop(.35,u.mid),g.addColorStop(1,u.deep),i.fillStyle=g,i.globalAlpha=.5,i.fill(),i.globalAlpha=1,i.beginPath();for(let f=0;f<=n;f+=2){const t=Ai(f,n,s,a,this._phase,o,r);0===f?i.moveTo(f,t):i.lineTo(f,t)}if(i.strokeStyle=u.surface,i.globalAlpha=.35,i.lineWidth=1.5,i.stroke(),i.globalAlpha=1,"bubbles"===l){this._spawnTimer+=t,this._spawnTimer>28&&a>.04&&(this._spawnTimer=0,this._spawnBubble(n,s)),this._bubbles=this._bubbles.filter(e=>{if(e.popProgress>0)return e.popProgress+=.06*t,e.popProgress<1;e.wobble+=e.wobbleSpeed*t,e.x-=r.x*e.speed*t,e.y-=r.y*e.speed*t,e.x+=.15*Math.sin(e.wobble);const i=Ai(e.x,n,s,a,this._phase,o,r);return e.y-e.radius<=i&&(e.popProgress=.01),!0});for(const t of this._bubbles){if(t.popProgress>0){const e=t.popProgress,n=t.radius*(1+2.2*e);i.beginPath(),i.arc(t.x,t.y,n,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.5*(1-e),i.lineWidth=1.2,i.stroke(),i.globalAlpha=1;continue}i.beginPath(),i.arc(t.x,t.y,t.radius,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.55,i.lineWidth=1.1,i.stroke(),i.globalAlpha=1}}else this._bubbles=[];if("electricity"===l&&a>.04){this._lightningPhase+=t*(.1+.2*a);const e=function(t,e){return{x:t/2,y:e}}(n,s),l=Math.min(3,1+Math.floor(2*a)),c=Math.floor(.65*this._lightningPhase),h=.6*a;for(let t=0;t<l;t+=1)oi(i,e,Ci(n,s,a,this._phase,o,r,c+17*t),h,this._lightningPhase+.85*t,u.mid)}else"electricity"!==l&&(this._lightningPhase=0)}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Xt(t);return W`
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
            ${t?W`<ha-state-icon
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
    `}static{this.styles=[Jt,te,ee,o`
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
  `]}};ne([At({attribute:!1})],Bi.prototype,"hass",void 0),ne([Pt()],Bi.prototype,"_config",void 0),ne([Lt("canvas")],Bi.prototype,"_canvas",void 0),Bi=ne([bt(ri)],Bi);var Hi=dt(()=>{zi="nvision-waveform-card",Pi="nvision-waveform-card-editor",Ti=.6,Ei=.28,Ii=.45,Oi="line",Li="balanced",Ni="surge",Fi={wave:"surge",echo:"spawn",pulse:"surge",stream:"jet",spectrum:"surge",cascade:"spawn"},Ri={line:"line",circle:"ring",grid:"field"},qi=[{value:"line",label:"Line"},{value:"ring",label:"Ring"},{value:"field",label:"Field"}],Di=[{value:"compact",label:"Compact"},{value:"balanced",label:"Balanced"},{value:"expansive",label:"Expansive"},{value:"dense",label:"Dense"},{value:"packed",label:"Packed"}],ji=[{value:"surge",label:"Surge"},{value:"spawn",label:"Spawn"},{value:"jet",label:"Jet stream"}]});function Ui(t){return t-Math.floor(t)}Hi();var Gi={compact:{dotScale:.88,span:.94,phaseSpeed:.92},balanced:{dotScale:1,span:.98,phaseSpeed:1},expansive:{dotScale:1.08,span:1,phaseSpeed:1.08},dense:{dotScale:.94,span:1,phaseSpeed:1.1},packed:{dotScale:.86,span:1,phaseSpeed:1.14}},Wi={line:{compact:16,balanced:24,expansive:32,dense:40,packed:48},ring:{compact:18,balanced:24,expansive:32,dense:40,packed:48},field:{compact:16,balanced:25,expansive:36,dense:49,packed:64}};function Vi(t){return t*t*(3-2*t)}function Yi(t,e){const i=Math.max(.08,t),n=Vi(i);return e*(.28+.16*(1-n)+.22*n+.26*Math.max(0,i-.5)**2)}function Ki(t){if("ring"===t.layout){const e=t.width/2,i=t.height/2,n=Math.atan2(t.baseY-i,t.baseX-e);return{primary:{x:-Math.sin(n),y:Math.cos(n)},perp:{x:Math.cos(n),y:Math.sin(n)}}}return{primary:{x:0,y:1},perp:{x:1,y:0}}}function Xi(t,e){const{x:i,y:n}=function(t,e,i,n){const{dot:s,index:a,phase:o,intensity:r,variant:l,height:c}=t;if(r<n)return{x:e,y:i};const h=Ki(t),d=(o+1.4*l)*(1+.18*r),u=a+.47*l,m=Math.max(.001,1-n),p=((r-n)/m)**2;let g=Math.sin(d*(3.1+2.4*s.seed)+.85*u)*c*p*.12;if(r>n+.15*m){const t=p**1.5;g+=Math.cos(7.4*d+1.7*u+s.phase+l)*c*t*.18,g+=Math.sin(8.2*d+2.1*u)*c*t*.1}return{x:e+h.perp.x*g,y:i+h.perp.y*g}}(t,e.x,e.y,t.chaosAt);return{...e,x:i,y:n}}function Qi(t){const e=function(t){return t.layout?t.layout:t.shape?Ri[t.shape]??"line":Oi}(t),i=function(t){if(t.size)return t.size;const e=t.dot_count;if(void 0!==e){if(e<=18)return"compact";if(e>=48)return"packed";if(e>=40)return"dense";if(e>=30)return"expansive"}return Li}(t),n=function(t){return t.motion?Fi[t.motion]??t.motion:t.overlap_dots?"spawn":Ni}(t),s=Gi[i];return{layout:e,size:i,motion:n,dotCount:Wi[e][i],dotScale:s.dotScale,span:s.span,phaseSpeed:s.phaseSpeed}}function Zi(t){return Array.from({length:t},(e,i)=>{const n=.618033988749895*i%1;return{phase:i/t*Math.PI*2,seed:n,sign:n>.5?1:-1}})}function Ji(t){return.5*t}var tn={spawn:function(t){const{dot:e,phase:i,intensity:n,height:s,width:a,baseX:o,baseY:r,layout:l}=t,c=Vi(n),h=3.6-1.4*c,d=Ui(i*(.05+c*c*1.15)*(.06+.22*c)+e.seed*h),u=Math.sin(d*Math.PI),m=Yi(n,s)*d*(.85+.45*c),p=e.sign;if("ring"===l){const e=a/2,i=s/2,n=Math.atan2(r-i,o-e),l=.06*Math.min(a,s),h=Math.hypot(o-e,r-i),m=h*(.18+.55*c),g=Math.max(l,h+p*d*m);return Xi(t,{x:e+Math.cos(n)*g,y:i+Math.sin(n)*g,radiusMul:.44+u*(.56+.58*c+c*c*.42),alphaMul:u*(.32+.58*c)})}const g=Ki(t),f=m*p*(.45+.35*e.seed);return Xi(t,{x:o+g.primary.x*f,y:r+g.primary.y*f,radiusMul:.44+u*(.56+.58*c+c*c*.42),alphaMul:u*(.32+.58*c)})},jet:function(t){const{dot:e,index:i,count:n,phase:s,intensity:a,height:o,width:r,baseX:l,baseY:c,layout:h}=t,d=Vi(a),u=.16+.78*d,m=u*(.4+1.35*e.seed),p=Yi(a,o)*(.035+.1*d),g=Math.sin(s*(1.6+.8*e.seed)+9.4*e.seed)*p,f=m/(1.75*u),_=.52+.36*f+.38*d+d*d*.48;if("ring"===h){const a=r/2,l=o/2,c=.06*Math.min(r,o),h=Math.min(r,o)/2-c,u=i/n*Math.PI*2-Math.PI/2+.35*e.seed,p=Ui(s*(.05+d*d*.24)*m+2.6*e.seed),g=h+p*(h*(.2+.75*d)),v=1-p;return Xi(t,{x:a+Math.cos(u)*g,y:l+Math.sin(u)*g,radiusMul:_*(.88+.22*(1-p)),alphaMul:(.38+.18*f+.32*d)*v})}const v=.12*r,y=c+g;return Xi(t,{x:Ui(s*m*.32+2.1*e.seed+.04*i)*(r+2*v)-v,y:y,radiusMul:_,alphaMul:.42+.2*f+.4*d})},surge:function(t){const{index:e,count:i,phase:n,intensity:s,height:a,baseX:o,baseY:r,layout:l}=t,c=Vi(s),h=Yi(s,a),d=function(t){return.42+.68*Vi(Math.max(.08,t))}(s),u=e%2==0,m=n*d-e/Math.max(1,i-1)*Math.PI*1.6,p=.5*Math.sin(m)+.5,g=h*(.25+p*(.55+.65*c)),f=.06*a,_=.5+p*(.34+.52*c+c*c*.45);if("ring"===l){const n=t.width/2,s=t.height/2,a=e/i*Math.PI*2-Math.PI/2,l=u?-1:1,h=Math.hypot(o-n,r-s)+l*g*.85;return Xi(t,{x:n+Math.cos(a)*h,y:s+Math.sin(a)*h,radiusMul:_,alphaMul:.4+p*(.28+.48*c)})}return Xi(t,{x:o,y:u?f+g:a-f-g,radiusMul:_,alphaMul:.38+p*(.3+.5*c)})}};function en(t,e,i,n,s,a,o,r,l,c){const h=Math.min(o,r),d=function(t,e,i,n,s,a){const o=Math.min(n,s),r=.04*o;switch(t){case"ring":{const t=n/2,r=s/2,l=.06*o,c=(Math.min(n,s)/2-l)*(.92+.06*a),h=(e+.5)/i*Math.PI*2-Math.PI/2;return{x:t+Math.cos(h)*c,y:r+Math.sin(h)*c}}case"field":{const t=Math.ceil(Math.sqrt(i)),r=Math.ceil(i/t),l=.04*o,c=.04*o,h=.028*o*a,d=(n-2*l-h*(t-1))/t,u=(s-2*c-h*(r-1))/r;return{x:l+e%t*(d+h)+d/2,y:c+Math.floor(e/t)*(u+h)+u/2}}default:{const t=n-r,o=(t-r)*a;return{x:(r+t-o)/2+(i<=1?.5:e/(i-1))*o,y:Ji(s)}}}}(t.layout,i,n,o,r,t.span),u={dot:e,index:i,count:n,phase:s,intensity:a,chaosAt:c,scale:h,baseX:d.x,baseY:d.y,width:o,height:r,variant:l,layout:t.layout};return tn[t.motion](u)}function nn(t,e,i,n){const s=.04*i,a=.58*i;let o=1;t<a&&(o=t<=s?.06:.06+.94*Vi((t-s)/(a-s)));const r=.5*n,l=.42*n,c=Math.abs(e-r);let h=1;return t<a&&c<l&&(h=.08+.92*Vi(c/l)),o*h}function sn(t,e,i,n,s,a){if("ring"===a)return 1;const o=Math.max(4,.06*s),r=Math.max(3,.04*s),l=Math.min(1,Math.max(0,t/o)),c=Math.min(1,Math.max(0,(i-t)/o)),h=Math.min(1,Math.max(0,e/r)),d=Math.min(1,Math.max(0,(n-e)/r));return"line"===a?Math.min(l,c):Math.min(l,c,h,d)}var an,on,rn=/* @__PURE__ */ut({NvisionWaveformCardEditor:()=>on}),ln=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),Hi(),ae(),an=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{type:"grid",name:"",schema:[{name:"layout",required:!0,default:Oi,selector:{select:{options:[...qi],mode:"dropdown"}}},{name:"size",required:!0,default:Li,selector:{select:{options:[...Di],mode:"dropdown"}}}]},{name:"motion",required:!0,default:Ni,selector:{select:{options:[...ji],mode:"dropdown"}}},{name:"shake_speed",required:!0,default:Ii,selector:{number:{min:.15,max:1.5,step:.05}}},re()],on=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Waveform color":"layout"===t.name?"Layout":"size"===t.name?"Size":"motion"===t.name?"Motion":"shake_speed"===t.name?"Shake speed":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,layout:Oi,size:Li,motion:Ni,shake_speed:Ii,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${an}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],on.prototype,"_config",void 0),on=ne([bt(Pi)],on)});Ct(),Bt(),Hi(),ae(),Ht({type:zi,name:"Nvision Waveform",description:"Oscilloscope dot patterns driven by a numeric sensor"});function cn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}var hn,dn,un=class extends vt{constructor(...t){super(...t),this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._shakePhase=0,this._displayIntensity=0,this._targetIntensity=0,this._dots=Zi(24),this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(ln(),rn)),document.createElement(Pi)}static getStubConfig(t,e,i){const n=e.find(e=>void 0!==cn(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${zi}`,entity:n,min:0,max:100,layout:Oi,size:Li,motion:Ni}}setConfig(t){this._config={min:0,max:100,layout:Oi,size:Li,motion:Ni,shake_at:Ti,shake_peak:Ei,shake_speed:Ii,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t},this._syncDots()}_presets(){return Qi(this._config??{})}_syncDots(){const{dotCount:t}=this._presets();this._dots.length!==t&&(this._dots=Zi(t))}_shakeThresholds(){return{shakeAt:this._config?.shake_at??.6,shakePeak:this._config?.shake_peak??.28,shakeSpeed:this._config?.shake_speed??.45}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this.style.transform="",this._shakePhase=0,super.disconnectedCallback()}updated(t){(t.has("hass")||t.has("_config"))&&this._syncIntensity(),t.has("_config")&&this._syncDots(),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncIntensity(){const t=this._config?.entity,e=cn(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetIntensity=void 0!==e?function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(e,i,n):0}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(this._stage??t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0),this._syncDots()}_tickIntensity(t){const e=this._targetIntensity-this._displayIntensity;return Math.abs(e)<.001?this._displayIntensity=this._targetIntensity:this._displayIntensity+=.1*e*t,this._displayIntensity}_applyShake(t,e){const{shakeAt:i,shakePeak:n}=this._shakeThresholds();if(t<i)return void(this.style.transform="");const s=(t-i)/(1-i)*n,a=e,o=Math.sin(14.3*a)*s*2.4+Math.cos(19.7*a)*s*1.2,r=Math.cos(16.1*a)*s*1.8+Math.sin(11.2*a)*s*.9,l=Math.sin(21.5*a)*s*.4;this.style.transform=`translate(${o}px, ${r}px) rotate(${l}deg)`}_drawDot(t,e,i,n,s,a){a<=.01||(t.save(),t.shadowColor=s,t.shadowBlur=2.4*n,t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=.35*a,t.fill(),t.restore(),t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=a,t.fill(),t.globalAlpha=1)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncIntensity();const a=this._tickIntensity(t),o=Math.max(.12,a),{shakeAt:r,shakeSpeed:l}=this._shakeThresholds(),c=this._presets();this._phase+=t*(.014+o*o*.1)*c.phaseSpeed,a>=r?(this._shakePhase+=t*l*.06,this._applyShake(a,this._shakePhase)):(this._shakePhase=0,this._applyShake(a,0));const h=(d=this._config?.color,Ce(d,this,"--primary-color","#03a9f4"));var d;const u=Math.min(n,s),m=function(t,e){return Math.max(1.1,.0115*t)*e}(u,c.dotScale),p=Math.max(0,a-.55);i.clearRect(0,0,n,s);for(let g=0;g<this._dots.length;g+=1){const t=en(c,this._dots[g],g,this._dots.length,this._phase,o,n,s,0,r),e=sn(t.x,t.y,n,s,u,c.layout)*nn(t.x,t.y,n,s),a=m*t.radiusMul*(.68+.38*o+p*p*.85),l=(.3+.52*o+p*p*.6)*t.alphaMul*e;this._drawDot(i,t.x,t.y,a,h,l)}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Waveform",i=Xt(t);return W`
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
            ${t?W`<ha-state-icon
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
    `}static{this.styles=[Jt,te,ee,o`
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
  `]}};ne([At({attribute:!1})],un.prototype,"hass",void 0),ne([Pt()],un.prototype,"_config",void 0),ne([Lt(".stage")],un.prototype,"_stage",void 0),ne([Lt("canvas")],un.prototype,"_canvas",void 0),un=ne([bt(zi)],un);var mn,pn,gn=dt(()=>{hn="nvision-air-quality-card",dn="nvision-air-quality-card-editor"}),fn=/* @__PURE__ */ut({NvisionAirQualityCardEditor:()=>pn}),_n=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),gn(),ae(),mn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"color_good",selector:{color_rgb:{}}},{name:"color_warning",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_bad",selector:{color_rgb:{}}},{name:"color_mist",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_clear",selector:{color_rgb:{}}},{name:"color_sky",selector:{color_rgb:{}}}]},re()],pn=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color_good"===t.name?"Good gauge color":"color_warning"===t.name?"Moderate gauge color":"color_bad"===t.name?"Poor gauge color":"color_mist"===t.name?"Mist color":"color_clear"===t.name?"Clear glow color":"color_sky"===t.name?"Sky glow color":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${mn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],pn.prototype,"_config",void 0),pn=ne([bt(dn)],pn)});Ct(),Bt(),gn(),ae(),Ht({type:hn,name:"Nvision Air Quality",description:"Gauge with gradient arc, mist when air is poor, crisp glow when clear"});var vn=40*Math.PI,yn=.38,bn=.62;function xn(t){return t>=yn?0:(yn-t)/yn}function wn(t){return t<=bn?0:(t-bn)/.38}function $n(t,e){return{good:Ce(t?.color_good,e,"--success-color","#4caf50"),warning:Ce(t?.color_warning,e,"--warning-color","#ff9800"),bad:Ce(t?.color_bad,e,"--error-color","#f44336"),mist:Ce(t?.color_mist,e,"--secondary-text-color","#888888"),clear:Ce(t?.color_clear,e,"--success-color","#4caf50"),sky:Ce(t?.color_sky,e,"--info-color","#2196f3")}}function Mn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function kn(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}var Cn,Sn,An=0,zn=class extends vt{constructor(...t){super(...t),this._gaugeReady=!1,this._gradientId="aq-gradient-"+ ++An,this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._displayValue=0,this._targetValue=0,this._mist=[],this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(_n(),fn)),document.createElement(dn)}static getStubConfig(t,e,i){const n=e.find(e=>function(t,e){const i=t.states[e];if(!i)return!1;const n=i.attributes?.device_class;return"aqi"===n||"pm25"===n||"pm10"===n||/aqi|air_quality|pm2/i.test(e)}(t,e))||e.find(e=>void 0!==Mn(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${hn}`,entity:n,min:0,max:100}}setConfig(t){this._config={min:0,max:100,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0})}updated(t){(t.has("hass")||t.has("_config"))&&(this._syncValue(),this._applyEffectLevels(this._badness(this._targetValue))),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncValue(){const t=this._config?.entity,e=Mn(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetValue=void 0!==e?Math.min(n,Math.max(i,e)):i}_tickValue(t){const e=this._targetValue-this._displayValue;return Math.abs(e)<.05?this._displayValue=this._targetValue:this._displayValue+=.08*e*t,this._displayValue}_badness(t){const{min:e,max:i}=this._range();return kn(t,e,i)}_applyEffectLevels(t){this._stage?.style.setProperty("--haze",String(wn(t))),this._stage?.style.setProperty("--clarity",String(xn(t)))}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_ensureMist(t,e,i){const n=Math.floor(16*i);for(;this._mist.length<n;)this._mist.push({x:Math.random()*t,y:Math.random()*e,radius:18+42*Math.random(),vx:.22*(Math.random()-.5),vy:-.04-.18*Math.random(),alpha:.04+.1*Math.random()});this._mist.length>n&&(this._mist.length=n)}_drawMist(t,e,i,n,s,a){if(!(n<.08)){this._ensureMist(e,i,n);for(const o of this._mist){o.x+=o.vx*s,o.y+=o.vy*s,o.y+o.radius<0&&(o.y=i+o.radius,o.x=Math.random()*e),o.x<-o.radius&&(o.x=e+o.radius),o.x>e+o.radius&&(o.x=-o.radius);const r=t.createRadialGradient(o.x,o.y,0,o.x,o.y,o.radius);r.addColorStop(0,a),r.addColorStop(1,"rgba(0,0,0,0)"),t.beginPath(),t.arc(o.x,o.y,o.radius,0,2*Math.PI),t.fillStyle=r,t.globalAlpha=o.alpha*n*1.4,t.fill()}t.globalAlpha=1}}_drawClearGlow(t,e,i,n,s,a){if(n<.2)return;const o=.5*e,r=.36*i,l=.94+.06*Math.sin(.5*this._phase),c=.62*Math.min(e,i)*l,h=t.createRadialGradient(o,r,0,o,r,c);h.addColorStop(0,s),h.addColorStop(.55,a),h.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=h,t.globalAlpha=n*n*.1,t.fillRect(0,0,e,i);const d=t.createLinearGradient(0,0,0,.55*i);d.addColorStop(0,a),d.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=d,t.globalAlpha=.06*n,t.fillRect(0,0,e,i),t.globalAlpha=1}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncValue();const a=this._tickValue(t),o=this._badness(a),r=xn(o),l=wn(o);this._phase+=.025*t,this._applyEffectLevels(o);const c=$n(this._config,this);i.clearRect(0,0,n,s),this._drawClearGlow(i,n,s,r,c.clear,c.sky),this._drawMist(i,n,s,l,t,c.mist)}_renderGauge(t,e,i,n,s,a){const{min:o,max:r}=this._range(),l=function(t,e,i){return 180*kn(t,e,i)}(t,o,r),c=this._gaugeReady?vn*(1-l/180):vn;return V`
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
          stroke-dasharray=${vn}
          style=${$e({strokeDashoffset:`${c}`})}
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
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=Mn(t?.state),i=e??this._targetValue,n=this._config.name||t?.attributes.friendly_name||"Air Quality",s=t?.attributes.unit_of_measurement??"",a=void 0!==e?String(Math.round(10*e)/10):"—",o=$n(this._config,this);return W`
      <ha-card
        style=${$e({"--aq-good-color":o.good,"--aq-warning-color":o.warning,"--aq-bad-color":o.bad,"--aq-mist-color":o.mist,"--aq-clear-color":o.clear,"--aq-sky-color":o.sky})}
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
    `}static{this.styles=[Jt,o`
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
  `]}};ne([At({attribute:!1})],zn.prototype,"hass",void 0),ne([Pt()],zn.prototype,"_config",void 0),ne([Pt()],zn.prototype,"_gaugeReady",void 0),ne([Lt("canvas")],zn.prototype,"_canvas",void 0),ne([Lt(".stage")],zn.prototype,"_stage",void 0),zn=ne([bt(hn)],zn);var Pn,Tn,En=dt(()=>{Cn="nvision-circle-gauge-card",Sn="nvision-circle-gauge-card-editor"}),In=/* @__PURE__ */ut({NvisionCircleGaugeCardEditor:()=>Tn}),On=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),En(),ae(),Pn=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{name:"track_color",selector:{color_rgb:{}}},{name:"reverse",selector:{boolean:{}}},re("toggle")],Tn=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Gauge color":"track_color"===t.name?"Track color":"reverse"===t.name?"Reverse":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Pn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],Tn.prototype,"_config",void 0),Tn=ne([bt(Sn)],Tn)});Ct(),Bt(),En(),ae(),Ht({type:Cn,name:"Nvision Circle Gauge",description:"Full-circle gauge with the value centered, ideal for timers"});var Ln=2*Math.PI*40;function Nn(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Fn(t){const e=t.split(":").map(Number);return 3===e.length?3600*e[0]+60*e[1]+e[2]:2===e.length?60*e[0]+e[1]:Number(t)||0}function Rn(t){const e=t.attributes.duration;return"string"==typeof e?Fn(e):0}function qn(t,e,i){return"idle"===t.state&&void 0===e?"Idle":void 0===e?"—":"idle"===t.state&&0===e?"Idle":function(t,e){const i=Math.max(0,Math.floor(t)),n=Math.floor(i/3600),s=Math.floor(i%3600/60),a=i%60,o={};if(n&&(o.hours=n),s&&(o.minutes=s),(a||!n&&!s)&&(o.seconds=a),e?.language&&"undefined"!=typeof Intl&&"DurationFormat"in Intl)return new Intl.DurationFormat(e.language,{style:"narrow",hoursDisplay:n?"always":"auto"}).format(o);const r=[];return n&&r.push(`${n}h`),s&&r.push(`${s}m`),(a||0===r.length)&&r.push(`${a}s`),r.join(" ")}(e,i)}function Dn(t){return t?.startsWith("timer.")??!1}var jn,Bn,Hn=class extends vt{constructor(...t){super(...t),this._gaugeReady=!1,this._tick=0,this._rescaleOnConnect=!1,this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(On(),In)),document.createElement(Sn)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("timer."))||e.find(e=>function(t,e){const i=t.states[e];return!(!i||!Dn(e)&&void 0===Nn(i.state))}(t,e))||e[0]||i[0]||Object.keys(t.states)[0],s=t.states[n],a=s&&Dn(n)&&Rn(s)||100;return{type:`custom:${Cn}`,entity:n,min:0,max:a}}setConfig(t){const e=t.entity?.startsWith("timer.")?{tap_action:{action:"toggle"},hold_action:{action:"more-info"}}:{tap_action:{action:"more-info"},hold_action:{action:"more-info"}};this._config={min:0,max:100,...e,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:3}}connectedCallback(){super.connectedCallback(),this._syncTimerInterval(),this._rescaleOnConnect&&requestAnimationFrame(()=>{this._rescaleTextSvg(),this._rescaleOnConnect=!1})}disconnectedCallback(){this._clearTimerInterval(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0,this._rescaleTextSvg()})}updated(t){(t.has("hass")||t.has("_config"))&&this._syncTimerInterval(),(t.has("hass")||t.has("_config")||t.has("_tick")||t.has("_gaugeReady"))&&requestAnimationFrame(()=>this._rescaleTextSvg())}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_clearTimerInterval(){void 0!==this._timerInterval&&(clearInterval(this._timerInterval),this._timerInterval=void 0)}_syncTimerInterval(){this._clearTimerInterval();const t=this._config?.entity,e=t?this.hass?.states[t]:void 0;e&&Dn(t)&&"active"===e.state&&(this._timerInterval=window.setInterval(()=>{this._tick+=1},1e3))}_reading(){this._tick;const t=this._config?.entity,e=t?this.hass?.states[t]:void 0,{min:i,max:n}=this._range();if(!e)return{value:i,valueText:"—",unit:""};if(Dn(t)){const t=Rn(e),s=function(t){const e=t.attributes.remaining;if("string"!=typeof e)return;let i=Fn(e);if("active"===t.state&&t.attributes.finishes_at){const e=new Date(String(t.attributes.finishes_at)).getTime();i=Math.max((e-Date.now())/1e3,0)}return i}(e),a=n>i?n:t||n;return{value:s??("idle"===e.state?a:i),valueText:qn(e,s??t,this.hass?.locale),unit:""}}const s=Nn(e.state),a=s??i;if(this.hass?.formatEntityStateToParts){const t=this.hass.formatEntityStateToParts(e);return{value:a,valueText:t.find(t=>"value"===t.type)?.value??(void 0!==s?String(s):"—"),unit:t.find(t=>"unit"===t.type)?.value??""}}const o=String(e.attributes.unit_of_measurement??"");return{value:a,valueText:void 0!==s?String(s):"—",unit:o}}_rescaleTextSvg(){if(!this.isConnected)return void(this._rescaleOnConnect=!0);const t=this.shadowRoot?.querySelector(".text"),e=t?.querySelector(".text-group");if(!t||!e)return;const i=e.getBBox();0===i.width&&0===i.height||t.setAttribute("viewBox",`${i.x} ${i.y} ${i.width} ${i.height}`)}_renderGauge(t,e,i,n,s){const{min:a,max:o}=this._range(),r=this._config?.entity,l=r?this.hass?.states[r]:void 0,c=l&&Dn(r)?Rn(l):o,h=function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,a,Dn(r)&&c>a?c:o),d=this._config?.reverse?1-h:h;return V`
      <svg viewBox="-50 -50 100 100" class="gauge">
        <circle class="track" cx="0" cy="0" r=${40} stroke=${s} />
        <circle
          class="value"
          cx="0"
          cy="0"
          r=${40}
          stroke=${n}
          stroke-dasharray=${Ln}
          style=${$e({strokeDashoffset:`${this._gaugeReady?Ln*(1-d):this._config?.reverse?0:Ln}`})}
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
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,{value:i,valueText:n,unit:s}=this._reading(),a=Ce(this._config.color,this,"--primary-color","#03a9f4");const o=function(t,e){return Ce(t,e,"--primary-background-color","#e0e0e0")}(this._config.track_color,this),r=this._config.name||e?.attributes.friendly_name||"Circle Gauge";return W`
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
    `}static{this.styles=[Jt,o`
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
  `]}};ne([At({attribute:!1})],Hn.prototype,"hass",void 0),ne([Pt()],Hn.prototype,"_config",void 0),ne([Pt()],Hn.prototype,"_gaugeReady",void 0),ne([Pt()],Hn.prototype,"_tick",void 0),Hn=ne([bt(Cn)],Hn);var Un,Gn,Wn=dt(()=>{jn="nvision-power-draw-card",Bn="nvision-power-draw-card-editor"}),Vn=/* @__PURE__ */ut({NvisionPowerDrawCardEditor:()=>Gn}),Yn=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),ui(),Wn(),ae(),Un=[{name:"entity",selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:Re,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}},re()],Gn=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:Re,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Un}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],Gn.prototype,"_config",void 0),Gn=ne([bt(Bn)],Gn)});Ct(),Bt(),ui(),Wn(),ae(),Ht({type:jn,name:"Nvision Power Draw",description:"Power consumption with animated lightning from a plug"});var Kn,Xn,Qn=class extends vt{constructor(...t){super(...t),this._displayIntensity=0,this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(Yn(),Vn)),document.createElement(Bn)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return"power"===i?.attributes.device_class||e.includes("power")||void 0!==ti(i?.state)})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${jn}`,entity:n,min:0,max:Re}}setConfig(t){this._config={min:0,max:Re,effects_min:0,effects_max:1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Ue(this._config?.color,this)}_overMaxColor(){return Ke(this)}_rawValue(){const t=this._config?.entity;return ti(t?this.hass?.states[t]?.state:void 0)}_overMaxSeverity(){const t=this._rawValue();return void 0===t?0:Ye(t,this._config?.min??0,this._config?.max??3e3)}_syncLightningTheme(){const t=this._overMaxSeverity()>0?this._overMaxColor():this._lightningColor();this.style.setProperty("--lightning-color",t),this.style.setProperty("--lightning-glow",String(Ve(this._displayIntensity)))}_targetIntensity(){return We(this._rawValue(),this._config??{})}_tickIntensity(t){const e=this._targetIntensity(),i=e-this._displayIntensity;return Math.abs(i)<.001?this._displayIntensity=e:this._displayIntensity+=i*qe*t,this._syncLightningTheme(),this._displayIntensity}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new je(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>{this._tickIntensity(t)})),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=ni(this._plug,e,"center"),n=ni(this._entityIcon,e,"center");if(!i||!n)return[];const s=this._overMaxSeverity(),a=s>0?this._overMaxColor():this._lightningColor(),o=[{from:i,to:n,intensity:this._displayIntensity,color:a}];if(s>0){const{width:i,height:r}=e.getBoundingClientRect();Ze(o,n,i,r,s,t,a)}return o}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Power Draw",i=Xt(t);return W`
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
            ${t?W`<ha-state-icon
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
    `}static{this.styles=[Jt,te,ee,o`
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
  `]}};ne([At({attribute:!1})],Qn.prototype,"hass",void 0),ne([Pt()],Qn.prototype,"_config",void 0),ne([Lt("canvas")],Qn.prototype,"_canvas",void 0),ne([Lt(".plug")],Qn.prototype,"_plug",void 0),ne([Lt(".entity-icon")],Qn.prototype,"_entityIcon",void 0),Qn=ne([bt(jn)],Qn);var Zn,Jn,ts=dt(()=>{Kn="nvision-power-glance-card",Xn="nvision-power-glance-card-editor"}),es=/* @__PURE__ */ut({NvisionPowerGlanceCardEditor:()=>Jn}),is=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),ui(),ts(),ae(),Zn=[{name:"entities",selector:{entity:{multiple:!0,domain:"sensor"}}},{name:"columns",default:3,selector:{number:{min:1,max:6,mode:"box"}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:Re,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}},re()],Jn=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"entities"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entities"):"columns"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.columns"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={entities:[],columns:3,min:0,max:Re,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Zn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],Jn.prototype,"_config",void 0),Jn=ne([bt(Xn)],Jn)});Ct(),Bt(),ui(),ts(),ae(),Ht({type:Kn,name:"Nvision Power Glance",description:"Multiple power sensors with lightning from a bottom plug"});var ns=class extends vt{constructor(...t){super(...t),this._displayIntensities=/* @__PURE__ */new Map,this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(is(),es)),document.createElement(Xn)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)],s=/* @__PURE__ */new Set,a=[];for(const o of n){if(s.has(o))continue;s.add(o);const e=t.states[o];if(("power"===e?.attributes.device_class||o.includes("power")||void 0!==ti(e?.state))&&a.push(o),a.length>=4)break}return{type:`custom:${Kn}`,entities:a.length?a:n.slice(0,3),columns:3,min:0,max:Re}}setConfig(t){this._config={entities:[],columns:3,min:0,max:Re,effects_min:0,effects_max:1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t},this._syncGridColumns()}_syncGridColumns(){const t=this._config?.columns??3,e=this._config?.entities?.length??0,i=e>0?Math.min(t,e):t;this.style.setProperty("--columns",String(i))}getCardSize(){const t=this._config?.entities?.length??1,e=this._config?.columns??3;return Math.max(1,Math.ceil(t/e))}getGridOptions(){return{columns:6,rows:this.getCardSize()}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncGridColumns(),this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Ue(this._config?.color,this)}_overMaxColor(){return Ke(this)}_entitySeverity(t){const e=ti(this.hass?.states[t]?.state);return void 0===e?0:Ye(e,this._config?.min??0,this._config?.max??3e3)}_rawValues(){return this._entityIds().map(t=>ti(this.hass?.states[t]?.state))}_overMaxSeverity(){return function(t,e){const i=e.min??0,n=e.max??3e3;return t.reduce((t,e)=>Math.max(t,void 0!==e?Ye(e,i,n):0),0)}(this._rawValues(),this._config??{})}_syncLightningTheme(){const t=this._lightningColor(),e=this._overMaxColor(),i=this._overMaxSeverity()>0;this.style.setProperty("--lightning-color",t);const n=this._entityIds(),s=this._entityIcons?Array.from(this._entityIcons):[];let a=Ve(0);n.forEach((i,n)=>{const o=Ve(this._displayIntensities.get(i)??0);a=Math.max(a,o);const r=s[n];r?.style.setProperty("--lightning-glow",String(o)),r?.style.setProperty("--lightning-color",this._entitySeverity(i)>0?e:t)}),this._plug?.style.setProperty("--lightning-glow",String(a)),this._plug?.style.setProperty("--lightning-color",i?e:t)}_entityIds(){return this._config?.entities??[]}_targetIntensity(t){const e=this.hass?.states[t]?.state;return We(ti(e),this._config??{})}_tickIntensities(t){for(const e of this._entityIds()){const i=this._targetIntensity(e),n=this._displayIntensities.get(e)??0,s=i-n;Math.abs(s)<.001?this._displayIntensities.set(e,i):this._displayIntensities.set(e,n+s*qe*t)}this._syncLightningTheme()}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new je(this,t=>this._buildArcs(t),()=>this._lightningColor(),t=>this._tickIntensities(t))),this._renderer.attach(t))}_buildArcs(t){const e=this._canvas;if(!e)return[];const i=ni(this._plug,e,"center");if(!i)return[];const n=this._entityIcons?Array.from(this._entityIcons):[],s=this._entityIds(),a=this._lightningColor(),o=this._overMaxColor(),{width:r,height:l}=e.getBoundingClientRect(),c=[];return s.forEach((s,h)=>{const d=ni(n[h],e,"center"),u=this._displayIntensities.get(s)??0,m=this._entitySeverity(s);if(!d)return;const p=m>0?o:a;c.push({from:i,to:d,intensity:u,color:p}),m>0&&Ze(c,d,r,l,m,t,o)}),c}render(){if(!this._config||!this.hass)return K;const t=this._entityIds();return W`
      <ha-card class=${this._overMaxSeverity()>0?"over-max":""}>
        <div class="stage">
          <div class="entities">
            ${t.map(t=>{const e=this.hass.states[t],i=Xt(e);return W`
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
                  ${e?W`<ha-state-icon
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
    `}static{this.styles=[Jt,ee,o`
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
  `]}};ne([At({attribute:!1})],ns.prototype,"hass",void 0),ne([Pt()],ns.prototype,"_config",void 0),ne([Lt("canvas")],ns.prototype,"_canvas",void 0),ne([Lt(".plug")],ns.prototype,"_plug",void 0),ne([function(t){return(e,i)=>Tt(e,i,{get(){return(this.renderRoot??(Nt??=document.createDocumentFragment())).querySelectorAll(t)}})}(".entity-icon")],ns.prototype,"_entityIcons",void 0),ns=ne([bt(Kn)],ns),$t();var ss=_e(class extends ve{constructor(t){if(super(t),t.type!==ge||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=/* @__PURE__ */new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const t=!!e[n];t===this.st.has(n)||this.nt?.has(n)||(t?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return Y}});function as(t){if("on"!==t.state)return 0;const e=t.attributes.brightness;return"number"!=typeof e?1:Math.max(0,Math.min(1,e/255))}function os(t){const e=t.attributes.brightness;return e&&"on"===t.state?`brightness(${(e+245)/5}%)`:""}function rs(t){const e=Math.max(1e3,Math.min(4e4,t))/100;let i,n,s;return e<=66?(i=255,n=Math.min(255,Math.max(0,99.4708025861*Math.log(e)-161.1195681661)),s=e<=19?0:Math.min(255,Math.max(0,138.5177312231*Math.log(e-10)-305.0447927307))):(i=Math.min(255,Math.max(0,329.698727446*(e-60)**-.1332047592)),n=Math.min(255,Math.max(0,288.1221695283*(e-60)**-.0755148492)),s=255),[Math.round(i),Math.round(n),Math.round(s)]}function ls(t){if("on"!==t.state)return;const e=t.attributes.rgb_color;if(e)return e;const i=t.attributes.color_temp_kelvin;if("number"==typeof i)return rs(i);const n=t.attributes.color_temp;if("number"==typeof n&&n>0)return rs(Math.round(1e6/n));const s=t.attributes.hs_color;return s?function(t,e,i){const n=e/100,s=i/100,a=(1-Math.abs(2*s-1))*n,o=t/60,r=a*(1-Math.abs(o%2-1));let l=0,c=0,h=0;o>=0&&o<1?(l=a,c=r):o<2?(l=r,c=a):o<3?(c=a,h=r):o<4?(c=r,h=a):o<5?(l=r,h=a):(l=a,h=r);const d=s-a/2;return[Math.round(255*(l+d)),Math.round(255*(c+d)),Math.round(255*(h+d))]}(s[0],s[1],50):void 0}var cs,hs,ds,us,ms="nvision-light-glow-stack";var ps,gs,fs=dt(()=>{cs="nvision-light-card",hs="nvision-light-card-editor",ds=.72,us=.62}),_s=/* @__PURE__ */ut({NvisionLightCardEditor:()=>gs}),vs=dt(()=>{Ct(),Bt(),Gt(),oe(),fs(),ae(),ps=[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"glow_size",required:!0,default:165,selector:{number:{min:20,max:300,step:5,unit_of_measurement:"%"}}},{name:"glow_intensity",required:!0,default:ds,selector:{number:{min:0,max:1,step:.05}}}]},{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}]}],gs=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"glow_size"===t.name?"Glow size":"glow_intensity"===t.name?"Glow intensity":"interactions"===t.name?"Interactions":"hold_action"===t.name||"double_tap_action"===t.name?`${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`:this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:ds,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ps}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],gs.prototype,"_config",void 0),gs=ne([bt(hs)],gs)});Ct(),Bt(),Gt(),fs(),ae(),Ht({type:cs,name:"Nvision Light",description:"Light control with ambient color glow"}),function(t){if("undefined"==typeof document||document.getElementById(ms))return;const e=document.createElement("style");e.id=ms,e.textContent=`\n    hui-card:has(${t}),\n    .card:has(${t}) {\n      position: relative;\n      z-index: 0;\n      overflow: visible;\n    }\n\n    hui-card:not(:has(${t})),\n    .card:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section:has(${t}) {\n      position: relative;\n      z-index: 0;\n    }\n\n    section:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section .meta {\n      position: relative;\n      z-index: 2;\n    }\n\n    .preview:has(${t}) {\n      overflow: visible;\n    }\n  `,document.head.appendChild(e)}(cs);var ys,bs,xs,ws,$s,Ms,ks,Cs=class extends vt{constructor(...t){super(...t),this._holdTriggered=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(vs(),_s)),document.createElement(hs)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("light."))||i.find(t=>t.startsWith("light."))||Object.keys(t.states).find(t=>t.startsWith("light."))||e[0]||i[0]||"";return{type:`custom:${cs}`,entity:n,glow_size:165,glow_intensity:ds}}setConfig(t){if(!t.entity||"light"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the light domain");this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:ds,...t}}getCardSize(){return 5}getGridOptions(){return{columns:6,rows:5,min_rows:3}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return W`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=Math.round((t.attributes.brightness||0)/255*100),i="on"===t.state,n="unavailable"===t.state||"unknown"===t.state,s=function(t){const e=t.attributes.supported_features;if("number"==typeof e&&1&e)return!0;const i=t.attributes.supported_color_modes;return Boolean(i?.some(t=>"onoff"!==t))}(t),a=function(t){const e=ls(t);return e?`rgb(${e.join(", ")})`:"on"===t.state?"var(--state-light-active-color, var(--state-active-color, #ffb74d))":"transparent"}(t),o=as(t),r=this._config.glow_size??165,l=(this._config.glow_intensity??.72)*o,c=r*us,h=this._config.name||t.attributes.friendly_name||this._config.entity,d={filter:os(t),color:i&&t.attributes.rgb_color?`rgb(${t.attributes.rgb_color.join(",")})`:""},u={"--bulb-color":a,"--nv-glow-size":`${r}%`,"--nv-glow-intensity":String(l),"--nv-glow-spread":`${c}px`};return W`
      <div
        class=${ss({stage:!0,"state-on":i,"state-off":!i})}
        style=${$e(u)}
      >
        <div class="glow-backdrop" aria-hidden="true"></div>
        <div class="glow-ambient" aria-hidden="true"></div>

        <ha-card class=${ss({"state-on":i,"state-off":!i})}>
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
                style=${$e({visibility:s?"visible":"hidden"})}
                @value-changing=${this._dragBrightness}
                @value-changed=${this._setBrightness}
              ></round-slider>
              <ha-icon-button
                class=${ss({"light-button":!0,"state-on":i,"state-unavailable":n})}
                style=${$e(d)}
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
    `}_handleMoreInfo(){this._config?.entity&&Ut(this,"hass-more-info",{entityId:this._config.entity})}_handleTap(t){if(this._holdTriggered)return this._holdTriggered=!1,void t.preventDefault();this.hass&&this._config&&Yt(this,this.hass,this._config,"tap")}_handleDoubleTap(t){t.preventDefault(),this.hass&&this._config&&Yt(this,this.hass,this._config,"double_tap")}_handleHoldStart(){window.clearTimeout(this._holdTimer),this._holdTriggered=!1,this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,this.hass&&this._config&&Yt(this,this.hass,this._config,"hold")},500)}_handleHoldEnd(){window.clearTimeout(this._holdTimer)}_dragBrightness(t){const e=this.shadowRoot?.querySelector(".brightness");e&&(e.innerHTML=`${t.detail.value}<span class="unit"> %</span>`,e.classList.add("show_brightness")),window.clearTimeout(this._brightnessTimeout),this._brightnessTimeout=window.setTimeout(()=>{e?.classList.remove("show_brightness")},500)}_setBrightness(t){this.hass&&this._config?.entity&&this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:t.detail.value})}static{this.styles=o`
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
  `}};function Ss(t){return String(t).padStart(2,"0")}function As(t,e){const i=Object.fromEntries(function(t){let e=$s.get(t);return e||(e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hour12:!1,weekday:"short"}),$s.set(t,e)),e}(e).formatToParts(new Date(t)).map(t=>[t.type,t.value])),n=ws.indexOf(String(i.weekday))>=0?ws.indexOf(String(i.weekday)):0,s=Number(i.year),a=Number(i.month),o=Number(i.day);return{year:s,month:a,day:o,hour:Number(i.hour)%24,weekday:n,dateKey:`${s}-${Ss(a)}-${Ss(o)}`,monthKey:`${s}-${Ss(a)}`}}function zs(t,e,i){const n=As(Ps(t,e,i),e);return`${n.year}-${Ss(n.month)}-${Ss(n.day)}`}function Ps(t,e,i){const n=As(t,e),s=(n.weekday-i+7)%7;return Ts(n.year,n.month,n.day,0,0,e)-24*s*60*60*1e3}function Ts(t,e,i,n,s,a){const o=Date.UTC(t,e-1,i,n,s,0),r=Object.fromEntries(function(t){let e=Ms.get(t);return e||(e=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}),Ms.set(t,e)),e}(a).formatToParts(new Date(o)).map(t=>[t.type,t.value]));return o-(Date.UTC(Number(r.year),Number(r.month)-1,Number(r.day),Number(r.hour),Number(r.minute),0)-o)}function Es(t,e,i,n,s){if("none"===t)return"";const a=function(t,e,i=0){return{...As(t,e),weekKey:zs(t,e,i)}}(e,i,s);switch(t){case"hour":return String(a.hour);case"weekday":return String(a.weekday);case"day":return a.dateKey;case"week":return a.weekKey;case"month":return a.monthKey;case"time":return String(Math.floor(e/n)*n);default:return}}function Is(t,e,i,n,s){const a=/* @__PURE__ */new Map;if("none"===t)return{keys:[""],labels:[""],bucketRanges:a};if("hour"===t)return{keys:Array.from({length:24},(t,e)=>String(e)),labels:Array.from({length:24},(t,e)=>function(t){return new Date(Date.UTC(2024,0,1,t,0,0)).toLocaleTimeString([],{hour:"numeric"})}(e)),bucketRanges:a};if("weekday"===t){const t=Array.from({length:7},(t,e)=>(n+e)%7);return{keys:t.map(String),labels:t.map(t=>ws[t]),bucketRanges:a}}if("day"===t){const t=function(t,e){const i=[],n=As(t.startMs,e);let s=Ts(n.year,n.month,n.day,0,0,e);for(;s<=t.endMs;){const t=As(s,e);i.push({key:t.dateKey,label:`${t.month}/${t.day}`}),s+=864e5}return i.slice(-Math.ceil(t.hours/24))}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("week"===t){const t=function(t,e,i){const n=[];let s=Ps(t.startMs,e,i);for(;s<=t.endMs;){const t=As(s,e);n.push({key:t.dateKey,label:`${t.month}/${t.day}`}),s+=6048e5}return n}(e,i,n);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}if("month"===t){const t=function(t,e){const i=[],n=As(t.startMs,e);let s=n.year,a=n.month;for(;;){const n=`${s}-${Ss(a)}`;if(i.push({key:n,label:`${s}-${Ss(a)}`}),a+=1,a>12&&(a=1,s+=1),Ts(s,a,1,0,0,e)>t.endMs)break}return i}(e,i);return{keys:t.map(t=>t.key),labels:t.map(t=>t.label),bucketRanges:a}}const o=function(t,e){const i=[];let n=Math.floor(t.startMs/e)*e;for(;n<t.endMs;){const t=n+e,s=new Date(n);i.push({key:String(n),start:n,end:t,label:s.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}),n=t}return i}(e,s);for(const r of o)a.set(r.key,`${new Date(r.start).toLocaleString()} – ${new Date(r.end).toLocaleString()}`);return{keys:o.map(t=>t.key),labels:o.map(t=>t.label),bucketRanges:a}}function Os(t,e,i,n,s,a,o){return"time"===t?o.get(i)??s:"none"===e?s:"hour"===t&&"day"===e||"hour"===t&&"weekday"===e||"weekday"===t&&"week"===e?`${a} ${s}`:`${a} · ${s}`}function Ls(t){return bs[t&&xs[t]||(t&&t in bs?t:void 0)||"week_hourly"]}function Ns(t,e,i,n,s){const a=function(t,e=Date.now()){return{hours:t,endMs:e,startMs:e-60*t*60*1e3}}(ys[i]),o=(r=a.hours)<=24||r<=48||r<=336?36e5:864e5;var r;const l=Is(t,a,n,s,o),c=Is(e,a,n,s,o);return{window:a,bucketMs:o,xAxis:l,yAxis:c,xKeySet:new Set(l.keys),yKeySet:new Set(c.keys),bucketMap:/* @__PURE__ */new Map}}function Fs(t,e,i,n,s,a){if(e.time<t.window.startMs||e.time>t.window.endMs)return;const o=Es(i,e.time,s,t.bucketMs,a),r=Es(n,e.time,s,t.bucketMs,a);if(void 0===o||void 0===r)return;if(!t.xKeySet.has(o)||!t.yKeySet.has(r))return;const l=`${r}|${o}`,c=t.bucketMap.get(l)??[];c.push({time:e.time,value:e.value}),t.bucketMap.set(l,c)}function Rs(t,e,i,n,s,a){const o=[],r=t.yAxis.keys.map((s,a)=>t.xAxis.keys.map((r,l)=>{const c=t.bucketMap.get(`${s}|${r}`)??[],h=function(t,e){if(!t.length)return null;switch(e){case"sum":case"count":return t.reduce((t,e)=>t+e.value,0);case"max":return Math.max(...t.map(t=>t.value));case"min":return Math.min(...t.map(t=>t.value));case"last":{let e=t[0];for(const i of t)i.time>=e.time&&(e=i);return e.value}default:return t.reduce((t,e)=>t+e.value,0)/t.length}}(c,n);return null!==h&&o.push(h),{value:h,count:c.length,rangeLabel:Os(e,i,r,0,t.xAxis.labels[l],t.yAxis.labels[a],t.xAxis.bucketRanges)}}));let l=s,c=a;if(void 0===l||void 0===c){const t=o.length?Math.min(...o):0,e=o.length?Math.max(...o):1;l=l??t,c=c??(e===t?t+1:e)}return c<=l&&(c=l+1),{xLabels:t.xAxis.labels,yLabels:t.yAxis.labels,xKeys:t.xAxis.keys,yKeys:t.yAxis.keys,cells:r,min:l,max:c}}function qs(t,e,i){return null===t?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}ne([At({attribute:!1})],Cs.prototype,"hass",void 0),ne([Pt()],Cs.prototype,"_config",void 0),Cs=ne([bt(cs)],Cs);var Ds=dt(()=>{ys={"24h":24,"48h":48,"7d":168,"14d":336,"30d":720,"90d":2160,"365d":8760},bs={week_hourly:{x:"hour",y:"day",period:"7d"},two_weeks:{x:"hour",y:"day",period:"14d"},daily_rhythm:{x:"hour",y:"weekday",period:"30d"},month_days:{x:"weekday",y:"week",period:"30d"},month_calendar:{x:"weekday",y:"week",period:"90d"},quarter:{x:"week",y:"month",period:"90d"},timeline_24h:{x:"time",y:"none",period:"24h"},timeline_48h:{x:"time",y:"none",period:"48h"},year_overview:{x:"week",y:"month",period:"365d"}},xs={timeline:"timeline_24h",custom:"week_hourly"},ws=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],$s=/* @__PURE__ */new Map,Ms=/* @__PURE__ */new Map,ks=["day","week","month"]});function js(t){if(t.callWS)return t.callWS.bind(t);const e=t.connection;if(e?.sendMessagePromise)return e.sendMessagePromise.bind(e);throw new Error("WebSocket API unavailable")}function Bs(t){return js(t)}function Hs(t){if(!t)return!1;const e=t.split(".",1)[0];return"binary_sensor"===e||"input_boolean"===e}function Us(t,e){return Hs(t)?"count":function(t,e){return!!function(t){return"string"==typeof t?.start&&"string"==typeof t?.end&&void 0!==t?.value}(e)||!!e?.last_reset||!(!t||!/_today$/i.test(t))}(t,e)?"max":function(t){const e=t?.state_class;return"total_increasing"===e||"total"===e}(e)?"last":"mean"}function Gs(t,e){const i=(...t)=>{for(const e of t){if(null==e)continue;const t=Number(e);if(Number.isFinite(t))return t}};switch(e){case"mean":default:return i(t.mean,t.state);case"sum":return i(t.sum,t.change,t.state);case"max":return i(t.max,t.state,t.sum);case"min":return i(t.min,t.state);case"last":return i(t.state,t.mean);case"count":return i(t.change)}}function Ws(t){if("string"==typeof t){const e=Date.parse(t);return Number.isFinite(e)?e:void 0}return t<1e11?1e3*t:t}var Vs,Ys,Ks,Xs,Qs,Zs,Js;async function ta(t,e,i,n,s,a="mean"){const o=Bs(t),r=function(t){return"max"===t||"last"===t}(a);return function(t,e,i=!1){if(t.length<=e)return t;const n=Math.ceil(t.length/e),s=[];for(let a=0;a<t.length;a+=n){const e=t.slice(a,a+n);e.length&&(i?s.push(e.reduce((t,e)=>e.value>t.value||e.value===t.value&&e.time>t.time?e:t,e[0])):s.push(e[0]))}return s}(function(t,e){const i=[];let n=!1;for(const s of t){const t=1e3*(s.lu??s.lc??0);if(e){const e="on"===s.s;e&&!n&&i.push({time:t,value:1}),n=e;continue}const a=Number(s.s);Number.isFinite(a)&&i.push({time:t,value:a})}return i}(function(t,e){return Array.isArray(t)?t[0]??[]:t[e]??[]}(await o({type:"history/history_during_period",start_time:i.toISOString(),end_time:n.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!r}),e),s),8e3,r)}async function ea(t,e,i,n,s,a){const o=Bs(t),r="sum"===s?["sum","change","state"]:"max"===s?["max","state","sum"]:"min"===s?["min","state"]:["mean","state"];return function(t,e){const i=[];for(const n of t){const t=Gs(n,e);if(null==t||!Number.isFinite(t))continue;const s=Ws(n.start);void 0!==s&&i.push({time:s,value:t})}return i}((await o({type:"recorder/statistics_during_period",start_time:i.toISOString(),end_time:n.toISOString(),statistic_ids:[e],period:a,types:r}))[e]??[],s)}async function ia(t,e,i,n){const s=/* @__PURE__ */new Date,a=/* @__PURE__ */new Date(s.getTime()-60*i*60*1e3);if(Hs(e)||"count"===n)return ta(t,e,a,s,!0,n);if(i>=24&&("max"===n||"sum"===n))try{const o=await ea(t,e,a,s,n,i>336?"day":"hour");if(function(t,e){return!!t.length&&("max"!==e&&"sum"!==e||t.some(t=>t.value>0))}(o,n))return o}catch{}if(i>=24&&"mean"===n)try{const o=await ea(t,e,a,s,n,i>336?"day":"hour");if(o.length>0)return o}catch{}return ta(t,e,a,s,!1,n)}var na,sa,aa,oa=dt(()=>{Ds(),Vs="nvision-heat-map-card",Ys="nvision-heat-map-card-editor",Ks="week_hourly",Xs="theme",Qs=[{value:"week_hourly",label:"Week — hour × day"},{value:"two_weeks",label:"Two weeks — hour × day"},{value:"daily_rhythm",label:"Daily rhythm — hour × weekday"},{value:"month_days",label:"Month — weekday × week"},{value:"month_calendar",label:"Quarter calendar — weekday × week"},{value:"quarter",label:"Quarter — week × month"},{value:"timeline_24h",label:"Timeline — 24 hours"},{value:"timeline_48h",label:"Timeline — 48 hours"},{value:"year_overview",label:"Year — week × month"}],Zs=[{value:"theme",label:"Theme"},{value:"semantic",label:"Semantic"},{value:"temperature",label:"Temperature"},{value:"custom",label:"Custom"}],Js=[{value:"auto",label:"Auto"},{value:"mean",label:"Mean"},{value:"sum",label:"Sum"},{value:"max",label:"Maximum"},{value:"min",label:"Minimum"},{value:"count",label:"Count"},{value:"last",label:"Last"}]}),ra=/* @__PURE__ */ut({NvisionHeatMapCardEditor:()=>aa}),la=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),oa(),ae(),na=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"preset",required:!0,default:Ks,selector:{select:{options:[...Qs],mode:"dropdown"}}},{name:"operation",default:"auto",selector:{select:{options:[...Js],mode:"dropdown"}}},{name:"color_mode",required:!0,default:Xs,selector:{select:{options:[...Zs],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_axis_labels",selector:{boolean:{}}},{name:"show_legend",selector:{boolean:{}}},{name:"show_cell_values",selector:{boolean:{}}},{name:"show_current",selector:{boolean:{}}},{name:"dim_low_values",selector:{boolean:{}}}]},re()],sa=[{type:"grid",name:"",schema:[{name:"color_low",selector:{color_rgb:{}}},{name:"color_high",selector:{color_rgb:{}}}]}],aa=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"preset"===t.name?"View":"color_mode"===t.name?"Color mode":"operation"===t.name?"Operation":"color_low"===t.name?"Low color":"color_high"===t.name?"High color":"show_axis_labels"===t.name?"Axis labels":"show_legend"===t.name?"Scale":"show_cell_values"===t.name?"Values in cells":"dim_low_values"===t.name?"Dim low values":"show_current"===t.name?"Current value":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={preset:Ks,color_mode:Xs,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1,...t,color_mode:"primary"===t.color_mode?"theme":t.color_mode,operation:t.operation??"auto"}}_schema(){return"custom"===this._config?.color_mode?[...na,...sa]:na}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){const e=t.detail.value;Ut(this,"config-changed",{config:{...e,color_mode:"primary"===e.color_mode?"theme":e.color_mode}})}},ne([Pt()],aa.prototype,"_config",void 0),aa=ne([bt(Ys)],aa)});function ca(){return new Promise(t=>{"function"!=typeof requestIdleCallback?setTimeout(t,0):requestIdleCallback(()=>t(),{timeout:120})})}function ha(t){return t&&"primary"!==t?t:"theme"}function da(t,e,i,n){const s=ha(i);return"semantic"===s?Te(t,e):"temperature"===s?function(t,e){const i=Se(Me(t,"--info-color","#2196f3")),n=Se(Me(t,"--warning-color","#ff9800")),s=Se(Me(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return Ae(a<=.5?ze(i,n,2*a):ze(n,s,2*(a-.5)))}(t,e):"custom"===s?function(t,e,i,n){return Ae(ze(Se(ke(i,Me(t,"--info-color","#2196f3"))),Se(ke(n,Me(t,"--error-color","#f44336"))),Math.min(1,Math.max(0,e))))}(t,e,n.color_low,n.color_high):function(t,e){const i=Se(Me(t,"--primary-color","#03a9f4")),n=Se(Me(t,"--card-background-color","#1c1c1c")),s=Math.min(1,Math.max(0,e));return Ae(ze(ze(n,i,.18),i,.35+.65*s))}(t,e)}Ct(),Bt(),Ds(),oa(),ae(),Ht({type:Vs,name:"Nvision Heat Map",description:"Temporal heat map for sensor history and patterns"});function ua(t,e,i,n,s){if(!s)return"rgba(0, 0, 0, 0.05)";const a=da(t,e,i,n);return n.dim_low_values?`color-mix(in srgb, ${a} ${22+e*e*78}%, var(--card-background-color))`:a}function ma(t,e,i,n=!1){if(null===t)return"—";const s="count"===e?String(Math.round(t)):Number.isInteger(t)?String(t):n?t.toFixed(0):t.toFixed(1);return i&&"count"!==e?n?s:`${s} ${i}`:s}function pa(t,e,i){return ma(t,e,i,!0)}var ga=null;function fa(t,e){return ga??=document.createElement("canvas").getContext("2d"),ga?(ga.font=e,ga.measureText(t).width):6*t.length}var _a=class extends vt{constructor(...t){super(...t),this._loading=!1,this._fetchVersion=0,this._measureFrame=0,this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(la(),ra)),document.createElement(Ys)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return e.startsWith("sensor.")||e.startsWith("binary_sensor.")||Number.isFinite(Number(i?.state))})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Vs}`,entity:n,preset:Ks,operation:"auto",color_mode:Xs,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1}}_entityAttributes(){const t=this._config?.entity;if(t&&this.hass)return this.hass.states[t]?.attributes}_resolveAggregate(t){const e=this._config?.operation;if(e&&"auto"!==e)return e;const i=this._config?.entity,n=this._entityAttributes();return s=t.x,a=t.y,"count"===(o=Us(i,n))?"count":ks.includes(s)||ks.includes(a)?"max":o;var s,a,o}_computeLoadKey(){const t=this._config;if(!t?.entity)return"";const e=Ls(t.preset),i=this._entityAttributes();return JSON.stringify({entity:t.entity,preset:t.preset,operation:t.operation??"auto",stateClass:i?.state_class,aggregate:this._resolveAggregate(e),axes:e})}setConfig(t){this._config={preset:Ks,operation:"auto",color_mode:Xs,show_axis_labels:!0,show_legend:!0,show_current:!0,show_cell_values:!1,dim_low_values:!1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t,color_mode:ha(t.color_mode)},this._loadKey=void 0}getCardSize(){const t=this._grid?.yLabels.length??4;return Math.max(3,Math.min(8,Math.ceil(.75*t)+2))}getGridOptions(){const t=this._grid?.yLabels.length??4;return{columns:6,rows:Math.max(3,Math.min(8,Math.ceil(.75*t)+2)),min_rows:3}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>this._scheduleXLabelMeasure())}disconnectedCallback(){this._resizeObserver?.disconnect(),cancelAnimationFrame(this._measureFrame),super.disconnectedCallback()}shouldUpdate(t){if(1!==t.size||!t.has("hass"))return!0;const e=t.get("hass"),i=this._config?.entity;return!(e&&this.hass&&i)||(e.states[i]!==this.hass.states[i]||e.config.time_zone!==this.hass.config.time_zone)}updated(t){if(t.has("_config")||t.has("hass")){const t=this._computeLoadKey();t&&this.hass&&t!==this._loadKey&&(this._loadKey=t,this._loadData())}t.has("_grid")&&(this._xLabelVisible=void 0),this._grid&&!1!==this._config?.show_axis_labels&&this._scheduleXLabelMeasure()}_scheduleXLabelMeasure(){cancelAnimationFrame(this._measureFrame),this._measureFrame=requestAnimationFrame(()=>this._updateXLabelVisibility())}_observeGridWrap(t){this._resizeObserver&&t!==this._observedWrap&&(this._observedWrap&&this._resizeObserver.unobserve(this._observedWrap),this._observedWrap=t,this._resizeObserver.observe(t))}_updateXLabelVisibility(){const t=this._grid,e=this.shadowRoot;if(!t||!e||!1===this._config?.show_axis_labels)return;const i=e.querySelector(".grid-wrap"),n=e.querySelector(".data-grid .cell")??e.querySelector(".timeline-grid .cell");if(!i||!n)return;this._observeGridWrap(i);const s=e.querySelector(".data-grid .cell + .cell")??e.querySelector(".timeline-slot + .timeline-slot .cell");let a=n.getBoundingClientRect().width;if(s){const t=n.getBoundingClientRect();a=s.getBoundingClientRect().left-t.left}const o=e.querySelector(".axis.x"),r=o?getComputedStyle(o).font:"500 10px Roboto, sans-serif",l=function(t,e,i,n=6){if(e<=0||!t.length)return t.map(()=>!0);const s=t.map(()=>!1);let a=-1/0;for(let o=0;o<t.length;o++){const r=t[o];if(!r)continue;const l=fa(r,i),c=(o+.5)*e;c-l/2>=a+n&&(s[o]=!0,a=c+l/2)}return s}(t.xLabels,a,r);(function(t,e){return!(!t||!e||t.length!==e.length)&&t.every((t,i)=>t===e[i])})(l,this._xLabelVisible)||(this._xLabelVisible=l)}async _loadData(){const t=this._config,e=this.hass,i=t?.entity;if(!t||!e||!i)return this._grid=void 0,void(this._error=void 0);try{js(e)}catch{return this._error="History unavailable",void(this._grid=void 0)}const n=++this._fetchVersion;this._loading=!0,this._error=void 0;try{const s=Ls(t.preset),a=this._resolveAggregate(s),o=await ia(e,i,ys[s.period],a);if(n!==this._fetchVersion)return;if(await ca(),n!==this._fetchVersion)return;const r=await async function(t,e,i,n,s,a,o=0,r={}){const l=Ns(e,i,n,a,o),c=r.yieldEvery??250;for(let h=0;h<t.length;h++){if(!1===r.shouldContinue?.())return;Fs(l,t[h],e,i,a,o),r.yieldToMain&&(h+1)%c===0&&await r.yieldToMain()}if(!1!==r.shouldContinue?.())return Rs(l,e,i,s,r.minOverride,r.maxOverride)}(o,s.x,s.y,s.period,a,e.config.time_zone||"UTC",1,{shouldContinue:()=>n===this._fetchVersion,yieldToMain:ca});if(n!==this._fetchVersion||!r)return;this._grid=r}catch(s){if(n!==this._fetchVersion)return;this._error=function(t,e="Could not load history"){return t instanceof Error||"object"==typeof t&&null!==t&&"message"in t&&"string"==typeof t.message?t.message:e}(s),this._grid=void 0}finally{n===this._fetchVersion&&(this._loading=!1)}}_showPopover(t,e){const i=t.currentTarget,n=i.closest(".grid-wrap");if(!n)return;const s=i.getBoundingClientRect(),a=n.getBoundingClientRect(),o=this._config,r=o.entity?this.hass?.states[o.entity]:void 0,l=String(r?.attributes.unit_of_measurement??""),c=this._resolveAggregate(Ls(o.preset));this._popover={anchorX:s.left-a.left+s.width/2,anchorY:s.top-a.top,label:e.rangeLabel,value:ma(e.value,c,"count"===c?"":l),count:e.count}}_hidePopover(){this._popover=void 0}_renderLegend(t){const e=this._config,i=ha(e.color_mode),n=e.entity?this.hass?.states[e.entity]:void 0,s=String(n?.attributes.unit_of_measurement??""),a=this._resolveAggregate(Ls(e.preset)),o=`linear-gradient(to bottom, ${Array.from({length:12},(t,n)=>{const s=n/11,a=(100*s).toFixed(1);return`${ua(this,s,i,e,!0)} ${a}%`}).join(", ")})`,r=(t.min+t.max)/2;return W`
      <div class="legend-wrap" aria-hidden="true">
        <div class="legend-labels">
          <span>${pa(t.max,a,s)}</span>
          <span>${pa(r,a,s)}</span>
          <span>${pa(t.min,a,s)}</span>
        </div>
        <div
          class="legend-bar"
          style=${$e({background:o})}
        ></div>
      </div>
    `}_renderCell(t,e,i,n,s,a,o){const r=qs(t.value,n.min,n.max),l=null!==t.value;return W`
      <div
        class=${ss({cell:!0,empty:!l,"has-value":l})}
        tabindex=${l?0:K}
        style=${$e({background:ua(this,r,e,i,l)})}
        @pointerenter=${e=>this._showPopover(e,t)}
        @pointerleave=${this._hidePopover}
        @focus=${e=>this._showPopover(e,t)}
        @blur=${this._hidePopover}
      >
        ${o&&l?W`<span class="cell-value"
              >${ma(t.value,s,"count"===s?"":a,!0)}</span
            >`:K}
      </div>
    `}_renderTimelineGrid(t,e,i,n,s,a,o,r,l){const c=t.cells[0]??[];return W`
      <div class="heatmap-body" style=${$e({"--heatmap-columns":String(Math.max(1,t.xLabels.length))})}>
        <div class="cells-legend-row">
          <div class="grid-wrap">
            <div class="timeline-grid">
                ${c.map((a,c)=>W`
                    <div class="timeline-slot">
                      ${n?W`<div class="axis x timeline-axis">
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
    `}_renderPopover(){return this._popover?W`
      <div
        class="popover"
        role="tooltip"
        style=${$e({left:`${this._popover.anchorX}px`,top:`${this._popover.anchorY}px`})}
      >
        <div class="popover-label">${this._popover.label}</div>
        <div class="popover-value">${this._popover.value}</div>
        <div class="popover-meta">
          ${this._popover.count} sample${1===this._popover.count?"":"s"}
        </div>
      </div>
    `:K}_renderGrid(t){const e=this._config,i=ha(e.color_mode),n=!1!==e.show_axis_labels,s=!0===e.show_cell_values,a=!1!==e.show_legend,o=e.entity?this.hass?.states[e.entity]:void 0,r=String(o?.attributes.unit_of_measurement??""),l=this._resolveAggregate(Ls(e.preset)),c=n?2:1,h=this._xLabelVisible??t.xLabels.map(()=>!0);if(function(t){return 1===t.yKeys.length&&""===t.yKeys[0]}(t))return this._renderTimelineGrid(t,e,i,n,s,a,l,r,h);const d={"--heatmap-columns":String(Math.max(1,t.xLabels.length))},u=`repeat(${t.yLabels.length}, minmax(0, 1fr))`,m=n?`minmax(24px, clamp(32px, 16%, 56px)) repeat(${t.xLabels.length}, minmax(0, 1fr))`:`repeat(${t.xLabels.length}, minmax(0, 1fr))`;return W`
      <div class="heatmap-body" style=${$e(d)}>
        <div class="cells-legend-row">
          <div class="grid-stack">
            ${n?W`
                  <div
                    class="x-axis-row"
                    style=${$e({gridTemplateColumns:m})}
                  >
                    <div class="corner"></div>
                    ${t.xLabels.map((t,e)=>W`
                        <div class="axis x">
                          ${h[e]?t:K}
                        </div>
                      `)}
                  </div>
                `:K}
            <div class="grid-wrap">
              <div
                class="data-grid"
                style=${$e({gridTemplateColumns:m,gridTemplateRows:u})}
              >
                    ${t.cells.flatMap((a,o)=>{const h=o+1;return[n?W`
                            <div
                              class="axis y"
                              style=${$e({gridColumn:"1",gridRow:String(h)})}
                            >
                              ${t.yLabels[o]}
                            </div>
                          `:K,...a.map((n,a)=>{const o=qs(n.value,t.min,t.max),d=null!==n.value;return W`
                          <div
                            class=${ss({cell:!0,empty:!d,"has-value":d})}
                            tabindex=${d?0:K}
                            style=${$e({gridColumn:String(a+c),gridRow:String(h),background:ua(this,o,i,e,d)})}
                            @pointerenter=${t=>this._showPopover(t,n)}
                            @pointerleave=${this._hidePopover}
                            @focus=${t=>this._showPopover(t,n)}
                            @blur=${this._hidePopover}
                          >
                            ${s&&d?W`<span class="cell-value"
                                  >${ma(n.value,l,"count"===l?"":r,!0)}</span
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
    `}render(){if(!this._config||!this.hass)return K;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||this._config.entity||"Heat Map",i=!1!==this._config.show_current?Xt(t):"";return W`
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
            ${t?W`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-icon>`:K}
            <ha-tile-info
              .primary=${e}
              .secondary=${i}
            ></ha-tile-info>
          </div>

          ${this._loading?W`<div class="status">Loading…</div>`:this._error?W`<div class="status error">${this._error}</div>`:this._grid?this._renderGrid(this._grid):W`<div class="status">No data</div>`}
        </div>
      </ha-card>
    `}static{this.styles=[Jt,o`
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
  `]}};ne([At({attribute:!1})],_a.prototype,"hass",void 0),ne([Pt()],_a.prototype,"_config",void 0),ne([Pt()],_a.prototype,"_grid",void 0),ne([Pt()],_a.prototype,"_loading",void 0),ne([Pt()],_a.prototype,"_error",void 0),ne([Pt()],_a.prototype,"_popover",void 0),ne([Pt()],_a.prototype,"_xLabelVisible",void 0),_a=ne([bt(Vs)],_a),$t();var{I:va}=rt,ya=t=>t,ba=()=>document.createComment(""),xa=(t,e,i)=>{const n=t._$AA.parentNode,s=void 0===e?t._$AB:e._$AA;if(void 0===i)i=new va(n.insertBefore(ba(),s),n.insertBefore(ba(),s),t,t.options);else{const e=i._$AB.nextSibling,a=i._$AM,o=a!==t;if(o){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==a._$AU&&i._$AP(e)}if(e!==s||o){let t=i._$AA;for(;t!==e;){const e=ya(t).nextSibling;ya(n).insertBefore(t,s),t=e}}}return i},wa=(t,e,i=t)=>(t._$AI(e,i),t),$a={},Ma=(t,e=$a)=>t._$AH=e,ka=t=>{t._$AR(),t._$AA.remove()};$t();var Ca,Sa,Aa,za,Pa,Ta,Ea=(t,e,i)=>{const n=/* @__PURE__ */new Map;for(let s=e;s<=i;s++)n.set(t[s],s);return n},Ia=_e(class extends ve{constructor(t){if(super(t),t.type!==fe)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let n;void 0===i?i=e:void 0!==e&&(n=e);const s=[],a=[];let o=0;for(const r of t)s[o]=n?n(r,o):o,a[o]=i(r,o),o++;return{values:a,keys:s}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,n]){const s=(t=>t._$AH)(t),{values:a,keys:o}=this.dt(e,i,n);if(!Array.isArray(s))return this.ut=o,a;const r=this.ut??=[],l=[];let c,h,d=0,u=s.length-1,m=0,p=a.length-1;for(;d<=u&&m<=p;)if(null===s[d])d++;else if(null===s[u])u--;else if(r[d]===o[m])l[m]=wa(s[d],a[m]),d++,m++;else if(r[u]===o[p])l[p]=wa(s[u],a[p]),u--,p--;else if(r[d]===o[p])l[p]=wa(s[d],a[p]),xa(t,l[p+1],s[d]),d++,p--;else if(r[u]===o[m])l[m]=wa(s[u],a[m]),xa(t,s[d],s[u]),u--,m++;else if(void 0===c&&(c=Ea(o,m,p),h=Ea(r,d,u)),c.has(r[d]))if(c.has(r[u])){const e=h.get(o[m]),i=void 0!==e?s[e]:null;if(null===i){const e=xa(t,s[d]);wa(e,a[m]),l[m]=e}else l[m]=wa(i,a[m]),xa(t,s[d],i),s[e]=null;m++}else ka(s[u]),u--;else ka(s[d]),d++;for(;m<=p;){const e=xa(t,l[p+1]);wa(e,a[m]),l[m++]=e}for(;d<=u;){const t=s[d++];null!==t&&ka(t)}return this.ut=o,Ma(t,l),Y}}),Oa=dt(()=>{Ca="nvision-entity-overview-card",Sa="nvision-entity-overview-card-editor",Aa="auto",za="on_update",Pa=["sensor","binary_sensor","switch","light","timer"],Ta=["sensor","binary_sensor","switch","light","timer"]});function La(t){const e=t.split(":").map(Number);return 3===e.length?3600*e[0]+60*e[1]+e[2]:2===e.length?60*e[0]+e[1]:Number(t)||0}function Na(t){return void 0!==t&&"unavailable"!==t&&"unknown"!==t&&("on"===t||"true"===t||"open"===t||"home"===t||"active"===t)}function Fa(t,e){const i=e.split(".",1)[0];if("light"===i)return"light";if("timer"===i)return"timer";if("switch"===i||Hs(e))return"toggle";const n=t.states[e]?.state;return void 0!==ti(n)?"numeric":"other"}function Ra(t,e,i,n){const s=ti(t.states[e]?.state);return void 0===s?.35:ei(s,i,n)}function qa(t,e){const i=t.states[e];if(!i||"active"!==i.state)return 0;const n=function(t){const e=t.attributes.remaining;if("string"!=typeof e)return;let i=La(e);if("active"===t.state&&t.attributes.finishes_at){const e=new Date(String(t.attributes.finishes_at)).getTime();i=Math.max((e-Date.now())/1e3,0)}return i}(i),s=function(t){const e=t.attributes.duration;return"string"==typeof e?La(e):0}(i);return void 0===n||s<=0?.55:1-Math.min(1,Math.max(0,n/s))}function Da(t,e,i,n){const s=t.states[e]?.state,a=Fa(t,e),o="light"===a?function(t,e){const i=t.states[e];if(!i||"on"!==i.state)return{lightBrightness:0};const n=ls(i);return{lightColor:n?`rgb(${n.join(", ")})`:void 0,lightBrightness:as(i)}}(t,e):{};return{kind:a,isOn:Na(s),numericNorm:Ra(t,e,i,n),lightColor:o.lightColor,lightBrightness:o.lightBrightness??0,timerUrgency:"timer"===a?qa(t,e):0,unavailable:"unavailable"===s||"unknown"===s}}Oa(),ui();var ja=[.42,.58,.72,.84],Ba=[185,198,215,248,278,312,42],Ha=2*Math.PI,Ua=.34,Ga=1.1,Wa=.06;function Va(t){let e=2166136261;for(let i=0;i<t.length;i+=1)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function Ya(t,e){const i=Math.min(ja.length,Math.max(2,Math.ceil(Math.sqrt(e)))),n=t%i,s=Math.ceil(e/i);return{shell:n,slot:Math.floor(t/i)%s,slotsOnShell:s}}function Ka(t,e){const i=(14e-6*e+.31*t)%Ba.length,n=Math.floor(i);return Ba[n]+(Ba[(n+1)%Ba.length]-Ba[n])*(i-n)}function Xa(t,e,i,n){const s=Da(e,t.entityId,i,n);t.kind=s.kind,t.isOn=s.isOn,t.numericNorm=s.numericNorm,t.lightColor=s.lightColor,t.lightBrightness=s.lightBrightness,t.timerUrgency=s.timerUrgency,t.unavailable=s.unavailable}function Qa(t,e){const i=Za(t,e),n=.014*e;return Math.min(3.4,Math.max(.5,n/Math.max(i,.004*e)))}function Za(t,e){return"numeric"===t.kind?Ja(e,t.numericNorm):to(e,t.kind)}function Ja(t,e){return t*(.006+.028*e)}function to(t,e){switch(e){case"toggle":return.016*t;case"light":return.011*t;case"timer":return.013*t;case"numeric":return.012*t;default:return.01*t}}function eo(t,e){e.push({x:t.x,y:t.y,age:0,seed:t.seed})}function io(t,e){if("manual"===(e.mode??"auto")&&e.entities?.length)return e.entities.filter(e=>Boolean(t.states[e]));const i=e.domains?.length?e.domains:Pa,n=e.max_particles??32,s=e.exclude??[];return Object.keys(t.states).filter(e=>{const n=e.split(".",1)[0];return!!i.includes(n)&&(!function(t,e){for(const i of e)if(i)if(i.includes("*")){if(new RegExp(`^${i.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*")}$`).test(t))return!0}else if(t===i)return!0;return!1}(e,s)&&"unavailable"!==t.states[e]?.state)}).sort((t,e)=>t.localeCompare(e)).slice(0,n)}function no(t,e,i,n,s,a){const o=Va(e),r=Va(`${e}:y`),l=Ya(s,a),c=t.states[e]?.state,h={entityId:e,kind:Fa(t,e),seed:o,seedY:r,x:0,y:0,phase:o*Ha,shell:l.shell,slot:l.slot,slotsOnShell:l.slotsOnShell,orbitTilt:o*Ha,orbitRyScale:.62+.32*r,baseOrbitSpeed:85e-5+.0011*o,wobbleSpeed:.0016+.0024*r,pathDrift:0,isOn:!1,lastState:c,numericNorm:.35,lightBrightness:0,timerUrgency:0,unavailable:"unavailable"===c||"unknown"===c,placed:!1};return Xa(h,t,i,n),h}function so(t,e){const i=t/2,n=Math.min(.22*e,72),s=(e-n)/2,a=Math.max(10,.06*t),o=Math.max(10,.06*e+.35*n),r=Math.max(1,t/2-a),l=Math.max(1,(e-n)/2-o);return{cx:i,cy:s,halfW:r,halfH:l,scale:Math.min(t,e),clampX:r,clampY:l}}function ao(t,e,i,n){const{cx:s,cy:a,halfW:o,halfH:r}=so(e,i),l=ja[t.shell%ja.length],c=t.slot/Math.max(1,t.slotsOnShell)*Ha+.55*t.seed+t.phase,h=o*l,d=r*l*t.orbitRyScale,u=Math.cos(c)*h,m=Math.sin(c)*d,p=t.orbitTilt;let g=s+u*Math.cos(p)-m*Math.sin(p),f=a+u*Math.sin(p)+m*Math.cos(p);const _=.001*n,v=.028+.018*t.seed;return g+=Math.cos(_*t.wobbleSpeed+11*t.seed)*h*v,f+=Math.sin(_*t.wobbleSpeed*1.23+9*t.seedY)*d*v,{x:g,y:f}}function oo(t,e,i,n){const s=ao(t,e,i,n),a=ao(t,e,i,n+24),o=a.x-s.x,r=a.y-s.y,l=Math.hypot(o,r);return l<.01?{x:1,y:0}:{x:o/l,y:r/l}}function ro(t,e,i,n){const s=ao(t,e,i,n);t.x=s.x,t.y=s.y,t.pathDrift=0,t.placed=!0}function lo(t,e,i){const n=Ka(t.seed,e);let s=82,a=58;return t.unavailable&&(s=18,a=42),`hsla(${n}, ${s}%, ${a}%, ${i})`}function co(t,e){for(const i of e)t.beginPath(),t.arc(i.x,i.y,i.radius,0,Ha),t.fillStyle=i.color,t.fill()}function ho(t,e,i,n,s,a=.5){const o=i*(1+s*a),r={core:{x:t,y:e,radius:i,color:n}};return o>1.02*i&&(r.halo={x:t,y:e,radius:o,color:n.replace(/[\d.]+\)$/,.07+.1*s+")")}),r}function uo(t,e,i){switch(t.kind){case"toggle":return function(t,e,i){const n=to(e,"toggle"),s=t.isOn?.009:.007,a=(Math.sin(i*s+12*t.seed)+1)/2,o=Ka(t.seed,i),r=t.unavailable?18:t.isOn?38+50*a:38,l=t.unavailable?42:t.isOn?36+22*a:36,c=`hsla(${o}, ${r}%, ${l}%, ${t.unavailable?.18:t.isOn?Ua+.44*a:Ua})`,h=t.unavailable?1.08*n:t.isOn?n*(Ga+.4*a):n*Ga,d=`hsla(${o}, ${r}%, ${Math.max(l-6,40)}%, ${t.isOn?Wa+.12*a:Wa})`;return{halo:h>1.02*n?{x:t.x,y:t.y,radius:h,color:d}:void 0,core:{x:t.x,y:t.y,radius:n,color:c}}}(t,e,i);case"light":return function(t,e,i){const n=t.lightBrightness,s=to(e,"light"),a=t.unavailable?.25:t.isOn?.55+.35*n:.18,o=t.lightColor??(t.isOn?"rgb(255, 183, 77)":lo(t,i,.25)),r=mo(o,a),l=t.unavailable?1.08*s:t.isOn?s*(1.35+2.15*n):1.08*s,c=mo(o,t.isOn?.08+.16*n:.05);return{halo:l>1.02*s?{x:t.x,y:t.y,radius:l,color:c}:void 0,core:{x:t.x,y:t.y,radius:s,color:r}}}(t,e,i);case"timer":return function(t,e,i){const n=t.timerUrgency,s=to(e,"timer"),a=.005+.048*n,o=Math.sin(i*a+10*t.seed),r=(o+1)/2,l=r*o*(24+36*n),c=(Ka(t.seed,i)+l+360)%360,h=52+6*n,d=.38+.24*n,u=t.unavailable?18:38+50*r,m=t.unavailable?42:36+r*(h-36),p=`hsla(${c}, ${u}%, ${m}%, ${t.unavailable?.25:Ua+r*(d-Ua)})`,g=t.unavailable?1.08*s:s*(Ga+r*(.35+.45*n)),f=`hsla(${c}, ${u}%, ${Math.max(m-4,40)}%, ${Wa+r*(.08+.12*n)})`;return{halo:g>1.02*s?{x:t.x,y:t.y,radius:g,color:f}:void 0,core:{x:t.x,y:t.y,radius:s,color:p}}}(t,e,i);default:return function(t,e,i){const n="numeric"===t.kind?Ja(e,t.numericNorm):to(e,t.kind),s=t.unavailable?.28:.78,a=lo(t,i,s);return ho(t.x,t.y,n,a,.65*s)}(t,e,i)}}function mo(t,e){const i=t.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);return i?`rgba(${i[1]}, ${i[2]}, ${i[3]}, ${e})`:t.match(/hsla?\(([^)]+)\)/)?t.replace(/[\d.]+\)$/,`${e})`):t}function po(t,e,i,n,s,a){const{cx:o,cy:r,scale:l,clampX:c,clampY:h}=so(e,i),d=.012*l,u=.003*l,m=.05*a,p=.024*a,g=.09*l,f=t.map(t=>function(t,e){const i=Za(t,e);return"toggle"===t.kind?t.isOn?1.55*i:i*Ga:"light"===t.kind?t.isOn?i*(1.2+1.4*t.lightBrightness):1.08*i:"timer"===t.kind?1.45*i:1.3*i}(t,l));for(let v=0;v<t.length;v+=1){const e=t[v];e.phase+=e.baseOrbitSpeed*Qa(e,l)*n}const _=t.map(t=>{return{target:ao(t,e,i,s),normal:(n=oo(t,e,i,s),{x:-n.y,y:n.x})};var n});for(let v=0;v<t.length;v+=1){const e=t[v],{target:i,normal:s}=_[v],a=f[v],y=Math.max(a,u)/d,b=m*Math.min(1.35,Math.max(.4,1/Math.sqrt(y)));let x=-e.pathDrift*b*n;const w=i.x+s.x*e.pathDrift,$=i.y+s.y*e.pathDrift;for(let o=0;o<t.length;o+=1){if(o===v)continue;const e=t[o],i=_[o],r=f[o],c=a+r,h=c+.014*l,d=w-(i.target.x+i.normal.x*e.pathDrift),m=$-(i.target.y+i.normal.y*e.pathDrift),g=Math.hypot(d,m);if(g<=.5||g>=h)continue;const b=(h-g)/(h-.65*c),M=Math.max(0,c-g),k=(b**1.2+M/c*2.5)*p*(Math.max(r,u)/Math.max(a,u))*n,C=d/g*s.x+m/g*s.y;x+=C*k,M>0&&(x+=C*(M/c)*.35*(1/y)*n)}e.pathDrift+=x,e.pathDrift=Math.min(g,Math.max(-g,e.pathDrift));let M=i.x+s.x*e.pathDrift,k=i.y+s.y*e.pathDrift;M=Math.min(o+c,Math.max(o-c,M)),k=Math.min(r+h,Math.max(r-h,k)),e.x=M,e.y=k,e.pathDrift=(M-i.x)*s.x+(k-i.y)*s.y,e.placed=!0}}function go(t,e,i,n,s,a,o=[]){const{cx:r,cy:l,scale:c}=so(n,s);t.clearRect(0,0,n,s);const h=t.createRadialGradient(r,l,0,r,l,.72*c);h.addColorStop(0,"hsla(200, 70%, 58%, 0.06)"),h.addColorStop(.35,"hsla(260, 55%, 42%, 0.03)"),h.addColorStop(1,"hsla(0, 0%, 0%, 0)"),t.fillStyle=h,t.fillRect(0,0,n,s),function(t,e,i,n){for(const s of e){const e=s.age/1400,a=i*(.03+.48*e),o=(1-e)**1.2*.11,r=Ka(s.seed,n);t.beginPath(),t.arc(s.x,s.y,a,0,Ha),t.strokeStyle=`hsla(${r}, 86%, 64%, ${o})`,t.lineWidth=1+1.4*(1-e),t.stroke()}}(t,i,c,a);const d=[],u=[];for(const m of e){const t=uo(m,c,a);t.halo&&d.push(t.halo),u.push(t.core)}co(t,d),o.length&&function(t,e,i,n){for(const s of e){const e=`hsla(${Ka(s.seed,n)}, 78%, 62%, 0.42)`;t.beginPath(),t.moveTo(s.fromX,s.fromY),t.lineTo(s.toX,s.toY),t.strokeStyle=e,t.lineWidth=1,t.stroke(),t.beginPath(),t.arc(s.toX,s.toY,.0045*i,0,Ha),t.fillStyle=e.replace(/[\d.]+\)$/,"0.65)"),t.fill()}}(t,o,c,a),co(t,u);!function(t,e,i,n,s,a,o=.5){const r=ho(e,i,n,s,a,o);r.halo&&co(t,[r.halo]),co(t,[r.core])}(t,r,l,.012*c*(.55+.12*Math.sin(.0018*a)),`hsla(${Ba[Math.floor(14e-6*a%Ba.length)]}, 88%, 68%, 0.65)`,.5,.3)}var fo,_o,vo,yo=/* @__PURE__ */ut({NvisionEntityOverviewCardEditor:()=>vo}),bo=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),Oa(),ae(),fo=[{name:"name",selector:{text:{}}},{name:"mode",required:!0,default:Aa,selector:{select:{options:[{value:"auto",label:"Auto-discover entities"},{value:"manual",label:"Manual entity list"}]}}},{name:"max_particles",default:32,selector:{number:{min:4,max:64,mode:"box"}}},{name:"info_selection",required:!0,default:za,selector:{select:{options:[{value:"on_update",label:"On update"},{value:"random_interval",label:"Random every 10s"},{value:"nearest_cursor",label:"Nearest 4 to cursor/tap"}]}}},{name:"show_info",default:!0,selector:{boolean:{}}},{name:"show_info_change",default:!1,selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},re()],_o=[{name:"entities",selector:{entity:{multiple:!0,domain:[...Ta]}}}],vo=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"mode"===t.name?"Entity source":"entities"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entities"):"max_particles"===t.name?"Maximum particles":"info_selection"===t.name?"Info card selection":"show_info"===t.name?"Show info cards":"show_info_change"===t.name?"Show value change (10W → 50W)":"min"===t.name?"Numeric orbit min":"max"===t.name?"Numeric orbit max":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={mode:Aa,max_particles:32,min:0,max:100,entities:[],...t}}_schema(){return"manual"===this._config?.mode?[...fo.slice(0,3),..._o,...fo.slice(3)]:fo}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],vo.prototype,"_config",void 0),vo=ne([bt(Sa)],vo)});Ct(),Bt(),Oa(),ae();Ht({type:Ca,name:"Nvision Entity Overview",description:"Orbiting sensor particles with reactor-style pulse effects"});var xo,wo,$o,Mo,ko,Co=class extends vt{constructor(...t){super(...t),this._slotIds=Array(4).fill(""),this._infoChangeFrom={},this._frameId=0,this._animating=!1,this._lastFrame=0,this._particles=[],this._pulses=[],this._entityKey="",this._slotAge=Array(4).fill(0),this._lastRandomPickMs=0,this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(bo(),yo)),document.createElement(Sa)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)],s=/* @__PURE__ */new Set,a=[];for(const o of n){if(s.has(o))continue;s.add(o);const t=o.split(".",1)[0];if("sensor"!==t&&"binary_sensor"!==t&&"switch"!==t&&"light"!==t&&"timer"!==t||a.push(o),a.length>=8)break}return{type:`custom:${Ca}`,mode:Aa,entities:a.length?a:void 0,max_particles:32,min:0,max:100}}setConfig(t){this._config={mode:Aa,max_particles:32,min:0,max:100,info_selection:za,show_info:!0,show_info_change:!1,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t},this._entityKey="",this._pulses=[],this._lastRandomPickMs=0,this._lastNearestPick=void 0,this._infoChangeFrom={}}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._lastFrame=0,this._startAnimation()}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,super.disconnectedCallback()}shouldUpdate(t){if(t.has("_config")||t.has("_slotIds"))return!0;if(!t.has("hass"))return!0;const e=t.get("hass");if(!e||!this.hass)return!0;for(const i of this._slotIds)if(i&&e.states[i]!==this.hass.states[i])return!0;return!1}willUpdate(t){(t.has("hass")||t.has("_config"))&&this.hass&&this._config&&this._syncParticles(performance.now(),!0)}updated(t){this._ensureCanvas()}_canvasSize(){const t=this._canvas;return t?{width:t.clientWidth,height:t.clientHeight}:{width:0,height:0}}_syncParticles(t=performance.now(),e=!0){if(!this.hass||!this._config)return;const{width:i,height:n}=this._canvasSize(),s=function(t,e){if("manual"===(e.mode??"auto")&&e.entities?.length)return e.entities.filter(e=>Boolean(t.states[e]));const i=e.domains?.length?e.domains:[...Ta],n=e.max_particles??32;return Object.keys(t.states).filter(t=>i.includes(t.split(".",1)[0])).sort((t,e)=>t.localeCompare(e)).slice(0,n)}(this.hass,this._config).join("|"),a=[this._config.mode,this._config.max_particles,(this._config.domains??[]).join(","),(this._config.exclude??[]).join(","),this._config.min,this._config.max,(this._config.entities??[]).join(",")].join(";");s+a!==this._entityKey&&(this._pulses=[],this._entityKey=s+a);const o=/* @__PURE__ */new Map;if(this._showInfoChange())for(const h of this._particles)void 0!==h.lastState&&o.set(h.entityId,this._formatEntityState(h.entityId,h.lastState));const{particles:r,changedIds:l}=function(t,e,i,n,s=0,a=0,o=0){const r=i.min??0,l=i.max??100,c=io(e,i),h=new Map(t.map(t=>[t.entityId,t])),d=[],u=[];for(let m=0;m<c.length;m+=1){const t=c[m],i=h.get(t);if(i){const s=Ya(m,c.length),a=e.states[t]?.state??"";i.shell=s.shell,i.slot=s.slot,i.slotsOnShell=s.slotsOnShell,void 0!==i.lastState&&a!==i.lastState&&(eo(i,n),u.push(t)),i.lastState=a,Xa(i,e,r,l),d.push(i);continue}const p=no(e,t,r,l,m,c.length);s>0&&a>0&&ro(p,s,a,o),d.push(p)}return{particles:d,changedIds:u}}(this._particles,this.hass,this._config,this._pulses,i,n,t);if(this._particles=r,!e&&!l.length)return;const c=this._config.info_selection??"on_update";if("on_update"===c)for(const h of l)this._assignToOldestSlot(h);else"random_interval"===c&&0===this._lastRandomPickMs&&this._pickRandomSlots(t);if(this._showInfoChange()&&l.length)for(const h of l){const t=o.get(h);t&&(this._infoChangeFrom[h]=t)}this._pruneInfoChangeFrom()}_infoSelection(){return this._config?.info_selection??"on_update"}_showInfo(){return this._config?.show_info??!0}_showInfoChange(){return this._config?.show_info_change??!1}_formatEntityState(t,e){const i=this.hass?.states[t];return i?Xt({...i,state:e}):e}_slotSecondary(t){const e=this.hass?.states[t],i=Xt(e);if(!this._showInfoChange())return i;const n=this._infoChangeFrom[t];return n&&n!==i?`${n} → ${i}`:i}_pruneInfoChangeFrom(){const t=new Set(this._slotIds.filter(Boolean)),e={};for(const[i,n]of Object.entries(this._infoChangeFrom))t.has(i)&&(e[i]=n);Object.keys(e).length!==Object.keys(this._infoChangeFrom).length&&(this._infoChangeFrom=e)}_setSlotIds(t){const e=t.slice(0,4);for(;e.length<4;)e.push("");e.join("|")!==this._slotIds.join("|")&&this._slotIds.filter(Boolean).sort().join("|")!==e.filter(Boolean).sort().join("|")&&(this._slotIds=e,this._pruneInfoChangeFrom())}_assignToOldestSlot(t){const e=this._slotIds.indexOf(t);if(e>=0){const t=[...this._slotAge];return t[e]=performance.now(),void(this._slotAge=t)}const i=[...this._slotIds],n=[...this._slotAge];let s=0;for(let a=1;a<4;a+=1)n[a]<n[s]&&(s=a);if(i[s]===t)return n[s]=performance.now(),void(this._slotAge=n);i[s]=t,n[s]=performance.now(),this._slotIds=i,this._slotAge=n,this._pruneInfoChangeFrom()}_pickRandomSlots(t=performance.now()){const e=this._particles.filter(t=>t.placed).map(t=>t.entityId);if(!e.length)return;const i=[...e];for(let n=i.length-1;n>0;n-=1){const t=Math.floor(Math.random()*(n+1));[i[n],i[t]]=[i[t],i[n]]}this._setSlotIds(i),this._slotAge=Array(4).fill(t),this._lastRandomPickMs=t}_pickNearestSlots(t,e,i=!1){const n=this._particles.filter(t=>t.placed).map(i=>({entityId:i.entityId,distance:Math.hypot(i.x-t,i.y-e)})).sort((t,e)=>t.distance-e.distance);if(!n.length)return;const s=this._slotIds.filter(Boolean);if(!s.length||i)return this._setSlotIds(n.slice(0,4).map(t=>t.entityId)),void(this._lastNearestPick={x:t,y:e});if(!i&&this._lastNearestPick&&Math.hypot(t-this._lastNearestPick.x,e-this._lastNearestPick.y)<12)return;const a=new Map(n.map(t=>[t.entityId,t.distance])),o=new Set(s),r=[...s];for(const l of n){if(o.has(l.entityId))continue;if(r.length<4){r.push(l.entityId),o.add(l.entityId);continue}let t=0,e=a.get(r[0])??1/0;for(let i=1;i<r.length;i+=1){const n=a.get(r[i])??1/0;n>e&&(e=n,t=i)}l.distance+24<e&&(o.delete(r[t]),r[t]=l.entityId,o.add(l.entityId))}this._setSlotIds(r),this._lastNearestPick={x:t,y:e}}_refreshInfoSlots(t,e,i){const n=this._infoSelection();"random_interval"!==n?"nearest_cursor"===n&&!this._slotIds.some(Boolean)&&this._particles.some(t=>t.placed)&&this._pickNearestSlots(this._pointerX??t/2,this._pointerY??e/2,!0):(0===this._lastRandomPickMs||i-this._lastRandomPickMs>=1e4)&&this._pickRandomSlots(i)}_trackPointer(t){const e=this._stage;if(!e)return;const i=e.getBoundingClientRect(),n=t.clientX-i.left,s=t.clientY-i.top;this._pointerX=n,this._pointerY=s,"nearest_cursor"===this._infoSelection()&&this._pickNearestSlots(n,s)}_infoAnchors(){const t=this._stage;if(!t)return[];const e=t.getBoundingClientRect(),i=this.shadowRoot?.querySelectorAll(".info-slot")??[];return Array.from(i).map(t=>{const i=t.getBoundingClientRect();return{x:i.left+i.width/2-e.left,y:i.top+2-e.top}})}_buildConnections(){if(!this._showInfo())return[];const t=this._infoAnchors(),e=[];for(let i=0;i<4;i+=1){const n=this._slotIds[i];if(!n)continue;const s=this._particles.find(t=>t.entityId===n),a=t[i];s?.placed&&a&&e.push({fromX:s.x,fromY:s.y,toX:a.x,toY:a.y,seed:s.seed})}return e}_ensureCanvas(){const t=this._canvas;if(t){if(!this._ctx){if(this._ctx=t.getContext("2d")??void 0,!this._ctx)return;this._resizeObserver=new ResizeObserver(()=>{this._resizeCanvas()}),this._resizeObserver.observe(this._stage??t.parentElement??this)}this._resizeCanvas(),this._animating||(this._lastFrame=0,this._startAnimation())}}_startAnimation(){if(this._animating||!this._ctx)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1,n=this._lastFrame?e-this._lastFrame:16.67;this._lastFrame=e,this._draw(i,n,e),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_draw(t,e,i){const n=this._canvas,s=this._ctx;if(!(n&&s&&this.hass&&this._config))return;const a=n.clientWidth,o=n.clientHeight;if(a<=0||o<=0)return;this._syncParticles(i,!1);const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;!function(t,e,i,n,s,a,o,r){const l=r?.15:1,c=i?.min??0,h=i?.max??100;if(e)for(const d of t)"timer"!==d.kind&&"light"!==d.kind&&"numeric"!==d.kind&&"toggle"!==d.kind||Xa(d,e,c,h);po(t,n,s,a,o,l)}(this._particles,this.hass,this._config,a,o,t,i,r),function(t,e){for(let i=t.length-1;i>=0;i-=1)t[i].age+=e,t[i].age>=1400&&t.splice(i,1)}(this._pulses,e),this._refreshInfoSlots(a,o,i),go(s,this._particles,this._pulses,a,o,i,this._buildConnections())}render(){if(!this._config||!this.hass)return K;const t=this._config.name||"Entity Overview",e=this._showInfo();return W`
      <ha-card aria-label=${t}>
        <div class="stage">
          <canvas aria-hidden="true"></canvas>
          <div
            class="overlay"
            role="button"
            tabindex="0"
            @click=${this._actions.bind().click}
            @dblclick=${this._actions.bind().dblclick}
            @keydown=${this._actions.bind().keydown}
            @pointerdown=${t=>{this._trackPointer(t),this._actions.bind().pointerdown(t)}}
            @pointermove=${this._trackPointer}
            @pointerup=${this._actions.bind().pointerup}
            @pointerleave=${this._actions.bind().pointerleave}
            @pointercancel=${this._actions.bind().pointercancel}
          >
            ${e?W`
                  <div class="info-bar">
                    ${Ia(this._slotIds,(t,e)=>t||`empty-${e}`,(t,e)=>{const i=t?this.hass.states[t]:void 0;return W`
                          <div
                            class="info-slot"
                            data-slot=${e}
                            @click=${t=>t.stopPropagation()}
                          >
                            ${i?W`
                                  <ha-state-icon
                                    .hass=${this.hass}
                                    .stateObj=${i}
                                  ></ha-state-icon>
                                  <ha-tile-info
                                    .primary=${i.attributes.friendly_name??t}
                                    .secondary=${this._slotSecondary(t)}
                                  ></ha-tile-info>
                                `:W`<span class="info-empty">—</span>`}
                          </div>
                        `})}
                  </div>
                `:K}
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Jt,te,ee,o`
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
        cursor: pointer;
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
        text-align: center;
        contain: layout style;
      }

      .info-slot ha-state-icon {
        --mdc-icon-size: 18px;
        opacity: 0.92;
        transition: none;
      }

      .info-slot ha-tile-info {
        width: 100%;
        --ha-tile-info-primary-font-size: var(--nv-label-font-size, 0.72rem);
        --ha-tile-info-secondary-font-size: var(--nv-subtitle-font-size, 0.66rem);
        min-height: 2.2em;
      }

      .info-empty {
        font-size: var(--nv-subtitle-font-size, 0.78rem);
        color: var(--secondary-text-color);
        opacity: 0.55;
      }
    `]}};ne([At({attribute:!1})],Co.prototype,"hass",void 0),ne([Pt()],Co.prototype,"_config",void 0),ne([Pt()],Co.prototype,"_slotIds",void 0),ne([Lt(".stage")],Co.prototype,"_stage",void 0),ne([Lt("canvas")],Co.prototype,"_canvas",void 0),Co=ne([bt(Ca)],Co);var So=dt(()=>{xo="nvision-reactor-temp-card",wo="nvision-reactor-temp-card-editor",$o=.12,Mo=.06,ko=.032});So();var Ao=[[118,198,255],[72,152,238],[48,214,196],[255,148,44],[255,82,26],[220,30,22],[168,16,36],[255,52,96],[255,118,32]];function zo(t){return t-Math.floor(t)}function Po([t,e,i],n){return`rgba(${t}, ${e}, ${i}, ${n})`}function To(t,e,i){return[Math.round(t[0]+(e[0]-t[0])*i),Math.round(t[1]+(e[1]-t[1])*i),Math.round(t[2]+(e[2]-t[2])*i)]}function Eo(t){const e=Math.min(1,Math.max(0,t));return e*e*(3-2*e)}function Io(t){return Eo(Math.max(0,(t-.52)/.48))}function Oo(t,e,i){const n=Eo(t),s=Io(t);if(n<.34)return To(Ao[e%3],Ao[2],n/.34);if(n<.58){return To(Ao[2],Ao[3+e%2],(n-.34)/.24)}const a=[Ao[4],Ao[5],Ao[6],Ao[7],Ao[8],Ao[4]],o=a[e%a.length],r=a[(e+2+Math.floor(3*n))%a.length],l=.5*Math.sin(3.4*i+1.65*e)+.5,c=.5*Math.sin(5.8*i+.85*e)+.5;let h=To(o,r,.55*l+.25*n);if(s>.08){h=To(h,a[(e+Math.floor(3*c))%a.length],s*(.35+.3*c)),h=To(h,Ao[7],s*Math.max(0,Math.sin(7.2*i+e))*.28)}return h}function Lo(t,e){const i=Eo(t),n=Io(t);if(i<.4)return To(Ao[1],Ao[2],i/.4);if(n<.12)return To(Ao[3],Ao[4],(i-.4)/.25);const s=.5*Math.sin(4.6*e)+.5,a=.5*Math.sin(8.4*e+1.2)+.5;return To(To(Ao[4],Ao[8],s),To(Ao[5],Ao[7],a),.65*n+.2*i)}function No(t,e,i,n){return e*(1+.06*Math.sin(3*t+1.15*i)*n+.038*Math.sin(5*t-.9*i)*n+.045*Math.cos(2*t+.65*i)*n)}function Fo(t,e,i,n,s,a){t.beginPath();for(let o=0;o<=72;o++){const r=o/72*Math.PI*2,l=No(r,n,s,a),c=e+Math.cos(r)*l,h=i+Math.sin(r)*l;0===o?t.moveTo(c,h):t.lineTo(c,h)}t.closePath()}function Ro(t,e){const i=Eo(t);return i<.35?To(Ao[0],Ao[2],i/.35):i<.55?To(Ao[2],Ao[4],(i-.35)/.2):Lo(t,e)}function qo(t,e){return.52+.16*zo(1.27*e)+.045*t}function Do(t,e,i,n,s,a){const o=To(s,[255,92,38],.18),r=t.createRadialGradient(e,i,0,e,i,n);r.addColorStop(0,Po(o,.82*a)),r.addColorStop(.34,Po(s,.54*a)),r.addColorStop(.68,Po(To(s,[70,8,14],.4),.2*a)),r.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=r,t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fill()}function jo(t,e,i,n,s,a,o,r,l=1){const c=Lo(o,s),h=1+Math.sin(3.1*s)*r*.035,d=.35*Eo(o)+.75*r;t.save(),Fo(t,e,i,n*l*h,s,a),d>.08&&(t.fillStyle=Po(c,.015+.045*d),t.fill()),t.shadowColor=Po(c,.55+.35*r),t.shadowBlur=6+28*d,t.strokeStyle=Po(c,.12+.26*r+.1*Eo(o)),t.lineWidth=1.2+2.4*r,t.stroke(),t.shadowBlur=0,r>.35&&(Fo(t,e,i,n*l*h*.96,1.18*s,1.08*a),t.shadowColor=Po(To(c,Ao[7],.45),.45),t.shadowBlur=4+16*r,t.strokeStyle=Po(To(c,Ao[7],.45),.06+.14*r),t.lineWidth=.8+1.2*r,t.stroke(),t.shadowBlur=0),t.restore()}function Bo(t){const e=Eo(t);return e<.32?To(Ao[0],Ao[2],e/.32):e<.62?To(Ao[2],Ao[4],(e-.32)/.3):To(Ao[4],Ao[5],(e-.62)/.38)}function Ho(t,e,i,n,s,a,o){const r=e/2,l=i/2,c=Math.min(e,i),h=Eo(n),d=Eo(s),u=Io(n),m=Io(s),p=c*(.22+.12*d),g=o?0:a,f=.1+.18*d+m*m*.82,_=.06+.18*(1-d),v=p*(.035+.055*m),y=1+Math.sin(2.3*g)*(.018+.035*m),b=f*(.55+.25*(1-m)),x=.42*h+.68*u;!function(t,e,i,n,s,a,o){const r=Eo(s),l=Io(s),c=.1+.48*r+.82*l,h=Ro(s,a),d=n*o*(1+Math.sin(3.8*a)*l*.08);t.save(),t.globalCompositeOperation="lighter";const u=[{scale:3.05,alpha:.034*c},{scale:2.15,alpha:.062*c},{scale:1.48,alpha:.098*c},{scale:1.06,alpha:.13*c}];for(const m of u){const n=d*m.scale,s=t.createRadialGradient(e,i,0,e,i,n);s.addColorStop(0,Po(h,1.12*m.alpha)),s.addColorStop(.34,Po(h,.52*m.alpha)),s.addColorStop(.68,Po(To(h,[40,0,0],.25),.15*m.alpha)),s.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=s,t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.fill()}t.restore()}(t,r,l,p,n,g,y),t.save(),t.globalCompositeOperation="screen",Fo(t,r,l,p*y*1.08,g,b),t.clip(),Do(t,r+Math.sin(1.4*g)*v*.35,l+Math.cos(1.2*g)*v*.35,p*(.64+.05*d),Oo(n,0,g),.15+.14*h);for(let w=0;w<6;w++){const e=2.399963*w,i=p*_*(.42+.58*zo(e)),s=g*(.5+.11*w+.75*m)+e*Math.PI*2,a=r+Math.cos(s)*i+Math.cos(2.3*s+1.5*g)*v,o=l+Math.sin(1.07*s)*i+Math.sin(1.85*s+1.1*g)*v,c=p*qo(d,e),u=.11+.1*h+.04*zo(e);Do(t,a,o,c,Oo(n,w+1,g),u)}t.restore(),x>.2&&(t.save(),t.globalCompositeOperation="lighter",Fo(t,r,l,p*y*1.02,g,.75*f),t.fillStyle=Po(Ro(n,g),.02+.045*x),t.fill(),t.restore()),jo(t,r,l,p*y,g,f,n,m),m>.2&&jo(t,r,l,p*y*1.05,1.22*g,1.12*f,n,m,1)}function Uo(t,e){const{width:i,height:n}=e;if(i<=0||n<=0)return;t.clearRect(0,0,i,n);const s=e.hasSetpoint?Math.max(.45*e.directionStrength+.42*e.tempNorm,.38*e.tempNorm):.18+.68*e.tempNorm;!function(t,e,i,n,s){const a=e/2,o=i/2,r=1.08*Math.hypot(a,o),l=.32+.48*s,c=t.createRadialGradient(a,o,.28*r,a,o,r);c.addColorStop(0,"rgba(0, 0, 0, 0)"),c.addColorStop(.52,Po(n,.22*l)),c.addColorStop(1,Po(n,.82*l)),t.fillStyle=c,t.fillRect(0,0,e,i)}(t,i,n,function(t,e,i,n){const s=Bo(e);return i?"heating"===t?To(s,To(Ao[4],Ao[8],.45),.16+.24*n):"cooling"===t?To(s,To(Ao[1],Ao[2],.55),Math.min(.38,n*(1-.85*e))):"off"===t?To(s,Bo(.35*e),.12):s:s}(e.direction,e.tempNorm,e.hasSetpoint,e.directionStrength),s),e.ice>.01&&function(t,e,i,n,s){if(n<=.01)return;const a=e/2,o=i/2,r=Math.hypot(a,o),l=Math.floor(24+72*n),c=4e-5*s;t.save(),t.globalCompositeOperation="screen",t.lineCap="round";for(let h=0;h<l;h++){const e=19.173*h+.5,i=zo(e)*Math.PI*2+c*(h%5),s=r*(.52+.46*zo(1.7*e)),l=a+Math.cos(i)*s,d=o+Math.sin(i)*s,u=6+18*zo(2.9*e)*n,m=.42*u,p=i+.8*(zo(4.1*e)-.5);t.strokeStyle=`rgba(220, 240, 255, ${.08+.22*n})`,t.lineWidth=.8+.8*n,t.beginPath(),t.moveTo(l,d),t.lineTo(l+Math.cos(p)*u,d+Math.sin(p)*u),t.moveTo(l+Math.cos(p)*u*.55,d+Math.sin(p)*u*.55),t.lineTo(l+Math.cos(p+.9)*m,d+Math.sin(p+.9)*m),t.moveTo(l+Math.cos(p)*u*.55,d+Math.sin(p)*u*.55),t.lineTo(l+Math.cos(p-.9)*m,d+Math.sin(p-.9)*m),t.stroke()}t.restore()}(t,i,n,e.ice,e.timeMs),Ho(t,i,n,e.tempNorm,e.motionNorm,e.animPhase,e.reducedMotion)}function Go(t){return t.split(".",1)[0]}function Wo(...t){for(const e of t){const t=e?.attributes?.unit_of_measurement;if("string"==typeof t&&t.length>0)return t}return""}function Vo(t,e){const i=t?.attributes?.[e];if("number"==typeof i&&Number.isFinite(i))return i}function Yo(t,e){const i=t.states[e.entity],n=(e.target_entity?t.states[e.target_entity]:void 0)??i,s=Vo(n,"min")??Vo(i,"min_temp"),a=Vo(n,"max")??Vo(i,"max_temp");return{min:e.min??s??0,max:e.max??a??100,step:Ko(n??i,e.step)}}function Ko(t,e){const i=t?.attributes?.step;return"number"==typeof i&&Number.isFinite(i)&&i>0?i:e??1}function Xo(t){if(!t)return;const e=t.toLowerCase();return"heating"===e?"heating":"cooling"===e?"cooling":"idle"===e?"idle":"off"===e?"off":void 0}function Qo(t,e,i){if(void 0===t||void 0===e)return"unknown";const n=e-t;return Math.abs(n)<=Math.max(.5*i,.25)?"idle":n>0?"heating":"cooling"}function Zo(t,e,i,n){return void 0===t||void 0===e||n<=i?0:Math.min(1,Math.abs(e-t)/(n-i))}function Jo(t){if(!t)return!1;const e=Go(t);return"climate"===e||"number"===e||"input_number"===e}function tr(t,e,i,n,s){const a=ti(t.state);return{target:a,direction:Qo(s,a,n),directionStrength:Zo(s,a,e,i),canControl:Jo(t.entity_id),controlEntityId:t.entity_id}}function er(t,e,i){const n=e.entity,s=t.states[n],a=e.target_entity?t.states[e.target_entity]:void 0,{min:o,max:r,step:l}=Yo(t,e),c=e.name||s?.attributes.friendly_name||n||"Reactor";if(!s)return{unit:Wo(a),direction:"unknown",directionStrength:0,canControl:Jo(e.target_entity),controlEntityId:e.target_entity,displayName:c};const h=Go(n);let d;if("climate"===h){const t=function(t,e,i,n){const s=ti(String(t.attributes.current_temperature??"")),a=ti(String(t.attributes.temperature??""));return{current:s,target:a,direction:Xo(String(t.attributes.hvac_action??""))??Qo(s,a,n),directionStrength:Zo(s,a,e,i),canControl:!0,controlEntityId:t.entity_id}}(s,o,r,l);d={unit:Wo(s,a),displayName:c,...t}}else if("sensor"===h||"number"===h||"input_number"===h){const t="sensor"===h?ti(s.state):void 0,i="sensor"!==h?ti(s.state):void 0;if(d={current:t,target:i,unit:Wo(s,a),direction:"unknown",directionStrength:0,canControl:Jo("sensor"!==h?n:e.target_entity),controlEntityId:"sensor"!==h?n:e.target_entity,displayName:c},a){const t=tr(a,o,r,l,d.current);d={...d,...t}}else void 0!==i&&(d.direction=Qo(d.current,i,l),d.directionStrength=Zo(d.current,i,o,r))}else d={current:ti(s.state),unit:Wo(s,a),direction:"unknown",directionStrength:0,canControl:Jo(e.target_entity),controlEntityId:e.target_entity,displayName:c},a&&(d={...d,...tr(a,o,r,l,d.current)});return void 0!==i&&(d.previewTarget=i,d.target=i,d.direction=Qo(d.current,i,l),d.directionStrength=Zo(d.current,i,o,r)),d}function ir(t,e,i,n){if(void 0===e||!Number.isFinite(e))return"—";if(t?.formatEntityStateToParts&&n){const i=t.formatEntityStateToParts(n,String(e)).map(t=>t.value).join("");if(i.length>0)return i}const s=Math.abs(e-Math.round(e))<.05?String(Math.round(e)):e.toFixed(1);return i?`${s}${i.startsWith("°")?i:` ${i}`.trimEnd()}`:s}ui();var nr,sr,ar=/* @__PURE__ */ut({NvisionReactorTempCardEditor:()=>sr}),or=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),So(),ae(),nr=[{name:"entity",selector:{entity:{domain:["climate","sensor","number","input_number"]}}},{name:"target_entity",selector:{entity:{domain:["climate","number","input_number"]}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}},{name:"step",required:!0,default:1,selector:{number:{min:.1,step:.1}}}]},re()],sr=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?"Primary entity":"target_entity"===t.name?"Setpoint entity (optional)":"min"===t.name?"Visual range minimum":"max"===t.name?"Visual range maximum":"step"===t.name?"Setpoint step":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,step:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${nr}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){Ut(this,"config-changed",{config:t.detail.value})}},ne([Pt()],sr.prototype,"_config",void 0),sr=ne([bt(wo)],sr)});Ct(),Bt(),ui(),So(),ae(),Ht({type:xo,name:"Nvision Reactor Temp",description:"Reactor-style gauge for numeric sensors and setpoint controls"});var rr,lr,cr,hr,dr,ur,mr=class extends vt{constructor(...t){super(...t),this._frameId=0,this._animating=!1,this._lastFrame=0,this._targetNorm=.35,this._displayNorm=.35,this._motionNorm=.35,this._animPhase=0,this._dragOriginX=0,this._dragMoved=!1,this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(or(),ar)),document.createElement(wo)}static getStubConfig(t,e,i){const n=function(t,e,i){const n=[...e,...i,...Object.keys(t.states)];for(const s of n){const e=t.states[s];if(!e)continue;const i=s.split(".",1)[0];if("climate"===i||"number"===i||"input_number"===i)return s;if(void 0!==ti(e.state))return s}return n[0]}(t,e,i);return{type:`custom:${xo}`,entity:n??"sensor.temperature"}}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config={tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t},this._previewTarget=void 0,this._syncTargetNorm(),this._motionNorm=this._targetNorm}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this._resizeObserver=void 0,super.disconnectedCallback()}updated(t){(t.has("hass")||t.has("_config"))&&this._syncTargetNorm(),this._ensureCanvas()}_range(){if(!this.hass||!this._config)return{min:this._config?.min??0,max:this._config?.max??100};const{min:t,max:e}=Yo(this.hass,this._config);return{min:t,max:e}}_reading(){if(this.hass&&this._config)return er(this.hass,this._config,this._previewTarget)}_syncTargetNorm(){const t=this._reading(),{min:e,max:i}=this._range();this._targetNorm=function(t,e,i){return void 0===t||i<=e?.35:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t?.current,e,i)}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(this._stage??t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i,e),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_tickNorm(t){const e=this._targetNorm-this._displayNorm;Math.abs(e)<.001?this._displayNorm=this._targetNorm:this._displayNorm+=e*$o*t;const i=this._displayNorm-this._motionNorm;Math.abs(i)<.001?this._motionNorm=this._displayNorm:this._motionNorm+=i*Mo*t,this._animPhase+=t*(ko+.048*this._motionNorm)}_draw(t,e){const i=this._canvas,n=this._ctx;if(!(i&&n&&this.hass&&this._config))return;const s=i.clientWidth,a=i.clientHeight;if(s<=0||a<=0)return;const o=this._reading();this._tickNorm(t);const r=this._displayNorm<.18?(.18-this._displayNorm)/.18:0;Uo(n,{width:s,height:a,timeMs:e,animPhase:this._animPhase,tempNorm:this._displayNorm,motionNorm:this._motionNorm,hasSetpoint:void 0!==o?.target,direction:o?.direction??"unknown",directionStrength:o?.directionStrength??0,ice:r,reducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches})}_handlePointerDown(t){const e=this._reading();e?.canControl&&void 0!==e.target&&(t.currentTarget.setPointerCapture(t.pointerId),this._dragPointerId=t.pointerId,this._dragOriginX=t.clientX,this._dragBaseTarget=e.target,this._dragCommittedTarget=e.target,this._previewTarget=e.target,this._dragMoved=!1,t.preventDefault())}_handlePointerMove(t){if(this._dragPointerId!==t.pointerId||!this.hass||!this._config||void 0===this._dragBaseTarget)return;const e=this._reading();if(!e?.controlEntityId)return;const{min:i,max:n}=this._range(),s=(a=this.hass,o=this._config,Yo(a,o).step);var a,o;const r=Math.round((t.clientX-this._dragOriginX)/14);0!==r&&(this._dragMoved=!0);const l=function(t,e,i,n){const s=Math.min(i,Math.max(e,t));if(n<=0)return s;const a=Math.round((s-e)/n);return Math.min(i,Math.max(e,e+a*n))}(this._dragBaseTarget+r*s,i,n,s);l!==this._previewTarget&&(this._previewTarget=l,l!==this._dragCommittedTarget&&(this._dragCommittedTarget=l,async function(t,e,i){const n=Go(e);"climate"!==n?"number"!==n?"input_number"===n&&await t.callService("input_number","set_value",{entity_id:e,value:i}):await t.callService("number","set_value",{entity_id:e,value:i}):await t.callService("climate","set_temperature",{entity_id:e,temperature:i})}(this.hass,e.controlEntityId,l)))}_handlePointerEnd(t){if(this._dragPointerId!==t.pointerId)return;const e=t.currentTarget;e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this._dragPointerId=void 0,this._dragBaseTarget=void 0,this._dragCommittedTarget=void 0,this._previewTarget=void 0,window.setTimeout(()=>{this._dragMoved=!1},0),this._syncTargetNorm()}render(){if(!this._config||!this.hass)return K;const t=this._reading(),e=this._config.entity,i=this.hass.states[e],n=this._config.target_entity?this.hass.states[this._config.target_entity]:void 0,s=this._config.name||i?.attributes.friendly_name||e||"Reactor",a=ir(this.hass,t?.current,t?.unit??"",i),o=void 0!==t?.target?ir(this.hass,t.target,t?.unit??"",n??i):void 0,r=void 0!==o?`${a} → ${o}`:a,l=function(t,e){if("unknown"===e)return;const i=`component.climate.state_attributes.hvac_action.${e}`,n=t?.localize(i);return n&&n!==i?n:e.charAt(0).toUpperCase()+e.slice(1)}(this.hass,t?.direction??"unknown"),c=l?`${s} · ${l}`:s,h=Boolean(t?.canControl&&void 0!==t?.target);return W`
      <ha-card aria-label=${s}>
        <div
          class=${h?"stage controllable":"stage"}
          role="button"
          tabindex="0"
          @click=${t=>{this._dragMoved?t.preventDefault():this._actions.bind().click(t)}}
          @dblclick=${this._actions.bind().dblclick}
          @keydown=${this._actions.bind().keydown}
          @pointerdown=${t=>{h?this._handlePointerDown(t):this._actions.bind().pointerdown(t)}}
          @pointermove=${this._handlePointerMove}
          @pointerup=${t=>{this._handlePointerEnd(t),this._actions.bind().pointerup(t)}}
          @pointerleave=${t=>{this._handlePointerEnd(t),this._actions.bind().pointerleave(t)}}
          @pointercancel=${t=>{this._handlePointerEnd(t),this._actions.bind().pointercancel(t)}}
        >
          <canvas aria-hidden="true"></canvas>
          <div class="content">
            ${i?W`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${i}
                ></ha-state-icon>`:K}
            <ha-tile-info
              .primary=${r}
              .secondary=${c}
            ></ha-tile-info>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[Jt,te,ee,o`
      :host {
        --tile-color: var(--state-inactive-color);
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
        touch-action: none;
      }

      .stage.controllable {
        cursor: ew-resize;
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
        position: absolute;
        inset: auto 0 0 0;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        box-sizing: border-box;
        width: 100%;
        pointer-events: none;
      }

      ha-state-icon {
        flex: none;
        color: var(--primary-text-color);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
      }

      ha-tile-info {
        min-width: 0;
        flex: 1;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
      }
    `]}};ne([At({attribute:!1})],mr.prototype,"hass",void 0),ne([Pt()],mr.prototype,"_config",void 0),ne([Pt()],mr.prototype,"_previewTarget",void 0),ne([Lt(".stage")],mr.prototype,"_stage",void 0),ne([Lt("canvas")],mr.prototype,"_canvas",void 0),mr=ne([bt(xo)],mr);var pr=dt(()=>{rr="nvision-stat-card",lr="nvision-stat-card-editor",cr="line",hr=[{value:"1",label:"1 hour"},{value:"24",label:"24 hours"},{value:"168",label:"7 days"},{value:"720",label:"30 days"}],dr=[{value:"line",label:"Line"},{value:"area",label:"Area"},{value:"bar",label:"Bar"},{value:"none",label:"None"}],ur={1:"1 hour",24:"24 hours",168:"7 days",720:"30 days"}});pr();var gr=4,fr=0,_r=2,vr=0;function yr(t){return[...t].sort((t,e)=>t.time-e.time)}function br(t,e,i){if(!t.length)return[];const{min:n,max:s}=function(t){let e=t[0],i=t[0];for(const s of t)e=Math.min(e,s),i=Math.max(i,s);if(e===i){const t=.1*Math.abs(e)||1;return{min:e-t,max:i+t}}const n=i-e;return{min:e-.06*n,max:i+.06*n}}(t.map(t=>t.value)),a=s-n||1,o=Math.max(1,e-vr-fr),r=Math.max(1,i-gr-_r),l=t[0].time,c=t[t.length-1].time-l||1;return t.map(t=>({x:vr+(t.time-l)/c*o,y:gr+(1-(t.value-n)/a)*r}))}function xr(t,e){if(e.length){t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i++)t.lineTo(e[i].x,e[i].y)}}function wr(t,e){return`color-mix(in srgb, ${t} ${Math.round(100*e)}%, transparent)`}function $r(t,e,i,n,s){const a=br(function(t,e){if(t.length<=e)return t;const i=Math.ceil(t.length/e),n=[];for(let s=0;s<t.length;s+=i){const e=t.slice(s,s+i);if(!e.length)continue;const a=e.reduce((t,e)=>e.value>t.value?e:t,e[0]);n.push(a)}return n}(yr(e),48),i,n);if(!a.length)return;const o=Math.max(2,(i-vr)/a.length),r=Math.max(2,.72*o),l=n-_r;t.fillStyle=wr(s,.82);for(const c of a){const e=c.x-r/2,i=Math.max(1,l-c.y);t.fillRect(e,c.y,r,i)}}function Mr(t,e,i,n,s){const a=br(yr(e),i,n);a.length<2?1===a.length&&(t.fillStyle=s.lineColor,t.beginPath(),t.arc(a[0].x,a[0].y,2.5,0,2*Math.PI),t.fill()):(("area"===s.style||s.showFill)&&function(t,e,i,n){if(e.length<2)return;const s=t.createLinearGradient(0,gr,0,i);s.addColorStop(0,wr(n,.28)),s.addColorStop(1,wr(n,0)),t.beginPath(),t.moveTo(e[0].x,i),t.lineTo(e[0].x,e[0].y),xr(t,e.slice(1)),t.lineTo(e[e.length-1].x,i),t.closePath(),t.fillStyle=s,t.fill()}(t,a,n,s.lineColor),t.beginPath(),s.smoothing?function(t,e){if(!e.length)return;if(e.length<3)return void xr(t,e);t.moveTo(e[0].x,e[0].y);for(let s=0;s<e.length-2;s++){const i=e[s],n=e[s+1],a=(i.x+n.x)/2,o=(i.y+n.y)/2;t.quadraticCurveTo(i.x,i.y,a,o)}const i=e[e.length-1],n=e[e.length-2];t.quadraticCurveTo(n.x,n.y,i.x,i.y)}(t,a):xr(t,a),t.strokeStyle=s.lineColor,t.lineWidth=2,t.lineJoin="round",t.lineCap="round",t.stroke())}function kr(t,e){if("flat"===t)return"flat";const i="up"===t;return e?i?"negative":"positive":i?"positive":"negative"}function Cr(t){if(!t)return"—";if(void 0!==t.absolute){const e=Math.abs(t.absolute-Math.round(t.absolute))<.05?String(Math.round(t.absolute)):t.absolute.toFixed(1);return`${t.absolute>0?"+":""}${e}`}const e=t.percent??0;return`${Math.abs(e).toFixed(1)}%`}function Sr(t,e){const i=function(t){if(!t)return"flat";const e=t.absolute??(void 0!==t.percent?t.percent:0);return Math.abs(e)<.5?"flat":e>0?"up":"down"}(t);return{direction:i,colorTone:kr(i,e),text:Cr(t)}}ui();var Ar,zr,Pr=/* @__PURE__ */ut({NvisionStatCardEditor:()=>zr}),Tr=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),pr(),ae(),Ar=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"show_icon",default:!0,selector:{boolean:{}}},{name:"graph",default:cr,selector:{select:{options:[...dr],mode:"dropdown"}}},{name:"graph_period",default:String(24),selector:{select:{options:[...hr],mode:"dropdown"}}},{name:"graph_height",default:80,selector:{number:{min:40,max:240,step:4,unit_of_measurement:"px"}}},{name:"smoothing",default:!0,selector:{boolean:{}}},{name:"show_fill",selector:{boolean:{}}},{name:"line_color",selector:{color_rgb:{}}},{name:"trend_entity",selector:{entity:{}}},{name:"trend_period",default:String(24),selector:{select:{options:[...hr],mode:"dropdown"}}},{name:"invert_colors",selector:{boolean:{}}},re()],zr=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"show_icon"===t.name?"Show icon":"graph"===t.name?"Graph style":"graph_period"===t.name?"Graph period":"graph_height"===t.name?"Graph height":"smoothing"===t.name?"Smooth line":"show_fill"===t.name?"Fill under line":"line_color"===t.name?"Line color":"trend_entity"===t.name?"Trend entity (optional)":"trend_period"===t.name?"Trend period":"invert_colors"===t.name?"Invert trend colors":le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${{...this._config,graph:this._config.graph??"line",graph_period:String(this._config.graph_period??this._config.trend_period??24),trend_period:String(this._config.trend_period??24)}}
        .schema=${Ar}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}_valueChanged(t){const e={...t.detail.value};void 0!==e.graph_period&&(e.graph_period=Number(e.graph_period)),void 0!==e.trend_period&&(e.trend_period=Number(e.trend_period)),Ut(this,"config-changed",{config:e})}},ne([Pt()],zr.prototype,"_config",void 0),zr=ne([bt(lr)],zr)});Ct(),Bt(),ui(),pr(),ae(),Ht({type:rr,name:"Nvision Stat",description:"Sensor-style value, trend, and history graph"});var Er,Ir,Or,Lr,Nr,Fr,Rr,qr={up:"mdi:arrow-up",down:"mdi:arrow-down",flat:"mdi:minus"},Dr=class extends vt{constructor(...t){super(...t),this._historyPoints=[],this._fetchVersion=0,this._drawFrame=0,this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(Tr(),Pr)),document.createElement(lr)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)];for(const s of n)if(void 0!==ti(t.states[s]?.state))return{type:`custom:${rr}`,entity:s,trend_period:24,graph:cr,graph_height:80};return{type:`custom:${rr}`,entity:n[0]??"sensor.temperature",trend_period:24,graph:cr,graph_height:80}}setConfig(t){this._config={show_icon:!0,trend_period:24,graph:cr,graph_height:80,smoothing:!0,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t}}getCardSize(){return"none"===(this._config?.graph??"line")?1:2}getGridOptions(){return"none"===(this._config?.graph??"line")?{columns:6,rows:1}:{columns:6,rows:2,min_rows:2}}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver(()=>this._scheduleDraw())}disconnectedCallback(){this._resizeObserver?.disconnect(),cancelAnimationFrame(this._drawFrame),super.disconnectedCallback()}updated(t){if(t.has("_config")||t.has("hass")){const t=this._computeLoadKey();t!==this._loadKey&&(this._loadKey=t,this._loadHistory())}(t.has("_historyPoints")||t.has("_config")||t.has("hass"))&&(this._observeGraphWrap(),this._scheduleDraw())}_observeGraphWrap(){const t=this.shadowRoot?.querySelector(".graph-wrap");t&&this._resizeObserver&&t!==this._observedWrap&&(this._observedWrap&&this._resizeObserver.unobserve(this._observedWrap),this._observedWrap=t,this._resizeObserver.observe(t))}_computeLoadKey(){const t=this._config;if(!t?.entity)return;const e=t.graph_period??t.trend_period??24,i=t.trend_period??24;return`${t.entity}:${e}:${i}:${t.graph??"line"}`}_resolveGraphPeriod(){return this._config?.graph_period??this._config?.trend_period??24}_resolveTrendPeriod(){return this._config?.trend_period??24}_pastValueForTrend(){if(!this._historyPoints.length)return;const t=this._resolveTrendPeriod(),e=this._resolveGraphPeriod(),i=[...this._historyPoints].sort((t,e)=>t.time-e.time);if(t<=e)return i[0]?.value;const n=Date.now()-60*t*60*1e3;return i.find(t=>t.time>=n)?.value??i[0]?.value}async _loadHistory(){const t=this._config,e=this.hass;if(!t?.entity)return void(this._historyPoints=[]);if(!e)return;try{js(e)}catch{return void(this._historyPoints=[])}const i=++this._fetchVersion,n=Math.max(this._resolveGraphPeriod(),this._resolveTrendPeriod()),s=function(t,e){return Us(e,e?t?.states[e]?.attributes:void 0)}(e,t.entity);try{const a=await ia(e,t.entity,n,s);if(i!==this._fetchVersion)return;this._historyPoints=a}catch{if(i!==this._fetchVersion)return;this._historyPoints=[]}}_scheduleDraw(){cancelAnimationFrame(this._drawFrame),this._drawFrame=requestAnimationFrame(()=>this._drawGraph())}_graphStyle(){return this._config?.graph??"line"}_graphHeight(){return this._config?.graph_height??80}_showFill(){const t=this._graphStyle();return"area"===t||"line"===t&&!0===this._config?.show_fill}_drawGraph(){const t=this._canvas,e=this._config;if(!t||!e||"none"===this._graphStyle())return;const i=60*this._resolveGraphPeriod()*60*1e3,n=Date.now()-i;!function(t,e,i){const n=t.getBoundingClientRect(),s=Math.max(1,Math.floor(n.width)),a=Math.max(1,Math.floor(n.height));if(!s||!a)return;const o=window.devicePixelRatio||1;t.width=Math.floor(s*o),t.height=Math.floor(a*o);const r=t.getContext("2d");r&&(r.setTransform(o,0,0,o,0,0),r.clearRect(0,0,s,a),e.length&&("bar"!==i.style?Mr(r,e,s,a,i):$r(r,e,s,a,i.lineColor)))}(t,this._historyPoints.filter(t=>t.time>=n),{style:this._graphStyle(),smoothing:!1!==e.smoothing,showFill:this._showFill(),lineColor:Ce(e.line_color,this,"--primary-color",Me(this,"--primary-color","#03a9f4"))})}_trendColor(t){return"flat"===t?"var(--secondary-text-color)":"positive"===t?"var(--success-color)":"var(--error-color)"}render(){if(!this._config||!this.hass)return K;const t=this.hass.states[this._config.entity],e=ti(t?.state),i=this._config.name||t?.attributes.friendly_name||"Stat",n=Xt(t),s=this._config.trend_entity?void 0:this._pastValueForTrend(),a=Sr(this._config.trend_entity?function(t,e){if(!e)return;const i=ti(t.states[e]?.state);return void 0!==i?{percent:i}:void 0}(this.hass,this._config.trend_entity):function(t,e){if(void 0!==t&&void 0!==e&&Number.isFinite(t)&&Number.isFinite(e)){if(0===e){const i=t-e;return Math.abs(i)<1e-9?{percent:0}:{absolute:i}}return{percent:(t-e)/Math.abs(e)*100}}}(e,s),!0===this._config.invert_colors),o=this._trendColor(a.colorTone),r="—"!==a.text,l=!this._config.trend_entity,c=l&&void 0!==s?function(t,e,i){if(void 0===e||!Number.isFinite(e))return"—";if(t?.formatEntityStateToParts&&i){const n=t.formatEntityStateToParts(i,String(e)).map(t=>t.value).join("");if(n.length>0)return n}const n="string"==typeof i?.attributes?.unit_of_measurement?i.attributes.unit_of_measurement:"",s=Math.abs(e-Math.round(e))<.05?String(Math.round(e)):e.toFixed(1);return n?`${s}${n.startsWith("°")?n:` ${n}`.trimEnd()}`:s}(this.hass,s,t):void 0,h=l?(d=this._resolveTrendPeriod(),ur[d]??`${d} hours`):void 0;var d;const u=void 0!==c&&"—"!==c,m="none"!==this._graphStyle(),p=this._graphHeight();return W`
      <ha-card>
        <div
          class="stage"
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
          <div class="header">
            <div class="identity">
              ${!1!==this._config.show_icon&&t?W`<ha-state-icon
                    .hass=${this.hass}
                    .stateObj=${t}
                  ></ha-state-icon>`:K}
              <div class="identity-text">
                <div class="label">${i}</div>
                ${u?W`
                      <div class="compare-row">
                        <span class="compare-value">${c}</span>
                        <span class="compare-sep">·</span>
                        <span class="compare-period">${h}</span>
                      </div>
                    `:K}
              </div>
            </div>
            <div class="metrics">
              <div class="value-row">
                <span class="value">${n}</span>
                ${r?W`
                      <span
                        class="trend trend-${a.direction}"
                        style=${$e({"--trend-color":o})}
                      >
                        <ha-icon icon=${qr[a.direction]}></ha-icon>
                        ${a.text}
                      </span>
                    `:K}
              </div>
            </div>
          </div>
          ${m?W`
                <div
                  class="graph-wrap"
                  style=${$e({height:`${p}px`})}
                >
                  <canvas aria-hidden="true"></canvas>
                </div>
              `:K}
        </div>
      </ha-card>
    `}static{this.styles=[Jt,ee,o`
      :host {
        --tile-color: var(--state-inactive-color);
        --nv-stat-scale: 1.2;
        --nv-stat-value-font-size: calc(
          var(--nv-value-font-size) * var(--nv-stat-scale)
        );
        --nv-stat-trend-font-size: calc(
          var(--nv-label-font-size) * var(--nv-stat-scale)
        );
        display: block;
        height: 100%;
      }

      ha-card {
        height: 100%;
      }

      .stage {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 72px;
        cursor: pointer;
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 12px 8px;
        box-sizing: border-box;
      }

      .identity {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }

      ha-state-icon {
        flex: none;
        color: var(--primary-text-color);
        margin-top: 1px;
      }

      .identity-text {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .label {
        font-size: var(--nv-label-font-size);
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .metrics {
        flex: none;
        text-align: right;
      }

      .value-row {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 6px;
      }

      .value {
        font-size: var(--nv-stat-value-font-size);
        font-weight: var(--ha-font-weight-medium, 500);
        color: var(--primary-text-color);
        line-height: 1.2;
      }

      .trend {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-size: var(--nv-stat-trend-font-size);
        font-weight: var(--ha-font-weight-medium, 500);
        color: var(--trend-color);
        background: color-mix(in srgb, var(--trend-color) 12%, transparent);
        border-radius: var(--ha-border-radius-sm, 4px);
        padding: 2px 8px 2px 5px;
        line-height: 1.2;
        white-space: nowrap;
      }

      .trend ha-icon {
        --mdc-icon-size: 1em;
        flex: none;
      }

      .compare-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 4px;
        min-width: 0;
        font-size: var(--ha-font-size-xs, 0.75rem);
        line-height: 1.2;
        color: var(--secondary-text-color);
        opacity: 0.65;
      }

      .compare-value {
        font-weight: var(--ha-font-weight-medium, 500);
      }

      .compare-sep {
        opacity: 0.8;
      }

      .graph-wrap {
        flex: 1 1 auto;
        min-height: 40px;
        width: 100%;
        padding: 0 4px 6px;
        box-sizing: border-box;
      }

      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    `]}};function jr(t){if(t?.trim())return t.split(",").map(t=>t.trim().toLowerCase()).filter(Boolean)}ne([At({attribute:!1})],Dr.prototype,"hass",void 0),ne([Pt()],Dr.prototype,"_config",void 0),ne([Pt()],Dr.prototype,"_historyPoints",void 0),ne([Lt("canvas")],Dr.prototype,"_canvas",void 0),Dr=ne([bt(rr)],Dr);var Br=dt(()=>{Er="nvision-event-log-card",Ir="nvision-event-log-card-editor",Or="Event Log",Lr=["state_changed","automation_triggered","call_service","homeassistant_start","timer_finished"],Nr=[{value:"state_changed",label:"State changed"},{value:"automation_triggered",label:"Automation triggered"},{value:"call_service",label:"Service call"},{value:"homeassistant_start",label:"Home Assistant start"},{value:"timer_finished",label:"Timer finished"},{value:"script_started",label:"Script started"},{value:"persistent_notification",label:"Persistent notification"},{value:"logbook_entry",label:"Logbook entry"}],Fr=[{severity:"error",keywords:["error","err","failed","failure","fatal","critical","exception","offline","unavailable","denied"]},{severity:"warning",keywords:["warn","warning","caution","timeout","retry","deprecated"]},{severity:"success",keywords:["success","ok","online","connected","started","complete","finished","ready"]},{severity:"debug",keywords:["debug","trace","verbose"]}],Rr={error:"--error-color",warning:"--warning-color",success:"--success-color",info:"--primary-text-color",debug:"--secondary-text-color"}});function Hr(t,e){return t?e?`${t} ${e}`:t:"—"}function Ur(t,e){switch(e.event_type){case"state_changed":return function(t,e){const i=e.entity_id,n=e.old_state,s=e.new_state;if(!i)return;if(n?.state===s?.state)return;const a=function(t,e,i){return i?.attributes?.friendly_name||t?.states[e]?.attributes?.friendly_name||e}(t,i,s??n),o=s?.attributes?.unit_of_measurement;return!n&&s?{tag:"state",message:`${a} appeared → ${Hr(s.state,o)}`}:n&&!s?{tag:"state",message:`${a} removed`}:{tag:"state",message:`${a} → ${Hr(s?.state,o)}`}}(t,e.data);case"automation_triggered":return{tag:"auto",message:`"${(i=e.data).name||i.entity_id||"Automation"}" triggered`};case"call_service":return function(t){const e=t.domain,i=t.service,n=e&&i?`${e}.${i}`:"service",s=t.entity_id;return{tag:"svc",message:`${n}${s?` → ${s}`:""}`}}(e.data);case"homeassistant_start":return{tag:"sys",message:"Home Assistant started"};case"timer_finished":return function(t){return{tag:"timer",message:`${t.entity_id||"timer"} finished`}}(e.data);case"script_started":return{tag:"script",message:`${e.data.entity_id||"Script"} started`};case"persistent_notification":return function(t){const e=t.title||"Notification",i=t.message||"";return{tag:"note",message:i?`${e}: ${i}`:e}}(e.data);case"logbook_entry":return function(t){const e=t.name||"Logbook",i=t.message||"";return{tag:"log",message:i?`${e}: ${i}`:e}}(e.data);default:return{tag:e.event_type.replace(/_/g," ").slice(0,12),message:JSON.stringify(e.data)}}var i}Br();var Gr,Wr,Vr,Yr=/* @__PURE__ */ut({NvisionEventLogCardEditor:()=>Vr});function Kr(t,e){return t?.length?t.join(", "):(Fr.find(t=>t.severity===e)?.keywords)?.join(", ")??""}function Xr(t){const{error_keywords_text:e,warning_keywords_text:i,success_keywords_text:n,debug_keywords_text:s,...a}=t;return{...a,error_keywords:jr(e),warning_keywords:jr(i),success_keywords:jr(n),debug_keywords:jr(s)}}var Qr=dt(()=>{Ct(),Bt(),Gt(),oe(),de(),ae(),Gr=[{name:"title",selector:{text:{}}},{name:"max_lines",required:!0,default:100,selector:{number:{min:10,max:500,step:10}}},{name:"event_types",default:Lr,selector:{select:{mode:"list",multiple:!0,options:[...Nr]}}},{name:"show_timestamp",selector:{boolean:{}}},re()],Wr=[{type:"expandable",name:"keywords",flatten:!0,title:"Severity keywords",schema:[{name:"error_keywords_text",selector:{text:{}}},{name:"warning_keywords_text",selector:{text:{}}},{name:"success_keywords_text",selector:{text:{}}},{name:"debug_keywords_text",selector:{text:{}}}]}],Vr=class extends se{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)switch(t.name){case"title":return"Title";case"max_lines":return"Maximum lines";case"event_types":return"Event types";case"show_timestamp":return"Show timestamps";case"keywords":return"Severity keywords";case"error_keywords_text":return"Error keywords";case"warning_keywords_text":return"Warning keywords";case"success_keywords_text":return"Success keywords";case"debug_keywords_text":return"Debug keywords";default:return le(this.hass,t)??this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}}setConfig(t){this._config={title:Or,max_lines:100,event_types:Lr,show_timestamp:!0,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${t=this._config,{...t,title:t.title??"Event Log",max_lines:t.max_lines??100,event_types:t.event_types?.length?t.event_types:Lr,show_timestamp:t.show_timestamp??!0,error_keywords_text:Kr(t.error_keywords,"error"),warning_keywords_text:Kr(t.warning_keywords,"warning"),success_keywords_text:Kr(t.success_keywords,"success"),debug_keywords_text:Kr(t.debug_keywords,"debug")}}
        .schema=${[...Gr,...Wr]}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K;var t}_valueChanged(t){Ut(this,"config-changed",{config:Xr(t.detail.value)})}},ne([Pt()],Vr.prototype,"_config",void 0),Vr=ne([bt(Ir)],Vr)});Ct(),Bt(),Br(),ae(),Ht({type:Er,name:"Nvision Event Log",description:"Terminal-style live event log with keyword severity coloring"});var Zr=[{id:1,time:/* @__PURE__ */new Date,severity:"success",tag:"sys",message:"Home Assistant started"},{id:2,time:/* @__PURE__ */new Date,severity:"info",tag:"state",message:"Living room → on"},{id:3,time:/* @__PURE__ */new Date,severity:"warning",message:"Garage door sensor timeout",tag:"state"},{id:4,time:/* @__PURE__ */new Date,severity:"error",tag:"auto",message:'"Night routine" failed: device unavailable'}];var Jr=class extends vt{constructor(...t){super(...t),this.preview=!1,this._entries=[],this._connected=!1,this._nextId=1,this._unsubs=[],this._actions=new Kt(()=>this,()=>this.hass,()=>this._config)}static async getConfigElement(){return await Promise.resolve().then(()=>(Qr(),Yr)),document.createElement(Ir)}static getStubConfig(){return{type:`custom:${Er}`,title:Or}}setConfig(t){const e=t.event_types?.length?t.event_types:Lr;this._config={title:Or,max_lines:100,show_timestamp:!0,event_types:e,tap_action:{action:"more-info"},hold_action:{action:"more-info"},...t,event_types:e},this._syncSubscription()}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:4,min_rows:2}}connectedCallback(){super.connectedCallback(),this._syncSubscription()}disconnectedCallback(){this._teardownSubscription(),super.disconnectedCallback()}updated(t){t.has("hass")&&this._syncSubscription(),t.has("_entries")&&this._scrollToBottom()}_scrollToBottom(){requestAnimationFrame(()=>{const t=this._body;t&&(t.scrollTop=t.scrollHeight)})}_severityRules(){return function(t){const e=t.severity_rules?.length?[...t.severity_rules]:Fr.map(t=>({...t,keywords:[...t.keywords]})),i={error:t.error_keywords,warning:t.warning_keywords,success:t.success_keywords,debug:t.debug_keywords};for(const n of e){const t=i[n.severity];t?.length&&(n.keywords=t.map(t=>t.toLowerCase()))}return e}(this._config??{})}_maxLines(){return this._config?.max_lines??100}_eventTypes(){return this._config?.event_types?.length?this._config.event_types:Lr}async _syncSubscription(){if(this._teardownSubscription(),this.preview||!this.hass)return void(this._connected=!1);const t=this.hass.connection;if(!t?.subscribeEvents)return void(this._connected=!1);const e=this._eventTypes();try{for(const i of e){const e=await t.subscribeEvents(t=>this._onEvent(t),i);this._unsubs.push(e)}this._connected=!0}catch{this._connected=!1}}_teardownSubscription(){for(const t of this._unsubs)t();this._unsubs=[],this._connected=!1}_onEvent(t){const e=Ur(this.hass,t);if(!e)return;const i=function(t,e){const i=t.toLowerCase();for(const n of e)if(n.keywords.some(t=>i.includes(t)))return n.severity;return"info"}(e.message,this._severityRules()),n=t.time_fired?new Date(t.time_fired):/* @__PURE__ */new Date,s=this._maxLines();this._entries=[...this._entries,{id:this._nextId++,time:n,severity:i,tag:e.tag,message:e.message}].slice(-s)}_lineColor(t){const e=this._severityRules().find(e=>e.severity===t)?.color;return e?ke(e,""):`var(${function(t){return Rr[t]}(t)})`}_renderLine(t){const e=!1!==this._config?.show_timestamp;return W`
      <div class="line ${t.severity}" style="color: ${this._lineColor(t.severity)}">
        ${e?W`<span class="time">${i=t.time,i.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})}</span>`:K}
        <span class="tag">${t.tag}</span>
        <span class="msg">${t.message}</span>
      </div>
    `;var i}render(){if(!this._config)return K;const t=this._config.title||"Event Log",e=this.preview||!this._entries.length&&!this._connected?Zr:this._entries;return W`
      <ha-card class="terminal">
        <div
          class="shell"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          @click=${this._actions.bind().click}
          @dblclick=${this._actions.bind().dblclick}
          @keydown=${this._actions.bind().keydown}
          @pointerdown=${this._actions.bind().pointerdown}
          @pointerup=${this._actions.bind().pointerup}
          @pointerleave=${this._actions.bind().pointerleave}
          @pointercancel=${this._actions.bind().pointercancel}
        >
          <div class="terminal-header">
            <span class="prompt">&gt;</span>
            <span class="title">${t}</span>
            <span class="status ${this._connected?"online":"offline"}"></span>
          </div>
          <div class="terminal-body">
            ${e.length?e.map(t=>this._renderLine(t)):W`<div class="line info empty">Waiting for events…</div>`}
            <div class="cursor" aria-hidden="true"></div>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=o`
    :host {
      display: block;
      height: 100%;
      --terminal-bg: var(--card-background-color);
      --terminal-border: var(--divider-color, rgba(127, 127, 127, 0.28));
      --terminal-accent: var(--primary-color);
    }

    ha-card {
      height: 100%;
      overflow: hidden;
      background: var(--terminal-bg);
      border: 1px solid var(--terminal-border);
    }

    .shell {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 120px;
      font-family: var(
        --code-font-family,
        ui-monospace,
        "Cascadia Code",
        "SF Mono",
        Consolas,
        monospace
      );
      font-size: 0.78rem;
      line-height: 1.45;
    }

    .terminal-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--terminal-border);
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }

    .prompt {
      color: var(--terminal-accent);
      font-weight: 700;
    }

    .title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--primary-text-color);
      font-weight: 500;
    }

    .status {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--disabled-text-color, #888);
      flex-shrink: 0;
    }

    .status.online {
      background: var(--success-color);
      box-shadow: 0 0 6px color-mix(in srgb, var(--success-color) 60%, transparent);
    }

    .terminal-body {
      flex: 1;
      overflow: auto;
      padding: 8px 12px 10px;
      min-height: 0;
    }

    .line {
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 1px 0;
      word-break: break-word;
    }

    .line.empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .time {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      opacity: 0.85;
    }

    .tag {
      flex-shrink: 0;
      min-width: 3.2em;
      text-transform: lowercase;
      color: var(--terminal-accent);
      opacity: 0.9;
    }

    .msg {
      flex: 1;
      min-width: 0;
    }

    .cursor {
      display: inline-block;
      width: 0.55em;
      height: 1em;
      margin-top: 2px;
      background: var(--terminal-accent);
      opacity: 0.75;
      animation: blink 1.1s step-end infinite;
    }

    @keyframes blink {
      0%,
      100% {
        opacity: 0.75;
      }
      50% {
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cursor {
        animation: none;
      }
    }
  `}};ne([At({attribute:!1})],Jr.prototype,"hass",void 0),ne([At({type:Boolean})],Jr.prototype,"preview",void 0),ne([Pt()],Jr.prototype,"_config",void 0),ne([Pt()],Jr.prototype,"_entries",void 0),ne([Pt()],Jr.prototype,"_connected",void 0),ne([Lt(".terminal-body")],Jr.prototype,"_body",void 0),Jr=ne([bt(Er)],Jr),console.info("%c nvision 0.1.0 ","color: var(--primary-color, #03a9f4); font-weight: 700;");