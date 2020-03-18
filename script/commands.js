import Paths from '/script/paths.js';
var dir = Paths.getInstance();

let instance;
export class Commands {
  static getInstance() {
    if(!instance) {
      instance = new Commands();
    }
    return instance;
  }

 async pwd() {
   if(!this.currentPath) {
     this.currentPath = await dir.getPaths();
   }

   return {
     path: this.currentPath.path,
     results: [this.currentPath.path],
     clear: false
   }
 }
  async ls() {
    const names = [];
    if(this.currentPath.children){
      this.currentPath.children.forEach(child => {if(!child.hide) {names.push(child.name)}});
    }
    return {
      path: this.currentPath.path,
      results: names,
      clear: false
    };
  }

  async getFiles() {
    if(!this.currentPath) {
      this.currentPath = await dir.getPaths();
    }
    return this.currentPath.children;
  }

  async sleep(ms) {
      let result = await sleepMethod(ms[0]);
      return {
        path: this.currentPath.path,
        results: [result],
        clear: false
      };
  }

  async cd(params, flag) {
    params = params[0];
    let results = [];
    if(!params || params.trim().length === 0) {
      this.tempPath = this.currentPath = await dir.getPaths();
    }
    else {
      let path = params.trim();
      if(path.startsWith('/')) {
        if(!this.currentPath) {
          this.currentPath = await dir.getPaths();
        }
        this.tempPath = this.currentPath;
        path = path.substring(1);
        if(path.length === 0) {
          this.currentPath = this.tempPath;
          return {
            path: this.currentPath.path,
            results: results,
            clear: false
          };
        }
      } else if (!flag) {
        this.tempPath = this.currentPath;
      }

      let paths = path.split('/');
      let tmpDir = this.tempPath.children.filter(child => child.name == paths[0]);
      if (tmpDir.length == 0 ) {
          results = ['No such file or directory']
      } else if (tmpDir[0].type !== 'directory') {
          results = [paths[0] + ' is not a directory'];
      } else {
        this.tempPath = tmpDir[0];
        if(paths.length > 1) {
          let ret = await this.cd([paths.splice(1).join('/')], true);
          if (ret.results.length === 0 ) {
            this.currentPath = this.tempPath;
          } else {
            results = ret.results;
          }
        } else {
          this.currentPath = this.tempPath;
        }
      }
    }
    return {
      path: this.currentPath.path,
      results: results,
      clear: false
    };
  }

  async cat (params) {
    params = params[0];
  }
  async clear(){
    return {
      path: this.currentPath.path,
      results: [],
      clear: true
    };
  }
}

async function sleepMethod(ms) {
    return new Promise(resolve => setTimeout(()=> resolve(''), ms));
}

export const folders = dir.getPaths();
