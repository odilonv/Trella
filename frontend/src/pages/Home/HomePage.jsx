import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Slider from "react-slick";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {
    ButtonComponent,
    HeadTextComponent,
    LargeFooterComponent,
    MatchComponent,
    TeamSpanComponent
} from '../../components';
import Loader from '../../components/Loaders/LoaderMatch.jsx';
import { getRunningMatches, getUpcomingMatches } from '../../services/API/ApiMatches.js';
import valorant from '../../assets/images/covers/Valorant.png'
import csgo from '../../assets/images/covers/CSGO.jpg'
import LoL from '../../assets/images/covers/LoL.jpeg'
import kc from '../../assets/images/logo/karmine_corp.svg'
import g2 from '../../assets/images/logo/g2_esports.png'
import gm from '../../assets/images/logo/gentle-mates.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Divider } from '@mui/material';
import { getLoggedUser, isLogged } from "../../services/API/ApiUserSession";

function HomePage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentSlide, setCurrentSlide] = React.useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const slides = useMemo(() => [
        { image: csgo, alt: "CS:GO", buttonText: "CS:GO", gameSlug: 'cs-go' },
        { image: valorant, alt: "Valorant", buttonText: "Valorant", gameSlug: 'valorant' },
        { image: LoL, alt: "LoL", buttonText: "League Of Legends", gameSlug: 'league-of-legends' },
    ], []);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        beforeChange: (current, next) => {
            setCurrentSlide((next + 1) % 3);
            updateFilteredMatches(slides[(next + 1) % 3].gameSlug);
        },
    };


    useEffect(() => {
        async function fetchData() {
            if (await isLogged()) {
                setCurrentUser(await getLoggedUser())
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        async function fetchData() {
            const runningMatches = await getRunningMatches();
            const upcomingMatches = await getUpcomingMatches();
            const allMatches = [...runningMatches, ...upcomingMatches];
            setMatches(allMatches);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    const [filteredMatches, setFilteredMatches] = useState([]);
    const updateFilteredMatches = useCallback((gameSlug) => {
        const newFilteredMatches = matches.filter(match => match.videoGame.slug === gameSlug).slice(0, 3);
        setFilteredMatches(newFilteredMatches);
    }, [matches]);

    useEffect(() => {
        updateFilteredMatches(slides[currentSlide].gameSlug);
    }, [currentSlide, slides, updateFilteredMatches]);

    return (
        <div className='home-page'>
            <section>
                <div className='home-head-block'>
                    <ButtonComponent
                        text={'Je commence à parier'}
                        borderRadius={'25px'}
                        endIcon={<ArrowForwardIosRoundedIcon style={{ color: "white" }} />}
                        href={'/matches'}
                    />
                    {currentUser ? <HeadTextComponent
                        titleText={<span>Salut {currentUser.firstName}, ton <strong
                            style={{ color: 'var(--main-purple)' }}>loot</strong> t'attend !</span>}
                        firstSubText={"Tu veux suivre un jeu en particulier ?"}
                        secondSubText={"Sois le premier fan d'e-sport à passer à la vitesse supérieure."} /> :
                        <HeadTextComponent
                            titleText={<span>Choisis ton jeu, ton équipe et <strong
                                style={{ color: 'var(--main-purple)' }}>paris</strong> !</span>}
                            firstSubText={"Tu veux suivre un jeu en particulier ?"}
                            secondSubText={"Fais ton propre choix et lance toi dans l'aventure weLoot."} />}
                </div>
            </section>
            <section>
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={currentSlide === index ? "slider-image-container center" : "slider-image-container"}>
                            <div className="slider-inner-container">
                                <img src={slide.image} className='slider-img' alt={slide.alt} />
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="bounced-text"><span>➔</span></div>
            </section>
            <section>
                <HeadTextComponent titleText={'Matchs à venir'} />
                {isLoading ? (
                    <Loader nbMatches={3} />
                ) : (
                    filteredMatches.map((match) => (
                        <MatchComponent match={match} key={match.id} />
                    ))
                )
                }
                <ButtonComponent
                    text={'Voir plus de matchs'}
                    href={"/matches"}
                    textColor={'black'}
                    color={'white'}
                    endIcon={<ArrowForwardIosRoundedIcon style={{ fill: 'black' }} />} />
                <Divider sx={{ marginTop: "5%" }} flexItem />

            </section>
            <section>
                <HeadTextComponent titleText={'Equipes'}
                    firstSubText={'Choisis une équipe e-sport qui te ressemble !'}
                    secondSubText={'Deviens un vrai fan et ne manque plus aucun match.'}
                    style={{ marginBottom: '10px' }}
                />
                <TeamSpanComponent imgPath={kc} colorButton={'var(--main-purple)'} iconButton={<ArrowForwardIosRoundedIcon style={{ color: "white" }} />}
                    textButton={'Choisir'} title={'Karmine Corp'} />
                <Divider variant={'middle'} sx={{ margin: "10px 30%" }} flexItem />
                <TeamSpanComponent imgPath={g2} colorButton={'var(--main-purple)'} iconButton={<ArrowForwardIosRoundedIcon style={{ color: "white" }} />}
                    textButton={'Choisir'} title={'G2 Esports'} />
                <Divider variant={'middle'} sx={{ margin: "10px 30%" }} flexItem />
                <TeamSpanComponent imgPath={gm} colorButton={'var(--main-purple)'} iconButton={<ArrowForwardIosRoundedIcon style={{ color: "white" }} />}
                    textButton={'Choisir'} title={'Gentle Mates'} />
                <ButtonComponent
                    text={'Voir toutes les équipes'}
                    href={"/teams"}
                    textColor={'black'}
                    color={'white'}
                    endIcon={<ArrowForwardIosRoundedIcon style={{ fill: 'black' }} />} />
            </section>
            <section>
            </section>
            <LargeFooterComponent />
        </div>
    );
}

export default HomePage;