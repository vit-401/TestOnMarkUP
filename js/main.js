$(function () {
    $('.slider__big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider__min'
    });
    $('.slider__min').slick({
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider__big',
        focusOnSelect: true
    });


});
const paginationImg1 = document.querySelectorAll('.img-pagin1')
const paginationImg2 = document.querySelectorAll('.img-pagin2')
const paginationImg3 = document.querySelectorAll('.img-pagin3')
const form = document.querySelector('.product__inner')
const paginationFunction = (photo1 = 'black_red/black_red.png',
                            photo2 = 'black_red/black_red2.png',
                            photo3 = 'black_red/black_red3.png',
                            price1 = 30,
                            price2 = 20,
                            price3 = 40) => {
    const price = document.querySelectorAll('.product__tabs-money'),
        photo = document.querySelectorAll('.slider__min-photo'),
        bigPhoto = document.querySelectorAll('.slider__big-photo')
    photo[0].outerHTML = `<img src="img/${photo1}"class="slider__min-photo" alt="">`
    photo[1].outerHTML = `<img src="img/${photo2}"class="slider__min-photo" alt="">`
    photo[2].outerHTML = `<img src="img/${photo3}"class="slider__min-photo" alt="">`
    bigPhoto[0].outerHTML = `<img src="img/${photo1}"class="slider__big-photo" alt="">`
    bigPhoto[1].outerHTML = `<img src="img/${photo2}"class="slider__big-photo" alt="">`
    bigPhoto[2].outerHTML = `<img src="img/${photo3}"class="slider__big-photo" alt="">`
    price[0].innerHTML = '$' + price1
    price[1].innerHTML = '$' + price2
    price[2].innerHTML = '$' + price3
}
const paginationHandler = (selector1, photo1, photo2, photo3, price1, price2, price3) => {

    selector1.forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.product__tabs-images>img').forEach(item => {
                item.classList.remove('active')
            })

            let color = ''
            if (e.target.className === 'img-pagin1') {
                color = 'red'
            } else if (e.target.className === 'img-pagin2') {
                color = 'blue'
            } else if (e.target.className === 'img-pagin3') {
                color = 'green'
            }
            e.target.classList.add('active')
            paginationFunction(photo1, photo2, photo3, price1, price2, price3)
            let money = e.target.parentElement.parentElement.querySelector('.product__tabs-price>.product__tabs-money').textContent

            e.target.parentElement.parentElement.querySelector('.alert').value = `${color} ${money}`
        })
    })
}
paginationFunction()
paginationHandler(paginationImg1, 'black_red/black_red.png', 'black_red/black_red2.png', 'black_red/black_red3.png', 30.00, 30.00, 75.00)
paginationHandler(paginationImg2, 'blue/blue1.png', 'blue/blue2.png', 'blue/blue3.png', 40.00, 30.00, 100.00)
paginationHandler(paginationImg3, 'green/green1.png', 'green/green2.png', 'green/green3.png', 200.00, 400.00, 100.00)
postData(form)

const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        const object = {};
        const active = document.querySelector('.active').parentElement.parentElement.querySelector('.alert')
        let name = active.attributes['name'].textContent,
            value = active.attributes['value'].textContent
        console.log(`${name}: ${value}`)
        object[name] = value;
        console.log(object)
        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
}