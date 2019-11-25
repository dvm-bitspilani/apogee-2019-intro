const EVENT_DATE = new Date("March 27, 2020 23:59:59").getTime();
const URL = 'bits-apgee.org/registrations/introreg/';

const setTime = () => {
    const timeNow = new Date().getTime();

    let days = Math.floor((EVENT_DATE - timeNow) / (1000 * 60 * 60 * 24));
    
    if (days < 0)
        days = '00';

    document.getElementById("countdown").innerHTML = days + ' DAYS';
}


const toogleRegisterForm = () => {
    if (document.getElementsByClassName('form-container')[0].style.display == 'none') {        
        document.getElementsByClassName('landing')[0].style.animation = 'glitch-transition 0.5s';

        setTimeout(() => {
            document.getElementsByClassName('landing')[0].style.display = 'none';
            document.getElementsByClassName('footer')[0].style.display = 'none';
            document.getElementsByClassName('background-animation')[0].style.display = 'none';
            document.getElementsByClassName('form-container')[0].style.display = 'flex';
            document.getElementsByClassName('form-container')[0].style.animation = 'glitch-transition 0.5s';
            setTimeout(clearAnimation, 500);
        }, 500);
    } else {
        document.getElementsByClassName('form-container')[0].style.animation = 'glitch-transition 0.5s';

        setTimeout(() => {
            document.getElementsByClassName('landing')[0].style.display = 'flex';
            document.getElementsByClassName('footer')[0].style.display = 'flex';
            document.getElementsByClassName('background-animation')[0].style.display = 'initial';
            document.getElementsByClassName('form-container')[0].style.display = 'none';
            document.getElementsByClassName('landing')[0].style.animation = 'glitch-transition 0.5s';
            setTimeout(clearAnimation, 500);
        }, 500);
    }
}

const clearAnimation = () => {
    document.getElementsByClassName('form-container')[0].style.animation = 'none';
    document.getElementsByClassName('landing')[0].style.animation = 'none';
}


const form = document.getElementsByTagName('form')[0];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const data = new FormData(form);
    const body = {};
    for (const entry of data) {
        body[entry[0]] = entry[1];
    };

    if(!body.gender || !body.year) {
        alert('Incomplete form data! Please fill all the required fields.');
        return;
    }

    const params = {
        header: {
            "content-type": "application/json; charset=UTF-8"
        },
        body,
        method: "POST"
    }

    fetch(URL, params).then(data => {
        
    }).then(response => {

    }).then(error => {

    });

}, false);



window.onload = () => {
    setTime();
    toogleRegisterForm();
}