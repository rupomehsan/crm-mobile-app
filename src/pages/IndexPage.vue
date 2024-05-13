<template>
  <q-page class="flex">
    <div class="q-pa-md">
      <form action="" @submit.prevent="save_feedback($event.target)">
        <q-input v-model="full_name" name="name" label="Full Name" />
        <q-input v-model="number" @change="get_record()" name="number" label="Phone Number" />
        <q-input v-model="feedback" name="feedback" label="Feedback" /> <br>
        <div>
          <b for="">Department <br></b>
          <div class="q-gutter-sm">
            <q-radio v-model="department" name="department" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="English" label="English" />
            <q-radio v-model="department" name="department" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="IT" label="IT" />
            <q-radio v-model="department" name="department" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="Solution" label="Solution" />
          </div>
        </div>
        <div>
          <b for="">Statement</b>
          <select name="statement" id="" class="q-pa-sm q-mt-sm" style="width: 100%;">
            <option value="Agree on course">Agree on course</option>
            <option value="Disagree on course">Disagree on course</option>
            <option value="Well wisher">Well wisher</option>
            <option value="Running student">Running student</option>
            <option value="Old student">Old student</option>
            <option value="Wrong number">Wrong number</option>
          </select>
        </div>
        <br>
        <div class="flex justify-between" style="gap: 5px;">
          <q-btn :size="'sm'" color="secondary" type="submit" outline icon-right="send" label="Submit" />
          <q-btn :size="'sm'" color="red" type="reset" @click="reset_form" outline icon-right="refresh" label="Reset" />
          <q-btn :size="'sm'" color="blue" @click="get_call_log" type="button" outline icon-right="refresh" label="Last Number" />
        </div>
      </form>
      <div style="color: green;">
        {{ toast }}
      </div>
      <div>
        <div class="shadow-2 q-my-sm q-pa-sm  rounded-borders" style="font-size: 10px;" v-for="(item, index) in lists"
          :key="index">
          <b style="width: 60px;display: inline-block;">Id:</b> {{ item.id }} <br>
          <b style="width: 60px;display: inline-block;">Number:</b> {{ item.number }} <br>
          <b style="width: 60px;display: inline-block;">Department:</b> {{ item.department }} <br>
          <b style="width: 60px;display: inline-block;">Statement:</b> {{ item.statement }} <br>
          <b style="width: 60px;display: inline-block;">Feedback:</b> {{ item.feedback }} <br>
          <b style="width: 60px;display: inline-block;">Contacted:</b> {{ item.created_at }} <br>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref, onBeforeUnmount } from 'vue'
import { Sim } from 'ionic-native';
import axios from 'axios';
import { mapActions, mapState } from 'pinia';
import { app_store } from 'src/stores/app_store';

export default defineComponent({
  setup() {
    // cordova.plugins.phonedialer.call(
    //   "+01646376015",
    //   function (success) { alert('Dialing succeeded'); },
    //   function (err) {
    //     if (err == "empty") alert("Unknown phone number");
    //     else alert("Dialer Error:" + err);
    //   },
    //   // onSpeakerOn,
    //   // appChooser
    // );

    return {

    }
  },
  name: 'App',
  data: () => ({
    toast: '',
    number: '',
    feedback: '',
    full_name: '',
    department: 'English',
    statement: 'Agree on course',
    lists: [],
  }),
  created: function () {
    if(this.selected_number){
      this.number = this.selected_number;
      this.full_name = this.selected_name;
      this.get_record();
    }

    this.init_call_state();
    window.plugins.callLog.hasReadPermission((res) => console.log(res), (res) => console.log(res))
    window.plugins.callLog.requestReadPermission((res) => console.log(res), (res) => console.log(res))
    // this.lists = JSON.parse(localStorage.getItem('lists') || "[]");
  },
  methods: {
    ...mapActions(app_store, ['set_selected_number']),
    reset_form: function () {
      this.number = '';
      this.feedback = '';
      this.full_name = '';
      this.set_selected_number('');
      this.lists = [];
    },
    init_call_state: function () {
      let that = this;
      PhoneCallState.watchState(async function (response) {
        let state = response.state;
        let incoming_number = response.number;

        that.number = incoming_number;

        if (incoming_number) {
          that.get_record();
        }

        console.log(response);

        switch (state) {
          case 'IDLE':
            break;
          case 'OFFHOOK':
            break;
          case 'RINGING':
            if (incoming_number) {
              console.log('response ', response);
            }
            break;
        }
      }, (err) => {
        // Permission Denied
        console.log(err);
      });
    },
    get_record: function () {
      axios.post('https://techparkit.org/api/get_record', { number: this.number })
        .then((res) => {
          console.log(res.data);
          this.lists = res.data;
        })
    },
    save_feedback: function (form) {
      let confirmm = confirm("submit");
      if (confirmm) {
        axios.post('https://techparkit.org/api/save_no', new FormData(form))
          .then(res => {
            console.log(res.data);
            this.number = '';
            this.feedback = '';
            this.full_name = '';
            this.set_selected_number('');
            this.show_toast();
          })
          .catch(err => {
            this.show_toast('failed');
            console.log(err, err.response);
          })
      }
    },
    show_toast: function (title = "success") {
      this.toast = title;
      let that = this;
      setTimeout(function () {
        that.toast = "";
      }, 3000);
    },
    add() {
      this.lists.unshift(this.title);
      localStorage.setItem("lists", JSON.stringify(this.lists));
      console.log(this.title);
    },
    get_sim_info_2: function () {
      Sim.getSimInfo().then(
        (info) => console.log('Sim info: ', info),
        (err) => console.log('Unable to get sim info: ', err)
      );

      Sim.hasReadPermission().then(
        (info) => console.log('Has permission:', info)
      );

      Sim.requestReadPermission().then(
        () => console.log('Permission granted'),
        () => console.log('Permission denied')
      );
    },
    check_custom_plugin: function () {
      // cordova.exec(sayHelloSuccess, sayHelloFailure, "Example", "Example", ["alsjdfl"]);

      function sayHelloSuccess(data) {
        alert("OK: " + data);
      }

      function sayHelloFailure(data) {
        alert("FAIL: " + data);
      }

    },
    get_sim_info: function () {
      document.addEventListener("deviceready", onDeviceReady, false);

      function onDeviceReady() {
        window.plugins.sim.getSimInfo(successCallback, errorCallback);
      }

      function successCallback(result) {
        console.log(result);
      }

      function errorCallback(error) {
        console.log(error);
      }

      // Android only: check permission
      function hasReadPermission() {
        window.plugins.sim.hasReadPermission(successCallback, errorCallback);
      }

      // Android only: request permission
      function requestReadPermission() {
        window.plugins.sim.requestReadPermission(successCallback, errorCallback);
      }
    },
    get_log_data: function (data) {
      data?.sort(function (a, b) { return b.date - a.date; })
      this.full_name = data[0]?.name;
      this.number = data[0]?.number;
      this.get_record();
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
        "value": moment().subtract(1,'d').valueOf(), // last 7 days
        "operator": ">="
      }];
      window.plugins.callLog.getCallLog(filters, this.get_log_data, function (err) {
        // Error
        console.log(err);
      });
    },
  },
  computed: {
    ...mapState(app_store, ['selected_number','selected_name']),
  }
})
</script>
