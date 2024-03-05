async function animesList() {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime')
    const infoAnime = await response.json()
    const dataAnime = infoAnime.data
    const animeScore = dataAnime.filter(scores => scores.score > 9)
    animeScore.forEach((singleAnime, index) => {
      const templateElement = templateCard(singleAnime)
      const templateModalElement = templateModal(singleAnime)
      const elementContainer = document.getElementsByClassName('container')
      elementContainer[0].insertAdjacentHTML('beforeend', templateElement)
      elementContainer[0].insertAdjacentHTML('beforeend', templateModalElement)
      modalFeatures(index)
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
//,,,,,
const templateModal = anime => {
  const playVideo = anime.trailer.embed_url
    ? `<iframe width="530" height="300" src="${anime.trailer.embed_url}" title="YouTube video 
     player" frameborder="0" 
     allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
     allowfullscreen>
    </iframe>`
    : ''

  return `
  <div class="container-modal">
    <div class="overlay" ></div>
    <div id="card-modal" class="modal">
        <div class="header-modal">
          <div>
            <h1> ${anime.title}</h1>
            <h4> ${anime.year} - ${anime.episodes} ep - ${anime.duration}</h4>
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

const modalFeatures = index => {
  const modal = document.getElementsByClassName('container-modal')
  const activeModal = document.getElementsByClassName('card-content')
  const btnCloseModal = document.getElementsByClassName('close')

  activeModal[index].addEventListener('click', () => {
    modal[index].style.display = 'block'
  })

  btnCloseModal[index].addEventListener('click', () => {
    modal[index].style.display = 'none'
  })

  const closeModal = document.getElementsByClassName('overlay')
  closeModal[index].addEventListener('click', () => {
    modal[index].style.display = 'none'
  })
}
