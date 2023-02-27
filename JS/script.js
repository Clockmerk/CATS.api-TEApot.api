/*const data = teaApi.getIdCat(3)
data
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
*/
const $cardsection = document.querySelector(".tea-section")


const generateCard = (tea) => {
    return (`
    <div class="tea-${tea.id} tea-div" id="tea${tea.id}" style="width: 300px; margin: 20px;">
        <img src="${tea.image}" class="card-img-top" alt="Фото чайника">
        <div class="tea-card-body">
            <h5 class="tea-title">${tea.name}</h5>
            <p class="tea-text">${tea.description}</p>
            <a href="#tea${tea.id}" class="btn btn-primary" style="background-color: yellow; color:black;">Подробнее</a>
    </div>
  </div>`)
}
const getTeas = async () => {
    const res = await teaApi.getAll();
    res.forEach(tea => {
        $cardsection.insertAdjacentHTML('afterbegin', generateCard(tea))
    });
  }
getTeas()