import { IFloNode, IFloPing } from "./types";

export enum EFloWorkerEventTypes {
    ClientInfo = 'ClientInfo',
    ListNodes = 'ListNodes',
    PlayerSession = 'PlayerSession',
    PlayerSessionUpdate = 'PlayerSessionUpdate',
    PingUpdate = 'PingUpdate',
    Disconnect = 'Disconnect',
    GameStatusUpdate = 'GameStatusUpdate',
    CurrentGameInfo = 'CurrentGameInfo',
    GameSlotClientStatusUpdate = 'GameSlotClientStatusUpdate',
    WatchGameError = 'WatchGameError',
    WatchGame = 'WatchGame',
}

export interface IFloWorkerEvent {
    type: EFloWorkerEventTypes;
}

export interface IListNodesEvent extends IFloWorkerEvent {
    nodes: IFloNode[];
}

export interface IPingUpdate extends IFloWorkerEvent {
    ping_map: { [id: string]: IFloPing };
}

export enum EPlayerStatus {
    Idle = 'Idle',
    InGame = 'InGame'
}

// Player session
export interface IPlayerSessionPlayer {
    id: number;
    name: string;
}

export interface IPlayerSession extends IFloWorkerEvent {
    player: IPlayerSessionPlayer;
    status: EPlayerStatus;
    game_id: number;
}

export interface IPlayerSessionUpdate extends IFloWorkerEvent {
    status: EPlayerStatus;
    game_id: number;
}

// Game status update
export enum EGameStatus {
    Created = 'Created',
    Waiting = 'Waiting',
    Loading = 'Loading',
    Running = 'Running',
    Ended = 'Ended'
}

export enum EPlayerGameStatus {
    Pending = 'Pending',
    Connected = 'Connected',
    Joined = 'Joined',
    Loaded = 'Loaded',
    Disconnected = 'Disconnected',
    Left = 'Left'
}

export interface IGameStatusUpdate extends IFloWorkerEvent {
    game_id: number;
    status: EGameStatus;
    updated_player_game_client_status_map: {
        [player_id: string]: EPlayerGameStatus
    };
}

export interface ICurrentGameInfo extends IFloWorkerEvent {
    id:          number;
    name:        string;
    status:      string;
    map:         IMap;
    slots:       ISlot[];
    node:        INode;
    is_private:  boolean;
    is_live:     boolean;
    random_seed: number;
    created_by:  IPlayerSessionPlayer;
}

export interface IGameSlotClientStatusUpdate extends IFloWorkerEvent {
    game_id: number,
    player_id: number,
    status: string
}

export interface IMap {
    sha1:     number[];
    checksum: number;
    path:     string;
}

export interface INode {
    id:         number;
    name:       string;
    location:   string;
    ip_addr:    string;
    country_id: string;
}

export interface ISlot {
    player:        IPlayerSessionPlayer | null;
    settings:      ISlotSettings;
    client_status: string;
}
export interface ISlotSettings {
    team:     number;
    color:    number;
    computer: string;
    handicap: number;
    status:   ESlotStatus;
    race:     string;
}

export enum ESlotStatus {
    Occupied = "Occupied",
    Open = "Open",
}
