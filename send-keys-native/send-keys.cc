#include <iostream>
#include <Windows.h>
#include "send-keys.h"
#include <string>
#include <string>

#define VK_KEY_0    0x30 // '0' key
#define VK_KEY_1    0x31 // '1' key
#define VK_KEY_2    0x32 // '2' key
#define VK_KEY_3    0x33 // '3' key
#define VK_KEY_4    0x34 // '4' key
#define VK_KEY_5    0x35 // '5' key
#define VK_KEY_6    0x36 // '6' key
#define VK_KEY_7    0x37 // '7' key
#define VK_KEY_8    0x38 // '8' key
#define VK_KEY_9    0x39 // '9' key

#define VK_KEY_A    0x41 // 'A' key
#define VK_KEY_B    0x42 // 'B' key
#define VK_KEY_C    0x43 // 'C' key
#define VK_KEY_D    0x44 // 'D' key
#define VK_KEY_E    0x45 // 'E' key
#define VK_KEY_F    0x46 // 'F' key
#define VK_KEY_G    0x47 // 'G' key
#define VK_KEY_H    0x48 // 'H' key
#define VK_KEY_I    0x49 // 'I' key
#define VK_KEY_J    0x4A // 'J' key
#define VK_KEY_K    0x4B // 'K' key
#define VK_KEY_L    0x4C // 'L' key
#define VK_KEY_M    0x4D // 'M' key
#define VK_KEY_N    0x4E // 'N' key
#define VK_KEY_O    0x4F // 'O' key
#define VK_KEY_P    0x50 // 'P' key
#define VK_KEY_Q    0x51 // 'Q' key
#define VK_KEY_R    0x52 // 'R' key
#define VK_KEY_S    0x53 // 'S' key
#define VK_KEY_T    0x54 // 'T' key
#define VK_KEY_U    0x55 // 'U' key
#define VK_KEY_V    0x56 // 'V' key
#define VK_KEY_W    0x57 // 'W' key
#define VK_KEY_X    0x58 // 'X' key
#define VK_KEY_Y    0x59 // 'Y' key
#define VK_KEY_Z    0x5A // 'Z' key

int main()
{
    if (RegisterHotKey(
        NULL,
        1,
        MOD_CONTROL,
        VK_KEY_Q))  //0x42 is 'b'
    {
        printf_s(("Hotkey 'CTRL+q' registered\n"));
    }

    if (RegisterHotKey(
        NULL,
        2,
        MOD_CONTROL,
        VK_KEY_W))  //0x42 is 'b'
    {
        printf_s(("Hotkey 'CTRL+w' registered\n"));
    }

    MSG msg = { 0 };
    while (GetMessage(&msg, NULL, 0, 0) != 0)
    {
        if (msg.message == WM_HOTKEY)
        {
            ReleaseLControl();

            switch (msg.message)
            {
            case WM_HOTKEY:
                if (msg.wParam == 1)
                {
                    printf_s("Ctrl + q received\n");

                    PressNum8();
                }
                else if (msg.wParam == 2)
                {
                    printf_s("Ctrl + w received\n");

                    PressNum7();
                }
            }

            HoldLControl();
        }
    }

    return 0;
}

void ReleaseModifier(UINT modifier)
{
    INPUT ipModifer;
    ipModifer.type = INPUT_KEYBOARD;
    ipModifer.ki.time = 0;
    ipModifer.ki.dwExtraInfo = 0;
    ipModifer.ki.wVk = modifier;
    ipModifer.ki.dwFlags = KEYEVENTF_KEYUP;
    SendInput(1, &ipModifer, sizeof(INPUT));
}

void ReleaseLControl() { ReleaseModifier(VK_LCONTROL); }
void ReleaseLAlt() { ReleaseModifier(VK_LMENU); }

void HoldModifier(UINT modifier)
{
    INPUT ipModifer;
    ipModifer.type = INPUT_KEYBOARD;
    ipModifer.ki.time = 0;
    ipModifer.ki.dwExtraInfo = 0;
    ipModifer.ki.wVk = modifier;

    ipModifer.ki.wScan = MapVirtualKey(modifier, MAPVK_VK_TO_VSC);
    ipModifer.ki.dwFlags = KEYEVENTF_SCANCODE;
    SendInput(1, &ipModifer, sizeof(INPUT));
}

void HoldLControl() { HoldModifier(VK_LCONTROL); }
void HoldLAlt() { HoldModifier(VK_LMENU); }

void PressKey(UINT key)
{
    INPUT ip;
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = MapVirtualKey(key, MAPVK_VK_TO_VSC);
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;
    ip.ki.wVk = key;
    ip.ki.dwFlags = KEYEVENTF_SCANCODE;

    SendInput(1, &ip, sizeof(INPUT));

    ip.ki.dwFlags = KEYEVENTF_KEYUP;
    SendInput(1, &ip, sizeof(INPUT));
}

void PressNum8() { PressKey(VK_NUMPAD8); }
void PressNum7() { PressKey(VK_NUMPAD7); }
void PressNum5() { PressKey(VK_NUMPAD5); }
void PressNum4() { PressKey(VK_NUMPAD4); }
void PressNum2() { PressKey(VK_NUMPAD2); }
void PressNum1() { PressKey(VK_NUMPAD1); }
void PressNumlock() { PressKey(VK_NUMLOCK); }


