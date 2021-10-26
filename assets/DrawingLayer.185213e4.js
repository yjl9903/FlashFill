import { d as defineComponent, D as inject, E as injectionSlideScale, r as ref, G as onMounted, A as drauu, H as watch, I as loadCanvas, J as onBeforeUnmount, o as openBlock, c as createElementBlock } from "./vendor.073046f9.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const scale = inject(injectionSlideScale);
    const svg = ref();
    onMounted(() => {
      drauu.mount(svg.value, svg.value.parentElement);
      watch(scale, (scale2) => drauu.options.coordinateScale = 1 / scale2, { immediate: true });
      loadCanvas();
    });
    onBeforeUnmount(() => {
      drauu.unmount();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        ref: (_value, _refs) => {
          _refs["svg"] = _value;
          svg.value = _value;
        },
        class: "w-full h-full absolute top-0 pointer-events-none"
      }, null, 512);
    };
  }
});
export { _sfc_main as default };
