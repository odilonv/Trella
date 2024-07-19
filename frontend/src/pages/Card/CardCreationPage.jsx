import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreationFormComponent } from '../../components';

function CardCreationPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBoards, setSelectedBoards] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Exemple: await createBoard({ name, description });
        console.log('Board created:', { name, description });
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
            selectedBoards={selectedBoards} />
    );
}

export default CardCreationPage;