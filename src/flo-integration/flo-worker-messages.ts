import { IFloNode, IFloPing } from "./types";

export enum EFloWorkerEventTypes {
    ClientInfo = 'ClientInfo',
    ListNodes = 'ListNodes',
    PlayerSession = 'PlayerSession',
    PlayerSessionUpdate = 'PlayerSessionUpdate',
    PingUpdate = 'PingUpdate',
    Disconnect = 'Disconnect',
    GameStatusUpdate = 'GameStatusUpdate'
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
    Left = 'Left'
}

export interface IGameStatusUpdate extends IFloWorkerEvent {
    game_id: number;
    status: EGameStatus;
    [updated_player_game_client_status_map: number]: EPlayerGameStatus;
}