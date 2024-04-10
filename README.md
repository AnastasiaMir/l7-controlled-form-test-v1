## Правила и регламент

- [Экзамен: правила, рекомендации и порядок проведения](https://hexly.notion.site/d9289c18871c44508bc7c7f05a51d94f)

## Задание

Ваша задача написать логику для валидации предоставленной формы и отправки данных на сервер. Шаги могут быть выполнены в любом порядке, кроме первого шага, который обязательно должен быть выполнен первым.

## Запуск и сборка приложения

Для запуска приложения используйте команду:

```bash
make run # запускается сервер и сборка
```

## Задача 1

В файле **src/index.js** напишите и экспортируйте по умолчанию функцию, которая добавляет форму регистрации в **index.html**. Форма должна быть добавлена как дочерний элемент по отношению к элементу с классом `form-container`.

### Форма

```html
<form id="registrationForm">
    <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary">
</form>
```

## Задача 2

Добавьте в приложение логику, которая отправляет запрос на сервер и, в случае успешной отправки, выводит оповещение.

### Условия

- При клике на кнопку Submit, должен совершаться POST запрос, по адресу /users
- В случае успешного ответа содержимое `document.body` нужно заменить на:

```html
<p>{{Сообщение, полученное с бекенда}}</p>`.
```

## Задача 3

Добавьте в функцию логику, которая изменяет статус инпутов, добавляя к ним соответствующие классы.

Задача реализуется в 2 этапа:

Во-первых, необходимо написать саму логику валидации для полей *name* и *email*. Валидным именем считается любая строка с длиной больше 0, исключая пробелы. Валидной почтой считается любая строка с символом @ посередине, с любой длиной символов, исключая пробелы, до и после нее.

Во-вторых, реализовать добавление нужных стилей, при вводе данных в соответствующее поле.

### Условия

- Если содержимое инпута валидно, то он имеет класс `is-valid`
- Если содержимое инпута невалидно, то он имеет класс `is-invalid`
- Если в инпут еще ничего не ввели, то никаких статусов нет

### Примеры валидных и невалидных значений:

```javascript
/* names */
'example' // valid
''; // invalid
'    '; // invalid

/* emails */
'example@gmail.com' // valid
'@gmail.com' // invalid
'g@ и' // invalid
'g@s'; // valid
'gs'; // invalid
```

## Задача 4

Добавьте в функцию логику, которая валидирует инпуты и меняет статус у кнопки `Submit`.

### Условия изменения статуса кнопки

- Если хотя бы одно из полей невалидно, кнопка имеет статус `disabled`.
- Если все поля валидны, кнопка не имеет статус `disabled`.