import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  wait,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generatedMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
        <MenuItem>item 2</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
    const cssFile: string = `
        .submenu{
            display: none;
        }
        .submenu.menu-opened {
            display: block;
        }
    `

    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  //run everytime before each test secario
  beforeEach(() => {
    wrapper = render(generatedMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  }); 

  it("should render Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    //since menuElement is HTML element, so we can use DOM function
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("should render vertical mode when mode is set to vertical", () => {
    // clean up the element generated in beforeEach() function
    cleanup();
    const wrapper = render(generatedMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });

  it("should show dropdown items when the mouse hover on submenu", async () => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
      const dropdownElement = wrapper.getByText('dropdown')
      fireEvent.mouseEnter(dropdownElement)
      await wait(() => {
        expect(wrapper.queryByText('drop1')).toBeVisible()
      })
      fireEvent.click(wrapper.getByText('drop1'))
      expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
      fireEvent.mouseLeave(dropdownElement)
      await wait(() => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
      })
  })
});
