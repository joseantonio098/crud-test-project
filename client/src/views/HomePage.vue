<template>
  <div class="contenedor">
    <div class="contenedor__fila contenedor__fila--1">
      <a class="fila__btn" @click="callAddUser()"
        ><i class="fa-solid fa-plus"></i
      ></a>
      <p class="fila__titulo">USUARIOS</p>
    </div>
    <div class="contenedor__fila contenedor__fila--2">
      <div>Id</div>
      <div>Acciones</div>
      <div>Nombre</div>
      <div>Correo</div>
      <div>Edad</div>
    </div>
    <div
      class="contenedor__fila contenedor__fila--3"
      v-for="user in users"
      :key="user.id"
    >
      <div>{{ user.id }}</div>
      <div class="fila__btn">
        <a
          class="btn__opt btn__edit"
          @click="callEditUser(user.id)"
          aria-label="Editar Usuario"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </a>
        <a
          class="btn__opt btn__delete"
          @click="deleteUser(user.id)"
          aria-label="Eliminar Usuario"
        >
          <i class="fa-solid fa-trash-can"></i>
        </a>
      </div>
      <div>{{ user.nombre }}</div>
      <div>{{ user.correo }}</div>
      <div>{{ user.edad }}</div>
    </div>

    <!-- MODAL DE FORMULARIO -->
    <ModalUser @getUsers="getUsers" ref="ModalUser" />
  </div>
</template>

<script>
import usersService from "../services/usersService";
import ModalUser from "../components/ModalUser.vue";

export default {
  name: "HomePage",
  components: {
    ModalUser,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      /* OBTENER USUARIOS */
      try {
        const response = await usersService.getUsers();
        if (response.status === 200) {
          this.users = response.data;
        }
      } catch (error) {
        console.error("Error en la solicitud al servidor:", error);
        alert("No se pudo completar la acción. Inténtalo de nuevo.");
      }
    },
    async deleteUser(id) {
      /* ELIMINAR USUARIO POR ID */
      if (
        confirm(`¿Estás seguro de que deseas eliminar este usuario? #${id}`)
      ) {
        try {
          const response = await usersService.deleteUsers(id);
          if (response.status === 200) {
            this.getUsers();
          }
        } catch (error) {
          console.error("Error en la solicitud al servidor:", error);
          alert("No se pudo completar la acción. Inténtalo de nuevo.");
        }
      }
    },
    callAddUser() {
      this.$refs.ModalUser.addUser();
    },
    callEditUser(id) {
      this.$refs.ModalUser.editUser(id);
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/homePage.scss";
</style>
