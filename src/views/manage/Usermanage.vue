<template>
  <div class="userManage">
    <div class="btns">
      <Button type="success" @click="initDrawer">添加用户</Button>
      <Button type="info" @click="addAuthority">添加权限</Button>
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
  </div>
</template>

<script>
import axios from 'axios';
import { constants } from 'crypto';

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
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      userArr: [],
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
      userPermissionInd: 0
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
          this.userLength = res.data.length;
        })
        .catch(() => {
          console.log('返回失败！');
        });
      axios(`/api/user?_page=${this.pageNum}&_limit=${this.pageSize}`, {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.userArr = res.data;
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
          this.userLength = res.data.length;
        })
        .catch(() => {
          console.log('返回失败！');
        });
      axios(`/api/user?_page=${this.pageNum}&_limit=${this.pageSize}`, {
        headers: {
          Authorization: 'aa'
        }
      })
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
      axios({
        method: 'get',
        url: '/api/user/?q=' + this.searchCont,
        headers: {
          Authorization: 'aa'
        }
      })
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
      axios('/api/user', {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.userLength = res.data.length;
        })
        .catch(() => {
          console.log('返回失败！');
        });
      axios(`/api/user?_page=${this.pageNum}&_limit=${this.pageSize}`, {
        headers: {
          Authorization: 'aa'
        }
      })
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
      if (this.selectionNum != 1) {
        this.$Message.warning('只能选择一个用户进行添加权限，请重新选择');
      } else {
        this.checkArr = [];
        axios('/per/user_permission?userId=' + this.setAuthorityUser.id, {
          headers: {
            Authorization: 'aa'
          }
        })
          .then(res => {
            this.userPermission = res.data; //这个是拿的当前添加用户的已有的所有权限
            for (let i = 0; i < res.data.length; i++) {
              this.checkArr.push(res.data[i].permissionId);
            }
            // res.data.forEach(ele1 => {
            //   this.perArr.forEach(ele2 => {
            //     if (ele1.permissionId == ele2.id) {0
            //       this.checkArr.push(ele2.id);
            //       var defaultCheck = true;
            //     } else {
            //       var defaultCheck = false;
            //     }
            //   });
            // });
          })
          .catch(() => {
            console.log('返回失败！');
          });
        this.showModal = true;
      }
    },
    determineAuthority() {
      this.perArr.forEach(ele1 => {
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
          axios({
            method: 'post',
            url: '/per/user_permission',
            headers: {
              Authorization: 'aa'
            },
            data: {
              id: Date.now(),
              userId: this.setAuthorityUser.id,
              permissionId: ele1.id,
              del: 0,
              subOn: new Date()
            }
          })
            .then(res => {
              console.log(res.data); //这里返回的就是添加的那一条数据
            })
            .catch(() => {
              console.log('请求失败！');
            });
        } else if (this.defaultCheck == true) {
          axios({
            method: 'delete',
            url:
              '/per/user_permission/' +
              this.userPermission[this.userPermissionInd].id,
            headers: {
              Authorization: 'aa'
            }
          })
            .then(res => {
              console.log(res.data);
            })
            .catch(() => {
              constants.log('请求失败！');
            });
        }
      });
      // for (let i = 0; i < this.checkArr.length; i++) {
      //   axios({
      //     method: 'post',
      //     url: '/per/user_permission',
      //     headers: {
      //       Authorization: 'aa'
      //     },
      //     data: {
      //       id: Date.now(),
      //       userId: this.setAuthorityUser.id,
      //       permissionId: this.checkArr[i],
      //       del: 0,
      //       subOn: new Date()
      //     }
      //   })
      //     .then(res => {
      //       console.log(res.data); //这里返回的就是添加的那一条数据
      //     })
      //     .catch(() => {
      //       console.log('请求失败！');
      //     });
      // }
    }
  },
  created() {
    axios('/api/user', {
      headers: {
        Authorization: 'aa'
      }
    })
      .then(res => {
        this.userLength = res.data.length;
      })
      .catch(() => {
        console.log('返回失败！');
      });
    axios('/api/user?_page=' + this.pageNum + '&_limit=' + this.pageSize, {
      headers: {
        Authorization: 'aa'
      }
    })
      .then(res => {
        this.userArr = res.data;
      })
      .catch(() => {
        console.log('返回失败！');
      });
    axios('/per/permission', {
      headers: {
        Authorization: 'aa'
      }
    })
      .then(res => {
        this.perArr = res.data;
      })
      .catch(() => {
        console.log('请求失败!');
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
