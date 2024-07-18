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
                <h2>Page Not Found.</h2>
                <ButtonComponent
                    color={'var(--main-color)'}
                    text={'I come back to my board'}
                    borderRadius={'10px'}
                    endIcon={<ArrowForwardIosRoundedIcon style={{ color: 'white' }} />}
                    href={'/board'} />
            </div>
        </div>
    );
}

export default NotFoundPage;