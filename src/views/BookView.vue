<template>
  <nav>
    <router-link to="/">MyApp</router-link>
    <router-link to="/table">Table</router-link>
    <router-link to="/book">Book System</router-link>
    <el-dropdown
      style="
        text-decoration: none;
        color: hsla(160, 100%, 37%, 1);
        transition: 0.4s;
        padding: 3px;
      "
    >
      <span>{{ loginstudent.name }}</span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><div @click="logout()">Log out</div></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </nav>
  <div>
    <div style="margin-top: 80px">
      <el-input
        v-model="params.name"
        style="width: 300px"
        placeholder="请输入图书名称"
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
    </div>
    <div>
      <el-table :data="book" style="width: 100%">
        <el-table-column prop="name" label="Name" width="200"></el-table-column>
        <el-table-column
          prop="author"
          label="Author"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="Price"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="press"
          width="200"
          label="Press"
        ></el-table-column>
        <el-table-column label="图书封面" width="100">
          <template v-slot="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="'http://localhost:8081/api/files/' + scope.row.img"
              :preview-src-list="[
                'http://localhost:8081/api/files/' + scope.row.img,
              ]"
              @error="handleImageLoad(scope)"
            />
          </template>
        </el-table-column>
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
    <!--div style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:current-page="params.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        v-model:page-size="params.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div-->
    <div>
      <el-dialog title="请填写新增信息" v-model="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Name">
            <el-input
              v-model="form.name"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="图书封面">
            <el-upload
              action="http://localhost:8081/api/files/upload"
              :on-success="handleExceed"
            >
              <el-button style="color: hsla(160, 100%, 37%, 1)"
                >点击上传</el-button
              >
            </el-upload>
          </el-form-item>
          <el-form-item label="Author">
            <el-input
              v-model="form.author"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="Price">
            <el-input
              v-model="form.price"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="Press">
            <el-input
              v-model="form.press"
              autocomplete="off"
              style="width: 90%"
            ></el-input>
          </el-form-item>
          <el-form-item label="Img">
            <el-input
              v-model="form.img"
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
  data() {
    return {
      loginstudent: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      params: {
        name: "",
      },
      book: [],
      dialogFormVisible: false,
      form: {},
      student: [],
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
        .get("/book", {
          //name: this.name,
        })
        .then((res) => {
          if (res.code === "0") {
            this.book = res.data;
            //console.log(this.book);
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
        .get("/book/search", {
          params: {
            name: this.params.name,
          },
        })
        .then((res) => {
          if (res.code === "0") {
            this.book = [res.data];
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
      request.post("/book", this.form).then((res) => {
        //console.log("This is this.form" + this.form);
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
      request.delete("/book/" + id).then((res) => {
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
    handleExceed(res) {
      //console.log(res);
      this.form.img = res.data;
      //console.log(scope.row.img);
    },
    handleImageLoad(scope) {
      console.log(scope.row.img);
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
.el-form-item .el-form-item__label {
  flex-basis: 100px; /* Adjust label width */
}

.el-form-item .el-form-item__content {
  flex-grow: 1;
}
</style>
