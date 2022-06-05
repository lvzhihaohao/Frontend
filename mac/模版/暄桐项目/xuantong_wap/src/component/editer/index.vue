<template>
  <div class="editor">
    <div class="contenteditable" @change="onChange" contenteditable="true"></div>
  </div>
</template>

<script>
export default {
  methods: {
    onChange(event) {
    //console.log("TCL: onChange -> event", event)
     
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  min-height: 200px;
  width: 100%;
  .contenteditable {
    min-height: 200px;
  }
}
</style>