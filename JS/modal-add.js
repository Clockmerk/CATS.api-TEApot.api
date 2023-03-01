// Открытие и закрытие окна добавления объекта
$subject_add_button.addEventListener('click', () => {
    $subject_add_modal.classList.add('modal_active');
})
$subject_add_button.removeEventListener('click', () => {
    $subject_add_modal.classList.add('modal_active')
})
$subject_add_modal.addEventListener('click', (event) => {
    if (event.target.classList.contains("modal_active")) {
        $subject_add_modal.classList.remove('modal_active');
    }
})
$subject_add_modal.removeEventListener('click', (event) => {
    if (event.target.classList.contains("modal_active")) {
        $subject_add_modal.classList.remove('modal_active');
    }
})
document.addEventListener('keydown', (event) => {
    if (event.code == "Escape" && $subject_add_modal.classList.contains("modal_active")) {
        $subject_add_modal.classList.remove('modal_active');
    }
})
document.removeEventListener('keydown', (event) => {
    if (event.code == "Escape" && $subject_add_modal.classList.contains("modal_active")) {
        $subject_add_modal.classList.remove('modal_active');
    }
})

//получение и отправка данных формы

const $form_data = document.querySelector("[data-form-post]");
const $form_submit = document.querySelector("[data-form-submit]");


$form_data.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formBody = Object.fromEntries(new FormData(event.target).entries());
    
    formBody.id = Number(formBody.id)
    formBody.age = Number(formBody.age)
    formBody.rate = Number(formBody.rate)
    formBody.favorite = formBody.favorite == 'on'

    const res = await subjectApi.addSubject(formBody);
    alert(JSON.stringify(res))
    if (true) {
        $cardsection.replaceChildren();
        getSubject()
        $subject_add_modal.classList.remove('modal_active');
        return event.target.reset()
    }
})