## rm-npm

#### What is `rm-npm`?

`rm-npm` is the node module that can help you to rm the `node_modules` directory if you have a `package.son` file at the root path of your project. It also remove `bower_components` directory when you have a `bower.son` file in your project directory.

---



#### How to install?

Run  `$ npm install rm-npm -g`  to install `rm-npm` in global environment, or you can run `$ npm install --save-dev rm-npm` locally in your project `node_modules` directory. 

---



#### How to use?

**CLI**

If you install `rm-npm` globally , and  you want to rm all the `node_modules` `bower_components` directory in your project, just run the follow command.

> $ rm-npm

**In Your Project**

``` javascript
const rmNpm = require('rm-npm')
// just run like this
rmNpm(__dirname)
```

