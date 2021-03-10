window.addEventListener('resize', function() {
	if (window.innerWidth <= 1070) {
		window.location.href = "../index.html"; 
	}
});

// Dark Mode
document.querySelector('.button_dark').addEventListener("click", () => {
    document.body.classList.toggle('dark')
    if ( document.body.classList[0]){
        localStorage.setItem('body', 'dark');
    }else{
        localStorage.removeItem('body');
    }
})

let favoriteGifos = []
let misGifos = []

if (window.localStorage.getItem('misgifos')) {
  misGifos = JSON.parse(window.localStorage.getItem('misgifos'))
}

const video = document.querySelector('video')
const btnStart = document.querySelector('.btnStart')
const btnRecord = document.querySelector('.btnRecord')
const btnFinish = document.querySelector('.btnFinish')
const btnUpload = document.querySelector('.btnUpload')

const title_crear_h1 = document.querySelector('.title-crear-h1')
const title_crear_p1 = document.querySelector('.title-crear-p1')
const title_crear_h2 = document.querySelector('.title-crear-h2')
const title_crear_p2 = document.querySelector('.title-crear-p2')
const paso_1 = document.querySelector('.paso_1')
const paso_2 = document.querySelector('.paso_2')
const paso_3 = document.querySelector('.paso_3')
const img_video_upload = document.querySelector('.img_course_upload')
const img_video_ok = document.querySelector('.img_ok_upload')
const text_video_upload = document.querySelector('.text_course_upload')
const text_video_ok = document.querySelector('.text_ok_upload')
const container_video = document.querySelector('.container_video')
const repeat_record = document.querySelector('.repeat')
const btn_download = document.querySelector('#btn-download')
const btn_link = document.querySelector('#btn-link')


const apiKey = "yTCjv2UMQEL7ayD0GnIrM7i1anyTY3Ov"

const video_course_upload_start = () => {
  container_video.classList.remove('displaynone')
  img_video_upload.classList.remove('displaynone')
  text_video_upload.classList.remove('displaynone')
}

const video_course_upload_ok = () => {
  img_video_ok.classList.remove('displaynone')
  text_video_ok.classList.remove('displaynone')
  img_video_upload.classList.add('displaynone')
  text_video_upload.classList.add('displaynone')
}

const video_course_upload_close = () => {
  img_video_upload.classList.add('displaynone')
  text_video_upload.classList.add('displaynone')
  img_video_ok.classList.add('displaynone')
  text_video_ok.classList.add('displaynone')
  container_video.classList.add('displaynone')
}
video_course_upload_close()

const recordStart = () => {
  recorder.startRecording(); // Empezamos a grabar!!
  btnRecord.classList.add('displaynone');
  btnFinish.classList.remove('displaynone');
}

const change_display_paso2 = () => {
  title_crear_h1.classList.add('displaynone')
  title_crear_p1.classList.add('displaynone')
  title_crear_h2.classList.remove('displaynone')
  title_crear_p2.classList.remove('displaynone')
}

const change_display_paso3 = () => {
  title_crear_h2.classList.add('displaynone')
  title_crear_p2.classList.add('displaynone')
}

const status_record_1 = () => {
  paso_1.classList.add('paso_active')
  paso_2.classList.remove('paso_active')
  paso_3.classList.remove('paso_active')
}

const status_record_2 = () => {
  paso_1.classList.remove('paso_active')
  paso_2.classList.add('paso_active')
  paso_3.classList.remove('paso_active')
}

const status_record_3 = () => {
  paso_1.classList.remove('paso_active')
  paso_2.classList.remove('paso_active')
  paso_3.classList.add('paso_active')
}

const change_display_repeat = () => {
  document.querySelector('.time').classList.add('displaynone')
  repeat_record.classList.add('displaynone')
  document.querySelector('.repeat_line').classList.add('displaynone')
  btnUpload.classList.add('displaynone')
  btnFinish.classList.add('displaynone')
  title_crear_h2.classList.add('displaynone')
  title_crear_p2.classList.add('displaynone')
  btnRecord.classList.add('displaynone')
}

const time_repeat_disable = () => {
  document.querySelector('.time').classList.add('displaynone')
  repeat_record.classList.remove('displaynone')
  document.querySelector('.repeat_line').classList.remove('displaynone')
}

let recorder
let gifBlob

const getStream = (action) => {
  navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
          height: 320
      }
  })
    .then(stream => {
      video.srcObject = stream;
      if (action === "play"){
        video.play()
        btnStart.classList.add('displaynone')
        btnRecord.classList.remove('displaynone')
      }else{
        video.pause()
      }

        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          height: 240,
          onGifRecordingStarted: function() {
            console.log('started')
          }
        })
        change_display_paso3()
    })

    .catch(error => {
      console.error(error)
      alert(`Debe permitir el acceso a la camara`)
    })
}

//Copy to clipboard
const copyToClipboard = url => {
  const el = document.createElement('textarea');
  el.value = url;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

//Download Gif
async function download_gif (url_gif, title_gif) {
  let a = document.createElement('a');
  let response = await fetch(url_gif)
  let file = await response.blob();
  a.download = title_gif
  a.href = window.URL.createObjectURL(file);
  a.click()
}

// Read Gif and set Download and Link button 
const loadGif = (idGif) => {
  fetch(`https://api.giphy.com/v1/gifs/${idGif}?api_key=${apiKey}`)
    .then(response => response.json())
    .then( response => {
      btn_download.classList.remove('displaynone')
      btn_link.classList.remove('displaynone')
      url_gif_upload = response.data.images.original.url
      getStream("pause")
      const viewGif_record = document.createElement('img')
      viewGif_record.classList.add('viewGif_record')
      viewGif_record.src = url_gif_upload
      // Download Gif
      video.after(viewGif_record)
      btn_download.addEventListener('click', () => {
        download_gif(url_gif_upload, "myGif")
      })
      // Copy Clipboard
      btn_link.addEventListener('click', () => copyToClipboard(url_gif_upload) )
    })
}

const recordStop = () => {
  recorder.stopRecording(() => {
    gifBlob = recorder.getBlob(); // recuperamos el video
  });
  // Finalizamos la grabacion!!
  btnFinish.classList.add('displaynone');
  btnUpload.classList.remove('displaynone');
}

// Upload Gif to gyphy and add to localstorage
const uploadGif = async () => {
  let data = new FormData();
  video_course_upload_start()
  data.append('file', gifBlob, 'migif.gif')
  console.log(data.get('file'))
  const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
    method: 'POST',
    body: data
  })
  const responseJson = await response.json()
  misGifos.push(responseJson.data.id)
  loadGif(responseJson.data.id)
  video_course_upload_ok()
  window.localStorage.setItem('misgifos', JSON.stringify(misGifos))
  // responsJson.data.id -> Guardar en localstorage
}

// timer
const time = () => {
  document.querySelector('.time').innerHTML = ""
  segundos = 0;
  minutos = 0;
  control = setInterval(() => {
      segundos += 1;
      if (segundos == 60) {
        segundos = 0;
        minutos += 1;
      }
      if (segundos < 10 && minutos < 10) {
        document.querySelector('.time').innerHTML = `00:0${minutos}:0${segundos}`
      } else if (segundos >= 10 && minutos < 10) {
        document.querySelector('.time').innerHTML = `00:0${minutos}:${segundos}`
      } else if (segundos < 10 && minutos > 10) {
        document.querySelector('.time').innerHTML = `00:${minutos}:0${segundos}`
      } else {
        document.querySelector('.time').innerHTML = `00:${minutos}:${segundos}`
      }
  }, 1000)
}

// Start video
btnStart.addEventListener('click', () => { 
    change_display_paso2()
    status_record_1()
    getStream("play")
})

// Start Record
btnRecord.addEventListener('click', () => {
  status_record_2()
  recordStart()
  document.querySelector('.time').classList.remove('displaynone')
  time()
})

// Finish Record
btnFinish.addEventListener('click', () => {
  change_display_paso3()
  recordStop()
  status_record_3()
  time_repeat_disable()
})

// Upload Gif
btnUpload.addEventListener('click', () => {
    status_record_3()
    uploadGif()
    change_display_repeat()
    //window.location.reload()
})

// Repeat Record
repeat_record.addEventListener('click', () => {
  change_display_paso2()
  status_record_1()
  getStream("play")
  change_display_repeat()
})

//window.localStorage.removeItem('misgifos')