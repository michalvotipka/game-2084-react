import React from 'react';
import "./header.css";

type HeaderProps = {
    currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
    return (
        <div className="header">
            <h1>2048</h1>
            <h3>{currentPage ? currentPage : ""}</h3>
        </div>
    )
}

export default Header;