/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#imageResult").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(function () {
  $("#upload").on("change", function () {
    readURL(input);
  });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById("upload");
var infoArea = document.getElementById("upload-label");

input.addEventListener("change", showFileName);
function showFileName(event) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = "File name: " + fileName;
}

/*  ==========================================
    SHOW VIDEO FROM CAMERA
* ========================================== */

let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
let camera_button = document.querySelector("#start-camera");
let click_button = document.querySelector("#click-photo");
let accept_button = document.querySelector('#accept-photo');
let cancel_button = document.querySelector('#cancel');
let stream;
let formData;
let blob;

function stopVideoStream() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null; // Clear the video source
  }
}

function dataURLtoBlob(dataURL) {
  let parts = dataURL.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

camera_button.addEventListener('click', async function() {
  accept_button.style.display='none';
  video.style.display="block";
  canvas.style.display= 'none';
  stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
  camera_button.style.display='none';
  click_button.style.display = 'block'
  cancel_button.style.display='block'
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');
    blob = dataURLtoBlob(image_data_url);
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([blob], 'image.jpg', { type: 'image/jpeg' }));
    input.files = dataTransfer.files;
    // formData = new FormData();
    // formData.append('file', blob, 'image.jpg');
    stopVideoStream();
    video.style.display="none";
    canvas.style.display= 'block';
    click_button.style.display = 'none';
    camera_button.innerHTML = 'retake';
    camera_button.style.display='block';

    accept_button.style.display='block';
   	// data url of the image
   	// console.log(image_data_url);
});

accept_button.addEventListener('click', function() {
  // input.files = [new File([blob], 'image.jpg', { type: 'image/jpeg' })];         //.append(formData);
  readURL(input)
  canvas.style.display= 'none';
  click_button.style.display = 'none';
  camera_button.innerHTML = 'Start Camera';
  camera_button.style.display='block';
  accept_button.style.display='none';
  cancel_button.style.display='none';
})

cancel_button.addEventListener('click', function() {
  stopVideoStream();
  canvas.style.display= 'none';
  video.style.display = 'none';
  click_button.style.display = 'none';
  camera_button.innerHTML = 'Start Camera';
  camera_button.style.display='block';
  accept_button.style.display='none';
  cancel_button.style.display='none';
})


