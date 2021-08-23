export default class PicturePopup {
  constructor(popup, image, popupImage) {
    this.$popup = document.querySelector(popup)
    this.$image = document.querySelector(image)
    this.$popupImage = document.querySelector(popupImage)

    this.render()
    this.setup()
  }

  render(src) {
    this.$popupImage.setAttribute('src', src)
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this)

    this.$image.addEventListener('click', this.clickHandler)
    this.$popup.addEventListener('click', this.clickHandler)
  }

  clickHandler(e) {
    let {type} = e.target.dataset

    if(type == 'image') {
      this.getSrcPicture(e)
    }

    if(type == 'open') {
      this.openPicture()
    }

    else if(type == 'close') {
      this.closePicture()
    }
  }

  getSrcPicture (e) {
    let src = e.target.getAttribute('src')
    
    this.render(src)
    this.openPicture()
  }

  openPicture() {
    this.$popup.classList.remove('hide')

    setTimeout(() => {
      this.$popup.classList.add('picture-popup--show')
    }, 10)
  }

  closePicture() {
    this.$popup.classList.remove('picture-popup--show')

    setTimeout(() => {
      this.$popup.classList.add('hide')
    }, 300)
  }
}