<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-text-field
          label="Field Label"
          :v-model="fields.label"
          :value="fields.label"
          @input="$emit('input', { value: $event, name: 'label' })"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Field Name"
          :v-model="(name = slugify(fields.label))"
          :value="name"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-combobox
          :items="typeItems"
          label="Type"
          @change="updateTypeComponent($event)"
          @input="$emit('input', { value: $event, name: 'type' })"
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-checkbox
          :value="fields.required"
          :v-model="fields.required"
          @change="$emit('input', { value: $event, name: 'required' })"
          label="Required"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <component :is="typeComponent" v-bind:fields="fields" />
    </v-row>
  </div>
</template>

<script>
import TextInputComponent from "@/components/TextInputComponent.vue";
import NumberInputComponent from "@/components/NumberInputComponent.vue";
import DateInputComponent from "@/components/DateInputComponent.vue";
import CheckboxInputComponent from "@/components/CheckboxInputComponent.vue";
import RadioboxInputComponent from "@/components/RadioboxInputComponent.vue";
import ListInputComponent from "@/components/ListInputComponent.vue";

export default {
  components: {
    TextInputComponent,
    NumberInputComponent,
    DateInputComponent,
    CheckboxInputComponent,
    RadioboxInputComponent,
    ListInputComponent,
  },
  watch: {
    name(newValue, oldValue) {
      this.$emit("input", { value: newValue, name: "name" });
    },
  },
  data() {
    return {
      typeItems: ["Text", "Number", "Date", "Checkbox", "Radiobox", "List"],
      name: this.slugify(this.fields.label),
      typeComponent: "",
    };
  },
  props: ["fields"],
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
    updateTypeComponent(value) {
      console.log(value);
      this.typeComponent = value + "InputComponent";
    },
  },
};
</script>

<style lang="scss" scoped></style>
