#pragma once

enum keys
{
    Num8 = VK_NUMPAD8,
    Num7 = VK_NUMPAD7,
    Num6 = VK_NUMPAD6,
    Num5 = VK_NUMPAD5,
    Num4 = VK_NUMPAD4,
    Num3 = VK_NUMPAD3,
};

enum modifiers
{
    LCtrl = VK_LCONTROL,
    Alt = VK_MENU
};

void PressKey(keys key);
void ReleaseModifier(modifiers modifier);
void HoldModifier(modifiers modifier);
