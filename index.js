const searchForm = document.querySelector("#Search_form")
const searchBox = document.querySelector("#Search_box")
const searchResult = document.querySelector(".search_results")
const showMore = document.querySelector(".show_more")

let keyword = "";
let page = 1;

const backend_url = "https://image-search-backend-1.onrender.com"

async function searchImages(){
    keyword = searchBox.value;
    const url = `${backend_url}/search?query=${keyword}&page=${page};`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data)

    //mapping each image from our response

    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((results) => {
        const image = document.createElement("img");
        image.src = results.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMore.style.display = "block"

}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImages();
})

showMore.addEventListener("click",() => {
    page++;
    searchImages();
})