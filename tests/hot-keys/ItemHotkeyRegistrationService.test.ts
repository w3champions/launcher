import {InGameState, NotInGameState} from "@/hot-keys/HotKeyStateMachine";

test('Transfer from f10 over escape to ingame with enabled keys', () => {
    const service = new NotInGameState()
        .enterGame()
        .pressF10()
        .pressEscape();

    expect(service.constructor.name).toBe(InGameState.name);
});
