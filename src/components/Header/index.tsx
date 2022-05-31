import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import {  DISCORD_URL, TWITTER_URL } from "../../config/main";

import { getImg } from "../../utils/Helper";
import './index.css';

const Header = () => {
    const [isOpen] = useState(false)

    const showSearch = () => {
        
    }

    return (
        <header>
            <div className="header-div">
                <NavLink to="/"><img src={getImg('logo.svg')} width={162} height={150} alt="logo" /></NavLink>
                <div className="mt_20npm">
                    <NavLink to="/">Overview</NavLink>
                    <NavLink to="/utilities">Utilities</NavLink>
                    <NavLink to="/community">Community</NavLink>
                    <a href={`${TWITTER_URL}`} target="_blank" rel="noreferrer"><img src={getImg('twitter.png')} alt="twitter" /></a>
                    <a href={`${DISCORD_URL}`} target="_blank" rel="noreferrer"><img src={getImg('discord.png')} alt="discord" /></a>
                    <a id="search" rel="noreferrer" href="" onClick={showSearch}><img src={getImg('search.svg')} alt="search" width={30} height={25}/></a>
                </div>
            </div>
            {isOpen && <div className="menu">
                <div>
                    <div>Disconnect</div>
                </div>
            </div>}
        </header>
    )
}

export default Header