const { globalShortcut } = window.require("electron").remote;

export class ItemHotkeyRegisterer {
    public register() {
        globalShortcut.register('CommandOrControl+J', () => {
            console.log('CommandOrControl+J is pressed')
        })

        globalShortcut.register('J', () => {
            console.log('J is pressed')
        })

        console.log(globalShortcut.isRegistered('CommandOrControl+J'))
        console.log(globalShortcut.isRegistered('J'))
    }
}

