import React from "react";
import "./styles/index.scss";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tab from './components/Tab/tab'
import TabsItem from './components/Tab/tabItem'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tab mode="nav-card">
          <TabsItem index={1}>test1</TabsItem>
          <TabsItem index={2}>test2</TabsItem>
        </Tab>
        <Menu
          defaultIndex={'0'}
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>item 1</MenuItem>
          <MenuItem>item 2</MenuItem>
          <MenuItem>item 3</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>item 1</MenuItem>
            <MenuItem>item 2</MenuItem>
          </SubMenu>
        </Menu>
        <Button> Hello </Button>
        <Button btnType='primary' size='lg'>
          {" "}
          Hello 2{" "}
        </Button>
        <Button btnType='link' href="https://www.google.com">
          {" "}
          Google 3{" "}
        </Button>
      </header>
    </div>
  );
}

export default App;
