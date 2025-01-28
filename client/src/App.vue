<template>
  <div id="contenedor">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#contenedor {
  max-width: 1200px;
  margin: 1.25rem auto;
}

body {
  font-size: 16px;
  background: #2b3e4f;
  color: #eaeaea;
}

@media (max-width: 600px) {
  body {
    font-size: 15px;
  }
}
</style>
