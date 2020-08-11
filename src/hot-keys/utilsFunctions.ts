import {ClickCombination, ModifierKey} from "@/hot-keys/hotkeyTypes";

export const combiAsString = (key: ClickCombination) => {
    const keys = [key.modifier !== ModifierKey.None ? ModifierKey[key.modifier] : null, key.hotKey].filter(f => f);
    return keys.join("+");
}
