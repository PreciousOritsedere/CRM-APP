<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const dealsStore = useDealsStore()
const router = useRouter();

const notification = computed(() => dealsStore.notify)
const titleStack = ref(['Admin', 'Deals'])

        const optionsLead = computed(() => dealsStore.searchResultLead);

        const optionsOwner = computed(() => dealsStore.searchResultOwner);

const form = reactive({

      name: '',

      amount: '',

      stage: false,

      lead: '',

      owner: '',

})

onBeforeMount(async () => {

  await searchLead();

  await searchOwner();

})

const submit = async () => {
  try {

            form.stage = form.stage.label;

            form.lead = form.lead.id;

            form.owner = form.owner.id;

    await dealsStore.newItem({ ...form })
    router.push('/deals');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

        form.amount = '';

        form.stage = false;

        form.lead = '';

        form.owner = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchLead(val) {
      await dealsStore.searchLead(val);
    }

    async function searchOwner(val) {
      await dealsStore.searchOwner(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Deals</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Deals"
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
        :options="[{id: 0, label: 'New'},
                    {id: 1, label: 'Qualified'},
                    {id: 2, label: 'Proposal'},
                    {id: 3, label: 'Won'},
                    {id: 4, label: 'Lost'},
                    ]"
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
        type="reset"
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
