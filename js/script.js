$(document).ready(function () {

    var url = 'http://127.0.0.1:8000/book/';

    var list = $('#books-list');

    var loadAll = function() {
        list.html('');
        $.ajax({
            url: url,
            data: {},
            method: "GET",
            dataType: "json",
        }).done(function (result) {
            for (let i = 0; i < result.length; i++) {
                list.append('<li class="list-group-item row" book-id="' + result[i].id + '">' + result[i].title +
                                '' + 
                                    
                                    '<div class="col-">'+ 
                                        '<button class="btn btn-warning delete-book" delete-id="' + result[i].id + '">Usuń wpis</button>' + 
                                    '</div>' + 
                                    '' + 
                                    '<div class="col" style="display: none;" id="desc-' + result[i].id + '"></div>' +
                                ''+
                            '</li>');
            } 

            var lis = $('ol li');
            lis.one('click', function (event) {
                let id = $(this).attr('book-id');
                let desc = $('#desc-' + id);
                $.ajax({
                    url: url + id,
                    data: {},
                    method: 'GET',
                    dataType: 'json',
                }).done(function (result) {
                    desc.html('<div class="container"><div class="row">Autor: ' + result.author + '</div></div>' +
                              '<div class="container"><div class="row">ISBN: ' + result.isbn + '</div></div>' +
                              '<div class="container"><div class="row">Wydawca: ' + result.publisher + '</div></div>'
                              );
                });
                
           
            });


        }).fail(function (xhr, status, err) {
            alert('Błąd\n' + xhr + status + err)
        });


    };


    list.on('click', '.list-group-item', function (){
        let id = $(this).attr('book-id');
        let desc = $('#desc-' + id);
        desc.toggle();
    })

    list.on('click', '.delete-book', function () {
        let id = $(this).attr('delete-id');
        $.ajax({
            url: url + id,
            method: 'DELETE',
            data: {},
            dataType: 'json',
        }).done(function () {
            alert('Usunięto!');
            loadAll();
        })
    });


    $('#new-book').on('submit', function (event) {
        event.preventDefault();

        let data = {
            author: $(this).find('#author').val(),
            title: $(this).find('#title').val(),
            isbn: $(this).find('#isbn').val(),
            publisher: $(this).find('#publisher').val(),
            genre: $(this).find('#genre').val(),
        };

        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json',
        }).done(function () {
            alert('DODANO!');
            loadAll();
        })
    });

    loadAll();

});