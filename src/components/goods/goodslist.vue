<template>
  <div class="tmpl">
    <el-row>
      <el-col :span="24">
        <div class="abread bt-line">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span:="24">
        <div class="avread bt-line">
          <el-row>
            <el-col :span="6">
              <el-button class="small">
                <i class=" el-icon-check" @click="selectedAll(list)">全选</i>
              </el-button>
              <el-button class="small">
                <router-link to="/admin/goodsadd">
                  <i class="el-icon-plus">新增</i>
                </router-link>
              </el-button>
              <el-button class="small">
                <i class="el-icon-close" @click="delData">删除</i>
              </el-button>
            </el-col>
            <el-col :offset="14" :span="4">
              <el-input  placeholder="请输入搜素内容"  icon="search" v-model="searchValue"  :on-icon-click="getlist" @keydown.13.native="getlist">
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- 表格区域 -->
        <!-- data=  list 一定但是了一个数组，el-table就会自动遍历生成表格的每一个行数据 -->
        <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @select="selected" @select-all="selectedAll">
          <el-table-column type="selection" width="55">
          </el-table-column>
          
          <el-table-column label="标题">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" placement="right-end">
                <div slot="content">
                  <img height="200" width="200" :src="scope.row.imgurl" alt="">
                </div>
                <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">{{scope.row.title}}</router-link>
              </el-tooltip>
          
            </template>
          </el-table-column>
          <el-table-column prop="categoryname" label="所属类别" width="100">
          </el-table-column>
          <el-table-column prop="stock_quantity" label="库存" width="100">
          </el-table-column>
          <el-table-column prop="market_price" label="市场价" width="100">
          </el-table-column>
          <el-table-column prop="sell_price" label="销售价" width="100">
          </el-table-column>
          <el-table-column label="属性" width="100">
            <template scope="scope">
              <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlinght')}"></i>
              <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'unlinght')}"></i>
              <i v-bind="{class:'el-icon-star-on '+(scope.row.is_hot==1?'':'unlinght')}"></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template scope="scope">
              <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">修改</router-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
          <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-sizes="[1, 20, 30, 40]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination> 
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isSelectAll:false,//是否全选，默认是反选
        delids:[],
        pageSize:10,//定义一个分页组件中的页容量，默认是10条
        pageIndex:1,//定义一个分页中的页索引，默认是第一页
        totalCount:0,//数据api返回的数据总行数
        searchValue: '',
        list:[]
      }
    },
    methods: {
      //根据id进行数据删除
      delData(){
        if (this.delids.length<=0) {
          this.$message.error("请选择一条数据");
          return;
        }
        //delids数组转换成以逗号分隔的字符串
        var ids = this.delids.join(',');
        this.$ajax.get('/admin/goods/del/'+ids).then(res=>{
          if (res.data.status==1) {
            this.$message.error(res.data.message);
            return;
          }
          //删除成功以后的逻辑处理，重新调用this.getlist()完成刷新即可
          this.getlist();
        })
      },
      //全选的方法
      selectedAll(rows){
        this.isSelectAll = !this.isSelectAll;

        //如果this.isSelectAll == true 的话表示全选
        if (this.isSelectAll) {
          this.delids.length =0;
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
            //将row的id追加到this.delids中即可
            this.delids.push(row.id);
          });
        }else{
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
          this.delids = [];
        }
      },
      //用户勾选选表格行的时候触发
      selected(selection,row){
        this.delids.push(row.id);
      },
      //获取当前的页索引
      pageIndexChange(currentPage){
        // console.log(currentPage
        //将用户选择的当前页索引赋值给pageindex
        this.pageIndex = currentPage;
        //重新获取新数据
        this.getlist();
      },
      //获取当前的页容量
      pageSizeChange(size){
        // console.log(size);
        this.pageSize=size;
        this.getlist();
      },
      getlist() {
      
          var url='/admin/goods/getlist?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize+'&searchvalue=' + this.searchValue;
          //axios请求
          this.$ajax.get(url).then(res=>{
            this.list=res.data.message;
            this.totalCount = res.data.totalcount;
          })
      }
    },
    mounted(){
      this.getlist();
    }
  }
</script>
<style scoped>
  .unlinght{
    color: rgba(0, 0, 0, 0.3);
  }
</style>