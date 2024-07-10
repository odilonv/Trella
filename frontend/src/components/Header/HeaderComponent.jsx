import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button/ButtonComponent';
import Chip from '../../assets/images/chip.svg';
import Plus from '@mui/icons-material/AddRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { IconButton } from "@mui/material";
import RequestPageRoundedIcon from '@mui/icons-material/RequestPageRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { UserContext } from '../../contexts';

function Header() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        const storedMode = localStorage.getItem('darkMode');
        return storedMode !== null ? JSON.parse(storedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));

        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const [runningMatches, setRunningMatches] = useState(() => {
        const storedCount = localStorage.getItem('runningMatchesCount');
        return storedCount !== null ? parseInt(storedCount, 10) : null;
    });

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'runningMatchesCount') {
                const newCount = event.newValue !== null ? parseInt(event.newValue, 10) : null;
                setRunningMatches(newCount);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLiveClick = () => {
        navigate('/matches', { state: { showRunningMatches: true } });
    };

    const handleEsportClick = () => {
        navigate('/matches', { state: { showRunningMatches: false } });
    };

    const handletrellaClick = () => {
        navigate('/');
    };

    const handleGamesClick = () => {
        navigate('/games');
    };

    const handleTeamsClick = () => {
        navigate('/teams');
    };

    return (
        <header>
            <div className="header-wrapper">
                <a rel="noopener noreferrer" href="http://www.joueurs-info-service.fr/" target="_blank">
                    <img data-qa="frAnjBanner" alt="anj"
                        src="https://dam.begmedia.com/front/banners/arjel-banner2.jpg" />
                </a>
            </div>
            <nav className='app-header'>
                <span onClick={handletrellaClick} id='logo-header'>trella</span>
                <div>
                    <div className="header-link-container">
                        <span className="header-link" onClick={handleEsportClick}>Esport</span>
                        <span className="header-link" onClick={handleGamesClick}>Jeux</span>
                        <span className="header-link" onClick={handleTeamsClick}>Equipes</span>
                        <span className="header-link" style={{ cursor: 'pointer', position: 'relative' }}
                            onClick={handleLiveClick}>
                            Live
                            {runningMatches !== null && (
                                <span className="live-counter-badge">{runningMatches}</span>
                            )}
                        </span>
                    </div>
                    <div className='app-header-buttons'>
                        {user ? (
                            <>
                                <div className="balance-container">
                                    <IconButton style={{
                                        marginRight: '5px',
                                        borderRadius: '5px',
                                        backgroundColor: 'var(--main-purple)',
                                        color: 'white',
                                        padding: '0'
                                    }}><Plus /></IconButton>
                                    {user.balance}
                                    <img alt="money" className={"chip"} src={Chip} color={"var(--main-purple)"} />
                                </div>
                                <ButtonComponent text={'Mes paris'} color='var(--main-purple)' href='/bets'
                                    endIcon={<RequestPageRoundedIcon htmlColor='white' />} />
                                <ButtonComponent text={user.firstName} color='#000000' href='/user'
                                    endIcon={<PersonRoundedIcon htmlColor='white' />} />
                            </>
                        ) : (
                            <>
                                <ButtonComponent text="Connexion" textColor='var(--white)' color='var(--black)'
                                    href='/login' />
                            </>
                        )}
                        <IconButton onClick={toggleDarkMode} style={{ color: 'var(--main-purple)' }}>
                            {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                        </IconButton>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
