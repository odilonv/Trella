import React from 'react';
import { BoardThumbnailComponent, HeadBarComponent } from '../../components';

function BoardListPage() {
    let boards = [{ name: 'Board 1', description: 'This is a board description' },
    { name: 'Board 2', description: 'This is a board description' },
    { name: 'Board 3', description: 'This is a board description' }
    ];
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                flexDirection: 'column',
                margin: "15px"
            }}>
            <HeadBarComponent title={'Boards'} setTask={false} />

            <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                width: '100%',
            }}>
                {boards.map((board, index) => (
                    <BoardThumbnailComponent key={index} board={board} />
                ))}
            </div>
        </div>

    );
}

export default BoardListPage;