import React, { useEffect, useState } from 'react';
import { BoardThumbnailComponent, HeadBarComponent } from '../../components';
import { ApiBoards as BoardAPI } from "../../services/API/ApiBoards";
import { getLoggedUser, requireLoggedUser } from "../../services/API/ApiUserSession";

function BoardListPage() {
    const [boards, setBoards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBoards = async () => {
            await requireLoggedUser();
            const user = await getLoggedUser();
            if (!user) return console.error("User not logged in");
            const userId = user.id;
            const fetchedBoards = await BoardAPI.getBoardsByUserId(userId);
            setBoards(Array.isArray(fetchedBoards) ? fetchedBoards : [fetchedBoards]);
            setIsLoading(false);
        };

        fetchBoards();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                flexDirection: 'column',
                margin: "15px"
            }}>
            <HeadBarComponent title={'Boards'} setCard={false} />

            <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                width: '100%',
            }}>
                {boards.map((board, index) => (
                    console.log(board),
                    <BoardThumbnailComponent key={index} board={board} />
                ))}
            </div>
        </div>

    );
}

export default BoardListPage;