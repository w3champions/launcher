import {ClickCombination, ModifierKey} from "@/hot-keys/ItemHotkeys/hotkeyState";

export const combiAsString = (key: ClickCombination) => {
    const keys = [key.modifier !== ModifierKey.None ? ModifierKey[key.modifier] : null, key.hotKey.key].filter(f => f);
    return keys.join("+");
}

export const combiAsStringForDisplay = (key: ClickCombination) => {
    const keys = [key.modifier !== ModifierKey.None ? ModifierKey[key.modifier] : null, key.hotKey.uiDisplay].filter(f => f);
    return keys.join("+");
}
