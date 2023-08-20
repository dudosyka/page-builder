import {Button} from "./button";
import {HeaderLevel1} from "./header-level-1";
import {SimpleContainer} from "./simple-container";

const components =  [
  Button,
  HeaderLevel1,
  SimpleContainer
]

export default components

export type ComponentType = typeof components[0]