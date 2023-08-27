import {Attribute} from "./attribute.ts";
import {Collection} from "../../utils/collection.ts";

export abstract class AttributeCollection extends Collection<Attribute> {
  add<T extends Attribute>(attribute: T) {
    this.set(attribute.constructor.name, attribute)
  }

  attribute<T extends Attribute>(attribute: typeof Attribute): T {
    try {
      return this.get(attribute.name) as T
    } catch (_) {
      throw new DOMException(`Attribute ${attribute.name} not found`)
    }
  }
}