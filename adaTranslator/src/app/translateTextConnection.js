
async function connectWithBackEnd (textToTranslate, language) {
    try {
        console.log('Enviando requisição ao backend:', textToTranslate, language);
        
        const response = await fetch("https://adatranslatorbackend-production.up.railway.app/translate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: textToTranslate,
                lang: language
            })
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta da rede: ${response.status}`);
        }

        const data = await response.json();
        const textField = document.getElementById("transcript-text");
        textField.value = data.translated_text;

    } catch (error) {
        console.error('Erro na requisição fetch:', error);
    }
}
