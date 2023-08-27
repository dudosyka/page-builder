import {ContainerElement} from "@element/container/container.element.ts";
import {ElementConfiguration} from "@element/configuration/element-configuration.ts";

export abstract class Module {
  public abstract containerElementConfiguration: ElementConfiguration
  public abstract simpleElementConfiguration: ElementConfiguration
  protected constructor(public parentElement: ContainerElement) {}

  public abstract setup(): void
}