function generateCommandPath(name, type, path) {
  return {
    path, name, type
  }
}

let instance = null;
export default class Paths {
  constructor(){
    this.isGenerated = false
    this.generatePaths();
  }

  static getInstance() {
    if(instance == null) {
      instance = new Paths();
    }
    return instance;
  }

  async generatePaths() {
    if(this.isGenerated) {
      return;
    }
    let blogs = []
    await fetch('/data/posts.json').then(response=>response.json()).then(json=>blogs.push(...json.posts));
    const binCommands = ['pwd', 'ls', 'sleep', 'cd']
          .sort()
          .map(cmd => generateCommandPath(cmd, 'js', '/bin/'+cmd));

    let value = {
      path:"/",
      name:"root",
      type:"directory",
      children:[
        {
          name: "bin",
          path: "/bin",
          type: "directory",
          children: binCommands,
          hide:true
        },
        {
          name: "terminal",
          path: "/terminal",
          type:"application"
        },
        {
          name: "home",
          path: "/home",
          type:"directory",
          children:[
            {
              name: "Documents",
              path: "/home/Documents",
              type:"directory",
              children:[
                {
                  name: "My_Resume.pdf",
                  path: "/home/Documents/My_Resume.pdf",
                  type:"file"
                },
              ]
            },
            {
              name: "Videos",
              path: "/home/Videos",
              type:"directory"
            },
            {
              name: "Pictures",
              path: "/home/Pictures",
              type:"directory",
              children:[
                {
                  name: "Logo.png",
                  path: "/home/Pictures/Logo.png",
                  type:"image"
                },
              ]
            },
            {
              name: "Music",
              path: "/home/Music",
              type:"directory"
            },
          ]
        },
        {
          name: "blog",
          path: "/blog",
          type: "directory",
          children: blogs
        },
        {
          name: "about",
          path: "/about",
          type:"link"
        },
        {
          name: "contact",
          path: "/contact",
          type:"link"
        }
      ]
    }
    window.localStorage.setItem('paths', JSON.stringify(value));
    this.isGenerated = true;
  }

  async getPaths() {
    await this.generatePaths();
    return JSON.parse(window.localStorage.getItem('paths'));
  }
}
