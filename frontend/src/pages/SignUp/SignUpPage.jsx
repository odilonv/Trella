import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, CircularProgress, Backdrop } from '@mui/material';
import { ButtonComponent, RadioButtonComponent, InputComponent, PasswordCreationComponent } from '../../components';
import { register, requireGuestUser } from "../../services/API/ApiUserSession";
import { useNotification } from '../../contexts/NotificationContext';
import { checkPassword, checkAge, checkIsEmail, checkIsPhoneNumber, checkOnlyAlphabets } from '../../services/utils/ValidateUtils';
import { getAllCountries } from '../../services/API/ApiCountries';

function SignUpPage() {
    const { triggerNotification } = useNotification();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        civility: '',
        lastName: '',
        firstName: '',
        dateOfBirth: '',
        countryOfBirth: '',
        cityOfBirth: '',
        email: '',
        phoneNumber: '',
        address: '',
        complementAddress: '',
        city: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        receiveOffers: false,
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        async function fetchData() {
            await requireGuestUser();
        }
        fetchData();
    }, []);

    const handleTermsAcceptedChange = (event) => setUser(prevUser => ({
        ...prevUser,
        termsAccepted: event.target.checked
    }));
    const handleReceiveOffersChange = (event) => setUser(prevUser => ({
        ...prevUser,
        receiveOffers: event.target.checked
    }));

    const validateStep1 = () => {
        return ['Monsieur', 'Madame'].includes(user.civility) &&
            checkOnlyAlphabets(user.lastName) === null && // Modification ici
            checkOnlyAlphabets(user.firstName) === null && // Modification ici
            checkAge(user.dateOfBirth) === null &&
            countriesList.some(countryOfBirth => countryOfBirth.name === user.countryOfBirth) &&
            citySuggestions.includes(user.cityOfBirth);
    };


    const validateStep2 = () => {
        return checkIsEmail(user.email) == null && checkIsPhoneNumber(user.phoneNumber) == null
            && addressSuggestions.includes(user.address)
            && citySuggestions.includes(user.city);
    };

    const validateStep3 = () => {
        return checkPassword(user.password) == null && user.password === user.confirmPassword
            && user.termsAccepted;
    };

    const handleNext = () => {
        let isValidStep = false;
        if (currentStep === 0) {
            isValidStep = validateStep1();
        } else if (currentStep === 1) {
            isValidStep = validateStep2();
        } else if (currentStep === 2) {
            isValidStep = validateStep3();
        }

        if (isValidStep) {
            setCurrentStep(currentStep + 1);
        } else {
            triggerNotification('Veuillez corriger les champs invalides.', 'error');
        }
    };

    const handleSignUp = async () => {
        if (!validateStep3()) {
            triggerNotification('Veuillez corriger les champs invalides.', 'error');
            return;
        }

        setIsLoading(true);

        try {
            const response = await register(user);
            const json = await response.json();
            if (response.status === 200) {
                triggerNotification('Inscription réussie, un email de vérification a été envoyé', 'success');
                navigate('/login');
            } else {
                triggerNotification(json.error, 'error');
            }
        } catch (error) {
            console.error(error);
            triggerNotification('Une erreur s\'est produite', 'error');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const [countriesList, setCountriesList] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const countriesArray = await getAllCountries();
            setCountriesList(countriesArray);
        }
        fetchData();
    }, []);

    let [citySuggestions, setCitySuggestions] = useState([]);
    const fetchCitySuggestions = async (query) => {
        if (query.length > 2) {
            try {
                const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${query}&fields=departement&boost=population&limit=5`);
                const data = await response.json();
                setCitySuggestions(data.map(city => `${city.nom} (${city.code})`));
            } catch (error) {
                console.error(error);
            }
        } else {
            setCitySuggestions([]);
        }
    };

    let [addressSuggestions, setAddressSuggestions] = useState([]);
    const fetchAddressSuggestions = async (query) => {
        if (query.length > 2) {
            try {
                const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`);
                const data = await response.json();
                setAddressSuggestions(data.features.map(address => address.properties.label));
            } catch (error) {
                console.error(error);
            }
        } else {
            setAddressSuggestions([]);
        }
    };

    const handleCityChange = (event) => {
        const query = event;
        setUser(prevUser => ({ ...prevUser, cityOfBirth: query }));
        fetchCitySuggestions(query);
    };

    const progressBarStyle = {
        width: `${(currentStep + 1) * (100 / 3)}%`
    };

    return (
        <div className="page">
            <div className="login-container default-container">
                <h1 style={{ textAlign: 'center' }}>Inscription</h1>
                <form style={{ minWidth: '100%' }}>
                    <div className="progress-info" style={{ textAlign: 'center' }}>
                        Étape {currentStep + 1}/3
                    </div>
                    <div className="progress-bar" style={{ textAlign: 'center' }}>
                        <div className="progress" style={progressBarStyle}></div>
                    </div>
                    <div className="form-wrapper">
                        {currentStep === 0 && (
                            <>
                                <InputComponent
                                    label="Civilité"
                                    validators={[(value) => !['Monsieur', 'Madame'].includes(value)]}
                                    value={user.civility}
                                    setValue={(value) => setUser({ ...user, civility: value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    select
                                >
                                    <option value="" disabled hidden>
                                        Sélectionner une civilité
                                    </option>
                                    <option value="Monsieur" style={{ color: 'black' }}>
                                        Monsieur
                                    </option>
                                    <option value="Madame" style={{ color: 'black' }}>
                                        Madame
                                    </option>
                                </InputComponent>
                                <InputComponent
                                    label="Nom"
                                    validators={[checkOnlyAlphabets]}
                                    value={user.lastName}
                                    setValue={(value) => setUser({ ...user, lastName: value })}
                                />
                                <InputComponent
                                    label="Prénom"
                                    validators={[checkOnlyAlphabets]}
                                    value={user.firstName}
                                    setValue={(value) => setUser({ ...user, firstName: value })}
                                />
                                <InputComponent
                                    type="date"
                                    label="Date de naissance (dd/mm/aaaa)"
                                    value={user.dateOfBirth}
                                    setValue={(value) => setUser({ ...user, dateOfBirth: value })}
                                    validators={[checkAge]}
                                />
                                <InputComponent
                                    label="Pays de naissance"
                                    value={user.countryOfBirth}
                                    setValue={(value) => setUser({ ...user, countryOfBirth: value })}
                                    validators={[(value) => !countriesList.some(countryOfBirth => countryOfBirth.name === value)]}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    select
                                >
                                    <option value="" disabled hidden>
                                        Sélectionner un pays
                                    </option>
                                    {countriesList.map((countryOfBirth, index) => (
                                        <option key={index} value={countryOfBirth.name} style={{ color: 'black' }}>
                                            {countryOfBirth.name}
                                        </option>
                                    ))}
                                </InputComponent>
                                <InputComponent
                                    label="Ville de naissance"
                                    value={user.cityOfBirth}
                                    setValue={(value) => setUser({ ...user, cityOfBirth: value })}
                                    onChangeCallback={handleCityChange}
                                    validators={[(value) => !citySuggestions.includes(value)]}
                                    type="text"
                                    suggestions={citySuggestions}
                                />
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                                <InputComponent
                                    label="Email"
                                    validators={[checkIsEmail]}
                                    value={user.email}
                                    setValue={(value) => setUser({ ...user, email: value })}
                                />
                                <InputComponent
                                    label="Numéro de téléphone"
                                    validators={[checkIsPhoneNumber]}
                                    value={user.phoneNumber}
                                    setValue={(value) => setUser({ ...user, phoneNumber: value })}
                                />
                                <InputComponent
                                    label="Adresse"
                                    validators={[() => !addressSuggestions.includes(user.address)]}
                                    value={user.address}
                                    onChangeCallback={fetchAddressSuggestions}
                                    suggestions={addressSuggestions}
                                    setValue={(value) => setUser({ ...user, address: value })}
                                />
                                <InputComponent
                                    label="Complément d'adresse (optionnel)"
                                    validators={[]}
                                    required={false}
                                    value={user.complementAddress}
                                    setValue={(value) => setUser({ ...user, complementAddress: value })}
                                />
                                <InputComponent
                                    label="Ville"
                                    value={user.city}
                                    setValue={(value) => setUser({ ...user, city: value })}
                                    onChangeCallback={handleCityChange}
                                    validators={[(value) => !citySuggestions.includes(value)]}
                                    type="text"
                                    suggestions={citySuggestions}
                                />
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <PasswordCreationComponent
                                    password={user.password}
                                    confirmPassword={user.confirmPassword}
                                    setPassword={(value) => setUser({ ...user, password: value })}
                                    setConfirmPassword={(value) => setUser({ ...user, confirmPassword: value })}
                                />
                                <TextField
                                    className='custom-textfield'
                                    type="text"
                                    label="Code parrainage (optionnel)"
                                />
                                <TextField
                                    className='custom-textfield'
                                    type="text"
                                    label="Code promo (optionnel)"
                                />
                                <div style={{ marginTop: '16px' }}>
                                    <RadioButtonComponent
                                        label="Je certifie avoir plus de 18 ans. J'ai lu et j'accepte les Conditions Générales et la Charte sur le Respect de la Vie Privée"
                                        checked={user.termsAccepted}
                                        onChange={handleTermsAcceptedChange}
                                    />
                                </div>
                                <div style={{ marginTop: '8px', marginBottom: '16px' }}>
                                    <RadioButtonComponent
                                        label="J'accepte de recevoir les offres spéciales et informations de la part de trella"
                                        checked={user.receiveOffers}
                                        onChange={handleReceiveOffersChange}
                                    />
                                </div>
                                <h5 style={{ textAlign: 'center' }}>
                                    La saisie de fausses informations, ou l'utilisation de l'identité d'autrui entraîne une suppression du compte et le blocage de l'argent déposé.
                                </h5>
                            </>
                        )}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {currentStep > 0 && (
                            <ButtonComponent onClick={() => setCurrentStep(currentStep - 1)} text={'Précédent'} style={{ marginRight: '15px' }} />
                        )}
                        {currentStep < 2 && (
                            <ButtonComponent onClick={handleNext} text={'Suivant'}
                                preventValidation={(currentStep === 0 && !validateStep1()) ||
                                    (currentStep === 1 && !validateStep2())
                                } />
                        )}
                        {currentStep === 2 && (
                            <ButtonComponent onClick={handleSignUp} type={'submit'} text={"S'inscrire"}
                                preventValidation={!validateStep3() || !user.termsAccepted} />
                        )}
                    </div>
                </form>
                <Backdrop open={isLoading} style={{ zIndex: 10000 }}>
                    <CircularProgress style={{ color: 'var(--main-color)' }} size={100} />
                </Backdrop>
            </div >
        </div >
    );
}

export default SignUpPage;
