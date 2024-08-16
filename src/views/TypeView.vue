<template>
  <div>
    <div style="margin-top: 80px">
      <el-input
        v-model="params.name"
        style="width: 300px"
        placeholder="请输入分类名称"
      ></el-input>
      <el-button
        style="margin-left: 20px; color: hsla(160, 100%, 37%, 1)"
        @click="findBySearch()"
        >Search</el-button
      >
      <el-button
        style="margin-left: 20px; color: hsla(160, 100%, 37%, 1)"
        @click="reset()"
        >Reset</el-button
      >
      <el-button
        style="margin-left: 20px; color: hsla(160, 100%, 37%, 1)"
        @click="dialogFormVisible = true"
        >Add</el-button
      >
      <el-popconfirm title="确定删除这些数据吗？" @confirm="delBatch()">
        <template v-slot:reference>
          <el-button style="margin-left: 20px; color: red">批量删除</el-button>
        </template>
      </el-popconfirm>
      <el-button
        style="margin-left: 20px; color: hsla(160, 100%, 37%, 1)"
        @click="exp()"
        >导出报表</el-button
      >
    </div>
    <div>
      <el-table
        :data="type"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column prop="name" label="Name" width="200"></el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="400"
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
    <div>
      <el-dialog title="请填写新增信息" v-model="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称">
            <el-input
              v-model="form.name"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>

          <el-form-item label="分类描述">
            <el-input
              v-model="form.description"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "TypeView",
  data() {
    return {
      loginstudent: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      params: {
        name: "",
      },
      type: [],
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
    };
  },
  // 页面加载的时候，做一些事情，在created里面
  created() {
    this.load();
  },
  // 定义一些页面上控件出发的事件调用的方法
  methods: {
    load() {
      request.get("/type", {}).then((res) => {
        if (res.code === "0") {
          this.type = res.data;
          //this.type = [{ id: "1", name: "csnadcojd", description: "cdsckd" }];
          //console.log("Types are" + this.type);
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
        .get("/type/search", {
          params: {
            name: this.params.name,
          },
        })
        .then((res) => {
          if (res.code === "0") {
            this.type = [res.data];
          } else {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
        });
    },

    edit(obj) {
      this.form = obj;
      //console.log(this.form.author);
      this.dialogFormVisible = true;
    },
    reset() {
      this.name = "";
      //this.load();
    },
    handleSizeChange(pageSize) {
      //this.params.pageSize = pageSize;
      //this.load();
    },
    handleCurrentChange(pageNum) {
      //this.params.pageNum = pageNum;
    },

    submit() {
      request.post("/type", this.form).then((res) => {
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
    del(id) {
      request.delete("/type/" + id).then((res) => {
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
    handleExceed(res) {},
    handleImageLoad(scope) {
      //console.log(scope.row.img);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map((proxy) => {
        return {
          id: proxy.id,
          name: proxy.name,
          description: proxy.description,
        };
      });
    },
    delBatch() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的数据",
          type: "warning",
        });

        return;
      }
      console.log(this.multipleSelection);
      request.put("type/delBatch", this.multipleSelection).then((res) => {
        if (res.code === "0") {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.load();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    exp() {},
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
.el-form-item .el-form-item__label {
  flex-basis: 100px; /* Adjust label width */
}

.el-form-item .el-form-item__content {
  flex-grow: 1;
}
</style>
