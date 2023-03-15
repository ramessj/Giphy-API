const img = document.querySelector("img");

const btnRefresh = document.getElementById("btnNewGif");

const searchGif = document.getElementById("searchGif");

let inputVar = "";

const apiSearch = "https://api.giphy.com/v1/gifs/translate?api_key=zAaYz6YcvTTEM12q18K7DQD81i2O71zZ&s="

let imgActualLink = "";

let nuevaImgLink = "";



searchGif.addEventListener("keydown", function (e){
	if(e.key == "Enter"){
		e.preventDefault();
		inputVar = searchGif.value;
		changeGif(inputVar)
		searchGif.value = "";
	}
});



changeGif = (opt) => {
  fetch(
    apiSearch + opt,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {

			let searchingDiv = document.getElementById("searchingDiv");
			searchingDiv.innerHTML = "";
			
			if (opt != "welcome"){
				let searchingText = document.createElement("h3");
				searchingText.innerText = `Buscando: ${opt}`;
				searchingDiv.append(searchingText);
			}
			

			img.src = response.data.images.original.url;

    })
		.catch(function(error){
			if( opt == ""){
				let searchingText = document.createElement("h3");
				searchingText.innerText = `Ingresa un texto`;
				searchingDiv.append(searchingText);
			}else{
			alert(`No se encontraron resultados para: ${opt}`)}
			}
		);
			
};

changeGif("welcome");

btnRefresh.addEventListener("click", function(){
	if(inputVar === ""){
		inputVar = "welcome"
	}
	changeGif(inputVar)
});
