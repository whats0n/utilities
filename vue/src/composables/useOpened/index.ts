import { reactive, watchEffect, onBeforeUnmount } from 'vue'
import { isClosestNode } from '~/utilities/isClosestNode'
import {
  UseOpenedParameters,
  UseOpenedReturnType,
  UseOpenedActions,
  UseOpenedInitReturnType,
} from './types'
import Stack from './stack'

export const useOpenedInit = (): UseOpenedInitReturnType => {
  const actionPlaceholder = (): void =>
    console.warn('please init the actions before call')

  const actions = reactive({
    open: actionPlaceholder,
    close: actionPlaceholder,
    toggle: actionPlaceholder,
  })

  const onInit = (e: UseOpenedActions): void => {
    actions.open = e.open
    actions.close = e.close
    actions.toggle = e.toggle
  }

  return { actions, onInit }
}

export const useOpened = ({
  closeOnOutsideClick = true,
  closeOnEscape = true,
  withStack = true,
  preventNodes,
  onClose,
  onOpen,
}: UseOpenedParameters = {}): UseOpenedReturnType => {
  const state = reactive({ isOpened: false, zIndex: Stack.getZIndex() })

  let id: number | null = null

  const open = (): void => {
    if (state.isOpened) return
    if (typeof onOpen === 'function') onOpen()

    if (withStack) id = Stack.add({ open, close, toggle })

    state.isOpened = true
    state.zIndex = Stack.getZIndex(id)
  }

  const close = (): void => {
    if (!state.isOpened) return
    if (typeof onClose === 'function') onClose()

    if (withStack) {
      Stack.remove(id)
      id = null
    }

    state.isOpened = false
    state.zIndex = Stack.getZIndex()
  }

  const toggle = (): void => (state.isOpened ? close() : open())

  const onDocumentClick = (e: Event): void => {
    if (
      (typeof preventNodes === 'function' &&
        preventNodes().some((node) => isClosestNode(node, e.target))) ||
      (withStack && !Stack.isLast(id))
    )
      return

    close()
  }

  const onDocumentKeyUp = (e: Event): void => {
    if (
      !(e instanceof KeyboardEvent) ||
      e.key !== 'Escape' ||
      (withStack && !Stack.isLast(id))
    )
      return

    close()
  }

  if (closeOnOutsideClick) {
    watchEffect(() =>
      state.isOpened
        ? document.addEventListener('click', onDocumentClick, true)
        : document.removeEventListener('click', onDocumentClick, true)
    )
  }

  if (closeOnEscape) {
    watchEffect(() =>
      state.isOpened
        ? document.addEventListener('keyup', onDocumentKeyUp)
        : document.removeEventListener('keyup', onDocumentKeyUp)
    )
  }

  onBeforeUnmount(() => {
    document.removeEventListener('click', onDocumentClick)
    document.removeEventListener('keyup', onDocumentKeyUp)
    Stack.remove(id)
    id = null
  })

  return {
    state,
    actions: { open, close, toggle },
  }
}
