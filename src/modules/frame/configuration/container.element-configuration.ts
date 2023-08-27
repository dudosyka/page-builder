import {ElementConfiguration} from "@element/configuration/element-configuration.ts";
import {Element} from "@element/element.ts";

export default class ContainerElementConfiguration extends ElementConfiguration {
  dblClick(event: MouseEvent, element: Element): void {
    console.log(`Container DBL click ${event} on element: ${element}`)
  }

  mouseLeave(event: MouseEvent, element: Element): void {
    console.log(`Container mouse leave ${event} on element: ${element}`)
  }

  mouseOver(event: MouseEvent, element: Element): void {
    console.log(`Container mouse enter ${event} on element: ${element}`)
  }

}