<template>
  <div class="authority">
    <Button type="success" style="margin-bottom: 10px" @click="initDrawer"
      >添加权限</Button
    >
    <Input
      search
      style="width: 300px; margin-bottom: 10px"
      v-model="searchCont"
      @on-search="searchPermission"
    >
      <span slot="prepend">搜索</span>
    </Input>
    <Table stripe border highlight-row :columns="columns" :data="permissionArr">
      <template slot-scope="{ row, index }" slot="id">
        <Input v-if="editIndex == index" type="text" v-model="editId" />
        <span v-else>{{ row.id }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="pid">
        <Input v-if="editIndex == index" type="text" v-model="editPid" />
        <span v-else>{{ row.pid }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="type">
        <Input v-if="editIndex == index" type="text" v-model="editType" />
        <span v-else>{{ row.type }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="des">
        <Input v-if="editIndex == index" type="text" v-model="editDes" />
        <span v-else>{{ row.des }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="status">
        <Input v-if="editIndex == index" type="text" v-model="editStatus" />
        <span v-else>{{ row.status }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="del">
        <Input v-if="editIndex == index" type="text" v-model="editDel" />
        <span v-else>{{ row.del }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="subon">
        <Input v-if="editIndex == index" type="text" v-model="editSubon" />
        <span v-else>{{ row.subon }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="subby">
        <Input v-if="editIndex == index" type="text" v-model="editSubby" />
        <span v-else>{{ row.subby }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="code">
        <Input v-if="editIndex == index" type="text" v-model="editCode" />
        <span v-else>{{ row.code }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="url">
        <Input v-if="editIndex == index" type="text" v-model="editCode" />
        <span v-else>{{ row.url }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <template v-if="editIndex == index">
          <Button
            type="primary"
            style="margin-right: 5px"
            @click="determineSave(row)"
            size="small"
            >保存</Button
          >
          <Button @click="editIndex = -1" size="small">取消</Button>
        </template>
        <template v-else>
          <Button
            type="primary"
            ghost
            style="margin-right: 5px"
            @click="editClick(row, index)"
            size="small"
            >编辑</Button
          >
          <Button type="error" ghost @click="deleteRow(row, index)" size="small"
            >删除</Button
          >
        </template>
      </template>
    </Table>
    <Page
      style="margin-top: 15px"
      :total="permissionLength"
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
          v-model="addPid"
          placeholder="填写pid号"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">pid：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addType"
          placeholder="填写种类"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">种类：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addDes"
          placeholder="填Des"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">Des：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addStatus"
          placeholder="填写状态"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">状态：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addDel"
          placeholder="填写Del"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">Del：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addSubon"
          placeholder="填写Subon"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">Subon：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addSubby"
          placeholder="填写Subby"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">Subby：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addCode"
          placeholder="填写Code"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">Code：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addUrl"
          placeholder="填写Url"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">Url：</span>
        </Input>
      </div>
      <Button
        type="success"
        long
        style="margin-top: 20px"
        @click="addPermission"
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
  name: 'authority',
  data() {
    return {
      columns: [
        {
          title: '编号',
          slot: 'id',
          align: 'center',
          sortable: true
        },
        {
          title: '副编号',
          slot: 'pid',
          align: 'center'
        },
        {
          title: '种类',
          slot: 'type',
          align: 'center'
        },
        {
          title: '管理名',
          slot: 'des',
          align: 'center'
        },
        {
          title: '状态',
          slot: 'status',
          align: 'center'
        },
        {
          title: 'del',
          slot: 'del',
          align: 'center'
        },
        {
          title: 'subon',
          slot: 'subon',
          align: 'center'
        },
        {
          title: 'subby',
          slot: 'subby',
          align: 'center'
        },
        {
          title: 'subby',
          slot: 'subby',
          align: 'center'
        },
        {
          title: 'code',
          slot: 'code',
          align: 'center'
        },
        {
          title: 'url',
          slot: 'url',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      permissionArr: [],
      editId: '',
      editPid: '',
      editType: '',
      editDes: '',
      editStatus: '',
      editDel: '',
      editSubon: '',
      editSubby: '',
      editCode: '',
      editUrl: '',
      editIndex: -1,
      addId: '',
      addPid: '',
      addType: '',
      addDes: '',
      addStatus: '',
      addDel: '',
      addSubon: '',
      addSubby: '',
      addCode: '',
      addUrl: '',
      searchCont: '',
      pageSize: 3,
      pageNum: 1,
      permissionLength: 0,
      value: false
    };
  },
  methods: {
    editClick(row, index) {
      this.editId = row.id;
      this.editPid = row.pid;
      this.editType = row.type;
      this.editDes = row.des;
      this.editStatus = row.status;
      this.editDel = row.del;
      this.editSubon = row.subon;
      this.editSubby = row.subby;
      this.editCode = row.code;
      this.editUrl = row.url;
      this.editIndex = index;
    },
    deleteRow(row, index) {
      this.permissionArr.splice(index, 1);
      axios({
        method: 'delete',
        url: '/per/permission/' + row.id,
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(() => {
          console.log('删除失败！', row.id);
        });
    },
    addPermission() {
      axios({
        method: 'post',
        url: '/per/permission',
        headers: {
          Authorization: 'aa'
        },
        data: {
          id: Number(this.addId),
          pid: this.addPid,
          type: this.addType,
          des: this.addDes,
          status: this.addStatus,
          del: this.addDel,
          subon: this.addSubon,
          subby: this.addSubby,
          code: this.addCode,
          url: this.addUrl
        }
      })
        .then(res => {
          this.value = false;
          console.log(res.data);
        })
        .catch(() => {
          console.log('添加失败！');
        });
      this.reDownload();
    },
    initDrawer() {
      this.value = true;
      this.addId = '';
      this.addPid = '';
      this.addType = '';
      this.addDes = '';
      this.addStatus = '';
      this.addDel = '';
      this.addSubon = '';
      this.addSubby = '';
      this.addCode = '';
      this.addUrl = '';
    },
    determineSave(row) {
      // console.log(row.id);
      axios({
        method: 'put',
        url: '/per/permission/' + this.editId,
        headers: {
          Authorization: 'aa'
        },
        data: {
          id: this.editId,
          pid: this.editPid,
          type: this.editType,
          des: this.editDes,
          status: this.editStatus,
          del: this.editDel,
          subon: this.editSubon,
          subby: this.editSubby,
          code: this.editCode,
          url: this.editUrl
        }
      })
        .then(res => {
          console.log(res, '成功！');
        })
        .catch();
      this.editIndex = -1;
      row.id = this.editId;
      row.pid = this.editPid;
      row.type = this.editType;
      row.des = this.editDes;
      row.status = this.editStatus;
      row.del = this.editDel;
      row.subon = this.editSubon;
      row.subby = this.editSubby;
      row.code = this.editCode;
      row.url = this.editUrl;
    },
    searchPermission() {
      axios({
        method: 'get',
        url: '/per/permisssion/?q=' + this.searchCont,
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.permissionArr = res.data;
        })
        .catch(() => {
          console.log('搜索失败！');
        });
    },
    changePage(val) {
      this.pageNum = val;
      this.reDownload();
    },
    reDownload() {
      axios('/per/permission', {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.permissionLength = res.data.length;
        })
        .catch(() => {
          console.log('返回失败！');
        });
      axios(`/per/permission?_page=${this.pageNum}&_limit=${this.pageSize}`, {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.permissionArr = res.data;
        })
        .catch(() => {
          console.log('返回失败！');
        });
    }
  },
  created() {
    this.reDownload();
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 10px;
}
</style>
