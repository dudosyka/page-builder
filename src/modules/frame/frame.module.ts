import {Module} from "@module/module.ts";
import {SimpleContainer} from "@components/simple-container";
import {ComponentType} from "@components/index.ts";
import SimpleElementConfiguration from "./configuration/simple.element-configuration.ts";
import ContainerElementConfiguration from "./configuration/container.element-configuration.ts";

export class FrameModule extends Module {
  override simpleElementConfiguration = new SimpleElementConfiguration()
  override containerElementConfiguration = new ContainerElementConfiguration()
  override cssModules = import.meta.glob("../../themes/frame/*.module.css")
  override scopeId = "data-scope-frame"

  constructor() {
    super(new SimpleContainer);
  }
  setup(): void {
    super.setup()
    this.parentElement.mountOnHtml("app", this)
  }

  addElement(element: ComponentType): void {
    this.parentElement.addChild(new element())
  }
}

export default new FrameModule()