let dir = '';

export pwd() {
   return {
     path: this.currentPath.path,
     results: [this.currentPath.path],
     clear: false
   };
}
