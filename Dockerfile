# Use a imagem do Nginx como base
FROM nginx:alpine

# Copie os arquivos do projeto para o diretório padrão de servimento do Nginx
COPY src /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicie o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
