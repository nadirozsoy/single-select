import { ref } from 'vue'

export function useScrollTop() {
  const scrollContainerRef = ref<HTMLElement | null>(null)

  const handleScrollTop = () => {
    if (scrollContainerRef.value) {
      scrollContainerRef.value.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return { scrollContainerRef, handleScrollTop }
}
