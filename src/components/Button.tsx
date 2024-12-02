import React from "react"
import { Link } from "gatsby"

interface LinkButtonProps { text: string | React.ReactNode, title: string, to: string }
export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return <Link to={props.to} className="btn" title={props.title}>
    <div className="btn-inner">{props.text}</div>
  </Link>
}

interface ButtonProps {
  text: string | React.ReactNode,
  title: string,
  onClick: () => void
  tabIndex?:number
}
export const Button: React.FC<ButtonProps> = (props) => {
  return <button className="btn" title={props.title} onClick={props.onClick} tabIndex={props.tabIndex}>
    <div className="btn-inner">{props.text}</div>
  </button>
}