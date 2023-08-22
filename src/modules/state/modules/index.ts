import {FrameStateModule} from "../../frame/frame-state-module.ts";

const modules =  [
  FrameStateModule
]

export default modules

export type ModuleType = typeof modules[0]