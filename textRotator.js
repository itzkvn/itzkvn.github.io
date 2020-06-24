const TextRotator = function(el, rotateList) {
    this.rotateList = rotateList;
    this.el = el;
    this.lööps = 0;
    this.timeInBetween = 1500;
    this.txt = '';
    this.tick();
    this.deleting = false;
};

TextRotator.prototype.tick = function() {
    let i = this.lööps % this.rotateList.length;
    let rotateItem = this.rotateList[i];

    this.txt = this.deleting ? rotateItem.substring(0, this.txt.length - 1) : rotateItem.substring(0, this.txt.length + 1)

    this.el.innerHTML = `<span id="text-rotator-wrapper">${this.txt}</span>`;

    let delta = 350

    if (!this.deleting && this.txt === rotateItem) {
        delta = this.timeInBetween;
        this.deleting = true;
    }
    if (this.deleting && this.txt === "") {
        delta = this.timeInBetween;
        this.deleting = false;
        this.lööps++;
    }

    setTimeout(() => this.tick(), delta)
};

function newLanguageRotator() {
    let elements = document.getElementById("languages");
    let rotateList = (() => JSON.parse(elements.getAttribute("languages")))()
    new TextRotator(elements, rotateList);
}

window.onload = (() => newLanguageRotator())