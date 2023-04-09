import React from "react"
import '../styles/main.scss'
import { DoggyCompanion } from "./DoggyCompanion"
import { useInitializeAnimation } from "../hooks/useInitializeAnimation"
import { useRandomBackgroundColor } from "../hooks/useRandomBackgroundColor"
import { Link } from "gatsby"

export const Layout: React.FC<{ children: any }> = ({ children }) => {
    useRandomBackgroundColor()
    useInitializeAnimation()

    return (
        <div className="body  before-animate">
            <div className="container">
                <div className="menu-container">
                    <DoggyCompanion />
                    <header className="menu">
                        <Link to="/" activeClassName="active">Home</Link>
                        <Link to="/dogs"  activeClassName="active" partiallyActive>Dogs</Link>
                        <Link to="/about"  activeClassName="active" partiallyActive>About</Link>                        
                    </header>                    
                </div> 
                <div className="content">{children}</div>
            </div>
        </div>
    )
} 