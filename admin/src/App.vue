<template>
  <v-app>
    <v-content>
      <div v-if="$route.meta.adminLayout">
        <adminLayout>
          <router-view></router-view>
        </adminLayout>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import adminLayout from "@/layouts/Admin.vue";

export default {
  name: "App",
  components: { adminLayout },
  data() {
    return {
      //
    };
  }
};
</script>
