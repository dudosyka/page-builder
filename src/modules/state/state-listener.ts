import {Event} from "./event-driven-state.ts";

export interface StateListener {
  pullStateChange(event: Event): void
}