<template>
    <div>
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
        <br>
        <el-form-item label="预警时间" >
            <el-date-picker
            v-model="form.warnTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            default-time="00:00:00"
            style="width: 200px;"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="统计时间">
            <el-date-picker
            v-model="form.statisticsTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            default-time="23:59:59"
            style="width: 200px"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="状态选择" style="margin-right: 10px;" class=".check">
            <el-radio-group v-model="form.type">
            <el-radio label="1" style="margin-right: 5px;">各学分类型</el-radio>
            <el-radio label="0">达标总分类型</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="积分类型" >
            <el-checkbox label="已预警" v-model="form.warnStatus" style="margin-right: 5px;"></el-checkbox>
            <el-checkbox label="已统计" v-model="form.status"></el-checkbox>
        </el-form-item>
        <el-form-item style="margin-left: 10px;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form> 
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
            utilList:[]
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
                    console.log('xxx')
                    if(i == 'warnStatus' || i == 'status') {
                        val[i] = this.form[i] ? 1 : 0
                    }
                    else val[i] = this.form[i]
                } 
            }
            this.$emit('getSearch',val)
        }
    },
    mounted() {
      const data = new Date()
      utilListCollege()
      .then(res=>{
        if(res.data) this.utilList = res.data
        else {
          this.$message.error('获取失败');
        }
      }) 
      let currentGrade = data.getFullYear()
      if(data.getMonth() < 9) currentGrade--
      for(let i = 0; i<5; i++)
      this.yearList.push({name:`${currentGrade - i}级`,id:currentGrade - i})
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