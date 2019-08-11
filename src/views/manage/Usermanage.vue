<template>
  <div class="userManage">
    <div class="btns">
      <Button type="success" @click="initDrawer">添加用户</Button>
      <Button type="info" @click="addAuthority">用户添加权限</Button>
      <Button type="warning" @click="addRole">用户添加角色</Button>
    </div>
    <Input
      search
      style="width: 300px; margin-bottom: 10px"
      v-model="searchCont"
      @on-search="searchUser"
    >
      <span slot="prepend">搜索</span>
    </Input>
    <Table
      stripe
      border
      highlight-row
      :columns="columns1"
      :data="userArr"
      @on-selection-change="selBack"
    >
      <template slot-scope="{ row, index }" slot="id">
        <!-- <Input v-if="editIndex == index" type="text" v-model="editId" /> -->
        <span>{{ row.id }}</span>
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
      <template slot-scope="{ row, index }" slot="username">
        <Input v-if="editIndex == index" type="text" v-model="editUsername" />
        <span v-else>{{ row.username }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="password">
        <Input v-if="editIndex == index" type="text" v-model="editPassword" />
        <span v-else>{{ row.password }}</span>
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
      :total="userLength"
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
      <div class="item">
        <Input
          v-model="addUsername"
          placeholder="填写账号"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">账号：</span>
        </Input>
      </div>
      <div class="item">
        <Input
          v-model="addPassword"
          placeholder="填写密码"
          clearable
          style="width: 220px"
        >
          <span slot="prepend">密码：</span>
        </Input>
      </div>
      <Button type="success" long style="margin-top: 20px" @click="addUser"
        >确认提交</Button
      >
      <Button type="error" long style="margin-top: 20px" @click="value = false"
        >取消</Button
      >
    </Drawer>
    <Modal v-model="showModal" title="设置权限" @on-ok="determineAuthority">
      <p>正在给{{ setAuthorityUser.name }}设置权限</p>
      <CheckboxGroup
        v-for="(item, index) in perArr"
        :key="index"
        v-model="checkArr"
      >
        <Checkbox :label="item.id">
          <span>{{ item.des }}</span>
        </Checkbox>
      </CheckboxGroup>
    </Modal>
    <Modal v-model="showModalRole" title="设置角色" @on-ok="determineRole">
      <p>正在给{{ setAuthorityUser.name }}设置角色</p>
      <CheckboxGroup
        v-for="(item, index) in roleArr"
        :key="index"
        v-model="checkArr2"
      >
        <Checkbox :label="item.id">
          <span>{{ item.name }}</span>
        </Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
import api from '../../api/http';

export default {
  name: 'userManage',
  data() {
    return {
      columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
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
          title: '账号',
          slot: 'username',
          align: 'center'
        },
        {
          title: '密码',
          slot: 'password',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      userArr: [],
      editName: '',
      editSchool: '',
      editPhone: '',
      editMail: '',
      editUsername: '',
      editPassword: '',
      editIndex: -1,
      value: false,
      addId: '',
      addName: '',
      addSchool: '',
      addPhone: '',
      addMail: '',
      addUsername: '',
      addPassword: '',
      searchCont: '',
      pageSize: 3,
      pageNum: 1,
      userLength: 0,
      showModal: false,
      selectionNum: 0,
      setAuthorityUser: {},
      perArr: [],
      checkArr: [],
      userPermission: [],
      defaultCheck: false,
      nowCheck: false,
      userPermissionInd: 0,
      showModalRole: false,
      roleArr: [],
      userRole: [],
      checkArr2: [],
      userRoleIndex: 0
    };
  },
  methods: {
    editClick(row, index) {
      this.editName = row.name;
      this.editSchool = row.school;
      this.editPhone = row.phone;
      this.editMail = row.mail;
      this.editUsername = row.username;
      this.editPassword = row.password;
      this.editIndex = index;
    },
    determineSave(row) {
      api
        .modifyUser(this.editId, {
          id: row.id,
          name: this.editName,
          school: this.editSchool,
          phone: this.editPhone,
          mail: this.editMail,
          username: this.editUsername,
          password: this.editPassword
        })
        .then(res => {
          console.log(res, '成功！');
        })
        .catch(() => {
          console.log('修改请求发送失败！');
        });
      this.editIndex = -1;
      row.name = this.editName;
      row.school = this.editSchool;
      row.phone = this.editPhone;
      row.mail = this.editMail;
      row.username = this.editUsername;
      row.password = this.editPassword;
      api
        .getUser(this.pageNum, this.pageSize)
        .then(res => {
          this.userArr = res.data;
        })
        .catch(() => {
          console.log('返回失败！');
        });
    },
    deleteRow(row, index) {
      this.userArr.splice(index, 1);
      api
        .deleteUser(row.id)
        .then(res => {
          console.log(res.data);
        })
        .catch(() => {
          console.log('删除失败！');
        });
      api
        .getLength()
        .then(res => {
          this.userLength = res.data.length;
        })
        .catch(() => {
          console.log('返回失败！');
        });
      api
        .getUser(this.pageNum, this.pageSize)
        .then(res => {
          this.userArr = res.data;
        })
        .catch(() => {
          console.log('返回失败！');
        });
    },
    addUser() {
      api
        .addUser({
          id: Date.now(),
          name: this.addName,
          school: this.addSchool,
          phone: this.addPhone,
          mail: this.addMail,
          username: this.addUsername,
          password: this.addPassword
        })
        .then(res => {
          this.value = false;
          console.log(res.data);
        })
        .catch(() => {
          console.log('添加失败！');
        });
      api
        .getLength()
        .then(res => {
          this.userLength = res.data.length;
        })
        .catch(() => {
          console.log('返回失败！');
        });
      api
        .getUser(this.pageNum, this.pageSize)
        .then(res => {
          this.userArr = res.data;
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
      api
        .searchUser(this.searchCont)
        .then(res => {
          this.userArr = res.data;
          this.userLength = res.data.length;
        })
        .catch(() => {
          console.log('搜索失败！');
        });
    },
    changePage(val) {
      this.pageNum = val;
      api
        .getUser(this.pageNum, this.pageSize)
        .then(res => {
          this.userArr = res.data;
        })
        .catch(() => {
          console.log('返回失败！');
        });
    },
    selBack(selection) {
      this.selectionNum = selection.length;
      if (this.selectionNum != 0) {
        //是因为只要checkbox变化就会触发这个函数，所以让取消checkbox时，不要传入返回的selection
        this.setAuthorityUser = selection[0];
        console.log(this.setAuthorityUser);
      }
    },
    addAuthority() {
      api
        .getAllauthority()
        .then(res => {
          this.perArr = res.data;
        })
        .catch(() => {
          console.log('请求失败!');
        });
      if (this.selectionNum != 1) {
        this.$Message.warning('只能选择一个用户进行添加权限，请重新选择');
      } else {
        this.checkArr = [];
        api
          .getCurUserPermission(this.setAuthorityUser.id)
          .then(res => {
            this.userPermission = res.data; //这个是拿的当前添加用户的已有的所有权限
            for (let i = 0; i < res.data.length; i++) {
              this.checkArr.push(res.data[i].permissionId);
            }
          })
          .catch(() => {
            console.log('返回失败！');
          });
        this.showModal = true;
      }
    },
    determineAuthority() {
      var b = 0;
      this.perArr.forEach(ele1 => {
        b++;
        this.userPermissionInd = this.userPermission.findIndex(cur => {
          //这个索引是当前用户拥有的权限user_permisson组成的新数组里有这个权限的那条数据的索引
          return cur.permissionId == ele1.id; //当前用户是否有这个权限
        });
        if (this.userPermissionInd != -1) {
          this.defaultCheck = true; //从权限增删改查表拿出来和当前用户已有的权限匹配一下，为刚开始默认该显示选中还是未选中
        } else {
          this.defaultCheck = false;
        }
        // let b = this.checkArr.indexOf(ele1.id);
        if (this.checkArr.indexOf(ele1.id) != -1) {
          //表示存在此权限的时候，也就是现在为选中这个权限的状态
          this.nowCheck = true;
        } else {
          this.nowCheck = false;
        }
        if (this.defaultCheck == this.nowCheck) {
          return;
        } else if (this.defaultCheck == false) {
          api
            .userAddPermission({
              id: Date.now() + b,
              userId: this.setAuthorityUser.id,
              permissionId: ele1.id,
              del: 0,
              subOn: new Date()
            })
            .then(res => {
              console.log(res.data); //这里返回的就是添加的那一条数据
            })
            .catch(() => {
              console.log('请求失败！');
            });
        } else if (this.defaultCheck == true) {
          api
            .userDeletePermission(
              this.userPermission[this.userPermissionInd].id
            )
            .then(res => {
              console.log(res.data);
            })
            .catch(() => {
              console.log('请求失败！');
            });
        }
      });
    },
    addRole() {
      api
        .getAllRole()
        .then(res => {
          this.roleArr = res.data;
        })
        .catch(() => {
          console.log('请求失败！');
        });
      if (this.selectionNum != 1) {
        this.$Message.warning('只能选择一个用户进行添加权限，请重新选择');
      } else {
        this.checkArr2 = [];
        api
          .getCurUserRole(this.setAuthorityUser.id)
          .then(res => {
            this.userRole = res.data; //这个是拿的当前添加用户的已有的所有权限
            for (let i = 0; i < res.data.length; i++) {
              this.checkArr2.push(res.data[i].roleId);
            }
          })
          .catch(() => {
            console.log('返回失败！');
          });
        this.showModalRole = true;
      }
    },
    determineRole() {
      var a = 0;
      this.roleArr.forEach(ele1 => {
        a++;
        this.userRoleIndex = this.userRole.findIndex(cur => {
          return cur.roleId == ele1.id; //当前用户是否有这个权限
        });
        if (this.userRoleIndex != -1) {
          this.defaultCheck = true; //从权限增删改查表拿出来和当前用户已有的权限匹配一下，为刚开始默认该显示选中还是未选中
        } else {
          this.defaultCheck = false;
        }
        // let b = this.checkArr.indexOf(ele1.id);
        if (this.checkArr2.indexOf(ele1.id) != -1) {
          //表示存在此权限的时候，也就是现在为选中这个权限的状态
          this.nowCheck = true;
        } else {
          this.nowCheck = false;
        }
        if (this.defaultCheck == this.nowCheck) {
          return;
        } else if (this.defaultCheck == false) {
          api
            .userAddRole({
              id: Date.now() + a,
              userId: this.setAuthorityUser.id,
              roleId: ele1.id,
              del: 0,
              subOn: new Date()
            })
            .then(res => {
              console.log(res.data); //这里返回的就是添加的那一条数据
            })
            .catch(() => {
              console.log('请求失败！');
            });
        } else if (this.defaultCheck == true) {
          api
            .userDeleteRole(this.userRole[this.userRoleIndex].id)
            .then(res => {
              console.log(res.data);
            })
            .catch(() => {
              console.log('请求失败！');
            });
        }
      });
    }
  },
  created() {
    api
      .getLength()
      .then(res => {
        this.userLength = res.data.length;
      })
      .catch(() => {
        console.log('返回失败！');
      });
    api
      .getUser(this.pageNum, this.pageSize)
      .then(res => {
        this.userArr = res.data;
      })
      .catch(() => {
        console.log('返回失败！');
      });
  }
};
</script>

<style lang="scss" scoped>
.btns {
  margin-bottom: 10px;
  button {
    margin-right: 10px;
  }
}
.item {
  margin-bottom: 10px;
}
</style>
