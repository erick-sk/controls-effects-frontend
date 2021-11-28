class IndexForSiblings {
  static get(el) {
    let children = el.parentNode.children;

    for (var i = 0; i < children.length; i++) {
      let child = children[i];
      if (child == el) return i;
    }
  }
}

class Slider {
  constructor(selector, movement = true) {
    this.move = this.move.bind(this);
    this.moveByButton = this.moveByButton.bind(this);
    this.slider = document.querySelector(selector);
    this.itemsCount = this.slider.querySelectorAll('.container > *').length;
    this.interval = null;
    this.counter = 0;
    this.movement = movement;

    this.start();
    this.buildControls();
    this.bindEvents();
  }

  start() {
    if (!this.movement) return;
    this.interval = window.setInterval(this.move, 2000);
  }

  restart() {
    if (this.interval) window.clearInterval(this.interval);
    this.start();
  }

  bindEvents() {
    this.slider
      .querySelectorAll('.controls li')
      .forEach((item) => item.addEventListener('click', this.moveByButton));
  }

  moveByButton(e) {
    let index = IndexForSiblings.get(e.currentTarget);
    this.counter = index;
    this.moveTo(index);
    this.restart();
  }

  buildControls() {
    for (var i = 0; i < this.itemsCount; i++) {
      let control = document.createElement('LI');

      if (i === 0) control.classList.add('active');

      this.slider.querySelector('.controls ul').appendChild(control);
    }
  }

  move() {
    this.counter++;
    if (this.counter > this.itemsCount - 1) this.counter = 0;
    this.moveTo(this.counter);
  }

  resetIndicator() {
    this.slider
      .querySelectorAll('.controls li.active')
      .forEach((item) => item.classList.remove('active'));
  }

  moveTo(index) {
    let left = index * 100;

    this.resetIndicator();
    this.slider
      .querySelector('.controls li:nth-child(' + (index + 1) + ')')
      .classList.add('active');
    this.slider.querySelector('.container').style.left = '-' + left + '%';
  }
}

(function () {
  new Slider('.slider', true);
})();
