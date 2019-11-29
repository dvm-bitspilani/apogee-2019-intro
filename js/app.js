const EVENT_DATE = new Date("March 27, 2020 23:59:59").getTime();
const REGISTRATIONS_URL = 'https://bits-apogee.org/registrations/introreg';
const COLLEGE_URL = 'https://bits-apogee.org/registrations/get_college';

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


const getCollegesList = () => {
    fetch(COLLEGE_URL).then(data => {
        return data.json();
    }).then(response => {
        document.getElementsByTagName('datalist')[0].removeChild(document.getElementById('loading'));

        response.data.map(college => {
            const option = document.createElement('option');
            option.value = college.name;
            option.id = college.id;
            option.innerHTML = college.name;
            document.getElementById('college_input').appendChild(option);
        });
    });
}


const getCollegeId = () => {
    const input = document.getElementById('college');
    const val = input.value;
    const options = document.getElementById('college_input').childNodes;

    for(let i = 0; i < options.length; i++) {
        if(options[i].innerText === val) {
            return options[i].id;
        }
    }

    if (val) {
        return '%NOT_FOUND%';
    }
}


const showMessage = (msg) => {
    const messageBox = document.getElementsByClassName('message-box')[0];
    messageBox.style.display = 'initial';
    document.getElementById('message').innerHTML = msg;
    messageBox.style.animation = 'slideIn 0.5s';
    setTimeout(() => {
        messageBox.style.animation = 'none';
    }, 500);
}

const closeMessage = () => {
    const messageBox = document.getElementsByClassName('message-box')[0];
    messageBox.style.animation = 'slideOut 0.5s';
    setTimeout(() => {
        document.getElementById('message').innerHTML = '';
        messageBox.style.animation = 'none';
        messageBox.style.display = 'none';
    }, 500);
}


const form = document.getElementsByTagName('form')[0];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const data = new FormData(form);
    const body = {};
    for (const entry of data) {
        body[entry[0]] = entry[1];
    };

    body.college = getCollegeId();

    if(!body.gender || !body.year || !body.college) {
        showMessage('Incomplete form data! Please fill all the required fields.');
        return;
    }

    if (body.college == '%NOT_FOUND%') {
        showMessage('Invalid college name! Please select one from the list, if not found contact- PCr (+91-7838773681).');
        return;
    }

    const params = {
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        method: "POST"
    }

    fetch(REGISTRATIONS_URL, params).then(data => {
        return data.json();
    }).then(response => {
        if (response.message) {
            showMessage(response.message);
            return;
        }
        showMessage('Registration successfull!');
        toogleRegisterForm();
    }).catch(error => {
        showMessage("ERROR: " + error + '\n Contact administrator');
    });

}, false);



function showData(id) {
    const eOpts = document.querySelectorAll('#' + id + ' > option');
    for(i = 0; i < eOpts.length; i++) {
        eOpts[i].style.display = 'block';
    }
}



window.onload = () => {
    toogleRegisterForm();
    setTime();
    getCollegesList();
}