import React from 'react';
import './Header.css';
import NeflixLogo from '../../images/netflixlogo.png';
import Userlogo from '../../images/userlogo.png';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="#">
                    <img src={NeflixLogo} alt="Netflix Logo" />
                </a>
            </div>
            <div className="header--user">
                <a href="#">
                    <img src={Userlogo} alt="User Icon" />
                </a>
            </div>
        </header>
    );
}