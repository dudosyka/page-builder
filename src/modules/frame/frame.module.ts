import {Module} from "@module/module.ts";
import {SimpleContainer} from "@components/simple-container";
import {ComponentType} from "@components/index.ts";
import SimpleElementConfiguration from "./configuration/simple.element-configuration.ts";
import ContainerElementConfiguration from "./configuration/container.element-configuration.ts";

export class FrameModule extends Module {
  override simpleElementConfiguration = new SimpleElementConfiguration()
  override containerElementConfiguration = new ContainerElementConfiguration()
  constructor() {
    super(new SimpleContainer);
  }
  setup(): void {
    this.parentElement.mountOnHtml("app", this)
  }

  addElement(element: ComponentType): void {
    this.parentElement.addChild(new element())
  }
}

export default new FrameModule()