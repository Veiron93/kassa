команды

создание сертификата
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

запуск build
serve -s build -p 5000 -S --ssl-cert cert.pem --ssl-key key.pem
