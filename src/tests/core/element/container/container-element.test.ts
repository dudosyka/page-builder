import {beforeEach, describe, test, vi, expect} from "vitest";
import {ContainerElement} from "@element/container/container.element.ts";
import {ElementConfiguration} from "@element/configuration/element-configuration.ts";
import {Element} from "@element/element.ts";
import {Module} from "@module/module.ts";

describe("Container element class tests", () => {
  let sut: any //ContainerElement class
  let module: Module

  vi.mock( "@module/module", () => {
    const Module = vi.fn()
    Module.prototype.containerElementConfiguration = new class ContainerElementConfiguration extends ElementConfiguration {
      click(_: MouseEvent, __: Element): void {
      }

      dblClick(_: MouseEvent, __: Element): void {
      }

      mouseLeave(_: MouseEvent, __: Element): void {
      }

      mouseOver(_: MouseEvent, __: Element): void {
      }
    }
    return { Module, default: null }
  })

  beforeEach(() => {
    sut = new class extends ContainerElement {
      protected setup(): void {}

    }("div")
  })

  describe("Mount container element tests", () => {
    test("Success rendering container element", () => {
      sut.renderAttributes = vi.fn()
      sut.children.renderElements = vi.fn()

      sut.render()

      expect(sut.renderAttributes).toBeCalledTimes(1)
      expect(sut.children.renderElements).toBeCalledTimes(1)
    })

    test("Success inherit parent module configuration", () => {
      //@ts-ignore
      module = new class extends Module {}
      //@ts-ignore
      Element.prototype.inherit = vi.fn()

      sut.inherit(module)

      //@ts-ignore
      expect(Element.prototype.inherit).toHaveBeenCalledOnce()
      expect(sut._configuration).toStrictEqual(module.containerElementConfiguration)
    })

  })

})