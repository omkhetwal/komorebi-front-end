import ArrowDownIcon from "./arrow-down-icon"
import ArrowSmallRightIcon from "./arrow-small-right"
import CartIcon from "./cart-icon"
import ExclamationTriangleIcon from "./exclamation-triangle-icon"
import Logo from "./logo"
import MinusIcon from "./minus-icon"
import PlusIcon from "./plus-icon"
import TrashIcon from "./trash-icon"
import XMarkIcon from "./x-mark-icon"

type IconName =
  | "arrow-down-icon"
  | "arrow-small-right"
  | "minus-icon"
  | "plus-icon"
  | "cart-icon"
  | "trash-icon"
  | "x-mark-icon"
  | "exclamation-triangle-icon"
  | "logo"

type IconsType = {
  [K in IconName]: JSX.Element
}

const Icons: IconsType = {
  "arrow-down-icon": <ArrowDownIcon />,
  "arrow-small-right": <ArrowSmallRightIcon />,
  "cart-icon": <CartIcon />,
  "exclamation-triangle-icon": <ExclamationTriangleIcon />,
  "minus-icon": <MinusIcon />,
  "plus-icon": <PlusIcon />,
  "trash-icon": <TrashIcon />,
  "x-mark-icon": <XMarkIcon />,
  logo: <Logo />,
}

type IconProps = {
  name: keyof typeof Icons
}

const Icon = ({ name }: IconProps) => {
  return Icons[name]
}

export default Icon
