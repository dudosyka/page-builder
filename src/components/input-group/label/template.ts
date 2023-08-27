import {Template} from "@lib/element/template/template.ts";

export default (labelValue: string) => new Template(
  "{{labelValue}}",
  [
    {
      key: "labelValue",
      value: labelValue
    }
  ]
)