import {Template} from "../lib/element/template/template.ts";

export default new Template(
"<h1>{{headerValue}}</h1>",
[
        {
          key: "headerValue",
          value: "Vue.js by dudosyka"
        }
      ]
)