import {Module} from "../../lib/module/module.ts";
import {FrameElement} from "./frame-element.ts";
import {ComponentType} from "../../components";

export class FrameModule extends Module {
  constructor() {
    super(new FrameElement);
  }
  setup(): void {
    this.parentElement.mountOnHtml("app")
  }

  addElement(element: ComponentType): void {
    this.parentElement.addChild(new element())
  }
}

export default new FrameModule()