let blogs = [];
fetch('/data/posts.json').then(response=>response.json()).then(json=>blogs.push(...json.posts));
export default {
  path:"/home/user/exeami",
  name:"home",
  type:"directory",
  children:[
    {
      name: "terminal",
      path: "/home/user/exeami/terminal",
      type:"application"
    },
    {
      name: "about",
      path: "/home/user/exeami/about",
      type:"file"
    },
    {
      name: "contact",
      path: "/home/user/exeami/contact",
      type:"file"
    },
    {
      name: "blog",
      path: "/home/user/exeami/blog",
      type: "directory", 
      children: blogs
    }
  ]
}
