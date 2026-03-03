import { useScrollLock } from '@vueuse/core'

export const useDocumentScrollLock = () => {
  const lockCount = ref(0)
  const scrollLock = useScrollLock(document)

  const isLocked = computed(() => lockCount.value > 0)

  const lock = () => {
    lockCount.value += 1
    if (lockCount.value > 1) {
      return
    }

    scrollLock.value = true
  }

  const unlock = () => {
    lockCount.value -= 1
    if (lockCount.value > 0) {
      return
    }

    scrollLock.value = false
  }

  return {
    lock,
    unlock,
    isLocked,
  }
}
