<template>
  <!-- MODAL -->
  <div class="contenedor__modal" v-if="showModal">
    <div class="modal__editar">
      <div
        class="editar__cerrar"
        @click="closeModal()"
        aria-label="Cerrar Modal"
      >
        <i class="fa-solid fa-xmark"></i>
      </div>
      <p class="editar__txt">
        {{ modalType === "create" ? "AÑADIR USUARIO" : "EDITAR USUARIO" }}
      </p>
      <form class="editar__inp" action="" @submit="sendForm">
        <div class="inp__txt">
          <label for="">Nombre</label>
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
          <input type="text" v-model="user.name" />
        </div>
        <div class="inp__txt">
          <label for="">Correo</label>
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
          <input type="text" v-model="user.email" />
        </div>
        <div class="inp__txt">
          <label for="">Edad</label>
          <p v-if="errors.age" class="error">{{ errors.age }}</p>
          <input type="number" v-model="user.age" />
        </div>
        <button type="submit">GUARDAR</button>
      </form>
    </div>
  </div>
</template>

<script>
import usersService from "../services/usersService";

export default {
  name: "ModalUser",
  data() {
    return {
      showModal: false,
      modalType: "create",
      user: {
        id: null,
        name: "",
        email: "",
        age: null,
      },
      errors: {
        name: null,
        email: null,
        age: null,
      },
    };
  },
  methods: {
    addUser() {
      this.openModal();
      this.resetErrors();
      this.modalType = "create";

      this.user = {
        id: null,
        name: "",
        email: "",
        age: null,
      };
    },
    async editUser(id) {
      this.openModal();
      this.resetErrors();
      this.modalType = "edit";

      try {
        const response = await usersService.getUserById(id);
        if (response.status === 200) {
          const { id, nombre, correo, edad } = response.data;
          this.user = {
            id: id,
            name: nombre,
            email: correo,
            age: edad,
          };
        }
      } catch (error) {
        console.error("Error en la solicitud al servidor:", error);
        alert("No se pudo completar la acción. Inténtalo de nuevo.");
      }
    },
    sendForm(e) {
      /* ENVIAR FORMULARIO */
      e.preventDefault();

      switch (this.modalType) {
        case "create":
          this.createUser();
          break;

        case "edit":
          this.updateUser();
          break;
      }
    },
    async createUser() {
      /* CREAR USUARIO */
      if (this.validateUser()) {
        try {
          const response = await usersService.postUsers(this.user);
          if (response.status === 201) {
            this.$emit("getUsers");
            this.closeModal();
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 409) {
              this.errors.email = "El correo ya está en uso.";
            }
          } else {
            console.error("Error en la solicitud al servidor:", error);
            alert("No se pudo completar la acción. Inténtalo de nuevo.");
          }
        }
      }
    },
    async updateUser() {
      /* ACTUALIZAR USUARIO */
      if (this.validateUser()) {
        try {
          const response = await usersService.putUsers(this.user.id, this.user);
          if (response.status === 200) {
            this.$emit("getUsers");
            this.closeModal();
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 409) {
              this.errors.email = "El correo ya está en uso.";
            }
          } else {
            console.error("Error en la solicitud al servidor:", error);
            alert("No se pudo completar la acción. Inténtalo de nuevo.");
          }
        }
      }
    },
    validateUser() {
      this.resetErrors();
      let isValid = true;

      const { name, email, age } = this.user;

      /* VALIDAR NOMBRE */
      const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!name) {
        this.errors.name = "* El nombre es obligatorio.";
        isValid = false;
      } else if (!regexName.test(name)) {
        this.errors.name = "* El nombre no es válido";
        isValid = false;
      }

      /* VALIDAR CORREO */
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        this.errors.email = "* El correo es obligatorio.";
        isValid = false;
      } else if (!regexEmail.test(email)) {
        this.errors.email = "* El correo no es válido.";
        isValid = false;
      }

      /* VALIDAR EDAD */
      if ((age && isNaN(age)) || age < 0) {
        this.errors.age = "* La edad no es válida.";
        isValid = false;
      }
      return isValid;
    },
    resetErrors() {
      this.errors = {
        name: null,
        email: null,
        age: null,
      };
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/modalUser.scss";
</style>
