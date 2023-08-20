import './themes/bootstrap.min.css'
import './themes/main.css'
import FrameModule from "./modules/frame/frame-module.ts";
import EditorModule from "./modules/editor/editor-module.ts";
import state from "./modules/state/event-driven-state.ts";
import {EditorMenuType, MenuChanged} from "./modules/state/events.ts";

FrameModule.setup()
EditorModule.setup()
state.push(new MenuChanged(EditorMenuType.MAIN))