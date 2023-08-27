export abstract class Collection <T> {
  protected constructor(
    private items: Record<string, T> = {}
  ) {}

  get(key: string): T {
    return this.items[key]
  }

  getAll(): T[] {
    return Object.values(this.items)
  }

  set(key: string, item: T) {
    this.items[key] = item
  }

  remove(key: string) {
    if (this.items[key])
      delete this.items[key]
    else
      throw new DOMException(`Item with ${key} not found`)
  }

  removeIfExists(key: string): boolean {
    if (this.items[key]) {
      delete this.items[key]
      return true
    } else
      return false
  }
}