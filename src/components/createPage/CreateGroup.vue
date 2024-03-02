<template>
  <div class="input-container">
    <input type="text" class="form-control custom-input" v-model="newGroup" placeholder="Введите номер группы">
    <button class="btn btn-primary custom-btn" type="button" @click="addGroup">Add</button>
  </div>
  <div v-if="groups && groups.length > 0">
    <div class="group-list">
      <div v-for="(group, index) in groups" :key="index" class="group-bubble">
        {{ group }}
        <span class="delete-btn" @click="deleteGroup(index)">&#10006;</span> <!-- Заменяем кнопку крестиком -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateGroup',
  data() {
    return {
      newGroup: '',
      groups: []
    }
  },
  methods: {
    addGroup() {
      if (this.newGroup.length === 4 && !isNaN(this.newGroup)) {
        // Check if group already exists
        if (!this.groups.includes(this.newGroup)) {
          this.groups.unshift(this.newGroup);
          this.newGroup = '';
        }
      }
    },
    deleteGroup(index) {
      this.groups.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">
.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.custom-input {
  @extend .NameBox;

  width: calc(75% - 2px); /* Уменьшаем ширину поля ввода на 15% и учитываем отступ между полем ввода и кнопкой */

  &:focus {
    background-color: #393939; // Устанавливаем цвет фона при фокусе, аналогичный цвету в обычном состоянии
  }

  &::placeholder {
    color: $text-second-color; // Устанавливаем желаемый цвет текста placeholder'а
  }
}

.custom-btn {
  border-radius: 50px; /* Делаем кнопку более овальной */
  width: 15%;
  padding: 20px;
  margin-left: 10px; /* Добавляем отступ между полем ввода и кнопкой */
}

.group-list {
  display: flex;
  flex-direction: column; /* Устанавливаем вертикальное расположение для групп */
  align-items: flex-start; /* Выравниваем группы слева */
}

.group-bubble {
  display: inline-flex;
  align-items: center;
  margin-right: 20px; /* Увеличиваем правый отступ для увеличения размера пузырька */
  margin-bottom: 20px; /* Увеличиваем нижний отступ для увеличения размера пузырька */
  padding: 15px 20px; /* Увеличиваем внутренние отступы для увеличения размера пузырька */
  border-radius: 35px; /* Увеличиваем радиус границы для создания более круглой формы пузырька */
  background-color: #007bff;
  color: #fff;
  font-size: 20px; /* Увеличиваем размер шрифта для увеличения размера текста в пузырьке */
  position: relative;
}

.delete-btn {
  color: #fff; /* Устанавливаем цвет креста */
  font-size: 20px; /* Устанавливаем размер креста */
  cursor: pointer; /* Устанавливаем курсор в виде указателя */
  margin-left: 10px; /* Добавляем отступ слева от текста для креста */
}
</style>
