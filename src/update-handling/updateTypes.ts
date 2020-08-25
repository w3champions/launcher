export interface UpdateHandlingState {
  isUpdating: boolean,
  bnetPath: string,
  w3Path: string,
  mapsPath: string,
  localW3cVersion: string,
  onlineW3cVersion: string,
  localLauncherVersion: string,
  isUpdatingWebUI: boolean,
  isUpdatingMaps: boolean,
  w3PathIsInvalid: boolean,
  bnetPathIsInvalid: boolean,
  isTeamColorsEnabled: boolean,
}
