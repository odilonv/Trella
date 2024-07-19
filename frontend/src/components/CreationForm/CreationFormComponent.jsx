import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import { Divider } from '@mui/material';

function CreationFormComponent({ theme, handleSubmit, name, description, setName, setDescription, selectedBoards = {}, setSelectedBoards }) {
    const boards = [
        { id: '1', name: 'Board 1' },
        { id: '2', name: 'Board 2' },
        { id: '3', name: 'Board 3' },
        { id: '4', name: 'Board 4' },
        { id: '5', name: 'Board 5' }
    ];

    const handleBoardSelectionChange = (event) => {
        const { value, checked } = event.target;
        setSelectedBoards(prev => ({
            ...prev,
            [value]: checked
        }));
    };

    return (
        <form onSubmit={handleSubmit}
            className='default-container'
            style={{
                display: "flex",
                height: "100%",
                margin: "15px",
                padding: "15px",
                gap: "30px",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                <h1>Create a new {theme}</h1>
                <Divider style={{ width: '80%' }} />
            </div>

            <div
                style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column', gap: '5px' }}
            >
                <label htmlFor="name">Title:</label>
                <input
                    className='default-input'
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div
                style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column', gap: '5px' }}
            >
                <label htmlFor="description">Description:</label>
                <textarea
                    style={{ minHeight: '100px' }}
                    className='default-input'
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            {
                theme === 'card' &&
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column',
                        gap: '10px',

                    }}>
                    <label htmlFor="selectedBoards">Assign this card to a board :</label>
                    {boards && boards.length > 0 ? (
                        boards.map((board) => (
                            <div key={board.id} >
                                <label>
                                    <input
                                        type="checkbox"
                                        value={board.id}
                                        checked={!!selectedBoards[board.id]}
                                        onChange={handleBoardSelectionChange}
                                    />
                                    {board.name}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>Loading boards...</p>
                    )}

                </div>
            }

            <ButtonComponent text={`Create ${theme}`} onClick={handleSubmit} margin='0' />
        </form>
    );
}

export default CreationFormComponent;
