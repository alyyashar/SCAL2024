FROM nikolaik/python-nodejs:python3.8-nodejs16
WORKDIR /usr/src

RUN apt-get update 
RUN apt install docker.io -y
RUN docker --version

COPY package*.json ./
RUN  npm install --legacy-peer-deps
COPY . .
RUN pip install -r scal/requirements.txt
RUN ls

EXPOSE 5000

CMD ["node", "index.js"]