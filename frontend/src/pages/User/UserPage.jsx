import React, { useEffect, useState, useContext } from 'react';
import { ButtonComponent, ModalComponent, UserInfoComponent, UserInfoEntryComponent } from '../../components';
import { getLoggedUser, logout, requireLoggedUser } from '../../services/API/ApiUserSession';
import UserInfoCategoryComponent from "../../components/UserInfo/UserInfoCategoryComponent";
import { Divider, IconButton } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import IdentityIcon from '@mui/icons-material/PersonRounded';
import ContactIcon from '@mui/icons-material/CallRounded';
import SecurityIcon from '@mui/icons-material/LockRounded';
import LimitsIcon from '@mui/icons-material/PanToolRounded';
import PreferencesIcon from '@mui/icons-material/TuneRounded';
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
                    console.error('Erreur lors de la récupération du user :', error);
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    return (
        <form>
            <div className={"user-categories-container"}>
                <div className="user-categories default-container" id="user-categories">
                    <UserInfoCategoryComponent entryLabel="Identité" icon={<IdentityIcon />} />
                    <Divider />
                    <UserInfoCategoryComponent entryLabel="Contact" icon={<ContactIcon />} />
                    <Divider />
                    <UserInfoCategoryComponent entryLabel="Sécurité" icon={<SecurityIcon />} />
                    <Divider />
                    <UserInfoCategoryComponent entryLabel="Limites" icon={<LimitsIcon />} />
                    <Divider />
                    <UserInfoCategoryComponent entryLabel="Préférences" icon={<PreferencesIcon />} />
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
                                        key="civility"
                                        entryLabel="Civilité"
                                        entryValue={user.civility} />,
                                    <UserInfoEntryComponent
                                        key="firstName"
                                        entryLabel="Prénom"
                                        entryValue={user.firstName} />,
                                    <UserInfoEntryComponent
                                        key="lastName"
                                        entryLabel="Nom"
                                        entryValue={user.lastName} />,
                                    <UserInfoEntryComponent
                                        key="dateOfBirth"
                                        entryLabel="Date de naissance"
                                        entryValue={formatDate(user.dateOfBirth)}
                                    />,
                                    <UserInfoEntryComponent
                                        key="countryOfBirth"
                                        entryLabel="Pays de naissance"
                                        entryValue={user.countryOfBirth}
                                    />,
                                    <UserInfoEntryComponent
                                        key="cityOfBirth"
                                        entryLabel="Ville de naissance"
                                        entryValue={user.cityOfBirth}
                                    />
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
                                    <UserInfoEntryComponent
                                        key="phoneNumber"
                                        entryLabel="Téléphone"
                                        entryValue={user.phoneNumber}
                                    />,
                                    <UserInfoEntryComponent
                                        key="address"
                                        entryLabel="Adresse"
                                        entryValue={user.address} />,
                                    <UserInfoEntryComponent
                                        key="complementAddress"
                                        entryLabel="Complément d'adresse"
                                        entryValue={user.complementAddress} />,
                                    <UserInfoEntryComponent
                                        key="city"
                                        entryLabel="Ville"
                                        entryValue={user.city} />,
                                ]
                            }
                        />
                        <UserInfoComponent
                            key="security"
                            headerText="Sécurité"
                            value={
                                [
                                    <div className="password-container">
                                        <UserInfoEntryComponent
                                            key="password"
                                            entryLabel="Mot de passe"
                                            entryValue={<IconButton
                                                style={{ color: 'var(--black)' }}
                                                href="/changePassword"><LockResetRoundedIcon /></IconButton>}
                                        />
                                    </div>
                                ]
                            }
                        />
                        <UserInfoComponent
                            key="limits"
                            headerText="Limites"
                            value={
                                [
                                    <UserInfoEntryComponent
                                        key="depositLimit"
                                        entryLabel="Limite de dépôt"
                                        entryValue={user.depositLimit}
                                    />,
                                    <UserInfoEntryComponent
                                        key="betLimit"
                                        entryLabel="Limite de pari"
                                        entryValue={user.betLimit}
                                    />,
                                    <UserInfoEntryComponent
                                        key="automaticWithdraw"
                                        entryLabel="Retrait automatique"
                                        entryValue={user.automaticWithdraw}
                                    />,
                                    <UserInfoEntryComponent
                                        key="selfExclusion"
                                        entryLabel={<ButtonComponent text={"Auto exclusion"} color={"var(--main-purple)"}
                                            entryValue={user.selfExclusion ? "Enabled" : "Disabled"}
                                            textColor={'var(--white)'}
                                            fontWeight={400} />}
                                    />,
                                ]
                            }
                        />

                        <UserInfoComponent
                            key="preferences"
                            headerText="Préférences"
                            value={
                                [
                                    <UserInfoEntryComponent
                                        key="currency"
                                        entryLabel="Monnaie"
                                        entryValue={user.currency}
                                    />,
                                    <UserInfoEntryComponent
                                        key="timezone"
                                        entryLabel="Fuseau horaire"
                                        entryValue={user.timezone}
                                    />,
                                    <UserInfoEntryComponent
                                        key="theme"
                                        entryLabel="Thème"
                                        entryValue={user.theme}
                                    />,
                                    <UserInfoEntryComponent
                                        key="receiveOffers"
                                        entryLabel="Recevoir des offres"
                                        entryValue={user.receiveOffers}
                                    />,
                                ]
                            }
                        />
                        <h5>Tu souhaites rectifier des informations ? Merci de contacter le service client.</h5>
                    </>
                ) : null}
            </div>
            <ModalComponent open={isModalVisible} handleClose={() => setIsModalVisible(false)} />
        </form>
    );
}

export default UserPage;
