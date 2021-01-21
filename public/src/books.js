function findAuthorById(authors, id) {
  for (let alpha in authors) {
    if (authors[alpha].id === id) {
      return authors[alpha];
    }
  }
}

function findBookById(books, id) {
  for (let alpha in books) {
    if (books[alpha].id === id) {
      return books[alpha];
    }
  }
}

function partitionBooksByBorrowedStatus(books) {
  let loanedOut = [];
  let duplicate = books;
  let returned = [];
  let finalArray = [];
  for (let varname in books) {
    for (let varname2 in books[varname].borrows) {
      let shorter = books[varname].borrows[varname2];
      if (shorter.returned === false) {
        loanedOut.push(books[varname]);
      }
    }
  }
  returned = duplicate.filter((val) => !loanedOut.includes(val));
  finalArray.push(loanedOut);
  finalArray.push(returned);

  return finalArray;
}

function getBorrowersForBook(book, accounts) {
  let bookStatus = [];
  let accountStatus = [];
  for (let blank in book.borrows) {
    bookStatus[blank] = book.borrows[blank];
  }
  for (let name in accounts) {
    for (let book in bookStatus) {
      if (accounts[name].id === bookStatus[book].id) {
        accountStatus.push(accounts[name]);
      }
    }
  }
  for (let last in bookStatus) {
    for (let name in accountStatus) {
      if (bookStatus[last].id === accountStatus[name].id) {
        accountStatus[name].returned = bookStatus[name].returned;
      }
    }
  }
  if (accountStatus.length > 10) {
    accountStatus.length = 10;
  }
  return accountStatus;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
