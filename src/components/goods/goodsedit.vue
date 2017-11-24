<template>
  <div class="tmpl">
    <el-row>
      <el-col :span="24">
        <div class="abread bt-line">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">返回上一层</el-breadcrumb-item>
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>新增内容</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- 标题 -->
          <el-row>
            <el-col :span="10">
              <el-form-item label="内容标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 类别 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属类别">
                <el-select v-model="ruleForm.category_id" placeholder="所属类别">
                  <el-option v-for="item in catelist" :value="item.category_id" :label="item.title">
                    <span v-for="sub in (item.class_layer -1)">&nbsp;</span>
                    <span v-if="item.class_layer>1">|-</span>{{item.title}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="ruleForm.status" on-text="是" off-text="否" on-color="#13ce66" off-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="推荐类型" prop="delivery">
                <el-switch :width="80" v-model="ruleForm.is_slide" on-text="轮播图" off-text="轮播图" on-color="#13ce66" off-color="#ff4949">
                </el-switch>
                <el-switch v-model="ruleForm.is_top" on-text="置顶" off-text="置顶" on-color="#13ce66" off-color="#ff4949">
                </el-switch>
                <el-switch v-model="ruleForm.is_hot" on-text="推荐" off-text="推荐" on-color="#13ce66" off-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 图片上传 -->
          <el-row>
            <el-col :span="10">
              <el-form-item label="封面上传">
                <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" list-type="picture"
                  :on-success="imgUploaded">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="相册上传">
                <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadfile" :file-list="ruleForm.fileList" list-type="picture"
                  :on-success="fileUplaoded">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 商品的数量 -->
          <el-row>
            <el-col :span="5">
              <el-form-item label="商品货号" prop="sub_title">
                <el-input v-model="ruleForm.goods_no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="库存数量" prop="stock_quantity">
                <el-input v-model="ruleForm.stock_quantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="ruleForm.market_price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="销售价格" prop="sell_price">
                <el-input v-model="ruleForm.sell_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 摘要 -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="内容摘要" prop="zhaiyao">
                <el-input v-model="ruleForm.zhaiyao"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 富文本 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="商品详情" prop="conent">
                <quill-editor :content="ruleForm.content" @chang="onEditorChange($event)">
                </quill-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 验证 -->
          <el-row>
            <el-col :offset="6" :span="8">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  //导入富文本编辑器
  import { quillEditor } from 'vue-quill-editor'
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        catelist: [],
        goodsid: this.$route.params.goodsid,
        ruleForm: {
          title: '',
          sub_title: '',
          "goods_no": "",
          category_id: '',  // 小问题：category_id要是一个数值类型，如果变成字符串类型的话，则页面显示不正常
          "stock_quantity": '',
          "market_price":'' ,
          "sell_price":'' ,
          "status": true,
          "is_slide": true,
          "is_top": false,
          "is_hot": true,
          "zhaiyao": "",
          "content": "<p><strong></strong></p>",
          "imgList": [
            // {
            //     "name": "wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
            //     "url": "http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
            //     "shorturl": "/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"
            // }
          ],
          "fileList": [
            // {
            //     "name": "HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
            //     "url": "http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
            //     "shorturl": "/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
            // }
          ]
        },
        //表单元素的验证规则
        rules: {
          title: [
            { required: true, message: '请输入商品标题', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.getcastlist();
    },
    methods: {
      //1.0获取商品分类数据
      getcastlist() {
        var url = "/admin/category/getlist/goods";
        this.$ajax.get(url).then(res => {
          this.catelist = res.data.message;

          this.getGoodsInFo()
        })
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //富文本编辑器内容发生改变的时候触动此方法
      onEditorChange(ev) {
        this.ruleForm.content = ev.html;
      },
      //相册封面的上传
      fileUplaoded(responese,file,filelist){
        this.ruleForm.fileList.push(responese);
      },
      //相册附件的上传
      imgUploaded(responese,file,filelist){
        this.ruleForm.imgList.push(responese);
      },
      //定义根据id获取商品的数据
      getGoodsInFo(){
        var url = '/admin/goods/getgoodsmodel/'+this.goodsid;
        //get请求
        this.$ajax.get(url).then(res=>{
          this.ruleForm = res.data.message;
          this.ruleForm.category_id = +(this.ruleForm.category_id);
        })
      },
      //提交数据
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid) {
            this.$ajax.post('/admin/goods/edit/'+this.goodsid,this.ruleForm)
            .then(res=>{
              if (res.data.status ==1) {
                this.$message.error(res.data.message);
                return;
              }
              //提交成功之后，直接跳转列表即可
              this.$router.push({name:'goodslist'});
            })
          }else{
            console.log('error submit');;
            return false;
          }
        })
      }
    }
  }
</script>
<style scoped>
</style>