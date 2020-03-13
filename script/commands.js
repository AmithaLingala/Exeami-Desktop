import paths from '/script/paths.js';

export class Commands {
  constructor(){
    this.currentPath = paths;
  }

 async pwd() {
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

  async sleep(ms) {
      let result = await sleepMethod(ms[0]);
      console.log(result)
      return {
        path: this.currentPath.path,
        results: [result],
        clear: false
      };
  }

  cd(params) {
    params = params[0];
    let results = [];
    if(!params || params.trim().length === 0) {
      this.currentPath = paths;
    } else {
      let path = params.trim();
      if(path.startsWith('/')) {

      } else {
        let paths = path.split('/');
        let dir = this.currentPath.children.filter(child => child.name == paths[0]);
        if(dir.length === 0 ) {
            results = ['No such directory']
        }else if (dir[0].type !== 'directory') {
            results = [paths[0] + ' is not a directory'];
        } else {
          this.currentPath = dir[0];
          if(paths.length > 1) {
            cd(paths.splice(1).join('/'));
          }
        }
      }

      return {
        path: this.currentPath.path,
        results: results,
        clear: false
      };
    }
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

export const folders = paths;
