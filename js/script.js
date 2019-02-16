$(document).ready(function () {

    var url = 'http://127.0.0.1:8000/';

    var list = $('#books-list');

    $.ajax({
        url: url + 'book/',
        data: {},
        type: "GET",
        dataType: "json",
    }).done(function (result) {
        for (let i = 0; i < result.length; i++) {
            list.append('<li>' + result[i].id + '\t' + result[i].author + '\t' + result[i].title + '</li>');
        }
    })
});