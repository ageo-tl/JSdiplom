const postData = (body) => {
  // Отправка данных с помощью fetch
  return fetch("./server.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });
};

const sendForm = (form, data) => {
  const errorMessage = "Что-то пошло не так...",
        loadMessage = "Загрузка...",
        succesMessage = "Спасибо! Мы скоро с Вами свяжемся!",
        statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem; color: SteelBlue;";

  // Элемент для сообщения
  form.appendChild(statusMessage);

  // Данные из формы
  const formData = new FormData(form);
  let body = {};
  formData.forEach( (val, key) => {
    body[key] = val;
  });

  // Пользовательские (если есть)
  if (data) {
    body = Object.assign(body, data);
  }

  // Непосредственно отправка данных на сервер
  statusMessage.textContent = loadMessage;
  postData(body)
    .then( (response) => {
      if (response.status !== 200) {
        throw new Error("network status is " +
          response.status + " - " + response.statusText);
      }
      statusMessage.style.color = "PaleGreen";
      statusMessage.textContent = succesMessage;
      // Очистка формы при успешном ответе сервера
      const inputes = [...form.elements].filter(
        (elem) => !elem.matches("button, input[type=\"button\"]"));
      inputes.forEach( (elem) => {elem.value = "";});
    })
    .catch( (error) => {
      statusMessage.style.color = "OrangeRed";
      statusMessage.textContent = errorMessage;
      console.error("Ошибка при отправке данных:", error);
    });
};

export default sendForm;
