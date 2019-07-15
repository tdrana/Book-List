"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);

    this.bookName = document.getElementById('name-input');
    this.authorName = document.getElementById('author-input');
    this.isbnName = document.getElementById('isbn-input');
    this.booklist = document.getElementById('book-list');
    this.itemList = [];
    this.itemID = 0;
  }

  _createClass(UI, [{
    key: "submitBookForm",
    value: function submitBookForm() {
      var bookName = this.bookName.value;
      var authorName = this.authorName.value;
      var isbnName = this.isbnName.value;

      if (bookName === '' || authorName === '' || isbnName === '') {
        this.showAlert('Your have to give valied input', 'alert-danger');
      } else {
        var listBook = {
          id: this.itemID,
          name: bookName,
          author: authorName,
          isbn: isbnName
        };
        this.itemID++;
        this.itemList.push(listBook); //    Empty the form 

        this.bookName.value = '';
        this.authorName.value = '';
        this.isbnName.value = '';
        this.showbookList(listBook);
      }
    }
  }, {
    key: "showbookList",
    value: function showbookList(listBook) {
      var row = document.createElement('tr');
      row.innerHTML = "\n        <td>".concat(listBook.isbn, "</td>\n        <td>").concat(listBook.name, "</td>\n        <td>").concat(listBook.author, "</td>\n        <td><a href=\"\" class=\"delete-icon mx-2\" data-id = ").concat(listBook.id, "><i  class=\"text-danger fas fa-trash-alt\"></i></a> <a href=\"\" class=\"edit-icon\" data-id = ").concat(listBook.id, "><i class=\"text-info fas fa-edit\"></i></a></td>\n        ");
      this.booklist.appendChild(row);
      this.showAlert('Book added in the list', 'alert-success');
    } // Edit Book list

  }, {
    key: "editBookList",
    value: function editBookList(target) {
      var id = parseInt(target.parentElement.dataset.id);
      var parent = target.parentElement.parentElement.parentElement;
      parent.remove();
      var list = this.itemList.filter(function (item) {
        return item.id === id;
      }); // show value in the form

      this.bookName.value = list[0].name;
      this.authorName.value = list[0].author;
      this.isbnName.value = list[0].isbn; // Delete from the list before edit

      var tempList = this.itemList.filter(function (item) {
        return item.id !== id;
      });
      this.itemList = tempList;
    } // Delete book List

  }, {
    key: "deleteBookList",
    value: function deleteBookList(target) {
      var id = parseInt(target.parentElement.dataset.id);
      var parent = target.parentElement.parentElement.parentElement;
      parent.remove();
      var tempList = this.itemList.filter(function (item) {
        return item.id !== id;
      });
      this.itemList = tempList;
    } //   show alert

  }, {
    key: "showAlert",
    value: function showAlert(message, className) {
      var div = document.createElement('div');
      div.className = "alert ".concat(className);
      var alertContainer = document.querySelector('.alert-box');
      div.appendChild(document.createTextNode(message));
      alertContainer.appendChild(div);
      setTimeout(function () {
        div.remove();
      }, 4000);
    }
  }]);

  return UI;
}();

function addEventListeners() {
  var ui = new UI(); // add book List form

  var bookListForm = document.getElementById('book-form');
  var AddBookList = document.getElementById('book-list'); //  book form event Listener

  bookListForm.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitBookForm();
  }); // book list event listner

  AddBookList.addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteBookList(event.target);
    } else if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editBookList(event.target);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  addEventListeners();
});