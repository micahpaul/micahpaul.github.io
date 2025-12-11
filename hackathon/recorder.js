let stream;
let mediaRecorder;
const videoElement = document.getElementById('videoElement');
const startShareButton = document.getElementById('startShare');
const startRecordButton = document.getElementById('startRecord');
const stopRecordButton = document.getElementById('stopRecord');
const downloadLink = document.getElementById('download');
const recordedChunks = [];

// 1. Prompt user to select screen to share
startShareButton.addEventListener('click', async () => {
    try {
        // Use getDisplayMedia to prompt the user to select a screen/window/tab
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        videoElement.srcObject = stream;
        startRecordButton.disabled = false;
        startShareButton.disabled = true;

        // Stop recording when the user stops sharing via the browser's native controls
        const [videoTrack] = stream.getVideoTracks();
        videoTrack.addEventListener('ended', () => {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                stopRecording();
            }
        });
    } catch (err) {
        console.error('Error: ' + err);
    }
});

// 2. Start the recording process
startRecordButton.addEventListener('click', () => {
    recordedChunks.length = 0; // Clear previous chunks
    try {
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.onstop = handleStop;
        mediaRecorder.start();
        console.log('MediaRecorder started');

        startRecordButton.disabled = true;
        stopRecordButton.disabled = false;
    } catch (err) {
        console.error('Failed to create MediaRecorder:', err);
    }
});

// 3. Stop the recording
stopRecordButton.addEventListener('click', () => {
    stopRecording();
    startRecordButton.disabled = true;
    stopRecordButton.disabled = true;
    startShareButton.disabled = false;
});

function stopRecording() {
    mediaRecorder.stop();
    // Stop all media tracks to end the sharing
    stream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
}

// 4. Handle available data chunks
function handleDataAvailable(event) {
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
    }
}

// 5. Handle stop event and prepare download link
function handleStop(event) {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    
    downloadLink.href = url;
    downloadLink.download = 'screen-recording.webm';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download Recording';
    console.log('Recording stopped. Download link available.');
    
    // Optional: play the recorded video in the video element
    videoElement.src = url;
    videoElement.controls = true;
    videoElement.autoplay = true;
}
