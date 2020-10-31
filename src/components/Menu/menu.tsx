import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus
  };

  const renderChildren = () => {
    /**
     * React.Children provides utilities for dealing with the this.props.children opaque 
     * data structure.
     * Invokes a function on every immediate child contained within children with this set 
     * to thisArg. If children is an array it will be traversed and the function will be 
     * called for each child in the array. If children is null or undefined, this method 
     * will return null or undefined rather than an array.
     */
    return React.Children.map(children, (child, index) => {
      const childElemt = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElemt.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        /**
         * automatically add index for childElement.
         * 
         * Clone and return a new React element using element as the starting point. The 
         * resulting element will have the original element’s props with the new props merged 
         * in shallowly. New children will replace existing children. key and ref from the 
         * original element will be preserved. 
         */
        return React.cloneElement(childElemt, { index: index.toString() });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem");
      }
    });
  };

  return (
    // data-testid is used for function getByTestId('test-menu')
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}