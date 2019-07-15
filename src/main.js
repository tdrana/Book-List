class Book{
    constructor (title, author, isbn){
     
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}


class UI{

    // Add Book List
    addBookList(book){
        const bookList = document.getElementById('book-list');
        const createRow = document.createElement('tr');
        createRow.innerHTML = `
                <td>${book.isbn}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td><a href=""><i id="delete" class="fas fa-trash-alt"></i></a></td>
        `;
        bookList.appendChild(createRow);
    }
    
    // Empty the form value

    emptyForm(){
        document.getElementById('title-input').value = '';
        document.getElementById('author-input').value = '';
        document.getElementById('isbn-input').value = '';

    }

    // show alert

    showAlert(message, className){

        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const cardBox = document.querySelector('.alert-box');
         
        cardBox.appendChild(div);
       
        // const form = document.querySelector('#book-form');

        // cardBox.insertBefore(div, form);
        setTimeout(function(){
            div.remove();
        }, 3000);
    
    }
    
    // Delete List

    deleteList(target){
         if(target.id === 'delete'){
            target.parentElement.parentElement.parentElement.remove();
            showAlert('Book add to the list','alert-success');
         }
        }



}


document.getElementById('book-form').addEventListener('submit', function(e){

    e.preventDefault();    
    // Get Form values
    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;
    const isbn = document.getElementById('isbn-input').value;

    //  Instance of book
    const book = new Book(title, author, isbn);

     const ui = new UI();

     if(title === '' || author === '' || isbn === ''){

        ui.showAlert('From must me fillup before submission','alert-danger');
     }
    
    else{
        ui.addBookList(book);
        ui.emptyForm();
        ui.showAlert('Book add to the list','alert-success');
    }

}); 

document.getElementById('book-list').addEventListener('click', function(e){

    e.preventDefault();
    const ui = new UI();
    ui.deleteList(e.target);

});