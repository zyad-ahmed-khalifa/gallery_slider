let popupul = document.querySelector("#popup ul"),
    imgs = Array.from(document.querySelectorAll("#gallery .row .item img"));

(function () {
    for (let i = 0; i < imgs.length; i++) {
        let li = document.createElement("li");
        li.textContent = i + 1;
        popupul.append(li);
    }
})()


let layouts = document.querySelectorAll("#gallery .row .layout"),
    popup = document.querySelector("#popup"),
    popupimg = popup.querySelector("img"),
    currentindex,
    indecators = Array.from(popup.querySelectorAll("ul li"));



// open popup
for (let layout of layouts) {
    layout.addEventListener("click", function (event) {
        (event.target instanceof SVGElement) ? popup.classList.add("show") : "";
        let currentimg = this.previousElementSibling;
        setimg(currentimg);
    })
} 

// close popup
popup.addEventListener("click", function (event) {
    (event.target.classList.contains("exit")) ? close() : "";
})

// set img to popup
function setimg(img) {
    let currentimgsrc = img.getAttribute("src")
    currentindex = imgs.findIndex(function (imgelement) {
        return imgelement == img
    });
    popupimg.setAttribute("src", currentimgsrc)
    for (let li of indecators) {
        li.classList.remove("active")
    }
    indecators[currentindex].classList.add("active")
}

// next img
popup.addEventListener("click", function (event) {
    (event.target.classList.contains("next")) ? nextimg() : "";
})

function nextimg() {
    currentindex = (currentindex === imgs.length - 1) ? -1 : currentindex;
    let nextimg = imgs[currentindex + 1];
    setimg(nextimg)
}

// prev img
popup.addEventListener("click", function (event) {
    (event.target.classList.contains("prev")) ? previmg() : "";
})

function previmg() {
    currentindex = (currentindex === 0) ? imgs.length : currentindex;
    let previmg = imgs[currentindex - 1];
    setimg(previmg)
}



// additionals

function close() {
    popup.classList.remove("show");
}

document.addEventListener("keydown", function (event) {
    (event.key === "Escape") ? close() : "";
    (event.code == "ArrowRight") ? nextimg() : "";
    (event.code == "ArrowLeft") ? previmg() : "";
})
popup.addEventListener("click", function (event) {
    (event.target.id === "popup") ? close() : "";
})

for (let li of indecators) {
    li.addEventListener("click", function () {
        setimg(imgs[indecators.indexOf(li)])
    })
}
