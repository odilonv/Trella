import React, {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button/ButtonComponent';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import RequestPageRoundedIcon from '@mui/icons-material/RequestPageRounded';
import { UserContext } from '../../contexts';

function Header() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleEsportClick = () => {
        navigate('/matches', { state: { showRunningMatches: false } });
    };

    const handleWeLootClick = () => {
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
                <span onClick={handleWeLootClick} id='logo-header'>weLoot</span>
                <div>
                    <div className="header-link-container">
                        <span className="header-link" onClick={handleEsportClick}>Esport</span>
                        <span className="header-link" onClick={handleGamesClick}>Jeux</span>
                        <span className="header-link" onClick={handleTeamsClick}>Equipes</span>
                    </div>
                    <div className='app-header-buttons'>
                        {user ? (
                            <>
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
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
