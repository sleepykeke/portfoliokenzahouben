const projects = [

    {
        name: "Le Petit Prince",
        category: "3d",
        categoryName: "3D & Animatie",
        image: "./images/le_petit_prince_cover.jpg",
        link: "./projects/le-petit-prince.html"
    },

    {
        name: "Smart Home",
        category: "uiux",
        categoryName: "UI/UX Design",
        image: "./images/smart_home_cover.png",
        link: "./projects/smart-home.html"
    },

    {
        name: "Beau's House",
        category: "3d",
        categoryName: "3D & Animatie",
        image: "./images/image_horizontal_1.jpg",
        link: "./projects/beau-house.html"
    },

    {
        name: "Surf Festival",
        category: "uiux",
        categoryName: "UI/UX Design",
        image: "./images/surf_festival_cover.png",
        link: "./projects/surf-festival.html"
    },

    {
        name: "Whispers of the Duat",
        category: "3d",
        categoryName: "3D & Animatie",
        image: "./images/whispers_of_the_duat_cover.png",
        link: "./projects/whispers-of-the-duat.html"
    },

    {
        name: "Cozy Stride",
        category: "uiux",
        categoryName: "UI/UX Design",
        image: "./images/basislogo_withoutbg.jpg",
        link: "./projects/cozy-stride.html"
    },

    {
        name: "My Uno Stats",
        category: "uiux",
        categoryName: "UI/UX Design",
        image: "./images/my_uno_stats.jpg",
        link: "./projects/my-uno-stats.html"
    },

    {
        name: "Me and the Devil",
        category: "uiux",
        categoryName: "UI/UX Design",
        image: "./images/me_and_the_devil.jpg",
        link: "./projects/me-and-the-devil.html"
    }

];


const projectsGrid = document.querySelector("#projects-grid");
const filterButtons = document.querySelectorAll(".project-filter");


/* ==================================================
   PROJECTEN MAKEN
================================================== */

function createProjects(category) {

    projectsGrid.innerHTML = "";


    const filteredProjects = projects.filter(function (project) {

        if (category === "all") {
            return true;
        }

        return project.category === category;

    });


    filteredProjects.forEach(function (project) {

        const projectCard = document.createElement("article");

        projectCard.classList.add("project-card");


        /* Achtergrond */

        const projectBackground = document.createElement("div");

        projectBackground.classList.add("project-card-background");


        const projectImage = document.createElement("img");

        projectImage.classList.add("project-card-image");

        projectImage.src = project.image;
        projectImage.alt = project.name;


        /* Categorie */

        const projectCategory = document.createElement("span");

        projectCategory.classList.add("project-card-category");

        projectCategory.textContent = project.categoryName;


        /* Naam */

        const projectButton = document.createElement("a");

        projectButton.classList.add("project-card-button");

        projectButton.href = project.link;

        projectButton.textContent = project.name;


        /* Alles samenvoegen */

        projectBackground.appendChild(projectImage);

        projectCard.appendChild(projectBackground);

        projectCard.appendChild(projectCategory);

        projectCard.appendChild(projectButton);

        projectsGrid.appendChild(projectCard);

    });

}


/* ==================================================
   FILTERS
================================================== */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.filter;


        filterButtons.forEach(function (button) {
            button.classList.remove("active");
        });


        button.classList.add("active");


        createProjects(selectedCategory);

    });

});


/* ==================================================
   START
================================================== */

createProjects("all");