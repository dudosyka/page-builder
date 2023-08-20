import {Template} from "../../lib/element/template/template.ts";

export default (headerTitle: string) => new Template(
  "{{headerValue}}",
  [
    {
      key: "headerValue",
      value: headerTitle
    }
  ]
)