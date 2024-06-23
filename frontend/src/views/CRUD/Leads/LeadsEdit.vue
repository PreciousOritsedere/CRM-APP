<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLeadsStore } from "@/stores/Leads/leads";
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
const leadsStore = useLeadsStore()

const titleStack = ref(['Admin', 'Leads'])
const notification = computed(() => leadsStore.notify)

      const optionsStatus = [{id: 0, label: 'New'},{id: 1, label: 'Contacted'},{id: 2, label: 'Qualified'},{id: 3, label: 'Lost'},]

        const optionsContact = computed(() => leadsStore.searchResultContact);

        const optionsOwner = computed(() => leadsStore.searchResultOwner);

const leadsItem = computed(() => leadsStore.data);

const form = reactive({

    source: '',

      score: '',

      status: '',

      contact: '',

      owner: '',

})

const submit = async () => {
  try {

            form.status = form.status.label;

            form.contact = form.contact?.id;

            form.owner = form.owner?.id;

    await leadsStore.edit({id: route.params.id, data: {...form} })
    router.push('/leads');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchContact();

  await searchOwner();

    await leadsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    leadsStore.showNotification(e, 'error');
  }
})

    async function searchContact(val) {
      await leadsStore.searchContact(val);
    }

    async function searchOwner(val) {
      await leadsStore.searchOwner(val);
    }

const formatData = () => {

    form.source = leadsItem.value.source

    form.score = leadsItem.value.score

    form.status = optionsStatus.find(el => el.label === leadsItem.value.status)

    form.contact = dataFormatter.contactsOneListFormatterEdit(leadsItem.value.contact)

    form.owner = dataFormatter.usersOneListFormatterEdit(leadsItem.value.owner)

}

watch(() => leadsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Leads notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    leadsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/leads')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Leads</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Leads"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Source"
    >
      <FormControl
        v-model="form.source"
        placeholder="Your Source"
        />
    </FormField>

    <FormField
      label="Score"
    >
      <FormControl
        type="number"
        v-model="form.score"
        placeholder="Your Score"
      />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="optionsStatus"
      />
    </FormField>

  <FormField
      label="Contact"
    >
      <v-select
        v-model="form.contact"
        :options="optionsContact"
        @input="searchContact($event.target.value)"
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
