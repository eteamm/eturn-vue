<template>
  <div>
    <Header title-name="Участники" title-description="изменение прав" />
    <MemberListBlock header="Администраторы" type="admins"/>
    <MemberListBlock header="Администраторы" type="admins"/>
    <MemberListBlock header="Администраторы" type="admins"/>
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
export default {
  name: 'Members',
  components: {
    Header
  }
}
</script>




