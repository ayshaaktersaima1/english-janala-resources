const createElement = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return (htmlElements.join(' '));
}

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else {

        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLessons = async () => {

    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLevels(data.data))

    // const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
    // const data = await res.json();
    // console.log(data.data)


}

const displayLevels = (lessons) => {


    // 1
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // 2
    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btns"><i class="fa-solid fa-book-open"
                                    style="color: rgb(30, 48, 80);"></i>Lesson-${lesson.level_no}</button>
    
        `

        // 4
        levelContainer.append(btnDiv)
    })

}
loadLessons();

const removeActive = () => {
    const lessonBtns = document.querySelectorAll('.lesson-btns');
    lessonBtns.forEach(btn => btn.classList.remove('active'))

}
const loadLevelWord = (id) => {

    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('active')

            displayLevelWord(data.data);
        })
}

const displayLevelWord = (words) => {



    // 1
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length === 0) {
        wordContainer.innerHTML = `
       
        <div class="text-center font-bangla bg-sky-100 col-span-full py-10 rounded-xl space-y-6">
        <div> <i class="text-7xl fa-solid fa-triangle-exclamation" style="color: rgb(30, 48, 80);"></i> </div>
            <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
       `;
        manageSpinner(false);
        return;
    }

    // 2
    words.forEach(word => {

        // 3
        const card = document.createElement('div');
        card.innerHTML = `
<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "shobdo pawa jayni"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <h2 class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "shobdo pawa jayni"} / ${word.pronunciation ? word.pronunciation : 'shobdo pawa jayni'}"</h2>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#7abcf9] hover:bg-[#3c6287]"><i class="fa-solid fa-circle-info"
                        style="color: rgb(30, 48, 80);"></i></button>
                <button class="btn bg-[#7fb9ef] hover:bg-[#3c6287]"><i class="fa-solid fa-volume-high" style="color: rgb(30, 48, 80);"></i></button>

            </div>

        </div>
        `;

        // 4
        wordContainer.append(card);
    }

    );
    manageSpinner(false);

};


const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetails(data.data);


    // .then(res => res.json())
    // .then(data => displayWordDetails(data));

}

const displayWordDetails = (word) => {
    console.log(word.meaning)

    const detailsBox = document.getElementById('details-con');
    detailsBox.innerHTML = `
    
                    <h1 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone" style="color: rgb(30, 48, 80);"></i>${word.pronunciation})</h1>
                    <p class="font-bold">Meaning</p>
                    <p>${word.meaning}</p>
                    <p class="font-bold">Example</p>
                    <p>${word.sentence}</p>
                    <p>Synonyms</p>

<div>${createElement(word.synonyms)}</div>

    `;
    document.getElementById('my_modal_5').showModal();





}

