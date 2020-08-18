#include <napi.h>
#include <iostream>
#include <string>
#include <ApplicationServices/ApplicationServices.h>

#define VK_SPACE    0x31 // space key
#define VK_ENTER    0x24 // enter key
#define VK_ESCAPE   0x35 // escape key
#define VK_F01      0x7A // f1 key
#define VK_F02      0x78 // f2 key
#define VK_F03      0x63 // f3 key
#define VK_F10      0x6D // f10 key
#define VK_F12      0x6F // f12 key

#define VK_LCTRL    0x3B // f12 key
#define VK_LCMD     0x37 // f12 key
#define VK_LALT     0x3A // f12 key
#define VK_LSHIFT   0x38 // f12 key

#define VK_NUM1     0x53 // f12 key
#define VK_NUM2     0x54 // f12 key
#define VK_NUM4     0x56 // f12 key
#define VK_NUM5     0x57 // f12 key
#define VK_NUM7     0x59 // f12 key
#define VK_NUM8     0x5B // f12 key

Napi::Boolean ReleaseModifier(int modifier)
{
    CGEventSourceRef src = CGEventSourceCreate(kCGEventSourceStateHIDSystemState);
    CGEventRef evt = CGEventCreateKeyboardEvent(src, (CGKeyCode) modifier, false);
    CGEventPost (kCGHIDEventTap, evt);
    CFRelease (evt); CFRelease (src);
    return Napi::Boolean();
}

Napi::Boolean ReleaseLControl(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LCTRL); }
Napi::Boolean ReleaseLAlt(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LALT); }
Napi::Boolean ReleaseLShift(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LSHIFT); }
Napi::Boolean ReleaseLCmd(const Napi::CallbackInfo& info) { return ReleaseModifier(VK_LCMD); }

Napi::Boolean HoldModifier(int modifier)
{
    CGEventSourceRef src = CGEventSourceCreate(kCGEventSourceStateHIDSystemState);
    CGEventRef evt = CGEventCreateKeyboardEvent(src, (CGKeyCode) modifier, true);
    CGEventPost (kCGHIDEventTap, evt);
    CFRelease (evt); CFRelease (src);
    return Napi::Boolean();
}

Napi::Boolean HoldLControl(const Napi::CallbackInfo& info) { return HoldModifier(VK_LCTRL); }
Napi::Boolean HoldLAlt(const Napi::CallbackInfo& info) { return HoldModifier(VK_LALT); }
Napi::Boolean HoldLShift(const Napi::CallbackInfo& info) { return HoldModifier(VK_LSHIFT); }
Napi::Boolean HoldLCmd(const Napi::CallbackInfo& info) { return HoldModifier(VK_LCMD); }

Napi::Boolean PressKey(int key)
{
    HoldModifier(key);
    ReleaseModifier(key);
    return Napi::Boolean();
}

Napi::Boolean PressNum8(const Napi::CallbackInfo& info) { return PressKey(VK_NUM8); }
Napi::Boolean PressNum7(const Napi::CallbackInfo& info) { return PressKey(VK_NUM7); }
Napi::Boolean PressNum5(const Napi::CallbackInfo& info) { return PressKey(VK_NUM5); }
Napi::Boolean PressNum4(const Napi::CallbackInfo& info) { return PressKey(VK_NUM4); }
Napi::Boolean PressNum2(const Napi::CallbackInfo& info) { return PressKey(VK_NUM2); }
Napi::Boolean PressNum1(const Napi::CallbackInfo& info) { return PressKey(VK_NUM1); }
Napi::Boolean PressNumlock(const Napi::CallbackInfo& info) { return Napi::Boolean(); }
Napi::Boolean PressSpace(const Napi::CallbackInfo& info) { return PressKey(VK_SPACE); }

Napi::Boolean PressEnter(const Napi::CallbackInfo& info) { return PressKey(VK_ENTER); }
Napi::Boolean PressEscape(const Napi::CallbackInfo& info) { return PressKey(VK_ESCAPE); }
Napi::Boolean PressF10(const Napi::CallbackInfo& info) { return PressKey(VK_F10); }
Napi::Boolean PressF12(const Napi::CallbackInfo& info) { return PressKey(VK_F12); }

Napi::Boolean PressF1(const Napi::CallbackInfo& info) { return PressKey(VK_F01); }
Napi::Boolean PressF2(const Napi::CallbackInfo& info) { return PressKey(VK_F02); }
Napi::Boolean PressF3(const Napi::CallbackInfo& info) { return PressKey(VK_F03); }


Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "pressNum1"), Napi::Function::New(env, PressNum1));
    exports.Set(Napi::String::New(env, "pressNum2"), Napi::Function::New(env, PressNum2));
    exports.Set(Napi::String::New(env, "pressNum4"), Napi::Function::New(env, PressNum4));
    exports.Set(Napi::String::New(env, "pressNum5"), Napi::Function::New(env, PressNum5));
    exports.Set(Napi::String::New(env, "pressNum7"), Napi::Function::New(env, PressNum7));
    exports.Set(Napi::String::New(env, "pressNum8"), Napi::Function::New(env, PressNum8));

    exports.Set(Napi::String::New(env, "pressNumLock"), Napi::Function::New(env, PressNumlock));
    exports.Set(Napi::String::New(env, "pressSpace"), Napi::Function::New(env, PressSpace));

    exports.Set(Napi::String::New(env, "pressEnter"), Napi::Function::New(env, PressEnter));
    exports.Set(Napi::String::New(env, "pressEscape"), Napi::Function::New(env, PressEscape));
    exports.Set(Napi::String::New(env, "pressF10"), Napi::Function::New(env, PressF10));
    exports.Set(Napi::String::New(env, "pressF12"), Napi::Function::New(env, PressF12));

    exports.Set(Napi::String::New(env, "pressF1"), Napi::Function::New(env, PressF1));
    exports.Set(Napi::String::New(env, "pressF2"), Napi::Function::New(env, PressF2));
    exports.Set(Napi::String::New(env, "pressF3"), Napi::Function::New(env, PressF3));

    exports.Set(Napi::String::New(env, "holdCtrl"), Napi::Function::New(env, HoldLControl));
    exports.Set(Napi::String::New(env, "holdAlt"), Napi::Function::New(env, HoldLAlt));
    exports.Set(Napi::String::New(env, "holdShift"), Napi::Function::New(env, HoldLShift));
    exports.Set(Napi::String::New(env, "holdCmd"), Napi::Function::New(env, HoldLCmd));
    exports.Set(Napi::String::New(env, "releaseCtrl"), Napi::Function::New(env, ReleaseLControl));
    exports.Set(Napi::String::New(env, "releaseAlt"), Napi::Function::New(env, ReleaseLAlt));
    exports.Set(Napi::String::New(env, "releaseShift"), Napi::Function::New(env, ReleaseLShift));
    exports.Set(Napi::String::New(env, "releaseCmd"), Napi::Function::New(env, ReleaseLCmd));

    return exports;
};

NODE_API_MODULE(send_keys_native, init);
