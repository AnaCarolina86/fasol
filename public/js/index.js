/* ---Menu Bar--- */

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav_link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () =>{
        document.body.classList.remove('nav-open');
    });
});

/* ---Personalizado Page--- */

const radioMan = document.getElementById('man');
const radioWoman = document.getElementById('woman');
const womanMeasures = document.getElementById('woman-measures');
const manMeasures = document.getElementById('man-measures');

radioMan.addEventListener('click', () => {
    manMeasures.classList.add('input-open');
    womanMeasures.classList.remove('input-open');
});

radioWoman.addEventListener('click', () => {
    womanMeasures.classList.add('input-open');
    manMeasures.classList.remove('input-open');
});