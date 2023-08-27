import {StateDataModule} from "@state/modules/state-data-module.ts";
import {StateModuleDto} from "@state/modules/state-module-dto.ts";
import {Event} from "@state/event.ts";
import {ComponentType} from "../../components";

export class FrameStateUpdated extends Event {
  override name: string = "frame-state-updated:event"
}

export class FrameStateDto extends StateModuleDto {
  public elementOnInsert: ComponentType | null = null
}

export class FrameStateModule extends StateDataModule<FrameStateDto, FrameStateUpdated> {
  override data: FrameStateDto = new FrameStateDto

  override event: FrameStateUpdated = new FrameStateUpdated();

  public set elementOnSearch(element: ComponentType | null) {
    this.data.elementOnInsert = element
  }
  public get elementOnSearch(): ComponentType | null {
    return this.data.elementOnInsert
  }
}