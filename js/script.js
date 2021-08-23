//class
import ImageLoader from './ImageLoader'
import CollectionTitle from './CollectionTitle'

//json
import fullCatalog from '../json/full_catalog.json'
import collectionStrangers from '../json/collection_strangers.json'
import collectionRenaissance from '../json/collection_renaissance.json'
import collectionGraphics from '../json/collection_graphics.json'
import collectionNatureMorte from '../json/collection_nature_morte.json'
import collectionAbstract from '../json/collection_abstract.json'

//lib
import Swiper from 'swiper'

//custom
import preloaderAnimation from './preloader'
import videoController from './video-controller'
import toTop from './initToTop'
import smoothScroll from './smoothScroll'
import hideShadow from './hideShadow'


//get patametrs for redirect
let getParams = window
.location
.search
.replace('?','')
.split('&')
.reduce(
    function(p,e){
        var a = e.split('=');
        p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
    },
    {}
)

// delete videos on mobile
let desktopVideos = document.querySelectorAll('.video-desktop')

if(window.innerWidth < 1140) {
    desktopVideos.forEach(video => {
        video.remove()
    })
}

//main-video
let videoMain = document.querySelector('.video-main')
let videoSecondary = document.querySelector('.video-secondary')

if(videoMain) {
    videoMain.load()

    videoMain.addEventListener('canplay', function() {

        preloaderAnimation()
    
        setTimeout(() => {
            videoMain.play()
            videoMain.loop = true

            if(window.innerWidth > 1140) {
                videoSecondary.play()
            }

        }, 2000)
    })
}

window.onload = function() {
    //browser safari :)
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    if(videoSecondary && !isSafari && window.innerWidth > 1140) {
        setTimeout(() => {
            setTimeout(() => {
                videoSecondary.style.zIndex = "-99"
                videoSecondary.pause()
                videoSecondary.currentTime = 0
            },2500)
        
        }, 2000)  
    }

    //video controlls
    videoController()
 
    //swiper
    let mainSwiper = new Swiper('.swiper-container' , {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        loop: true,
        mousewheel: {
            invert: true,
        },
        breakpoints: {
            1140: {
                slidesPerView: 3
            }
        }
    })
        
    //gallery ** FIX ME (We should get async require) ***
    if(document.querySelector('.gallery__container')) {
        
        if(getParams['renaissance']) {
            let gallery = new ImageLoader(collectionRenaissance, '.gallery__container', '.picture', '.picture__container', getParams)
            let collectionTitle = new CollectionTitle('.collection-title', collectionRenaissance)
        }

        else if(getParams['graphics']) {
            let gallery = new ImageLoader(collectionGraphics, '.gallery__container', '.picture', '.picture__container', getParams)
            let collectionTitle = new CollectionTitle('.collection-title', collectionGraphics)
        }

        else if(getParams['nature_morte']) {
            let gallery = new ImageLoader(collectionNatureMorte, '.gallery__container', '.picture', '.picture__container', getParams)
            let collectionTitle = new CollectionTitle('.collection-title', collectionNatureMorte)
        }

        else if(getParams['strangers']) {
            let gallery = new ImageLoader(collectionStrangers, '.gallery__container', '.picture', '.picture__container', getParams)
            let collectionTitle = new CollectionTitle('.collection-title', collectionStrangers)
        }

        else if(getParams['abstract']) {
            let gallery = new ImageLoader(collectionAbstract, '.gallery__container', '.picture', '.picture__container', getParams)
            let collectionTitle = new CollectionTitle('.collection-title', collectionAbstract)
        }

        else {
            let gallery = new ImageLoader(fullCatalog, '.gallery__container', '.picture', '.picture__container', getParams)
        }
    }

    // stop default redirect
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault()

            let initialPage = this.getAttribute('href')
            document.querySelector('.shadow').classList.add('shadow--active')
            
            // smooth redirect
            setTimeout(() => {
                location.href = initialPage
            }, 250)
        })
    })

    // history back function ** FIX ME **
    document.querySelectorAll('.link-window-prev').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault()

            window.history.back();
        })
    })

    //to top
    toTop()

    //smooth Scroll
    smoothScroll()
}

window.addEventListener('pageshow', hideShadow)
