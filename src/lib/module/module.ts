import {ContainerElement} from "../element/container/container-element.ts";

export abstract class Module {
  protected constructor(public parentElement: ContainerElement) {}

  public abstract setup(): void
}