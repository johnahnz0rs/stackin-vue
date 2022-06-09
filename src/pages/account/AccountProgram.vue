<template>
  <div v-if="!!hasProgram" id="users-program">
    <v-card
      v-for="win in program"
      :key="win.id"
      :id="win.id"
      class="my-3 bg-green-lighten-4"
    >
      <v-card-text class="d-flex justify-space-between">
        <p>{{ win.win }}</p>
        <router-link
          class="edit-delete float-right"
          :to="`/program/${win.id}`"
        >Edit / Delete</router-link>
      </v-card-text>
    </v-card>

  </div>

  <!-- if the user does not yet have a program -->
  <div v-else id="users-program">
    <p>
      it's human nature to dislike the idea of discipline or living by a
      predetermined schedule/principles (this is stronger is some than others),
      BUT it's true: discipline yields freedom. We believe that if you develop a
      little discipline, you will see a little relief in the area you're
      developing discipline in. Build ALOT of discipline, and you'll gain
      massive freedom, from the bullshit, from the stress, from the scrambling
      and getting by by the skin of your teeth.
    </p>
    <h4>would you like to add the following list of wins?</h4>
    <p>
      it is a curated list of things you can do, FOR STARTERS. We hope you take
      the time to think about yourself and your life and what you want, then ADD
      to this list. Shape your own life, determine your own future, by building
      discipline in the areas that pain you most.
    </p>
    <ul>
      <li>
        <p>
          MAKE YOUR BED — ret. admiral raven, former us navy seal, recommended
          making your bed as soon as you get up. worst case scenario of making
          your bed &#8212; after the world shits down your throat and takes your
          booty with no vaseline, you have a nice bed to come home to to rest
          your wittle head.
        </p>
      </li>
      <li>
        <p>
          GO TO SLEEP AT A PREDETERMINED TIME — we've tried many tactics to try
          to wake up early and get a head start on the day (so we don't take as
          bad an asswhooping), but alas, nothing works. EXCEPT GOING TO SLEEP 8
          hours before our self-determined wake-up time (we need 8 hours; you
          might need more/less).
        </p>
      </li>
      <li>
        <p>
          PHYSICALLY MOVE VIGOROUSLY & WITH HEART/FULL EFFORT — whatever level
          you're at, whatever condition you're in, give it your ALL today.
          whether it's yoga or pumping iron, swimming, biking, climbing, playing
          tag, whatever it is... DO IT WITH EVERYTHING YOU'VE GOT. LOVE your
          life and whatever you love, do it everyday. So you can fulfill
          yourself: (1) your soul needs to DO something it loves, and (2)
          "motion is lotion" for your body, apply daily.
        </p>
      </li>
      <li>
        <p>
          EAT WITH DISCIPLINE — don't just leave it at "you are what you eat",
          shrug your shoulders, and eat a pastry donut. you will not like what
          your body looks like, and your family won't like you being fat. better
          option — MASTER what you eat. google what a "macronutrient" is. then
          think about the food you currently eat — what are its macronutritional
          and caloric makeup/breakdown? if you make a pie chart, what percentage
          of your total food consumed is in each of the "macro" categories?
          (hint: use a free food tracker app on your phone, and it will show you
          that pie chart) keep tracking your food for long enough (a few weeks
          to a few years), and you'll be able to see what are the effects of
          eating different proportions of macros and different amounts/volume of
          food total. you will come to understand FOOD and YOUR BODY in such a
          mind-blowing new way — it's knowledge of self, it's priceless. if you
          want to change your "body composition", then google "body
          recomposition". if you discipline yourself by learning about these
          things, couple it with your physical training/disciple (see above),
          then you will FOR SURE, 100% ONE-HUNDRED PERCENT guaranteed by
          science, make your body look exactly how you want it to. all you need
          to do is be honest with yourself, decide to do it, disciple: learn
          about/google these things (in "quotes" above), trakc your macros, and
          work out hard/with heart/give it everything you've got — that's only
          like 5 things... 5 little things to have the body, knowledge of self,
          and pride/self-confidence of YOUR DREAMS.
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    program() {
      return this.$store.getters['wins/program'];
    },
    hasProgram() {
      return this.$store.getters['wins/hasProgram'];
    },
  }
};
</script>

<style scoped>
.edit-delete {
  width: 40px !important;
  /* min-height: 42px; */
  height: 100%;
  margin-left: 12px;
  /* overflow: overflow; */
}
</style>