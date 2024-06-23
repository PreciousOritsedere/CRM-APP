<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDealsStore } from "@/stores/Deals/deals";
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const dealsStore = useDealsStore()

const titleStack = ref(['Admin', 'Deals'])
const notification = computed(() => dealsStore.notify)

      const optionsStage = [{id: 0, label: 'New'},{id: 1, label: 'Qualified'},{id: 2, label: 'Proposal'},{id: 3, label: 'Won'},{id: 4, label: 'Lost'},]

        const optionsLead = computed(() => dealsStore.searchResultLead);

        const optionsOwner = computed(() => dealsStore.searchResultOwner);

const dealsItem = computed(() => dealsStore.data);

const form = reactive({

    name: '',

    amount: '',

      stage: '',

      lead: '',

      owner: '',

})

const submit = async () => {
  try {

            form.stage = form.stage.label;

            form.lead = form.lead?.id;

            form.owner = form.owner?.id;

    await dealsStore.edit({id: route.params.id, data: {...form} })
    router.push('/deals');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchLead();

  await searchOwner();

    await dealsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    dealsStore.showNotification(e, 'error');
  }
})

    async function searchLead(val) {
      await dealsStore.searchLead(val);
    }

    async function searchOwner(val) {
      await dealsStore.searchOwner(val);
    }

const formatData = () => {

    form.name = dealsItem.value.name

    form.amount = dealsItem.value.amount

    form.stage = optionsStage.find(el => el.label === dealsItem.value.stage)

    form.lead = dataFormatter.leadsOneListFormatterEdit(dealsItem.value.lead)

    form.owner = dataFormatter.usersOneListFormatterEdit(dealsItem.value.owner)

}

watch(() => dealsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Deals notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    dealsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/deals')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Deals</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Deals"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="DealName"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your DealName"
        />
    </FormField>

    <FormField
      label="Amount"
    >
      <FormControl
        type="number"
        v-model="form.amount"
        placeholder="Your Amount"
      />
    </FormField>

    <FormField label="Stage">
      <FormControl
        v-model="form.stage"
        :options="optionsStage"
      />
    </FormField>

  <FormField
      label="Lead"
    >
      <v-select
        v-model="form.lead"
        :options="optionsLead"
        @input="searchLead($event.target.value)"
      />
  </FormField>

  <FormField
      label="Owner"
    >
      <v-select
        v-model="form.owner"
        :options="optionsOwner"
        @input="searchOwner($event.target.value)"
      />
  </FormField>

    <BaseDivider />

    <BaseButtons>
      <BaseButton
        type="submit"
        color="info"
        label="Submit"
      />
      <BaseButton
        type="button"
        color="info"
        outline
        label="Reset"
        @click="reset"
      />
      <BaseButton
        type="cancel"
        color="danger"
        outline
        label="Cancel"
        @click="cancel"
      />
    </BaseButtons>
  </CardBox>
</SectionMain>

</template>
