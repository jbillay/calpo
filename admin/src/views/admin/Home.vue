<template>
  <div>
    <v-container fluid>
      <v-row justify="start">
            <v-card
          max-width="344"
          class="mx-auto my-5"
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-img
            :src="require(`@/assets/${item.image}`)"
            max-height="200"
            contain
          ></v-img>

          <v-card-text>{{ item.desc }} </v-card-text>

          <v-card-actions>
            <v-btn text color="teal" :to="{ name: item.slug }">
              Navigate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Data Dictionary",
          image: "dataDictionary.png",
          desc: "List of data objects available for the applications.",
          slug: "dataDictionary",
        },
        {
          title: "Form",
          image: "form.png",
          desc: "Build forms for the applications.",
          slug: "form",
        },
        {
          title: "Workflow",
          image: "workflow.png",
          desc: "List of workflows available for the applications.",
          slug: "workflow",
        },
        {
          title: "Application",
          image: "application.png",
          desc: "List of available applications.",
          slug: "application",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
