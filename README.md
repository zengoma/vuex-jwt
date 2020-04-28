# vuex-jwt
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

vuex-jwt is VueJS plugin helps you seamlessly handle jwt refresh token authentication in your axios requests 

## Table of contents
1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Getting started](#getting-started)
4. [Contributing](./docs/CONTRIBUTING.md)

## Requirements
1. Vue: ^2.0.0
2. Vuex: ^2.0.0 || ^3.0.0

## Installation
```shell

yarn add vuex-jwt
```



## Getting started

1. You will need to setup a Vue project with Vuex. You should create a project with the vue-cli. For more info

    * [Create a Vue project](https://cli.vuejs.org/guide/creating-a-project.html)
    * [Vuex setup](https://vuex.vuejs.org/installation.html)
    
    
2. Initialize the JWT Plugin
    **src/main.ts**
    ```typescript
    import Vue from "vue";
    import store from "./store";
    import JWT from "vuex-jwt";
   
    Vue.use(JWT, { store });
    ```
   
3. Register the vuex-jwt auth store module

```typescript
import Vue from "vue";
import Vuex from "vuex";
import { auth } from "vuex-jwt";
Vue.use(Vuex);

const store = {
  modules: {
    auth,
  }
}

```
   
3. Define the base url in then environmental variable
    **.env**
    ```dotenv
    VUE_APP_BASE_URL="/api"
    VUE_APP_JWT_VALIDATION_PATH = "/password_reset/validate_token/"
    VUE_APP_JWT_REFRESH_PATH = "/token/refresh/"
    VUE_APP_JWT_OBTAIN_PATH = "/token/"
    ```
    
## Authentication

Authentication
#TODO: Include an example of a login and logout request

### Making authenticated axios requests

In order to make custom authenticated requests in your components
you can simple do this. This will automatically attach the Bearer
token to your request.

```typescript
this.$http.get("your-custom-endpoint")...
```

The axios instance can also be imported in to non Vue Components

```typescript
import {http} from "vuex-jwt";

http.get("your-custom-endpoint")...
```
