function findAccountById(accounts, id) {
  for (let name in accounts) {
    if (accounts[name].id === id) {
      return accounts[name];
    }
  }
}

function sortAccountsByLastName(accounts) {
  let sortedNames = accounts.sort((nameA, nameB) =>
    nameA.name.last > nameB.name.last ? 1 : -1
  );
  return sortedNames;
}

function numberOfBorrows(account, books) {
  let numberBorrowed = 0;
  let borrowedIds = [];

  for (let varname in books) {
    for (let varname2 in books[varname].borrows) {
      borrowedIds.push(books[varname].borrows[varname2]);
    }
  }
  for (let userId in borrowedIds) {
    if (borrowedIds[userId].id === account.id) {
      numberBorrowed += 1;
    }
  }
  return numberBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  books.sort((a, b) => a.authorId - b.authorId);
  authors.sort((a, b) => a.id - b.id);

  let booksWithAuthor = [];

  for (let run in books) {
    if (books[run].authorId === authors[run].id) {
      let firstBook = books[run];
      let saved = firstBook.borrows;
      delete firstBook.borrows;
      firstBook.author = authors[run];
      firstBook.borrows = saved;
      booksWithAuthor.push(firstBook);
    }
  }
  let checkedOut = [];
  for (let varname in booksWithAuthor) {
    for (let varname2 in booksWithAuthor[varname].borrows) {
      let shorter = booksWithAuthor[varname].borrows[varname2];
      if (shorter.id === account.id && shorter.returned === false) {
        checkedOut.push(booksWithAuthor[varname]);
      }
    }
  }

  return checkedOut;
  console.log(checkedOut);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
