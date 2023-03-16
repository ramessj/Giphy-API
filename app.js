const startApp = () =>{
	const body = document.getElementById("body");
	body.innerHTML = `<div class="searcher">
	<label for="searchGif">Buscar:</label>
	<input type="search" name="searchGif" id="searchGif" />

</div>
<div id="searchingDiv" class="searchingDiv">

</div>

<div class="imgContainer"><img src="#" alt="img from api" /></div>
<div>
		<button type="button" id="btnNewGif" class="btnNewGif">REFRESCAR</button>

</div>`
};

startApp();

const img = document.querySelector("img");

const btnRefresh = document.getElementById("btnNewGif");

const searchGif = document.getElementById("searchGif");

let inputVar = "";

const apiSearch =
  "https://api.giphy.com/v1/gifs/translate?api_key=zAaYz6YcvTTEM12q18K7DQD81i2O71zZ&s=";

let imgActualLink = "";

let nuevaImgLink = "";

searchGif.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    e.preventDefault();
    inputVar = searchGif.value;
    changeGif(inputVar);
    searchGif.value = "";
  }
});

async function changeGif(opt) {
  img.src = "./loading.gif";

  try {
    const response = await fetch(apiSearch + opt, { mode: "cors" });
    const searchData = await response.json();

    let searchingDiv = document.getElementById("searchingDiv");
    searchingDiv.innerHTML = "";

    if (opt != "bienvenidos") {
      let searchingText = document.createElement("h3");
      searchingText.innerText = `Buscando: ${opt}`;
      searchingDiv.append(searchingText);
    }

    img.src = searchData.data.images.original.url;
  } catch (error) {
    img.src = "./error.gif";
    let searchingText = document.createElement("h3");
    searchingDiv.innerHTML = ``;
    if (opt == "") {
      searchingText.innerText = `Error: Ingresa un texto`;
      searchingDiv.append(searchingText);
    } else {
      searchingText.innerText = `No se encontraron resultados para: ${opt}`;
      searchingDiv.append(searchingText);
    }
  }
}

changeGif("bienvenidos");

btnRefresh.addEventListener("click", function () {
  if (inputVar === "") {
    inputVar = "bienvenidos";
  }
  changeGif(inputVar);
});
