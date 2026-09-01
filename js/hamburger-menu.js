document.addEventListener("DOMContentLoaded", function () {

    const hamburgerButton = document.querySelector(".hamburger-button");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuClose = document.querySelector(".menu-close");


    hamburgerButton.addEventListener("click", function () {
        menuOverlay.classList.add("open");
    });


    menuClose.addEventListener("click", function () {
        menuOverlay.classList.remove("open");
    });

});