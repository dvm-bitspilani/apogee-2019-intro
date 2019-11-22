const EVENT_DATE = new Date("March 27, 2020 23:59:59").getTime();

const setTime = () => {
    const timeNow = new Date().getTime();

    let days = Math.floor((EVENT_DATE - timeNow) / (1000 * 60 * 60 * 24));
    
    if (days < 0)
        days = '00';

    document.getElementById("countdown").innerHTML = days + ' DAYS';
}

window.onload = setTime;

const toogleRegisterForm = () => {
    if (document.getElementsByClassName('form-container')[0].style.display == 'none') {        
        document.getElementsByClassName('landing')[0].style.animation = 'glitch-transition 1s';

        setTimeout(() => {
            document.getElementsByClassName('landing')[0].style.display = 'none';
            document.getElementsByClassName('footer')[0].style.display = 'none';
            document.getElementsByClassName('background-animation')[0].style.display = 'none';
            document.getElementsByClassName('form-container')[0].style.display = 'flex';
            document.getElementsByClassName('form-container')[0].style.animation = 'glitch-transition 1s';
            setTimeout(clearAnimation, 1000);
        }, 1000);
    } else {
        document.getElementsByClassName('form-container')[0].style.animation = 'glitch-transition 1s';

        setTimeout(() => {
            document.getElementsByClassName('landing')[0].style.display = 'flex';
            document.getElementsByClassName('footer')[0].style.display = 'flex';
            document.getElementsByClassName('background-animation')[0].style.display = 'initial';
            document.getElementsByClassName('form-container')[0].style.display = 'none';
            document.getElementsByClassName('landing')[0].style.animation = 'glitch-transition 1s';
            setTimeout(clearAnimation, 1000);
        }, 1000);
    }
}

toogleRegisterForm();

const clearAnimation = () => {
    console.log('chala')
    document.getElementsByClassName('form-container')[0].style.animation = 'none';
    document.getElementsByClassName('landing')[0].style.animation = 'none';
}