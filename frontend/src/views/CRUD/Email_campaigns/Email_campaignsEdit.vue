<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmail_campaignsStore } from "@/stores/Email_campaigns/email_campaigns";
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
const email_campaignsStore = useEmail_campaignsStore()

const titleStack = ref(['Admin', 'Email_campaigns'])
const notification = computed(() => email_campaignsStore.notify)

        const optionsOwner = computed(() => email_campaignsStore.searchResultOwner);

const email_campaignsItem = computed(() => email_campaignsStore.data);

const form = reactive({

    name: '',

    subject: '',

    content: [''],

      scheduled_date: '',

      owner: '',

})

const submit = async () => {
  try {

            form.owner = form.owner?.id;

    await email_campaignsStore.edit({id: route.params.id, data: {...form} })
    router.push('/email_campaigns');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchOwner();

    await email_campaignsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    email_campaignsStore.showNotification(e, 'error');
  }
})

    async function searchOwner(val) {
      await email_campaignsStore.searchOwner(val);
    }

const formatData = () => {

    form.name = email_campaignsItem.value.name

    form.subject = email_campaignsItem.value.subject

    form.content = email_campaignsItem.value.content

    form.scheduled_date = dataFormatter.dateTimeFormatter(email_campaignsItem.value.scheduled_date)

    form.owner = dataFormatter.usersOneListFormatterEdit(email_campaignsItem.value.owner)

}

watch(() => email_campaignsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Email_campaigns notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    email_campaignsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/email_campaigns')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Email_campaigns</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Email_campaigns"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="CampaignName"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your CampaignName"
        />
    </FormField>

    <FormField
      label="Subject"
    >
      <FormControl
        v-model="form.subject"
        placeholder="Your Subject"
        />
    </FormField>

    <label class="block font-bold mb-2 text-pavitra-700 text-sm">Content</label>
    <Editor
      api-key="s0bs8snu2u6qo8skn5r3kurkerhbaagpsgm9cdkbxnbo8nj4"
      cloudChannel="6"
      v-model="form.content"
      />

    <FormField
      label="ScheduledDate"
    >
      <FormControl
        type="datetime-local"
        v-model="form.scheduled_date"
        placeholder="Your ScheduledDate"
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
