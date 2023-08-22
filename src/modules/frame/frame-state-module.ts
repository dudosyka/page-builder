import {StateDataModule} from "../state/modules/state-data-module.ts";
import {StateModuleDto} from "../state/modules/state-module-dto.ts";
import {Event} from "../state/event-driven-state.ts";

export class FrameStateUpdated extends Event {
  override name: string = "frame-state-updated:event"
}

export class FrameStateDto extends StateModuleDto {
  public insertSearch: boolean = false
}

export class FrameStateModule extends StateDataModule<FrameStateDto, FrameStateUpdated> {
  override data: FrameStateDto = new FrameStateDto
  public get isInsertSearching(): boolean {
    return this.data.insertSearch
  }

  event: FrameStateUpdated = new FrameStateUpdated();
}