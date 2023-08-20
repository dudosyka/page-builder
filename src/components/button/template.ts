import {Template} from "../../lib/element/template/template.ts";

export default (btnTitle: string) => new Template(
  "{{btnTitle}}",
  [
    {
      key: "btnTitle",
      value: btnTitle
    }
  ]
)