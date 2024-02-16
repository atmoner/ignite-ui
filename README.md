<div align="center"> 

# Electron Vue Template
  
<img width="794" alt="image" src="https://user-images.githubusercontent.com/32544586/222748627-ee10c9a6-70d2-4e21-b23f-001dd8ec7238.png">

A simple starter template for a **Vue3** + **Electron** TypeScript based application, including **ViteJS** and **Electron Builder**.
</div>

## About

This template utilizes [ViteJS](https://vitejs.dev) for building and serving your (Vue powered) front-end process, it provides Hot Reloads (HMR) to make development fast and easy ⚡ 

Building the Electron (main) process is done with [Electron Builder](https://www.electron.build/), which makes your application easily distributable and supports cross-platform compilation 😎

## Getting started

Click the green **Use this template** button on top of the repository, and clone your own newly created repository.

**Or..**

Clone this repository: `git clone git@github.com:Deluze/electron-vue-template.git`


### Install dependencies ⏬

```bash
npm install
```

### Start developing ⚒️

```bash
npm run dev
```

## Additional Commands

```bash
npm run dev # starts application with hot reload
npm run build # builds application, distributable files can be found in "dist" folder

# OR

npm run build:win # uses windows as build target
npm run build:mac # uses mac as build target
npm run build:linux # uses linux as build target
```

Optional configuration options can be found in the [Electron Builder CLI docs](https://www.electron.build/cli.html).
## Project Structure

```bash
- scripts/ # all the scripts used to build or serve your application, change as you like.
- src/
  - main/ # Main thread (Electron application source)
  - renderer/ # Renderer thread (VueJS application source)
```

## Using static files

If you have any files that you want to copy over to the app directory after installation, you will need to add those files in your `src/main/static` directory.

#### Referencing static files from your main process

```ts
/* Assumes src/main/static/myFile.txt exists */

import {app} from 'electron';
import {join} from 'path';
import {readFileSync} from 'fs';

const path = join(app.getAppPath(), 'static', 'myFile.txt');
const buffer = readFileSync(path);
```


```
validators:
- name: alice
  bonded: 100000000stake
  app:
    api:
      address: :1318
    grpc:
      address: :9092
    grpc-web:
      address: :9093
  config:
    p2p:
      laddr: :26669
    rpc:
      laddr: :26659
      pprof_laddr: :6061
```      
``` 
faucet:
  name: bob
  coins:
  - 5token
  - 100000stake
  port: 4501
``` 

``` 
ignite relayer configure --source-account default --target-account default --source-rpc http://localhost:26657 --target-rpc http://localhost:26659 --source-faucet http://localhost:4500 --target-faucet http://localhost:4501 --source-gasprice 0.00025stake --target-gasprice 0.00025stake --source-gaslimit 300000 --target-gaslimit 300000 --source-prefix dev --target-prefix atmodev2
``` 
