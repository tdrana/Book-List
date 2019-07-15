

class UI{

    constructor(){
        this.bookName = document.getElementById('name-input');
        this.authorName = document.getElementById('author-input');
        this.isbnName = document.getElementById('isbn-input');
        this.booklist = document.getElementById('book-list');
        this.itemList = [];
        this.itemID = 0;
    }

    submitBookForm(){
        const bookName = this.bookName.value;
        const authorName = this.authorName.value;
        const isbnName = this.isbnName.value;

        if(bookName === '' || authorName === ''  || isbnName === ''){
           
            this.showAlert('Your have to give valied input', 'alert-danger');
        }

        else{
            
            let listBook = {
                id: this.itemID,
                name: bookName,
                author: authorName,
                isbn: isbnName
            }

            this.itemID++ ;
            this.itemList.push(listBook);
            
        //    Empty the form 
           this.bookName.value = '';
           this.authorName.value = '';
           this.isbnName.value = '';
           this.showbookList(listBook);


        }
    }
    
    showbookList(listBook){
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${listBook.isbn}</td>
        <td>${listBook.name}</td>
        <td>${listBook.author}</td>
        <td><a href="" class="delete-icon mx-2" data-id = ${listBook.id}><i  class="text-danger fas fa-trash-alt"></i></a> <a href="" class="edit-icon" data-id = ${listBook.id}><i class="text-info fas fa-edit"></i></a></td>
        `;

        this.booklist.appendChild(row);

        this.showAlert('Book added in the list', 'alert-success');
        
    }

    // Edit Book list
    editBookList(target){

        let id = parseInt(target.parentElement.dataset.id);
        let parent = target.parentElement.parentElement.parentElement;

        parent.remove();

        let list = this.itemList.filter(function(item){
            return item.id === id;     
        });
         
        // show value in the form
        this.bookName.value = list[0].name;
        this.authorName.value = list[0].author;
        this.isbnName.value = list[0].isbn;


        // Delete from the list before edit
        let tempList = this.itemList.filter(function(item){
            return item.id !== id;     
        });

        this.itemList = tempList;

    }
    
    // Delete book List
    deleteBookList(target){
      let id = parseInt(target.parentElement.dataset.id);

      let parent = target.parentElement.parentElement.parentElement;

      parent.remove();
      let tempList = this.itemList.filter(function(item){
         return  item.id !== id;
       }); 

    this.itemList = tempList;
    }

    //   show alert
    showAlert(message, className){
            
        const div = document.createElement('div');
        div.className = `alert ${className}`;

        const alertContainer = document.querySelector('.alert-box');

        div.appendChild(document.createTextNode(message));
        alertContainer.appendChild(div);
        setTimeout(function(){
            div.remove();
        }, 4000);
    }
}

function addEventListeners(){
   
    const ui = new UI();

    // add book List form
    const  bookListForm = document.getElementById('book-form');
    const  AddBookList = document.getElementById('book-list');

    //  book form event Listener

    bookListForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitBookForm();
        
    });

    // book list event listner
    AddBookList.addEventListener('click', function(event){
        event.preventDefault();
        if(event.target.parentElement.classList.contains('delete-icon')){
            ui.deleteBookList(event.target);
        }

        else if (event.target.parentElement.classList.contains('edit-icon')){
            ui.editBookList(event.target);
        }
    });

}

document.addEventListener('DOMContentLoaded', function(){
    addEventListeners();
})

