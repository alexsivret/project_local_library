function countingHelper(givenArray){
  let sum = 0;
  for (let number in givenArray) {
    sum +=1
  }
  return sum
}

function totalBooksCount(books) {
 return countingHelper(books)
}

function totalAccountsCount(accounts) {
  return countingHelper(accounts)
}

function booksBorrowedCount(books) {
  
  const loanedOut = []
  const reduced = [];
  for (let varname in books) {
    for (let varname2 in books[varname].borrows) {
      let shorter = books[varname].borrows[varname2];
      if (shorter.returned === false) {
        loanedOut.push(books[varname]);
      }
    }
  }
  for (let number in loanedOut) {
    reduced.push(1) ;
  }
  
  let result = reduced.reduce((total, number) => total + number)
  return result
  ;
}

function getMostCommonGenres(books) {
  const genres = [];
  for (let index in books) {
    genres.push({ name: books[index].genre, count: 1 });
    genres.sort();
  }
  for (let index in genres) {
    let count = 0;
    for (let index2 in genres) {
      if (genres[index].name === genres[index2].name) {
        count += 1;
      }
    }
    genres[index].count = count;
  }
  const uniqueGenres = [
    ...new Map(genres.map((item) => [item.name, item])).values(),
  ];

  uniqueGenres.sort((a, b) => (a.count < b.count ? 1 : -1));

  if (uniqueGenres.length > 5) {
    uniqueGenres.length = 5;
  }
  return uniqueGenres;
}

function getMostPopularBooks(books) {
  const popular = [];

  for (let index in books) {
    popular.push({
      name: books[index].title,
      count: books[index].borrows.length,
    });
  }
  popular.sort((a, b) => (a.count < b.count ? 1 : -1));
  if (popular.length > 5) {
    popular.length = 5;
  }
  return popular;
}

function getMostPopularAuthors(books, authors) {
  books.sort((a, b) => (a.authorId < b.authorId ? 1 : -1));
  authors.sort((a, b) => (a.id < b.id ? 1 : -1));
  const popularUnsorted = [];
  for (let index in authors) {
    for (let index2 in books) {
      if (authors[index].id === books[index2].authorId) {
        let authorName =
          authors[index].name.first + " " + authors[index].name.last;
        let borrows = books[index2].borrows.length;

        popularUnsorted.push({ name: authorName, count: borrows });
      }
    }
  }

  popularUnsorted.sort((a, b) => (a.count < b.count ? 1 : -1));
  const uniqueAuthors = [
    ...new Map(popularUnsorted.map((item) => [item.name, item])).values(),
  ];
  uniqueAuthors.sort((a, b) => (a.count < b.count ? 1 : -1));
  if (uniqueAuthors.length > 5) {
    uniqueAuthors.length = 5;
  }
  return uniqueAuthors;
  console.log(uniqueAuthors);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
