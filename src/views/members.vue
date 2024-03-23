<template>
  <div>
    <Header title-name="Участники" title-description="изменение прав" />

    <MemberListBlock header="Администраторы" type="0"/>

    <MemberListBlock header="Участники" type="1"/>

    <MemberListBlock header="Заблокированные" type="2"/>
  </div>

</template>
<script>

import Header from "@/components/header.vue";
import QInfo from "@/components/createPage/CreateInfo.vue";
import MemberListBlock from "@/components/membersPage/memberListBlock.vue";
import MemberListElement from "@/components/membersPage/memberListElement.vue";
import AddGroup from "@/components/createPage/CreateGroup.vue";
import ToolBar from "@/components/membersPage/toolBar.vue";
export default {
  name: 'Members',
  components: {
    AddGroup,
    QInfo,
    Header,
    MemberListBlock,
    MemberListElement,
    ToolBar
  },
  beforeCreate() {
    this.$store.dispatch("checkToken")
  }
}
</script>




