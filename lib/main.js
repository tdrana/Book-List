"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Book = function Book(title, author, isbn) {
  _classCallCheck(this, Book);

  this.title = title, this.author = author, this.isbn = isbn;
};

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, [{
    key: "addBookList",
    // Add Book List
    value: function addBookList(book) {
      var bookList = document.getElementById('book-list');
      var createRow = document.createElement('tr');
      createRow.innerHTML = "\n                <td>".concat(book.isbn, "</td>\n                <td>").concat(book.title, "</td>\n                <td>").concat(book.author, "</td>\n                <td><a href=\"\"><i id=\"delete\" class=\"fas fa-trash-alt\"></i></a></td>\n        ");
      bookList.appendChild(createRow);
    } // Empty the form value

  }, {
    key: "emptyForm",
    value: function emptyForm() {
      document.getElementById('title-input').value = '';
      document.getElementById('author-input').value = '';
      document.getElementById('isbn-input').value = '';
    } // show alert

  }, {
    key: "showAlert",
    value: function showAlert(message, className) {
      var div = document.createElement('div');
      div.className = "alert ".concat(className);
      div.appendChild(document.createTextNode(message));
      var cardBox = document.querySelector('.alert-box');
      cardBox.appendChild(div); // const form = document.querySelector('#book-form');
      // cardBox.insertBefore(div, form);

      setTimeout(function () {
        div.remove();
      }, 3000);
    } // Delete List

  }, {
    key: "deleteList",
    value: function deleteList(target) {
      if (target.id === 'delete') {
        target.parentElement.parentElement.parentElement.remove();
        showAlert('Book add to the list', 'alert-success');
      }
    }
  }]);

  return UI;
}();

document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Get Form values

  var title = document.getElementById('title-input').value;
  var author = document.getElementById('author-input').value;
  var isbn = document.getElementById('isbn-input').value; //  Instance of book

  var book = new Book(title, author, isbn);
  var ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('From must me fillup before submission', 'alert-danger');
  } else {
    ui.addBookList(book);
    ui.emptyForm();
    ui.showAlert('Book add to the list', 'alert-success');
  }
});
document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();
  var ui = new UI();
  ui.deleteList(e.target);
});