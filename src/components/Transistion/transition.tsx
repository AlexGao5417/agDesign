import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = (props) => {  
  console.log(props);
  
  const { children, classNames, animation, wrapper, ...restProps } = props;

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
    {/* 
        create another div element, since transistion property cannot be inherited
        have another div element can make sure that both of them won't be overlap by
        the other     
    */}
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
