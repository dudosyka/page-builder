import {Collection} from "../../utils/collection.ts";
import {Property} from "@element/property/property.ts";

export class PropertyCollection extends Collection<Property>{
  constructor(properties: Record<string, Property> = {}) {
    super(properties);
  }

  static empty() {
    return new PropertyCollection()
  }
}