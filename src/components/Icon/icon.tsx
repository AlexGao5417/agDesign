import React, { useContext } from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary'|'secondary'|'success'|'info'|'warning'|'danger'|'light'|'dark'


/**
 * encapsulate the original FontAwesomeIconProps 
 * with our custom IconProps.
 * The purpose is to add theme css class into Icon
 * component
 */
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
    const {className, theme, ...restProps } = props
    const classes = classNames('icon', className, {
        [`icon-${theme}`]: theme
    })

    return(
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon 