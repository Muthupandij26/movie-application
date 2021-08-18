var abc = document.getElementById("search");
var getMovieEndPoint = 'https://www.omdbapi.com/?apikey=9fadf804&';
abc.addEventListener("click",searchImdb);   

function searchImdb()
{
    var value = document.getElementById("movie").value; 
    // window.open("https://www.omdbapi.com/?apikey=9fadf804&s=" + value); 
    //console.log(value);
    getmovie(value); 
    
}

function getmovie(value)
{
    // console.log(value);
    //console.log("axios begins");
    axios.get(getMovieEndPoint + "s=" + value)
    .then((response) => {
        console.log(response);
        let moviess = response.data.Search;
        //let output = '';
        moviess.forEach(GenerateMovieBlock);
        
    })
    .catch((err) => {
        console.log(err);
    });

    //console.log("axios done");
}

function getMovieById(id) 
{

    let movieId = id;
    axios.get(getMovieEndPoint + "i=" + movieId)
    .then((response) => {
        console.log(response);
        let mov = response.data;
        console.log(mov.Genre);
        console.log(mov.Title);

        var div = document.createElement('div');
        div.className = "card";
        var img = document.createElement('img');
        img.className = "image";  
        img.src = mov.Poster;
        var p = document.createElement('p');
        p.innerHTML = mov.Title;

        div.append(img, p);
        document.getElementById("new").append(div);
    

     
        
    })
    .catch((err) => {
        console.log(err);
    });

     
    console.log(id);

}

function GenerateMovieBlock(index) 
    {
        var div = document.createElement('div');
        div.className = "card";
        var img = document.createElement('img');
        img.className = "image";  
        img.src = index.Poster;
        // var div1 = document.createElement('div');
        // div1.className = "new1"; 
        var h5 = document.createElement('h5');
        h5.innerHTML = index.Title;
        // //output += index.Title +" " + index.Type + "  <br> ";
        var btn = document.createElement('button');
        btn.id = index.imdbID;
        btn.innerHTML = "Movie Details";    
        //btn.onclick = getMovieById(btn.id);
        // var anchor = document.crateElement('a');
        // anchor.innerHTML = "movie details";
        // anchor.id = "anch";
        //anchor.href = "#";
        //anchor.onclick = movie("hello");
         div.append(img, h5, btn);

        //document.body.appendChild(img);
        //document.body.appendChild(div);
         //output += index.Year; 
        document.getElementById("movies").append(div);
        // document.getElementById("movies").appendChild(h5);
        //document.getElementById("bttn").addEventListener("dblclick",getMovieById(index.imdbID));
        //document.querySelector("#anc/h").addEventListener("dblclick",movie(index.imdbID));    
    }



document.onclick = function(event) {
    //console.log('Event', event);
    let {tagName, id} = event.target;
    if(tagName.toLowerCase() === "button" && id != "search") {
        getMovieById(id);
    }
}
