<template>
  <div class="pagination">
    <button>1</button>
    <button>上一页</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>{{ totalPage }}</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <p>{{ startNumAndEndNum }} --- {{ pageNo }}</p>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出分页器起始数字和结束数字
    startNumAndEndNum() {
      const { totalPage, continues, pageNo } = this;
      let start = 0,
        end = 0;

      // 总页数小于连续页码
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
        // 总页数大于连续页码  [正常情况]
      } else {
        // 避免起始页出现负数
        if (pageNo <= parseInt(continues / 2)) {
          start = 1;
          end = continues;
          // 避免结束超过总页数
        } else if (pageNo >= totalPage - parseInt(continues / 2)) {
          start = totalPage - continues + 1;
          end = totalPage;
        } else {   // [正常情况]
          start = pageNo - parseInt(continues / 2);
          end = pageNo + parseInt(continues / 2);
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
