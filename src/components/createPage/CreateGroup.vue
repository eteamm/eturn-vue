<template>
  <div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" v-model="newGroup" placeholder="Введите номер группы">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addGroup">Add</button>
      </div>
    </div>
    <div v-if="groups.length > 0">
      <div class="group-list">
        <div v-for="(group, index) in groups" :key="index" class="group-bubble">
          {{ group }}
          <button class="delete-btn" @click="deleteGroup(index)">&times;</button>
        </div>
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

<style>
.group-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.group-bubble {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  position: relative; /* Add position relative for button positioning */
}

.delete-btn {
  position: absolute; /* Position the button absolutely */
  top: 50%; /* Position the button in the middle vertically */
  right: -50px; /* Position the button 50px from the right edge */
  transform: translateY(-50%); /* Center the button vertically */
  font-weight: bold; /* Add bold font weight */
  color: #fff; /* Set the button color to white */
  background-color: #007bff; /* Set the button background color */
  border: none; /* Remove the button border */
  border-radius: 50%; /* Make the button circular */
  width: 30px; /* Set the button width */
  height: 30px; /* Set the button height */
  text-align: center; /* Center the X symbol horizontally */
  line-height: 1; /* Center the X symbol vertically */
  cursor: pointer; /* Add cursor pointer on hover */
}
</style>
