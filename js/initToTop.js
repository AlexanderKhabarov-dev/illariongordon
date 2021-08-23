export default function toTop() {
  let toTop = document.querySelector('.to-top')
  let height = window.innerHeight

  window.addEventListener('scroll', function(e) {
    
    if(pageYOffset > height) {
      toTop.classList.add('to-top--active')
    }
    else {
      toTop.classList.remove('to-top--active')
    }
  })
}