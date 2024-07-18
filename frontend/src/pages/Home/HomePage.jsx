import React, { useContext } from 'react';
import HeadTextComponent from '../../components/HeadText/HeadTextComponent';
import ButtonComponent from '../../components/Button/ButtonComponent';
import trello from '../../assets/img/TrelloUICollage.png';
import { UserContext } from '../../contexts/UserContext'; 

function HomePage() {
    const { user } = useContext(UserContext); 

    return (
        <div style={{ margin: "15px" }}>
            <div className='default-container home-container'>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                }}>
                    <HeadTextComponent
                        titleText={<div>Stop <span style={{ color: 'red' }}>Trello</span>, now start manage your tasks with <span style={{ color: 'var(--main-color)' }}>Trella</span> !</div>}
                        firstSubText={'Keep everything in the same place—even if your team isn’t.'} />
                    {!user && ( 
                        <ButtonComponent text='Get Started' href='/signUp' margin='50px 0' />
                    )}
                </div>
                <img src={trello} alt='trello' style={{ width: '50%' }} />
            </div>
        </div>
    );
}

export default HomePage;
