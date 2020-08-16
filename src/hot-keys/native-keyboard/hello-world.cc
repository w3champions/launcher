#include <napi.h>

Napi::String SayHi(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  return Napi::String::New(env, "Hi!");
}

Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "sayHi"), Napi::Function::New(env, SayHi));
    return exports;
};

NODE_API_MODULE(hello_world, init);
