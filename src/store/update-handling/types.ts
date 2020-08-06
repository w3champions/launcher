export interface UpdateHandlingState {
  isUpdating: boolean,
  bnetPath: string,
  w3Path: string,
  mapsPath: string,
  localW3cVersion: string,
  onlineLauncherVersion: string,
  onlineW3cVersion: string,
  localLauncherVersion: string,
  news: News[],
  isUpdatingWebUI: boolean,
  isUpdatingMaps: boolean,
}

export interface News {
  date: string,
  message: string,
}
