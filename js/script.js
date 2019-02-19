$(document).ready(function () {

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
    }

    
    var populateList = function(result) {
        
        for (let i = 0; i < result.length; i++) {
            list.append('<li class="list-group-item " book-id="' + result[i].id + '">' + 
                            '<div class="row">' + 
                                '<div class="col title">' + 
                                    result[i].title + 
                                '</div>' +         
                                '<div class="col">' + 
                                    '<button class="btn btn-warning delete-book" delete-id="' + result[i].id + '">Usuń wpis</button>' + 
                                '</div>' + 
                            '</div>' + 
                            '<div class="col" style="display: none;" id="desc-' + result[i].id + '"></div>' +
                        '</li>');
        } 

        $('ol li').one('click', function (event) {
            let id = $(this).attr('book-id');
            let desc = $('#desc-' + id);

            let bookDetails = function(result){
                desc.html('<div class="container"><div class="row">Autor: ' + result.author + '</div></div>' +
                            '<div class="container"><div class="row">ISBN: ' + result.isbn + '</div></div>' +
                            '<div class="container"><div class="row">Wydawca: ' + result.publisher + '</div></div>');            
            }
            ajaxCall((url + id),'GET', {}, 'json', bookDetails);
           
            });


            $('.title').on('click', function (){
                let id = $(this).parent().parent().attr('book-id');
                let desc = $('#desc-' + id);
                desc.toggle();
            })

            $('.delete-book').off();
        
            $('.delete-book').on('click', function () {
                let id = $(this).attr('delete-id');
                let deleteDone = function() {
                    loadAll();
                }
                if (confirm('Czy na pewno usunąć wpis?')){
                    ajaxCall((url + id), 'DELETE', {}, 'json', deleteDone)
                }
                
        
            });
    }


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
        
        let done = function() {
            alert('Dodano nową książkę do bazy.')
            loadAll();
        }

        ajaxCall(url, 'POST', data, 'json', done)

    });

    loadAll();
    

});