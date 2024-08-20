import React from 'react'
import './RevealOnScroll.scss'

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties 
}


const RevealOnScroll:React.FC<RevealOnScrollProps> = ({children, className, style}) => {
    
  return (
    <div style={style} className={className}>{children}</div>
  )
}

export default RevealOnScroll