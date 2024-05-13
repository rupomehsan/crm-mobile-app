<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="50">
      <div v-for="(record, index) in records" :key="index">
        <div class="q-pa-sm entry_card">
          <div>
            <div>Time:</div>
            <div>
              {{ record.created_at }} <br>
            </div>
          </div>
          <div>
            <div>Name:</div>
            <div>
              {{ record.name }} <br>
            </div>
          </div>
          <div>
            <div>Number:</div>
            <div>
              {{ record.number }} <br>
            </div>
          </div>
          <div>
            <div>Department:</div>
            <div>
              {{ record.department }} <br>
            </div>
          </div>
          <div>
            <div>Statement:</div>
            <div>
              {{ record.statement }} <br>
            </div>
          </div>
          <div>
            <div>Feedback:</div>
            <div>
              {{ record.feedback }} <br>
              <q-btn outline style="color: indianred;" label="show all" class="q-mt-sm" @click.prevent="set_number(record)"></q-btn>
            </div>
          </div>
        </div>

        <q-separator spaced inset />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <div class="text-center" v-if="current_page >= last_page">
      there is no more data to show
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { app_store } from 'src/stores/app_store';
import { mapActions } from 'pinia';
export default {
  data: () => ({
    records: [],
    last_page: 1,
    current_page: 1,
  }),
  created: function () {

  },
  methods: {
    ...mapActions(app_store,['set_selected_number']),
    set_number: function(log={}){
      console.log(log);
      this.set_selected_number(log.number);
      this.$router.push('/');
    },
    onLoad:async function (index, done) {
      this.current_page = index;
      if(index <= this.last_page){
        let response = await axios.post('https://techparkit.org/api/get_record?page='+(index));
        this.last_page = response.data.last_page;
        console.log(response.data);
        this.records = [...this.records, ...response.data.data];
        done();
        return ;
      }else{
        done();
      }
    }
  }
}
</script>

<style></style>
