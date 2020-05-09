<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="teal" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert v-if="userMsg.msg" :type="userMsg.type">
                  {{ userMsg.msg }}
                </v-alert>
                <v-form class="login">
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    v-model="email"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    type="password"
                    @keyup.enter="login"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn dark color="teal" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  props: {
    source: String
  },
  methods: {
    login: function() {
      const { email, password } = this;
      this.$store
        .dispatch("user/login", { email, password })
        .then(() => {
          const redirectPath = this.$route.query.redirect || "/";
          this.$router.push(redirectPath);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  computed: {
    userMsg() {
      return this.$store.getters["user/userMsg"];
    }
  }
};
</script>
