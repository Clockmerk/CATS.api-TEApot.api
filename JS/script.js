//доступ к элементам HTML
const $header = document.querySelector("header")
const $cardsection = document.querySelector(".subject-section")
const $cardopensection = document.querySelector(".subject-card")
const $subject_add_button = document.querySelector("[data-add-subject]")
const $subject_add_modal = document.querySelector("[data-modal]")
const $form_basename = document.querySelector("[data-form-basename]");
const $database_input = document.querySelector("[data-basename]")
const $form_data = document.querySelector("[data-form-post]");
const $form_submit = document.querySelector("[data-form-submit]");

// Задание базы данных и создание экземпляра класса fetch
let DBname = "Clockwerk"
let subjectApi = new apiInterface(DBname)

//генерация карточки с объектом
const generateCard = (subject) => {
    return (`
    <div class="subject-${subject.id} subject-div" data-card_id=${subject.id}"  style="width: 300px; margin: 20px;">
        <img src="${subject.image}" class="card-img-top" alt="Фото объекта">
        <div class="subject-card-body">
            <h5 class="subject-title">${subject.name} <b> · </b> ${subject.age == 2 || subject.age == 3 ? subject.age + " года" : subject.age == 1 ? subject.age + " год" : subject.age + " лет"}</h5>
            <p class="subject-text">${subject.description}</p>
            <div class="progress subject-rate">
                <div class="progress-bar" role="progressbar" style="width: ${subject.rate == 1 ? subject.rate : subject.rate + "0"}%" aria-valuenow="${subject.rate}" aria-valuemin="0" aria-valuemax="10">${subject.rate}</div>
            </div>
            <button data-action="Open" type="button" class="btn btn-warning">Подробнее</button>
            <button data-action="Like" type="button" class="btn btn-${subject.favorite == true ? "info" : "dark"}" ><i class="fa-regular fa-heart" style="pointer-events: none;"></i></i></button>
            <button data-action="Delete" type="button" class="btn btn-outline-danger">Удалить</i></button>
    </div>
  </div>`)
}

//Получение объектов с сервера
const getSubject = async () => {
    const result = await subjectApi.getAll();
    result.data.forEach(element => {
        $cardsection.insertAdjacentHTML('afterbegin', generateCard(element))
    });
}
getSubject()

//Смена базы данных
$form_basename.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formBase = Object.fromEntries(new FormData(event.target).entries());
    if (true) {
        DBname = formBase.basename;
        subjectApi = new apiInterface(DBname)
        $cardsection.replaceChildren();
        getSubject()
    }
})

//Хранение input базы данных в localStorage
$database_input.value = localStorage.getItem("basenameValue")

$database_input.addEventListener("input", async (event) => {
    localStorage.setItem('basenameValue', event.target.value);
    if (localStorage.getItem("basenameValue") == "") {
        localStorage.removeItem("basenameValue");
        $database_input.value = ""
    }
})