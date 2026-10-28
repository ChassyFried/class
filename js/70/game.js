const eyes = document.querySelector("#eyesBtn");
const noses = document.querySelector("#nosesBtn");
const ears = document.querySelector("#earsBtn");
const mouths = document.querySelector("#mouthsBtn");
const accessories = document.querySelector("#accessoriessBtn");
const choices = document.querySelector("#choices");
const potatoArea = document.querySelector(".potato-area");
const backgroundPopup = document.querySelector(".backgroundPopup");
const chooseButton = document.querySelector("#chooseButton");
const colorPicker = document.querySelector('input[type="color"]');
const chooseBgrnd = document.querySelector("#openBgrnd");
const chooseMusic = document.querySelector("#openMusic");
const musicPopup = document.querySelector(".musicPopup");
const categoryButtons = document.querySelectorAll(".categories button");
const fastButton = document.querySelector("#fast");
const slowButton = document.querySelector("#slow");
const fastSong = document.querySelector("#fastSong");
const slowSong = document.querySelector("#slowSong");
const save = document.querySelector("#save");
const view = document.querySelector("#view");

let choice = null;
let offset = {
    x: 0,
    y: 0
};

chooseBgrnd.addEventListener("click", function () {
    backgroundPopup.style.display = "block";
    backgroundPopup.style.zIndex = "1000";
});

chooseButton.addEventListener("click", function () {
    document.body.style.backgroundColor =
        document.querySelector('input[type="color"]').value;

    backgroundPopup.style.display = "none";
});
chooseMusic.addEventListener("click", function () {
    musicPopup.style.display = "block";
    musicPopup.style.zIndex = "1000";
});

fastButton.addEventListener("click", function () {
    fastSong.play();
    musicPopup.style.display = "none";
});
slowButton.addEventListener("click", function () {
    slowSong.play();
    musicPopup.style.display = "none";

})

view.addEventListener("click", function () {
    loadCreation();
})
function loadCreation() {
    const creation = JSON.parse(localStorage.getItem("potatoCreation"));

    if (creation === null) {
        return;
    }

    const potatoArea = document.querySelector(".potato-area");

    creation.forEach(function (item) {
        const img = document.createElement("img");

        img.src = item.src;
        img.className = "choice";
        img.style.position = "absolute";
        img.style.left = item.left;
        img.style.top = item.top;
        img.style.width = item.width;
        img.style.height = item.height;

        potatoArea.appendChild(img);
    });
}
loadCreation();
function saveCreation() {
    const potatoArea = document.querySelector(".potato-area");
    const creation = [];

    potatoArea.querySelectorAll(".choice").forEach(function (item) {
        creation.push({
            src: item.src,
            left: item.style.left,
            top: item.style.top,
            width: item.style.width,
            height: item.style.height
        });
    });

    localStorage.setItem("potatoCreation", JSON.stringify(creation));
}
eyes.addEventListener("click", function () {
    choices.innerHTML = `
        <img src="images/eyes1.png" class="choice" alt="Eyes">
        <img src="images/eyes2.png" class="choice" alt="Eyes">
        <img src="images/eyes3.png" class="choice" alt="Eyes">
    `;
});

noses.addEventListener("click", function () {
    choices.innerHTML = `
        <img src="images/noses1.png" class="choice nose" alt="Nose">
        <img src="images/noses2.png" class="choice nose" alt="Nose">
        <img src="images/noses3.png" class="choice nose" alt="Nose">
    `;
});

mouths.addEventListener("click", function () {
    choices.innerHTML = `
        <img src="images/mouths1.png" class="choice" alt="Mouth">
        <img src="images/mouths2.png" class="choice" alt="Mouth">
        <img src="images/mouths3.png" class="choice" alt="Mouth">
    `;
});



accessories.addEventListener("click", function () {
    choices.innerHTML = `
        <img src="images/hats1.png" class="choice hat" alt="Hat">
        <img src="images/hats2.png" class="choice hat" alt="Hat">
        <img src="images/hats3.png" class="choice hat" alt="Hat">
    `;
});

window.addEventListener("pointerdown", function (e) {
    if (!e.target.classList.contains("choice")) {
        return;
    }

    choice = e.target;

    const rect = choice.getBoundingClientRect();
    const potatoRect = potatoArea.getBoundingClientRect();

    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;

    potatoArea.appendChild(choice);
    choice.classList.add("placed-part");

    choice.style.left =
        `${e.clientX - potatoRect.left - offset.x}px`;

    choice.style.top =
        `${e.clientY - potatoRect.top - offset.y}px`;

    if (choice.classList.contains("nose")) {
        choice.style.width = "55px";
    } else if (choice.classList.contains("hat")) {
        choice.style.width = "250px";
    } else {
        choice.style.width = "100px";
    }
    choice.style.zIndex = "1000";
});

window.addEventListener("pointermove", function (e) {
    if (!choice) {
        return;
    }

    const potatoRect = potatoArea.getBoundingClientRect();

    choice.style.left =
        `${e.clientX - potatoRect.left - offset.x}px`;

    choice.style.top =
        `${e.clientY - potatoRect.top - offset.y}px`;
});

window.addEventListener("pointerup", function () {
    choice = null;
});

window.addEventListener("pointercancel", function () {
    choice = null;
});

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
    });
});