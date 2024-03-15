async function animesList() {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime')
    const infoAnime = await response.json()
    const dataAnime = infoAnime.data
    const animeScore = dataAnime.filter(scores => scores.score > 9)
    animeScore.forEach((singleAnime, index) => {
      const templateElement = templateCard(singleAnime)
      const elementContainer = document.getElementsByClassName('container')
      elementContainer[0].insertAdjacentHTML('beforeend', templateElement)
      modalFeatures(singleAnime, index)
    })
  } catch (error) {
    console.error(error)
  }
}
animesList()

const templateCard = anime => {
  return ` <div class="container-anime">
      <div class="card-content">
        <h4> ${anime.title}</h4>
        <img src="${anime.images.jpg.small_image_url}">
      </div>
    </div>
  `
}

//Modal
const templateModal = anime => {
  const playVideo = anime.trailer.embed_url
    ? `<iframe width="530" height="300" src="${anime.trailer.embed_url}" title="YouTube video 
     player" frameborder="0" 
     allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
     allowfullscreen>
    </iframe>`
    : '<p>Trailer not found.</p>'
  const yearAnime = anime.year
    ? `<p> ${anime.year} - ${anime.episodes} ep - ${anime.duration}</p>`
    : `<p> ${anime.episodes} ep - ${anime.duration}</p>`
  return `
  <div class="container-modal">
    <div class="overlay" ></div>
    <div id="card-modal" class="modal">
        <div class="header-modal">
          <div>
            <h1> ${anime.title}</h1>
           ${yearAnime}
          </div>
          <span class="close">&times;</span>
        </div>
        <div class="contents-modal">
          <img src="${anime.images.jpg.large_image_url}">
          <div>
           ${playVideo} 
          <div class="content-text-modal">
            <div class="synopsis-modal"> <b>Synopsis:</b> ${anime.synopsis}</div>
            <div class="studio-name-modal"><b> Studio Produced:</b> ${anime.studios[0].name}</div>
          </div>
        </div>
        </div>
      </div>
    </div>`
}

const modalFeatures = (singleAnime, index) => {
  const activeModal = document.getElementsByClassName('card-content')
  const templateModalElement = templateModal(singleAnime)

  activeModal[index].addEventListener('click', () => {
    const modalContainer = document.getElementById('modal-anime')
    modalContainer.innerHTML = templateModalElement

    const btnCloseModal = document.getElementsByClassName('close')
    btnCloseModal[0].addEventListener('click', () => {
      modalContainer.innerHTML = ''
    })
    const closeModal = document.getElementsByClassName('overlay')
    closeModal[0].addEventListener('click', () => {
      modalContainer.innerHTML = ''
    })
  })
}
