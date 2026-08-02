
# Bản quyền 2014 thuộc về các tác giả của Chromium
# Việc sử dụng mã nguồn này tuân theo giấy phép kiểu BSD, có thể được...
# được tìm thấy trong tệp LICENSE.
import ( "//build/config/features.gni" )
import ( "//build/config/ui.gni" )
import ( "//testing/test.gni" )
nếu ( là Android ) {  
  import ( "//build/config/android/config.gni" )
}
nếu ( is_mac ) {  
  import ( "//build/config/mac/rules.gni" )
}
nếu ( is_ios ) {  
  import ( "//build/config/apple/mobile_config.gni" ) # Dành cho `target_platform`  
}
thành phần ( "shell_dialogs" ) { 
  nguồn = [ 
    "base_shell_dialog.cc" ,
    "base_shell_dialog.h" ,
    "select_file_dialog.cc" ,
    "select_file_dialog.h" ,
    "select_file_dialog_factory.cc" ,
    "select_file_dialog_factory.h" ,
    "select_file_policy.cc" ,
    "select_file_policy.h" ,
    "selected_file_info.cc" ,
    "selected_file_info.h" ,
    "shell_dialogs_export.h" ,
  ]
  cấu hình += [ 
    "//build/config/compiler:wexit_time_destructors" ,
    "//build/config/compiler:wglobal_constructors" ,
  ]
  defines = [ "SHELL_DIALOGS_IMPLEMENTATION" ]   
  phụ thuộc = [ 
    "//căn cứ" ,
    "//base:i18n" ,
    "//build/config/linux/dbus:buildflags" ,
    "//skia" ,
    "//ui/base" ,
    "//ui/strings" ,
    "//url" ,
  ]
  nếu ( is_chromeos || is_castos ) {  
    sources += [ "shell_dialog_stub.cc" ]   
  }
  nếu ( là_linux && ! là_castos ) {   
    nguồn += [ 
      "select_file_dialog_linux.cc" ,
      "select_file_dialog_linux.h" ,
      "shell_dialog_linux.cc" ,
    ]
    deps += [ "//ui/linux:linux_ui" ]   
    nếu ( use_dbus ) {  
      nguồn += [ 
        "select_file_dialog_linux_portal.cc" ,
        "select_file_dialog_linux_portal.h" ,
      ]
      deps += [ 
        "//components/dbus" ,
        "//dbus" ,
        "//ui/views" ,
      ]
    }
  }
  nếu ( is_mac ) {  
    nguồn += [ 
      "select_file_dialog_mac.h" ,
      "select_file_dialog_mac.mm" ,
    ]
  }
  nếu ( is_ios ) {  
    nếu ( target_platform == "tvos" ) {   
      sources += [ "select_file_dialog_tvos.mm" ]   
    } khác {  
      nguồn += [ 
        "select_file_dialog_ios.h" ,
        "select_file_dialog_ios.mm" ,
      ]
    }
  }
  nếu ( is_win ) {  
    nguồn += [ 
      "auto_close_dialog_event_handler_win.cc" ,
      "auto_close_dialog_event_handler_win.h" ,
      "base_shell_dialog_win.cc" ,
      "base_shell_dialog_win.h" ,
      "execute_select_file_win.cc" ,
      "execute_select_file_win.h" ,
      "safe_accept_file_dialog_event_handler_win.cc" ,
      "safe_accept_file_dialog_event_handler_win.h" ,
      "select_file_dialog_win.cc" ,
      "select_file_dialog_win.h" ,
      "select_file_utils_win.h" ,
    ]
  }
  nếu ( use_aura ) {  
    nếu ( is_mac ) {  
      # Sẽ tự động được lọc bỏ trên các thiết bị không phải Mac.
      nguồn -= [ "select_file_dialog_mac.mm" ]   
    }
    deps += [ "//ui/aura" ]   
  }
  nếu ( là Android ) {  
    nguồn += [ 
      "select_file_dialog_android.cc" ,
      "select_file_dialog_android.h" ,
    ]
    deps += [ 
      "//ui/android" ,
      "//ui/base:select_file_dialog_jni_headers" ,
    ]
    include_dirs = [ "$root_gen_dir/ui" ]   
    libs = [ "jnigraphics" ]   
  }
  nếu ( is_mac ) {  
    khung = [ 
      "CoreServices.framework" ,
      "Foundation.framework" ,
      "AppKit.framework" ,
    ]
    deps += [ 
      "//components/remote_cocoa/app_shim" ,
      "//components/remote_cocoa/browser" ,
      "//components/remote_cocoa/common:mojo" ,
    ]
  }
  nếu ( là màu hồng cánh sen ) {  
    sources += [ "select_file_dialog_fuchsia.cc" ]   
  }
}
kiểm thử ( "shell_dialogs_unittests" ) { 
  chỉ kiểm thử = đúng 
  nguồn = [ 
    "run_all_unittests.cc" ,
    "select_file_dialog_unittest.cc" ,
  ]
  nếu ( is_mac ) {  
    sources += [ "select_file_dialog_mac_unittest.mm" ]   
    frameworks = [ "UniformTypeIdentifiers.framework" ]   
  }
  nếu ( is_win ) {  
    nguồn += [ 
      "select_file_dialog_win_unittest.cc" ,
      "select_file_utils_win_unittest.cc" ,
    ]
  }
  phụ thuộc = [ 
    ":shell_dialogs" ,
    "//căn cứ" ,
    "//base/test:test_support" ,
    "//mojo/core/embedder" ,
    "//testing/gtest" ,
    "//ui/base" ,
    "//ui/resources:ui_test_pak_data" ,
    "//ui/strings" ,
  ]
  nếu ( is_linux && ! is_castos && use_dbus ) {   
    sources += [ "select_file_dialog_linux_portal_unittest.cc" ]   
    deps += [ 
      "//components/dbus" ,
      "//dbus" ,
      "//dbus:test_support" ,
    ]
  }
  nếu ( is_mac ) {  
    deps += [ "//components/remote_cocoa/app_shim" ]   
  }
  # TODO: Xóa bỏ sau khi lỗi http://crbug.com/951419 được khắc phục.
  nếu ( là Android ) {  
    deps += [ "//ui/android:ui_java" ]   
  }
  nếu ( is_ios ) {  
    bó_deps = [ "//ui/resource:ui_test_pak_bundle_data" ]   
  }
}
source_set ( "test_support" ) { 
  chỉ kiểm thử = đúng 
  nguồn = [ 
    "fake_select_file_dialog.cc" ,
    "fake_select_file_dialog.h" ,
  ]
  public_deps = [ ":shell_dialogs" ]   
  phụ thuộc = [ 
    "//căn cứ" ,
    "//url" ,
  ]
}