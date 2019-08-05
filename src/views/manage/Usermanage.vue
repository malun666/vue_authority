<template>
  <div class="userManage">
    <Button type="success" style="margin-bottom: 10px" @click="initDrawer"
      >添加用户</Button
    >
    <Input
      search
      style="width: 300px; margin-bottom: 10px"
      v-model="searchCont"
      @on-search="searchUser"
    >
      <span slot="prepend">搜索</span>
    </Input>
    <Table stripe border highlight-row :columns="columns1" :data="pageArr">
      <template slot-scope="{ row, index }" slot="id">
        <Input v-if="editIndex == index" type="text" v-model="editId" />
        <span v-else>{{ row.id }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="name">
        <Input v-if="editIndex == index" type="text" v-model="editName" />
        <span v-else>{{ row.name }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="school">
        <Input v-if="editIndex == index" type="text" v-model="editSchool" />
        <span v-else>{{ row.school }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="phone">
        <Input v-if="editIndex == index" type="text" v-model="editPhone" />
        <span v-else>{{ row.phone }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="mail">
        <Input v-if="editIndex == index" type="text" v-model="editMail" />
        <span v-else>{{ row.mail }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <template v-if="editIndex == index">
          <Button
            type="primary"
            style="margin-right: 5px"
            @click="determineSave(row)"
            >保存</Button
          >
          <Button @click="editIndex = -1">取消</Button>
        </template>
        <template v-else>
          <Button
            type="primary"
            ghost
            style="margin-right: 5px"
            @click="editClick(row, index)"
            >编辑</Button
          >
          <Button type="error" ghost @click="deleteRow(row, index)"
            >删除</Button
          >
        </template>
      </template>
    </Table>
    <Page
      style="margin-top: 15px"
      :total="userArr.length"
      :page-size="pageSize"
      show-elevator
      :current="pageNum"
      @on-change="changePage"
    />
    <Drawer
      title="添加用户"
      :closable="true"
      v-model="value"
      width="15"
      :mask-closable="false"
    >
      <div class="item">
        <Input
          v-model="addId"
          placeholder="填写id号"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">id：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addName"
          placeholder="填写姓名"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">姓名：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addSchool"
          placeholder="填写学校"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">学校：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addPhone"
          placeholder="填写手机"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">手机：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addMail"
          placeholder="填写邮件"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">邮件：</span>
        </Input>
      </div>
      <Button type="success" long style="margin-top: 20px" @click="addUser"
        >确认提交</Button
      >
      <Button type="error" long style="margin-top: 20px" @click="value = false"
        >取消</Button
      >
    </Drawer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'userManage',
  data() {
    return {
      columns1: [
        {
          title: '编号',
          slot: 'id',
          align: 'center',
          sortable: true
        },
        {
          title: '姓名',
          slot: 'name',
          align: 'center'
        },
        {
          title: '学校',
          slot: 'school',
          align: 'center'
        },
        {
          title: '电话',
          slot: 'phone',
          align: 'center'
        },
        {
          title: '邮件',
          slot: 'mail',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      userArr: [],
      pageArr: [],
      editId: '',
      editName: '',
      editSchool: '',
      editPhone: '',
      editMail: '',
      editIndex: -1,
      value: false,
      addId: '',
      addName: '',
      addSchool: '',
      addPhone: '',
      addMail: '',
      searchCont: '',
      pageSize: 3,
      pageNum: 1
    };
  },
  methods: {
    editClick(row, index) {
      this.editId = row.id;
      this.editName = row.name;
      this.editSchool = row.school;
      this.editPhone = row.phone;
      this.editMail = row.mail;
      this.editIndex = index;
    },
    determineSave(row) {
      // console.log(row.id);
      axios({
        method: 'put',
        url: '/api/user/' + this.editId,
        headers: {
          Authorization: 'aa'
        },
        data: {
          id: this.editId,
          name: this.editName,
          school: this.editSchool,
          phone: this.editPhone,
          mail: this.editMail
        }
      })
        .then(res => {
          console.log(res, '成功！');
        })
        .catch();
      this.editIndex = -1;
      row.id = this.editId;
      row.name = this.editName;
      row.school = this.editSchool;
      row.phone = this.editPhone;
      row.mail = this.editMail;
      // axios('/api/user', {
      //   headers: {
      //     Authorization: 'aa'
      //   }
      // })
      //   .then(res => {
      //     this.userArr = res.data;
      //   })
      //   .catch(() => {
      //     console.log('返回失败！');
      //   });
    },
    deleteRow(row, index) {
      this.userArr.splice(index, 1);
      axios({
        method: 'delete',
        url: '/api/user/' + row.id,
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(() => {
          console.log('删除失败！');
        });
      axios('/api/user', {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.userArr = res.data;
          let startNum = (this.pageNum - 1) * this.pageSize;
          let endNum = startNum + this.pageSize;
          this.pageArr = this.userArr.slice(startNum, endNum);
        })
        .catch(() => {
          console.log('返回失败！');
        });
    },
    addUser() {
      axios({
        method: 'post',
        url: '/api/user',
        headers: {
          Authorization: 'aa'
        },
        data: {
          id: Number(this.addId),
          name: this.addName,
          school: this.addSchool,
          phone: this.addPhone,
          mail: this.addMail
        }
      })
        .then(res => {
          this.value = false;
          console.log(res.data);
        })
        .catch(() => {
          console.log('添加失败！');
        });
      axios('/api/user', {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.userArr = res.data;
          let startNum = (this.pageNum - 1) * this.pageSize;
          let endNum = startNum + this.pageSize;
          this.pageArr = this.userArr.slice(startNum, endNum);
        })
        .catch(() => {
          console.log('返回失败！');
        });
    },
    initDrawer() {
      this.value = true;
      this.addId = '';
      this.addName = '';
      this.addSchool = '';
      this.addPhone = '';
      this.addMail = '';
    },
    searchUser() {
      axios({
        method: 'get',
        url: '/api/user/?q=' + this.searchCont,
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.userArr = res.data;
        })
        .catch(() => {
          console.log('搜索失败！');
        });
    },
    changePage(val) {
      this.pageNum = val;
      axios('/api/user', {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.userArr = res.data;
          let startNum = (this.pageNum - 1) * this.pageSize;
          let endNum = startNum + this.pageSize;
          this.pageArr = this.userArr.slice(startNum, endNum);
        })
        .catch(() => {
          console.log('返回失败！');
        });
    }
  },
  created() {
    axios('/api/user', {
      headers: {
        Authorization: 'aa'
      }
    })
      .then(res => {
        this.userArr = res.data;
        let startNum = (this.pageNum - 1) * this.pageSize;
        let endNum = startNum + this.pageSize;
        this.pageArr = this.userArr.slice(startNum, endNum);
      })
      .catch(() => {
        console.log('返回失败！');
      });
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 10px;
}
</style>
