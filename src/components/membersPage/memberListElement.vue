<template>
  <div>
    <p class="headerName"><b>{{ userName }}</b></p>
  </div>
  <div>
    <ToolBar/>
  </div>
</template>

<script>

import ToolBar from "@/components/membersPage/toolBar.vue";
export default {
  name: 'MemberListElement',
  props: ['userName', 'type']
}
</script>

