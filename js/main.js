let input = document.querySelector('#input');
let output = document.querySelector('#output');

async function getData() {
    let url = 'https://itunes.apple.com/search?term='+input.value;
    
    let response = await fetch(url);
    let data = await response.json();
    let songs = data.results;
    // console.log(songs);
    input.value = '';

    window.addEventListener('load', init(), false);
    function init() {
        playlist();
        audio = new Audio();
    }
    
    function playlist() {
        let playListResult = '';
        songs.forEach(song => {
            playListResult += `
            <div class="playlist__track">
                <div class="playlist__track--album">
                    <img src="`+song.artworkUrl100+`" alt="album_artwork">
                    <div class="playBtn">
                        <button trackUrl="`+song.previewUrl+`" id="playButton"><i class="fas fa-play-circle fa-2x"></i></button>
                    </div>
                </div>
                <div class="playlist__track--info">
                    <span>`+song.trackName+`</span>
                    <div>
                        <span>`+song.artistName+`</span>
                        <span>`+song.collectionName+`</span>
                    </div>
                </div>
            </div>
            `;
        });
        output.innerHTML = playListResult;
    }

    function playSong(track) {
        audio.src = `${track}`;
        audio.play();
    }

    $('#output div div button').click(function() {
        current = $(this).attr('trackUrl');
        playSong(current);
    });
}