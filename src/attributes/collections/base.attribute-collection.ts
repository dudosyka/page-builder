import {AttributeCollection} from "@element/attributes/attribute-collection.ts";
import ClassAttribute from "../attributes/class.attribute.ts";
import {ContentEditableAttribute} from "../attributes/content-editable.attribute.ts";

export class BaseAttributeCollection extends AttributeCollection {
  public get classAttr(): ClassAttribute {
    return <ClassAttribute>this.get(ClassAttribute.name)
  }

  public get contentEditable(): ContentEditableAttribute {
    return <ContentEditableAttribute>this.get(ContentEditableAttribute.name)
  }

  public set contentEditable(editable: boolean) {
    this.contentEditable.setValue(editable)
  }

  constructor() {
    const classAttr = new ClassAttribute()
    const contentEditableProperty = new ContentEditableAttribute()
    super({
      [ClassAttribute.name]: classAttr,
      [ContentEditableAttribute.name]: contentEditableProperty
    });
  }
}