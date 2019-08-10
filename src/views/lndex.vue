<template>
  <div class="layout">
    <Layout style="height:100%">
      <Header>
        <!-- <button @click="aa">注销</button> -->
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">管理平台</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <Button type="error" @click="logOut">注销</Button>
          </div>
        </Menu>
      </Header>

      <!-- 左侧 -->
      <Layout>
        <Sider
          ref="side1"
          hide-trigger
          collapsible
          :style="{ background: '#5b6270' }"
          v-model="isCollapsed"
        >
          <Menu theme="dark" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate" size="22"></Icon>
                Item 1
              </template>
              <MenuItem name="1-1" to="/index/Usermanage">
                <Icon type="ios-body" size="20" />用户管理</MenuItem
              >
              <MenuItem name="1-2" to="/index/Rolemanage"
                ><Icon type="md-contact" size="20" />角色管理</MenuItem
              >
              <MenuItem name="1-3" to="/index/Authoritymanage"
                ><Icon type="md-contacts" size="20" />权限管理</MenuItem
              >
              <MenuItem name="1-4"
                ><Icon type="ios-globe" size="20" />待添加</MenuItem
              >
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>

        <!-- 右侧  -->
        <Layout :style="{ padding: '0 24px 24px' }">
          <!-- <Breadcrumb :style="{ margin: '24px 0' }"> -->
          <!-- <BreadcrumbItem>Home123</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem> -->
          <!-- <Button type="info">添 加</Button>
            <Button type="success">修 改</Button>
            <Button type="warning">删 除</Button>
            <Button :size="buttonSize" type="primary">
              <Icon type="ios-arrow-back" />
              Backward
            </Button>
          </Breadcrumb> -->
          <Content
            :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
          >
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<style scoped>
button {
  margin-right: 10px;
  font-weight: 600;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  padding: 0 10px;
  height: 30px;
  color: #fff;
  font-weight: 600;
  line-height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 430px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>

<script>
export default {
  name: 'layout',
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
    }
  },
  methods: {
    logOut() {
      sessionStorage.clear();
      location.reload();
    }
  }
};
</script>
