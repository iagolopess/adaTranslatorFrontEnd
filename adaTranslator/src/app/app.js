const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const textOriginalField = document.getElementById("text-to-translate");


let isButtonPressed = false;
let areYouSpeaking = false;


function onSpeak() {
    let originalLanguage = document.getElementById("original_language").value;
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

    textOriginalField.value = transcription;
    let translateTo = document.getElementById("translated_language").value;
    connectWithBackEnd(transcription, translateTo);

}

function translateText() {
    let getTextValue = textOriginalField.value;
    let translateTxtTo = document.getElementById("translated_language").value;
    connectWithBackEnd(getTextValue, translateTxtTo)
}

const btnTranslateText = document.getElementById("btn-translate-txt")

btnTranslateText.addEventListener("click", translateText)



const btnSpeak = document.getElementById("btn-listen__audio");
btnSpeak.addEventListener("mousedown", onSpeak);
btnSpeak.addEventListener("mouseup", notSpeak);
