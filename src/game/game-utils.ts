import { ICurrentPlayer } from './game.types';

export class GameUtils {
    public static getEnumArray<T = number>(myEnum: any): Array<T> {
        const arr = Object.keys(myEnum).map(key => Number(key)).filter(key => !isNaN(key));
        if (arr.length > 0) {
            return arr as any as Array<T>;
        }
        // is used, if the enum is not number based
        return Array.from(Object.keys(myEnum)) as any as Array<T>;
    }

    public static getPlayerFromUrl(url: string): ICurrentPlayer | undefined {
        const parts = url.split('?');
        if (parts.length < 2 || parts[1] == undefined || parts[1].trim().length == 0) {
            return undefined;
        }

        try {
            return JSON.parse(decodeURI(parts[1]).replace(/%23/, '#'));
        } catch (e) {
            return undefined;
        }
    }

    public static decodeBattleTag(battleTag: string): string {
        return (!battleTag) ? '' : decodeURI(battleTag).replace(/%23/, '#');
    }

    public static encodeBattleTag(battleTag: string): string {
        return (!battleTag) ? '' : encodeURI(battleTag).replace(/#/, '%23');
    }
}