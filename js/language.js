const supportedLanguages = ["nl", "fr", "en"];


/* ==================================================
   HUIDIGE TAAL
================================================== */

const savedLanguage = localStorage.getItem("siteLanguage");

const currentLanguage = supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : "nl";



/* ==================================================
   PAGINA BEPALEN
================================================== */

function getPageName() {

    const pageElement = document.querySelector("[data-page]");

    if (pageElement) {
        return pageElement.dataset.page;
    }


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
   JSON LADEN
================================================== */

async function loadTranslations() {

    const isProjectPage =
        window.location.pathname.includes("/projects/");


    const jsonPath = isProjectPage
        ? "../languages.json"
        : "languages.json";


    try {

        const response = await fetch(jsonPath);


        if (!response.ok) {

            throw new Error(
                `languages.json kon niet geladen worden. Status: ${response.status}`
            );

        }


        const translations = await response.json();


        applyTranslations(
            translations,
            currentLanguage
        );


    } catch (error) {

        console.error(
            "Vertalingen konden niet geladen worden:",
            error
        );

    }

}



/* ==================================================
   WAARDE UIT OBJECT HALEN
================================================== */

function getValue(object, path) {

    if (!object || !path) {
        return undefined;
    }


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

        console.error(
            `Taal "${language}" bestaat niet in languages.json.`
        );

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
       NORMALE TEKSTVERTALINGEN
       
       BELANGRIJK:
       Elementen die data-i18n-attr hebben,
       worden hier NIET aangepast.
       
       Zo blijven bijvoorbeeld:
       - hamburger spans
       - pijltje afbeeldingen
       intact.
    ================================================== */

    document
        .querySelectorAll("[data-i18n]")
        .forEach((element) => {

            /*
               Alleen echte tekst-elementen vertalen.

               Elementen met data-i18n-attr worden
               hieronder alleen via hun attribuut vertaald.
            */

            if (element.dataset.i18nAttr) {
                return;
            }


            const key = element.dataset.i18n;


            let value = getValue(
                languageData,
                key
            );


            if (
                value === undefined &&
                pageData
            ) {

                value = getValue(
                    pageData,
                    key
                );

            }


            if (value !== undefined) {

                element.textContent = value;

            }

        });



    /* ==================================================
       PLACEHOLDERS
    ================================================== */

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach((element) => {

            const key =
                element.dataset.i18nPlaceholder;


            let value = getValue(
                languageData,
                key
            );


            if (
                value === undefined &&
                pageData
            ) {

                value = getValue(
                    pageData,
                    key
                );

            }


            if (value !== undefined) {

                element.placeholder = value;

            }

        });



    /* ==================================================
       ATTRIBUTEN
       
       Bijvoorbeeld:
       aria-label="Open menu"
       aria-label="Go back to the previous page"
    ================================================== */

    document
        .querySelectorAll("[data-i18n-attr]")
        .forEach((element) => {

            const attribute =
                element.dataset.i18nAttr;


            const key =
                element.dataset.i18n;


            let value = getValue(
                languageData,
                key
            );


            if (
                value === undefined &&
                pageData
            ) {

                value = getValue(
                    pageData,
                    key
                );

            }


            if (value !== undefined) {

                element.setAttribute(
                    attribute,
                    value
                );

            }

        });



    /* ==================================================
       PAGE TITLE
    ================================================== */

    const titleElement =
        document.querySelector("title");


    if (
        titleElement &&
        titleElement.dataset.i18n
    ) {

        const key =
            titleElement.dataset.i18n;


        let value = getValue(
            languageData,
            key
        );


        if (
            value === undefined &&
            pageData
        ) {

            value = getValue(
                pageData,
                key
            );

        }


        if (value !== undefined) {

            titleElement.textContent = value;

        }

    }



    /* ==================================================
       TAALKNOPPEN
    ================================================== */

    document
        .querySelectorAll("[data-lang]")
        .forEach((button) => {

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

    if (
        !supportedLanguages.includes(language)
    ) {
        return;
    }


    localStorage.setItem(
        "siteLanguage",
        language
    );


    window.location.reload();

}



/* ==================================================
   TAALKNOPPEN
================================================== */

document.addEventListener(
    "click",
    (event) => {

        const languageButton =
            event.target.closest("[data-lang]");


        if (!languageButton) {
            return;
        }


        event.preventDefault();


        changeLanguage(
            languageButton.dataset.lang
        );

    }
);



/* ==================================================
   START
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadTranslations
);