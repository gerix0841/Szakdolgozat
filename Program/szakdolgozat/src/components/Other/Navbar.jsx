import React, { useState } from 'react';
import cartIcon from "../../resource/carticon.png";
import searchIcon from "../../resource/searchicon.png";
import {Link, useNavigate} from 'react-router-dom';
import { useData } from '../../ContextAPI';

export function Navbar() {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { loggedIn, userName, setLoggedIn, setUserName } = useData();

    const handleSearchToggle = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchText}`);
        setSearchText('');
    }

    const handleLogout = () => {
        setLoggedIn(false);
        setUserName('');
        alert('Sikeres kijelentkezés!');
    };

    return (
    <nav className="navbar">
        <ul className="nav-links">
            <li><Link to="/">Kezdőoldal</Link></li>
            <li><Link to="/Supplements">Táplálékkiegészítők</Link></li>
            <li><Link to='/Machines'>Gépek</Link></li>
            <li><Link to='/Additional'>Kiegészítők</Link></li>
            {loggedIn && userName === 'admin' && (
                <>
                <li><Link to='/Admin'>Admin oldal</Link></li>
                </>
            )}
        </ul>
        <ul className="nav-links right"> 
            <li className='cart-icon'>
                {showSearch && (
                    <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Keresés"
                        value={searchText}
                        onChange={handleSearchChange}
                        onBlur={handleSearchToggle}
                    />
                     <button type="submit" style={{ display: 'none' }}>Keresés</button>
                    </form>
                )}
            <img src={searchIcon} alt="Keresés" onClick={handleSearchToggle}/>
            </li>
            <li className='cart-icon'><Link to="/Cart"><img src={cartIcon} alt="Kosár" /></Link></li>
            {loggedIn ? (
                <>
                    <li style={{ fontSize: '20px' }}>{userName}</li>
                    <li>
                    <button 
                        onClick={handleLogout} 
                        style={{
                            color: 'white',
                            backgroundColor: 'grey',
                            height: '50px',
                            width: '150px',
                            fontSize: '20px',
                            border: '3px solid white',
                            borderRadius: '10px',
                    }}>
                    Kijelentkezés
                    </button>
                    </li>
                </>
                ) : (
                <>
                    <li><Link to="/Login">Bejelentkezés</Link></li>
                    <li><Link to="/Register">Regisztráció</Link></li>
                </>
            )}
        </ul>
    </nav>
      );
};
