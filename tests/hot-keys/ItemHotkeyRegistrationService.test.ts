import {NotInGameState} from "@/hot-keys/HotKeyStateMachine";
// @ts-ignore
window = {
    require: require
};

test('Transfer from f10 over escape to ingame with enabled keys', () => {
    const service = new NotInGameState()
        .enterGame()
        .pressF10()
        .pressEscape();

    expect(service.keysActivated()).toBe(true);
});
