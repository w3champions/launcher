import {ClickCombination, ModifierKey} from "@/hot-keys/ItemHotkeys/hotkeyState";

export const comboAsString = (key: ClickCombination) => {
    const keys = [key.modifier !== ModifierKey.None ? ModifierKey[key.modifier] : null, key.hotKey.key].filter(f => f);
    return keys.join("+");
}

export const comboAsStringForDisplay = (key: ClickCombination) => {
    const keys = [key.modifier !== ModifierKey.None ? ModifierKey[key.modifier] : null, key.hotKey.uiDisplay].filter(f => f);
    return keys.join("+");
}
