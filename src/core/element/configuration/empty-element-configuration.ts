import {ElementConfiguration} from "./element-configuration.ts";

class EmptyElementConfiguration extends ElementConfiguration {
  override dblClick(): void {}

  override mouseLeave(): void {}

  override mouseOver(): void {}
  override click(): void {}
}

export default new EmptyElementConfiguration()