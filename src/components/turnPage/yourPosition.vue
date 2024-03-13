<template>
  <div class="yourTurn">
    <span class="yourTurnTitle">ТВОЙ ЧЕРЕД</span>
    <div class="yourTurnBlock">
      <div class="yourTurnBlockIn">
        <div>#1</div>
        <div class="mainElementTurn">
          <p>Васильев Андрей Антонович</p>
          <p>2391</p>
          <div>
            <p class="countNeedWait">Перед тобой 45 человек</p>
          </div>
        </div>
        <div>X</div>
      </div>
      <div>
        <button class="BtnYourTurnGoIn">войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import TurnPosition from "@/components/turnPage/turnPosition.vue";
export default {
  name: 'YourPosition',
  components: {
    TurnPosition
  },
  props: {},
  data() {
    return {
      members: [
        {
          k: '1',
          memberfio: "Кадун Никита Андреевич ",
          membergroup: "2391"
        },
      ]
    }
  }
}
</script>
