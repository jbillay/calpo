<template>
  <div>
    <h1>Data Dictionary</h1>
    <v-btn rounded color="teal white--text" @click="showDataObject = true">
      <v-icon left>mdi-pencil</v-icon> Create object
    </v-btn>
    <DataObject
      v-if="showDataObject"
      v-on:closeDataObject="closeDataObject"
    />
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Number of fields</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataObjects" :key="item.name">
          <td><router-link :to="'data-dictionary/' + item.slug">{{ item.name }}</router-link></td>
          <td>{{ item.fields.length }}</td>
          <td>
            <v-btn
              class="mx-auto"
              fab
              dark
              x-small
              elevation=0
              color="red"
              @click="removeDataObject(item.slug)"
            >
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import DataObject from "@/components/DataObject.vue";

export default {
  components: {
    DataObject: DataObject,
  },
  data() {
    return {
      showDataObject: false,
    };
  },
  computed: {
    now() {
      return Date.now();
    },
    dataObjects() {
      return this.$store.getters["dataObjects/all"];
    },
  },
  methods: {
    closeDataObject() {
      this.showDataObject = false;
    },
    removeDataObject(slug) {
      confirm('Are you sure you want to delete this object?') && this.$store.dispatch("dataObjects/removeDataObject", slug);
    },
  },
  created() {
    this.$store.dispatch("dataObjects/getDataObjects");
  },
};
</script>

<style lang="scss" scoped></style>
