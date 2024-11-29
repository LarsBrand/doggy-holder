import React from "react"
import '../styles/main.scss'
import { DoggyCompanion } from "./DoggyCompanion"
import { Link } from "gatsby"
import { motion } from '../motion/packages/framer-motion/src'
import { InitializeAnmationContextProvider } from "./InitializeAnimationContext"

export const Layout: React.FC<{ children: any }> = ({ children }) => {
    return (
        <div className="body before-animate">
            <InitializeAnmationContextProvider>
                <motion.div className="container" layout layoutRoot>
                    <div className="menu-container">
                        <DoggyCompanion />
                        <header className="menu">
                            <Link to="/" activeClassName="active">Home</Link>
                            <Link to="/dogs" activeClassName="active" partiallyActive>Dogs</Link>
                            <Link to="/about" activeClassName="active" partiallyActive>About</Link>
                        </header>
                    </div>
                    <div className="content">{children}</div>
                </motion.div>
            </InitializeAnmationContextProvider>
        </div>
    )
} 