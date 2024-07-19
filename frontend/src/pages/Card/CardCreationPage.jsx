import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreationFormComponent } from '../../components';
import { ApiCards } from "../../services/API/ApiCards";

function CardCreationPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBoards, setSelectedBoards] = useState({});
    const [boardId, setBoards] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            // from url
            let urlBoardId = window.location.pathname.split('/').pop();
            setBoards(urlBoardId);
        };
        fetchBoards();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ApiCards.createCard(name, description, boardId);
        navigate('/boards/' + boardId);
    };

    return (
        <CreationFormComponent
            theme={"card"}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            setSelectedBoards={setSelectedBoards}
            selectedBoards={selectedBoards}
        />
    );
}

export default CardCreationPage;