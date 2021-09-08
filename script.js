'use strict';
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//*Check if all images were loaded 
const loadImages = function () {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//* Helper function to set  attributes
const setAttributes = function (element, attributes) {
    for (const key in attributes)
        element.setAttribute(key, attributes[key]);
}

// * Create Elements for Links & Photos, Add to DOM
const displayPhotos = function () {
   imagesLoaded=0;
    totalImages = photosArray.length;
    // * Run function for each object in photosArray
    photosArray.forEach(photo => {
        //* Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html); 
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // * Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //*Event listener,check when each is finsished loading
        img.addEventListener('load', loadImages);
        //* Add outline class to hovered image
        img.addEventListener('mouseover',function(){
        img.classList.add('outline');
        });

        //* Put <img> inside <a>,then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

        
    });
}


//  * Unsplash Api
const count = 10;
const apiKey = '5xN0EOo3jfmi1Cf0_M0jMS4J7fvSB_TCU-X2pF_HYSk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//  * Get photos from Unsplash API
const getPhotos = async function () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (err) {
        alert('You have exhausted your hourly limit! Come Back Later')
    }
}


//* Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// !On Load
getPhotos();
