<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const email_campaignsStore = useEmail_campaignsStore()
const router = useRouter();

const notification = computed(() => email_campaignsStore.notify)
const titleStack = ref(['Admin', 'Email_campaigns'])

        const optionsOwner = computed(() => email_campaignsStore.searchResultOwner);

const form = reactive({

      name: '',

      subject: '',

    content: '',

      scheduled_date: '',

      owner: '',

})

onBeforeMount(async () => {

  await searchOwner();

})

const submit = async () => {
  try {

            form.owner = form.owner.id;

    await email_campaignsStore.newItem({ ...form })
    router.push('/email_campaigns');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

        form.subject = '';

      form.content = '';

        form.scheduled_date = '';

        form.owner = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchOwner(val) {
      await email_campaignsStore.searchOwner(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Email_campaigns</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Email_campaigns"
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
