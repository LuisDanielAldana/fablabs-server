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
    <button @click="getUsers()">OK</button>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import axios from 'axios'
const tableColumns = ["Apellidos", "Nombre", "Correo", "Rol"];
const tableData = []

export default {
  name: "Users",
  components: {
    BaseTable
  },
  data() {
    return {
      table1:{
        title: "Tabla Usuarios",
        columns: [...tableColumns],
        data: [...tableData]
      }
    }
  },
  methods: {
    async getUsers() {
      try{
        const response = await axios.get("https://jittery-hare-girdle.cyclic.app/users/")
        console.log(response)
        console.log("Ok")
      } catch (e){
        console.log("Error")
        console.log(e)
      }
    }
  },
  async beforeMount() {
    this.tableData = await this.getUsers()
  },
}
</script>

<style scoped>

</style>
