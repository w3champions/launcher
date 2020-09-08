import {ItemHotkeyRegistrationService} from "@/hot-keys/ItemHotkeyRegistrationService";
import {ModifierKey} from "@/hot-keys/hotkeyTypes";
import {ITEM_TOP_LEFT} from "@/hot-keys/keyValuesRobotJs";

test('Transfer from f10 over escape to ingame with enabled keys', () => {
    const service = new ItemHotkeyRegistrationService();

    service.registerKey({ key: ITEM_TOP_LEFT, combo: { modifier: ModifierKey.None, hotKey: { key: "a", uiDisplay: "a"} } })
});
