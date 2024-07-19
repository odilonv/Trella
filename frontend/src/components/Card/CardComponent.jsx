import React, { useState } from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { ApiCards } from '../../services/API/ApiCards';

function CardComponent({ card, colorTitleText, colorSubText, assignCard = false }) {
    // État pour savoir si nous sommes en mode édition
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description || '');

    const [textAreaHeight, setTextAreaHeight] = useState('auto');

    const handleDescriptionChange = (event) => {
        const textareaLineHeight = 24; // Ajustez cette valeur selon votre style
        setDescription(event.target.value);

        const textarea = event.target;
        textarea.style.height = 'auto'; // Réinitialiser la hauteur pour obtenir la hauteur correcte du scroll
        const newHeight = `${textarea.scrollHeight}px`;
        setTextAreaHeight(newHeight);
    };

    // Fonction pour basculer le mode édition
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Fonction pour gérer les changements dans les champs de texte
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
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
            }}>
            <div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {isEditing ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '30px',
                            }}>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                style={{
                                    fontSize: '0.9em',
                                    fontWeight: '600',
                                    width: '100%',
                                    height: '100%',
                                    color: colorTitleText ?? 'var(--black)',
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                }}
                            />
                            <button
                                onClick={handleSave}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    color: 'var(--black)',
                                    fontSize: '1em'
                                }}
                            >
                                <SaveRoundedIcon style={{ fill: 'var(--black)', cursor: 'pointer', fontSize: '1em' }} />
                            </button>
                        </div>
                    ) : (

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '30px',
                            }}>
                            <h1 style={{
                                fontSize: '0.9em',
                                fontWeight: '600',
                                lineHeight: '108%',
                                width: '100%',
                                color: colorTitleText ?? 'var(--black)'
                            }}>{title}</h1>
                            <button
                                onClick={handleEditClick}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    color: 'var(--black)',
                                    fontSize: '1.2em'
                                }}
                            >
                                <EditRoundedIcon style={{ fill: 'var(--black)', cursor: 'pointer', fontSize: '0.8em' }} />
                            </button>

                        </div>
                    )}

                    {isEditing ? (
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{
                                fontSize: '0.7em',
                                fontWeight: 'initial',
                                textAlign: 'left',
                                color: 'var(--black)',
                                border: 'none',
                                resize: 'none',
                                background: 'transparent',
                                width: '100%',
                                minHeight: '35px',
                                height: textAreaHeight,
                            }}
                        />
                    ) : (
                        card.description && <h5
                            onChange={handleDescriptionChange}
                            style={{
                                fontSize: '0.7em',
                                fontWeight: 'initial',
                                textAlign: 'left',
                                color: colorSubText ?? 'var(--black)',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                minHeight: '35px',
                                height: textAreaHeight,
                            }}>{description}</h5>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardComponent;
