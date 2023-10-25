# Vue Todo

Простой менеджер Todo. Есть возможность добавить todo и отобразить список задач

## Ключевые особенности

### Стэк
- Vue 3
- Pinia
- Typescript 5+ 
- Vite
- Bootstrap
- msw

### Работа сервера разработки
- Приложение писалось как если бы у него был бэкэнд. Для этого использован msw, который перехватывает fetch
- тесты vitest так же настроены на работу с msv
- Добавлена работа с локальным файлом настроек

#### Настройка:
- настройка через .local.env
- для локальной разработки и запуска создать .env.local и добавить настройку:
```dotenv
VITE_USE_DEV_HTTP_MOCK=true
```

### buildApi
Для работы с api использовал свой подход вдохновленный RTK Query

- в основе лежит composition api и pinia
- стор работает как кэш. При этом разные сторы могут влиять друг на друга через систему тэгов.
- если компонент отключен, то при последующем подключении проверяется валидный ли кэш и если нет происходит запрос на бэк 

## Настройка проекта

- Установка зависимостей
```sh
npm install
```
- Настроить `.local.env`

### Запуск среды разработки

```sh
npm run dev
```
