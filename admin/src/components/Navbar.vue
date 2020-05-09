<template>
  <nav>
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Calpo</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text dark color="teal white--text" @click="signOut">
        <span>Sign Out</span>
        <v-icon color="teal white--text">exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary absolute bottom>
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="currentUser.picture"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{ currentUser.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Dashboard", icon: "dashboard", path: "/" },
        { title: "Admin", icon: "build", path: "/admin" },
      ],
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  },
  computed: {
    currentUser(): any {
      return this.$store.getters["user/userInfo"];
    }
  },
};
</script>

<style scoped></style>
