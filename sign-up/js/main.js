(function ($) {
    var isValid = false;
    $('#date_picker_birth').datepicker(
        {
            language: "vi",
            autoclose: true
        }
    );
    $('#icon-look').hover(function () {
        $('#pass').get(0).type = 'text'
    }, function () {
        $('#pass').get(0).type = 'password'
    });
    $('#pass').keyup(function () {
        CheckPassword(this)
    });
    $('#register-form').submit(function (event) {
        event.preventDefault();
        if (isValid) {
            startLoad();
            var useData = converArrayToMap($(this).serializeArray())
            createUser(useData.email, useData.password, function () {
                sendEmailVerification(function (use) {
                    addStudent(use.uid, ClassBo(useData.name, useData.birth_day, useData.address, useData.code, useData.phone, useData.gender), function () {
                        window.location.href = "/vilaco/EmailVerification/EmailVerification.html?email=" + use.email;
                    });
                })
            }, saveError)
        }
    });

    function saveError(code) {
        endLoad()
        switch (code) {
            case 'auth/email-already-in-use':
                $.toast(initToast("Email đã được sử dụng. Vui lòng sử dụng email khác"));
                break;
            case 'auth/invalid-email':
                $.toast(initToast("Email không hợp lệ. Vui lòng sử dụng email khác"));
                break;
            case 'auth/operation-not-allowed':
                $.toast(initToast("Hiện không thể đăng ký. Liên hệ với quản lý để biết thêm chi tiết"));
                break;
            case 'auth/weak-password':
                $.toast(initToast("Mật khẩu không đủ mạnh. Vui lòng sử dung mật khẩu khác"));
                break;
        }
    }

    function initToast(text) {
     return{
         text:text,
         hideAfter:false,
         position:'top-left',
         heading:'Lỗi tạo tài khoản',
         icon: 'error',
         showHideTransition: 'slide'
     }
    }
    function startLoad() {
        $('.loading-button').fadeIn('slow');
        $('#submit').prop('disabled', true);
    }
   function endLoad() {
       $('.loading-button').fadeOut('slow');
       $('#submit').removeAttr('disabled');
   }

    function CheckPassword(inputtxt) {
        var paswd = /^[a-zA-Z0-9!@#$%^&*]{7,20}$/;
        if (inputtxt.value.match(paswd)) {
            $(inputtxt).removeClass('error-pass')
            isValid = true;
        } else {
            isValid = false;
            $(inputtxt).addClass('error-pass')
        }
    }

    function converArrayToMap(array) {
        var map = {};
        array.forEach(function (value) {
            map[value.name] = value.value
        });
        return map;
    }

})(jQuery);