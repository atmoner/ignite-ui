import {contextBridge, ipcRenderer} from 'electron';
import util from 'node:util';
const exec = util.promisify(require('node:child_process').exec);
//import spawn from 'await-spawn';
import { spawn } from 'child_process';

import yaml from "js-yaml";
import fs from "fs";
import { chunksToLinesAsync, chomp } from '@rauschma/stringio';
import { Readable } from 'node:stream';

async function returnVersion() {    
    const { stdout, stderr } = await exec('ignite version'); 
    console.log(stderr)
    return stderr  
}

async function runScaffoldChain(name: any, prefix: any, folder: any, noModules: any) {    
    let runNoModules = noModules ? ' --no-module' : ''; 
    console.log('ignite scaffold chain ' + name + ' --skip-git --address-prefix ' + prefix + ' --path ' + folder +  runNoModules)
    const { stdout, stderr } = await exec('ignite scaffold chain --skip-git ' + name + ' --address-prefix ' + prefix + ' --path ' + folder +  runNoModules);
    return stderr
}

async function runAnyScaffold(type: any, name: any, data: any, chain: any, modeName: any, noMessage: boolean, noSimulation: boolean, index: any) {    
  // console.log('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain)
  let runModeName = '';
  let runIndex = '';
  if (modeName !== '') {
    runModeName = ' --module ' + modeName;
  }
  if (index !== '') {
    runIndex = ' --index ' + index;
  }
  let runNoMessage = noMessage ? ' --no-message' : ''; 
  let runNoSimulation = noSimulation ? ' --no-simulation' : ''; 
  console.log('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain +  runNoMessage + runNoSimulation + runModeName + runIndex)
  //const { stdout, stderr } = await exec('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain +  runNoMessage + runNoSimulation + runModeName + runIndex);
  //console.log(stdout)
  //return stdout
}
async function runMessageScaffold(type: any, name: any, data: any, chain: any, modeName: any, description: any, response: any, noSimulation: boolean) {    
  // console.log('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain)
  let runModeName = '';
  let runDescription = '';
  let runResponse = '';
  if (modeName !== '') {
    runModeName = ' --module ' + modeName;
  } 
  if (description !== '') {
    runDescription = ' --desc "' + description + '"';
  } 
  if (response !== '') {
    runResponse = ' --response ' + response;
  } 
  let runNoSimulation = noSimulation ? ' --no-simulation' : ''; 
  console.log('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain + runDescription + runNoSimulation + runModeName + runResponse)
  const { stdout, stderr } = await exec('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain + runNoSimulation + runModeName + runResponse);
  return stdout
}
async function runPacketScaffold(type: any, name: any, data: any, chain: any, modeName: any, ack: any, noSimulation: boolean) {    
  // console.log('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain)
  let runModeName = '';
  let runAckName = '';

  if (modeName !== '') {
    runModeName = ' --module ' + modeName;
  } 
  if (ack !== '') {
    runModeName = runModeName + ' --ack ' + ack;
  }

  let runNoSimulation = noSimulation ? ' --no-simulation' : ''; 
  console.log('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain + runNoSimulation + runModeName + runAckName)
  const { stdout, stderr } = await exec('ignite ' + type + ' ' + name + ' ' + data + ' --path ' + chain + runNoSimulation + runModeName + runAckName);
  return stdout
}
/* async function runStartChain(path: any) {    
    const { stdout, stderr } = await exec('ignite chain serve --path ' + path);
    // console.log(stdout)
    stdout.end();
    return stdout
} */

async function generateIgniteComposable(path: any) { 
  console.log('ignite generate composables --path ' + path)
  const { stdout, stderr } = await exec('ignite generate composables --path ' + path);
  return stdout
}
async function generateIgniteHooks(path: any) { 
  console.log('ignite generate hooks --path ' + path)
  const { stdout, stderr } = await exec('ignite generate hooks --path ' + path);
  return stdout
}
async function generateIgniteOpenApi(path: any) { 
  console.log('ignite generate openapi --path ' + path)
  const { stdout, stderr } = await exec('ignite generate openapi --path ' + path);
  return stdout
}
async function generateIgniteProtoGo(path: any) { 
  console.log('ignite generate proto-go --path ' + path)
  const { stdout, stderr } = await exec('ignite generate proto-go --path ' + path);
  return stdout
}
async function generateIgniteTsClient(path: any) { 
  console.log('ignite generate ts-client --path ' + path)
  const { stdout, stderr } = await exec('ignite generate ts-client --path ' + path);
  return stdout
}

async function generateIgniteRelayerConfig(config: any) { 
  let finalConfig = JSON.parse(config)
  console.log('config', JSON.parse(config))
  console.log(
    'ignite relayer configure' 
    + ' --source-account ' + finalConfig.source.account
    + ' --source-client-id ' + finalConfig.source.clientid
    + ' --source-faucet ' + finalConfig.source.faucet
    + ' --source-gaslimit ' + finalConfig.source.gaslimit
    + ' --source-gasprice ' + finalConfig.source.gasprice
    + ' --source-port ' + finalConfig.source.port
    + ' --source-prefix ' + finalConfig.source.prefix
    + ' --source-rpc ' + finalConfig.source.rpc

    + ' --target-account ' + finalConfig.destination.account
    + ' --target-client-id ' + finalConfig.destination.clientid
    + ' --target-faucet ' + finalConfig.destination.faucet
    + ' --target-gaslimit ' + finalConfig.destination.gaslimit
    + ' --target-gasprice ' + finalConfig.destination.gasprice
    + ' --target-port ' + finalConfig.destination.port
    + ' --target-prefix ' + finalConfig.destination.prefix
    + ' --target-rpc ' + finalConfig.destination.rpc
  )
  //const { stdout, stderr } = await exec('ignite generate ts-client --path ' + path);
  //return stdout
}



async function runStartChain(path: any) { 
    console.log('INPUT: '+path);
    //'--reset-once'
    const source = spawn('ignite', ['chain', 'serve', '--path', path, '--verbose'],
      {stdio: ['ignore', 'pipe', process.stderr]}); // (A)
  
    await echoReadable(source.stdout); // (B)
  
    console.log('### DONE');
  }
 
  async function echoReadable(readable: Readable | AsyncIterable<string>) {
    for await (const line of chunksToLinesAsync(readable)) { // (C)
      console.log(chomp(line))
    }
  }
  

async function runStopChain(name: any) {    
    const { stdout, stderr } = await exec('killall ' + name + 'd');
    return stdout  
}

async function runDeleteChain(path: any) {    
    const { stdout, stderr } = await exec('rm -Rf ' + path);
    return stdout  
}

async function runListAccount() {    
    const { stdout, stderr } = await exec('ignite account list');
    return stdout
}

async function runSaveConfig(path: any, data: any) {
    fs.writeFileSync(path + "/config.yml", data);
}

async function runGetChainConfig(path: any) {
    let yamlFile = fs.readFileSync(path + "/config.yml", "utf8");
    let loadedYaml = yaml.load(yamlFile);  
    //loadedYaml = JSON.stringify(loadedYaml);
    return { loadedYaml, yamlFile}
}

async function runBinaryCli(path: string, args: string) {
  let argsArray = ''
  
  if (args.includes('tx ') ) {
    argsArray = ' -y'
  }
  const { error, stdout, stderr } = await exec(path + ' ' + args + argsArray); 
  console.log('error: '+error);
  console.log('stdout: '+stdout);
  console.log('stderr: '+stderr);
  return { stdout, stderr, error }
}

 


contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.send('message', message),
  openUrl: (url: string) => ipcRenderer.send('open-url', url),  
  version: () => returnVersion(),
  scaffoldChain: (name: any, prefix: any, folder: any, noModules: any) => runScaffoldChain(name, prefix, folder, noModules),
  scaffoldAny: (
    type: any, 
    name: any, 
    data: any, 
    chain: any, 
    modeName: any,
    noMessage: boolean, 
    noSimulation: boolean,
    index: any
  ) => runAnyScaffold(type, name, data, chain, modeName, noMessage, noSimulation, index), 
  scaffoldMessage: (
    type: any, 
    name: any, 
    data: any, 
    chain: any, 
    description: any,
    modeName: any,
    response: any,
    noSimulation: boolean 
  ) => runMessageScaffold(type, name, data, chain, description, modeName, response, noSimulation),
  scaffoldPacket: (
    type: any, 
    name: any, 
    data: any, 
    chain: any, 
    modeName: any,
    ack: any,
    noSimulation: boolean 
  ) => runPacketScaffold(type, name, data, chain, modeName, ack, noSimulation),
  
  startChain: (path: any) => runStartChain(path),
  stopChain: (name: any) => runStopChain(name),
  listAccount: () => runListAccount(),
  getChainConfig: (path: any) => runGetChainConfig(path),
  deleteChain: (path: any) => runDeleteChain(path),
  saveConfig: (path: any, data: any) => runSaveConfig(path, data),
  generateComposable: (path: any) => generateIgniteComposable(path),
  generateHooks: (path: any) => generateIgniteHooks(path),  
  generateOpenApi: (path: any) => generateIgniteOpenApi(path),
  generateProtoGo: (path: any) => generateIgniteProtoGo(path),
  generateTsClient: (path: any) => generateIgniteTsClient(path),
  generateRelayerConfig: (config: any) => generateIgniteRelayerConfig(config),
  // runBinary: (path: any, args: any) => exec(path + ' ' + args + ' --yes')
  runBinary: (path: any, args: any) => runBinaryCli(path, args)
})

