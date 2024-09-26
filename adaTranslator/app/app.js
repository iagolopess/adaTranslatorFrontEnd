const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();


let isButtonPressed = false;
let areYouSpeaking = false;

function onSpeak() {

    let originalLanguage = document.getElementById("original_language").value
    recognition.lang = originalLanguage;

    if (!areYouSpeaking) {
        isButtonPressed = true;
        recognition.start();
        areYouSpeaking = true;

    }

}

function notSpeak() {
    if (areYouSpeaking) {
        isButtonPressed = false;
        recognition.stop();
        areYouSpeaking = false;
    }
}

recognition.onend = function () {
    if (isButtonPressed) {
        recognition.start();
    }

}

recognition.onresult = function (event) {
    const transcription = event.results[0][0].transcript;

    let textOriginalField = document.getElementById("text-to-translate");
    textOriginalField.innerText = transcription;

    let translateTo = document.getElementById("translated_language").value;

    connectWithBackEnd(transcription, translateTo);
}

const btnSpeak = document.getElementById("btn-listen__audio");

btnSpeak.addEventListener("mousedown", onSpeak);
btnSpeak.addEventListener("mouseup", notSpeak);


