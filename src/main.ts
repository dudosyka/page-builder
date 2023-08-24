import './themes/bootstrap.min.css'
import './themes/main.css'
import FrameModule from "./modules/frame/frame-module.ts";
import EditorModule from "./modules/editor/editor-module.ts";
import state from "./lib/state/event-driven-state.ts";
import {EditorMenuType, MenuChanged} from "./lib/state/events.ts";
import {FrameStateModule} from "./modules/frame/frame-state-module.ts";

FrameModule.setup()
EditorModule.setup()
state.push(new MenuChanged(EditorMenuType.MAIN))
state.loadModule(FrameStateModule)