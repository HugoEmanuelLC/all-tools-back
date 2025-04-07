FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install pm2 -g

# Ajouter l'utilisateur nonroot AVANT de copier le code et de changer les permissions
RUN adduser -D nonroot

COPY . .

# Créer le dossier uploads et s'assurer qu'il appartient à l'utilisateur nonroot
RUN mkdir -p public/images/uploads/tampon && \
    chown -R nonroot:nonroot public/images/uploads && \
    chmod -R 775 public/images/uploads

EXPOSE 3001

USER nonroot

CMD ["pm2-runtime", "ecosystem.config.cjs"]