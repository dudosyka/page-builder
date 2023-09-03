import {test, expect, beforeEach, describe, vi, Mock} from "vitest";
import {Element} from "@element/element.ts";
import {ElementConfiguration} from "@element/configuration/element-configuration.ts";
import {ContainerElement} from "@element/container/container.element.ts";
import {Module} from "@module/module.ts";
import {AttributeCollection} from "@element/attributes/attribute-collection.ts";
import {Attribute} from "@element/attributes/attribute.ts";

describe("Element class tests", () => {
  let element: Element
  let containerElement: ContainerElement
  let module: Module
  // let parentHtmlElement: HTMLDivElement
  const parentHtmlId = "app"

  const attr = new Attribute("attr", "test")
  const attrCollection = new class extends AttributeCollection {
    constructor() {
      super();
      this.add(attr)
    }
  }

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
    Module.prototype.simpleElementConfiguration = new class SimpleElementConfiguration extends ElementConfiguration {
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

  beforeEach(_ => {
    vi.unstubAllGlobals()
    const parentHtmlElement = document.createElement("div")
    parentHtmlElement.id = parentHtmlId
    document.appendChild(parentHtmlElement)

    element = new class extends Element {
      protected setup(): void {
      }
    }('h1', attrCollection)
    containerElement = new class extends ContainerElement {
      protected setup(): void {
      }
    }("div", attrCollection)
    // @ts-ignore
    module = new Module
  })

  describe("Base initialization tests", () => {
    test("Element successfully initialized", _ => {
      const element = new class extends Element {
        protected setup(): void {
        }
      }('h1')
      expect(element.htmlElement).toStrictEqual(document.createElement(element.elementName))
    })
  })

  describe("Mount process tests", () => {

    test("Success element before-mount initialization", () => {
      const sut = element as any
      //Spies for the initialization process
      const inherit = vi.spyOn(sut, "inherit")
      const initializeListeners = vi.spyOn(sut, "initializeListeners")
      const setup = vi.spyOn(sut, "setup")
      const render = vi.spyOn(sut, "render")


      sut.init(module)

      expect(inherit).toHaveBeenCalledOnce()
      expect(initializeListeners).toHaveBeenCalledOnce()
      expect(setup).toHaveBeenCalledOnce()
      expect(render).toHaveBeenCalledOnce()
      expect(sut._configuration).toStrictEqual(module.simpleElementConfiguration)
    })

    describe("Mount elements on HTML", () => {

      test("Element success mount on html", _ => {
        const sut = containerElement
        //Create a fake document object with appendChild to spy on it
        const appendChild = vi.fn()
        const fakeDocument = {
          getElementById: (_: any) => ({ appendChild })
        }
        vi.stubGlobal("document", fakeDocument)
        const init = vi.spyOn(sut as any, "init")

        sut.mountOnHtml(parentHtmlId, module)

        expect(init).toHaveBeenCalledOnce()
        expect(appendChild).toHaveBeenCalledOnce()
      })

      test("Error throws if html element is not found on the page during mounting", () => {
        const sut = element

        expect(() => sut.mountOnHtml("failed-element-id", module)).toThrow(DOMException)
      })
    })

    describe("Mount elements on parent elements", () => {
      let parentContainer: ContainerElement
      beforeEach(() => {
        parentContainer = new class extends ContainerElement {
          protected setup(): void {
          }
        }("div")

        parentContainer.mountOnHtml(parentHtmlId, module)
      })

      test("Element success mount on container", () => {
        const sut = element
        const init = vi.spyOn(sut as any, "init")

        sut.mount(parentContainer)

        expect(init).toHaveBeenCalledOnce()
        expect(sut.parent).toStrictEqual(parentContainer)
      })
    })
  })

  describe("Unmount elements tests", () => {
    test("Success unmount element", () => {
      const sut = element
      element.mount(containerElement)
      containerElement.removeChild = vi.fn()
      const remove = vi.spyOn(sut.htmlElement, "remove")

      sut.unmount()

      expect(containerElement.removeChild).toHaveBeenCalledOnce()
      expect(remove).toHaveBeenCalledOnce()
    })
  })

  describe("Attributes managing tests", () => {
    let sut: any // Element class
    let setAttribute: Mock<any, any> = vi.fn()

    beforeEach(() => {
      sut = element as any
      sut.htmlElement = {
        setAttribute
      }
      //We need to set parent module to check that scope attribute will be rendered
      sut._parentModule = module

      setAttribute.mockClear()
    })

    test("Element attributes rendering", () => {
      sut.renderAttributes()

      expect(setAttribute).toBeCalledWith(attr.name, attr.getValue())
      expect(setAttribute).toBeCalledWith(sut._parentModule.scopeId, "")
      expect(setAttribute).toBeCalledTimes(2)
    })

    test("Element attributes updating", () => {
      const renderAttributes = vi.spyOn(sut, "renderAttributes")

      sut.updateAttributes((_: AttributeCollection) => {})

      expect(renderAttributes).toHaveBeenCalledOnce()
    })
  })

  describe("Listeners managing tests", () => {
    let sut: any // Element class
    let addEventListener: Mock<any, any> = vi.fn()
    const listener = () => {}
    const eventName = "test"
    const name = "name"

    beforeEach(() => {
      sut = element as any
      sut.htmlElement = {
        addEventListener
      }
      document.addEventListener = addEventListener
      addEventListener.mockClear()
    })

    describe("Element add listeners tests", () => {

      test("Success element listeners adding", () => {
        sut.addListener(name, eventName, listener)

        expect(addEventListener).toHaveBeenCalledOnce()
        const events = Object.keys(sut._eventListeners)
        expect(events.length).toBe(1)
        expect(events.includes(name)).toBe(true)
      })

      test("Success element global listeners adding", () => {
        sut.addGlobalListener(name, eventName, listener)

        expect(addEventListener).toHaveBeenCalledOnce()
        const events = Object.keys(sut._eventListeners)
        expect(events.length).toBe(1)
        expect(events.includes(name)).toBe(true)
      })
    })

    describe("Element remove listeners tests", () => {
      beforeEach(() => {
        sut.addListener(name, eventName, listener)
      })

      test("Success remove listener test", () => {
        sut._removeListener(name)
        expect(Object.keys(sut._eventListeners).includes(name)).toBe(false)
      })

      test("Success element remove listener", () => {
        const removeListener = vi.fn()
        removeListener.mockImplementation((eventName) => {
          return eventName
        })
        sut.htmlElement.removeEventListener = removeListener

        sut.removeListener(name)

        expect(removeListener).toHaveLastReturnedWith(eventName)
        expect(removeListener).toHaveBeenCalledOnce()
      })

      test("Success remove global listener", () => {
        const documentRemoveListener = vi.fn()
        documentRemoveListener.mockImplementation((eventName) => {
          return eventName
        })
        document.removeEventListener = documentRemoveListener

        sut.removeGlobalListener(name)

        expect(documentRemoveListener).toHaveLastReturnedWith(eventName)
        expect(documentRemoveListener).toHaveBeenCalledOnce()
      })

      test("Exception throws on trying to remove listener which is not exist", () => {
        expect(() => sut._removeListener("failed-name")).toThrow(DOMException)
      })
    })
  })

  describe("Render process test", () => {
    let sut: any //Element
    let generationResult = "test"
    let generate: Mock<any, any> = vi.fn(() => {
      return generationResult
    })
    let updateData: Mock<any, any> = vi.fn()
    let renderAttributes = vi.fn()

    beforeEach(() => {
      sut = element as any
      sut.template = {
        generate,
        updateData
      }
      sut.htmlElement = {
        innerHTML: ""
      }
      sut.renderAttributes = renderAttributes
      renderAttributes.mockClear()
      generate.mockClear()
    })

    test("Success template rendering", () => {
      sut.render()

      expect(renderAttributes).toHaveBeenCalledOnce()
      expect(generate).toHaveBeenCalledOnce()
      expect(sut.htmlElement.innerHTML).toBe(generationResult)
    })

    test("Success template updating", () => {
      const render = vi.spyOn(sut, "render")
      sut.updateData([])

      expect(updateData).toHaveBeenCalledOnce()
      expect(render).toHaveBeenCalledOnce()
    })
  })
})