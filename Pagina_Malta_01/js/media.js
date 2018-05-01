    var loop;
    var audioList = [];
    var audioNames = [];
    var audioIndex = 0;

    var videoList = [];
    var videoNames = [];
    var videoIndex = 0;
    
    window.onload = function(){
        audioList.push('audio/audio1.mp3');
        audioList.push('audio/audio2.mp3');
        audioList.push('audio/audio3.mp3');
        
        audioNames.push('Hino Nacional de Malta');
        audioNames.push('Journeys - StrongHold Sound');
        audioNames.push('Mattsjig - StrongHold Sound');
        
        videoList.push('video/video1.mp4');
        videoList.push('video/video2.mp4');
        videoList.push('video/video3.mp4');
        
        videoNames.push('Ilhas Maltesas');
        videoNames.push('Ilhas Maltesas');
        videoNames.push('Ilhas Maltesas');
        
        //changeProgressBar('progbar1','audio');
        changeProgressBar('progbar2','video');
        
        var titulo1 = document.getElementById('pVideo');
        var titulo2 = document.getElementById('pAudio');
        titulo1.innerHTML = videoNames[videoIndex];
        titulo2.innerHTML = audioNames[audioIndex];
        
        var audio = document.getElementById('audio');
        var currentAudio = document.getElementById('current_audio');
        var totalAudio = document.getElementById('total_timeaudio');
        currentAudio.innerHTML = audio.currentTime.toFixed(2) + ' s';
        totalAudio.innerHTML = audio.duration.toFixed(2) + ' s';
        
        var video = document.getElementById('video');
        var currentVideo = document.getElementById('current_video');
        var totalVideo = document.getElementById('total_timevideo');
        
        currentVideo.innerHTML = video.currentTime.toFixed(2) + ' s';
        totalVideo.innerHTML = video.duration.toFixed(2) + ' s';
        
    };

//audio
    
    function playaudio(){
        var audio = document.getElementById('audio');
        var playAudio = document.getElementById('playAudio');
        var pauseAudio = document.getElementById('pauseAudio');
        
        if(audio.src === ''){
            audio.src = audioList[audioIndex];
        }
        
        var titulo = document.getElementById('pAudio');
        // getElementByName retorna um array
        titulo.innerHTML = audioNames[audioIndex];
        
        audio.play();
        playAudio.style.display = 'none';
        pauseAudio.style.display = 'inline-block';

        loop = setInterval(getAudioTime,100);

    }

    function getAudioTime(){
        var audio = document.getElementById('audio');
        var repro = document.getElementById('repro');
        var currentAudio = document.getElementById('current_audio');
        var totalAudio = document.getElementById('total_timeaudio');

        repro.min = 0;
        repro.max = audio.duration;
        repro.value = audio.currentTime;

        currentAudio.innerHTML = audio.currentTime.toFixed(2) + ' s';
        totalAudio.innerHTML = audio.duration.toFixed(2) + ' s';
        
        progressBar(audio.currentTime,audio.duration,audio.buffered,'progbar1');
    }


    function pauseaudio(){
        var audio = document.getElementById('audio');
        var playAudio = document.getElementById('playAudio');
        var pauseAudio = document.getElementById('pauseAudio');
        
        audio.pause();
        pauseAudio.style.display = 'none';
        playAudio.style.display = 'inline-block';
        
    }

    function pararaudio(){
            var audio = document.getElementById('audio');
            audio.pause();
            audio.currentTime=0;
    }

    function anterior(){
        if(audioIndex === 0){
            audioIndex = audioList.length - 1;
        }else{
            audioIndex--;
        }
        
        var audio = document.getElementById('audio');
        audio.src = audioList[audioIndex];
        
        playaudio();
    }
    
    function proximo(){
        if(audioIndex === audioList.length - 1){
            audioIndex = 0;
        }else{
            audioIndex++;
        }
        
        var audio = document.getElementById('audio');
        audio.src = audioList[audioIndex];
        
        playaudio();
    }

    function setAudioVolume(){
        var audio = document.getElementById('audio');
        var volaudio = document.getElementById('vaudio');
        console.log(volaudio.value);
        var va = document.getElementById('va');
        var vol = (parseFloat(volaudio.value)*100).toFixed(0);
        audio.volume = volaudio.value;//0-1
        va.innerHTML = "&nbsp; "+vol+" %";
    }

    function setAudioTime(){
        var audio = document.getElementById('audio');
        var repro = document.getElementById('repro');

        audio.currentTime = repro.value;

    }

// video

    function playvideo(){
        var video =  document.getElementById('video');
        var playVideo = document.getElementById('playVideo');
        var pauseVideo = document.getElementById('pauseVideo');
        
        if(video.src === ''){
            video.src = videoList[videoIndex];
        }
        
        var titulo = document.getElementById('pVideo');
        
        titulo.innerHTML = videoNames[videoIndex];
        
        video.play();
        playVideo.style.display = 'none';
        pauseVideo.style.display = 'inline-block';
        
        loop = setInterval(getVideoTime,100);
    }


    function pausevideo(){
        var video =  document.getElementById('video');
        var playVideo = document.getElementById('playVideo');
        var pauseVideo = document.getElementById('pauseVideo');
        
        video.pause();
    
        pauseVideo.style.display = 'none';
        playVideo.style.display = 'inline-block';
    }

    function stopvideo(){
      var video =  document.getElementById('video');
      video.pause();
      video.currentTime = 0;
    }

    function getVideoTime(){
        var video = document.getElementById('video');
        var currentVideo = document.getElementById('current_video');
        var totalVideo = document.getElementById('total_timevideo');
        
        currentVideo.innerHTML = video.currentTime.toFixed(2) + ' s';
        totalVideo.innerHTML = video.duration.toFixed(2) + ' s';
        
        progressBar(video.currentTime,video.duration,video.buffered,'progbar2');
        
        
    }

    function videoAnterior(){
        if(videoIndex === 0){
            videoIndex = videoList.length - 1;
        }else{
            videoIndex--;
        }
        
        var video = document.getElementById('video');
        video.src = videoList[videoIndex];
        
        playvideo();
    }
    
    function videoProximo(){
        if(videoIndex === videoList.length - 1){
            videoIndex = 0;
        }else{
            videoIndex++;
        }
        
        var video = document.getElementById('video');
        video.src = videoList[videoIndex];
        
        playvideo();
    }

    function setVideoVolume(){
        var video = document.getElementById('video');
        var volvideo = document.getElementById('vvideo');
        console.log(volvideo.value);
        var vvideo = document.getElementById('vv');
        var vol = (parseFloat(volvideo.value)*100).toFixed(0);
        video.volume = volvideo.value;//0-1
        vvideo.innerHTML = "&nbsp; "+vol+" %";
    }

    
// progress bar

    function progressBar(current, total,buffered,idBar){
        var progbar = document.getElementById(idBar);
        var cprog = document.querySelector('#'+idBar+'>.current-progress');
        var buffer = document.querySelector('#'+idBar+' .buffer');
        
        var percentBuffer = buffered.end(0)/total;
        var percent = current/total;
        
        buffer.setAttribute('style','width:'+(progbar.offsetWidth*percentBuffer)+'px');
        cprog.setAttribute('style','width:'+(progbar.offsetWidth*percent)+'px');
    }

    function changeProgressBar(idBar,idMedia){
        var media = document.getElementById(idMedia);
        var progbar = document.getElementById(idBar);
        progbar.addEventListener('click',function (event){
           var rect = this.getBoundingClientRect();             
           var percent = (event.clientX - rect.left) / (rect.width);
           media.currentTime = media.duration * percent;
        },false);
    }
    