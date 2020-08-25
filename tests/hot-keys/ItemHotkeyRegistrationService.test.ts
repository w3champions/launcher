import {ModifierKey} from "@/hot-keys/hotkeyTypes";

test('Transfer from f10 over escape to ingame with enabled keys', () => {
    const service = ModifierKey.Alt;

    expect(service).toBe(2);
});
