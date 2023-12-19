<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive">
          <base-table :data="table1.data"
                      :columns="table1.columns"
                      thead-classes="text-primary">
          </base-table>
        </div>
      </card>
    </div>
<!--    <button @click="getUsers()">OK</button>-->
  </div>
</template>

<script>
import {BaseTable} from "@/components";
import axios from 'axios'
const tableColumns = ["ID", "Equipo", "Precio", "Status"];
const tableData = []

export default {
  name: "Equipment",
  components: {
    BaseTable
  },
  data() {
    return {
      table1:{
        title: "Tabla Equipo",
        columns: [...tableColumns],
        data: [...tableData]
      }
    }
  },
}
</script>

<style scoped>

</style>
