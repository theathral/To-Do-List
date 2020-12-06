// Back to Top Button
$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
        $(".back-to-top").fadeIn();
    } else {
        $(".back-to-top").fadeOut();
    }
});

$(".back-to-top").on("click", function () {
    $("html, body").animate({scrollTop: 0}, 800);
    return false;
});
// #Back to Top Button


// Date Options
$(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    startDate: "0d",
    disableTouchKeyboard: true,
    maxViewMode: 1,
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
}).datepicker("setDate", "now");
// #Date Options


// function makeCard(note) {
//
//     switch (note.priority) {
//         case 'low':
//             makeCardLow(note);
//             break;
//         case 'medium':
//             makeCardMedium(note);
//             break;
//         case 'high':
//             makeCardHigh(note);
//             break;
//         case 'critical':
//             makeCardCritical(note);
//             break;
//         default:
//             throw DOMException;
//     }
// }
//
// function makeCardLow(note) {
//
// }
//
// function makeCardMedium(note) {
//
// }
//
// function makeCardHigh(note) {
//
// }
//
// function makeCardCritical(note) {
//
// }