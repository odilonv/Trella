import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button/ButtonComponent';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { UserContext } from '../../contexts';

function Header() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:5001/users/session', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        checkSession();
    }, [setUser]);

    const handleBoardsClick = () => {
        navigate('/boards');
    };

    const handleTrellaClick = () => {
        navigate('/');
    };

    const handleCardsClick = () => {
        navigate('/cards');
    };

    const handleLogoutClick = async () => {
        try {
            const response = await fetch('http://localhost:5001/users/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setUser(null);
                navigate('/');
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <header>
            <nav className='app-header'>
                <span onClick={handleTrellaClick} id='logo-header'>Trella</span>
                <div>


                    {
                        user && (
                            <div className="header-link-container">
                                <span className="header-link" onClick={handleBoardsClick}>Boards</span>
                                <span className="header-link" onClick={handleCardsClick}>Cards</span>
                            </div>

                        )
                    }

                    <div className='app-header-buttons'>
                        {user ? (
                            <>
                                <ButtonComponent text={user.firstName} color='#000000' href='/user'
                                    endIcon={<PersonRoundedIcon htmlColor='white' />} />
                            </>
                        ) : (
                            <ButtonComponent text="Connexion" textColor='var(--white)' color='var(--black)'
                                href='/login' />
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
