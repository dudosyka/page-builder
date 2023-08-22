import {Element} from "../element.ts";


export type ElementEventListener<T extends Event> = (event: T, element: Element) => void