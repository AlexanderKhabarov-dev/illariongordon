export default function hideShadow() {
  setTimeout(() => {
    let shadow = document.querySelector('.shadow')

    shadow.classList.remove('shadow--active')
    shadow.classList.remove('shadow--transition-none')
  }, 300)
}