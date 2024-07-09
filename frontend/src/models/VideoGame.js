import cs2 from "../assets/images/games/cs2.bmp";
import valorant from "../assets/images/games/valorant.png";
import lol from "../assets/images/games/lol.png";
import lolWildRift from "../assets/images/games/lol-wild-rift.png";
import r6siege from "../assets/images/games/r6-siege.png";
import dota2 from "../assets/images/games/dota-2.png";
import codMw from "../assets/images/games/cod-mw.png";
import starcraft2 from "../assets/images/games/starcraft-2.svg";
import starcraft from "../assets/images/games/starcraft.png";
import ow from "../assets/images/games/ow.png";
import rl from "../assets/images/games/rl.png";
import unknown from "../assets/images/games/unknown.png";

class VideoGame {
    constructor(slug, name, imageUrl) {
        this.slug = slug;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    static getGameImage(gameName) {
        switch (gameName) {
            case 'cs-go':
                return cs2;
            case 'valorant':
                return valorant;
            case 'league-of-legends':
                return lol;
            case 'lol-wild-rift':
                return lolWildRift;
            case 'r6-siege':
                return r6siege;
            case 'dota-2':
                return dota2;
            case 'cod-mw':
                return codMw;
            case 'starcraft-2':
                return starcraft2;
            case 'starcraft-brood-war':
                return starcraft;
            case 'ow':
                return ow;
            case 'rl':
                return rl;
            default:
                console.error("image not found for " + gameName);
                return unknown;
        }
    }

    static fromJson(json) {
        return new VideoGame(json.slug, json.name, VideoGame.getGameImage(json.slug));
    }
}

export default VideoGame;