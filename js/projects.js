const projects = [

    {
        name: "Le Petit Prince",
        category: "3d",
        categoryKey: "projectsPage.animation",
        image: "./images/le_petit_prince_cover.jpg",
        link: "./projects/le-petit-prince.html"
    },


    {
        name: "Smart Home",
        category: "uiux",
        categoryKey: "projectsPage.uiux",
        image: "./images/smart_home_cover.png",
        link: "./projects/smart-home.html"
    },


    {
        name: "Beau's House",
        category: "3d",
        categoryKey: "projectsPage.animation",
        image: "./images/image_horizontal_1.jpg",
        link: "./projects/beau-house.html"
    },


    {
        name: "Surf Festival",
        category: "uiux",
        categoryKey: "projectsPage.uiux",
        image: "./images/surf_festival_cover.png",
        link: "./projects/surf-festival.html"
    },


    {
        name: "Whispers of the Duat",
        category: "3d",
        categoryKey: "projectsPage.animation",
        image: "./images/whispers_of_the_duat_cover.png",
        link: "./projects/whispers-of-the-duat.html"
    },


    {
        name: "Cozy Stride",
        category: "uiux",
        categoryKey: "projectsPage.uiux",
        image: "./images/basislogo_withoutbg.jpg",
        link: "./projects/cozy-stride.html"
    },


    {
        name: "My Uno Stats",
        category: "uiux",
        categoryKey: "projectsPage.uiux",
        image: "./images/my_uno_stats.jpg",
        link: "./projects/my-uno-stats.html"
    },


    {
        name: "Me and the Devil",
        category: "uiux",
        categoryKey: "projectsPage.uiux",
        image: "./images/me_and_the_devil.jpg",
        link: "./projects/me-and-the-devil.html"
    }

];



const projectsGrid =
    document.querySelector("#projects-grid");


const filterButtons =
    document.querySelectorAll(".project-filter");



/* ==================================================
   VERTALING LADEN
================================================== */

let projectTranslations = null;



async function loadProjectTranslations() {

    const savedLanguage =
        localStorage.getItem("siteLanguage");


    const language =
        ["nl", "fr", "en"].includes(savedLanguage)
            ? savedLanguage
            : "nl";


    try {

        const response =
            await fetch("languages.json");


        if (!response.ok) {
            throw new Error(
                "languages.json kon niet geladen worden."
            );
        }


        const translations =
            await response.json();


        projectTranslations =
            translations[language];


        createProjects("all");

    } catch (error) {

        console.error(
            "Projectvertalingen konden niet geladen worden:",
            error
        );


        /*
           Wanneer de vertaling niet geladen kan worden,
           gebruiken we gewoon de standaard Nederlandse tekst.
        */

        projectTranslations = null;

        createProjects("all");

    }

}



/* ==================================================
   VERTALING UIT OBJECT
================================================== */

function getProjectTranslation(path) {

    if (
        !projectTranslations ||
        !path
    ) {
        return "";
    }


    return path
        .split(".")
        .reduce(
            (value, key) => value?.[key],
            projectTranslations
        ) || "";

}



/* ==================================================
   PROJECTEN MAKEN
================================================== */

function createProjects(category) {

    if (!projectsGrid) {
        return;
    }


    projectsGrid.innerHTML = "";



    const filteredProjects =
        projects.filter((project) => {

            if (category === "all") {
                return true;
            }


            return project.category === category;

        });



    filteredProjects.forEach((project) => {


        /* ==================================================
           CARD
        ================================================== */

        const projectCard =
            document.createElement("article");


        projectCard.classList.add(
            "project-card"
        );



        /* ==================================================
           ACHTERGROND
        ================================================== */

        const projectBackground =
            document.createElement("div");


        projectBackground.classList.add(
            "project-card-background"
        );



        /* ==================================================
           AFBEELDING
        ================================================== */

        const projectImage =
            document.createElement("img");


        projectImage.classList.add(
            "project-card-image"
        );


        projectImage.src =
            project.image;


        projectImage.alt =
            project.name;



        /* ==================================================
           CATEGORIE
        ================================================== */

        const projectCategory =
            document.createElement("span");


        projectCategory.classList.add(
            "project-card-category"
        );


        const translatedCategory =
            getProjectTranslation(
                project.categoryKey
            );


        projectCategory.textContent =
            translatedCategory ||
            (
                project.category === "3d"
                    ? "3D & Animation"
                    : "UI/UX Design"
            );



        /* ==================================================
           PROJECTNAAM
        ================================================== */

        const projectButton =
            document.createElement("a");


        projectButton.classList.add(
            "project-card-button"
        );


        projectButton.href =
            project.link;


        projectButton.textContent =
            project.name;



        /* ==================================================
           ALLES SAMENVOEGEN
        ================================================== */

        projectBackground.appendChild(
            projectImage
        );


        projectCard.appendChild(
            projectBackground
        );


        projectCard.appendChild(
            projectCategory
        );


        projectCard.appendChild(
            projectButton
        );


        projectsGrid.appendChild(
            projectCard
        );

    });

}



/* ==================================================
   FILTERS
================================================== */

filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const selectedCategory =
                button.dataset.filter;


            filterButtons.forEach(
                (filterButton) => {

                    filterButton.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            createProjects(
                selectedCategory
            );

        }
    );

});



/* ==================================================
   START
================================================== */

loadProjectTranslations();