export interface UpdateHandlingState {
  isUpdating: boolean,
  bnetPath: string,
  w3Path: string,
  mapsPath: string,
  w3cVersion: string,
  onlineLauncherVersion: string,
  onlineW3cVersion: string,
  currentW3cVersion: string,
  currentLauncherVersion: string,
  news: News[],
  isUpdatingWebUI: boolean,
  isUpdatingMaps: boolean,
}

export interface News {
  date: string,
  message: string,
}
