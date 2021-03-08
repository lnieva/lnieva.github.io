let misGifos = []

if (window.localStorage.getItem('misgifos')) {
  misGifos = JSON.parse(window.localStorage.getItem('misgifos'))
}

const video = document.querySelector('video');
const btnStart = document.querySelector('.btnStart');
const btnRecord = document.querySelector('.btnRecord');
const btnFinish = document.querySelector('.btnFinish');
const btnUpload = document.querySelector('.btnUpload');

const API_KEY = '5296N97M94Fl7EKKQrVjAuKMfDpFWk4L'

let recorder
let gifBlob


const getStream = () => {
  navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
          height: 480
      }
  })
    .then(stream => {
      video.srcObject = stream;
      video.play()

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

      btnStart.classList.add('hidden')
      btnRecord.classList.remove('hidden')
    })
    .catch(error => {
      console.error(error)
      alert(`Debe permitir el acceso a la camara`)
    })
}

const recordStart = () => {
  recorder.startRecording(); // Empezamos a grabar!!
  btnRecord.classList.add('hidden');
  btnFinish.classList.remove('hidden');
}

const recordStop = () => {
  recorder.stopRecording(() => {
    gifBlob = recorder.getBlob(); // recuperamos el video
  }); // Finalizamos la grabacion!!
  btnFinish.classList.add('hidden');
  btnUpload.classList.remove('hidden');
}

const uploadGif = async () => {
  let data = new FormData();
  data.append('file', gifBlob, 'migif.gif')
  console.log(data.get('file'))
  const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}
  `, {
    method: 'POST',
    body: data
  })
  const responseJson = await response.json()
  misGifos.push(responseJson.data.id)
  window.localStorage.setItem('misgifos', JSON.stringify(misGifos))// responsJson.data.id -> Guardar en localstorage
}

btnStart.addEventListener('click', getStream)
btnRecord.addEventListener('click', recordStart)
btnFinish.addEventListener('click', recordStop)
btnUpload.addEventListener('click', uploadGif)