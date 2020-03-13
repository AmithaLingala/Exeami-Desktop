let blogs = [];
fetch('/data/posts.json').then(response=>response.json()).then(json=>blogs.push(...json.posts));
// This is not something that I wanted to add,
// if there is a way to dynamically get all files(modules) from client in the future,
// please do make a pull request - Coding Otaku

const binCommands = ['pwd', 'ls', 'sleep', 'cd']
      .sort()
      .map(cmd => generateCommandPath(cmd, 'js', '/bin/'+cmd));

function generateCommandPath(name, type, path) {
  return {
    path, name, type
  }
}

export default {
  path:"/",
  name:"root",
  type:"directory",
  children:[
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
          type:"directory"
        },
        {
          name: "Videos",
          path: "/home/Videos",
          type:"directory"
        },
        {
          name: "Pictures",
          path: "/home/Pictures",
          type:"directory"
        },
        {
          name: "Music",
          path: "/home/Music",
          type:"directory"
        },
      ]
    },
    {
      name: "about",
      path: "/about",
      type:"file"
    },
    {
      name: "bin",
      path: "/bin",
      type: "directory",
      children: binCommands,
      hide:true
    },
    {
      name: "contact",
      path: "/contact",
      type:"file"
    },
    {
      name: "blog",
      path: "/blog",
      type: "directory",
      children: blogs
    }
  ]
}
