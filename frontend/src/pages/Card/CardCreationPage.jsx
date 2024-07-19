import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreationFormComponent } from '../../components';
import {ApiBoards as ApiBoard} from "../../services/API/ApiBoards";
import { ApiBoards } from "../../services/API/ApiBoards";
import { ApiCards } from "../../services/API/ApiCards";

function CardCreationPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBoards, setSelectedBoards] = useState({});
    const [boards, setBoards] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            console.log("cc")
            const boardsData = await ApiBoard.getAllBoards();
            setBoards(boardsData);
            console.log('Boards:', boardsData)
        };
        fetchBoards();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedBoardIds = Object.keys(selectedBoards).filter(boardId => selectedBoards[boardId]);
        const firstSelectedBoardId = selectedBoardIds[0];
        let response = await ApiCards.createCard(name, description, firstSelectedBoardId);
        navigate('/boards');
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
            boards={boards}
        />
    );
}

export default CardCreationPage;