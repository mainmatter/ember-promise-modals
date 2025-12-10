var __ember_auto_import__;(()=>{var e,t={32:e=>{"use strict"
e.exports=require("ember-tracked-storage-polyfill")},130:e=>{"use strict"
e.exports=require("@ember/destroyable")},294:e=>{"use strict"
e.exports=require("@ember/application")},377:e=>{"use strict"
e.exports=require("@ember/modifier")},465:e=>{"use strict"
e.exports=require("@ember/template-factory")},466:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>b})
const i=require("@ember/object")
var r,n=o(735),s=o(855),a=o.n(s),l=o(473),m=o(617),d=o(260),c=o(410),u=o(663)
function p(e,t,o){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var o=t.call(e,"string")
if("object"!=typeof o)return o
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function h(e,t,o){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.set(e,o)}var _=(0,o(465).createTemplateFactory)({id:"ogQtcyQT",block:'[[[11,0],[16,0,[29,["epm-modal ",[30,0,["optionsClassName"]]," ",[30,0,["animatingClass"]]]]],[4,[30,0,["setup"]],null,null],[12],[1,"\\n"],[44,[[50,[28,[37,3],[[30,1,["_componentClass"]]],null],0,null,null]],[[[1,"    "],[8,[30,2],null,[["@data","@close"],[[30,1,["_data"]],[30,0,["close"]]]],null],[1,"\\n"]],[2]]],[13]],["@modal","ModalComponent"],["div","let","component","ensure-safe-component"]]',moduleName:"/home/runner/work/ember-promise-modals/ember-promise-modals/packages/ember-promise-modals/dist/components/epm-modal.js",isStrictMode:!1}),f=new WeakMap,v=new WeakMap
class b extends(a()){get optionsClassName(){return this.args.modal._options.className}get focusTrapOptions(){let{focusTrapOptions:e}=this.modals,{focusTrapOptions:t}=this.args.modal._options
return void 0!==t?t:e}constructor(){super(...arguments),h(this,f,void(0,c.i)(this,"modals")),p(this,"element",null),p(this,"outAnimationClass","epm-out"),p(this,"_animationEnd",null),h(this,v,void(0,c.i)(this,"animatingClass")),p(this,"setup",(0,m.W)(e=>(this.element=e,this._addFocusTrap(),this._addAnimationListeners(),this.modals._onModalAnimationStart(),()=>{this.destroyModal()}))),this.args.modal._componentInstance=this}_addFocusTrap(){if(!this.focusTrapOptions)return
let e={...this.focusTrapOptions,fallbackFocus:this.element,onDeactivate:(...e)=>{this.focusTrapOptions.onDeactivate?.(...e),this.isDestroyed||this.isDestroying||this.closeModal()}}
this.focusTrap=(0,d.K)(this.element,e),this.focusTrap.activate()}_removeFocusTrap(e=this.focusTrapOptions?.onDeactivate){this.focusTrap&&this.focusTrap.deactivate({onDeactivate:e})}_addAnimationListeners(){this._animationEnd=({target:e,animationName:t})=>{e===this.element&&(this.modals._onModalAnimationEnd(),"-out"===t.substring(t.length-4)&&this.args.modal._remove())},this.element&&this.element.addEventListener("animationend",this._animationEnd)}_removeAnimationListeners(){this._animationEnd&&(this.element&&this.element.removeEventListener("animationend",this._animationEnd),this._animationEnd=null)}destroyModal(){this._removeFocusTrap(null),this._removeAnimationListeners(),this.args.modal._remove()}closeModal(e){""===this.animatingClass&&(this.modals._onModalAnimationStart(),this.animatingClass=this.outAnimationClass,this.args.modal._resolve(e))}close(e){this.closeModal(e),this._removeFocusTrap()}}r=b,(0,c.g)(r.prototype,"modals",[n.inject]),(0,c.g)(r.prototype,"animatingClass",[l.tracked],function(){return""}),(0,c.n)(r.prototype,"close",[i.action]),(0,u.setComponentTemplate)(_,b)},473:e=>{"use strict"
e.exports=require("@glimmer/tracking")},537:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>c})
var i,r=o(735),n=o(855),s=o.n(n),a=o(410),l=o(663),m=(0,o(465).createTemplateFactory)({id:"QdHRsrV1",block:'[[[42,[28,[37,1],[[28,[37,1],[[30,0,["modals","_stack"]]],null]],null],null,[[[1,"  "],[10,0],[15,0,[29,["epm-backdrop ",[52,[30,1,["isClosing"]],"epm-out"]]]],[14,"tabindex","-1"],[14,"role","presentation"],[14,"aria-hidden","true"],[15,"data-test-epm-backdrop",[29,[[30,2]]]],[12],[13],[1,"\\n  "],[10,0],[14,0,"epm-modal-container"],[12],[1,"\\n    "],[8,[39,4],[[16,"data-test-epm-modal",[29,[[30,2]]]]],[["@modal"],[[30,1]]],null],[1,"\\n  "],[13],[1,"\\n"]],[1,2]],null]],["modal","index"],["each","-track-array","div","if","epm-modal"]]',moduleName:"/home/runner/work/ember-promise-modals/ember-promise-modals/packages/ember-promise-modals/dist/components/epm-modal-container.js",isStrictMode:!1}),d=new WeakMap
class c extends(s()){constructor(...e){var t,o
super(...e),t=d,o=void(0,a.i)(this,"modals"),function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(this,t),t.set(this,o)}}i=c,(0,a.g)(i.prototype,"modals",[r.inject]),(0,l.setComponentTemplate)(m,c)},603:e=>{"use strict"
e.exports=require("@ember/debug")},621:(e,t,o)=>{e.exports=function(){_eai_d
var e=_eai_r
window.emberAutoImportDynamic=function(t){return 1===arguments.length?e("_eai_dyn_"+t):e("_eai_dynt_"+t)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(t){return e("_eai_sync_"+t)(Array.prototype.slice.call(arguments,1))},o(751)}()},628:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>h})
var i=o(735),r=o.n(i),n=o(34)
const s=require("@ember/test-waiters")
var a=o(473)
const l=require("rsvp")
var m,d=o(410),c=new WeakMap
class u{constructor(e,t,o,i={}){var r,n
r=c,n=void(0,d.i)(this,"_deferredOutAnimation"),function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(this,r),r.set(this,n),this._service=e,this._componentClass=t,this._data=o,this._options={className:"",onAnimationModalOutEnd:void 0,...i},this._result=void 0,this._deferred=(0,l.defer)(),this._componentInstance=void 0}get result(){return this._result}get isClosing(){return Boolean(this._deferredOutAnimation)}close(e){this._componentInstance&&this._componentInstance.closeModal(e)}then(e,t){return this._deferred.promise.then(e,t)}_destroy(){this._componentInstance&&this._componentInstance.destroyModal()}_resolve(e){this._deferredOutAnimation||(this._deferredOutAnimation=(0,l.defer)(),this._options.onAnimationModalOutEnd&&this._deferredOutAnimation.promise.then(()=>this._options.onAnimationModalOutEnd()).catch(()=>{}),this._result=e,this._deferred.resolve(e),(0,s.waitForPromise)(this._deferredOutAnimation.promise))}_remove(){const e=this._service._stack.indexOf(this);-1!==e&&this._service._stack.splice(e,1),0===this._service._stack.length&&this._service._onLastModalRemoved(),this._componentInstance=void 0,this._deferredOutAnimation&&this._deferredOutAnimation.resolve()}}function p(e,t,o){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var o=t.call(e,"string")
if("object"!=typeof o)return o
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}m=u,(0,d.g)(m.prototype,"_deferredOutAnimation",[a.tracked],function(){})
class h extends(r()){get count(){return this._stack.filter(e=>!e.isClosing).length}get top(){return this._stack.at(-1)}constructor(){super(...arguments),p(this,"_stack",new n.I0([])),p(this,"focusTrapOptions",void 0),null!==this.focusTrapOptions&&(this.focusTrapOptions={...this.focusTrapOptions??{},clickOutsideDeactivates:this.focusTrapOptions?.clickOutsideDeactivates??!0})}willDestroy(){this._onLastModalRemoved(),this._onModalAnimationEnd(),this._destroyModals(),super.willDestroy(...arguments)}open(e,t,o){let i=new u(this,e,t,o)
return this._stack.push(i),1===this._stack.length&&this._onFirstModalAdded(),i}_destroyModals(){for(let e of this._stack)e._destroy()}_onFirstModalAdded(){document.body.classList.add("epm-scrolling-disabled")}_onLastModalRemoved(){document.body.classList.remove("epm-scrolling-disabled")}_onModalAnimationStart(){document.body.classList.add("epm-animating")}_onModalAnimationEnd(){document.body.classList.remove("epm-animating")}}},663:e=>{"use strict"
e.exports=require("@ember/component")},735:e=>{"use strict"
e.exports=require("@ember/service")},751:(e,t,o)=>{e.exports=function(){var e=_eai_d,t=_eai_r
function i(e){return e&&e.__esModule?e:Object.assign({default:e},e)}window.emberAutoImportDynamic=function(e){return 1===arguments.length?t("_eai_dyn_"+e):t("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return t("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},e("ember-promise-modals/components/epm-modal",EAI_DISCOVERED_EXTERNALS("ember-promise-modals/components/epm-modal"),function(){return i(o(466))}),e("ember-promise-modals/components/epm-modal-container",EAI_DISCOVERED_EXTERNALS("ember-promise-modals/components/epm-modal-container"),function(){return i(o(537))}),e("ember-promise-modals/helpers/open-modal",EAI_DISCOVERED_EXTERNALS("ember-promise-modals/helpers/open-modal"),function(){return i(o(833))}),e("ember-promise-modals/services/modals",EAI_DISCOVERED_EXTERNALS("ember-promise-modals/services/modals"),function(){return i(o(628))}),e("ember-resolver",EAI_DISCOVERED_EXTERNALS("ember-resolver"),function(){return i(o(102))})}()},833:(e,t,o)=>{"use strict"
o.r(t),o.d(t,{default:()=>d})
const i=require("@ember/component/helper")
var r,n=o.n(i),s=o(735),a=o(410)
function l(e,t,o){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var o=t.call(e,"string")
if("object"!=typeof o)return o
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var m=new WeakMap
class d extends(n()){constructor(...e){var t,o
super(...e),t=m,o=void(0,a.i)(this,"modals"),function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(this,t),t.set(this,o),l(this,"modal",null),l(this,"once",!1)}compute([e,t,o],{close:i}){this.modal||this.once||(this.once=!0,this.showModal(e,t,o,i))}async showModal(e,t,o,i){this.modal=this.modals.open(e,t,o)
let r=await this.modal
this.modal=null,i?.(r)}hideModal(){this.modal?.close()}willDestroy(){this.hideModal(),super.willDestroy(...arguments)}}r=d,(0,a.g)(r.prototype,"modals",[s.inject])},855:e=>{"use strict"
e.exports=require("@glimmer/component")},874:function(e,t){window._eai_r=require,window._eai_d=define}},o={}
function i(e){var r=o[e]
if(void 0!==r)return r.exports
var n=o[e]={exports:{}}
return t[e].call(n.exports,n,n.exports,i),n.exports}i.m=t,e=[],i.O=(t,o,r,n)=>{if(!o){var s=1/0
for(d=0;d<e.length;d++){for(var[o,r,n]=e[d],a=!0,l=0;l<o.length;l++)(!1&n||s>=n)&&Object.keys(i.O).every(e=>i.O[e](o[l]))?o.splice(l--,1):(a=!1,n<s&&(s=n))
if(a){e.splice(d--,1)
var m=r()
void 0!==m&&(t=m)}}return t}n=n||0
for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1]
e[d]=[o,r,n]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e
return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={524:0,582:0}
i.O.j=t=>0===e[t]
var t=(t,o)=>{var r,n,[s,a,l]=o,m=0
if(s.some(t=>0!==e[t])){for(r in a)i.o(a,r)&&(i.m[r]=a[r])
if(l)var d=l(i)}for(t&&t(o);m<s.length;m++)n=s[m],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0
return i.O(d)},o=globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]
o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})(),i.O(void 0,[521],()=>i(874))
var r=i.O(void 0,[521],()=>i(621))
r=i.O(r),__ember_auto_import__=r})()
