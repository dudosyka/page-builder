import {Module} from "../../lib/module/module.ts";
import {FrameElement} from "./frame-element.ts";

export class FrameModule extends Module {
  constructor() {
    super(new FrameElement);
  }
  setup(): void {
    this.parentElement.mountOnHtml("app")
  }

}

export default new FrameModule()