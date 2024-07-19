import React, { useEffect, useState, useContext } from 'react';
import { ModalComponent, UserInfoComponent, UserInfoEntryComponent } from '../../components';
import { getLoggedUser, logout, requireLoggedUser } from '../../services/API/ApiUserSession';
import UserInfoCategoryComponent from "../../components/User/UserInfoCategoryComponent";
import { Divider } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import IdentityIcon from '@mui/icons-material/PersonRounded';
import ContactIcon from '@mui/icons-material/CallRounded';
import SecurityIcon from '@mui/icons-material/LockRounded';
import { UserContext } from "../../contexts/UserContext";


function UserPage() {
    const { user, setUser } = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (await requireLoggedUser()) {
                try {
                    const loggedUser = await getLoggedUser();
                    setUser(loggedUser);
                } catch (error) {
                    //console.error('Erreur lors de la récupération du user :', error);
                }
            }
        };
        fetchUser();
    }, [setUser]);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    };

    const handleDeleteAccount = () => {
        setIsModalVisible(true);
    };

    return (
        <form>
            <div className={"user-categories-container"}>
                <div className="user-categories default-container" id="user-categories">
                    <UserInfoCategoryComponent entryLabel="Identité" icon={<IdentityIcon />} />
                    <Divider />
                    <UserInfoCategoryComponent entryLabel="Contact" icon={<ContactIcon />} />
                </div>
                <div className="manage-account-container">
                    <div className="manage-account-button" onClick={handleLogout}>Se déconnecter<LogoutRoundedIcon />
                    </div>
                    <div className="manage-account-button delete-account" onClick={handleDeleteAccount}>Supprimer
                        mon compte<HighlightOffRoundedIcon /></div>
                </div>
            </div>
            <div className="user-info-container">
                {user ? (
                    <>
                        <UserInfoComponent
                            key="identity"
                            headerText="Identité"
                            value={
                                [
                                    <UserInfoEntryComponent
                                        key="firstName"
                                        entryLabel="Prénom"
                                        entryValue={user.firstName} />,
                                    <UserInfoEntryComponent
                                        key="lastName"
                                        entryLabel="Nom"
                                        entryValue={user.lastName} />,
                                ]
                            }
                        />
                        <UserInfoComponent
                            key="contact"
                            headerText="Contact"
                            value={
                                [
                                    <UserInfoEntryComponent
                                        key="email"
                                        entryLabel="Email"
                                        entryValue={user.email}
                                    />,
                                ]
                            }
                        />
                    </>
                ) : null}
            </div>
            <ModalComponent open={isModalVisible} handleClose={() => setIsModalVisible(false)} />
        </form>
    );
}

export default UserPage;
