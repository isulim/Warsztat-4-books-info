$(document).ready(function () {

    $(window).scroll(function () {
        var s = $(document).scrollTop(),
            d = $(document).height() - $(window).height();
        $("#progressbar").attr('aria-valuemax', d);
        $("#progressbar").attr('aria-valuenow', s);
     });
    var url = 'http://127.0.0.1:8000/book/';

    var list = $('#books-list');

    var ajaxCall = function(ajaxUrl, ajaxMethod, ajaxData, ajaxDataType, ajaxDone) {
        $.ajax({
            url: ajaxUrl,
            method: ajaxMethod,
            data: ajaxData,
            dataType: ajaxDataType,
        }).done(ajaxDone).fail(function (xhr, status, err){
            alert('Błąd\n' + xhr + status + err)
        })
    };

    
    var populateList = function(result) {
        
        for (let i = 0; i < result.length; i++) {
            list.append('<li class="list-group-item list-group-item-action flex-column align-items-start" data-id="' + result[i].id + '">' +
                            '<div class="row">' + 
                                '<div class="col book-info ">' +
                                    result[i].title + 
                                '</div>' +         
                                '<div class="col">' + 
                                    '<button class="btn btn-primary delete-book" data-id="' + result[i].id + '">Usuń wpis</button>' +
                                '</div>' + 
                            '</div>' + 
                            '<div class="col book-info" style="display: none;" id="desc-' + result[i].id + '"></div>' +
                        '</li>');
        } 

        $('ol li').one('click', function () {
            let id = $(this).data('id');
            let desc = $('#desc-' + id);

            let bookDetails = function(result){
                desc.html('<div class="container"><div class="row">Autor: ' + result.author + '</div></div>' +
                            '<div class="container"><div class="row">ISBN: ' + result.isbn + '</div></div>' +
                            '<div class="container"><div class="row">Wydawca: ' + result.publisher + '</div></div>' +
                            '<div class="container"><div class="row">Gatunek: ' + result.genre + '</div></div>');
            };
            ajaxCall((url + id),'GET', {}, 'json', bookDetails);
           
            });


        $('.book-info').on('click', function (){
            let id = $(this).closest('li').data('id');
            let desc = $('#desc-' + id);
            desc.toggle();
        });

        $('.delete-book').off('click').on('click', function () {
            let id = $(this).data('id');
            let deleteDone = function() {
                loadAll();
            };
            if (confirm('Czy na pewno usunąć wpis?')){
                ajaxCall((url + id), 'DELETE', {}, 'json', deleteDone)
            }


        });
    };


    var loadAll = function() {
        list.html('');
        $('#new-book').trigger("reset");
        ajaxCall(url, 'GET', {}, 'json', populateList);

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
        
        let detailsDone = function() {
            alert('Dodano nową książkę do bazy.');
            loadAll();
        };

        ajaxCall(url, 'POST', data, 'json', detailsDone)

    });

    loadAll();
    

});