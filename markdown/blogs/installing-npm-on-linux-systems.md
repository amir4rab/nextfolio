---
title: Installing npm on linux systems
date: 1626874219785
thumbnail:
  url: '/assets/blogs/installing-npm-on-linux-systems.png'
  ratio: '1080/540'
tags:
  - node
  - linux
  - npm
  - javascript
  - webdevelopment
shortInfo: 'a short guide on how to install node.js on linux operating systems.'
category: tutorial
---

in my opinion, the bast way to install Node Js and Npm on Linux and Mac Os system is with some sort of node package manager. in this tutorial we will use [nvm](https://github.com/nvm-sh/nvm), you can follow their tutorial on GitHub or continue with us.

1. check for updates:

   run the two following commands

   ```shell
   sudo apt update && sudo apt upgrade
   ```

2. run one of the following install script commands

   ```shell
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   ```

   ```shell
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   ```

3. now run these to commands to finish the installation.

   ```shell
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
   ```

4. verify the installation

   ```shell
   command -v nvm
   ```

5. install node
   ```shell
   nvm install node
   ```

every thing should be ready by now, for more information please check nvms [GitHub](https://github.com/nvm-sh/nvm).
