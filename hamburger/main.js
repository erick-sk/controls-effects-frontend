const hamburger = document
  .querySelector('.hamburger')
  .addEventListener('click', function () {
    document.querySelector('.main-container').classList.toggle('open');
  });
