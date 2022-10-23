export interface UseOpenedParameters {
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  withStack?: boolean
  preventNodes?: () => Node[]
  onOpen?: () => void
  onClose?: () => void
}

export interface UseOpenedActions {
  open(): void
  close(): void
  toggle(): void
}

export interface UseOpenedReturnType {
  state: {
    isOpened: boolean
    zIndex: number
  }
  actions: UseOpenedActions
}

export interface UseOpenedStackElement {
  id: number
  actions: UseOpenedActions
}

export interface UseOpenedInitReturnType {
  actions: UseOpenedActions
  onInit: (actions: UseOpenedActions) => void
}
