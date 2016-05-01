$(document).ready(function(){


  function Sound(name, url){
    this.name = name;
    this.url = url;
    this.audioElement = new Audio(src=url);
  }

  function Jukebox(){

    this.playList = [];

    this.addSound = function(sound){
      this.playList.push(sound);
    }

    this.play = function(soundName){
      $(this.playList).each(function(){
        if (this.name == soundName){
          if (this.audioElement.paused == true){
            this.audioElement.play();
          } else {
            this.audioElement.pause();
          }
        }
      });
    }

    this.stopAll = function(){
      $(this.playList).each(function(){
        this.audioElement.load();
      })
    }

    this.toggleLoop = function(soundName, loop){
      $(this.playList).each(function(){
        if (this.name == soundName){
          this.audioElement.loop = loop;
        }
      });
    }

    this.randomize = function(){
      $(this.playList).each(function(){
        var randomSound = Math.random() < 0.5;
        if(randomSound){
          this.audioElement.play();
          $(".play").css('opacity', 0.7);
        }
      });
    }

  };

  robinSound = new Sound(name="robin", url="audio/AmericanRobin.mp3")
  nightingaleSound = new Sound(name="nightingale", url="audio/CommonNightingale.mp3")
  woodpeckerSound = new Sound(name="woodpecker", url="audio/GSWoodpecker.mp3")
  sparrowSound = new Sound(name="sparrow", url="audio/HouseSparrow.mp3")
  goldfinchSound = new Sound(name="goldfinch", url="audio/LawrenceGoldfinch.mp3")
  thrushSound = new Sound(name="thrush", url="audio/SongThrush.mp3")

  jukebox = new Jukebox;

  jukebox.addSound(robinSound);
  jukebox.addSound(nightingaleSound);
  jukebox.addSound(woodpeckerSound);
  jukebox.addSound(sparrowSound);
  jukebox.addSound(goldfinchSound);
  jukebox.addSound(thrushSound);

  jukebox.toggleLoop('robin', true);
  jukebox.toggleLoop('nightingale', true);
  jukebox.toggleLoop('woodpecker', true);
  jukebox.toggleLoop('sparrow', true);
  jukebox.toggleLoop('goldfinch', true);
  jukebox.toggleLoop('thrush', true);

  $(".play").on("click", function(){
    var sound = $(this).attr("data-audio");
    $(this).css('opacity', function(i,o){
    return parseFloat(o).toFixed(1) === '0.7' ? 1 : 0.7;
    });
    jukebox.play(sound);
  });

  $("#stop").on("click", function(){
    jukebox.stopAll();
    $(".play").css('opacity', 1);
  });

  $("#random").on("click", function(){
    jukebox.randomize();
  });

});