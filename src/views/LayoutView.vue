<template>
  <div>
    <nav>
      <router-link to="/">MyApp</router-link>
      <router-link to="/table">Table</router-link>
      <router-link to="/book">Book System</router-link>

      <!-- Dropdown List -->
      <el-dropdown
        style="
          text-decoration: none;
          color: hsla(160, 100%, 37%, 1);
          transition: 0.4s;
          padding: 3px;
        "
      >
        <span>{{ loginstudent.name }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              ><div @click="logout()">Log out</div></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </nav>
  </div>
</template>

<script>
// Import the TableView component
//import TableView from "./TableView.vue";

export default {
  name: "LayoutView",
  data() {
    return {
      loginstudent: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
}

ul > * {
  margin-right: 10px;
}
ul > *:last-child {
  margin-right: 0;
}
.el-dropdown {
  font-size: 40px;
  margin-left: auto; /* Push the dropdown to the right */
}

.el-dropdown-link {
  cursor: pointer;
  padding-left: 10px;
}

/* Ensure your style tag is properly closed */
</style>
