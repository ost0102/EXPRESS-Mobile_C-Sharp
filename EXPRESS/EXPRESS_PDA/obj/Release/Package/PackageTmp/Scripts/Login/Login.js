$(document).on('click', '.alignBox', function () {
    $(this).children($('.checkbox')).prop('checked', false);
    $(this).children($('.checkbox')).prop('checked', true);
});

$(document).on('click', '#AlertClose', function () {
    $(this).parents('.layer_zone').hide();
});
