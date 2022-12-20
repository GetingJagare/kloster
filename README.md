### Certificates for development mode
```bash
mkdir dev-certs
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout dev-certs/kloster.key -out dev-certs/kloster.crt
```
