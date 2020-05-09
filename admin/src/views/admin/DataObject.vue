<template>
  <div>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      type="table"
      :loading="loading"
    >
      <v-card>
        <v-card-title>
          <h1>{{ dataObject.name }}</h1>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-subtitle>
          <v-btn rounded color="teal white--text" @click="addItem(null)">
            <v-icon left>mdi-pencil</v-icon> New Item
          </v-btn>
        </v-card-subtitle>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slug: this.$route.params.slug,
      search: "",
      loading: true,
      dialog: false,
    };
  },
  async created() {
    await this.$store.dispatch("dataObject/getDataObject", this.slug);
    await this.$store.dispatch("dataObject/getDataObjectData", this.slug);
    this.loading = false;
  },
  computed: {
    dataObject() {
      return this.$store.getters["dataObject/getObject"];
    },
    headers() {
      const headerList = [];
      const dataObject = this.$store.getters["dataObject/getObject"];
      dataObject.fields.forEach((field) => {
        headerList.push({ text: field.label, value: field.name });
      });
      headerList.push({ text: "Actions", value: "actions", sortable: false });
      return headerList;
    },
    items() {
      const items = this.$store.getters["dataObject/getObjectData"];
      return items;
    },
  },
  methods: {
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("dataObject/removeObjectData", {
          slug: this.slug,
          id: item._id,
        });
    },
    editItem(item) {
      alert(item._id);
    },
    addItem(item) {
      this.$store.dispatch("dataObject/createDataObject", {
        slug: this.slug,
        data: {
          firstname: "Jeremy",
          lastname: "Billay",
          email: "jbillay@gmail.com",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
