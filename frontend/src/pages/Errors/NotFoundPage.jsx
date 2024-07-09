import React from 'react';
import { ButtonComponent } from '../../components';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


function NotFoundPage() {
    return (
        <div className='not-found-container'>
            <div className='not-found-header'>
                <h1>404</h1>
            </div>
            <div className='not-found-body'>
                <h2>Cette page n'existe pas.</h2>
                <ButtonComponent
                    color={'var(--main-purple)'}
                    text={'Je retourne parier'}
                    borderRadius={'25px'}
                    endIcon={<ArrowForwardIosRoundedIcon />}
                    href={'/matches'} />
            </div>
        </div>
    );
}

export default NotFoundPage;