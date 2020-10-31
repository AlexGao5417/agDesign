import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./tab";

export interface TabsItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
  const { style, children, disabled, className, index } = props;
  const context = useContext(TabsContext);

  const classes = classNames("tabs-nav-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && typeof index === "number") {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default TabsItem;
