import { d as defineComponent, C as inject, D as injectionSlideScale, r as ref, E as onMounted, A as drauu, G as watch, H as loadCanvas, I as onBeforeUnmount, o as openBlock, c as createElementBlock } from "./vendor.b93702af.js";
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
