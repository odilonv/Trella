import React from 'react';
import { BoardComponent, HeadBarComponent } from '../../components';

function BoardPage(board) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            margin: "15px"
        }}>
            <HeadBarComponent title={board.name ?? 'Untilted'} titleFirstButton={'New Board'} />

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
        </div>

    );
}

export default BoardPage;