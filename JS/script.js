const $cardsection = document.querySelector(".subject-section")
const $database_input = document.querySelector("[data-basename]")
const $subject_add_button = document.querySelector("[data-add-subject]")
const $subject_add_modal = document.querySelector("[data-modal]")


let DBname = "Clockwerk"
const subjectApi = new apiInterface(DBname)

//генерация карточки с объектом
const generateCard = (subject) => {
    return (`
    <div class="subject-${subject.id} subject-div" id="subject${subject.id}" style="width: 300px; margin: 20px;">
        <img src="${subject.image}" class="card-img-top" alt="Фото объекта">
        <div class="subject-card-body">
            <h5 class="subject-title">${subject.name} <b> · </b> ${subject.age == 2 || subject.age == 3 ? subject.age + " года" : subject.age == 1 ? subject.age + " год" : subject.age + " лет"}</h5>
            <p class="subject-text">${subject.description}</p>
            <div class="progress subject-rate">
                <div class="progress-bar" role="progressbar" style="width: ${subject.rate == 1 ? subject.rate : subject.rate + "0"}%" aria-valuenow="${subject.rate}" aria-valuemin="0" aria-valuemax="10">${subject.rate}</div>
            </div>
            <button data-action="More" type="button" class="btn btn-warning">Подробнее</button>
            <button data-action="Like" type="button"class="btn btn-${subject.favorite == true ? "info" : "dark"}"><i class="fa-regular fa-heart"></i></i></button>
            <button data-action="delete" type="button" class="btn btn-outline-danger">Удалить</i></button>
    </div>
  </div>`)
}
const getSubject = async () => {
    const result = await subjectApi.getAll();
    result.forEach(element => {
        $cardsection.insertAdjacentHTML('afterbegin', generateCard(element))
    });
}
getSubject()

/*
const deleteSubject = async (id) => {
    try { 
        const result = await subjectApi.deleteSubject(id)
        if (!result.ok) {
        throw new Error(result.message);
        }
    } catch (error) {
        alert(error)
    }
}
*/
