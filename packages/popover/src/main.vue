<template>
  <span>
    <transition :name="transition" @after-leave="doDestroy">
      <div
        class="el-popover"
        :class="[popperClass]"
        ref="popper"
        v-show="!disabled && showPopper"
        :style="{ width: width + 'px' }">
        <div class="el-popover__title" v-if="title" v-text="title"></div>
        <slot>{{ content }}</slot>
      </div>
    </transition>
    <slot name="reference"></slot>
  </span>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper';
import { on, off } from 'element-ui/src/utils/dom';

export default {
  name: 'ElPopover',

  mixins: [Popper],

  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1
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
    showPopper(newVal, oldVal) {
      newVal ? this.$emit('show') : this.$emit('hide');
    },
    trigger() {
      this.clearTriggerListeners();
      this.setTriggerListeners();
    }
  },

  mounted() {
    const reference = this.reference || this.$refs.reference;

    if (!reference && this.$slots.reference && this.$slots.reference[0]) {
      this.referenceElm = this.$slots.reference[0].elm;
    }

    this.setTriggerListeners();
  },

  methods: {
    setTriggerListeners() {
      const reference = this.reference || this.$refs.reference || this.referenceElm;
      const popper = this.popper || this.$refs.popper;

      if (this.trigger === 'click') {
        on(reference, 'click', this.doToggle);
        on(document, 'click', this.handleDocumentClick);
      } else if (this.trigger === 'hover') {
        on(reference, 'mouseenter', this.handleMouseEnter);
        on(popper, 'mouseenter', this.handleMouseEnter);
        on(reference, 'mouseleave', this.handleMouseLeave);
        on(popper, 'mouseleave', this.handleMouseLeave);
      } else if (this.trigger === 'focus') {
        let found = false;

        if ([].slice.call(reference.children).length) {
          const children = reference.childNodes;
          const len = children.length;
          for (let i = 0; i < len; i++) {
            if (children[i].nodeName === 'INPUT' ||
              children[i].nodeName === 'TEXTAREA') {
              on(children[i], 'focus', this.doShow);
              on(children[i], 'blur', this.doClose);
              found = true;
              break;
            }
          }
        }
        if (found) return;
        if (reference.nodeName === 'INPUT' ||
          reference.nodeName === 'TEXTAREA') {
          on(reference, 'focus', this.doShow);
          on(reference, 'blur', this.doClose);
        } else {
          on(reference, 'mousedown', this.doShow);
          on(reference, 'mouseup', this.doClose);
        }
      }
    },
    clearTriggerListeners() {
      const reference = this.reference || this.$refs.reference || this.referenceElm;
      const popper = this.popper || this.$refs.popper;

      off(reference, 'click', this.doToggle);
      off(document, 'click', this.handleDocumentClick);
      off(reference, 'mouseenter', this.handleMouseEnter);
      off(popper, 'mouseenter', this.handleMouseEnter);
      off(reference, 'mouseleave', this.handleMouseLeave);
      off(popper, 'mouseleave', this.handleMouseLeave);
      off(reference, 'mouseup', this.doClose);
      off(reference, 'mousedown', this.doShow);
      off(reference, 'focus', this.doShow);
      off(reference, 'blur', this.doClose);
    },
    doToggle() {
      this.showPopper = !this.showPopper;
    },
    doShow() {
      this.showPopper = true;
    },
    doClose() {
      this.showPopper = false;
    },
    handleMouseEnter() {
      clearTimeout(this._timer);
      if (this.openDelay) {
        this._timer = setTimeout(() => {
          this.doShow();
        }, this.openDelay);
      } else {
        this.doShow();
      }
    },
    handleMouseLeave() {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.doClose();
      }, 200);
    },
    handleDocumentClick(e) {
      const reference = this.reference || this.$refs.reference || this.referenceElm;
      const popper = this.popper || this.$refs.popper;

      if (!this.$el ||
        !reference ||
        this.$el.contains(e.target) ||
        reference.contains(e.target) ||
        !popper ||
        popper.contains(e.target)) return;
      this.doClose();
    }
  },
  destroyed() {
    this.clearTriggerListeners();
  }
};
</script>
