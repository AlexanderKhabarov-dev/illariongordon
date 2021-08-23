import ImageLoader from './ImageLoader'
import CollectionTitle from './CollectionTitle'

export default function fetchCollection(url, getParams) {
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let gallery = new ImageLoader(data, '.gallery__container', '.picture', '.picture__container', getParams)
    let collectionTitle = new CollectionTitle('.collection-title', data)
  })
}