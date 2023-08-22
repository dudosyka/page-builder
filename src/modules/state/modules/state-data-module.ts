import {StateModuleDto} from "./state-module-dto.ts";
import {Event} from "../event-driven-state.ts";

export abstract class StateDataModule<T extends StateModuleDto, V extends Event> {
  public abstract data: T
  public abstract event: V
}