let topNews = document.querySelector('.topNews');
let btnSearch = document.querySelector(`.btnSearch`);
let inputSearch = document.querySelector('.search');
let imageDiv = document.querySelector('.imageDiv');
let descDiv = document.querySelector('.descDiv');

let apiKey = `e9d3a9efed9545d486a9367a64d54173`;


let allNews = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
let topHeadlines = `http://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

inputSearch.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        btnSearch.click();
    }
});

btnSearch.addEventListener('click', submitForm);

function submitForm(){
    
    let queryStr = document.querySelector(`.search`).value;
    console.log(queryStr);
    let queryStrNews = `https://newsapi.org/v2/everything?q=${queryStr}&apiKey=${apiKey}`;
    getData(queryStrNews).then((data) => {
        console.log(data);
        queryArticles = data.articles;
        displayNews(queryArticles);
    })
    
};


async function getData(url){ 
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

let fetchData = getData(topHeadlines);

fetchData.then((data) => {
    console.log(data);
    let articles = data.articles;
    displayNews(articles);
        
}).catch((err) => {
    console.log(err);
})


function displayNews(articles){
    topNews.textContent = '';
    topNews.scrollTop = 0;

    if(articles.length < 1){
        console.log('No results found. Pleae try again with a different keyword.');

        let news = document.createElement('p');
        news.className= 'news';
        news.textContent = 'No results found. Pleae try again with a different keyword.';

        topNews.appendChild(news);
    }

    for (let i = 0; i < articles.length; i++) {
        let resultDiv = document.createElement('div');
        resultDiv.className = 'resultDiv';
        
        let image = document.createElement('img');
        image.className = 'imageDiv';
        image.src = articles[i].urlToImage;
        image.style.width = '165px';
        image.style.height = '100px';
        resultDiv.appendChild(image);
        // console.log('image called');

        let news = document.createElement('p');
        news.className= 'news';
        news.textContent = articles[i].description;

        let a = document.createElement('a');
        a.textContent = '.read more..';
        a.href = articles[i].url;
        a.target = '_blank'
        a.style.textDecoration = 'none';
        news.appendChild(a);

        resultDiv.appendChild(news);
        
        console.log('desc called');

        document.querySelector('.topNews').appendChild(resultDiv);

        let hr = document.createElement(`hr`);
        topNews.appendChild(hr);
    }
}

// function displayNews(articles){

//     for (let i = 0; i < articles.length; i++) {
//         let news = document.createElement('p');
//         news.textContent = articles[i].description;
//         topNews.appendChild(news);

//         let a = document.createElement('a');
//         a.textContent = 'Read more..';
//         a.href = articles[i].url;
//         a.target = '_blank'
//         a.style.textDecoration = 'none';
//         topNews.appendChild(a);


//         let hr = document.createElement(`hr`);
//         topNews.appendChild(hr);
//     }
// }

