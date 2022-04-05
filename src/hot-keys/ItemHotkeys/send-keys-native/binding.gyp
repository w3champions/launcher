{
     "variables": {
        "openssl_fips" : "0" 
    },
    'targets': [
      {
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "include_dirs" : [
          "<!@(node -p \"require('node-addon-api').include\")"
        ],
        "target_name": "send-keys-native",
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
        'conditions': [
          ['OS=="win"', {
            "sources": [ "send-keys-win.cc" ],
          },
          'OS=="mac"', {
            "sources": [ "send-keys-osx.cc" ],
          },
          { # OS == "linux",
            "sources": [ "send-keys-linux.cc" ],
          }]
        ],
      },
    ],
  }
