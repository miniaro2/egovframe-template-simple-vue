<template>
  <div class="paging">
    <ul>
      <li v-if="pagination === undefined">-</li>
      <li v-else>
        <template v-if="totalPageCount > pageSize">
          <!-- 첫 페이지 이동 -->
          <li class="btn">
            <button @click="moveToPage(1)" class="first">처음</button>
          </li>
          <!-- 이전 페이지 이동 -->
          <li class="btn">
            <button @click="moveToPage(prevPageIndex)" class="prev">이전</button>
          </li>
        </template>
        <template v-for="i in pageRange" :key="i">
          <li>
            <button
              :class="{ cur: i === currentPageNo }"
              @click="moveToPage(i)"
            >
              {{ i }}
            </button>
          </li>
        </template>
        <template v-if="totalPageCount > pageSize">
          <!-- 다음 페이지 이동 -->
          <li class="btn">
            <button @click="moveToPage(nextPageIndex)" class="next">다음</button>
          </li>
          <!-- 마지막 페이지 이동 -->
          <li class="btn">
            <button @click="moveToPage(totalPageCount)" class="last">마지막</button>
          </li>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'EgovPaging',
  props: {
    pagination: Object,
    moveToPage: Function,
  },
  setup(props) {
    const currentPageNo = computed(() => props.pagination.currentPageNo);
    const pageSize = computed(() => props.pagination.pageSize);
    const totalRecordCount = computed(() => props.pagination.totalRecordCount);
    const recordCountPerPage = computed(() => props.pagination.recordCountPerPage);

    const totalPageCount = computed(() => Math.ceil(totalRecordCount.value / recordCountPerPage.value));
    const currentFirstPage = computed(() => Math.floor((currentPageNo.value - 1) / pageSize.value) * pageSize.value + 1);
    const currentLastPage = computed(() => {
      const lastPage = currentFirstPage.value + pageSize.value - 1;
      return (lastPage > totalPageCount.value) ? totalPageCount.value : lastPage;
    });

    const prevPageIndex = computed(() => (currentPageNo.value - 1 > 0) ? currentPageNo.value - 1 : 1);
    const nextPageIndex = computed(() => (currentLastPage.value + 1 < totalPageCount.value) ? currentLastPage.value + 1 : totalPageCount.value);

    const pageRange = computed(() => {
      const range = [];
      for (let i = currentFirstPage.value; i <= currentLastPage.value; i++) {
        range.push(i);
      }
      return range;
    });

    return {
      currentPageNo,
      pageSize,
      totalRecordCount,
      recordCountPerPage,
      totalPageCount,
      currentFirstPage,
      currentLastPage,
      prevPageIndex,
      nextPageIndex,
      pageRange,
      //moveToPage: props.moveToPage,
    };
  },
});
</script>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
