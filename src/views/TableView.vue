<template>
  <div>
    <div style="margin-top: 80px">
      <el-input
        v-model="params.name"
        style="width: 200px"
        placeholder="请输入姓名"
      ></el-input>
      <el-button
        style="margin-left: 5px; width: 100px; color: hsla(160, 100%, 37%, 1)"
        @click="findBySearch()"
        >搜索</el-button
      >
      <el-button
        style="margin-left: 5px; width: 100px; color: hsla(160, 100%, 37%, 1)"
        @click="reset()"
        >重置</el-button
      >
      <el-button
        style="margin-left: 5px; width: 100px; color: hsla(160, 100%, 37%, 1)"
        @click="add()"
        >添加</el-button
      >
    </div>
    <div>
      <el-table :data="student" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="age" label="年龄" width="200"></el-table-column>
        <el-table-column
          prop="grade"
          label="成绩"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              size="small"
              style="
                margin-left: 5px;
                width: 60px;
                color: hsla(160, 100%, 37%, 1);
              "
              @click="edit(scope.row)"
              >Edit</el-button
            >
            <el-popconfirm title="Delete?" @confirm="del(scope.row.id)">
              <template v-slot:reference>
                <el-button
                  size="small"
                  style="margin-left: 5px; width: 60px; color: red"
                  >Delete</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 10px"></div>
    <div>
      <el-dialog title="请填写信息" v-model="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="姓名" label-width="15%">
            <el-input
              v-model="form.name"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄" label-width="15%">
            <el-input
              v-model="form.age"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="成绩" label-width="15%">
            <el-input
              v-model="form.grade"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="form.role"
              placeholder="Select"
              style="width: 240px"
            >
              <el-option label="学生" value="ROLE_STUDENT"></el-option>
              <el-option label="教师" value="ROLE_TEACHER"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "TableView",
  data() {
    return {
      loginstudent: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      params: {
        name: "",
      },
      student: [],
      dialogFormVisible: false,
      form: {},
    };
  },
  // 页面加载的时候，做一些事情，在created里面
  created() {
    this.load();
  },
  // 定义一些页面上控件出发的事件调用的方法
  methods: {
    load() {
      request
        .get("/student", {
          //params: this.params,
        })
        .then((res) => {
          if (res.code === "0") {
            this.student = res.data;
            console.log(this.student);
          } else {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
        });
    },
    findBySearch() {
      request
        .get("/student/search", {
          params: {
            name: this.params.name,
          },
        })
        .then((res) => {
          if (res.code === "0") {
            //console.log(res.data.list);
            this.student = [res.data];
            this.total = res.data.total;
            //console.log(res.data);
          } else {
            //console.log(res.data.list);
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
        });
    },

    edit(obj) {
      //console.log('Editing row:', obj);
      this.form = obj;
      this.dialogFormVisible = true;
    },
    reset() {
      this.params = {
        //pageNum: 1,
        //pageSize: 5,
        name: "",
      };
      //this.load();
    },
    handleSizeChange(pageSize) {
      //this.params.pageSize = pageSize;
      //this.load();
    },
    handleCurrentChange(pageNum) {
      //this.params.pageNum = pageNum;
      //this.load();
    },
    submit() {
      request.post("/student", this.form).then((res) => {
        console.log(this.form);
        if (res.code === "0") {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.load();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    del(id) {
      request.delete("/student/" + id).then((res) => {
        if (res.code === "0") {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.load();
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      });
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
