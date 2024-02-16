import { defineStore } from 'pinia' 
import axios from "axios";

export const useAppStore = defineStore('app', {
  state: () => ({ 
    version: 'v1.0.2',
    chainsList: []
  }),
  actions: {
    async refreshChains() {     
      for (let i = 0; i < this.chainsList.length; i++) { 
        if (this.chainsList[i].online === true) {
          let retunrBlock = await axios.get(this.chainsList[i].lcd + "/cosmos/base/tendermint/v1beta1/blocks/latest")
          console.log('retunrBlock ' + this.chainsList[i].name, retunrBlock.data)
          this.chainsList[i].block = retunrBlock.data.block.last_commit.height
        }
      }      
    },
    async loadChains() {      
      this.chainsList = JSON.parse(localStorage.chains)

      for (let i = 0; i < this.chainsList.length; i++) {
        console.log(this.chainsList[i].path)
        this.chainsList[i].config = await window.electronAPI.getChainConfig(this.chainsList[i].path)
        this.chainsList[i].online = false 
        this.chainsList[i].block = 0 
      }
    },  
    async startChain(chain) {          
      const foundChain = this.chainsList.find((element) => element.name === chain.name)      
      foundChain.online = true 

      let finalLcd = '' 
      if (typeof foundChain.config?.loadedYaml.validators[0].app === 'undefined') {
        finalLcd = 'http://localhost:1317'
      } else
        finalLcd = 'http://localhost' + foundChain.config?.loadedYaml.validators[0].app.api.address 

      foundChain.lcd = finalLcd
      await window.electronAPI.startChain(chain.path)
    },
    async stopChain(chain) {      
      const foundChain = this.chainsList.find((element) => element.name === chain.name)      
      foundChain.online = false
      window.electronAPI.stopChain(chain.name)    
    },
  },

})