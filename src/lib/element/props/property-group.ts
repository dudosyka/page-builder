import {Property} from "./property.ts";

export enum PropertyGroupType {
  ATTRIBUTES, CSS
}

export class PropertyGroup {
  constructor(
    public type: PropertyGroupType,
    private properties: Record<string, Property> = {}
  ) {
  }

  get(key: string): Property {
    return this.properties[key]
  }

  getAll(): Property[] {
    return Object.values(this.properties)
  }

  add(property: Property) {
    this.properties[property.name] = property
  }

  remove(key: string) {
    if (this.properties[key])
      delete this.properties[key]
    else
      throw new DOMException(`Property ${key} not found`)
  }

  removeIfExists(key: string) {
    if (this.properties[key])
      delete this.properties[key]
  }

  update(key: string, property: Property) {
    this.properties[key] = property
  }
}