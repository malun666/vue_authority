<template>
  <div class="home">
    <Table
      stripe
      border
      highlight-row
      :columns="columns1"
      :data="userArr"
    ></Table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      columns1: [
        {
          title: '编号',
          key: 'id',
          sortable: true
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '学校',
          key: 'school'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '邮件',
          key: 'mail'
        }
      ],
      userArr: []
    };
  },
  created() {
    axios('/api/user', {
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
  }
};
</script>
