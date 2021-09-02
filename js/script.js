var bookShelf = document.getElementById("books")
var totalBooks = document.getElementById("total-books")
const searchBooks = () => {
    const search = document.getElementById("search")
    const searchInput = search.value;
    search.value = ""; /* clear search input field */
    if (searchInput === "") {
        bookShelf.innerHTML = `
            <div class="alert alert-danger  text-center" role="alert">
                Please Enter Book Name
            </div>
    `;
    } else {
        spinner(); /* showing spinner after clicking search button */
        const url = `https://openlibrary.org/search.json?q=${searchInput}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }
}

/* spinner function */
const spinner = () => {
    bookShelf.innerHTML = `
            <button class="btn btn-primary  text-center" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading... Please Wait For A Moment
            </button>
    `;
    totalBooks.innerHTML = "";
}

const displayBooks = books => {
    console.log(books)
    if (books.numFound === 0) {
        bookShelf.innerHTML = `
            <div class="alert alert-danger  text-center" role="alert">
                No Result Found, Please Try Again.
            </div>
            `;
    } else {
        /* Show total books number found on search results */
        totalBooks.innerHTML = `
                 <button type="button" class="btn btn-success text-center">
                     Total Book Found <span class="badge bg-danger">${books.numFound}</span>
                 </button>
                 `;

        /* show book info found on search results */
        const allBooks = books.docs.slice(0, 12);
        bookShelf.innerHTML = ` `; /* clear books results after a new search */
        allBooks.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col-md-6');
            div.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start mx-auto d-block  align-self-center" alt="${book.title}">
                    </div>
                    <div class="col-md-8 align-self-center">
                        <div class="card-body">
                            <h4 class="card-title">${book.title}</h4>
                            <h6 class="card-text">By ${book.author_name[0]}</h6>
                            <p class="card-text">First published in ${book.first_publish_year}</p>
                            <a href="https://openlibrary.org/${books.docs[0].key}" class="btn">Read The Book</a>
                        </div>
                    </div>
                </div>
            </div>
                    `;
            bookShelf.appendChild(div);
        })
    }
}









/* const displayBooks = books => {
     <h4>Publisher <span class=" text-primary">: ${book.publisher[0]}</span></h4>
    console.log(books);
    const bookShelf = document.getElementById("books")
    const totalBooks = document.getElementById("total-books")
    totalBooks.innerHTML = `
                <button type="button" class="btn btn-success">
                    Total Book Found <span class="badge bg-danger">${books.numFound}</span>
                </button>
                `;
    bookShelf.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${books.docs[0].cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                        <h4 class = "card-title" > ${books.docs[0].title}</h4>
                        <h5 class="card-title">${books.docs[0].author_name[0]}</h5>
                        <h6 class="card-title">First Published in ${books.docs[0].first_publish_year}</h6>
                        <a href="https://openlibrary.org/${books.docs[0].key}" class="btn btn-primary">Read The Book</a>
                    </div>
                </div>
                `;
} */