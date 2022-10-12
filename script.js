const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const imgQuantity = 5;
const apiKey = 'YOUR_API_KEY_HERE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgQuantity}`;

function imageLoaded() {
    imagesLoaded++;

    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imgQuantity = 30;
    }
}

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();