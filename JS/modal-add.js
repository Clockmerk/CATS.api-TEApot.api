// Открытие и закрытие окна добавления объекта
$subject_add_button.addEventListener('click', () => {
    $subject_add_modal.classList.add('modal_active');
})
$subject_add_button.removeEventListener('click', () => {
    $subject_add_modal.classList.add('modal_active')
})
// нажатие на область
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
// escape
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

$form_data.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formBody = Object.fromEntries(new FormData(event.target).entries());

    formBody.id = Number(formBody.id)
    formBody.age = Number(formBody.age)
    formBody.rate = Number(formBody.rate)
    formBody.favorite = formBody.favorite == 'on'

    const res = await subjectApi.addSubject(formBody);
    if (res.status == 200) {
        $cardsection.replaceChildren();
        getSubject()
        $subject_add_modal.classList.remove('modal_active');
        localStorage.removeItem('formData')
        return event.target.reset()
    } else alert(res.data.message)
})

//хранение данных формы POST в localStorage
let savedData = JSON.parse(localStorage.getItem('formData'));

//заполнение полей
if (savedData) {
  for (let key in savedData) {
    if (savedData.hasOwnProperty(key)) {
      let input = document.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = savedData[key];
      }
    }
  }
}

const elements = $form_data.elements;
$form_data.addEventListener("input", async (event) => {
    //создание объекта и получение полей через цикл
    const formData = {};
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        formData[element.name] = element.value;
    }
    localStorage.setItem('formData', JSON.stringify(formData));

    //проверка на пустую строку для remove
    if ($form_data.image.value == "") {
        localStorage.removeItem('formData')
    }
})
