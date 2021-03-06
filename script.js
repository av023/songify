function fetchSongs()
{

      $.ajax({
        'url': 'https://jsonbin.io/b/59f713154ef213575c9f652f',
        'dataType': 'json',
        'method': 'GET',
        'beforeSend':function()
        {
          $('loader').show();
        },

        'success': function (responseData) {
        songs = responseData ;
        setupApp() ;
        $('loader').hide();
      },
      'error':function(data){
        alert('Sorry song is not able to fetch! Please try later');
        $('loader').hide();
      }
      }) ;
}

    function setupApp() {
  changeCurrentSongDetails(songs[0]);

  setInterval(function() {
    updateCurrentTime() ;
  }) ;
  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1) ;
  }
}



function toggleSong() {
var song = document.querySelector('audio');
if(song.paused == true) {
  console.log('Playing');
  $('.play-icon').removeClass('fa-play');
$('.play-icon').addClass('fa-pause');
  song.play();
}
else {
  console.log('Pausing');
  $('.play-icon').removeClass('fa-pause');
$('.play-icon').addClass('fa-play');
  song.pause();
  }
}

function updateCurrentTime() {
var song = document.querySelector('audio');
  var currentTime = Math.floor(song.currentTime);
  currentTime = fancyTimeFormat(currentTime);
  var duration = Math.floor(song.duration);
  duration = fancyTimeFormat(duration)
$('.time-elapsed').text(currentTime);
$('.song-duration').text(duration);
}


var songList = ['Badri Ki Dulhania (Title Track)',
'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];
var fileNames = ['song1.mp3','song2.mp3',
      'song3.mp3','song4.mp3'];
var artistList = [' Neha Kakkar, Dev Negi',
      'Badshah, Shashaa Tirupati','Arijit Singh',
      'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre',
      'Ae Dil Hai Mushkil'];
var durationList = ['2:56','3:15','2:34','2:29'];

      function addSongNameClickEvent(songObj,position) {

        var songName = songObj.fileName;
        var id = '#song' + position;
          $(id).click(function() {
          var audio = document.querySelector('audio');
          var currentSong = audio.src;
          if(currentSong.search(songName) != -1)
          {
            toggleSong();
          }
          else {
            audio.src = songName;
            toggleSong();
            changeCurrentSongDetails(songObj);
          }
      });
      }





var songs = [];

function changeCurrentSongDetails(songObj) {
  $('.current-song-image').attr('src','img/' + songObj.image) ;
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
}


$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if(name.length > 2) {
    var message = "Welcome, " +  name;
    $('.main .user-name').text(message);
    $('.welcome-screen').addClass('hidden');
    $('.main').removeClass('hidden');
    fetchSongs() ;

        $('.play-icon').on('click',function() {
          toggleSong();

     });

    $('body').on('keypress',function(event) {
      if (event.keyCode == 32||event.keyCode == 112||event.keyCode == 80)
      {
        toggleSong();
      }
      });
    }
     else {
     $('#name-input').addClass('error');
     alert('Please add a valid name');
   }

   });


   $('#logout').click(function()
 {
   $('.welcome-screen').addClass('hidden');
   $('.main').removeClass('hidden');

   $('.welcome-screen').removeClass('hidden');
   $('.main').addClass('hidden');

   $('#name-input').val("");
   $('#name-input').removeClass('error');
   $('#error-text').addClass('hidden');

 })



    function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
