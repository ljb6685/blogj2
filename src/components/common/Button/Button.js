import React from 'react'
import styles from './Button.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

// Input props in this component to ...rest
const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

// If 'to' is existed, use Link tag
// If not, use Div tag
// If button is not activated, use Div tag
const Button = ({
  children, to, onClick, disabled, theme = 'default',
}) => {
  const Element = (to && !disabled) ? Link : Div
    
// If button is not activated, onClick will not be excuted 
// If 'disabled' is true, add this on className
  return (
    <Element 
      to={to} 
      className={cx('button', theme, { disabled })} 
      onClick={disabled ? () => null : onClick}>
      {children}
    </Element>
  )
}

export default Button