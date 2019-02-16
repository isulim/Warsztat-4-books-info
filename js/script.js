$(document).ready(function () {

    var url = 'http://127.0.0.1:8000/book/';

    var list = $('#books-list ul');

    var main = function () {
        $.ajax({
            url: url,
            data: {},
            method: "GET",
            dataType: "json",
        }).done(function (result) {
            for (let i = 0; i < result.length; i++) {

                list.append('<li class="book-title" id="' + result[i].id + '">' + result[i].title + '<div></div></li>');
            }
        }).fail(function (xhr, status, err) {
            alert('Błąd\n' + xhr + status + err)
        });

    list.on('click', 'li.book-title', function () {
        let id = $(this).attr('id');
        let desc = $(this).children(0);
        desc.toggle();
        $.ajax({
            url: url + id,
            data: {},
            method: 'GET',
            dataType: 'json',
        }).done(function (result) {
            desc.html(result.id + result.author + result.isbn + result.publisher);
        });
    });
    };

        $('#new-book').on('submit', function (event) {
        event.preventDefault();

        let data = {
            author: $(this).find('#author').val(),
            title: $(this).find('#title').val(),
            isbn: $(this).find('#isbn').val(),
            publisher: $(this).find('#publisher').val(),
            genre: $(this).find('#genre').val(),
        };

        console.log($(this).find('#author'));
        console.log(data);


        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json',
        }).done(function (result) {
            alert('DODANO!');
            main();
        })
    });

    main();

});