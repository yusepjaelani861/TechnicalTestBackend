# Technical Test Backend Developer DimyTech
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This is useCase from 

## Server Requirement
- Node v18.10.0+
- MySQL

## Configuration Environment
Before installation, you must be setup .env.

Format database URL
```bash
mysql://{username}:{password}@{ip}:{port}/{database_name}

```

Copy env example to .env, please foolow the instruction in below
```bash
cp .env.example .env
```

Please fill all data in .env below

```bash
DATABASE_URL=
PORT=
```

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install foobar.

```bash
npm install
npm run migration
npm run build
npm run start
```

## Usage

```
http://127.0.0.1:3000
```

## Authorization
Bearer {token}

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)