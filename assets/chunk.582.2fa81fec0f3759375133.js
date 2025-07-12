var __ember_auto_import__;(()=>{var e,t={14:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{IS_DESCRIPTOR:()=>r,createDescriptor:()=>d,isDescriptor:()=>i,lookupDescriptorData:()=>a,registerDescriptorData:()=>s,resolveDOMElement:()=>l,resolveDOMElements:()=>m,resolveDescription:()=>c})
const r="__dom_element_descriptor_is_descriptor__"
function i(e){return Boolean("object"==typeof e&&e&&r in e)}function n(){const e=window
return e.domElementDescriptorsRegistry=e.domElementDescriptorsRegistry||new WeakMap,e.domElementDescriptorsRegistry}function s(e,t){t?n().set(e,t):n().delete(e)}function a(e){return n().get(e)||null}function l(e){let t=i(e)?a(e):e
if(!t)return null
if(void 0!==t.element)return t.element
for(let o of t.elements||[])return o
return null}function m(e){let t=i(e)?a(e):e
if(!t)return[]
if(t.elements)return Array.from(t.elements)
{let e=t.element
return e?[e]:[]}}function c(e){let t=i(e)?a(e):e
return t?.description}function d(e){let t={[r]:!0}
return s(t,e),t}},21:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>p})
const r=require("@ember/array")
var i=o(471)
const n=require("@ember/object/computed")
var s=o(735),a=o.n(s)
const l=require("@ember/test-waiters"),m=require("rsvp")
var c,d=o(979)
class u{constructor(e,t,o,r={}){this._service=e,this._componentClass=t,this._data=o,this._options={className:"",onAnimationModalOutEnd:void 0,...r},this._result=void 0,this._deferred=(0,m.defer)(),this._deferredOutAnimation=void 0,this._componentInstance=void 0}get result(){return this._result}get isClosing(){return Boolean(this._deferredOutAnimation)}close(e){this._componentInstance&&this._componentInstance.closeModal(e)}then(e,t){return this._deferred.promise.then(e,t)}_destroy(){this._componentInstance&&this._componentInstance.destroyModal()}_resolve(e){this._deferredOutAnimation||((0,i.set)(this,"_deferredOutAnimation",(0,m.defer)()),this._options.onAnimationModalOutEnd&&this._deferredOutAnimation.promise.then(()=>this._options.onAnimationModalOutEnd()).catch(()=>{}),this._result=e,this._deferred.resolve(e),(0,l.waitForPromise)(this._deferredOutAnimation.promise))}_remove(){this._service._stack.removeObject(this),0===this._service._stack.length&&this._service._onLastModalRemoved(),this._componentInstance=void 0,this._deferredOutAnimation&&this._deferredOutAnimation.resolve()}}c=u,(0,d.n)(c.prototype,"isClosing",[(0,i.computed)("_deferredOutAnimation")])
var p=a().extend({count:(0,i.computed)("_stack.@each.isClosing",function(){return this._stack.filter(e=>!e.isClosing).length}),top:(0,n.alias)("_stack.lastObject"),focusTrapOptions:void 0,init(){this._super(...arguments),this._stack=(0,r.A)([]),null!==this.focusTrapOptions&&(this.focusTrapOptions={...this.focusTrapOptions??{},clickOutsideDeactivates:this.focusTrapOptions?.clickOutsideDeactivates??!0})},willDestroy(){this._onLastModalRemoved(),this._onModalAnimationEnd(),this._destroyModals(),this._super(...arguments)},open(e,t,o){let r=new u(this,e,t,o)
return this._stack.pushObject(r),1===this._stack.length&&this._onFirstModalAdded(),r},_destroyModals(){this._stack.forEach(e=>{e._destroy()})},_onFirstModalAdded(){document.body.classList.add("epm-scrolling-disabled")},_onLastModalRemoved(){document.body.classList.remove("epm-scrolling-disabled")},_onModalAnimationStart(){document.body.classList.add("epm-animating")},_onModalAnimationEnd(){document.body.classList.remove("epm-animating")}})},63:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>d})
var r,i=o(735),n=o(855),s=o.n(n),a=o(979),l=o(663),m=(0,o(465).createTemplateFactory)({id:"GmS2yzEb",block:'[[[42,[28,[37,1],[[28,[37,1],[[30,0,["modals","_stack"]]],null]],null],null,[[[1,"  "],[10,0],[15,0,[29,["epm-backdrop ",[52,[30,1,["isClosing"]],"epm-out"]]]],[14,"tabindex","-1"],[14,"role","presentation"],[14,"aria-hidden","true"],[15,"data-test-epm-backdrop",[29,[[30,2]]]],[12],[13],[1,"\\n  "],[10,0],[14,0,"epm-modal-container"],[12],[1,"\\n    "],[8,[39,3],[[16,"data-test-epm-modal",[29,[[30,2]]]]],[["@modal"],[[30,1]]],null],[1,"\\n  "],[13],[1,"\\n"]],[1,2]],null]],["modal","index"],false,["each","-track-array","if","epm-modal"]]',moduleName:"/home/runner/work/ember-promise-modals/ember-promise-modals/packages/ember-promise-modals/dist/components/epm-modal-container.js",isStrictMode:!1}),c=new WeakMap
class d extends(s()){constructor(...e){var t,o
super(...e),t=c,o=void(0,a.i)(this,"modals"),function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(this,t),t.set(this,o)}}r=d,(0,a.g)(r.prototype,"modals",[i.inject]),(0,l.setComponentTemplate)(m,d)},83:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>b})
var r=o(471),i=o(735),n=o(855),s=o.n(n)
const a=require("@glimmer/tracking")
var l,m=o(922),c=o(146),d=o(979),u=o(663)
function p(e,t,o){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var o=t.call(e,"string")
if("object"!=typeof o)return o
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function h(e,t,o){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.set(e,o)}var _=(0,o(465).createTemplateFactory)({id:"WTdSLnyg",block:'[[[11,0],[16,0,[29,["epm-modal ",[30,0,["optionsClassName"]]," ",[30,0,["animatingClass"]]]]],[4,[30,0,["setup"]],null,null],[12],[1,"\\n"],[44,[[50,[28,[37,2],[[30,1,["_componentClass"]]],null],0,null,null]],[[[1,"    "],[8,[30,2],null,[["@data","@close"],[[30,1,["_data"]],[30,0,["close"]]]],null],[1,"\\n"]],[2]]],[13]],["@modal","ModalComponent"],false,["let","component","ensure-safe-component"]]',moduleName:"/home/runner/work/ember-promise-modals/ember-promise-modals/packages/ember-promise-modals/dist/components/epm-modal.js",isStrictMode:!1}),f=new WeakMap,v=new WeakMap
class b extends(s()){get optionsClassName(){return this.args.modal._options.className}get focusTrapOptions(){let{focusTrapOptions:e}=this.modals,{focusTrapOptions:t}=this.args.modal._options
return void 0!==t?t:e}constructor(){super(...arguments),h(this,f,void(0,d.i)(this,"modals")),p(this,"element",null),p(this,"outAnimationClass","epm-out"),p(this,"_animationEnd",null),h(this,v,void(0,d.i)(this,"animatingClass")),p(this,"setup",(0,m.W)(e=>(this.element=e,this._addFocusTrap(),this._addAnimationListeners(),this.modals._onModalAnimationStart(),()=>{this.destroyModal()}))),this.args.modal._componentInstance=this}_addFocusTrap(){if(!this.focusTrapOptions)return
let e={...this.focusTrapOptions,fallbackFocus:this.element,onDeactivate:(...e)=>{this.focusTrapOptions.onDeactivate?.(...e),this.isDestroyed||this.isDestroying||this.closeModal()}}
this.focusTrap=(0,c.K)(this.element,e),this.focusTrap.activate()}_removeFocusTrap(e=this.focusTrapOptions?.onDeactivate){this.focusTrap&&this.focusTrap.deactivate({onDeactivate:e})}_addAnimationListeners(){this._animationEnd=({target:e,animationName:t})=>{e===this.element&&(this.modals._onModalAnimationEnd(),"-out"===t.substring(t.length-4)&&this.args.modal._remove())},this.element&&this.element.addEventListener("animationend",this._animationEnd)}_removeAnimationListeners(){this._animationEnd&&(this.element&&this.element.removeEventListener("animationend",this._animationEnd),this._animationEnd=null)}destroyModal(){this._removeFocusTrap(null),this._removeAnimationListeners(),this.args.modal._remove()}closeModal(e){""===this.animatingClass&&(this.modals._onModalAnimationStart(),this.animatingClass=this.outAnimationClass,this.args.modal._resolve(e))}close(e){this.closeModal(e),this._removeFocusTrap()}}l=b,(0,d.g)(l.prototype,"modals",[i.inject]),(0,d.g)(l.prototype,"animatingClass",[a.tracked],function(){return""}),(0,d.n)(l.prototype,"close",[r.action]),(0,u.setComponentTemplate)(_,b)},114:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>m})
const r=require("@ember/component/helper")
var i,n=o.n(r),s=o(735),a=o(979),l=new WeakMap
class m extends(n()){constructor(...e){var t,o
super(...e),t=l,o=void(0,a.i)(this,"modals"),function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(this,t),t.set(this,o),function(e,t){(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var o=t.call(e,"string")
if("object"!=typeof o)return o
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:null,enumerable:!0,configurable:!0,writable:!0}):e[t]=null}(this,"modal")}compute([e,t,o],{close:r}){this.showModal(e,t,o,r)}async showModal(e,t,o,r){this.modal=this.modals.open(e,t,o)
let i=await this.modal
this.modal=null,r&&r(i)}hideModal(){this.modal?.close()}willDestroy(){this.hideModal(),super.willDestroy(...arguments)}}i=m,(0,a.g)(i.prototype,"modals",[s.inject])},130:e=>{"use strict"
e.exports=require("@ember/destroyable")},294:e=>{"use strict"
e.exports=require("@ember/application")},315:(e,t,o)=>{e.exports=function(){var e=_eai_d,t=_eai_r
function r(e){return e&&e.__esModule?e:Object.assign({default:e},e)}window.emberAutoImportDynamic=function(e){return 1===arguments.length?t("_eai_dyn_"+e):t("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return t("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},e("ember-promise-modals/components/epm-modal",["@ember/object","@ember/service","@glimmer/component","@ember/application","@ember/modifier","@ember/destroyable","@ember/component","@ember/template-factory"],function(){return r(o(83))}),e("ember-promise-modals/components/epm-modal-container",["@ember/service","@glimmer/component","@ember/component","@ember/template-factory"],function(){return r(o(63))}),e("ember-promise-modals/helpers/open-modal",["@ember/service"],function(){return r(o(114))}),e("ember-promise-modals/services/modals",["@ember/object","@ember/service"],function(){return r(o(21))})}()},377:e=>{"use strict"
e.exports=require("@ember/modifier")},465:e=>{"use strict"
e.exports=require("@ember/template-factory")},471:e=>{"use strict"
e.exports=require("@ember/object")},663:e=>{"use strict"
e.exports=require("@ember/component")},735:e=>{"use strict"
e.exports=require("@ember/service")},855:e=>{"use strict"
e.exports=require("@glimmer/component")},953:(e,t,o)=>{var r,i
e.exports=(r=_eai_d,i=_eai_r,window.emberAutoImportDynamic=function(e){return 1===arguments.length?i("_eai_dyn_"+e):i("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return i("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},r("dom-element-descriptors",[],function(){return(e=o(14))&&e.__esModule?e:Object.assign({default:e},e)
var e}),void o(315))},990:function(e,t){window._eai_r=require,window._eai_d=define}},o={}
function r(e){var i=o[e]
if(void 0!==i)return i.exports
var n=o[e]={exports:{}}
return t[e].call(n.exports,n,n.exports,r),n.exports}r.m=t,e=[],r.O=(t,o,i,n)=>{if(!o){var s=1/0
for(c=0;c<e.length;c++){for(var[o,i,n]=e[c],a=!0,l=0;l<o.length;l++)(!1&n||s>=n)&&Object.keys(r.O).every(e=>r.O[e](o[l]))?o.splice(l--,1):(a=!1,n<s&&(s=n))
if(a){e.splice(c--,1)
var m=i()
void 0!==m&&(t=m)}}return t}n=n||0
for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1]
e[c]=[o,i,n]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e
return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={524:0,582:0}
r.O.j=t=>0===e[t]
var t=(t,o)=>{var i,n,[s,a,l]=o,m=0
if(s.some(t=>0!==e[t])){for(i in a)r.o(a,i)&&(r.m[i]=a[i])
if(l)var c=l(r)}for(t&&t(o);m<s.length;m++)n=s[m],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0
return r.O(c)},o=globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]
o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})(),r.O(void 0,[249],()=>r(990))
var i=r.O(void 0,[249],()=>r(953))
i=r.O(i),__ember_auto_import__=i})()
