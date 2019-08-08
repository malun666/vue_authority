<template>
  <div class="roleManage">
    <div class="clearFloat">
      <Button type="primary" class="mTop" @click="modal2 = true"
        >添加数据</Button
      >
      <Button type="success" class="fl" @click="modal10 = true"
        >添加权限</Button
      >
      <Input
        class="fl"
        search
        style="width: 300px; margin-bottom: 10px"
        v-model="searchTxt"
        @on-search="searchText"
        placeholder="请输入查找的内容"
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

    <Modal title="Title" v-model="modal10" class-name="ivu-modal-wrap">
      <!-- <CheckboxGroup v-model="fruit">
        <Checkbox label="香蕉"></Checkbox>
        <Checkbox label="苹果"></Checkbox>
        <Checkbox label="西瓜"></Checkbox>
      </CheckboxGroup> -->
    </Modal>

    <Table :columns="columns" border :data="dataArr">
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

    // 查找对应的数据
    searchText() {
      // 有问题  keyVal==undefined || keyVal=="" || keyVal==null
      if (this.searchTxt.length > 0 && this.searchTxt != ' ') {
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
    /*  axios('/per/role', {
      headers: { Authorization: 'aa' }
    })
      .then(res => {
        this.dataArr = res.data;
      })
      .catch(function(error) {
        console.log(error);
      }); */

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
