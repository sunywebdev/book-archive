const searchBooks = () => {
    const search = document.getElementById("search")
    const searchInput = search.value;

    search.value = ""; /* clear search input field */
    if (searchInput === "") {
        document.getElementById("books").innerHTML = `
            <div class="alert alert-danger" role="alert">
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
    document.getElementById("books").innerHTML = `
            <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading... Please Wait For A Moment
            </button>
    `;
}

const displayBooks = books => {
    console.log(books)
    /* Show total books number found on search results */
    const totalBooks = document.getElementById("total-books")
    totalBooks.innerHTML = `
                 <button type="button" class="btn btn-success">
                     Total Book Found <span class="badge bg-danger">${books.numFound}</span>
                 </button>
                 `;

    /* show book info found on search results */
    const allBooks = books.docs.slice(0, 12);
    const bookShelf = document.getElementById("books")
    bookShelf.innerHTML = ` `; /* clear books results after a new search */
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
                    <div class ="card border-0 h-100" >
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top " alt="${book.title}">
                        <div class="card-body pb-0">
                            <h6 class="card-title">${book.title}</h6>
                            <p class="card-title">By ${book.author_name}</p>
                            <p class="published">First Published ${book.first_publish_year}</p>
                        </div>
                        <div class="card-footer border-0 pt-0">
                             <a href="https://openlibrary.org/${book.key}" class="btn btn-primary">Read The Book</a>
                        </div>
                    </div>
                    `;
        bookShelf.appendChild(div);
    })
}









/* const displayBooks = books => {
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