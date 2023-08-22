import {StateListener} from "./state-listener.ts";
import {StateDataModule} from "./modules/state-data-module.ts";
import {StateModuleDto} from "./modules/state-module-dto.ts";


export abstract class Event {
  abstract name: string
}

export class EventDrivenState {
  private subs: Record<string, StateListener[]> = {}

  private modules: Record<string, StateDataModule<any, any>> = {}

  public loadModule(name: string, module: StateDataModule<any, any>) {
    this.modules[name] = module
  }

  public update<T extends StateModuleDto>(name: string, update: (_: StateDataModule<T, any>) => StateDataModule<T, any>): StateDataModule<T, any> {
    const module = this.modules[name] as StateDataModule<T, any>

    if (module) {
      return update(module)
    }

    throw new DOMException("Module not found")
  }

  public updateAndNotify<T extends StateModuleDto>(name: string, update: (_: StateDataModule<T, any>) => StateDataModule<T, any>) {
    this.push(this.update(name, update).event)
  }

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