import {PropertyGroup, PropertyGroupType} from "../../lib/element/props/property-group.ts";
import ClassProperty from "./class-property.ts";

export class AttributePropertyGroup extends PropertyGroup {
  public get classAttr(): ClassProperty {
    return <ClassProperty>this.get("class")
  }

  constructor() {
    const classAttr = new ClassProperty()
    super(PropertyGroupType.ATTRIBUTES, {
      "class": classAttr
    });
  }
}