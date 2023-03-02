//взаимодействие с карточками при помощи data-action

const subjectCard = (id) => {
    return (`
        <div class="card-more card-more-active" data-card >
        <img src="${id.image}" class="img-fluid" alt="Фото объекта">
            <div class="row g-0" data-card-info data-card_id=${id.id}>
          <div class="col-md-4">
          </div>
          <div class="col-md-8">
            <div class="card-body" data-card_id=${id.id}>
              <span>[id ${id.id}]</span><h1 class="card-title">${id.name} </h1>
              <p class="card-text">Его рейтинг: ${id.rate}</p>
              <p class="card-text">${id.favorite == true ? "Любимый объект" : "Такой себе объект"} возрастом: ${id.age}</p>
              <h3 class="card-text-rate">${id.description}</h3>

            </div>
          <div class="card-more-button">
          <button type="button" class="btn btn-primary" data-action='Edit' data-card_id=${id.id} style="background:purple">Изменить</button>
          <button type="button" class="btn btn-secondary " data-action="Close" style="background:red">Закрыть</button>
          </div>
          </div>
            </div>
      </div>`)
}

//открытие карточки
const openCard = async (result) => {
    $cardopensection.insertAdjacentHTML('afterbegin', subjectCard(result))
}

//закрытие карточки
$cardopensection.addEventListener("click", async (event) => {
    const action = event.target.dataset.action;
    if (action == "Close") {
        $cardopensection.removeChild($cardopensection.firstElementChild)
        $cardsection.classList.remove("section-blur")
        $header.classList.remove("section-blur")
    }
})
document.addEventListener('keydown', (event) => {
    if (event.code == "Escape" && $cardopensection.firstElementChild) {
        $cardopensection.removeChild($cardopensection.firstElementChild)
        $cardsection.classList.remove("section-blur")
        $header.classList.remove("section-blur")
    }
})

// изменение карточки
const changeCard = async (id) => {
    return `<div class="input-group-card div1">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name" required value= ${id.name}>
    <div>
    <label for="id">ID:</label>
    <input type="number" id="id" name="id" disabled readonly value= ${id.id}>
    </div>
    <label for="rate">Рейтинг:</label>
    <input type="number" id="rate" name="rate" min="0" max="10" required value = ${id.rate}>
    <label for="favorite">Любимый?:</label>
    <input type="checkbox" id="favorite" name="favorite" required value= ${id.favorite} == true ? checked="true" " checked="false" >
</div>
<div class="input-group-card div2">
    <label for="age">Возраст:</label>
    <input type="number" id="age" name="age" min="0" max="10" required value= ${id.age}>
    <label for="description">Описание:</label>
    <input type="textarea" id="description" name="description" required value= ${id.description}>
    <label for="image">Изображение:</label>
    <input type="url" id="image" name="image" required value= ${id.image}>
    <button type=submit data-action="Put">
</div>
<div>
<button type="submit" data-action="Put">Отправить</button>
</div>`

}


//взаимодействие с карточкой
$cardsection.addEventListener('click', async (event) => {
    event.preventDefault()
    const action = event.target.dataset.action;
    if (event.target === $cardsection) return;

    const $currentCard = event.target.closest('[data-card_id]');
    const subjectId = parseInt($currentCard.dataset.card_id);
    switch (action) {
        case 'Open':
            try {
                const res = await subjectApi.getIdSubject(subjectId);
                if (res.ok) {
                    openCard(res.data)
                    $cardsection.classList.add("section-blur")
                    $header.classList.add("section-blur")
                } else throw Error(res.data.message)
            } catch (error) {
                console.log(error);
            }
            break;

        case 'Like':
            const res = await subjectApi.updateSubject(subjectId)
            if (res.ok) {
                if (event.target.className === 'btn btn-dark') {
                    event.target.className = 'btn btn-info'
                } else {
                    event.target.className = 'btn btn-dark'
                }
            }
            break;

        case 'Delete':
            try {
                const res = await subjectApi.deleteSubject(subjectId);
                if (!res.ok) throw Error(res.data.message)
                $currentCard.remove()
            } catch (error) {
                console.log(error);
            }
            break;
        default:
            break;
    }
})

//изменение и отправка данных
$cardopensection.addEventListener("click", async (event) => {
    const action = event.target.dataset.action;
    if (event.target === $cardopensection) return;

    const subjectId = parseInt(event.target.dataset.card_id);
    switch (action) {
        case 'Edit':
            try {
                const res = await subjectApi.getIdSubject(subjectId);
                if (res.ok) {
                    const cardForm = $cardopensection.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild;
                    const cardPutForm = document.createElement("form");
                    cardPutForm.className = "card-change-post"
                    cardForm.replaceWith(cardPutForm)
                    cardPutForm.insertAdjacentHTML("afterbegin", await changeCard(res.data))

                    event.target.dataset.action = "Put"
                    event.target.innerText = "Отправить"
                } else throw Error(res.data.message)
            } catch (error) {
                console.log(error);
            }
            break;

        case 'Put':
            try {
                const formBody = Object.fromEntries(new FormData(event.target).entries());
                formBody.id = Number(formBody.id)
                formBody.age = Number(formBody.age)
                formBody.rate = Number(formBody.rate)
                formBody.favorite = formBody.favorite == 'on'

                console.log(formBody)
                const res = await subjectApi.updateSubject(subjectId, formBody);
                if (res.status == 200) {
                    $cardsection.replaceChildren();
                    getSubject()
                    return event.target.reset()
                }  throw Error(res.data.message)
            } catch (error) {
                console.log(error);
            }
            break;
    }
})