import axios from "axios";

export const playAudio = async (word: string) => {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    if (res.data[0].phonetics.length > 0) {
        const audio = new Audio(res.data[0].phonetics[0].audio);
        audio.play();
    }
    else {
        console.log("No audio found for: ", word);
    }
}

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
