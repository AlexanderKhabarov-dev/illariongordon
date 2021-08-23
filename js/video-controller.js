export default function videoController() {
  let aboutButton = document.querySelector('#aboutButton')
  let contactsButton = document.querySelector('#contactsButton')
  let artButton = document.querySelector('#artButton')

  let videoMain = document.querySelector('.video-main')
  let videoSecondary = document.querySelector('.video-secondary')
  let videoArt = document.querySelector('.video-art')
  let videoContacts = document.querySelector('.video-contacts')
  let videoAbout = document.querySelector('.video-about')

  if(aboutButton && contactsButton && artButton) {
    aboutButton.addEventListener('mouseover', () => showVideo(videoAbout))
    aboutButton.addEventListener('mouseout', () => hideVideo(videoAbout))

    artButton.addEventListener('mouseover', () => showVideo(videoArt))
    artButton.addEventListener('mouseout', () => hideVideo(videoArt))

    contactsButton.addEventListener('mouseover', () => showVideo(videoContacts))
    contactsButton.addEventListener('mouseout', () => hideVideo(videoContacts))

    function showVideo (video) {
      //remove listener in videoSecondary
      videoSecondary.removeEventListener('ended', hideSecondary)

      videoMain.style.zIndex = "-99"
      videoMain.pause()
      videoMain.currentTime = 0

      videoSecondary.style.zIndex = "-99"
      videoSecondary.pause()
      videoSecondary.currentTime = 0

      video.play()
      video.style.zIndex = '99'

      video.addEventListener('timeupdate', lastScreen(video))
    }

    function hideVideo (video) {
      video.style.zIndex = "-99"
      video.pause()
      video.currentTime = 0

      videoSecondary.currentTime = 0
      videoSecondary.play()
      videoSecondary.style.zIndex = "99"

      videoMain.currentTime = 0
      videoMain.play()
      videoMain.loop = true
      videoMain.style.zIndex = "50"

      //add listener for hide after end
      videoSecondary.addEventListener('ended', hideSecondary)
    }

    function lastScreen(video) {
     
      if (video.currentTime > video.duration - 0.5) {
        video.pause();
      }
    }

    function hideSecondary() {
      videoSecondary.style.zIndex = "-99"
      videoSecondary.pause()
      videoSecondary.currentTime = 0
    }
  }
}


