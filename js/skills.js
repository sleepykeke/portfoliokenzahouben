const hardSkills = [

    // UI/UX DESIGN
    {
        name: "Figma",
        category: "uiux",
        logo: "./images/figma.svg",
        level: 4
    },
    {
        name: "Adobe PS",
        category: "uiux",
        logo: "./images/adobe-ps.svg",
        level: 3
    },
    {
        name: "Adobe AI",
        category: "uiux",
        logo: "./images/adobe-ai.svg",
        level: 4
    },
    {
        name: "Adobe ID",
        category: "uiux",
        logo: "./images/adobe-id.svg",
        level: 3
    },

    // 3D & ANIMATION
    {
        name: "Maya",
        category: "3d",
        logo: "./images/maya.svg",
        level: 4
    },
    {
        name: "Unity",
        category: "3d",
        logo: "./images/unity.svg",
        level: 3
    },
    {
        name: "Unreal Engine",
        category: "3d",
        logo: "./images/unreal-engine.svg",
        level: 3
    },
    {
        name: "Adobe SP",
        category: "3d",
        logo: "./images/adobe-sp.svg",
        level: 3
    },

    // WEB DEVELOPMENT
    {
        name: "JavaScript",
        category: "web",
        logo: "./images/javascript.svg",
        level: 3
    },
    {
        name: "Kotlin",
        category: "web",
        logo: "./images/kotlin.svg",
        level: 3
    },
    {
        name: "HTML",
        category: "web",
        logo: "./images/html.svg",
        level: 4
    },
    {
        name: "CSS",
        category: "web",
        logo: "./images/css.svg",
        level: 4
    }

];


const hardSkillsContainer = document.querySelector("#hard-skills");
const filterButtons = document.querySelectorAll(".skill-filter");


function createSkillCards(category) {

    hardSkillsContainer.innerHTML = "";

    const filteredSkills = hardSkills.filter(function (skill) {
        return skill.category === category;
    });

    filteredSkills.forEach(function (skill) {

        const skillCard = document.createElement("div");
        skillCard.classList.add("skill-card");


        // Titel
        const skillTitle = document.createElement("div");
        skillTitle.classList.add("skill-title");


        // Naam
        const skillName = document.createElement("span");
        skillName.classList.add("skill-name");
        skillName.textContent = skill.name;


        // Logo
        const skillLogo = document.createElement("img");
        skillLogo.classList.add("skill-logo");

        skillLogo.src = skill.logo;
        skillLogo.alt = skill.name + " logo";


        skillTitle.appendChild(skillName);
        skillTitle.appendChild(skillLogo);


        // Level
        const skillLevel = document.createElement("div");
        skillLevel.classList.add("skill-level");


        for (let i = 1; i <= 5; i++) {

            const level = document.createElement("span");
            level.classList.add("level");

            if (i <= skill.level) {
                level.classList.add("active");
            }

            skillLevel.appendChild(level);
        }


        // Card
        skillCard.appendChild(skillTitle);
        skillCard.appendChild(skillLevel);

        hardSkillsContainer.appendChild(skillCard);
    });
}


// Filters
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(function (button) {
            button.classList.remove("active");
        });

        button.classList.add("active");

        createSkillCards(selectedCategory);
    });

});


// Start met UI/UX
createSkillCards("uiux");