import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreationFormComponent } from '../../components';
import {ApiBoards} from "../../services/API/ApiBoards";
import {ApiCards} from "../../services/API/ApiCards";

function CardCreationPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const pathArray = window.location.pathname.split('/');
    const boardId = pathArray[pathArray.length - 3];
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await ApiCards.createCard(name, description, boardId);
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
            boardId={boardId} />
    );
}

export default CardCreationPage;