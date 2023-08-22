import {StateListener} from "./state-listener.ts";
import {StateDataModule} from "./modules/state-data-module.ts";
import {StateModuleDto} from "./modules/state-module-dto.ts";
import {FrameStateDto, FrameStateModule} from "../frame/frame-state-module.ts";
import {Event} from "./event.ts";
import {ModuleType} from "./modules";


export class EventDrivenState {
  private subs: Record<string, StateListener[]> = {}

  private modules: Record<string, StateDataModule<any, any>> = {}

  public loadModule(module: ModuleType) {
    this.modules[typeof module] = new module()
  }

  public update<T extends StateModuleDto>(onUpdate: typeof StateDataModule<T, Event>, update: (_: StateDataModule<T, Event>) => void): StateDataModule<T, Event> {
    const module = this.module<T>(onUpdate)
    update(module)
    return module
  }

  public updateAndNotify<T extends StateModuleDto>(module: typeof StateDataModule<T, Event>, update: (_: StateDataModule<T, Event>) => void) {
    this.push(this.update(module, update).event)
  }

  private module<T extends StateModuleDto>(target: typeof StateDataModule<T, Event>): StateDataModule<T, any> {
    const module = this.modules[typeof target] as StateDataModule<T, any>

    if (!module)
      throw new DOMException("Module not found")

    return module
  }

  public get frameState(): FrameStateModule {
    return this.module<FrameStateDto>(FrameStateModule) as FrameStateModule
  }

  subscribe(listener: StateListener, event: Event) {
    const subsInEvent = this.subs[event.name]

    if (!subsInEvent)
      this.subs[event.name] = [];

    this.subs[event.name].push(listener)
  }

  push(event: Event) {
    if (!this.subs[event.name])
      return
    this.subs[event.name].forEach(listener => {
      listener.pullStateChange(event)
    })
  }
}

export default new EventDrivenState()