<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list>
      <div v-for="(log, index) in call_logs" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label>{{ log.number }}</q-item-label>
            <q-item-label caption lines="2">
              <span v-if="log.name">
                <b>Name:</b> {{ log.name }} <br>
              </span>
              <b>Duration:</b> {{ log.duration }} sec <br>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ format(log.date) }}</q-item-label>
            <q-icon name="add" @click="set_number(log)" color="blue" />
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
      </div>

    </q-list>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'pinia';
import { app_store } from 'src/stores/app_store';
window.moment = moment;
export default {
  data: () => ({
    call_logs: [],
  }),
  created: function () {
    this.get_call_log();
  },
  methods: {
    ...mapActions(app_store,['set_selected_number','set_selected_name']),
    set_number: function(log={}){
      console.log(log);
      this.set_selected_number(log.number);
      this.set_selected_name(log.name);
      this.$router.push('/');
    },
    format: function (date, formats = "DD-MMM-yy") {
      return moment(date).format(formats)
    },
    get_log_data: function (data) {
      data?.sort(function (a, b) { return b.date - a.date; })
      this.call_logs = data;
      console.log(data);
    },
    get_call_log: function () {
      window.plugins.callLog.hasReadPermission((res) => console.log(res), (res) => console.log(res))
      window.plugins.callLog.requestReadPermission((res) => console.log(res), (res) => console.log(res))

      let filters = [{
        "name": "number",
        "value": "%",
        "operator": "like",
      }, {
        "name": "date",
        "value": moment().subtract(1, 'd').valueOf(), // last 7 days
        "operator": ">="
      }];
      window.plugins.callLog.getCallLog(filters, this.get_log_data, function (err) {
        // Error
        console.log(err);
      });
    },
  }
}
</script>

<style></style>
