# Readme
## Стек
asp net 6 + EF Core
postgresql
react + typescript
## Запуск
Для запуска требуется поднятый postgres server

### 1 шаг
Изменить строку подключения для БД в файле
ApiService/appsettings.json
### 2 шаг
перейти в папку .\Frontend и выполнить команду 
```
npx vite
```
### 3 шаг
перейти в папку .\ApiService и выполнить команду 
```
dotnet run
```

## Запуск с помощью docker compose
### 1 шаг
```
docker-compose build
```

### 2 шаг
```
docker-compose up
```

###### P.S. Think out of the box!


