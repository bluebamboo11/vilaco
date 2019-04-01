(function ($) {
    "use strict";
    var input = $('.validate-input .input100');
    $('.validate-form').on('submit', function () {
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    });

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).val().trim() == '') {
            return false;
        }
        if ($(input).attr("name") === 'email' && $(input).val().indexOf('@') < 0) {
            return false;
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
    $('#input-reset').focus(function () {
        hideValidate(input);
    });
    $('#btn-reset').click(function () {
        var input = $('#input-reset');
        if (input.val().indexOf('@') < 0) {
            showValidate(input);
        }else {
            $('#exampleModalCenter').modal('hide')
            sendPasswordResetEmail(input.val(),function () {
              $.toast({
                  text:'Một email đã được gủi để tạo lại mật khâu',
                  hideAfter:false,
                  position:'top-left',
                  heading:'Gủi thành không',
                  icon: 'success',
                  showHideTransition: 'slide',
                  stack: false
              })
            },errorReset)
        }
    })
function errorReset(code) {
    switch (code) {
        case 'auth/invalid-email':
            $.toast(initToast("Email không hợp lệ"));
            break;
        case 'auth/user-not-found':
            $.toast(initToast("Email này chưa được đăng ký"));
            break;
    }
}
    function initToast(text) {
        return{
            text:text,
            hideAfter:false,
            position:'top-left',
            heading:'Lỗi tạo lại mật khẩu',
            icon: 'error',
            showHideTransition: 'slide',
            stack: false
        }
    }
})(jQuery);

