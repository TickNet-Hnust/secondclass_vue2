<template>
<div>
  <header>
    <el-form ref="form"  :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="预警名称" >
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="学院名称">
        <el-select v-model="form.region" placeholder="请选择学院">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="选择年级">
        <el-select v-model="form.region" placeholder="请选择年级">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="预警id" >
        <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="预警时间" >
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" ></el-date-picker>
        -
        <el-time-picker placeholder="选择时间" v-model="form.date2" ></el-time-picker>
    </el-form-item>
    <el-form-item label="统计时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
        -
        <el-time-picker placeholder="选择时间" v-model="form.date2"></el-time-picker>
    </el-form-item>
    <br>
    <el-form-item label="状态选择" style="padding-right: 50px;">
      <el-radio-group v-model="form.resource">
      <el-radio label="各学分类型"></el-radio>
      <el-radio label="达标总分类型"></el-radio>
    </el-radio-group>
    </el-form-item>
    <el-form-item label="积分类型">
        <el-checkbox label="已预警" v-model="form.hasWarn"></el-checkbox>
        <el-checkbox label="已统计" v-model="form.hasCounted"></el-checkbox>
    </el-form-item>
    <br>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">立即查询</el-button>
    </el-form-item>
    </el-form>
    {{form}}
  </header>
  <body>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    @row-click = "info"
    >
    <el-table-column
      prop="id"
      label="ID"
      width="50px">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="deptName"
      label="学院名称">
    </el-table-column>
    <el-table-column
      prop="grade"
      label="年级"
      width="80px">
    </el-table-column>
    <!--后期修改成详细的积分类型-->
    <el-table-column
      prop="type"
      label="积分类型">
    </el-table-column>
    <!--后期修改成详细的积分类型-->
    <el-table-column
      prop="setting"
      label="积分详情">
    </el-table-column>
    <el-table-column
      prop="total"
      label="总学时">
    </el-table-column>
    <el-table-column
      prop="warnTime"
      label="预警时间"
      width="160px"
      >
    </el-table-column>
    <el-table-column
      prop="statisticsTime"
      label="统计时间"
      width="160px"
      >
    </el-table-column>
    <el-table-column
      prop="status"
      label="统计状态">
    </el-table-column>
  </el-table>    
  </body>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
        {
            id:11,//列表id
            name: '某活动积分预警',//列表名称
            deptName:'计算机科学与工程学院',//学院名称
            grade:'2019',//所在年级
            type:0,//积分类型：按各学分类型设置，按达标总分设置
            setting:null,//具体学分设置
            total: 72,//总学分
            warnTime: "2021-10-13 21:58:53",//预警时间
            statisticsTime: "2021-10-13 21:58:53",//统计时间
            status: 1,//是否统计了
            warnStatus: 1//是否预警
        }
        ],
        form: {
          name: '',
          id:null,
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          hasWarn: false,
          hasCounted:false,
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
        info(...args) {
            console.log(args[0])
        },
        onSubmit() {
        console.log('submit!');
        }
    }
  }
</script>