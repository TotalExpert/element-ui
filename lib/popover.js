module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(233);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/* globals __VUE_SSR_CONTEXT__ */

	// this module is a runtime utility for cleaner component module output and will
	// be included in the final webpack user bundle

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  injectStyles,
	  scopeId,
	  moduleIdentifier /* server only */
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  var hook
	  if (moduleIdentifier) { // server build
	    hook = function (context) {
	      // 2.3 injection
	      context = context || (this.$vnode && this.$vnode.ssrContext)
	      // 2.2 with runInNewContext: true
	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__
	      }
	      // inject component styles
	      if (injectStyles) {
	        injectStyles.call(this, context)
	      }
	      // register component module identifier for async chunk inferrence
	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier)
	      }
	    }
	    // used by ssr in case component is cached and beforeCreate
	    // never gets called
	    options._ssrRegister = hook
	  } else if (injectStyles) {
	    hook = injectStyles
	  }

	  if (hook) {
	    // inject component registration as beforeCreate hook
	    var existing = options.beforeCreate
	    options.beforeCreate = existing
	      ? [].concat(existing, hook)
	      : [hook]
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/utils/vue-popper");

/***/ },

/***/ 55:
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },

/***/ 123:
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/utils/dom");

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _main = __webpack_require__(234);

	var _main2 = _interopRequireDefault(_main);

	var _directive = __webpack_require__(237);

	var _directive2 = _interopRequireDefault(_directive);

	var _vue = __webpack_require__(55);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.directive('popover', _directive2.default);

	/* istanbul ignore next */
	_main2.default.install = function (Vue) {
	  Vue.directive('popover', _directive2.default);
	  Vue.component(_main2.default.name, _main2.default);
	};
	_main2.default.directive = _directive2.default;

	exports.default = _main2.default;

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(235),
	  /* template */
	  __webpack_require__(236),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vuePopper = __webpack_require__(13);

	var _vuePopper2 = _interopRequireDefault(_vuePopper);

	var _dom = __webpack_require__(123);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'ElPopover',

	  mixins: [_vuePopper2.default],

	  props: {
	    trigger: {
	      type: String,
	      default: 'click',
	      validator: function validator(value) {
	        return ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1;
	      }
	    },
	    openDelay: {
	      type: Number,
	      default: 0
	    },
	    title: String,
	    disabled: Boolean,
	    content: String,
	    reference: {},
	    popperClass: String,
	    width: {},
	    visibleArrow: {
	      default: true
	    },
	    transition: {
	      type: String,
	      default: 'fade-in-linear'
	    }
	  },

	  watch: {
	    showPopper: function showPopper(newVal, oldVal) {
	      newVal ? this.$emit('show') : this.$emit('hide');
	    },
	    trigger: function trigger() {
	      this.clearTriggerListeners();
	      this.setTriggerListeners();
	    }
	  },

	  mounted: function mounted() {
	    var reference = this.reference || this.$refs.reference;

	    if (!reference && this.$slots.reference && this.$slots.reference[0]) {
	      this.referenceElm = this.$slots.reference[0].elm;
	    }

	    this.setTriggerListeners();
	  },


	  methods: {
	    setTriggerListeners: function setTriggerListeners() {
	      var reference = this.reference || this.$refs.reference || this.referenceElm;
	      var popper = this.popper || this.$refs.popper;

	      if (this.trigger === 'click') {
	        (0, _dom.on)(reference, 'click', this.doToggle);
	        (0, _dom.on)(document, 'click', this.handleDocumentClick);
	      } else if (this.trigger === 'hover') {
	        (0, _dom.on)(reference, 'mouseenter', this.handleMouseEnter);
	        (0, _dom.on)(popper, 'mouseenter', this.handleMouseEnter);
	        (0, _dom.on)(reference, 'mouseleave', this.handleMouseLeave);
	        (0, _dom.on)(popper, 'mouseleave', this.handleMouseLeave);
	      } else if (this.trigger === 'focus') {
	        var found = false;

	        if ([].slice.call(reference.children).length) {
	          var children = reference.childNodes;
	          var len = children.length;
	          for (var i = 0; i < len; i++) {
	            if (children[i].nodeName === 'INPUT' || children[i].nodeName === 'TEXTAREA') {
	              (0, _dom.on)(children[i], 'focus', this.doShow);
	              (0, _dom.on)(children[i], 'blur', this.doClose);
	              found = true;
	              break;
	            }
	          }
	        }
	        if (found) return;
	        if (reference.nodeName === 'INPUT' || reference.nodeName === 'TEXTAREA') {
	          (0, _dom.on)(reference, 'focus', this.doShow);
	          (0, _dom.on)(reference, 'blur', this.doClose);
	        } else {
	          (0, _dom.on)(reference, 'mousedown', this.doShow);
	          (0, _dom.on)(reference, 'mouseup', this.doClose);
	        }
	      }
	    },
	    clearTriggerListeners: function clearTriggerListeners() {
	      var reference = this.reference || this.$refs.reference || this.referenceElm;
	      var popper = this.popper || this.$refs.popper;

	      (0, _dom.off)(reference, 'click', this.doToggle);
	      (0, _dom.off)(document, 'click', this.handleDocumentClick);
	      (0, _dom.off)(reference, 'mouseenter', this.handleMouseEnter);
	      (0, _dom.off)(popper, 'mouseenter', this.handleMouseEnter);
	      (0, _dom.off)(reference, 'mouseleave', this.handleMouseLeave);
	      (0, _dom.off)(popper, 'mouseleave', this.handleMouseLeave);
	      (0, _dom.off)(reference, 'mouseup', this.doClose);
	      (0, _dom.off)(reference, 'mousedown', this.doShow);
	      (0, _dom.off)(reference, 'focus', this.doShow);
	      (0, _dom.off)(reference, 'blur', this.doClose);
	    },
	    doToggle: function doToggle() {
	      this.showPopper = !this.showPopper;
	    },
	    doShow: function doShow() {
	      this.showPopper = true;
	    },
	    doClose: function doClose() {
	      this.showPopper = false;
	    },
	    handleMouseEnter: function handleMouseEnter() {
	      var _this = this;

	      clearTimeout(this._timer);
	      if (this.openDelay) {
	        this._timer = setTimeout(function () {
	          _this.doShow();
	        }, this.openDelay);
	      } else {
	        this.doShow();
	      }
	    },
	    handleMouseLeave: function handleMouseLeave() {
	      var _this2 = this;

	      clearTimeout(this._timer);
	      this._timer = setTimeout(function () {
	        _this2.doClose();
	      }, 200);
	    },
	    handleDocumentClick: function handleDocumentClick(e) {
	      var reference = this.reference || this.$refs.reference || this.referenceElm;
	      var popper = this.popper || this.$refs.popper;

	      if (!this.$el || !reference || this.$el.contains(e.target) || reference.contains(e.target) || !popper || popper.contains(e.target)) return;
	      this.doClose();
	    }
	  },
	  destroyed: function destroyed() {
	    this.clearTriggerListeners();
	  }
	};

/***/ },

/***/ 236:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', [_c('transition', {
	    attrs: {
	      "name": _vm.transition
	    },
	    on: {
	      "after-leave": _vm.doDestroy
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.disabled && _vm.showPopper),
	      expression: "!disabled && showPopper"
	    }],
	    ref: "popper",
	    staticClass: "el-popover",
	    class: [_vm.popperClass],
	    style: ({
	      width: _vm.width + 'px'
	    })
	  }, [(_vm.title) ? _c('div', {
	    staticClass: "el-popover__title",
	    domProps: {
	      "textContent": _vm._s(_vm.title)
	    }
	  }) : _vm._e(), _vm._t("default", [_vm._v(_vm._s(_vm.content))])], 2)]), _vm._t("reference")], 2)
	},staticRenderFns: []}

/***/ },

/***/ 237:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = {
	  bind: function bind(el, binding, vnode) {
	    var refComponent = vnode.context.$refs[binding.arg];

	    if (refComponent) {
	      refComponent.$refs.reference = el;
	    }
	  }
	};

/***/ }

/******/ });