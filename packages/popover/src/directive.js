export default {
  bind(el, binding, vnode) {
    let refComponent = vnode.context.$refs[binding.arg];

    if (refComponent) {
      refComponent.$refs.reference = el;
    }
  }
};
