#include <napi.h>
#include <iostream>
#include <Windows.h>
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


Napi::Boolean ReleaseModifier(UINT modifier)
{
    INPUT ipModifer;
    ipModifer.type = INPUT_KEYBOARD;
    ipModifer.ki.time = 0;
    ipModifer.ki.dwExtraInfo = 0;
    ipModifer.ki.wVk = modifier;
    ipModifer.ki.dwFlags = KEYEVENTF_KEYUP;
    SendInput(1, &ipModifer, sizeof(INPUT));

    return Napi::Boolean::Boolean();
}

Napi::Boolean ReleaseLControl(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LCONTROL); }
Napi::Boolean ReleaseLAlt(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LMENU); }

Napi::Boolean HoldModifier(UINT modifier)
{
    INPUT ipModifer;
    ipModifer.type = INPUT_KEYBOARD;
    ipModifer.ki.time = 0;
    ipModifer.ki.dwExtraInfo = 0;
    ipModifer.ki.wVk = modifier;

    ipModifer.ki.wScan = MapVirtualKey(modifier, MAPVK_VK_TO_VSC);
    ipModifer.ki.dwFlags = KEYEVENTF_SCANCODE;
    SendInput(1, &ipModifer, sizeof(INPUT));

    return Napi::Boolean::Boolean();
}

Napi::Boolean HoldLControl(const Napi::CallbackInfo& info) { return HoldModifier(VK_LCONTROL); }
Napi::Boolean HoldLAlt(const Napi::CallbackInfo& info) { return HoldModifier(VK_LMENU); }

Napi::Boolean PressKey(UINT key)
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

    return Napi::Boolean::Boolean();
}

Napi::Boolean PressNum8(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD8); }
Napi::Boolean PressNum7(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD7); }
Napi::Boolean PressNum5(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD5); }
Napi::Boolean PressNum4(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD4); }
Napi::Boolean PressNum2(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD2); }
Napi::Boolean PressNum1(const Napi::CallbackInfo& info) { return PressKey(VK_NUMPAD1); }
Napi::Boolean PressNumlock(const Napi::CallbackInfo& info) { return PressKey(VK_NUMLOCK); }


Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "pressNum1"), Napi::Function::New(env, PressNum1));
    exports.Set(Napi::String::New(env, "pressNum2"), Napi::Function::New(env, PressNum2));
    exports.Set(Napi::String::New(env, "pressNum4"), Napi::Function::New(env, PressNum4));
    exports.Set(Napi::String::New(env, "pressNum5"), Napi::Function::New(env, PressNum5));
    exports.Set(Napi::String::New(env, "pressNum7"), Napi::Function::New(env, PressNum7));
    exports.Set(Napi::String::New(env, "pressNum8"), Napi::Function::New(env, PressNum8));
    return exports;
};

NODE_API_MODULE(send_keys_native, init);
