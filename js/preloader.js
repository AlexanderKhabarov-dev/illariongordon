export default function preloaderAnimation() { 
  console.log('123')
  if(document.querySelector('.preloader__image--1')) {
    setTimeout(() => {
      document.querySelector('.loader-container').classList.add('hide-animation')
    }, 2000)
  
    setTimeout(() => {
      document.querySelector('.preloader__image--3').classList.add('hide-animation')
    }, 2200)
  
    setTimeout(() => {
      document.querySelector('.preloader__image--1').classList.add('hide-animation')
    }, 2400)
  
    setTimeout(() => {
      document.querySelector('.preloader__image--2').classList.add('hide-animation')
    }, 2600)
  
    setTimeout(() => {
      document.querySelector('.preloader__logo').classList.add('hide-animation')
    }, 2900)
  
    setTimeout(() => {
      document.querySelector('.preloader').classList.add('hide-animation--long')
    }, 3100)
  }
}