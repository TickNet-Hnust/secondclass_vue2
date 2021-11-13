<template>
    <div>
        <!--表单查询-->
        <el-form ref="form"  :inline="true" :model="form" class="demo-form-inline"> 
        <el-form-item label="预警名称" >
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学院名称">
            <el-select v-model="form.deptId" placeholder="请选择学院">
            <el-option v-for="item in utilList" :label="item.deptName" :value="item.deptId"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="选择年级">
            <el-select v-model="form.grade" placeholder="请选择年级">
            <el-option v-for="item in yearList" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="积分类型" style="margin-right: 10px;" class=".check">
            <el-radio-group v-model="form.type">
            <el-radio label="1" style="margin-right: 5px;">各学分类型</el-radio>
            <el-radio label="0">达标总分类型</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="状态选择" >
            <el-checkbox label="已预警" v-model="form.warnStatus" style="margin-right: 5px;"></el-checkbox>
            <el-checkbox label="已统计" v-model="form.status"></el-checkbox>
        </el-form-item>
        <br>
        <el-form-item label="预警时间" >
            <el-date-picker
            v-model="form.warnTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="统计时间">
            <el-date-picker
            v-model="form.statisticsTime"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left: 140px;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
            <el-button @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
            <el-button @click="toCreate">创建</el-button>
        </el-form-item>
        </el-form> 
        <!--创建记录的表格弹窗-->
        <el-dialog title="添加积分要求表"  :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="createForm" class="demo-form-inline">
                <el-form-item label="预警名称">
                <el-input v-model="createForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学院名称">
                <el-select v-model="createForm.deptId" placeholder="请选择学院">
                <el-option v-for="item in utilList" :label="item.deptName" :value="item.deptId"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="选择年级">
                    <el-select v-model="createForm.grade" placeholder="请选择年级">
                    <el-option v-for="item in yearList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="积分类型" style="margin-right: 10px;" class=".check">
                    <el-radio-group v-model="createForm.type">
                    <el-radio label="1" style="margin-right: 5px;">各学分类型</el-radio>
                    <el-radio label="0">达标总分类型</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-if="createForm.type === '0'">
                    <el-form-item  label="达标总分(数字)">
                        <el-input v-model="settingNum" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
                <div v-if="createForm.type === '1'">
                    <el-form-item  label="学分类型及分数">
                    <el-select v-model="settingType" placeholder="请选择积分类型">
                    <el-option v-for="item in courseList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item>
                    <el-input v-model="settingNum"  placeholder="请设置分数"></el-input>
                    </el-form-item>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSetting" style="transform: translateY(3px);" circle></el-button>
                
                    <el-form-item>
                        <el-tag
                        v-for="item in settings"
                        closable
                        @close="handleClose(item)"
                        >
                        {{item.desc}}
                        </el-tag>
                    </el-form-item>
                </div>
                <el-form-item label="预警时间"  style="margin-left:10px;">
                    <el-date-picker
                    v-model="createForm.warnTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    style="width: 200px;"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="统计时间">
                    <el-date-picker
                    v-model="createForm.statisticsTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    default-time="23:59:59"
                    style="width: 200px"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="create">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
utilListCollege
} from '@/api/application/secondClass/index'
export default {
    data() {
        return{
            form: {
            name:null,
            grade:null,
            deptId:null,
            warnTime:null,
            statisticsTime:null,
            warnStatus:null,
            status:null,
            type:null
            },
            yearList:[],
            utilList:[],
            //创建相关的数据
            dialogFormVisible: false,
            createForm: {

            },
            settingType:null,
            settingNum:null,
            settings:[],
            courseList:[],
        }
    },
    methods: {
        /**
         * @description 发送查询设置
         */
        onSubmit() {
            let val = {}
            for(let i in this.form) {
                if(this.form[i] !== null)
                {
                    if(i == 'warnStatus' || i == 'status') {
                        val[i] = this.form[i] ? 1 : 0
                    }
                    else if(i == 'warnTime') {
                        val['beginWarnTime'] = this.form[i][0]
                        val['endWarnTime'] = this.form[i][1]
                    }
                    else if(i == 'statisticsTime') {
                        val['beginStatisticsTime'] = this.form[i][0]
                        val['endStatisticsTime'] = this.form[i][1]
                    }
                    else val[i] = this.form[i]
                } 
            }
            this.$emit('getSearch',val)
        },
        reset() {
            this.form = {name:null, grade:null, deptId:null, warnTime:null, statisticsTime:null, warnStatus:null, status:null, type:null}
            this.onSubmit()
        },
        toCreate() {
            this.settings = []
            this.settingType = null
            this.createForm = {}
            this.dialogFormVisible = true
            this.settingNum = null
        },
        create() {
            if(this.createForm.name&&this.createForm.deptId&&this.createForm.grade&&this.createForm.type&&this.createForm.warnTime&&this.createForm.statisticsTime) {
            //将传过来的分值中的非数字部分去掉
            if(this.settingNum) this.settingNum = this.settingNum.replace(/[^\d]/g,'')
            else this.$message({
                    message: '分数未填写完整',
                    type: 'warning'
                    });
            //将级字去掉
            this.createForm.grade = this.createForm.grade.replace('级','')
            //初始化setting
            this.createForm.setting = ""
            if(this.createForm.type == 0) {
                this.createForm.total = this.settingNum
            }
            else {
                this.createForm.total = 0
                this.settings.forEach(val => {
                    this.createForm.total +=  parseInt(val.val.split(':')[1].replace(/[^\d]/g,'')) 
                    this.createForm.setting += `${val.val}&&`
                })
                this.createForm.setting = this.createForm.setting.replace(/&&$/g,'')
            }
            this.$emit('create',this.createForm)
            this.dialogFormVisible = false
            }
            else this.$message({
                    message: '信息未填写完整',
                    type: 'warning'
            });
        },
        addSetting() {
            if(this.settingType && this.settingNum) {
                //将传过来的分值中的非数字部分去掉
                this.settingNum = this.settingNum.replace(/[^\d]/g,'')
                this.courseList.forEach(item=>{
                    if(item.id === this.settingType)
                    this.settings.push({
                        val:`${this.settingType}:${this.settingNum}`,
                        desc:`${item.name}:${this.settingNum}分`
                    })
                })
            }
            else {
                this.$message({
                    message: '类型及分数未填写完整',
                    type: 'warning'
                });
            }
        },
        handleClose(item) {
        this.settings.splice(this.settings.indexOf(item), 1);
        },
    },
    mounted() {
      const data = new Date()
      utilListCollege()
      .then(res=>{
        if(res.data) this.utilList = res.data
        else {
          this.$message.error('获取学院列表失败');
        }
      })
      //设置年级 
      let currentGrade = data.getFullYear()
      if(data.getMonth() < 9) currentGrade--
      for(let i = 0; i<5; i++)
      this.yearList.push({name:`${currentGrade - i}级`,id:currentGrade - i})
      //获取积分类型
      const List = JSON.parse(localStorage.getItem('courseList'))
      List.forEach(item => {
          if(item.pid == 0) {
            const {id, name} = item
            this.courseList.push({id,name})
          }
      })
    }
}
</script>

<style scoped>
    /*微调ui框样式*/
    ::v-deep .el-radio__label {
        padding-left: 2px;
    }
    ::v-deep .el-checkbox__label {
        padding-left: 2px;
    }
    ::v-deep .el-form-item__label {
        padding-right: 8px;
    }
</style>