import Team from "../models/Team.js";
import VideoGame from "../models/VideoGame.js";
import Match from "../models/Match.js";
import { getPastMatchesForTeamAndGame } from "./API/ApiMatches.js";
import { getTeamById } from "./API/ApiTeams.js";
import { getMatchById } from "./API/ApiMatches.js";

async function FillDatabaseFromAPI(matches) {
    for (let match of matches) {
        try {
            await FillDatabaseIfNecessary(match);
        } catch (error) {
            console.error(error);
        }
    }
}

async function FillDatabaseIfNecessary(match) {
    let videoGameFromDatabase = await VideoGame.getVideoGameBySlug(match.videoGame.slug);
    if (videoGameFromDatabase === null) {
        await match.videoGame.insert();
    }

    await FillMatchesForATeamFromAPIIfNecessary(match.team1, match.videoGame.slug);
    await FillMatchesForATeamFromAPIIfNecessary(match.team2, match.videoGame.slug);
}

async function FillMatchesForATeamFromAPIIfNecessary(teamFromApi, videoGameSlug) {
    let lastMatchesInDatabase = null;
    let team = await Team.getTeamById(teamFromApi.id);
    if (team === null) {
        console.log("Team not found in database");
        team = teamFromApi;
        team.slugVideoGame = videoGameSlug;
        team.winRate = 0;
        team.lastUpdateMatches = new Date();
        team.lastUpdateGlobalsInformations = null;
        await team.insert();
    } else {
        console.log("Team found in database");
        if (team.lastUpdateMatches === null) {
            console.log("Team lastUpdateMatches is null");
            team.lastUpdateMatches = new Date();
        }
        else {
            if ((new Date().getTime() - team.lastUpdateMatches.getTime()) < (24 * 60 * 60 * 1000)) { // 1 jour
                console.log("Team lastUpdateMatches is not null and less than 1 day");
                return team;
            } else {
                console.log("Team lastUpdateMatches is not null and more than 1 day, call DB for last matches");
                lastMatchesInDatabase = await team.getMatchesForAGame(videoGameSlug);
            }
        }
    }

    if ((new Date().getTime() - team.lastUpdateMatches.getTime()) > (60 * 60 * 1000)) { // 1 heure
        console.log("Team lastUpdateMatches is more than 1 hour, call API for last matches");
        let lastMatchesFromApi = await getPastMatchesForTeamAndGame(teamFromApi.id, videoGameSlug);
        if (lastMatchesInDatabase !== null) {
            for (let match of lastMatchesInDatabase) { // Suppression des matchs en double
                lastMatchesFromApi = lastMatchesFromApi.filter(m => m.id !== match.id);
            }
        }

        for (let match of lastMatchesFromApi) {
            if (match.team1.id === team.id) {
                await FillTeamIfNecessary(match.team2);
            } else {
                await FillTeamIfNecessary(match.team1);
            }
            await FillMatchIfNecessary(match);
        }

        team.lastUpdateMatches = new Date();
        await team.update();
    } else {
        console.log("Team lastUpdateMatches is less than 1 hour");
    }
    return team;
}

async function FillTeamIfNecessary(team) {
    let teamInstance = await Team.getTeamById(team.id);
    if (teamInstance === null) {
        await team.insert();
    }
}

async function FillVideoGameIfNecessary(videoGame) {
    let videoGameInstance = await VideoGame.getVideoGameBySlug(videoGame.slug);
    if (videoGameInstance === null) {
        await videoGame.insert();
    }
}

async function FillMatchIfNecessary(match) {
    let matchInstance = await Match.getMatchById(match.id);
    if (matchInstance === null) {
        await match.insert();
    }
}

async function FillTeamFromAPIIfNecessary(teamId) {
    let team = await Team.getGlobalsInformations(teamId);
    if (team !== null) {
        let lastUpdatePlayers = await team.lastUpdateGlobalsInformations;
        if (lastUpdatePlayers === null)
            team.lastUpdateGlobalsInformations = new Date();
        else {
            if ((new Date().getTime() - lastUpdatePlayers.getTime()) < (3 * 24 * 60 * 60 * 1000)) { // 3 jours 
                return team;
            } else {
                team.lastUpdateGlobalsInformations = new Date();
            }
        }
        let teamFromAPI = await getTeamById(teamId);
        await teamFromAPI.update(team);
        return teamFromAPI;
    }
    let teamFromAPI = await getTeamById(teamId);
    teamFromAPI.lastUpdateGlobalsInformations = new Date();
    await teamFromAPI.insert();
    return teamFromAPI;
}

async function FillMatchIfFinished(matchId) {
    let match = await Match.getMatchById(matchId);
    if (match === null) {
        let matchAPI = await getMatchById(matchId);
        if (matchAPI.status === 'finished') {
            await matchAPI.insert();
        }
        return matchAPI;
    }
    return match;
}

export { FillDatabaseIfNecessary as FillGamesForATeamFromAPIIfNecessary, FillDatabaseFromAPI, FillTeamFromAPIIfNecessary, FillMatchIfFinished };