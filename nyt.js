const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //1
const key = "8Og7TNqASBNKn2sutp1KTUplqd3Ijpdz"; //2
let url; //3

//search form
const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

//results navigation
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");

//results section
const section = document.querySelector("section");

nav.style.display = "none";
let pageNumber = 0;
//console.log("pageNumber:", pageNumber);
let displayNav = false;

           //1                     //2
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener("click" , nextPage);
previousBtn.addEventListener("click" , previousPage); //3

function fetchResults(e) {
    e.preventDefault(); //2

    //assemble the full url
    url = baseURL + "?api-key=" + key + "&page=" + pageNumber + "&q=" + searchTerm.Value; //3
    console.log("URL:",url);

    if (startDate.value !== "") {
        console.log(startDate.value);
        url += "&begin_date=" + startDate.value;
    };
    if (endDate.value !== "") {
        url += "&end_date=" + endDate.value;
    };
    fetch(url)
        .then(function (results) {
            console.log(results);
            return results.json();
        }).then(function (json) {
            console.log(json);
            displayResults(json);
        });
    
};


function displayResults(json){
    while (section.firstChild){
        section.removeChild(section.firstChild);
    }
    let articles=json.response.docs;
 
    if(articles.length ===0) {
        console.log("No results");
    } else {
        for(let i = 0; i < articles.length; i++) {
            let article = document.createElement("article");//1
            let heading = document.createElement("h2");//2
            let link = document.createElement("a");
            let img = document.createElement("img");
            let para = document.createElement("p");
            let clearfix = document.createElement("div");

            let current = articles[i];
            // console.log("current:", current);

            link.href = current.web_url;
            link.textContent = current.headline.main;

            para.texContent = "Keywords:";

            for(let j = 0; j < current.keywords.length; j++) {
                 
                let span = document.createElement("span");

                span.textContent += current.keywords[j].value = "";
                para.appendChild(span);
            }

            if(current.multimedia.length > 0) {

                img.src = "http://www.nytimes.com/" + current.multimedia[0].url;

                img.alt = current.headline.main;
            }

            clearfix.setAttribute("class","clearfix");
            article.appendChild(heading);//3
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);//4
        }
    }
    if(articles.length >= 10) {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }
    
};

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    console.log("page number:",pegeNumber);
};//5

function previousPage(e) {
    if(pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log("page:",pageNumber);
};//5    


