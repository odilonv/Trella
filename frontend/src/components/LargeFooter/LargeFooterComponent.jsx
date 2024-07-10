import React from 'react';
import moon from '../../assets/images/globe.png'

function LargeFooterComponent() {
    return (
        <footer className='large-footer'>
            <div style={{
                height: '20%',
                border: '1px 0 0 1px solid #2F3034'
            }}></div>
            <div style={{
                height: '20%',
                border: '1px 0 0 1px solid #2F3034'
            }}></div>
            <img src={moon} alt="Moon" style={{
                position: 'relative',
                height: '50vh'
            }} />
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                background: 'black',
                padding: '2% 5%',
                width: '100%',
                height: '40%',
                bottom: 0,
                position: 'absolute',
                zIndex: 2,
                borderTop: '2px solid #2F3034',
                fontSize: '1.5em',
                color: 'rgba(254, 251, 236, 0.7)'
            }}>
                <div>
                    <a href="/" style={{ color: 'white', fontSize: '2.5em', fontWeight: '600' }}>trella</a>
                    <p style={{ marginTop: '1%', color: 'white' }}>Ton application de paris e-sportif !</p>
                </div>
                <div className='footer-column'>
                    <h3>Navigation</h3>
                    <a href='/matches'>Matchs</a>
                    <a href='/games'>Jeux</a>
                    <a href='/teams'>Equipes</a>
                    <a href='/bets'>Mes Paris</a>
                </div>
                <div className='footer-column'>
                    <h3>Entreprise</h3>
                    <a href='/a-propos'>À propos</a>
                    <a href='/contact'>Contact</a>
                    <a href='/conditions'>Conditions d'utilisation</a>
                    <a href='/a-propos'>Politique de confidentialité</a>
                </div>
            </div>

        </footer>
    );
}

export default LargeFooterComponent;