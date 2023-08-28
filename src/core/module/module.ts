import {ContainerElement} from "@element/container/container.element.ts";
import {ElementConfiguration} from "@element/configuration/element-configuration.ts";

export abstract class Module {
  public abstract containerElementConfiguration: ElementConfiguration
  public abstract simpleElementConfiguration: ElementConfiguration
  protected abstract cssModules: Record<string, () => Promise<unknown>>
  public abstract scopeId: string

  protected constructor(public parentElement: ContainerElement) {}

  public loadTheme() {
    Object.keys(this.cssModules).forEach(async module => {
      const css = (await import(/* @vite-ignore */`${module}?raw`)).default
      const style = document.createElement("style")
      style.innerHTML = css
      document.head.append(style)
    })
  }

  public setup(): void {
    this.loadTheme()
  }
}