"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      books: [
        {
          id: 1,
          title: "活着",
          author: "余华",
          category: "小说",
          status: "可借阅",
          coverUrl: "/static/book-covers/1.jpg"
        },
        {
          id: 2,
          title: "三体",
          author: "刘慈欣",
          category: "科幻",
          status: "已借出",
          coverUrl: "/static/book-covers/2.jpg"
        },
        {
          id: 3,
          title: "百年孤独",
          author: "加西亚·马尔克斯",
          category: "外国文学",
          status: "可借阅",
          coverUrl: "/static/book-covers/3.jpg"
        }
      ]
    };
  },
  onLoad() {
    this.getBookList();
  },
  methods: {
    // 获取图书列表
    getBookList() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:93", "获取图书列表");
    },
    // 搜索图书
    searchBooks() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:97", "搜索关键词:", this.searchKeyword);
    },
    // 查看图书详情
    viewBookDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/book/detail?id=${id}`
      });
    },
    // 页面导航
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.searchKeyword,
    b: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    c: common_vendor.o((...args) => $options.searchBooks && $options.searchBooks(...args)),
    d: common_vendor.o(($event) => $options.navigateTo("/pages/book/add")),
    e: common_vendor.o(($event) => $options.navigateTo("/pages/borrow/index")),
    f: common_vendor.o(($event) => $options.navigateTo("/pages/category/index")),
    g: common_vendor.o(($event) => $options.navigateTo("/pages/user/index")),
    h: common_vendor.f($data.books, (book, index, i0) => {
      return {
        a: book.coverUrl || "/static/default-book.png",
        b: common_vendor.t(book.title),
        c: common_vendor.t(book.author),
        d: common_vendor.t(book.category),
        e: common_vendor.t(book.status),
        f: book.status === "可借阅" ? 1 : "",
        g: book.status === "已借出" ? 1 : "",
        h: index,
        i: common_vendor.o(($event) => $options.viewBookDetail(book.id), index)
      };
    }),
    i: $data.books.length === 0
  }, $data.books.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
