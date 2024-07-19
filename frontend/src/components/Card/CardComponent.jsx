import React, { useState } from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import EditIcon from '@mui/icons-material/Edit';
import { ApiCards } from '../../services/API/ApiCards';

function CardComponent({ card, colorTitleText, colorSubText, assignCard = false }) {
    // État pour savoir si nous sommes en mode édition
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description || '');

    // Fonction pour basculer le mode édition
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Fonction pour gérer les changements dans les champs de texte
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    // Fonction pour sauvegarder les modifications
    const handleSave = () => {
        // Logique pour sauvegarder les modifications, par exemple appeler une API ou mettre à jour le parent
        setIsEditing(false);
        ApiCards.updateCard(card.id, title, description, card.board_id, card.state);
    };

    return (
        <div
            className='default-container'
            style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'start',
                width: '100%',
                padding: '15px',
                backgroundColor: 'var(--light-color)',
                overflowY: 'auto',
                overflowX: 'hidden',
                wordWrap: 'break-word',
                position: 'relative' // Ajouté pour positionner le bouton d'édition
            }}>
            <div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    gap: '20px',
                }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <h1 style={{
                        fontSize: '0.9em',
                        fontWeight: '600',
                        lineHeight: '110%',
                        width: '100%',
                        color: colorTitleText ?? 'var(--black)'
                    }}>{card.title}</h1>
                    <EditRoundedIcon style={{ fill: 'var(--black)', cursor: 'pointer', fontSize: '1em' }} />
                </div>
                {
                    card.description && <h5 style={{
                        fontSize: '0.7em',
                        fontWeight: 'initial',
                        textAlign: 'left',
                        color: colorSubText ?? 'var(--black)',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}>{card.description}</h5>
                }
            </div>

            {assignCard && (
                <ButtonComponent text={'Assign to'} endIcon={<DashboardCustomizeRoundedIcon style={{ fill: 'white' }} />} />
            )}

            {/* Bouton d'édition */}
            <button
                onClick={handleEditClick}
                style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--black)',
                    fontSize: '1.2em'
                }}
            >
                <EditIcon />
            </button>

            {isEditing && (
                <button
                    onClick={handleSave}
                    style={{
                        position: 'absolute',
                        bottom: '15px',
                        right: '15px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: 'var(--black)',
                        fontSize: '1em'
                    }}
                >
                    Save
                </button>
            )}
        </div>
    );
}

export default CardComponent;
