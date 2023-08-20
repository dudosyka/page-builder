import {Element} from "../element/element.ts";

export abstract class Module {
  protected constructor(public parentElement: Element) {}

  public abstract setup(): void
}