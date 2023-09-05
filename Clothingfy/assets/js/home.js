document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
});

let carousel = document.getElementById("template-mo-zay-hero-carousel");

let items = document.querySelectorAll(".carousel-inner .carousel-item");

function activate(index) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }
    items[index].classList.add("active");
}

let currentIndex = 0;

function next() {
    currentIndex++;
    if (currentIndex == items.length) {
        currentIndex = 0;
    }
    activate(currentIndex);
}

function prev() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    }

    activate(currentIndex);
}

let prevControl = document.querySelector(".carousel-control-prev.text-decoration-none.w-auto.ps-3");
let nextControl = document.querySelector(".carousel-control-next.text-decoration-none.w-auto.pe-3");

prevControl.addEventListener("click", prev);
nextControl.addEventListener("click", next);


let interval;

function start() {
    interval = setInterval(next, 3000);
}

function stop() {
    clearInterval(interval);
}

start();

carousel.addEventListener("mouseenter", stop);
carousel.addEventListener("mouseleave", start);