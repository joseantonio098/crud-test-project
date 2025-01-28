<template>
  <div class="contenedor">
    <div class="contenedor__fila contenedor__fila--1">
      <div class="fila__seccion">
        <a class="seccion__btn" @click="callAddUser()"
          ><i class="fa-solid fa-plus"></i
        ></a>
        <p class="seccion__titulo">LISTA DE USUARIOS</p>
      </div>
      <div class="fila__seccion">
        <input
          type="search"
          placeholder="Buscar por nombre o correo..."
          @input="searchUser()"
          v-model="valueUser"
        />
      </div>
    </div>
    <div class="contenedor__tabla">
      <div class="tabla__fila tabla__fila--2">
        <div>Id</div>
        <div>Acciones</div>
        <div>Nombre</div>
        <div>Correo</div>
        <div>Edad</div>
      </div>
      <div
        class="tabla__fila tabla__fila--3"
        v-for="user in users"
        :key="user.id"
      >
        <div class="fila_txt">{{ user.id }}</div>
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
        <div class="fila_txt">{{ user.nombre }}</div>
        <div class="fila_txt">{{ user.correo }}</div>
        <div class="fila_txt">{{ user.edad }}</div>
      </div>
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
      allUsers: [],
      valueUser: "",
    };
  },
  methods: {
    searchUser() {
      /* BUSCAR USUARIO */
      if (this.valueUser.trim() === "") {
        this.users = [...this.allUsers];
      } else {
        this.users = this.allUsers.filter(
          (user) =>
            user.nombre.toLowerCase().includes(this.valueUser.toLowerCase()) ||
            user.correo.toLowerCase().includes(this.valueUser.toLowerCase())
        );
      }
    },
    async getUsers() {
      /* OBTENER USUARIOS */
      try {
        const response = await usersService.getUsers();
        if (response.status === 200) {
          this.users = response.data;
          this.allUsers = response.data;
          this.valueUser = "";
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
