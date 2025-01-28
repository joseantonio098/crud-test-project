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
  margin: 20px auto;
}

body {
  background: #2b3e4f;
  color: #eaeaea;
}
</style>
