const API_KEY="395fc486059b4c19a6e3d29255927b6d";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardclone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardsContainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone, article){
    const newsImg= cardclone.querySelector('#news-img');
    const newsTitle= cardclone.querySelector('#news-title');
    const newsSource= cardclone.querySelector('#news-source');
    const newsDesc= cardclone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date (article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;
    cardclone.firstElementChild.addEventListener("click",() => {
        window.open(article.url,"_blank")
    })
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


const searchbutton =document.getElementById("search-button");
const searchtext =document.getElementById("search-text");
searchbutton.addEventListener("click", () =>{
    const query =searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
});