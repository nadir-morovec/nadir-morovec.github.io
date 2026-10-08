const telegram = window.Telegram?.WebApp;

telegram?.ready();
telegram?.expand();

if (telegram?.isVersionAtLeast?.("6.1")) {
    telegram.setHeaderColor("#fbf2f6");
    telegram.setBackgroundColor("#fbf4f7");
}

const appSpace = document.getElementById("app-space");
const tabs = [...document.querySelectorAll("[role='tab']")];
const tabPanels = [...document.querySelectorAll("[data-panel]")];

document.querySelectorAll(".memory-photo").forEach((photo) => {
    const image = photo.querySelector(".memory-image");
    const placeholder = photo.querySelector(".memory-placeholder");
    const showPlaceholder = () => {
        image.hidden = true;
        placeholder.hidden = false;
    };

    image.addEventListener("error", showPlaceholder, { once: true });
    if (image.complete && image.naturalWidth === 0) showPlaceholder();
});

const loveNotes = [
    "Я люблю твой смех и чувствую себя счастливым когда слышу его.",
    "Мне нравится, как ты умеешь быть собой и при этом оставаться такой особенной.",
    "В твоих глазах можно утонуть, и я готов это сделать снова и снова.",
    "Когда ты радуешься чему-то, я радуюсь вместе с тобой.",
    "Своими амбициями и целеустремленностью ты вдохновляешь меня быть лучше.",
    "Ты видишь в простых вещах красоту, и это очень важно.",
    "Мне приятно, что ты меня понимаешь и поддерживаешь в трудные моменты.",
    "Я очень ценю твою верность и преданность нашим отношениям.",
    "Благодаря тебе я стал лучше понимать себя и свои чувства.",
    "У тебя бывают трудные дни, но ты всегда находишь силы идти вперед, и это восхищает меня.",
];
let previousNoteIndex = -1;

document.getElementById("draw-note")?.addEventListener("click", () => {
    const availableIndexes = loveNotes
        .map((_, index) => index)
        .filter((index) => index !== previousNoteIndex);
    const noteIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

    previousNoteIndex = noteIndex;
    document.getElementById("love-note").textContent = loveNotes[noteIndex];
    document.getElementById("note-slip").classList.remove("note-arrive");
    requestAnimationFrame(() => document.getElementById("note-slip").classList.add("note-arrive"));
});

document.getElementById("light-candles")?.addEventListener("click", (event) => {
    const button = event.currentTarget;

    document.getElementById("cake-display").classList.remove("is-lit");
    document.getElementById("wish-result").hidden = false;
    button.setAttribute("aria-pressed", "false");
    button.textContent = "Свечи задуты";
    button.disabled = true;
});

const letterToggle = document.getElementById("letter-toggle");
const letterContent = document.getElementById("letter-content");

letterToggle?.addEventListener("click", () => {
    letterToggle.setAttribute("aria-expanded", "true");
    letterToggle.hidden = true;
    letterContent.hidden = false;
});

tabs.forEach((tab) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const currentIndex = tabs.indexOf(tab);
        const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        selectTab(tabs[nextIndex]);
    });
});

function selectTab(selectedTab) {
    tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });

    appSpace.setAttribute("aria-label", selectedTab.dataset.tab);
    appSpace.setAttribute("aria-labelledby", selectedTab.id);
    tabPanels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== selectedTab.dataset.tab;
    });
}