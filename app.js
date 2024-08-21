const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", async () => {
    const word = document.querySelector("#wordInput").value.trim();
    if (word) {
        const result = await fetchWord(word);
        displayResult(result);
    } else {
        alert("Please enter a word to search.");
    }
});

async function fetchWord(word) {
    try {
        const response = await fetch(`${apiUrl}${word}`);
        if (!response.ok) {
            throw new Error("Word not found");
        }
        const data = await response.json();
        return data[0];
    } catch (err) {
        console.error("Error:", err);
        return null;
    }
}

function displayResult(result) {
    const wordElement = document.querySelector("#word");
    const phoneticElement = document.querySelector("#phonetic");
    const definitionsList = document.querySelector("#definitions");

    if (result) {
        wordElement.textContent = result.word;
        phoneticElement.textContent = result.phonetic || "No phonetic available";
        definitionsList.innerHTML = "";

        result.meanings.forEach(meaning => {
            meaning.definitions.forEach(def => {
                const li = document.createElement("li");
                li.textContent = def.definition;
                definitionsList.appendChild(li);
            });
        });
    } else {
        wordElement.textContent = "Word not found";
        phoneticElement.textContent = "";
        definitionsList.innerHTML = "";
    }
}
