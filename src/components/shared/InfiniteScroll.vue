<script lang="ts" setup>
import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export interface Props {
  loader: boolean
  hasNext: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loader: false,
  hasNext: true
})

const emit = defineEmits(['loadMore'])

const marker: Ref<HTMLElement | null> = ref(null)
const target: Ref<HTMLElement | null> = ref(null)

const intersectionObserver = new IntersectionObserver(entries => {
  const target = entries[0]

  if (target.isIntersecting && props.hasNext) emit('loadMore')
})
const onInfiniteScroll = () => {
  if (marker.value) {
    intersectionObserver.observe(marker.value)
  }
}
onMounted(() => onInfiniteScroll())
onUnmounted(() => intersectionObserver.disconnect())
</script>

<template>
  <div ref="target" class="relative w-full">
    <slot />
    <div
      ref="marker"
      :class="{ 'opacity-100': loader }"
      class="infinite-scroll-loader flow absolute bottom-[10px] left-1/2 flex w-[12rem] -translate-x-1/2 items-center justify-between gap-[8px] opacity-0"
    >
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style lang="scss">
.infinite-scroll {
  &-loader {
    div {
      width: 33.333333%;
      height: 5px;
      background-color: var(--primary-color);
      animation: fade 0.8s ease-in-out alternate infinite;
      border-radius: 30px;

      &:nth-of-type(1) {
        animation-delay: -0.4s;
      }

      &:nth-of-type(2) {
        animation-delay: -0.2s;
      }
    }
  }
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
