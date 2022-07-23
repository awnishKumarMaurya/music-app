const form=document.getElementById("form");
const search=document.getElementById("search");
const result=document.querySelector(".result");
const loading=document.querySelector(".loading");
const conatiner=document.querySelector(".avatar");

// add event listner 
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchItem=search.value;
    if(!searchItem){
        alert("please write artist name");
    }
    else{
        return searchSong(searchItem);
    }
})
// function 1
const searchSong =async(searchTerm)=>{
    loading.innerHTML="please wait for the song...";
try {
   const res= await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}`,
   {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '989fa3ae64msha823c1e649919bdp151263jsn059ef74cc34c',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
   })
   const songData=await res?.json();
  loading.innerHTML="";
//   calling display fn
  displaySongs(songData.data)
} catch (error) {
    console.log(error);
}
}
// displaySong function
const displaySongs=(arrSongs)=>{
    // display image 
    conatiner.innerHTML=` <img class="image" src=${arrSongs[0].artist.picture} alt="artist picture"/>`;
    // data of division
    console.log(arrSongs[0].artist.picture);
    const output=arrSongs?.map((song)=>{
       
        return `<div class="card">
        <p><strong>${song.artist.name}</strong>-<span>${song.title}</span></p>
        <audio id="audio"  controls>
          <source src="${song.preview}" type="audio/mpeg"/>
          your browser doesnt support audio
        </audio>
     </div> `;
    })
    //   display to dom
result.innerHTML = output.join("");
}


