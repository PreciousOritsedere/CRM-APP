<script setup>
import { computed, ref } from 'vue'
import { useDealsStore } from "@/stores/Deals/deals";
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import dataFormatter from '@/helpers/dataFormatter';
import { useRouter } from 'vue-router';
import FormControl from '@/components/FormControl.vue';

const $router = useRouter();

const props = defineProps({
  checkable: Boolean,
  sortTitle: String,
  sortDirection: String
})

const emit = defineEmits(['sort']);
/* Fetch data */
const dealsStore = useDealsStore()
dealsStore.fetch()

/* Delete item */
const deleteItem = () => {
  dealsStore.deleteItem(currentId.value)
}

const items = computed(() => dealsStore.data)

const headers = [

{ text: 'DealName', value: 'name'},
{ text: 'Amount', value: 'amount'},
{ text: 'Stage', value: 'stage'},
{ text: 'Lead', value: 'lead'},
{ text: 'Owner', value: 'owner'},]
const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const currentId = ref(0);

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value && items.value.length && items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
  }
}

const showModal = (client) => {
  currentId.value = client.id
  isModalDangerActive.value = true
}

const sort = (title) => {
  let sortTitle = title;
  let sortDirection = '';
  if (props.sortTitle !== title) {
    sortDirection = 'asc';
  } else {
    if (props.sortDirection === 'asc') {
      sortDirection = 'desc';
    } else {
      sortDirection = '';
      sortTitle = '';
    }
  }
  emit('sort', {sortTitle, sortDirection});
}

</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Deals modal"
  >
    <ul
      v-for="item in headers"
      :key="item"
    >
      <li>{{ item.text }}</li>
    </ul>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
    :deleteItem="deleteItem"
  >
    <p>Are you sure you want to delete this item?</p>
  </CardBoxModal>

  <div
    v-if="checkedRows.length"
    class="p-3 bg-gray-100/50 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700"
    >
      {{ checkedRow[headers[0].value] }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
      <th v-if="checkable" />

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'name' && props.sortDirection]"
        @click="sort('name')"
      >DealName</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'amount' && props.sortDirection]"
        @click="sort('amount')"
      >Amount</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'stage' && props.sortDirection]"
        @click="sort('stage')"
      >Stage</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'lead' && props.sortDirection]"
        @click="sort('lead')"
      >Lead</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'owner' && props.sortDirection]"
        @click="sort('owner')"
      >Owner</th>

        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="client in itemsPaginated"
        :key="client.id"
        @click="$router.push(`/deals/${client.id}/edit`)"
      >
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />

              <td data-label="name">
                {{ client.name }}
              </td>

              <td data-label="amount">
                {{ client.amount }}
              </td>

              <td data-label="stage">
                {{ client.stage }}
              </td>

              <td data-label="lead">
                {{ dataFormatter.leadsOneListFormatter(client.lead) }}
              </td>

              <td data-label="owner">
                {{ dataFormatter.usersOneListFormatter(client.owner) }}
              </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              :to="`/deals/${client.id}/edit`"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click.stop="() => showModal(client)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      <FormControl class="w-[70px]" type="select" :options="[10, 20, 50, 100]" v-model="perPage"/>
    </BaseLevel>
  </div>
</template>
