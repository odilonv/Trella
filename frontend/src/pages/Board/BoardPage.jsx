import React from 'react';
import { BoardComponent, ButtonComponent } from '../../components';

function BoardPage(board) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            margin: "15px"
        }}>
            <div
                className='default-container'
                style={{
                    display: 'flex',
                    width: '100%',
                    padding: '15px',
                    justifyContent: 'space-between',
                    margin: '0 0 15px 0',
                    gap: '10px',
                }}>
                <h2>{board.name ?? 'Untitled'}</h2>
                <ButtonComponent text='Create Task' href='/create-card' margin='0' />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
            }}>
                <BoardComponent titleText={'To Do'} cards={[{ description: "test", title: "bouboubou" }, { description: "test", title: "bouboubou" }]} />
                <BoardComponent titleText={'Work In Progress'} cards={[{ description: "test", title: "bouboubou" }, { description: "test", title: "bouboubou" }]} />
                <BoardComponent titleText={'In Testing'} cards={[{ description: "test", title: "bouboubou" }, { description: "test", title: "bouboubou" }]} />
                <BoardComponent titleText={'Done'} cards={[{ description: "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ", title: "bouboubouboubouboubouboubou" }, { description: "test", title: "bouboubou" }]} />
            </div>
        </div >

    );
}

export default BoardPage;