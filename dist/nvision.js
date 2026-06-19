var t,e,i,n,s,a,r,o,l,c,h,d,u,m,g,p,f,_,v,y,b,x,w,$,M,A,C,k,S,z,E,P,T,I,O,q,L,R,F,N,j,U,B,D,H,G,W,V,Y,Q,Z,X,J,K,tt,et,it,nt,st,at,rt,ot,lt,ct=Object.defineProperty,ht=(t,e)=>()=>(t&&(e=t(t=0)),e),dt=(t,e)=>{let i={};for(var n in t)ct(i,n,{get:t[n],enumerable:!0});return e||ct(i,Symbol.toStringTag,{value:"Module"}),i},ut=ht(()=>{t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=/* @__PURE__ */new WeakMap,s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}},a=t=>new s("string"==typeof t?t:t+"",void 0,i),r=(t,...e)=>new s(1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]),t,i),o=(i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t}),mt=ht(()=>{ut(),({is:c,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:g}=Object),p=globalThis,f=p.trustedTypes,_=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x},Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=/* @__PURE__ */new WeakMap,$=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&h(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const a=n?.call(this);s?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return o(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n;const a=s.fromAttribute(e,t.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const a=this.constructor;if(!1===n&&(s=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??x)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},a){i&&!(this._$Ej??=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==s||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}},$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[y("elementProperties")]=/* @__PURE__ */new Map,$[y("finalized")]=/* @__PURE__ */new Map,v?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.2")});function gt(t,e){if(!q(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}function pt(t,e,i=t,n){if(e===Y)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=pt(t,s._$AS(t,e.values),s,n)),e}var ft,_t,vt,yt,bt,xt,wt=ht(()=>{M=globalThis,A=t=>t,C=M.trustedTypes,k=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,P=`<${E="?"+z}>`,T=document,I=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,q=Array.isArray,L=t=>q(t)||"function"==typeof t?.[Symbol.iterator],R="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,U=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,H=/^(?:script|style|textarea|title)$/i,G=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=G(1),V=G(2),G(3),Y=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),Z=/* @__PURE__ */new WeakMap,X=T.createTreeWalker(T,129),J=(t,e)=>{const i=t.length-1,n=[];let s,a=2===e?"<svg>":3===e?"<math>":"",r=F;for(let o=0;o<i;o++){const e=t[o];let i,l,c=-1,h=0;for(;h<e.length&&(r.lastIndex=h,l=r.exec(e),null!==l);)h=r.lastIndex,r===F?"!--"===l[1]?r=N:void 0!==l[1]?r=j:void 0!==l[2]?(H.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=s??F,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?U:'"'===l[3]?D:B):r===D||r===B?r=U:r===N||r===j?r=F:(r=U,s=void 0);const d=r===U&&t[o+1].startsWith("/>")?" ":"";a+=r===F?e+P:c>=0?(n.push(i),e.slice(0,c)+S+e.slice(c)+z+d):e+z+(-2===c?o:d)}return[gt(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]},K=class t{constructor({strings:e,_$litType$:i},n){let s;this.parts=[];let a=0,r=0;const o=e.length-1,l=this.parts,[c,h]=J(e,i);if(this.el=t.createElement(c,n),X.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=h[r++],i=s.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?nt:"?"===n[1]?st:"@"===n[1]?at:it}),s.removeAttribute(t)}else t.startsWith(z)&&(l.push({type:6,index:a}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(z),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],I()),X.nextNode(),l.push({type:2,index:++a});s.append(t[e],I())}}}else if(8===s.nodeType)if(s.data===E)l.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(z,t+1));)l.push({type:7,index:a}),t+=z.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}},tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);X.currentNode=n;let s=X.nextNode(),a=0,r=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new et(s,s.nextSibling,this,t):1===o.type?e=new o.ctor(s,o.name,o.strings,this,t):6===o.type&&(e=new rt(s,this,t)),this._$AV.push(e),o=i[++r]}a!==o?.index&&(s=X.nextNode(),a++)}return X.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},et=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=pt(this,t,e),O(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):L(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(gt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new K(t)),e}k(e){q(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,s=0;for(const a of e)s===i.length?i.push(n=new t(this.O(I()),this.O(I()),this,this.options)):n=i[s],n._$AI(a),s++;s<i.length&&(this._$AR(n&&n._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},it=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=Q}_$AI(t,e=this,i,n){const s=this.strings;let a=!1;if(void 0===s)t=pt(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==Y,a&&(this._$AH=t);else{const n=t;let r,o;for(t=s[0],r=0;r<s.length-1;r++)o=pt(this,n[i+r],e,r),o===Y&&(o=this._$AH[r]),a||=!O(o)||o!==this._$AH[r],o===Q?t=Q:t!==Q&&(t+=(o??"")+s[r+1]),this._$AH[r]=o}a&&!n&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},nt=class extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}},st=class extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}},at=class extends it{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=pt(this,t,e,0)??Q)===Y)return;const i=this._$AH,n=t===Q&&i!==Q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==Q&&(i===Q||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){pt(this,t)}},ot=M.litHtmlPolyfillSupport,ot?.(K,et),(M.litHtmlVersions??=[]).push("3.3.3"),lt=(t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new et(e.insertBefore(I(),t),t,void 0,i??{})}return s._$AI(t),s}}),$t=ht(()=>{mt(),mt(),wt(),wt(),ft=globalThis,_t=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}},_t._$litElement$=!0,_t.finalized=!0,ft.litElementHydrateSupport?.({LitElement:_t}),vt=ft.litElementPolyfillSupport,vt?.({LitElement:_t}),(ft.litElementVersions??=[]).push("4.2.2")}),Mt=ht(()=>{}),At=ht(()=>{mt(),wt(),$t(),Mt()}),Ct=ht(()=>{yt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function kt(t){return(e,i)=>"object"==typeof i?xt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var St=ht(()=>{mt(),bt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},xt=(t=bt,e,i)=>{const{kind:n,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=/* @__PURE__ */new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)}});function zt(t){return kt({...t,state:!0,attribute:!1})}var Et,Pt=ht(()=>{St()}),Tt=ht(()=>{}),It=ht(()=>{Et=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i)});function Ot(t,e){return(i,n,s)=>{const a=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof n?i:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return Et(i,n,{get(){let i=t.call(this);return void 0===i&&(i=a(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return Et(i,n,{get(){return a(this)}})}}var qt,Lt=ht(()=>{It()});var Rt=ht(()=>{It()}),Ft=ht(()=>{}),Nt=ht(()=>{}),jt=ht(()=>{}),Ut=ht(()=>{Ct(),St(),Pt(),Tt(),Lt(),Rt(),Ft(),Nt(),jt()});function Bt(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}function Dt(t){if(!t)return"—";const{state:e}=t;if("unavailable"===e||"unknown"===e)return"—";const i=t.attributes?.unit_of_measurement;if("string"==typeof i&&i.length>0){const t=e.trim();return t.endsWith(i)?t:`${t} ${i}`.trim()}return e}At(),Ut();var Ht,Gt,Wt=r`
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
`,Qt=ht(()=>{Ht="nvision-blank-card",Gt="nvision-blank-card-editor"});function Zt(t,e,i,n){var s,a=arguments.length,r=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(r=(a<3?s(r):a>3?s(e,i,r):s(e,i))||r);return a>3&&r&&Object.defineProperty(e,i,r),r}var Xt=ht(()=>{});function Jt(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}var Kt,te,ee,ie=ht(()=>{}),ne=ht(()=>{At(),Xt(),Kt=class extends _t{},Zt([kt({attribute:!1})],Kt.prototype,"hass",void 0)}),se=/* @__PURE__ */dt({NvisionBlankCardEditor:()=>ee}),ae=ht(()=>{At(),Ut(),ie(),ne(),Qt(),Xt(),te=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}}],ee=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${te}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],ee.prototype,"_config",void 0),ee=Zt([yt(Gt)],ee)});At(),Ut(),Qt(),Xt(),Bt({type:Ht,name:"Nvision Blank",description:"Neutral starting point for nvision cards"});var re=class extends _t{static async getConfigElement(){return await Promise.resolve().then(()=>(ae(),se)),document.createElement(Gt)}static getStubConfig(t,e,i){const n=e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${Ht}`,entity:n}}setConfig(t){this._config=t}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Dt(t);return W`
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
  `]}};Zt([kt({attribute:!1})],re.prototype,"hass",void 0),Zt([zt()],re.prototype,"_config",void 0),re=Zt([yt(Ht)],re);var oe=1,le=t=>(...e)=>({_$litDirective$:t,values:e}),ce=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};wt();var he,de,ue,me,ge=le(class extends ce{constructor(t){if(super(t),t.type!==oe||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const n=t[i];return null==n?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const n of this.ft)e[n]??(this.ft.delete(n),n.includes("-")?i.removeProperty(n):i[n]=null);for(const n in e){const t=e[n];if(null!=t){this.ft.add(n);const e="string"==typeof t&&t.endsWith(" !important");n.includes("-")||e?i.setProperty(n,e?t.slice(0,-11):t,e?"important":""):i[n]=t}}return Y}});function pe(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function fe(t,e){if(!t)return e;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}return e}function _e(t,e,i,n){return fe(t,pe(e,i,n))}function ve(t){he??=document.createElement("canvas"),he.width=1,he.height=1;const e=he.getContext("2d");if(!e)return[41,182,246];e.fillStyle="#000000",e.fillStyle=t,e.fillRect(0,0,1,1);const[i,n,s]=e.getImageData(0,0,1,1).data;return[i,n,s]}function ye([t,e,i]){return`rgb(${t}, ${e}, ${i})`}function be(t,e,i){return[Math.round(t[0]+(e[0]-t[0])*i),Math.round(t[1]+(e[1]-t[1])*i),Math.round(t[2]+(e[2]-t[2])*i)]}function xe(t,e){return e>=0?be(t,[255,255,255],e):be(t,[0,0,0],-e)}var we,$e,Me=ht(()=>{de="nvision-activity-card",ue="nvision-activity-card-editor",me={still:"idle",unknown:"idle",on_foot:"on_foot",walking:"walking",running:"running",on_bicycle:"bicycle",in_vehicle:"vehicle",automotive:"vehicle",tilting:"tilting"}}),Ae=/* @__PURE__ */dt({NvisionActivityCardEditor:()=>$e}),Ce=ht(()=>{At(),Ut(),ie(),ne(),Me(),Xt(),we=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"color",selector:{color_rgb:{}}},{name:"speed",required:!0,default:1,selector:{number:{min:.25,max:3,step:.05}}}],$e=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"color"===t.name?"Figure color":"speed"===t.name?"Animation speed":"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={speed:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${we}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],$e.prototype,"_config",void 0),$e=Zt([yt(ue)],$e)});function ke(t,e,i){const n=.7*i;return V`
    <circle class="rim" cx=${t} cy=${e} r=${i} />
    <g class="spokes">
      <line x1=${t-i} y1=${e} x2=${t+i} y2=${e} />
      <line x1=${t} y1=${e-i} x2=${t} y2=${e+i} />
      <line x1=${t-n} y1=${e-n} x2=${t+n} y2=${e+n} />
      <line x1=${t-n} y1=${e+n} x2=${t+n} y2=${e-n} />
    </g>
    <circle class="hub" cx=${t} cy=${e} r="3" />
  `}At(),Ut(),Me(),Xt(),Bt({type:de,name:"Nvision Activity",description:"Animated figure that reacts to detected activity (walking, running, cycling, driving…)"});var Se,ze,Ee,Pe,Te=class extends _t{static async getConfigElement(){return await Promise.resolve().then(()=>(Ce(),Ae)),document.createElement(ue)}static getStubConfig(t,e,i){const n=e.find(t=>t.toLowerCase().includes("activity"))||e.find(t=>t.startsWith("sensor."))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${de}`,entity:n}}setConfig(t){this._config={speed:1,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:4}}_renderScene(t){return"bicycle"===t?this._renderCyclist():"vehicle"===t?this._renderCar():this._renderPerson()}_renderPerson(){return V`
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
          ${ke(40,120,24)} ${ke(120,120,24)}
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
            ${ke(50,126,18)} ${ke(110,126,18)}
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
  `]}};function Ie(t){const e=Math.min(1,Math.max(0,t));return e<=0?0:Ee+e*(1-Ee)}function Oe(t,e){if(t){if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;if("string"==typeof t){const e=t.split(",").map(t=>Number(t.trim()));return e.length>=3&&e.every(t=>Number.isFinite(t))?`rgb(${e[0]}, ${e[1]}, ${e[2]})`:t}}return Re(e,"--warning-color","")||Re(e,"--state-active-color","")||Re(e,"--primary-color","#ffb300")}function qe(t,e){return Ne(void 0===t?0:function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,e.min??0,e.max??3e3),e.effects_min??0,e.effects_max??1)}function Le(t){return Math.min(1,Math.pow(Math.min(1,Math.max(0,t)),.5)/.75)}function Re(t,e,i){return getComputedStyle(t).getPropertyValue(e).trim()||i}function Fe(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ne(t,e=0,i=1){const n=Math.min(e,i);return n+Math.min(1,Math.max(0,t))*(Math.max(e,i)-n)}function je(t,e,i="center"){if(!t)return;const n=e.getBoundingClientRect(),s=t.getBoundingClientRect();if(s.width<=0||s.height<=0)return;let a=s.left+s.width/2-n.left,r=s.top+s.height/2-n.top;return"top"===i?r=s.top-n.top:"bottom"===i?r=s.bottom-n.top:"left"===i?a=s.left-n.left:"right"===i&&(a=s.right-n.left),{x:a,y:r}}function Ue(t){const e=43758.5453*Math.sin(127.1*t+311.7*t);return e-Math.floor(e)}function Be(t,e,i,n,s,a){const r=Ie(n),o=Math.hypot(i.x-e.x,i.y-e.y);o<4||function(t,e,i,n,s){if(!(e.length<2)){t.save(),t.lineCap="round",t.lineJoin="round",t.strokeStyle=i,t.shadowColor=i,t.shadowBlur=3*s,t.globalAlpha=n,t.lineWidth=s,t.beginPath(),t.moveTo(e[0].x,e[0].y);for(let i=1;i<e.length;i+=1)t.lineTo(e[i].x,e[i].y);t.stroke(),t.restore()}}(t,function(t,e,i,n,s){const a=[t],r=e.x-t.x,o=e.y-t.y,l=Math.hypot(r,o)||1,c=-o/l,h=r/l,d=r/l,u=o/l;for(let m=1;m<i;m+=1){const e=m/i,l=Math.sin(e*Math.PI),g=2*Ue(s+5.17*m)-1,p=2*Ue(s+9.43*m)-1,f=n*l;a.push({x:t.x+r*e+c*f*g+d*f*.2*p,y:t.y+o*e+h*f*g+u*f*.2*p})}return a.push(e),a}(e,i,Math.min(14,Math.max(5,Math.round(o/14))),function(t,e){const i=Ie(t);return Math.max(1.5,e*(.008+i*i*.26))}(n,o),s),a,.5+.42*r,1+1.6*r)}function De(t,e,i,n,s,a){n<=0||Math.hypot(i.x-e.x,i.y-e.y)<4||Be(t,e,i,n,Math.floor(3*s),a)}Zt([kt({attribute:!1})],Te.prototype,"hass",void 0),Zt([zt()],Te.prototype,"_config",void 0),Te=Zt([yt(de)],Te);var He,Ge,We,Ve,Ye,Qe=ht(()=>{Se=3e3,ze=.12,Ee=.18,Pe=class{constructor(t,e,i,n){this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._host=t,this._getArcs=e,this._getColor=i,this._onFrame=n}attach(t){this._canvas!==t&&(this.detach(),this._canvas=t,this._ctx=t.getContext("2d")??void 0),this._ctx&&this._canvas&&(this._resizeObserver||(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this._host),this._resizeCanvas()),this._animating||(this._lastFrame=0,this._startAnimation()))}detach(){cancelAnimationFrame(this._frameId),this._animating=!1,this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._canvas=void 0,this._ctx=void 0}_resizeCanvas(){const t=this._canvas,e=this._ctx;if(!t||!e)return;const i=t.getBoundingClientRect(),n=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(i.width*n)),t.height=Math.max(1,Math.floor(i.height*n)),e.setTransform(n,0,0,n,0,0)}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this._animating||!this._ctx||!this._canvas?.isConnected)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._onFrame?.(i),this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;const a=this._getArcs(),r=a.reduce((t,e)=>Math.max(t,e.intensity),0);this._phase+=t*(.32+.38*r),i.clearRect(0,0,n,s);const o=this._getColor();for(const l of a)De(i,l.from,l.to,l.intensity,this._phase,o)}}}),Ze=ht(()=>{He="nvision-liquid-card",Ge="nvision-liquid-card-editor",We="bubbles"}),Xe=/* @__PURE__ */dt({NvisionLiquidCardEditor:()=>Ye}),Je=ht(()=>{At(),Ut(),ie(),ne(),Ze(),Xt(),Ve=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"liquid_style",required:!0,default:We,selector:{select:{options:[{value:"none",label:"None"},{value:"bubbles",label:"Bubbles"},{value:"electricity",label:"Electricity"}],mode:"dropdown"}}},{name:"level_color",selector:{boolean:{}}},{name:"level_color_invert",selector:{boolean:{}}},{name:"color",selector:{color_rgb:{}}}],Ye=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Liquid color":"level_color"===t.name?"Level-based color":"level_color_invert"===t.name?"Invert level colors":"liquid_style"===t.name?"Liquid style":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,liquid_style:We,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ve}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],Ye.prototype,"_config",void 0),Ye=Zt([yt(Ge)],Ye)});At(),Ut(),Qe(),Ze(),Xt(),Bt({type:He,name:"Nvision Liquid",description:"Animated liquid background with sensor state in the foreground"});var Ke=.92,ti=4,ei=.022,ii=2.4,ni=2.5,si=.034,ai=1.7,ri=1.5,oi=.015,li=3.1;function ci(t,e,i,n,s,a,r){const o=t=>{const e=43758.5453*Math.sin(127.1*(r+t)+311.7*(r+t));return e-Math.floor(e)},l=Math.floor(3*o(0)),c=.08+.82*o(1);if(0===l){const r=di(0,t,e,i,n,s,a);return{x:0,y:r+(e-r)*c}}if(1===l){const r=di(t,t,e,i,n,s,a);return{x:t,y:r+(e-r)*c}}const h=o(3)*t;return{x:h,y:di(h,t,e,i,n,s,a)}}function hi(t,e,i){if(void 0===t||"unavailable"===t||"unknown"===t)return.62;const n=Number(t);return Number.isFinite(n)?Math.min(Ke,Math.max(0,function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(n,e,i))):.62}function di(t,e,i,n,s,a,r){return i*(1-n)+1.2*Math.sin(.65*s)*a+(t-e/2)*r.x*i*.42*.08+Math.sin(t*ei+s*ii)*ti*a+Math.sin(t*si+s*ai+1.2)*ni*a+Math.sin(t*oi-s*li+2.4)*ri*a}var ui,mi,gi,pi,fi,_i,vi=class extends _t{constructor(...t){super(...t),this._frameId=0,this._phase=0,this._lastFrame=0,this._animating=!1,this._bubbles=[],this._lightningPhase=0,this._gravity={x:0,y:1},this._orientationBeta=90,this._orientationGamma=0,this._spawnTimer=0,this._agitation=0,this._mouseAgitation=0,this._mouseAgitationTarget=0,this._scrollElements=[],this._lastTouchY=0,this._lastMouseX=0,this._lastMouseY=0,this._mouseOver=!1,this._displayFill=0,this._targetFill=0,this._onWheel=t=>{this._boostAgitation(Math.min(.45,.0018*Math.abs(t.deltaY)))},this._onScroll=()=>{this._boostAgitation(.34)},this._onTouchMove=t=>{if(!t.touches.length)return;const e=t.touches[0].clientY;this._lastTouchY&&this._boostAgitation(Math.min(.3,Math.abs(e-this._lastTouchY)/100)),this._lastTouchY=e},this._onTouchEnd=()=>{this._lastTouchY=0},this._onPointerMove=t=>{const e=this.getBoundingClientRect();if(e.width<=0||e.height<=0)return;const i=t.clientX,n=t.clientY;if(i>=e.left&&i<=e.right&&n>=e.top&&n<=e.bottom){if(this._mouseOver){const t=Math.hypot(i-this._lastMouseX,n-this._lastMouseY);this._mouseAgitationTarget=Math.min(1,this._mouseAgitationTarget+Math.min(.2,.004*t))}this._lastMouseX=i,this._lastMouseY=n,this._mouseOver=!0}else this._mouseOver=!1},this._onDeviceOrientation=t=>{null!=t.beta&&(this._orientationBeta=t.beta),null!=t.gamma&&(this._orientationGamma=t.gamma)}}static async getConfigElement(){return await Promise.resolve().then(()=>(Je(),Xe)),document.createElement(Ge)}static getStubConfig(t,e,i){const n=e.find(e=>"%"===t.states[e]?.attributes?.unit_of_measurement)||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${He}`,entity:n,min:0,max:100}}_boostAgitation(t){this._agitation=Math.min(1,this._agitation+t)}_ampScale(t){return this._agitation=Math.max(0,this._agitation-.016*t),this._mouseAgitation+=.055*(this._mouseAgitationTarget-this._mouseAgitation)*t,this._mouseAgitationTarget=Math.max(0,this._mouseAgitationTarget-.02*t),.3+Math.min(1,this._agitation+this._mouseAgitation)*(2.2-.3)}_bindScroll(){window.addEventListener("wheel",this._onWheel,{passive:!0}),window.addEventListener("touchmove",this._onTouchMove,{passive:!0}),window.addEventListener("touchend",this._onTouchEnd,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove,{passive:!0}),window.addEventListener("deviceorientation",this._onDeviceOrientation,{passive:!0}),this._bindScrollParents()}_unbindScroll(){window.removeEventListener("wheel",this._onWheel),window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("deviceorientation",this._onDeviceOrientation);for(const t of this._scrollElements)t.removeEventListener("scroll",this._onScroll);this._scrollElements=[]}_bindScrollParents(){for(const e of this._scrollElements)e.removeEventListener("scroll",this._onScroll);this._scrollElements=[];let t=this;for(;t;){if(t===document.documentElement||t===document.body){t=t.parentElement;continue}const{overflowY:e,overflow:i}=getComputedStyle(t);(/(auto|scroll)/.test(e)||/(auto|scroll)/.test(i))&&(t.addEventListener("scroll",this._onScroll,{passive:!0}),this._scrollElements.push(t)),t=t.parentElement}}setConfig(t){this._config={min:0,max:100,liquid_style:We,...t}}_liquidStyle(){return this._config?.liquid_style??"bubbles"}_tickGravity(){const t=function(t,e){const i=e*Math.PI/180,n=t*Math.PI/180,s=Math.sin(i),a=Math.sin(n),r=Math.hypot(s,a);return r<.05?{x:0,y:1}:{x:s/r,y:a/r}}(this._orientationBeta,this._orientationGamma);return this._gravity=function(t,e){return{x:t.x+.1*(e.x-t.x),y:t.y+.1*(e.y-t.y)}}(this._gravity,t),this._gravity}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._bindScroll(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._unbindScroll(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}updated(t){if(t.has("_config")){const t=this._config?.entity;t!==this._trackedEntity&&(this._trackedEntity=t,this._trackedState=void 0,this._displayFill=0,this._bubbles=[],this._lightningPhase=0,this._spawnTimer=0)}if(t.has("hass")){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0;if(e!==this._trackedState){this._trackedState=e;const{min:t,max:i}=this._range();this._targetFill=hi(e,t,i)}}this._ensureCanvas(),this._bindScrollParents()}_syncFillTarget(){const t=this._config?.entity,e=t?this.hass?.states[t]?.state:void 0,{min:i,max:n}=this._range(),s=hi(e,i,n);if(void 0===this._trackedState)return this._displayFill=0,this._targetFill=s,this._trackedState=e,void(this._trackedEntity=t);e!==this._trackedState&&(this._trackedState=e,this._targetFill=s)}_tickFill(t){const e=this._targetFill-this._displayFill;if(Math.abs(e)<.002)return this._displayFill=this._targetFill,this._displayFill;const i=Math.sign(e)*Math.min(Math.abs(e),(e>0?.026:.036)*t);return this._displayFill=Math.min(Ke,Math.max(0,this._displayFill+i)),this._boostAgitation(Math.min(.05,1.8*Math.abs(i))),this._displayFill}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._phase+=.045*i,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_drawLiquidPath(t,e,i,n,s,a,r){t.beginPath(),t.moveTo(0,i);for(let o=0;o<=e;o+=2)t.lineTo(o,di(o,e,i,n,s,a,r));t.lineTo(e,i),t.closePath()}_spawnBubble(t,e){if(this._bubbles.length>=14)return;const i=12+Math.random()*(t-24),n=e+20*Math.random();this._bubbles.push({x:i,y:n,radius:2+4*Math.random(),speed:.6+.8*Math.random(),wobble:Math.random()*Math.PI*2,wobbleSpeed:.04+.04*Math.random(),popProgress:0})}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncFillTarget();const a=this._tickFill(t),r=this._ampScale(t),o=this._tickGravity(),l=this._liquidStyle(),c=a/Ke,h=this._config?.level_color?function(t,e){const i=ve(pe(t,"--success-color","#4caf50")),n=ve(pe(t,"--warning-color","#ff9800")),s=ve(pe(t,"--error-color","#f44336")),a=Math.min(1,Math.max(0,e));return ye(a<=.5?be(i,n,2*a):be(n,s,2*(a-.5)))}(this,this._config.level_color_invert?1-c:c):_e(this._config?.color,this,"--info-color","#29b6f6"),d=pe(this,"--card-background-color","#1c1c1c"),u=function(t,e){const i=ve(t),n=ve(e);return{surface:ye(xe(i,.3)),mid:ye(i),deep:ye(xe(i,-.38)),glow:ye(be(i,n,.72))}}(h,d);i.clearRect(0,0,n,s);const m=i.createLinearGradient(0,0,0,s);m.addColorStop(0,d),m.addColorStop(.55,d),m.addColorStop(1,u.glow),i.fillStyle=m,i.globalAlpha=.14,i.fillRect(0,0,n,s),i.globalAlpha=1,this._drawLiquidPath(i,n,s,a,this._phase,r,o);const g=s*(1-a),p=i.createLinearGradient(0,g,0,s);p.addColorStop(0,u.surface),p.addColorStop(.35,u.mid),p.addColorStop(1,u.deep),i.fillStyle=p,i.globalAlpha=.5,i.fill(),i.globalAlpha=1,i.beginPath();for(let f=0;f<=n;f+=2){const t=di(f,n,s,a,this._phase,r,o);0===f?i.moveTo(f,t):i.lineTo(f,t)}if(i.strokeStyle=u.surface,i.globalAlpha=.35,i.lineWidth=1.5,i.stroke(),i.globalAlpha=1,"bubbles"===l){this._spawnTimer+=t,this._spawnTimer>28&&a>.04&&(this._spawnTimer=0,this._spawnBubble(n,s)),this._bubbles=this._bubbles.filter(e=>{if(e.popProgress>0)return e.popProgress+=.06*t,e.popProgress<1;e.wobble+=e.wobbleSpeed*t,e.x-=o.x*e.speed*t,e.y-=o.y*e.speed*t,e.x+=.15*Math.sin(e.wobble);const i=di(e.x,n,s,a,this._phase,r,o);return e.y-e.radius<=i&&(e.popProgress=.01),!0});for(const t of this._bubbles){if(t.popProgress>0){const e=t.popProgress,n=t.radius*(1+2.2*e);i.beginPath(),i.arc(t.x,t.y,n,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.5*(1-e),i.lineWidth=1.2,i.stroke(),i.globalAlpha=1;continue}i.beginPath(),i.arc(t.x,t.y,t.radius,0,2*Math.PI),i.strokeStyle=u.mid,i.globalAlpha=.55,i.lineWidth=1.1,i.stroke(),i.globalAlpha=1}}else this._bubbles=[];if("electricity"===l&&a>.04){this._lightningPhase+=t*(.1+.2*a);const e=function(t,e){return{x:t/2,y:e}}(n,s),l=Math.min(3,1+Math.floor(2*a)),c=Math.floor(.65*this._lightningPhase),h=.6*a;for(let t=0;t<l;t+=1)De(i,e,ci(n,s,a,this._phase,r,o,c+17*t),h,this._lightningPhase+.85*t,u.mid)}else"electricity"!==l&&(this._lightningPhase=0)}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Nvision",i=Dt(t);return W`
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
  `]}};Zt([kt({attribute:!1})],vi.prototype,"hass",void 0),Zt([zt()],vi.prototype,"_config",void 0),Zt([Ot("canvas")],vi.prototype,"_canvas",void 0),vi=Zt([yt(He)],vi);var yi,bi,xi=ht(()=>{ui="nvision-waveform-card",mi="nvision-waveform-card-editor",gi=.38,pi=.72,fi=.78,_i="line"}),wi=/* @__PURE__ */dt({NvisionWaveformCardEditor:()=>bi}),$i=ht(()=>{At(),Ut(),ie(),ne(),xi(),Xt(),yi=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{name:"shape",required:!0,default:_i,selector:{select:{options:[{value:"line",label:"Line"},{value:"circle",label:"Circle"},{value:"grid",label:"Grid"}],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"dot_count",required:!0,default:24,selector:{number:{min:4,max:64,step:1}}},{name:"dot_size",required:!0,default:1,selector:{number:{min:.25,max:3,step:.05}}},{name:"dot_spacing",required:!0,default:1,selector:{number:{min:.5,max:2,step:.05}}}]},{type:"grid",name:"",schema:[{name:"wave_amplitude",required:!0,default:1,selector:{number:{min:0,max:3,step:.05}}},{name:"wave_frequency",required:!0,default:1,selector:{number:{min:.1,max:3,step:.05}}}]},{name:"overlap_dots",selector:{boolean:{}}},{type:"grid",name:"",schema:[{name:"overlap_at",required:!0,default:gi,selector:{number:{min:0,max:1,step:.01}}},{name:"shake_at",required:!0,default:pi,selector:{number:{min:0,max:1,step:.01}}}]},{name:"shake_peak",required:!0,default:fi,selector:{number:{min:0,max:1,step:.01}}}],bi=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Waveform color":"shape"===t.name?"Shape":"dot_count"===t.name?"Dot count":"dot_size"===t.name?"Dot size":"dot_spacing"===t.name?"Dot spacing":"wave_amplitude"===t.name?"Wave amplitude":"wave_frequency"===t.name?"Wave frequency":"overlap_dots"===t.name?"Overlap dots":"overlap_at"===t.name?"Overlap threshold":"shake_at"===t.name?"Shake threshold":"shake_peak"===t.name?"Shake intensity":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,shape:_i,dot_count:24,dot_size:1,dot_spacing:1,overlap_dots:!1,overlap_at:gi,shake_at:pi,shake_peak:fi,wave_amplitude:1,wave_frequency:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${yi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],bi.prototype,"_config",void 0),bi=Zt([yt(mi)],bi)});At(),Ut(),xi(),Xt(),Bt({type:ui,name:"Nvision Waveform",description:"Oscilloscope dot patterns driven by a numeric sensor"});function Mi(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ai(t){return Array.from({length:t},(e,i)=>({phase:i/t*Math.PI*2,freq:.85+i%7*.11}))}function Ci(t,e,i,n,s,a,r,o,l,c,h=0){const d=(i+1.85*h)*c,u=e+.47*h,m=s*(.018+.11*n)*l;if(o+=Math.sin(1.05*d+.72*u)*m,n>.04){const e=n*n;o+=Math.sin(d*(2.2+t.freq)+1.15*u)*s*e*.09*l+Math.cos(d*(4.4+.6*t.freq)+t.phase+h)*s*e*.06*l,n>=a&&(r+=Math.sin(d*(3.1+t.freq)+.85*u)*s*e*.07*l+Math.cos(d*(5.6+.35*u)+t.phase+h)*s*e*.05*l)}if(n>.45){const e=(n-.45)*(n-.45);o+=Math.sin(8.2*d+2.1*u)*s*e*.12*l,r+=Math.cos(7.4*d+1.7*u+t.phase+h)*s*e*.1*l}if(h){const e=.012*s*l;r+=Math.cos(1.7*t.phase+.4*d)*e,o+=Math.sin(2.3*t.phase+.35*d)*e}return{x:r,y:o}}function ki(t,e,i,n,s){return{x:Math.max(.04*s,Math.min(i-.04*s,t)),y:Math.max(.08*s,Math.min(n-.08*s,e))}}function Si(t,e,i,n,s,a,r,o,l,c,h,d,u,m=0){switch(t){case"circle":return function(t,e,i,n,s,a,r,o,l,c,h,d=0){const u=Math.min(a,r),m=a/2,g=r/2,p=.14*u,f=(Math.min(a,r)/2-p)*o,_=e/i*Math.PI*2-Math.PI/2,v=(n+1.85*d)*h,y=e+.47*d;let b=f,x=0;if(s>.04){const e=s*s;b+=Math.sin(v*(2.2+t.freq)+1.15*y)*u*e*.06*c,x+=Math.sin(v*(3.1+t.freq)+.85*y)*e*.15*c,s>=l&&(b+=Math.cos(v*(5.6+.35*y)+t.phase+d)*u*e*.05*c,x+=Math.cos(v*(4.4+.6*t.freq)+t.phase+d)*e*.12*c)}if(s>.45){const t=(s-.45)*(s-.45);b+=Math.sin(8.2*v+2.1*y)*u*t*.1*c,x+=Math.cos(7.4*v+1.7*y+d)*t*.2*c}const w=_+x;let $=m+Math.cos(w)*b,M=g+Math.sin(w)*b;return({x:$,y:M}=Ci(t,e,n,.35*s,u,l,$,M,c,h,d)),ki($,M,a,r,u)}(e,i,n,s,a,o,l,c,h,d,u,m);case"grid":return function(t,e,i,n,s,a,r,o,l,c,h,d=0){const u=Math.min(a,r),m=Math.ceil(Math.sqrt(i)),g=Math.ceil(i/m),p=e%m,f=Math.floor(e/m),_=.08*u,v=.08*u,y=.035*u*o,b=(a-2*_-y*(m-1))/m,x=(r-2*v-y*(g-1))/g;let{x:w,y:$}=Ci(t,e,n,s,u,l,_+p*(b+y)+b/2,v+f*(x+y)+x/2,c,h,d);return ki(w,$,a,r,u)}(e,i,n,s,a,o,l,c,h,d,u,m);default:return function(t,e,i,n,s,a,r,o,l,c,h,d,u=0){const m=Math.min(r,o),g=i<=1?.5:e/(i-1),p=(a.right-a.left)*Math.min(l,1.75);let{x:f,y:_}=Ci(t,e,n,s,m,c,(a.left+a.right-p)/2+g*p,a.y,h,d,u);return ki(f,_,r,o,m)}(e,i,n,s,a,r,o,l,c,h,d,u,m)}}var zi,Ei,Pi=class extends _t{constructor(...t){super(...t),this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._displayIntensity=0,this._targetIntensity=0,this._dots=Ai(24)}static async getConfigElement(){return await Promise.resolve().then(()=>($i(),wi)),document.createElement(mi)}static getStubConfig(t,e,i){const n=e.find(e=>void 0!==Mi(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${ui}`,entity:n,min:0,max:100,shape:_i,dot_count:24,dot_size:1,dot_spacing:1,overlap_dots:!1,overlap_at:gi,shake_at:pi,shake_peak:fi,wave_amplitude:1,wave_frequency:1}}setConfig(t){this._config={min:0,max:100,shape:_i,dot_count:24,dot_size:1,dot_spacing:1,overlap_dots:!1,overlap_at:gi,shake_at:pi,shake_peak:fi,wave_amplitude:1,wave_frequency:1,...t},this._syncDots()}_waveOptions(){return{amplitude:this._config?.wave_amplitude??1,frequency:this._config?.wave_frequency??1}}_layoutOptions(){return{shape:this._config?.shape??"line",dotCount:Math.min(64,Math.max(4,Math.round(this._config?.dot_count??24))),dotSize:this._config?.dot_size??1,dotSpacing:this._config?.dot_spacing??1}}_syncDots(){const{dotCount:t}=this._layoutOptions();this._dots.length!==t&&(this._dots=Ai(t))}_effectThresholds(){return{overlapAt:this._config?.overlap_at??.38,shakeAt:this._config?.shake_at??.72,shakePeak:this._config?.shake_peak??.78}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),this.style.transform="",super.disconnectedCallback()}updated(t){(t.has("hass")||t.has("_config"))&&this._syncIntensity(),t.has("_config")&&this._syncDots(),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncIntensity(){const t=this._config?.entity,e=Mi(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetIntensity=void 0!==e?function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(e,i,n):0}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0),this._syncDots()}_tickIntensity(t){const e=this._targetIntensity-this._displayIntensity;return Math.abs(e)<.001?this._displayIntensity=this._targetIntensity:this._displayIntensity+=.1*e*t,this._displayIntensity}_applyShake(t){const{shakeAt:e,shakePeak:i}=this._effectThresholds();if(t<e)return void(this.style.transform="");const n=(t-e)/(1-e)*i,s=Math.sin(14.3*this._phase)*n*2.4+Math.cos(19.7*this._phase)*n*1.2,a=Math.cos(16.1*this._phase)*n*1.8+Math.sin(11.2*this._phase)*n*.9,r=Math.sin(21.5*this._phase)*n*.4;this.style.transform=`translate(${s}px, ${a}px) rotate(${r}deg)`}_drawDot(t,e,i,n,s,a){t.beginPath(),t.arc(e,i,2.2*n,0,2*Math.PI),t.fillStyle=s,t.globalAlpha=.12*a,t.fill(),t.beginPath(),t.arc(e,i,n,0,2*Math.PI),t.globalAlpha=a,t.fill(),t.globalAlpha=1}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncIntensity();const a=this._tickIntensity(t),{amplitude:r,frequency:o}=this._waveOptions();this._phase+=t*(.045+.12*a)*o,this._applyShake(a);const l=(c=this._config?.color,_e(c,this,"--primary-color","#03a9f4"));var c;const{overlapAt:h}=this._effectThresholds(),{shape:d,dotSize:u,dotSpacing:m}=this._layoutOptions(),g=Math.max(1.05,.0115*Math.min(n,s))*Math.max(.25,u),p=function(t,e,i){const n=.08*Math.min(t,e);var s;const a=.72*e;return{left:n,right:t-n,y:a+(.48*e-a)*((s=i)*s*(3-2*s))}}(n,s,a);i.clearRect(0,0,n,s);const f=this._config?.overlap_dots?2:1;for(let _=0;_<this._dots.length;_+=1)for(let t=0;t<f;t+=1){const e=t,{x:c,y:u}=Si(d,this._dots[_],_,this._dots.length,this._phase,a,p,n,s,m,h,r,o,e),f=g*(.85+.35*a)*(e?.92:1),v=(.32+.5*a)*(e?.78:1);this._drawDot(i,c,u,f,l,v)}}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Waveform",i=Dt(t);return W`
      <ha-card>
        <div class="stage">
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
          <canvas aria-hidden="true"></canvas>
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
    }

    .content {
      position: relative;
      z-index: 0;
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
    }

    canvas {
      position: absolute;
      inset: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }
  `]}};Zt([kt({attribute:!1})],Pi.prototype,"hass",void 0),Zt([zt()],Pi.prototype,"_config",void 0),Zt([Ot("canvas")],Pi.prototype,"_canvas",void 0),Pi=Zt([yt(ui)],Pi);var Ti,Ii,Oi=ht(()=>{zi="nvision-air-quality-card",Ei="nvision-air-quality-card-editor"}),qi=/* @__PURE__ */dt({NvisionAirQualityCardEditor:()=>Ii}),Li=ht(()=>{At(),Ut(),ie(),ne(),Oi(),Xt(),Ti=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"color_good",selector:{color_rgb:{}}},{name:"color_warning",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_bad",selector:{color_rgb:{}}},{name:"color_mist",selector:{color_rgb:{}}}]},{type:"grid",name:"",schema:[{name:"color_clear",selector:{color_rgb:{}}},{name:"color_sky",selector:{color_rgb:{}}}]}],Ii=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color_good"===t.name?"Good gauge color":"color_warning"===t.name?"Moderate gauge color":"color_bad"===t.name?"Poor gauge color":"color_mist"===t.name?"Mist color":"color_clear"===t.name?"Clear glow color":"color_sky"===t.name?"Sky glow color":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ti}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],Ii.prototype,"_config",void 0),Ii=Zt([yt(Ei)],Ii)});At(),Ut(),Oi(),Xt(),Bt({type:zi,name:"Nvision Air Quality",description:"Gauge with gradient arc, mist when air is poor, crisp glow when clear"});var Ri=40*Math.PI,Fi=.38,Ni=.62;function ji(t){return t>=Fi?0:(Fi-t)/Fi}function Ui(t){return t<=Ni?0:(t-Ni)/.38}function Bi(t,e){return{good:_e(t?.color_good,e,"--success-color","#4caf50"),warning:_e(t?.color_warning,e,"--warning-color","#ff9800"),bad:_e(t?.color_bad,e,"--error-color","#f44336"),mist:_e(t?.color_mist,e,"--secondary-text-color","#888888"),clear:_e(t?.color_clear,e,"--success-color","#4caf50"),sky:_e(t?.color_sky,e,"--info-color","#2196f3")}}function Di(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Hi(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}var Gi,Wi,Vi=0,Yi=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._gradientId="aq-gradient-"+ ++Vi,this._frameId=0,this._animating=!1,this._lastFrame=0,this._phase=0,this._displayValue=0,this._targetValue=0,this._mist=[]}static async getConfigElement(){return await Promise.resolve().then(()=>(Li(),qi)),document.createElement(Ei)}static getStubConfig(t,e,i){const n=e.find(e=>function(t,e){const i=t.states[e];if(!i)return!1;const n=i.attributes?.device_class;return"aqi"===n||"pm25"===n||"pm10"===n||/aqi|air_quality|pm2/i.test(e)}(t,e))||e.find(e=>void 0!==Di(t.states[e]?.state))||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${zi}`,entity:n,min:0,max:100}}setConfig(t){this._config={min:0,max:100,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:2}}connectedCallback(){super.connectedCallback(),this._ctx&&(this._lastFrame=0,this._startAnimation())}disconnectedCallback(){this._stopAnimation(),this._resizeObserver?.disconnect(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0})}updated(t){(t.has("hass")||t.has("_config"))&&(this._syncValue(),this._applyEffectLevels(this._badness(this._targetValue))),this._ensureCanvas()}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_syncValue(){const t=this._config?.entity,e=Di(t?this.hass?.states[t]?.state:void 0),{min:i,max:n}=this._range();this._targetValue=void 0!==e?Math.min(n,Math.max(i,e)):i}_tickValue(t){const e=this._targetValue-this._displayValue;return Math.abs(e)<.05?this._displayValue=this._targetValue:this._displayValue+=.08*e*t,this._displayValue}_badness(t){const{min:e,max:i}=this._range();return Hi(t,e,i)}_applyEffectLevels(t){this._stage?.style.setProperty("--haze",String(Ui(t))),this._stage?.style.setProperty("--clarity",String(ji(t)))}_ensureCanvas(){const t=this._canvas;t&&!this._ctx&&(this._ctx=t.getContext("2d")??void 0,this._ctx&&(this._resizeObserver=new ResizeObserver(()=>this._resizeCanvas()),this._resizeObserver.observe(t.parentElement??this),this._resizeCanvas(),this._lastFrame=0,this._startAnimation()))}_startAnimation(){if(this._animating)return;this._animating=!0;const t=e=>{if(!this.isConnected||!this._ctx)return void(this._animating=!1);const i=this._lastFrame?Math.min((e-this._lastFrame)/16.67,3):1;this._lastFrame=e,this._draw(i),this._frameId=requestAnimationFrame(t)};this._frameId=requestAnimationFrame(t)}_stopAnimation(){cancelAnimationFrame(this._frameId),this._animating=!1}_resizeCanvas(){const t=this._canvas;if(!t)return;const e=t.getBoundingClientRect(),i=window.devicePixelRatio||1;t.width=Math.max(1,Math.floor(e.width*i)),t.height=Math.max(1,Math.floor(e.height*i)),this._ctx?.setTransform(i,0,0,i,0,0)}_ensureMist(t,e,i){const n=Math.floor(16*i);for(;this._mist.length<n;)this._mist.push({x:Math.random()*t,y:Math.random()*e,radius:18+42*Math.random(),vx:.22*(Math.random()-.5),vy:-.04-.18*Math.random(),alpha:.04+.1*Math.random()});this._mist.length>n&&(this._mist.length=n)}_drawMist(t,e,i,n,s,a){if(!(n<.08)){this._ensureMist(e,i,n);for(const r of this._mist){r.x+=r.vx*s,r.y+=r.vy*s,r.y+r.radius<0&&(r.y=i+r.radius,r.x=Math.random()*e),r.x<-r.radius&&(r.x=e+r.radius),r.x>e+r.radius&&(r.x=-r.radius);const o=t.createRadialGradient(r.x,r.y,0,r.x,r.y,r.radius);o.addColorStop(0,a),o.addColorStop(1,"rgba(0,0,0,0)"),t.beginPath(),t.arc(r.x,r.y,r.radius,0,2*Math.PI),t.fillStyle=o,t.globalAlpha=r.alpha*n*1.4,t.fill()}t.globalAlpha=1}}_drawClearGlow(t,e,i,n,s,a){if(n<.2)return;const r=.5*e,o=.36*i,l=.94+.06*Math.sin(.5*this._phase),c=.62*Math.min(e,i)*l,h=t.createRadialGradient(r,o,0,r,o,c);h.addColorStop(0,s),h.addColorStop(.55,a),h.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=h,t.globalAlpha=n*n*.1,t.fillRect(0,0,e,i);const d=t.createLinearGradient(0,0,0,.55*i);d.addColorStop(0,a),d.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=d,t.globalAlpha=.06*n,t.fillRect(0,0,e,i),t.globalAlpha=1}_draw(t){const e=this._canvas,i=this._ctx;if(!e||!i)return;const n=e.clientWidth,s=e.clientHeight;if(n<=0||s<=0)return;this._syncValue();const a=this._tickValue(t),r=this._badness(a),o=ji(r),l=Ui(r);this._phase+=.025*t,this._applyEffectLevels(r);const c=Bi(this._config,this);i.clearRect(0,0,n,s),this._drawClearGlow(i,n,s,o,c.clear,c.sky),this._drawMist(i,n,s,l,t,c.mist)}_renderGauge(t,e,i,n,s,a){const{min:r,max:o}=this._range(),l=function(t,e,i){return 180*Hi(t,e,i)}(t,r,o),c=this._gaugeReady?Ri*(1-l/180):Ri;return V`
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
          stroke-dasharray=${Ri}
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
    `}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=Di(t?.state),i=e??this._targetValue,n=this._config.name||t?.attributes.friendly_name||"Air Quality",s=t?.attributes.unit_of_measurement??"",a=void 0!==e?String(Math.round(10*e)/10):"—",r=Bi(this._config,this);return W`
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
  `]}};Zt([kt({attribute:!1})],Yi.prototype,"hass",void 0),Zt([zt()],Yi.prototype,"_config",void 0),Zt([zt()],Yi.prototype,"_gaugeReady",void 0),Zt([Ot("canvas")],Yi.prototype,"_canvas",void 0),Zt([Ot(".stage")],Yi.prototype,"_stage",void 0),Yi=Zt([yt(zi)],Yi);var Qi,Zi,Xi=ht(()=>{Gi="nvision-circle-gauge-card",Wi="nvision-circle-gauge-card-editor"}),Ji=/* @__PURE__ */dt({NvisionCircleGaugeCardEditor:()=>Zi}),Ki=ht(()=>{At(),Ut(),ie(),ne(),Xi(),Xt(),Qi=[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:100,selector:{number:{step:"any"}}}]},{name:"color",selector:{color_rgb:{}}},{name:"track_color",selector:{color_rgb:{}}},{name:"reverse",selector:{boolean:{}}}],Zi=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum value":"max"===t.name?"Maximum value":"color"===t.name?"Gauge color":"track_color"===t.name?"Track color":"reverse"===t.name?"Reverse":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:100,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Qi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],Zi.prototype,"_config",void 0),Zi=Zt([yt(Wi)],Zi)});At(),Ut(),Xi(),Xt(),Bt({type:Gi,name:"Nvision Circle Gauge",description:"Full-circle gauge with the value centered, ideal for timers"});var tn=2*Math.PI*40;function en(t){if(void 0===t||"unavailable"===t||"unknown"===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function nn(t){const e=t.split(":").map(Number);return 3===e.length?3600*e[0]+60*e[1]+e[2]:2===e.length?60*e[0]+e[1]:Number(t)||0}function sn(t){const e=t.attributes.duration;return"string"==typeof e?nn(e):0}function an(t,e,i){return"idle"===t.state&&void 0===e?"Idle":void 0===e?"—":"idle"===t.state&&0===e?"Idle":function(t,e){const i=Math.max(0,Math.floor(t)),n=Math.floor(i/3600),s=Math.floor(i%3600/60),a=i%60,r={};if(n&&(r.hours=n),s&&(r.minutes=s),(a||!n&&!s)&&(r.seconds=a),e?.language&&"undefined"!=typeof Intl&&"DurationFormat"in Intl)return new Intl.DurationFormat(e.language,{style:"narrow",hoursDisplay:n?"always":"auto"}).format(r);const o=[];return n&&o.push(`${n}h`),s&&o.push(`${s}m`),(a||0===o.length)&&o.push(`${a}s`),o.join(" ")}(e,i)}function rn(t){return t?.startsWith("timer.")??!1}var on,ln,cn=class extends _t{constructor(...t){super(...t),this._gaugeReady=!1,this._tick=0,this._rescaleOnConnect=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(Ki(),Ji)),document.createElement(Wi)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("timer."))||e.find(e=>function(t,e){const i=t.states[e];return!(!i||!rn(e)&&void 0===en(i.state))}(t,e))||e[0]||i[0]||Object.keys(t.states)[0],s=t.states[n],a=s&&rn(n)&&sn(s)||100;return{type:`custom:${Gi}`,entity:n,min:0,max:a}}setConfig(t){this._config={min:0,max:100,...t}}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:3}}connectedCallback(){super.connectedCallback(),this._syncTimerInterval(),this._rescaleOnConnect&&requestAnimationFrame(()=>{this._rescaleTextSvg(),this._rescaleOnConnect=!1})}disconnectedCallback(){this._clearTimerInterval(),super.disconnectedCallback()}firstUpdated(){requestAnimationFrame(()=>{this._gaugeReady=!0,this._rescaleTextSvg()})}updated(t){(t.has("hass")||t.has("_config"))&&this._syncTimerInterval(),(t.has("hass")||t.has("_config")||t.has("_tick")||t.has("_gaugeReady"))&&requestAnimationFrame(()=>this._rescaleTextSvg())}_range(){return{min:this._config?.min??0,max:this._config?.max??100}}_clearTimerInterval(){void 0!==this._timerInterval&&(clearInterval(this._timerInterval),this._timerInterval=void 0)}_syncTimerInterval(){this._clearTimerInterval();const t=this._config?.entity,e=t?this.hass?.states[t]:void 0;e&&rn(t)&&"active"===e.state&&(this._timerInterval=window.setInterval(()=>{this._tick+=1},1e3))}_reading(){this._tick;const t=this._config?.entity,e=t?this.hass?.states[t]:void 0,{min:i,max:n}=this._range();if(!e)return{value:i,valueText:"—",unit:""};if(rn(t)){const t=sn(e),s=function(t){const e=t.attributes.remaining;if("string"!=typeof e)return;let i=nn(e);if("active"===t.state&&t.attributes.finishes_at){const e=new Date(String(t.attributes.finishes_at)).getTime();i=Math.max((e-Date.now())/1e3,0)}return i}(e),a=n>i?n:t||n;return{value:s??("idle"===e.state?a:i),valueText:an(e,s??t,this.hass?.locale),unit:""}}const s=en(e.state),a=s??i;if(this.hass?.formatEntityStateToParts){const t=this.hass.formatEntityStateToParts(e);return{value:a,valueText:t.find(t=>"value"===t.type)?.value??(void 0!==s?String(s):"—"),unit:t.find(t=>"unit"===t.type)?.value??""}}const r=String(e.attributes.unit_of_measurement??"");return{value:a,valueText:void 0!==s?String(s):"—",unit:r}}_rescaleTextSvg(){if(!this.isConnected)return void(this._rescaleOnConnect=!0);const t=this.shadowRoot?.querySelector(".text"),e=t?.querySelector(".text-group");if(!t||!e)return;const i=e.getBBox();0===i.width&&0===i.height||t.setAttribute("viewBox",`${i.x} ${i.y} ${i.width} ${i.height}`)}_renderGauge(t,e,i,n,s){const{min:a,max:r}=this._range(),o=this._config?.entity,l=o?this.hass?.states[o]:void 0,c=l&&rn(o)?sn(l):r,h=function(t,e,i){return i<=e?0:Math.min(1,Math.max(0,(t-e)/(i-e)))}(t,a,rn(o)&&c>a?c:r),d=this._config?.reverse?1-h:h;return V`
      <svg viewBox="-50 -50 100 100" class="gauge">
        <circle class="track" cx="0" cy="0" r=${40} stroke=${s} />
        <circle
          class="value"
          cx="0"
          cy="0"
          r=${40}
          stroke=${n}
          stroke-dasharray=${tn}
          style=${ge({strokeDashoffset:`${this._gaugeReady?tn*(1-d):this._config?.reverse?0:tn}`})}
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
      padding: var(--ha-space-3, 12px);
      box-sizing: border-box;
    }

    .gauge-wrap {
      position: relative;
      width: 100%;
      max-width: var(--nv-gauge-max-size);
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
  `]}};Zt([kt({attribute:!1})],cn.prototype,"hass",void 0),Zt([zt()],cn.prototype,"_config",void 0),Zt([zt()],cn.prototype,"_gaugeReady",void 0),Zt([zt()],cn.prototype,"_tick",void 0),cn=Zt([yt(Gi)],cn);var hn,dn,un=ht(()=>{on="nvision-power-draw-card",ln="nvision-power-draw-card-editor"}),mn=/* @__PURE__ */dt({NvisionPowerDrawCardEditor:()=>dn}),gn=ht(()=>{At(),Ut(),ie(),ne(),Qe(),un(),Xt(),hn=[{name:"entity",selector:{entity:{domain:"sensor"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:Se,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}}],dn=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"name"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.name"):"entity"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entity"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={min:0,max:Se,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${hn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],dn.prototype,"_config",void 0),dn=Zt([yt(ln)],dn)});At(),Ut(),Qe(),un(),Xt(),Bt({type:on,name:"Nvision Power Draw",description:"Power consumption with animated lightning from a plug"});var pn,fn,_n=class extends _t{constructor(...t){super(...t),this._displayIntensity=0}static async getConfigElement(){return await Promise.resolve().then(()=>(gn(),mn)),document.createElement(ln)}static getStubConfig(t,e,i){const n=e.find(e=>{const i=t.states[e];return"power"===i?.attributes.device_class||e.includes("power")||void 0!==Fe(i?.state)})||e[0]||i[0]||Object.keys(t.states)[0];return{type:`custom:${on}`,entity:n,min:0,max:Se}}setConfig(t){this._config={min:0,max:Se,effects_min:0,effects_max:1,...t}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1}}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Oe(this._config?.color,this)}_syncLightningTheme(){this.style.setProperty("--lightning-color",this._lightningColor()),this.style.setProperty("--lightning-glow",String(Le(this._displayIntensity)))}_targetIntensity(){const t=this._config?.entity;return qe(Fe(t?this.hass?.states[t]?.state:void 0),this._config??{})}_tickIntensity(t){const e=this._targetIntensity(),i=e-this._displayIntensity;return Math.abs(i)<.001?this._displayIntensity=e:this._displayIntensity+=i*ze*t,this._syncLightningTheme(),this._displayIntensity}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Pe(this,()=>this._buildArcs(),()=>this._lightningColor(),t=>{this._tickIntensity(t)})),this._renderer.attach(t))}_buildArcs(){const t=this._canvas;if(!t)return[];const e=je(this._plug,t,"center"),i=je(this._entityIcon,t,"center");return e&&i?[{from:e,to:i,intensity:this._displayIntensity}]:[]}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0,e=this._config.name||t?.attributes.friendly_name||"Power Draw",i=Dt(t);return W`
      <ha-card>
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
    }

    ha-card {
      height: 100%;
      overflow: hidden;
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
      inset: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }
  `]}};Zt([kt({attribute:!1})],_n.prototype,"hass",void 0),Zt([zt()],_n.prototype,"_config",void 0),Zt([Ot("canvas")],_n.prototype,"_canvas",void 0),Zt([Ot(".plug")],_n.prototype,"_plug",void 0),Zt([Ot(".entity-icon")],_n.prototype,"_entityIcon",void 0),_n=Zt([yt(on)],_n);var vn,yn,bn=ht(()=>{pn="nvision-power-glance-card",fn="nvision-power-glance-card-editor"}),xn=/* @__PURE__ */dt({NvisionPowerGlanceCardEditor:()=>yn}),wn=ht(()=>{At(),Ut(),ie(),ne(),Qe(),bn(),Xt(),vn=[{name:"entities",selector:{entity:{multiple:!0,domain:"sensor"}}},{name:"columns",default:3,selector:{number:{min:1,max:6,mode:"box"}}},{type:"grid",name:"",schema:[{name:"min",required:!0,default:0,selector:{number:{step:"any"}}},{name:"max",required:!0,default:Se,selector:{number:{step:"any"}}}]},{type:"grid",name:"",schema:[{name:"effects_min",required:!0,default:0,selector:{number:{min:0,max:1,step:.05}}},{name:"effects_max",required:!0,default:1,selector:{number:{min:0,max:1,step:.05}}}]},{name:"color",selector:{color_rgb:{}}},{name:"icon",selector:{icon:{}}}],yn=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"entities"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.entities"):"columns"===t.name?this.hass.localize("ui.panel.lovelace.editor.card.generic.columns"):"min"===t.name?"Minimum watts":"max"===t.name?"Maximum watts":"effects_min"===t.name?"Minimum effect":"effects_max"===t.name?"Maximum effect":"color"===t.name?"Lightning color":"icon"===t.name?"Source icon":this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={entities:[],columns:3,min:0,max:Se,effects_min:0,effects_max:1,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${vn}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],yn.prototype,"_config",void 0),yn=Zt([yt(fn)],yn)});At(),Ut(),Qe(),bn(),Xt(),Bt({type:pn,name:"Nvision Power Glance",description:"Multiple power sensors with lightning from a bottom plug"});var $n=class extends _t{constructor(...t){super(...t),this._displayIntensities=/* @__PURE__ */new Map}static async getConfigElement(){return await Promise.resolve().then(()=>(wn(),xn)),document.createElement(fn)}static getStubConfig(t,e,i){const n=[...e,...i,...Object.keys(t.states)],s=/* @__PURE__ */new Set,a=[];for(const r of n){if(s.has(r))continue;s.add(r);const e=t.states[r];if(("power"===e?.attributes.device_class||r.includes("power")||void 0!==Fe(e?.state))&&a.push(r),a.length>=4)break}return{type:`custom:${pn}`,entities:a.length?a:n.slice(0,3),columns:3,min:0,max:Se}}setConfig(t){this._config={entities:[],columns:3,min:0,max:Se,effects_min:0,effects_max:1,...t},this._syncGridColumns()}_syncGridColumns(){const t=this._config?.columns??3,e=this._config?.entities?.length??0,i=e>0?Math.min(t,e):t;this.style.setProperty("--columns",String(i))}getCardSize(){const t=this._config?.entities?.length??1,e=this._config?.columns??3;return Math.max(1,Math.ceil(t/e))}getGridOptions(){return{columns:6,rows:this.getCardSize()}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){this._renderer?.detach(),super.disconnectedCallback()}firstUpdated(){this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}updated(){this._syncGridColumns(),this._syncLightningTheme(),requestAnimationFrame(()=>this._ensureRenderer())}_lightningColor(){return Oe(this._config?.color,this)}_syncLightningTheme(){this.style.setProperty("--lightning-color",this._lightningColor());const t=this._entityIds(),e=this._entityIcons?Array.from(this._entityIcons):[];let i=Le(0);t.forEach((t,n)=>{const s=Le(this._displayIntensities.get(t)??0);i=Math.max(i,s),e[n]?.style.setProperty("--lightning-glow",String(s))}),this._plug?.style.setProperty("--lightning-glow",String(i))}_entityIds(){return this._config?.entities??[]}_targetIntensity(t){const e=this.hass?.states[t]?.state;return qe(Fe(e),this._config??{})}_tickIntensities(t){for(const e of this._entityIds()){const i=this._targetIntensity(e),n=this._displayIntensities.get(e)??0,s=i-n;Math.abs(s)<.001?this._displayIntensities.set(e,i):this._displayIntensities.set(e,n+s*ze*t)}this._syncLightningTheme()}_ensureRenderer(){const t=this._canvas;t&&(this._renderer||(this._renderer=new Pe(this,()=>this._buildArcs(),()=>this._lightningColor(),t=>this._tickIntensities(t))),this._renderer.attach(t))}_buildArcs(){const t=this._canvas;if(!t)return[];const e=je(this._plug,t,"center");if(!e)return[];const i=this._entityIcons?Array.from(this._entityIcons):[],n=this._entityIds(),s=[];return n.forEach((n,a)=>{const r=je(i[a],t,"center"),o=this._displayIntensities.get(n)??0;r&&s.push({from:e,to:r,intensity:o})}),s}render(){return this._config&&this.hass?W`
      <ha-card>
        <div class="stage">
          <div class="entities">
            ${this._entityIds().map(t=>{const e=this.hass.states[t],i=Dt(e);return W`
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
    `:Q}static{this.styles=[Wt,Yt,r`
    :host {
      --tile-color: var(--state-inactive-color);
      --columns: 3;
      --lightning-color: var(--warning-color, #ffb300);
      --lightning-glow: 0;
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      overflow: hidden;
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
      inset: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }
  `]}};Zt([kt({attribute:!1})],$n.prototype,"hass",void 0),Zt([zt()],$n.prototype,"_config",void 0),Zt([Ot("canvas")],$n.prototype,"_canvas",void 0),Zt([Ot(".plug")],$n.prototype,"_plug",void 0),Zt([function(t){return(e,i)=>Et(e,i,{get(){return(this.renderRoot??(qt??=document.createDocumentFragment())).querySelectorAll(t)}})}(".entity-icon")],$n.prototype,"_entityIcons",void 0),$n=Zt([yt(pn)],$n),wt();var Mn=le(class extends ce{constructor(t){if(super(t),t.type!==oe||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=/* @__PURE__ */new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const t=!!e[n];t===this.st.has(n)||this.nt?.has(n)||(t?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return Y}});function An(t){const e=t.attributes.brightness;return e&&"on"===t.state?`brightness(${(e+245)/5}%)`:""}function Cn(t){const e=Math.max(1e3,Math.min(4e4,t))/100;let i,n,s;return e<=66?(i=255,n=Math.min(255,Math.max(0,99.4708025861*Math.log(e)-161.1195681661)),s=e<=19?0:Math.min(255,Math.max(0,138.5177312231*Math.log(e-10)-305.0447927307))):(i=Math.min(255,Math.max(0,329.698727446*(e-60)**-.1332047592)),n=Math.min(255,Math.max(0,288.1221695283*(e-60)**-.0755148492)),s=255),[Math.round(i),Math.round(n),Math.round(s)]}function kn(t){if("on"!==t.state)return;const e=t.attributes.rgb_color;if(e)return e;const i=t.attributes.color_temp_kelvin;if("number"==typeof i)return Cn(i);const n=t.attributes.color_temp;if("number"==typeof n&&n>0)return Cn(Math.round(1e6/n));const s=t.attributes.hs_color;return s?function(t,e,i){const n=e/100,s=i/100,a=(1-Math.abs(2*s-1))*n,r=t/60,o=a*(1-Math.abs(r%2-1));let l=0,c=0,h=0;r>=0&&r<1?(l=a,c=o):r<2?(l=o,c=a):r<3?(c=a,h=o):r<4?(c=o,h=a):r<5?(l=o,h=a):(l=a,h=o);const d=s-a/2;return[Math.round(255*(l+d)),Math.round(255*(c+d)),Math.round(255*(h+d))]}(s[0],s[1],50):void 0}ie();var Sn={tap:"toggle",hold:"more-info",double_tap:"none"},zn={tap:"tap_action",hold:"hold_action",double_tap:"double_tap_action"};function En(t,e,i,n){const s=i[zn[n]],a=s?.action??Sn[n];if("none"===a)return;const r=s?.entity??i.entity;if(r)switch(a){case"toggle":return void e.callService("homeassistant","toggle",{entity_id:r});case"more-info":return void Jt(t,"hass-more-info",{entityId:r});case"navigate":return void(s?.navigation_path&&Jt(t,"hass-navigate",{navigation_path:s.navigation_path}));case"url":return void(s?.url_path&&window.open(s.url_path));case"call-service":if(s?.service){const[t,i]=s.service.split(".",2);e.callService(t,i,s.service_data,s.target)}return;default:return}}var Pn,Tn,In,On,qn="nvision-light-glow-stack";var Ln,Rn,Fn=ht(()=>{Pn="nvision-light-card",Tn="nvision-light-card-editor",In=.72,On=.62}),Nn=/* @__PURE__ */dt({NvisionLightCardEditor:()=>Rn}),jn=ht(()=>{At(),Ut(),ie(),ne(),Fn(),Xt(),Ln=[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"glow_size",required:!0,default:165,selector:{number:{min:20,max:300,step:5,unit_of_measurement:"%"}}},{name:"glow_intensity",required:!0,default:In,selector:{number:{min:0,max:1,step:.05}}}]},{name:"interactions",type:"expandable",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"hold_action",selector:{ui_action:{default_action:"more-info"}}},{name:"",type:"optional_actions",flatten:!0,schema:[{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}]}],Rn=class extends Kt{constructor(...t){super(...t),this._computeLabel=t=>{if(this.hass)return"glow_size"===t.name?"Glow size":"glow_intensity"===t.name?"Glow intensity":"interactions"===t.name?"Interactions":"hold_action"===t.name||"double_tap_action"===t.name?`${this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`:this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}setConfig(t){this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:In,...t}}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ln}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:Q}_valueChanged(t){Jt(this,"config-changed",{config:t.detail.value})}},Zt([zt()],Rn.prototype,"_config",void 0),Rn=Zt([yt(Tn)],Rn)});At(),Ut(),ie(),Fn(),Xt(),Bt({type:Pn,name:"Nvision Light",description:"Light control with ambient color glow"}),function(t){if("undefined"==typeof document||document.getElementById(qn))return;const e=document.createElement("style");e.id=qn,e.textContent=`\n    hui-card:has(${t}),\n    .card:has(${t}) {\n      position: relative;\n      z-index: 0;\n      overflow: visible;\n    }\n\n    hui-card:not(:has(${t})),\n    .card:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section:has(${t}) {\n      position: relative;\n      z-index: 0;\n    }\n\n    section:not(:has(${t})) {\n      position: relative;\n      z-index: 1;\n    }\n\n    section .meta {\n      position: relative;\n      z-index: 2;\n    }\n\n    .preview:has(${t}) {\n      overflow: visible;\n    }\n  `,document.head.appendChild(e)}(Pn);var Un=class extends _t{constructor(...t){super(...t),this._holdTriggered=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(jn(),Nn)),document.createElement(Tn)}static getStubConfig(t,e,i){const n=e.find(t=>t.startsWith("light."))||i.find(t=>t.startsWith("light."))||Object.keys(t.states).find(t=>t.startsWith("light."))||e[0]||i[0]||"";return{type:`custom:${Pn}`,entity:n,glow_size:165,glow_intensity:In}}setConfig(t){if(!t.entity||"light"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the light domain");this._config={tap_action:{action:"toggle"},hold_action:{action:"more-info"},glow_size:165,glow_intensity:In,...t}}getCardSize(){return 5}getGridOptions(){return{columns:6,rows:5,min_rows:3}}render(){if(!this._config||!this.hass)return Q;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;if(!t)return W`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=Math.round((t.attributes.brightness||0)/255*100),i="on"===t.state,n="unavailable"===t.state||"unknown"===t.state,s=function(t){const e=t.attributes.supported_features;if("number"==typeof e&&1&e)return!0;const i=t.attributes.supported_color_modes;return Boolean(i?.some(t=>"onoff"!==t))}(t),a=function(t){const e=kn(t);return e?`rgb(${e.join(", ")})`:"on"===t.state?"var(--state-light-active-color, var(--state-active-color, #ffb74d))":"transparent"}(t),r=function(t){if("on"!==t.state)return 0;const e=t.attributes.brightness;return"number"!=typeof e?1:Math.max(0,Math.min(1,e/255))}(t),o=this._config.glow_size??165,l=(this._config.glow_intensity??.72)*r,c=o*On,h=this._config.name||t.attributes.friendly_name||this._config.entity,d={filter:An(t),color:i&&t.attributes.rgb_color?`rgb(${t.attributes.rgb_color.join(",")})`:""},u={"--bulb-color":a,"--nv-glow-size":`${o}%`,"--nv-glow-intensity":String(l),"--nv-glow-spread":`${c}px`};return W`
      <div
        class=${Mn({stage:!0,"state-on":i,"state-off":!i})}
        style=${ge(u)}
      >
        <div class="glow-backdrop" aria-hidden="true"></div>
        <div class="glow-ambient" aria-hidden="true"></div>

        <ha-card class=${Mn({"state-on":i,"state-off":!i})}>
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
                class=${Mn({"light-button":!0,"state-on":i,"state-unavailable":n})}
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
    `}_handleMoreInfo(){this._config?.entity&&Jt(this,"hass-more-info",{entityId:this._config.entity})}_handleTap(t){if(this._holdTriggered)return this._holdTriggered=!1,void t.preventDefault();this.hass&&this._config&&En(this,this.hass,this._config,"tap")}_handleDoubleTap(t){t.preventDefault(),this.hass&&this._config&&En(this,this.hass,this._config,"double_tap")}_handleHoldStart(){window.clearTimeout(this._holdTimer),this._holdTriggered=!1,this._holdTimer=window.setTimeout(()=>{this._holdTriggered=!0,this.hass&&this._config&&En(this,this.hass,this._config,"hold")},500)}_handleHoldEnd(){window.clearTimeout(this._holdTimer)}_dragBrightness(t){const e=this.shadowRoot?.querySelector(".brightness");e&&(e.innerHTML=`${t.detail.value}<span class="unit"> %</span>`,e.classList.add("show_brightness")),window.clearTimeout(this._brightnessTimeout),this._brightnessTimeout=window.setTimeout(()=>{e?.classList.remove("show_brightness")},500)}_setBrightness(t){this.hass&&this._config?.entity&&this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:t.detail.value})}static{this.styles=r`
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
  `}};Zt([kt({attribute:!1})],Un.prototype,"hass",void 0),Zt([zt()],Un.prototype,"_config",void 0),Un=Zt([yt(Pn)],Un),console.info("%c nvision 0.1.0 ","color: var(--primary-color, #03a9f4); font-weight: 700;");