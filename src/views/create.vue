<template>
  <div>
    <Header title-name="Создать" title-description="новая очередь" />
    <QInfo header = "название очереди" type="name"/>
    <QInfo header = "описание" type="description"/>
    <QInfo header = "частота"/>
    <QParameters qparameters= "Параметры доступа"/>
    <p style = "color: white" class="SubHeader">допустимые группы</p>
    <AddGroup />


  </div>
</template>




<script>
import Header from "@/components/header.vue";
import QInfo from "@/components/createPage/CreateInfo.vue";
import ExtraInfo from "@/components/turnPage/extraInfo.vue";
import ElementHeader from"@/components/createPage/CreateHeader.vue";
import QDescription from "@/components/createPage/CreateDescription.vue";
import QFrequency from "@/components/createPage/CreateFrequency.vue";
import QParameters from "@/components/createPage/CreateParameters.vue";
import AddGroup from "@/components/createPage/CreateGroup.vue";

export default {
  name: 'Create',
  components: {
    AddGroup,
    Header,
    QInfo,
    ExtraInfo,
    ElementHeader,
    QDescription,
    QFrequency,
    QParameters


  },
  beforeCreate() {
    this.$store.dispatch("checkToken")
  },
}
</script>
