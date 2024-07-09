import DatabaseConnection from "./DatabaseConnection.js";
import Match from "./Match.js";
import Player from "./Player.js";
import { FillGamesForATeamFromAPIIfNecessary } from "../services/FillDatabaseFromAPI.js";

class Team {
    static tableName = `team`;

    constructor(id, name, imageUrl, slugVideoGame, location, winRate, lastUpdateMatches, modifiedAt, lastUpdateGlobalsInformations) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.slugVideoGame = slugVideoGame;
        this.location = location;
        this.winRate = winRate;
        this.modifiedAt = modifiedAt;
        this.lastUpdateMatches = lastUpdateMatches;
        this.lastUpdateGlobalsInformations = lastUpdateGlobalsInformations;
    }

    static fromJson(json) {
        let game = json.game ? json.game.name : null;
        let team = new Team(json.id, json.name, json.image_url, game, json.location, null, null, new Date(json.modified_at), null);
        if (json.players !== undefined) {
            let players = [];
            for (let player of json.players) {
                players.push(Player.fromJson(player));
            }
            team.players = players;
        }
        return team;
    }

    static async fromDatabase(teamInDatabase) {
        let game = teamInDatabase.game ? teamInDatabase.game : null;
        let team = new Team(teamInDatabase.id, teamInDatabase.name, teamInDatabase.imageUrl, game, teamInDatabase.location, teamInDatabase.winRate, new Date(teamInDatabase.lastUpdateMatches), new Date(teamInDatabase.modifiedAt), new Date(teamInDatabase.lastUpdateGlobalsInformations));
        if (teamInDatabase.players !== undefined) {
            team.players = [];
            for (let player of teamInDatabase.players) {
                team.players.push(Player.fromDatabase(player));
            }
        }
        if (teamInDatabase.past_matches !== undefined) {
            team.past_matches = [];
            for (let match of teamInDatabase.past_matches) {
                team.past_matches.push(await Match.fromDatabase(match));
            }
        }
        return team;
    }

    static async getAll() {
        const connection = await DatabaseConnection.getInstance();
        let teams = await connection.execute('SELECT * FROM ' + this.tableName);
        let teamsArray = [];
        for (let team of teams[0]) {
            teamsArray.push(await Team.fromDatabase(team));
        }
        return teamsArray;
    }

    static async getTeamById(id) {
        try {
            const connection = await DatabaseConnection.getInstance();
            const result = await connection.execute('SELECT * FROM ' + this.tableName + ' WHERE id = ?', [id]);

            if (result[0].length === 0) {
                return null;
            }
            return await Team.fromDatabase(result[0][0]);
        } catch (error) {
            console.error('Error in getTeamById:', error);
            throw error;
        }
    }

    /**
     * Get the team, its players and the 50 last matches for a team
     */
    static async getGlobalsInformations(idTeam) {
        try {
            let fieldsPlayer = Player.fields.map(field => `'${field}', p.${field}`).join(', ');
            let fieldsMatch = Match.fields.map(field => `'${field}', m.${field}`).join(', ');

            const connection = await DatabaseConnection.getInstance();

            let request = `SELECT   t.id,
                                    t.name,
                                    t.imageUrl,
                                    t.slugVideoGame,
                                    t.location,
                                    t.modifiedAt,
                                    t.lastUpdateMatches,
                                    t.lastUpdateGlobalsInformations,

                                  IFNULL(
                                          (SELECT JSON_ARRAYAGG(
                                                          JSON_OBJECT(
                                                                  ${fieldsPlayer}
                                                          )
                                                  )
                                           FROM ${Player.tableName} p
                                           WHERE p.idTeam = t.id),
                                        JSON_ARRAY()
                                        )                                         
                                    AS players,
                                  IFNULL(
                                          (SELECT JSON_ARRAYAGG(
                                                          JSON_OBJECT(
                                                                  ${fieldsMatch}
                                                          )
                                                  )
                                           FROM ${Match.tableName} m
                                           WHERE m.idTeam1 = t.id
                                              OR m.idTeam1 = t.id
                                           ORDER BY m.beginAt
                                                   DESC LIMIT 50 ),
                                        JSON_ARRAY()
                                        ) 
                                    AS past_matches
                           FROM team t
                           WHERE t.id = ?;`;

            const [rows] = await connection.execute(request, [idTeam]);

            if (rows.length == 0) {
                return null;
            }

            let team = await Team.fromDatabase(rows[0]);
            return team;
        } catch (error) {
            console.error('Error in getTeamAndPlayersById:', error);
            throw error;
        }
    }

    /**
     * Insert the team in the database
     */
    async insert() {
        let request;
        try {
            let connection = await DatabaseConnection.getInstance();
            request = `INSERT INTO ${Team.tableName} 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await connection.execute(request,
                [this.id, this.name, this.imageUrl, this.slugVideoGame, this.location, this.winRate, this.lastUpdateMatches, this.modifiedAt, this.lastUpdateGlobalsInformations]);
            if (this.players !== undefined) {
                for (let player of this.players) {
                    await player.insert(this.id);
                }
            }
        } catch (error) {
            console.error('Error in insert:', error);
            // console.log('Request:', request);
            // console.log('Team:', this);
            throw error;
        }
    }

    /**
     * Update the team in the database
     * @param {Team} teamInDatabase the team in the database
     */
    async update(teamInDatabase) {
        let fieldsWhoseChanged = [];
        if (teamInDatabase === null || teamInDatabase === undefined) {
            fieldsWhoseChanged = ['name', 'imageUrl', 'slugVideoGame', 'location', 'lastUpdateMatches', 'modifiedAt', 'lastUpdateGlobalsInformations'];
        }
        else {
            if (this.name !== teamInDatabase.name) {
                fieldsWhoseChanged.push('name');
            }
            if (this.imageUrl !== teamInDatabase.imageUrl) {
                fieldsWhoseChanged.push('imageUrl');
            }
            if (this.slugVideoGame !== teamInDatabase.slugVideoGame) {
                fieldsWhoseChanged.push('slugVideoGame');
            }
            if (this.location !== teamInDatabase.location) {
                fieldsWhoseChanged.push('location');
            }
            // if (this.winRate !== teamInDatabase.winRate) {
            //     fieldsWhoseChanged.push('winRate');
            // }  NE PAS METTRE A JOUR LE WINRATE, IL EST CALCULE A PARTIR DES MATCHS
            if (this.lastUpdateMatches !== teamInDatabase.lastUpdateMatches) {
                fieldsWhoseChanged.push('lastUpdateMatches');
            }
            if (this.modifiedAt !== teamInDatabase.modifiedAt) {
                fieldsWhoseChanged.push('modifiedAt');
            }
            if (this.lastUpdateGlobalsInformations !== teamInDatabase.lastUpdateGlobalsInformations) {
                fieldsWhoseChanged.push('lastUpdateGlobalsInformations');
            }
        }

        let playersToAdd = [];
        let playersToRemove = [];

        if (this.players !== undefined) {
            for (let player of this.players) {
                let playerInDatabase = teamInDatabase.players.find(p => p.id === player.id);
                if (playerInDatabase === undefined) {
                    playersToAdd.push(player);
                }
            }

            for (let playerInDatabase of teamInDatabase.players) {
                let player = this.players.find(p => p.id === playerInDatabase.id);
                if (player === undefined) {
                    playersToRemove.push(playerInDatabase);
                }
            }
        }

        try {
            let connection = await DatabaseConnection.getInstance();
            if (fieldsWhoseChanged.length !== 0) {
                await connection.execute(`UPDATE ${Team.tableName}
                                          SET ${fieldsWhoseChanged.map(field => `${field} = ?`).join(', ')}
                                          WHERE id = ?`, [...fieldsWhoseChanged.map(field => this[field] !== undefined ? this[field] : null), this.id]);
            }
            for (let player of playersToAdd) {
                await player.insert(this.id);
            }
            for (let player of playersToRemove) {
                await player.delete();
            }
        } catch (error) {
            console.error('Error in update:', error);
            throw error;
        }
    }

    /**
     * Get the 50 last matches for a team and a video game
     * @param {string} slugVideoGame the slug of the video game
     * @param {number} teamId the id of the team
     * @return an array of 50 last matches
     */
    async getMatchesForAGame(slugVideoGame) {
        try {
            let connection = await DatabaseConnection.getInstance();
            let matches = await connection.execute('SELECT * FROM ' + Match.tableName + ' WHERE idTeam1 = ? OR idTeam2 = ? AND slugVideoGame = ? ORDER BY beginAt DESC LIMIT 50', [this.id, this.id, slugVideoGame]);
            let matchesArray = [];
            for (let match of matches[0]) {
                matchesArray.push(await Match.fromDatabase(match));
            }
            return matchesArray;
        } catch (error) {
            console.error('Error in getMatchesForAGame:', error);
            throw error;
        }
    }

    async getWinRate() {
        try {
            let connection = await DatabaseConnection.getInstance();
            let winRate = await connection.execute('SELECT winRate FROM ' + Team.tableName + ' WHERE id = ?', [this.id]);
            if (winRate[0].length === 0) {
                return null;
            }
            return winRate[0][0].winRate;
        }
        catch (error) {
            console.error('Error in getWinRateForAGame:', error);
            throw error;
        }
    }
}

export default Team;