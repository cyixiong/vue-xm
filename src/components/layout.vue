<template>
  <div class="tmpl">
    <el-row>
      <el-col :span="4">
        <!-- 左边菜单 -->
        <img src="../../staict/img/logo.png" alt="" class="logo">
        <div class="layout menu">
          <el-menu :default-active="currentMID" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>学员问题汇总</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">内容管理</el-menu-item>
                <el-menu-item index="1-2">类别管理</el-menu-item>
                <el-menu-item index="1-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class=" el-icon-information"></i>前端常用功能</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">内容管理</el-menu-item>
                <el-menu-item index="2-2">分类管理</el-menu-item>
                <el-menu-item index="2-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class=" el-icon-warning"></i>重难点专区</template>
              <el-menu-item-group>
                <el-menu-item index="3-1">内容管理</el-menu-item>
                <el-menu-item index="3-2">分类管理</el-menu-item>
                <el-menu-item index="3-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class=" el-icon-upload"></i>资源下载</template>
              <el-menu-item-group>
                <el-menu-item index="4-1">内容管理</el-menu-item>
                <el-menu-item index="4-2">分类管理</el-menu-item>
                <el-menu-item index="4-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-share"></i>购物商城</template>
              <el-menu-item-group>
                <router-link to="/admin/goodslist">
                  <el-menu-item index="5-1">内容管理</el-menu-item>
                </router-link>
               <router-link to="/admin/goodscate">
                <el-menu-item index="5-2">分类管理</el-menu-item> 
              </router-link>
                <el-menu-item index="5-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-upload2"></i>订单管理</template>
              <el-menu-item-group>
                <el-menu-item index="6-1">内容管理</el-menu-item>
                <el-menu-item index="6-2">分类管理</el-menu-item>
                <el-menu-item index="6-3">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-col :span="24">
            <!-- 顶部登录信息条 -->
            <div class="topbg">
              <el-row>
                <el-col :span="1">
                  <i class="el-icon-menu"></i>
                </el-col>
                <el-col :span="23">
                  欢迎xxx登录
                  <el-dropdown split-button type="primary">
                    更多菜单
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>预览网站</el-dropdown-item>
                      <el-dropdown-item>修改密码</el-dropdown-item>
                      <el-dropdown-item>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <!-- 其他动能的渲染区 -->
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentMID:'5-1'
      }
    },
    mounted(){
      this.currentMID = localStorage.getItem('currentMID');
    },
    methods: {
    }
  }
</script>
<style scoped>
</style>