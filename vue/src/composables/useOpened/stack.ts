import { UseOpenedActions, UseOpenedStackElement } from './types'

export default new (class {
  private queue: UseOpenedStackElement[] = []

  private get last(): UseOpenedStackElement | null {
    return this.queue[this.queue.length - 1] || null
  }

  private getId = (): number => {
    const element = this.last

    return element ? element.id + 1 : 0
  }

  public add = (actions: UseOpenedActions): number => {
    const id = this.getId()

    this.queue.push({ id, actions })

    return id
  }

  public remove = (id: number | null): void => {
    this.queue = this.queue.filter((element) => element.id !== id)
  }

  public isLast = (id: number | null): boolean => this.last?.id === id

  public getZIndex = (id?: number | null): number => (id ? 1000 + id : 1000)
})()
