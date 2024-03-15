<template>
  <div>
    <Header title-name="Участники" title-description="изменение прав" />

    <div class="sameBlocks"><img src="../../src/assets/img/show.svg" alt="show">
      <MemberListBlock header="Администраторы" type="admins"/>

    </div>

    <div class="sameBlocks"><img src="../../src/assets/img/show.svg" alt="show">
      <MemberListBlock header="Участники" type="members"/>
    </div>

    <div class="sameBlocks"><img src="../../src/assets/img/show.svg" alt="show">
      <MemberListBlock header="Заблокированные" type="blocked"/>
    </div>

  </div>

</template>
<script>


// TODO 1 Сделать компонент с блоком участников MemberListBlock

// props: заголовок, тип
// Весь компонент оборачиваем в div
// Заголовок добавляем h3
// Добавляем список из компонента 2



// TODO 2 Создаем компонент для одного участника MemberListElement

// props: имя и тип (который был до этого)
// оборачиваем в div
// делаем текст для имени <p>
// делаем div для трех точек

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




