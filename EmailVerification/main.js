
$(document).ready(function(){
    var url =new URL(document.URL);
    var email = url.searchParams.get("email");
    $('.email').text(email);
    $('#button-send').click(function () {
        $('.loading-button').fadeIn('slow');
        $(this).prop('disabled', true);
        sendEmailVerification(function () {
            $('.loading-button').fadeOut('slow');
            $(this).removeAttr("disabled");;
        })
    })
});