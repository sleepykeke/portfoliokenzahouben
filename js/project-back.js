document.addEventListener("DOMContentLoaded", function () {

    const backButton = document.querySelector(".project-back");

    backButton.addEventListener("click", function () {

        if (document.referrer && history.length > 1) {
            history.back();
        } else {
            window.location.href = "../projects.html";
        }

    });

});