import {StateListener} from "./state-listener.ts";


export abstract class Event {
  abstract name: string
}

export class EventDrivenState {
  private subs: Record<string, StateListener[]> = {}

  subscribe(listener: StateListener, event: Event) {
    const subsInEvent = this.subs[event.name]

    if (!subsInEvent)
      this.subs[event.name] = [];

    this.subs[event.name].push(listener)
  }

  push(event: Event) {
    this.subs[event.name].forEach(listener => {
      listener.pullStateChange(event)
    })
  }
}

export default new EventDrivenState()