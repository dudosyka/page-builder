import {Event} from "./event.ts";

export interface StateListener {
  pullStateChange(event: Event): void
}