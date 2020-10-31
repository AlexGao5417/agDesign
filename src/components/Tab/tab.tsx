import React, { createContext, useState } from 'react'
import classNames from "classnames";

type TabMode = "nav-card" | "nav-line";
type SelectCallback = (selectedIndex: number) => void;

export interface TabsProps {
    defaultIndex?: number;
    className?: string;
    mode?: TabMode;
    style?: React.CSSProperties;
    onSelect?: void;
}

interface ITabsContext {
    index: number;
    mode?: TabMode;
    onSelect?: SelectCallback;
}

export const TabsContext = createContext<ITabsContext>({ index: 0 });

const Tab: React.FC<TabsProps> = (props) => {

    const { className, mode, children, defaultIndex } = props;

    const [ activeIndex, setActiveIndex ] = useState(defaultIndex)

    const handleClick = (index:number) => {
        setActiveIndex(index);
    }

    const passedTabsContext: ITabsContext = {
        index: activeIndex ? activeIndex : 0,
        onSelect: handleClick,
        mode: mode
      };

    const classes = classNames("tabs-nav", className, {
        "nav-card": mode === "nav-card",
        "nav-line": mode !== "nav-line",
      });


    return(
        <ul className={classes}>
            <TabsContext.Provider value={passedTabsContext}>
                {children}
            </TabsContext.Provider>
        </ul>
    )
}

export default Tab