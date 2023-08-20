export class Property {
  constructor(
    public name: string,
    protected value: string
  ) {}

  getValue(): string {
    return this.value
  }

  _setValue(value: string): void {
    this.value = value
  }
}