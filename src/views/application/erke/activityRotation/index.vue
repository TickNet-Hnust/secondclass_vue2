

<template>
    <div class="app-container">
        <div class="erke-top">
            <el-button 
                @click="addRotation" 
                v-hasPermi="['secondClass:activity/hot:add']"
            >
                新增
            </el-button>
        </div>
        <div class="erke-bottom">
            <el-table
                :data="imgList"
            >
                <el-table-column
                    prop="id"
                    label="Id"
                    width="80"
                ></el-table-column>
                <el-table-column
                    prop="activityId"
                    label="活动Id"
                ></el-table-column>
                <el-table-column
                    prop="activityImage"
                    label="活动轮播图"
                >
                    <template slot-scope="scope">
                        <img 
                            :src="scope.row.activityImage" 
                            class="activityImage"
                            @click="showImg(scope.row.activityImage)"
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="activityName"
                    label="活动名称"
                ></el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                ></el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="最后更新时间"
                ></el-table-column>
                <el-table-column
                    prop="userId"
                    label="操作者Id"
                ></el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button 
                            size="mini" 
                            type="primary"
                            @click="deleteRotation(scope.row.id)"
                            v-hasPermi="['secondClass:activity/hot:remove']"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
		    title="上传轮播图"
		    :visible.sync="dialogVisible"
        >
		    <span>
		        <el-row>
                    <el-col :span="12">
                        <el-upload
                        class="upload-demo"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :http-request="httpRequest"
                        :file-list="fileList"
                        :limit="1">
                        <el-button size="small" type="primary"  style="margin-bottom:10px">点击上传</el-button>
                    </el-upload>
                    </el-col>
		        </el-row>
		        <el-row>
		            <el-col :span="24">
		                <!-- 裁剪 -->
		                <vueCropper
		                style="width:100%;height:300px"
		                ref="cropper"
		                :img="attach.customaryUrl"
		                :autoCrop="options.autoCrop"
		                :fixedBox="options.fixedBox"
		                :canMoveBox="options.canMoveBox"
		                :autoCropWidth="options.autoCropWidth"
		                :autoCropHeight="options.autoCropHeight"
		                :centerBox="options.centerBox"
		                @realTime="realTime">
		                </vueCropper>
		            </el-col>
		        </el-row>
                <el-row>
                    <h2 align="center">图片预览</h2>
		                    <div class="show-preview">
		                        <div  class="preview">
		                            <img :src="previews.url" :style="previews.img">
		                        </div>
		                    </div>
                </el-row>
		        <el-row class="footerBtn" align="center">
		            <el-button type="primary" size="small" round="" @click="upload">确认</el-button>
		            <el-button type="primary" size="small" round="" @click="handleClose">取消</el-button>
		        </el-row>
		    </span>
		</el-dialog>
    </div>
</template>

<script>
    import { VueCropper }  from "vue-cropper";
    import {
        activityHotGet,
        activityHotDelete,
        activityHotPost
    } from '@/api/application/secondClass/index'

    import {
        transformDate,
        filterTwoLayer,
        filterCourseClassificationList
    } from '@/utils/gather'
    import IMGURL_MIXINS from '@/mixins/upload.js'
    export default {
        name: 'activityRotation',
        components: {
            VueCropper
        },
        mixins: [IMGURL_MIXINS],
        data() {
            return {
                fileList: [], //图片列表
                imgList: [],
                postData: {
                    activityImage: ''
                },
                dialogVisible: false,
                options:{
                    autoCrop:true,  //默认生成截图框
                    fixedBox:true,  //固定截图框大小
                    canMoveBox:false,    //截图框不能拖动
                    autoCropWidth:350,  //截图框宽度
                    autoCropHeight:100, //截图框高度
                    centerBox:false,    //截图框被限制在图片里面
                },
                previews:{}, //实时预览图数据
                attach:{ //后端附件表
                    customaryUrl:'', //原图片路径
                },
                fileName:'',//本机文件地址
            }
        },
        methods: {
            addRotation() {
                this.dialogVisible = true
            },
            handleClose(){
				this.dialogVisible=false
                this.clearAll()
			},
			//实时预览
			realTime(data){
				this.previews = data
			},
            uploadImg(e){
                console.log(e)
				this.getImgUrl(e.target).then(value => {
                    console.log(value,'图片路径')
                })
			},
            httpRequest(file) {
                console.log(file)
                this.fileName = file.file.name
                this.getImgUrl(file).then(value => {
                    this.attach.customaryUrl = value
                })
            },
            clearAll() {
                this.attach.customaryUrl = ''
                this.fileList = []
                this.previews = {}
            },
            upload() {
                if(this.attach.customaryUrl == '') {
                    this.msgInfo('请先点击上传图片')
                    return 
                }
                this.$prompt(`请输入点击图片跳转的活动Id`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9]*$/,
                    inputErrorMessage: '只能填数字'
                }).then(({ value: activityId }) => {
                    this.$refs.cropper.getCropBlob(data => {
                        //将Blob转成file对象再上传
                        let fileObj = new File([data], this.fileName)
                        
                        this.getImgUrl({  //统一格式，得加一层
                            file: fileObj
                        }).then(value => {
                            console.log(value,'图片路径')
                            this.postData.activityImage = value
                            this.postData.activityId = activityId
                            
                            return activityHotPost(this.postData)
                        }).then(value => {
                            
                            if(value.code == 200) {
                                this.dialogVisible = false
                                this.getImgList()
                                this.clearAll()
                                this.$message.success('添加成功')
                            }
                        })
                    })
                })
            },
            getImgList() {
                activityHotGet().then(value => {
                    console.log(value)
                    this.imgList = value.rows
                })
            },
            showImg(img) {
                this.$viewerApi({
                    images: [img],
                })
            },
            deleteRotation(id) {
                this.alertDialog(`删除该条数据`,{
                    confirm: () => {
                        activityHotDelete({
                            id
                        }).then(value => {
                            if(value.code == 200) {
                                this.msgSuccess('删除成功')
                                this.getImgList()
                            } else {
                                this.msgError('删除失败')
                            }
                        })
                    }
                })
            }
        },
        created() {
            this.getImgList()
        }
    }
</script>

<style scoped>
    .erke-top {
        margin-right: 10px;
        height: 70px;
        padding: 15px;
        margin: 0 0 10px 0;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
   
    .erke-bottom {
        position: relative;
        transition: all .5s;
        background-color: #fff;
        height: calc(100vh - 130px);
        border: 1px solid #ddd;
        padding: 15px;
        overflow: auto;
    }
    .show-preview{
	    display: flex;  
	    justify-content: center;
        margin-left: 20px;
	}
	
	.preview{
        width: 350px;
        height: 100px;
	    overflow: hidden;
	    border:1px solid #cccccc;
	    background: #cccccc;
	}
    .footerBtn{
	    display: flex;
	    justify-content: center;
	    margin-top: 15px;
	}

    .activityImage {
        width: 50px;
        height: 50px;
    }
</style>
