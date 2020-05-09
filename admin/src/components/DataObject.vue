<template>
  <div>
    <v-card shaped class="ma-4">
      <v-card-title>
        Create new object
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container fluid>
            <v-row>
              <v-col cols="8" md="4">
                <v-text-field
                  v-model="name"
                  :counter="nameMaxSize"
                  :rules="nameRules"
                  label="Name"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-btn rounded color="teal white--text" @click="addField">
            <v-icon left>mdi-plus</v-icon> Add Field
          </v-btn>
          <v-container fluid>
            <v-card class="mx-auto" v-for="field in fieldList" :key="field.id">
              <v-card-text>
                <DataObjectCommonAttributs
                  :value="fieldList[field.id]"
                  @input="updateForm($event, field.id)"
                  v-bind:fields="field"
                />
              </v-card-text>
              <v-card-actions>
                <v-col cols="16" md="1" align-self="center">
                  <v-btn
                    class="mx-auto"
                    fab
                    dark
                    small
                    color="red"
                    @click="removeField(field.id)"
                  >
                    <v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          rounded
          @click="validate"
        >
          Create
        </v-btn>

        <v-btn rounded color="error" class="mr-4" @click="reset">
          Reset
        </v-btn>

        <v-btn
          rounded
          color="primary"
          class="mr-4"
          v-on:click="$emit('closeDataObject')"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import DataObjectCommonAttributs from "@/components/DataObjectCommonAttributs.vue";
export default {
  components: {
    DataObjectCommonAttributs: DataObjectCommonAttributs,
  },
  data: () => ({
    valid: true,
    name: "",
    nameMaxSize: 50,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],
    fieldList: [],
  }),

  methods: {
    slugify(text) {
      return text
        .toString() // Cast to string
        .toLowerCase() // Convert the string to lowercase letters
        .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-"); // Replace multiple - with single -
    },
    validate() {
      if (this.$refs.form.validate()) {
        const dataObjects = {
          name: this.name,
          slug: this.slugify(this.name),
          fields: this.fieldList,
        };
        console.log(dataObjects);
        // this.$store
        //   .dispatch("dataObjects/createDataObject", dataObjects)
        //   .then(() => {
        //     // TODO: Display User Message using message store
        //     console.log("Object Added !");
        //   })
        //   .catch(function(error) {
        //     console.error(error);
        //   });
        this.$emit("closeDataObject");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    addField() {
      const fieldId =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      this.fieldList.push({
        id: fieldId,
        label: "",
        name: "",
        type: "",
        required: false,
      });
    },
    removeField(id) {
      this.fieldList.splice(
        this.fieldList.findIndex((item) => item.id === id),
        1
      );
    },
    updateForm(field, fieldId) {
      this.fieldList[this.fieldList.findIndex((item) => item.id === fieldId)][field.name] = field.value;
    }
  },
};
</script>

<style lang="scss" scoped></style>
