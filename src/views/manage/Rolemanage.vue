<template>
  <div class="roleManage">
    <div class="clearFloat">
      <Button type="primary" class="mTop" @click="modal2 = true"
        >添加数据</Button
      >
      <!-- <Button type="success" class="fl" @click="modal10 = true" -->
      <Button type="success" class="fl" @click="addPower">添加权限</Button>
      <Input
        class="fl"
        search
        style="width: 300px; margin-bottom: 10px"
        v-model="searchTxt"
        @on-search="searchText"
        placeholder="请输入查找的内容"
        v-model.trim="searchTxt"
      >
        <span slot="prepend">搜索</span>
      </Input>
    </div>
    <Modal v-model="modal2" title="请添加数据" :footer-hide="true">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="职位名称" prop="postName">
          <Input
            v-model="formValidate.postName"
            placeholder="请输入职位名称"
          ></Input>
        </FormItem>
        <FormItem label="职位描述" prop="postDescribe">
          <Input
            v-model="formValidate.postDescribe"
            placeholder="请输入职位描述"
          ></Input>
        </FormItem>
        <FormItem label="入职时间" prop="postTime">
          <Input
            v-model="formValidate.postTime"
            placeholder="请输入职时间"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >提交</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >重置</Button
          >
        </FormItem>
      </Form>
    </Modal>

    <Modal
      title="设置权限"
      v-model="modal10"
      class-name="ivu-modal-wrap"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <p>正在给{{ setCheckObj.name }}设置权限</p>
      <CheckboxGroup v-model="social">
        <Checkbox
          v-for="(item, index) in addPowerR"
          :key="index"
          :label="item.id"
        >
          <!-- v-model="checkList" -->
          <Icon type="logo-facebook"></Icon>
          <span>{{ item.des }}</span>
        </Checkbox>
      </CheckboxGroup>
    </Modal>

    <Table
      :columns="columns"
      border
      ref="selection"
      :data="dataArr"
      @on-selection-change="activeCheck"
    >
      <template slot-scope="{ row, index }" slot="id">
        <Input type="text" v-model="editId" v-if="editIndex === index" />
        <span v-else>{{ row.id }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="name">
        <Input type="text" v-model="editName" v-if="editIndex === index" />
        <span v-else>{{ row.name }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="des">
        <Input type="text" v-model="editContent" v-if="editIndex === index" />
        <span v-else>{{ row.des }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="subon">
        <Input type="text" v-model="editTime" v-if="editIndex === index" />
        <span v-else>{{ row.subon }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)">保存</Button>
          <Button @click="editIndex = -1">取消</Button>
        </div>
        <div v-else>
          <Button @click="handleEdit(row, index)">操作</Button>
          <Button @click="deleteDate(row, index)" class="marginRight"
            >删除</Button
          >
        </div>
      </template>
    </Table>
    <Page
      :page-size="pageSize"
      :total="userLength"
      show-total
      show-elevator
      :current="pageNum"
      @on-change="changePage"
    ></Page>
    <!-- 
      userLength 数据的长度 
      show-total 显示总数 
      <Page :total="100" show-total />
      show-elevator 快速跳转到某一页。
        @on-change="changePage"
    -->
  </div>
</template>

<style lang="scss" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.clearFloat {
  overflow: hidden;
}
.fl {
  float: left;
  margin-right: 10px;
}
.marginRight {
  margin-left: 5px;
}
.mTop {
  margin-bottom: 20px;
  float: left;
  margin-right: 10px;
}
.ivu-page {
  margin-top: 10px;
  float: right;
}
</style>
<script>
import axios from 'axios';
export default {
  name: 'roleManage',
  data() {
    return {
      columns: [
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
          title: '姓名-职位',
          slot: 'name',
          align: 'center'
        },
        {
          title: '工作内容',
          slot: 'des',
          align: 'center'
        },
        {
          title: '入职时间',
          slot: 'subon',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      modal2: false, //添加数据模态框
      modal1: false, //模态框
      modal10: false,
      dataArr: [],

      // 初始化分页S
      pageSize: 5, // 每页显示多少条
      pageNum: 1, //第几页
      userLength: 0, //共多少数据
      // 初始化分页E
      searchTxt: '', // 搜索页面
      editId: '',
      editName: '',
      editContent: '',
      editTime: '',
      editIndex: -1, // 当前聚焦的输入框的行数

      // 权限添加s
      addPowerR: [],
      powerpid: '',
      powerdes: '',
      powerstatus: '',
      powerid: '',
      activeCheckbox: '',
      setCheckObj: {},
      social: [], //权限管理选择
      resData: '', //看源数据接口是否返回已经设置权限的数据
      statrsCheck: false, //过去的
      nowCheck: false, //现在的
      // checkList: [],
      // 权限添加E

      // 提交表单
      formValidate: {
        postName: '',
        postDescribe: '',
        postTime: ''
      },
      ruleValidate: {
        postName: [
          {
            required: true,
            message: '名字不能为空',
            trigger: 'blur'
          }
        ],
        postDescribe: [
          {
            required: true,
            message: '职位描述不能为空',
            trigger: 'blur'
          }
        ],
        postTime: [
          {
            required: true,
            message: '时间不能为空',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    ok() {
      //social. 弹出框的权限管理选择
      // console.log(this.social.length);
      // console.log(this.social);
      //全部的权限 没有选择的权限
      this.addPowerR.forEach(item => {
        console.log(item.id);
        //从后台拿过来角色已经选中的权限的
        var index = this.resData.findIndex(val => {
          // 角色已经选中的==全部权限的
          return val.permissionId == item.id;
        });
        // 如果索引那么说明已经存在
        if (index != -1) {
          this.statrsCheck = true;
        } else {
          this.statrsCheck = false;
        }

        let statrsIndex = this.social.indexOf(item.id);
        if (statrsIndex != -1) {
          this.nowCheck = true;
        } else {
          this.nowCheck = false;
        }

        if (this.nowCheck == this.statrsCheck) {
          return;
        } else if (this.nowCheck) {
          //添加
          axios
            .post('/per/role_permission', {
              id: Date.now(), // 现在时间
              roleId: this.setCheckObj.id, //
              permissionId: item.id,
              del: '', //
              subOn: '' //
            })
            .then(res => {
              console.log(res.data);
            })
            .catch(function(error) {
              console.log(error);
            });
        } else if (this.statrsCheck) {
          //如果改变 过去有，则删除
          axios
            .delete('/per/role_permission/' + this.resData[index].id)
            .then(res => {
              console.log(res.data);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });

      /*  axios
          .post('/per/role_permission', {
            id: Date.now(),
            roleId: this.setCheckObj.id,
            permissionId: this.social,
            del: 'false',
            subOn: '2019'
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(function(error) {
            console.log(error);
          });
 */
      // }
    },
    cancel() {
      this.$Message.info('你已取消设置权限');
    },

    changePage(val) {
      this.pageNum = val;
      // console.log(val);
      // console.log(this.pageNum),
      axios(`/per/role/?_page=${this.pageNum}&_limit=${this.pageSize}`, {
        headers: {
          Authorization: 'aa'
        }
      })
        .then(res => {
          this.dataArr = res.data;
        })
        .catch(() => {
          console.log('返回失败');
        });
    },
    // 添加权限2  多选框的长度
    activeCheck(selection) {
      this.activeCheckbox = selection.length;
      // console.log(this.activeCheckbox);
      if (this.activeCheckbox != 0) {
        // this.setCheckObj = selection;
        this.setCheckObj = selection[0];
        // console.log(this.setCheckObj.id);
      }
    },
    // 添加权限及过滤多选框问题
    addPower() {
      // console.log(this.activeCheckbox);
      if (!this.activeCheckbox) {
        this.$Message.warning('请勾选需要操作的数据！');
      } else if (this.activeCheckbox > 1) {
        console.log(this.activeCheckbox);
        this.$Message.warning('每次勾选的数据只能为1条,请重新勾选！');
      } else {
        this.modal10 = true;
        axios({
          method: 'get',
          url: '/per/permission',
          headers: {
            Authorization: 'aa'
          }
        })
          .then(res => {
            this.addPowerR = res.data;
            // 权限的数据
          })
          .catch(() => {
            console.log('数据返回错误！');
          });

        // 上面是展示后台传过来的数据   下面接口是查看要添加数据接口是否有选中的状态
        axios
          .get('/per/role_permission?roleId=' + this.setCheckObj.id)
          .then(res => {
            // console.log(res.data);
            this.resData = res.data; //添加权限时候发送请求后台数据是否已经设置过
            this.social = []; // 先清空下面会设置的
            this.resData.forEach(item => {
              // console.log(item);
              this.social.push(item.permissionId); //把后台设置好的权限追加到目前打开的模态框
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 查找对应的数据
    searchText() {
      //  this.searchTxt
      // 有问题  keyVal==undefined || keyVal=="" || keyVal==null
      // if (this.searchTxt.length > 0 && this.searchTxt != ' ') {
      if (this.searchTxt) {
        axios({
          method: 'get',
          url: '/per/role/?q=' + this.searchTxt,
          headers: {
            Authorization: 'aa'
          }
        }).then(res => {
          this.dataArr = res.data;
        });
      } else {
        this.$Message.warning('请输入要查找的信息');
        return false;
      }
    },

    // 删除对应的表格数据
    deleteDate(row, index) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定要删除吗？</p>',
        onOk: () => {
          // this.$Message.info('确定删除');
          this.dataArr.splice(index, 1);
          axios({
            method: 'delete',
            url: '/per/role/' + row.id,
            headers: { Authorization: 'aa' }
          })
            .then(res => {
              this.$Message.success('删除成功！');
              console.log(res.data);
            })
            .catch(function(error) {
              console.log(error);
            });
        },
        onCancel: () => {
          this.$Message.info('删除已经取消');
        }
      });
    },
    handleEdit(row, index) {
      this.editId = row.id;
      this.editName = row.name;
      this.editContent = row.des;
      this.editTime = row.subon;
      this.editIndex = index;
    },
    handleSave(index) {
      this.editId[index].id = this.id;
      this.data[index].name = this.editName;
      this.data[index].age = this.editAge;
      // this.data[index].birthday = this.editBirthday;
      this.data[index].address = this.editAddress;
      this.editIndex = -1;
    },
    getBirthday(birthday) {
      const date = new Date(parseInt(birthday));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    closeAddDialog() {},
    // 验证提交表单是否为空
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: '/per/role',
            data: {
              id: Date.now(),
              name: this.formValidate.postName,
              des: this.formValidate.postDescribe,
              subon: this.formValidate.postTime
            },
            headers: {
              Authorization: 'aa'
            }
          })
            .then(res => {
              // console.log('添加数成功');

              this.modal2 = false;
              this.$Message.success('添加成功！');
              this.dataArr.push(res.data);
              this.formValidate.postName = '';
              this.formValidate.postDescribe = '';
              this.formValidate.postTime = '';

              // console.log(res.data);
            })
            .catch(() => {
              console.log('添加失败');
            });
          // });
        } else {
          this.$Message.error('请确认输入!');
        }
      });
    }
  },
  // 数据
  created() {
    axios('/per/role', {
      headers: { Authorization: 'aa' }
    })
      .then(res => {
        this.userLength = res.data.length;
        // console.log(this.dataLength);
      })
      .catch(function(error) {
        console.log(error);
      }),
      //  开始分页              默认是第1页面
      axios('/per/role/?_page=' + this.pageNum + '&_limit=' + this.pageSize, {
        headers: { Authorization: 'aa' }
      })
        .then(res => {
          this.dataArr = res.data;
          // console.log(this.dataLength);
        })
        .catch(function() {
          console.log('返回失败！');
        });
  }
};
</script>
