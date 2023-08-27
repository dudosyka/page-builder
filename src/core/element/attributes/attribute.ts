export class Attribute {
  public editable: boolean = true
  constructor(
    public name: string = "attr",
    protected value: string = ""
  ) {}

  getValue(): string {
    return this.value
  }

  _setValue(value: string): void {
    this.value = value
  }
}