import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(elementRef: any, callback: Function) {
  const handleClick = (e: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(e.target)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })
}
