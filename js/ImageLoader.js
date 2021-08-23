import PicturePopup from './PicturePopup'

function returnContent (data) {
  // "id" : "1",
  // "status" : "fill",
  // "type" : "vertical-big",
  // "name" : "gray blsk",
  // "materials" : "canvas, acrylics",
  // "size" : "40x40cm",
  // "year" : "2020",
  // "image" : "./assets/images/1.jpg",
  // "text" : "When the computer absorbed design (and almost all our functions) the humanity of its practice was significantly emptied, not only in the nature of the technique but also in its orientation. Where there is a machine, there is, essentially, the absence of a human being."

//return all content
let content = data.map(data => {
   if(data.status == 'fill') {
    return `
    <div class="col">
      <div class="gallery__item " data-type="show" data-id="${data.id}">
        <a href="${window.location.pathname}?${data.collection}&id=${data.id}&${data.name}">
        <div class="gallery__item-image ${data.type}">
          <img src="${data.thumbnail}" alt="">
        </div>
        <div class="gallery__item-info">
          <div class="gallery__item-wrapper">
            <div class="gallery__item-title"><span class="gallery__item-title--uppercase">${data.name}</span>  / <br> ${data.materials}</div>
            <div class="gallery__item-size">${data.size}</div>
          </div>
          <div class="gallery__item-year">© ${data.year}</div>
        </div>
        </a>
      </div>
    </div>
    `
   }

   else if(data.status == 'empty') {
     return `
      <div class="col ${data.status}">
        <div class="gallery__item" data-id="${data.id}"> </div>
      </div>
    `
   }
  })

  return content.join('')
}

//for link with GET param
function returnGetPicture (data, getId) {
  return `
    <div class="container">
    <div class="row">
      <div class="col-12 col-sm-5 col-xl-3">
        <div class="picture__title opacity">${data[getId].picture_name ? data[getId].picture_name : data[getId].name}</div>
      </div>
      <div class="col-12 col-md-7 col-xl-9">
        <div class="row">
          <div class="col-12 col-xl-6">
            <div class="picture__content opacity">
              <div class="picture__materials">/ ${data[getId].materials}</div>
              <div class="picture__size">${data[getId].size}</div>
              <div class="picture__description">${data[getId].text}</div>
              <div class="picture__year">© ${data[getId].year}</div>
            </div>
          </div>
          <div class="col-12 col-xl-6">
            <div class="picture__image opacity">
              <img data-type="image" src="${data[getId].image}" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>  
    `
}

export default class ImageLoader {
  constructor(data, container, picture, pictureContainer, getParams) {
    this.data = data
    this.getParams = getParams
    this.$picture = document.querySelector(picture)
    this.$container = document.querySelector(container)
    this.$pictureContainer = document.querySelector(pictureContainer)

    this.render()
    this.renderGet()
    this.setup()
  }

  render () {
    this.$container.innerHTML = returnContent(this.data)
  }

  renderPicture (number) {
    this.$pictureContainer.innerHTML = returnPictureContent(this.data, number, this.getParams, this.getParams['id'])
  }

  //if user clicked on the link with GET params
  renderGet () {
    console.log(this.getParams['id'])
    if(this.getParams['id']) {
      document.querySelector('body').style.overflow = 'hidden'
      
      this.$pictureContainer.innerHTML = returnGetPicture(this.data, this.getParams['id'])
      this.showPicture()
      this.pictureAnimation()
      this.picturePopup()
    }
  }

  setup () {
    this.handlerClickPicture = this.handlerClickPicture.bind(this)
    this.$picture.addEventListener('click', this.handlerClickPicture)

    document.querySelectorAll('.gallery__item a').forEach(link => {
      link.addEventListener('click', this.location)
    })
  }

  handlerClickPicture (e) {
    let {type} = e.target.dataset
    
    if(type == "show") {
      this.showPicture()
    }

    else if(type == "close") {
      this.hidePicture()
    }
  }

  location () {
    let initialPage = this.getAttribute('href')
    document.querySelector('.shadow').classList.add('shadow--active')

    setTimeout(() => {
      location.href = initialPage
    }, 250)
  }

  showPicture () {
    this.$picture.classList.remove('hide')
  }

  shadowActive() {
    document.querySelector('.shadow').classList.add('shadow--active')
  }

  hideShadow() {
    document.querySelector('.shadow').classList.remove('shadow--active')
  }

  hidePicture () {
    this.$picture.classList.remove('picture--show')
  }

  //FIX-ME ;(
  pictureAnimation() {
    let $elem1 = document.querySelector('.picture__title')
    let $elem2 = document.querySelector('.picture__content')
    let $elem3 = document.querySelector('.picture__image')

    if($elem1 && $elem2 && $elem3) {
      setTimeout(() => {
        $elem1.classList.remove('opacity')
      }, 300)
    
      setTimeout(() => {
        $elem2.classList.remove('opacity')
      }, 500)
    
      setTimeout(() => {
        $elem3.classList.remove('opacity')
      }, 700)
    }
  
    return false
  }

  //FIX-ME ?
  picturePopup() {
    if(document.querySelector('.picture-popup') && document.querySelector('.picture__image img')) {
      let picturePopup = new PicturePopup('.picture-popup', '.picture__image img', '.picture-popup__image')
    }
  }

  getPictureData (e) {
    if(e.target.closest('.gallery__item')) {
      let galleryItem = e.target.closest('.gallery__item').dataset.id

      this.renderPicture(galleryItem - 1)
    }
  }
}