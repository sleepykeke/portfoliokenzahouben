const supportedLanguages = ["nl", "fr", "en"];

const savedLanguage = localStorage.getItem("siteLanguage");

const currentLanguage = supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : "nl";


/* ==================================================
   PAGINA NAAM BEPALEN
================================================== */

function getPageName() {

    const fileName = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    const pages = {
        index: "home",
        about: "about",
        contact: "contact",
        projects: "projectsPage",

        "beau-house": "beau",
        "cozy-stride": "cozy",
        "le-petit-prince": "lePetitPrince",
        "me-and-the-devil": "meAndDevil",
        "my-uno-stats": "myUnoStats",
        "smart-home": "smartHome",
        "surf-festival": "surfFestival",
        "whispers-of-the-duat": "whispers"
    };

    return pages[fileName] || null;
}


/* ==================================================
   TRANSLATIONS LADEN
================================================== */

async function loadTranslations() {

    const isProjectPage = window.location.pathname.includes("/projects/");

    const jsonPath = isProjectPage
        ? "../languages.json"
        : "languages.json";


    try {

        const response = await fetch(jsonPath);

        if (!response.ok) {
            throw new Error("languages.json kon niet geladen worden.");
        }

        const translations = await response.json();

        applyTranslations(translations, currentLanguage);

    } catch (error) {

        console.error(
            "Vertalingen konden niet geladen worden:",
            error
        );

    }
}


/* ==================================================
   WAARDE UIT JSON HALEN
================================================== */

function getValue(object, path) {

    return path
        .split(".")
        .reduce(
            (value, key) => value?.[key],
            object
        );
}


/* ==================================================
   VERTALINGEN TOEPASSEN
================================================== */

function applyTranslations(translations, language) {

    const languageData = translations[language];

    if (!languageData) {
        return;
    }


    const pageName = getPageName();

    const pageData = pageName
        ? languageData[pageName]
        : null;


    /* ==================================================
       HTML TAAL
    ================================================== */

    document.documentElement.lang = language;



    /* ==================================================
       NORMALE TEKST
       Alleen elementen zonder data-i18n-attr
    ================================================== */

    document
        .querySelectorAll("[data-i18n]:not([data-i18n-attr])")
        .forEach((element) => {

            const key = element.dataset.i18n;

            let value = getValue(languageData, key);

            if (value === undefined && pageData) {
                value = getValue(pageData, key);
            }

            if (value !== undefined) {
                element.textContent = value;
            }

        });



    /* ==================================================
       ATTRIBUTEN
       Bijvoorbeeld:
       data-i18n="common.menuOpen"
       data-i18n-attr="aria-label"
    ================================================== */

    document
        .querySelectorAll("[data-i18n-attr]")
        .forEach((element) => {

            const attribute = element.dataset.i18nAttr;
            const key = element.dataset.i18n;

            if (!attribute || !key) {
                return;
            }

            let value = getValue(languageData, key);

            if (value === undefined && pageData) {
                value = getValue(pageData, key);
            }

            if (value !== undefined) {
                element.setAttribute(attribute, value);
            }

        });



    /* ==================================================
       PLACEHOLDERS
       
       Ondersteunt:
       data-i18n-placeholder="common.firstName"
    ================================================== */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach((element) => {

            const key = element.dataset.i18nPlaceholder;

            let value = getValue(languageData, key);

            if (value === undefined && pageData) {
                value = getValue(pageData, key);
            }

            if (value !== undefined) {
                element.placeholder = value;
            }

        });



    /* ==================================================
       ALTERNATIEVE MANIER VOOR PLACEHOLDERS

       Dit ondersteunt ook:
       data-i18n="common.firstName"
       data-i18n-attr="placeholder"

       Hierdoor hoef je geen dubbele systemen te gebruiken.
    ================================================== */

    document
        .querySelectorAll(
            '[data-i18n-attr="placeholder"]'
        )
        .forEach((element) => {

            const key = element.dataset.i18n;

            let value = getValue(languageData, key);

            if (value === undefined && pageData) {
                value = getValue(pageData, key);
            }

            if (value !== undefined) {
                element.setAttribute("placeholder", value);
            }

        });



    /* ==================================================
       PAGINA TITLE
    ================================================== */

    const titleElement = document.querySelector("title");

    if (titleElement?.dataset.i18n) {

        const key = titleElement.dataset.i18n;

        let value = getValue(languageData, key);

        if (value === undefined && pageData) {
            value = getValue(pageData, key);
        }

        if (value !== undefined) {
            titleElement.textContent = value;
        }

    }



    /* ==================================================
       TAALKNOPPEN ACTIEF MAKEN
    ================================================== */

    document.querySelectorAll("[data-lang]").forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });



    /* ==================================================
       TAAL OPSLAAN
    ================================================== */

    localStorage.setItem(
        "siteLanguage",
        language
    );

}


/* ==================================================
   TAAL VERANDEREN
================================================== */

function changeLanguage(language) {

    if (!supportedLanguages.includes(language)) {
        return;
    }

    localStorage.setItem(
        "siteLanguage",
        language
    );

    location.reload();

}


/* ==================================================
   TAALKNOPPEN
================================================== */

document.addEventListener("click", (event) => {

    const languageButton =
        event.target.closest("[data-lang]");

    if (!languageButton) {
        return;
    }

    event.preventDefault();

    changeLanguage(
        languageButton.dataset.lang
    );

});


/* ==================================================
   START
================================================== */

loadTranslations();