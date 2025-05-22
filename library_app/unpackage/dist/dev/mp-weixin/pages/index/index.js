"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const navigateToCategory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/fenlei/fenlei"
        // 替换成你的分类页面路径
      });
    };
    const bannerList = common_vendor.ref([
      {
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20fresh%20organic%20vegetables%20and%20fruits%20arrangement%20with%20green%20leafy%20vegetables%2C%20colorful%20bell%20peppers%2C%20carrots%2C%20and%20apples%20on%20rustic%20wooden%20table%20with%20soft%20natural%20lighting%2C%20healthy%20food%20concept%2C%20high%20resolution%2C%20professional%20food%20photography%20style%2C%20vibrant%20colors&width=700&height=300&seq=2&orientation=landscape"
      },
      {
        imageUrl: "https://readdy.ai/api/search-image?query=professional%20product%20photography%20of%20traditional%20Chinese%20herbal%20medicine%20arrangement%20with%20ginseng%2C%20dried%20red%20dates%2C%20goji%20berries%2C%20and%20various%20herbs%20in%20wooden%20bowls%20on%20dark%20background%20with%20soft%20lighting%2C%20health%20supplement%20concept%2C%20high%20resolution%2C%20commercial%20quality&width=700&height=300&seq=3&orientation=landscape"
      },
      {
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20honey%20products%20with%20glass%20jars%20of%20different%20honey%20varieties%2C%20honeycomb%2C%20and%20wooden%20dipper%20on%20natural%20wooden%20background%20with%20soft%20golden%20lighting%2C%20natural%20sweetener%20concept%2C%20high%20resolution%2C%20commercial%20food%20photography%20style&width=700&height=300&seq=4&orientation=landscape"
      }
    ]);
    const categoryList = common_vendor.ref([
      {
        name: "新鲜果蔬",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%20Realistic%20food%2C%20photorealistic%20vegetables%20and%20fruits%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subjects%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=60&height=60&seq=5&orientation=squarish"
      },
      {
        name: "粮油副食",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20rice%20and%20cooking%20oil%20bottle%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=6&orientation=squarish"
      },
      {
        name: "养生茶饮",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%202.5D%20vector%20illustration%2C%20herbal%20tea%20cup%20with%20steam%2C%20high-quality%20details%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20no%20shadows%2C%20no%20text%2C%20Content%20simple&width=60&height=60&seq=7&orientation=squarish"
      },
      {
        name: "保健品",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20vitamin%20bottle%20with%20pills%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=8&orientation=squarish"
      },
      {
        name: "有机蔬菜",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%202.5D%20vector%20illustration%2C%20organic%20vegetables%20with%20leaf%20label%2C%20high-quality%20details%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20no%20shadows%2C%20no%20text%2C%20Content%20simple&width=60&height=60&seq=9&orientation=squarish"
      },
      {
        name: "坚果炒货",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20mixed%20nuts%20in%20bowl%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=10&orientation=squarish"
      },
      {
        name: "滋补品",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%202.5D%20vector%20illustration%2C%20ginseng%20root%2C%20high-quality%20details%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20no%20shadows%2C%20no%20text%2C%20Content%20simple&width=60&height=60&seq=11&orientation=squarish"
      },
      {
        name: "蜂蜜制品",
        imageUrl: "https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20honey%20jar%20with%20dipper%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=12&orientation=squarish"
      }
    ]);
    const specialOfferList = common_vendor.ref([
      {
        name: "云南野生菌菇礼盒装 500g",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20wild%20mushroom%20gift%20box%20with%20assorted%20mushrooms%20including%20shiitake%20and%20morel%20mushrooms%20arranged%20in%20elegant%20packaging%2C%20gourmet%20food%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality&width=200&height=200&seq=13&orientation=squarish",
        currentPrice: "128.00",
        originalPrice: "168.00"
      },
      {
        name: "有机黑枸杞 250g装",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20black%20goji%20berries%20in%20clear%20glass%20jar%2C%20premium%20dried%20superfood%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20health%20food%20concept&width=200&height=200&seq=14&orientation=squarish",
        currentPrice: "89.00",
        originalPrice: "118.00"
      },
      {
        name: "东北长白山人参 5年根",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20ginseng%20roots%20from%20Northeast%20China%2C%20traditional%20Chinese%20medicine%20ingredient%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20herbal%20supplement%20concept&width=200&height=200&seq=15&orientation=squarish",
        currentPrice: "299.00",
        originalPrice: "399.00"
      },
      {
        name: "新疆和田大枣 500g",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20red%20dates%20from%20Xinjiang%20in%20clear%20packaging%2C%20dried%20fruit%20superfood%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20natural%20snack%20concept&width=200&height=200&seq=16&orientation=squarish",
        currentPrice: "45.90",
        originalPrice: "59.90"
      }
    ]);
    const newProductList = common_vendor.ref([
      {
        name: "蓝莓叶黄素护眼胶囊 60粒",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20blueberry%20lutein%20eye%20health%20supplement%20bottle%20with%20capsules%2C%20health%20product%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20pharmaceutical%20style&width=200&height=200&seq=17&orientation=squarish",
        price: "138.00"
      },
      {
        name: "有机燕麦片早餐冲饮 1kg",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20oatmeal%20package%20with%20oat%20grains%20visible%2C%20breakfast%20food%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20healthy%20eating%20style&width=200&height=200&seq=18&orientation=squarish",
        price: "49.90"
      },
      {
        name: "西湖龙井明前茶 250g礼盒",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20Longjing%20green%20tea%20in%20elegant%20gift%20box%20with%20tea%20leaves%20visible%2C%20luxury%20tea%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20traditional%20Chinese%20tea%20style&width=200&height=200&seq=19&orientation=squarish",
        price: "268.00"
      },
      {
        name: "新西兰麦卢卡蜂蜜 UMF15+",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20Manuka%20honey%20jar%20with%20golden%20honey%20visible%2C%20luxury%20food%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20natural%20health%20product%20style&width=200&height=200&seq=20&orientation=squarish",
        price: "328.00"
      }
    ]);
    const healthArticles = common_vendor.ref([
      {
        title: "春季养生指南：五种应季食材不可错过",
        description: "春季是养生的好时节，本文为您推荐五种春季应季食材，助您调理身体...",
        date: "2025-05-18",
        views: "2.3万",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20spring%20seasonal%20vegetables%20and%20herbs%20with%20fresh%20greens%2C%20sprouts%2C%20and%20flowers%20on%20wooden%20table%2C%20seasonal%20food%20concept%2C%20high%20resolution%2C%20lifestyle%20photography%2C%20soft%20natural%20lighting&width=120&height=80&seq=21&orientation=landscape"
      },
      {
        title: "中医专家解读：如何根据体质选择合适的保健品",
        description: "不同体质的人适合不同的保健品，本文邀请中医专家为您详细解读...",
        date: "2025-05-15",
        views: "1.8万",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20traditional%20Chinese%20medicine%20consultation%20with%20doctor%20examining%20herbs%20and%20supplements%2C%20TCM%20concept%2C%20high%20resolution%2C%20medical%20photography%2C%20professional%20setting%20with%20soft%20lighting&width=120&height=80&seq=22&orientation=landscape"
      },
      {
        title: "夏日即将来临，这些食材帮你清热解暑",
        description: "夏季即将到来，如何科学饮食清热解暑？这些传统食材效果显著...",
        date: "2025-05-12",
        views: "1.5万",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20summer%20cooling%20foods%20including%20watermelon%2C%20cucumber%2C%20and%20herbal%20tea%20on%20light%20background%2C%20refreshing%20food%20concept%2C%20high%20resolution%2C%20food%20photography%2C%20bright%20natural%20lighting&width=120&height=80&seq=23&orientation=landscape"
      }
    ]);
    const productList = common_vendor.ref([
      {
        name: "有机胚芽米 5kg装",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20germinated%20rice%20package%2C%20premium%20grain%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20health%20food%20concept&width=180&height=180&seq=24&orientation=squarish",
        currentPrice: "69.90",
        originalPrice: "89.90",
        sales: "2356",
        rating: "4.9"
      },
      {
        name: "冻干灵芝孢子粉胶囊 60粒",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20freeze-dried%20reishi%20mushroom%20spore%20powder%20capsules%20in%20bottle%2C%20herbal%20supplement%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20traditional%20medicine%20concept&width=180&height=180&seq=25&orientation=squarish",
        currentPrice: "198.00",
        originalPrice: "258.00",
        sales: "1892",
        rating: "4.8"
      },
      {
        name: "新鲜有机蓝莓 125g盒装",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20fresh%20organic%20blueberries%20in%20transparent%20packaging%2C%20premium%20berry%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20fresh%20fruit%20concept&width=180&height=180&seq=26&orientation=squarish",
        currentPrice: "29.90",
        originalPrice: "36.90",
        sales: "3421",
        rating: "4.7"
      },
      {
        name: "特级红枣枸杞茶 30包装",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20red%20date%20and%20goji%20berry%20tea%20bags%20in%20elegant%20packaging%2C%20herbal%20tea%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20traditional%20health%20tea%20concept&width=180&height=180&seq=27&orientation=squarish",
        currentPrice: "48.00",
        originalPrice: "68.00",
        sales: "2789",
        rating: "4.9"
      },
      {
        name: "深海鱼油软胶囊 90粒",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20deep%20sea%20fish%20oil%20softgel%20capsules%20in%20bottle%2C%20omega-3%20supplement%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20health%20supplement%20concept&width=180&height=180&seq=28&orientation=squarish",
        currentPrice: "108.00",
        originalPrice: "138.00",
        sales: "1563",
        rating: "4.8"
      },
      {
        name: "有机黑芝麻丸 200g罐装",
        imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20black%20sesame%20balls%20in%20elegant%20jar%2C%20traditional%20Chinese%20health%20food%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20natural%20supplement%20concept&width=180&height=180&seq=29&orientation=squarish",
        currentPrice: "59.00",
        originalPrice: "79.00",
        sales: "1245",
        rating: "4.7"
      }
    ]);
    const currentSwiper = common_vendor.ref(0);
    const swiperChange = (e) => {
      currentSwiper.value = e.detail.current;
    };
    const scrollTop = common_vendor.ref(0);
    const showBackToTop = common_vendor.ref(false);
    const isLoading = common_vendor.ref(false);
    const onScroll = (e) => {
      const scrollY = e.detail.scrollTop;
      showBackToTop.value = scrollY > 300;
    };
    const scrollToTop = () => {
      scrollTop.value = 0;
    };
    const loadMore = () => {
      if (isLoading.value)
        return;
      isLoading.value = true;
      setTimeout(() => {
        const newProducts = [
          {
            name: "云南野生松茸 100g",
            imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20wild%20matsutake%20mushroom%2C%20luxury%20food%20ingredient%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20gourmet%20concept&width=180&height=180&seq=30&orientation=squarish",
            currentPrice: "368.00",
            originalPrice: "498.00",
            sales: "986",
            rating: "4.9"
          },
          {
            name: "有机亚麻籽油 500ml",
            imageUrl: "https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20flaxseed%20oil%20in%20glass%20bottle%2C%20cold-pressed%20oil%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20healthy%20oil%20concept&width=180&height=180&seq=31&orientation=squarish",
            currentPrice: "89.00",
            originalPrice: "109.00",
            sales: "1432",
            rating: "4.8"
          }
        ];
        productList.value = [...productList.value, ...newProducts];
        isLoading.value = false;
      }, 1500);
    };
    const showCouponTip = common_vendor.ref(true);
    const closeCouponTip = () => {
      showCouponTip.value = false;
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "location",
          size: "18",
          color: "#333"
        }),
        b: common_vendor.p({
          type: "arrowdown",
          size: "14",
          color: "#666"
        }),
        c: common_vendor.p({
          type: "search",
          size: "18",
          color: "#666"
        }),
        d: common_vendor.p({
          type: "scan",
          size: "24",
          color: "#333"
        }),
        e: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item.imageUrl,
            b: index
          };
        }),
        f: common_vendor.o(swiperChange),
        g: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: index,
            b: currentSwiper.value === index ? 1 : ""
          };
        }),
        h: common_vendor.f(categoryList.value, (item, index, i0) => {
          return {
            a: item.imageUrl,
            b: common_vendor.t(item.name),
            c: index
          };
        }),
        i: common_vendor.p({
          type: "right",
          size: "14",
          color: "#666"
        }),
        j: common_vendor.f(specialOfferList.value, (item, index, i0) => {
          return {
            a: item.imageUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.currentPrice),
            d: common_vendor.t(item.originalPrice),
            e: index
          };
        }),
        k: common_vendor.p({
          type: "right",
          size: "14",
          color: "#666"
        }),
        l: common_vendor.f(newProductList.value, (item, index, i0) => {
          return {
            a: item.imageUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: index
          };
        }),
        m: common_vendor.p({
          type: "right",
          size: "14",
          color: "#666"
        }),
        n: common_vendor.f(healthArticles.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.description),
            c: common_vendor.t(item.date),
            d: common_vendor.t(item.views),
            e: item.imageUrl,
            f: index
          };
        }),
        o: common_vendor.f(productList.value, (item, index, i0) => {
          return {
            a: item.imageUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.currentPrice),
            d: common_vendor.t(item.originalPrice),
            e: common_vendor.t(item.sales),
            f: "67f726da-7-" + i0,
            g: common_vendor.t(item.rating),
            h: index
          };
        }),
        p: common_vendor.p({
          type: "star-filled",
          size: "12",
          color: "#FFD700"
        }),
        q: isLoading.value
      }, isLoading.value ? {
        r: common_vendor.p({
          type: "spinner-cycle",
          size: "20",
          color: "#666"
        })
      } : {}, {
        s: common_vendor.o(loadMore),
        t: scrollTop.value,
        v: common_vendor.o(onScroll),
        w: common_vendor.p({
          type: "home-filled",
          size: "24",
          color: "#4CAF50"
        }),
        x: common_vendor.p({
          type: "list",
          size: "24",
          color: "#999"
        }),
        y: common_vendor.o(navigateToCategory),
        z: common_vendor.p({
          type: "cart",
          size: "24",
          color: "#999"
        }),
        A: common_vendor.p({
          type: "person",
          size: "24",
          color: "#999"
        }),
        B: common_vendor.p({
          type: "headphones",
          size: "24",
          color: "#fff"
        }),
        C: common_vendor.p({
          type: "top",
          size: "24",
          color: "#fff"
        }),
        D: showBackToTop.value,
        E: common_vendor.o(scrollToTop),
        F: showCouponTip.value
      }, showCouponTip.value ? {
        G: common_vendor.p({
          type: "closeempty",
          size: "16",
          color: "#999"
        }),
        H: common_vendor.o(closeCouponTip)
      } : {});
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
