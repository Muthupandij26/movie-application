var getMovieEndPoint = 'https://www.omdbapi.com/?apikey=9fadf804&';

function searchImdb()
{
    var value = document.getElementById("movie").value; 
    getmovie(value); 
    
}

function getmovie(value)
{
    axios.get(getMovieEndPoint + "s=" + value)
    .then((response) => {
        console.log(response);
        let moviess = response.data.Search;
        moviess.forEach(GenerateMovieBlock);
        
    })
    .catch((err) => {
        console.log(err);
    });

}

function GenerateMovieBlock(index) 
{
    var div = document.createElement('div');
    div.className = "card";
    var img = document.createElement('img');
    img.className = "image";  
    img.src = index.Poster;
    var h5 = document.createElement('h5');
    h5.innerHTML = index.Title;
    var btn = document.createElement('button');
    btn.id = index.imdbID;
    btn.innerHTML = "Movie Details";    
    div.append(img, h5, btn);
    document.getElementById("movies").append(div);
}

function getMovieById(id) 
{

    let movieId = id;
    axios.get(getMovieEndPoint + "i=" + movieId)
    .then((response) => {
        console.log(response);
        let mov = response.data;
        //console.log(mov.Genre);
        var div = document.createElement('div');
        div.className = "singlediv";
        var img = document.createElement('img');
        img.className = "image";  
        var h5 = document.createElement('h5');
        h5.className = "singleTitle"
        h5.innerHTML = mov.Title;
        img.src = mov.Poster;
        var p = document.createElement('p');
        p.innerHTML = mov.Genre + "<br>" + mov.Released + "<br>" + mov.Rated + "<br>" + mov.imdbRating + "<br>" + mov.Director + "<br>" ;
        div.append(h5, p);
        document.getElementById("moviess").append(img,div);    
        
    })
    .catch((err) => {
        console.log(err);
    });
    //console.log(id);
}

document.onclick = function(event) {
    let {tagName, id} = event.target;
    if(tagName.toLowerCase() === "button" && id != "search") {
        window.location = 'movie.html?mid = ' + id; 
    }
    else if(tagName.toLowerCase() === "button" && id == "search") {
        searchImdb();
    }
}
