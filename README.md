<div align="center"> 

# Ignite-ui

[![Release a new version](https://github.com/atmoner/ignite-ui/actions/workflows/release.yml/badge.svg)](https://github.com/atmoner/ignite-ui/actions/workflows/release.yml)  


![image](https://github.com/atmoner/ignite-ui/assets/1071490/cfb5c524-a64a-43a1-a23c-44b9e1c08c52)

ignite-ui is an interface to facilitate the use of ignite-cli  
 
 
</div>


## Getting started

### Build from sources  

Clone this repository: `git clone https://github.com/atmoner/ignite-ui.git`  
And go in folder: `cd ignite-ui`

#### Install dependencies ⏬

```bash
npm install
```

#### Start developing ⚒️

```bash
npm run dev
```

#### Additional Commands

```bash
npm run dev # starts application with hot reload
npm run build # builds application, distributable files can be found in "dist" folder

# OR

npm run build:mac # uses mac as build target
npm run build:linux # uses linux as build target
```
Optional configuration options can be found in the [Electron Builder CLI docs](https://www.electron.build/cli.html).

### Install from compilation

With each new version pushed to the main branch, a workflow is put into operation to compile the executable version of ```ignite-ui``` for Linux and macOs.

| Os | Version | Link |
| ------ | ------ | ------ |
| Linux | v0.1.6 | [Download AppImage](https://github.com/atmoner/ignite-ui/releases/download/v0.1.6/ignite-ui-0.1.6.AppImage) |
| MacOs | v0.1.6 | [Download Dmg](https://github.com/atmoner/ignite-ui/releases/download/v0.1.6/ignite-ui-0.1.6.dmg) |
 



## Project Structure

```bash
- scripts/ # all the scripts used to build or serve your application, change as you like.
- src/
  - main/ # Main thread (Electron application source)
  - renderer/ # Renderer thread (VueJS application source)
```


## Tips for 2 chains online on same computer

 

``` yaml
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
``` yaml
faucet:
  name: bob
  coins:
  - 5token
  - 100000stake
  port: 4501
``` 

## Example relayer configure (todo in UI)
``` bash
ignite relayer configure \
--source-account default \
--target-account default \
--source-rpc http://localhost:26657 \
--target-rpc http://localhost:26659 \
--source-faucet http://localhost:4500 \
--target-faucet http://localhost:4501 \
--source-gasprice 0.00025stake \
--target-gasprice 0.00025stake \
--source-gaslimit 300000 \
--target-gaslimit 300000 \
--source-prefix dev \
--target-prefix atmodev2
``` 
