let form = document.querySelector('form');
let input = document.querySelector('#inputData');
let select = document.querySelector('select');
let image = document.querySelector('img');
let buttonBox = document.querySelector('.buttonBox');
let alerts = document.querySelector('.alertBox')
let blob;
let fileName;
input.focus();
let alertFunc = (text, className) => {
    alerts.innerHTML = `<div class="alert  alert-${className} my-1" data-aos="fade-down" data-aos-duration="800" >
    ${text}
    </div>`
    setTimeout(function () {//After three second the alert was display none
        alerts.innerHTML = "";
    }, 2600)
}
let generateQR = async (e) => {
    e.preventDefault();
    let res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${select.value}&data=${input.value}`)
    image.setAttribute('src', res.url)
    blob = await res.blob();
    buttonBox.innerHTML = `<button id="btn" class="btn btn-success">Download QR </button>`
    fileName = inputData.value;
    form.reset();
    input.focus();
    alertFunc('Success ! QR Generated Successfully!','success')
};

buttonBox.addEventListener('click', () => {
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob)
    link.download = `${fileName}.png`;
    link.click();
})

form.addEventListener('submit', generateQR);


/********************************************************************           Rough Work                            */
    // console.log(link.href = URL.createObjectURL(blob));
    // link.setAttribute('href', blob)
    // let clickEvent = new MouseEvent('click', {
    //     view: window,
    //     bubbles: true,
    //     cancelable: true,
    // });
    // link.dispatchEvent(clickEvent);

    // URL.revokeObjectURL(link.href);