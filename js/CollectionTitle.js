function returnCollectionTitle(data) {
  return `
    <div class="container">
      <div class="collection-title__image">
        <img src="${data[0].collection_name}" alt="">
      </div>
      <div class="collection-title__text">
        ${data[0].collection_description ?
          data[0].collection_description :
          'DEFAULT TEXT'
        }
      </div>
    </div>
  `
}

export default class CollectionTitle {
  constructor(container, data) {
    this.data = data
    this.$container = document.querySelector(container)

    this.render()
  }

  render() {
    if(this.$container) {
      this.$container.innerHTML = returnCollectionTitle(this.data)
    }

    return false
  }
} 