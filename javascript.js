// Back to Top Button
$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
        $(".back-to-top").fadeIn();
    } else {
        $(".back-to-top").fadeOut();
    }
});

$(".back-to-top").on("click", function () {
    $("html, body").animate({scrollTop: 0}, 1000);
    return false;
});
// #Back to Top Button


// Date Options
$(".datepicker").flatpickr({
    enableTime: true,
    dateFormat: "d-m-Y H:i",
    minDate: 'today',
    defaultDate: 'today',
    time_24hr: true,
    weekNumbers: true,
});

// #Date Options


// Make Card
function makeCard(note) {
    let bg_color = ''
    let text_color = ''

    switch (note.priority) {
        case 'low':
            bg_color = 'bg-success';
            text_color = 'text-white';
            break;
        case 'medium':
            bg_color = 'bg-info';
            text_color = 'text-white';
            break;
        case 'high':
            bg_color = 'bg-warning';
            text_color = 'text-dark';
            break;
        case 'critical':
            bg_color = 'bg-danger';
            text_color = 'text-white';
            break;
        default:
            throw DOMException;
    }

    if (note.status === 'finished')
        return makeFinishedCard(note, bg_color, text_color);
    else if (note.status === 'in_progress')
        return makeInProgressCard(note, bg_color, text_color);
    else
        return makeWorkingCard(note, bg_color, text_color);

}

function makeInProgressCard(note, bg_color, text_color) {
    return $('<div/>').addClass('col-lg-6').append(
        makeWorkingCard(note, bg_color, text_color)
    )
}

function makeWorkingCard(note, bg_color, text_color) {
    return $('<div/>').addClass(['card', bg_color, text_color, 'mb-3']).append(
        $('<h5/>').addClass('card-header')
            .append(note.title),
        $('<div/>').addClass('card-body').append(
            $('<h6/>').addClass('card-text').html('Status: ' + note.status),
            $('<h6/>').addClass('card-text').html('Date: ' + note.date),
            $('<p/>').addClass('card-text').html(note.details)
        ),
        $('<div/>').addClass('card-footer').append(
            $('<a/>').attr('data-toggle', 'modal').attr('title', 'Finish').attr('onclick', 'crud.finish(' + note.id + ')').append(
                $('<i/>').addClass('fas fa-check')
            ),
            $('<div/>').addClass('float-right').append(
                $('<a/>').attr('data-toggle', 'modal').attr('title', 'Edit').attr('data-target', '#noteModal').attr('onclick', 'crud.edit(' + note.id + ')').append(
                    $('<i/>').addClass('fas fa-edit')
                ),
                '&nbsp;',
                $('<a/>').attr('data-toggle', 'modal').attr('title', 'Delete').attr('onclick', 'crud.delete(' + note.id + ')').append(
                    $('<i/>').addClass('fas fa-trash')
                ),
            )
        )
    )
}

function makeFinishedCard(note, bg_color, text_color) {
    return $('<div/>').addClass(['card', bg_color, text_color, 'mb-3']).append(
        $('<h5/>').addClass('card-header').append(
            note.title,
            $('<div/>').addClass('float-right').append(
                $('<a/>').attr('data-toggle', 'modal').attr('data-target', '#noteModal').attr('onclick', 'crud.edit(' + note.id + ')').append(
                    $('<i/>').addClass('fas fa-edit')
                ),
                '&nbsp;',
                $('<a/>').attr('data-toggle', 'modal').attr('onclick', 'crud.delete(' + note.id + ')').append(
                    $('<i/>').addClass('fas fa-trash')
                ),
            )
        )
    )
}

// #Make Card


