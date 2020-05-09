<template>
  <div>
      <h3>TEXT INPUT ELEMENTS FOR {{ fields.name }}</h3>
  </div>
</template>

<script>
export default {
  props: ["fields"],
  beforeDestroy () {
    alert("Before Destroy");
  },
};
</script>

<style lang="scss" scoped></style>
