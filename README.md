# LGU-TK HRMO Job Order Database

A Database system for the Job Order personnel of LGU-Tagkawayan Human Resource Management Office.

## Technologies Used

- NodeJS (npm)
- ReactJS
- Material-UI
- mui-datatables
- axios
- momentJS
- Docker (docker-compose)
- Nginx
- Strapi
- MongoDB

## Usage

- Install `Docker` and `docker-compose`
  - [Install Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
  - [Install docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
- Install `NodeJS`. Using Node Version Manager or `nvm` is better
  - [Install nvm (see Option 3)](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- Clone this repo.
  - `$ git clone <repo> AppliDB`
- Navigate to the folder named `/site`
  - `$ cd AppliDB/site`
- Pull its dependencies
  - `$ npm install`
- After all dependencies was pulled, build an optimized version of the app.
  - `$ npm run build`
- Job Order Database is a _sibling_ project to Applicant Database. _Sibling_ project, in a way that they both share the same backend architecture. I would advice to take a look at Applicant Database and build its backend using the instructions provided.
