
import Notiflix from 'notiflix';
import FetchGallery from './api';
import imageCards from './partials/imageCards';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = `https://pixabay.com/api/`;
const PixabeyKey = `?key=24814635-98ab646e956d73723bbfbc5eb`;

const form = document.querySelector(`.search-form`);
const searchField = form.querySelector(`[name = searchQuery]`)
const submitBtn = form.querySelector(`button`);
const imageBox = document.querySelector(`.gallery`)
const loadMoreBtn = document.querySelector(`.load-more`)

const fetchGallery = new FetchGallery();

form.addEventListener(`submit`, onSearchFormSubmit);
loadMoreBtn.addEventListener(`click`, onLoadMore)

function onSearchFormSubmit(evt) {
    evt.preventDefault();
    clearImagesBox();
    fetchGallery.resetPage();

    fetchGallery.query = evt.target.elements.searchQuery.value.trim();

    fetchGallery.fetchImagesCards()
    .then(successFetchMessage)
        .then(createMarkup)
        .then(lightbox);  
}

function onLoadMore() {
    fetchGallery.fetchImagesCards()
        .then(createMarkup)
        .then(lightbox)
        .then(scroll);
};

function scroll() { 
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}

function createMarkup(imagesArr) {
    const imagesAmount = imagesArr.hits.length;
    console.log(imagesArr)
    
    loadMoreBtn.classList.remove('is-hidden');
     
    imagesArr.hits.forEach(element => {
        imageBox.insertAdjacentHTML(`beforeend`, imageCards(element));
    });

    if (!imagesAmount){
        Notiflix.Notify.warning(`Sorry, there are no images matching your search query. Please try again.`);
        loadMoreBtn.classList.add('is-hidden');
    return
    };
    
    if (fetchGallery.query === '') {
        clearImagesBox();
        loadMoreBtn.classList.add('is-hidden');
        return Notiflix.Notify.warning('Please, fill the main field');
    }

     if (imagesArr.hits.length < 40 && imagesArr.hits.length > 0) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
     }
}


function successFetchMessage(data){
        if (data.hits.length > 0) {
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images !!!`);
        }
        return data
    }

function clearImagesBox() {
     imageBox.innerHTML = '';
      
};

function lightbox() {
     const lightbox = new SimpleLightbox(".gallery a")
 lightbox.refresh();
 
}
