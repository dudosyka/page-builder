import {Module} from "../../lib/module/module.ts";
import {EditorElement} from "./editor-element.ts";

export class EditorModule extends Module {
  constructor() {
    super(new EditorElement);
  }
  setup(): void {
    this.parentElement.mountOnHtml("editor")
  }

}

export default new EditorModule